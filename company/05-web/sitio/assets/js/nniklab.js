/* nniklab · sitio web v1 — interacciones */
(function () {
  'use strict';

  // Menú de celular
  var boton = document.querySelector('.nk-menu-btn');
  var menu = document.getElementById('nk-menu');
  if (boton && menu) {
    boton.addEventListener('click', function () {
      var abierto = menu.classList.toggle('nk-abierto');
      boton.setAttribute('aria-expanded', abierto ? 'true' : 'false');
      boton.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        menu.classList.remove('nk-abierto');
        boton.setAttribute('aria-expanded', 'false');
        boton.setAttribute('aria-label', 'Abrir menú');
      }
    });
  }

  // Halo lima que sigue el mouse en la portada
  var reduceMovimiento = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var zona = document.querySelector('[data-halo-zona]');
  var halo = document.getElementById('nk-halo');
  if (zona && halo && !reduceMovimiento) {
    var pendiente = null;
    zona.addEventListener('mousemove', function (e) {
      var r = zona.getBoundingClientRect();
      var x = e.clientX - r.left - halo.offsetWidth / 2;
      var y = e.clientY - r.top - halo.offsetHeight / 2;
      if (pendiente) cancelAnimationFrame(pendiente);
      pendiente = requestAnimationFrame(function () {
        halo.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
      });
    });
    zona.addEventListener('mouseleave', function () { halo.style.transform = ''; });
  }

  // Carruseles en celular: avanzan solos, con flechas, indicadores y deslizando
  function nkCarrusel(caja) {
    var DURACION = parseInt(caja.getAttribute('data-duracion'), 10) || 5000;
    var riel = caja.querySelector('.nk-carrusel-riel');
    var tarjetas = Array.prototype.slice.call(riel.children);
    var puntos = Array.prototype.slice.call(caja.querySelectorAll('.nk-carrusel-punto'));
    var ant = caja.querySelector('.nk-carrusel-ant'), sig = caja.querySelector('.nk-carrusel-sig');
    var celular = window.matchMedia('(max-width: 760px)');
    var quieto = window.matchMedia('(prefers-reduced-motion: reduce)');
    var actual = 0, reloj = null, asentar = null, visible = false, tocando = false;
    if (quieto.matches) caja.classList.add('nk-carrusel-quieto');
    function relleno() { return parseFloat(getComputedStyle(riel).paddingLeft) || 0; }
    function marcar(i) {
      actual = i;
      puntos.forEach(function (p, j) {
        p.classList.remove('nk-activo');
        p.setAttribute('aria-current', j === i ? 'true' : 'false');
      });
      void caja.offsetWidth; // reinicia la barra de tiempo
      if (puntos[i]) puntos[i].classList.add('nk-activo');
    }
    function puede() { return celular.matches && visible && !tocando && !quieto.matches && !document.hidden; }
    function programar() {
      clearTimeout(reloj);
      caja.classList.toggle('nk-carrusel-pausa', !puede());
      if (puede()) reloj = setTimeout(function () { ir((actual + 1) % tarjetas.length); }, DURACION);
    }
    function ir(i) {
      var x = riel.scrollLeft + tarjetas[i].getBoundingClientRect().left - riel.getBoundingClientRect().left - relleno();
      riel.scrollTo({ left: x, behavior: quieto.matches ? 'auto' : 'smooth' });
      marcar(i); programar();
    }
    function alDesplazar() {
      clearTimeout(asentar);
      asentar = setTimeout(function () {
        var izq = riel.getBoundingClientRect().left + relleno(), mejor = 0, dist = Infinity;
        tarjetas.forEach(function (t, j) { var d = Math.abs(t.getBoundingClientRect().left - izq); if (d < dist) { dist = d; mejor = j; } });
        if (mejor !== actual) marcar(mejor);
        programar();
      }, 140);
    }
    function tocar() { tocando = true; programar(); }
    function soltar() { if (tocando) { tocando = false; programar(); } }
    function anterior() { ir((actual - 1 + tarjetas.length) % tarjetas.length); }
    function siguiente() { ir((actual + 1) % tarjetas.length); }
    var clics = puntos.map(function (p, j) { var f = function () { ir(j); }; p.addEventListener('click', f); return f; });
    riel.addEventListener('scroll', alDesplazar, { passive: true });
    riel.addEventListener('pointerdown', tocar);
    riel.addEventListener('touchstart', tocar, { passive: true });
    window.addEventListener('pointerup', soltar);
    window.addEventListener('touchend', soltar);
    if (ant) ant.addEventListener('click', anterior);
    if (sig) sig.addEventListener('click', siguiente);
    document.addEventListener('visibilitychange', programar);
    if (celular.addEventListener) celular.addEventListener('change', programar);
    var obs = null;
    if ('IntersectionObserver' in window) {
      obs = new IntersectionObserver(function (e) { visible = e[0].isIntersecting; programar(); }, { threshold: 0.5 });
      obs.observe(riel);
    } else { visible = true; }
    marcar(0); programar();
    return function () {
      clearTimeout(reloj); clearTimeout(asentar);
      puntos.forEach(function (p, j) { p.removeEventListener('click', clics[j]); });
      riel.removeEventListener('scroll', alDesplazar);
      riel.removeEventListener('pointerdown', tocar);
      riel.removeEventListener('touchstart', tocar);
      window.removeEventListener('pointerup', soltar);
      window.removeEventListener('touchend', soltar);
      if (ant) ant.removeEventListener('click', anterior);
      if (sig) sig.removeEventListener('click', siguiente);
      document.removeEventListener('visibilitychange', programar);
      if (celular.removeEventListener) celular.removeEventListener('change', programar);
      if (obs) obs.disconnect();
    };
  }
  Array.prototype.forEach.call(document.querySelectorAll('.nk-carrusel'), nkCarrusel);

  // "Agenda una reunión" del cierre: el formulario de n8n se conectará más adelante.
})();
