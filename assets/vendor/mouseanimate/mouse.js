const triggers = document.querySelectorAll('.hover-trigger');
const images = document.querySelectorAll('.hover-image');

function mostrarImagem(index) {
  images.forEach((img, i) => {
    img.classList.toggle('active', i == index);
  });
}

triggers.forEach((trigger) => {
  const index = trigger.getAttribute('data-img');

  // Para desktop (hover)
  trigger.addEventListener('mouseenter', () => {
    mostrarImagem(index);
  });

  trigger.addEventListener('mouseleave', () => {
    mostrarImagem(0); // Volta à imagem principal no desktop
  });

  // Para mobile (toque) - a imagem permanece
  trigger.addEventListener('touchstart', (e) => {
    e.stopPropagation(); // Impede que o toque fora dispare
    mostrarImagem(index);
  });
});
