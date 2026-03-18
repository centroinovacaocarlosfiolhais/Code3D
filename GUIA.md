# 🎮 Guia do Pixel3D
## Como criar modelos 3D em voxel

---

## O que é um Voxel?

Um **voxel** é um cubo 3D — é o equivalente 3D de um pixel numa imagem. Assim como uma imagem digital é feita de milhares de pixeis (quadradinhos 2D), um modelo voxel é feito de cubos 3D empilhados.

O jogo **Minecraft** usa exatamente esta técnica!

---

## Como Funciona o Pixel3D

A aplicação dá-te uma grelha de **16 × 16 × 16 posições** (4096 blocos possíveis). Podes colocar um bloco em qualquer posição dessa grelha, escolhendo uma das **16 cores** da paleta.

---

## As Coordenadas: X, Y, Z

Cada bloco tem uma posição no espaço definida por 3 números:

```
X → Esquerda / Direita (0 = esquerda, 15 = direita)
Y → Baixo / Cima     (0 = chão, 15 = topo)
Z → Frente / Atrás   (0 = frente, 15 = fundo)
```

**Exemplo:** Um bloco em X=8, Y=5, Z=8 está no centro da grelha, a meia altura.

**Regra importante:** Y=0 é sempre o chão. Os modelos constroem-se de baixo para cima!

---

## A Interface

### Painel Lateral (lado direito)

**🎨 Paleta** — 16 cores fixas estilo PICO-8. Clica numa cor para a selecionar. A moldura branca mostra qual está ativa.

**🔧 Ferramentas**
- **➕ Adicionar** — Clica numa face de um bloco existente para adicionar um novo bloco adjacente. Também podes clicar no chão.
- **❌ Remover** — Remove o bloco em que clicas.
- **🎨 Pintar** — Muda a cor de um bloco sem o remover.

> 💡 **Dica:** Com qualquer ferramenta ativa, o **clique direito** do rato remove sempre o bloco clicado!

**📦 Templates** — 6 formas prontas como ponto de partida.

**📷 Câmera** — Botão para ativar/parar a rotação automática, e para repor a câmera se ficou num ângulo estranho.

**💾 Guardar** — Exportar em diferentes formatos.

### Ghost Block (Bloco Fantasma)
Quando a ferramenta ➕ está ativa, aparece um **bloco azul translúcido** que mostra onde o próximo bloco vai ser colocado antes de clicares. Se não aparece onde queres, roda a câmera.

---

## Controlos da Câmera

| Ação | Como fazer |
|------|------------|
| Rodar à volta do modelo | Arrastar com **botão esquerdo** |
| Mover a câmera (pan) | Arrastar com **botão direito** |
| Zoom | **Scroll** do rato |
| Repor câmera | Botão "🔄 Repor" no painel |

> 💡 **Regra de ouro:** Quando não consegues adicionar um bloco onde queres, **roda a câmera** para um ângulo diferente e tenta de novo!

---

## A Paleta PICO-8

16 cores fixas — a limitação é intencional! Forçar-te a usar só estas cores cria uma estética coesa e retro.

| # | Cor | Letra no .TXT |
|---|-----|---------------|
| 1 | ⬛ Preto | ■ |
| 2 | 🟦 Azul Escuro | B |
| 3 | 🟪 Roxo | R |
| 4 | 🟩 Verde Escuro | G |
| 5 | 🟫 Castanho | C |
| 6 | 🩶 Cinzento | Z |
| 7 | ⬜ Cinzento Claro | L |
| 8 | 🤍 Branco | W |
| 9 | 🔴 Vermelho | V |
| 10 | 🟠 Laranja | O |
| 11 | 🟡 Amarelo | A |
| 12 | 🟢 Verde | N |
| 13 | 🔵 Azul | U |
| 14 | 🫐 Lavanda | P |
| 15 | 🩷 Rosa | S |
| 16 | 🍑 Pêssego | X |

---

## Como Guardar o Teu Trabalho

**PNG** — Screenshot do modelo como imagem estática.

**GIF** — Animação de 360° (o modelo gira completamente). Perfeito para partilhar!

**JSON** — Guarda todos os blocos para poderes continuar em casa ou noutra sessão. Para carregar: botão "📂 Carregar JSON".

**TXT** — Representação do modelo em texto, camada a camada. Usado para aprender como o computador armazena dados 3D.

> ⚠️ O GIF precisa de servidor HTTP para funcionar. O PNG funciona sempre.

---

## O Ficheiro .TXT — O Modelo em Dados

Quando exportas o .TXT, vês como o computador guarda o teu modelo. Cada **camada Y** é mostrada como uma grelha de letras:

```
── Camada Y=10 ──
   6789
 6 WWWW    ← linha X=6, letras nas colunas Z=6,7,8,9
 7 W..W    ← W=Branco, .=Vazio
 8 WWWW
```

Cada letra representa uma cor. O ponto (`.`) é uma posição vazia.

---

## Dicas de Design

### Para Personagens
- Usa **3-4 cores** no máximo (pele, roupa, detalhes)
- A **cabeça** deve ser claramente maior que o corpo
- **Olhos** de 1-2 blocos fazem toda a diferença

### Para Construções
- Começa pela **estrutura base** (paredes, chão)
- Adiciona detalhes (janelas, porta) depois
- Usa **cinzentos** para pedra/betão, **castanho** para madeira

### Para Animais
- Começa pelo **corpo** (bloco maior)
- Adiciona **cabeça** e **patas** depois
- A **silhueta** é mais importante do que os detalhes

### Truque Profissional: a Silhueta
Antes de começar, pensa na silhueta do teu objeto. Se fechares os olhos e imaginares a forma, consegues reconhecê-la? Uma boa silhueta torna o modelo reconhecível mesmo sem detalhes.

---

## Resolução de Problemas

**"O bloco não aparece onde cliquei"**
→ Roda a câmera — estavas a clicar numa face que não era a que querias

**"A câmera ficou num ângulo estranho"**
→ Clica em "🔄 Repor" no painel lateral

**"Quero desfazer"**
→ Não há Ctrl+Z, mas o clique direito remove blocos. Também podes guardar JSON frequentemente como backup.

**"O GIF não exporta"**
→ Usa PNG como alternativa. O GIF precisa de servidor HTTP.

---

*🎮 Pixel3D · Clube de Código · CICF · v1.0*
