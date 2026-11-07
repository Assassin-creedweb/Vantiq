import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Mail,
  ExternalLink,
  Inbox,
  Trash2,
  AlertCircle,
} from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlan?: string;
}

interface StoredInquiry {
  id: string;
  name: string;
  email: string;
  company: string;
  scope: string;
  message: string;
  createdAt: string;
}

type FormFields = {
  name: string;
  email: string;
  company: string;
  plan: string;
  message: string;
};

type FieldName = keyof FormFields;

const STUDIO_OWNER_EMAIL = 'alfredwessley@gmail.com';
const INQUIRIES_STORAGE_KEY = 'vantiq_submitted_inquiries';
const MIN_MESSAGE_LENGTH = 15;

const SCOPE_LABELS: Record<string, string> = {
  LANDING_PAGE: 'High-Conversion Landing Page',
  MULTI_PAGE_WEBSITE: 'Custom Multi-Page Website',
  WEBSITE_AUTOMATIONS: 'Full-Stack Website + CRM & Workflow Automations',
};

function loadStoredInquiries(): StoredInquiry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(INQUIRIES_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveInquiryToStorage(item: StoredInquiry): StoredInquiry[] {
  const existing = loadStoredInquiries();
  const updated = [item, ...existing];
  try {
    window.localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // ignore storage quota errors
  }
  return updated;
}

function validateField(field: FieldName, value: string): string {
  const trimmed = value.trim();

  switch (field) {
    case 'name':
      if (!trimmed) return 'Your full name is required';
      if (trimmed.length < 2) return 'Name must be at least 2 characters';
      return '';
    case 'email':
      if (!trimmed) return 'Business email is required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) {
        return 'Enter a valid email address (e.g. name@company.com)';
      }
      return '';
    case 'company':
      if (!trimmed) return 'Company name or current website is required';
      if (trimmed.length < 2) return 'Enter at least 2 characters for company or domain';
      return '';
    case 'plan':
      if (!trimmed || !SCOPE_LABELS[trimmed]) return 'Please select a valid project scope';
      return '';
    case 'message':
      if (!trimmed) return 'Project brief is required before deployment';
      if (trimmed.length < MIN_MESSAGE_LENGTH) {
        return `Please add at least ${MIN_MESSAGE_LENGTH} characters (${MIN_MESSAGE_LENGTH - trimmed.length} more needed)`;
      }
      return '';
    default:
      return '';
  }
}

function validateAllFields(data: FormFields): Record<FieldName, string> {
  return {
    name: validateField('name', data.name),
    email: validateField('email', data.email),
    company: validateField('company', data.company),
    plan: validateField('plan', data.plan),
    message: validateField('message', data.message),
  };
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, initialPlan }) => {
  const [formData, setFormData] = useState<FormFields>({
    name: '',
    email: '',
    company: '',
    plan: initialPlan && SCOPE_LABELS[initialPlan] ? initialPlan : 'LANDING_PAGE',
    message: '',
  });

  const [touched, setTouched] = useState<Record<FieldName, boolean>>({
    name: false,
    email: false,
    company: false,
    plan: true,
    message: false,
  });
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showInbox, setShowInbox] = useState(false);
  const [inquiries, setInquiries] = useState<StoredInquiry[]>(() => loadStoredInquiries());

  const gmailLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (initialPlan && SCOPE_LABELS[initialPlan]) {
      setFormData((prev) => ({ ...prev, plan: initialPlan }));
    }
  }, [initialPlan]);

  if (!isOpen) return null;

  const fieldErrors = validateAllFields(formData);
  const isFormValid = Object.values(fieldErrors).every((err) => err === '');
  const completedCount = (Object.keys(formData) as FieldName[]).filter(
    (key) => fieldErrors[key] === ''
  ).length;
  const totalFields = 5;

  const shouldShowError = (field: FieldName): boolean => {
    return (touched[field] || submitAttempted) && Boolean(fieldErrors[field]);
  };

  const isFieldValid = (field: FieldName): boolean => {
    return fieldErrors[field] === '';
  };

  const handleFieldChange = (field: FieldName, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Mark touched immediately once the user starts typing so real-time feedback appears
    if (!touched[field]) {
      setTouched((prev) => ({ ...prev, [field]: true }));
    }
  };

  const handleFieldBlur = (field: FieldName) => {
    if (!touched[field]) {
      setTouched((prev) => ({ ...prev, [field]: true }));
    }
  };

  const getInputClasses = (field: FieldName, baseExtra = '') => {
    const hasError = shouldShowError(field);
    const valid = isFieldValid(field) && (touched[field] || formData[field].trim().length > 0);

    if (hasError) {
      return `w-full px-3.5 py-2.5 rounded-lg bg-rose-500/[0.05] border border-rose-500/70 focus:border-rose-400 text-sm text-white placeholder-slate-500 focus:outline-none transition-all ${baseExtra}`;
    }
    if (valid) {
      return `w-full px-3.5 py-2.5 rounded-lg bg-emerald-500/[0.03] border border-emerald-500/40 focus:border-purple-400 text-sm text-white placeholder-slate-500 focus:outline-none transition-all ${baseExtra}`;
    }
    return `w-full px-3.5 py-2.5 rounded-lg bg-white/[0.04] border border-white/[0.1] focus:border-purple-500 text-sm text-white placeholder-slate-500 focus:outline-none transition-all ${baseExtra}`;
  };

  const selectedScopeLabel = SCOPE_LABELS[formData.plan] || formData.plan;

  const subjectText = `New VANTIQ Website Inquiry — ${selectedScopeLabel} (${formData.name.trim() || 'Client'})`;
  const bodyText = [
    'New VANTIQ Project Inquiry',
    '----------------------------------------',
    `Selected Service: ${selectedScopeLabel}`,
    `Client Name: ${formData.name.trim()}`,
    `Client Email: ${formData.email.trim()}`,
    `Company / Website: ${formData.company.trim()}`,
    '',
    'Project Brief / Details:',
    formData.message.trim(),
  ].join('\n');

  const encodedSubject = encodeURIComponent(subjectText);
  const encodedBody = encodeURIComponent(bodyText);

  // Direct Gmail Web Compose URL
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    STUDIO_OWNER_EMAIL
  )}&su=${encodedSubject}&body=${encodedBody}`;

  // Standard mailto URL for mobile / native email clients
  const mailtoUrl = `mailto:${STUDIO_OWNER_EMAIL}?subject=${encodedSubject}&body=${encodedBody}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);
    setTouched({
      name: true,
      email: true,
      company: true,
      plan: true,
      message: true,
    });

    if (!isFormValid) return;

    // 1. Save inquiry locally so it is recorded in the modal's Submissions Inbox
    const newEntry: StoredInquiry = {
      id: `${Date.now()}`,
      name: formData.name.trim(),
      email: formData.email.trim(),
      company: formData.company.trim(),
      scope: selectedScopeLabel,
      message: formData.message.trim(),
      createdAt: new Date().toLocaleString(),
    };
    const updated = saveInquiryToStorage(newEntry);
    setInquiries(updated);

    // 2. Synchronously trigger the Gmail Compose anchor inside the user click gesture
    gmailLinkRef.current?.click();

    // 3. Fire a non-blocking background POST to FormSubmit in case it is reachable
    fetch(`https://formsubmit.co/ajax/${STUDIO_OWNER_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        _subject: subjectText,
        Name: newEntry.name,
        Email: newEntry.email,
        Company: newEntry.company,
        Scope: newEntry.scope,
        Brief: newEntry.message,
      }),
    }).catch(() => {});

    setSubmitted(true);
  };

  const handleClearInbox = () => {
    try {
      window.localStorage.removeItem(INQUIRIES_STORAGE_KEY);
    } catch {
      // ignore
    }
    setInquiries([]);
  };

  const handleReset = () => {
    setSubmitted(false);
    setShowInbox(false);
    setSubmitAttempted(false);
    onClose();
  };

  const messageTrimmedLength = formData.message.trim().length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200 font-['Space_Grotesk']">
      <div className="relative w-full max-w-xl rounded-2xl bg-[#0f0d1a] border border-white/[0.1] shadow-2xl overflow-hidden">
        
        {/* Synchronous anchor for Gmail Web Compose dispatch */}
        <a
          ref={gmailLinkRef}
          href={gmailComposeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden"
          aria-hidden="true"
        >
          Compose in Gmail
        </a>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.08] bg-[#131022]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-purple-400/30">
              <img
                src="/assets/media/vantiq_orb_logo.png"
                alt="VANTIQ"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="text-sm font-bold tracking-tight text-white uppercase block">
                Initiate VANTIQ Deployment
              </span>
              <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Direct Gmail dispatch to {STUDIO_OWNER_EMAIL}</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowInbox(!showInbox)}
              title="View recorded inquiries"
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
                showInbox
                  ? 'bg-purple-600/30 text-purple-200 border border-purple-400/40'
                  : 'text-slate-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08]'
              }`}
            >
              <Inbox className="w-3.5 h-3.5 text-purple-400" />
              <span>Inbox ({inquiries.length})</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8">
          {showInbox ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                    Recorded Project Inquiries ({inquiries.length})
                  </h3>
                  <p className="text-xs text-slate-400">
                    All inquiries submitted from this browser and dispatched to {STUDIO_OWNER_EMAIL}
                  </p>
                </div>
                {inquiries.length > 0 && (
                  <button
                    type="button"
                    onClick={handleClearInbox}
                    className="inline-flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear</span>
                  </button>
                )}
              </div>

              {inquiries.length === 0 ? (
                <div className="py-10 text-center text-xs text-slate-400">
                  No inquiries submitted yet. Fill out the form to send your first inquiry to {STUDIO_OWNER_EMAIL}.
                </div>
              ) : (
                <div className="max-h-72 overflow-y-auto space-y-3 pr-1">
                  {inquiries.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-1.5 text-xs"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-purple-300 uppercase">
                          {item.scope}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">
                          {item.createdAt}
                        </span>
                      </div>
                      <div className="text-slate-200 font-medium">
                        {item.name} · <span className="text-purple-200 font-mono">{item.email}</span>
                        {item.company !== 'Not specified' && (
                          <span className="text-slate-400"> ({item.company})</span>
                        )}
                      </div>
                      <p className="text-slate-400 leading-relaxed">
                        {item.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowInbox(false)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 transition-colors cursor-pointer"
                >
                  Back to Inquiry Form
                </button>
              </div>
            </div>
          ) : submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-purple-600/20 border border-purple-500/40 text-purple-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white uppercase tracking-tight">
                Gmail Compose Opened
              </h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                We have pre-filled your inquiry (<span className="text-purple-300 font-semibold">{selectedScopeLabel}</span>) addressed directly to <span className="text-purple-300 font-mono">{STUDIO_OWNER_EMAIL}</span>. Click <span className="text-white font-semibold">Send</span> in the Gmail tab to complete delivery, or use one of the direct links below:
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={gmailComposeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-purple-600 hover:bg-purple-500 border border-purple-400/40 shadow-lg shadow-purple-950/60 transition-all cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send via Gmail Web</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <a
                  href={mailtoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-200 hover:text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] transition-colors cursor-pointer"
                >
                  <span>Open Default Mail App</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleReset}
                  className="text-xs text-slate-400 hover:text-white underline underline-offset-4 cursor-pointer"
                >
                  Return to VANTIQ
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Row 1: Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="vantiq-name" className="text-xs font-medium text-slate-300">
                      Your Name <span className="text-purple-400">*</span>
                    </label>
                    {isFieldValid('name') && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
                        <CheckCircle2 className="w-3 h-3" /> Verified
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      id="vantiq-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleFieldChange('name', e.target.value)}
                      onBlur={() => handleFieldBlur('name')}
                      placeholder="Marcus Vance"
                      aria-invalid={shouldShowError('name')}
                      className={getInputClasses('name', 'pr-9')}
                    />
                    {shouldShowError('name') && (
                      <AlertCircle className="w-4 h-4 text-rose-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    )}
                    {isFieldValid('name') && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    )}
                  </div>
                  {shouldShowError('name') && (
                    <p className="text-[11px] text-rose-400 mt-1.5 flex items-center gap-1">
                      <span>{fieldErrors.name}</span>
                    </p>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="vantiq-email" className="text-xs font-medium text-slate-300">
                      Business Email <span className="text-purple-400">*</span>
                    </label>
                    {isFieldValid('email') && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
                        <CheckCircle2 className="w-3 h-3" /> Valid
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      id="vantiq-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleFieldChange('email', e.target.value)}
                      onBlur={() => handleFieldBlur('email')}
                      placeholder="marcus@orbitlabs.io"
                      aria-invalid={shouldShowError('email')}
                      className={getInputClasses('email', 'pr-9')}
                    />
                    {shouldShowError('email') && (
                      <AlertCircle className="w-4 h-4 text-rose-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    )}
                    {isFieldValid('email') && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    )}
                  </div>
                  {shouldShowError('email') && (
                    <p className="text-[11px] text-rose-400 mt-1.5 flex items-center gap-1">
                      <span>{fieldErrors.email}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Row 2: Company & Scope */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="vantiq-company" className="text-xs font-medium text-slate-300">
                      Company / Website <span className="text-purple-400">*</span>
                    </label>
                    {isFieldValid('company') && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
                        <CheckCircle2 className="w-3 h-3" /> Verified
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      id="vantiq-company"
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleFieldChange('company', e.target.value)}
                      onBlur={() => handleFieldBlur('company')}
                      placeholder="orbitlabs.io"
                      aria-invalid={shouldShowError('company')}
                      className={getInputClasses('company', 'pr-9')}
                    />
                    {shouldShowError('company') && (
                      <AlertCircle className="w-4 h-4 text-rose-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    )}
                    {isFieldValid('company') && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    )}
                  </div>
                  {shouldShowError('company') && (
                    <p className="text-[11px] text-rose-400 mt-1.5 flex items-center gap-1">
                      <span>{fieldErrors.company}</span>
                    </p>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="vantiq-plan" className="text-xs font-medium text-slate-300">
                      Project Scope <span className="text-purple-400">*</span>
                    </label>
                    {isFieldValid('plan') && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
                        <CheckCircle2 className="w-3 h-3" /> Selected
                      </span>
                    )}
                  </div>
                  <select
                    id="vantiq-plan"
                    value={formData.plan}
                    onChange={(e) => handleFieldChange('plan', e.target.value)}
                    onBlur={() => handleFieldBlur('plan')}
                    aria-invalid={shouldShowError('plan')}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#141220] border border-emerald-500/40 focus:border-purple-400 text-sm text-white focus:outline-none transition-colors"
                  >
                    <option value="LANDING_PAGE">High-Conversion Landing Page</option>
                    <option value="MULTI_PAGE_WEBSITE">Custom Multi-Page Website</option>
                    <option value="WEBSITE_AUTOMATIONS">Full-Stack Website + CRM & Workflow Automations</option>
                  </select>
                  {shouldShowError('plan') && (
                    <p className="text-[11px] text-rose-400 mt-1.5">{fieldErrors.plan}</p>
                  )}
                </div>
              </div>

              {/* Row 3: Project Brief */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="vantiq-message" className="text-xs font-medium text-slate-300">
                    Project Brief or Core Objectives <span className="text-purple-400">*</span>
                  </label>
                  <span
                    className={`text-[10px] font-mono ${
                      messageTrimmedLength >= MIN_MESSAGE_LENGTH
                        ? 'text-emerald-400'
                        : touched.message || submitAttempted
                        ? 'text-rose-400'
                        : 'text-slate-500'
                    }`}
                  >
                    {messageTrimmedLength}/{MIN_MESSAGE_LENGTH}+ chars
                  </span>
                </div>
                <div className="relative">
                  <textarea
                    id="vantiq-message"
                    rows={3}
                    value={formData.message}
                    onChange={(e) => handleFieldChange('message', e.target.value)}
                    onBlur={() => handleFieldBlur('message')}
                    placeholder="Tell us about your target launch timeline, core pages, or desired automations..."
                    aria-invalid={shouldShowError('message')}
                    className={getInputClasses('message', 'resize-none pr-9')}
                  />
                  {shouldShowError('message') && (
                    <AlertCircle className="w-4 h-4 text-rose-400 absolute right-3 top-3 pointer-events-none" />
                  )}
                  {isFieldValid('message') && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 absolute right-3 top-3 pointer-events-none" />
                  )}
                </div>
                {shouldShowError('message') && (
                  <p className="text-[11px] text-rose-400 mt-1.5 flex items-center gap-1">
                    <span>{fieldErrors.message}</span>
                  </p>
                )}
              </div>

              {/* Real-time readiness indicator + Submit */}
              <div className="pt-2 space-y-3">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <ShieldCheck
                      className={`w-3.5 h-3.5 shrink-0 ${
                        isFormValid ? 'text-emerald-400' : 'text-purple-400'
                      }`}
                    />
                    <span>
                      {isFormValid
                        ? 'All fields verified — ready to dispatch'
                        : `${completedCount} of ${totalFields} required fields verified`}
                    </span>
                  </span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((step) => (
                      <span
                        key={step}
                        className={`h-1.5 w-4 rounded-full transition-colors duration-200 ${
                          step <= completedCount
                            ? 'bg-emerald-400'
                            : submitAttempted
                            ? 'bg-rose-500/50'
                            : 'bg-white/10'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {submitAttempted && !isFormValid && (
                  <div className="px-3.5 py-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2 text-xs text-rose-300">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>Please complete all highlighted fields above before sending your inquiry.</span>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                  <span className="text-[11px] text-slate-500 font-mono">
                    Recipient: {STUDIO_OWNER_EMAIL}
                  </span>
                  <button
                    type="submit"
                    className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white border transition-all cursor-pointer ${
                      isFormValid
                        ? 'bg-purple-600 hover:bg-purple-500 border-purple-400/50 shadow-lg shadow-purple-950'
                        : 'bg-purple-600/80 hover:bg-purple-600 border-purple-400/30 opacity-90'
                    }`}
                  >
                    <Mail className="w-4 h-4" />
                    <span>Send Inquiry to Gmail</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};

