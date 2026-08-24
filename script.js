// Datos de Matias (antes "materias" en MenuFF7.js).
// Color hex -> color con nombre (paleta de Jamie): #E6C846 amarillo, #32B464
// verde, #D23232 rojo, #B464B4 rosa, #4682B4 azul.
// Datos reales de "materias_terminadas.txt". AP y "to next level" son
// numeros de ambientacion (el txt solo trae las estrellas 1-5, no el AP
// exacto) elegidos a ojo segun el puntaje de cada una — facil de ajustar
// despues si Matias quiere numeros distintos. score 5 = materia al maximo
// (AP/to-next-level en 0, la pantalla ya muestra "MASTER" en ese caso).
const skillsJSON = [
    { id: 12, name: "Unity", color: "green", description: "Integra arte, mecánicas y escenarios interactivos.", score: 3, ap: 6300, toNextLevel: 2200, abilities: ["Desarrollo y Mecánicas 2D", "Físicas y Control de Personajes", "Sistemas de Animación y UI"] },
    { id: 4, name: "Html", color: "blue", description: "Estructurado de páginas y marcado semántico funcional.", score: 2, ap: 2600, toNextLevel: 2800, abilities: ["Maquetación Semántica", "Estructuración Web Base"] },
    { id: 19, name: "Dreamflow", color: "yellow", description: "Prototipos rápidos y estéticos asistidos por IA.", score: 2, ap: 1400, toNextLevel: 3700, abilities: ["Prototipado Rápido con IA", "Exportación de Estilos a Flutter"] },
    { id: 1, name: "GitHub", color: "red", description: "Invoca su nube para desplegar todos sus proyectos y código.", score: 2, ap: 2200, toNextLevel: 3200, abilities: ["Despliegue de Código Fuente", "Acceso a Repositorios Activos"] },
    { id: 8, name: "Windows", color: "green", description: "Domina el sistema operativo al máximo, sin límites.", score: 5, ap: 0, toNextLevel: 0, abilities: ["Administración del Sistema", "Soporte y Hardware"] },
    { id: 15, name: "Lenguaje SQL", color: "yellow", description: "Organiza y consulta información estructurada.", score: 2, ap: 1900, toNextLevel: 3400, abilities: ["Estructura de Tablas", "Consultas y Filtros"] },
    { id: 21, name: "LibreSprite", color: "pink", description: "Da vida a personajes y escenarios en pixel art.", score: 2, ap: 1300, toNextLevel: 3800, abilities: ["Animación de Sprites", "Creación de Pixel Art"] },
    { id: 6, name: "Visual Scripting", color: "blue", description: "Conecta nodos visuales para agilizar el desarrollo.", score: 2, ap: 2100, toNextLevel: 3100, abilities: ["Bloques Lógicos", "Flujo de Eventos"] },
    { id: 17, name: "Supabase", color: "yellow", description: "Bases de datos relacionales en la nube, seguras.", score: 2, ap: 1500, toNextLevel: 3600, abilities: ["Bases de Datos Relacionales", "Tablas SQL"] },
    { id: 2, name: "Kotlin", color: "blue", description: "Enlaza la lógica móvil nativa y eficiente en Android.", score: 3, ap: 6800, toNextLevel: 2400, abilities: ["Sintaxis y Corrutinas", "Android Nativo (Compose/XML)", "APIs REST y BDD (Room)"] },
    { id: 9, name: "Ofimática", color: "green", description: "Organiza datos y redacta documentos técnicos esenciales.", score: 5, ap: 0, toNextLevel: 0, abilities: ["Redacción de Documentos Técnicos", "Gestión y Organización de Archivos"] },
    { id: 22, name: "Blender", color: "pink", description: "Primeros pasos en la manipulación 3D.", score: 1, ap: 700, toNextLevel: 4300, abilities: ["Modelado"] },
    { id: 14, name: "FlutterFlow", color: "yellow", description: "Diseña interfaces móviles a gran velocidad.", score: 3, ap: 6100, toNextLevel: 2300, abilities: ["Diseño UI Multiplataforma", "Integración de Lógica", "Flujos y Navegación"] },
    { id: 3, name: "C#", color: "blue", description: "Da vida a mecánicas y físicas complejas con código puro.", score: 3, ap: 6500, toNextLevel: 2200, abilities: ["Programación POO", "Máquinas de Estado", "Lógica y Patrones"] },
    { id: 18, name: "Xano", color: "yellow", description: "Conexiones de servidor sin código, vía API.", score: 2, ap: 1200, toNextLevel: 3900, abilities: ["Creación de API Endpoints No-Code", "Gestión de Lógica en Servidor"] },
    { id: 10, name: "Linux", color: "green", description: "Administra sistemas abiertos desde la terminal.", score: 3, ap: 7200, toNextLevel: 2100, abilities: ["Comandos de Terminal y Bash", "Gestión de Permisos y Usuarios", "Administración de Sistemas (Microinformática)"] },
    { id: 5, name: "Dart", color: "blue", description: "Lenguaje orientado a objetos para desarrollo multiplataforma y lógica de apps.", score: 2, ap: 1600, toNextLevel: 3600, abilities: ["Sintaxis y Programación OO", "Lógica y Colecciones Base"] },
    { id: 20, name: "Photoshop", color: "pink", description: "Crea interfaces limpias y sprites optimizados.", score: 3, ap: 5800, toNextLevel: 2500, abilities: ["Edición", "Diseño", "Composición"] },
    { id: 7, name: "Claude", color: "blue", description: "Usa una IA avanzada para optimizar código y depurar errores.", score: 2, ap: 2400, toNextLevel: 2900, abilities: ["Optimización de Código (AI-Assisted)", "Depuración de Errores (Debugging Fast)"] },
    { id: 16, name: "Firebase", color: "yellow", description: "Gestiona usuarios y datos en tiempo real.", score: 2, ap: 1800, toNextLevel: 3300, abilities: ["Autenticación de Usuarios (Auth)", "Base de Datos en Tiempo Real (Firestore)"] },
    { id: 11, name: "Redes Locales", color: "green", description: "Configura la red que intercomunica los sistemas.", score: 3, ap: 5400, toNextLevel: 2600, abilities: ["Instalación de Elementos de Red Local (LAN)", "Configuración de Protocolos y Direccionamiento IP"] },
    { id: 13, name: "Android Studio", color: "green", description: "Compila, emula y depura apps móviles nativas.", score: 2, ap: 1700, toNextLevel: 3500, abilities: ["Configuración de Entorno Gradle", "Uso de Emuladores y Debugging"] },
     { id: 23, name: "Css", color: "blue", description: "Estilizado, layouts flex/grid y maquetación adaptativa.", score: 2, ap: 2600, toNextLevel: 2800, abilities: ["Diseño Responsive (Flexbox/Grid)", "Estilos e Interfaces Custom"] },
    { id: 23, name: "JavaScript", color: "blue", description: "Lógica client-side para la interactividad y componentes dinámicos.", score: 2, ap: 2600, toNextLevel: 2800, abilities: ["Manipulación del DOM", "Lógica e Interacción Vanilla"] },
];
// Historial educativo real de Matias (antes "historiaEducacion" en MenuFF7.js).
const educationJSON = [
    { id: 1, name: "E-Talent (Telde)", link: "", user: "Matias Errico", level: 38, role: "IFCD51", year: "2026", image_path: "assets/imagenes/logos/Etalent.png" },
    { id: 2, name: "E-Talent (Telde)", link: "", user: "Matias Errico", level: 38, role: "IFCD57", year: "2026", image_path: "assets/imagenes/logos/Etalent.png" },
    { id: 3, name: "Instituto Focan", link: "", user: "Matias Errico", level: 38, role: "IFCT45", year: "2026", image_path: "assets/imagenes/logos/Focan.jpg" },
    { id: 4, name: "Escuela de Hosteleria Europea", link: "", user: "Matias Errico", level: 35, role: "IFCT0209", year: "2024", image_path: "assets/imagenes/logos/Escuela.png" },
    { id: 5, name: "Centro de Formacion Empresarial Aura, SL", link: "", user: "Matias Errico", level: 34, role: "IFCT0108", year: "2022", image_path: "assets/imagenes/logos/Aura.png" }
];
// Equipo real de Matias (antes "equipoItems" en MenuFF7.js).
// IDs: armas 1-3, armaduras 101-102, accesorios 201-208 (mismo esquema que
// usaba Jamie Pates). stats: attackP->attackPct, defenseP->defensePct,
// magicDefP->magicDefPct (mismos campos, solo cambia el nombre).
const equipmentJSON = [
    { id: 1, name: "Raton", type: "weapon", description: "Periférico de precision para trabajo rapido. Favorece el ataque puro.", stats: { attack: 24, attackPct: 92, defense: 32, defensePct: 8, magicAtk: 4, magicDefPct: 5 }, slots: { multiSlots: 3, singleSlots: 2 } },
    { id: 2, name: "SSD Externo", type: "weapon", description: "Almacenamiento ultrarrapido. Transporta datos a velocidad de vértigo. Aumenta la magia y la velocidad de reaccion.", stats: { attack: 16, attackPct: 74, defense: 20, defensePct: 12, magicAtk: 22, magicDefPct: 18 }, slots: { multiSlots: 1, singleSlots: 3 } },
    { id: 3, name: "Pendrive", type: "weapon", description: "Almacenamiento de bolsillo, siempre a mano para mover archivos rapido. También hace de USB booteable para instalar y reparar sistemas operativos sobre la marcha.", stats: { attack: 12, attackPct: 64, defense: 16, defensePct: 14, magicAtk: 10, magicDefPct: 12 }, slots: { multiSlots: 0, singleSlots: 2 } },
    { id: 101, name: "Teclado", type: "armor", description: "Herramienta principal para programar. Equilibrado entre ataque y magia.", stats: { attack: 18, attackPct: 80, defense: 28, defensePct: 10, magicAtk: 12, magicDefPct: 8 }, slots: { multiSlots: 2, singleSlots: 2 } },
    { id: 102, name: "PC Gaming", type: "armor", description: "El nucleo de toda la operacion. Maxima defensa y resistencia.", stats: { attack: 14, attackPct: 70, defense: 48, defensePct: 20, magicAtk: 6, magicDefPct: 12 }, slots: { multiSlots: 2, singleSlots: 4 } },
    { id: 201, name: "Smartphone", type: "accessory", description: "Siempre a mano: comunicacion, testeo responsive y consulta rapida de documentacion. Prioriza magia y rapidez sobre fuerza bruta.", stats: { attack: 6, attackPct: 42, defense: 10, defensePct: 6, magicAtk: 16, magicDefPct: 12 }, slots: { multiSlots: 0, singleSlots: 2 } },
    { id: 202, name: "Auriculares JBL 510BT", type: "accessory", description: "Aislamiento sonoro para concentracion total. Refuerza la defensa magica.", stats: { attack: 10, attackPct: 60, defense: 22, defensePct: 14, magicAtk: 8, magicDefPct: 22 }, slots: { multiSlots: 1, singleSlots: 2 } },
    { id: 203, name: "Nintendo Switch", type: "accessory", description: "Portabilidad ante todo. Aporta equilibrio general con un extra magico.", stats: { attack: 8, attackPct: 50, defense: 14, defensePct: 8, magicAtk: 14, magicDefPct: 10 }, slots: { multiSlots: 1, singleSlots: 1 } },
    { id: 204, name: "PlayStation 4", type: "accessory", description: "Potencia de la octava generacion con el mando DualShock 4 en la mano. Sube ataque y defensa por igual.", stats: { attack: 16, attackPct: 65, defense: 18, defensePct: 12, magicAtk: 6, magicDefPct: 6 }, slots: { multiSlots: 1, singleSlots: 1 } },
    { id: 205, name: "PlayStation 2", type: "accessory", description: "La consola mas vendida de la historia, con su mando DualShock 2 incluido. Defensa% solida.", stats: { attack: 10, attackPct: 55, defense: 16, defensePct: 18, magicAtk: 8, magicDefPct: 8 }, slots: { multiSlots: 1, singleSlots: 1 } },
    { id: 206, name: "SNES Classic Mini", type: "accessory", description: "Nostalgia de 16 bits con el mando original de SNES en la mano. Gran impulso a la magia.", stats: { attack: 6, attackPct: 45, defense: 10, defensePct: 6, magicAtk: 20, magicDefPct: 14 }, slots: { multiSlots: 0, singleSlots: 2 } },
    { id: 207, name: "Mega Drive Classic Mini", type: "accessory", description: "Velocidad y accion de 16 bits con el mando de 3 botones en la mano. Favorece el ataque directo.", stats: { attack: 20, attackPct: 58, defense: 8, defensePct: 6, magicAtk: 4, magicDefPct: 4 }, slots: { multiSlots: 0, singleSlots: 2 } },
    { id: 208, name: "PlayStation Classic Mini", type: "accessory", description: "Una coleccion compacta de clasicos, con el mando original de PS1. Defensa equilibrada.", stats: { attack: 8, attackPct: 48, defense: 14, defensePct: 16, magicAtk: 8, magicDefPct: 10 }, slots: { multiSlots: 0, singleSlots: 2 } }
];
// Historial laboral real de Matias (antes "historiaTrabajo" en MenuFF7.js).
const historyJSON = [
    { id: 1, name: "El Corte Inglés", link: "", user: "Matias Errico", level: 36, role: "Logistica", year: "3 meses", image_path: "assets/imagenes/logos/Elcorteingles.png" },
    { id: 2, name: "Santana Jerez S.L", link: "", user: "Matias Errico", level: 36, role: "Practicas de Empresa", year: "2024", image_path: "assets/imagenes/logos/SantanaJerez.png" },
    { id: 3, name: "Tu movil canario", link: "", user: "Matias Errico", level: 35, role: "Practicas de Empresa", year: "2022", image_path: "assets/imagenes/logos/TumovilCanario.png" },
    { id: 4, name: "Mercadillo de Jinamar", link: "", user: "Matias Errico", level: 30, role: "Atencion al Publico", year: "2008 - 2020", image_path: "assets/imagenes/logos/Telde.jpg" },
    { id: 5, name: "Valsequillo Embellece 2019", link: "", user: "Matias Errico", level: 32, role: "Formacion y Empleo", year: "2019 - 2020", image_path: "assets/imagenes/logos/Valsequillo.jpg" }
];
// Ubicaciones reales de Matias (antes "ubicaciones" en MenuFF7.js).
const locations = [
    "Midgar",
    "Sector 7 Slums",
    "Wall Market",
    "Kalm",
    "Chocobo Farm",
    "Mt. Nibel",
    "Nibelheim",
    "Fort Condor",
    "Junon",
    "Costa del Sol",
    "Corel",
    "Gold Saucer",
    "Cosmo Canyon",
    "Gongaga",
    "Cave of the Gi",
    "Wutai",
    "Rocket Town",
    "Bone Village",
    "Sleeping Forest",
    "City of the Ancients",
    "Icicle Inn",
    "Great Glacier",
    "Mideel",
    "Northern Crater",
    "Battle Square",
    "Chocobo Square",
    "Wonder Square",
    "Speed Square",
    "Event Square",
    "Ghost Square",
    "Skywheel Square",
    "Honeybee Inn",
    "Seventh Heaven",
    "Corneo Colosseum",
    "Midgar Expressway",    
    "Grasslands",
    "Mt. Corel",
    "North Corel",
    "Shinra Mansion",
    "???",
    "???"
];
// Menu real de Matias (antes <ul id="menu"> en index.html).
const menuJSON = [
    { id: "projects", name: "Proyectos", position: 0 },
    { id: "history", name: "Historia", position: 1 },
    { id: "skills", name: "Habilidades", position: 2 },
    { id: "equip", name: "Equipo", position: 3 },
    { id: "resume", name: "Resumen", position: 4 },
    { id: "", name: "", title: "", path: "", position: 5 },
    { id: "itch", name: "Itch.io", title: "Mi Itch.io", path: "https://maerga.itch.io/", position: 6 },
    { id: "github", name: "GitHub", title: "Mi GitHub", path: "https://github.com/MaErGa", position: 7 },
    { id: "linkedin", name: "LinkedIn", title: "Mi LinkedIn", path: "https://www.linkedin.com/in/matias-errico-garcia-474387402/", position: 8 },
    { id: "config", name: "Ajustes", position: 9 }
];
// Datos de Matias (antes "firstName"/"potrait.png"/actualizarNivelPorEdad en
// MenuFF7.js). age_epoch = 30 agosto 1987 (misma formula de nivel-por-edad
// que ya usaba Jamie Pates). hp/mp base quedan aqui solo como referencia
// historica: el valor real que se usa en pantalla se recalcula segun el
// nivel (ver ageEpochToLevel/HP_PER_LEVEL/MP_PER_LEVEL mas abajo), asi que
// suben solos en cada cumpleaños en vez de quedar fijos.
const partyMemberJSON = [
    { id: 1, name: "Matias Errico", limit_level: 1, age_epoch: 557280000, hp: 2050, mp: 260, image_path: "assets/imagenes/portrait.png" }
];

// Compartido entre PartyMember (para HP/MP/LV en pantalla) y getDerivedStats
// (para el pequeño bono de stats por nivel): nivel = edad real, y sube en
// el cumpleaños, no el 1 de enero.
function ageEpochToLevel(epoch) {
    const date = new Date(epoch < 1e12 ? epoch * 1000 : epoch);
    const now = new Date();
    let years = now.getFullYear() - date.getFullYear();
    const hasHadBirthday = now.getMonth() > date.getMonth() || (now.getMonth() === date.getMonth() && now.getDate() >= date.getDate());
    if (!hasHadBirthday) years--;
    return years;
}
(function (FF7) {
    "use strict";

// Pequeño helper para construir DOM sin JSX. No forma parte del proyecto
// original (que usaba JSX de React) pero reemplaza esa sintaxis 1:1: cada
// componente sigue construyendo exactamente el mismo árbol de nodos/atributos
// que su .tsx original, solo que con esta función en vez de <etiquetas/>.
function el(tag, attrs = {}, children = []) {
    const node = document.createElement(tag);
    for (const [key, value] of Object.entries(attrs)) {
        if (value === null || value === undefined || value === false) continue;
        if (key === "className") {
            node.className = value;
        } else if (key === "style" && typeof value === "object") {
            Object.assign(node.style, value);
        } else if (key.startsWith("on") && typeof value === "function") {
            node.addEventListener(key.slice(2).toLowerCase(), value);
        } else if (key.startsWith("data-") || key === "aria-hidden") {
            node.setAttribute(key, value === true ? "true" : value === false ? "false" : value);
        } else if (key in node) {
            node[key] = value;
        } else {
            node.setAttribute(key, value);
        }
    }
    for (const child of [].concat(children)) {
        if (child === null || child === undefined || child === false) continue;
        node.appendChild(typeof child === "string" || typeof child === "number" ? document.createTextNode(child) : child);
    }
    return node;
}

function clear(node) {
    while (node.firstChild) node.removeChild(node.firstChild);
}

function setDataset(node, key, value) {
    if (value === null || value === undefined || value === false) {
        delete node.dataset[key];
    } else {
        node.dataset[key] = value === true ? "true" : value === false ? "false" : String(value);
    }
}

    FF7.el = el;
    FF7.clear = clear;
    FF7.setDataset = setDataset;
})(window.FF7 = window.FF7 || {});
(function (FF7) {
    "use strict";

const loadSound = (sound) => {
    if (typeof window === "undefined") return;

    const src = "assets/audio/";

    const sounds = {
        select: "select.mp3",
        back: "back.mp3",
        error: "error.mp3",
        materia: "materia.mp3",
        slash: "slash.mp3",
        crit: "crit.mp3",
        delete: "delete.mp3",
        heal: "heal.mp3",
        save: "save.mp3",
        saveSelect: "saveSelect.mp3",
        fanfare: "fanfare.mp3",
        limit: "limit.mp3",
        swish: "swish.mp3",
    };

    return new Audio(`${src}${sounds[sound]}`);
};

const playLoadedSound = (audio, isSoundEnabled, isloop = false) => {
    if (isSoundEnabled && audio) {
        if (isloop) audio.loop = true;
        audio.volume = 0.2;
        audio.play().catch(() => {});
    }
};

const stopLoadedSound = (audio, isSoundEnabled) => {
    if (isSoundEnabled && audio) {
        audio.pause();
        audio.currentTime = 0;
    }
};

const playSound = (soundName, isSoundEnabled, isloop = false) => {
    const audio = loadSound(soundName);

    if (isSoundEnabled && audio) {
        if (isloop) audio.loop = true;
        audio.volume = 0.2;
        audio.play().catch(() => {});
    }
};

    FF7.playSound = playSound;
    FF7.loadSound = loadSound;
    FF7.playLoadedSound = playLoadedSound;
    FF7.stopLoadedSound = stopLoadedSound;
})(window.FF7 = window.FF7 || {});
(function (FF7) {
    "use strict";

// Puerto de util/textToSprite.tsx. En React devolvía un <span> JSX; aquí
// devuelve el mismo <span> ya construido como nodo DOM real, para poder
// hacer `contenedor.appendChild(textToSprite("Hola"))` directamente.

// La hoja de sprites de la fuente (pixel art) cubre A-Z/a-z/0-9/puntuacion
// basica + los acentos españoles (á Á é É í Í ó Ó ú Ú ñ Ñ ü Ü ¿ ¡, añadidos
// en una fila nueva al pie de la imagen). Quedan solo unos pocos caracteres
// sin glifo propio -variantes con tilde grave que no se usan en el
// castellano pero se dejan cubiertas por si acaso- que siguen usando la
// fuente de reemplazo (ver .font-glyph-fallback en el CSS) en vez del
// sprite que habría por defecto en la esquina (0,0) de la imagen.
const FALLBACK_GLYPHS = new Set(["È", "è", "Ò", "ò", "Ù", "ù", "ª"]);

function textToSprite(text, isResourceValue = false, textColor = "white") {
    if (!text) return null;

    const span = document.createElement("span");
    span.className = "font flex";
    if (isResourceValue) span.dataset.label = "resourceValue";
    span.dataset.textColor = textColor;

    for (const glyph of text.split("")) {
        const glyphSpan = document.createElement("span");
        glyphSpan.className = FALLBACK_GLYPHS.has(glyph) ? "font-glyph font-glyph-fallback" : "font-glyph";
        glyphSpan.dataset.sprite = glyph;
        glyphSpan.textContent = glyph;
        span.appendChild(glyphSpan);
    }

    return span;
}

    FF7.textToSprite = textToSprite;
})(window.FF7 = window.FF7 || {});
(function (FF7) {
    "use strict";

// Puerto directo de util/pointerActivity.ts — sin cambios de lógica.
let movingUntil = 0;

if (typeof window !== "undefined") {
    window.addEventListener(
        "mousemove",
        () => { movingUntil = performance.now() + 100; },
        { passive: true },
    );
    window.addEventListener(
        "scroll",
        () => { movingUntil = 0; },
        { passive: true, capture: true },
    );
}

const isPointerMoving = () => performance.now() < movingUntil;

    FF7.isPointerMoving = isPointerMoving;
})(window.FF7 = window.FF7 || {});
(function (FF7) {
    "use strict";

const ENDPOINT_URL = "http://localhost:8000";

async function fetchPartyMember({ signal, memberId }) {
    const response = await fetch(`${ENDPOINT_URL}/partymember/${memberId}`, { signal });

    if (!response.ok) {
        throw new Error("An error occurred while fetching party Member");
    }

    return response.json();
}

    FF7.fetchPartyMember = fetchPartyMember;
})(window.FF7 = window.FF7 || {});
(function (FF7) {
    "use strict";

const getEquipmentById = (id) =>
    equipmentJSON.find((item) => item.id === id);

const slotCount = (item) =>
    (item.slots?.multiSlots ?? 0) * 2 + (item.slots?.singleSlots ?? 0);

const resizeMateriaRow = (row, totalSlots) =>
    Array.from({ length: totalSlots }, (_, i) => row[i] ?? null);

// Ademas de lo que suma el equipo, cada nivel (edad real) aporta un bono
// base parejo a todas las stats — pequeño a proposito para no tapar la
// diferencia entre armas/objetos, pero que igual crece con los cumpleaños.
const LEVEL_STAT_BONUS_DIVISOR = 3;

const getDerivedStats = (equipment) => {
    const equipped = [equipment.weapon, equipment.armor, equipment.accessory].map(getEquipmentById);
    const levelBonus = Math.floor(ageEpochToLevel(partyMemberJSON[0]?.age_epoch ?? 0) / LEVEL_STAT_BONUS_DIVISOR);

    return equipped.reduce((totals, item) => {
        if (!item) return totals;
        for (const key of Object.keys(totals)) {
            totals[key] += item.stats[key] ?? 0;
        }
        return totals;
    }, { attack: levelBonus, attackPct: 0, magicAtk: levelBonus, defense: levelBonus, defensePct: 0, magicDefPct: 0 });
};

    FF7.getEquipmentById = getEquipmentById;
    FF7.slotCount = slotCount;
    FF7.resizeMateriaRow = resizeMateriaRow;
    FF7.getDerivedStats = getDerivedStats;
})(window.FF7 = window.FF7 || {});
(function (FF7) {
    "use strict";

// Puerto de data/portraits.ts, adaptado a los retratos de Matías: son 10
// imágenes recortadas independientes (ya con fondo transparente), no una
// tira ni una rejilla — mucho más simple, un archivo por personaje.
const PORTRAIT_DIR = "assets/imagenes/portraits/";

const NAME_TO_FILE = {
    "sephiroth": "sephiroth.png",
    "cloud": "cloud.png",
    "barret": "barret.png",
    "tifa": "tifa.png",
    "aeris": "aerith.png",
    "aerith": "aerith.png",
    "red xiii": "redxiii.png",
    "nanaki": "redxiii.png",
    "yuffie": "yuffie.png",
    "cait sith": "caitsith.png",
    "vincent": "vincent.png",
    "cid": "cid.png",
};

function resolvePortrait(name) {
    if (!name) return null;
    const file = NAME_TO_FILE[name.trim().toLowerCase()];
    if (!file) return null;
    return { src: PORTRAIT_DIR + file };
}

    FF7.resolvePortrait = resolvePortrait;
})(window.FF7 = window.FF7 || {});
(function (FF7) {
    "use strict";

// Puerto directo de context/defaults.tsx — sin tipos, mismos valores exactos.

// El nombre canonico y "reseteable" — viene de los datos del party member.
const defaultUserName = (partyMemberJSON[0] && partyMemberJSON[0].name) || "";

// Color por defecto de Matias era un unico azul (rgb(0,83,173)); Jamie usa 4
// esquinas independientes, asi que aqui se generan 4 tonos de ese mismo azul
// para conservar el degradado que ya tenia.
const defaultWindowColor = {
    topLeft: [0, 83, 173],
    topRight: [0, 54, 112],
    bottomLeft: [0, 29, 61],
    bottomRight: [0, 10, 21],
};

// Materia equipada en Arma (Raton, 8 huecos) y Armadura (Teclado, 6 huecos),
// por id (ver skillsJSON arriba):
// Arma: las 8 que pidió — Windows(8) Kotlin(2) C#(3) Unity(12) Supabase(17)
//   Android Studio(13) Photoshop(20) GitHub(1)
// Armadura: 3 más a mi criterio — Claude(7) Linux(10) FlutterFlow(14) —
//   y 3 huecos libres para que siga creciendo.
const defaultMateriaLoadout = [
    [8, 2, 3, 12, 17, 13, 20, 1],
    [7, 10, 14, null, null, null],
];

const defaultEquipment = {
    weapon: 1,     // Raton
    armor: 101,    // Teclado
    accessory: 203, // Nintendo Switch
};

    FF7.defaultUserName = defaultUserName;
    FF7.defaultWindowColor = defaultWindowColor;
    FF7.defaultMateriaLoadout = defaultMateriaLoadout;
    FF7.defaultEquipment = defaultEquipment;
})(window.FF7 = window.FF7 || {});
(function (FF7) {
    "use strict";

// Puerto de context.tsx + provider.tsx + reducer.tsx + types.tsx (State/Action)
// a un store plano con patrón pub/sub. Sustituye useReducer + Context de React.

const initialState = {
    windowColor: structuredClone(FF7.defaultWindowColor),
    windowCorner: null,
    seconds: 0,
    isSoundEnabled: false,
    isCRTEnabled: true,
    currentHealth: null,
    currentMana: null,
    currentMateria: structuredClone(FF7.defaultMateriaLoadout),
    currentEquipment: structuredClone(FF7.defaultEquipment),
    userName: FF7.defaultUserName,
};

function reducer(state, action) {
    switch (action.type) {
        case "SET_WINDOW_COLOR":
            return { ...state, windowColor: action.payload };
        case "SET_SECONDS":
            return { ...state, seconds: action.payload };
        case "SET_IS_SOUND_ENABLED":
            return { ...state, isSoundEnabled: action.payload };
        case "SET_IS_CRT_ENABLED":
            return { ...state, isCRTEnabled: action.payload };
        case "SET_USER_NAME":
            return { ...state, userName: action.payload };
        case "SET_CURRENT_HEALTH":
            return { ...state, currentHealth: action.payload };
        case "SET_CURRENT_MANA":
            return { ...state, currentMana: action.payload };
        case "SET_CURRENT_MATERIA":
            return { ...state, currentMateria: action.payload };
        case "SET_CURRENT_EQUIPMENT":
            return { ...state, currentEquipment: action.payload };
        case "INCREMENT_SECONDS":
            return { ...state, seconds: state.seconds + 1 };
        default:
            return state;
    }
}

let state = structuredClone(initialState);
const listeners = new Set();

function notify(nextState, prevState) {
    listeners.forEach((listener) => listener(nextState, prevState));
}

const store = {
    getState() {
        return state;
    },
    dispatch(action) {
        const prevState = state;
        state = reducer(state, action);
        notify(state, prevState);
        return state;
    },
    // Devuelve una función de "unsubscribe", igual que closeNav/landingNav.
    // Si se pasa `keys` (array de nombres de campos del state), el listener
    // SOLO se invoca cuando alguno de esos campos cambió de valor entre el
    // dispatch anterior y este. Sin esto, cualquier componente suscrito a
    // todo el store se reconstruye entero cada vez que cambia CUALQUIER
    // cosa — incluido el segundero, que avanza cada 1s — y como el render
    // reconstruye nodos DOM nuevos, las animaciones de aparición (fadeIn)
    // se reinician: eso es lo que se veía como "parpadeo".
    subscribe(listener, keys) {
        const wrapped = keys
            ? (nextState, prevState) => {
                  const changed = keys.some((key) => nextState[key] !== prevState[key]);
                  if (changed) listener(nextState);
              }
            : (nextState) => listener(nextState);
        listeners.add(wrapped);
        return () => listeners.delete(wrapped);
    },
};

// ---- Efectos que en provider.tsx vivían en useEffect ----

let initialized = false;
let secondsTimer = null;
let prevSeconds = state.seconds;
let prevCRTEnabled = state.isCRTEnabled;

function startSecondsTimer() {
    if (secondsTimer) return;
    secondsTimer = setInterval(() => {
        store.dispatch({ type: "INCREMENT_SECONDS" });
    }, 1000);
}

// Equivalente al efecto: reset a 0 al llegar a secondsLimit + persistencia en cada cambio.
store.subscribe((next) => {
    if (!initialized) return;
    if (next.seconds === prevSeconds) return;
    prevSeconds = next.seconds;

    const secondsLimit = 360_000;
    if (next.seconds >= secondsLimit) {
        // El dispatch recursivo dispara este mismo listener otra vez con seconds=0,
        // que entonces persiste "0" — igual que el reducer original.
        store.dispatch({ type: "SET_SECONDS", payload: 0 });
        return;
    }

    localStorage.setItem("seconds", JSON.stringify(next.seconds));
});

// Equivalente al efecto que alterna la clase crt-effect en document.body.
store.subscribe((next) => {
    if (next.isCRTEnabled === prevCRTEnabled) return;
    prevCRTEnabled = next.isCRTEnabled;

    if (next.isCRTEnabled) {
        document.body.classList.add("crt-effect");
    } else {
        document.body.classList.remove("crt-effect");
    }
});

function initFromLocalStorage() {
    if (typeof window === "undefined") return;

    const windowColorJSON = localStorage.getItem("windowColor");
    if (windowColorJSON) {
        try {
            const windowColor = JSON.parse(windowColorJSON);
            store.dispatch({ type: "SET_WINDOW_COLOR", payload: windowColor });
        } catch (error) {
            console.error("Failed to parse windowColor from localStorage", error);
        }
    }

    const isSoundEnabledJSON = localStorage.getItem("isSoundEnabled");
    if (isSoundEnabledJSON) {
        try {
            const isSoundEnabled = JSON.parse(isSoundEnabledJSON);
            store.dispatch({ type: "SET_IS_SOUND_ENABLED", payload: isSoundEnabled });
        } catch (error) {
            console.error("Failed to parse isSoundEnabled from localStorage", error);
        }
    }

    const secondsJSON = localStorage.getItem("seconds");
    if (secondsJSON) {
        try {
            const seconds = JSON.parse(secondsJSON);
            store.dispatch({ type: "SET_SECONDS", payload: seconds });
        } catch (error) {
            console.error("Failed to parse seconds from localStorage", error);
        }
    }

    const userName = localStorage.getItem("userName");
    if (userName) {
        store.dispatch({ type: "SET_USER_NAME", payload: userName });
    }

    const isCRTEnabledJSON = localStorage.getItem("isCRTEnabled");
    if (isCRTEnabledJSON) {
        try {
            const isCRTEnabled = JSON.parse(isCRTEnabledJSON);
            store.dispatch({ type: "SET_IS_CRT_ENABLED", payload: isCRTEnabled });
        } catch (error) {
            console.error("Failed to parse isCRTEnabled from localStorage", error);
        }
    }

    initialized = true;
    startSecondsTimer();

    // Si isCRTEnabled ya venía a "true" por defecto (estado inicial) y no había
    // nada en localStorage, el body nunca recibió la clase; nos aseguramos aquí
    // (equivalente a que el efecto de CRT corra una vez al montar).
    if (state.isCRTEnabled) {
        document.body.classList.add("crt-effect");
    } else {
        document.body.classList.remove("crt-effect");
    }
}

// Helpers que persisten en localStorage, igual que hacían los componentes
// (BGColorPicker, Config) al despachar directamente + escribir localStorage.
function setWindowColor(windowColor) {
    store.dispatch({ type: "SET_WINDOW_COLOR", payload: windowColor });
    localStorage.setItem("windowColor", JSON.stringify(windowColor));
}

function setSoundEnabled(value) {
    store.dispatch({ type: "SET_IS_SOUND_ENABLED", payload: value });
    localStorage.setItem("isSoundEnabled", JSON.stringify(value));
}

function setCRTEnabled(value) {
    store.dispatch({ type: "SET_IS_CRT_ENABLED", payload: value });
    localStorage.setItem("isCRTEnabled", JSON.stringify(value));
}

function setUserName(value) {
    store.dispatch({ type: "SET_USER_NAME", payload: value });
    localStorage.setItem("userName", value);
}

initFromLocalStorage();

    FF7.store = store;
    FF7.setWindowColor = setWindowColor;
    FF7.setSoundEnabled = setSoundEnabled;
    FF7.setCRTEnabled = setCRTEnabled;
    FF7.setUserName = setUserName;
})(window.FF7 = window.FF7 || {});
(function (FF7) {
    "use strict";

// Sustituye <BrowserRouter>/<Routes>/<Route>/<Navigate> de App.tsx.
// Usa el hash de la URL (#/skills) en vez de pathname real: al abrir el
// proyecto con doble clic (protocolo file://) no hay servidor que resuelva
// rutas, y cambiar el "path" de verdad con pushState no funciona ahí. El
// hash sí funciona siempre, sea file:// o http://. Mismas rutas exactas que
// el original; cualquier cosa que no sea una ruta conocida cae en "/".

const ROUTES = ["/", "/skills", "/equip", "/projects", "/history", "/config", "/resume", "/name"];

const listeners = new Set();

function readHash() {
    const raw = window.location.hash.replace(/^#/, "");
    return ROUTES.includes(raw) ? raw : "/";
}

function notify() {
    const pathname = router.getPathname();
    listeners.forEach((listener) => listener(pathname));
}

const router = {
    getPathname() {
        return readHash();
    },
    navigate(path, { replace = false } = {}) {
        const target = `#${path}`;
        if (replace) {
            const url = window.location.href.split("#")[0] + target;
            window.history.replaceState({}, "", url);
            notify();
        } else {
            // Esto ya dispara "hashchange" -> notify() por sí solo.
            window.location.hash = path;
        }
    },
    subscribe(listener) {
        listeners.add(listener);
        return () => listeners.delete(listener);
    },
};

window.addEventListener("hashchange", notify);

// Equivalente a <Route path="*" element={<Navigate to="/" replace />} />
if (!ROUTES.includes(window.location.hash.replace(/^#/, ""))) {
    router.navigate("/", { replace: true });
}

    FF7.router = router;
})(window.FF7 = window.FF7 || {});
(function (FF7) {
    "use strict";

// Puerto directo de hooks/closeNav.ts — puente entre los cursores de página y
// el botón de cerrar "X" que dibuja el Menu.

let isFocused = false;
const listeners = new Set();

const closeNav = {
    getFocus() {
        return isFocused;
    },

    setFocus(focus) {
        if (focus === isFocused) return;
        isFocused = focus;
        listeners.forEach((listener) => listener());
    },

    subscribe(listener) {
        listeners.add(listener);
        return () => {
            listeners.delete(listener);
        };
    },
};

    FF7.closeNav = closeNav;
})(window.FF7 = window.FF7 || {});
(function (FF7) {
    "use strict";

// Puerto directo de hooks/landingNav.ts — puente entre el cursor del Menu
// (dueño de las teclas en landing) y el avatar/revive de la Landing page.

let currentFocus = null; // "avatar" | "revive" | null
const listeners = new Set();

const landingNav = {
    actions: {}, // { attack?, revive?, focusTarget? } — se rellenan igual que en el original

    getFocus() {
        return currentFocus;
    },

    setFocus(focus) {
        if (focus === currentFocus) return;
        currentFocus = focus;
        listeners.forEach((listener) => listener());
    },

    subscribe(listener) {
        listeners.add(listener);
        return () => {
            listeners.delete(listener);
        };
    },
};

    FF7.landingNav = landingNav;
})(window.FF7 = window.FF7 || {});
(function (FF7) {
    "use strict";

// Puerto de hooks/useKonamiCode.ts. El hook original reiniciaba el progreso y
// añadía/quitaba el listener cada vez que `enabled` cambiaba entre renders;
// aquí el consumidor llama a setEnabled(bool) cuando cambie esa condición
// (Menu la activa solo isLanding === true).

const KONAMI_SEQUENCE = [
    "ArrowUp", "ArrowUp",
    "ArrowDown", "ArrowDown",
    "ArrowLeft", "ArrowRight",
    "ArrowLeft", "ArrowRight",
    "KeyB", "KeyA",
];

function createKonamiCode(onUnlock) {
    let progress = 0;
    let enabled = false;
    let bound = false;

    const handleKeyDown = (e) => {
        if (e.repeat) return;

        if (e.code === KONAMI_SEQUENCE[progress]) {
            progress++;
            if (progress === KONAMI_SEQUENCE.length) {
                progress = 0;
                onUnlock();
            }
        } else {
            progress = (e.code === KONAMI_SEQUENCE[0]) ? 1 : 0;
        }
    };

    const bind = () => {
        if (bound) return;
        bound = true;
        window.addEventListener("keydown", handleKeyDown);
    };

    const unbind = () => {
        if (!bound) return;
        bound = false;
        window.removeEventListener("keydown", handleKeyDown);
    };

    return {
        setEnabled(value) {
            enabled = value;
            progress = 0;
            if (enabled) bind();
            else unbind();
        },
        destroy: unbind,
    };
}

    FF7.createKonamiCode = createKonamiCode;
})(window.FF7 = window.FF7 || {});
(function (FF7) {
    "use strict";

// Puerto de hooks/useCursorNav.ts. Es el módulo más delicado del proyecto:
// gestiona el cursor de teclado/ratón compartido en cada página.
//
// Diferencia clave con el hook de React: aquí no hay "re-render" automático.
// El componente que use createCursorNav(...) debe llamar a nav.updateConfig(...)
// cada vez que cambien datos derivados de su propio estado (equivalente a que
// el cuerpo del componente se ejecutara de nuevo): groups, enabled, fallback,
// resolveMove/resolvePageJump/onFocus/onConfirm/onCancel/onSwitch.
//
// El resto de la lógica (KEY_MAP, memoria de cursor, intención de teclado,
// clamp de grupos que se encogen, sonidos) es una traducción 1:1 del original.

const KEY_MAP = {
    ArrowUp: "up", Numpad8: "up",
    ArrowDown: "down", Numpad2: "down",
    ArrowLeft: "left", Numpad4: "left",
    ArrowRight: "right", Numpad6: "right",
    Enter: "confirm", NumpadEnter: "confirm",
    Space: "cancel", Numpad0: "cancel", Insert: "cancel", Escape: "cancel",
    PageUp: "pageUp", Numpad9: "pageUp",
    PageDown: "pageDown", Numpad3: "pageDown",
};

const SWITCH_CODES = ["ControlLeft", "ControlRight", "NumpadDecimal"];

const wrap = (index, delta, size) => (index + delta + size) % size;

const cursorMemory = new Map();

// Igual que en el original: la navegación por teclado hace que la superficie
// de destino arranque con el primer item enfocado; por ratón, sin cursor.
let keyboardNavIntent = false;

const markKeyboardNavigation = () => {
    keyboardNavIntent = true;
};

const consumeKeyboardNavIntent = () => {
    const intent = keyboardNavIntent;
    keyboardNavIntent = false;
    return intent;
};

const isEditableTarget = (target) => {
    if (!(target instanceof HTMLElement)) return false;
    if (target.isContentEditable || target.tagName === "TEXTAREA") return true;
    return target instanceof HTMLInputElement && target.type !== "range";
};

function createCursorNav(initialConfig) {
    let options = initialConfig;

    let pos = (() => {
        if (options.memoryKey && cursorMemory.has(options.memoryKey)) {
            return cursorMemory.get(options.memoryKey);
        }
        if (consumeKeyboardNavIntent()) {
            return options.fallback ?? options.initial;
        }
        return options.initial;
    })();

    const posListeners = new Set();
    const notifyPos = () => posListeners.forEach((listener) => listener(pos));

    let ctrlComboUsed = false;
    let listenersBound = false;

    const remember = (next) => {
        if (options.memoryKey) cursorMemory.set(options.memoryKey, next);
    };

    const moveTo = (next, silent) => {
        const group = options.groups.find((g) => g.id === next.group);
        if (!group || next.index < 0 || next.index >= group.size) return;
        if (group.isDisabled?.(next.index)) return;
        if (pos && pos.group === next.group && pos.index === next.index) return;

        pos = next;
        remember(next);
        if (!silent) FF7.playSound("select", FF7.store.getState().isSoundEnabled);
        options.onFocus(next);
        notifyPos();
    };

    const focus = (next) => moveTo(next, false);

    const setPosSilently = (next) => {
        pos = next;
        if (next) remember(next);
        notifyPos();
    };

    const isFocused = (group, index) => pos?.group === group && pos.index === index;

    // Clamp cuando un grupo se encoge por debajo del índice del cursor.
    const clamp = () => {
        if (!pos) return;
        const group = options.groups.find((g) => g.id === pos.group);
        if (group && group.size > 0 && pos.index >= group.size) {
            setPosSilently({ group: pos.group, index: group.size - 1 });
        }
    };

    const handleKeyDown = (e) => {
        if (e.ctrlKey && !SWITCH_CODES.includes(e.code)) ctrlComboUsed = true;
        if (SWITCH_CODES.includes(e.code)) {
            ctrlComboUsed = false;
            return;
        }
        if (isEditableTarget(e.target)) return;

        const action = KEY_MAP[e.code];
        if (!action) return;
        if (e.metaKey || e.altKey || e.ctrlKey) return;

        e.preventDefault();
        if (e.repeat && (action === "confirm" || action === "cancel")) return;

        if (action === "confirm") {
            if (pos) options.onConfirm(pos);
            else if (options.fallback) moveTo(options.fallback, false);
            return;
        }

        if (action === "cancel") {
            if (options.onCancel?.()) return;
            FF7.playSound("back", FF7.store.getState().isSoundEnabled);
            markKeyboardNavigation();
            FF7.router.navigate("/");
            return;
        }

        if (!pos) {
            if (options.fallback) moveTo(options.fallback, false);
            return;
        }

        const next = (action === "pageUp" || action === "pageDown")
            ? options.resolvePageJump?.(pos, action) ?? null
            : options.resolveMove(pos, action, { wrap });

        if (next) moveTo(next, false);
    };

    const handleKeyUp = (e) => {
        if (!SWITCH_CODES.includes(e.code) || ctrlComboUsed) return;
        if (options.onSwitch) {
            FF7.playSound("select", FF7.store.getState().isSoundEnabled);
            markKeyboardNavigation();
            options.onSwitch();
        }
    };

    const bindListeners = () => {
        if (listenersBound) return;
        listenersBound = true;
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
    };

    const unbindListeners = () => {
        if (!listenersBound) return;
        listenersBound = false;
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("keyup", handleKeyUp);
    };

    // Sustituye al "re-render": el consumidor debe llamarlo cuando cambien
    // groups/enabled/fallback o cualquiera de los callbacks derivados de su
    // propio estado (p.ej. Equip.tsx recalculando categoryItems.length).
    const updateConfig = (nextOptions) => {
        options = nextOptions;
        clamp();
        if (options.enabled) bindListeners();
        else unbindListeners();
    };

    const destroy = () => {
        unbindListeners();
    };

    const subscribe = (listener) => {
        posListeners.add(listener);
        return () => posListeners.delete(listener);
    };

    // Foco inicial (una sola vez), como el efecto de montaje original.
    if (pos) options.onFocus(pos);

    if (options.enabled) bindListeners();

    return { getPos: () => pos, focus, setPosSilently, isFocused, updateConfig, subscribe, destroy };
}

    FF7.createCursorNav = createCursorNav;
    FF7.markKeyboardNavigation = markKeyboardNavigation;
    FF7.consumeKeyboardNavIntent = consumeKeyboardNavIntent;
})(window.FF7 = window.FF7 || {});
(function (FF7) {
    "use strict";

// Puerto de components/ContentBox/ContentBox.tsx.
// Convención usada en todo el proyecto vanilla: en vez de spread de props JSX,
// se pasa `dataset: {label: "...", active: true, ...}` para los data-* y
// `attrs` para cualquier otro atributo/handler que el original pasara suelto.
function gradientFor(windowColor) {
    return `linear-gradient(135deg, rgb(${windowColor.topLeft[0]},${windowColor.topLeft[1]},${windowColor.topLeft[2]}) 0%, transparent 50%, rgb(${windowColor.bottomRight[0]}, ${windowColor.bottomRight[1]}, ${windowColor.bottomRight[2]}) 100%), linear-gradient(45deg, rgb(${windowColor.bottomLeft[0]},${windowColor.bottomLeft[1]},${windowColor.bottomLeft[2]}) 0%, rgb(${windowColor.topRight[0]},${windowColor.topRight[1]},${windowColor.topRight[2]}) 100%)`;
}

function createContentBox({ className = "", style = null, dataset = {}, attrs = {}, children = [] } = {}) {
    const box = FF7.el("div", { className: `contentBox ${className}`.trim(), ...attrs }, children);

    for (const [key, value] of Object.entries(dataset)) {
        if (value === null || value === undefined || value === false) continue;
        box.dataset[key] = value === true ? "true" : value;
    }

    const applyBackground = () => {
        if (style) {
            Object.assign(box.style, style);
        } else {
            box.style.backgroundImage = gradientFor(FF7.store.getState().windowColor);
        }
    };

    applyBackground();

    let unsubscribe = null;
    if (!style) {
        unsubscribe = FF7.store.subscribe(applyBackground, ["windowColor"]);
    }

    // Reemplaza SOLO el contenido interior, sin recrear el div .contentBox
    // en sí. Es la clave para evitar el parpadeo: la animación de aparición
    // (fadeIn) está atada a que el propio nodo .contentBox se inserte en el
    // DOM, así que si el nodo nunca se quita (solo cambian sus hijos), la
    // animación no se reinicia. Los paneles se crean UNA vez al montar la
    // página y luego solo se actualiza su contenido con esto.
    box.setChildren = (newChildren) => {
        FF7.clear(box);
        for (const child of [].concat(newChildren)) {
            if (child === null || child === undefined || child === false) continue;
            box.appendChild(typeof child === "string" || typeof child === "number" ? document.createTextNode(child) : child);
        }
    };

    box.destroy = () => { if (unsubscribe) unsubscribe(); };

    return box;
}

    FF7.createContentBox = createContentBox;
})(window.FF7 = window.FF7 || {});
(function (FF7) {
    "use strict";

// Puerto de components/ProgressBar/ProgressBar.tsx
// dataLimit/dataRefilling viajan también al div raíz .progressBar (en el
// original eran props sueltas que el spread `{...props}` colocaba ahí),
// ademas de decidir si el relleno interior lleva la animación arcoíris.
function createProgressBar({ accentColor = "#f5c4d0", percentage = 0, dataLimit = null, dataRefilling = null } = {}) {
    const inner = FF7.el("div", {
        style: { width: `${percentage}%`, backgroundColor: accentColor },
    });
    if (dataLimit === "true" && percentage === 100) inner.dataset.limit = "true";

    const middle = FF7.el("div", {}, [inner]);
    return FF7.el("div", {
        className: "progressBar",
        "data-limit": dataLimit === "true" ? "true" : null,
        "data-refilling": dataRefilling === "true" ? "true" : null,
    }, [middle]);
}

    FF7.createProgressBar = createProgressBar;
})(window.FF7 = window.FF7 || {});
(function (FF7) {
    "use strict";

// Puerto de components/ResourceCounter/ResourceCounter.tsx
function createResourceCounter({ label = "hp", currentValue = 152, maxValue = 302, accentColor = "#4f8fd4" } = {}) {
    const resourceColor = (currentValue === 0) ? "red" : (currentValue <= maxValue * 0.35) ? "yellow" : "white";

    const bar = FF7.el("div", { className: "resourceBar" }, [
        FF7.el("div", { style: { width: `${currentValue / maxValue * 100}%`, backgroundImage: `linear-gradient(90deg, ${accentColor}, #c6cded)` } }),
    ]);

    return FF7.el("div", { className: "resourceCounter flex" }, [
        FF7.el("span", { className: "font-glyph mr-2", "data-sprite": label }, [label]),
        FF7.el("div", { className: "flex flex-col" }, [
            FF7.el("div", { className: "flex" }, [
                FF7.el("span", { className: "w-[92px] flex justify-end" }, [FF7.textToSprite(currentValue.toString(), true, resourceColor)]),
                FF7.el("span", {}, [FF7.textToSprite("/", true)]),
                FF7.el("span", { className: "w-[92px] flex justify-end" }, [FF7.textToSprite(maxValue.toString(), true)]),
            ]),
            bar,
        ]),
    ]);
}

    FF7.createResourceCounter = createResourceCounter;
})(window.FF7 = window.FF7 || {});
(function (FF7) {
    "use strict";

// Puerto de components/Time/Time.tsx — se re-renderiza cada vez que cambia el FF7.store
// (el segundero incrementa cada 1s vía state/FF7.store.js).
function formatTime(sec) {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

function formatClock(date) {
    const h = date.getHours().toString().padStart(2, "0");
    const m = date.getMinutes().toString().padStart(2, "0");
    const s = date.getSeconds().toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
}

function createTime() {
    const span = FF7.el("span", { "data-label": "time" });

    const render = () => {
        FF7.clear(span);
        const sprite = FF7.textToSprite(formatClock(new Date()), true);
        if (sprite) span.appendChild(sprite);
    };

    render();
    const timer = setInterval(render, 1000);
    span.destroy = () => clearInterval(timer);
    return span;
}

    FF7.createTime = createTime;
})(window.FF7 = window.FF7 || {});
(function (FF7) {
    "use strict";

// Puerto de components/MateriaSlotPreview/MateriaSlotPreview.tsx
function createMateriaSlotPreview({ multiSlots = 0, singleSlots = 0 } = {}) {
    const container = FF7.el("div", { className: "materiaSlotPreview-equipmentContainer flex" });
    for (let index = 0; index < multiSlots + singleSlots; index++) {
        container.appendChild(FF7.el("div", { className: "flex relative" }, [
            FF7.el("div", { className: "materiaSlotPreview-materiaSlot" }),
            index < multiSlots ? FF7.el("div", { className: "materiaSlotPreview-materiaSlot" }) : null,
        ]));
    }
    return container;
}

    FF7.createMateriaSlotPreview = createMateriaSlotPreview;
})(window.FF7 = window.FF7 || {});
(function (FF7) {
    "use strict";

// Puerto de components/Scrollbar/Scrollbar.tsx.
// Diferencia con el original: en vez de un targetRef de React, se pasa
// directamente el elemento DOM ya existente (targetEl), porque para cuando se
// instancia el Scrollbar el contenedor scrollable ya está en el árbol.
const THUMB_FRACTION = 0.24;
const MIN_THUMB = 34;

function createScrollbar({ targetEl, onVisibleChange } = {}) {
    const thumb = FF7.el("div", { className: "scrollbar-thumb" });
    const track = FF7.el("div", { className: "scrollbar-track", "aria-hidden": true }, [thumb]);

    let state = { visible: false, height: 0, top: 0 };
    let drag = null;
    let lastSoundTop = 0;
    let resizeObserver = null;

    const applyState = () => {
        track.dataset.visible = state.visible ? "true" : "false";
        thumb.style.height = `${state.height}px`;
        thumb.style.transform = `translateY(${state.top}px)`;
        onVisibleChange?.(state.visible);
    };

    const update = () => {
        if (!targetEl) return;
        const { scrollHeight, clientHeight, scrollTop } = targetEl;
        const trackH = track.clientHeight;
        const scrollable = scrollHeight - clientHeight;
        if (scrollable <= 1 || trackH === 0) {
            if (state.visible) { state = { ...state, visible: false }; applyState(); }
            return;
        }
        const height = Math.max(MIN_THUMB, Math.round(trackH * THUMB_FRACTION));
        const top = Math.round((trackH - height) * (scrollTop / scrollable));
        state = { visible: true, height, top };
        applyState();
    };

    const onMove = (event) => {
        if (!drag || !targetEl) return;
        const scrollable = targetEl.scrollHeight - targetEl.clientHeight;
        const range = track.clientHeight - state.height;
        if (range <= 0) return;
        const scale = track.getBoundingClientRect().height / track.clientHeight || 1;
        const deltaLayout = (event.clientY - drag.startY) / scale;
        targetEl.scrollTop = drag.startScroll + (deltaLayout / range) * scrollable;

        const newTop = Math.round(range * (targetEl.scrollTop / scrollable));
        if (newTop !== lastSoundTop) {
            lastSoundTop = newTop;
            FF7.playSound("select", FF7.store.getState().isSoundEnabled);
        }
    };

    const onUp = () => {
        drag = null;
        document.body.style.userSelect = "";
    };

    const startDrag = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (!targetEl) return;
        drag = { startY: event.clientY, startScroll: targetEl.scrollTop };
        lastSoundTop = state.top;
        document.body.style.userSelect = "none";
    };

    const pageScroll = (event) => {
        if (!targetEl) return;
        const clickY = event.clientY - track.getBoundingClientRect().top;
        const scale = track.getBoundingClientRect().height / track.clientHeight || 1;
        const direction = clickY / scale < state.top ? -1 : 1;
        targetEl.scrollTop += direction * targetEl.clientHeight * 0.9;
    };

    thumb.addEventListener("mousedown", startDrag);
    track.addEventListener("mousedown", pageScroll);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("resize", update);

    if (targetEl) {
        update();
        targetEl.addEventListener("scroll", update, { passive: true });
        resizeObserver = new ResizeObserver(update);
        resizeObserver.observe(targetEl);
        if (targetEl.firstElementChild) resizeObserver.observe(targetEl.firstElementChild);
    }

    track.destroy = () => {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
        window.removeEventListener("resize", update);
        if (targetEl) targetEl.removeEventListener("scroll", update);
        resizeObserver?.disconnect();
    };

    return track;
}

    FF7.createScrollbar = createScrollbar;
})(window.FF7 = window.FF7 || {});
(function (FF7) {
    "use strict";

// Puerto de components/EquipmentSlots/EquipmentSlots.tsx
function createEquipmentSlots({ type = "Arma.", name = "Buster Sword", multiSlots = 0, singleSlots = 0, materia = [], focusedSlot = null, activeSlot = null, onSlotEnter, onSlotClick } = {}) {
    const { currentMateria } = FF7.store.getState();
    const arrIndex = (type === "Armad.") ? 1 : 0;
    let counter = 0;

    const buildSlot = (i) => {
        const matchedMateria = materia.find((item) => item.id === currentMateria[arrIndex][i]);
        const value = currentMateria[arrIndex][i];
        const inner = FF7.el("div", { className: "equipmentSlots-skill" }, [
            String(matchedMateria ? matchedMateria.name : (value ?? "")),
        ]);
        if (matchedMateria?.color) inner.dataset.color = matchedMateria.color;

        const slot = FF7.el("div", {
            className: "equipmentSlots-materiaSlot",
            "data-value": i,
            onMouseEnter: () => onSlotEnter?.(i),
            onClick: () => onSlotClick?.(i),
        }, [inner]);
        slot.dataset.focused = focusedSlot === i ? "true" : "false";
        slot.dataset.active = activeSlot === i ? "true" : "false";
        return slot;
    };

    const container = FF7.el("div", { className: "equipmentSlots-equipmentContainer flex" });
    for (let index = 0; index < multiSlots + singleSlots; index++) {
        const group = FF7.el("div", { className: "flex relative" });
        if (index < multiSlots) {
            group.appendChild(buildSlot(counter++));
            group.appendChild(buildSlot(counter++));
        } else {
            group.appendChild(buildSlot(counter++));
        }
        container.appendChild(group);
    }

    const typeWrap = FF7.el("span", { className: "mr-3" }, [FF7.textToSprite(type, false, "blue")]);
    const nameWrap = FF7.el("span", {}, [FF7.textToSprite(name)]);
    const label = FF7.el("p", { className: "flex mt-1" }, [typeWrap, nameWrap]);

    return FF7.el("div", { className: "w-[550px]" }, [label, container]);
}

    FF7.createEquipmentSlots = createEquipmentSlots;
})(window.FF7 = window.FF7 || {});
(function (FF7) {
    "use strict";

// Puerto de components/HistorySave/HistorySave.tsx
function createHistorySave({ historyItem, historyType, focused = false, onEnter } = {}) {
    if (!historyItem) return null;

    const infoBlock = FF7.el("div", { className: "ml-2 mt-[1.3rem]" }, [
        FF7.el("p", { className: "mb-4" }, [FF7.textToSprite(historyItem.user)]),
        FF7.el("p", { className: "flex" }, [
            FF7.el("span", { className: "font-glyph", "data-sprite": "lv" }, ["lv"]),
            FF7.el("span", {}, [FF7.textToSprite(historyItem.level.toString(), true)]),
        ]),
    ]);

    const topRow = FF7.el("div", { className: "mr-[414px] flex gap-5" }, [
        FF7.el("img", { className: "h-[11.5rem] w-auto", src: historyItem.image_path }),
        FF7.el("img", { className: "h-[11.5rem] w-auto", src: "assets/imagenes/portrait.png" }),
        infoBlock,
    ]);

    const roleLine = FF7.el("li", { className: "flex justify-between mb-3" }, [
        historyType !== "education" ? FF7.el("span", {}, [FF7.textToSprite("Rol")]) : null,
        FF7.el("span", {}, [FF7.textToSprite(historyItem.role)]),
    ]);
    const yearsLine = FF7.el("li", { className: "flex justify-between" }, [
        FF7.el("span", {}, [FF7.textToSprite("Años")]),
        FF7.el("span", {}, [FF7.textToSprite(historyItem.year)]),
    ]);

    const metaBox = FF7.createContentBox({
        dataset: { label: "historySaveMeta" },
        className: "absolute w-[27rem] h-[7rem] top-[31px] right-[-2px]",
        children: [FF7.el("ul", {}, [roleLine, yearsLine])],
    });

    const nameBox = FF7.createContentBox({
        dataset: { label: "historySave" },
        className: "absolute w-[43.8rem] h-[5rem] bottom-[-11px] right-[-2px]",
        children: [FF7.textToSprite(historyItem.name)],
    });

    const outerBox = FF7.createContentBox({
        dataset: { label: "historySave" },
        className: "h-[235px] relative",
        children: [topRow, metaBox, nameBox],
    });

    const anchor = FF7.el("a", {
        href: historyItem.link,
        title: historyItem.name,
        target: "_blank",
        className: "historySave cursor-pointer",
        onMouseEnter: () => onEnter?.(),
        onClick: () => FF7.playSound("saveSelect", FF7.store.getState().isSoundEnabled),
    }, [outerBox]);
    anchor.dataset.focused = focused ? "true" : "false";

    return anchor;
}

    FF7.createHistorySave = createHistorySave;
})(window.FF7 = window.FF7 || {});
(function (FF7) {
    "use strict";

// Puerto de components/MemCardLoadingBar/MemCardLoadingBar.tsx.
// El progreso se auto-impulsa vía setTimeout (igual que el useEffect original)
// y se informa al padre (MemCardSelector) mediante onProgressChange.
function createMemCardLoadingBar({ progress = 0, onProgressChange } = {}) {
    const bar = FF7.el("div", { className: "memCardLoadingBar h-[3rem]" });
    bar.style.width = `${progress}%`;
    bar.dataset.progress = String(progress);

    const headerWrap = FF7.el("div", { className: "relative h-[84px] mb-[10px]" }, [
        FF7.createContentBox({ dataset: { label: "MemCardHeader" }, className: "h-full absolute top-0 left-0 right-0", children: [FF7.textToSprite("Comprobando archivo de guardado.")] }),
    ]);

    const barBox = FF7.createContentBox({
        dataset: { label: "memCardLoadingBar" },
        className: "w-[27rem] h-[6rem] absolute z-2 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
        children: [bar],
    });

    const wrapper = FF7.el("div", {}, [headerWrap, barBox]);

    let timer = null;
    const tick = (current) => {
        if (current >= 110) return;
        if (current === 100) FF7.playSound("save", FF7.store.getState().isSoundEnabled);
        timer = setTimeout(() => {
            const next = current + 10;
            bar.style.width = `${next}%`;
            bar.dataset.progress = String(next);
            onProgressChange?.(next);
            tick(next);
        }, 80);
    };
    tick(progress);

    wrapper.destroy = () => { if (timer) clearTimeout(timer); };
    return wrapper;
}

    FF7.createMemCardLoadingBar = createMemCardLoadingBar;
})(window.FF7 = window.FF7 || {});
(function (FF7) {
    "use strict";

// Puerto de components/Portrait/Portrait.tsx. Renderiza el retrato normal
// (imagen), o si el nombre coincide con un personaje de FF7, la imagen
// recortada de ese personaje (archivo independiente, ya recortado con
// fondo transparente — no hace falta calcular ninguna posición).
function createPortrait({ src, width = 145, className, name, alt = "Party Member Portrait" } = {}) {
    const resolvedName = name ?? FF7.store.getState().userName;
    const sprite = FF7.resolvePortrait(resolvedName);
    const finalSrc = sprite ? sprite.src : src;

    return FF7.el("img", { src: finalSrc, alt, width, className: `object-contain ${className ?? ""}` });
}

    FF7.createPortrait = createPortrait;
})(window.FF7 = window.FF7 || {});
(function (FF7) {
    "use strict";

// Puerto directo de hooks/limitGauge.ts — la barra de límite, fuera de
// PartyMember para que sobreviva al cambio de página (PartyMember se
// recrea en cada ruta; este estado de módulo, no).

/** Cuanto tarda la barra en rellenarse tras gastarla */
const LIMIT_REFILL_MS = 5 * 60 * 1000;

/** Cada cuanto se publica el relleno mientras está en marcha */
const LIMIT_REFILL_TICK_MS = 1000;

let limitSpentAt = null;
let limitChargeValue = 100;
let limitTicker = null;
const limitGaugeListeners = new Set();

const notifyLimitGauge = () => limitGaugeListeners.forEach((listener) => listener());

const limitPercentageNow = () => {
    if (limitSpentAt === null) return 100;
    return Math.min(100, ((Date.now() - limitSpentAt) / LIMIT_REFILL_MS) * 100);
};

const stopLimitTicking = () => {
    if (limitTicker === null) return;
    clearInterval(limitTicker);
    limitTicker = null;
};

const startLimitTicking = () => {
    stopLimitTicking();
    // Sigue sonando aunque nadie esté suscrito: así la barra sigue
    // rellenándose mientras estás en otra página.
    limitTicker = setInterval(() => {
        limitChargeValue = limitPercentageNow();

        if (limitChargeValue >= 100) {
            limitSpentAt = null;
            limitChargeValue = 100;
            stopLimitTicking();
        }

        notifyLimitGauge();
    }, LIMIT_REFILL_TICK_MS);
};

const limitGauge = {
    getCharge: () => limitChargeValue,

    isReady: () => limitChargeValue >= 100,

    /** Vacía la barra y arranca el relleno */
    spend() {
        limitSpentAt = Date.now();
        limitChargeValue = 0;
        notifyLimitGauge();
        startLimitTicking();
    },

    subscribe(listener) {
        limitGaugeListeners.add(listener);
        return () => {
            limitGaugeListeners.delete(listener);
        };
    },
};

    FF7.limitGauge = limitGauge;
    FF7.LIMIT_REFILL_TICK_MS = LIMIT_REFILL_TICK_MS;
})(window.FF7 = window.FF7 || {});
(function (FF7) {
    "use strict";

// Puerto de data/limitBreak.ts — Cross Slash, dibujado a partir de
// `assets/imagenes/limit-spritesheet.png`.
//
// Tres tajos caen uno detrás de otro y quedan en pantalla, así que en el
// último golpe el conjunto se lee como el corte completo. `sheet` es dónde
// está cada tajo en la hoja de sprites; `at` es dónde va dentro del
// compuesto, tomado de la vista previa contra la que se diseñaron los
// sprites — se solapan, así que ni el orden de la hoja ni una simple
// colocación de izquierda a derecha lo reproduce.
//
// Todo está en los píxeles propios de la hoja. El escenario los escala al
// tamaño del retrato.
const LIMIT_SHEET = "assets/imagenes/limit-spritesheet.png";

/** Tamaño natural del compuesto, es decir la vista previa de la que salieron los offsets */
const LIMIT_BOX = { width: 62, height: 55 };

// order: qué golpe asienta este tajo — izquierda, luego derecha, luego el
// del medio que cruza ambos. Se mantiene aparte del orden del array a
// propósito — el array es el orden de dibujado, y el tajo del medio tiene
// que quedar *debajo* del de la derecha para verse bien, aunque llega el
// último.
const LIMIT_SLASHES = [
    { sheet: { x: 0, y: 0, width: 12, height: 50 }, at: { x: 0, y: 5 }, order: 0 },
    { sheet: { x: 18, y: 2, width: 38, height: 48 }, at: { x: 8, y: 0 }, order: 2 },
    { sheet: { x: 61, y: 0, width: 52, height: 55 }, at: { x: 10, y: 0 }, order: 1 },
];

/** Tamaño completo de la hoja, para poder posicionar un tajo con background-position */
const LIMIT_SHEET_SIZE = { width: 113, height: 55 };

// Tiempos, en ms. Deliberadamente sin prisa — los tajos deben caer como
// golpes y no como un parpadeo, y el corte terminado quiere un respiro
// antes de irse.
const LIMIT_TIMING = {
    /** Antes del primer golpe, para que el sonido del límite se note como algo propio */
    windUp: 950,
    /** Entre golpes */
    betweenHits: 700,
    /** Tras el último golpe, para que el corte completo se lea antes de irse */
    beforeSpin: 900,
    /** El giro final; debe coincidir con la animación limitSpin del CSS */
    spin: 480,
    /** La caída rápida de la barra al gastarse; coincide con la transición de vaciado */
    drain: 460,
    /** Cuánto tarda cada tajo en encogerse hasta su sitio; debe coincidir con limitSlashIn del CSS */
    slashIn: 220,
};

    FF7.LIMIT_SHEET = LIMIT_SHEET;
    FF7.LIMIT_BOX = LIMIT_BOX;
    FF7.LIMIT_SLASHES = LIMIT_SLASHES;
    FF7.LIMIT_SHEET_SIZE = LIMIT_SHEET_SIZE;
    FF7.LIMIT_TIMING = LIMIT_TIMING;
})(window.FF7 = window.FF7 || {});
(function (FF7) {
    "use strict";

// Puerto de components/PartyMember/PartyMember.tsx.
// En vez de useState+useEffect, mantiene su propio estado local (isAttacking,
// isDying, damage) y se reconstruye por completo (render()) cada vez que
// cambia algo relevante: el FF7.store global, su propio estado local, o el foco
// compartido de FF7.landingNav.
function createPartyMember({ memberId, showProgressBars = false, healthReduction = false } = {}) {
    const root = FF7.el("div", {});
    const partyMemberData = partyMemberJSON.find((m) => m.id === memberId);

    if (!memberId || !partyMemberData) {
        root.destroy = () => {};
        return root;
    }

    let isAttacking = false;
    let isDying = false;
    let damage = 0;
    let attackTimer = null;
    let dyingTimer = null;
    // Cross Slash: cuántos tajos han caído, y si están girando para irse
    let limitHits = 0;
    let limitSpinning = false;
    let limitDraining = false;
    let limitRunning = false;
    let limitTimers = [];
    // El fix ingenuo de "cachear el nodo del tajo y reutilizarlo" no basta:
    // aunque sea el MISMO objeto, si render() reconstruye todo el subárbol
    // del retrato en cada llamada, ese nodo igual se desconecta del padre
    // viejo y se reinserta en uno nuevo — y en Chrome eso reinicia la
    // animación CSS igual que si fuera un nodo recién creado (verificado).
    // La única forma de que la animación de entrada del tajo (limitSlashIn)
    // no se reinicie de más es que el nodo NUNCA se desconecte del documento
    // salvo cuando el corte realmente cambia. Por eso portraitInner (más
    // abajo) es persistente — se crea una sola vez y solo se le añaden o
    // quitan hijos puntuales — en vez de reconstruirse en cada render.
    let cachedSlashesEl = null;
    let cachedLimitHits = null;
    let cachedLimitSpinning = null;

    function epochToDate(epoch) {
        return new Date(epoch < 1e12 ? epoch * 1000 : epoch);
    }

    function getDaysUntilLevel(epoch) {
        const date = epochToDate(epoch);
        const now = new Date();
        const next = new Date(now.getFullYear(), date.getMonth(), date.getDate());
        if (next < now) next.setFullYear(next.getFullYear() + 1);
        const diff = next.getTime() - now.getTime();
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    }

    // HP y MP suben solos cada cumpleaños, en vez de quedar fijos: se
    // calculan a partir del nivel (la edad real). Ancladas para que hoy den
    // los mismos 2050 HP / 260 MP que antes estaban escritos a mano al
    // nivel actual, pero de aca en adelante crecen con cada nivel nuevo.
    const HP_PER_LEVEL = 50;
    const HP_BASE = 150;
    const MP_PER_LEVEL = 5;
    const MP_BASE = 70;
    function getMaxHp(level) { return HP_PER_LEVEL * level + HP_BASE; }
    function getMaxMp(level) { return MP_PER_LEVEL * level + MP_BASE; }

    const currentLevel = ageEpochToLevel(partyMemberData.age_epoch);
    const maxHp = getMaxHp(currentLevel);
    const maxMp = getMaxMp(currentLevel);

    // Mount-once: inicializa salud/maná si aún no existen (useEffect([]) original)
    const initial = FF7.store.getState();
    if (initial.currentHealth === null) {
        FF7.store.dispatch({ type: "SET_CURRENT_HEALTH", payload: maxHp });
    }
    if (initial.currentMana === null) {
        FF7.store.dispatch({ type: "SET_CURRENT_MANA", payload: maxMp });
    }

    const handleOnClick = () => {
        if (!healthReduction) return;
        const { currentHealth, isSoundEnabled } = FF7.store.getState();

        const dmg = Math.floor(Math.random() * (35 - 15 + 1)) + 130;
        const multiplier = (Math.random() > 0.95) ? 2 : 1;

        if (!currentHealth) {
            FF7.playSound("error", isSoundEnabled);
            return;
        }

        isAttacking = true;
        damage = dmg * multiplier;

        if (dmg >= currentHealth) {
            FF7.playSound("delete", isSoundEnabled);
            isDying = true;
        }

        const sound = (dmg * multiplier > 200) ? "crit" : "slash";
        FF7.playSound(sound, isSoundEnabled);

        // isAttacking/damage/isDying ya están fijados arriba: el dispatch
        // dispara `render` solo por su propia suscripción a currentHealth,
        // así que ese único render ya pinta el golpe completo. Un render()
        // extra aquí reconstruiría el retrato dos veces seguidas y
        // reiniciaría la animación de sacudida (el mismo parpadeo del Cross
        // Slash, pero en el ataque normal).
        FF7.store.dispatch({ type: "SET_CURRENT_HEALTH", payload: Math.max(0, currentHealth - dmg) });

        if (attackTimer) clearTimeout(attackTimer);
        attackTimer = setTimeout(() => { isAttacking = false; render(); }, 300);
        if (isDying) {
            if (dyingTimer) clearTimeout(dyingTimer);
            dyingTimer = setTimeout(() => { isDying = false; render(); }, 1000);
        }
    };

    /**
     * Cross Slash. Vacía la barra y asienta tres golpes — dos normales y uno
     * crítico — cada uno dejando su tajo en pantalla hasta que el corte
     * entero gira y se va.
     */
    const runLimitBreak = () => {
        if (!healthReduction || limitRunning) return;

        const { currentHealth: healthNow, isSoundEnabled: soundNow } = FF7.store.getState();

        if (!FF7.limitGauge.isReady() || !healthNow) {
            FF7.playSound("error", soundNow);
            return;
        }

        limitRunning = true;
        FF7.limitGauge.spend();
        limitDraining = true;
        limitHits = 0;
        limitSpinning = false;
        FF7.playSound("limit", soundNow);
        render();

        const after = (delay, run) => {
            limitTimers.push(setTimeout(run, delay));
        };

        const hit = (index, critical) => {
            const { currentHealth: health, isSoundEnabled } = FF7.store.getState();
            const dealt = Math.floor(Math.random() * 21 + 130) * (critical ? 2 : 1);

            // El corte siempre termina, incluso si un golpe anterior ya vació
            // la barra — simplemente deja de hacer daño, en vez de cortarse
            // a mitad de swing.
            limitHits = index + 1;
            FF7.playSound(critical ? "crit" : "slash", isSoundEnabled);

            if (health) {
                isAttacking = true;
                damage = dealt;
                if (dealt >= health) {
                    FF7.playSound("delete", isSoundEnabled);
                    isDying = true;
                }
                // OJO: isAttacking/damage/isDying/limitHits se fijan ANTES del
                // dispatch a propósito. dispatch ya dispara `render` a través
                // de la suscripción a currentHealth (ver store.subscribe más
                // abajo), así que con todo listo arriba, ese único render
                // pinta el golpe completo. Si además llamáramos a render()
                // aquí, el nodo del tajo se recrearía dos veces seguidas y su
                // animación de entrada (limitSlashIn) se reiniciaría — el
                // parpadeo que se veía en el Cross Slash.
                FF7.store.dispatch({ type: "SET_CURRENT_HEALTH", payload: Math.max(0, health - dealt) });
            } else {
                render();
            }

            if (attackTimer) clearTimeout(attackTimer);
            attackTimer = setTimeout(() => { isAttacking = false; render(); }, 300);
            if (isDying) {
                if (dyingTimer) clearTimeout(dyingTimer);
                dyingTimer = setTimeout(() => { isDying = false; render(); }, 1000);
            }
        };

        FF7.LIMIT_SLASHES.forEach((_, index) => {
            const critical = index === FF7.LIMIT_SLASHES.length - 1;
            after(FF7.LIMIT_TIMING.windUp + index * FF7.LIMIT_TIMING.betweenHits, () => hit(index, critical));
        });

        const lastHitAt = FF7.LIMIT_TIMING.windUp + (FF7.LIMIT_SLASHES.length - 1) * FF7.LIMIT_TIMING.betweenHits;
        after(lastHitAt + FF7.LIMIT_TIMING.beforeSpin, () => { limitSpinning = true; render(); });
        after(lastHitAt + FF7.LIMIT_TIMING.beforeSpin + FF7.LIMIT_TIMING.spin, () => {
            limitHits = 0;
            limitSpinning = false;
            render();
        });
        // La caída es rápida; después la barra sigue rellenándose sola.
        after(FF7.LIMIT_TIMING.drain, () => { limitDraining = false; render(); });
        after(lastHitAt + FF7.LIMIT_TIMING.beforeSpin + FF7.LIMIT_TIMING.spin, () => {
            limitRunning = false;
            limitTimers = [];
        });
    };

    const handleMouseEnter = () => {
        if (!healthReduction) return;
        FF7.landingNav.actions.focusTarget?.("avatar");
    };

    const handleEditName = () => {
        if (!healthReduction) return;
        FF7.playSound("select", FF7.store.getState().isSoundEnabled);
        FF7.markKeyboardNavigation();
        FF7.router.navigate("/name");
    };

    const handleHealClick = () => {
        const { currentMana, isSoundEnabled } = FF7.store.getState();
        if (currentMana) {
            FF7.playSound("heal", isSoundEnabled);
            FF7.store.dispatch({ type: "SET_CURRENT_HEALTH", payload: maxHp });
            FF7.store.dispatch({ type: "SET_CURRENT_MANA", payload: Math.max(0, currentMana - 34) });
        } else {
            FF7.playSound("error", isSoundEnabled);
        }
    };

    if (healthReduction) {
        FF7.landingNav.actions.attack = () => handleOnClick();
        FF7.landingNav.actions.revive = () => handleHealClick();
    }

    // ---- Estructura persistente del retrato ----
    // Se crea UNA vez y se reutiliza siempre: root/row/portrait/portraitInner
    // nunca se desmontan entre renders, así que el tajo (montado dentro de
    // portraitInner) puede quedarse quieto salvo cuando limitHits o
    // limitSpinning cambian de verdad. Todo lo demás (nombre, HP/MP, barra
    // de límite) sigue reconstruyéndose por completo en cada render, ya que
    // no tiene ninguna animación de entrada que proteger.
    const portraitImgEl = FF7.createPortrait({ src: partyMemberData.image_path, width: 145 });
    const portraitInner = FF7.el("div", { className: "self-center relative", onClick: handleOnClick, onMouseEnter: handleMouseEnter }, [
        portraitImgEl,
    ]);
    const damageP = FF7.el("p", { className: "absolute" });
    const reviveBtnWrap = FF7.el("div", {
        className: "absolute top-full",
        onClick: handleHealClick,
        onMouseEnter: () => FF7.landingNav.actions.focusTarget?.("revive"),
    });
    // damageP NO va en esta lista inicial: se conecta/desconecta a mano en
    // render() (ver más abajo) para que su animación de entrada se dispare
    // cada vez, en vez de una sola vez al cargar la página.
    const portrait = FF7.el("div", { className: "partyMember-portrait" }, [portraitInner, reviveBtnWrap]);
    const infoContainer = FF7.el("div", {});
    const row = FF7.el("div", { className: "flex justify-between" }, [portrait, infoContainer]);
    const extrasContainer = FF7.el("div", {});
    // extrasContainer (la barra de siguiente nivel + Cross Slash) va DENTRO
    // de row, como tercer hijo flex junto al retrato y la info — iba de
    // sibling de row colgando de root, y eso lo tiraba debajo de la tarjeta
    // en vez de al lado de las stats, solapándose con la biografía.
    row.appendChild(extrasContainer);
    root.appendChild(row);

    function render() {
        const { currentHealth, currentMana, userName } = FF7.store.getState();
        const landingFocus = healthReduction ? FF7.landingNav.getFocus() : null;
        const { name: memberName, limit_level, age_epoch } = partyMemberData;

        // Retrato: mismo <img> de siempre, solo se toca el src si de verdad
        // cambia (p.ej. al escribir el nombre de un personaje de FF7 como
        // "cloud" en el campo de nombre, que cambia el sprite por el suyo).
        const resolvedSprite = FF7.resolvePortrait(userName);
        const finalSrc = resolvedSprite ? resolvedSprite.src : partyMemberData.image_path;
        if (portraitImgEl.getAttribute("src") !== finalSrc) portraitImgEl.setAttribute("src", finalSrc);

        // Número de daño: la regla CSS de ".partyMember-portrait p" trae su
        // propia animación (fadeUp) puesta sin condición, así que solo se
        // dispara la primera vez que el <p> queda conectado al documento —
        // igual que con el tajo del Cross Slash (ver nota de cachedSlashesEl
        // más arriba, ya comprobado en Chrome). Como antes damageP se dejaba
        // montado desde el primer render (con data-interactive=true puesto
        // ya en la carga de la página, antes de cualquier golpe), la
        // animación corría una única vez al cargar el sitio y se quedaba fija
        // en opacity:0 (su fotograma final) para siempre — por eso el número
        // nunca se veía. Ahora se desconecta y se vuelve a insertar en cada
        // golpe para que la animación arranque de cero cada vez.
        if (damageP.parentNode) damageP.parentNode.removeChild(damageP);
        FF7.clear(damageP);
        if (isAttacking) {
            damageP.appendChild(FF7.textToSprite(damage.toString(), true));
            portrait.insertBefore(damageP, portraitInner);
        }

        // Botón de revivir: mismo trato, hijo suelto de portrait.
        FF7.clear(reviveBtnWrap);
        if (healthReduction && currentHealth === 0) {
            reviveBtnWrap.appendChild(FF7.createContentBox({
                dataset: { label: "healButton", focused: landingFocus === "revive" },
                children: [FF7.textToSprite("Revivir", false, (!currentMana || currentMana < 34) ? "grey" : "")],
            }));
        }

        portrait.dataset.shake = isAttacking ? "true" : "false";
        portrait.dataset.dying = isDying ? "true" : "false";
        portrait.dataset.interactive = healthReduction ? "true" : "false";
        portrait.dataset.health = currentHealth != null ? String(currentHealth) : "";
        portrait.dataset.focused = landingFocus === "avatar" ? "true" : "false";

        // El tajo: SOLO se toca portraitInner cuando limitHits o
        // limitSpinning cambiaron de verdad desde el último render. El resto
        // de renders (el que apaga isAttacking 300ms después de cada golpe,
        // los ticks de la barra fuera de la secuencia, etc.) no le hacen
        // absolutamente nada al tajo ya montado, así que su animación de
        // entrada nunca se reinicia de más.
        if (limitHits !== cachedLimitHits || limitSpinning !== cachedLimitSpinning) {
            if (cachedSlashesEl && cachedSlashesEl.parentNode === portraitInner) {
                portraitInner.removeChild(cachedSlashesEl);
            }
            const newSlashesEl = limitHits > 0 ? FF7.el("div", {
                className: "partyMember-limitSlashes",
                style: {
                    width: `calc(${FF7.LIMIT_BOX.width} * var(--limit-unit))`,
                    height: `calc(${FF7.LIMIT_BOX.height} * var(--limit-unit))`,
                },
            }, FF7.LIMIT_SLASHES.filter(({ order }) => order < limitHits).map(({ sheet, at, order }) =>
                FF7.el("span", {
                    className: "partyMember-limitSlash",
                    style: {
                        width: `calc(${sheet.width} * var(--limit-unit))`,
                        height: `calc(${sheet.height} * var(--limit-unit))`,
                        left: `calc(${at.x} * var(--limit-unit))`,
                        top: `calc(${at.y} * var(--limit-unit))`,
                        backgroundImage: `url(${FF7.LIMIT_SHEET})`,
                        backgroundSize: `calc(${FF7.LIMIT_SHEET_SIZE.width} * var(--limit-unit)) calc(${FF7.LIMIT_SHEET_SIZE.height} * var(--limit-unit))`,
                        backgroundPosition: `calc(${-sheet.x} * var(--limit-unit)) calc(${-sheet.y} * var(--limit-unit))`,
                    },
                })
            )) : null;
            if (newSlashesEl) {
                newSlashesEl.dataset.spinning = limitSpinning ? "true" : "false";
                portraitInner.appendChild(newSlashesEl);
            }
            cachedSlashesEl = newSlashesEl;
            cachedLimitHits = limitHits;
            cachedLimitSpinning = limitSpinning;
        }

        const nameBlock = healthReduction
            ? FF7.el("div", { className: "partyMember-username mb-2 flex items-center", onClick: handleEditName }, [
                FF7.textToSprite(userName || memberName),
                FF7.el("span", { className: "font-glyph ml-2", "data-sprite": "edit-icon" }),
            ])
            : FF7.el("p", { className: "mb-2" }, [FF7.textToSprite(userName || memberName)]);

        const infoBlock = FF7.el("div", { className: "mt-2 ml-8" }, [
            nameBlock,
            FF7.el("p", { className: "flex" }, [
                FF7.el("span", { className: "font-glyph", "data-sprite": "lv" }, ["lv"]),
                FF7.textToSprite(currentLevel.toFixed(0), true),
            ]),
            FF7.createResourceCounter({ label: "hp", maxValue: maxHp, currentValue: currentHealth || 0, accentColor: "#4f8fd4" }),
            FF7.createResourceCounter({ label: "mp", maxValue: maxMp, currentValue: currentMana || 0, accentColor: "#63d9c1" }),
        ]);

        FF7.clear(infoContainer);
        infoContainer.appendChild(infoBlock);

        FF7.clear(extrasContainer);
        if (showProgressBars) {
            const limitCharge = FF7.limitGauge.getCharge();
            const limitBarWrap = FF7.el("div", {
                className: healthReduction ? "ml-7 partyMember-limitBar" : "ml-7",
                onClick: runLimitBreak,
            }, [
                FF7.createProgressBar({
                    percentage: limitCharge,
                    accentColor: "#dfbddd",
                    dataLimit: "true",
                    dataRefilling: (!limitDraining && limitCharge < 100) ? "true" : null,
                }),
            ]);
            limitBarWrap.dataset.ready = (healthReduction && limitCharge >= 100) ? "true" : "false";

            extrasContainer.appendChild(FF7.el("div", { className: "mt-12" }, [
                FF7.el("p", {}, [FF7.textToSprite("sig. nivel")]),
                FF7.el("div", { className: "ml-7" }, [FF7.createProgressBar({ percentage: 100 - (getDaysUntilLevel(age_epoch) / 365) * 100 })]),
                FF7.el("p", {}, [FF7.textToSprite(`Nivel límite ${limit_level.toString()}`)]),
                limitBarWrap,
            ]));
        }
    }

    render();

    const unsubStore = FF7.store.subscribe(render, ["currentHealth", "currentMana", "userName"]);
    const unsubLanding = healthReduction ? FF7.landingNav.subscribe(render) : null;
    // La barra de límite solo se pinta cuando showProgressBars es true, así
    // que solo esas instancias necesitan re-renderizar en cada tick del
    // relleno (evita reconstruir el DOM de páginas que no la muestran).
    // Mientras el Cross Slash está en marcha (limitRunning) ignoramos los
    // ticks de la barra: el propio runLimitBreak ya programa sus renders en
    // los momentos justos (cada golpe, el giro final...), y sumarle un
    // render por cada tick de 1s del relleno solo recreaba los tajos ya
    // visibles de más, reiniciando su animación de entrada — otra fuente del
    // mismo parpadeo.
    const unsubLimitGauge = showProgressBars ? FF7.limitGauge.subscribe(() => {
        if (!limitRunning) render();
    }) : null;

    root.destroy = () => {
        unsubStore();
        if (unsubLanding) unsubLanding();
        if (unsubLimitGauge) unsubLimitGauge();
        if (healthReduction) {
            FF7.landingNav.actions.attack = undefined;
            FF7.landingNav.actions.revive = undefined;
            FF7.landingNav.setFocus(null);
        }
        if (attackTimer) clearTimeout(attackTimer);
        if (dyingTimer) clearTimeout(dyingTimer);
        limitTimers.forEach(clearTimeout);
        limitTimers = [];
    };

    return root;
}

    FF7.createPartyMember = createPartyMember;
})(window.FF7 = window.FF7 || {});
(function (FF7) {
    "use strict";

// Puerto de components/BGColorPicker/BGColorPicker.tsx.
// El padre (pages/Config.js) sigue siendo dueño de `activeColorPicker`, igual
// que en el original (era estado de Config.tsx pasado por props). Aquí en vez
// de props de React, Config llama a bgColorPicker.update({...}) cada vez que
// cambia algo relevante — el equivalente vanilla de "volver a renderizar con
// nuevas props".
//
// Arreglo de parpadeo: colorPickerBox (y las 3 cajas anidadas: preview de
// color, botón reset, sliders RGB) se crean UNA vez y se quedan siempre
// montadas; se ocultan con display:none cuando no aplican, en vez de
// quitarse y volver a insertarse — así ninguna repite su animación de
// aparición mientras arrastras un slider o mueves el ratón.
const CHANNELS = ["red", "green", "blue"];

function createBGColorPicker(initialProps) {
    let props = initialProps;
    let lastActiveColorPicker = props.activeColorPicker;

    const isDefaultWindowColor = () => {
        const windowColor = FF7.store.getState().windowColor;
        return !!(props.activeColorPicker && JSON.stringify(windowColor[props.activeColorPicker]) === JSON.stringify(FF7.defaultWindowColor[props.activeColorPicker]));
    };

    const setChannel = (channelIndex, value) => {
        if (!props.activeColorPicker) return;
        const windowColor = FF7.store.getState().windowColor;
        const next = Math.max(0, Math.min(255, value));
        if (next === windowColor[props.activeColorPicker][channelIndex]) return;

        FF7.playSound("select", FF7.store.getState().isSoundEnabled);
        const updated = structuredClone(windowColor);
        updated[props.activeColorPicker][channelIndex] = next;
        FF7.setWindowColor(updated);
    };

    const dismissHandler = () => {
        props.setActiveColorPicker(null);
        FF7.playSound("back", FF7.store.getState().isSoundEnabled);
    };

    const onResetClickHandler = () => {
        FF7.playSound("select", FF7.store.getState().isSoundEnabled);
        if (!props.activeColorPicker) return;
        const windowColor = FF7.store.getState().windowColor;
        const updated = structuredClone(windowColor);
        updated[props.activeColorPicker] = structuredClone(FF7.defaultWindowColor)[props.activeColorPicker];
        FF7.setWindowColor(updated);
    };

    // ---- esqueleto persistente ----
    const colorPickerBox = FF7.createContentBox({ dataset: { label: "configColorPreview" }, className: "bgColorPicker-colorPicker w-[14rem] h-[5rem] relative" });

    // El overlay de "click fuera para cerrar" tiene que cubrir TODA la
    // página, no la cajita pequeña del selector — por eso NO va dentro de
    // colorPickerBox (si fuera hijo suyo, con position:absolute e inset:0
    // solo taparía esa cajita de 14rem x 5rem, tapando además los propios
    // botones de esquina y bloqueando poder cambiar de esquina). Config.js
    // lo monta como hijo directo de su propia raíz.
    const overlay = FF7.el("div", { className: "absolute w-full h-full top-0 left-0 bottom-0 right-0", onClick: () => dismissHandler() });
    overlay.style.display = "none";

    const cornersTop = FF7.el("div", { className: "flex justify-between absolute left-0 top-0 right-0 h-1/2" });
    const cornersBottom = FF7.el("div", { className: "flex justify-between absolute left-0 bottom-0 right-0 h-1/2" });
    const cornersWrap = FF7.el("div", {}, [cornersTop, cornersBottom]);

    const rgbPreviewBox = FF7.createContentBox({ className: "bgColorPicker-RGBPreview" });
    rgbPreviewBox.style.display = "none";

    const resetIconBox = FF7.createContentBox({ dataset: { label: "reset" }, children: [FF7.el("span", { className: "font-glyph", "data-sprite": "reset-icon" })] });
    const resetBtn = FF7.el("div", { className: "bgColorPicker-RGBReset" }, [resetIconBox]);
    resetBtn.style.display = "none";
    resetBtn.addEventListener("click", () => onResetClickHandler());
    resetBtn.addEventListener("mouseenter", () => { if (!isDefaultWindowColor()) nav.focus({ group: "reset", index: 0 }); });

    const rgbSlidersBox = FF7.createContentBox({ className: "bgColorPicker-RGBSliders" });
    rgbSlidersBox.style.display = "none";

    colorPickerBox.setChildren([cornersWrap, rgbPreviewBox, resetBtn, rgbSlidersBox]);

    const buildNavConfig = () => ({
        groups: [
            { id: "sliders", size: CHANNELS.length },
            { id: "reset", size: 1, isDisabled: () => isDefaultWindowColor() },
        ],
        initial: null,
        fallback: { group: "sliders", index: 0 },
        enabled: !!props.activeColorPicker,
        resolveMove: (current, dir) => {
            if (dir === "left" || dir === "right") {
                if (current.group === "sliders") {
                    const windowColor = FF7.store.getState().windowColor;
                    const currentColor = props.activeColorPicker ? windowColor[props.activeColorPicker] : null;
                    if (currentColor) setChannel(current.index, currentColor[current.index] + ((dir === "right") ? 1 : -1));
                }
                return null;
            }
            const order = [
                ...CHANNELS.map((_, index) => ({ group: "sliders", index })),
                ...(!isDefaultWindowColor() ? [{ group: "reset", index: 0 }] : []),
            ];
            const currentOrderIndex = order.findIndex((p) => p.group === current.group && p.index === current.index);
            if (currentOrderIndex === -1) return order[0];
            return order[(currentOrderIndex + ((dir === "down") ? 1 : -1) + order.length) % order.length];
        },
        resolvePageJump: (current, dir) => {
            if (current.group === "sliders") {
                const windowColor = FF7.store.getState().windowColor;
                const currentColor = props.activeColorPicker ? windowColor[props.activeColorPicker] : null;
                if (currentColor) setChannel(current.index, currentColor[current.index] + ((dir === "pageUp") ? 16 : -16));
            }
            return null;
        },
        onFocus: () => {},
        onConfirm: (current) => {
            if (current.group === "reset") onResetClickHandler();
        },
        onCancel: () => {
            dismissHandler();
            return true;
        },
    });

    const nav = FF7.createCursorNav(buildNavConfig());

    const generateSlider = (name, index, currentColor, isCRTEnabled) => {
        const slider = FF7.el("div", { className: `bgColorPicker-slider bgColorPicker-${name}`, onMouseEnter: () => nav.focus({ group: "sliders", index }) });
        slider.dataset.focused = nav.isFocused("sliders", index) ? "true" : "false";

        const valueSpan = FF7.el("span", { className: "mr-3" }, [FF7.textToSprite(currentColor[index].toString().padStart(3, "0"), true)]);
        const input = FF7.el("input", {
            type: "range", min: 0, max: 255, value: currentColor[index],
            className: "bgColorPicker-RGBSlider",
            onChange: (e) => setChannel(index, parseInt(e.target.value, 10)),
        });
        input.dataset.crt = isCRTEnabled ? "true" : "false";

        slider.appendChild(valueSpan);
        slider.appendChild(input);
        return slider;
    };

    const generateButton = (corner) => {
        const btn = FF7.el("button", {
            className: "w-1/2",
            onClick: () => props.onCornerClick(corner),
            onMouseEnter: () => corner && props.onCornerEnter(corner),
        });
        btn.dataset.active = props.activeColorPicker === corner ? "true" : "false";
        btn.dataset.focused = props.focusedCorner === corner ? "true" : "false";
        btn.dataset.corner = corner;
        return btn;
    };

    function render() {
        const windowColor = FF7.store.getState().windowColor;
        const isCRTEnabled = FF7.store.getState().isCRTEnabled;
        const currentColor = props.activeColorPicker ? windowColor[props.activeColorPicker] : null;
        const isDefault = isDefaultWindowColor();

        overlay.style.display = props.activeColorPicker ? "" : "none";

        FF7.clear(cornersTop);
        cornersTop.appendChild(generateButton("topLeft"));
        cornersTop.appendChild(generateButton("topRight"));
        FF7.clear(cornersBottom);
        cornersBottom.appendChild(generateButton("bottomLeft"));
        cornersBottom.appendChild(generateButton("bottomRight"));

        if (currentColor) {
            rgbPreviewBox.style.display = "";
            rgbPreviewBox.style.backgroundColor = `rgb(${currentColor[0]}, ${currentColor[1]}, ${currentColor[2]})`;

            resetBtn.style.display = "";
            resetBtn.dataset.active = !isDefault ? "true" : "false";
            resetBtn.dataset.focused = nav.isFocused("reset", 0) ? "true" : "false";

            rgbSlidersBox.style.display = "";
            rgbSlidersBox.setChildren([
                generateSlider("red", 0, currentColor, isCRTEnabled),
                generateSlider("green", 1, currentColor, isCRTEnabled),
                generateSlider("blue", 2, currentColor, isCRTEnabled),
            ]);
        } else {
            rgbPreviewBox.style.display = "none";
            resetBtn.style.display = "none";
            rgbSlidersBox.style.display = "none";
        }
    }

    const unsubStore = FF7.store.subscribe(render, ["windowColor", "isCRTEnabled"]);
    const unsubNav = nav.subscribe(render);
    render();

    return {
        element: colorPickerBox,
        overlayElement: overlay,
        update(nextProps) {
            const openedNow = nextProps.activeColorPicker && !lastActiveColorPicker;
            props = nextProps;
            nav.updateConfig(buildNavConfig());
            if (openedNow) {
                nav.setPosSilently(props.focusSlidersOnOpen ? { group: "sliders", index: 0 } : null);
            }
            lastActiveColorPicker = props.activeColorPicker;
            render();
        },
        destroy() {
            unsubStore();
            unsubNav();
            nav.destroy();
        },
    };
}

    FF7.createBGColorPicker = createBGColorPicker;
})(window.FF7 = window.FF7 || {});
(function (FF7) {
    "use strict";

// Puerto de components/Menu/Menu.tsx.
// IMPORTANTE: buildStructure() reconstruye el DOM (solo cuando cambia la
// ruta); updateFocusVisuals() SOLO cambia el atributo data-focused en los
// nodos que ya existen. Antes ambas cosas eran la misma función y se
// reconstruía TODO el panel cada vez que el raton pasaba de un item a otro,
// lo que reiniciaba la animacion de aparicion del ContentBox en cada hover
// (efecto "parpadeo"). Separarlas lo evita.

function createMenu() {
    const navItems = menuJSON.slice().sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
    let lastMenuIndex = 0;
    const root = FF7.el("div", {});

    let focusRefs = [];
    let closeRefs = [];
    let liRefs = [];
    let boxEl = null;

    const isLanding = () => FF7.router.getPathname() === "/";

    const buildNavConfig = () => ({
        groups: [
            { id: "menu", size: navItems.length },
            { id: "avatar", size: 1 },
            { id: "revive", size: 1 },
        ],
        initial: null,
        fallback: { group: "menu", index: lastMenuIndex },
        enabled: isLanding(),
        resolveMove: (current, dir, { wrap }) => {
            if (current.group === "menu") {
                if (dir === "up") return { group: "menu", index: wrap(current.index, -1, navItems.length) };
                if (dir === "down") return { group: "menu", index: wrap(current.index, 1, navItems.length) };
                if (dir === "left") return { group: "avatar", index: 0 };
                return null;
            }
            if (current.group === "avatar") {
                if (dir === "right") return { group: "menu", index: lastMenuIndex };
                if (dir === "down" && FF7.store.getState().currentHealth === 0) return { group: "revive", index: 0 };
                return null;
            }
            if (dir === "up") return { group: "avatar", index: 0 };
            if (dir === "right") return { group: "menu", index: lastMenuIndex };
            return null;
        },
        onFocus: (current) => {
            if (current.group === "menu") {
                lastMenuIndex = current.index;
                FF7.landingNav.setFocus(null);
            } else {
                FF7.landingNav.setFocus(current.group === "avatar" ? "avatar" : "revive");
            }
        },
        onConfirm: (current) => {
            if (current.group === "avatar") { FF7.landingNav.actions.attack?.(); return; }
            if (current.group === "revive") { FF7.landingNav.actions.revive?.(); return; }
            const menuItem = navItems[current.index];
            if (!menuItem) return;
            FF7.playSound("select", FF7.store.getState().isSoundEnabled);
            if (menuItem.path) {
                window.open(menuItem.path, "_blank");
            } else {
                FF7.markKeyboardNavigation();
                FF7.router.navigate(`/${menuItem.id}`);
            }
        },
        onCancel: () => {
            const pos = nav.getPos();
            if (pos?.group === "avatar" || pos?.group === "revive") {
                FF7.playSound("back", FF7.store.getState().isSoundEnabled);
                nav.setPosSilently({ group: "menu", index: lastMenuIndex });
                FF7.landingNav.setFocus(null);
            }
            return true;
        },
    });

    const nav = FF7.createCursorNav(buildNavConfig());

    const konami = FF7.createKonamiCode(() => FF7.playSound("fanfare", FF7.store.getState().isSoundEnabled));
    konami.setEnabled(isLanding());

    FF7.landingNav.actions.focusTarget = (target) => nav.focus({ group: target, index: 0 });

    function handleClose() { FF7.playSound("back", FF7.store.getState().isSoundEnabled); }

    function handleMouseEnter(menuItem) {
        if (!isLanding()) return;
        nav.focus({ group: "menu", index: navItems.indexOf(menuItem) });
    }

    function handleOnClick() {
        if (!isLanding()) return;
        FF7.playSound("select", FF7.store.getState().isSoundEnabled);
    }

    // Construye el contenido de una posicion (0-10) UNA sola vez. Ya no lee
    // la ruta actual para decidir que crear (antes el boton de cerrar solo
    // se creaba si !isLanding(), y la clase "active" se calculaba aqui) -
    // ese estado ahora lo aplica updateRouteState() sobre estos mismos
    // nodos, que quedan fijos en el DOM para siempre. Es lo que permite que
    // la transicion de altura (el "panel sube y la palabra se coloca en su
    // sitio" al entrar a una pagina desde el menu) se anime de verdad: un
    // nodo que nunca se destruye SI tiene un estado anterior del que partir.
    function buildMenuItemContent(menuItem, position) {
        const fragment = document.createDocumentFragment();
        if (!menuItem) return fragment;

        const navIndex = navItems.indexOf(menuItem);

        if (menuItem.path) {
            const a = FF7.el("a", {
                className: "flex w-100",
                title: menuItem.title || menuItem.name,
                href: menuItem.path,
                target: "_blank",
                onClick: () => FF7.playSound("select", FF7.store.getState().isSoundEnabled),
                onMouseEnter: () => handleMouseEnter(menuItem),
            }, [
                FF7.textToSprite(menuItem.name),
                FF7.el("span", { className: "font-glyph ml-2", "data-sprite": "external-link-icon" }),
            ]);
            focusRefs[navIndex] = a;
            fragment.appendChild(a);
            return fragment;
        }

        const link = FF7.el("a", {
            href: `#/${menuItem.id}`,
            className: "w-100",
            onClick: (e) => { e.preventDefault(); handleOnClick(); FF7.router.navigate(`/${menuItem.id}`); },
            onMouseEnter: () => handleMouseEnter(menuItem),
        }, [FF7.textToSprite(menuItem.name)]);
        focusRefs[navIndex] = link;
        fragment.appendChild(link);

        // Siempre se crea (antes solo si !isLanding()); su visibilidad la
        // decide updateRouteState() cambiando style.display, nunca insertando
        // o quitando el nodo del DOM.
        const closeLink = FF7.el("a", {
            href: "#/",
            onClick: (e) => { e.preventDefault(); handleClose(); FF7.router.navigate("/"); },
            onMouseEnter: () => FF7.playSound("select", FF7.store.getState().isSoundEnabled),
        }, [
            FF7.createContentBox({ className: "absolute", dataset: { label: "close" }, children: [FF7.textToSprite("X")] }),
        ]);
        closeLink.dataset.label = "close";
        closeLink.style.display = "none";
        closeRefs[position] = closeLink;
        fragment.appendChild(closeLink);

        return fragment;
    }

    // Crea la caja y las 11 filas UNA sola vez, para toda la vida del menu.
    // A partir de aqui updateRouteState() solo les cambia clases/estilos:
    // nunca vuelve a llamar FF7.clear() ni a recrear el <li> o la caja.
    function buildStructure() {
        const list = FF7.el("ul", { className: "menu" });
        for (let position = 0; position < 11; position++) {
            const menuItem = menuJSON.find((item) => item.position === position);
            const li = FF7.el("li", { className: "flex justify-between" });
            li.appendChild(buildMenuItemContent(menuItem, position));
            liRefs[position] = li;
            list.appendChild(li);
        }

        boxEl = FF7.createContentBox({
            className: "m-auto w-[270px] absolute right-0",
            dataset: { label: "menu" },
            children: [list],
        });
        root.appendChild(boxEl);
    }

    // Aplica el estado de la ruta actual sobre la estructura ya montada por
    // buildStructure(): que filas se ven, si la caja esta en su alto de
    // "landing" (530px) o de "pagina" (84px), y si el boton de cerrar del
    // item activo esta visible. Como nunca crea ni destruye nodos, el
    // cambio de altura (caja + fila) SI dispara la transicion CSS: la fila
    // activa queda visualmente arriba a la vez que la caja se encoge,
    // porque las filas de encima colapsan a 0 en el mismo instante.
    function updateRouteState() {
        const pathname = FF7.router.getPathname();
        const landing = pathname === "/";

        // Pantallas independientes (como poner nombre) no están en el menú;
        // ocultarlo del todo en vez de dejar una caja vacía en la esquina.
        const isMenuPage = landing || navItems.some((item) => `/${item.id}` === pathname);
        boxEl.style.display = isMenuPage ? "" : "none";
        if (!isMenuPage) return;

        boxEl.className = `contentBox m-auto w-[270px] absolute right-0 ${!landing ? "h-[84px]" : "h-[530px]"}`;
        if (landing) boxEl.dataset.animated = "true";
        else delete boxEl.dataset.animated;

        for (let position = 0; position < 11; position++) {
            const menuItem = menuJSON.find((item) => item.position === position);
            const visible = ["/", `/${menuItem && menuItem.id}`].includes(pathname);
            liRefs[position].className = `${visible ? "h-[29px] mb-4" : "h-0 invisible"} flex justify-between`;
            if (closeRefs[position]) closeRefs[position].style.display = (!landing && visible) ? "" : "none";
        }

        navItems.forEach((menuItem, navIndex) => {
            if (menuItem.path) return;
            const link = focusRefs[navIndex];
            if (link) link.className = `${pathname === `/${menuItem.id}` ? "active" : ""} w-100`.trim();
        });

        updateFocusVisuals();
    }

    function updateFocusVisuals() {
        const landing = isLanding();
        navItems.forEach((menuItem, index) => {
            const ref = focusRefs[index];
            if (!ref) return;
            ref.dataset.focused = menuItem.path
                ? (nav.isFocused("menu", index) ? "true" : "false")
                : (nav.isFocused("menu", index) && landing ? "true" : "false");
        });
        closeRefs.forEach((ref) => {
            if (ref) ref.dataset.focused = FF7.closeNav.getFocus() ? "true" : "false";
        });
    }

    function onRouteChange() {
        const pathname = FF7.router.getPathname();
        konami.setEnabled(pathname === "/");
        nav.updateConfig(buildNavConfig());

        if (pathname === "/") {
            if (FF7.consumeKeyboardNavIntent()) nav.setPosSilently({ group: "menu", index: lastMenuIndex });
        } else {
            const index = navItems.findIndex((item) => `/${item.id}` === pathname);
            if (index !== -1) lastMenuIndex = index;
            nav.setPosSilently(null);
            FF7.landingNav.setFocus(null);
        }
        updateRouteState();
    }

    const unsubRouter = FF7.router.subscribe(onRouteChange);
    const unsubStore = FF7.store.subscribe(() => {
        const pos = nav.getPos();
        if (pos?.group === "revive" && FF7.store.getState().currentHealth !== 0) {
            nav.setPosSilently({ group: "avatar", index: 0 });
            FF7.landingNav.setFocus("avatar");
        }
    }, ["currentHealth"]);
    const unsubNav = nav.subscribe(updateFocusVisuals);
    const unsubClose = FF7.closeNav.subscribe(updateFocusVisuals);

    buildStructure();
    updateRouteState();

    root.destroy = () => {
        unsubRouter(); unsubStore(); unsubNav(); unsubClose();
        nav.destroy();
        konami.destroy();
        FF7.landingNav.actions.focusTarget = undefined;
    };

    return root;
}

    FF7.createMenu = createMenu;
})(window.FF7 = window.FF7 || {});
(function (FF7) {
    "use strict";

// Puerto de pages/History/History.tsx.
// Antes era un simple "renderer" que MemCardSelector reconstruía en cada
// hover (con sus ContentBox anidados por cada guardado, parpadeando todos a
// la vez). Ahora construye la lista UNA sola vez por tipo de historial
// (work/education) y expone setFocusedIndex() para solo tocar el
// data-focused de los items ya existentes.
function createHistoryList({ historyType, onItemEnter, onEmptyClick } = {}) {
    const history = (historyType === "education") ? educationJSON : historyJSON;
    const MIN_ITEMS = 3;
    const placeholdersNeeded = Math.max(0, MIN_ITEMS - history.length);

    const container = FF7.el("div", {});
    const itemRefs = [];

    const headerBox = FF7.createContentBox({ dataset: { label: "historyHeader" }, className: "h-full absolute top-0 left-0 right-0", children: [FF7.textToSprite("Elige un archivo.")] });
    const fileLabelBox = FF7.createContentBox({ dataset: { label: "historyFileLabel" }, className: "h-full w-[225px] absolute top-0 right-[280px] flex", children: [FF7.textToSprite("FILE", false, "yellow"), FF7.textToSprite(historyType !== "education" ? " 01" : " 02")] });
    container.appendChild(FF7.el("div", { className: "relative h-[84px] mb-[10px]" }, [headerBox, fileLabelBox]));

    // Antes las tarjetas se apilaban sueltas debajo del header: con 4-5
    // entradas (Work tiene 5) no entraban todas en el alto visible y no
    // habia forma de bajar a verlas. Mismo patron scroll+scrollbar que ya
    // usan Resume/Proyectos/Equipo, con el header siempre fijo arriba.
    let hasScrollbar = false;
    const scrollEl = FF7.el("div", { className: "history-list-scroll hide-scrollbar -ml-4 h-[692px] overflow-y-auto pl-4" });
    const scrollbar = FF7.createScrollbar({
        targetEl: scrollEl,
        onVisibleChange: (visible) => {
            if (visible === hasScrollbar) return;
            hasScrollbar = visible;
            scrollEl.className = `history-list-scroll hide-scrollbar -ml-4 h-[692px] overflow-y-auto pl-4 ${hasScrollbar ? "pr-9" : ""}`;
        },
    });

    history.forEach((item, index) => {
        const save = FF7.createHistorySave({ historyItem: item, historyType, focused: false, onEnter: () => onItemEnter?.(index) });
        if (save) {
            itemRefs[index] = save;
            scrollEl.appendChild(save);
        }
    });

    for (let index = 0; index < placeholdersNeeded; index++) {
        const slotIndex = history.length + index;
        const placeholder = FF7.el("div", {
            className: "historySave",
            onMouseEnter: () => onItemEnter?.(slotIndex),
            onClick: () => onEmptyClick?.(),
        }, [
            FF7.createContentBox({ dataset: { label: "historySave" }, className: "h-[235px] relative flex items-center", children: [FF7.el("span", { className: "pl-32" }, [FF7.textToSprite("VACÍO", false, "yellow")])] }),
        ]);
        placeholder.dataset.focused = "false";
        itemRefs[slotIndex] = placeholder;
        scrollEl.appendChild(placeholder);
    }

    container.appendChild(FF7.el("div", { className: "relative" }, [scrollEl, scrollbar]));

    return {
        element: container,
        historyType,
        setFocusedIndex(focusedIndex) {
            itemRefs.forEach((ref, index) => {
                if (ref) ref.dataset.focused = focusedIndex === index ? "true" : "false";
            });
            itemRefs[focusedIndex]?.scrollIntoView?.({ block: "nearest" });
        },
        destroy() { scrollbar.destroy?.(); },
    };
}

    FF7.createHistoryList = createHistoryList;
})(window.FF7 = window.FF7 || {});
(function (FF7) {
    "use strict";

// Puerto de components/MemCardSelector/MemCardSelector.tsx.
// Arreglo de parpadeo: cada fase (opciones / cargando / lista) tiene su
// propio nodo persistente; mountPhase() solo cambia de nodo cuando la fase
// realmente cambia, nunca "porque sí" en cada hover. Dentro de la fase de
// opciones solo se actualiza data-focused; la lista de historial usa
// FF7.createHistoryList (ver History.js), que hace lo mismo.
const MIN_SAVE_SLOTS = 3;
const OPTIONS = ["work", "education"];
const OPTION_LABELS = { work: "Trabajo", education: "Educación" };

function createMemCardSelector() {
    const root = FF7.el("div", {});

    let memoryCardLoaded = false;
    let optionSelected = false;
    let selectedHistoryType = "work";
    let memoryCardProgress = 0;
    let loadingBar = null;
    let historyList = null;
    let currentPhaseNode = null;

    const isLoading = () => optionSelected && memoryCardProgress <= 100;
    const isListShown = () => optionSelected && memoryCardProgress > 100;
    const historyItems = () => (selectedHistoryType === "education") ? educationJSON : historyJSON;
    const saveSlotCount = () => Math.max(MIN_SAVE_SLOTS, historyItems().length);

    // ---- fase "opciones" (persistente) ----
    const optionsHeaderBox = FF7.createContentBox({ dataset: { label: "MemCardHeader" }, className: "h-full absolute top-0 left-0 right-0", children: [FF7.textToSprite("Elige un archivo de guardado.")] });
    const optionsListBox = FF7.createContentBox({ dataset: { label: "memCardSelector" }, className: "absolute z-1 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" });
    const optionsPhaseNode = FF7.el("div", {}, [
        FF7.el("div", { className: "relative h-[84px] mb-[10px]" }, [optionsHeaderBox]),
        optionsListBox,
    ]);

    const optionRefs = OPTIONS.map((option, index) => {
        const btn = FF7.el("button", {}, [FF7.textToSprite(OPTION_LABELS[option] ?? option)]);
        const li = FF7.el("li", {
            className: "w-full flex justify-center mr-1",
            onMouseEnter: () => nav.focus({ group: "options", index }),
            onClick: () => onClickHandler(option),
        }, [btn]);
        return { li, btn, option };
    });
    optionsListBox.setChildren([
        FF7.el("ul", { className: "memCardSelector-historyOptions flex flex-col items-center gap-1" }, optionRefs.map((r) => r.li)),
    ]);

    function updateOptionsVisuals() {
        optionRefs.forEach(({ li, btn, option }, index) => {
            li.dataset.focused = (nav.isFocused("options", index) && memoryCardLoaded) ? "true" : "false";
            FF7.clear(btn);
            const sprite = FF7.textToSprite(OPTION_LABELS[option] ?? option, undefined, memoryCardLoaded ? "white" : "grey");
            if (sprite) btn.appendChild(sprite);
        });
    }

    const onClickHandler = (historyType) => {
        if (!memoryCardLoaded) { FF7.playSound("error", FF7.store.getState().isSoundEnabled); return; }
        FF7.playSound("select", FF7.store.getState().isSoundEnabled);
        optionSelected = true;
        selectedHistoryType = historyType;
        memoryCardProgress = 0;
        loadingBar = null;
        nav.updateConfig(buildNavConfig());
        render();
    };

    const buildNavConfig = () => ({
        groups: [
            { id: "options", size: OPTIONS.length, isDisabled: () => !memoryCardLoaded },
            { id: "saves", size: saveSlotCount() },
            { id: "close", size: 1 },
        ],
        initial: null,
        fallback: isLoading() ? undefined : (isListShown() ? { group: "saves", index: 0 } : { group: "options", index: 0 }),
        enabled: true,
        resolveMove: (current, dir) => {
            if (isLoading() || (dir !== "up" && dir !== "down")) return null;
            if (current.group === "close") {
                const group = isListShown() ? "saves" : "options";
                const size = isListShown() ? saveSlotCount() : OPTIONS.length;
                return { group, index: (dir === "down") ? 0 : size - 1 };
            }
            if (current.group === "options" && !optionSelected) {
                if (dir === "up" && current.index === 0) return { group: "close", index: 0 };
                if (dir === "down" && current.index === OPTIONS.length - 1) return { group: "close", index: 0 };
                return { group: "options", index: current.index + ((dir === "down") ? 1 : -1) };
            }
            if (current.group === "saves" && isListShown()) {
                if (dir === "up" && current.index === 0) return { group: "close", index: 0 };
                if (dir === "down" && current.index === saveSlotCount() - 1) return { group: "close", index: 0 };
                return { group: "saves", index: current.index + ((dir === "down") ? 1 : -1) };
            }
            return null;
        },
        resolvePageJump: (current, dir) => {
            if (current.group !== "saves" || !isListShown()) return null;
            return { group: "saves", index: (dir === "pageUp") ? 0 : saveSlotCount() - 1 };
        },
        onFocus: (current) => FF7.closeNav.setFocus(current.group === "close"),
        onConfirm: (current) => {
            if (isLoading()) return;
            if (current.group === "close") {
                FF7.playSound("back", FF7.store.getState().isSoundEnabled);
                FF7.closeNav.setFocus(false);
                FF7.markKeyboardNavigation();
                FF7.router.navigate("/");
                return;
            }
            if (current.group === "options" && !optionSelected) {
                onClickHandler(OPTIONS[current.index]);
                return;
            }
            if (current.group === "saves" && isListShown()) {
                const item = historyItems()[current.index];
                if (item) {
                    FF7.playSound("saveSelect", FF7.store.getState().isSoundEnabled);
                    window.open(item.link, "_blank");
                } else {
                    FF7.playSound("error", FF7.store.getState().isSoundEnabled);
                }
            }
        },
        onCancel: () => {
            if (isLoading()) return true;
            if (isListShown()) {
                FF7.playSound("back", FF7.store.getState().isSoundEnabled);
                optionSelected = false;
                memoryCardProgress = 0;
                loadingBar = null;
                const pos = nav.getPos();
                nav.updateConfig(buildNavConfig());
                nav.setPosSilently(pos ? { group: "options", index: 0 } : null);
                render();
                return true;
            }
            return false;
        },
    });

    const nav = FF7.createCursorNav(buildNavConfig());

    setTimeout(() => {
        memoryCardLoaded = true;
        nav.updateConfig(buildNavConfig());
        render();
    }, 800);

    function mountPhase(node) {
        if (currentPhaseNode === node) return;
        if (currentPhaseNode) root.removeChild(currentPhaseNode);
        root.appendChild(node);
        currentPhaseNode = node;
    }

    function render() {
        if (!optionSelected) {
            updateOptionsVisuals();
            mountPhase(optionsPhaseNode);
            return;
        }

        if (isLoading()) {
            if (!loadingBar) {
                loadingBar = FF7.createMemCardLoadingBar({
                    progress: memoryCardProgress,
                    onProgressChange: (next) => {
                        memoryCardProgress = next;
                        if (isListShown()) {
                            nav.updateConfig(buildNavConfig());
                            const pos = nav.getPos();
                            if (pos && pos.group !== "saves") nav.setPosSilently({ group: "saves", index: 0 });
                        }
                        render();
                    },
                });
            }
            mountPhase(loadingBar);
            return;
        }

        if (isListShown()) {
            if (!historyList || historyList.historyType !== selectedHistoryType) {
                historyList?.destroy?.();
                historyList = FF7.createHistoryList({
                    historyType: selectedHistoryType,
                    onItemEnter: (index) => nav.focus({ group: "saves", index }),
                    onEmptyClick: () => FF7.playSound("error", FF7.store.getState().isSoundEnabled),
                });
            }
            historyList.setFocusedIndex(nav.getPos()?.group === "saves" ? nav.getPos().index : null);
            mountPhase(historyList.element);
        }
    }

    const unsubNav = nav.subscribe(render);
    render();

    root.destroy = () => {
        unsubNav();
        nav.destroy();
        FF7.closeNav.setFocus(false);
        if (loadingBar) loadingBar.destroy?.();
        historyList?.destroy?.();
    };

    return root;
}

    FF7.createMemCardSelector = createMemCardSelector;
})(window.FF7 = window.FF7 || {});
(function (FF7) {
    "use strict";

// Puerto de pages/Landing/Landing.tsx.
// Arreglo de parpadeo: partyBox/metaBox/pageInfoBox y partyMemberInstance se
// crean una vez; refreshLocation() solo actualiza el texto del panel
// superior derecho, no reconstruye la página entera.
//
// Panel del reloj (metaInfo) subido de bottom-[110px] a bottom-[120px], a
// petición — antes quedaba un poco más pegado al borde inferior.
function createLandingPage() {
    const root = FF7.el("div", {});
    let location = locations[Math.floor(Math.random() * locations.length)];

    const partyMemberInstance = FF7.createPartyMember({ memberId: 1, showProgressBars: true, healthReduction: true });

    const bio = FF7.createContentBox({ dataset: { label: "bio" }, children: [
    FF7.el("p", { className: "mb-2" }, [FF7.textToSprite("Programador de Videojuegos Unity")]),
    FF7.el("p", { className: "mb-2" }, [FF7.textToSprite("(Junior) y Técnico Microinformático.")]),
    FF7.el("p", { className: "mb-2" }, [FF7.textToSprite("Bienvenido a mi portafolio interactivo.")]),
    FF7.el("p", { className: "mb-2" }, [FF7.textToSprite("Aquí encontrarás mis proyectos.")]),
    FF7.el("p", { className: "mb-2" }, [FF7.textToSprite("integrados en este menú estilo FF7 (PS1).")]),
    FF7.el("p", { className: "mb-2" }, [FF7.textToSprite("")]),
] });
    const bioWrap = FF7.el("div", { className: "flex items-center justify-center h-[340px] w-[720px] left-[53px] right-[220px] top-[294px] absolute" }, [bio]);

    const partyBox = FF7.createContentBox({
        className: "w-[1000px] h-[720px] m-auto absolute top-[44px]",
        dataset: { label: "party" },
        children: [partyMemberInstance, bioWrap],
    });

    const timeSpan = FF7.createTime();
    const metaBox = FF7.createContentBox({
        className: "w-[280px] h-[110px] m-auto absolute right-0 bottom-[120px]",
        dataset: { label: "metaInfo" },
        children: [
            FF7.el("ul", { className: "flex justify-between flex-col h-full" }, [
                FF7.el("li", { className: "flex justify-between" }, [FF7.el("span", { className: "mr-3" }, [FF7.textToSprite("Time")]), timeSpan]),
                FF7.el("li", { className: "flex justify-between" }, [FF7.el("span", {}, [FF7.textToSprite("Gil")]), FF7.textToSprite("300887", true)]),
            ]),
        ],
    });

    const locationSpan = FF7.el("span", { className: "landing-location" });
    const pageInfoBox = FF7.createContentBox({
        className: "landing-pageInfo w-[535px] h-[95px] m-auto absolute right-0 top-0 flex items-center justify-between",
        dataset: { label: "pageInfo" },
        children: [
            locationSpan,
            FF7.el("span", { className: "landing-refresh font-glyph", "data-sprite": "reset-icon", onClick: () => refreshLocation() }),
        ],
    });

    function renderLocation() {
        FF7.clear(locationSpan);
        const sprite = FF7.textToSprite(location);
        if (sprite) locationSpan.appendChild(sprite);
    }

    function refreshLocation() {
        FF7.playSound("select", FF7.store.getState().isSoundEnabled);
        if (locations.length < 2) return;
        let next = location;
        while (next === location) next = locations[Math.floor(Math.random() * locations.length)];
        location = next;
        renderLocation();
    }

    renderLocation();
    root.appendChild(partyBox);
    root.appendChild(metaBox);
    root.appendChild(pageInfoBox);

    root.destroy = () => { partyMemberInstance.destroy?.(); timeSpan.destroy?.(); };
    return root;
}

    FF7.createLandingPage = createLandingPage;
})(window.FF7 = window.FF7 || {});
(function (FF7) {
    "use strict";

// Puerto de pages/Projects/Projects.tsx.
// Nota fiel al original: los enlaces de proyecto NO llevan target="_blank"
// (navegan en la misma pestana); por eso aqui se deja el <a> nativo intacto
// y en el confirm por teclado se llama a anchor.click() como hacia anchorRefs.
//
// Arreglo de parpadeo: header/descBox/contentLeft/contentRight,
// partyMemberInstance y moreInfoBox se crean UNA vez. moreInfoBox se queda
// siempre montado dentro de contentLeft (nunca se quita del DOM); solo se
// oculta con display:none cuando no hay texto que mostrar, y se actualiza
// su contenido con setChildren().
// PROJECT_TABS/PROJECT_ENTRIES estan generalizados a varias pestañas:
// "Aplicaciones" esta lista (mecanismo completo) pero vacia todavia — a la
// espera de que Matias diga que apps van ahi.
const PROJECT_TABS = [
    { key: "projects", label: "Proyectos" },
    { key: "aplicaciones", label: "Aplicaciones" },
];

// TODO: falta confirmar el año de cada proyecto (date). Se deja vacio y el
// panel de detalle simplemente no dibuja esa linea hasta que se rellene.
// skills: inferidos de la propia descripcion/moreInfo de cada proyecto ya
// existente, con los mismos nombres que usa skillsJSON (para heredar color).
const PROJECTS = [
    { key: "lordmagician", name: "Lord Magician", date: "", skills: ["Dart", "Kotlin"], icon: "assets/imagenes/icon_item.png", link: "https://maerga.itch.io/lord-magician", description: "Juego desarrollado con Dart y Kotlin.", screenshots: ["assets/imagenes/capturas/LordMagician.jpg", "assets/imagenes/capturas/LordMagician2.jpg", "assets/imagenes/capturas/LordMagician3.jpg"], moreInfo: ["Juego desarrollado", "con Dart y Kotlin."] },
    { key: "dualmind2048", name: "Dualmind2048", date: "", skills: ["Kotlin", "Supabase"], icon: "assets/imagenes/icon_item.png", link: "https://maerga.itch.io/dualmind2048", description: "Aplicacion nativa Android desarrollada con Kotlin y Supabase.", screenshots: ["assets/imagenes/capturas/Dualmind.jpg", "assets/imagenes/capturas/Dualmind2.jpg", "assets/imagenes/capturas/Dualmind3.jpg"], moreInfo: ["Aplicacion nativa", "Android desarrollada", "con Kotlin y Supabase."] },
    { key: "duelcalc", name: "Duel Calculator", date: "", skills: ["Html", "Css","JavaScript"], icon: "assets/imagenes/icon_item.png", link: "https://MaErGa.github.io/duelcalculator/", description: "Calculadora interactiva de puntos de vida para Yu-Gi-Oh!", screenshots: ["assets/imagenes/capturas/DuelCalculator.jpg"], moreInfo: ["Calculadora interactiva", "de puntos de vida (LP)", "para Yu-Gi-Oh! con", "diseno responsivo.", "Desarrollada con HTML,", "CSS y JavaScript nativo", "para ofrecer un control", "rapido y preciso durante", "los duelos."] },
    { key: "PortFolio", name: "PortFolio", date: "", skills: ["Html", "Css","JavaScript"], icon: "assets/imagenes/icon_item.png", link: "https://maerga.github.io", description: "Portfolio estilo FFVII desarrollado con HTML, CSS, JS.", screenshots: ["assets/imagenes/capturas/Portfolio.png"], moreInfo: ["PortFolio desarrollado", "con HTML, CSS, JS."] },
    { key: "dragonquest", name: "DQ -Minstrel Song-", date: "", skills: ["Unity", "C#"], icon: "assets/imagenes/icon_item.png", link: "https://maerga.itch.io/dragon-quest-mistreal-song", description: "RPG basado en Dragon Quest III de SNES.", screenshots: ["assets/imagenes/capturas/MinstrealSong2.png", "assets/imagenes/capturas/MinstrealSong3.png", "assets/imagenes/capturas/MinstrealSong4.png"], moreInfo: ["RPG basado en Dragon", "Quest III de SNES.", "Proyecto final de", "evaluacion para el curso", "de programacion de", "videojuegos con Unity."] },
    { key: "pirate", name: "Pirate Plataformer", date: "", skills: ["Unity", "C#"], icon: "assets/imagenes/icon_item.png", link: "https://maerga.itch.io/pirate-plataformer-alpha-version", description: "Juego de plataformas en 2D", screenshots: ["assets/imagenes/capturas/PiratePlataformer.png", "assets/imagenes/capturas/PiratePlataformer2.png"], moreInfo: ["Juego de plataformas", "para la segunda", "evaluacion del curso", "Programacion de", "Videojuegos con Unity."] },
];

const APPS = [
    { key: "pixeltrade", name: "Pixel Trade", date: "", skills: ["Kotlin", "Supabase"], icon: "assets/imagenes/icon_item.png", link: "https://appetize.io/app/b_hvuuaaqrdg724jxv4ecla5jejy", description: "Aplicacion nativa Android desarrollada con Kotlin y Supabase.", screenshots: ["assets/imagenes/capturas/PixelTrade.jpg", "assets/imagenes/capturas/PixelTrade2.jpg", "assets/imagenes/capturas/PixelTrade3.jpg"], moreInfo: ["Aplicacion nativa", "Android desarrollada", "con Kotlin y Supabase."] },
];

const PROJECT_ENTRIES = { projects: PROJECTS, aplicaciones: APPS };

// Cada skill se busca por nombre en skillsJSON para heredar su color de
// materia — el mismo dato que ya usa la pagina de Materia/Skills.
const PROJECT_SKILL_BY_NAME = new Map(skillsJSON.map((skill) => [skill.name, skill]));

// La fuente de sprites no hace salto de linea automatico, asi que el titulo
// se corta a mano antes de dibujarlo (igual que en el Resume).
const PROJECT_TITLE_WIDTH = 24;

function wrapProjectTitle(text, max) {
    const lines = [];
    let line = "";
    for (const word of text.split(" ")) {
        if (!line) line = word;
        else if ((line + " " + word).length <= max) line += " " + word;
        else { lines.push(line); line = word; }
    }
    if (line) lines.push(line);
    return lines;
}

const createProjectSeparator = () => FF7.el("div", { className: "projects-separator" }, [FF7.textToSprite("_".repeat(21))]);

function createProjectsPage() {
    const root = FF7.el("div", {});

    let tab = PROJECT_TABS[0].key;
    let selected = null;
    let showImages = false;
    let hasScrollbar = false;
    let tabsSettled = false;
    const anchors = [];
    let carousel = null;

    const currentEntries = () => PROJECT_ENTRIES[tab] || [];

    const header = FF7.createContentBox({ dataset: { label: "header" }, className: "h-[84px] absolute" });
    const descBox = FF7.createContentBox({ dataset: { label: "description" }, className: "h-[87px] absolute top-[93px]" });
    const contentLeft = FF7.createContentBox({ dataset: { label: "contentLeft" }, className: "absolute top-[190px] bottom-0" });
    const contentRight = FF7.createContentBox({ className: "absolute top-[190px] right-0 bottom-0", dataset: { label: "contentRight" } });
    root.appendChild(header);
    root.appendChild(descBox);
    root.appendChild(contentLeft);
    root.appendChild(contentRight);

    let projectListEl = FF7.el("div", { className: "hide-scrollbar -ml-24 h-[576px] snap-y snap-mandatory overflow-y-auto pl-24" });
    const scrollbar = FF7.createScrollbar({ targetEl: projectListEl, onVisibleChange: (visible) => { if (visible !== hasScrollbar) { hasScrollbar = visible; projectListEl.className = `hide-scrollbar -ml-24 h-[576px] snap-y snap-mandatory overflow-y-auto pl-24 ${hasScrollbar ? "pr-9" : ""}`; } } });
    contentRight.setChildren([projectListEl, scrollbar]);

    // Igual que TAB_SETTLE_MS en el original: ignora el hover de la fila de
    // pestañas los primeros 600ms para que el fade-in de la pagina no
    // cambie de pestaña sin querer si el cursor pasa por encima de camino
    // a la lista.
    const tabsSettleTimer = setTimeout(() => { tabsSettled = true; }, 600);

    function buildNavConfig() {
        const entries = currentEntries();
        const tabIndex = PROJECT_TABS.findIndex((t) => t.key === tab);
        return {
            groups: [
                { id: "tabs", size: PROJECT_TABS.length },
                { id: "items", size: entries.length },
                { id: "close", size: 1 },
            ],
            initial: null,
            fallback: { group: "tabs", index: 0 },
            // Congelado mientras el carrusel esta abierto: las flechas pasan
            // a ser suyas (mismo motivo que el selector de color en Ajustes).
            enabled: !showImages,
            resolveMove: (pos, dir) => {
                if (dir === "left" || dir === "right") {
                    if (pos.group !== "tabs") return null;
                    return { group: "tabs", index: (pos.index + (dir === "right" ? 1 : -1) + PROJECT_TABS.length) % PROJECT_TABS.length };
                }
                if (pos.group === "tabs") {
                    if (dir === "down") return entries.length ? { group: "items", index: 0 } : { group: "close", index: 0 };
                    return { group: "close", index: 0 };
                }
                if (pos.group === "close") {
                    if (dir === "down") return { group: "tabs", index: tabIndex };
                    return entries.length ? { group: "items", index: entries.length - 1 } : { group: "tabs", index: tabIndex };
                }
                if (dir === "up") return (pos.index === 0) ? { group: "tabs", index: tabIndex } : { group: "items", index: pos.index - 1 };
                return (pos.index === entries.length - 1) ? { group: "close", index: 0 } : { group: "items", index: pos.index + 1 };
            },
            onFocus: (pos) => {
                FF7.closeNav.setFocus(pos.group === "close");
                if (pos.group !== "items") { selected = null; renderDetail(); return; }
                selected = entries[pos.index] ?? null;
                renderDetail();
                const li = projectListEl.querySelectorAll("li")[pos.index];
                li?.scrollIntoView({ block: "nearest" });
            },
            onConfirm: (pos) => {
                if (pos.group === "close") {
                    FF7.playSound("back", FF7.store.getState().isSoundEnabled);
                    FF7.closeNav.setFocus(false);
                    nav.setPosSilently(null);
                    FF7.markKeyboardNavigation();
                    FF7.router.navigate("/");
                    return;
                }
                if (pos.group === "tabs") {
                    FF7.playSound("select", FF7.store.getState().isSoundEnabled);
                    selectTab(PROJECT_TABS[pos.index].key);
                    return;
                }
                FF7.playSound("select", FF7.store.getState().isSoundEnabled);
                anchors[pos.index]?.click();
            },
        };
    }

    const nav = FF7.createCursorNav(buildNavConfig());

    // Igual que el useEffect([tab]) del original: al llegar (y en cada
    // cambio de pestaña) el primer proyecto de la lista queda seleccionado
    // y con el cursor encima, para que el panel nunca se vea vacio.
    function settleOnFirstEntry() {
        const entries = currentEntries();
        selected = entries[0] ?? null;
        nav.setPosSilently(entries.length ? { group: "items", index: 0 } : { group: "tabs", index: PROJECT_TABS.findIndex((t) => t.key === tab) });
    }

    // Hacer click en una pestaña hace lo mismo que confirmarla: cambia y
    // deja el cursor sobre ella, para que raton y teclado nunca discrepen.
    function selectTab(key) {
        if (key === tab) return;
        FF7.playSound("select", FF7.store.getState().isSoundEnabled);
        tab = key;
        nav.updateConfig(buildNavConfig());
        settleOnFirstEntry();
        renderTabs();
        renderDetail();
        renderList();
    }

    function renderTabs() {
        const list = FF7.el("ul", { className: "projects-tabs flex h-full items-center" });
        PROJECT_TABS.forEach((t, index) => {
            const li = FF7.el("li", {
                className: "projects-tab",
                onClick: () => selectTab(t.key),
                onPointerEnter: (event) => { if (tabsSettled && event.pointerType === "mouse" && FF7.isPointerMoving()) selectTab(t.key); },
            }, [FF7.textToSprite(t.label)]);
            li.dataset.active = (t.key === tab) ? "true" : "false";
            li.dataset.focused = nav.isFocused("tabs", index) ? "true" : "false";
            list.appendChild(li);
        });
        header.setChildren([list]);
    }

    function renderDetail() {
        descBox.setChildren([FF7.textToSprite(selected?.description ?? "")]);

        if (!selected) { contentLeft.setChildren([]); return; }

        const lines = wrapProjectTitle(selected.fullName ?? selected.name, PROJECT_TITLE_WIDTH);
        const last = lines.length - 1;
        const hasDate = !!selected.date;
        const inlineDate = hasDate && lines.length > 1 && (lines[last].length + 1 + selected.date.length <= PROJECT_TITLE_WIDTH);

        const titleLines = lines.map((line, index) => {
            const isLastInline = index === last && inlineDate;
            return FF7.el("div", { className: isLastInline ? "projects-title-with-date" : "" }, [
                FF7.textToSprite(line, false, "blue"),
                isLastInline ? FF7.el("span", { className: "projects-detail-date" }, [FF7.textToSprite(selected.date)]) : null,
            ]);
        });
        if (hasDate && !inlineDate) {
            titleLines.push(FF7.el("div", { className: "projects-detail-date" }, [FF7.textToSprite(selected.date)]));
        }

        const skillList = FF7.el("div", { className: "projects-skill-list" },
            selected.skills.map((name) => FF7.el("span", { className: "projects-skill", "data-color": PROJECT_SKILL_BY_NAME.get(name)?.color ?? "blue" }, [FF7.textToSprite(name)])));

        const infoBlock = FF7.el("div", { className: "projects-detail-info" },
            selected.moreInfo.map((item) => FF7.el("div", {}, [FF7.textToSprite(item)])));

        const links = FF7.el("div", { className: "projects-detail-links" }, [
            selected.link ? FF7.el("a", {
                className: "projects-view-button",
                href: selected.link,
                target: "_blank",
                rel: "noreferrer",
                "data-text-color": "yellow",
                onClick: () => FF7.playSound("select", FF7.store.getState().isSoundEnabled),
            }, [FF7.textToSprite("Ver", false, "yellow"), FF7.el("span", { className: "font-glyph ml-2", "data-sprite": "external-link-icon" })]) : null,
            selected.screenshots?.length ? FF7.el("button", {
                type: "button",
                className: "projects-view-button",
                "data-text-color": "yellow",
                onClick: () => { FF7.playSound("select", FF7.store.getState().isSoundEnabled); openImages(selected); },
            }, [FF7.textToSprite("Capturas", false, "yellow")]) : null,
        ]);

        contentLeft.setChildren([FF7.el("div", { className: "projects-detail" }, [
            FF7.el("div", { className: "projects-detail-head" }, titleLines),
            createProjectSeparator(),
            skillList,
            createProjectSeparator(),
            infoBlock,
            createProjectSeparator(),
            links,
        ])]);
    }

    function renderList() {
        const entries = currentEntries();
        anchors.length = 0;
        const list = FF7.el("ul", {});
        entries.forEach((project, index) => {
            const anchor = FF7.el("a", {
                href: project.link,
                target: "_blank",
                rel: "noreferrer",
                className: "flex h-full w-full justify-between items-center",
                // Una entrada con capturas abre el carrusel en vez de salir
                // del menu; el propio carrusel lleva a la pagina real. Sin
                // capturas sigue directo al enlace, como antes.
                onClick: (e) => {
                    if (!project.screenshots?.length) return;
                    e.preventDefault();
                    selected = project;
                    renderDetail();
                    openImages(project);
                },
            }, [
                FF7.el("span", { className: "flex items-center" }, [
                    FF7.el("img", { src: project.icon, alt: "", width: "36", height: "36", className: "mr-3" }),
                    FF7.el("span", {}, [FF7.textToSprite(project.name)]),
                ]),
                FF7.el("span", { className: "flex" }, [
                    FF7.el("span", { className: "mr-2" }, [FF7.textToSprite(":")]),
                    FF7.el("span", { className: "mt-1" }, [FF7.textToSprite("1", true)]),
                ]),
            ]);
            anchors[index] = anchor;

            const li = FF7.el("li", {
                className: "projects-item flex h-[48px] snap-start items-center",
                onMouseEnter: () => { if (FF7.isPointerMoving()) nav.focus({ group: "items", index }); },
                onClick: () => FF7.playSound("select", FF7.store.getState().isSoundEnabled),
            }, [anchor]);
            li.dataset.focused = nav.isFocused("items", index) ? "true" : "false";
            list.appendChild(li);
        });

        FF7.clear(projectListEl);
        projectListEl.appendChild(list);
    }

    function openImages(entry) {
        showImages = true;
        nav.updateConfig(buildNavConfig());
        carousel?.destroy?.();
        carousel?.remove();
        carousel = FF7.createImageCarousel({ entry, onClose: closeImages });
        root.appendChild(carousel);
    }

    let closeTimer = null;

    function closeImages() {
        showImages = false;
        carousel?.destroy?.();
        carousel?.remove();
        carousel = null;
        // Si esto se llama desde el propio Escape del carrusel (listener en
        // document), re-vincular aqui mismo el listener de window del nav
        // principal haria que ESE MISMO evento, al seguir subiendo por el
        // arbol hasta window, tambien activara su "cancel" (Escape) y
        // mandara de vuelta al landing. Se difiere a la siguiente vuelta.
        closeTimer = setTimeout(() => nav.updateConfig(buildNavConfig()), 0);
    }

    const unsubNav = nav.subscribe(() => { renderTabs(); renderDetail(); renderList(); });

    settleOnFirstEntry();
    renderTabs();
    renderDetail();
    renderList();

    root.destroy = () => {
        clearTimeout(tabsSettleTimer);
        clearTimeout(closeTimer);
        unsubNav();
        nav.destroy();
        FF7.closeNav.setFocus(false);
        scrollbar.destroy?.();
        carousel?.destroy?.();
    };

    return root;
}

// Puerto de pages/Projects/ImageCarousel.tsx.
// `shot` puede ser un string (ruta simple) o un objeto
// { src, hover, aspect, pan, mobile } — mismo formato que el `Shot` del
// port. Sin capturas reales todavia (falta subir esos assets), pero el
// mecanismo (pan de pagina completa en hover, video/gif en loop, paginacion)
// queda listo para cuando existan.
function createImageCarousel({ entry, onClose }) {
    const shots = entry.screenshots || [];
    let index = 0;
    let hovered = false;
    let settled = false;
    let travel = 0;
    let holdTimer = null;
    let resizeObserver = null;

    const still = (shot) => (typeof shot === "string" ? shot : shot.src);
    const motion = (shot) => (typeof shot === "string" ? null : shot.hover ?? null);
    const isPan = (shot) => (typeof shot === "string" ? false : shot.pan === true);
    const isMobileShot = (shot) => (typeof shot === "string" ? false : shot.mobile === true);
    const isVideo = (src) => /\.(mp4|webm|mov)$/i.test(src);
    const aspectOf = (shot) => (typeof shot === "string" ? null : shot.aspect) ?? (isMobileShot(shot) ? "1 / 0.9" : "16 / 9");
    const ratio = (aspect) => {
        const [w, h] = aspect.split("/").map((part) => Number(part.trim()));
        return h ? w / h : 16 / 9;
    };
    // Ritmo del pan: ~350px renderizados por segundo, con techo generoso
    // para que las paginas muy largas no se lean como un borron.
    const panMs = (distance) => Math.min(10000, Math.max(1200, Math.round(distance / 0.35)));

    const stage = FF7.el("div", { className: "projects-carousel-stage" });

    function measure() {
        const img = stage.querySelector(".projects-carousel-page");
        if (!img) return;
        travel = Math.max(0, img.offsetHeight - stage.clientHeight);
    }

    function updatePanTransform() {
        const img = stage.querySelector(".projects-carousel-page");
        if (!img) return;
        img.style.transitionDuration = `${panMs(travel)}ms`;
        img.style.transform = `translateY(${hovered && settled ? -travel : 0}px)`;
    }

    function updateStage() {
        FF7.clear(stage);
        resizeObserver?.disconnect();
        resizeObserver = null;

        const shot = shots[index];
        if (!shot) {
            stage.style.width = `calc(var(--stage-h) * ${16 / 9})`;
            stage.appendChild(FF7.el("span", { className: "projects-carousel-empty" }, [FF7.textToSprite("Todavía no hay capturas")]));
            return;
        }

        stage.style.width = `calc(var(--stage-h) * ${ratio(aspectOf(shot))})`;

        if (isPan(shot)) {
            const img = FF7.el("img", {
                src: still(shot),
                alt: "",
                className: "projects-carousel-page",
                onLoad: () => { measure(); updatePanTransform(); },
            });
            stage.appendChild(img);
            resizeObserver = new ResizeObserver(() => { measure(); updatePanTransform(); });
            resizeObserver.observe(stage);
            resizeObserver.observe(img);
            measure();
            updatePanTransform();
            return;
        }

        const animation = motion(shot);
        const showAnimation = hovered && settled && !!animation;
        if (showAnimation && isVideo(animation)) {
            const video = FF7.el("video", {
                src: animation,
                className: "projects-carousel-shot",
                autoplay: true,
                muted: true,
                playsInline: true,
                // Sin `loop`: corre, descansa en el ultimo fotograma y
                // arranca de nuevo — cosa que `loop` no puede hacer.
                onEnded: () => { holdTimer = setTimeout(() => { video.currentTime = 0; video.play().catch(() => {}); }, 1200); },
            });
            stage.appendChild(video);
            video.play().catch(() => {});
        } else if (showAnimation) {
            stage.appendChild(FF7.el("img", { src: animation, alt: "", className: "projects-carousel-shot" }));
        } else {
            stage.appendChild(FF7.el("img", { src: still(shot), alt: "", className: "projects-carousel-shot" }));
        }
    }

    // Entrar/salir en un pan NO reconstruye el <img>: solo le cambia el
    // transform, para que la transicion CSS interpole en vez de saltar.
    function enter() {
        hovered = true;
        if (shots[index] && isPan(shots[index])) updatePanTransform();
        else updateStage();
    }
    function leave() {
        hovered = false;
        if (shots[index] && isPan(shots[index])) updatePanTransform();
        else updateStage();
    }

    stage.addEventListener("pointerenter", enter);
    stage.addEventListener("pointerleave", leave);
    stage.addEventListener("pointerdown", (event) => {
        // Touch no tiene hover: un toque hace de "entrar y salir".
        if (event.pointerType === "mouse") return;
        if (hovered) leave(); else enter();
    });

    const settleTimer = setTimeout(() => {
        settled = true;
        if (shots[index] && isPan(shots[index])) updatePanTransform();
        else updateStage();
    }, 1500);

    const prevBtn = FF7.el("button", { type: "button", onClick: () => step(-1) }, [FF7.textToSprite("<")]);
    const nextBtn = FF7.el("button", { type: "button", onClick: () => step(1) }, [FF7.textToSprite(">")]);
    const countSpan = FF7.el("span", { className: "projects-carousel-count" });

    function updatePagination() {
        prevBtn.disabled = shots.length < 2;
        nextBtn.disabled = shots.length < 2;
        FF7.clear(countSpan);
        const sprite = FF7.textToSprite(shots.length ? `${index + 1} / ${shots.length}` : "0 / 0");
        if (sprite) countSpan.appendChild(sprite);
    }

    function step(delta) {
        if (!shots.length) return;
        hovered = false;
        travel = 0;
        index = (index + delta + shots.length) % shots.length;
        updateStage();
        updatePagination();
    }

    function onKeyDown(event) {
        if (event.key === "Escape") onClose();
        if (event.key === "ArrowRight") step(1);
        if (event.key === "ArrowLeft") step(-1);
    }
    document.addEventListener("keydown", onKeyDown);

    const closeBtn = FF7.el("button", { type: "button", className: "projects-carousel-close", onClick: onClose, "aria-label": "Close" }, [FF7.textToSprite("X")]);
    const head = FF7.el("div", { className: "projects-carousel-head" }, [FF7.el("span", {}, [FF7.textToSprite(entry.name)]), closeBtn]);
    const pagination = FF7.el("div", { className: "projects-carousel-pagination" }, [prevBtn, countSpan, nextBtn]);
    const viewLink = entry.link ? FF7.el("a", {
        className: "projects-carousel-view-link",
        href: entry.link,
        target: "_blank",
        rel: "noreferrer",
        "data-text-color": "yellow",
        onClick: () => FF7.playSound("select", FF7.store.getState().isSoundEnabled),
    }, [FF7.textToSprite("Ver", false, "yellow"), FF7.el("span", { className: "font-glyph ml-2", "data-sprite": "external-link-icon" })]) : null;
    const controls = FF7.el("div", { className: "projects-carousel-controls" }, [pagination, viewLink]);

    const panel = FF7.createContentBox({ className: "projects-carousel-panel", children: [head, stage, controls] });
    const panelWrap = FF7.el("div", {
        className: "projects-carousel-panel-wrap",
        style: { width: "fit-content" },
        onClick: (event) => event.stopPropagation(),
    }, [panel]);
    const overlay = FF7.el("div", { className: "projects-carousel-overlay", onClick: onClose }, [panelWrap]);

    updateStage();
    updatePagination();

    overlay.destroy = () => {
        document.removeEventListener("keydown", onKeyDown);
        clearTimeout(settleTimer);
        if (holdTimer) clearTimeout(holdTimer);
        resizeObserver?.disconnect();
    };

    return overlay;
}

    FF7.createProjectsPage = createProjectsPage;
    FF7.createImageCarousel = createImageCarousel;
})(window.FF7 = window.FF7 || {});
(function (FF7) {
    "use strict";

// Puerto de pages/Equip/Equip.tsx — la página con más estado derivado del proyecto.
//
// IMPORTANTE (arreglo de parpadeo): headerBox/descriptionBox/slotsBox/
// statsBox/contentRightBox y partyMemberInstance se crean UNA sola vez al
// montar la página. render() ya no reconstruye esas cajas — solo actualiza
// su contenido interior con box.setChildren(...). Así el nodo .contentBox
// nunca se quita del DOM y su animación de aparición no se reinicia cada
// vez que el ratón pasa por encima de un item.
const CATEGORIES = [
    { key: "weapon", label: "Arma." },
    { key: "armor", label: "Armad." },
    { key: "accessory", label: "Acc." },
];

const STAT_ROWS = [
    { key: "attack", label: "Ataque" },
    { key: "attackPct", label: "Ataque%" },
    { key: "defense", label: "Defensa" },
    { key: "defensePct", label: "Defensa%" },
    { key: "magicAtk", label: "Atq. mág." },
    { key: "magicDefPct", label: "Def. mág.%" },
];

const itemsOfCategory = (category) => equipmentJSON.filter((item) => item.type === category);

function createEquipPage() {
    const root = FF7.el("div", {});

    let selectedCategory = null;
    let hoveredCategory = null;
    let hoveredItem = null;
    let lastEquipped = null;
    let pendingEquip = false;
    let equipItemEls = [];

    const headerBox = FF7.createContentBox({ dataset: { label: "equipHeader" }, className: "h-[225px] absolute top-0" });
    const descriptionBox = FF7.createContentBox({ dataset: { label: "equipDescription" }, className: "h-[79px] absolute top-[234px]" });
    const slotsBox = FF7.createContentBox({ dataset: { label: "equipSlots" }, className: "h-[158px] absolute top-[323px]" });
    const statsBox = FF7.createContentBox({ dataset: { label: "equipStats" }, className: "absolute top-[490px] bottom-0" });
    const contentRightBox = FF7.createContentBox({ dataset: { label: "equipContentRight" }, className: "absolute top-[323px] right-0 bottom-0" });
    root.appendChild(headerBox);
    root.appendChild(descriptionBox);
    root.appendChild(slotsBox);
    root.appendChild(statsBox);
    root.appendChild(contentRightBox);

    const equipListEl = FF7.el("div", { className: "hide-scrollbar -ml-20 h-[440px] snap-y snap-mandatory overflow-y-auto pl-20 pr-9" });
    const scrollbar = FF7.createScrollbar({ targetEl: equipListEl });
    contentRightBox.setChildren([equipListEl, scrollbar]);

    const partyMemberInstance = FF7.createPartyMember({ memberId: 1 });

    const parkCursorOnCategory = (category) => {
        const index = Math.max(0, CATEGORIES.findIndex((c) => c.key === category));
        hoveredCategory = category;
        hoveredItem = null;
        nav.updateConfig(buildNavConfig());
        nav.setPosSilently({ group: "categories", index });
        render();
    };

    const handleEquip = (item, source = "mouse") => {
        const { currentMateria, currentEquipment } = FF7.store.getState();
        if (currentEquipment[item.type] === item.id) { FF7.playSound("error", FF7.store.getState().isSoundEnabled); return; }

        if (item.type !== "accessory") {
            const rowIndex = (item.type === "weapon") ? 0 : 1;
            const nextMateria = currentMateria.map((row) => [...row]);
            nextMateria[rowIndex] = FF7.resizeMateriaRow(nextMateria[rowIndex], FF7.slotCount(item));
            FF7.store.dispatch({ type: "SET_CURRENT_MATERIA", payload: nextMateria });
        }

        FF7.store.dispatch({ type: "SET_CURRENT_EQUIPMENT", payload: { ...currentEquipment, [item.type]: item.id } });
        FF7.playSound("materia", FF7.store.getState().isSoundEnabled);
        selectedCategory = null;
        lastEquipped = item;

        if (source === "keyboard") {
            parkCursorOnCategory(item.type);
        } else {
            hoveredCategory = null;
            hoveredItem = null;
            nav.updateConfig(buildNavConfig());
            nav.setPosSilently(null);
            render();
        }
    };

    const selectCategory = (category) => {
        FF7.playSound("select", FF7.store.getState().isSoundEnabled);
        selectedCategory = category;
        hoveredItem = null;
        nav.updateConfig(buildNavConfig());
        render();
    };

    const toggleCategory = (category) => {
        if (selectedCategory === category) {
            FF7.playSound("back", FF7.store.getState().isSoundEnabled);
            selectedCategory = null;
            nav.updateConfig(buildNavConfig());
            render();
            return;
        }
        selectCategory(category);
    };

    const buildNavConfig = () => {
        const listCategory = selectedCategory ?? hoveredCategory;
        const categoryItems = listCategory ? itemsOfCategory(listCategory) : [];
        return {
            groups: [
                { id: "categories", size: CATEGORIES.length },
                { id: "items", size: categoryItems.length },
                { id: "close", size: 1 },
            ],
            initial: null,
            fallback: { group: "categories", index: 0 },
            enabled: true,
            resolveMove: (current, dir, { wrap }) => {
                if (dir !== "up" && dir !== "down") return null;
                if (current.group === "close") return { group: "categories", index: (dir === "down") ? 0 : CATEGORIES.length - 1 };
                if (current.group === "categories") {
                    if (dir === "up" && current.index === 0) return { group: "close", index: 0 };
                    if (dir === "down" && current.index === CATEGORIES.length - 1) return { group: "close", index: 0 };
                    return { group: "categories", index: current.index + ((dir === "down") ? 1 : -1) };
                }
                const items = (selectedCategory ?? hoveredCategory) ? itemsOfCategory(selectedCategory ?? hoveredCategory) : [];
                if (items.length === 0) return null;
                return { group: "items", index: wrap(current.index, (dir === "down") ? 1 : -1, items.length) };
            },
            resolvePageJump: (current, dir) => {
                const items = (selectedCategory ?? hoveredCategory) ? itemsOfCategory(selectedCategory ?? hoveredCategory) : [];
                if (current.group !== "items" || items.length === 0) return null;
                return { group: "items", index: (dir === "pageUp") ? 0 : items.length - 1 };
            },
            onFocus: (current) => {
                FF7.closeNav.setFocus(current.group === "close");
                if (current.group === "categories") {
                    const category = CATEGORIES[current.index].key;
                    hoveredCategory = category;
                    hoveredItem = null;
                    lastEquipped = FF7.getEquipmentById(FF7.store.getState().currentEquipment[category]) ?? null;
                    render();
                } else if (current.group === "items") {
                    const items = (selectedCategory ?? hoveredCategory) ? itemsOfCategory(selectedCategory ?? hoveredCategory) : [];
                    const item = items[current.index];
                    if (item) { hoveredItem = item; render(); }
                }
            },
            onConfirm: (current) => {
                if (current.group === "close") {
                    FF7.playSound("back", FF7.store.getState().isSoundEnabled);
                    FF7.closeNav.setFocus(false);
                    nav.setPosSilently(null);
                    FF7.markKeyboardNavigation();
                    FF7.router.navigate("/");
                    return;
                }
                if (current.group === "categories") {
                    const category = CATEGORIES[current.index].key;
                    selectCategory(category);
                    const items = itemsOfCategory(category);
                    const equippedIndex = Math.max(0, items.findIndex((item) => item.id === FF7.store.getState().currentEquipment[category]));
                    nav.setPosSilently({ group: "items", index: equippedIndex });
                    hoveredItem = items[equippedIndex] ?? null;
                    render();
                } else {
                    const items = (selectedCategory ?? hoveredCategory) ? itemsOfCategory(selectedCategory ?? hoveredCategory) : [];
                    const item = items[current.index];
                    if (item) handleEquip(item, "keyboard");
                }
            },
            onCancel: () => {
                const pos = nav.getPos();
                if (pos?.group === "items") {
                    const category = selectedCategory ?? "weapon";
                    selectedCategory = null;
                    FF7.playSound("back", FF7.store.getState().isSoundEnabled);
                    parkCursorOnCategory(category);
                    return true;
                }
                return false;
            },
            onSwitch: () => FF7.router.navigate("/skills"),
        };
    };

    const nav = FF7.createCursorNav(buildNavConfig());

    function render() {
        const { currentEquipment } = FF7.store.getState();

        const activeCategory = hoveredCategory ?? selectedCategory;
        const equippedItem = activeCategory ? FF7.getEquipmentById(currentEquipment[activeCategory]) : undefined;
        const previewItem = hoveredItem ?? equippedItem;
        const stickyPreview = previewItem ?? lastEquipped;
        const slotItem = (stickyPreview?.type === "accessory") ? null : stickyPreview;
        const currentStats = FF7.getDerivedStats(currentEquipment);
        const newStats = hoveredItem ? FF7.getDerivedStats({ ...currentEquipment, [hoveredItem.type]: hoveredItem.id }) : currentStats;

        const listCategory = selectedCategory ?? hoveredCategory;
        const categoryItems = listCategory ? itemsOfCategory(listCategory) : [];
        const itemListInteractive = selectedCategory !== null;

        const categoryRows = FF7.el("ul", { className: "grow mt-2 ml-6 mr-[270px]" });
        CATEGORIES.forEach(({ key, label }, index) => {
            const equipped = FF7.getEquipmentById(currentEquipment[key]);
            const li = FF7.el("li", {
                className: "equip-equipRow flex mb-[26px]",
                onPointerEnter: (event) => { if (event.pointerType === "mouse") nav.focus({ group: "categories", index }); },
                onClick: () => toggleCategory(key),
            }, [
                FF7.el("span", { className: "w-[150px] mr-3 shrink-0" }, [FF7.textToSprite(label, false, "blue")]),
                FF7.el("span", { className: "flex" }, [FF7.textToSprite(equipped?.name ?? "")]),
            ]);
            li.dataset.active = key === selectedCategory ? "true" : "false";
            li.dataset.focused = nav.isFocused("categories", index) ? "true" : "false";
            categoryRows.appendChild(li);
        });

        headerBox.setChildren([FF7.el("div", { className: "flex items-start" }, [
            FF7.el("div", { className: "w-[447px] mb-2 ml-2 shrink-0" }, [partyMemberInstance]),
            categoryRows,
        ])]);

        descriptionBox.setChildren([FF7.el("p", {}, [FF7.textToSprite(previewItem?.description ?? "")])]);

        const slotsChildren = [];
        if (slotItem) {
            slotsChildren.push(
                FF7.el("div", { className: "flex items-center" }, [
                    FF7.el("span", { className: "w-[150px]" }, [FF7.textToSprite("Ranura", false, "blue")]),
                    FF7.el("div", { className: "grow" }, [FF7.createMateriaSlotPreview({ multiSlots: slotItem.slots?.multiSlots ?? 0, singleSlots: slotItem.slots?.singleSlots ?? 0 })]),
                ]),
                FF7.el("div", { className: "flex items-center mt-6" }, [
                    FF7.el("span", { className: "w-[150px]" }, [FF7.textToSprite("Crecimiento", false, "blue")]),
                    FF7.el("span", { className: "ml-24" }, [FF7.textToSprite((slotItem.slots && FF7.slotCount(slotItem) > 0) ? (slotItem.slots.growth ?? "Normal") : "Nada")]),
                ]),
            );
        }
        slotsBox.setChildren(slotsChildren);

        const statsList = FF7.el("ul", {});
        STAT_ROWS.forEach(({ key, label }) => {
            const li = FF7.el("li", { className: "flex items-center mb-1.5" }, [
                FF7.el("span", { className: "w-[230px]" }, [FF7.textToSprite(label, false, "blue")]),
                FF7.el("span", { className: "w-[80px] flex justify-end" }, [FF7.textToSprite(String(currentStats[key]), true)]),
            ]);
            if (hoveredItem) {
                li.appendChild(FF7.el("span", { className: "mx-6" }, [FF7.textToSprite(">", false, "blue")]));
                li.appendChild(FF7.el("span", { className: "w-[80px] flex justify-end" }, [FF7.textToSprite(String(newStats[key]), true, (newStats[key] > currentStats[key]) ? "yellow" : (newStats[key] < currentStats[key]) ? "red" : "white")]));
            }
            statsList.appendChild(li);
        });
        statsBox.setChildren([statsList]);

        const itemsList = FF7.el("ul", {});
        equipItemEls = [];
        categoryItems.forEach((item, index) => {
            const span = FF7.el("span", { className: "equip-equipmentItem flex" }, [FF7.textToSprite(item.name)]);
            span.dataset.focused = nav.isFocused("items", index) ? "true" : "false";
            const li = FF7.el("li", {
                className: "flex h-[44px] snap-start items-center",
                onPointerEnter: (event) => { if (event.pointerType === "mouse" && itemListInteractive && FF7.isPointerMoving()) nav.focus({ group: "items", index }); },
                onClick: () => {
                    if (!itemListInteractive || pendingEquip) return;
                    if (nav.isFocused("items", index)) { handleEquip(item); return; }
                    nav.focus({ group: "items", index });
                    pendingEquip = true;
                    window.setTimeout(() => { pendingEquip = false; handleEquip(item); }, 150);
                },
            }, [span]);
            equipItemEls[index] = li;
            itemsList.appendChild(li);
        });

        FF7.clear(equipListEl);
        equipListEl.appendChild(itemsList);

        if (nav.getPos()?.group === "items") {
            equipItemEls[nav.getPos().index]?.scrollIntoView({ block: "nearest" });
        }
    }

    const unsubNav = nav.subscribe(render);
    const unsubStore = FF7.store.subscribe(render, ["currentEquipment", "currentMateria"]);
    render();

    root.destroy = () => {
        unsubNav(); unsubStore();
        nav.destroy();
        FF7.closeNav.setFocus(false);
        scrollbar.destroy?.();
        partyMemberInstance.destroy?.();
    };

    return root;
}

    FF7.createEquipPage = createEquipPage;
})(window.FF7 = window.FF7 || {});
(function (FF7) {
    "use strict";

// Puerto de pages/Skills/SkillsContent.tsx.
const skillPlaceholder = { id: 0, name: "", color: null, description: "", score: 0, ap: 0, toNextLevel: 0, abilities: [] };
const skills = skillsJSON;

function createSkillsPage() {
    const root = FF7.el("div", {});

    let skill = skillPlaceholder;
    let selectedMateria = null;
    let targetSlot = null;
    let materiaItemEls = [];

    const headerBox = FF7.createContentBox({ dataset: { label: "skillsHeader" }, className: "h-[261px] absolute top-0" });
    const descriptionBox = FF7.createContentBox({ dataset: { label: "skillsDescription" }, className: "h-[79px] absolute top-[270px]" });
    const contentLeftBox = FF7.createContentBox({ dataset: { label: "skillsContentLeft" }, className: "absolute top-[359px] bottom-0" });
    const contentRightBox = FF7.createContentBox({ dataset: { label: "skillsContentRight" }, className: "absolute top-[359px] right-0 bottom-0" });
    root.appendChild(headerBox);
    root.appendChild(descriptionBox);
    root.appendChild(contentLeftBox);
    root.appendChild(contentRightBox);

    // El contenedor con scroll y su Scrollbar se crean UNA sola vez: si se
    // recrean en cada render (como antes), scrollTop vuelve a 0 cada vez
    // que cambia el foco — por eso al bajar e intentar seleccionar otra
    // materia "se volvía a subir". Ahora solo se reemplaza su contenido
    // interior (el <ul> de materias), nunca el propio contenedor.
    const materiaListEl = FF7.el("div", { className: "skillsContent-materiaList hide-scrollbar -ml-20 h-[430px] snap-y snap-mandatory overflow-y-auto pl-20 pr-9" });
    const scrollbar = FF7.createScrollbar({ targetEl: materiaListEl });
    contentRightBox.setChildren([materiaListEl, scrollbar]);

    const partyMemberInstance = FF7.createPartyMember({ memberId: 1 });

    const groupCycle = () => {
        const { currentEquipment } = FF7.store.getState();
        const weapon = FF7.getEquipmentById(currentEquipment.weapon);
        const armor = FF7.getEquipmentById(currentEquipment.armor);
        const weaponSlotCount = weapon ? FF7.slotCount(weapon) : 0;
        const armorSlotCount = armor ? FF7.slotCount(armor) : 0;
        return [
            { id: "wpnSlots", size: weaponSlotCount },
            { id: "armSlots", size: armorSlotCount },
            { id: "materia", size: skills.length },
        ].filter((group) => group.size > 0);
    };

    const handleSlotFocus = (arrIndex, slotIndex) => {
        const { currentMateria } = FF7.store.getState();
        const matchedMateria = skills.find((item) => item.id === currentMateria[arrIndex]?.[slotIndex]);
        skill = matchedMateria ?? skillPlaceholder;
        render();
    };

    const handleSlotConfirm = (arrIndex, slotIndex) => {
        const { currentMateria, isSoundEnabled } = FF7.store.getState();

        if (selectedMateria) {
            const nextMateria = currentMateria.map((row) => [...row]);
            const previousValue = nextMateria[arrIndex][slotIndex] ?? null;

            FF7.playSound("materia", isSoundEnabled);

            for (let i = 0; i < nextMateria.length; i++) {
                for (let j = 0; j < nextMateria[i].length; j++) {
                    if (selectedMateria === nextMateria[i][j]) nextMateria[i][j] = null;
                }
            }
            nextMateria[arrIndex][slotIndex] = selectedMateria;
            FF7.store.dispatch({ type: "SET_CURRENT_MATERIA", payload: nextMateria });
            selectedMateria = previousValue;

            const skillObj = skills.find((item) => item.id === selectedMateria);
            if (skillObj) skill = skillObj;
            render();
            return;
        }

        if (targetSlot && (targetSlot.arrIndex !== arrIndex || targetSlot.slotIndex !== slotIndex)) {
            const nextMateria = currentMateria.map((row) => [...row]);
            const held = nextMateria[targetSlot.arrIndex][targetSlot.slotIndex] ?? null;
            const target = nextMateria[arrIndex][slotIndex] ?? null;
            nextMateria[targetSlot.arrIndex][targetSlot.slotIndex] = target;
            nextMateria[arrIndex][slotIndex] = held;
            FF7.store.dispatch({ type: "SET_CURRENT_MATERIA", payload: nextMateria });
            FF7.playSound("materia", isSoundEnabled);
            targetSlot = null;

            nav.setPosSilently({ group: (arrIndex === 0) ? "wpnSlots" : "armSlots", index: slotIndex });
            const skillObj = skills.find((item) => item.id === held);
            skill = skillObj ?? skillPlaceholder;
            render();
            return;
        }

        FF7.playSound("select", isSoundEnabled);
        targetSlot = { arrIndex, slotIndex };
        const slottedId = currentMateria[arrIndex]?.[slotIndex];
        const listIndex = Math.max(0, skills.findIndex((item) => item.id === slottedId));
        nav.setPosSilently({ group: "materia", index: listIndex });
        const skillObj = skills[listIndex];
        if (skillObj) skill = skillObj;
        render();
    };

    const handleMateriaFocus = (index) => {
        const skillObj = skills[index];
        if (!selectedMateria && skillObj) { skill = skillObj; render(); }
    };

    const handleMateriaConfirm = (id) => {
        const { currentMateria, isSoundEnabled } = FF7.store.getState();

        if (!id) { FF7.playSound("error", isSoundEnabled); return; }

        if (targetSlot) {
            const nextMateria = currentMateria.map((row) => [...row]);
            for (let i = 0; i < nextMateria.length; i++) {
                for (let j = 0; j < nextMateria[i].length; j++) {
                    if (nextMateria[i][j] === id) nextMateria[i][j] = null;
                }
            }
            nextMateria[targetSlot.arrIndex][targetSlot.slotIndex] = id;
            FF7.store.dispatch({ type: "SET_CURRENT_MATERIA", payload: nextMateria });
            FF7.playSound("materia", isSoundEnabled);
            nav.setPosSilently({ group: (targetSlot.arrIndex === 0) ? "wpnSlots" : "armSlots", index: targetSlot.slotIndex });
            targetSlot = null;
            render();
            return;
        }

        const value = (id !== selectedMateria) ? id : null;
        selectedMateria = value;
        FF7.playSound("select", isSoundEnabled);
        render();
    };

    const buildNavConfig = () => {
        const cycle = groupCycle();
        return {
            groups: [...cycle, { id: "close", size: 1 }],
            initial: null,
            fallback: { group: cycle[0].id, index: 0 },
            enabled: true,
            resolveMove: (current, dir, { wrap }) => {
                if (current.group === "close") {
                    if (dir === "down") return { group: cycle[0].id, index: 0 };
                    if (dir === "up") return { group: "materia", index: skills.length - 1 };
                    return null;
                }

                const cycleIndex = cycle.findIndex((group) => group.id === current.group);
                if (cycleIndex === -1) return { group: "materia", index: 0 };
                const group = cycle[cycleIndex];

                const enterGroup = (offset) => {
                    const nextGroup = cycle[(cycleIndex + offset + cycle.length) % cycle.length];
                    const index = (nextGroup.id === "materia") ? ((offset === 1) ? 0 : nextGroup.size - 1) : Math.min(current.index, nextGroup.size - 1);
                    return { group: nextGroup.id, index };
                };

                if (current.group === "materia") {
                    if (dir === "up") return (current.index === 0) ? enterGroup(-1) : { group: "materia", index: current.index - 1 };
                    if (dir === "down") return (current.index === group.size - 1) ? { group: "close", index: 0 } : { group: "materia", index: current.index + 1 };
                    return null;
                }

                if (dir === "left") return { group: current.group, index: wrap(current.index, -1, group.size) };
                if (dir === "right") return { group: current.group, index: wrap(current.index, 1, group.size) };
                if (dir === "up") return (cycleIndex === 0) ? { group: "close", index: 0 } : enterGroup(-1);
                return enterGroup(1);
            },
            resolvePageJump: (current, dir) => {
                if (current.group !== "materia") return null;
                return { group: "materia", index: (dir === "pageUp") ? 0 : skills.length - 1 };
            },
            onFocus: (current) => {
                FF7.closeNav.setFocus(current.group === "close");
                if (current.group === "close") return;
                if (current.group === "materia") handleMateriaFocus(current.index);
                else handleSlotFocus(current.group === "wpnSlots" ? 0 : 1, current.index);
            },
            onConfirm: (current) => {
                if (current.group === "close") {
                    FF7.playSound("back", FF7.store.getState().isSoundEnabled);
                    FF7.closeNav.setFocus(false);
                    nav.setPosSilently(null);
                    FF7.markKeyboardNavigation();
                    FF7.router.navigate("/");
                    return;
                }
                if (current.group === "materia") handleMateriaConfirm(skills[current.index]?.id);
                else handleSlotConfirm(current.group === "wpnSlots" ? 0 : 1, current.index);
            },
            onCancel: () => {
                if (targetSlot) {
                    FF7.playSound("back", FF7.store.getState().isSoundEnabled);
                    nav.setPosSilently({ group: (targetSlot.arrIndex === 0) ? "wpnSlots" : "armSlots", index: targetSlot.slotIndex });
                    targetSlot = null;
                    render();
                    return true;
                }
                if (selectedMateria !== null) {
                    selectedMateria = null;
                    FF7.playSound("back", FF7.store.getState().isSoundEnabled);
                    render();
                    return true;
                }
                return false;
            },
            onSwitch: () => FF7.router.navigate("/equip"),
        };
    };

    const nav = FF7.createCursorNav(buildNavConfig());

    function render() {
        const { currentEquipment, isCRTEnabled } = FF7.store.getState();
        const weapon = FF7.getEquipmentById(currentEquipment.weapon);
        const armor = FF7.getEquipmentById(currentEquipment.armor);
        const pos = nav.getPos();

        const wpnSlots = FF7.createEquipmentSlots({
            type: "Arma.", name: weapon?.name, multiSlots: weapon?.slots?.multiSlots, singleSlots: weapon?.slots?.singleSlots,
            materia: skills, focusedSlot: pos?.group === "wpnSlots" ? pos.index : null,
            activeSlot: targetSlot?.arrIndex === 0 ? targetSlot.slotIndex : null,
            onSlotEnter: (index) => nav.focus({ group: "wpnSlots", index }),
            onSlotClick: (index) => handleSlotConfirm(0, index),
        });
        const armSlots = FF7.createEquipmentSlots({
            type: "Armad.", name: armor?.name, multiSlots: armor?.slots?.multiSlots, singleSlots: armor?.slots?.singleSlots,
            materia: skills, focusedSlot: pos?.group === "armSlots" ? pos.index : null,
            activeSlot: targetSlot?.arrIndex === 1 ? targetSlot.slotIndex : null,
            onSlotEnter: (index) => nav.focus({ group: "armSlots", index }),
            onSlotClick: (index) => handleSlotConfirm(1, index),
        });

        headerBox.setChildren([FF7.el("div", { className: "flex justify-between items-end" }, [
            FF7.el("div", { className: "w-[447px] mb-2 ml-2" }, [partyMemberInstance]),
            FF7.el("div", { className: "mt-9 mr-2" }, [wpnSlots, armSlots]),
        ])]);

        descriptionBox.setChildren([FF7.el("p", {}, [FF7.textToSprite(skill.description)])]);

        const nameRow = FF7.el("div", { className: "flex justify-between items-center" });
        const nameSpan = FF7.el("p", { className: "skillsContent-skill flex" }, [FF7.textToSprite(skill.name)]);
        if (skill.color) nameSpan.dataset.color = skill.color;
        nameRow.appendChild(nameSpan);
        if (skill.id !== 0) {
            const starsList = FF7.el("ul", { className: "flex" });
            for (let index = 0; index < 5; index++) {
                const star = FF7.el("li", { className: "skillsContent-star" });
                if (skill.color) star.dataset.color = skill.color;
                star.dataset.star = index < skill.score ? "true" : "false";
                star.dataset.crt = isCRTEnabled ? "true" : "false";
                starsList.appendChild(star);
            }
            nameRow.appendChild(starsList);
        }

        const contentLeftChildren = [nameRow];
        if (skill.id !== 0) {
            contentLeftChildren.push(FF7.el("div", { className: "skillsContent-details" }, [
                FF7.el("div", { className: "skillsContent-statRow" }, [
                    FF7.el("span", {}, [FF7.textToSprite("AP", false, "blue")]),
                    FF7.el("span", {}, [FF7.textToSprite(skill.ap.toString(), true)]),
                ]),
                FF7.el("div", { className: "skillsContent-statRow" }, [
                    FF7.el("span", {}, [FF7.textToSprite("Para subir de nivel", false, "blue")]),
                    FF7.el("span", {}, [FF7.textToSprite(skill.score >= 5 ? "MÁXIMO" : skill.toNextLevel.toString(), true)]),
                ]),
                FF7.el("div", { className: "skillsContent-abilityList" }, [
                    FF7.el("p", {}, [FF7.textToSprite("Lista de habilidades", false, "blue")]),
                    FF7.el("ul", { className: "ml-8" }, skill.abilities.map((ability) => FF7.el("li", {}, [FF7.textToSprite(ability)]))),
                ]),
            ]));
        }
        contentLeftBox.setChildren(contentLeftChildren);

        const materiaList = FF7.el("ul", {});
        materiaItemEls = [];
        skills.forEach((skillItem, index) => {
            const span = FF7.el("span", { className: "skillsContent-skill flex" }, [FF7.textToSprite(skillItem.name)]);
            if (skillItem.color) span.dataset.color = skillItem.color;
            span.dataset.active = skillItem.id === selectedMateria ? "true" : "false";
            span.dataset.focused = nav.isFocused("materia", index) ? "true" : "false";
            const li = FF7.el("li", {
                className: "flex h-[43px] snap-start items-center",
                onMouseEnter: () => { if (FF7.isPointerMoving()) nav.focus({ group: "materia", index }); },
                onClick: () => handleMateriaConfirm(skillItem.id),
            }, [span]);
            materiaItemEls[index] = li;
            materiaList.appendChild(li);
        });

        FF7.clear(materiaListEl);
        materiaListEl.appendChild(materiaList);

        if (pos?.group === "materia") {
            materiaItemEls[pos.index]?.scrollIntoView({ block: "nearest" });
        }
    }

    const unsubNav = nav.subscribe(render);
    const unsubStore = FF7.store.subscribe(render, ["currentEquipment", "currentMateria", "isCRTEnabled"]);
    render();

    root.destroy = () => {
        unsubNav(); unsubStore();
        nav.destroy();
        FF7.closeNav.setFocus(false);
        scrollbar.destroy?.();
        partyMemberInstance.destroy?.();
    };

    return root;
}

    FF7.createSkillsPage = createSkillsPage;
})(window.FF7 = window.FF7 || {});
(function (FF7) {
    "use strict";

// Puerto de pages/Config/Config.tsx.
//
// Arreglo: antes bodyBox se reconstruía entero en cada hover (incluido el
// selector de color, montado y desmontado sin parar — eso rompía sus
// botones de esquina). Ahora el cuerpo se construye UNA vez; solo se
// actualizan los atributos data-focused/data-disabled de los botones ya
// existentes, y el selector de color vive dentro de forma permanente.
const CORNERS = ["topLeft", "topRight", "bottomLeft", "bottomRight"];
const ROW_DESCRIPTIONS = {
    corners: "Elige los colores de la ventana",
    sound: "Activa o desactiva el sonido",
    crt: "Activa o desactiva el efecto CRT",
};

function createConfigPage() {
    const root = FF7.el("div", {});

    let windowDescription = "";
    let activeColorPicker = null;
    let pickerOpenedByKeyboard = false;
    let picker = null;

    const openColorPicker = (corner, viaKeyboard = false) => {
        FF7.playSound("select", FF7.store.getState().isSoundEnabled);
        pickerOpenedByKeyboard = viaKeyboard;
        activeColorPicker = corner;
        nav.updateConfig(buildNavConfig());
        updatePicker();
        updateToggleVisuals();
    };

    const setSoundEnabled = (value) => {
        const { isSoundEnabled } = FF7.store.getState();
        FF7.playSound("select", isSoundEnabled || value);
        FF7.store.dispatch({ type: "SET_IS_SOUND_ENABLED", payload: value });
        localStorage.setItem("isSoundEnabled", JSON.stringify(value));
    };

    const setCRTEnabled = (value) => {
        FF7.playSound("select", FF7.store.getState().isSoundEnabled);
        FF7.store.dispatch({ type: "SET_IS_CRT_ENABLED", payload: value });
        localStorage.setItem("isCRTEnabled", JSON.stringify(value));
    };

    const buildNavConfig = () => ({
        groups: [
            { id: "corners", size: CORNERS.length },
            { id: "sound", size: 2 },
            { id: "crt", size: 2 },
            { id: "close", size: 1 },
        ],
        initial: null,
        fallback: { group: "corners", index: 0 },
        enabled: !activeColorPicker,
        resolveMove: (current, dir, { wrap }) => {
            if (current.group === "close") {
                if (dir === "down") return { group: "corners", index: 0 };
                if (dir === "up") return { group: "crt", index: 0 };
                return null;
            }

            const column = current.index % 2;

            if (dir === "left" || dir === "right") {
                if (current.group === "corners") {
                    const rowStart = current.index - column;
                    return { group: "corners", index: rowStart + (1 - column) };
                }
                return { group: current.group, index: wrap(current.index, dir === "right" ? 1 : -1, 2) };
            }

            if (dir === "down") {
                if (current.group === "corners" && current.index < 2) return { group: "corners", index: current.index + 2 };
                if (current.group === "corners") return { group: "sound", index: column };
                if (current.group === "sound") return { group: "crt", index: column };
                return { group: "close", index: 0 };
            }

            if (current.group === "corners" && current.index >= 2) return { group: "corners", index: current.index - 2 };
            if (current.group === "corners") return { group: "close", index: 0 };
            if (current.group === "sound") return { group: "corners", index: column + 2 };
            return { group: "sound", index: column };
        },
        onFocus: (current) => {
            FF7.closeNav.setFocus(current.group === "close");
            windowDescription = ROW_DESCRIPTIONS[current.group] ?? "";
            headerBox.setChildren([FF7.textToSprite(windowDescription)]);
            updateToggleVisuals();
        },
        onConfirm: (current) => {
            if (current.group === "close") {
                FF7.playSound("back", FF7.store.getState().isSoundEnabled);
                FF7.closeNav.setFocus(false);
                nav.setPosSilently(null);
                FF7.markKeyboardNavigation();
                FF7.router.navigate("/");
                return;
            }
            if (current.group === "corners") {
                openColorPicker(CORNERS[current.index], true);
            } else if (current.group === "sound") {
                setSoundEnabled(current.index === 0);
            } else {
                setCRTEnabled(current.index === 0);
            }
        },
    });

    const nav = FF7.createCursorNav(buildNavConfig());

    // ---- esqueleto persistente ----
    const headerBox = FF7.createContentBox({ dataset: { label: "configHeader" }, className: "h-full absolute top-0 left-0 right-0" });
    const headerWrap = FF7.el("div", { className: "relative h-[84px] mb-[10px]" }, [headerBox]);
    const bodyBox = FF7.createContentBox({ dataset: { label: "configBody" }, className: "h-[45.1rem]" });

    function buildToggleRow(groupId, title, activate) {
        const onBtn = FF7.el("button", { onClick: () => activate(true) }, [FF7.textToSprite("Sí")]);
        onBtn.addEventListener("mouseenter", () => nav.focus({ group: groupId, index: 0 }));

        const offBtn = FF7.el("button", { onClick: () => activate(false) }, [FF7.textToSprite("No")]);
        offBtn.addEventListener("mouseenter", () => nav.focus({ group: groupId, index: 1 }));

        const li = FF7.el("li", {
            className: "config-optionToggle ml-24 mb-8 flex",
            onMouseEnter: () => { windowDescription = ROW_DESCRIPTIONS[groupId]; headerBox.setChildren([FF7.textToSprite(windowDescription)]); },
        }, [
            FF7.el("div", { className: "w-[24rem] flex items-end pb-1" }, [FF7.textToSprite(title, false, "blue")]),
            FF7.el("div", { className: "w-[18rem] flex justify-between" }, [onBtn, offBtn]),
        ]);

        return { li, onBtn, offBtn };
    }

    const soundRow = buildToggleRow("sound", "Sonido", setSoundEnabled);
    const crtRow = buildToggleRow("crt", "Efecto CRT", setCRTEnabled);

    const cornersLi = FF7.el("li", { className: "ml-24 mb-8 flex", onMouseEnter: () => { windowDescription = ROW_DESCRIPTIONS.corners; headerBox.setChildren([FF7.textToSprite(windowDescription)]); } }, [
        FF7.el("div", { className: "w-[24rem] flex items-end pb-1" }, [FF7.textToSprite("Color de ventana", false, "blue")]),
    ]);

    bodyBox.setChildren([FF7.el("ul", {}, [cornersLi, soundRow.li, crtRow.li])]);

    function pickerProps() {
        const focusedCorner = !activeColorPicker ? (CORNERS.find((_, index) => nav.isFocused("corners", index)) ?? null) : null;
        return {
            activeColorPicker,
            setActiveColorPicker: (corner) => {
                activeColorPicker = corner;
                nav.updateConfig(buildNavConfig());
                updatePicker();
                updateToggleVisuals();
            },
            focusSlidersOnOpen: pickerOpenedByKeyboard,
            focusedCorner,
            onCornerEnter: (corner) => nav.focus({ group: "corners", index: CORNERS.indexOf(corner) }),
            onCornerClick: (corner) => openColorPicker(corner, false),
        };
    }

    function updatePicker() {
        if (!picker) {
            picker = FF7.createBGColorPicker(pickerProps());
            cornersLi.appendChild(picker.element);
            // El overlay de "click fuera para cerrar" cubre TODA la página,
            // así que va como hijo directo de root, no dentro del selector.
            root.appendChild(picker.overlayElement);
        } else {
            picker.update(pickerProps());
        }
    }

    // Solo toca data-focused/data-disabled en los botones ya existentes —
    // nunca reconstruye la lista, así el selector de color no se
    // desmonta/remonta con cada hover.
    function updateToggleVisuals() {
        const { isSoundEnabled, isCRTEnabled } = FF7.store.getState();

        [[soundRow, isSoundEnabled], [crtRow, isCRTEnabled]].forEach(([row, stateValue], i) => {
            const groupId = i === 0 ? "sound" : "crt";
            row.onBtn.dataset.disabled = !stateValue ? "true" : "false";
            row.onBtn.dataset.focused = nav.isFocused(groupId, 0) ? "true" : "false";
            row.offBtn.dataset.disabled = stateValue ? "true" : "false";
            row.offBtn.dataset.focused = nav.isFocused(groupId, 1) ? "true" : "false";
        });
    }

    updatePicker();
    updateToggleVisuals();

    root.appendChild(headerWrap);
    root.appendChild(bodyBox);

    const unsubNav = nav.subscribe(() => { updateToggleVisuals(); updatePicker(); });
    const unsubStore = FF7.store.subscribe(updateToggleVisuals, ["isSoundEnabled", "isCRTEnabled"]);

    root.destroy = () => {
        unsubNav(); unsubStore();
        nav.destroy();
        FF7.closeNav.setFocus(false);
        if (picker) picker.destroy();
    };

    return root;
}

    FF7.createConfigPage = createConfigPage;
})(window.FF7 = window.FF7 || {});
(function (FF7) {
    "use strict";

// Puerto de pages/Resume/Resume.tsx.
const TITLE = ["Programador de Videojuegos con Unity", "(Junior) y Tecnico en Microinformatica"];
const HEADING_COLOR = "white";

const CONTACT = [
    ["Location", "Gran Canaria, España"],
    ["Email", "matiaserrigar87@gmail.com"],
    ["Experience", "Junior"],
];

const LINKS = [
    ["Descargar PDF", "assets/cv/Matias_Errico_CV.pdf"],
    ["GitHub", "https://github.com/MaErGa"],
    ["LinkedIn", "https://www.linkedin.com/in/matias-errico-garcia-474387402/"],
];

const INTRO = [
    "Programador de Videojuegos Unity (Junior) y Técnico Microinformático.",
    "Bienvenido a mi portafolio interactivo. Aquí encontrarás mis proyectos y prototipos,",
    "desarrollados principalmente en Unity e integrados en este menú estilo FF7 (PS1).",
];

const WORK_DESC = {};

const PROJECTS = [
    { name: "Lord Magician", icon: "assets/imagenes/icon_item.png", iconSize: 52, link: "https://maerga.itch.io/lord-magician", sub: "Dart, Kotlin", desc: "Juego desarrollado con Dart y Kotlin." },
    { name: "Dualmind2048", icon: "assets/imagenes/icon_item.png", iconSize: 52, link: "https://maerga.itch.io/dualmind2048", sub: "Kotlin, Supabase", desc: "Aplicacion nativa Android desarrollada con Kotlin y Supabase." },
    { name: "Duel Calculator", icon: "assets/imagenes/icon_item.png", iconSize: 52, link: "https://MaErGa.github.io/duelcalculator/", sub: "HTML, CSS y JavaScript", desc: "Calculadora interactiva de puntos de vida (LP) para Yu-Gi-Oh! con diseno responsivo." },
    { name: "PortFolio", icon: "assets/imagenes/icon_item.png", iconSize: 52, link: "https://maerga.github.io/", sub: "Html, Css, JavaScript", desc: "Portfolio estilo FFVII desarrollado con HTML, CSS, JS." },
    { name: "Dragon Quest -Minstrel Song-", icon: "assets/imagenes/icon_item.png", iconSize: 52, link: "https://maerga.itch.io/dragon-quest-mistreal-song", sub: "Unity, C#", desc: "RPG basado en Dragon Quest III de SNES. Proyecto final de evaluacion del curso de Unity." },
    { name: "Pirate Plataformer", icon: "assets/imagenes/icon_item.png", iconSize: 52, link: "https://maerga.itch.io/pirate-plataformer-alpha-version", sub: "Unity, C#", desc: "Juego de plataformas para la segunda evaluacion del curso Programacion de Videojuegos con Unity." },
];

const wrap = (text, max) => {
    const lines = [];
    let line = "";
    for (const word of text.split(" ")) {
        if (!line) line = word;
        else if ((line + " " + word).length <= max) line += " " + word;
        else { lines.push(line); line = word; }
    }
    if (line) lines.push(line);
    return lines;
};

function createResumePage() {
    const root = FF7.el("div", {});
    const STEP = 72;

    const headerBox = FF7.createContentBox({ dataset: { label: "header" }, className: "h-[84px] absolute", children: [FF7.el("div", { className: "ml-4" }, [FF7.textToSprite("Matias Errico")])] });
    const scrollEl = FF7.el("div", { className: "resume-scroll hide-scrollbar overflow-y-auto" });
    const scrollbar = FF7.createScrollbar({ targetEl: scrollEl });
    const contentBox = FF7.createContentBox({ dataset: { label: "resumeContent" }, className: "absolute top-[93px] bottom-0", children: [scrollEl, scrollbar] });
    root.appendChild(headerBox);
    root.appendChild(contentBox);

    const nav = FF7.createCursorNav({
        groups: [{ id: "close", size: 1 }],
        initial: null,
        fallback: { group: "close", index: 0 },
        enabled: true,
        resolveMove: (_pos, dir) => {
            if (scrollEl && (dir === "up" || dir === "down")) scrollEl.scrollBy({ top: dir === "down" ? STEP : -STEP });
            return null;
        },
        resolvePageJump: (_pos, dir) => {
            if (scrollEl) scrollEl.scrollBy({ top: (dir === "pageDown" ? 1 : -1) * scrollEl.clientHeight * 0.9 });
            return null;
        },
        onFocus: (pos) => FF7.closeNav.setFocus(pos.group === "close"),
        onConfirm: (pos) => {
            if (pos.group !== "close") return;
            FF7.playSound("back", FF7.store.getState().isSoundEnabled);
            FF7.closeNav.setFocus(false);
            FF7.markKeyboardNavigation();
            FF7.router.navigate("/");
        },
        onCancel: () => { FF7.closeNav.setFocus(false); return false; },
    });

    const heading = (title) => FF7.el("div", { className: "resume-heading" }, [
        FF7.createContentBox({ dataset: { label: "resumeSection" }, children: [FF7.textToSprite(title, false, HEADING_COLOR)] }),
    ]);

    const separator = () => FF7.el("div", { className: "resume-separator" }, [FF7.textToSprite("_".repeat(40))]);

    const externalLink = (label, href, downloadName) => FF7.el("a", {
        href, target: "_blank", rel: "noreferrer", className: "resume-link", "data-text-color": "yellow",
        ...(downloadName ? { download: downloadName } : {}),
        onClick: () => FF7.playSound("select", FF7.store.getState().isSoundEnabled),
    }, [FF7.textToSprite(label, false, "yellow"), FF7.el("span", { className: "font-glyph ml-2", "data-sprite": "external-link-icon" })]);

    const record = (item, desc, centered = false) => FF7.el("div", { className: `resume-record ${centered ? "resume-recordCenter" : ""}` }, [
        FF7.el("img", { src: item.image_path, alt: "", className: "resume-logo" }),
        FF7.el("div", { className: "resume-recordBody" }, [
            FF7.el("div", { className: "flex justify-between items-baseline" }, [
                FF7.el("span", {}, [FF7.textToSprite(item.name)]),
                FF7.el("span", {}, [FF7.textToSprite(item.year, false, "blue")]),
            ]),
            FF7.el("p", { className: "resume-role" }, [FF7.textToSprite(item.role, false, "blue")]),
            ...(desc ? wrap(desc, 46).map((l) => FF7.el("p", { className: "resume-line" }, [FF7.textToSprite(l)])) : []),
        ]),
    ]);

    const projectRecord = (pr) => FF7.el("a", {
        href: pr.link, target: "_blank", rel: "noreferrer", className: "resume-record",
        onClick: () => FF7.playSound("select", FF7.store.getState().isSoundEnabled),
    }, [
        FF7.el("img", { src: pr.icon, alt: "", className: "resume-icon", style: { width: `${pr.iconSize}px`, height: `${pr.iconSize}px` } }),
        FF7.el("div", { className: "resume-recordBody" }, [
            FF7.el("p", { className: "resume-projectName" }, [FF7.textToSprite(pr.name)]),
            FF7.el("p", { className: "resume-role" }, [FF7.textToSprite(pr.sub, false, "blue")]),
            ...wrap(pr.desc, 52).map((l) => FF7.el("p", { className: "resume-line" }, [FF7.textToSprite(l)])),
        ]),
    ]);

    const withSeparators = (nodes) => nodes.flatMap((node, i) => (i < nodes.length - 1 ? [node, separator()] : [node]));

    function render() {
        const { isCRTEnabled } = FF7.store.getState();
        const skills = skillsJSON.filter((s) => s.name !== "PostgreSQL");
        const work = historyJSON;
        const education = educationJSON;

        const doc = FF7.el("div", { className: "resume-doc" });

        const profile = FF7.el("div", { className: "resume-profile" }, [
            FF7.el("div", { className: "resume-profileTop" }, [
                FF7.createContentBox({ dataset: { label: "resumeTitle" }, children: TITLE.map((l) => FF7.el("p", { className: "resume-title" }, [FF7.textToSprite(l, false, HEADING_COLOR)])) }),
                FF7.el("ul", { className: "resume-links" }, LINKS.map(([label, href]) => FF7.el("li", {}, [externalLink(label, href)]))),
            ]),
            separator(),
            FF7.el("div", { className: "resume-profileRow" }, [
                FF7.el("img", { src: "assets/imagenes/portrait.png", alt: "Portrait", className: "resume-portrait" }),
                FF7.el("ul", { className: "resume-stats" }, CONTACT.map(([label, value]) => FF7.el("li", { className: "flex justify-between" }, [
                    FF7.el("span", {}, [FF7.textToSprite(label, false, "blue")]),
                    FF7.el("span", {}, [FF7.textToSprite(value)]),
                ]))),
            ]),
        ]);
        doc.appendChild(profile);

        doc.appendChild(separator());
        INTRO.forEach((para) => {
            doc.appendChild(FF7.el("div", { className: "resume-paragraph" }, wrap(para, 55).map((l) => FF7.el("p", { className: "resume-line" }, [FF7.textToSprite(l)]))));
        });

        doc.appendChild(separator());
        doc.appendChild(heading("Habilidades"));
        const materiaGrid = FF7.el("div", { className: "resume-materiaGrid" });
        skills.forEach((skill) => {
            const row = FF7.el("div", { className: "resume-materiaRow" });
            const materiaSpan = FF7.el("span", { className: "resume-materia flex items-center" }, [FF7.textToSprite(skill.name)]);
            if (skill.color) materiaSpan.dataset.color = skill.color;
            const stars = FF7.el("ul", { className: "resume-stars flex" });
            for (let i = 0; i < 5; i++) {
                const star = FF7.el("li", { className: "resume-star" });
                if (skill.color) star.dataset.color = skill.color;
                star.dataset.star = i < skill.score ? "true" : "false";
                star.dataset.crt = isCRTEnabled ? "true" : "false";
                stars.appendChild(star);
            }
            row.appendChild(materiaSpan);
            row.appendChild(stars);
            materiaGrid.appendChild(row);
        });
        doc.appendChild(materiaGrid);

        doc.appendChild(separator());
        doc.appendChild(heading("Historial Laboral"));
        withSeparators(work.map((item) => record(item, WORK_DESC[item.id]))).forEach((node) => doc.appendChild(node));

        doc.appendChild(separator());
        doc.appendChild(heading("Educación"));
        withSeparators(education.map((item) => record(item, undefined, true))).forEach((node) => doc.appendChild(node));

        doc.appendChild(separator());
        doc.appendChild(heading("Proyectos Personales"));
        withSeparators(PROJECTS.map((pr) => projectRecord(pr))).forEach((node) => doc.appendChild(node));

        doc.appendChild(separator());
        doc.appendChild(FF7.el("div", { className: "resume-footerLinks" }, [
            externalLink("Descargar PDF", LINKS[0][1], "Matias_Errico_CV.pdf"),
            FF7.el("div", { className: "resume-footerRight" }, [
                externalLink("GitHub", LINKS[1][1]),
                FF7.el("span", { className: "resume-pipe" }, [FF7.textToSprite("|", false, "grey")]),
                externalLink("LinkedIn", LINKS[2][1]),
            ]),
        ]));

        FF7.clear(scrollEl);
        scrollEl.appendChild(doc);
    }

    const unsubStore = FF7.store.subscribe(render, ["isCRTEnabled"]);
    render();

    root.destroy = () => {
        unsubStore();
        nav.destroy();
        FF7.closeNav.setFocus(false);
        scrollbar.destroy?.();
    };

    return root;
}

    FF7.createResumePage = createResumePage;
})(window.FF7 = window.FF7 || {});
(function (FF7) {
    "use strict";

// Puerto de pages/NameEntry/NameEntry.tsx — el teclado en pantalla para
// poner nombre, con el mismo patrón anti-parpadeo del resto: las cajas
// (header, preview, controlsBox, keyboard) se crean una vez; el teclado y
// la lista de controles se construyen una sola vez y luego solo se les
// actualiza data-focused. La caja de preview (retrato + nombre) sí cambia
// de contenido en cada pulsación, así que usa setChildren().
const MAX_LENGTH = 16;
const COLS = 10;

const KEY_ROWS = [
    ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
    ["K", "L", "M", "N", "O", "P", "Q", "R", "S", "T"],
    ["U", "V", "W", "X", "Y", "Z", ",", ".", "+", "-"],
    ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
    ["k", "l", "m", "n", "o", "p", "q", "r", "s", "t"],
    ["u", "v", "w", "x", "y", "z", ":", ";", null, null],
    ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
];
const ROWS = KEY_ROWS.length;

const CONTROLS = ["Espacio", "Borrar", "Elegir", "Predet."];

const cellAt = (row, col) => (row >= 0 && row < ROWS && col >= 0 && col < COLS) ? KEY_ROWS[row][col] : null;

const rowCols = (row) => KEY_ROWS[row].map((ch, col) => (ch !== null ? col : -1)).filter((col) => col >= 0);

function createNameEntryPage() {
    const root = FF7.el("div", {});
    const partyMember = partyMemberJSON[0];

    let name = FF7.store.getState().userName || FF7.defaultUserName;
    let prevPortraitKey = null; // null = aún no evaluado (equivalente al ref inicial)

    const checkPortraitSound = () => {
        const key = (FF7.resolvePortrait(name) || {}).index ?? "default";
        if (prevPortraitKey !== null && prevPortraitKey !== key && key !== "default") {
            FF7.playSound("save", FF7.store.getState().isSoundEnabled);
        }
        prevPortraitKey = key;
    };
    checkPortraitSound();

    const appendChar = (ch) => {
        if (ch === null || ch === undefined) return;
        if (name.length >= MAX_LENGTH) {
            FF7.playSound("error", FF7.store.getState().isSoundEnabled);
            return;
        }
        FF7.playSound("select", FF7.store.getState().isSoundEnabled);
        name = name + ch;
        checkPortraitSound();
        renderPreview();
    };

    const deleteChar = () => {
        if (!name.length) {
            FF7.playSound("error", FF7.store.getState().isSoundEnabled);
            return;
        }
        FF7.playSound("back", FF7.store.getState().isSoundEnabled);
        name = name.slice(0, -1);
        checkPortraitSound();
        renderPreview();
    };

    const restoreDefault = () => {
        FF7.playSound("back", FF7.store.getState().isSoundEnabled);
        name = FF7.defaultUserName;
        checkPortraitSound();
        renderPreview();
    };

    const confirmName = () => {
        const finalName = name.trim() || FF7.defaultUserName;
        FF7.playSound("save", FF7.store.getState().isSoundEnabled);
        FF7.setUserName(finalName);
        FF7.markKeyboardNavigation();
        FF7.router.navigate("/");
    };

    const runControl = (index) => {
        if (index === 0) appendChar(" ");
        else if (index === 1) deleteChar();
        else if (index === 2) confirmName();
        else restoreDefault();
    };

    const goBack = () => {
        FF7.playSound("back", FF7.store.getState().isSoundEnabled);
        FF7.markKeyboardNavigation();
        FF7.router.navigate("/");
    };

    const nav = FF7.createCursorNav({
        groups: [
            { id: "keys", size: ROWS * COLS, isDisabled: (index) => cellAt(Math.floor(index / COLS), index % COLS) === null },
            { id: "controls", size: CONTROLS.length },
        ],
        initial: null,
        fallback: { group: "keys", index: 0 },
        enabled: true,
        resolveMove: (current, dir, { wrap }) => {
            if (current.group === "controls") {
                if (dir === "up") return { group: "controls", index: wrap(current.index, -1, CONTROLS.length) };
                if (dir === "down") return { group: "controls", index: wrap(current.index, 1, CONTROLS.length) };
                if (dir === "left") {
                    const row = Math.min(current.index, ROWS - 1);
                    const cols = rowCols(row);
                    return { group: "keys", index: row * COLS + cols[cols.length - 1] };
                }
                return null;
            }

            const row = Math.floor(current.index / COLS);
            const col = current.index % COLS;

            if (dir === "left" || dir === "right") {
                const cols = rowCols(row);
                const pos = cols.indexOf(col);
                if (dir === "right" && pos === cols.length - 1) {
                    return { group: "controls", index: Math.min(row, CONTROLS.length - 1) };
                }
                const nextPos = wrap(pos, dir === "right" ? 1 : -1, cols.length);
                return { group: "keys", index: row * COLS + cols[nextPos] };
            }

            const step = dir === "up" ? -1 : 1;
            let nextRow = row;
            for (let i = 0; i < ROWS; i++) {
                nextRow = (nextRow + step + ROWS) % ROWS;
                if (cellAt(nextRow, col) !== null) return { group: "keys", index: nextRow * COLS + col };
            }
            return null;
        },
        onFocus: () => {},
        onConfirm: (current) => {
            if (current.group === "controls") runControl(current.index);
            else appendChar(cellAt(Math.floor(current.index / COLS), current.index % COLS));
        },
    });

    // ---- esqueleto persistente ----
    const closeBox = FF7.createContentBox({ dataset: { label: "nameClose" }, className: "nameEntry-closeBox", children: [FF7.textToSprite("X")] });
    const closeWrap = FF7.el("div", { className: "nameEntry-close absolute", onClick: goBack }, [closeBox]);
    const headerWrap = FF7.el("div", { className: "relative h-[84px] mb-[10px]" }, [
        FF7.createContentBox({ dataset: { label: "nameHeader" }, className: "h-full absolute top-0 left-0 right-0", children: [FF7.textToSprite("Introduce un nombre.")] }),
        closeWrap,
    ]);

    const previewBox = FF7.createContentBox({ dataset: { label: "namePreview" }, className: "nameEntry-preview" });

    const controlsBackground = FF7.createContentBox({ dataset: { label: "nameControls" }, className: "nameEntry-controlsBox" });

    const keyRefs = [];
    const keyGrid = FF7.el("div", { className: "nameEntry-keyGrid" });
    KEY_ROWS.forEach((row, r) => {
        const rowEl = FF7.el("div", { className: "nameEntry-keyRow" });
        row.forEach((ch, c) => {
            if (ch === null) {
                rowEl.appendChild(FF7.el("span", { className: "nameEntry-key" }));
                return;
            }
            const index = r * COLS + c;
            const btn = FF7.el("button", {
                className: "nameEntry-key",
                onMouseEnter: () => nav.focus({ group: "keys", index }),
                onClick: () => appendChar(ch),
            }, [FF7.textToSprite(ch)]);
            keyRefs[index] = btn;
            rowEl.appendChild(btn);
        });
        keyGrid.appendChild(rowEl);
    });
    const keyboardBox = FF7.createContentBox({ dataset: { label: "nameKeyboard" }, className: "nameEntry-keyboard", children: [keyGrid] });

    const controlRefs = [];
    const controlsList = FF7.el("div", { className: "nameEntry-controls" });
    CONTROLS.forEach((label, i) => {
        const btn = FF7.el("button", {
            className: "nameEntry-control",
            onMouseEnter: () => nav.focus({ group: "controls", index: i }),
            onClick: () => runControl(i),
        }, [FF7.textToSprite(label)]);
        controlRefs[i] = btn;
        controlsList.appendChild(btn);
    });

    const body = FF7.el("div", { className: "nameEntry-body" }, [controlsBackground, keyboardBox, controlsList]);

    function updateFocusVisuals() {
        keyRefs.forEach((btn, index) => {
            if (btn) btn.dataset.focused = nav.isFocused("keys", index) ? "true" : "false";
        });
        controlRefs.forEach((btn, index) => {
            btn.dataset.focused = nav.isFocused("controls", index) ? "true" : "false";
        });
    }

    function renderPreview() {
        const slots = FF7.el("div", { className: "nameEntry-nameSlots" });
        for (let i = 0; i < MAX_LENGTH; i++) {
            const ch = name[i];
            const isActive = i === name.length;
            const underline = FF7.el("span", { className: "nameEntry-underline" }, [FF7.el("span", { className: "font-glyph", "data-sprite": "_" })]);
            if (isActive) underline.dataset.textColor = "grey";
            const slot = FF7.el("span", { className: "nameEntry-slot" }, [
                underline,
                (ch && ch !== " ") ? FF7.el("span", { className: "font-glyph nameEntry-slotChar", "data-sprite": ch }) : null,
            ]);
            slots.appendChild(slot);
        }

        previewBox.setChildren([
            FF7.createPortrait({ src: partyMember.image_path, width: 145, name, className: "nameEntry-portrait" }),
            slots,
        ]);
    }

    const unsubNav = nav.subscribe(updateFocusVisuals);

    renderPreview();
    updateFocusVisuals();

    root.appendChild(headerWrap);
    root.appendChild(previewBox);
    root.appendChild(body);

    root.destroy = () => {
        unsubNav();
        nav.destroy();
    };

    return root;
}

    FF7.createNameEntryPage = createNameEntryPage;
})(window.FF7 = window.FF7 || {});
(function (FF7) {
    "use strict";

// Puerto de App.tsx (+ el montaje que hacía main.tsx). En vez de <Routes>,
// PAGE_FACTORIES mapea cada ruta a la función que construye esa página, y
// FF7.router.subscribe(renderPage) sustituye el re-render automático de React
// Router al cambiar de URL.
const PAGE_FACTORIES = {
    "/": FF7.createLandingPage,
    "/skills": FF7.createSkillsPage,
    "/equip": FF7.createEquipPage,
    "/projects": FF7.createProjectsPage,
    "/history": FF7.createMemCardSelector,
    "/config": FF7.createConfigPage,
    "/resume": FF7.createResumePage,
    "/name": FF7.createNameEntryPage,
};

function mountApp() {
    const appRoot = document.getElementById("root");

    const container = document.createElement("div");
    container.className = "flex h-screen";
    container.dataset.active = "false";

    const inner = document.createElement("div");
    inner.className = "w-[1100px] h-[825px] mx-auto my-[5rem] relative";

    const pageSlot = document.createElement("div");
    let currentPage = null;
    let currentPathname = null;

    function renderPage() {
        const pathname = FF7.router.getPathname();
        if (pathname === currentPathname) return;
        currentPathname = pathname;
        if (currentPage) currentPage.destroy?.();
        pageSlot.innerHTML = "";
        const factory = PAGE_FACTORIES[pathname] ?? FF7.createLandingPage;
        currentPage = factory();
        pageSlot.appendChild(currentPage);
    }

    FF7.router.subscribe(renderPage);
    renderPage();

    const menu = FF7.createMenu();

    inner.appendChild(pageSlot);
    inner.appendChild(menu);
    container.appendChild(inner);

    const crtOverlay = document.createElement("div");
    crtOverlay.id = "crtOverlay";
    container.appendChild(crtOverlay);

    appRoot.appendChild(container);

    // Efecto de "encendido" de un televisor CRT, una sola vez al cargar la
    // página, solo si el efecto CRT ya está activo.
    if (FF7.store.getState().isCRTEnabled) {
        appRoot.classList.add("crtTurnOn");
        setTimeout(() => appRoot.classList.remove("crtTurnOn"), 900);
    }

    // Equivalente a setIsLoaded(true) en el primer efecto de App.tsx.
    requestAnimationFrame(() => { container.dataset.active = "true"; });

    // --- Escalado de #root (segundo useEffect de App.tsx), idéntico ---
    function scaleApp() {
        const app = document.getElementById("root");
        if (!app) return;
        const viewportWidth = document.documentElement.clientWidth;
        const viewportHeight = document.documentElement.clientHeight;
        const scale = Math.min(viewportWidth / 1250, viewportHeight / 975);
        const offsetY = Math.max(0, (viewportHeight - 975 * scale) / 2);
        app.style.transform = `translateY(${offsetY}px) scale(${scale})`;
    }

    window.addEventListener("load", scaleApp);
    window.addEventListener("resize", scaleApp);
    window.addEventListener("orientationchange", scaleApp);
    window.visualViewport?.addEventListener("resize", scaleApp);
    window.visualViewport?.addEventListener("scroll", scaleApp);

    scaleApp();
}

    FF7.mountApp = mountApp;
})(window.FF7 = window.FF7 || {});
// Arranque de la app. Sin import/export: para cuando este script se ejecuta,
// todos los demás <script> ya se han cargado en orden (ver index.html) y
// window.FF7 ya tiene todo lo necesario colgado de él.
document.addEventListener("DOMContentLoaded", function () {
    window.FF7.mountApp();
});
