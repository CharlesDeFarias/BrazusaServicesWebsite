// ─────────────────────────────────────────────────────────────────────────
// Nurse Aloane preview is TEMPORARILY DISABLED.
// The full site is preserved (commented out) at the bottom of this file.
// To restore it: uncomment the imports + the original return block, and
// delete the placeholder message component below.
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
  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-20">
      <p className="max-w-2xl text-center font-na-display text-2xl italic leading-snug text-na-forest sm:text-3xl">
        When sending a two second text is too annoying so you let somebody else
        waste their time on and effort instead of you
      </p>
    </div>
  )
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
