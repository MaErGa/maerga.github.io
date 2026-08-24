# FF7 Portfolio de Matías Errico — HTML + CSS + JS puro (3 archivos)

## Cómo abrirlo
Doble clic en `index.html`.

## Arreglado en esta pasada
1. **Ajustes (Config) roto** — encontrado y corregido: el overlay de
   "clic fuera para cerrar" se había quedado encajado DENTRO de la
   cajita pequeña del selector de color en vez de cubrir toda la
   página. Eso tapaba los propios botones de esquina y bloqueaba poder
   cambiar de color. También arreglé que todo el panel de Ajustes se
   reconstruía en cada hover (igual que el bug del menú de hace unas
   rondas, se me había colado aquí también).
2. **Materia se "subía sola" al bajar y elegir otra** — el contenedor
   con scroll se recreaba entero en cada hover, perdiendo la posición.
   Ahora el contenedor es fijo y solo se actualiza su contenido.
   Encontré y arreglé el MISMO bug en Equipo, Proyectos y Curriculum.
3. **Retratos de personajes** — ahora uso tus 10 imágenes recortadas
   individuales (ya no hay que adivinar coordenadas de una rejilla).
   Incluye Cait Sith, que antes no había podido identificar.
4. **Tu foto de perfil** ya integrada (`potrait.png` → `assets/imagenes/portrait.png`).
5. **Esferas de materia** — cambiadas al sistema de imágenes
   individuales que me diste (con fondo transparente, ya venían bien).
   La esfera roja rota queda sustituida.
6. **"Mistrel Song" → "Minstrel Song"** corregido en el nombre del
   proyecto (el enlace de itch.io no lo toqué, solo el texto mostrado).
7. **Curriculum (/resume)** ya tiene tus datos reales (nombre, bio,
   materias, historial, proyectos) en vez de los de Jamie Pates — y de
   paso until encontré y arreglé un fallo mío que dejaba esa página casi
   en blanco (un `clear()` sobrante borraba el contenido justo después
   de montarlo).

## Probado de verdad (no solo "a ojo")
- Ajustes: cambiar de esquina CON el selector ya abierto, sliders
  respondiendo, sonido on/off.
- Materia y Equipo: hacer scroll, pasar el ratón por otro item, comprobar
  que el scroll NO se resetea.
- Escribir "Cloud" en la pantalla de nombre y comprobar que el retrato
  cambia a `cloud.png`.
- Las 8 pantallas cargan sin errores de JavaScript.

## Te siguen faltando estos archivos
- `assets/cv/Matias_Errico_CV.pdf`
- `assets/audio/` — tus .mp3/.wav
- `assets/imagenes/logos/` — logos de empresas/centros
- `assets/imagenes/icon_calculator.png`, `icon_pirate.png`, `icon_dragon.png`
- Tu email/teléfono para el Curriculum (los dejé como "(pendiente)")

## Pendiente para más adelante (como acordamos)
Efectos de stats por materia, drag&drop, aviso de girar el móvil.
