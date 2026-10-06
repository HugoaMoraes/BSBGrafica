/**
 * BSB Gráfica - Inicialização do Carrossel (Hero)
 * Respeita preferências de redução de movimento e previne erros de execução.
 */
$(document).ready(function () {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  const $carousel = $('.owl-carousel');
  if ($carousel.length && typeof $carousel.owlCarousel === 'function') {
    $carousel.owlCarousel({
      items: 1, // Quantas imagens aparecem por vez
      loop: true, // Loop infinito
      margin: 10, // Espaço entre imagens
      nav: false, // Botões de navegação (setas)
      dots: true, // Bolinhas embaixo
      autoplay: !prefersReducedMotion, // Respeita acessibilidade WCAG 2.2.2
      autoplayTimeout: 3000, // Tempo de troca (3s)
      autoplayHoverPause: true, // Pausa quando o mouse passa em cima ou foco
    });
  }
});
