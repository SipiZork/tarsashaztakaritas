document.addEventListener('DOMContentLoaded', () => {
  // Fejléc összemenés görgetésnél
  const header = document.querySelector('header');
  const setHeaderState = () => {
    if (!header) return;
    if (window.scrollY > 8) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };
  setHeaderState();
  window.addEventListener('scroll', setHeaderState, { passive: true });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1
  });

  const animatedElements = document.querySelectorAll('[data-animation]');
  animatedElements.forEach(el => observer.observe(el));

  // Hero háttérkép diavetítés (10 mp)
  const hero = document.getElementById('hero');
  const bgA = document.getElementById('hero-bg-a');
  const bgB = document.getElementById('hero-bg-b');
  if (hero && bgA && bgB) {
    const images = [
      'https://images.unsplash.com/photo-1739172586862-80edb0432fba?q=80&w=1920&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1669101602108-fa5ba89507ee?q=80&w=1920&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1646618697079-3de96be2af49?q=80&w=1920&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1633170045613-006a23dea9bb?q=80&w=1920&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1702763529941-ffa1f54fb7ae?q=80&w=1920&auto=format&fit=crop'
    ];

    let current = 0;
    let showingA = true;

    // Kezdő képek
    bgA.style.backgroundImage = `url(${images[0]})`;
    bgA.classList.add('is-visible');
    bgB.style.backgroundImage = `url(${images[1 % images.length]})`;

    function swapBackground() {
      const next = (current + 1) % images.length;
      if (showingA) {
        bgB.style.backgroundImage = `url(${images[next]})`;
        bgB.classList.add('is-visible');
        bgA.classList.remove('is-visible');
      } else {
        bgA.style.backgroundImage = `url(${images[next]})`;
        bgA.classList.add('is-visible');
        bgB.classList.remove('is-visible');
      }
      showingA = !showingA;
      current = next;
    }

    // 10 másodpercenként vált
    setInterval(swapBackground, 10000);
  }
});