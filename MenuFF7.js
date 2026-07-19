// ============================================================
// ESCALADO RESPONSIVE — hace que el menú se vea igual en cualquier
// pantalla (PC, tablet, celular), escalando el lienzo completo de
// 1165x770px como una sola unidad, sin reordenar ni romper nada
// del layout original.
// ============================================================

// Factor de escala actual del wrapper, accesible desde cualquier otra
// parte del script. Arranca en 1 (sin escalar) hasta el primer cálculo.
window.mff7Scale = 1;

(function () {
	var CANVAS_W = 1165;
	var CANVAS_H = 770;
	var FORCE_KEY = 'ff7ForceLandscape';

	var scaler = null;
	var rotateHint = null;
	var rotateUndoBtn = null;

	// "Forzado horizontal": el usuario tocó "Girar pantalla" y el lienzo
	// se rota 90° por CSS para aprovechar mejor una pantalla angosta en
	// vertical, sin que el usuario tenga que girar el celular en la mano.
	function isForced() {
		return localStorage.getItem(FORCE_KEY) === '1';
	}
	function setForced(v) {
		if (v) localStorage.setItem(FORCE_KEY, '1');
		else localStorage.removeItem(FORCE_KEY);
	}

	// Detecta "celular/tablet en vertical": ancho de pantalla chico +
	// más alto que ancho. Un navegador de escritorio angostado a mano
	// no debería disparar esto en la práctica (el layout mínimo útil
	// para trabajar ya es más ancho que alto).
	function isPortraitPhone() {
		return window.innerWidth <= 900 && window.innerHeight > window.innerWidth;
	}

	function applyScale() {
		if (!scaler) return;

		var vw = window.innerWidth;
		var vh = window.innerHeight;
		var forced = isForced() && isPortraitPhone();

		var w = forced ? CANVAS_H : CANVAS_W;
		var h = forced ? CANVAS_W : CANVAS_H;

		// Factor de escala: el mayor posible que permita que el lienzo
		// completo entre en el viewport, sin recortarlo.
		var scale = Math.min(vw / w, vh / h);

		// No agrandamos más allá del tamaño original (evita verse borroso
		// o "gigante" en monitores muy anchos); en PC normal esto da 1.
		scale = Math.min(scale, 1);

		window.mff7Scale = scale;
		scaler.style.transform = forced
			? 'rotate(90deg) scale(' + scale + ')'
			: 'scale(' + scale + ')';

		if (rotateUndoBtn) rotateUndoBtn.classList.toggle('visible', forced);
	}

	function updateHint() {
		if (!rotateHint) return;
		var shouldShow = isPortraitPhone() && !isForced();
		rotateHint.classList.toggle('visible', shouldShow);
	}

	function refresh() {
		updateHint();
		applyScale();
	}

	function init() {
		scaler = document.querySelector('#viewportScaler');
		rotateHint = document.querySelector('#rotateHint');
		rotateUndoBtn = document.querySelector('#rotateUndo');

		var forceBtn = document.querySelector('#rotateHintForce');
		var dismissBtn = document.querySelector('#rotateHintDismiss');

		if (forceBtn) {
			forceBtn.addEventListener('click', function () {
				setForced(true);
				refresh();
			});
		}
		if (dismissBtn) {
			dismissBtn.addEventListener('click', function () {
				// Deja de sugerir girar por esta visita, sin forzar rotación.
				if (rotateHint) rotateHint.classList.remove('visible');
			});
		}
		if (rotateUndoBtn) {
			rotateUndoBtn.addEventListener('click', function () {
				setForced(false);
				refresh();
			});
		}

		refresh();
	}

	// Aplicar apenas el HTML esté listo (antes de que se vea el flash sin escalar)
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
	// Recalcular en cualquier cambio de tamaño u orientación (esto es lo
	// que detecta automáticamente cuando el usuario gira el celular de
	// verdad: al pasar a horizontal, isPortraitPhone() da false solo).
	window.addEventListener('resize', refresh);
	window.addEventListener('orientationchange', function () {
		// Justo después de girar, algunos navegadores móviles todavía
		// reportan innerWidth/innerHeight viejos por un instante (y la
		// barra de direcciones puede tardar en asentarse), así que
		// recalculamos ahora y de nuevo un toque después.
		refresh();
		setTimeout(refresh, 150);
		setTimeout(refresh, 400);
	});
	// visualViewport sigue el tamaño realmente visible en móviles (más
	// confiable que window.resize cuando aparece/oculta la barra del
	// navegador), así que también recalculamos con eso si está disponible.
	if (window.visualViewport) {
		window.visualViewport.addEventListener('resize', refresh);
	}
})();



// Proyectos: "link" puede quedar vacío ("") si todavía no lo tenés.
const proyectos = [
	{
		nombre: "Duel Calculator",
		descripcion: "Calculadora interactiva de puntos de vida (LP) para Yu-Gi-Oh! con diseño responsivo. Desarrollada con HTML, CSS y JavaScript nativo para ofrecer un control rápido y preciso durante los duelos.",
		link: "https://MaErGa.github.io/duelcalculator/"
	},
	{
		nombre: "Pirate Plataformer",
		descripcion: "Juego de plataformas para la segunda evaluación del curso Programación de Videojuegos con Unity.",
		link: "https://maerga.itch.io/pirate-plataformer-alpha-version"
	},
	{
		nombre: "Dragon Quest -Mistrel Song- ",
		descripcion: "RPG basado en Dragon Quest III de SNES. Proyecto final de evaluación para el curso de programación de videojuegos con Unity.",
		link: "https://maerga.itch.io/dragon-quest-mistreal-song"
	}
];

// Materia: cada habilidad tiene un color (define el orbe, las estrellas
// y qué slots de Arma/Armadura se iluminan), una valoración de 1 a 5 estrellas
// y una descripción corta.
// Cada materia puede llevar además (todo opcional, no afecta a "estrellas"
// que sigue siendo la fuente de verdad visual de las estrellas ni al color):
//   ap            -> AP acumulada actual
//   apSiguiente   -> AP que falta para el próximo nivel de la materia
//   master        -> true si la materia ya está en MASTER (no pide más AP)
//   efectos       -> [{ label, valor, tipo: 'up' | 'down' }] para "Equip effect"
//   habilidades   -> [{ nombre, desbloqueada }] para "Ability list"
//   info          -> texto corto para materias independientes sin ability list
const materias = [
	{
		nombre: "C#", color: "#E6C846", estrellas: 5,
		descripcion: "Lenguaje principal para toda la lógica de juego en Unity.",
		master: true,
		efectos: [
			{ label: "Strength", valor: "-01", tipo: "down" },
			{ label: "Magic",    valor: "+02", tipo: "up" },
			{ label: "MaxHP",    valor: "-02%", tipo: "down" },
			{ label: "MaxMP",    valor: "+05%", tipo: "up" }
		],
		habilidades: [
			{ nombre: "C# (Variables y Sintaxis)", desbloqueada: true },
			{ nombre: "C# 2 (Estructuras de Control)", desbloqueada: true },
			{ nombre: "C# 3 (Programación Orientada a Objetos)", desbloqueada: true }
		]
	},
	{
		nombre: "Unity", color: "#32B464", estrellas: 4,
		descripcion: "Motor usado para desarrollar el RPG 2D y otros proyectos.",
		ap: 4500, apSiguiente: 3500,
		efectos: [
			{ label: "Strength", valor: "-01", tipo: "down" },
			{ label: "Magic",    valor: "+01", tipo: "up" },
			{ label: "MaxHP",    valor: "-02%", tipo: "down" },
			{ label: "MaxMP",    valor: "+02%", tipo: "up" }
		],
		habilidades: [
			{ nombre: "Unity (Físicas y Componentes)", desbloqueada: true },
			{ nombre: "Unity 2 (Prefab e Instanciación)", desbloqueada: true },
			{ nombre: "Unity 3 (Optimización de Build)", desbloqueada: false }
		]
	},
	{
		nombre: "Visual Scripting", color: "#E6C846", estrellas: 3,
		descripcion: "Sistemas de nodos para prototipar lógica sin escribir código.",
		ap: 2100, apSiguiente: 1900,
		efectos: [
			{ label: "Strength", valor: "-01", tipo: "down" },
			{ label: "Magic",    valor: "+01", tipo: "up" },
			{ label: "MaxHP",    valor: "-01%", tipo: "down" },
			{ label: "MaxMP",    valor: "+02%", tipo: "up" }
		],
		habilidades: [
			{ nombre: "Visual Script", desbloqueada: true },
			{ nombre: "Visual Script 2 (Nodos Avanzados)", desbloqueada: true },
			{ nombre: "Visual Script 3 (Custom Nodes)", desbloqueada: false }
		]
	},
	{
		nombre: "GitHub", color: "#D23232", estrellas: 5,
		descripcion: "Almacenamiento en la nube y control de versiones de todos mis proyectos.",
		master: true,
		efectos: [
			{ label: "Strength", valor: "-02", tipo: "down" },
			{ label: "Magic",    valor: "+04", tipo: "up" },
			{ label: "MaxHP",    valor: "-05%", tipo: "down" },
			{ label: "MaxMP",    valor: "+15%", tipo: "up" }
		],
		habilidades: [
			{ nombre: "Summon GitHub (Invoca Pull Request)", desbloqueada: true },
			{ nombre: "Summon GitHub x2", desbloqueada: true }
		]
	},
	{
		nombre: "Blender", color: "#B464B4", estrellas: 1,
		descripcion: "Diseño y modelado 3D de entornos y personajes.",
		ap: 800, apSiguiente: 4200,
		efectos: [
			{ label: "Dexterity", valor: "+02", tipo: "up" },
			{ label: "Luck",      valor: "+04", tipo: "up" }
		],
		info: "Modelado 3D Pasivo y Animación"
	},
	{
		nombre: "Photoshop", color: "#B464B4", estrellas: 2,
		descripcion: "Edición de imágenes y assets para la interfaz y los sprites.",
		ap: 6200, apSiguiente: 3800,
		efectos: [
			{ label: "Dexterity", valor: "+04", tipo: "up" },
			{ label: "Luck",      valor: "+01", tipo: "up" }
		],
		info: "Diseño y Edición Visual (Nivel Medio)"
	},
	{
		nombre: "Paquete Office", color: "#4682B4", estrellas: 2,
		descripcion: "Manejo eficiente de herramientas ofimáticas y gestión de documentos.",
		ap: 1800, apSiguiente: 1200,
		efectos: [
			{ label: "Luck", valor: "+03", tipo: "up" }
		],
		habilidades: [
			{ nombre: "Procesador de Textos / Word", desbloqueada: true },
			{ nombre: "Hojas de Cálculo / Excel", desbloqueada: true },
			{ nombre: "Gestión de Correos y Trámites Online", desbloqueada: false }
		]
	},
	{
		nombre: "Red Local", color: "#4682B4", estrellas: 3,
		descripcion: "Implantación, configuración y mantenimiento de los elementos de la red local.",
		ap: 14200, apSiguiente: 5800,
		efectos: [
			{ label: "Strength", valor: "-01", tipo: "down" },
			{ label: "Magic",    valor: "+02", tipo: "up" },
			{ label: "MaxHP",    valor: "-02%", tipo: "down" },
			{ label: "MaxMP",    valor: "+05%", tipo: "up" }
		],
		habilidades: [
			{ nombre: "Elementos de la Red Local", desbloqueada: true },
			{ nombre: "Implantación de Red", desbloqueada: true },
			{ nombre: "Enrutamiento Avanzado", desbloqueada: false }
		]
	},
	{
		nombre: "Sistemas Microinformáticos", color: "#4682B4", estrellas: 5,
		descripcion: "Materia principal: instalación, configuración y mantenimiento de software, hardware y periféricos.",
		master: true,
		efectos: [
			{ label: "Vitality", valor: "+04", tipo: "up" },
			{ label: "Magic",    valor: "+02", tipo: "up" },
			{ label: "MaxHP",    valor: "+05%", tipo: "up" },
			{ label: "MaxMP",    valor: "+05%", tipo: "up" }
		],
		habilidades: [
			{ nombre: "Montaje y Reparación de Equipos", desbloqueada: true },
			{ nombre: "Diagnóstico y Comprobación", desbloqueada: true },
			{ nombre: "Clonación de Equipos", desbloqueada: true }
		]
	},
	{
		nombre: "Windows", color: "#4682B4", estrellas: 5,
		descripcion: "Administración de sistemas y creación de particiones en entornos Windows.",
		master: true,
		efectos: [
			{ label: "Vitality", valor: "+05", tipo: "up" },
			{ label: "MaxHP",    valor: "+10%", tipo: "up" }
		],
		habilidades: [
			{ nombre: "Gestión de Archivos y Particiones", desbloqueada: true },
			{ nombre: "Registro del Sistema", desbloqueada: true },
			{ nombre: "Despliegue de Entorno", desbloqueada: true }
		]
	},
	{
		nombre: "Linux", color: "#4682B4", estrellas: 3,
		descripcion: "Instalación, configuración y manejo de utilidades básicas en sistemas Linux.",
		ap: 22000, apSiguiente: 8000,
		efectos: [
			{ label: "Vitality", valor: "+03", tipo: "up" },
			{ label: "Spirit",   valor: "+03", tipo: "up" },
			{ label: "MaxMP",    valor: "+10%", tipo: "up" }
		],
		habilidades: [
			{ nombre: "Utilidades Básicas del Sistema", desbloqueada: true },
			{ nombre: "Manejo de Terminal / Bash", desbloqueada: true },
			{ nombre: "Administración de Servidores", desbloqueada: false }
		]
	}
];

// Regla fija: toda materia al máximo de estrellas (5) ya está en MASTER,
// por lo tanto no necesita AP pendiente y tiene todas sus habilidades
// desbloqueadas. Se normaliza acá para que la regla se cumpla siempre,
// aunque en el futuro se agregue una materia nueva de 5 estrellas y nos
// olvidemos de marcarla a mano más arriba.
materias.forEach(function (materia) {
	if (materia.estrellas === 5) {
		materia.master = true;
		delete materia.ap;
		delete materia.apSiguiente;
		if (materia.habilidades) {
			materia.habilidades.forEach(function (hab) { hab.desbloqueada = true; });
		}
	}
});

// Historia: experiencia laboral y educación, en formato "save file" de FF7.
// Reemplazá estos datos de ejemplo por los tuyos reales cuando quieras.
const historiaTrabajo = [
	{
		logo: "Assets/Imagenes/Logos/ElCorteIngles.png", // url de imagen del logo de la empresa, o null para usar texto
		logoTexto: "El Corte Ingles",
		nivel: 36,
		rol: "Logistica",
		años: "2024 Noviembre - 2025 Enero",
		organizacion: "El Corte Ingles"
	},
	{
		logo: "Assets/Imagenes/Logos/SantanaJerez.png",
		logoTexto: "Santana Jerez S.L",
		nivel: 36,
		rol: "Prácticas de Empresa",
		años: "2024",
		organizacion: "Santana Jerez S.L"
	},
	{
		logo: "Assets/Imagenes/Logos/TumovilCanario.png",
		logoTexto: "Tu móvil canario",
		nivel: 35,
		rol: "Prácticas de Empresa",
		años: "2022",
		organizacion: "Tu móvil canario"
	},
	{
		logo: null,
		logoTexto: "Mercadillo de Jinámar",
		nivel: 30,
		rol: "Atención al Público y Ventas",
		años: "2008 - 2020",
		organizacion: "Mercadillo de Jinámar"
	},
	{
		logo: null,
		logoTexto: "Valsequillo Embellece 2019",
		nivel: 32,
		rol: "Formación y Empleo (Construcción)",
		años: "2019 - 2020",
		organizacion: "Proyecto de Formación en Alternancia con el Empleo"
	}
];

const historiaEducacion = [
	{
		logo: "Assets/Imagenes/Logos/Etalent.png",
		logoTexto: "E-Talent (Telde)",
		nivel: 38,
		rol: "IFCD57 - Programación para Videojuegos en Unity.",
		años: "2026",
		organizacion: "Asociación Empleo y Talento (e-talent)"
	},
	{
		logo: "Assets/Imagenes/Logos/Focan.jpg",
		logoTexto: "Instituto Focan",
		nivel: 38,
		rol: "IFCT45- Competencias digitales básicas",
		años: "2026",
		organizacion: "Instituto Focan"
	},
	{
		logo: "Assets/Imagenes/Logos/Escuela.png",
		logoTexto: "Escuela de Hostelería Europea",
		nivel: 35,
		rol: "IFCT0209 - Sistemas microinformáticos.",
		años: "2024",
		organizacion: "Escuela de Hostelería Europea",
		vacio: false
	},
	{
		logo: "Assets/Imagenes/Logos/Aura.png",
		logoTexto: "Centro de Formación Empresarial Aura, SL",
		nivel: 34,
		rol: "IFCT0108 - Operaciones auxiliares de montaje y mantenimiento de sistemas microinformáticos",
		años: "2022",
		organizacion: "Centro de Formación Empresarial Aura, SL",
		vacio: false
	}
];


// Materia ya puesta de fábrica en las primeras ranuras de Arma/Armadura,
// para que el panel no arranque vacío. Se aplican sobre el patrón de slots
// del arma/armadura equipada actualmente (ver equipoActual más abajo).
const materiaInicialArma = [
	{ nombre: materias[0].nombre, color: materias[0].color },
	{ nombre: materias[1].nombre, color: materias[1].color },
	{ nombre: materias[2].nombre, color: materias[2].color },
	{ nombre: materias[3].nombre, color: materias[3].color },
	{ nombre: materias[7].nombre, color: materias[7].color },
	{ nombre: materias[8].nombre, color: materias[8].color }
];
const materiaInicialArmadura = [
	{ nombre: materias[4].nombre, color: materias[4].color },
	{ nombre: materias[5].nombre, color: materias[5].color },
	{ nombre: materias[6].nombre, color: materias[6].color }
];

// ============================================================
// EQUIPO — panel "Equipo" (Arma / Armadura / Accesorio)
// Cada ítem define sus stats absolutos y un patrón de slots
// (igual sistema visual que las materias) propio del objeto.
// ============================================================

function patronSlots(cantidadPares, sueltos) {
	var slots = [];
	for (var i = 0; i < cantidadPares; i++) {
		slots.push({ color: null, linked: true });
		slots.push({ color: null, linked: false });
	}
	for (var j = 0; j < sueltos; j++) {
		slots.push({ color: null, linked: false });
	}
	return slots;
}

const equipoItems = {
	arma: [
		{
			nombre: "Ratón",
			descripcion: "Periférico de precisión para trabajo rápido. Favorece el ataque puro.",
			stats: { attack: 24, attackP: 92, defense: 32, defenseP: 8, magicAtk: 4, magicDefP: 5 },
			slots: patronSlots(3, 2)
		},
		{
			nombre: "SSD Externo",
			descripcion: "Almacenamiento ultrarrápido. Transporta datos a velocidad de vértigo. Aumenta la magia y la velocidad de reacción.",
			stats: { attack: 16, attackP: 74, defense: 20, defenseP: 12, magicAtk: 22, magicDefP: 18 },
			slots: patronSlots(1, 3)
		}
	],
	armadura: [
		{
			nombre: "Teclado",
			descripcion: "Herramienta principal para programar. Equilibrado entre ataque y magia.",
			stats: { attack: 18, attackP: 80, defense: 28, defenseP: 10, magicAtk: 12, magicDefP: 8 },
			slots: patronSlots(2, 2)
		},
		{
			nombre: "PC Gaming",
			descripcion: "El núcleo de toda la operación. Máxima defensa y resistencia.",
			stats: { attack: 14, attackP: 70, defense: 48, defenseP: 20, magicAtk: 6, magicDefP: 12 },
			slots: patronSlots(2, 4)
		}
	],
	accesorio: [
		{
			nombre: "Auriculares JBL 510BT",
			descripcion: "Aislamiento sonoro para concentración total. Refuerza la defensa mágica.",
			stats: { attack: 10, attackP: 60, defense: 22, defenseP: 14, magicAtk: 8, magicDefP: 22 },
			slots: patronSlots(1, 2)
		},
		{
			nombre: "Nintendo Switch",
			descripcion: "Portabilidad ante todo. Aporta equilibrio general con un extra mágico.",
			stats: { attack: 8, attackP: 50, defense: 14, defenseP: 8, magicAtk: 14, magicDefP: 10 },
			slots: patronSlots(1, 1)
		},
		{
			nombre: "PlayStation 4",
			descripcion: "Potencia de la octava generación. Sube ataque y defensa por igual.",
			stats: { attack: 16, attackP: 65, defense: 18, defenseP: 12, magicAtk: 6, magicDefP: 6 },
			slots: patronSlots(1, 1)
		},
		{
			nombre: "PlayStation 2",
			descripcion: "La consola más vendida de la historia. Defensa% sólida.",
			stats: { attack: 10, attackP: 55, defense: 16, defenseP: 18, magicAtk: 8, magicDefP: 8 },
			slots: patronSlots(1, 1)
		},
		{
			nombre: "SNES Classic Mini",
			descripcion: "Nostalgia de 16 bits. Gran impulso a la magia.",
			stats: { attack: 6, attackP: 45, defense: 10, defenseP: 6, magicAtk: 20, magicDefP: 14 },
			slots: patronSlots(0, 2)
		},
		{
			nombre: "Mega Drive Classic Mini",
			descripcion: "Velocidad y acción de 16 bits. Favorece el ataque directo.",
			stats: { attack: 20, attackP: 58, defense: 8, defenseP: 6, magicAtk: 4, magicDefP: 4 },
			slots: patronSlots(0, 2)
		},
		{
			nombre: "PlayStation Classic Mini",
			descripcion: "Una colección compacta de clásicos. Defensa equilibrada.",
			stats: { attack: 8, attackP: 48, defense: 14, defenseP: 16, magicAtk: 8, magicDefP: 10 },
			slots: patronSlots(0, 2)
		}
	]
};

// Estado actual del personaje: qué nombre de ítem está equipado por categoría.
const equipoActual = {
	arma: "Ratón",
	armadura: "Teclado",
	accesorio: "Nintendo Switch"
};

// ============================================================
// STATS DE PERSONAJE (Strength / Magic / Vitality / Spirit /
// Dexterity / Luck) — valor base fijo + lo que sumen las
// materias equipadas actualmente (ver "efectos" en cada materia).
// HP/MP máximos siguen su propio sistema (actualizarNivelPorEdad,
// más abajo) y se combinan con el % de MaxHP/MaxMP que aporten
// las materias equipadas.
// ============================================================
const statsBase = {
	strength: 20,
	magic: 20,
	vitality: 20,
	spirit: 20,
	dexterity: 20,
	luck: 20
};

// Relaciona el "label" usado en materia.efectos con la clave de statsBase.
const mapaEfectoStat = {
	Strength: 'strength',
	Magic: 'magic',
	Vitality: 'vitality',
	Spirit: 'spirit',
	Dexterity: 'dexterity',
	Luck: 'luck'
};

// Convierte "+02", "-01", "+05%", "-02%" en { valor, esPorcentaje }.
function parseEfectoMateria(valorStr) {
	const esPorcentaje = valorStr.indexOf('%') !== -1;
	const valor = parseInt(valorStr.replace('%', ''), 10) || 0;
	return { valor: valor, esPorcentaje: esPorcentaje };
}

// Punto único de entrada: recalcula HP/MP máximos (base por nivel + % de
// las materias equipadas) y los 6 stats de personaje (base + bono plano de
// las materias equipadas), y refresca todo lo que depende de eso en pantalla.
// Se llama cada vez que se equipa/desequipa una materia, cada vez que cambia
// el nivel, y una vez más al terminar de armar la página (para aplicar la
// materia "de fábrica" que ya viene puesta en los slots iniciales).
window.mff7ActualizarStatsYVida = function () {
	// Todavía no existe el panel de Materia (se llama antes de que su IIFE
	// arranque): no hay nada que recalcular todavía.
	if (!window.mff7ObtenerBonosMateria) { return; }
	const bonos = window.mff7ObtenerBonosMateria();

	const hpMaxBase = window.mff7HpMaxBase || 1;
	const mpMaxBase = window.mff7MpMaxBase || 1;
	const hpMaxFinal = Math.max(1, Math.round(hpMaxBase * (1 + (bonos.hpPercent || 0) / 100)));
	const mpMaxFinal = Math.max(1, Math.round(mpMaxBase * (1 + (bonos.mpPercent || 0) / 100)));

	if (window.mff7AjustarVidaMaxima) {
		// El sistema de golpes/revivir ya está armado: le pasamos los nuevos
		// máximos para que reescale la vida actual y refresque texto/barras
		// en la tarjeta principal (de ahí lo toman el resto de paneles).
		window.mff7AjustarVidaMaxima(hpMaxFinal, mpMaxFinal);
	} else {
		// Fallback (no debería pasar en uso normal): escribe directo los máximos.
		const hpMaxEl = document.querySelector('#firstHpMax');
		const hpMinEl = document.querySelector('#firstHpMin');
		const mpMaxEl = document.querySelector('#firstMpMax');
		const mpMinEl = document.querySelector('#firstMpMin');
		if (hpMaxEl) { hpMaxEl.textContent = hpMaxFinal; }
		if (hpMinEl) { hpMinEl.textContent = hpMaxFinal + '/'; }
		if (mpMaxEl) { mpMaxEl.textContent = mpMaxFinal; }
		if (mpMinEl) { mpMinEl.textContent = mpMaxFinal + '/'; }
	}

	// Tabla de 6 stats de personaje (Strength/Magic/Vitality/Spirit/
	// Dexterity/Luck) en la tarjeta del panel Materia.
	Object.keys(statsBase).forEach(function (clave) {
		const el = document.querySelector('#statChar' + clave.charAt(0).toUpperCase() + clave.slice(1));
		if (!el) { return; }
		const bono = (bonos.flatStats && bonos.flatStats[clave]) || 0;
		const total = statsBase[clave] + bono;
		el.innerHTML = '';
		const spanTotal = document.createElement('span');
		spanTotal.textContent = total;
		el.appendChild(spanTotal);
		if (bono !== 0) {
			const spanBono = document.createElement('span');
			spanBono.className = 'materiaStatBono ' + (bono > 0 ? 'statUp' : 'statDown');
			spanBono.textContent = ' (' + (bono > 0 ? '+' : '') + bono + ')';
			el.appendChild(spanBono);
		}
	});
};

// ============================================================
// MOTOR GENÉRICO DE PANELES
// ============================================================

// ============================================================
// PREFERENCIAS GUARDADAS (color de ventana, sonido, filtro CRT)
// Se aplican de inmediato para que no haya parpadeos al cargar.
// ============================================================

const coloresPorDefecto = { r: 0, g: 83, b: 173 }; // mismo azul que el diseño original

function leerPreferencias() {
	let color = coloresPorDefecto;
	let sonido = true;
	let crt = true;
	let volumen = 0.35; // 35% por defecto
	try {
		const guardado = localStorage.getItem('mff7_color');
		if (guardado) { color = JSON.parse(guardado); }
		const sGuardado = localStorage.getItem('mff7_sonido');
		if (sGuardado !== null) { sonido = sGuardado === '1'; }
		const cGuardado = localStorage.getItem('mff7_crt');
		if (cGuardado !== null) { crt = cGuardado === '1'; }
		const vGuardado = localStorage.getItem('mff7_volumen');
		if (vGuardado !== null) { volumen = parseFloat(vGuardado); }
	} catch (e) { /* localStorage no disponible: usamos los valores por defecto */ }
	return { color: color, sonido: sonido, crt: crt, volumen: volumen };
}

function shade(r, g, b, factor) {
	return 'rgb(' + Math.round(r * factor) + ',' + Math.round(g * factor) + ',' + Math.round(b * factor) + ')';
}

function aplicarColorVentana(r, g, b) {
	const root = document.documentElement.style;
	const esColorPorDefecto = r === coloresPorDefecto.r && g === coloresPorDefecto.g && b === coloresPorDefecto.b;

	if (esColorPorDefecto) {
		// Es el azul original: dejamos que mande el CSS (los valores hechos a mano
		// en :root), en vez de recalcularlo con shade(). Así se ve exactamente
		// como antes de agregar el selector de color.
		root.removeProperty('--win-c1');
		root.removeProperty('--win-c2');
		root.removeProperty('--win-c3');
		return;
	}

	root.setProperty('--win-c1', 'rgb(' + r + ',' + g + ',' + b + ')');
	root.setProperty('--win-c2', shade(r, g, b, 0.45));
	root.setProperty('--win-c3', shade(r, g, b, 0.10));
}

function aplicarCrt(activado) {
	const overlay = document.querySelector('#crtOverlay');
	if (overlay) { overlay.classList.toggle('on', activado); }
	// El desenfoque sutil acompaña al CRT: mismo interruptor, mismo estado.
	// Se aplica a #group y a cada panel (.panelOverlay), pero NUNCA a
	// #crtOverlay (las scanlines), porque son hermanos dentro del mismo
	// contenedor: si el blur fuera al padre común, también difuminaría
	// las líneas finitas del filtro y las dejaba invisibles.
	const elementosConBlur = document.querySelectorAll('#group, .panelOverlay, #ff7Cursor');
	elementosConBlur.forEach(function (el) { el.classList.toggle('crtBlur', activado); });
}

function aplicarVolumen(nivel) {
	// nivel va de 0 a 1
	for (const clave in sonidos) {
		if (sonidos.hasOwnProperty(clave)) { sonidos[clave].volume = nivel; }
	}
}

// Efecto de "encendido" de un televisor CRT (adaptado del filtro CRT de
// CodePen). Se dispara al cargar la página si el efecto está activo, y
// también cada vez que se reactiva desde Config.
function reproducirEncendidoCrt() {
	const scaler = document.querySelector('#viewportScaler');
	if (!scaler) { return; }
	scaler.classList.remove('crtTurnOn');
	void scaler.offsetWidth; // reinicia la animación aunque ya se haya jugado antes
	scaler.classList.add('crtTurnOn');
	scaler.addEventListener('animationend', function () {
		scaler.classList.remove('crtTurnOn');
	}, { once: true });
}

const preferencias = leerPreferencias();
aplicarColorVentana(preferencias.color.r, preferencias.color.g, preferencias.color.b);
aplicarCrt(preferencias.crt);

if (preferencias.crt) {
	reproducirEncendidoCrt();
}


// ============================================================
// SISTEMA DE SONIDO
// ============================================================
const sonidos = {
	menuAbrir:   new Audio('Assets/Audio/Menuabrir.wav'),
	cerrar:      new Audio('Assets/Audio/Cerrar.mp3'),
	slider:      new Audio('Assets/Audio/Slider.wav'),
	materia:     new Audio('Assets/Audio/materia.mp3'),
	slash:       new Audio('Assets/Audio/slash.mp3'),
	currar:      new Audio('Assets/Audio/currar.mp3'),
	delete:      new Audio('Assets/Audio/delete.mp3'),
	save:        new Audio('Assets/Audio/save.mp3'),
	saveSelect:  new Audio('Assets/Audio/saveSelect.mp3'),
	error:       new Audio('Assets/Audio/error.mp3'),
	victory:     new Audio('Assets/Audio/Victory.mp3'),
	crit:        new Audio('Assets/Audio/crit.mp3')
};

aplicarVolumen(preferencias.volumen);

function playSound(nombre) {
	// Leer preferencia de sonido en tiempo real (el usuario puede cambiarla en Config)
	let sonidoOn = true;
	try { const v = localStorage.getItem('mff7_sonido'); if (v !== null) sonidoOn = v === '1'; } catch(e) {}
	if (!sonidoOn) return;
	const audio = sonidos[nombre];
	if (!audio) return;
	audio.currentTime = 0;
	audio.play().catch(function(){});
}

// Nivel = edad real de Matías. La barra "Next level" se llena con el
// progreso transcurrido desde el último cumpleaños hasta el próximo;
// al llegar al 100% (el día del cumpleaños) el nivel sube solo, y junto
// con el nivel suben también los stats (HP/MP máximos), como en un RPG.
function actualizarNivelPorEdad() {
	const NACIMIENTO_DIA = 30;
	const NACIMIENTO_MES = 7; // Agosto, 0-indexado
	const NACIMIENTO_ANIO = 1987;
	const ANCHO_TRACK_LEVELBAR = 180; // debe coincidir con #firstLevelBar máximo

	// Stats base "ancladas" al nivel 38 (los valores actuales del menú).
	// Por cada nivel de más, HP y MP suben esta cantidad fija.
	const NIVEL_BASE = 38;
	const HP_BASE = 2050;
	const MP_BASE = 260;
	const HP_POR_NIVEL = 60;
	const MP_POR_NIVEL = 8;

	// TESTING: para probar el cambio de nivel sin esperar al cumpleaños,
	// comentá la línea "const hoy = new Date();" de abajo y descomentá la
	// de simulación, poniendo la fecha que quieras probar. No olvidar
	// volver a dejarlo como estaba antes de subir la página.
	const hoy = new Date();
	// const hoy = new Date(2026, 7, 31); // <-- simula 31/08/2026 (cumplido)

	let edad = hoy.getFullYear() - NACIMIENTO_ANIO;
	const cumpleEsteAnio = new Date(hoy.getFullYear(), NACIMIENTO_MES, NACIMIENTO_DIA);
	if (hoy < cumpleEsteAnio) { edad--; }

	let proximoCumple = new Date(hoy.getFullYear(), NACIMIENTO_MES, NACIMIENTO_DIA);
	if (hoy >= proximoCumple) { proximoCumple = new Date(hoy.getFullYear() + 1, NACIMIENTO_MES, NACIMIENTO_DIA); }
	const cumpleAnterior = new Date(proximoCumple.getFullYear() - 1, NACIMIENTO_MES, NACIMIENTO_DIA);

	const totalMs = proximoCumple - cumpleAnterior;
	const transcurridoMs = hoy - cumpleAnterior;
	const progreso = Math.max(0, Math.min(1, transcurridoMs / totalMs));

	const levelEl = document.querySelector('#firstLevel');
	const levelBarEl = document.querySelector('#firstLevelBar');

	if (levelEl) {
		const statusSpan = levelEl.querySelector('#firstStatus');
		levelEl.textContent = edad;
		if (statusSpan) {
			if (!statusSpan.textContent.trim()) { statusSpan.textContent = ' Furia'; }
			levelEl.appendChild(statusSpan);
		}
	}
	if (levelBarEl) { levelBarEl.style.width = (progreso * ANCHO_TRACK_LEVELBAR) + 'px'; }

	// Mismo nivel en las tarjetas de los paneles (Proyectos, Materia, Equipo, Estado).
	['#proyectosLevel', '#materiaLevel', '#equipoLevel', '#estadoLevel'].forEach(function (selector) {
		const el = document.querySelector(selector);
		if (el) { el.textContent = edad; }
		const statusSel = selector.replace('Level', 'Status');
		const statusEl = document.querySelector(statusSel);
		if (statusEl && !statusEl.textContent.trim()) { statusEl.textContent = ' Furia'; }
	});

	// "EXP"/"Siguiente nivel" del panel Estado: en vez de inventar puntos
	// de experiencia sin sentido, se usan los días realmente vividos (EXP)
	// y los días que faltan para el próximo cumpleaños/nivel, mismo
	// progreso que ya llena la barra "Next level" de la tarjeta principal.
	const MS_POR_DIA = 24 * 60 * 60 * 1000;
	window.mff7DiasVividos = Math.floor((hoy - new Date(NACIMIENTO_ANIO, NACIMIENTO_MES, NACIMIENTO_DIA)) / MS_POR_DIA);
	window.mff7DiasSiguiente = Math.max(0, Math.ceil((proximoCumple - hoy) / MS_POR_DIA));
	window.mff7Progreso = progreso;
	window.mff7AnchoTrackLevelBar = ANCHO_TRACK_LEVELBAR;

	// Stats que crecen con el nivel: se escriben en la tarjeta principal
	// (a HP/MP completos); el resto de los paneles los sincronizan solos
	// al abrirse, leyendo estos mismos valores.
	const hpMax = HP_BASE + (edad - NIVEL_BASE) * HP_POR_NIVEL;
	const mpMax = MP_BASE + (edad - NIVEL_BASE) * MP_POR_NIVEL;

	const hpMaxEl = document.querySelector('#firstHpMax');
	const hpMinEl = document.querySelector('#firstHpMin');
	const mpMaxEl = document.querySelector('#firstMpMax');
	const mpMinEl = document.querySelector('#firstMpMin');

	if (hpMaxEl) { hpMaxEl.textContent = hpMax; }
	if (hpMinEl) { hpMinEl.textContent = hpMax + '/'; }
	if (mpMaxEl) { mpMaxEl.textContent = mpMax; }
	if (mpMinEl) { mpMinEl.textContent = mpMax + '/'; }

	// Se expone para que otras partes del script (ej. tabla de stats de
	// Equipo) puedan sumar el bono de nivel a los stats fijos del ítem.
	window.mff7Nivel = edad;
	window.mff7NivelBase = NIVEL_BASE;

	// HP/MP "base" (solo por nivel, sin el % que aporten las materias
	// equipadas). El sistema de materia los usa como punto de partida
	// cada vez que hay que recalcular la vida máxima real.
	window.mff7HpMaxBase = hpMax;
	window.mff7MpMaxBase = mpMax;

	// Si el resto de la página ya está armada (materia + sistema de vida),
	// reaplicá enseguida el bono de las materias equipadas sobre esta base
	// recién calculada. La primera vez que corre actualizarNivelPorEdad()
	// (al arrancar) esto todavía no existe, así que se ignora sin romper
	// nada: se llama una sola vez más al final de DOMContentLoaded.
	if (window.mff7ActualizarStatsYVida) { window.mff7ActualizarStatsYVida(); }
}

document.addEventListener('DOMContentLoaded', function () {

	actualizarNivelPorEdad();
	// Revisa una vez por hora por si cruza la medianoche del cumpleaños
	// mientras la página queda abierta.
	setInterval(actualizarNivelPorEdad, 60 * 60 * 1000);

	const group = document.querySelector('#group');

	// Calcula el rectángulo (en pantalla) que ocupan juntos la tarjeta de
	// personaje (#section), la biografía (#biografia) y la lista del menú
	// (#menu). Los paneles se posicionan exactamente sobre esa zona, para
	// que parezca que el menú "se transforma" en el panel, en vez de
	// aparecer en otro lugar.
	// Nota: #section ahora envuelve nada más que la tarjeta de personaje
	// (se achicó para que la biografía se vea como una ventana separada,
	// igual que en jamiepates.com), por eso hace falta sumar #biografia
	// a mano para que el panel siga llegando hasta abajo del todo.
	//
	// IMPORTANTE: getBoundingClientRect() devuelve coordenadas reales de
	// pantalla (ya escaladas visualmente por el transform de #viewportScaler).
	// Pero estos paneles son `position: fixed` DENTRO de #viewportScaler,
	// que al tener `transform` se vuelve su containing block: cualquier
	// valor en px que les asignemos se interpreta en el espacio de
	// coordenadas LOCAL (sin escalar) de ese wrapper, no en píxeles reales
	// de pantalla. Por eso hay que dividir por el factor de escala actual
	// antes de usarlos como left/top/width/height.
	function getCanvasRect() {
		const scale = window.mff7Scale || 1;
		const scaler = document.querySelector('#viewportScaler');
		const scalerRect = scaler.getBoundingClientRect();
		const r1 = document.querySelector('#section').getBoundingClientRect();
		const r2 = document.querySelector('#menu').getBoundingClientRect();
		const r3 = document.querySelector('#biografia').getBoundingClientRect();
		const left = (Math.min(r1.left, r2.left, r3.left) - scalerRect.left) / scale;
		const top = (Math.min(r1.top, r2.top, r3.top) - scalerRect.top) / scale;
		const right = (Math.max(r1.right, r2.right, r3.right) - scalerRect.left) / scale;
		const bottom = (Math.max(r1.bottom, r2.bottom, r3.bottom) - scalerRect.top) / scale;
		return { left: left, top: top, width: right - left, height: bottom - top, menuWidth: r2.width / scale };
	}

	function positionPanel(panelEl, headerEl, headerUseEl) {
		const rect = getCanvasRect();
		panelEl.style.left = rect.left + 'px';
		panelEl.style.top = rect.top + 'px';
		panelEl.style.width = rect.width + 'px';
		panelEl.style.height = rect.height + 'px';
		headerEl.style.width = rect.menuWidth + 'px';
		if (headerUseEl) {
			headerUseEl.style.width = (rect.width - rect.menuWidth) + 'px';
		}

		// La ventana crece/se achica siempre anclada arriba a la derecha:
		// el ancho arranca fijo en el ancho del menú de comandos (--navW)
		// y el punto fijo (transform-origin: 100% 0%) queda definido en el CSS.
		const navRatio = rect.menuWidth / rect.width;
		panelEl.style.setProperty('--navW', navRatio);
	}

	// Si la ventana cambia de tamaño (o el celular rota) mientras un panel
	// está abierto, lo reposicionamos para que siga calzando exactamente
	// sobre el menú escalado.
	function reposicionarPanelAbierto() {
		const panelVisible = document.querySelector('.panelOverlay.visible');
		if (!panelVisible) return;
		const header = panelVisible.querySelector('.panelHeader');
		const headerUse = panelVisible.querySelector('.panelHeaderUse');
		if (header) {
			positionPanel(panelVisible, header, headerUse || null);
		}
	}
	window.addEventListener('resize', reposicionarPanelAbierto);
	window.addEventListener('orientationchange', reposicionarPanelAbierto);

	// Duración de la animación de la ventana (debe coincidir con el
	// "animation: ... 0.48s" de .panelOverlay.visible.opening/closing en
	// el CSS). El ancho ocupa el primer 20% (salto casi instantáneo,
	// anclado arriba a la derecha) y el alto el 80% restante.
	var PANEL_ANIM_MS = 480;
	var PANEL_WIDTH_PHASE_MS = PANEL_ANIM_MS * 0.2;

	// Abre un panel: la tarjeta de HP y el menú de comandos desaparecen de
	// golpe (fade rápido en #group) en el mismo instante en que el panel
	// "toma su lugar" y arranca a crecer; el título aparece apenas termina
	// el salto de ancho, y el resto del contenido entra en cascada hacia
	// el final del crecimiento en alto.
	function openPanel(panelEl, headerEls, contentEls) {
		playSound('menuAbrir');
		positionPanel(panelEl, headerEls[headerEls.length - 1], headerEls.length > 1 ? headerEls[0] : null);

		// Se asegura de arrancar siempre desde el estado contraído, aunque
		// venga de un cierre anterior interrumpido a mitad de animación.
		panelEl.classList.remove('opening', 'closing');
		panelEl.classList.add('visible');
		void panelEl.offsetHeight; // fuerza reflow para no saltarse el estado inicial

		group.classList.add('panelOpen'); // la tarjeta de HP y el menú desaparecen (fade rápido)

		window.requestAnimationFrame(function () {
			panelEl.classList.add('opening'); // el panel crece (ancho, luego alto)
		});

		setTimeout(function () {
			headerEls.forEach(function (el) { el.classList.add('show'); });
		}, PANEL_WIDTH_PHASE_MS + 30);

		// Cascada: cada elemento de contentEls entra un instante después
		// del anterior (card -> description -> body), en vez de todos
		// a la vez, para imitar el efecto de paneles entrando en secuencia.
		contentEls.forEach(function (el, i) {
			setTimeout(function () {
				el.classList.add('show');
			}, PANEL_ANIM_MS * 0.85 + i * 170);
		});
	}

	// Cierra un panel: primero se desvanece el contenido, luego el título,
	// y recién cuando el panel ya terminó de achicarse en alto (y está
	// por saltar de ancho completo a angosto) vuelven a aparecer de golpe
	// la tarjeta de HP y el menú de comandos.
	function closePanel(panelEl, headerEls, contentEls) {
		playSound('cerrar');
		// Cascada inversa al cerrar: el último en entrar (body) es el
		// primero en salir, para que el movimiento se sienta simétrico.
		var reversed = contentEls.slice().reverse();
		reversed.forEach(function (el, i) {
			setTimeout(function () {
				el.classList.remove('show');
			}, i * 90);
		});
		panelEl.classList.remove('opening');
		panelEl.classList.add('closing'); // el panel se achica (alto, luego ancho)

		setTimeout(function () {
			headerEls.forEach(function (el) { el.classList.remove('show'); });
			group.classList.remove('panelOpen'); // la tarjeta de HP y el menú reaparecen (fade rápido)
		}, PANEL_ANIM_MS - PANEL_WIDTH_PHASE_MS);

		setTimeout(function () {
			panelEl.classList.remove('visible', 'closing');
		}, PANEL_ANIM_MS);
	}

	function closeOnEscape(isOpenFn, closeFn) {
		document.addEventListener('keydown', function (e) {
			if (e.key === 'Escape' && isOpenFn()) {
				closeFn();
			}
		});
	}

	// Genera filas de estrellas en CSS (clip-path), coloreadas según la materia.
	function buildStars(valor, color) {
		var row = document.createElement('div');
		row.className = 'starRow';
		for (var i = 0; i < 5; i++) {
			var star = document.createElement('span');
			star.className = 'starSprite';
			if (i < valor) {
				star.style.setProperty('--star-color', color || '#E6C846');
			} else {
				star.classList.add('starEmpty');
			}
			row.appendChild(star);
		}
		return row;
	}

	// Lee el HP/MP real del personaje (la tarjeta principal, que cambia con
	// el sistema de daño/revivir) y lo refleja en los elementos indicados,
	// para que los paneles Materia y Equipo siempre muestren el valor actual.
	function sincronizarHpMp(hpValueEl, mpValueEl, hpBarEl, mpBarEl) {
		const hpMinEl = document.querySelector('#firstHpMin');
		const hpMaxEl = document.querySelector('#firstHpMax');
		const mpMinEl = document.querySelector('#firstMpMin');
		const mpMaxEl = document.querySelector('#firstMpMax');
		const hpActual = parseInt((hpMinEl ? hpMinEl.textContent : '').replace(/[^\d]/g, ''), 10) || 0;
		const hpMax    = parseInt((hpMaxEl ? hpMaxEl.textContent : '').replace(/[^\d]/g, ''), 10) || 1;
		const mpActual = parseInt((mpMinEl ? mpMinEl.textContent : '').replace(/[^\d]/g, ''), 10) || 0;
		const mpMax    = parseInt((mpMaxEl ? mpMaxEl.textContent : '').replace(/[^\d]/g, ''), 10) || 1;
		if (hpValueEl && hpMinEl && hpMaxEl) {
			hpValueEl.textContent = hpMinEl.textContent.trim() + hpMaxEl.textContent.trim();
		}
		if (mpValueEl && mpMinEl && mpMaxEl) {
			mpValueEl.textContent = mpMinEl.textContent.trim() + mpMaxEl.textContent.trim();
		}
		if (hpBarEl) { hpBarEl.style.width = Math.max(0, (hpActual / hpMax) * 145) + 'px'; }
		if (mpBarEl) { mpBarEl.style.width = Math.max(0, (mpActual / mpMax) * 145) + 'px'; }
	}

	// ----------------------------------------------------------
	// PANEL: PROYECTOS
	// ----------------------------------------------------------
	(function () {
		const panel = document.querySelector('#panelProyectos');
		const header = document.querySelector('#proyectosHeader');
		const headerUse = document.querySelector('#proyectosUse');
		const card = document.querySelector('#proyectosCard');
		const description = document.querySelector('#proyectosDescription');
		const body = document.querySelector('#proyectosBody');
		const list = document.querySelector('#proyectosList');
		const selected = document.querySelector('#proyectosSelected');
		const closeBtn = document.querySelector('#proyectosClose');
		const menuItem = document.querySelector('#menu li[number="0"]');

		function showProyecto(proyecto) {
			description.textContent = proyecto.descripcion;
			selected.innerHTML = '';
			const titulo = document.createElement('div');
			titulo.textContent = proyecto.nombre;
			selected.appendChild(titulo);
			if (!proyecto.link) {
				const aviso = document.createElement('div');
				aviso.style.marginTop = '14px';
				aviso.style.fontSize = '16px';
				aviso.style.color = '#8aa0c8';
				aviso.textContent = 'Próximamente';
				selected.appendChild(aviso);
			}
		}

		function buildList() {
			list.innerHTML = '';
			proyectos.forEach(function (proyecto) {
				const li = document.createElement('li');
				li.textContent = proyecto.nombre;
				li.addEventListener('mouseenter', function () { showProyecto(proyecto); playSound('slider'); });
				li.addEventListener('click', function () {
					showProyecto(proyecto);
					if (proyecto.link) { window.open(proyecto.link, '_blank'); }
				});
				list.appendChild(li);
			});
			document.dispatchEvent(new Event('panelListBuilt'));
		}

		const proyHpValueEl = document.querySelector('#proyectosHpValue');
		const proyMpValueEl = document.querySelector('#proyectosMpValue');
		const proyHpBarEl   = document.querySelector('#proyectosHpBar');
		const proyMpBarEl   = document.querySelector('#proyectosMpBar');

		function open() {
			buildList();
			sincronizarHpMp(proyHpValueEl, proyMpValueEl, proyHpBarEl, proyMpBarEl);
			description.textContent = 'Pasa el cursor sobre un proyecto para ver más información.';
			selected.innerHTML = '&nbsp;';
			openPanel(panel, [headerUse, header], [card, description, body]);
		}

		function close() {
			closePanel(panel, [headerUse, header], [card, description, body]);
		}

		menuItem.addEventListener('click', open);
		closeBtn.addEventListener('click', close);
		closeOnEscape(function () { return panel.classList.contains('visible'); }, close);
	})();

	// ----------------------------------------------------------
	// PANEL: MATERIA (con ranuras intercambiables)
	// ----------------------------------------------------------

	// Orbes individuales: generados en CSS (gradientes), un color por materia.
	function shadeColor(hex, percent) {
		// percent > 0 aclara, percent < 0 oscurece
		var num = parseInt(hex.replace('#', ''), 16);
		var r = (num >> 16) & 255, g = (num >> 8) & 255, b = num & 255;
		r = Math.min(255, Math.max(0, Math.round(r + (percent < 0 ? r : 255 - r) * percent)));
		g = Math.min(255, Math.max(0, Math.round(g + (percent < 0 ? g : 255 - g) * percent)));
		b = Math.min(255, Math.max(0, Math.round(b + (percent < 0 ? b : 255 - b) * percent)));
		return '#' + [r, g, b].map(function (v) { return v.toString(16).padStart(2, '0'); }).join('');
	}

	function aplicarOrbSprite(el, color) {
		if (!color) {
			el.style.removeProperty('--orb-color');
			el.style.removeProperty('--orb-color-light');
			el.style.removeProperty('--orb-color-dark');
			return;
		}
		el.style.setProperty('--orb-color', color);
		el.style.setProperty('--orb-color-light', shadeColor(color, 0.35));
		el.style.setProperty('--orb-color-dark', shadeColor(color, -0.45));
	}
	(function () {
		const panel = document.querySelector('#panelMateria');
		const header = document.querySelector('#materiaHeader');
		const card = document.querySelector('#materiaCard');
		const description = document.querySelector('#materiaDescription');
		const body = document.querySelector('#materiaBody');
		const list = document.querySelector('#materiaList');
		const selected = document.querySelector('#materiaSelected');
		const closeBtn = document.querySelector('#materiaClose');
		const menuItem = document.querySelector('#menu li[number="2"]');
		const slotsArmaEl = document.querySelector('#materiaSlotsArma');
		const slotsArmaduraEl = document.querySelector('#materiaSlotsArmadura');
		const nombreArmaEl = document.querySelector('#materiaNombreArma');
		const nombreArmaduraEl = document.querySelector('#materiaNombreArmadura');
		const hpValueEl = document.querySelector('#materiaHpValue');
		const mpValueEl = document.querySelector('#materiaMpValue');

		// Refresca la tarjeta de HP/MP de ESTE panel (no solo la tarjeta
		// principal) con el valor actual. Se llama al abrir el panel y
		// también cada vez que se equipa/desequipa una materia, para que
		// el cambio se vea en tiempo real sin tener que cerrar el panel.
		function sincronizarHpMpMateria() {
			const matHpBarEl = document.querySelector('#materiaHpBar');
			const matMpBarEl = document.querySelector('#materiaMpBar');
			sincronizarHpMp(hpValueEl, mpValueEl, matHpBarEl, matMpBarEl);
		}

		let slotSeleccionado = null; // { datos, el }
		const hintPorDefecto = 'Tocá una ranura y después una materia para equiparla (o desequipar).';

		// Las ranuras "vivas" (con los colores de materia que el jugador puso)
		// para cada categoría. Se regeneran cada vez que cambia el arma/armadura
		// equipada, preservando los colores ya puestos cuando el slot sigue existiendo.
		let ranurasArma = [];
		let ranurasArmadura = [];

		function buscarItemEquipo(categoria, nombre) {
			const lista = equipoItems[categoria] || [];
			return lista.find(function (it) { return it.nombre === nombre; }) || null;
		}

		function buscarMateriaPorNombre(nombre) {
			return materias.find(function (m) { return m.nombre === nombre; }) || null;
		}

		// Genera la lista de ranuras para una categoría a partir del patrón de
		// slots del ítem actualmente equipado, conservando las materias que ya
		// había puestas en las ranuras anteriores (en el mismo orden). La
		// primera vez (sin ranuras previas) usa la materia inicial de fábrica.
		function regenerarRanuras(categoria, ranurasPrevias) {
			const item = buscarItemEquipo(categoria, equipoActual[categoria]);
			const patron = item ? item.slots : [];
			const semilla = ranurasPrevias.length
				? null
				: (categoria === 'arma' ? materiaInicialArma : (categoria === 'armadura' ? materiaInicialArmadura : null));
			return patron.map(function (slotPatron, i) {
				const previa = ranurasPrevias[i];
				const inicial = semilla && semilla[i] ? semilla[i] : null;
				return {
					color: previa ? previa.color : (inicial ? inicial.color : null),
					nombre: previa ? previa.nombre : (inicial ? inicial.nombre : null),
					linked: slotPatron.linked
				};
			});
		}

		function deseleccionarSlot() {
			if (slotSeleccionado) {
				slotSeleccionado.el.classList.remove('selected');
				slotSeleccionado = null;
			}
		}

		function refrescarSlotVisual(slot, datos) {
			slot.classList.toggle('filled', !!datos.color);
			slot.style.backgroundImage    = "url('Assets/Imagenes/materia-slot.png')";
			slot.style.backgroundSize     = '30px 30px';
			slot.style.backgroundPosition = 'center';
			slot.style.backgroundRepeat   = 'no-repeat';

			// Orbe: generado en CSS, centrado en el slot
			var orbEl = slot.querySelector('.orbInSlot');
			if (!orbEl) {
				orbEl = document.createElement('span');
				orbEl.className = 'orbInSlot';
				slot.appendChild(orbEl);
			}
			if (datos.color) {
				aplicarOrbSprite(orbEl, datos.color);
				orbEl.classList.remove('orbHidden');
				slot.style.color    = datos.color;
				slot.dataset.color  = datos.color;
				slot.dataset.nombre = datos.nombre || '';
			} else {
				orbEl.classList.add('orbHidden');
				aplicarOrbSprite(orbEl, null);
				slot.style.color = '';
				delete slot.dataset.color;
				delete slot.dataset.nombre;
			}
		}

		function buildSlots(container, ranuras) {
			container.innerHTML = '';
			ranuras.forEach(function (datos) {
				var slot = document.createElement('span');
				slot.className = 'slot' + (datos.linked ? ' linked' : '');
				refrescarSlotVisual(slot, datos);

				slot.addEventListener('mouseenter', function () {
					playSound('slider');
					// Si la ranura tiene una materia puesta, mostrarla igual que
					// al pasar el cursor por la lista (orbe, nombre y estrellas),
					// para saber de un vistazo qué hay equipado en cada slot.
					if (datos.nombre) {
						const materiaEquipada = buscarMateriaPorNombre(datos.nombre);
						if (materiaEquipada) {
							description.textContent = materiaEquipada.descripcion;
							showMateria(materiaEquipada);
							return;
						}
					}
					if (!slotSeleccionado) { description.textContent = hintPorDefecto; }
					highlightSlots(null);
				});

				slot.addEventListener('click', function (e) {
					e.stopPropagation();

					if (slotSeleccionado && slotSeleccionado.el === slot) {
						// Tocar la ranura ya seleccionada: la desequipa.
						datos.color = null;
						datos.nombre = null;
						refrescarSlotVisual(slot, datos);
						deseleccionarSlot();
						description.textContent = hintPorDefecto;
						window.mff7ActualizarStatsYVida();
						sincronizarHpMpMateria();
						return;
					}

					deseleccionarSlot();
					slotSeleccionado = { datos: datos, el: slot };
					slot.classList.add('selected');
					description.textContent = datos.color
						? 'Elegí una materia para reemplazarla, o volvé a tocar esta ranura para quitarla.'
						: 'Elegí una materia de la lista para equiparla en esta ranura.';
				});

				container.appendChild(slot);
			});
		}

		// Reconstruye visualmente ambas filas de ranuras a partir del arma y
		// armadura equipadas actualmente (equipoActual, compartido con el panel Equipo).
		function refrescarEquipoYRanuras() {
			ranurasArma = regenerarRanuras('arma', ranurasArma);
			ranurasArmadura = regenerarRanuras('armadura', ranurasArmadura);
			if (nombreArmaEl) { nombreArmaEl.textContent = equipoActual.arma; }
			if (nombreArmaduraEl) { nombreArmaduraEl.textContent = equipoActual.armadura; }
			buildSlots(slotsArmaEl, ranurasArma);
			buildSlots(slotsArmaduraEl, ranurasArmadura);
			if (window.mff7ActualizarStatsYVida) { window.mff7ActualizarStatsYVida(); }
		}

		// Suma los efectos de TODAS las materias puestas ahora mismo (Arma +
		// Armadura), separando los stats planos (Strength, Magic, etc.) de
		// los porcentuales de vida (MaxHP/MaxMP), para que mff7ActualizarStatsYVida
		// pueda aplicarlos sobre la base de nivel y sobre los 6 stats fijos.
		window.mff7ObtenerBonosMateria = function () {
			const flatStats = {};
			let hpPercent = 0;
			let mpPercent = 0;

			ranurasArma.concat(ranurasArmadura).forEach(function (datos) {
				if (!datos.nombre) { return; }
				const materia = buscarMateriaPorNombre(datos.nombre);
				if (!materia || !materia.efectos) { return; }
				materia.efectos.forEach(function (efecto) {
					const parsed = parseEfectoMateria(efecto.valor);
					if (efecto.label === 'MaxHP') { hpPercent += parsed.valor; return; }
					if (efecto.label === 'MaxMP') { mpPercent += parsed.valor; return; }
					const clave = mapaEfectoStat[efecto.label];
					if (clave) { flatStats[clave] = (flatStats[clave] || 0) + parsed.valor; }
				});
			});

			return { flatStats: flatStats, hpPercent: hpPercent, mpPercent: mpPercent };
		};

		// Acceso de solo lectura a las ranuras "vivas" (con los colores de
		// materia realmente equipados), para que el panel Equipo pueda
		// pintar sus propios slots con esos mismos colores en vez de gris.
		window.obtenerRanurasMateriaVivas = function (categoria) {
			if (categoria === 'arma') { return ranurasArma; }
			if (categoria === 'armadura') { return ranurasArmadura; }
			return [];
		};

		// Sembrar las ranuras desde el arranque (no solo al abrir el panel
		// Materia), así el panel Equipo ya tiene colores reales disponibles
		// la primera vez que se abre.
		ranurasArma = regenerarRanuras('arma', ranurasArma);
		ranurasArmadura = regenerarRanuras('armadura', ranurasArmadura);
		window.mff7ActualizarStatsYVida();

		function highlightSlots(nombre) {
			document.querySelectorAll('#materiaSlotsArma .slot, #materiaSlotsArmadura .slot').forEach(function (slot) {
				slot.classList.toggle('highlight', !!nombre && slot.dataset.nombre === nombre);
			});
		}

		// Cada materia es una única unidad física, igual que en el juego: si ya
		// está puesta en otra ranura (de Arma o de Armadura), se la quita de ahí
		// antes de equiparla en la ranura nueva, en vez de quedar duplicada.
		// Se compara por NOMBRE, no por color: varias materias distintas pueden
		// compartir el mismo color de orbe (p. ej. Redes, Windows y Office son
		// todas azules) y no deben sustituirse entre sí.
		function liberarMateriaDuplicada(nombre, ranuraDestino) {
			[
				{ ranuras: ranurasArma, container: slotsArmaEl },
				{ ranuras: ranurasArmadura, container: slotsArmaduraEl }
			].forEach(function (grupo) {
				grupo.ranuras.forEach(function (datos, i) {
					if (datos === ranuraDestino) { return; }
					if (datos.nombre === nombre) {
						datos.color = null;
						datos.nombre = null;
						const slotEl = grupo.container.children[i];
						if (slotEl) { refrescarSlotVisual(slotEl, datos); }
					}
				});
			});
		}

		// Formatea números grandes con separador de miles ("14.200"), igual
		// que el resto del sitio (ver Gil / EXP en la tarjeta principal).
		function formatearAP(n) {
			return Number(n).toLocaleString('es-ES');
		}

		// Fila "AP" / "To next level" (o "MASTER" cuando la materia ya no
		// necesita más AP), igual que la esquina superior derecha del
		// recuadro de materia equipada en el juego original.
		function buildApBlock(materia) {
			const bloque = document.createElement('div');
			bloque.className = 'materiaApBlock';

			if (materia.master) {
				const filaMaster = document.createElement('div');
				filaMaster.className = 'materiaApRow materiaApMaster';
				filaMaster.innerHTML = '<span class="materiaApLabel">AP</span><span class="materiaApValor">MASTER</span>';
				bloque.appendChild(filaMaster);
				return bloque;
			}

			if (typeof materia.ap === 'number') {
				const filaAp = document.createElement('div');
				filaAp.className = 'materiaApRow';
				filaAp.innerHTML = '<span class="materiaApLabel">AP</span><span class="materiaApValor">' + formatearAP(materia.ap) + '</span>';
				bloque.appendChild(filaAp);
			}
			if (typeof materia.apSiguiente === 'number') {
				const filaSig = document.createElement('div');
				filaSig.className = 'materiaApRow';
				filaSig.innerHTML = '<span class="materiaApLabel">To next level</span><span class="materiaApValor">' + formatearAP(materia.apSiguiente) + '</span>';
				bloque.appendChild(filaSig);
			}
			return bloque;
		}

		// Columnas "Ability list" (o el texto "info" para materias
		// independientes sin habilidades) y "Equip effect", igual que el
		// recuadro inferior del menú de Materia original. Las habilidades
		// marcadas como no desbloqueadas se muestran en gris.
		function buildDetailCols(materia) {
			const cols = document.createElement('div');
			cols.className = 'materiaDetailCols';

			const colIzquierda = document.createElement('div');
			colIzquierda.className = 'materiaDetailCol';
			if (materia.habilidades && materia.habilidades.length) {
				const titulo = document.createElement('div');
				titulo.className = 'materiaDetailTitle';
				titulo.textContent = 'Ability list';
				colIzquierda.appendChild(titulo);
				const lista = document.createElement('ul');
				lista.className = 'materiaAbilityList';
				materia.habilidades.forEach(function (hab) {
					const li = document.createElement('li');
					li.textContent = hab.nombre;
					li.className = hab.desbloqueada ? 'unlocked' : 'locked';
					lista.appendChild(li);
				});
				colIzquierda.appendChild(lista);
			} else if (materia.info) {
				const titulo = document.createElement('div');
				titulo.className = 'materiaDetailTitle';
				titulo.textContent = 'Info';
				colIzquierda.appendChild(titulo);
				const info = document.createElement('div');
				info.className = 'materiaInfoText';
				info.textContent = materia.info;
				colIzquierda.appendChild(info);
			}

			const colDerecha = document.createElement('div');
			colDerecha.className = 'materiaDetailCol';
			if (materia.efectos && materia.efectos.length) {
				const titulo = document.createElement('div');
				titulo.className = 'materiaDetailTitle';
				titulo.textContent = 'Equip effect';
				colDerecha.appendChild(titulo);
				const tabla = document.createElement('table');
				tabla.className = 'equipStatsTable materiaEffectsTable';
				materia.efectos.forEach(function (efecto) {
					const fila = document.createElement('tr');
					const tdLabel = document.createElement('td');
					tdLabel.textContent = efecto.label;
					const tdValor = document.createElement('td');
					tdValor.textContent = efecto.valor;
					tdValor.className = efecto.tipo === 'up' ? 'statUp' : 'statDown';
					fila.appendChild(tdLabel);
					fila.appendChild(tdValor);
					tabla.appendChild(fila);
				});
				colDerecha.appendChild(tabla);
			}

			if (colIzquierda.children.length) { cols.appendChild(colIzquierda); }
			if (colDerecha.children.length) { cols.appendChild(colDerecha); }
			return cols;
		}

		function showMateria(materia) {
			selected.innerHTML = '';
			const row = document.createElement('div');
			row.className = 'selectedSkill';
			var orb = document.createElement('span');
			orb.className = 'orb orbSprite';
			orb.style.width = '22px';
			orb.style.height = '22px';
			aplicarOrbSprite(orb, materia.color);
			row.appendChild(orb);
			const nombre = document.createElement('span');
			nombre.textContent = materia.nombre;
			row.appendChild(nombre);
			selected.appendChild(row);
			selected.appendChild(buildStars(materia.estrellas, materia.color));
			selected.appendChild(buildApBlock(materia));
			selected.appendChild(buildDetailCols(materia));
			highlightSlots(materia.nombre);
		}

		function buildList() {
			list.innerHTML = '';
			materias.forEach(function (materia) {
				const li = document.createElement('li');
				var orb = document.createElement('span');
				orb.className = 'orb orbSprite';
				aplicarOrbSprite(orb, materia.color);
				li.appendChild(orb);
				const nombre = document.createElement('span');
				nombre.textContent = materia.nombre;
				li.appendChild(nombre);

				li.addEventListener('mouseenter', function () {
					description.textContent = materia.descripcion;
					showMateria(materia);
					playSound('slider');
				});

				li.addEventListener('click', function () {
					showMateria(materia);
					if (slotSeleccionado) {
						liberarMateriaDuplicada(materia.nombre, slotSeleccionado.datos);
						slotSeleccionado.datos.color = materia.color;
						slotSeleccionado.datos.nombre = materia.nombre;
						refrescarSlotVisual(slotSeleccionado.el, slotSeleccionado.datos);
						description.textContent = materia.nombre + ' equipada.';
						deseleccionarSlot();
						playSound('materia');
						window.mff7ActualizarStatsYVida();
						sincronizarHpMpMateria();
					} else {
						description.textContent = materia.descripcion;
					}
				});

				list.appendChild(li);
			});
		}

		function open() {
			deseleccionarSlot();
			buildList();
			refrescarEquipoYRanuras();
			sincronizarHpMpMateria();
			description.textContent = hintPorDefecto;
			selected.innerHTML = '&nbsp;';
			openPanel(panel, [header], [card, description, body]);
			document.dispatchEvent(new Event('panelListBuilt'));
		}

		function close() {
			deseleccionarSlot();
			highlightSlots(null);
			closePanel(panel, [header], [card, description, body]);
		}

		menuItem.addEventListener('click', open);
		closeBtn.addEventListener('click', close);
		closeOnEscape(function () { return panel.classList.contains('visible'); }, close);

		// El panel Equipo dispara este evento cada vez que se confirma un cambio
		// de arma/armadura/accesorio, para que Materia se mantenga sincronizado
		// incluso si el panel ya estaba abierto.
		document.addEventListener('equipoActualizado', function () {
			if (panel.classList.contains('visible')) {
				deseleccionarSlot();
				refrescarEquipoYRanuras();
				document.dispatchEvent(new Event('panelListBuilt'));
			}
		});
	})();

	// ----------------------------------------------------------
	// PANEL: EQUIPO (Arma / Armadura / Accesorio)
	// ----------------------------------------------------------
	(function () {
		const panel = document.querySelector('#panelEquipo');
		const header = document.querySelector('#equipoHeader');
		const card = document.querySelector('#equipoCard');
		const description = document.querySelector('#equipoDescription');
		const body = document.querySelector('#equipoBody');
		const list = document.querySelector('#equipoList');
		const closeBtn = document.querySelector('#equipoClose');
		const menuItem = document.querySelector('#menu li[number="3"]');
		const slotsEl = document.querySelector('#equipoSlots');
		const growthEl = document.querySelector('#equipoGrowth');
		const categoriasEls = document.querySelectorAll('#equipoCategorias li');
		const hpValueEl = document.querySelector('#equipoHpValue');
		const mpValueEl = document.querySelector('#equipoMpValue');

		const valorEls = {
			arma: document.querySelector('#equipoValorArma'),
			armadura: document.querySelector('#equipoValorArmadura'),
			accesorio: document.querySelector('#equipoValorAccesorio')
		};

		const statEls = {
			attack: document.querySelector('#statAttack'),
			attackP: document.querySelector('#statAttackP'),
			defense: document.querySelector('#statDefense'),
			defenseP: document.querySelector('#statDefenseP'),
			magicAtk: document.querySelector('#statMagicAtk'),
			magicDefP: document.querySelector('#statMagicDefP')
		};

		const etiquetas = { arma: 'Arma', armadura: 'Armadura', accesorio: 'Accesorio' };
		const hintPorDefecto = 'Elegí Arma, Armadura o Accesorio para ver el equipo disponible.';

		let categoriaActiva = 'arma';

		function buscarItem(categoria, nombre) {
			return equipoItems[categoria].find(function (it) { return it.nombre === nombre; }) || null;
		}

		function actualizarValoresEquipados() {
			Object.keys(equipoActual).forEach(function (categoria) {
				if (valorEls[categoria]) { valorEls[categoria].textContent = equipoActual[categoria]; }
			});
		}

		function mostrarSlots(item) {
			slotsEl.innerHTML = '';
			if (!item) { return; }

			// Si el ítem mostrado es el que está realmente equipado en esta
			// categoría, usamos las ranuras "vivas" del panel Materia (con
			// los colores reales puestos por el jugador) en vez del patrón
			// gris genérico del ítem.
			const ranurasVivas = (item.nombre === equipoActual[categoriaActiva] && window.obtenerRanurasMateriaVivas)
				? window.obtenerRanurasMateriaVivas(categoriaActiva)
				: null;

			item.slots.forEach(function (datosPatron, i) {
				const datos = (ranurasVivas && ranurasVivas[i]) ? ranurasVivas[i] : datosPatron;
				const slot = document.createElement('span');
				slot.className = 'slot' + (datos.linked ? ' linked' : '');
				slot.style.backgroundImage    = "url('Assets/Imagenes/materia-slot.png')";
				slot.style.backgroundSize     = '30px 30px';
				slot.style.backgroundPosition = 'center';
				slot.style.backgroundRepeat   = 'no-repeat';
				slot.classList.toggle('filled', !!datos.color);

				const orbEl = document.createElement('span');
				orbEl.className = 'orbInSlot';
				if (datos.color) {
					aplicarOrbSprite(orbEl, datos.color);
				} else {
					orbEl.classList.add('orbHidden');
				}
				slot.appendChild(orbEl);
				slotsEl.appendChild(slot);
			});
		}

		// Pinta la tabla de stats. Si "preview" es un ítem, muestra
		// "valor actual > valor proyectado" (rojo si baja, amarillo si sube).
		// Si "preview" es null, muestra solo los valores actuales (equipados).
		function mostrarStats(itemActual, itemPreview) {
			const claves = ['attack', 'attackP', 'defense', 'defenseP', 'magicAtk', 'magicDefP'];
			// Solo los stats fijos (no los "%") crecen con el nivel del
			// personaje; los porcentuales son propios del ítem equipado.
			const clavesFijas = ['attack', 'defense', 'magicAtk'];
			const ATAQUE_DEFENSA_POR_NIVEL = 2;
			const nivel = window.mff7Nivel || window.mff7NivelBase || 0;
			const nivelBase = window.mff7NivelBase || nivel;
			const bonoNivel = (nivel - nivelBase) * ATAQUE_DEFENSA_POR_NIVEL;

			claves.forEach(function (clave) {
				const esFija = clavesFijas.indexOf(clave) !== -1;
				const actual = (itemActual ? itemActual.stats[clave] : 0) + (esFija ? bonoNivel : 0);
				const el = statEls[clave];
				el.innerHTML = '';

				if (itemPreview && itemPreview !== itemActual) {
					const proyectado = itemPreview.stats[clave] + (esFija ? bonoNivel : 0);
					const spanActual = document.createElement('span');
					spanActual.className = 'statPreview';
					spanActual.textContent = actual;
					const spanFlecha = document.createElement('span');
					spanFlecha.className = 'statArrow';
					spanFlecha.textContent = '>';
					const spanNuevo = document.createElement('span');
					spanNuevo.textContent = proyectado;
					spanNuevo.className = proyectado > actual ? 'statUp' : (proyectado < actual ? 'statDown' : 'statPreview');
					el.appendChild(spanActual);
					el.appendChild(spanFlecha);
					el.appendChild(spanNuevo);
				} else {
					el.textContent = actual;
				}
			});
		}

		function refrescarCabecera(itemMostrado) {
			mostrarSlots(itemMostrado);
			growthEl.textContent = 'Normal';
		}

		function seleccionarCategoria(categoria) {
			categoriaActiva = categoria;
			categoriasEls.forEach(function (li) {
				li.classList.toggle('activeCategoria', li.dataset.categoria === categoria);
			});

			const itemEquipado = buscarItem(categoria, equipoActual[categoria]);
			refrescarCabecera(itemEquipado);
			mostrarStats(itemEquipado, null);
			description.textContent = itemEquipado ? itemEquipado.descripcion : hintPorDefecto;
			buildList(categoria, itemEquipado);
		}

		function buildList(categoria, itemEquipado) {
			list.innerHTML = '';
			equipoItems[categoria].forEach(function (item) {
				const li = document.createElement('li');
				li.textContent = item.nombre;
				li.classList.toggle('filled', item.nombre === equipoActual[categoria]);

				li.addEventListener('mouseenter', function () {
					description.textContent = item.descripcion;
					refrescarCabecera(item);
					mostrarStats(itemEquipado, item);
				});

				li.addEventListener('mouseleave', function () {
					refrescarCabecera(itemEquipado);
					mostrarStats(itemEquipado, null);
				});

				li.addEventListener('click', function () {
					equipoActual[categoria] = item.nombre;
					actualizarValoresEquipados();
					description.textContent = item.nombre + ' equipado.';
					seleccionarCategoria(categoria);
					document.dispatchEvent(new Event('equipoActualizado'));
					playSound('materia');
				});

				list.appendChild(li);
			});

			// La lista se reconstruye en cada cambio de categoría o de ítem
			// equipado (innerHTML = ''), lo que perdía los listeners de
			// cursor (mano) y sonido. Redisparamos el rebind cada vez.
			document.dispatchEvent(new Event('panelListBuilt'));
		}

		categoriasEls.forEach(function (li) {
			li.addEventListener('click', function () {
				seleccionarCategoria(li.dataset.categoria);
			});
			li.addEventListener('mouseenter', function () {
				const itemEquipado = buscarItem(li.dataset.categoria, equipoActual[li.dataset.categoria]);
				description.textContent = etiquetas[li.dataset.categoria] + ': ' + (itemEquipado ? itemEquipado.nombre : '—');
				playSound('slider');
			});
		});

		function open() {
			actualizarValoresEquipados();
			seleccionarCategoria(categoriaActiva);
			const eqHpBarEl = document.querySelector('#equipoHpBar');
			const eqMpBarEl = document.querySelector('#equipoMpBar');
			sincronizarHpMp(hpValueEl, mpValueEl, eqHpBarEl, eqMpBarEl);
			openPanel(panel, [header], [card, description, body]);
			document.dispatchEvent(new Event('panelListBuilt'));
		}

		function close() {
			closePanel(panel, [header], [card, description, body]);
		}

		menuItem.addEventListener('click', open);
		closeBtn.addEventListener('click', close);
		closeOnEscape(function () { return panel.classList.contains('visible'); }, close);
	})();

	// ----------------------------------------------------------
	// PANEL: ESTADO (resumen de solo lectura: stats de personaje,
	// stats de combate y el equipo/materia puestos ahora mismo)
	// ----------------------------------------------------------
	(function () {
		const panel = document.querySelector('#panelEstado');
		const header = document.querySelector('#estadoHeader');
		const card = document.querySelector('#estadoCard');
		const body = document.querySelector('#estadoBody');
		const closeBtn = document.querySelector('#estadoClose');
		const menuItem = document.querySelector('#menu li[number="9"]');

		const hpValueEl = document.querySelector('#estadoHpValue');
		const mpValueEl = document.querySelector('#estadoMpValue');
		const levelEl = document.querySelector('#estadoLevel');

		const expValorEl = document.querySelector('#estadoExpValor');
		const expSiguienteEl = document.querySelector('#estadoExpSiguienteValor');
		const expBarEl = document.querySelector('#estadoExpBar');
		const limiteValorEl = document.querySelector('#estadoLimiteValor');
		const limitBarEl = document.querySelector('#estadoLimitBar');

		const tablaStatsEl = document.querySelector('#estadoStatsPersonaje');
		const tablaCombateEl = document.querySelector('#estadoStatsCombate');
		const nombreArmaEl = document.querySelector('#estadoNombreArma');
		const nombreArmaduraEl = document.querySelector('#estadoNombreArmadura');
		const nombreAccesorioEl = document.querySelector('#estadoNombreAccesorio');
		const slotsArmaEl = document.querySelector('#estadoSlotsArma');
		const slotsArmaduraEl = document.querySelector('#estadoSlotsArmadura');

		// Etiquetas en español de los 6 stats fijos de personaje (mismos
		// que statsBase / mapaEfectoStat, usados también en el panel Materia).
		const etiquetasStat = {
			strength: 'Fuerza', dexterity: 'Rapidez', vitality: 'Resistencia',
			magic: 'Magia', spirit: 'Espíritu', luck: 'Suerte'
		};
		const ordenStats = ['strength', 'dexterity', 'vitality', 'magic', 'spirit', 'luck'];

		function buscarItem(categoria, nombre) {
			return (equipoItems[categoria] || []).find(function (it) { return it.nombre === nombre; }) || null;
		}

		function fila(label, valor) {
			const tr = document.createElement('tr');
			const tdLabel = document.createElement('td');
			tdLabel.textContent = label;
			const tdValor = document.createElement('td');
			tdValor.textContent = valor;
			tr.appendChild(tdLabel);
			tr.appendChild(tdValor);
			return tr;
		}

		// Ranuras de materia "de solo lectura" (sin click ni selección):
		// reutiliza los colores reales puestos en el panel Materia si ya
		// se inicializó, para que Arma/Prot. se vean igual que ahí.
		function pintarSlotsSoloLectura(container, categoria) {
			if (!container) { return; }
			container.innerHTML = '';
			const item = buscarItem(categoria, equipoActual[categoria]);
			if (!item) { return; }
			const ranurasVivas = window.obtenerRanurasMateriaVivas ? window.obtenerRanurasMateriaVivas(categoria) : null;
			item.slots.forEach(function (datosPatron, i) {
				const datos = (ranurasVivas && ranurasVivas[i]) ? ranurasVivas[i] : datosPatron;
				const slot = document.createElement('span');
				slot.className = 'slot' + (datos.linked ? ' linked' : '');
				slot.style.backgroundImage    = "url('Assets/Imagenes/materia-slot.png')";
				slot.style.backgroundSize     = '30px 30px';
				slot.style.backgroundPosition = 'center';
				slot.style.backgroundRepeat   = 'no-repeat';
				slot.classList.toggle('filled', !!datos.color);
				const orbEl = document.createElement('span');
				orbEl.className = 'orbInSlot';
				if (datos.color) {
					aplicarOrbSprite(orbEl, datos.color);
				} else {
					orbEl.classList.add('orbHidden');
				}
				slot.appendChild(orbEl);
				container.appendChild(slot);
			});
		}

		// Los 6 stats fijos: base + bono plano de toda la materia equipada
		// ahora mismo (misma fuente que usa el panel Materia).
		function actualizarStatsPersonaje() {
			tablaStatsEl.innerHTML = '';
			const bonos = window.mff7ObtenerBonosMateria ? window.mff7ObtenerBonosMateria() : { flatStats: {} };
			ordenStats.forEach(function (clave) {
				const bono = (bonos.flatStats && bonos.flatStats[clave]) || 0;
				const total = statsBase[clave] + bono;
				tablaStatsEl.appendChild(fila(etiquetasStat[clave], total));
			});
		}

		// Stats de combate combinando Arma + Prot. + Acces. a la vez (a
		// diferencia del panel Equipo, que muestra una categoría por vez):
		// los valores fijos (Ataque/Defensa/Ataque mágico) se suman entre
		// los 3 ítems y suman también el bono de nivel; los porcentuales
		// (Puntería/Evasión/Defensa mágica) se promedian entre los 3.
		function actualizarStatsCombate() {
			tablaCombateEl.innerHTML = '';
			const items = [
				buscarItem('arma', equipoActual.arma),
				buscarItem('armadura', equipoActual.armadura),
				buscarItem('accesorio', equipoActual.accesorio)
			].filter(Boolean);

			const ATAQUE_DEFENSA_POR_NIVEL = 2;
			const nivel = window.mff7Nivel || window.mff7NivelBase || 0;
			const nivelBase = window.mff7NivelBase || nivel;
			const bonoNivel = (nivel - nivelBase) * ATAQUE_DEFENSA_POR_NIVEL;

			function sumar(clave) {
				return items.reduce(function (acc, it) { return acc + (it.stats[clave] || 0); }, 0);
			}
			function promedio(clave) {
				if (!items.length) { return 0; }
				return Math.round(sumar(clave) / items.length);
			}

			tablaCombateEl.appendChild(fila('Ataque', sumar('attack') + bonoNivel));
			tablaCombateEl.appendChild(fila('Puntería', promedio('attackP')));
			tablaCombateEl.appendChild(fila('Defensa', sumar('defense') + bonoNivel));
			tablaCombateEl.appendChild(fila('Evasión', promedio('defenseP')));
			tablaCombateEl.appendChild(fila('Ataque mágico', sumar('magicAtk') + bonoNivel));
			tablaCombateEl.appendChild(fila('Defensa mágica', promedio('magicDefP')));
			tablaCombateEl.appendChild(fila('Evasión mágica', 0));
		}

		function actualizarEquipo() {
			if (nombreArmaEl) { nombreArmaEl.textContent = equipoActual.arma; }
			if (nombreArmaduraEl) { nombreArmaduraEl.textContent = equipoActual.armadura; }
			if (nombreAccesorioEl) { nombreAccesorioEl.textContent = equipoActual.accesorio; }
			pintarSlotsSoloLectura(slotsArmaEl, 'arma');
			pintarSlotsSoloLectura(slotsArmaduraEl, 'armadura');
		}

		// "EXP"/"Siguiente nivel": días vividos y días que faltan para el
		// próximo cumpleaños/nivel (mismos datos que llenan la barra "Next
		// level" de la tarjeta principal, ver actualizarNivelPorEdad()).
		function actualizarExp() {
			const ancho = window.mff7AnchoTrackLevelBar || 180;
			if (expValorEl) { expValorEl.textContent = (window.mff7DiasVividos || 0) + ' días'; }
			if (expSiguienteEl) { expSiguienteEl.textContent = (window.mff7DiasSiguiente || 0) + ' días'; }
			if (expBarEl) { expBarEl.style.width = ((window.mff7Progreso || 0) * ancho) + 'px'; }
		}

		// "Nivel de Límite": se refleja tal cual desde la tarjeta principal
		// (mismo número y mismo estado de barra: Normal/Furia/Tristeza/Break),
		// para no duplicar ese dato a mano en dos lugares distintos.
		function actualizarLimite() {
			const mainLimitTd = document.querySelector('#firstLimitLevel');
			const mainLimitBar = document.querySelector('#firstLimitBar');
			if (limiteValorEl && mainLimitTd) {
				const texto = mainLimitTd.textContent.replace(/\u00a0/g, ' ');
				const match = texto.match(/(\d+)\s*$/);
				limiteValorEl.textContent = match ? match[1] : texto.trim();
			}
			if (limitBarEl) {
				limitBarEl.classList.remove('estadoLimitBreak', 'estadoLimitFury', 'estadoLimitSadness', 'estadoLimitNormal');
				let estadoClase = 'estadoLimitNormal';
				if (mainLimitBar) {
					if (mainLimitBar.classList.contains('limitBarBreak')) { estadoClase = 'estadoLimitBreak'; }
					else if (mainLimitBar.classList.contains('limitBarFury')) { estadoClase = 'estadoLimitFury'; }
					else if (mainLimitBar.classList.contains('limitBarSadness')) { estadoClase = 'estadoLimitSadness'; }
				}
				limitBarEl.classList.add(estadoClase);
			}
		}

		function open() {
			if (levelEl) { levelEl.textContent = window.mff7Nivel || levelEl.textContent; }
			actualizarStatsPersonaje();
			actualizarStatsCombate();
			actualizarEquipo();
			actualizarExp();
			actualizarLimite();
			const estHpBarEl = document.querySelector('#estadoHpBar');
			const estMpBarEl = document.querySelector('#estadoMpBar');
			sincronizarHpMp(hpValueEl, mpValueEl, estHpBarEl, estMpBarEl);
			openPanel(panel, [header], [card, body]);
		}

		function close() {
			closePanel(panel, [header], [card, body]);
		}

		menuItem.addEventListener('click', open);
		closeBtn.addEventListener('click', close);
		closeOnEscape(function () { return panel.classList.contains('visible'); }, close);
	})();
	(function () {
		const panel = document.querySelector('#panelHistoria');
		const header = document.querySelector('#historiaHeader');
		const headerTitle = document.querySelector('#historiaHeaderTitle');
		const closeBtn = document.querySelector('#historiaClose');
		const menuItem = document.querySelector('#menu li[number="1"]');

		const stepSelect = document.querySelector('#historiaStepSelect');
		const stepLoading = document.querySelector('#historiaStepLoading');
		const stepList = document.querySelector('#historiaStepList');
		const loadBar = document.querySelector('#historiaLoadBar');
		const fileTag = document.querySelector('#historiaFileTag');
		const cardsEl = document.querySelector('#historiaCards');

		const btnWork = document.querySelector('#historiaChoiceWork');
		const btnEducation = document.querySelector('#historiaChoiceEducation');

		let loadTimeout1 = null;
		let loadTimeout2 = null;
		let loadTimeoutRed = null;

		function showStep(stepEl) {
			[stepSelect, stepLoading, stepList].forEach(function (s) { s.classList.remove('show'); });
			stepEl.classList.add('show');
		}

		function buildCard(item) {
			const card = document.createElement('div');
			card.className = 'historiaCard';

			if (item.vacio) {
				card.innerHTML = '';
				const empty = document.createElement('div');
				empty.className = 'historiaCardEmpty';
				empty.textContent = 'EMPTY';
				card.style.justifyContent = 'center';
				card.appendChild(empty);
				return card;
			}

			const logo = document.createElement('div');
			logo.className = 'historiaCardLogo';
			if (item.logo) {
				const img = document.createElement('img');
				img.src = item.logo;
				img.alt = item.logoTexto || '';
				logo.appendChild(img);
			} else {
				logo.textContent = item.logoTexto || '';
			}

			const photo = document.createElement('img');
			photo.className = 'historiaCardPhoto';
			photo.src = './Assets/Imagenes/potrait.png';
			photo.alt = '';

			const info = document.createElement('div');
			info.className = 'historiaCardInfo';
			const nameEl = document.createElement('div');
			nameEl.textContent = 'Matías Errico';
			const lvEl = document.createElement('div');
			lvEl.className = 'lv';
			lvEl.innerHTML = 'LV <span style="color:#fff;">' + (item.nivel !== null ? item.nivel : '') + '</span>';
			info.appendChild(nameEl);
			info.appendChild(lvEl);

			const right = document.createElement('div');
			right.className = 'historiaCardRight';

			const roleRow = document.createElement('div');
			roleRow.className = 'historiaCardRoleRow';
			const roleLabelCol = document.createElement('div');
			roleLabelCol.innerHTML = '<div class="historiaCardRoleLabel">Rol</div><div class="historiaCardRoleLabel" style="margin-top:6px;">Años</div>';
			const roleValCol = document.createElement('div');
			roleValCol.innerHTML = '<div>' + item.rol + '</div><div style="margin-top:6px;">' + item.años + '</div>';
			roleRow.appendChild(roleLabelCol);
			roleRow.appendChild(roleValCol);

			const orgEl = document.createElement('div');
			orgEl.className = 'historiaCardOrg';
			orgEl.textContent = item.organizacion;

			right.appendChild(roleRow);
			right.appendChild(orgEl);

			card.appendChild(logo);
			card.appendChild(photo);
			card.appendChild(info);
			card.appendChild(right);
			card.addEventListener('click', function () { playSound('saveSelect'); });
			card.addEventListener('mouseenter', function () {
				var cursorEl = document.querySelector('#ff7Cursor');
				if (cursorEl) {
					var scale = window.mff7Scale || 1;
					var scalerRect = (document.querySelector('#viewportScaler') || document.body).getBoundingClientRect();
					var rect = card.getBoundingClientRect();
					cursorEl.style.top  = ((rect.top  - scalerRect.top)  / scale + rect.height / scale / 2 - 15) + 'px';
					cursorEl.style.left = ((rect.left - scalerRect.left) / scale - 62) + 'px';
					cursorEl.classList.add('visible');
				}
				playSound('slider');
			});
			card.addEventListener('mouseleave', function () {
				var cursorEl = document.querySelector('#ff7Cursor');
				if (cursorEl) cursorEl.classList.remove('visible');
			});
			return card;
		}

		function buildList(items, tag) {
			cardsEl.innerHTML = '';
			fileTag.textContent = tag;
			items.forEach(function (item) {
				cardsEl.appendChild(buildCard(item));
			});
		}

		function startFlow(items, tag) {
			showStep(stepLoading);
			loadBar.style.width = '0%';
			loadBar.classList.remove('red');
			clearTimeout(loadTimeout1);
			clearTimeout(loadTimeout2);
			clearTimeout(loadTimeoutRed);
			window.requestAnimationFrame(function () {
				loadTimeout1 = setTimeout(function () {
					loadBar.style.width = '100%';
				}, 50);
			});
			// Último tramo de la carga: la barra se pone roja justo antes de llegar al 100%.
			loadTimeoutRed = setTimeout(function () {
				loadBar.classList.add('red');
			}, 1000);
			loadTimeout2 = setTimeout(function () {
				buildList(items, tag);
				showStep(stepList);
				playSound('save');
			}, 1300);
		}

		function open() {
			showStep(stepSelect);
			openPanel(panel, [header], [panel]);
		}

		function close() {
			clearTimeout(loadTimeout1);
			clearTimeout(loadTimeout2);
			closePanel(panel, [header], [panel]);
		}

		[btnWork, btnEducation].forEach(function(btn) {
			btn.addEventListener('mouseenter', function () {
				var cursorEl = document.querySelector('#ff7Cursor');
				if (!cursorEl) return;
				var scale = window.mff7Scale || 1;
				var scalerRect = (document.querySelector('#viewportScaler') || document.body).getBoundingClientRect();
				var rect = btn.getBoundingClientRect();
				cursorEl.style.top  = ((rect.top  - scalerRect.top)  / scale + rect.height / scale / 2 - 15) + 'px';
				cursorEl.style.left = ((rect.left - scalerRect.left) / scale - 62) + 'px';
				cursorEl.classList.add('visible');
				playSound('slider');
			});
			btn.addEventListener('mouseleave', function () {
				var cursorEl = document.querySelector('#ff7Cursor');
				if (cursorEl) cursorEl.classList.remove('visible');
			});
		});
		btnWork.addEventListener('click', function () { startFlow(historiaTrabajo, 'FILE 01'); });
		btnEducation.addEventListener('click', function () { startFlow(historiaEducacion, 'FILE 02'); });

		menuItem.addEventListener('click', open);
		closeBtn.addEventListener('click', close);
		closeOnEscape(function () { return panel.classList.contains('visible'); }, close);
	})();

	// ----------------------------------------------------------
	// PANEL: CONFIG
	// ----------------------------------------------------------
	(function () {
		const panel = document.querySelector('#panelConfig');
		const header = document.querySelector('#configHeader');
		const headerUse = document.querySelector('#configUse');
		const body = document.querySelector('#configBody');
		const closeBtn = document.querySelector('#configClose');
		const menuItem = document.querySelector('#menu li[number="8"]');

		const swatchBtn = document.querySelector('#configSwatchBtn');
		const colorPicker = document.querySelector('#colorPicker');
		const resetBtn = document.querySelector('#colorReset');
		const rngR = document.querySelector('#rngR');
		const rngG = document.querySelector('#rngG');
		const rngB = document.querySelector('#rngB');
		const valR = document.querySelector('#valR');
		const valG = document.querySelector('#valG');
		const valB = document.querySelector('#valB');
		const soundToggle = document.querySelector('#soundToggle');
		const crtToggle = document.querySelector('#crtToggle');
		const rngVolumen = document.querySelector('#rngVolumen');
		const valVolumen = document.querySelector('#valVolumen');

		const hintPorDefecto = 'Pasa el cursor sobre una opción para ver más información.';

		let colorActual = Object.assign({}, preferencias.color);
		let sonidoActivado = preferencias.sonido;
		let crtActivado = preferencias.crt;

		function pad3(n) { return String(n).padStart(3, '0'); }

		// Sustituir letras R/G/B del colorPicker por sprites
		// rgb-spritesheet.png: 33x8, 3 frames de 11x8 → R(x=0), G(x=11), B(x=22)
		(function() {
			var chans = document.querySelectorAll('.colorPicker .chan');
			var rgbOffsets = { 'R': 0, 'G': 11, 'B': 22 };
			var escala = 1.6; // factor de agrandado del sprite (base 11x8)
			chans.forEach(function(span) {
				var letra = span.textContent.trim();
				var ox = rgbOffsets[letra];
				if (ox === undefined) return;
				span.textContent = '';
				span.style.display = 'inline-block';
				span.style.width = (11 * escala) + 'px';
				span.style.height = (8 * escala) + 'px';
				span.style.backgroundImage = "url('Assets/Imagenes/rgb-spritesheet.png')";
				span.style.backgroundSize = (33 * escala) + 'px ' + (8 * escala) + 'px';
				span.style.backgroundPosition = '-' + (ox * escala) + 'px 0px';
				span.style.backgroundRepeat = 'no-repeat';
				span.style.imageRendering = 'pixelated';
				span.style.verticalAlign = 'middle';
			});
		})();

		function actualizarSliders() {
			rngR.value = colorActual.r; valR.textContent = pad3(colorActual.r);
			rngG.value = colorActual.g; valG.textContent = pad3(colorActual.g);
			rngB.value = colorActual.b; valB.textContent = pad3(colorActual.b);
		}

		function guardarColor() {
			try { localStorage.setItem('mff7_color', JSON.stringify(colorActual)); } catch (e) {}
		}

		function actualizarToggleVisual(toggleEl, valorActivo) {
			toggleEl.querySelectorAll('span').forEach(function (span) {
				span.classList.toggle('active', span.dataset.value === valorActivo);
			});
		}

		// ---- Color de ventana ----
		swatchBtn.addEventListener('click', function () {
			colorPicker.classList.toggle('show');
			actualizarSliders();
		});

		let ultimoSonidoSlider = 0;
		[[rngR, 'r', valR], [rngG, 'g', valG], [rngB, 'b', valB]].forEach(function (grupo) {
			const input = grupo[0], canal = grupo[1], etiqueta = grupo[2];
			input.addEventListener('mouseenter', function () { playSound('slider'); });
			input.addEventListener('input', function () {
				colorActual[canal] = parseInt(input.value, 10);
				etiqueta.textContent = pad3(colorActual[canal]);
				aplicarColorVentana(colorActual.r, colorActual.g, colorActual.b);
				guardarColor();
				// Sonido también al arrastrar el slider (izquierda o derecha),
				// con un pequeño throttle para que no se solape el audio.
				const ahora = Date.now();
				if (ahora - ultimoSonidoSlider > 60) {
					playSound('slider');
					ultimoSonidoSlider = ahora;
				}
			});
		});

		resetBtn.addEventListener('mouseenter', function () { playSound('slider'); });
		resetBtn.addEventListener('click', function () {
			colorActual = Object.assign({}, coloresPorDefecto);
			actualizarSliders();
			aplicarColorVentana(colorActual.r, colorActual.g, colorActual.b);
			guardarColor();
		});

		// ---- Sonido ----
		actualizarToggleVisual(soundToggle, sonidoActivado ? 'on' : 'off');
		soundToggle.querySelectorAll('span').forEach(function (span) {
			span.addEventListener('click', function () {
				sonidoActivado = span.dataset.value === 'on';
				actualizarToggleVisual(soundToggle, sonidoActivado ? 'on' : 'off');
				try { localStorage.setItem('mff7_sonido', sonidoActivado ? '1' : '0'); } catch (e) {}
			});
		});

		// ---- Volumen ----
		let volumenActual = preferencias.volumen;
		rngVolumen.value = Math.round(volumenActual * 100);
		valVolumen.textContent = pad3(Math.round(volumenActual * 100));

		let ultimoSonidoVolumen = 0;
		rngVolumen.addEventListener('mouseenter', function () { playSound('slider'); });
		rngVolumen.addEventListener('input', function () {
			volumenActual = parseInt(rngVolumen.value, 10) / 100;
			valVolumen.textContent = pad3(parseInt(rngVolumen.value, 10));
			aplicarVolumen(volumenActual);
			try { localStorage.setItem('mff7_volumen', String(volumenActual)); } catch (e) {}
			// Sonido al arrastrar, con throttle para que no se solape el audio,
			// y usando el volumen recién aplicado (se nota el cambio al instante).
			const ahora = Date.now();
			if (ahora - ultimoSonidoVolumen > 60) {
				playSound('slider');
				ultimoSonidoVolumen = ahora;
			}
		});

		// ---- Efecto CRT ----
		actualizarToggleVisual(crtToggle, crtActivado ? 'on' : 'off');
		crtToggle.querySelectorAll('span').forEach(function (span) {
			span.addEventListener('click', function () {
				const estabaApagado = !crtActivado;
				crtActivado = span.dataset.value === 'on';
				actualizarToggleVisual(crtToggle, crtActivado ? 'on' : 'off');
				aplicarCrt(crtActivado);
				if (estabaApagado && crtActivado) { reproducirEncendidoCrt(); }
				try { localStorage.setItem('mff7_crt', crtActivado ? '1' : '0'); } catch (e) {}
			});
		});

		// ---- Texto de ayuda según la fila que se sobrevuele ----
		document.querySelectorAll('#configBody .configRow').forEach(function (fila) {
			fila.addEventListener('mouseenter', function () {
				headerUse.textContent = fila.dataset.hint || hintPorDefecto;
				playSound('slider');
			});
		});

		function open() {
			colorPicker.classList.remove('show');
			headerUse.textContent = hintPorDefecto;
			actualizarSliders();
			openPanel(panel, [headerUse, header], [body]);
		}

		function close() {
			closePanel(panel, [headerUse, header], [body]);
		}

		menuItem.addEventListener('click', open);
		closeBtn.addEventListener('click', close);
		closeOnEscape(function () { return panel.classList.contains('visible'); }, close);
	})();

	// ----------------------------------------------------------
	// DAÑO AL HACER CLICK EN LA FOTO + KO + REVIVIR (gasta MP)
	// ----------------------------------------------------------
	(function () {
		const photoContainer = document.querySelector('#firstPhotoContainer');
		const photo = document.querySelector('#firstPosition');
		const hpMinEl = document.querySelector('#firstHpMin');
		const hpMaxEl = document.querySelector('#firstHpMax');
		const hpBarEl = document.querySelector('#firstHpBar');
		const mpMinEl = document.querySelector('#firstMpMin');
		const mpMaxEl = document.querySelector('#firstMpMax');
		const mpBarEl = document.querySelector('#firstMpBar');
		const reviveBtn = document.querySelector('#firstReviveBtn');

		if (!photoContainer || !photo || !hpMinEl || !hpMaxEl) return;

		// Lee los valores actuales desde el HTML (admite "2.050" con punto de mil).
		function leerNumero(texto) {
			return parseInt(String(texto).replace(/[^\d]/g, ''), 10) || 0;
		}

		function formatearNumero(n) {
			return n.toLocaleString('es-ES');
		}

		let hpMax = leerNumero(hpMaxEl.textContent);
		let mpMax = leerNumero(mpMaxEl.textContent);
		let hpActual = leerNumero(hpMinEl.textContent.replace('/', ''));
		let mpActual = leerNumero(mpMinEl.textContent.replace('/', ''));
		let estaKO = false;

		// Costo de MP al revivir: aleatorio dentro de un rango razonable.
		const MP_REVIVE_MIN = 25;
		const MP_REVIVE_MAX = 45;

		function actualizarHpTexto() {
			hpMinEl.textContent = formatearNumero(hpActual) + '/';
			if (hpBarEl) { hpBarEl.style.width = Math.max(0, (hpActual / hpMax) * 145) + 'px'; }
			hpMinEl.classList.toggle('hpBajo', !estaKO && hpActual <= hpMax * 0.25);
			hpMinEl.style.color = estaKO ? '#ff2020' : (hpActual <= hpMax * 0.25 ? '#f5e642' : '');
		}

		function actualizarMpTexto() {
			mpMinEl.textContent = formatearNumero(mpActual) + '/';
			if (mpBarEl) { mpBarEl.style.width = Math.max(0, (mpActual / mpMax) * 145) + 'px'; }
		}

		function mostrarNumeroDaño(valor, esKO, esCritico) {
			const numero = document.createElement('div');
			numero.className = 'damageNumber' + (esKO ? ' ko' : (hpActual <= hpMax * 0.25 ? ' low' : ''));
			if (esCritico) { numero.classList.add('crit'); }
			numero.textContent = esCritico ? '★ ' + valor : valor;
			photoContainer.appendChild(numero);
			numero.addEventListener('animationend', function () { numero.remove(); });
		}

		function entrarEnKO() {
			estaKO = true;
			photo.classList.add('ko');
			actualizarHpTexto();
			playSound('delete');
			if (reviveBtn) {
				reviveBtn.classList.add('show');
				actualizarEstadoRevive();
			}
		}

		// Si no queda suficiente MP para pagar el revivir, el botón se anula
		// (no se puede volver a hacer click ni revivir nunca más).
		function actualizarEstadoRevive() {
			if (!reviveBtn) return;
			const sinMp = mpActual < MP_REVIVE_MIN;
			reviveBtn.classList.toggle('disabled', sinMp);
		}

		// Llamado desde el sistema de materia cada vez que se equipa/desequipa
		// algo con efecto de MaxHP/MaxMP: reescala la vida y magia actuales
		// en la misma proporción que tenían (no las llena ni las vacía de
		// golpe), y refresca el texto y las barras en la tarjeta principal
		// (de ahí lo toman el resto de paneles al abrirse).
		function ajustarVidaMaxima(nuevoHpMax, nuevoMpMax) {
			hpActual = estaKO ? 0 : (hpMax > 0 ? Math.round((hpActual / hpMax) * nuevoHpMax) : nuevoHpMax);
			hpMax = nuevoHpMax;
			hpActual = Math.min(hpActual, hpMax);

			mpActual = mpMax > 0 ? Math.round((mpActual / mpMax) * nuevoMpMax) : nuevoMpMax;
			mpMax = nuevoMpMax;
			mpActual = Math.min(mpActual, mpMax);

			hpMaxEl.textContent = hpMax;
			mpMaxEl.textContent = mpMax;
			actualizarHpTexto();
			actualizarMpTexto();
			actualizarEstadoRevive();
		}
		window.mff7AjustarVidaMaxima = ajustarVidaMaxima;

		function golpear() {
			if (estaKO) { playSound('error'); return; } // ya está en KO: sonido de error

			const esCritico = Math.random() < 0.20; // 20% de probabilidad
			let daño = Math.floor(Math.random() * (hpActual > 0 ? Math.max(50, Math.floor(hpMax * 0.35)) : 0)) + 40;
			if (esCritico) { daño = Math.floor(daño * 2.0); } // el doble de daño
			const nuevoHp = Math.max(0, hpActual - daño);
			const esKO = nuevoHp === 0;

			hpActual = nuevoHp;
			if (esCritico) {
				playSound('crit');
			} else {
				playSound('slash');
			}
			mostrarNumeroDaño(daño, esKO, esCritico);

			if (esKO) {
				entrarEnKO();
			} else {
				actualizarHpTexto();
			}
		}

		function revivir() {
			if (!estaKO) return;
			if (reviveBtn && reviveBtn.classList.contains('disabled')) return; // sin MP suficiente: no se puede revivir
			playSound('currar');

			const costoMp = Math.min(mpActual, Math.floor(Math.random() * (MP_REVIVE_MAX - MP_REVIVE_MIN + 1)) + MP_REVIVE_MIN);
			mpActual = Math.max(0, mpActual - costoMp);
			actualizarMpTexto();

			hpActual = hpMax;
			estaKO = false;
			photo.classList.remove('ko');
			reviveBtn.classList.remove('show');
			actualizarHpTexto();
		}

		photoContainer.addEventListener('click', golpear);
		if (reviveBtn) {
			reviveBtn.addEventListener('click', function (e) {
				e.stopPropagation();
				revivir();
			});
		}

		actualizarHpTexto();
		actualizarMpTexto();
	})();

	// ----------------------------------------------------------
	// CURSOR FF7: flecha que aparece a la izquierda del ítem bajo hover
	// ----------------------------------------------------------
	(function () {
		// Crear el elemento de cursor una sola vez
		var cursorEl = document.createElement('div');
		cursorEl.id = 'ff7Cursor';
		var scalerHost = document.querySelector('#viewportScaler') || document.body;
		scalerHost.appendChild(cursorEl);
		// El cursor se crea después de la primera llamada a aplicarCrt() (esa
		// corrió cuando el cursor todavía no existía). Volvemos a llamarla
		// ahora para que el cursor quede sincronizado con el estado real del
		// CRT desde el primer momento, sin duplicar la lógica del toggle.
		aplicarCrt(preferencias.crt);

		var currentTarget = null;

		function mostrarCursor(li) {
			if (currentTarget === li) return;
			currentTarget = li;
			var rect = li.getBoundingClientRect();
			var scale = window.mff7Scale || 1;
			var scalerRect = (document.querySelector('#viewportScaler') || document.body).getBoundingClientRect();
			var top = ((rect.top - scalerRect.top) / scale) + (rect.height / scale / 2) - 15;
			var left = ((rect.left - scalerRect.left) / scale) - 62;
			cursorEl.style.top  = top  + 'px';
			cursorEl.style.left = left + 'px';
			cursorEl.classList.add('visible');
		}

		function ocultarCursor() {
			currentTarget = null;
			cursorEl.classList.remove('visible');
		}

		// Aplicar a todos los li interactivos del menú principal, las listas
		// de paneles, y los slots de materia/equipo (arma, armadura, accesorio).
		function bindMenuItems() {
			document.querySelectorAll('#menu li, .panelList li, .slot, #configBody .configRow').forEach(function (li) {
				li.addEventListener('mouseenter', function () { mostrarCursor(li); playSound('slider'); });
				li.addEventListener('mouseleave', ocultarCursor);
			});
		}

		bindMenuItems();

		// Re-bind cuando se abra un panel (las listas se generan dinámicamente)
		document.addEventListener('panelListBuilt', bindMenuItems);

		// Ocultar si el mouse sale del área clickeable
		document.addEventListener('mouseleave', ocultarCursor);
	})();

	// ----------------------------------------------------------
	// RELOJ DE TIEMPO (arranca en 0:00:00 al cargar la página)
	// ----------------------------------------------------------
	(function () {
		const elemento = document.querySelector('#currentTime');
		if (!elemento) return;

		const inicio = Date.now();

		function dosDigitos(n) { return String(n).padStart(2, '0'); }

		function formatear(totalSegundos) {
			const horas = Math.floor(totalSegundos / 3600);
			const minutos = Math.floor((totalSegundos % 3600) / 60);
			const segundos = totalSegundos % 60;
			return horas + '<span class="timeColon">:</span>' + dosDigitos(minutos) + '<span class="timeColon">:</span>' + dosDigitos(segundos);
		}

		function actualizar() {
			const totalSegundos = Math.floor((Date.now() - inicio) / 1000);
			elemento.innerHTML = formatear(totalSegundos);
		}

		actualizar();
		setInterval(actualizar, 1000);
	})();


	// ----------------------------------------------------------
	// CÓDIGO KONAMI: ↑↑↓↓←→←→BA → Victory fanfare
	// ----------------------------------------------------------
	(function () {
		const KONAMI = [
			'ArrowUp','ArrowUp','ArrowDown','ArrowDown',
			'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight',
			'b','a'
		];
		let idx = 0;
		document.addEventListener('keydown', function (e) {
			if (e.key === KONAMI[idx]) {
				idx++;
				if (idx === KONAMI.length) {
					playSound('victory');
					idx = 0;
				}
			} else {
				idx = e.key === KONAMI[0] ? 1 : 0;
			}
		});
	})();

});
