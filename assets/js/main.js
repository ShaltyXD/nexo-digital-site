/* ===== Nexo Digital - scripts ===== */
(function () {
  'use strict';

  document.documentElement.classList.add('js');

  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();

  var topbar = document.getElementById('topbar');
  function onScroll() {
    if (!topbar) return;
    topbar.classList.toggle('scrolled', window.scrollY > 12);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  var burger = document.getElementById('burger');
  var nav = document.querySelector('.nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el, i) {
      el.style.transitionDelay = (Math.min(i % 4, 3) * 70) + 'ms';
      io.observe(el);
    });
    setTimeout(function () {
      reveals.forEach(function (el) { el.classList.add('in'); });
    }, 2500);
  }

  var form = document.getElementById('form-contato');
  var WHATS = '558391612348';

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var nome = document.getElementById('f-nome');
      var tel = document.getElementById('f-tel');
      var int = document.getElementById('f-int');
      var msg = document.getElementById('f-msg');

      var ok = true;
      [nome, tel].forEach(function (f) {
        if (!f || !f.value.trim()) {
          ok = false;
          if (f) f.classList.add('err');
        } else {
          f.classList.remove('err');
        }
      });
      if (!ok) return;

      var texto =
        'Ola! Vim pelo site da Nexo Digital.\n\n' +
        'Nome: ' + nome.value.trim() + '\n' +
        'WhatsApp: ' + tel.value.trim() + '\n' +
        'Interesse: ' + (int ? int.value : '-') +
        (msg && msg.value.trim() ? '\n\nMensagem: ' + msg.value.trim() : '');

      window.open('https://wa.me/' + WHATS + '?text=' + encodeURIComponent(texto), '_blank', 'noopener');
      form.reset();
    });

    form.addEventListener('input', function (e) {
      if (e.target.classList) e.target.classList.remove('err');
    });
  }
})();
