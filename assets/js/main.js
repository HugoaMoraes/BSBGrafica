/**
 * BSB Gráfica - Main Script
 * Refatorado com foco em Clean Code, Acessibilidade (WCAG), Performance e Scrollspy.
 */
(function () {
  'use strict';

  /**
   * Aplica a classe .scrolled ao body quando a página rolar
   */
  function toggleScrolled() {
    const selectBody = document.body;
    const selectHeader = document.querySelector('#header');
    if (
      !selectHeader ||
      (!selectHeader.classList.contains('scroll-up-sticky') &&
        !selectHeader.classList.contains('sticky-top') &&
        !selectHeader.classList.contains('fixed-top'))
    ) {
      return;
    }

    if (window.scrollY > 100) {
      selectBody.classList.add('scrolled');
    } else {
      selectBody.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', toggleScrolled, { passive: true });
  window.addEventListener('load', toggleScrolled);

  /**
   * Alternância do Menu Mobile com suporte a Acessibilidade (ARIA e Teclado)
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToggle() {
    const isOpened = document.body.classList.toggle('mobile-nav-active');

    if (mobileNavToggleBtn) {
      mobileNavToggleBtn.setAttribute(
        'aria-expanded',
        isOpened ? 'true' : 'false'
      );
      mobileNavToggleBtn.setAttribute(
        'aria-label',
        isOpened ? 'Fechar menu de navegação' : 'Abrir menu de navegação'
      );

      const icon = mobileNavToggleBtn.querySelector('i') || mobileNavToggleBtn;
      if (icon) {
        icon.classList.toggle('bi-list', !isOpened);
        icon.classList.toggle('bi-x', isOpened);
      }
    }
  }

  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToggle);
  }

  // Fechar o menu ao pressionar a tecla Escape (WCAG 2.1.2)
  document.addEventListener('keydown', (e) => {
    if (
      e.key === 'Escape' &&
      document.body.classList.contains('mobile-nav-active')
    ) {
      mobileNavToggle();
      if (mobileNavToggleBtn) {
        mobileNavToggleBtn.focus();
      }
    }
  });

  /**
   * Oculta o menu mobile ao clicar em links da mesma página (âncoras)
   */
  document.querySelectorAll('#navmenu a').forEach((navLink) => {
    navLink.addEventListener('click', () => {
      if (document.body.classList.contains('mobile-nav-active')) {
        mobileNavToggle();
      }
    });
  });

  /**
   * Scrollspy do Menu de Navegação:
   * Altera a classe .active do link conforme a seção atualmente visível na tela
   */
  const navmenuLinks = document.querySelectorAll('#navmenu a');

  function navmenuScrollspy() {
    const header = document.querySelector('#header');
    const headerHeight = header ? header.offsetHeight : 80;
    const scrollPos = window.scrollY + headerHeight + 100;

    // Detecta se a rolagem chegou ao final da página para destacar a última seção
    const isAtBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 50;

    const sections = document.querySelectorAll('section[id]');
    let activeSectionId = null;

    if (isAtBottom && sections.length > 0) {
      activeSectionId = sections[sections.length - 1].getAttribute('id');
    } else {
      sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          activeSectionId = section.getAttribute('id');
        }
      });
    }

    if (activeSectionId) {
      navmenuLinks.forEach((link) => {
        const href = link.getAttribute('href');
        if (href === `#${activeSectionId}`) {
          link.classList.add('active');
          link.setAttribute('aria-current', 'page');
        } else if (href && href.startsWith('#')) {
          link.classList.remove('active');
          link.removeAttribute('aria-current');
        }
      });
    }
  }

  // Atualiza imediatamente ao carregar e durante a rolagem de página
  window.addEventListener('load', navmenuScrollspy);
  window.addEventListener('scroll', navmenuScrollspy, { passive: true });

  // Feedback visual imediato ao clicar no link do menu
  navmenuLinks.forEach((link) => {
    link.addEventListener('click', function () {
      const hash = this.getAttribute('href');
      if (hash && hash.startsWith('#')) {
        navmenuLinks.forEach((l) => {
          l.classList.remove('active');
          l.removeAttribute('aria-current');
        });
        this.classList.add('active');
        this.setAttribute('aria-current', 'page');
      }
    });
  });

  /**
   * Alternância de dropdowns no menu mobile
   */
  document
    .querySelectorAll('.navmenu .toggle-dropdown')
    .forEach((dropdownToggle) => {
      dropdownToggle.addEventListener('click', function (e) {
        e.preventDefault();
        if (this.parentNode) {
          this.parentNode.classList.toggle('active');
          if (this.parentNode.nextElementSibling) {
            this.parentNode.nextElementSibling.classList.toggle(
              'dropdown-active'
            );
          }
        }
        e.stopImmediatePropagation();
      });
    });

  /**
   * Remoção suave do Preloader após carregamento
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.style.transition = 'opacity 0.3s ease-out';
      preloader.style.opacity = '0';
      setTimeout(() => {
        if (preloader.parentNode) {
          preloader.parentNode.removeChild(preloader);
        }
      }, 300);
    });
  }

  /**
   * Botão de Scroll Top
   */
  const scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      if (window.scrollY > 100) {
        scrollTop.classList.add('active');
      } else {
        scrollTop.classList.remove('active');
      }
    }
  }

  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }

  window.addEventListener('load', toggleScrollTop);
  window.addEventListener('scroll', toggleScrollTop, { passive: true });

  /**
   * Inicialização do AOS com respeito a prefers-reduced-motion (Acessibilidade)
   */
  function aosInit() {
    if (typeof AOS !== 'undefined') {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        disable: prefersReducedMotion,
      });
    }
  }
  window.addEventListener('load', aosInit);

  /**
   * Inicialização do GLightbox
   */
  if (typeof GLightbox === 'function') {
    GLightbox({
      selector: '.glightbox',
    });
  }

  /**
   * Suporte a toque (touch/mobile) e foco por teclado nos diferenciais (Features)
   */
  const featureBoxes = document.querySelectorAll('.feature-box.hover-trigger');
  featureBoxes.forEach((box) => {
    box.addEventListener('click', function () {
      featureBoxes.forEach((b) => b.classList.remove('active'));
      this.classList.add('active');
    });
  });
})();
