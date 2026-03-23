# 📚 Materiais Pedagógicos — Clube de Código

Pasta com os materiais de sessão produzidos para o **Clube de Código** do Centro de Inovação Carlos Fiolhais, organizados por atividade.

Todos os documentos seguem o **CICF Design System v1.0** e o **STEP Learning Framework**.

---

## 🗂 Estrutura

```
materiais-pedagogicos/
│
├── CODE3D/                          ← Atividade de design e impressão 3D
│   ├── apresentacao.html            ← Slides para participantes (8 slides)
│   ├── ficha_projeto.html           ← Ficha de trabalho individual/grupo
│   ├── guiao_dinamizador.html       ← Guião interno — não distribuir
│   └── STEP_Framework_Dinamizadores.pptx  ← Deck de formação da equipa
│
└── templates/                       ← Base para novas atividades
    ├── template_apresentacao.html
    ├── template_guiao_dinamizador.html
    └── template_ficha_projeto.html
```

---

## ⚡ Gerar uma nova atividade

1. Abre o **Projeto CICF no Claude** (claude.ai)
2. Envia uma mensagem com o seguinte formato:

```
Nova atividade: [Nome] — [área STEM] — [ferramenta] — público [idades]
— duração [tempo] — grupos [configuração]
— objeto Step 0: [5 objetos físicos]
— deliverable: [o que cada grupo produz]
— URL: [link da ferramenta]
```

O Claude usa os templates como base e gera os 3 HTMLs completos, prontos a usar.

---

## 🎨 Design System

| Token | Valor |
|-------|-------|
| `--dark` | `#0D1B2A` |
| `--teal` | `#00B4D8` |
| `--green` | `#06D6A0` |
| `--orange` | `#FF6B35` |
| `--blue` | `#0057A8` |
| `--purple` | `#6D62E8` |
| Step 0 | `#556B7A` |
| Step 1 | `#0057A8` |
| Step 2 | `#FF6B35` |
| Step 3 | `#06D6A0` |
| Step 4 | `#6D62E8` |

Tipografia: `system-ui` stack (sem dependências externas). Mono: `'Courier New', Courier, monospace`.

---

## 📋 STEP Learning Framework

| Step | Nome | Tempo | Papel do dinamizador |
|------|------|-------|----------------------|
| 0 | Setup | 10 min | Lidera · cria curiosidade · não explica |
| 1 | Identificar | 20 min | Circula · faz perguntas · não responde |
| 2 | Desafiar | 50 min | Calibra · não resolve · celebra a tentativa |
| 3 | Validar | 20 min | Modera · valoriza processo E resultado |
| 4 | Retrospetiva | 15 min | Cria espaço · não avalia · regista |

---

*Preparado com o CICF Claude Project · CC BY-SA 4.0*
