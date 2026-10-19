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

  // Tecnologías: en celular, carrusel que avanza solo cada 5 s, con flechas e indicadores
  function nkCarruselTec(caja) {
    var DURACION = 5000;
    var riel = caja.querySelector('.nk-tec-riel');
    var tarjetas = Array.prototype.slice.call(riel.children);
    var puntos = Array.prototype.slice.call(caja.querySelectorAll('.nk-tec-punto'));
    var celular = window.matchMedia('(max-width: 760px)');
    var quieto = window.matchMedia('(prefers-reduced-motion: reduce)');
    var actual = 0, reloj = null, asentar = null, visible = false, tocando = false;
    if (quieto.matches) caja.classList.add('nk-tec-quieto');
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
      caja.classList.toggle('nk-tec-pausa', !puede());
      if (puede()) reloj = setTimeout(function () { ir((actual + 1) % tarjetas.length); }, DURACION);
    }
    function ir(i) {
      var pad = parseFloat(getComputedStyle(riel).paddingLeft) || 0;
      var x = riel.scrollLeft + tarjetas[i].getBoundingClientRect().left - riel.getBoundingClientRect().left - pad;
      riel.scrollTo({ left: x, behavior: quieto.matches ? 'auto' : 'smooth' });
      marcar(i); programar();
    }
    function alDesplazar() {
      clearTimeout(asentar);
      asentar = setTimeout(function () {
        var izq = riel.getBoundingClientRect().left, mejor = 0, dist = Infinity;
        tarjetas.forEach(function (t, j) { var d = Math.abs(t.getBoundingClientRect().left - izq - 24); if (d < dist) { dist = d; mejor = j; } });
        if (mejor !== actual) marcar(mejor);
        programar();
      }, 140);
    }
    function tocar() { tocando = true; programar(); }
    function soltar() { tocando = false; programar(); }
    riel.addEventListener('scroll', alDesplazar, { passive: true });
    riel.addEventListener('pointerdown', tocar);
    riel.addEventListener('touchstart', tocar, { passive: true });
    window.addEventListener('pointerup', soltar);
    window.addEventListener('touchend', soltar);
    puntos.forEach(function (p, j) { p.addEventListener('click', function () { ir(j); }); });
    var ant = caja.querySelector('.nk-tec-ant'), sig = caja.querySelector('.nk-tec-sig');
    function anterior() { ir((actual - 1 + tarjetas.length) % tarjetas.length); }
    function siguiente() { ir((actual + 1) % tarjetas.length); }
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
      riel.removeEventListener('scroll', alDesplazar);
      riel.removeEventListener('pointerdown', tocar);
      riel.removeEventListener('touchstart', tocar);
      window.removeEventListener('pointerup', soltar);
      window.removeEventListener('touchend', soltar);
      document.removeEventListener('visibilitychange', programar);
      if (celular.removeEventListener) celular.removeEventListener('change', programar);
      if (ant) ant.removeEventListener('click', anterior);
      if (sig) sig.removeEventListener('click', siguiente);
      if (obs) obs.disconnect();
    };
  }
  var tec = document.querySelector('.nk-tec');
  if (tec) nkCarruselTec(tec);

  // "Agenda una reunión" del cierre: el formulario de n8n se conectará más adelante.
})();
