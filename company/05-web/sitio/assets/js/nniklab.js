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

  // "Agenda una reunión" del cierre: el formulario de n8n se conectará más adelante.
})();
