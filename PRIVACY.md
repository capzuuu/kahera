# Kahera POS Privacy Policy

Kahera POS is an offline-first desktop Point of Sale (POS) application. Your store data stays on your local device by default.

## 1. Local Data Storage

All core business data — including orders, bills, payments, menu items, categories, inventory, customer records, staff accounts, and business settings — is stored locally on your machine in your SQLite database (`kahera.db`).

- Core POS operations (ordering, billing, Kitchen Display System, and receipt printing) run entirely on your local device and local network without requiring an internet connection.
- You own and control your local database and backups at all times.

## 2. Optional Usage & Error Diagnostics

During initial setup or at any time in **Settings → Privacy**, the store owner can choose how Kahera handles product usage and diagnostic data:

- **Anonymous usage:** Feature usage, daily order counts, country, and application version with a random installation ID. Never includes your email address.
- **Linked to account email:** Links usage and error reports to the owner's email address so support can assist with troubleshooting and notify you when reported issues are resolved.
- **Off:** Disables usage telemetry.
- **Store diagnostics:** Optional error reporting that captures bounded technical failure details when an unexpected error occurs.

Regardless of your setting, Kahera **never** collects or transmits customer names, customer phone numbers, order contents, item prices, sales totals, payment details, staff PINs, passwords, or API keys in usage or diagnostic telemetry.

## 3. Optional Integrations

Optional network features operate only when explicitly enabled and configured by the store owner:

- **Google Drive Backups:** When connected, database backups or public QR menu PDFs are uploaded directly to the Google Drive account and folder authorized by the store owner.
- **Cloud Sync & Mobile Reporting:** When enabled by the store owner, store summary metrics and pairing codes are synced to allow authorized mobile companion devices to view reports. Cloud services can be stopped or deleted at any time from **Settings → Privacy**.

## 4. Security & Data Control

- Keep your operating-system account, local database (`kahera.db`), and backup files protected.
- You can export, back up, restore, or reset your local database at any time from **Settings → Backup & Data**.
- You can enable **Offline Mode** or turn off all telemetry and cloud services at any time from **Settings → Privacy**.
