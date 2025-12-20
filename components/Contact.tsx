import React, { useState } from 'react';
import { SectionId } from '../types';
import { SectionHeading } from './ui/SectionHeading';
import { Mail, Send, CheckCircle, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Contact: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [copied, setCopied] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');

    // Construct mailto link
    const subject = encodeURIComponent(`Portfolio Contact: ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    const mailtoLink = `mailto:owolabitestimony7724@gmail.com?subject=${subject}&body=${body}`;

    // Open default mail client
    window.location.href = mailtoLink;

    // Reset UI state
    setTimeout(() => {
      setFormState('success');
      setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('owolabitestimony7724@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id={SectionId.CONTACT} className="py-24 relative overflow-hidden">
       {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <SectionHeading 
          title="Let's Build & Secure" 
          subtitle="Whether it's building a new platform or securing an existing one, I'm ready to help."
          centered
        />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-surface/50 backdrop-blur-sm border border-border p-8 md:p-10 rounded-2xl shadow-2xl"
        >
          {formState === 'success' ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 text-green-500 mb-6">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Redirecting to Email...</h3>
              <p className="text-text-muted mb-8">Your email client should have opened. If not, you can copy my email below.</p>
              <button 
                onClick={() => setFormState('idle')}
                className="text-primary hover:text-primaryGlow text-sm font-medium"
              >
                Show form again
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-text-muted">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-text-muted">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-text-muted">Message</label>
                <textarea 
                  id="message" 
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>

              <button 
                type="submit"
                disabled={formState === 'submitting'}
                className="w-full bg-white text-black font-bold py-4 rounded-lg hover:bg-gray-200 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group"
              >
                {formState === 'submitting' ? (
                  <span className="animate-pulse">Opening Mail Client...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>

        <div className="mt-12 flex justify-center">
           <div className="inline-flex items-center gap-4 px-6 py-3 bg-surface/30 rounded-full border border-border/50 hover:border-primary/30 transition-colors">
             <div className="flex items-center gap-3 text-text-muted">
                <Mail size={18} />
                <span className="text-sm">owolabitestimony7724@gmail.com</span>
             </div>
             <button 
               onClick={copyEmail}
               className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-white relative"
               aria-label="Copy email"
             >
               {copied ? <CheckCircle size={16} className="text-green-500" /> : <Copy size={16} />}
             </button>
           </div>
        </div>
      </div>
    </section>
  );
};