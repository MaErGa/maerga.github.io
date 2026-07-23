// ============================================================
// SCROLLBAR ESTILO FF7 — versión vanilla JS (sin React)
// ------------------------------------------------------------
// Barra de desplazamiento personalizada: un canal hundido con un
// "thumb" (indicador) de tamaño fijo (no proporcional, como en FF7),
// que se auto-oculta cuando el contenido no desborda.
//
// Uso:
//   1. El elemento scrolleable ("target") debe tener la clase
//      "hide-scrollbar" (para ocultar el scrollbar nativo) y su
//      contenedor padre debe estar posicionado (relative/absolute).
//   2. Llamar a crearScrollbarFF7(target) una vez que el target ya
//      esté en el DOM. Inserta el track/thumb como hermano del target,
//      dentro del mismo contenedor padre.
//
//   var barra = crearScrollbarFF7(document.querySelector('#miLista'), {
//       onVisibleChange: function (visible) { ... } // opcional
//   });
//
//   // Si el target se destruye (ej: se cierra un panel dinámico):
//   barra.destruir();
// ============================================================

function crearScrollbarFF7(targetEl, opciones) {
	opciones = opciones || {};
	var onVisibleChange = opciones.onVisibleChange;
	// Contenedor donde se inserta el track (por defecto, el padre del target)
	var contenedor = opciones.contenedor || targetEl.parentElement;

	// El thumb es un indicador de tamaño fijo (fracción del track, con un
	// mínimo), no un thumb proporcional al contenido — igual que en FF7.
	var THUMB_FRACTION = 0.24;
	var MIN_THUMB = 34;

	// --- Crear el DOM del track y el thumb ---
	var track = document.createElement('div');
	track.className = 'ff7ScrollbarTrack';
	track.setAttribute('aria-hidden', 'true');
	track.dataset.visible = 'false';

	var thumb = document.createElement('div');
	thumb.className = 'ff7ScrollbarThumb';

	track.appendChild(thumb);
	contenedor.appendChild(track);

	// --- Estado interno ---
	var visible = false;
	var thumbHeight = 0;
	var thumbTop = 0;
	var drag = null; // { startY, startScroll } mientras se arrastra el thumb
	// Posición del thumb la última vez que sonó el "tick" de arrastre, para
	// que la barra clickee al ir avanzando (igual que los sliders de RGB).
	var lastSoundTop = 0;
	var resizeObserver = null;

	function actualizar() {
		var scrollHeight = targetEl.scrollHeight;
		var clientHeight = targetEl.clientHeight;
		var scrollTop = targetEl.scrollTop;
		var trackH = track.clientHeight;
		var scrollable = scrollHeight - clientHeight;

		if (scrollable <= 1 || trackH === 0) {
			if (visible) {
				visible = false;
				track.dataset.visible = 'false';
				if (typeof onVisibleChange === 'function') onVisibleChange(false);
			}
			return;
		}

		thumbHeight = Math.max(MIN_THUMB, Math.round(trackH * THUMB_FRACTION));
		thumbTop = Math.round((trackH - thumbHeight) * (scrollTop / scrollable));

		thumb.style.height = thumbHeight + 'px';
		thumb.style.transform = 'translateY(' + thumbTop + 'px)';

		if (!visible) {
			visible = true;
			track.dataset.visible = 'true';
			if (typeof onVisibleChange === 'function') onVisibleChange(true);
		}
	}

	function alMover(event) {
		if (!drag) return;
		var scrollable = targetEl.scrollHeight - targetEl.clientHeight;
		var range = track.clientHeight - thumbHeight;
		if (range <= 0) return;

		// getBoundingClientRect está en px de pantalla, así que esto sigue
		// siendo correcto aunque el contenedor esté escalado con transform
		// (ej: el #viewportScaler de MenuFF7, ver window.mff7Scale).
		var scale = track.getBoundingClientRect().height / track.clientHeight || 1;
		var deltaLayout = (event.clientY - drag.startY) / scale;
		targetEl.scrollTop = drag.startScroll + (deltaLayout / range) * scrollable;

		// Sonido de "click" cada vez que el thumb avanza a una nueva posición
		var nuevoTop = Math.round(range * (targetEl.scrollTop / scrollable));
		if (nuevoTop !== lastSoundTop) {
			lastSoundTop = nuevoTop;
			if (typeof playSound === 'function') playSound('select');
		}
	}

	function alSoltar() {
		drag = null;
		document.body.style.userSelect = '';
	}

	function iniciarDrag(event) {
		event.preventDefault();
		event.stopPropagation(); // evita que dispare scrollPorClick en el track
		drag = { startY: event.clientY, startScroll: targetEl.scrollTop };
		lastSoundTop = thumbTop;
		document.body.style.userSelect = 'none';
	}

	function scrollPorClick(event) {
		var trackRect = track.getBoundingClientRect();
		var clickY = event.clientY - trackRect.top;
		var scale = trackRect.height / track.clientHeight || 1;
		var direccion = (clickY / scale) < thumbTop ? -1 : 1;
		targetEl.scrollTop += direccion * targetEl.clientHeight * 0.9;
	}

	// --- Listeners ---
	targetEl.addEventListener('scroll', actualizar, { passive: true });
	thumb.addEventListener('mousedown', iniciarDrag);
	track.addEventListener('mousedown', scrollPorClick);
	window.addEventListener('mousemove', alMover);
	window.addEventListener('mouseup', alSoltar);
	window.addEventListener('resize', actualizar);

	if (typeof ResizeObserver !== 'undefined') {
		resizeObserver = new ResizeObserver(actualizar);
		resizeObserver.observe(targetEl);
		// El wrapper de contenido cambia de tamaño cuando se agregan/quitan ítems
		if (targetEl.firstElementChild) resizeObserver.observe(targetEl.firstElementChild);
	}

	actualizar();

	function destruir() {
		targetEl.removeEventListener('scroll', actualizar);
		thumb.removeEventListener('mousedown', iniciarDrag);
		track.removeEventListener('mousedown', scrollPorClick);
		window.removeEventListener('mousemove', alMover);
		window.removeEventListener('mouseup', alSoltar);
		window.removeEventListener('resize', actualizar);
		if (resizeObserver) resizeObserver.disconnect();
		if (track.parentElement) track.parentElement.removeChild(track);
	}

	return {
		destruir: destruir,
		actualizar: actualizar,
		track: track,
		thumb: thumb
	};
}

// Exponer globalmente, igual que el resto de utilidades de MenuFF7
window.crearScrollbarFF7 = crearScrollbarFF7;
