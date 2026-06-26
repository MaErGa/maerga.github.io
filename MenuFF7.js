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

	function applyScale() {
		var scaler = document.querySelector('#viewportScaler');
		if (!scaler) return;

		var vw = window.innerWidth;
		var vh = window.innerHeight;

		// Factor de escala: el mayor posible que permita que el lienzo
		// completo entre en el viewport, sin recortarlo.
		var scale = Math.min(vw / CANVAS_W, vh / CANVAS_H);

		// No agrandamos más allá del tamaño original (evita verse borroso
		// o "gigante" en monitores muy anchos); en PC normal esto da 1.
		scale = Math.min(scale, 1);

		window.mff7Scale = scale;
		scaler.style.transform = 'scale(' + scale + ')';
	}

	// Aplicar apenas el HTML esté listo (antes de que se vea el flash sin escalar)
	document.addEventListener('DOMContentLoaded', applyScale);
	// Recalcular en cualquier cambio de tamaño u orientación
	window.addEventListener('resize', applyScale);
	window.addEventListener('orientationchange', applyScale);
	// Primer cálculo inmediato (por si DOMContentLoaded ya pasó)
	applyScale();
})();



// Proyectos: "link" puede quedar vacío ("") si todavía no lo tenés.
const proyectos = [
	{
		nombre: "RPG 2D — Estilo Dragon Quest Mistrel Song",
		descripcion: "RPG basado en Dragon Quest III de SNES. Proyecto final de evaluación para el curso de programación de videojuegos con Unity.",
		link: "https://maerga.itch.io/dragon-quest-mistreal-song"
	},
	{
		nombre: "Pirate Plataformer 2D",
		descripcion: "Juego de plataformas para la segunda evaluación del curso Programación de Videojuegos con Unity.",
		link: "https://maerga.itch.io/pirate-plataformer-alpha-version"
	},
	{
		nombre: "Duel Calculator",
		descripcion: "Calculadora interactiva de puntos de vida (LP) para Yu-Gi-Oh! con diseño responsivo. Desarrollada con HTML, CSS y JavaScript nativo para ofrecer un control rápido y preciso durante los duelos.",
		link: "https://MaErGa.github.io/duelcalculator/"
	}
];

// Materia: cada habilidad tiene un color (define el orbe, las estrellas
// y qué slots de Arma/Armadura se iluminan), una valoración de 1 a 5 estrellas
// y una descripción corta.
const materias = [
	{ nombre: "C#", color: "#E6C846", estrellas: 5, descripcion: "Lenguaje principal para toda la lógica de juego en Unity." },
	{ nombre: "Unity", color: "#32B464", estrellas: 4, descripcion: "Motor usado para desarrollar el RPG 2D y otros proyectos." },
	{ nombre: "Visual Scripting", color: "#E6C846", estrellas: 3, descripcion: "Sistemas de nodos para prototipar lógica sin escribir código." },
	{ nombre: "GitHub", color: "#D23232", estrellas: 5, descripcion: "Almacenamiento en la nube y control de versiones de todos mis proyectos." },
	{ nombre: "Blender", color: "#B464B4", estrellas: 2, descripcion: "Diseño y modelado 3D de entornos y personajes." },
	{ nombre: "Photoshop", color: "#B464B4", estrellas: 3, descripcion: "Edición de imágenes y assets para la interfaz y los sprites." },
	{ nombre: "Paquete Office", color: "#4682B4", estrellas: 3, descripcion: "Manejo eficiente de herramientas ofimáticas y gestión de documentos." },
	{ nombre: "Redes", color: "#4682B4", estrellas: 3, descripcion: "Implantación, configuración y mantenimiento de los elementos de la red local." },
	{ nombre: "Sistema Microinformático", color: "#4682B4", estrellas: 5, descripcion: "Instalación, configuración y mantenimiento de software, hardware y periféricos." },
	{ nombre: "Windows", color: "#4682B4", estrellas: 5, descripcion: "Administración de sistemas y creación de particiones en entornos Windows." },
	{ nombre: "Linux", color: "#4682B4", estrellas: 3, descripcion: "Instalación, configuración y manejo de utilidades básicas en sistemas Linux." }

	
	
];

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
			slots: patronSlots(2, 3)
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
	let volumen = 0.75; // 75% por defecto
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
	const scaler = document.querySelector('#viewportScaler');
	if (scaler) { scaler.classList.toggle('crtBlur', activado); }
}

function aplicarVolumen(nivel) {
	// nivel va de 0 a 1
	for (const clave in sonidos) {
		if (sonidos.hasOwnProperty(clave)) { sonidos[clave].volume = nivel; }
	}
}

const preferencias = leerPreferencias();
aplicarColorVentana(preferencias.color.r, preferencias.color.g, preferencias.color.b);
aplicarCrt(preferencias.crt);


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

document.addEventListener('DOMContentLoaded', function () {

	const group = document.querySelector('#group');

	// Calcula el rectángulo (en pantalla) que ocupan juntos la tarjeta de
	// personaje (#section) y la lista del menú (#menu). Los paneles se
	// posicionan exactamente sobre esa zona, para que parezca que el menú
	// "se transforma" en el panel, en vez de aparecer en otro lugar.
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
		const left = (Math.min(r1.left, r2.left) - scalerRect.left) / scale;
		const top = (Math.min(r1.top, r2.top) - scalerRect.top) / scale;
		const right = (Math.max(r1.right, r2.right) - scalerRect.left) / scale;
		const bottom = (Math.max(r1.bottom, r2.bottom) - scalerRect.top) / scale;
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
			headerUseEl.style.width = (rect.width - rect.menuWidth - 8) + 'px';
		}
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

	// Abre un panel: el menú principal se desvanece y el panel aparece
	// con el título primero y el resto del contenido un instante después.
	function openPanel(panelEl, headerEls, contentEls) {
		playSound('menuAbrir');
		positionPanel(panelEl, headerEls[headerEls.length - 1], headerEls.length > 1 ? headerEls[0] : null);
		group.classList.add('panelOpen');
		panelEl.classList.add('visible');

		window.requestAnimationFrame(function () {
			headerEls.forEach(function (el) { el.classList.add('show'); });
		});

		setTimeout(function () {
			contentEls.forEach(function (el) { el.classList.add('show'); });
		}, 180);
	}

	// Cierra un panel: primero se desvanece el contenido, luego el título,
	// mientras el menú principal vuelve a aparecer.
	function closePanel(panelEl, headerEls, contentEls) {
		playSound('cerrar');
		contentEls.forEach(function (el) { el.classList.remove('show'); });

		setTimeout(function () {
			headerEls.forEach(function (el) { el.classList.remove('show'); });
			group.classList.remove('panelOpen');
		}, 150);

		setTimeout(function () {
			panelEl.classList.remove('visible');
		}, 380);
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
		}

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
			const matHpBarEl = document.querySelector('#materiaHpBar');
			const matMpBarEl = document.querySelector('#materiaMpBar');
			sincronizarHpMp(hpValueEl, mpValueEl, matHpBarEl, matMpBarEl);
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
			claves.forEach(function (clave) {
				const actual = itemActual ? itemActual.stats[clave] : 0;
				const el = statEls[clave];
				el.innerHTML = '';

				if (itemPreview && itemPreview !== itemActual) {
					const proyectado = itemPreview.stats[clave];
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
	// PANEL: HISTORIA (selector Work/Education → carga → tarjetas)
	// ----------------------------------------------------------
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
				crtActivado = span.dataset.value === 'on';
				actualizarToggleVisual(crtToggle, crtActivado ? 'on' : 'off');
				aplicarCrt(crtActivado);
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

		const hpMax = leerNumero(hpMaxEl.textContent);
		const mpMax = leerNumero(mpMaxEl.textContent);
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
			document.querySelectorAll('#menu li, .panelList li, .slot').forEach(function (li) {
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