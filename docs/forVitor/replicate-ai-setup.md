# Como Replicar o Setup de IA Desse Projeto

Esse guia é a versão prática e direta pra você pegar o setup de IA desse repo e fazer rodar na sua máquina sem ter que adivinhar onde cada coisa vai.

Se quiser entender o "por quê" por trás do sistema, lê também:
- [`README.md`](README.md)
- [`ai-case-study.md`](ai-case-study.md)
- [`../ai-config-export/INDEX.md`](../ai-config-export/INDEX.md)

Esse arquivo aqui é mais "faz isso, depois isso".

---

## O que está no repo

Hoje o repo guarda duas partes do sistema:

1. **Claude**
- Os agentes ficam em `.claude/agents/`
- Isso já está dentro do projeto
- Clonou o repo, já veio junto

2. **Codex**
- O Codex continua lendo config em `~/.codex/` na máquina
- Mas a cópia de referência agora está no repo em `docs/ai-config-export/codex/`

Então pensa assim:
- **repo = fonte de verdade**
- **`~/.codex/` = lugar onde o Codex realmente roda**

---

## O que você precisa copiar

### Claude

Nada especial além de clonar o repo.

Os agentes que interessam estão aqui:
- `.claude/agents/session-start.md`
- `.claude/agents/design-review.md`
- `.claude/agents/chatgpt-prep.md`
- `.claude/agents/copy-review.md`
- `.claude/agents/integration-safety.md`

### Codex

Você vai copiar estas pastas do repo pra sua pasta global do Codex:
- `docs/ai-config-export/codex/preferences/`
- `docs/ai-config-export/codex/skills/`
- `docs/ai-config-export/codex/meta/`

E vai usar `docs/ai-config-export/codex/config.toml` como base, mas **não** copiar cegamente porque ele tem caminhos absolutos da máquina do Charles.

---

## Passo a passo no Windows

### 1. Clona o repo

```powershell
git clone <repo-url>
cd claudecoding
```

### 2. Cria as pastas do Codex se não existirem

```powershell
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.codex\preferences"
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.codex\skills"
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.codex\meta"
```

### 3. Copia preferences, skills e meta

```powershell
Copy-Item docs\ai-config-export\codex\preferences\* "$env:USERPROFILE\.codex\preferences\" -Force
Copy-Item docs\ai-config-export\codex\skills\* "$env:USERPROFILE\.codex\skills\" -Recurse -Force
Copy-Item docs\ai-config-export\codex\meta\* "$env:USERPROFILE\.codex\meta\" -Force
```

### 4. Cria seu `config.toml`

Usa `docs/ai-config-export/codex/config.toml` como referência, mas troca os caminhos.

Exemplo:

```toml
project_doc_max_bytes = 131072
project_doc_fallback_filenames = ["CLAUDE.md", "GEMINI.md", "TEAM_GUIDE.md", ".agents.md"]

[features]
memories = true

[windows]
sandbox = "elevated"

[projects.'C:\SEU\CAMINHO\REAL\claudecoding']
trust_level = "trusted"
```

O que precisa revisar:
- caminho do repo
- qualquer outro caminho absoluto que faça sentido só na máquina original

---

## O que não copiar cegamente

### `config.toml`

Esse é o principal.

Pode usar como base, mas não como "cola e pronto", porque ele tem caminhos absolutos.

### Shell / encoding

No Windows PowerShell desse projeto existe um detalhe importante: o shell pode mostrar pontuação UTF-8 válida como mojibake mesmo quando o arquivo no disco está correto.

Regra prática:
- arquivos de config e instrução de IA ficam ASCII-safe
- se pontuação não ASCII precisar aparecer em source JS/TS, representa de forma shell-safe
- não trata output estranho de `Get-Content` sozinho como prova de corrupção
- confirma com leitura de bytes brutos + decode UTF-8 explícito, no editor, ou no output renderizado do app

### Qualquer coisa muito pessoal do session log

O repo inclui `docs/session-log.md` por reprodutibilidade e histórico, mas isso não significa que tudo ali precisa ser reaproveitado como parte do teu fluxo.

Serve mais pra entender a evolução do sistema do que como arquivo operacional.

---

## Como saber se ficou certo

Checklist rápido:

- o repo abriu com `.claude/agents/` presente
- seu `~/.codex/preferences/` agora tem os arquivos `charles-*.md`
- seu `~/.codex/skills/` agora tem os skills `charles-*` e `claudecoding-integration-safety`
- seu `~/.codex/meta/` tem `codex-usage-log.md`
- seu `~/.codex/config.toml` aponta pro caminho real do repo na sua máquina
- se o shell mostrar mojibake, você sabe verificar antes de sair regravando arquivo

Se isso estiver certo, o setup principal já está no lugar.

---

## Como eu usaria isso na prática

Se fosse você começando a colaborar nesse projeto, eu faria assim:

1. clona o repo
2. copia o export do Codex pro `~/.codex/`
3. ajusta o `config.toml`
4. lê `CLAUDE.md`
5. lê `CODEX.md`
6. lê `docs/decisions.md`
7. depois abre o case study só pra entender o sistema melhor

Essa ordem te põe no estado operacional rápido, sem cair primeiro na parte mais filosófica.

---

## O que pode mudar no futuro

Hoje esse repo está carregando bastante coisa por reprodutibilidade máxima.

Mais pra frente pode fazer sentido:
- deixar parte do Codex realmente global de novo
- reduzir o que vai pro repo público
- separar melhor o que é "histórico" do que é "setup operacional"

Mas por enquanto a prioridade é simples:
- conseguir reconstruir o ambiente
- conseguir entender o que foi feito
- não depender de memória ou de chat antigo pra isso
