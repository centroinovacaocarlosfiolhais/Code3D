# 🧱 Pixel3D — Modelador Voxel

**Clube de Código · Centro de Inovação Carlos Fiolhais**  
Atividade pedagógica para jovens dos 12–15 anos · 90 minutos

---

## O que é o Pixel3D?

O Pixel3D é um modelador 3D voxel que corre diretamente no browser, sem instalação. Os participantes constroem modelos 3D bloco a bloco, como no Minecraft, usando uma paleta de **16 cores PICO-8** num grid de **16×16×16** células.

No final da sessão, cada participante exporta um **GIF animado** com o seu modelo a rodar 360° — pronto para partilhar nas redes sociais.

---

## 🚀 Início Rápido

```bash
# 1. Extrair ficheiros
unzip pixel3d.zip && cd pixel3d/

# 2. Iniciar servidor
python3 -m http.server 8000

# 3. Abrir no browser
# http://localhost:8000
```

---

## 📦 Estrutura

```
pixel3d/
├── index.html              ← Aplicação principal
├── app.js                  ← Lógica (Three.js + GIF encoder)
├── apresentacao.html       ← 11 slides para o facilitador
├── README.md               ← Este ficheiro
├── GUIAO_DINAMIZADOR.md    ← Guião completo da sessão
├── FICHA_PROJETO_STEP.md   ← Ficha para os participantes (STEP)
├── DESAFIOS.md             ← Folha de desafios para imprimir
├── GUIA.md                 ← Tutorial para os participantes
└── INSTALACAO.md           ← Guia rápido de instalação
```

---

## 🎯 Objetivos de Aprendizagem

- Compreender o conceito de **voxel** e espaço tridimensional  
- Trabalhar com **coordenadas XYZ** de forma intuitiva  
- Perceber como dados são representados em computador (arrays 3D)  
- Exportar conteúdo digital criativo (GIF animado)  
- Desenvolver pensamento espacial e criatividade dentro de restrições

---

## 🔧 Requisitos

- Browser moderno (Chrome 90+, Firefox 88+, Edge 90+)  
- Python 3 para servidor local (recomendado)  
- Resolução mínima: 1280×720

---

## 📋 Estrutura da Sessão (90 min)

| Fase | Tempo | Atividade |
|------|-------|-----------|
| Setup | 10 min | Abrir app, explorar templates |
| Trigger | 10 min | Demo ao vivo do facilitador |
| Exploration | 20 min | Exploração livre com templates |
| Production | 35 min | Desafios progressivos |
| Retrospetiva | 15 min | Galeria de GIFs + reflexão |

---

## ⚡ Funcionalidades da App

- **5 templates** pré-fabricados (Humanóide, Animal, Foguetão, Árvore, Casa)  
- **16 cores** da paleta PICO-8  
- **Seletor de camada Y** (↑↓ ou slider)  
- **Modos** Adicionar / Apagar  
- **Rotação automática**  
- **Export GIF** animado 240×240 (24 frames, codificação LZW inline)  
- **Export PNG** screenshot  
- **Export TXT** visualização por camadas (pedagógico)  
- Câmera 3D livre (órbita + pan + zoom)

---

## 🐛 Resolução de Problemas

| Problema | Solução |
|----------|---------|
| App não abre | Usar servidor Python, não abrir diretamente |
| GIF demora muito | Normal — 24 frames a render |
| Câmera perdida | Clicar "🎥 Reset" no painel |
| Blocos no sítio errado | Verificar a camada Y ativa |

---

*Preparado com ❤️ para o Clube de Código · CICF · 2026*  
*Licença MIT*
