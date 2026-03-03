# 🎨 Modelador 3D por JSON - Clube de Código

## 📋 Descrição da Atividade

Nesta atividade, os participantes vão aprender a criar modelos 3D através de ficheiros JSON!

Em vez de programar diretamente em JavaScript (que pode ser intimidante), os participantes trabalham com JSON simples, que é mais fácil de entender e modificar. A interface visual mostra instantaneamente o resultado das suas alterações.

### 🎯 Objetivos de Aprendizagem:

1. **Estrutura de dados (JSON)**: Aprender a trabalhar com dados estruturados
2. **Geometria 3D**: Entender curvas Bézier e revolução de sólidos
3. **Coordenadas**: Trabalhar com sistemas de coordenadas (x, y)
4. **Padrões Fractais**: Explorar repetição e escalas
5. **Experimentação**: Testar, errar, iterar e aprender

---

## 🚀 Como Começar

### Opção 1: Servidor Local Simples (Recomendado)

```bash
# No diretório do projeto
python3 -m http.server 8000
```

Depois abre no browser: `http://localhost:8000`

### Opção 2: Abrir diretamente

Simplesmente abre o ficheiro `index.html` no browser (Firefox ou Chrome).

**Nota**: Algumas funcionalidades podem não funcionar devido a restrições de segurança do browser. Se tiveres problemas, usa a Opção 1.

---

## 📂 Estrutura dos Ficheiros

```
clube-3d/
├── index.html          # Interface principal
├── app.js              # Lógica da aplicação
├── GUIA.md            # Guia detalhado para estudantes
├── README.md          # Este ficheiro
└── exemplos/          # Exemplos JSON prontos
    ├── 01_copo.json
    ├── 02_tigela.json
    ├── 03_garrafa.json
    ├── 04_candeeiro.json
    ├── 05_torre_xadrez.json
    ├── 06_foguetao.json
    ├── 07_base_fractal.json
    └── 08_arvore_natal.json
```

---

## 🎓 Estrutura da Sessão (90 minutos)

### Parte 1: Introdução (15 min)

**Conceitos a explicar:**
1. O que é JSON? (JavaScript Object Notation)
2. Como funciona revolução de sólidos?
3. O que são curvas Bézier? (mostrar exemplos visuais)
4. Demo da aplicação

**Atividade:**
- Mostrar no projetor
- Carregar exemplo do vaso
- Modificar valores ao vivo
- Mostrar modo fractal

### Parte 2: Exploração Guiada (20 min)

**Passos:**
1. Abrir a aplicação em todos os PCs
2. Carregar exemplo "Vaso" (já vem carregado)
3. Experimentar mudar valores de x e y
4. Ver o efeito imediato na visualização
5. Testar diferentes cores
6. Experimentar segmentos diferentes
7. Brincar com rotação automática

**Perguntas para guiar:**
- O que acontece se x = 0?
- O que acontece se aumentares muito o y?
- Como criar uma forma mais larga?
- Como criar uma forma mais alta?

### Parte 3: Desafios Progressivos (40 min)

#### 🟢 Desafio 1 - Iniciante (10 min)
**"Cria um copo de sumo"**

Requisitos:
- Base com x ≈ 1.0
- Altura total ≈ 3-4
- Ligeiramente mais largo no topo

Dica: Começa com o exemplo "Copo Simples"

#### 🟡 Desafio 2 - Intermédio (15 min)
**"Cria uma garrafa de água"**

Requisitos:
- Base larga e estável
- Corpo principal largo
- Gargalo estreito no topo
- Pelo menos 5-6 pontos

Dica: Pensa em como x deve diminuir no gargalo

#### 🔴 Desafio 3 - Avançado (15 min)
**"Cria um candeeiro ou lustre"**

Requisitos:
- Base pesada
- Corpo fino/haste
- Cúpula no topo
- Experimenta o modo fractal!

**EXTRA**: Ativa 2-3 repetições fractais e escala 0.4-0.5

### Parte 4: Apresentações e Galeria (15 min)

**Atividade:**
1. Cada participante (ou grupo) apresenta a sua criação
2. Explica o que tentou fazer e como conseguiu
3. Partilha dificuldades encontradas
4. Exporta o JSON da sua criação

**Criar uma "Galeria":**
- Projetar as criações mais interessantes
- Votar na mais criativa
- Guardar os JSONs para partilhar

---

## 💡 Dicas para o Facilitador

### Durante a Atividade:

1. **Encoraja experimentação**: Não há respostas erradas!
2. **Usa analogia do oleiro**: A curva é como moldar barro num torno
3. **Mostra erros comuns**: 
   - Pontos fora de ordem (y não crescente)
   - x negativo (não funciona)
   - Poucos pontos (mínimo 3)
4. **Destaca descobertas**: Quando alguém cria algo interessante, partilha!

### Conceitos Matemáticos (Opcional):

Se o grupo for mais avançado, podes explorar:
- Curvas de Bézier (matemática por trás)
- Coordenadas polares vs cartesianas
- Transformações geométricas
- Recursão (fractais)

### Extensões Possíveis:

**Para participantes mais rápidos:**
1. Criar um conjunto de peças de xadrez
2. Modelar objectos do quotidiano
3. Criar padrões fractais complexos
4. Experimentar com muitos pontos (10+)

**Para sessões futuras:**
1. Adicionar texturas ao código
2. Criar animações mais complexas
3. Exportar para impressão 3D (STL)
4. Combinar múltiplos objetos numa cena

---

## 🐛 Resolução de Problemas Comuns

### "JSON inválido"
- Verifica vírgulas entre elementos
- Cada ponto precisa de vírgula, exceto o último
- Usa aspas duplas (") não simples (')

### "Objeto aparece estranho"
- Verifica ordem dos pontos (y crescente)
- Confirma que x ≥ 0
- Tenta menos pontos primeiro

### "Não vejo nada"
- Clica "Carregar" depois de editar JSON
- Tenta "Resetar Câmera"
- Verifica console do browser (F12)

### "Navegação não funciona"
- Arrasta com rato para rodar
- Scroll para zoom
- Se não funcionar, recarrega página

---

## 📊 Avaliação de Aprendizagem

### O que observar:

**Compreensão de JSON:**
- ✓ Consegue editar valores
- ✓ Adiciona/remove pontos
- ✓ Entende estrutura de dados

**Pensamento Espacial:**
- ✓ Prevê resultado antes de carregar
- ✓ Ajusta pontos para atingir objetivo
- ✓ Usa coordenadas corretamente

**Resolução de Problemas:**
- ✓ Debug erros de JSON
- ✓ Itera até conseguir resultado
- ✓ Aprende com tentativa-erro

**Criatividade:**
- ✓ Experimenta livremente
- ✓ Cria formas originais
- ✓ Usa modo fractal criativamente

---

## 🎁 Recursos Adicionais

### Para Estudantes:
- `GUIA.md` - Tutorial completo com exemplos
- Pasta `exemplos/` - 8 exemplos comentados
- Interface tem botões de exemplo integrados

### Para Facilitador:
- Este README
- Código fonte comentado em `app.js`
- Exemplos progressivos (simples → complexo)

---

## 🔗 Links Úteis

**Three.js:**
- Documentação: https://threejs.org/docs/
- Exemplos: https://threejs.org/examples/

**Curvas Bézier:**
- Wikipedia: https://pt.wikipedia.org/wiki/Curva_de_B%C3%A9zier
- Visualização interativa: https://cubic-bezier.com/

**JSON:**
- Validador: https://jsonlint.com/
- Tutorial: https://www.json.org/json-pt.html

---

## 📝 Notas Finais

Esta atividade foi desenhada para ser:
- **Acessível**: Foco em JSON, não em código complexo
- **Visual**: Feedback imediato das alterações
- **Escalável**: Desde iniciantes a avançados
- **Criativa**: Liberdade para experimentar

O objetivo não é dominar Three.js ou JavaScript, mas:
1. Entender estrutura de dados
2. Pensar espacialmente em 3D
3. Experimentar e iterar
4. Criar algo visual e satisfatório

**Divirtam-se a criar! 🎨✨**

---

## 📧 Feedback

Depois da sessão, considera recolher feedback:
- O que mais gostaram?
- O que foi mais difícil?
- O que mudarias na atividade?
- Querem fazer uma sessão de continuação?

---

**Preparado por**: Clube de Código - Centro de Inovação Carlos Fiolhais  
**Versão**: 1.0  
**Data**: Janeiro 2025
