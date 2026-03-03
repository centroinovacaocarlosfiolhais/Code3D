# 🎤 NOTAS DE APRESENTAÇÃO - Modelador 3D por JSON

## 📽️ SLIDE 1 - Título (2 min)
**Título:** Criação de Modelos 3D com JSON  
**Subtítulo:** Clube de Código - Centro de Inovação Carlos Fiolhais

**O que dizer:**
"Hoje vamos criar objetos 3D, mas em vez de programar em JavaScript complexo, vamos usar JSON - uma forma muito mais simples de estruturar dados. Vão conseguir criar formas incríveis apenas editando alguns números!"

---

## 📽️ SLIDE 2 - O que é JSON? (3 min)

**Conceito:** JSON = JavaScript Object Notation

**Exemplo visual:**
```json
{
  "nome": "João",
  "idade": 15,
  "hobbies": ["programação", "jogos", "música"]
}
```

**O que dizer:**
"JSON é como uma receita ou uma ficha - tem campos com nomes e valores. É fácil de ler por humanos e por máquinas. Hoje vamos usar JSON para descrever formas 3D!"

**Mostrar:** Abrir editor JSON na aplicação

---

## 📽️ SLIDE 3 - Como funciona? (5 min)

**Conceito:** Revolução de Sólidos

**Analogia:**
"Imaginem um oleiro a fazer um vaso. Ele tem um pedaço de barro e um torno que gira 360°. À medida que o torno gira, o oleiro molda o barro criando a forma do vaso. É exatamente isso que fazemos aqui!"

**Diagrama:**
```
    Curva 2D          →    Rodar 360°    →    Objeto 3D
    
       *                                         ⚪
      /                                        ⚪  ⚪
     *                                       ⚪      ⚪
    /                                       ⚪        ⚪
   *                                         ⚪      ⚪
   |                                          ⚪  ⚪
   *                                            ⚪
```

**Mostrar:** Demo ao vivo - criar vaso e rodar

---

## 📽️ SLIDE 4 - Curvas Bézier (4 min)

**Conceito:** Pontos de controlo que definem uma curva suave

**Visual:**
```
y (altura)
↑
5 |           *  ← ponto 4
4 |         /
3 |       *    ← ponto 3
2 |     /
1 |   *        ← ponto 2
0 | *          ← ponto 1 (base)
  └─────────────→ x (raio)
  0 1 2 3
```

**O que dizer:**
"Cada ponto tem duas coordenadas: x (distância do centro) e y (altura). A curva passa suavemente por estes pontos. Quando mudamos os valores, a forma muda!"

**Mostrar:** Editar valores de x e ver forma mudar

---

## 📽️ SLIDE 5 - Sistema de Coordenadas (3 min)

**Eixo X (horizontal):**
- x = 0 → centro (fechado)
- x = 1 → 1 unidade do centro
- x = 2 → 2 unidades do centro (mais largo)
- ⚠️ x não pode ser negativo!

**Eixo Y (vertical):**
- y = 0 → base (chão)
- y = 1 → 1 unidade de altura
- y = 5 → 5 unidades de altura (mais alto)

**O que dizer:**
"X controla a largura. Maior x = mais largo. X=0 fecha completamente (como uma ponta). Y controla a altura. Os pontos devem estar ordenados de baixo (y pequeno) para cima (y grande)."

---

## 📽️ SLIDE 6 - Demo Ao Vivo (5 min)

**Passo a passo:**

1. **Abrir aplicação** (projetar no ecrã)

2. **Mostrar exemplo do vaso:**
   ```json
   {
     "pontos": [
       {"x": 0.1, "y": 0},
       {"x": 1.5, "y": 1},
       {"x": 1.2, "y": 2.5},
       {"x": 1.8, "y": 4}
     ]
   }
   ```

3. **Modificar ao vivo:**
   - Mudar x de 1.5 para 2.5 → "Vejam como ficou mais largo!"
   - Mudar y de 4 para 6 → "Agora ficou mais alto!"

4. **Mostrar controles:**
   - Cor
   - Segmentos
   - Rotação automática

5. **Introduzir fractais:**
   - Ativar 2 repetições
   - Ajustar escala
   - "Uau! De uma forma simples criámos um padrão complexo!"

---

## 📽️ SLIDE 7 - Exemplos Inspiradores (2 min)

**Mostrar rapidamente:**
1. Copo → Tigela → Garrafa (progressão)
2. Taça de vinho (elegância)
3. Candeeiro (complexidade)
4. Fractal (magia matemática!)
5. Árvore de Natal (criatividade)

**O que dizer:**
"Estes são apenas exemplos. A vossa imaginação é o limite! Podem criar vasos, instrumentos musicais, naves espaciais, monstros alienígenas... o que quiserem!"

---

## 📽️ SLIDE 8 - Desafios (1 min)

**Progressão de dificuldade:**

🟢 **Iniciante:**
- Copo simples
- Tigela

🟡 **Intermédio:**
- Garrafa com gargalo
- Taça de vinho

🔴 **Avançado:**
- Peças de xadrez
- Candeeiro + fractal

🌟 **Mestre:**
- Foguetão
- Criação original

**O que dizer:**
"Vamos começar pelos desafios mais simples e depois podem avançar ao vosso ritmo. Não há pressa - o importante é experimentar e aprender!"

---

## 📽️ SLIDE 9 - Dicas Importantes (2 min)

**Lista de verificação:**

✅ **Fazer:**
- Experimentar livremente
- Mudar valores e ver o que acontece
- Pedir ajuda quando precisares
- Partilhar descobertas com colegas
- Guardar as tuas criações favoritas

❌ **Evitar:**
- x negativo (não funciona!)
- Pontos fora de ordem (y deve crescer)
- Menos de 3 pontos
- Desistir ao primeiro erro

**Frase motivacional:**
"Errar é parte do processo! Cada erro é uma oportunidade de aprender algo novo."

---

## 📽️ SLIDE 10 - Vamos Começar! (1 min)

**Checklist:**
- [ ] Todos têm a aplicação aberta?
- [ ] Todos vêem o exemplo do vaso?
- [ ] Todos conseguem editar o JSON?
- [ ] Alguma dúvida antes de começar?

**O que dizer:**
"Perfeito! Vamos começar pelos desafios mais simples. Lembrem-se: não há respostas erradas, apenas experiências diferentes. Divirtam-se!"

---

## 🎯 DURANTE A ATIVIDADE

### Circular pela sala e:

1. **Observar dificuldades comuns:**
   - JSON mal formatado (falta vírgula, etc.)
   - Pontos fora de ordem
   - Valores de x negativos
   - Frustração por não conseguir resultado desejado

2. **Fazer perguntas orientadoras:**
   - "O que queres que aconteça aqui?"
   - "Como é que o x afeta a forma?"
   - "Já tentaste aumentar/diminuir este valor?"

3. **Celebrar sucessos:**
   - "Uau, isso ficou incrível! Mostra aos colegas!"
   - "Boa! Como é que conseguiste essa forma?"

4. **Encorajar colaboração:**
   - "O João fez uma coisa interessante, vai ver!"
   - "Podem trabalhar juntos neste desafio!"

---

## 🎬 CONCLUSÃO (15 min)

### Galeria de Criações:

1. **Projetar** 3-5 criações mais interessantes
2. **Autor explica**: "Como fizeste?" "O que foi mais difícil?"
3. **Votação informal**: Criação mais criativa?

### Reflexão em Grupo:

**Perguntas:**
- O que aprenderam sobre JSON?
- O que descobriram sobre coordenadas 3D?
- Qual foi a parte mais divertida?
- O que gostariam de criar numa próxima sessão?

### Recursos para Levar:

- Ficheiros JSON guardados
- Link para a aplicação (se online)
- Lista de desafios extra
- Sugestão: continuar em casa!

---

## 💬 FRASES ÚTEIS DURANTE A SESSÃO

**Quando alguém está frustrado:**
- "Às vezes demora algumas tentativas. Vamos experimentar juntos?"
- "O erro é parte do processo de aprendizagem!"

**Quando alguém está a ter sucesso:**
- "Fantástico! Como é que pensaste nisso?"
- "Podes explicar aos outros como fizeste?"

**Quando há confusão técnica:**
- "Vamos voltar ao exemplo mais simples e construir a partir daí."
- "Lembra-te: x controla largura, y controla altura."

**Para encorajar experimentação:**
- "O que achas que vai acontecer se mudares isto?"
- "Experimenta valores muito diferentes - pode dar algo surpreendente!"

---

## ⏱️ GESTÃO DE TEMPO

**Se estiverem adiantados:**
- Introduzir modo fractal mais cedo
- Desafio extra: criar conjunto de objetos relacionados
- Explorar código JavaScript (para interessados)

**Se estiverem atrasados:**
- Focar nos desafios 1 e 2
- Fazer demo coletiva em vez de individual
- Simplificar desafios (menos pontos de controlo)

**Se houver grande disparidade de ritmos:**
- Criar pares (rápido + devagar)
- Oferecer desafios extra aos rápidos
- Dar apoio individual aos que precisam

---

## 🎯 OBJETIVOS DE APRENDIZAGEM - CHECKLIST

No final, os participantes devem conseguir:

**Técnico:**
- [ ] Editar JSON sem erros de sintaxe
- [ ] Entender sistema de coordenadas x,y
- [ ] Criar formas 3D intencionalmente (não aleatoriamente)
- [ ] Usar controles da interface

**Conceptual:**
- [ ] Entender revolução de sólidos
- [ ] Relacionar valores com formas resultantes
- [ ] Pensar em 3D (espacialmente)

**Atitudinal:**
- [ ] Confortável com experimentação
- [ ] Persistente perante erros
- [ ] Criativo na exploração

---

**Boa sessão! 🎨✨**
