# Brazusa Cleaning — Site

Um site em Next.js para a Brazusa Cleaning, serviço de limpeza profissional baseado na Grande Boston desde 1994. Inclui um backend completo para formulários: pedidos de orçamento e cadastros de newsletter são validados, enviados por email via Resend, salvos no Airtable e salvos no Google Sheets.

**Contato da empresa:**
- Telefone / WhatsApp: [781-686-7189](tel:7816867189)
- Email: [info@brazusa.com](mailto:info@brazusa.com)
- [Google Business Profile](https://maps.app.goo.gl/gvJ4MmpuShUocGB3A)

## Começando

```bash
npm install
npm run dev
```

Abre em [http://localhost:3000/clean](http://localhost:3000/clean).

---

## Screenshots

Pra adicionar screenshots, tira elas em `localhost:3000/clean` e salva em `screenshots/`. Sugestões do que capturar:

### Hero (scroll: 0px)
> Hero navy de 82vh com headline, grid 2x2 de diferenciais, CTA "Get a Free Quote" e botão de telefone.

<!-- Substitui esse comentário por: ![Hero](screenshots/01-hero.png) -->

### Accordion de clientes (scroll: ~720px)
> Seção off-white com o accordion "What kind of space?", layout em duas colunas (STR + Offices | Property + Homes), e a linha coringa "We clean it all!".

<!-- Substitui esse comentário por: ![Client Accordion](screenshots/02-client-accordion.png) -->

### Seção de serviços (scroll: ~1400px)
> Grid navy escuro com seis serviços de limpeza. O truque de border-overflow deixa o grid limpo em todos os tamanhos de tela.

<!-- Substitui esse comentário por: ![Services](screenshots/03-services.png) -->

### Seção de preços
> Seção de pricing com filter chips por tipo de cliente que linkam para os Testimonials.

<!-- Substitui esse comentário por: ![Pricing](screenshots/04-pricing.png) -->

### Seção de contato
> Linha full-width com cards de telefone, email e Google Business. Só contato direto, sem formulário.

<!-- Substitui esse comentário por: ![Quick Contact](screenshots/05-contact.png) -->

### Mobile — menu hamburger aberto
> Menu hamburger expandido: tipos de cliente "Clean my…", links de nav, e botão "Free Quote".

<!-- Substitui esse comentário por: ![Mobile Nav](screenshots/06-mobile-nav.png) -->

### Mobile — barra CTA fixada
> Barra fixa no rodapé com "Get a Free Quote" (abre o drawer) e "Call Now" (link de telefone).

<!-- Substitui esse comentário por: ![Mobile CTA Bar](screenshots/07-mobile-cta-bar.png) -->

### Drawer de orçamento — formulário base
> Bottom sheet: nome, contato, preferência de contato (telefone/SMS/email), card "Add details" expansível, tipo de espaço, notas, upload de arquivo, opções de resultado.

<!-- Substitui esse comentário por: ![Quote Drawer Base](screenshots/08-quote-drawer-base.png) -->

### Drawer de orçamento — detalhes expandidos
> Mesmo drawer com o card "Add details" aberto: quartos, banheiros, nível de limpeza, frequência, áreas de foco.

<!-- Substitui esse comentário por: ![Quote Drawer Detailed](screenshots/09-quote-drawer-detailed.png) -->

---

## Estrutura da Página

| Seção | Componente | Background | Notas |
|---|---|---|---|
| Nav fixada | `StickyNav` | Navy com blur / off-white (ao rolar) | Sempre visível; hamburger no mobile; dropdown "Clean my…" (desktop); link "Contact" |
| Hero | `Hero` | `grain bg-navy` | 82vh; headline, 2x2 diferenciais, subtítulo, CTAs; imagem 4:3 edge-to-edge no mobile |
| Trust strip | `TrustStrip` | `bg-white` | Marquee com 6 selos duplicados no JSX |
| Accordion de clientes | `ClientAccordion` | `bg-off-white` | 2 cols no desktop, 1 col no mobile; linha coringa "We clean it all!" |
| Serviços | `Services` | `grain bg-navy` | Grid de 6 serviços; padrão de borda overflow; CTA no rodapé |
| Preços | `Pricing` | `bg-white` | Filter chips por tipo de cliente; sem tabela de preços fixos |
| Depoimentos | `Testimonials` | `bg-off-white` | 3 cards de case study |
| Área de atendimento | `ServiceArea` | `bg-white` | Cobertura na Grande Boston |
| Sobre | `About` | `bg-off-white` | História da família; foto da equipe (só desktop) |
| Contato | `QuickContact` | `bg-white` | Telefone, email, Google Business — só contato, sem formulário |
| CTA final | `FinalCTA` | `bg-off-white` | Background claro pra contrastar com o footer escuro |
| Footer | `Footer` | `bg-navy` | Logo (invertida), newsletter compact, contato, links de serviços |
| Drawer de orçamento | `QuoteDrawer` | — | Bottom sheet; pré-preenchimento de tipo de espaço; detalhes expansíveis; campos de agendamento |
| Scroll pro topo | `ScrollToTop` | — | Botão dourado; some quando o drawer está aberto |
| Barra CTA mobile | `MobileCTABar` | `bg-navy` / `bg-off-white` | Fixada no rodapé (só mobile); some quando o drawer está aberto |

Todos os componentes ficam em `components/clean/`. O ponto de entrada da página é `app/clean/page.tsx`.

---

## StickyNav

- Fixada no topo, sempre visível (sem intersection observer)
- **Estado escuro** (sem scroll): background navy com blur, texto branco, logo em pill branco
- **Estado claro** (após rolar 80px): background off-white, texto escuro, logo normal
- **Desktop:** dropdown "Clean my…" com quatro tipos de cliente + "Something else"; links de nav padrão; botão CTA "Free Quote"
- **Mobile:** hamburger (animado pra ×); painel dropdown mostra tipos de cliente, links de nav e botão "Free Quote"

---

## Funcionalidades do Drawer de Orçamento

- **Métodos de contato:** Ligação, SMS ou Email — campos separados de email e telefone (pelo menos um obrigatório)
- **Card "Add details":** Expansível — quartos, banheiros, nível de limpeza, frequência, áreas de foco
- **Upload de arquivo:** Inline abaixo da área de notas
- **Lembrete de orçamento aproximado:** Selecionar "I'd like a rough quote" mostra um lembrete de detalhes
- **Pré-preenchimento do tipo de espaço:** "Get a Free Quote" em qualquer linha do accordion ou no dropdown da nav já preenche o tipo de espaço
- **Tipo "Other":** Inclui uma nota sobre adaptabilidade; ativado pela opção "Something else" da nav e pela linha "We clean it all!" do accordion

---

## Experiência Mobile

- Hamburger com animação de barras-para-× na nav
- Barra "Get a Free Quote" + "Call Now" fixada no rodapé (some quando o drawer está aberto)
- Todos os alvos de toque com mínimo de 44px
- Imagem do hero full-bleed (edge-to-edge) na proporção 4:3 no mobile
- `overflow-x-hidden` no body evita scroll horizontal em todos os tamanhos

---

## Newsletter

O opt-in de newsletter fica embutido no **Footer** como uma faixa compacta (campo de email + campo SMS opcional + botão Subscribe). Não é uma seção separada da página.

---

## Arquitetura do Backend

Os formulários do site batem em duas rotas de API do Next.js:

| Rota | Componente | O que faz |
|---|---|---|
| `POST /api/quote` | `QuoteDrawer` | Valida, depois roda 3 integrações em paralelo |
| `POST /api/newsletter` | Faixa de newsletter no footer | Valida, depois roda 3 integrações em paralelo |

Cada rota roda três coisas ao mesmo tempo (via `Promise.all`):
1. **Resend** — manda um email de notificação pra `cddefari@gmail.com`
2. **Airtable** — grava uma linha na base da Brazusa Cleaning
3. **Google Sheets** — adiciona uma linha na planilha da Brazusa Cleaning

O backend foi feito pra ser multi-cliente. Cada cliente (Brazusa Cleaning e futuros clientes) tem um arquivo de config em `lib/clients/`. Adicionar um novo cliente é só criar um arquivo de config e registrar — o código de integração é compartilhado.

```
QuoteDrawer / Newsletter footer
        |  POST
        ↓
app/api/quote/route.ts
app/api/newsletter/route.ts
        |
        ├── lib/integrations/resend.ts        → email pro dono
        ├── lib/integrations/airtable.ts      → linha no Airtable
        └── lib/integrations/google-sheets.ts → linha no Google Sheets
```

---

## Variáveis de Ambiente

Copia `.env.example` pra `.env.local` na raiz do projeto e preenche com os valores reais:

```bash
cp .env.example .env.local
```

| Variável | Onde conseguir |
|---|---|
| `RESEND_API_KEY` | resend.com → API Keys → Create API Key |
| `AIRTABLE_API_TOKEN` | airtable.com/create/tokens |
| `GOOGLE_SERVICE_ACCOUNT_KEY` | JSON da conta de serviço em Base64 (Google Cloud) |
| `BRAZUSA_CLEANING_NOTIFICATION_EMAIL` | Email que recebe as notificações de orçamento |
| `BRAZUSA_CLEANING_AIRTABLE_BASE_ID` | Da URL do Airtable: `airtable.com/appXXXXXX/...` |
| `BRAZUSA_CLEANING_SHEET_ID` | Da URL do Google Sheets: `spreadsheets/d/XXXXXXXXX/edit` |

`.env.local` está no gitignore. Nunca commita esse arquivo.

---

## Testes

```bash
npm test            # roda todos os testes uma vez
npm run test:watch  # reroda quando arquivos mudam
```

Testes usam [Vitest](https://vitest.dev/). Os arquivos de teste ficam ao lado do código que testam (ex: `lib/validators/quote.test.ts`). Todos os serviços externos (Resend, Airtable, Google Sheets) são mockados nos testes — nenhuma chamada real de API é feita.

---

## Stack

- **Next.js 16** (App Router, geração estática)
- **Tailwind CSS v4**
- **TypeScript**
- **Fontes:** Cormorant Garamond (display/itálico) + Syne (UI/números)
- **Imagens:** `next/image` com blur placeholder em todas as imagens de conteúdo
- **Email:** Resend SDK (pacote `resend`)
- **Armazenamento de leads:** Airtable REST API (fetch nativo, sem biblioteca)
- **Backup de leads:** Google Sheets API (pacote `googleapis`, autenticação via service account)
- **Testes:** Vitest

---

## Tokens de Design

| Token | Valor | Uso |
|---|---|---|
| Navy | `#0B1D2E` | Background principal, texto, botões |
| Off-white | `#F2EDE6` | Backgrounds de seção, nav com scroll |
| Gold | `#C49A44` | Linhas de destaque, números, estados hover |
| Blue | `#2DAAE1` | Botões CTA principais |
| Border | `#D8D0C6` | Divisores de seção, bordas de card |

---

## Assets

| Arquivo | Propósito |
|---|---|
| `public/brand/logo.jpg` | Logo da Brazusa Cleaning (JPG, fundo branco) |
| `public/images/hero.png` | Foto da seção hero |
| `public/images/str.png` | Foto do accordion STR |
| `public/images/property.png` | Foto do accordion Property |
| `public/images/office.png` | Foto do accordion Office |
| `public/images/home.png` | Foto do accordion Home |
| `public/images/team.png` | Foto da equipe na seção About |
| `public/favicons/*` | Set de favicons (16, 32, 96px) |

---

## Fora do Escopo (build atual)

- Implementação do hub principal (`/`)
- Páginas de serviço além das rotas já scaffoldadas
- Upload de arquivos no QuoteDrawer (Fase 2)
- Valores reais de preço
- Depoimentos reais
- Analytics / tracking
- Notificações por SMS
- Dashboard administrativo ou CRM

---

## Como Isso Foi Construído com Claude + Codex

O projeto foi feito usando Claude e Codex juntos como um sistema - não só como ferramentas de código, mas como ferramentas que foram moldadas e auditadas uma contra a outra ao longo do tempo.

A versão curta: os dois têm um contrato de projeto compartilhado (`CLAUDE.md`) e um arquivo de contexto de startup (`docs/decisions.md`) que leem no começo de cada sessão. Isso resolve o problema de perda de contexto - decisões arquiteturais de uma sessão sobrevivem pra próxima sem precisar reexplicar tudo. Cinco subagentes customizados do Claude aplicam gates de qualidade de forma estrutural (o agente de integration-safety não consegue editar arquivos porque literalmente não tem acesso de escrita). O Codex tem seus próprios arquivos de preferência e skill fora do repo que carregam o mesmo estilo de trabalho em todas as sessões.

A parte mais interessante: os dois foram usados pra revisar e melhorar a configuração um do outro. O Claude auditou os skill files do Codex. O Codex questionou recomendações do Claude. Os workflows de startup dos dois foram então alinhados através de arquivos duráveis compartilhados. O resultado é um sistema operacional compartilhado que nenhum dos dois teria feito sozinho.

O case study completo - as camadas do sistema, por que dois tools em vez de um, como foi o loop de melhoria recursiva, o que funcionou, o que foi difícil, e o que você pode roubar pra usar nos seus projetos - está em [`docs/ai-case-study.md`](../ai-case-study.md) (ou na versão em português em [`docs/forVitor/ai-case-study.md`](ai-case-study.md)).
