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
    cor: "#00ff88"
};

// ========================================
// INICIALIZAÇÃO
// ========================================

function init() {
    // Criar cena
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0e27);
    scene.fog = new THREE.Fog(0x0a0e27, 10, 50);

    // Configurar câmera
    camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(0, 3, 8);
    camera.lookAt(0, 0, 0);

    // Configurar renderer
    renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.getElementById('viewport').appendChild(renderer.domElement);

    // Adicionar luzes
    configurarLuzes();

    // Adicionar grid
    const gridHelper = new THREE.GridHelper(20, 20, 0x00ff88, 0x1a2f3a);
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
        const raio = 2.5 * escala;
        
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
            flatShading: false
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
    camera.position.set(0, 3, 8);
    camera.lookAt(0, 0, 0);
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
        // Validar JSON
        JSON.parse(jsonText);
        
        // Copiar para clipboard
        navigator.clipboard.writeText(jsonText).then(() => {
            mostrarMensagem("JSON copiado para clipboard!");
        });
    } catch (error) {
        mostrarMensagem("Erro: JSON inválido!", true);
    }
}

function exportarFicheiro() {
    const jsonText = document.getElementById('json-editor').value;
    
    try {
        // Validar JSON
        const config = JSON.parse(jsonText);
        
        // Criar blob e download
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

// ========================================
// CONTROLES DE CÂMERA
// ========================================

let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };

function configurarControlesCamara() {
    const canvas = renderer.domElement;

    canvas.addEventListener('mousedown', (e) => {
        isDragging = true;
        previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    canvas.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;

        // Rotação orbital
        const angulo = Math.atan2(camera.position.z, camera.position.x);
        const raio = Math.sqrt(camera.position.x ** 2 + camera.position.z ** 2);

        const novoAngulo = angulo - deltaX * 0.01;
        camera.position.x = Math.cos(novoAngulo) * raio;
        camera.position.z = Math.sin(novoAngulo) * raio;

        camera.position.y -= deltaY * 0.02;
        camera.position.y = Math.max(0.5, Math.min(15, camera.position.y));

        camera.lookAt(0, 0, 0);

        previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    canvas.addEventListener('mouseup', () => {
        isDragging = false;
    });

    canvas.addEventListener('wheel', (e) => {
        e.preventDefault();
        
        const delta = e.deltaY * 0.01;
        const distancia = Math.sqrt(
            camera.position.x ** 2 +
            camera.position.y ** 2 +
            camera.position.z ** 2
        );

        const novaDistancia = Math.max(3, Math.min(20, distancia + delta));
        const fator = novaDistancia / distancia;

        camera.position.multiplyScalar(fator);
        camera.lookAt(0, 0, 0);
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
