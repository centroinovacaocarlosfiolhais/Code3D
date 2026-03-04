// ========================================
// CONFIGURAÇÃO GLOBAL
// ========================================

let scene, camera, renderer, controls;
let objetoAtual = null;
let grupoFractal = null;
let animando = false;
let configuracaoAtual = null;

// Configurações padrão
const CONFIG_PADRAO = {
    segmentos: 20,
    repeticoes: 0,
    escalaFractal: 0.5,
    cor: "#f5a623"
};

// ========================================
// INICIALIZAÇÃO
// ========================================

function init() {
    // Criar cena
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050608);
    scene.fog = new THREE.Fog(0x050608, 12, 55);

    // Configurar câmera
    camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(1.5, 3, 8);
    camera.lookAt(1.5, 0, 0);

    // Configurar renderer
    renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: true // Necessário para exportar imagens
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.getElementById('viewport').appendChild(renderer.domElement);

    // Adicionar luzes
    configurarLuzes();

    // Adicionar grid
    const gridHelper = new THREE.GridHelper(20, 20, 0x283550, 0x1a2030);
    gridHelper.material.opacity = 0.3;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);

    // Adicionar eixos
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    // Configurar controles de câmera
    configurarControlesCamara();

    // Event listeners
    window.addEventListener('resize', onWindowResize);

    // Carregar exemplo inicial
    carregarExemplo('vaso');

    // Iniciar loop de animação
    animate();
}

function configurarLuzes() {
    // Luz ambiente
    const luzAmbiente = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(luzAmbiente);

    // Luz direcional principal
    const luzDirecional = new THREE.DirectionalLight(0xffffff, 0.8);
    luzDirecional.position.set(5, 10, 7);
    luzDirecional.castShadow = true;
    luzDirecional.shadow.camera.near = 0.1;
    luzDirecional.shadow.camera.far = 50;
    scene.add(luzDirecional);

    // Luz de preenchimento
    const luzPreenchimento = new THREE.DirectionalLight(0x4488ff, 0.3);
    luzPreenchimento.position.set(-5, 5, -5);
    scene.add(luzPreenchimento);

    // Luz hemisférica
    const luzHemisferica = new THREE.HemisphereLight(0x00ff88, 0x080820, 0.3);
    scene.add(luzHemisferica);
}

// ========================================
// CRIAÇÃO DE GEOMETRIAS BÉZIER
// ========================================

function criarCurvaBezier(pontos) {
    // Converter pontos JSON em Vector2
    const vetores = pontos.map(p => new THREE.Vector2(p.x, p.y));
    
    // Criar curva Bézier cúbica
    let curva;
    
    if (vetores.length === 4) {
        // Curva Bézier cúbica (4 pontos)
        curva = new THREE.CubicBezierCurve(
            vetores[0], vetores[1], vetores[2], vetores[3]
        );
    } else if (vetores.length === 3) {
        // Curva Bézier quadrática (3 pontos)
        curva = new THREE.QuadraticBezierCurve(
            vetores[0], vetores[1], vetores[2]
        );
    } else if (vetores.length > 4) {
        // Curva spline para mais pontos
        curva = new THREE.SplineCurve(vetores);
    } else {
        console.error("Necessário pelo menos 3 pontos para criar curva");
        return null;
    }
    
    return curva;
}

function criarGeometriaRevolucao(config) {
    const curva = criarCurvaBezier(config.pontos);
    if (!curva) return null;

    // Obter pontos da curva
    const segmentos = parseInt(document.getElementById('segmentos').value);
    const pontosCurva = curva.getPoints(segmentos);

    // Verificar se o primeiro e último ponto estão no centro (x = 0)
    // Se não estiverem, forçar o fechamento das tampas
    const primeiroPonto = pontosCurva[0];
    const ultimoPonto = pontosCurva[pontosCurva.length - 1];
    
    // Se os pontos não estão no centro, ajustar para criar tampas
    if (primeiroPonto.x > 0.01) {
        pontosCurva.unshift(new THREE.Vector2(0, primeiroPonto.y));
    }
    if (ultimoPonto.x > 0.01) {
        pontosCurva.push(new THREE.Vector2(0, ultimoPonto.y));
    }

    // Criar geometria de revolução (lathe)
    const geometry = new THREE.LatheGeometry(
        pontosCurva,
        segmentos,
        0,
        Math.PI * 2
    );

    return geometry;
}

// ========================================
// SISTEMA FRACTAL
// ========================================

function criarFractal(geometriaBase, material, nivel, escala, posicaoBase = new THREE.Vector3(0, 0, 0)) {
    const grupo = new THREE.Group();

    // Criar objeto principal
    const objetoPrincipal = new THREE.Mesh(geometriaBase, material);
    objetoPrincipal.position.copy(posicaoBase);
    objetoPrincipal.castShadow = true;
    objetoPrincipal.receiveShadow = true;
    grupo.add(objetoPrincipal);

    // Se ainda há níveis, criar recursivamente
    if (nivel > 0) {
        const numCopias = 4; // Número de cópias ao redor
        const raioFractal = parseFloat(document.getElementById('raio-fractal').value);
        const raio = raioFractal * escala;
        
        for (let i = 0; i < numCopias; i++) {
            const angulo = (i / numCopias) * Math.PI * 2;
            const x = Math.cos(angulo) * raio;
            const z = Math.sin(angulo) * raio;
            const y = posicaoBase.y;

            // Criar sub-fractal recursivamente
            const subGrupo = criarFractal(
                geometriaBase,
                material.clone(),
                nivel - 1,
                escala * parseFloat(document.getElementById('escala-fractal').value),
                new THREE.Vector3(x, y, z)
            );

            // Escalar o sub-grupo
            subGrupo.scale.multiplyScalar(escala);
            grupo.add(subGrupo);
        }
    }

    return grupo;
}

// ========================================
// CARREGAR E PROCESSAR JSON
// ========================================

function removerComentariosJSON(jsonString) {
    // Remove comentários de linha única (//)
    // Remove comentários de várias linhas (/* */)
    return jsonString
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove /* ... */
        .replace(/\/\/.*/g, '');          // Remove // ...
}

function carregarJSON() {
    try {
        let jsonText = document.getElementById('json-editor').value;
        
        // Remover comentários antes de fazer parse
        jsonText = removerComentariosJSON(jsonText);
        
        const config = JSON.parse(jsonText);
        
        // Validar configuração
        if (!config.pontos || config.pontos.length < 3) {
            mostrarMensagem("Erro: Necessário pelo menos 3 pontos na curva!", true);
            return;
        }

        // Limpar objetos anteriores
        limparObjetos();

        // Guardar configuração
        configuracaoAtual = config;

        // Criar geometria base
        const geometry = criarGeometriaRevolucao(config);
        if (!geometry) {
            mostrarMensagem("Erro ao criar geometria!", true);
            return;
        }

        // Criar material
        const cor = document.getElementById('cor-objeto').value;
        const material = new THREE.MeshPhongMaterial({
            color: cor,
            shininess: 80,
            specular: 0x222222,
            flatShading: false,
            side: THREE.DoubleSide // Renderizar ambos os lados
        });

        // Verificar se deve criar fractal
        const repeticoes = parseInt(document.getElementById('repeticoes').value);
        
        if (repeticoes > 0) {
            const escalaInicial = parseFloat(document.getElementById('escala-fractal').value);
            grupoFractal = criarFractal(geometry, material, repeticoes, escalaInicial);
            scene.add(grupoFractal);
            objetoAtual = grupoFractal;
        } else {
            // Criar objeto único
            objetoAtual = new THREE.Mesh(geometry, material);
            objetoAtual.castShadow = true;
            objetoAtual.receiveShadow = true;
            scene.add(objetoAtual);
        }

        mostrarMensagem("✓ Objeto criado com sucesso!");

    } catch (error) {
        console.error(error);
        mostrarMensagem("Erro no JSON: " + error.message, true);
    }
}

function limparObjetos() {
    if (objetoAtual) {
        scene.remove(objetoAtual);
        if (objetoAtual.geometry) objetoAtual.geometry.dispose();
        if (objetoAtual.material) objetoAtual.material.dispose();
        objetoAtual = null;
    }

    if (grupoFractal) {
        scene.remove(grupoFractal);
        grupoFractal.traverse((child) => {
            if (child.geometry) child.geometry.dispose();
            if (child.material) child.material.dispose();
        });
        grupoFractal = null;
    }
}

// ========================================
// EXEMPLOS PRÉ-DEFINIDOS
// ========================================

const EXEMPLOS = {
    vaso: `{
  // Nome do objeto
  "nome": "Vaso Elegante",
  
  // Descrição do que faz
  "descricao": "Um vaso criado através de revolução de uma curva Bézier",
  
  // Pontos de controlo da curva Bézier
  // Formato: {x: distância do centro, y: altura}
  // x >= 0 sempre (não pode ser negativo!)
  "pontos": [
    {"x": 0.1, "y": 0},    // Base - quase fechado
    {"x": 1.5, "y": 1},    // Expande para fora
    {"x": 1.2, "y": 2.5},  // Cintura
    {"x": 1.8, "y": 4}     // Topo largo
  ]
}`,

    taca: `{
  "nome": "Taça",
  "descricao": "Uma taça elegante com base, haste e cálice",
  "pontos": [
    {"x": 0.0, "y": 0},    // Centro da base
    {"x": 1.2, "y": 0},    // Borda da base
    {"x": 1.0, "y": 0.2},  // Transição
    {"x": 0.2, "y": 0.5},  // Haste fina começa
    {"x": 0.2, "y": 2.0},  // Haste fina continua
    {"x": 0.4, "y": 2.2},  // Transição para cálice
    {"x": 1.5, "y": 3.5},  // Cálice expande
    {"x": 1.3, "y": 4.5}   // Borda do cálice
  ]
}`,

    ampulheta: `{
  "nome": "Ampulheta",
  "descricao": "Forma de ampulheta com estreitamento no meio",
  "pontos": [
    {"x": 0.1, "y": 0},    // Base fechada
    {"x": 1.5, "y": 0.8},  // Expande
    {"x": 0.3, "y": 2},    // Estreita no meio
    {"x": 1.5, "y": 3.2},  // Expande novamente
    {"x": 0.1, "y": 4}     // Topo fechado
  ]
}`,

    sino: `{
  "nome": "Sino",
  "descricao": "Sino com forma característica",
  "pontos": [
    {"x": 0.0, "y": 0},    // Centro do topo
    {"x": 0.3, "y": 0.5},  // Pequena expansão
    {"x": 0.4, "y": 1.5},  // Corpo começa
    {"x": 1.8, "y": 3.0},  // Expande muito
    {"x": 2.0, "y": 3.5},  // Borda larga
    {"x": 1.7, "y": 3.7}   // Curva final
  ]
}`,

    fractal: `{
  // Forma simples ideal para fractais!
  "nome": "Base Fractal",
  "descricao": "Forma simples ideal para criar padrões fractais complexos",
  "pontos": [
    {"x": 0.1, "y": 0},    // Base
    {"x": 0.8, "y": 1},    // Expande
    {"x": 0.6, "y": 2},    // Curva
    {"x": 0.3, "y": 2.5}   // Topo
  ]
  // DICA: Ativa repetições fractais = 3 e vê a magia!
}`
};

function carregarExemplo(nome) {
    if (EXEMPLOS[nome]) {
        document.getElementById('json-editor').value = EXEMPLOS[nome];
        carregarJSON();
    }
}

// ========================================
// CONTROLES DE INTERFACE
// ========================================

function alterarCor() {
    if (!objetoAtual) return;

    const cor = document.getElementById('cor-objeto').value;
    
    objetoAtual.traverse((child) => {
        if (child.isMesh && child.material) {
            child.material.color.set(cor);
        }
    });
}

function alterarSegmentos() {
    const valor = document.getElementById('segmentos').value;
    document.getElementById('segmentos-valor').textContent = valor;
    
    // Recarregar objeto se existir configuração
    if (configuracaoAtual) {
        carregarJSON();
    }
}

function alterarRepeticoes() {
    const valor = document.getElementById('repeticoes').value;
    document.getElementById('repeticoes-valor').textContent = valor;
    
    // Recarregar objeto se existir configuração
    if (configuracaoAtual) {
        carregarJSON();
    }
}

function alterarRaioFractal() {
    const valor = document.getElementById('raio-fractal').value;
    document.getElementById('raio-fractal-valor').textContent = valor;
    
    // Recarregar objeto se existir configuração e está em modo fractal
    const repeticoes = parseInt(document.getElementById('repeticoes').value);
    if (configuracaoAtual && repeticoes > 0) {
        carregarJSON();
    }
}

function alterarEscalaFractal() {
    const valor = document.getElementById('escala-fractal').value;
    document.getElementById('escala-fractal-valor').textContent = valor;
    
    // Recarregar objeto se existir configuração e está em modo fractal
    const repeticoes = parseInt(document.getElementById('repeticoes').value);
    if (configuracaoAtual && repeticoes > 0) {
        carregarJSON();
    }
}

function iniciarRotacao() {
    animando = true;
}

function pararRotacao() {
    animando = false;
}

function resetarCamera() {
    camera.position.set(1.5, 3, 8);
    cameraTarget.set(1.5, 0, 0);
    camera.lookAt(cameraTarget);
    mostrarMensagem("Câmera resetada");
}

function limparCena() {
    limparObjetos();
    document.getElementById('json-editor').value = '';
    configuracaoAtual = null;
    mostrarMensagem("Cena limpa");
}

// ========================================
// IMPORT/EXPORT DE FICHEIROS
// ========================================

function importarFicheiro() {
    document.getElementById('file-input').click();
}

function lerFicheiro() {
    const input = document.getElementById('file-input');
    const file = input.files[0];
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('json-editor').value = e.target.result;
            carregarJSON();
            mostrarMensagem("Ficheiro carregado!");
        };
        reader.readAsText(file);
    }
}

function exportarJSON() {
    const jsonText = document.getElementById('json-editor').value;
    
    try {
        // Remover comentários antes de validar
        const jsonLimpo = removerComentariosJSON(jsonText);
        JSON.parse(jsonLimpo);
        
        // Copiar JSON original (com comentários) para clipboard
        navigator.clipboard.writeText(jsonText).then(() => {
            mostrarMensagem("JSON copiado para clipboard!");
        }).catch(() => {
            mostrarMensagem("JSON validado! (Clipboard indisponível)", false);
        });
    } catch (error) {
        mostrarMensagem("Erro: JSON inválido!", true);
    }
}

function exportarFicheiro() {
    const jsonText = document.getElementById('json-editor').value;
    
    try {
        // Remover comentários antes de validar
        const jsonLimpo = removerComentariosJSON(jsonText);
        const config = JSON.parse(jsonLimpo);
        
        // Criar blob e download com JSON original (com comentários)
        const blob = new Blob([jsonText], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = (config.nome || 'objeto') + '.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        mostrarMensagem("Ficheiro descarregado!");
    } catch (error) {
        mostrarMensagem("Erro: JSON inválido!", true);
    }
}

function exportarPNG() {
    if (!objetoAtual) {
        mostrarMensagem("Nenhum objeto para exportar!", true);
        return;
    }

    try {
        // Guardar cor de fundo atual
        const corFundoOriginal = scene.background;
        const fogOriginal = scene.fog;
        
        // Definir fundo transparente
        scene.background = null;
        scene.fog = null;
        
        // Renderizar uma frame
        renderer.render(scene, camera);
        
        // Capturar imagem
        const dataURL = renderer.domElement.toDataURL('image/png');
        
        // Restaurar configurações originais
        scene.background = corFundoOriginal;
        scene.fog = fogOriginal;
        
        // Criar link de download
        const a = document.createElement('a');
        a.href = dataURL;
        
        // Nome do arquivo baseado na configuração ou timestamp
        const nomeArquivo = configuracaoAtual?.nome 
            ? configuracaoAtual.nome.toLowerCase().replace(/\s+/g, '_')
            : 'objeto_3d';
        a.download = `${nomeArquivo}_${Date.now()}.png`;
        
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        mostrarMensagem("✓ Imagem PNG exportada!");
        
    } catch (error) {
        console.error(error);
        mostrarMensagem("Erro ao exportar PNG: " + error.message, true);
    }
}

function exportarSTL() {
    if (!objetoAtual) {
        mostrarMensagem("Nenhum objeto para exportar!", true);
        return;
    }

    try {
        // Verificar se STLExporter está disponível
        if (typeof THREE.STLExporter === 'undefined') {
            mostrarMensagem("STLExporter não carregado. A recarregar...", true);
            // Tentar carregar manualmente
            const script = document.createElement('script');
            script.src = 'https://threejs.org/examples/js/exporters/STLExporter.js';
            script.onload = () => exportarSTL();
            document.head.appendChild(script);
            return;
        }

        // Guardar escala original
        const escalaOriginal = objetoAtual.scale.clone();
        
        // Escalar objeto 10x (1000%) para tamanho adequado para impressão 3D
        objetoAtual.scale.multiplyScalar(10);
        objetoAtual.updateMatrixWorld(true);

        const exporter = new THREE.STLExporter();
        
        // Exportar como binário (mais compacto)
        const stlString = exporter.parse(objetoAtual, { binary: true });
        
        // Restaurar escala original
        objetoAtual.scale.copy(escalaOriginal);
        objetoAtual.updateMatrixWorld(true);
        
        // Criar blob e download
        const blob = new Blob([stlString], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        
        // Nome do arquivo
        const nomeArquivo = configuracaoAtual?.nome 
            ? configuracaoAtual.nome.toLowerCase().replace(/\s+/g, '_')
            : 'objeto_3d';
        a.download = `${nomeArquivo}.stl`;
        
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        mostrarMensagem("✓ Ficheiro STL exportado (escala 10x)!");
        
    } catch (error) {
        console.error(error);
        mostrarMensagem("Erro ao exportar STL: " + error.message, true);
    }
}

// ========================================
// EXPORTAR A4 — GALERIA DE PROJETOS
// ========================================

function exportarA4() {
    if (!objetoAtual) {
        mostrarMensagem("Nenhum objeto para exportar!", true);
        return;
    }

    // Abrir modal para pedir nome do criador
    document.getElementById('modal-a4').style.display = 'flex';
    document.getElementById('input-criador').value = '';
    document.getElementById('input-criador').focus();
}

function confirmarA4() {
    const nomeCriador = document.getElementById('input-criador').value.trim() || 'Anónimo';
    document.getElementById('modal-a4').style.display = 'none';
    gerarFolhaA4(nomeCriador);
}

function cancelarA4() {
    document.getElementById('modal-a4').style.display = 'none';
}

function gerarFolhaA4(nomeCriador) {
    // A4 a 150dpi: 1240 × 1754px
    const W = 1240;
    const H = 1754;
    const PAD = 60;

    // Capturar viewport com fundo transparente
    const corFundoOriginal = scene.background;
    const fogOriginal = scene.fog;
    scene.background = null;
    scene.fog = null;
    renderer.render(scene, camera);
    const modeloDataURL = renderer.domElement.toDataURL('image/png');
    scene.background = corFundoOriginal;
    scene.fog = fogOriginal;

    // Criar canvas A4
    const canvas = document.createElement('canvas');
    canvas.width  = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');

    // Fundo branco
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, W, H);

    // Linha divisória horizontal a meio
    const meioY = H / 2;

    // ── METADE SUPERIOR: modelo 3D ──────────────────────────

    // Fundo cinza muito claro para a área da imagem
    ctx.fillStyle = '#f4f4f4';
    ctx.fillRect(PAD, PAD, W - PAD * 2, meioY - PAD * 2);

    // Título principal (nome do criador)
    ctx.fillStyle = '#111111';
    ctx.font = 'bold 52px "Share Tech Mono", monospace, monospace';
    ctx.textAlign = 'left';
    ctx.fillText(nomeCriador.toUpperCase(), PAD, PAD - 12);

    // Subtítulo (nome do objeto)
    const nomeObjeto = configuracaoAtual?.nome || 'Objeto 3D';
    ctx.fillStyle = '#f5a623';
    ctx.font = '30px "Share Tech Mono", monospace';
    ctx.fillText(nomeObjeto, PAD, PAD + 28);

    // Data
    const dataStr = new Date().toLocaleDateString('pt-PT', { day:'2-digit', month:'long', year:'numeric' });
    ctx.fillStyle = '#999999';
    ctx.font = '20px "Share Tech Mono", monospace';
    ctx.textAlign = 'right';
    ctx.fillText(dataStr, W - PAD, PAD + 28);
    ctx.textAlign = 'left';

    // Desenhar imagem do modelo centrada na metade superior
    const img = new Image();
    img.onload = () => {
        // Área disponível para a imagem
        const areaX = PAD + 10;
        const areaY = PAD + 45;
        const areaW = W - PAD * 2 - 20;
        const areaH = meioY - PAD * 2 - 55;

        // Manter aspect ratio
        const ratio = Math.min(areaW / img.width, areaH / img.height);
        const iW = img.width  * ratio;
        const iH = img.height * ratio;
        const iX = areaX + (areaW - iW) / 2;
        const iY = areaY + (areaH - iH) / 2;

        ctx.drawImage(img, iX, iY, iW, iH);

        // ── LINHA DIVISÓRIA ──────────────────────────────────
        ctx.strokeStyle = '#e0e0e0';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(PAD, meioY);
        ctx.lineTo(W - PAD, meioY);
        ctx.stroke();

        // Etiqueta da secção JSON
        ctx.fillStyle = '#111111';
        ctx.font = 'bold 18px "Share Tech Mono", monospace';
        ctx.fillText('// JSON SOURCE', PAD, meioY + 38);

        ctx.fillStyle = '#f5a623';
        ctx.font = '14px "Share Tech Mono", monospace';
        ctx.fillText('Code3D — Centro de Inovação Carlos Fiolhais', PAD, meioY + 62);

        // ── METADE INFERIOR: JSON ────────────────────────────
        const jsonRaw    = document.getElementById('json-editor').value;
        const jsonLinhas = jsonRaw.split('\n');

        const jsonX    = PAD;
        const jsonY    = meioY + 85;
        const jsonMaxH = H - meioY - 85 - PAD;
        const fontSize = 17;
        const lineH    = fontSize * 1.55;

        // Quantas linhas cabem
        const maxLinhas = Math.floor(jsonMaxH / lineH);

        ctx.font = `${fontSize}px "Share Tech Mono", monospace`;

        jsonLinhas.slice(0, maxLinhas).forEach((linha, i) => {
            const y = jsonY + i * lineH;

            // Colorir por tipo de token (básico)
            if (linha.trim().startsWith('//')) {
                ctx.fillStyle = '#999999'; // comentário
            } else if (/"[^"]+"\s*:/.test(linha)) {
                // Linha com chave — desenhar chave em âmbar, valor em verde
                const partes = linha.match(/^(\s*)(")([^"]+)(")\s*:\s*(.*)$/);
                if (partes) {
                    const indent = partes[1];
                    const chave  = `"${partes[3]}"`;
                    const resto  = `: ${partes[5]}`;

                    ctx.fillStyle = '#999999';
                    ctx.fillText(indent, jsonX, y);
                    const indW = ctx.measureText(indent).width;

                    ctx.fillStyle = '#f5a623';
                    ctx.fillText(chave, jsonX + indW, y);
                    const chaveW = ctx.measureText(chave).width;

                    ctx.fillStyle = '#444444';
                    ctx.fillText(resto, jsonX + indW + chaveW, y);
                    return;
                }
                ctx.fillStyle = '#444444';
            } else if (/[\[\]{},]/.test(linha) && !linha.includes('"')) {
                ctx.fillStyle = '#bbbbbb'; // estrutura
            } else {
                ctx.fillStyle = '#444444'; // valor
            }

            ctx.fillText(linha, jsonX, y);
        });

        // Se JSON foi cortado, mostrar "..."
        if (jsonLinhas.length > maxLinhas) {
            ctx.fillStyle = '#aaaaaa';
            ctx.font = 'italic 16px "Share Tech Mono", monospace';
            ctx.fillText(`... +${jsonLinhas.length - maxLinhas} linhas`, jsonX, jsonY + maxLinhas * lineH);
        }

        // ── RODAPÉ ───────────────────────────────────────────
        const rodapeY = H - 20;
        ctx.fillStyle = '#bbbbbb';
        ctx.font = '15px "Share Tech Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Centro de Inovação Carlos Fiolhais  ·  Code3D desenvolvido por David Marques  ·  CC BY-NC-ND 4.0  ·  ' + dataStr, W / 2, rodapeY);

        // ── ABRIR JANELA DE IMPRESSÃO ────────────────────────
        const dataURLfinal = canvas.toDataURL('image/png', 1.0);
        const win = window.open('', '_blank');
        win.document.write(`<!DOCTYPE html>
<html>
<head>
  <title>Code3D — ${nomeObjeto} — ${nomeCriador}</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { background:#fff; display:flex; justify-content:center; align-items:flex-start; }
    img  { width:210mm; height:297mm; display:block; }
    @media print {
      body { margin:0; }
      img  { width:210mm; height:297mm; page-break-after:avoid; }
    }
  </style>
</head>
<body>
  <img src="${dataURLfinal}">
  <script>
    window.onload = () => { window.print(); }
  <\/script>
</body>
</html>`);
        win.document.close();

        mostrarMensagem("✓ Folha A4 gerada!");
    };

    img.src = modeloDataURL;
}

// ========================================
// FOCAL LENGTH / FOV CONTROL
// ========================================

// FOV range: 5° (almost flat/ortho) → 60° (wide angle)
const FOV_MIN = 5;
const FOV_MAX = 60;

function ajustarFocal(valor) {
    // slider 0 = FOV_MIN (flat), slider 100 = FOV_MAX (wide)
    const fov = FOV_MIN + (valor / 100) * (FOV_MAX - FOV_MIN);
    camera.fov = fov;
    camera.updateProjectionMatrix();

    const label = document.getElementById('focal-value');
    if (label) label.textContent = Math.round(fov) + '°';
}



let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
let isPanning = false;
let cameraTarget = new THREE.Vector3(1.5, 0, 0);

function configurarControlesCamara() {
    const canvas = renderer.domElement;

    // Prevenir menu de contexto no botão direito
    canvas.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });

    canvas.addEventListener('mousedown', (e) => {
        isDragging = true;
        isPanning = (e.button === 2); // Botão direito = pan
        previousMousePosition = { x: e.clientX, y: e.clientY };
        e.preventDefault();
    });

    canvas.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;

        if (isPanning) {
            // Modo PAN (Botão direito + arrastar)
            const panSpeed = 0.01;
            const right = new THREE.Vector3();
            const up = new THREE.Vector3(0, 1, 0);
            
            camera.getWorldDirection(right);
            right.cross(up).normalize();
            
            cameraTarget.x -= right.x * deltaX * panSpeed;
            cameraTarget.z -= right.z * deltaX * panSpeed;
            cameraTarget.y += deltaY * panSpeed;
            
            camera.position.x -= right.x * deltaX * panSpeed;
            camera.position.z -= right.z * deltaX * panSpeed;
            camera.position.y += deltaY * panSpeed;
            
            camera.lookAt(cameraTarget);
        } else {
            // Modo ROTAÇÃO (botão esquerdo)
            const angulo = Math.atan2(
                camera.position.z - cameraTarget.z, 
                camera.position.x - cameraTarget.x
            );
            const raio = Math.sqrt(
                Math.pow(camera.position.x - cameraTarget.x, 2) + 
                Math.pow(camera.position.z - cameraTarget.z, 2)
            );

            const novoAngulo = angulo - deltaX * 0.01;
            camera.position.x = cameraTarget.x + Math.cos(novoAngulo) * raio;
            camera.position.z = cameraTarget.z + Math.sin(novoAngulo) * raio;

            camera.position.y -= deltaY * 0.02;
            camera.position.y = Math.max(0.5, Math.min(15, camera.position.y));

            camera.lookAt(cameraTarget);
        }

        previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    canvas.addEventListener('mouseup', () => {
        isDragging = false;
        isPanning = false;
    });

    canvas.addEventListener('wheel', (e) => {
        e.preventDefault();
        
        const delta = e.deltaY * 0.01;
        const direction = new THREE.Vector3();
        direction.subVectors(camera.position, cameraTarget);
        const distancia = direction.length();

        const novaDistancia = Math.max(3, Math.min(20, distancia + delta));
        direction.normalize().multiplyScalar(novaDistancia);
        camera.position.copy(cameraTarget).add(direction);
        
        camera.lookAt(cameraTarget);
    });
}

// ========================================
// UTILITÁRIOS
// ========================================

function mostrarMensagem(texto, erro = false) {
    const mensagem = document.getElementById('message');
    mensagem.textContent = texto;
    mensagem.className = erro ? 'error show' : 'show';
    
    setTimeout(() => {
        mensagem.classList.remove('show');
    }, 3000);
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const button = document.getElementById('toggle-sidebar');
    
    sidebar.classList.toggle('hidden');
    button.classList.toggle('moved');
    
    if (sidebar.classList.contains('hidden')) {
        button.textContent = '▶ Painel';
    } else {
        button.textContent = '◀ Painel';
    }
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// ========================================
// LOOP DE ANIMAÇÃO
// ========================================

function animate() {
    requestAnimationFrame(animate);

    // Rotação automática
    if (animando && objetoAtual) {
        objetoAtual.rotation.y += 0.01;
    }

    renderer.render(scene, camera);
}

// ========================================
// INICIAR APLICAÇÃO
// ========================================

window.addEventListener('load', init);
