#!/usr/bin/env node
/**
 * Truncates and resets the local Kahera SQLite database to a clean, fresh install state.
 * Works safely whether the app is currently running or closed.
 *
 * Usage: npm run db:truncate
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const Module = require('module');

const rootDir = path.resolve(__dirname, '..');
const Database = require(path.join(rootDir, 'node_modules/better-sqlite3'));

// Determine target database path
const targetPaths = [
  path.join(rootDir, 'kahera.db'),
  path.join(os.homedir(), 'AppData', 'Roaming', 'kahera', 'kahera.db'),
].filter((p) => fs.existsSync(p));

if (targetPaths.length === 0) {
  targetPaths.push(path.join(rootDir, 'kahera.db'));
}

console.log('--- Kahera Database Truncate & Reset ---');

// Create temporary template database to grab clean schema and default install settings
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kahera-truncate-'));
const templateDbPath = path.join(tmpDir, 'template.db');
process.env.FLO_E2E_DB_PATH = templateDbPath;

const mockApp = {
  isPackaged: false,
  getPath: () => tmpDir,
  getVersion: () => require(path.join(rootDir, 'package.json')).version,
  getName: () => 'Kahera',
};

const origLoad = Module._load;
Module._load = function (request, parent, isMain) {
  if (request === 'electron') {
    return { app: mockApp, safeStorage: { isEncryptionAvailable: () => false } };
  }
  return origLoad.apply(this, arguments);
};

try {
  const { initDatabase, closeDatabase } = require(path.join(rootDir, 'dist/main/db'));
  initDatabase(false);
  closeDatabase();
} catch (err) {
  console.error('Failed to create template database. Run "npm run build" first if dist/ is missing.');
  process.exit(1);
} finally {
  Module._load = origLoad;
}

const templateDb = new Database(templateDbPath, { readonly: true });

for (const targetPath of targetPaths) {
  if (!fs.existsSync(targetPath)) {
    console.log(`Creating fresh database at: ${targetPath}`);
    fs.copyFileSync(templateDbPath, targetPath);
    continue;
  }

  console.log(`Resetting database at: ${targetPath}`);
  const targetDb = new Database(targetPath);

  targetDb.pragma('busy_timeout = 5000');
  targetDb.pragma('foreign_keys = OFF');

  const allTables = targetDb
    .prepare(
      `SELECT name FROM sqlite_master
       WHERE type = 'table'
         AND name NOT LIKE 'sqlite_%'
         AND name NOT LIKE '%_fts%'`
    )
    .all()
    .map((r) => r.name);

  targetDb.transaction(() => {
    // Truncate all non-virtual tables
    for (const table of allTables) {
      targetDb.prepare(`DELETE FROM "${table}"`).run();
    }
    try {
      targetDb.prepare('DELETE FROM sqlite_sequence').run();
    } catch {}

    // Seed default settings from fresh template
    for (const table of allTables) {
      const rows = templateDb.prepare(`SELECT * FROM "${table}"`).all();
      if (rows.length === 0) continue;
      const cols = Object.keys(rows[0]);
      const colList = cols.map((c) => `"${c}"`).join(', ');
      const placeholders = cols.map(() => '?').join(', ');
      const insertStmt = targetDb.prepare(
        `INSERT INTO "${table}" (${colList}) VALUES (${placeholders})`
      );
      for (const row of rows) {
        insertStmt.run(...cols.map((c) => row[c]));
      }
    }

    // Rebuild full-text search tables
    for (const ftsTable of ['orders_search_fts', 'customers_search_fts']) {
      try {
        targetDb.exec(`INSERT INTO ${ftsTable}(${ftsTable}) VALUES('rebuild')`);
      } catch {}
    }
  })();

  targetDb.pragma('foreign_keys = ON');
  try {
    targetDb.pragma('wal_checkpoint(TRUNCATE)');
  } catch {}

  const summary = {
    users: targetDb.prepare('SELECT count(*) as c FROM users').get().c,
    products: targetDb.prepare('SELECT count(*) as c FROM products').get().c,
    categories: targetDb.prepare('SELECT count(*) as c FROM categories').get().c,
    orders: targetDb.prepare('SELECT count(*) as c FROM orders').get().c,
    bills: targetDb.prepare('SELECT count(*) as c FROM bills').get().c,
    settings: targetDb.prepare('SELECT count(*) as c FROM settings').get().c,
  };

  console.log(`Reset complete: ${JSON.stringify(summary)}`);
  targetDb.close();
}

templateDb.close();
try {
  fs.rmSync(tmpDir, { recursive: true, force: true });
} catch {}

console.log('✓ Database successfully truncated to fresh install state.');
