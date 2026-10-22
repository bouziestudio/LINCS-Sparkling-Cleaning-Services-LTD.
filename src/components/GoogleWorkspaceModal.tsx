import React, { useState, useEffect } from 'react';
import { COMPANY_INFO } from '../data/cleaningData';
import {
  X,
  Mail,
  CheckCircle2,
  ExternalLink,
  Send,
  Calendar,
  MapPin,
  RefreshCw,
  Server,
  Sparkles
} from 'lucide-react';

interface GoogleWorkspaceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface WorkspaceStatus {
  targetEmail: string;
  domain: string;
  workspaceConfigured: boolean;
  transport: string;
  googleWorkspaceDns: {
    mx: { priority: number; host: string }[];
    spf: string;
    dkim: string;
    dmarc: string;
  };
  totalSubmissions: number;
}

export const GoogleWorkspaceModal: React.FC<GoogleWorkspaceModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [status, setStatus] = useState<WorkspaceStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [testSending, setTestSending] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string; ticketId?: string } | null>(null);

  const fetchStatus = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/workspace/status');
      if (res.ok) {
        const data = await res.json();
        setStatus(data);
      }
    } catch (err) {
      console.warn('Could not load workspace status:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchStatus();
      setTestResult(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTestDispatch = async () => {
    setTestSending(true);
    setTestResult(null);
    try {
      const res = await fetch('/api/workspace/test-dispatch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          testerName: 'LINCS Admin Test',
          notes: 'Google Workspace email deliverability check',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setTestResult({
          success: true,
          message: data.message || `Test dispatch sent successfully to ${COMPANY_INFO.email}!`,
          ticketId: data.ticketId,
        });
        fetchStatus();
      } else {
        setTestResult({
          success: false,
          message: data.error || 'Test dispatch failed.',
        });
      }
    } catch (err: any) {
      setTestResult({
        success: false,
        message: err.message || 'Network error during test dispatch.',
      });
    } finally {
      setTestSending(false);
    }
  };

  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    COMPANY_INFO.email
  )}&su=${encodeURIComponent('Inquiry from Google Workspace Client - LINCS Cleaning')}`;

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    'LINCS Sparkling Cleaning Booking'
  )}&details=${encodeURIComponent(
    'Cleaning service booking managed via info@lincsscsltd.com'
  )}&location=${encodeURIComponent(COMPANY_INFO.fullAddress)}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#10190f] border-b border-neutral-800 px-6 py-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#9fe81d] text-neutral-950 flex items-center justify-center font-bold shadow-md">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-black text-lg text-white">
                  Google Workspace Email Routing
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#1e2e1a] text-[#bef264] border border-[#9fe81d]/30">
                  Optimized
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                All booking inquiries, quote requests, and fast messages route to{' '}
                <strong className="text-[#9fe81d] font-mono">{COMPANY_INFO.email}</strong>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-neutral-200 text-sm">
          {/* Active Target Banner */}
          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#9fe81d]" />
                <span>Primary Destination Mailbox</span>
              </div>
              <div className="font-mono text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <span>{COMPANY_INFO.email}</span>
                <span className="w-2 h-2 rounded-full bg-[#9fe81d] animate-pulse" />
              </div>
              <p className="text-xs text-neutral-400 mt-1">
                Google Workspace Custom Business Domain: <span className="text-neutral-200 font-mono">lincsscsltd.com</span>
              </p>
            </div>

            <div className="flex flex-wrap sm:flex-col gap-2 shrink-0">
              <a
                href={gmailComposeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-[#1e2e1a] hover:bg-[#283d23] border border-[#9fe81d]/40 text-[#bef264] text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Open in Gmail</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>

              <a
                href={googleCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <Calendar className="w-3.5 h-3.5 text-[#9fe81d]" />
                <span>Google Calendar</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>
            </div>
          </div>

          {/* Google Workspace Optimizations Included */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#9fe81d] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Workspace Deliverability &amp; Productivity Pipeline</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-neutral-950/80 border border-neutral-800 rounded-xl p-3.5 space-y-1">
                <div className="text-xs font-bold text-white flex items-center gap-2">
                  <span className="text-[#9fe81d]">✓</span> 1-Click Google Calendar Sync
                </div>
                <p className="text-[12px] text-neutral-400 leading-relaxed">
                  Every booking email to Workspace contains direct links to auto-schedule the clean into Google Calendar.
                </p>
              </div>

              <div className="bg-neutral-950/80 border border-neutral-800 rounded-xl p-3.5 space-y-1">
                <div className="text-xs font-bold text-white flex items-center gap-2">
                  <span className="text-[#9fe81d]">✓</span> Google Maps Postcode Pin
                </div>
                <p className="text-[12px] text-neutral-400 leading-relaxed">
                  Postcodes link directly into Google Maps for route planning across Surrey and London.
                </p>
              </div>

              <div className="bg-neutral-950/80 border border-neutral-800 rounded-xl p-3.5 space-y-1">
                <div className="text-xs font-bold text-white flex items-center gap-2">
                  <span className="text-[#9fe81d]">✓</span> Strict Reply-To &amp; SPF Alignment
                </div>
                <p className="text-[12px] text-neutral-400 leading-relaxed">
                  Clicking &apos;Reply&apos; in Gmail instantly opens a thread to the customer with customer identity preservation.
                </p>
              </div>

              <div className="bg-neutral-950/80 border border-neutral-800 rounded-xl p-3.5 space-y-1">
                <div className="text-xs font-bold text-white flex items-center gap-2">
                  <span className="text-[#9fe81d]">✓</span> Gmail Threading Headers
                </div>
                <p className="text-[12px] text-neutral-400 leading-relaxed">
                  Configured with RFC 2822 Message-ID and X-Entity-Ref-ID for clean conversation threading in Gmail.
                </p>
              </div>
            </div>
          </div>

          {/* Google Workspace Recommended DNS Configuration */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
              <Server className="w-4 h-4 text-[#9fe81d]" />
              <span>Google Workspace DNS &amp; MX Directives (lincsscsltd.com)</span>
            </h4>
            <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 font-mono text-xs space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-neutral-800 text-neutral-400">
                <span>Primary MX Record:</span>
                <span className="text-[#9fe81d] font-bold">1 ASPMX.L.GOOGLE.COM</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-neutral-800 text-neutral-400">
                <span>Backup MX Records:</span>
                <span className="text-neutral-200">5 ALT1.ASPMX.L.GOOGLE.COM, 5 ALT2...</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-neutral-800 text-neutral-400">
                <span>Google SPF Record:</span>
                <span className="text-[#9fe81d]">v=spf1 include:_spf.google.com ~all</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-neutral-400">
                <span>DKIM Selector:</span>
                <span className="text-neutral-300">google._domainkey.lincsscsltd.com</span>
              </div>
            </div>
          </div>

          {/* Interactive Test Dispatcher */}
          <div className="bg-[#121c11] border border-[#9fe81d]/30 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h5 className="font-bold text-white text-sm">
                  Test Google Workspace Routing
                </h5>
                <p className="text-xs text-neutral-300">
                  Trigger an instantaneous test routing dispatch to verify delivery to{' '}
                  <span className="text-[#9fe81d] font-mono">{COMPANY_INFO.email}</span>.
                </p>
              </div>
              <button
                onClick={handleTestDispatch}
                disabled={testSending}
                className="px-4 py-2.5 rounded-xl bg-[#9fe81d] hover:bg-[#8cd412] text-neutral-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 disabled:opacity-50 flex items-center gap-2 shrink-0 cursor-pointer"
              >
                <Send className={`w-3.5 h-3.5 ${testSending ? 'animate-spin' : ''}`} />
                <span>{testSending ? 'Routing Test...' : 'Send Test Dispatch'}</span>
              </button>
            </div>

            {testResult && (
              <div
                className={`p-3.5 rounded-xl text-xs font-mono flex items-start gap-2.5 border ${
                  testResult.success
                    ? 'bg-neutral-950 text-[#bef264] border-[#9fe81d]/40'
                    : 'bg-red-950/60 text-red-200 border-red-800'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#9fe81d]" />
                <div>
                  <p className="font-bold">{testResult.message}</p>
                  {testResult.ticketId && (
                    <p className="text-neutral-400 mt-1">Ticket Reference: #{testResult.ticketId}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-neutral-950 border-t border-neutral-800 px-6 py-4 flex items-center justify-between shrink-0">
          <div className="text-xs text-neutral-500 flex items-center gap-1.5">
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Transport: {status?.transport || 'Optimized Dispatch Queue'}</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs uppercase tracking-wider transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
