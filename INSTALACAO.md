# ⚡ Instalação Rápida — Pixel3D

## Início em 3 passos (5 minutos)

```bash
# 1. Extrair ficheiros
unzip pixel3d.zip && cd pixel3d/

# 2. Iniciar servidor
python3 -m http.server 8000

# 3. Abrir no browser
# http://localhost:8000
```

**PRONTO! ✅**

---

## Checklist por PC (antes dos participantes chegarem)

- [ ] Servidor a correr (`python3 -m http.server 8000`)
- [ ] Browser aberto em `http://localhost:8000`
- [ ] Humanóide visível no ecrã
- [ ] Testar adicionar 1 bloco e remover com clique direito
- [ ] Testar rodar câmera (arrastar botão esquerdo)

**Tempo:** ~2 minutos por PC

---

## Sem Python?

**Opção A — Node.js:**
```bash
npx serve .
```

**Opção B — Firefox direto (sem servidor):**
Abre `index.html` diretamente no Firefox. PNG funciona. GIF pode não funcionar.

**Opção C — Live Server (VS Code):**
Clique direito em `index.html` → "Open with Live Server"

---

## Problemas Frequentes

| Problema | Solução |
|----------|---------|
| "Porta 8000 em uso" | `python3 -m http.server 8080` |
| Browser não carrega | Tenta `http://127.0.0.1:8000` |
| GIF não exporta | Usa servidor HTTP (não ficheiro direto) |
| Aplicação lenta | Menos blocos; fechar outros separadores |

---

## Material a Imprimir

- **DESAFIOS.md** — 1 por participante (essencial)
- **FICHA_PROJETO_STEP.md** — 1 por participante (opcional, mais completa)
- **GUIA.md** — 1 por PC ou projetar num ecrã auxiliar

---

## Ordem de Leitura (para o dinamizador)

1. `README.md` — Visão geral (15 min)
2. `GUIAO_DINAMIZADOR.md` — Sessão detalhada (20 min)
3. `APRESENTACAO.md` — Script dos slides (10 min)
4. Testar a app (10 min)

---

## Estrutura de Ficheiros

```
pixel3d/
├── index.html              ← Aplicação
├── app.js                  ← Lógica
├── apresentacao.html       ← Slides (10 slides)
├── README.md               ← Visão geral
├── GUIAO_DINAMIZADOR.md    ← Script da sessão STEP
├── FICHA_PROJETO_STEP.md   ← Ficha de projeto (imprimir)
├── DESAFIOS.md             ← Folha de desafios (imprimir)
├── GUIA.md                 ← Tutorial para participantes
├── APRESENTACAO.md         ← Notas de apresentação
├── INSTALACAO.md           ← Este ficheiro
└── exemplos/               ← 4 modelos JSON prontos
    ├── personagem_guerreiro.json
    ├── arvore_magica.json
    ├── casa_basica.json
    └── foguetao_espacial.json
```

---

**Boa sessão! 🎮✨**
