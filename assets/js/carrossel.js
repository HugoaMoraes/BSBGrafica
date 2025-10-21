$(document).ready(function () {
  $('.owl-carousel').owlCarousel({
    items: 1, // quantas imagens aparecem por vez
    loop: true, // loop infinito
    margin: 10, // espaço entre imagens
    nav: false, // botões de navegação (setas)
    dots: true, // bolinhas embaixo
    autoplay: true, // autoplay
    autoplayTimeout: 3000, // tempo de troca (3s)
    autoplayHoverPause: true, // pausa quando o mouse passa em cima
  });
});
