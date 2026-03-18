// ============================================================
// PIXEL3D — app.js
// Modelador 3D Voxel para o Clube de Código
// Centro de Inovação Carlos Fiolhais
// ============================================================

const GRID_SIZE = 16;

// Paleta PICO-8 — 16 cores fixas
const PALETTE = [
    { hex: '#000000', r: 0,   g: 0,   b: 0,   name: 'Preto'    },
    { hex: '#1D2B53', r: 29,  g: 43,  b: 83,  name: 'Marinho'  },
    { hex: '#7E2553', r: 126, g: 37,  b: 83,  name: 'Bordô'    },
    { hex: '#008751', r: 0,   g: 135, b: 81,  name: 'Verde'     },
    { hex: '#AB5236', r: 171, g: 82,  b: 54,  name: 'Castanho' },
    { hex: '#5F574F', r: 95,  g: 87,  b: 79,  name: 'Cinza'    },
    { hex: '#C2C3C7', r: 194, g: 195, b: 199, name: 'Prata'    },
    { hex: '#FFF1E8', r: 255, g: 241, b: 232, name: 'Branco'   },
    { hex: '#FF004D', r: 255, g: 0,   b: 77,  name: 'Vermelho' },
    { hex: '#FFA300', r: 255, g: 163, b: 0,   name: 'Laranja'  },
    { hex: '#FFEC27', r: 255, g: 236, b: 39,  name: 'Amarelo'  },
    { hex: '#00E436', r: 0,   g: 228, b: 54,  name: 'Lima'     },
    { hex: '#29ADFF', r: 41,  g: 173, b: 255, name: 'Azul'     },
    { hex: '#83769C', r: 131, g: 118, b: 156, name: 'Lilás'    },
    { hex: '#FF77A8', r: 255, g: 119, b: 168, name: 'Rosa'     },
    { hex: '#FFCCAA', r: 255, g: 204, b: 170, name: 'Pêssego'  },
];

// Templates pré-fabricados: [gx, gy, gz, colorIdx]
const TEMPLATES = {
    humanoid: {
        nome: 'Humanóide', emoji: '🤖',
        blocos: [
            [5,0,7,5],[6,0,7,5],[5,1,7,5],[6,1,7,5],
            [5,2,7,12],[6,2,7,12],[5,3,7,12],[6,3,7,12],[5,4,7,12],[6,4,7,12],
            [4,2,7,8],[7,2,7,8],[4,3,7,8],[7,3,7,8],
            [5,5,7,7],[6,5,7,7],[5,6,7,7],[6,6,7,7],
        ]
    },
    animal: {
        nome: 'Animal', emoji: '🐾',
        blocos: [
            [4,0,6,4],[7,0,6,4],[4,0,9,4],[7,0,9,4],
            [4,1,6,4],[5,1,6,4],[6,1,6,4],[7,1,6,4],
            [4,1,7,4],[5,1,7,4],[6,1,7,4],[7,1,7,4],
            [4,1,8,4],[5,1,8,4],[6,1,8,4],[7,1,8,4],
            [4,1,9,4],[5,1,9,4],[6,1,9,4],[7,1,9,4],
            [4,2,6,4],[5,2,6,4],[6,2,6,4],[7,2,6,4],
            [4,2,9,4],[5,2,9,4],[6,2,9,4],[7,2,9,4],
            [5,2,5,4],[6,2,5,4],[5,3,5,4],[6,3,5,4],
            [5,4,5,4],[6,4,5,4],
            [7,3,9,10],[8,4,9,10],
        ]
    },
    foguetao: {
        nome: 'Foguetão', emoji: '🚀',
        blocos: [
            [5,0,7,9],[6,0,7,9],[5,0,8,9],[6,0,8,9],
            [4,1,7,5],[7,1,7,5],[4,1,8,5],[7,1,8,5],
            [5,1,7,6],[6,1,7,6],[5,1,8,6],[6,1,8,6],
            [5,2,7,6],[6,2,7,6],[5,2,8,6],[6,2,8,6],
            [5,3,7,6],[6,3,7,6],[5,3,8,6],[6,3,8,6],
            [5,4,7,6],[6,4,7,6],[5,4,8,6],[6,4,8,6],
            [5,3,7,12],[6,3,7,12],
            [5,5,7,8],[6,5,7,8],[5,5,8,8],[6,5,8,8],
            [5,6,7,8],[5,6,8,8],[6,6,8,8],[6,7,7,8],
        ]
    },
    arvore: {
        nome: 'Árvore', emoji: '🌲',
        blocos: [
            [7,0,7,4],[7,1,7,4],[7,2,7,4],
            [7,7,7,3],
            [6,6,6,3],[7,6,6,3],[8,6,6,3],[6,6,7,3],[7,6,7,3],[8,6,7,3],[6,6,8,3],[7,6,8,3],[8,6,8,3],
            [5,5,5,3],[6,5,5,3],[7,5,5,3],[8,5,5,3],[9,5,5,3],
            [5,5,6,3],[6,5,6,3],[7,5,6,3],[8,5,6,3],[9,5,6,3],
            [5,5,7,3],[6,5,7,3],[7,5,7,3],[8,5,7,3],[9,5,7,3],
            [5,5,8,3],[6,5,8,3],[7,5,8,3],[8,5,8,3],[9,5,8,3],
            [5,5,9,3],[6,5,9,3],[7,5,9,3],[8,5,9,3],[9,5,9,3],
            [4,3,4,3],[5,3,4,3],[6,3,4,3],[7,3,4,3],[8,3,4,3],[9,3,4,3],[10,3,4,3],
            [4,3,5,3],[5,3,5,3],[6,3,5,3],[7,3,5,3],[8,3,5,3],[9,3,5,3],[10,3,5,3],
            [4,3,6,3],[5,3,6,3],[6,3,6,3],[7,3,6,3],[8,3,6,3],[9,3,6,3],[10,3,6,3],
            [4,3,7,3],[5,3,7,3],[6,3,7,3],[7,3,7,3],[8,3,7,3],[9,3,7,3],[10,3,7,3],
            [4,3,8,3],[5,3,8,3],[6,3,8,3],[7,3,8,3],[8,3,8,3],[9,3,8,3],[10,3,8,3],
            [4,3,9,3],[5,3,9,3],[6,3,9,3],[7,3,9,3],[8,3,9,3],[9,3,9,3],[10,3,9,3],
            [4,3,10,3],[5,3,10,3],[6,3,10,3],[7,3,10,3],[8,3,10,3],[9,3,10,3],[10,3,10,3],
        ]
    },
    casa: {
        nome: 'Casa', emoji: '🏠',
        blocos: [
            [4,0,4,7],[5,0,4,7],[6,0,4,7],[7,0,4,7],[8,0,4,7],[9,0,4,7],[10,0,4,7],
            [4,0,5,7],[10,0,5,7],[4,0,6,7],[10,0,6,7],[4,0,7,7],[10,0,7,7],
            [4,0,8,7],[10,0,8,7],[4,0,9,7],[10,0,9,7],
            [4,0,10,7],[5,0,10,7],[6,0,10,7],[7,0,10,7],[8,0,10,7],[9,0,10,7],[10,0,10,7],
            [4,1,4,7],[5,1,4,7],[6,1,4,7],[7,1,4,7],[8,1,4,7],[9,1,4,7],[10,1,4,7],
            [4,1,5,7],[10,1,5,7],[4,1,6,7],[10,1,6,7],
            [4,1,7,7],[10,1,7,7],
            [4,1,8,7],[10,1,8,7],[4,1,9,7],[10,1,9,7],
            [4,1,10,7],[5,1,10,7],[6,1,10,7],[7,1,10,7],[8,1,10,7],[9,1,10,7],[10,1,10,7],
            [4,2,4,8],[5,2,4,8],[6,2,4,8],[7,2,4,8],[8,2,4,8],[9,2,4,8],[10,2,4,8],
            [4,2,5,8],[5,2,5,8],[6,2,5,8],[7,2,5,8],[8,2,5,8],[9,2,5,8],[10,2,5,8],
            [4,2,6,8],[5,2,6,8],[6,2,6,8],[7,2,6,8],[8,2,6,8],[9,2,6,8],[10,2,6,8],
            [4,2,7,8],[5,2,7,8],[6,2,7,8],[7,2,7,8],[8,2,7,8],[9,2,7,8],[10,2,7,8],
            [4,2,8,8],[5,2,8,8],[6,2,8,8],[7,2,8,8],[8,2,8,8],[9,2,8,8],[10,2,8,8],
            [4,2,9,8],[5,2,9,8],[6,2,9,8],[7,2,9,8],[8,2,9,8],[9,2,9,8],[10,2,9,8],
            [4,2,10,8],[5,2,10,8],[6,2,10,8],[7,2,10,8],[8,2,10,8],[9,2,10,8],[10,2,10,8],
            [5,3,5,8],[6,3,5,8],[7,3,5,8],[8,3,5,8],[9,3,5,8],
            [5,3,6,8],[6,3,6,8],[7,3,6,8],[8,3,6,8],[9,3,6,8],
            [5,3,7,8],[6,3,7,8],[7,3,7,8],[8,3,7,8],[9,3,7,8],
            [5,3,8,8],[6,3,8,8],[7,3,8,8],[8,3,8,8],[9,3,8,8],
            [5,3,9,8],[6,3,9,8],[7,3,9,8],[8,3,9,8],[9,3,9,8],
            [6,4,6,8],[7,4,6,8],[8,4,6,8],[6,4,7,8],[7,4,7,8],[8,4,7,8],
            [6,4,8,8],[7,4,8,8],[8,4,8,8],[7,5,7,8],
        ]
    },
    vazio: { nome: 'Vazio', emoji: '⬜', blocos: [] }
};

// ============================================================
// ESTADO
// ============================================================
let scene, camera, renderer;
let raycaster, mouse;
let voxelGroup, ghostMesh, layerHighlight, pickingPlane;
let gridHelper, axesHelper, pivotIndicator;           // kept for GIF export hiding
let grid = [], voxelMeshes = {};
let sharedGeometry, voxelMaterials = [], ghostMaterial;
let currentLayer = 0, selectedColor = 8, mode = 'add', animando = false;
let isDragging = false, mouseMovedAfterDown = false;
let previousMousePosition = { x: 0, y: 0 }, isPanning = false;
let cameraTarget = new THREE.Vector3(GRID_SIZE / 2, GRID_SIZE / 4, GRID_SIZE / 2);

// ============================================================
// GIF ENCODER INLINE
// ============================================================
class GIFEncoder {
    constructor() { this.bytes = []; }
    push(b) { this.bytes.push(b & 0xFF); }
    pushShort(s) { this.push(s); this.push(s >> 8); }
    pushStr(s) { for (let i = 0; i < s.length; i++) this.push(s.charCodeAt(i)); }

    lzwEncode(pixels, minCodeSize) {
        const clearCode = 1 << minCodeSize, eoi = clearCode + 1;
        let codeSize = minCodeSize + 1, nextCode = eoi + 1;
        let table = new Map();
        let bitBuf = 0, bitCount = 0;
        const out = [];

        const reset = () => {
            table.clear();
            for (let i = 0; i < clearCode; i++) table.set(String.fromCharCode(i), i);
            codeSize = minCodeSize + 1; nextCode = eoi + 1;
        };
        const emit = (code) => {
            bitBuf |= code << bitCount; bitCount += codeSize;
            while (bitCount >= 8) { out.push(bitBuf & 0xFF); bitBuf >>= 8; bitCount -= 8; }
        };

        reset(); emit(clearCode);
        let s = String.fromCharCode(pixels[0]);
        for (let i = 1; i < pixels.length; i++) {
            const c = String.fromCharCode(pixels[i]), sc = s + c;
            if (table.has(sc)) { s = sc; }
            else {
                emit(table.get(s));
                if (nextCode < 4096) {
                    table.set(sc, nextCode++);
                    if (nextCode > (1 << codeSize) && codeSize < 12) codeSize++;
                } else { emit(clearCode); reset(); }
                s = c;
            }
        }
        emit(table.get(s)); emit(eoi);
        if (bitCount > 0) out.push(bitBuf & 0xFF);
        return out;
    }

    encode(w, h, palette, frames) {
        const palSize = palette.length;    // 16 ou 256
        const colorBits = palSize <= 16 ? 3 : 7;   // 2^(bits+1) = 16 ou 256
        const palEntries = 1 << (colorBits + 1);   // 16 ou 256

        this.pushStr('GIF89a');
        this.pushShort(w); this.pushShort(h);
        // Flags: global color table=1, color res=colorBits, sort=0, size=colorBits
        this.push(0x80 | (colorBits << 4) | colorBits);
        this.push(0); this.push(0);
        for (let i = 0; i < palEntries; i++) {
            if (i < palSize) { this.push(palette[i].r); this.push(palette[i].g); this.push(palette[i].b); }
            else { this.push(0); this.push(0); this.push(0); }
        }
        // Loop extension
        this.push(0x21); this.push(0xFF); this.push(11);
        this.pushStr('NETSCAPE2.0');
        this.push(3); this.push(1); this.pushShort(0); this.push(0);

        const minCS = colorBits + 1;   // min LZW code size: 4 para 16 cores, 8 para 256
        for (const frame of frames) {
            this.push(0x21); this.push(0xF9); this.push(4);
            // packed: disposal=2 (restore-to-background, limpa canvas antes de cada frame)
            //         + transparent=1  →  bits 000_010_0_1 = 0x09
            // transparent color index = 0 (reservado)
            this.push(0x09); this.pushShort(frame.delay); this.push(0); this.push(0);
            this.push(0x2C);
            this.pushShort(0); this.pushShort(0); this.pushShort(w); this.pushShort(h);
            this.push(0x00);
            this.push(minCS);
            const compressed = this.lzwEncode(frame.pixels, minCS);
            let i = 0;
            while (i < compressed.length) {
                const bs = Math.min(255, compressed.length - i);
                this.push(bs);
                for (let j = 0; j < bs; j++) this.push(compressed[i++]);
            }
            this.push(0);
        }
        this.push(0x3B);
        return new Uint8Array(this.bytes);
    }
}

// ============================================================
// INIT
// ============================================================
function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0e27);
    scene.fog = new THREE.Fog(0x0a0e27, 35, 70);

    camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 200);
    camera.position.set(26, 22, 26);
    camera.lookAt(cameraTarget);

    renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    document.getElementById('viewport').appendChild(renderer.domElement);

    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    voxelGroup = new THREE.Group();
    scene.add(voxelGroup);

    sharedGeometry = new THREE.BoxGeometry(0.94, 0.94, 0.94);
    voxelMaterials = PALETTE.map(c => new THREE.MeshLambertMaterial({ color: c.hex }));
    ghostMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff, transparent: true, opacity: 0.3, depthWrite: false });
    ghostMesh = new THREE.Mesh(sharedGeometry, ghostMaterial);
    ghostMesh.visible = false;
    scene.add(ghostMesh);

    // Plano de picking (invisível)
    const planeGeo = new THREE.PlaneGeometry(GRID_SIZE + 4, GRID_SIZE + 4);
    planeGeo.rotateX(-Math.PI / 2);
    pickingPlane = new THREE.Mesh(planeGeo, new THREE.MeshBasicMaterial({ visible: false, side: THREE.DoubleSide }));
    scene.add(pickingPlane);

    // Destaque da camada
    const hlGeo = new THREE.PlaneGeometry(GRID_SIZE, GRID_SIZE);
    hlGeo.rotateX(-Math.PI / 2);
    layerHighlight = new THREE.Mesh(hlGeo, new THREE.MeshBasicMaterial({
        color: 0x00ff88, transparent: true, opacity: 0.07, side: THREE.DoubleSide, depthWrite: false
    }));
    scene.add(layerHighlight);

    // Luzes
    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    const dl = new THREE.DirectionalLight(0xffffff, 0.85);
    dl.position.set(12, 24, 12); dl.castShadow = true;
    scene.add(dl);
    const fl = new THREE.DirectionalLight(0x4488ff, 0.25);
    fl.position.set(-10, 5, -10);
    scene.add(fl);
    scene.add(new THREE.HemisphereLight(0x00ff88, 0x080820, 0.18));

    // Grid do chão
    gridHelper = new THREE.GridHelper(GRID_SIZE, GRID_SIZE, 0x00ff88, 0x1a2f3a);
    gridHelper.material.opacity = 0.3;
    gridHelper.material.transparent = true;
    gridHelper.position.set(GRID_SIZE / 2, 0, GRID_SIZE / 2);
    scene.add(gridHelper);

    axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    // Indicador de pivot — esfera amarela no cameraTarget
    const pivGeo = new THREE.SphereGeometry(0.22, 8, 8);
    const pivMat = new THREE.MeshBasicMaterial({ color: 0xffec27, transparent: true, opacity: 0.85, depthTest: false });
    pivotIndicator = new THREE.Mesh(pivGeo, pivMat);
    pivotIndicator.position.copy(cameraTarget);
    scene.add(pivotIndicator);

    resetGrid();
    configurarCamera();
    configurarInput();
    configurarUI();
    atualizarCamada(0);
    carregarTemplate('humanoid');

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    animate();
}

// ============================================================
// GRID
// ============================================================
function resetGrid() {
    grid = Array.from({ length: GRID_SIZE }, () =>
        Array.from({ length: GRID_SIZE }, () => new Array(GRID_SIZE).fill(-1))
    );
}

function voxelKey(x, y, z) { return `${x},${y},${z}`; }
function worldPos(gx, gy, gz) { return new THREE.Vector3(gx + 0.5, gy + 0.5, gz + 0.5); }

function adicionarVoxel(gx, gy, gz, ci) {
    if (gx < 0 || gx >= GRID_SIZE || gy < 0 || gy >= GRID_SIZE || gz < 0 || gz >= GRID_SIZE) return;
    if (grid[gx][gy][gz] !== -1) return;
    grid[gx][gy][gz] = ci;
    const mesh = new THREE.Mesh(sharedGeometry, voxelMaterials[ci]);
    mesh.position.copy(worldPos(gx, gy, gz));
    mesh.castShadow = true; mesh.receiveShadow = true;
    mesh.userData = { gx, gy, gz };
    voxelGroup.add(mesh);
    voxelMeshes[voxelKey(gx, gy, gz)] = mesh;
    atualizarEstatisticas();
}

function removerVoxel(gx, gy, gz) {
    if (grid[gx] && grid[gx][gy] && grid[gx][gy][gz] !== -1) {
        grid[gx][gy][gz] = -1;
        const key = voxelKey(gx, gy, gz);
        if (voxelMeshes[key]) { voxelGroup.remove(voxelMeshes[key]); delete voxelMeshes[key]; }
        atualizarEstatisticas();
    }
}

function limparTudo() {
    Object.values(voxelMeshes).forEach(m => voxelGroup.remove(m));
    voxelMeshes = {}; resetGrid(); atualizarEstatisticas();
    mostrarMensagem('Cena limpa!');
}

function carregarTemplate(nome) {
    Object.values(voxelMeshes).forEach(m => voxelGroup.remove(m));
    voxelMeshes = {}; resetGrid(); atualizarEstatisticas();
    const t = TEMPLATES[nome];
    if (t && t.blocos.length > 0) {
        t.blocos.forEach(([x, y, z, c]) => adicionarVoxel(x, y, z, c));
        mostrarMensagem('Template "' + t.nome + '" carregado!');
    }
}

// ============================================================
// RAYCASTING
// ============================================================
function getRayHit(event) {
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    if (mode === 'erase') {
        const hits = raycaster.intersectObjects(Object.values(voxelMeshes));
        if (hits.length > 0) return { action: 'erase', ...hits[0].object.userData };
        return null;
    } else {
        const hits = raycaster.intersectObject(pickingPlane);
        if (hits.length > 0) {
            const p = hits[0].point;
            const gx = Math.floor(p.x), gz = Math.floor(p.z), gy = currentLayer;
            if (gx >= 0 && gx < GRID_SIZE && gz >= 0 && gz < GRID_SIZE)
                return { action: 'add', gx, gy, gz };
        }
        return null;
    }
}

function onMouseMove(e) {
    if (isDragging) { if (Math.abs(e.clientX - previousMousePosition.x) > 2 || Math.abs(e.clientY - previousMousePosition.y) > 2) mouseMovedAfterDown = true; return; }
    const r = getRayHit(e);
    if (r && r.action === 'add' && grid[r.gx][r.gy][r.gz] === -1) {
        ghostMesh.position.copy(worldPos(r.gx, r.gy, r.gz));
        ghostMesh.material.color.set(PALETTE[selectedColor].hex);
        ghostMesh.visible = true;
    } else { ghostMesh.visible = false; }
}

function onMouseClick(e) {
    if (mouseMovedAfterDown || e.button !== 0) return;
    const r = getRayHit(e);
    if (!r) return;
    if (r.action === 'add') adicionarVoxel(r.gx, r.gy, r.gz, selectedColor);
    else if (r.action === 'erase') removerVoxel(r.gx, r.gy, r.gz);
}

// ============================================================
// CAMADA
// ============================================================
function atualizarCamada(layer) {
    currentLayer = Math.max(0, Math.min(GRID_SIZE - 1, layer));
    const y = currentLayer;                                           // base do cubo, não centro
    pickingPlane.position.set(GRID_SIZE / 2, y, GRID_SIZE / 2);
    layerHighlight.position.set(GRID_SIZE / 2, y + 0.005, GRID_SIZE / 2);
    document.getElementById('layer-display').textContent = currentLayer;
    document.getElementById('layer-slider').value = currentLayer;
}

// ============================================================
// CÂMERA
// ============================================================
function configurarCamera() {
    const c = renderer.domElement;
    c.addEventListener('contextmenu', e => e.preventDefault());
    c.addEventListener('mousedown', e => {
        isDragging = true; mouseMovedAfterDown = false;
        isPanning = (e.button === 2);
        previousMousePosition = { x: e.clientX, y: e.clientY };
    });
    c.addEventListener('mousemove', e => {
        onMouseMove(e);
        if (!isDragging) return;
        const dx = e.clientX - previousMousePosition.x;
        const dy = e.clientY - previousMousePosition.y;
        if (isPanning) {
            const speed = 0.03;
            const right = new THREE.Vector3();
            camera.getWorldDirection(right);
            right.cross(new THREE.Vector3(0, 1, 0)).normalize();
            cameraTarget.addScaledVector(right, -dx * speed);
            camera.position.addScaledVector(right, -dx * speed);
            cameraTarget.y += dy * speed; camera.position.y += dy * speed;
            pivotIndicator.position.copy(cameraTarget);
        } else {
            const ang = Math.atan2(camera.position.z - cameraTarget.z, camera.position.x - cameraTarget.x);
            const rad = Math.sqrt((camera.position.x - cameraTarget.x) ** 2 + (camera.position.z - cameraTarget.z) ** 2);
            const na = ang - dx * 0.012;
            camera.position.x = cameraTarget.x + Math.cos(na) * rad;
            camera.position.z = cameraTarget.z + Math.sin(na) * rad;
            camera.position.y = Math.max(2, Math.min(45, camera.position.y - dy * 0.08));
        }
        camera.lookAt(cameraTarget);
        previousMousePosition = { x: e.clientX, y: e.clientY };
    });
    c.addEventListener('mouseup', () => { isDragging = false; });
    c.addEventListener('wheel', e => {
        e.preventDefault();
        const dir = new THREE.Vector3().subVectors(camera.position, cameraTarget);
        const dist = Math.max(5, Math.min(55, dir.length() + e.deltaY * 0.05));
        camera.position.copy(cameraTarget).addScaledVector(dir.normalize(), dist);
        camera.lookAt(cameraTarget);
    }, { passive: false });
}

function configurarInput() {
    renderer.domElement.addEventListener('click', onMouseClick);
}

function centrarPivot() {
    const keys = Object.keys(voxelMeshes);
    if (keys.length === 0) {
        // Sem voxels: centrar na grelha
        cameraTarget.set(GRID_SIZE / 2, GRID_SIZE / 4, GRID_SIZE / 2);
    } else {
        let minX = GRID_SIZE, maxX = 0, minY = GRID_SIZE, maxY = 0, minZ = GRID_SIZE, maxZ = 0;
        keys.forEach(k => {
            const [x, y, z] = k.split(',').map(Number);
            if (x < minX) minX = x; if (x > maxX) maxX = x;
            if (y < minY) minY = y; if (y > maxY) maxY = y;
            if (z < minZ) minZ = z; if (z > maxZ) maxZ = z;
        });
        cameraTarget.set(
            (minX + maxX) / 2 + 0.5,
            (minY + maxY) / 2 + 0.5,
            (minZ + maxZ) / 2 + 0.5
        );
    }
    pivotIndicator.position.copy(cameraTarget);
    camera.lookAt(cameraTarget);
    mostrarMensagem('🎯 Pivot centrado no modelo');
}

function resetarCamera() {
    camera.position.set(26, 22, 26);
    cameraTarget.set(GRID_SIZE / 2, GRID_SIZE / 4, GRID_SIZE / 2);
    pivotIndicator.position.copy(cameraTarget);
    camera.lookAt(cameraTarget);
    mostrarMensagem('Câmera resetada');
}

// ============================================================
// UI
// ============================================================
function configurarUI() {
    const pal = document.getElementById('palette');
    PALETTE.forEach((c, i) => {
        const btn = document.createElement('button');
        btn.className = 'palette-btn' + (i === selectedColor ? ' active' : '');
        btn.style.background = c.hex;
        if (c.hex === '#000000') btn.style.border = '2px solid #444';
        btn.title = c.name;
        btn.addEventListener('click', () => {
            selectedColor = i;
            document.querySelectorAll('.palette-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            setMode('add');
        });
        pal.appendChild(btn);
    });

    const sl = document.getElementById('layer-slider');
    sl.max = GRID_SIZE - 1;
    sl.addEventListener('input', () => atualizarCamada(parseInt(sl.value)));
}

function setMode(m) {
    mode = m;
    document.getElementById('btn-add').classList.toggle('active', m === 'add');
    document.getElementById('btn-erase').classList.toggle('active', m === 'erase');
    ghostMesh.visible = false;
}

function atualizarEstatisticas() {
    const count = Object.keys(voxelMeshes).length;
    document.getElementById('stat-blocks').textContent = count;
    const cors = new Set(
        Object.keys(voxelMeshes).map(k => {
            const [x,y,z] = k.split(',').map(Number);
            return grid[x][y][z];
        }).filter(v => v >= 0)
    );
    document.getElementById('stat-colors').textContent = cors.size;
}

// ============================================================
// EXPORTS — Utilitários partilhados
// ============================================================

/** Calcula o centro e raio da bounding sphere de todos os voxels. */
function getModelBounds() {
    const keys = Object.keys(voxelMeshes);
    if (keys.length === 0) return null;
    let minX=Infinity,maxX=-Infinity,minY=Infinity,maxY=-Infinity,minZ=Infinity,maxZ=-Infinity;
    keys.forEach(k => {
        const [x,y,z] = k.split(',').map(Number);
        if(x<minX)minX=x; if(x>maxX)maxX=x;
        if(y<minY)minY=y; if(y>maxY)maxY=y;
        if(z<minZ)minZ=z; if(z>maxZ)maxZ=z;
    });
    const center = new THREE.Vector3(
        (minX+maxX)/2+0.5, (minY+maxY)/2+0.5, (minZ+maxZ)/2+0.5
    );
    const dxz = Math.max(maxX-minX, maxZ-minZ)/2+1;
    const dy  = (maxY-minY)/2+1;
    const radius = Math.sqrt(dxz*dxz + dy*dy);
    return { center, radius };
}

/**
 * Dado o campo de visão e dimensões do render,
 * devolve a distância de câmera que faz o modelo caber no frame.
 */
function fitCamDist(radius, rw, rh, fovDeg) {
    const fovV = (fovDeg/2) * Math.PI/180;
    const fovH = Math.atan(Math.tan(fovV) * (rw/rh));
    return (radius / Math.sin(Math.min(fovV, fovH))) * 1.10;
}

// ── PNG ──────────────────────────────────────────────────────
function exportarPNG() {
    renderer.render(scene, camera);
    const a = document.createElement('a');
    a.href = renderer.domElement.toDataURL('image/png');
    a.download = 'pixel3d_' + Date.now() + '.png';
    a.click();
    mostrarMensagem('📸 PNG exportado!');
}

// ── GIF Animado ───────────────────────────────────────────────
// Técnica de transparência: render duplo (fundo preto + branco) por frame.
// Pixeis idênticos nos dois renders = modelo; diferentes = borda AA ou fundo → transparentes.
// Elimina ghosting de frames anteriores sem depender do método de disposal do decoder.
async function exportarGIF() {
    if (Object.keys(voxelMeshes).length === 0) {
        mostrarMensagem('Sem blocos para exportar!', true); return;
    }
    const btn = document.getElementById('btn-gif');
    btn.disabled = true; btn.textContent = '⏳ A gerar…';
    mostrarMensagem('A gerar GIF (aguarda…)');
    await new Promise(r => setTimeout(r, 60));

    const RW = 512, RH = 384, N = 36, DELAY = 4;
    const FOV = 50;

    const origW = renderer.domElement.width, origH = renderer.domElement.height;
    const origBG = scene.background, origFog = scene.fog;
    const origPos = camera.position.clone();
    const origFov = camera.fov, origAspect = camera.aspect;

    // Ocultar helpers
    gridHelper.visible = false; axesHelper.visible = false;
    layerHighlight.visible = false; ghostMesh.visible = false;
    pivotIndicator.visible = false;
    scene.fog = null;

    renderer.setSize(RW, RH, false);
    camera.aspect = RW / RH;
    camera.fov = FOV;
    camera.updateProjectionMatrix();

    const bounds = getModelBounds();
    const gifCenter = bounds ? bounds.center.clone()
        : new THREE.Vector3(GRID_SIZE/2, GRID_SIZE/4, GRID_SIZE/2);
    const camDist   = bounds ? fitCamDist(bounds.radius, RW, RH, FOV) : 28;
    const elevOff   = bounds ? bounds.center.y + bounds.radius * 0.55
        : GRID_SIZE/4 + 6;

    const cvs = document.createElement('canvas');
    cvs.width = RW; cvs.height = RH;
    const ctx = cvs.getContext('2d');

    // ── PASS 1 — Render duplo por frame → máscara de transparência ──────
    const frameMasks  = [];   // Uint8Array: 1=modelo, 0=fundo/AA
    const frameColors = [];   // RGBA do render em preto (cores do modelo)

    for (let f = 0; f < N; f++) {
        const ang = (f / N) * Math.PI * 2;
        camera.position.set(
            gifCenter.x + Math.cos(ang) * camDist,
            elevOff,
            gifCenter.z + Math.sin(ang) * camDist
        );
        camera.lookAt(gifCenter);

        // Render com fundo preto → cores do modelo
        scene.background = new THREE.Color(0, 0, 0);
        renderer.render(scene, camera);
        ctx.drawImage(renderer.domElement, 0, 0);
        const blackPx = ctx.getImageData(0, 0, RW, RH).data.slice();

        // Render com fundo branco → deteção de pixeis puros vs AA
        scene.background = new THREE.Color(1, 1, 1);
        renderer.render(scene, camera);
        ctx.drawImage(renderer.domElement, 0, 0);
        const whitePx = ctx.getImageData(0, 0, RW, RH).data;

        // Máscara: pixel igual nas duas renders → modelo; diferente → fundo/AA
        const mask = new Uint8Array(RW * RH);
        for (let i = 0; i < RW * RH; i++) {
            const dr = Math.abs(blackPx[i*4]   - whitePx[i*4]);
            const dg = Math.abs(blackPx[i*4+1] - whitePx[i*4+1]);
            const db = Math.abs(blackPx[i*4+2] - whitePx[i*4+2]);
            mask[i] = (dr + dg + db < 20) ? 1 : 0;
        }
        frameMasks.push(mask);
        frameColors.push(blackPx);
        await new Promise(r => setTimeout(r, 0));
    }

    // ── PASS 2 — Crop: union dos pixeis de modelo em todos os frames ─────
    let cx1 = RW, cy1 = RH, cx2 = 0, cy2 = 0;
    for (const mask of frameMasks) {
        for (let py = 0; py < RH; py++)
            for (let px = 0; px < RW; px++)
                if (mask[py*RW+px]) {
                    if (px < cx1) cx1 = px; if (px > cx2) cx2 = px;
                    if (py < cy1) cy1 = py; if (py > cy2) cy2 = py;
                }
    }
    const pad = Math.max(4, Math.round(Math.max(cx2-cx1, cy2-cy1) * 0.05));
    cx1 = Math.max(0, cx1-pad); cy1 = Math.max(0, cy1-pad);
    cx2 = Math.min(RW-1, cx2+pad); cy2 = Math.min(RH-1, cy2+pad);
    let GW = Math.max(2, (cx2-cx1+1) & ~1);   // par
    let GH = Math.max(2, (cy2-cy1+1) & ~1);

    // ── PASS 3 — Paleta adaptativa de 256 cores (só pixeis de modelo) ────
    const freqMap = new Map();
    for (let fi = 0; fi < N; fi++) {
        const mask = frameMasks[fi], col = frameColors[fi];
        for (let py = cy1; py < cy1+GH; py += 3)
            for (let px = cx1; px < cx1+GW; px += 3)
                if (mask[py*RW+px]) {
                    const i = (py*RW+px)*4;
                    const k = ((col[i]&0xF8)<<16)|((col[i+1]&0xF8)<<8)|(col[i+2]&0xF8);
                    freqMap.set(k, (freqMap.get(k)||0)+1);
                }
    }
    const sorted = [...freqMap.entries()].sort((a,b) => b[1]-a[1]);
    const gifPal = [{ r:0, g:0, b:0 }];   // índice 0 = transparente
    for (let i = 0; i < Math.min(255, sorted.length); i++) {
        const k = sorted[i][0];
        gifPal.push({ r:(k>>16)&0xFF, g:(k>>8)&0xFF, b:k&0xFF });
    }
    while (gifPal.length < 256) gifPal.push({ r:0, g:0, b:0 });

    const palCache = new Map();
    function qColor(r, g, b) {
        const k = ((r&0xF8)<<16)|((g&0xF8)<<8)|(b&0xF8);
        if (palCache.has(k)) return palCache.get(k);
        let best = 1, bestD = Infinity;
        for (let i = 1; i < gifPal.length; i++) {
            const d = (r-gifPal[i].r)**2+(g-gifPal[i].g)**2+(b-gifPal[i].b)**2;
            if (d < bestD) { bestD = d; best = i; }
        }
        palCache.set(k, best);
        return best;
    }

    // ── PASS 4 — Codificar GIF ────────────────────────────────────────────
    const enc = new GIFEncoder();
    const frames = [];
    for (let fi = 0; fi < N; fi++) {
        const mask = frameMasks[fi], col = frameColors[fi];
        const pix = new Uint8Array(GW * GH);
        for (let py = 0; py < GH; py++)
            for (let px = 0; px < GW; px++) {
                const si = (cy1+py)*RW+(cx1+px);
                if (mask[si]) {
                    const i = si*4;
                    pix[py*GW+px] = qColor(col[i], col[i+1], col[i+2]);
                }
                // else: 0 = transparente (default da Uint8Array)
            }
        frames.push({ pixels: pix, delay: DELAY });
    }

    const gifData = enc.encode(GW, GH, gifPal, frames);
    const url = URL.createObjectURL(new Blob([gifData], { type: 'image/gif' }));
    const a = document.createElement('a');
    a.href = url; a.download = 'pixel3d_' + Date.now() + '.gif'; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 5000);

    // Restaurar estado
    renderer.setSize(origW, origH, false);
    camera.fov = origFov; camera.aspect = origAspect;
    camera.updateProjectionMatrix();
    scene.background = origBG; scene.fog = origFog;
    camera.position.copy(origPos); camera.lookAt(cameraTarget);
    gridHelper.visible = true; axesHelper.visible = true;
    layerHighlight.visible = true; pivotIndicator.visible = true;
    btn.disabled = false; btn.textContent = '🎞️ GIF Animado';
    mostrarMensagem(`✓ GIF exportado! (${GW}×${GH}px, ${N} frames)`);
}

// ── Ficha PDF (jsPDF, fundo branco, estilo CICF) ──────────────
async function exportarFicha() {
    if (!window.jspdf) { mostrarMensagem('jsPDF não carregado!', true); return; }
    if (Object.keys(voxelMeshes).length === 0) {
        mostrarMensagem('Sem blocos para exportar!', true); return;
    }

    // ── Modal ──────────────────────────────────────────────────
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.72);z-index:9999;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(6px)';
    overlay.innerHTML = `
      <div style="background:#0f1530;border:2px solid #00ff88;border-radius:16px;padding:36px 40px;
                  width:370px;box-shadow:0 0 40px rgba(0,255,136,.2);font-family:'Segoe UI',sans-serif;color:#e0e7ff;">
        <h2 style="color:#00ff88;font-size:17px;letter-spacing:.06em;margin-bottom:22px">📋 Ficha PDF</h2>
        <label style="font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:#6b7a99;display:block;margin-bottom:5px">Teu nome</label>
        <input id="fn" type="text" placeholder="Ex: Maria Silva"
               style="width:100%;padding:9px 13px;background:#1a2040;border:1px solid rgba(0,255,136,.35);border-radius:8px;color:#e0e7ff;font-size:14px;margin-bottom:16px;outline:none;">
        <label style="font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:#6b7a99;display:block;margin-bottom:5px">Nome do objeto</label>
        <input id="ft" type="text" placeholder="Ex: Foguetão Espacial"
               style="width:100%;padding:9px 13px;background:#1a2040;border:1px solid rgba(0,255,136,.35);border-radius:8px;color:#e0e7ff;font-size:14px;margin-bottom:26px;outline:none;">
        <div style="display:flex;gap:10px">
          <button id="fc" style="flex:1;padding:11px;border-radius:8px;border:1px solid rgba(255,255,255,.12);background:transparent;color:#6b7a99;font-size:13px;cursor:pointer">Cancelar</button>
          <button id="fo" style="flex:2;padding:11px;border-radius:8px;border:none;background:#00ff88;color:#0a0e27;font-size:13px;font-weight:700;cursor:pointer">Gerar PDF</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    document.getElementById('fn').focus();

    const result = await new Promise(res => {
        const ok = () => res({ nome: document.getElementById('fn').value.trim() || 'Anónimo',
                                titulo: document.getElementById('ft').value.trim() || 'O meu modelo' });
        document.getElementById('fc').onclick = () => res(null);
        overlay.addEventListener('click', e => { if (e.target === overlay) res(null); });
        document.getElementById('fo').onclick = ok;
        document.getElementById('ft').addEventListener('keydown', e => { if (e.key === 'Enter') ok(); });
    });
    document.body.removeChild(overlay);
    if (!result) return;

    const btn = document.getElementById('btn-pdf');
    btn.disabled = true; btn.textContent = '⏳ PDF…';
    mostrarMensagem('A gerar ficha (aguarda…)');
    await new Promise(r => setTimeout(r, 60));

    // ── Preparar cena ──────────────────────────────────────────
    gridHelper.visible = false; axesHelper.visible = false;
    layerHighlight.visible = false; ghostMesh.visible = false;
    pivotIndicator.visible = false;
    const origFog = scene.fog; scene.fog = null;
    const origBG = scene.background;
    const origW = renderer.domElement.width, origH = renderer.domElement.height;
    const origAspect = camera.aspect, origFov = camera.fov;
    const origPos = camera.position.clone();
    scene.background = new THREE.Color(0x0a0e27);

    const bounds = getModelBounds();
    const mc = bounds ? bounds.center.clone()
        : new THREE.Vector3(GRID_SIZE/2, GRID_SIZE/4, GRID_SIZE/2);
    const cvs = document.createElement('canvas');
    const ctx = cvs.getContext('2d');

    // ── Imagem principal 16:9 ──────────────────────────────────
    const VW = 744, VH = 418, FOV = 50;
    renderer.setSize(VW, VH, false);
    camera.aspect = VW/VH; camera.fov = FOV;
    camera.updateProjectionMatrix();
    if (bounds) {
        const d = fitCamDist(bounds.radius, VW, VH, FOV);
        const az = Math.atan2(origPos.z - mc.z, origPos.x - mc.x);
        camera.position.set(mc.x + Math.cos(az)*d, mc.y + bounds.radius*.55, mc.z + Math.sin(az)*d);
        camera.lookAt(mc);
    }
    renderer.render(scene, camera);
    cvs.width = VW; cvs.height = VH;
    ctx.drawImage(renderer.domElement, 0, 0);
    const vpURL = cvs.toDataURL('image/jpeg', 0.92);

    // ── 8 frames de 360° ──────────────────────────────────────
    const NF = 8, FW = 220, FH = 165;
    renderer.setSize(FW, FH, false);
    camera.aspect = FW/FH; camera.updateProjectionMatrix();
    const fd = bounds ? fitCamDist(bounds.radius, FW, FH, FOV) : 22;
    const fe = mc.y + (bounds ? bounds.radius*.45 : 5);
    cvs.width = FW; cvs.height = FH;
    const frameURLs = [];
    for (let f = 0; f < NF; f++) {
        const ang = (f/NF)*Math.PI*2;
        camera.position.set(mc.x + Math.cos(ang)*fd, fe, mc.z + Math.sin(ang)*fd);
        camera.lookAt(mc);
        renderer.render(scene, camera);
        ctx.drawImage(renderer.domElement, 0, 0);
        frameURLs.push(cvs.toDataURL('image/jpeg', 0.88));
        await new Promise(r => setTimeout(r, 0));
    }

    // ── Restaurar cena ─────────────────────────────────────────
    renderer.setSize(origW, origH, false);
    camera.aspect = origAspect; camera.fov = origFov;
    camera.updateProjectionMatrix();
    scene.background = origBG; scene.fog = origFog;
    camera.position.copy(origPos); camera.lookAt(cameraTarget);
    gridHelper.visible=true; axesHelper.visible=true;
    layerHighlight.visible=true; pivotIndicator.visible=true;

    // ── Construir PDF — fundo branco, estilo CICF ──────────────
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const PW = 210, PH = 297, ML = 14, MR = 14, UW = PW - ML - MR;

    // Cores
    const cWhite  = [255, 255, 255];
    const cDark   = [10,  14,  39 ];   // #0a0e27
    const cGreen  = [0,   220, 120];   // #00dc78 — um pouco mais escuro para impressão
    const cMid    = [60,  72,  100];   // subtítulos
    const cLight  = [140, 150, 175];   // texto secundário
    const cBorder = [220, 230, 240];   // bordas cinza claras

    // ── CABEÇALHO ──────────────────────────────────────────────
    // Barra de topo escura (6mm)
    doc.setFillColor(...cDark); doc.rect(0, 0, PW, 6, 'F');
    // Linha verde sob a barra
    doc.setFillColor(...cGreen); doc.rect(0, 5.5, PW, 0.8, 'F');

    // Logótipo — "PIXEL3D" grande em verde, à esquerda
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11); doc.setTextColor(...cGreen);
    doc.text('PIXEL3D', ML, 3.8);

    // "FICHA DE PROJETO" — à direita, branco sobre escuro
    doc.setFontSize(7); doc.setFont('helvetica', 'normal');
    doc.setTextColor(...cWhite);
    doc.text('FICHA DE PROJETO', PW - MR, 3.8, { align: 'right' });

    let Y = 11;   // cursor vertical

    // ── TÍTULO DO OBJETO ───────────────────────────────────────
    // Barra lateral verde
    doc.setFillColor(...cGreen); doc.rect(ML, Y, 2, 14, 'F');

    doc.setFont('helvetica', 'bold'); doc.setFontSize(20);
    doc.setTextColor(...cDark);
    doc.text(result.titulo.substring(0, 46), ML + 5, Y + 8);

    // Metadados em linha
    doc.setFont('helvetica', 'normal'); doc.setFontSize(8);
    doc.setTextColor(...cLight);
    const hoje = new Date().toLocaleDateString('pt-PT');
    const blockCount = Object.keys(voxelMeshes).length;
    doc.text(`${result.nome}   ·   ${hoje}   ·   ${blockCount} blocos   ·   Pixel3D v1.4 · CICF`,
             ML + 5, Y + 13);

    Y += 18;

    // Linha separadora
    doc.setFillColor(...cBorder); doc.rect(ML, Y, UW, 0.3, 'F');
    Y += 5;

    // ── IMAGEM PRINCIPAL ───────────────────────────────────────
    // Label de secção
    doc.setFont('helvetica', 'bold'); doc.setFontSize(6.5);
    doc.setTextColor(...cGreen);
    doc.text('VISTA 3D', ML, Y + 3);
    doc.setFillColor(...cGreen); doc.rect(ML + 19, Y + 2.2, UW - 19, 0.25, 'F');
    Y += 6;

    // Imagem com borda suave
    const vpHmm = UW * (VH / VW);
    doc.setDrawColor(...cBorder); doc.setLineWidth(0.3);
    doc.rect(ML, Y, UW, vpHmm);
    doc.addImage(vpURL, 'JPEG', ML, Y, UW, vpHmm);
    Y += vpHmm + 6;

    // ── FRAMES 360° ────────────────────────────────────────────
    doc.setFont('helvetica', 'bold'); doc.setFontSize(6.5);
    doc.setTextColor(...cGreen);
    const rotLabel = `ROTAÇÃO 360°  —  ${NF} FRAMES  (${Math.round(360/NF)}° cada)`;
    doc.text(rotLabel, ML, Y + 3);
    const rlW = doc.getTextWidth(rotLabel);
    doc.setFillColor(...cGreen); doc.rect(ML + rlW + 2, Y + 2.2, UW - rlW - 2, 0.25, 'F');
    Y += 6;

    const fGap = 2;
    const fw = (UW - (NF - 1) * fGap) / NF;
    const fh = fw * (FH / FW);
    for (let i = 0; i < NF; i++) {
        const fx = ML + i * (fw + fGap);
        doc.setDrawColor(...cBorder); doc.setLineWidth(0.2);
        doc.rect(fx, Y, fw, fh);
        doc.addImage(frameURLs[i], 'JPEG', fx, Y, fw, fh);
        // Ângulo em baixo à direita de cada frame
        doc.setFont('helvetica', 'normal'); doc.setFontSize(4.5);
        doc.setTextColor(...cLight);
        doc.text(`${Math.round((i / NF) * 360)}°`, fx + fw - 0.8, Y + fh - 0.8, { align: 'right' });
    }
    Y += fh + 7;

    // ── SECÇÃO NOTAS (linhas para escrever) ────────────────────
    const footerTop = PH - 12;
    if (Y + 14 < footerTop) {
        doc.setFont('helvetica', 'bold'); doc.setFontSize(6.5);
        doc.setTextColor(...cGreen);
        doc.text('NOTAS', ML, Y + 3);
        doc.setFillColor(...cGreen); doc.rect(ML + 14, Y + 2.2, UW - 14, 0.25, 'F');
        Y += 7;
        doc.setDrawColor(...cBorder); doc.setLineWidth(0.25);
        while (Y + 6.5 < footerTop) { doc.line(ML, Y + 6, ML + UW, Y + 6); Y += 7; }
    }

    // ── RODAPÉ ─────────────────────────────────────────────────
    doc.setFillColor(...cGreen); doc.rect(0, footerTop - 0.8, PW, 0.8, 'F');
    doc.setFillColor(...cDark); doc.rect(0, footerTop, PW, PH - footerTop, 'F');
    doc.setFont('helvetica', 'normal'); doc.setFontSize(6.5);
    doc.setTextColor(...cLight);
    doc.text('Pixel3D  ·  Clube de Código  ·  Centro de Inovação Carlos Fiolhais',
             PW / 2, PH - 4, { align: 'center' });
    doc.setTextColor(...cGreen);
    doc.text('centroinovacaocarlosfiolhais.github.io', PW - MR, PH - 4, { align: 'right' });

    // ── Guardar ────────────────────────────────────────────────
    const safeTitle = (result.titulo).toLowerCase().replace(/[^a-z0-9]/gi, '_').substring(0, 40);
    doc.save(`pixel3d_${safeTitle}.pdf`);

    btn.disabled = false; btn.textContent = '📋 Ficha PDF';
    mostrarMensagem('✓ Ficha PDF exportada!');
}

// (função exportarFicha HTML removida — substituída pela versão jsPDF acima)

function exportarTXT() {
    const SYMS = ['·','N','P','V','C','Z','S','B','R','L','A','M','U','I','O','E'];
    const total = Object.keys(voxelMeshes).length;
    let txt = '════════════════════════════════════\n';
    txt += '  PIXEL3D — O Teu Modelo Voxel\n';
    txt += '════════════════════════════════════\n';
    txt += `  Blocos  : ${total}\n`;
    txt += `  Grid    : ${GRID_SIZE}×${GRID_SIZE}×${GRID_SIZE}\n`;
    txt += '════════════════════════════════════\n\n';
    txt += '  Legenda: · = vazio, letra = cor\n\n';

    for (let y = 0; y < GRID_SIZE; y++) {
        let hasVoxel = false;
        for (let x = 0; x < GRID_SIZE; x++)
            for (let z = 0; z < GRID_SIZE; z++)
                if (grid[x][y][z] >= 0) hasVoxel = true;
        if (!hasVoxel) continue;
        txt += `━━━ Y=${y} ━━━\n`;
        for (let z = 0; z < GRID_SIZE; z++) {
            txt += '  ';
            for (let x = 0; x < GRID_SIZE; x++) {
                const v = grid[x][y][z];
                txt += (v >= 0 ? SYMS[v] : '·') + ' ';
            }
            txt += '\n';
        }
        txt += '\n';
    }

    txt += '════════════════════════════════════\n';
    txt += '  Pixel3D · CICF\n';
    txt += '════════════════════════════════════\n';

    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([txt], { type: 'text/plain' }));
    a.download = 'pixel3d_camadas.txt'; a.click();
    mostrarMensagem('📄 TXT exportado!');
}

// ============================================================
// MISC UI
// ============================================================
function mostrarMensagem(texto, erro = false) {
    const el = document.getElementById('message');
    el.textContent = texto;
    el.className = 'message ' + (erro ? 'error show' : 'show');
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove('show'), 3000);
}

function toggleSidebar() {
    const sb = document.getElementById('sidebar');
    const btn = document.getElementById('toggle-sidebar');
    sb.classList.toggle('hidden');
    btn.classList.toggle('moved');
    btn.textContent = sb.classList.contains('hidden') ? '▶ Painel' : '◀ Painel';
}

// ============================================================
// LOOP
// ============================================================
function animate() {
    requestAnimationFrame(animate);
    if (animando) {
        // Orbitar câmera à volta do pivot (cameraTarget)
        const dx = camera.position.x - cameraTarget.x;
        const dz = camera.position.z - cameraTarget.z;
        const ang = Math.atan2(dz, dx) + 0.012;
        const rad = Math.sqrt(dx * dx + dz * dz);
        camera.position.x = cameraTarget.x + Math.cos(ang) * rad;
        camera.position.z = cameraTarget.z + Math.sin(ang) * rad;
        camera.lookAt(cameraTarget);
    }
    renderer.render(scene, camera);
}

window.addEventListener('load', init);
