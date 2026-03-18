# 🎤 Notas de Apresentação — Pixel3D
## Script slide-a-slide para o dinamizador

---

## Slide 1 — Título (1 min)

**O que dizer:**
> *"Hoje vamos criar mundos 3D — bloco a bloco, como no Minecraft, mas com uma paleta de 16 cores retro. No final, cada um vai ter um GIF animado do seu modelo para partilhar."*

**O que mostrar:** Abrir `index.html` no projetor por 20 segundos antes de avançar.

---

## Slide 2 — O que são Voxels? (2 min)

**Analogia principal:**
> *"Um pixel é um quadradinho numa imagem 2D. Um voxel é um cubinho num espaço 3D. É exatamente o mesmo princípio, só que com uma dimensão a mais."*

**Pergunta para a sala:**
> *"Que jogos conhecem que usam esta técnica?"* (Minecraft, Roblox, Terraria)

**O que dizer:**
> *"A limitação — usar só cubos — é uma escolha artística. Quando aceitamos uma restrição, somos forçados a ser mais criativos dentro dela."*

---

## Slide 3 — Coordenadas XYZ (2 min)

**Analogia:**
> *"Imaginem que estão a dar indicações a alguém num edifício: 'vai ao piso 3 (Y), entra pelo corredor da esquerda (X), terceira porta à frente (Z)'. É exatamente assim que o computador sabe onde colocar cada bloco."*

**O que apontar:**
- X = horizontal (como na régua)
- Y = vertical (como os pisos de um edifício)
- Z = profundidade (como a distância a que estás)

**Exercício rápido:**
> *"No modelo do Humanóide — onde acham que está a cabeça? Que valor de Y tem?"* (resposta: ~Y=10-12)

---

## Slide 4 — A Paleta PICO-8 (1 min)

**O que dizer:**
> *"Só 16 cores. Parece pouco, mas é mais do que suficiente para criar tudo o que vos vier à cabeça. Os artistas de pixel art profissionais trabalham com paletas ainda mais pequenas."*

**Dica para a sala:**
> *"Antes de começar, escolham 3-4 cores que vão usar. Consistência é mais eficaz do que variedade!"*

---

## Slide 5 — A Interface (2 min)

**Percorrer visualmente o painel:**
- Paleta (clicar numa cor, mostrar o label que muda)
- Ferramentas (mostrar cada uma)
- Templates (carregar "Foguetão" ao vivo)
- Botão de exportar

**Demonstrar:**
> *"Clique esquerdo numa face → adiciona bloco. Clique direito → remove sempre. O bloco azul transparente mostra onde o próximo vai aparecer."*

---

## Slide 6 — O Ficheiro .TXT (2 min)

**Este é o momento pedagógico central — não o saltes!**

**O que dizer:**
> *"Quando guardam o ficheiro .TXT, estão a ver como o computador armazena o vosso modelo. Não como uma imagem — como dados. Cada letra representa um bloco numa posição específica."*

**Mostrar ao vivo:**
- Exportar .TXT do modelo atual
- Abrir num editor de texto
- Identificar uma camada reconhecível (ex: a cabeça)

**Ligação ao conceito de programação:**
> *"Em programação, isto chama-se um array 3D: uma lista dentro de uma lista dentro de outra lista. Quando sabem onde está cada bloco, sabem navegar um array 3D — que é uma das estruturas de dados mais usadas em jogos e gráficos."*

---

## Slide 7 — Demo Ao Vivo (5 min)

**Criar ao vivo no projetor — objeto simples (chapéu, cogumelo, cubo com detalhes)**

**Script passo a passo:**

1. *"Começo com o Cubo Base."*
2. *"Vou usar vermelho para a cor principal."* (selecionar cor 9)
3. *"Clico numa face..."* (adicionar bloco — fazer comentário sobre o ghost block)
4. *"Ups, cliquei no sítio errado."* (clique direito para remover — normalizar o erro)
5. *"Rodo a câmera para ver como está por trás."* (arrastar)
6. *"Vou adicionar um detalhe em branco."* (mudar cor, adicionar)
7. *"Exportar GIF!"* (mostrar o resultado a girar)
8. *"Acham que conseguem fazer melhor em 35 minutos?"*

**Timing:** máximo 5 minutos. Imperfeito está bem — é mais honesto!

---

## Slide 8 — Desafios (1 min)

**Leitura rápida dos 4 níveis.**

**O que dizer:**
> *"Não há obrigação de chegar ao nível 4. O objetivo é criar algo com intenção — e entender como o computador guarda esse 'algo'. Comecem pelo nível 1 e avancem ao vosso ritmo."*

---

## Slide 9 — Dicas (1 min)

**Destacar as 3 mais importantes:**
1. *"Rodar a câmera resolve 90% dos problemas de colocação"*
2. *"Guardar JSON frequentemente — não há Ctrl+Z!"*
3. *"A silhueta é mais importante do que os detalhes"*

---

## Slide 10 — Vamos Começar! (30 seg)

**Checklist coletiva:**
- Todos têm a app aberta?
- Todos veem o Humanóide?
- Alguém tem dúvidas antes de começar?

**Frase de arranque:**
> *"Bloco a bloco, criam o vosso mundo. Vamos lá!"*

---

## Durante a Atividade

### Frases para quando alguém está frustrado:
- *"O clique direito desfaz. Não há erro permanente!"*
- *"Tenta rodar a câmera — a face clicada pode não ser a que querias"*
- *"Simplifica — o que é o elemento mais essencial do teu modelo?"*

### Frases para quando alguém acaba cedo:
- *"Consegues fazer o mesmo com metade dos blocos?"*
- *"E se adicionasses um segundo objeto à cena?"*
- *"Exporta o .TXT e tenta perceber onde está cada parte do teu modelo"*

### Frases para a galeria final:
- *"O que é? 10 palavras ou menos."*
- *"Qual foi a decisão mais difícil?"*
- *"Se tivesses mais 10 minutos, o que adicionavas?"*

---

## Gestão de Tempo

| Fase | Tempo ideal | Sinal de alerta |
|------|-------------|-----------------|
| Exploração | 20 min | Se passarem 25 sem ninguém ter mais de 20 blocos |
| Desafios | 35 min | Avisar aos 25 min e aos 5 min do fim |
| Galeria | 15 min | Máximo 3 min por modelo projetado |

**Se estiverem adiantados:** introduzir o conceito de "eficiência de blocos" — criar algo reconhecível com o mínimo possível.

**Se estiverem atrasados:** focar em 1 desafio de nível 1 completo + exportar PNG. Qualidade sobre quantidade.

---

*Pixel3D · Clube de Código · Centro de Inovação Carlos Fiolhais*
