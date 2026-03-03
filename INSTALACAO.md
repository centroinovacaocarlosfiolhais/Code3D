# ⚡ GUIA RÁPIDO DE INSTALAÇÃO

## 🚀 Para começar IMEDIATAMENTE (5 minutos):

### 1. Extrair ficheiros
```bash
unzip clube-codigo-3d.zip
cd clube-codigo-3d/
```

### 2. Iniciar servidor
```bash
python3 -m http.server 8000
```

### 3. Abrir no browser
Abre: `http://localhost:8000`

**PRONTO! ✅**

---

## 📋 Checklist Pré-Sessão

Fazer em **cada PC** antes dos participantes chegarem:

- [ ] Extrair ficheiros do ZIP
- [ ] Testar servidor local (`python3 -m http.server 8000`)
- [ ] Abrir browser em `http://localhost:8000`
- [ ] Verificar que vês o vaso inicial
- [ ] Testar editar JSON e clicar "Carregar"
- [ ] Testar controlos de mouse (arrastar, scroll)

**Tempo total:** ~2-3 minutos por PC

---

## 🖨️ Material para Imprimir

Antes da sessão, imprime (1 cópia por participante):

1. **DESAFIOS.md** - Folha de desafios com check-boxes
2. **GUIA.md** (opcional) - Referência detalhada

**OU** projecta o GUIA.md num ecrã auxiliar para consulta.

---

## 📦 Estrutura dos Ficheiros

```
clube-codigo-3d/
│
├── index.html              ← Aplicação web
├── app.js                  ← Lógica JavaScript
│
├── README.md               ← Para o facilitador
├── GUIA.md                 ← Para os participantes
├── DESAFIOS.md             ← Folha de exercícios
├── APRESENTACAO.md         ← Notas para apresentar
│
└── exemplos/               ← 8 exemplos JSON
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

## 🎯 Ordem de Leitura dos Documentos

**ANTES da sessão:**
1. `README.md` - Visão geral completa
2. `APRESENTACAO.md` - Como apresentar
3. Testar app (`index.html`)

**DURANTE a sessão:**
- Ter `APRESENTACAO.md` aberto
- Ter `GUIA.md` à mão para questões
- Dar `DESAFIOS.md` aos participantes

**PARA PARTICIPANTES:**
- `GUIA.md` - Tutorial completo
- `DESAFIOS.md` - Exercícios práticos
- `exemplos/*.json` - Para copiar/modificar

---

## 🔧 Resolução Rápida de Problemas

### "Servidor não inicia"
```bash
# Tenta outra porta
python3 -m http.server 8080

# Ou usa Python 2
python -m SimpleHTTPServer 8000
```

### "Browser não carrega"
1. Verifica firewall
2. Tenta `http://127.0.0.1:8000`
3. Último recurso: abre `index.html` directamente (pode ter limitações)

### "JSON não carrega"
- Verifica vírgulas no JSON
- Usa F12 para ver erros no console
- Copia exemplo funcional primeiro

---

## 💡 Dicas de Última Hora

1. **Testa TUDO antes** dos participantes chegarem
2. Tem **browser reserva** pronto (Firefox E Chrome)
3. Prepara **1-2 exemplos extra** teus próprios
4. Se possível, ter **ecrã auxiliar** com GUIA.md
5. **Timer visível** ajuda a gerir tempo dos desafios

---

## 📞 Se Algo Correr Mal

**Plano B - Demonstração Colectiva:**

Se muitos PCs tiverem problemas:
1. Um PC funcional ligado ao projetor
2. Fazer exercícios todos juntos
3. Cada participante diz valores, facilitador escreve
4. Todos vêem resultado projetado
5. Menos "hands-on" mas funciona!

---

## ⏱️ Timeline da Sessão (90 min)

```
0:00 - 0:15  │ Apresentação + Introdução
0:15 - 0:35  │ Exploração guiada (todos juntos)
0:35 - 1:15  │ Desafios individuais/pares
1:15 - 1:30  │ Galeria + Discussão
```

---

## ✅ Checklist Final

Antes de começar a sessão:

**Técnico:**
- [ ] Todos os PCs funcionam
- [ ] Servidor a correr em cada PC
- [ ] Browsers abertos
- [ ] Projetor ligado

**Material:**
- [ ] DESAFIOS.md impresso (1 por pessoa)
- [ ] GUIA.md disponível (impresso ou digital)
- [ ] Tua cópia de APRESENTACAO.md

**Ambiente:**
- [ ] Sala organizada
- [ ] Participantes sabem onde sentar
- [ ] Hora de início clara

---

**Tudo pronto? Diverte-te! 🎨✨**

**Qualquer problema:** Improvisa, adapta, continua! O importante é que aprendam e se divirtam. 😊
