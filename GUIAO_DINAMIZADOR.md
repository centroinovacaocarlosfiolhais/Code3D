# 🎓 Guião do Dinamizador — Pixel3D

**Atividade:** Pixel3D — Modelador Voxel  
**Duração:** 90 minutos  
**Público:** Jovens 12–15 anos  
**Materiais:** PCs com browser moderno + projetor

---

## 📋 Antes da Sessão

### Preparação técnica (20 min antes)

1. Instalar servidor em cada PC: `python3 -m http.server 8000`
2. Abrir `http://localhost:8000` em todos os browsers
3. Verificar que o modelo Humanóide aparece no centro
4. Testar: colocar um bloco, apagar um bloco, exportar PNG
5. No PC do projetor: abrir `apresentacao.html`

### Material para imprimir (1 por participante)
- `DESAFIOS.md` — folha de desafios com auto-avaliação
- `GUIA.md` (opcional) — referência rápida de controlos

---

## 🗺️ Estrutura STEP (90 min)

---

### ⚙️ STEP 0 — Setup (10 min)

**Objetivo:** Todos com a app aberta, a explorar os templates.

**O que fazer:**
- Cumprimentar e apresentar a atividade brevemente
- Pedir a todos que abram a app no browser
- Deixar explorar livremente os templates por 5 min
- Usar a pergunta: *"Reconheces alguma forma?"*

**Slide:** 1 (título)

---

### 💡 STEP 1 — Trigger (10 min)

**Objetivo:** Criar curiosidade e estabelecer o desafio central.

**Slides:** 2–6

**Script sugerido:**

> *"Já todos ouviram falar de Minecraft, certo? Hoje vamos criar modelos 3D com a mesma ideia — blocos num espaço 3D. Só que em vez de um mundo infinito, temos um grid de 16×16×16 e uma paleta de 16 cores fixas. A limitação é propositada — obriga-nos a ser mais criativos!"*

**Demo ao vivo (5 min):**
1. Selecionar template Vazio
2. Escolher cor amarela
3. Colocar 3–4 blocos na camada 0
4. Subir para camada 1 (tecla ↑), colocar mais blocos
5. Rodar a câmera para ver o resultado 3D
6. Exportar PNG
7. Mostrar o efeito: *"Em 2 minutos criámos algo!"*

**Pergunta chave:** *"O que conseguiriam criar em 30 minutos?"*

---

### 🔍 STEP 2 — Exploration (20 min)

**Objetivo:** Familiarização com os controlos e o espaço 3D.

**Slides:** 7–8 (dicas)

**Instruções para os participantes:**
1. Escolher um template de partida
2. Explorar: mudar cores, adicionar e apagar blocos
3. Experimentar todas as camadas Y (0 a 15)
4. Rodar a câmera e fazer zoom
5. Tentar exportar um PNG do resultado

**Como circular pela sala:**
- Observar dificuldades sem intervir logo
- Deixar descobrir sozinhos durante 3–4 min
- Intervir com perguntas abertas, não soluções

**Perguntas orientadoras:**
- *"O que acontece se premires ↑?"*
- *"Onde está exatamente a camada verde?"*
- *"Já tentaste apagar e recolocar de outra cor?"*

**Problemas comuns nesta fase:**
| Problema | O que dizer |
|----------|-------------|
| "Não consigo colocar blocos" | "Verificas em que camada estás? O plano verde é onde constróis." |
| "A câmera ficou perdida" | "Clica em 🎥 Reset no painel — volta ao início." |
| "Coloquei no sítio errado" | "Usa o modo Apagar (ou tecla E) — é como um pincel às avessas!" |

---

### 🏗️ STEP 3 — Production (35 min)

**Objetivo:** Criar um modelo com intenção criativa.

**Distribuir:** Folha `DESAFIOS.md`

**Estrutura recomendada:**
- **0–10 min:** Desafio 1 (Iniciante) — toda a gente faz este
- **10–25 min:** Desafio 2 ou 3 (conforme ritmo)
- **25–35 min:** Desafio livre + preparar para exportar GIF

**Para grupos mais avançados:**
- Propor criar um cenário (personagem + objeto + ambiente)
- Desafio em par: um cria, o outro copia e modifica
- Mostrar o TXT exportado e pedir que interpretem as letras

**Como celebrar sucessos:**
- *"Olha o que o/a [nome] criou — consegues explicar como fizeste?"*
- Projetar no ecrã principal criações interessantes
- Encorajar os mais rápidos a ajudar os mais lentos

**Gestão de ritmos:**
- Rápidos: Desafio 4 (Mestre) ou criar acessórios para o modelo
- Lentos: Focar no Desafio 1, acompanhar individualmente
- Muito lentos: Demo guiada individual, 3 min de acompanhamento direto

---

### 🔄 STEP 4 — Retrospetiva (15 min)

**Objetivo:** Reflexão, partilha e consolidação.

**Sequência:**

**1. Galeria de GIFs (8 min)**
- Pedir a todos que exportem o GIF do seu modelo
- 3–4 voluntários projetam e explicam:
  - *"O que criei?"*
  - *"O que foi mais difícil?"*
  - *"Se tivesse mais tempo, adicionava o quê?"*

**2. Momento TXT — surpreender a turma (3 min)**
- Exportar o TXT de um modelo ao vivo
- Projetar no ecrã
- *"Isto é o vosso modelo. O computador guarda assim — como uma grelha de letras. Cada letra é uma cor, cada linha é uma linha de blocos. É exatamente como funciona qualquer jogo 3D!"*

**3. Perguntas de reflexão (4 min)**
- *"O que aprenderam sobre espaços 3D?"*
- *"Para que serve o Y?"*
- *"Se o X é a largura e o Z é a profundidade, o que é o Y?"*
- *"O vosso modelo são dados — onde vivem esses dados no computador?"*

---

## 💬 Frases Úteis

**Quando alguém está frustrado:**
> *"Estás a descobrir o que NÃO funciona — isso também é aprender! Vamos tentar juntos?"*

**Quando alguém está a ter muito sucesso:**
> *"Fantástico! Podes explicar aos outros a tua técnica para mudar de camada?"*

**Quando há confusão com a camada:**
> *"Olha para o plano verde brilhante — é aí que o teu clique vai colocar o bloco."*

**Para encorajar experimentação:**
> *"E se usasses o dobro das cores? O que achaste que ia acontecer aconteceu?"*

---

## ⏱️ Gestão de Tempo

**Se estiverem adiantados:**
- Mostrar o ficheiro TXT mais cedo
- Propor criar um cenário completo (personagem + chão + fundo)
- Desafio extra: recriar um objeto do dia-a-dia com menos de 20 blocos

**Se estiverem atrasados:**
- Focar no Desafio 1 apenas
- Fazer Retrospetiva mais curta (8 min em vez de 15)
- Pular o momento TXT para a próxima sessão

---

## 🎯 Indicadores de Sucesso

Ao final da sessão, observa se os participantes:

- ✓ Conseguem colocar e apagar blocos intencionalmente
- ✓ Mudam de camada sem ajuda
- ✓ Conseguem descrever o que o Y representa
- ✓ Exportaram pelo menos um PNG ou GIF
- ✓ Mostram satisfação com o resultado criado
- ✓ Conseguem explicar o que é um voxel

---

## 📊 Conceitos Matemáticos/CS Abordados

| Conceito | Onde aparece |
|----------|-------------|
| Arrays 3D | O grid voxel (x, y, z) |
| Indexação | Coordenadas do bloco |
| Codificação de dados | Ficheiro TXT de camadas |
| LZW compression | (avançado) Codificação do GIF |
| Renderização 3D | Three.js por baixo |

---

**Boa sessão! 🧱✨**
