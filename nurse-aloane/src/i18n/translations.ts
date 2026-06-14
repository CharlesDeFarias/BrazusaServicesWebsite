/**
 * All site copy lives here, in English (en) and Brazilian Portuguese (pt).
 * To edit text, change it in BOTH languages so the toggle stays in sync.
 *
 * NOTE: This is original placeholder copy meant for review/customization.
 * Aloane should replace it with her real voice, offers and disclaimers.
 */

export type Lang = 'en' | 'pt'

export interface ServiceCopy {
  name: string
  description: string
}

export interface Translation {
  nav: {
    about: string
    services: string
    whyme: string
    reviews: string
    contact: string
    book: string
  }
  hero: {
    eyebrow: string
    title: string
    subtitle: string
    description: string
    primaryCta: string
    secondaryCta: string
    stat1: string
    stat1label: string
    stat2: string
    stat2label: string
    stat3: string
    stat3label: string
  }
  about: {
    eyebrow: string
    title: string
    paragraphs: string[]
    signature: string
    credentials: string[]
  }
  services: {
    eyebrow: string
    title: string
    intro: string
    items: ServiceCopy[]
    note: string
  }
  why: {
    eyebrow: string
    title: string
    items: { title: string; body: string }[]
  }
  reviews: {
    eyebrow: string
    title: string
    items: { quote: string; author: string; detail: string }[]
  }
  contact: {
    eyebrow: string
    title: string
    description: string
    form: {
      name: string
      phone: string
      service: string
      servicePlaceholder: string
      message: string
      messagePlaceholder: string
      submit: string
    }
    or: string
    whatsappCta: string
    locationLabel: string
    hoursLabel: string
    hours: string
  }
  footer: {
    tagline: string
    nav: string
    follow: string
    disclaimer: string
    rights: string
  }
  whatsapp: {
    float: string
    defaultMessage: string
  }
}

export const translations: Record<Lang, Translation> = {
  en: {
    nav: {
      about: 'About',
      services: 'Services',
      whyme: 'Why Aloane',
      reviews: 'Reviews',
      contact: 'Contact',
      book: 'Book on WhatsApp',
    },
    hero: {
      eyebrow: 'Certified Nurse Injector · Greater Boston',
      title: 'Nurse Aloane',
      subtitle: 'Natural results, refined by a nurse who listens.',
      description:
        'Personalized aesthetic and wellness treatments — Botox, fillers, PRP, vitamins, peptides and medical weight loss — delivered with a careful, clinical touch.',
      primaryCta: 'Book on WhatsApp',
      secondaryCta: 'Explore treatments',
      stat1: '5★',
      stat1label: 'Client rated',
      stat2: 'Certified',
      stat2label: 'Nurse Injector',
      stat3: 'Boston',
      stat3label: 'Greater area',
    },
    about: {
      eyebrow: 'Meet your injector',
      title: 'Care that begins with a conversation',
      paragraphs: [
        'I’m Aloane, a certified nurse injector serving the Greater Boston area. My approach is simple: understand what you actually want, then create a plan that enhances your features without erasing what makes you, you.',
        'Every treatment starts with a real consultation — your goals, your anatomy, your comfort. From subtle tweaks to full refreshes, the goal is always results that look like you on your best day.',
      ],
      signature: 'Aloane',
      credentials: [
        'Certified Nurse Injector',
        'Botox · Fillers · Kybella',
        'PRP · Collagen biostimulators',
        'Vitamins · Peptides · Weight loss',
      ],
    },
    services: {
      eyebrow: 'Treatments',
      title: 'What I offer',
      intro:
        'A focused menu of aesthetic and wellness treatments. Not sure where to start? Message me and we’ll build a plan together.',
      items: [
        { name: 'Botox & Neuromodulators', description: 'Soften fine lines and prevent new ones with precise, natural-looking placement.' },
        { name: 'Dermal Fillers', description: 'Restore volume and definition to lips, cheeks and jawline — balanced to your face.' },
        { name: 'Kybella', description: 'Targeted treatment to reduce stubborn fullness under the chin.' },
        { name: 'PRP Therapy', description: 'Platelet-rich plasma to refresh skin and support natural collagen.' },
        { name: 'Collagen Biostimulators', description: 'Stimulate your own collagen for gradual, long-lasting firmness.' },
        { name: 'Vitamins & IV Wellness', description: 'Energy, hydration and immune support through tailored vitamin blends.' },
        { name: 'Peptides', description: 'Science-backed peptide protocols for skin, recovery and overall wellness.' },
        { name: 'Medical Weight Loss', description: 'Physician-aligned weight management, including modern GLP-1 options.' },
      ],
      note: 'All treatments require a consultation. Eligibility is assessed individually.',
    },
    why: {
      eyebrow: 'Why Aloane',
      title: 'A different kind of aesthetics experience',
      items: [
        { title: 'Nurse-led, clinical care', body: 'Treatments performed by a certified nurse injector — safety and technique first, always.' },
        { title: 'Natural over noticeable', body: 'I tailor every plan to enhance, not overwhelm. You should look refreshed, never “done.”' },
        { title: 'Honest guidance', body: 'If a treatment isn’t right for you, I’ll tell you. No pressure, no upselling.' },
        { title: 'Easy to reach', body: 'Questions, scheduling and follow-ups happen simply over WhatsApp.' },
      ],
    },
    reviews: {
      eyebrow: 'Kind words',
      title: 'What clients say',
      items: [
        { quote: 'She actually listened to what I wanted. Results look completely natural and I feel like myself.', author: 'Sample Client', detail: 'Botox · Greater Boston' },
        { quote: 'The most comfortable I’ve ever felt at an appointment. Gentle, thorough and honest.', author: 'Sample Client', detail: 'Fillers' },
        { quote: 'Booking over WhatsApp was so easy and she answered all my questions before I came in.', author: 'Sample Client', detail: 'Vitamins & Wellness' },
      ],
    },
    contact: {
      eyebrow: 'Get started',
      title: 'Let’s talk about your goals',
      description:
        'Send a message and I’ll get back to you personally. Tell me a little about what you’re looking for and we’ll take it from there.',
      form: {
        name: 'Your name',
        phone: 'Phone or WhatsApp',
        service: 'Treatment of interest',
        servicePlaceholder: 'Select a treatment',
        message: 'Message',
        messagePlaceholder: 'Tell me what you’d like to achieve…',
        submit: 'Send via WhatsApp',
      },
      or: 'or',
      whatsappCta: 'Message me on WhatsApp',
      locationLabel: 'Location',
      hoursLabel: 'Hours',
      hours: 'By appointment · Greater Boston',
    },
    footer: {
      tagline: 'Certified Nurse Injector · Greater Boston',
      nav: 'Explore',
      follow: 'Follow',
      disclaimer:
        'Results vary by individual. This site is for informational purposes only and is not medical advice. All treatments are subject to consultation and eligibility.',
      rights: 'All rights reserved.',
    },
    whatsapp: {
      float: 'Chat on WhatsApp',
      defaultMessage: 'Hi Aloane! I found your website and I’d love to learn more about your treatments.',
    },
  },

  pt: {
    nav: {
      about: 'Sobre',
      services: 'Serviços',
      whyme: 'Por que a Aloane',
      reviews: 'Avaliações',
      contact: 'Contato',
      book: 'Agendar no WhatsApp',
    },
    hero: {
      eyebrow: 'Enfermeira Injetora Certificada · Grande Boston',
      title: 'Nurse Aloane',
      subtitle: 'Resultados naturais, no cuidado de uma enfermeira que escuta.',
      description:
        'Tratamentos estéticos e de bem-estar personalizados — Botox, preenchimentos, PRP, vitaminas, peptídeos e emagrecimento médico — com um toque clínico e cuidadoso.',
      primaryCta: 'Agendar no WhatsApp',
      secondaryCta: 'Ver tratamentos',
      stat1: '5★',
      stat1label: 'Avaliação',
      stat2: 'Certificada',
      stat2label: 'Enfermeira Injetora',
      stat3: 'Boston',
      stat3label: 'Região metropolitana',
    },
    about: {
      eyebrow: 'Conheça sua injetora',
      title: 'Um cuidado que começa por uma conversa',
      paragraphs: [
        'Sou a Aloane, enfermeira injetora certificada atendendo a região da Grande Boston. Minha proposta é simples: entender o que você realmente deseja e criar um plano que valorize suas características sem apagar o que faz você ser você.',
        'Todo tratamento começa com uma consulta de verdade — seus objetivos, sua anatomia, seu conforto. De ajustes sutis a renovações completas, o objetivo é sempre um resultado que pareça você no seu melhor dia.',
      ],
      signature: 'Aloane',
      credentials: [
        'Enfermeira Injetora Certificada',
        'Botox · Preenchimentos · Kybella',
        'PRP · Bioestimuladores de colágeno',
        'Vitaminas · Peptídeos · Emagrecimento',
      ],
    },
    services: {
      eyebrow: 'Tratamentos',
      title: 'O que eu ofereço',
      intro:
        'Um menu enxuto de tratamentos estéticos e de bem-estar. Não sabe por onde começar? Me chame e montamos um plano juntas.',
      items: [
        { name: 'Botox & Neuromoduladores', description: 'Suaviza linhas de expressão e previne novas, com aplicação precisa e natural.' },
        { name: 'Preenchimentos', description: 'Devolve volume e definição a lábios, maçãs do rosto e mandíbula — em harmonia com seu rosto.' },
        { name: 'Kybella', description: 'Tratamento direcionado para reduzir a gordura localizada sob o queixo.' },
        { name: 'Terapia com PRP', description: 'Plasma rico em plaquetas para renovar a pele e estimular o colágeno natural.' },
        { name: 'Bioestimuladores de Colágeno', description: 'Estimula seu próprio colágeno para firmeza gradual e duradoura.' },
        { name: 'Vitaminas & Soroterapia', description: 'Energia, hidratação e imunidade com combinações de vitaminas personalizadas.' },
        { name: 'Peptídeos', description: 'Protocolos de peptídeos com base científica para pele, recuperação e bem-estar.' },
        { name: 'Emagrecimento Médico', description: 'Acompanhamento de emagrecimento com respaldo médico, incluindo opções modernas (GLP-1).' },
      ],
      note: 'Todos os tratamentos exigem consulta. A elegibilidade é avaliada individualmente.',
    },
    why: {
      eyebrow: 'Por que a Aloane',
      title: 'Uma experiência estética diferente',
      items: [
        { title: 'Cuidado clínico, de enfermeira', body: 'Tratamentos realizados por uma enfermeira injetora certificada — segurança e técnica sempre em primeiro lugar.' },
        { title: 'Natural acima de tudo', body: 'Cada plano é feito para valorizar, não exagerar. Você sai renovada, nunca artificial.' },
        { title: 'Orientação honesta', body: 'Se um tratamento não for ideal para você, eu vou te dizer. Sem pressão, sem empurrar serviços.' },
        { title: 'Fácil de falar comigo', body: 'Dúvidas, agendamentos e retornos acontecem de forma simples pelo WhatsApp.' },
      ],
    },
    reviews: {
      eyebrow: 'Palavras carinhosas',
      title: 'O que as clientes dizem',
      items: [
        { quote: 'Ela realmente escutou o que eu queria. O resultado ficou super natural e me sinto eu mesma.', author: 'Cliente (exemplo)', detail: 'Botox · Grande Boston' },
        { quote: 'A consulta mais confortável que já tive. Delicada, atenciosa e honesta.', author: 'Cliente (exemplo)', detail: 'Preenchimento' },
        { quote: 'Agendar pelo WhatsApp foi muito fácil e ela tirou todas as minhas dúvidas antes.', author: 'Cliente (exemplo)', detail: 'Vitaminas & Bem-estar' },
      ],
    },
    contact: {
      eyebrow: 'Comece agora',
      title: 'Vamos falar sobre seus objetivos',
      description:
        'Me envie uma mensagem e eu respondo pessoalmente. Conte um pouco sobre o que você procura e seguimos a partir daí.',
      form: {
        name: 'Seu nome',
        phone: 'Telefone ou WhatsApp',
        service: 'Tratamento de interesse',
        servicePlaceholder: 'Selecione um tratamento',
        message: 'Mensagem',
        messagePlaceholder: 'Conte o que você gostaria de alcançar…',
        submit: 'Enviar pelo WhatsApp',
      },
      or: 'ou',
      whatsappCta: 'Falar no WhatsApp',
      locationLabel: 'Localização',
      hoursLabel: 'Horários',
      hours: 'Com hora marcada · Grande Boston',
    },
    footer: {
      tagline: 'Enfermeira Injetora Certificada · Grande Boston',
      nav: 'Navegar',
      follow: 'Seguir',
      disclaimer:
        'Os resultados variam de pessoa para pessoa. Este site tem caráter informativo e não substitui orientação médica. Todos os tratamentos estão sujeitos a consulta e avaliação.',
      rights: 'Todos os direitos reservados.',
    },
    whatsapp: {
      float: 'Falar no WhatsApp',
      defaultMessage: 'Oi Aloane! Encontrei seu site e gostaria de saber mais sobre seus tratamentos.',
    },
  },
}
