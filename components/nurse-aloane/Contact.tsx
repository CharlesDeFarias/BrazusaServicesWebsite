'use client'

import { useState, type FormEvent, type ReactNode } from 'react'
import { useLanguage } from '@/components/nurse-aloane/LanguageProvider'
import Reveal from '@/components/nurse-aloane/Reveal'
import { site } from '@/lib/nurse-aloane/site'
import { whatsappLink } from '@/lib/nurse-aloane/helpers/whatsapp-link'

export default function Contact() {
  const { t } = useLanguage()
  const c = t.contact
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [service, setService] = useState('')
  const [message, setMessage] = useState('')

  // No backend: compose a WhatsApp message from the form and open the chat.
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const lines = [
      `${c.form.name}: ${name || '—'}`,
      `${c.form.phone}: ${phone || '—'}`,
      `${c.form.service}: ${service || '—'}`,
      '',
      message,
    ]
    window.open(whatsappLink(lines.join('\n')), '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="contact" className="na-grain relative overflow-hidden bg-na-forest py-24 text-na-ivory sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-na-moss/30 blur-3xl"
      />
      <div className="na-container relative grid gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:items-start">
        {/* Intro + direct contact */}
        <div>
          <Reveal as="p" className="na-eyebrow !text-na-champagne">
            {c.eyebrow}
          </Reveal>
          <Reveal as="h2" delay={0.05} className="mt-4 font-na-display text-4xl font-medium leading-tight sm:text-5xl">
            {c.title}
          </Reveal>
          <Reveal as="p" delay={0.1} className="mt-5 max-w-md text-lg leading-relaxed text-na-ivory/70">
            {c.description}
          </Reveal>

          <Reveal delay={0.16} className="mt-9 space-y-5">
            <a
              href={whatsappLink(t.whatsapp.defaultMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-na-whatsapp px-6 py-3.5 font-medium text-white transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <WhatsAppGlyph />
              {c.whatsappCta}
            </a>

            <div className="grid grid-cols-2 gap-6 pt-2">
              <div>
                <p className="text-[0.65rem] uppercase tracking-na-eyebrow text-na-champagne">{c.locationLabel}</p>
                <p className="mt-1 text-na-ivory/85">{site.location.label}</p>
              </div>
              <div>
                <p className="text-[0.65rem] uppercase tracking-na-eyebrow text-na-champagne">{c.hoursLabel}</p>
                <p className="mt-1 text-na-ivory/85">{c.hours}</p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Info-gathering form */}
        <Reveal delay={0.1}>
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-na-ivory/15 bg-na-ivory/5 p-7 backdrop-blur-sm sm:p-9"
          >
            <div className="space-y-5">
              <Field label={c.form.name}>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="na-form-input"
                />
              </Field>
              <Field label={c.form.phone}>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="na-form-input"
                />
              </Field>
              <Field label={c.form.service}>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="na-form-input"
                >
                  <option value="">{c.form.servicePlaceholder}</option>
                  {t.services.items.map((s) => (
                    <option key={s.name} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label={c.form.message}>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  placeholder={c.form.messagePlaceholder}
                  className="na-form-input resize-none"
                />
              </Field>
            </div>

            <button
              type="submit"
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-na-champagne px-7 py-4 text-sm font-medium tracking-wide text-na-forest transition-all duration-300 hover:bg-na-ivory active:scale-[0.99]"
            >
              <WhatsAppGlyph className="h-4 w-4" />
              {c.form.submit}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  )
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-na-ivory/60">
        {label}
      </span>
      {children}
    </label>
  )
}

function WhatsAppGlyph({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.5 14.4c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.6.2-.2.3-.7.8-.8 1-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.5-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.2-.6-1.5-.9-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1 2.7c.1.2 1.8 2.8 4.4 3.9.6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2 0-.1-.2-.2-.5-.3Z" />
      <path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-2.9.8.8-2.8-.2-.3A8.2 8.2 0 1 1 12 20.2Z" />
    </svg>
  )
}
