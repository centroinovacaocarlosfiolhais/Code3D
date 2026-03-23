# 🎨 Modelador 3D por JSON - Índice Principal

**Versão:** 1.0  
**Data:** Janeiro 2025  
**Para:** Clube de Código - Centro de Inovação Carlos Fiolhais

---

## 📦 O que está incluído neste pacote?

### 🚀 Aplicação Principal
- **`index.html`** - Interface web do modelador 3D
- **`app.js`** - Lógica JavaScript da aplicação
- **`apresentacao.html`** - Slides de apresentação interativos

### 📚 Documentação para Facilitador
- **`INSTALACAO.md`** ⭐ **COMEÇAR AQUI!** Guia rápido de 5 minutos
- **`README.md`** - Visão geral completa da atividade (90 min)
- **`APRESENTACAO.md`** - Notas detalhadas para apresentar

### 📖 Material para Participantes
- **`GUIA.md`** - Tutorial completo sobre como criar formas 3D
- **`DESAFIOS.md`** - Folha de exercícios para imprimir

### 💾 Exemplos Práticos
- **`exemplos/`** - 8 ficheiros JSON prontos a usar:
  - `01_copo.json` - Exemplo básico
  - `02_tigela.json` - Forma arredondada
  - `03_garrafa.json` - Gargalo estreito
  - `04_candeeiro.json` - Complexidade média
  - `05_torre_xadrez.json` - Detalhes finos
  - `06_foguetao.json` - Forma cónica
  - `07_base_fractal.json` - Para padrões fractais
  - `08_arvore_natal.json` - Criatividade

---

## 🎯 Ordem Recomendada de Leitura

### Para Facilitadores (ANTES da sessão):

1. **`INSTALACAO.md`** (5 min)
   - Como instalar e testar rapidamente
   - Checklist pré-sessão

2. **`README.md`** (15-20 min)
   - Visão completa da atividade
   - Objetivos de aprendizagem
   - Estrutura dos 90 minutos

3. **`APRESENTACAO.md`** (10-15 min)
   - Script slide-by-slide
   - O que dizer em cada momento
   - Dicas durante a atividade

4. **Testar a aplicação** (10 min)
   - Abrir `index.html`
   - Experimentar exemplos
   - Garantir que tudo funciona

5. **Preparar apresentação** (Opcional)
   - Abrir `apresentacao.html` no browser
   - Praticar navegação (setas ou espaço)

### Durante a Sessão:

- **Projetar:** `apresentacao.html` (slides interativos)
- **Ter aberto:** `APRESENTACAO.md` (notas)
- **Distribuir:** `DESAFIOS.md` (impresso ou digital)
- **Para consulta:** `GUIA.md` (num ecrã auxiliar ou impresso)

### Para Participantes:

1. **`GUIA.md`** - Ler durante exploração inicial
2. **`DESAFIOS.md`** - Usar durante exercícios práticos
3. **`exemplos/*.json`** - Copiar e modificar livremente

---

## ⚡ Quick Start (5 minutos)

```bash
# 1. Extrair ficheiros
unzip clube-codigo-3d-completo.zip
cd clube-codigo-3d/

# 2. Iniciar servidor
python3 -m http.server 8000

# 3. Abrir browser
# http://localhost:8000
```

**PRONTO!** ✅

---

## 📋 Checklist de Preparação

### 1 semana antes:
- [ ] Ler toda a documentação
- [ ] Testar aplicação num PC
- [ ] Decidir se imprime ou projeta GUIA.md
- [ ] Imprimir DESAFIOS.md (1 por participante)

### 1 dia antes:
- [ ] Testar em TODOS os PCs da sala
- [ ] Preparar `apresentacao.html` no PC do projetor
- [ ] Confirmar que Python está instalado
- [ ] Ter browser(s) atualizados

### 1 hora antes:
- [ ] Iniciar servidor em cada PC
- [ ] Abrir browsers com aplicação
- [ ] Testar projetor
- [ ] Organizar sala

### Ao começar:
- [ ] Todos vêem o ecrã do projetor?
- [ ] Todos têm aplicação aberta?
- [ ] Folhas de DESAFIOS distribuídas?
- [ ] Timer visível?

---

## 🎓 Estrutura da Sessão (90 min)

```
┌─────────────────────────────────────┐
│ 0:00 - 0:15  Apresentação           │ apresentacao.html
├─────────────────────────────────────┤
│ 0:15 - 0:35  Exploração Guiada      │ GUIA.md
├─────────────────────────────────────┤
│ 0:35 - 1:15  Desafios Individuais   │ DESAFIOS.md
├─────────────────────────────────────┤
│ 1:15 - 1:30  Galeria + Discussão    │
└─────────────────────────────────────┘
```

---

## 🎯 Objetivos de Aprendizagem

Ao final da sessão, os participantes devem conseguir:

**Técnicos:**
- ✓ Editar JSON sem erros de sintaxe
- ✓ Entender coordenadas x,y e o seu efeito
- ✓ Criar formas 3D intencionalmente
- ✓ Usar interface de controlo

**Conceptuais:**
- ✓ Compreender revolução de sólidos
- ✓ Relacionar valores com resultados visuais
- ✓ Pensar espacialmente (3D)
- ✓ Entender padrões fractais (básico)

**Atitudinais:**
- ✓ Confortável com experimentação
- ✓ Persistente perante erros
- ✓ Criativo na exploração
- ✓ Capaz de iterar e melhorar

---

## 💡 Conceitos Chave

### JSON (JavaScript Object Notation)
Formato simples para estruturar dados. Fácil de ler e escrever.

### Curvas Bézier
Curvas suaves definidas por pontos de controlo. Base das formas.

### Revolução de Sólidos
Técnica de criar objetos 3D rodando uma curva 360° em torno de um eixo.

### Sistemas de Coordenadas
- **x**: distância do centro (raio)
- **y**: altura vertical

### Padrões Fractais
Repetição de formas em escalas diferentes, criando complexidade.

---

## 🐛 Problemas Comuns e Soluções

| Problema | Solução Rápida |
|----------|----------------|
| "JSON inválido" | Verifica vírgulas, aspas duplas |
| "Não vejo objeto" | Clica "Carregar", tenta "Resetar Câmera" |
| "Forma estranha" | Verifica ordem dos pontos (y crescente) |
| "Servidor não inicia" | Tenta outra porta: `python3 -m http.server 8080` |
| "Browser não carrega" | Abre index.html diretamente (último recurso) |

---

## 🔧 Requisitos Técnicos

### Mínimos:
- Linux (Ubuntu ou similar)
- Python 3.x (para servidor HTTP)
- Browser moderno (Firefox, Chrome)
- ~50MB espaço em disco
- Resolução mínima: 1024x768

### Recomendados:
- Ecrã grande ou projetor
- Mouse (melhor que touchpad)
- Ecrã auxiliar para documentação
- Impressora (para DESAFIOS.md)

---

## 📊 Avaliação

### Durante a Atividade:
Observa se os participantes:
- [ ] Editam JSON corretamente
- [ ] Prevêem resultados antes de testar
- [ ] Iteratem até conseguir objetivo
- [ ] Ajudam-se mutuamente
- [ ] Experimentam criativamente

### No Final:
- Quantos desafios completaram?
- Criaram algo original?
- Entenderam os conceitos?
- Gostaram da experiência?
- Querem continuar?

---

## 🎁 Recursos Adicionais

### Links Úteis:
- **Three.js:** https://threejs.org/
- **Curvas Bézier:** https://cubic-bezier.com/
- **JSON Validator:** https://jsonlint.com/
- **Tutorial JSON:** https://www.json.org/json-pt.html

### Para Continuar:
- Criar mais exemplos JSON
- Explorar código JavaScript
- Adicionar texturas e materiais
- Exportar para impressão 3D
- Combinar múltiplos objetos

---

## 📝 Ficheiros por Categoria

### Essenciais (não podes dispensar):
1. `index.html` - Aplicação
2. `app.js` - Lógica
3. `INSTALACAO.md` - Setup

### Muito Importantes:
4. `README.md` - Overview completo
5. `GUIA.md` - Tutorial para participantes
6. `DESAFIOS.md` - Exercícios práticos

### Úteis:
7. `APRESENTACAO.md` - Notas detalhadas
8. `apresentacao.html` - Slides interativos
9. `exemplos/` - 8 ficheiros JSON

### Opcional:
10. Este ficheiro (`INDEX.md`) - Navegação

---

## 🌟 Dicas de Sucesso

1. **Testa TUDO antes** - Nada de surpresas!
2. **Começa simples** - Exemplos básicos primeiro
3. **Encoraja experimentação** - Não há erros, só descobertas
4. **Celebra sucessos** - Mostra criações interessantes
5. **Adapta ao ritmo** - Flexibilidade é chave
6. **Diverte-te!** - Se te divertires, eles também se divertem

---

## 📧 Feedback e Melhorias

Depois da sessão, considera:

1. **Recolher feedback dos participantes**
   - O que gostaram mais?
   - O que foi difícil?
   - Sugestões de melhoria?

2. **Auto-avaliação**
   - Timing funcionou?
   - Todos conseguiram acompanhar?
   - Algo a melhorar?

3. **Partilhar experiência**
   - Documentar casos interessantes
   - Guardar criações dos participantes
   - Partilhar com outros facilitadores

---

## 🎯 Próximos Passos

### Sessão Única:
- Completa todos os desafios
- Galeria final
- Exportar criações
- Feedback

### Múltiplas Sessões:
**Sessão 1:** Básico (este pacote)
**Sessão 2:** Avançado
- Texturas e materiais
- Múltiplos objetos
- Animações complexas

**Sessão 3:** Projeto Final
- Criar algo grande
- Apresentações
- Portfólio

---

## ✅ Checklist Final

Antes de começar a sessão, confirma:

**Preparação:**
- [ ] Li toda a documentação
- [ ] Testei aplicação
- [ ] Material impresso pronto
- [ ] Sala organizada

**Técnico:**
- [ ] Todos os PCs funcionam
- [ ] Servidores a correr
- [ ] Browsers abertos
- [ ] Projetor testado

**Pessoal:**
- [ ] Confiante com o material
- [ ] Entusiasta pela atividade
- [ ] Pronto para adaptar
- [ ] Timer preparado

---

## 🎊 Está Tudo Pronto!

Tens tudo o que precisas para uma sessão incrível!

**Lembra-te:**
- O objetivo é aprender E divertir
- Erros são oportunidades
- Cada participante vai ao seu ritmo
- Criatividade não tem limites

**Agora é só:**
1. Preparar a sala
2. Testar os PCs
3. Receber os participantes
4. DIVERTIR! 🎨✨

---

**Boa sessão!** 🚀

Se tiveres dúvidas, consulta:
- `INSTALACAO.md` para problemas técnicos
- `README.md` para visão geral
- `APRESENTACAO.md` para dicas de apresentação

---

*Preparado com ❤️ para o Clube de Código*  
*Centro de Inovação Carlos Fiolhais*  
*Janeiro 2025*
