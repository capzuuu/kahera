'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export type LegalPolicyTab = 'terms' | 'privacy' | 'disclaimer';

interface LegalPolicyDialogProps {
  open: boolean;
  activeTab: LegalPolicyTab;
  onTabChange: (tab: LegalPolicyTab) => void;
  onOpenChange: (open: boolean) => void;
}

export function LegalPolicyDialog({
  open,
  activeTab,
  onTabChange,
  onOpenChange,
}: LegalPolicyDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>
            {activeTab === 'terms'
              ? 'Kahera POS — Terms and Conditions'
              : activeTab === 'privacy'
                ? 'Kahera POS — Privacy Policy'
                : 'Kahera POS — No Warranty Disclaimer'}
          </DialogTitle>
          <DialogDescription>
            Official legal, privacy, and licensing terms for Kahera POS.
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-2 border-b border-border pb-2 text-xs font-medium">
          <button
            type="button"
            onClick={() => onTabChange('terms')}
            className={`rounded-md px-3 py-1.5 transition-colors ${
              activeTab === 'terms'
                ? 'bg-brand text-white'
                : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            Terms and Conditions
          </button>
          <button
            type="button"
            onClick={() => onTabChange('privacy')}
            className={`rounded-md px-3 py-1.5 transition-colors ${
              activeTab === 'privacy'
                ? 'bg-brand text-white'
                : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            Privacy Policy
          </button>
          <button
            type="button"
            onClick={() => onTabChange('disclaimer')}
            className={`rounded-md px-3 py-1.5 transition-colors ${
              activeTab === 'disclaimer'
                ? 'bg-brand text-white'
                : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            No Warranty Disclaimer
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 space-y-4 text-sm text-muted-foreground leading-relaxed">
          {activeTab === 'terms' && (
            <>
              <div className="space-y-1.5">
                <h3 className="font-semibold text-foreground">1. Acceptance of Terms</h3>
                <p>
                  By installing, setting up, or using Kahera POS, you agree to these Terms and
                  Conditions. Kahera POS is an open-source, offline-first Point of Sale software
                  application provided under the MIT License.
                </p>
              </div>
              <div className="space-y-1.5">
                <h3 className="font-semibold text-foreground">
                  2. Local Operation & Merchant Responsibility
                </h3>
                <p>
                  Kahera POS runs locally on your hardware. You are solely responsible for
                  configuring your store profile, menu prices, tax rates, receipts, staff roles,
                  device security, and regular database backups.
                </p>
              </div>
              <div className="space-y-1.5">
                <h3 className="font-semibold text-foreground">3. Tax & Regulatory Compliance</h3>
                <p>
                  Kahera POS provides calculation tools and configurable tax templates, but it does
                  not constitute legal, accounting, or tax advice. You are responsible for verifying
                  that your configured tax rates, invoice formats, and receipts comply with
                  applicable local laws and tax authorities.
                </p>
              </div>
              <div className="space-y-1.5">
                <h3 className="font-semibold text-foreground">4. Third-Party Services</h3>
                <p>
                  Optional integrations such as Google Drive backups are governed by your own
                  accounts and the respective third-party terms of service.
                </p>
              </div>
            </>
          )}

          {activeTab === 'privacy' && (
            <>
              <div className="space-y-1.5">
                <h3 className="font-semibold text-foreground">1. Offline-First Local Storage</h3>
                <p>
                  Kahera POS stores all core business data — orders, bills, payments, products,
                  inventory, customer records, and staff accounts — locally on your device in your
                  SQLite database (<code>kahera.db</code>). Core POS features work without an
                  internet connection, and you retain full ownership of your data.
                </p>
              </div>
              <div className="space-y-1.5">
                <h3 className="font-semibold text-foreground">2. Usage & Error Diagnostics</h3>
                <p>
                  You control whether Kahera shares usage or error diagnostics in{' '}
                  <strong className="text-foreground">Settings → Privacy</strong>. You may choose
                  anonymous usage, link diagnostics to your owner email for support, or turn usage
                  sharing completely off at any time.
                </p>
                <p>
                  Kahera <strong className="text-foreground">never</strong> collects or transmits
                  customer names, phone numbers, order contents, sales amounts, payment details,
                  staff PINs, passwords, or API keys in usage or diagnostic reports.
                </p>
              </div>
              <div className="space-y-1.5">
                <h3 className="font-semibold text-foreground">3. Optional Cloud & Backups</h3>
                <p>
                  Optional network features (such as Google Drive backups and cloud reporting) run
                  only when explicitly configured by the store owner and can be disabled or
                  disconnected at any time in{' '}
                  <strong className="text-foreground">Settings → Privacy</strong> and{' '}
                  <strong className="text-foreground">Settings → Backup & Data</strong>.
                </p>
              </div>
            </>
          )}

          {activeTab === 'disclaimer' && (
            <>
              <div className="space-y-1.5">
                <h3 className="font-semibold text-foreground">1. As-Is Software Provision</h3>
                <p>
                  THE KAHERA POS SOFTWARE IS PROVIDED &ldquo;AS IS&rdquo;, WITHOUT WARRANTY OF ANY
                  KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
                  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NONINFRINGEMENT.
                </p>
              </div>
              <div className="space-y-1.5">
                <h3 className="font-semibold text-foreground">2. Limitation of Liability</h3>
                <p>
                  IN NO EVENT SHALL THE AUTHORS, COPYRIGHT HOLDERS, OR CONTRIBUTORS BE LIABLE FOR
                  ANY CLAIM, DAMAGES, DATA LOSS, BUSINESS INTERRUPTION, TAX PENALTIES, OR OTHER
                  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT, OR OTHERWISE, ARISING FROM, OUT
                  OF, OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                  SOFTWARE.
                </p>
              </div>
              <div className="space-y-1.5">
                <h3 className="font-semibold text-foreground">3. Data Backup Responsibility</h3>
                <p>
                  Hardware failures, power outages, or operating-system issues can occur on any
                  device. You are responsible for maintaining regular local and off-device backups
                  of your Kahera POS database.
                </p>
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          <Button type="button" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
