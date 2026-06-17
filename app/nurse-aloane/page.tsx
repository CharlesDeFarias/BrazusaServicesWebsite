import { notFound } from 'next/navigation'

// ─────────────────────────────────────────────────────────────────────────
// Nurse Aloane preview is HIDDEN. The route responds as a non-existent page
// (HTTP 404) — nothing is rendered to visitors.
//
// No work was lost: all components live in components/nurse-aloane/, copy in
// lib/nurse-aloane/, and the original page composition is preserved below.
//
// To bring the site back: delete the `notFound()` call, uncomment the imports
// and the original return block.
// ─────────────────────────────────────────────────────────────────────────

// import Header from '@/components/nurse-aloane/Header'
// import Hero from '@/components/nurse-aloane/Hero'
// import About from '@/components/nurse-aloane/About'
// import Services from '@/components/nurse-aloane/Services'
// import WhyChoose from '@/components/nurse-aloane/WhyChoose'
// import Testimonials from '@/components/nurse-aloane/Testimonials'
// import Contact from '@/components/nurse-aloane/Contact'
// import Footer from '@/components/nurse-aloane/Footer'
// import WhatsAppButton from '@/components/nurse-aloane/WhatsAppButton'

export default function NurseAloanePage() {
  notFound()
}

/* ===== ORIGINAL NURSE ALOANE SITE — DISABLED (uncomment to restore) =====
export default function NurseAloanePage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <WhyChoose />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
========================================================================= */
