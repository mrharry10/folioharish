/* ============================================
   HARISH MANNI — PORTFOLIO SCRIPTS
   script.js
   ============================================ */

/* ---------- CUSTOM CURSOR ---------- */
const cursor    = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

// Move the dot cursor instantly
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX - 6 + 'px';
  cursor.style.top  = mouseY - 6+ 'px';
});

// Animate the ring with smooth lag
function animateRing() {
  ringX += (mouseX - ringX - 199) * 0.12;
  ringY += (mouseY - ringY - 199) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

// Scale cursor on interactive elements
const interactiveEls = document.querySelectorAll('a, button, .skill-card, .project-card');
interactiveEls.forEach((el) => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform    = 'scale(2.5)';
    cursorRing.style.transform = 'scale(0.5)';
    cursorRing.style.opacity  = '1';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform    = 'scale(1)';
    cursorRing.style.transform = 'scale(1)';
    cursorRing.style.opacity  = '0.5';
  });
});


/* ---------- SCROLL REVEAL ---------- */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger each card slightly
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach((el) => revealObserver.observe(el));


/* ---------- ANIMATED COUNTERS ---------- */
function animateCounter(el, target, suffix = '') {
  let startTime = null;
  const duration = 1800;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.floor(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

const statNumbers = document.querySelectorAll('.stat-num[data-target]');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.dataset.target);
      const suffix = target === 100 ? '%' : '+';
      animateCounter(entry.target, target, suffix);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statNumbers.forEach((el) => counterObserver.observe(el));


/* ---------- SMOOTH SCROLL ---------- */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const targetEl = document.querySelector(anchor.getAttribute('href'));
    if (targetEl) {
      e.preventDefault();
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});