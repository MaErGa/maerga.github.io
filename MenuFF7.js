/**
 * MenuFF7.js - REFACTORIZADO
 * 
 * Sistema principal del menú FF7
 * Incluye features inspiradas en Jamie Pates (https://www.jamiepates.com)
 * Atribuciones: Font Reactor7 by Caveras (https://fontstruct.com)
 */

// ============================================================
// INICIALIZACIÓN
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  // Cargar configuración guardada
  FF7.Color.load();
  FF7.Cursor.loadPosition();
  
  // Iniciar escala responsiva
  FF7.Scale.init();
  
  // Inicializar interfaz
  initializeMenuUI();
  
  // Iniciar reloj
  FF7.Time.startClock();
  
  // Obtener datos del perfil
  loadProfileData();
});

// ============================================================
// CARGAR DATOS
// ============================================================
let profileData = {};

async function loadProfileData() {
  try {
    const response = await fetch('MenuFF7.data.json');
    profileData = await response.json();
    updateProfileDisplay();
  } catch (error) {
    console.warn('No se pudo cargar MenuFF7.data.json, usando valores por defecto');
  }
}

function updateProfileDisplay() {
  if (profileData.profile) {
    const profile = profileData.profile;
    
    // Actualizar nombre
    const nameElements = document.querySelectorAll('h2.extra');
    if (nameElements.length > 0) {
      nameElements[0].textContent = profile.name;
    }

    // Actualizar Giles
    const gilElement = document.querySelector('#gilAmount');
    if (gilElement) {
      gilElement.textContent = formatNumber(300887);
    }

    // Actualizar localización
    const locationElement = document.querySelector('#footerLocation');
    if (locationElement) {
      locationElement.textContent = FF7.Location.current();
    }
  }
}

function formatNumber(num) {
  return num.toLocaleString('es-ES');
}

// ============================================================
// UI - MENÚ
// ============================================================
function initializeMenuUI() {
  const menuItems = document.querySelectorAll('#menu li');
  
  // Inicializar posición del cursor
  FF7.Cursor.moveTo(0, menuItems);
  
  // Listeners de mouse
  menuItems.forEach((item, index) => {
    item.addEventListener('mouseover', () => {
      FF7.Cursor.moveTo(index, menuItems);
    });

    item.addEventListener('click', () => {
      handleMenuClick(item);
    });
  });

  // Listeners de teclado
  document.addEventListener('keydown', (e) => handleKeyPress(e, menuItems));

  // Actualizar localización al hacer hover en el botón de refresh
  const refreshBtn = document.querySelector('#footerReroll');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      const location = FF7.Location.refresh();
      const locationElement = document.querySelector('#footerLocation');
      if (locationElement) {
        locationElement.textContent = location;
      }
    });
  }

  // Suscribirse a cambios de locación
  FF7.Location.subscribe((location) => {
    const locationElement = document.querySelector('#footerLocation');
    if (locationElement) {
      locationElement.textContent = location;
    }
  });

  // Suscribirse a cambios de tiempo
  FF7.Time.subscribe((timeStr) => {
    const timeElement = document.querySelector('#currentTime');
    if (timeElement) {
      const parts = timeStr.split(':');
      timeElement.innerHTML = `${parts[0]}<txt id="colon">:</txt>${parts[1]}:${parts[2]}`;
    }
  });
}

// ============================================================
// KEYBOARD NAVIGATION
// ============================================================
function handleKeyPress(e, menuItems) {
  const keyCode = e.keyCode;

  // H - Toggle mostrar/ocultar encabezado
  if (keyCode === 72 || keyCode === 104) {
    e.preventDefault();
    const extras = document.querySelectorAll('.extra');
    extras.forEach(extra => {
      const isVisible = extra.style.opacity !== '0';
      extra.style.opacity = isVisible ? '0' : '1';
    });
    return;
  }

  // Flechas arriba/abajo
  if (keyCode === 38) { // UP
    e.preventDefault();
    FF7.Cursor.moveUp(menuItems);
    FF7.Cursor.savePosition();
  } else if (keyCode === 40) { // DOWN
    e.preventDefault();
    FF7.Cursor.moveDown(menuItems);
    FF7.Cursor.savePosition();
  }

  // Enter
  if (keyCode === 13) {
    e.preventDefault();
    const selectedItem = menuItems[FF7.Cursor.current()];
    if (selectedItem) {
      handleMenuClick(selectedItem);
    }
  }
}

// ============================================================
// MENU CLICK HANDLER
// ============================================================
function handleMenuClick(item) {
  const link = item.querySelector('a');
  const number = item.getAttribute('number');

  FF7.Audio.play('select');

  if (link) {
    if (link.target === '_blank' || link.href.includes('http')) {
      window.open(link.href, '_blank');
    } else {
      link.click();
    }
  }

  FF7.Cursor.savePosition();
}

// ============================================================
// ANIMACIONES - PARPADEO DEL RELOJ
// ============================================================
function initClockBlink() {
  const blinker = setInterval(() => {
    const colon = document.querySelector('#colon');
    if (colon) {
      const isVisible = colon.style.opacity !== '0';
      colon.style.opacity = isVisible ? '0' : '1';
    }
  }, 500);
}

// Iniciar parpadeo del reloj cuando esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initClockBlink);
} else {
  initClockBlink();
}

// ============================================================
// PANEL CONTROL (para Testing)
// ============================================================
window.MenuFF7Debug = {
  toggleSound: () => {
    const enabled = FF7.Audio.toggle();
    console.log('Sonido:', enabled ? 'ON' : 'OFF');
  },
  getCurrentLocation: () => FF7.Location.current(),
  refreshLocation: () => FF7.Location.refresh(),
  getCurrentCursorPosition: () => FF7.Cursor.current(),
  getPlayTime: () => FF7.Time.get(),
  setColor: (r, g, b) => FF7.Color.set(r, g, b),
  resetColor: () => FF7.Color.reset(),
};