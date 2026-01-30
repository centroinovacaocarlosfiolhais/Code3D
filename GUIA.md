# 🎓 Guia de Criação de Formas 3D

Este documento explica como criar formas 3D usando JSON!

## 📐 Como Funciona?

A tua forma 3D é criada através de **revolução** de uma curva Bézier.

Imagina que desenhas uma curva numa folha de papel e depois a rodas 360° em torno de um eixo vertical. A forma que se cria é o teu objeto 3D!

```
    y (altura)
    ↑
    |     *  ← Ponto de controlo
    |    /
    |   *    ← Outro ponto
    |  /
    | *      ← Base
    |________→ x (distância do centro)
    0
```

Quando rodas esta curva 360°, crias um objeto 3D simétrico (como um vaso, taça, etc.)

---

## 📝 Estrutura Básica do JSON

```json
{
  "nome": "O nome do teu objeto",
  "descricao": "Uma descrição do que é",
  "pontos": [
    {"x": 0.1, "y": 0},
    {"x": 1.5, "y": 1},
    {"x": 1.2, "y": 2},
    {"x": 1.8, "y": 3}
  ]
}
```

### Explicação dos Campos:

- **nome**: Como queres chamar ao teu objeto
- **descricao**: Uma breve descrição (opcional)
- **pontos**: Lista de pontos que definem a curva

---

## 🎯 Entender os Pontos

Cada ponto tem duas coordenadas:

- **x**: Distância do centro (raio)
  - Deve ser sempre **≥ 0** (não pode ser negativo!)
  - Quanto maior, mais longe do centro
  - x = 0 significa fechado no centro
  
- **y**: Altura
  - Normalmente começa em 0 (base)
  - Aumenta para cima
  - Define onde o ponto está na vertical

### 💡 Exemplos:

```json
{"x": 0.0, "y": 0}    // Base fechada (no centro)
{"x": 2.0, "y": 5}    // Ponto alto e largo
{"x": 0.5, "y": 2}    // Ponto médio, mais estreito
```

---

## 🔥 Dicas Importantes

### 1. Ordem dos Pontos
Os pontos devem estar ordenados **de baixo para cima** (y crescente):

✅ **CORRETO:**
```json
{"x": 0.1, "y": 0},   // Base
{"x": 1.0, "y": 2},   // Meio
{"x": 0.5, "y": 4}    // Topo
```

❌ **ERRADO:**
```json
{"x": 0.5, "y": 4},   // Topo (errado estar primeiro!)
{"x": 1.0, "y": 2},
{"x": 0.1, "y": 0}
```

### 2. Número Mínimo de Pontos
- Precisas de **pelo menos 3 pontos**
- 4 pontos criam uma curva Bézier cúbica (mais suave)
- Mais pontos = mais controlo sobre a forma

### 3. Criar Formas Interessantes

**Base larga → estreito → largo**: Vaso
```json
{"x": 1.5, "y": 0},
{"x": 0.5, "y": 2},
{"x": 1.5, "y": 4}
```

**Estreito → largo → estreito**: Ampulheta
```json
{"x": 1.0, "y": 0},
{"x": 0.3, "y": 2},
{"x": 1.0, "y": 4}
```

**Gradualmente crescente**: Cone
```json
{"x": 0.0, "y": 0},
{"x": 2.0, "y": 4}
```

---

## 🎨 Exemplos Prontos

### Exemplo 1: Copo Simples
```json
{
  "nome": "Copo Simples",
  "descricao": "Um copo básico com base plana",
  "pontos": [
    {"x": 1.0, "y": 0},    // Base
    {"x": 1.0, "y": 0.2},  // Parede começa a subir
    {"x": 1.2, "y": 3},    // Parede sobe e expande ligeiramente
    {"x": 1.3, "y": 3.5}   // Abertura do topo
  ]
}
```

### Exemplo 2: Tigela
```json
{
  "nome": "Tigela",
  "descricao": "Uma tigela arredondada",
  "pontos": [
    {"x": 0.1, "y": 0},    // Base fechada
    {"x": 2.0, "y": 1},    // Expande rapidamente
    {"x": 2.2, "y": 1.5},  // Continua a expandir
    {"x": 2.0, "y": 2}     // Curva para dentro no topo
  ]
}
```

### Exemplo 3: Garrafa
```json
{
  "nome": "Garrafa",
  "descricao": "Garrafa com corpo largo e gargalo estreito",
  "pontos": [
    {"x": 1.0, "y": 0},    // Base
    {"x": 2.0, "y": 2},    // Corpo largo
    {"x": 1.8, "y": 3},    // Começa a estreitar
    {"x": 0.5, "y": 4},    // Gargalo estreito
    {"x": 0.7, "y": 4.5}   // Abertura do gargalo
  ]
}
```

---

## 🌟 Modo Fractal

Quando ativas as **Repetições Fractais**, a tua forma é repetida em padrão circular!

- **0 repetições**: Apenas 1 objeto (normal)
- **1 repetição**: Objeto principal + 4 cópias à volta
- **2 repetições**: Objeto principal + 4 cópias + 16 cópias mais pequenas
- **E assim por diante...**

### Controlos Fractal:
- **Escala Fractal**: Controla o tamanho das cópias (0.2 = muito pequenas, 0.9 = quase do mesmo tamanho)

---

## 🚀 Desafios para Experimentar

### Desafio Básico 🟢
Cria um **vaso de flores** com:
- Base larga e estável
- Meio estreito
- Topo largo para as flores

### Desafio Intermédio 🟡
Cria uma **taça de vinho** com:
- Base circular
- Haste fina e alta
- Cálice largo no topo

### Desafio Avançado 🔴
Cria um **candeeiro** com:
- Base pesada
- Corpo fino e alto
- Cúpula larga no topo

### Desafio Fractal 🌈
Cria uma forma simples e ativa o **modo fractal** com:
- 3 repetições
- Escala de 0.4
Vê que padrão incrível se forma!

---

## ⌨️ Atalhos Úteis

- **Ctrl+Enter** no editor: Carregar JSON
- **Arrastar com rato**: Rodar câmera
- **Scroll**: Zoom in/out
- **▶️ Animar**: Rotação automática

---

## ❓ Resolução de Problemas

**Erro: "Necessário pelo menos 3 pontos"**
→ Adiciona mais pontos ao array "pontos"

**Objeto fica estranho ou invertido**
→ Verifica se os pontos estão ordenados por y crescente

**Forma não fecha em cima/baixo**
→ Usa x muito pequeno (ex: 0.1) ou 0.0 para fechar

**JSON inválido**
→ Verifica se tens todas as vírgulas e chavetas corretas

---

## 💾 Guardar o Teu Trabalho

1. Clica em **"💾 Exportar"** para copiar para clipboard
2. Ou **"📥 Descarregar JSON"** para guardar ficheiro
3. Depois usa **"📂 Importar JSON"** para carregar

---

## 🎓 Próximos Passos

Depois de dominares o básico:
1. Experimenta combinar curvas suaves com ângulos retos
2. Cria formas com muitos pontos para controlo fino
3. Explora padrões fractais complexos
4. Partilha as tuas criações com os colegas!

---

**Diverte-te a criar! 🎨✨**
