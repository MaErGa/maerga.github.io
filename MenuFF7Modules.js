/**
 * MenuFF7Modules.js
 * Sistema modular para FF7 Menu
 * 
 * Inspirado en la arquitectura de Jamie Pates (https://www.jamiepates.com)
 * Adaptado para vanilla JS con funcionalidades mejoradas
 */

// ============================================================
// MÓDULO: AUDIO
// ============================================================
const AudioModule = (() => {
  const sounds = {
    move: new Audio(),
    select: new Audio(),
    back: new Audio(),
    load: new Audio(),
  };

  sounds.move.src = "https://www.dropbox.com/s/fiyx4q2mdwynraj/FF7CursorMove.mp3?raw=1";
  sounds.select.src = "https://www.dropbox.com/s/fiyx4q2mdwynraj/FF7CursorMove.mp3?raw=1";
  sounds.back.src = "https://www.dropbox.com/s/v04ewrevpnnsz03/FF7CursorSaveLoad.mp3?raw=1";
  sounds.load.src = "https://www.dropbox.com/s/v04ewrevpnnsz03/FF7CursorSaveLoad.mp3?raw=1";

  let soundEnabled = localStorage.getItem('mff7_soundEnabled') !== 'false';

  return {
    play: (name, enabled = soundEnabled) => {
      if (enabled && sounds[name]) {
        sounds[name].currentTime = 0;
        sounds[name].play().catch(() => {});
      }
    },
    toggle: () => {
      soundEnabled = !soundEnabled;
      localStorage.setItem('mff7_soundEnabled', soundEnabled);
      return soundEnabled;
    },
    isEnabled: () => soundEnabled,
  };
})();

// ============================================================
// MÓDULO: LOCACIONES
// ============================================================
const LocationModule = (() => {
  let currentLocation = null;
  let subscribers = [];

  const locations = [
    "Midgar - Sector 1",
    "Midgar - Sector 5",
    "Midgar - Sector 7",
    "Costa del Sol",
    "Junon",
    "Gold Saucer",
    "Icicle Inn",
    "Nibelheim",
    "Rocket Town",
    "Bugenhagen's Crater",
    "The Sunken Gelniiks Strata",
    "Cosmo Canyon",
  ];

  const getRandomLocation = () => {
    let next = locations[Math.floor(Math.random() * locations.length)];
    while (next === currentLocation && locations.length > 1) {
      next = locations[Math.floor(Math.random() * locations.length)];
    }
    currentLocation = next;
    notifySubscribers();
    return next;
  };

  const notifySubscribers = () => {
    subscribers.forEach(callback => callback(currentLocation));
  };

  const subscribe = (callback) => {
    subscribers.push(callback);
    if (currentLocation) callback(currentLocation);
  };

  // Inicializar con una locación al cargar
  if (!currentLocation) {
    getRandomLocation();
  }

  return {
    current: () => currentLocation,
    refresh: () => {
      AudioModule.play('select');
      return getRandomLocation();
    },
    subscribe,
    getAll: () => [...locations],
  };
})();

// ============================================================
// MÓDULO: CURSOR
// ============================================================
const CursorModule = (() => {
  let currentPosition = 0;
  let subscribers = [];

  const cursorImg = document.createElement('img');
  cursorImg.className = 'selected';
  cursorImg.src = 'https://www.dropbox.com/s/1pq4d1ksjv3tuoz/FF7Cursor.png?raw=1';

  const cursorShadow = document.createElement('div');
  cursorShadow.className = 'shadow';

  const notifySubscribers = () => {
    subscribers.forEach(callback => callback(currentPosition));
  };

  const subscribe = (callback) => {
    subscribers.push(callback);
    callback(currentPosition);
  };

  const moveTo = (index, menuItems) => {
    if (!menuItems[index]) return;
    
    currentPosition = index;
    
    // Limpiar posición anterior
    menuItems.forEach(item => {
      const cursor = item.querySelector('.selected');
      const shadow = item.querySelector('.shadow');
      if (cursor) cursor.remove();
      if (shadow) shadow.remove();
    });

    // Colocar en nueva posición
    menuItems[index].prepend(cursorShadow.cloneNode(true));
    menuItems[index].prepend(cursorImg.cloneNode(true));

    AudioModule.play('move');
    notifySubscribers();
  };

  const moveUp = (menuItems) => {
    let newPos = currentPosition - 1;
    if (newPos < 0) newPos = menuItems.length - 1;
    moveTo(newPos, menuItems);
  };

  const moveDown = (menuItems) => {
    let newPos = currentPosition + 1;
    if (newPos >= menuItems.length) newPos = 0;
    moveTo(newPos, menuItems);
  };

  const savePosition = () => {
    localStorage.setItem('mff7_cursorPos', currentPosition);
  };

  const loadPosition = () => {
    const saved = localStorage.getItem('mff7_cursorPos');
    if (saved) currentPosition = parseInt(saved);
  };

  return {
    current: () => currentPosition,
    moveTo,
    moveUp,
    moveDown,
    savePosition,
    loadPosition,
    subscribe,
  };
})();

// ============================================================
// MÓDULO: TIEMPO JUGADO
// ============================================================
const TimeModule = (() => {
  let totalPlayed = parseInt(localStorage.getItem('mff7_totalPlayed')) || 0;
  let subscribers = [];

  const format = (seconds) => {
    let hh = Math.floor(seconds / 3600);
    seconds = seconds - (hh * 3600);
    let mm = Math.floor(seconds / 60);
    seconds = seconds - (mm * 60);
    let ss = seconds;

    const pad = (n) => String(n).padStart(2, '0');
    
    if (hh > 99) {
      return `99:99:99`;
    }

    return `${hh}:${pad(mm)}:${pad(ss)}`;
  };

  const notifySubscribers = () => {
    subscribers.forEach(callback => callback(format(totalPlayed)));
  };

  const subscribe = (callback) => {
    subscribers.push(callback);
    callback(format(totalPlayed));
  };

  const startClock = () => {
    setInterval(() => {
      totalPlayed++;
      localStorage.setItem('mff7_totalPlayed', totalPlayed);
      notifySubscribers();
    }, 1000);
  };

  return {
    get: () => format(totalPlayed),
    subscribe,
    startClock,
  };
})();

// ============================================================
// MÓDULO: COLOR (de Jamie Pates)
// ============================================================
const ColorModule = (() => {
  const defaultColor = { r: 0, g: 83, b: 173 }; // #0053ad
  let currentColor = { ...defaultColor };

  const load = () => {
    const saved = localStorage.getItem('mff7_color');
    if (saved) {
      try {
        currentColor = JSON.parse(saved);
      } catch {
        currentColor = { ...defaultColor };
      }
    }
    applyColor();
  };

  const applyColor = () => {
    const root = document.documentElement;
    root.style.setProperty('--win-c1', `rgb(${currentColor.r}, ${currentColor.g}, ${currentColor.b})`);
    root.style.setProperty('--win-c2', `rgb(${Math.max(0, currentColor.b - 100)}, ${Math.max(0, currentColor.g - 100)}, ${Math.max(0, currentColor.r - 100)})`);
    root.style.setProperty('--win-c3', `rgb(0, 2, 35)`);
  };

  const set = (r, g, b) => {
    currentColor = { r, g, b };
    localStorage.setItem('mff7_color', JSON.stringify(currentColor));
    applyColor();
  };

  const reset = () => {
    currentColor = { ...defaultColor };
    localStorage.removeItem('mff7_color');
    applyColor();
  };

  return {
    load,
    set,
    reset,
    get: () => ({ ...currentColor }),
  };
})();

// ============================================================
// MÓDULO: ESCALA (Responsive, inspirado en Jamie Pates)
// ============================================================
const ScaleModule = (() => {
  const DESIGN_WIDTH = 1165;
  const DESIGN_HEIGHT = 770;

  const calculateScale = () => {
    const viewportWidth = document.documentElement.clientWidth;
    const viewportHeight = document.documentElement.clientHeight;
    
    return Math.min(
      viewportWidth / DESIGN_WIDTH,
      viewportHeight / DESIGN_HEIGHT
    );
  };

  const applyScale = () => {
    const scaler = document.getElementById('viewportScaler');
    if (!scaler) return;

    const scale = calculateScale();
    scaler.style.transform = `scale(${scale})`;
  };

  const init = () => {
    applyScale();
    window.addEventListener('resize', applyScale);
    window.addEventListener('orientationchange', applyScale);
  };

  return {
    init,
    applyScale,
  };
})();

// Exportar módulos globalmente
window.FF7 = {
  Audio: AudioModule,
  Location: LocationModule,
  Cursor: CursorModule,
  Time: TimeModule,
  Color: ColorModule,
  Scale: ScaleModule,
};