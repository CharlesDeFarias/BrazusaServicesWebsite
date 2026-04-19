# Case Study: Como Esse Projeto Foi Construído com Claude + Codex

Esse documento é um relato detalhado de como o projeto foi feito usando Claude e Codex juntos - não só como ferramentas de código, mas como um sistema que foi moldado de propósito ao longo do tempo.

Foi escrito pra um dev que sabe programar mas não é necessariamente por dentro das ferramentas de IA atuais. A ideia é explicar a mecânica real: o que funcionou, o que foi chato, e o que você levaria pra um projeto seu.

---

## Por que esse case study existe

O problema que gerou tudo isso não foi "a IA escreve código ruim." Foi algo mais sutil: a IA se comporta de forma inconsistente entre sessões.

Toda vez que você começa uma conversa nova no Claude, ele não lembra de nada do que foi decidido antes. Cada regra que você estabeleceu, cada constraint de arquitetura, cada "combinamos de não fazer X" - sumiu. Você ou reexplica tudo no começo de cada sessão, ou aceita que a IA vai trabalhar sem esse contexto.

Pra uma tarefa pontual, beleza. Pra um projeto sendo desenvolvido ao longo de semanas, com um sistema em produção e integrações reais, isso é um problema de verdade.

O outro problema: prompting normal é frágil pra decisões críticas. Se você só fala pro Claude "não mexa nos campos do Airtable sem me pedir primeiro," ele vai seguir isso enquanto o contexto estiver ativo. Mas na próxima sessão, sumiu. E mesmo dentro de uma sessão, sob pressão ou quando uma tarefa parece simples, esse tipo de instrução conversacional acaba sendo ignorado.

Esse projeto precisava de algo mais estrutural - não porque as tarefas fossem tecnicamente difíceis, mas porque as constraints precisavam ser aplicadas de forma consistente em muitas sessões, envolvendo integrações em produção com um cliente real pagando.

O Charles também é um dev autodidata que usou esse projeto pra aprender full-stack. As ferramentas de IA não eram só pra ganhar velocidade. Faziam parte de como ele estruturou o processo de aprendizado - recebendo explicações, entendendo tradeoffs, desenvolvendo julgamento sobre arquitetura em vez de só receber código pronto.

---

## Como o sistema funciona

O sistema é construído em camadas. Cada camada tem uma função específica.

**`CLAUDE.md`** - o contrato do projeto. O Claude carrega esse arquivo automaticamente no começo de cada sessão. Contém regras absolutas (constraints que nunca podem ser ignoradas), constraints de arquitetura, e defaults de workflow. A distinção chave é entre regras "sempre" e regras "por padrão" - o Claude sabe quais têm margem de flexibilidade e quais não têm.

Exemplo de regra absoluta: antes de qualquer mudança em rotas de API, campos do Airtable, templates do Resend, ou colunas do Google Sheets - invoca o agente de integration-safety, pega um manifesto do que vai mudar em cada um dos três destinos, e não toca em nenhum arquivo até o Charles confirmar cada mudança explicitamente.

**`CODEX.md`** - um adapter fino. O Codex lê o mesmo contrato de projeto (CLAUDE.md), e esse arquivo explica como aplicá-lo especificamente no Codex. É mantido deliberadamente curto pra evitar que os dois tools divirjam em contratos separados. Se uma regra compartilhada muda, muda no CLAUDE.md - não nos dois arquivos separadamente.

**`docs/decisions.md`** - o contexto de startup voltado pra IA. É aqui que ficam as decisões arquiteturais e de UX bloqueadas. Os dois tools leem esse arquivo no começo de cada sessão. Essa é a solução central pro problema de perda de contexto: decisões tomadas numa sessão são escritas aqui e sobrevivem pra próxima sem precisar reexplicar.

**`docs/session-log.md`** - só pra humanos. É um diário - cronologia, prompts enviados, o que foi aprendido, o que foi frustrante. Nenhuma ferramenta de IA lê esse arquivo no startup. Essa distinção levou algumas sessões pra acertar (mais sobre isso abaixo). O session log é pro Charles, não pra IA.

**`.claude/agents/`** - cinco subagentes do Claude, cada um com uma função. Cada um roda no seu próprio context window com sua própria lista de tools. Dar pra um agente só os tools que ele precisa é aplicação estrutural - o agente de integration-safety não consegue editar arquivos porque não tem acesso de escrita, não só porque você mandou ele não fazer isso.

**`~/.codex/preferences/` e `~/.codex/skills/`** - comportamento reutilizável do Codex em runtime. Cobre estilo de colaboração, estrutura de sessão, política de perguntas, e workflows repetidos como startup de sessão e atualizações de arquivos duráveis. Pra reprodutibilidade, o repo agora espelha a parte relevante dessa configuração em `docs/ai-config-export/codex/`, mas a cópia usada pelo Codex continua morando em `~/.codex/`.

---

## Por que dois tools em vez de um

Essa não foi uma decisão tomada no começo. Emergiu de usar os dois e perceber onde cada um era mais forte.

**Claude** acabou ficando com: governança de design, revisão de copy, raciocínio longo sobre o projeto, auditoria de segurança de integração, crítica de workflow, e qualquer coisa onde julgamento e consistência importam mais que velocidade de execução. O sistema de agentes do Claude - onde você pode dar a um agente uma lista fixa de tools e seleção de modelo - faz dele uma boa escolha pra tarefas que precisam de aplicação estrutural.

**Codex** acabou ficando com: tarefas de implementação delimitadas, execução com consciência do repo, manipulação de arquivos duráveis, e atualizações de sessão. O Codex é mais forte quando a tarefa é "siga essa estrutura definida com precisão" em vez de "interprete isso e decida o que fazer." O sistema de skills e preferências dele também é bem pensado pra workflows reutilizáveis.

**ChatGPT** ficou com geração de copy. Ele tem contexto de negócio e histórico de voz da Brazusa que foram construídos em conversas separadas, e tarefas de copy se beneficiam dessa continuidade.

**Gemini** foi usado ocasionalmente pra uma segunda opinião quando a primeira resposta não parecia certa.

Essa divisão não é uma regra rígida. Tem bastante overlap. Mas ter uma tabela explícita de funções significou que quando uma tarefa claramente pertencia a outro tool, ela era sinalizada e roteada em vez de ser silenciosamente assumida pelo tool que estava aberto.

---

## O loop de melhoria recursiva

Essa é a parte mais diferente do setup.

Os tools foram usados pra melhorar a governança um do outro - não só pra escrever código.

A sequência foi mais ou menos assim: o Claude revisou o sistema de customização do Codex (preferências, skills, adapter CODEX.md) e identificou gaps e inconsistências. O Codex revisou as recomendações do Claude e questionou onde discordava. Os workflows de startup dos dois foram então alinhados através de arquivos duráveis compartilhados. Agentes do Claude e skills do Codex foram atualizados com base no que o outro tool encontrou.

Um exemplo concreto: o Claude recomendou usar um em dash limpo ao corrigir um artefato de encoding num skill file do Codex. O Codex questionou, argumentando que em dashes escritos por LLMs são frágeis e ficam corrompidos - hífens ASCII são mais robustos em arquivos de config de IA. Esse argumento estava certo. O Claude atualizou sua recomendação. A convenção resultante (hífens ASCII em arquivos de IA) agora está no contrato do projeto.

Outro: o Codex adicionou um passo ao seu skill de durable-update pra notação de autoria em sessões mistas. O Claude revisou, encontrou que a linha tinha introduzido um artefato de encoding mojibake, e enviou um prompt corrigido de volta pro Codex.

O resultado é um sistema operacional compartilhado que nenhum dos dois teria feito sozinho. É mais coerente do que qualquer um teria produzido trabalhando isolado.

---

## Os mecanismos concretos que fizeram funcionar

**Restauração do contexto de startup.** Os dois tools têm um workflow de startup que lê `docs/decisions.md` antes de fazer qualquer coisa substancial. Sem isso, cada sessão passa os primeiros minutos reestabelecendo contexto. Com isso, o briefing da sessão fica pronto em menos de um minuto e o trabalho começa de onde parou.

**O gate de integration safety.** Antes de qualquer mudança em rotas de API, campos do Airtable, templates do Resend, ou colunas do Google Sheets - um agente dedicado lê os três destinos, produz um manifesto mostrando exatamente o que vai mudar, e exige confirmação explícita antes de tocar em qualquer arquivo. Esse gate evitou vários potenciais erros de schema em um sistema em produção real. O agente tem acesso só de Glob, Grep e Read - sem acesso de escrita, sem Bash. Ele não consegue fazer estrago por acidente enquanto faz a auditoria.

**Agentes pra aplicação, não só delegação.** O bar de qualidade está codificado nas ferramentas. O agente de copy-review não dá impressões gerais - ele lista violações específicas com texto citado. O agente de integration-safety não só sugere cautela - ele para a sessão até você confirmar. Esses são gates estruturais, não lembretes conversacionais.

**A regra de promoção.** Qualquer coisa durável precisa ser escrita em `docs/decisions.md` antes da sessão acabar. Se uma decisão só existe no session log, ela é invisível pras sessões futuras de IA. O session log é um diário, não um backup do arquivo de decisions.

**Roteamento de modelos.** Regras explícitas sobre qual tarefa vai pra qual tool. Quando uma tarefa claramente pertence a outro tool, o tool atual sinaliza e explica por quê em vez de assumir silenciosamente. Isso evita que os dois tools invadam o domínio um do outro.

**Notação de autoria.** Quando os dois tools contribuíram numa sessão, o session log registra qual tool fez qual parte. Isso parece overhead, mas importa: sessões futuras conseguem distinguir decisões tomadas pelo Claude de decisões tomadas pelo Codex e evitam atribuição errada de raciocínio.

---

## Como o sistema evoluiu

Não foi projetado tudo de uma vez. Evoluiu.

1. **Setup só com Claude** - começou com CLAUDE.md e agentes customizados. Nada de Codex ainda.
2. **Codex adicionado** pra tarefas de implementação delimitadas onde execução com consciência do repo importava.
3. **Adapter CODEX.md criado** - o repo precisava de uma forma de dizer pro Codex como aplicar o contrato de projeto existente sem duplicá-lo.
4. **Comportamento de startup inconsistente identificado** - os dois tools tinham entendimentos diferentes sobre o que ler no começo da sessão. Resolvido tornando `docs/decisions.md` o contexto de startup compartilhado explicitamente.
5. **Arquitetura do session log reformulada** - originalmente o session log era tratado como duplo propósito: referência de decisão pra IA e registro de aprendizado pro Charles. Isso causava confusão sobre o que pertencia onde. A arquitetura final é limpa: session log é só diário humano, decisions.md é o contexto de startup da IA. Levou algumas sessões pra identificar e implementar direito.
6. **Atribuição de funções por modelo tornada explícita** - a divisão entre Claude e Codex foi implícita por um tempo, o que causou os dois assumirem tarefas que pertenciam ao outro às vezes. Escrever a tabela de funções no CLAUDE.md resolveu isso.
7. **Notação de autoria adicionada** - as sessões estavam produzindo decisões que misturavam contribuições do Claude e Codex sem atribuição. Adicionar convenções de notação tornou o registro confiável.
8. **Preferências e skills do Codex refinados** em várias rodadas, muitas vezes com o Claude revisando o output de cada rodada.

---

## O que funcionou bem

**Restauração de contexto.** O workflow de startup é a coisa de maior alavancagem em todo o setup. Começar uma sessão sem ele é visivelmente pior.

**O gate de integration safety.** Num sistema em produção sem ambiente de staging, esse gate não é opcional - é a diferença entre pegar um erro de schema num manifesto e pegar depois de um form submission quebrado.

**Handoffs entre modelos.** Os agentes chatgpt-prep e copy-review tornaram o loop Claude-ChatGPT-Claude confiável. O copy voltava já mapeado pra estrutura de dados do componente. Violações eram pegas antes de qualquer coisa entrar no código.

**Os dois tools se auditando.** O loop de melhoria recursiva produziu correções reais que nenhum tool teria encontrado sozinho. O argumento de encoding do Codex estava certo e mudou a convenção. As correções estruturais do Claude consertaram outputs do Codex várias vezes.

**Aplicação estrutural via agentes.** Os agentes aplicam o bar de qualidade - não só sugerem cautela. O agente de integration-safety para a sessão até você confirmar o manifesto. O agente de copy-review produz uma lista de violações específicas, não uma impressão geral. Isso só funciona porque os agentes têm listas de tools restritas: o agente de integration-safety não consegue editar nada por acidente porque não tem acesso de escrita. Regras escritas como constraints absolutas no CLAUDE.md ("nunca faça X sem Y") funcionam pelo mesmo motivo - deixam menos margem pra interpretação sob pressão do que preferências.

---

## O que foi difícil

**Fragilidade de encoding.** Texto gerado por LLM às vezes contém em dashes UTF-8 que são escritos em arquivos de config como bytes corrompidos - `â€"` em vez de `—`. Encontrar e diagnosticar isso pela primeira vez leva mais tempo do que deveria. A correção é simples (hífens ASCII em arquivos de IA), mas o problema é sutil o suficiente pra sobreviver a várias rodadas de inspeção antes de ser pego. Tem um incidente específico documentado na seção de Problemas Conhecidos.

**Drift de instruções.** Regras escritas num arquivo não se propagam automaticamente pros outros. CLAUDE.md, CODEX.md, AGENTS.md e as preferências do Codex podem divergir se as mudanças não forem aplicadas simetricamente. Isso aconteceu várias vezes e precisou de rodadas de auditoria pra pegar. O princípio do adapter fino (manter CODEX.md curto, manter CLAUDE.md como autoridade) ajuda, mas não elimina o problema.

**Risco de over-optimization.** É fácil gastar uma sessão inteira ajustando o workflow em vez de construir o produto. Existe uma tensão real entre "o sistema operacional ainda não está bom o suficiente" e "para e vai construir alguma coisa." O setup atual tem uma lista de itens adiados parcialmente pra criar um mecanismo de força: se algo foi adiado, fica adiado até o trabalho no produto justificar voltar pra ele.

**Assimetria agente vs. skill.** Agentes do Claude são aplicados estruturalmente - têm listas de tools definidas, um modelo específico, e rodam em context windows isolados. Skills do Codex são governados por prosa - funcionam se o modelo seguir as instruções. São modos de falha diferentes. Agentes podem falhar por serem over-constrained ou terem os tools errados. Skills podem falhar por serem ignorados ou mal lidos. Nenhuma abordagem é estritamente melhor, mas a assimetria significa que o mesmo padrão de workflow se comporta de forma diferente dependendo de qual tool está rodando.

**Conflitos de escrita entre ferramentas.** Ainda não existe protocolo pro que acontece quando os dois tools tentam editar o mesmo arquivo durável na mesma sessão. Atualmente evitado rodando sessões sequencialmente. Está documentado como um gap aberto, não como um problema resolvido. Veja a seção de Problemas Conhecidos.

**Saber quando parar.** Cada hora gasta em infraestrutura de workflow é uma hora não gasta no produto real. O ponto certo pra parar é um julgamento sem resposta limpa. Esse setup foi construído em um projeto real com constraints reais - isso ajudou, porque o trabalho no produto criou pressão natural pra parar de ajustar e começar a construir.

**Arquitetura do session log.** O modelo mental original - session log como duplo propósito, tanto referência pra IA quanto diário humano - era plausível mas estava errado. Criou confusão sobre o que pertencia onde e fez os dois tools às vezes lerem ou escreverem no arquivo errado. Chegar na arquitetura correta (session log só pra humanos; decisions.md é o contexto de startup da IA) precisou de reconhecer o problema, entender por que importava, e então propagar a mudança pelos workflows de startup dos dois tools. Demorou mais do que deveria.

---

## O que levar daqui

Começa com um arquivo de contrato durável. Faz o tool principal ler ele de forma confiável antes de adicionar qualquer outra coisa. Um CLAUDE.md com cinco regras absolutas e três constraints de arquitetura é mais útil do que um guia de estilo de vinte páginas que ninguém lê.

Separa decisões de session logs cedo. Se suas decisões arquiteturais vivem no histórico de chat, elas já são invisíveis pras sessões futuras.

Escreve regras absolutas como regras absolutas. "Prefira X" é ignorado sob pressão. "Nunca faça X sem Y" não é. A distinção importa mais em workflows críticos de segurança.

Codifica gates de segurança nas ferramentas, não na conversa. Um agente que te impede de editar arquivos de integração ao vivo até você confirmar um manifesto vale mais do que uma regra que você precisa lembrar.

Não adiciona o segundo tool até ter uma divisão real de trabalho. Se você está fazendo tudo em um tool e está funcionando, um segundo tool adiciona overhead de coordenação sem agregar valor. O segundo tool foi útil aqui porque havia tarefas genuinamente diferentes que cada um manejava melhor.

Não over-fita cedo demais. Constrói uma feature real, observa o que quebra, depois adiciona a governança que conserta aquela coisa específica. Construir governança antes de ter problemas em produção significa que você está chutando os modos de falha.

Se você usa dois tools juntos, faz eles auditarem um ao outro deliberadamente. O loop de melhoria recursiva não é acidente - exige pedir explicitamente que cada tool revise o output e a configuração do outro.

---

## O que ainda pode ser feito

Não é tudo igual. Alguns itens são imediatos e bloqueadores pra um trabalho limpo no produto. Outros são melhorias de longo prazo que vão fortalecer o sistema mas não são urgentes.

### Ação imediata

- **Commitar as mudanças de governança atuais.** Quatro arquivos estão modificados e sem commit: `AGENTS.md`, `CODEX.md`, `docs/decisions.md`, `docs/session-log.md`. Esses representam o pass de alinhamento Claude/Codex completo e devem ser commitados juntos antes de qualquer trabalho no produto começar.
- **Limpeza de inline styles.** Muitos componentes em `components/clean/` usam `style={{ color: 'var(--color-...)' }}` onde deveria ser uma utility do Tailwind. Tailwind v4 expõe todos os tokens do `@theme` automaticamente. Só valores estáticos - inline styles dinâmicos/condicionais precisam de uma decisão separada.
- **Split de email/telefone no QuoteDrawer.** O campo de contato atualmente é único. A decisão de dividir em campos separados de email e telefone (ambos opcionais, pelo menos um obrigatório) foi tomada. A implementação está bloqueada em rodar o agente de integration-safety primeiro pra produzir um manifesto com Resend, Airtable e Google Sheets.
- **Substituição das imagens do accordion.** Charles precisa re-exportar as imagens do accordion.
- **Lista de cidades da área de atendimento.** Aguardando uma rodada de auditoria no ChatGPT.
- **Contexto de preços dos depoimentos.** Aguardando dados reais do Charles.

### Longo prazo e aspiracional

- **Protocolo pra conflitos de escrita entre ferramentas.** Ainda não existe protocolo pro que acontece quando Claude e Codex tentam escrever no mesmo arquivo durável na mesma sessão. As sessões são sequenciais agora, então não é um problema real ainda. Vai precisar de uma solução quando o uso concorrente ou sobreposto se tornar real.
- **Criar um agente de clean code.** Um agente Claude dedicado pra revisão de qualidade de implementação - convenções de nomenclatura, estrutura de componentes, padrões de TypeScript, organização de helpers. Atualmente essa orientação fica no CLAUDE.md como texto; um agente aplicaria ela no momento da revisão.
- **Criar um agente de otimização de LLM.** Um agente dedicado pra revisar design de prompt, gerenciamento de contexto e eficiência de tokens. O skill charles-codex-optimizer cobre parte disso pro Codex; um equivalente pro lado do Claude completaria o quadro.
- **Links hash compartilháveis pros filter chips de Preços.** Atualmente só scroll in-page; adiado.
- **Refinamento de copy por tipo de cliente no ChatGPT.** As descrições de serviço por cliente ainda não tiveram uma rodada completa de copy.
- **Upload de arquivos no QuoteDrawer.** Fase 1 deve ser email-first, com fallback pro WhatsApp pra arquivos que excedam o limite de anexo do Gmail (~25MB). Sistema com storage de verdade é a Fase 2.
- **Workflow de auditoria periódica de governança.** Conforme o projeto cresce e mais sessões acontecem, os arquivos de governança vão divergir. Um pass de auditoria agendado - lendo todos os arquivos operacionais e verificando inconsistências - pegaria problemas mais cedo. Poderia eventualmente se tornar um agente ou skill dedicado.
- **Versionamento formal do sistema operacional.** Agora não tem marcador de versão no CLAUDE.md ou nas preferências do Codex. Se uma mudança de arquitetura grande for feita, não tem como saber facilmente se uma determinada sessão rodou a versão antiga ou nova. Baixa prioridade agora; importa mais se o sistema ficar complexo o suficiente pra ter breaking changes.

---

## Problemas e incidentes conhecidos

### Incidente de encoding mojibake - Abril 2026

Durante um pass de alinhamento de governança onde Claude e Codex estavam trabalhando no mesmo conjunto de arquivos duráveis, surgiu uma discordância sobre se havia corrupção de encoding no `CODEX.md`.

**O que o Codex reportou:** As linhas 32 e 33 de `CODEX.md` continham mojibake - a sequência de caracteres `â€"` onde deveria aparecer um em dash. O Codex confirmou que era corrupção em nível de conteúdo (o arquivo era UTF-8 válido no geral, mas o em dash tinha sido escrito como bytes já corrompidos, então foram armazenados como três caracteres normais em vez de um). O Codex recomendou uma correção cirúrgica: substituir as duas linhas ruins por hífens ASCII.

**O que o Claude observou:** Lendo o mesmo arquivo, as linhas pareciam limpas - em dashes renderizando corretamente. Um grep pela sequência de mojibake (`â€"`) em todos os arquivos markdown do repo não retornou nenhum resultado.

**O que provavelmente aconteceu:** A corrupção era real em algum momento. Ou o Codex corrigiu durante sua investigação antes de escrever o resumo, ou houve uma diferença em como os tools inspecionam arquivos (o Read tool do Claude pode normalizar certos caracteres que aparecem diferente na inspeção de bytes brutos). Os tools não conseguiram concordar sobre se o problema estava presente porque estavam olhando pra estados diferentes do arquivo, ou usando métodos de inspeção diferentes, sem saber disso.

**Por que isso importa além do incidente específico:** Os dois tools têm capacidades de inspeção diferentes. O Read tool do Claude é otimizado pra renderização - normaliza algumas coisas. O Codex consegue inspecionar num nível mais baixo. Isso significa que problemas sutis de higiene de arquivo podem parecer existir na visão de um tool e não na do outro. A discordância não é nenhum dos dois estando errado - é um gap real de observabilidade entre ferramentas.

**Status atual:** Nenhum mojibake encontrado em nenhum arquivo markdown do repo no pass de verificação final. Considerado resolvido.

**Lição:** Quando um tool encontra uma anomalia em nível de arquivo que o outro não encontra, não descarta nenhum dos dois relatórios. Verifica no nível de caractere/codepoint antes de mudar arquivos. Não faz re-encoding amplo - uma correção cirúrgica de conteúdo nas linhas específicas é o certo. E quando problemas de encoding aparecem em arquivos de config de IA, prefere caracteres ASCII a pontuação Unicode daqui pra frente.

### Gap de conflito de escrita entre ferramentas

Ainda não existe protocolo pro que acontece quando Claude e Codex tentam editar o mesmo arquivo durável na mesma sessão. Atualmente evitado rodando sessões sequencialmente. Documentado em `docs/decisions.md` nos Itens Adiados. Revisitar quando o uso concorrente ou sobreposto se tornar real.

---

## Onde procurar no repo

**No repo:**

- `CLAUDE.md` - as regras que o Claude segue. Lê a seção "Rules: Always" primeiro. O resto do arquivo governa defaults e arquitetura.
- `CODEX.md` - a camada de adapter fina pro Codex. Curta por design.
- `docs/decisions.md` - decisões bloqueadas com racional e constraints. O contexto de startup voltado pra IA.
- `docs/session-log.md` - o diário de sessão voltado pra humanos. Os tools de IA não leem isso no startup.
- `.claude/agents/` - cinco arquivos de subagente. Cada um é autocontido: você consegue ler qualquer um a frio e entender exatamente o que faz, quais tools tem, e o que produz.

**Config do Codex em runtime e espelho no repo:**

Em runtime esses arquivos ficam em `~/.codex/` na máquina do dev e se aplicam a todas as sessões do Codex, não só nesse projeto. Pra facilitar replicação, a parte relevante também foi espelhada no repo em `docs/ai-config-export/codex/`.

- `~/.codex/preferences/charles-core.md` - estilo de colaboração, política de perguntas, defaults de resposta
- `~/.codex/preferences/charles-codex.md` - otimização específica do Codex e estrutura de sessão
- `~/.codex/preferences/charles-llm-workflow.md` - workflow entre modelos, prep de handoff, revisão de output retornado
- `~/.codex/skills/charles-session-start/` - workflow de startup de sessão
- `~/.codex/skills/charles-durable-update/` - wrap-up de sessão e atualizações de arquivos duráveis
- `~/.codex/skills/charles-clean-code/` - qualidade de implementação, nomenclatura, estrutura
- `~/.codex/skills/charles-codex-optimizer/` - revisão de prompt e melhoria de uso do Codex
- `~/.codex/skills/charles-llm-workflow/` - orientação de workflow multi-modelo
