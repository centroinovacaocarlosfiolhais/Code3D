# 🎮 Pixel3D — Índice do Pacote

**Versão:** 1.0 · **Data:** 2026 · **Para:** Clube de Código · CICF

---

## 📦 Conteúdo do Pacote

### 🚀 Aplicação
| Ficheiro | Descrição |
|----------|-----------|
| `index.html` | Aplicação web do modelador voxel |
| `app.js` | Lógica JavaScript completa |
| `apresentacao.html` | Slides interativos (10 slides) |

### 📚 Para o Dinamizador
| Ficheiro | Leitura | Finalidade |
|----------|---------|-----------|
| `INSTALACAO.md` ⭐ | 5 min | **Começar aqui** — setup rápido |
| `README.md` | 15 min | Visão geral completa da atividade |
| `GUIAO_DINAMIZADOR.md` | 20 min | Script STEP passo a passo |
| `APRESENTACAO.md` | 10 min | Notas slide-a-slide |

### 📖 Para os Participantes
| Ficheiro | Finalidade |
|----------|-----------|
| `GUIA.md` | Tutorial completo (consulta durante a sessão) |
| `DESAFIOS.md` | Folha de desafios — **imprimir 1 por participante** |
| `FICHA_PROJETO_STEP.md` | Ficha de projeto completa com reflexão STEP |

### 💾 Exemplos JSON
| Ficheiro | Descrição |
|----------|-----------|
| `exemplos/personagem_guerreiro.json` | Guerreiro com armadura cinzenta e espada |
| `exemplos/arvore_magica.json` | Árvore com copa verde e detalhes amarelos |
| `exemplos/casa_basica.json` | Casa com paredes e telhado vermelho |
| `exemplos/foguetao_espacial.json` | Foguetão branco com chamas laranja/amarelo |

---

## 🎯 Ordem de Leitura

### Antes da sessão:
1. `INSTALACAO.md` → testar tudo funciona (5 min)
2. `README.md` → entender a atividade completa (15 min)
3. `GUIAO_DINAMIZADOR.md` → preparar o script (20 min)
4. `APRESENTACAO.md` → notas dos slides (10 min)
5. Testar a app + criar 1 modelo de demo (10 min)

### Durante a sessão:
- Projetar `apresentacao.html`
- Ter `GUIAO_DINAMIZADOR.md` aberto no teu PC
- Distribuir `DESAFIOS.md` (impresso)
- Disponibilizar `GUIA.md` (impresso ou ecrã auxiliar)

### Para os participantes:
- `GUIA.md` — referência durante a exploração
- `DESAFIOS.md` ou `FICHA_PROJETO_STEP.md` — durante os desafios
- `exemplos/*.json` — para carregar e modificar

---

## ⚡ Quick Start

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

---

## 🕐 Estrutura da Sessão (90 min)

```
 0:00  ┤ STEP 0 — Setup         (10 min) ├ Abrir app, explorar templates
 0:10  ┤ STEP 1 — Trigger       (10 min) ├ Demo ao vivo + desafio
 0:20  ┤ STEP 2 — Exploração    (20 min) ├ Primeiros blocos guiados
 0:40  ┤ STEP 3 — Produção      (35 min) ├ Desafios individuais
 1:15  ┤ STEP 4 — Retrospetiva  (15 min) ├ Galeria + reflexão + .TXT
 1:30  ┤ FIM
```

---

## 🔗 Relação com Code3D

Pixel3D e Code3D são **atividades paralelas** — mesmo público, mesmo contexto, sem dependências. Podem ser feitas em qualquer ordem ou em dias diferentes.

| | Code3D | Pixel3D |
|---|---|---|
| Paradigma | Revolução (curva→sólido) | Construção (bloco a bloco) |
| Input | JSON com coordenadas | Clicar no espaço 3D |
| Output | STL (impressão 3D) | GIF animado |
| Conceito | Bézier, 2D coords | Arrays 3D, XYZ |

---

*Pixel3D · Clube de Código · Centro de Inovação Carlos Fiolhais · v1.0*
