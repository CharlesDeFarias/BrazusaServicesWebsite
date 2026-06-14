'use client'

import { useLanguage } from '@/components/nurse-aloane/LanguageProvider'
import { whatsappLink } from '@/lib/nurse-aloane/helpers/whatsapp-link'

/**
 * Persistent floating WhatsApp CTA — always visible bottom-right.
 * This is Aloane's primary call-to-action.
 */
export default function WhatsAppButton() {
  const { t } = useLanguage()

  return (
    <a
      href={whatsappLink(t.whatsapp.defaultMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.whatsapp.float}
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-full bg-na-whatsapp py-3 pl-3 pr-4 text-white shadow-lg shadow-na-forest/30 transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 sm:bottom-7 sm:right-7"
    >
      <span className="relative flex h-7 w-7 items-center justify-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-white/40 opacity-75" />
        <svg className="relative h-7 w-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M17.5 14.4c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.6.2-.2.3-.7.8-.8 1-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.5-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.2-.6-1.5-.9-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1 2.7c.1.2 1.8 2.8 4.4 3.9.6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2 0-.1-.2-.2-.5-.3Z" />
          <path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-2.9.8.8-2.8-.2-.3A8.2 8.2 0 1 1 12 20.2Z" />
        </svg>
      </span>
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium opacity-0 transition-all duration-300 group-hover:max-w-[12rem] group-hover:opacity-100">
        {t.whatsapp.float}
      </span>
    </a>
  )
}
