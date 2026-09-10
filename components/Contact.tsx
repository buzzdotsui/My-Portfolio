import React, { useState, useEffect } from 'react';
import { SectionId } from '../types';
import { Mail, Copy, Check, Send, AlertCircle, ArrowRight } from 'lucide-react';
import { MotionWrapper } from './ui/MotionWrapper';
import emailjs from 'emailjs-com';
import toast, { Toaster } from 'react-hot-toast';

// ========================================
// EMAILJS CONFIGURATION
// ========================================
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_dd5v77m',
  TEMPLATE_ID: 'template_eehdjv3',
  PUBLIC_KEY: 'Ios-Y4WNV37Naxn8W',
};

export const Contact: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [copied, setCopied] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    const configured =
      EMAILJS_CONFIG.SERVICE_ID !== 'YOUR_SERVICE_ID' &&
      EMAILJS_CONFIG.TEMPLATE_ID !== 'YOUR_TEMPLATE_ID' &&
      EMAILJS_CONFIG.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY';
    setIsConfigured(configured);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
    if (formState === 'error') setFormState('idle');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isConfigured) {
      toast.error('Contact form not configured. Please set up EmailJS credentials.', {
        duration: 4000,
        style: { background: '#1c2936', color: '#f59e0b', border: '1px solid #f59e0b30' },
      });
      return;
    }

    setFormState('submitting');

    try {
      emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

      const result = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'owolabitestimony7724@gmail.com',
        },
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      if (result.status === 200) {
        setFormState('success');
        setFormData({ name: '', email: '', message: '' });
        toast.success('Message sent successfully. I\'ll get back to you soon.', {
          duration: 4000,
          style: { background: '#1c2936', color: '#10b981', border: '1px solid #10b98130' },
        });

        setTimeout(() => setFormState('idle'), 3000);
      }
    } catch (error: any) {
      console.error('EmailJS Error Details:', error);
      setFormState('error');
      toast.error(`Failed to send. You can email me directly.`, {
        duration: 4000,
        style: { background: '#1c2936', color: '#ef4444', border: '1px solid #ef444430' },
      });

      setTimeout(() => setFormState('idle'), 3000);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('owolabitestimony7724@gmail.com');
    setCopied(true);
    toast.success('Address copied to clipboard', {
      duration: 2000,
      style: { background: '#1c2936', color: '#0ea5e9', border: '1px solid #0ea5e930' },
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id={SectionId.CONTACT} className="py-28 px-5 md:px-8 border-t border-border/40 bg-surface/20 relative overflow-hidden">
      <Toaster position="bottom-right" />

      {/* Subtle background element */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <MotionWrapper className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <div className="mb-14 reveal">
          <div className="mono-label mb-5 flex items-center gap-2">
            <span className="w-4 h-px bg-primary/50" />
            07 — Contact
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-text-main mb-4" style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}>
            Let's build something<br />meaningful.
          </h2>
          <p className="text-base text-text-muted max-w-xl">
            I'm interested in software engineering roles, intelligent industrial systems, materials technology research, and ambitious technical projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">

          {/* Form */}
          <div className="md:col-span-7 reveal-left">
            <form onSubmit={handleSubmit} className="p-6 md:p-8 rounded-lg border border-border bg-surface/60 corner-marks">
              <div className="mono-label mb-6">Send a message</div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-background/50 border border-border/60 p-3.5 text-sm text-text-main focus:border-primary focus:ring-1 focus:ring-primary/40 focus:bg-background outline-none rounded transition-all peer"
                    placeholder=" "
                  />
                  <label htmlFor="name" className="absolute left-3.5 top-3.5 text-sm font-mono text-text-dim transition-all peer-focus:-top-2 peer-focus:text-[10px] peer-focus:bg-surface peer-focus:px-1 peer-focus:text-primary peer-valid:-top-2 peer-valid:text-[10px] peer-valid:bg-surface peer-valid:px-1">
                     Your name
                   </label>
                </div>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-background/50 border border-border/60 p-3.5 text-sm text-text-main focus:border-primary focus:ring-1 focus:ring-primary/40 focus:bg-background outline-none rounded transition-all peer"
                    placeholder=" "
                  />
                  <label htmlFor="email" className="absolute left-3.5 top-3.5 text-sm font-mono text-text-dim transition-all peer-focus:-top-2 peer-focus:text-[10px] peer-focus:bg-surface peer-focus:px-1 peer-focus:text-primary peer-valid:-top-2 peer-valid:text-[10px] peer-valid:bg-surface peer-valid:px-1">
                     Your email
                   </label>
                </div>
              </div>

              <div className="relative mb-6">
                <textarea
                  id="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-background/50 border border-border/60 p-3.5 text-sm text-text-main focus:border-primary focus:ring-1 focus:ring-primary/40 focus:bg-background outline-none rounded resize-none transition-all peer"
                  placeholder=" "
                ></textarea>
                <label htmlFor="message" className="absolute left-3.5 top-3.5 text-sm font-mono text-text-dim transition-all peer-focus:-top-2 peer-focus:text-[10px] peer-focus:bg-surface peer-focus:px-1 peer-focus:text-primary peer-valid:-top-2 peer-valid:text-[10px] peer-valid:bg-surface peer-valid:px-1">
                  Your message
                </label>
              </div>

              <button
                type="submit"
                disabled={formState === 'submitting'}
                className={`w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded text-sm font-bold font-mono tracking-wider transition-all
                  ${formState === 'success' ? 'bg-secondary/10 border-secondary/40 text-secondary'
                  : formState === 'error' ? 'bg-error/10 border-error/40 text-error'
                  : 'bg-primary/10 border border-primary/30 text-primary hover:bg-primary hover:text-white'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {formState === 'submitting' && (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                )}
                {formState === 'success' && (
                  <>
                    <Check size={16} /> Message sent
                  </>
                )}
                {formState === 'error' && (
                  <>
                    <AlertCircle size={16} /> Failed to send
                  </>
                )}
                {formState === 'idle' && (
                  <>
                    Send message <Send size={14} className="ml-1" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Direct contact info */}
          <div className="md:col-span-5 reveal-right">
            <div className="sticky top-28 space-y-6">
              
              <div className="p-6 border border-border bg-surface/40 rounded-lg">
                <div className="mono-label mb-4 flex items-center gap-2">
                  <Mail size={12} className="text-text-dim" /> Direct Channel
                </div>
                
                <div className="flex flex-col gap-3">
                  <p className="text-sm text-text-muted">For direct inquiries, you can reach me at:</p>
                  
                  <div className="flex items-center gap-2 p-3 bg-background border border-border/60 rounded">
                    <span className="text-xs font-mono text-text-main truncate flex-1">owolabitestimony7724@gmail.com</span>
                    <button
                      onClick={copyEmail}
                      className="text-text-dim hover:text-primary p-1.5 hover:bg-surface rounded transition-all shrink-0"
                      title="Copy to clipboard"
                      aria-label="Copy email address"
                    >
                      {copied ? <Check size={14} className="text-secondary" /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Status block */}
              <div className="p-5 border border-border bg-surface/30 rounded-lg flex items-start gap-3">
                <div className="w-8 h-8 rounded flex items-center justify-center bg-primary/10 border border-primary/20 shrink-0 mt-0.5">
                  <ArrowRight size={14} className="text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text-main mb-1" style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}>Open for Opportunities</h4>
                  <p className="text-xs text-text-muted leading-relaxed">
                    Currently open to discussing software engineering roles and collaborations on industrial tech/Metabotics initiatives.
                  </p>
                </div>
              </div>

              {!isConfigured && (
                 <div className="p-3 border border-warning/20 bg-warning/5 rounded text-[11px] font-mono text-warning flex items-center gap-2">
                   <AlertCircle size={12} /> EmailJS configuration missing.
                 </div>
              )}

            </div>
          </div>

        </div>
      </MotionWrapper>
    </section>
  );
};