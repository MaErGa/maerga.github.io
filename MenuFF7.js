// ============================================================
// DATOS — editá estos arreglos para poner tu información real.
// ============================================================

// Proyectos: "link" puede quedar vacío ("") si todavía no lo tenés.
const proyectos = [
	{
		nombre: "RPG 2D — Estilo Dragon Quest Mistrel Song",
		descripcion: "RPG basado en Dragon Quest III de SNES. Proyecto final de evaluación para el curso de programación de videojuegos con Unity.",
		link: "https://maerga.itch.io/dragon-quest-mistreal-song"
	},
	{
		nombre: "Pirate Plataformer",
		descripcion: "Juego de plataformas para la segunda evaluación del curso Programación de Videojuegos con Unity.",
		link: "https://maerga.itch.io/pirate-plataformer-alpha-version"
	},
	{
		nombre: "",
		descripcion: "",
		link: ""
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

// Slots decorativos de "Arma" y "Armadura". null = slot vacío.
// "linked:true" dibuja la pequeña barra que conecta con el siguiente slot.
const slotsArma = [
	{ color: materias[0].color, linked: true },
	{ color: materias[0].color, linked: false },
	{ color: materias[1].color, linked: true },
	{ color: materias[1].color, linked: false },
	{ color: null, linked: false },
	{ color: null, linked: false }
];

const slotsArmadura = [
	{ color: materias[1].color, linked: true },
	{ color: materias[3].color, linked: false },
	{ color: materias[4].color, linked: false },
	{ color: null, linked: false },
	{ color: null, linked: false }
];

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
	try {
		const guardado = localStorage.getItem('mff7_color');
		if (guardado) { color = JSON.parse(guardado); }
		const sGuardado = localStorage.getItem('mff7_sonido');
		if (sGuardado !== null) { sonido = sGuardado === '1'; }
		const cGuardado = localStorage.getItem('mff7_crt');
		if (cGuardado !== null) { crt = cGuardado === '1'; }
	} catch (e) { /* localStorage no disponible: usamos los valores por defecto */ }
	return { color: color, sonido: sonido, crt: crt };
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
}

const preferencias = leerPreferencias();
aplicarColorVentana(preferencias.color.r, preferencias.color.g, preferencias.color.b);
aplicarCrt(preferencias.crt);

document.addEventListener('DOMContentLoaded', function () {

	const group = document.querySelector('#group');

	// Calcula el rectángulo (en pantalla) que ocupan juntos la tarjeta de
	// personaje (#section) y la lista del menú (#menu). Los paneles se
	// posicionan exactamente sobre esa zona, para que parezca que el menú
	// "se transforma" en el panel, en vez de aparecer en otro lugar.
	function getCanvasRect() {
		const r1 = document.querySelector('#section').getBoundingClientRect();
		const r2 = document.querySelector('#menu').getBoundingClientRect();
		const left = Math.min(r1.left, r2.left);
		const top = Math.min(r1.top, r2.top);
		const right = Math.max(r1.right, r2.right);
		const bottom = Math.max(r1.bottom, r2.bottom);
		return { left: left, top: top, width: right - left, height: bottom - top, menuWidth: r2.width };
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

	// Abre un panel: el menú principal se desvanece y el panel aparece
	// con el título primero y el resto del contenido un instante después.
	function openPanel(panelEl, headerEls, contentEls) {
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

	// Genera filas de estrellas usando el spritesheet star-spritesheet.png
	// Fila superior (y=0)  = estrella llena  del color correspondiente
	// Fila inferior (y=16) = estrella vacía (oscura)
	// Offsets X por color: #B464B4=0, #32B464=17, #D23232=34, #E6C846=52, #4682B4=69
	var STAR_OFFSETS = {
		'#B464B4': 0,
		'#32B464': 17,
		'#D23232': 34,
		'#E6C846': 52,
		'#4682B4': 69
	};
	function buildStars(valor, color) {
		var row = document.createElement('div');
		row.className = 'starRow';
		var offsetX = (STAR_OFFSETS[color.toUpperCase()] !== undefined)
			? STAR_OFFSETS[color.toUpperCase()]
			: (STAR_OFFSETS[color] !== undefined ? STAR_OFFSETS[color] : 52);
		for (var i = 0; i < 5; i++) {
			var star = document.createElement('span');
			star.className = 'starSprite';
			var offsetY = (i < valor) ? 0 : -16;
			star.style.backgroundPosition = '-' + offsetX + 'px ' + offsetY + 'px';
			row.appendChild(star);
		}
		return row;
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
				li.addEventListener('mouseenter', function () { showProyecto(proyecto); });
				li.addEventListener('click', function () {
					showProyecto(proyecto);
					if (proyecto.link) { window.open(proyecto.link, '_blank'); }
				});
				list.appendChild(li);
			});
		}

		function open() {
			buildList();
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

	// Orbes individuales: un PNG por color (sin spritesheet)
	var ORB_FILES = {
		'#4682B4': 'Assets/Imagenes/orbs/orb_azul.png',
		'#B464B4': 'Assets/Imagenes/orbs/orb_morado.png',
		'#D23232': 'Assets/Imagenes/orbs/orb_rojo.png',
		'#32B464': 'Assets/Imagenes/orbs/orb_verde.png',
		'#E6C846': 'Assets/Imagenes/orbs/orb_amarillo.png'
	};
	function orbFile(color) {
		if (!color) return null;
		return ORB_FILES[color.toUpperCase()] || ORB_FILES[color] || null;
	}

	function orbOffsetX(color) { return 0; } // compatibilidad, ya no se usa

	function aplicarOrbSprite(el, color) {
		if (!color) {
			el.style.background = 'none';
			return;
		}
		el.style.borderRadius = '50%';
		el.style.background = 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.95) 4%, rgba(255,255,255,0.5) 18%, ' + color + ' 48%, rgba(0,0,0,0.65) 100%)';
		el.style.boxShadow = '0 0 6px 2px ' + color + '99, inset 0 -3px 6px rgba(0,0,0,0.5)';
		el.style.width = '24px';
		el.style.height = '24px';
		el.style.flexShrink = '0';
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

		let slotSeleccionado = null; // { datos, el }
		const hintPorDefecto = 'Tocá una ranura y después una materia para equiparla (o desequipar).';

		function deseleccionarSlot() {
			if (slotSeleccionado) {
				slotSeleccionado.el.classList.remove('selected');
				slotSeleccionado = null;
			}
		}

		function refrescarSlotVisual(slot, datos) {
			slot.classList.toggle('filled', !!datos.color);
			slot.innerHTML = '';
			slot.style.backgroundImage = 'none';
			slot.style.border = 'none';
			slot.style.backgroundColor = 'transparent';
			slot.style.width = '30px';
			slot.style.height = '30px';
			slot.style.display = 'flex';
			slot.style.alignItems = 'center';
			slot.style.justifyContent = 'center';

			var orb = document.createElement('div');
			orb.style.width = '26px';
			orb.style.height = '26px';
			orb.style.borderRadius = '50%';
			orb.style.flexShrink = '0';

			if (datos.color) {
				orb.style.background = 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.95) 4%, rgba(255,255,255,0.5) 18%, ' + datos.color + ' 48%, rgba(0,0,0,0.65) 100%)';
				orb.style.boxShadow = '0 0 7px 3px ' + datos.color + '99, inset 0 -3px 7px rgba(0,0,0,0.5)';
				slot.style.color = datos.color;
				slot.dataset.color = datos.color;
			} else {
				orb.style.background = 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.2) 4%, rgba(120,120,120,0.3) 30%, rgba(40,40,40,0.95) 75%, rgba(10,10,10,1) 100%)';
				orb.style.boxShadow = 'inset 0 -3px 7px rgba(0,0,0,0.9)';
				slot.style.color = '';
				delete slot.dataset.color;
			}
			slot.appendChild(orb);
		}

		function buildSlots(container, slots) {
			container.innerHTML = '';
			slots.forEach(function (datos) {
				var slot = document.createElement('span');
				slot.className = 'slot' + (datos.linked ? ' linked' : '');
				refrescarSlotVisual(slot, datos);

				slot.addEventListener('click', function (e) {
					e.stopPropagation();

					if (slotSeleccionado && slotSeleccionado.el === slot) {
						// Tocar la ranura ya seleccionada: la desequipa.
						datos.color = null;
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

		function highlightSlots(color) {
			document.querySelectorAll('#materiaSlotsArma .slot, #materiaSlotsArmadura .slot').forEach(function (slot) {
				slot.classList.toggle('highlight', !!color && slot.dataset.color === color);
			});
		}

		function showMateria(materia) {
			selected.innerHTML = '';
			const row = document.createElement('div');
			row.className = 'selectedSkill';
			var orb = document.createElement('span');
			orb.className = 'orb orbSprite';
			orb.style.width = '26px';
			orb.style.height = '26px';
			aplicarOrbSprite(orb, materia.color);
			row.appendChild(orb);
			const nombre = document.createElement('span');
			nombre.textContent = materia.nombre;
			row.appendChild(nombre);
			selected.appendChild(row);
			selected.appendChild(buildStars(materia.estrellas, materia.color));
			highlightSlots(materia.color);
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
				});

				li.addEventListener('click', function () {
					showMateria(materia);
					if (slotSeleccionado) {
						slotSeleccionado.datos.color = materia.color;
						refrescarSlotVisual(slotSeleccionado.el, slotSeleccionado.datos);
						description.textContent = materia.nombre + ' equipada.';
						deseleccionarSlot();
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
			buildSlots(slotsArmaEl, slotsArma);
			buildSlots(slotsArmaduraEl, slotsArmadura);
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
			chans.forEach(function(span) {
				var letra = span.textContent.trim();
				var ox = rgbOffsets[letra];
				if (ox === undefined) return;
				span.textContent = '';
				span.style.display = 'inline-block';
				span.style.width = '11px';
				span.style.height = '8px';
				span.style.backgroundImage = "url('Assets/Imagenes/rgb-spritesheet.png')";
				span.style.backgroundPosition = '-' + ox + 'px 0px';
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

		[[rngR, 'r', valR], [rngG, 'g', valG], [rngB, 'b', valB]].forEach(function (grupo) {
			const input = grupo[0], canal = grupo[1], etiqueta = grupo[2];
			input.addEventListener('input', function () {
				colorActual[canal] = parseInt(input.value, 10);
				etiqueta.textContent = pad3(colorActual[canal]);
				aplicarColorVentana(colorActual.r, colorActual.g, colorActual.b);
				guardarColor();
			});
		});

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

		function mostrarNumeroDaño(valor, esKO) {
			const numero = document.createElement('div');
			numero.className = 'damageNumber' + (esKO ? ' ko' : (hpActual <= hpMax * 0.25 ? ' low' : ''));
			numero.textContent = valor;
			photoContainer.appendChild(numero);
			numero.addEventListener('animationend', function () { numero.remove(); });
		}

		function entrarEnKO() {
			estaKO = true;
			photo.classList.add('ko');
			actualizarHpTexto();
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
			if (estaKO) return; // ya está en KO: hay que revivir primero

			const daño = Math.floor(Math.random() * (hpActual > 0 ? Math.max(50, Math.floor(hpMax * 0.35)) : 0)) + 40;
			const nuevoHp = Math.max(0, hpActual - daño);
			const esKO = nuevoHp === 0;

			hpActual = nuevoHp;
			mostrarNumeroDaño(daño, esKO);

			if (esKO) {
				entrarEnKO();
			} else {
				actualizarHpTexto();
			}
		}

		function revivir() {
			if (!estaKO) return;
			if (reviveBtn && reviveBtn.classList.contains('disabled')) return; // sin MP suficiente: no se puede revivir

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
		document.body.appendChild(cursorEl);

		var currentTarget = null;

		function mostrarCursor(li) {
			if (currentTarget === li) return;
			currentTarget = li;
			var rect = li.getBoundingClientRect();
			// Centrar verticalmente en el li
			var top = rect.top + window.scrollY + (rect.height / 2) - 15;
			// A la izquierda del texto con suficiente separación
			var left = rect.left + window.scrollX - 62;
			cursorEl.style.top  = top  + 'px';
			cursorEl.style.left = left + 'px';
			cursorEl.classList.add('visible');
		}

		function ocultarCursor() {
			currentTarget = null;
			cursorEl.classList.remove('visible');
		}

		// Aplicar a todos los li interactivos del menú principal
		function bindMenuItems() {
			document.querySelectorAll('#menu li, .panelList li').forEach(function (li) {
				li.addEventListener('mouseenter', function () { mostrarCursor(li); });
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
			return horas + ':' + dosDigitos(minutos) + ':' + dosDigitos(segundos);
		}

		function actualizar() {
			const totalSegundos = Math.floor((Date.now() - inicio) / 1000);
			elemento.textContent = formatear(totalSegundos);
		}

		actualizar();
		setInterval(actualizar, 1000);
	})();

});