// ===================================================
// GLOBAL JAVASCRIPT - Akash B L Portfolio
// ===================================================

// ---- Page Loader ----
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('page-loader');
    if (loader) {
      loader.classList.add('hidden');
      setTimeout(() => loader.remove(), 600);
    }
  }, 1300);
});

// ---- Navbar Scroll Effect ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar?.classList.add('scrolled');
  } else {
    navbar?.classList.remove('scrolled');
  }
  handleScrollTop();
});

// ---- Mobile Menu Toggle ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu?.classList.toggle('open');
});

// Close mobile menu on link click
mobileMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger?.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// ---- Active Nav Link ----
function setActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else if (href && currentPage.includes(href.replace('.html', ''))) {
      link.classList.add('active');
    }
  });
}
setActiveNav();

// ---- Dark / Light Theme Toggle ----
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

function applyTheme(theme) {
  if (theme === 'light') {
    document.body.classList.add('light-mode');
    if (themeIcon) themeIcon.className = 'fas fa-moon';
  } else {
    document.body.classList.remove('light-mode');
    if (themeIcon) themeIcon.className = 'fas fa-sun';
  }
  localStorage.setItem('theme', theme);
}

const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

themeToggle?.addEventListener('click', () => {
  const isLight = document.body.classList.contains('light-mode');
  applyTheme(isLight ? 'dark' : 'light');
});

// ---- Scroll-To-Top Button ----
const scrollTopBtn = document.getElementById('scroll-top');

function handleScrollTop() {
  if (!scrollTopBtn) return;
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
}

scrollTopBtn?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ---- Scroll Reveal Animations ----
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// ---- Skill Bar Animations ----
function animateSkillBars() {
  const bars = document.querySelectorAll('.skill-bar-fill');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        fill.style.width = fill.dataset.width;
        observer.unobserve(fill);
      }
    });
  }, { threshold: 0.5 });

  bars.forEach(bar => observer.observe(bar));
}
animateSkillBars();

// ---- Typing Effect ----
function typeWriter(el, texts, speed = 80, pause = 2000) {
  if (!el) return;
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function tick() {
    const currentText = texts[textIndex];
    if (isDeleting) {
      el.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      el.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    let nextTick = isDeleting ? speed / 2 : speed;

    if (!isDeleting && charIndex === currentText.length) {
      nextTick = pause;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      nextTick = 400;
    }

    setTimeout(tick, nextTick);
  }
  tick();
}

const typingEl = document.getElementById('typing-text');
if (typingEl) {
  const texts = typingEl.dataset.texts ? JSON.parse(typingEl.dataset.texts) : [];
  typeWriter(typingEl, texts);
}

// ---- Particles Background ----
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animId;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const COUNT = 55;
  for (let i = 0; i < COUNT; i++) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.5 + 0.4,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.5 + 0.15,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(56,189,248,${p.alpha})`;
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
    });

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(56,189,248,${0.06 * (1 - dist / 110)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
    animId = requestAnimationFrame(draw);
  }
  draw();
})();

// ---- Contact Form Validation ----
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('cf-name');
    const email = document.getElementById('cf-email');
    const message = document.getElementById('cf-message');
    const feedback = document.getElementById('form-feedback');

    let valid = true;
    [name, email, message].forEach(f => f?.classList.remove('error'));

    if (!name?.value.trim()) { name?.classList.add('error'); valid = false; }
    if (!email?.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      email?.classList.add('error'); valid = false;
    }
    if (!message?.value.trim()) { message?.classList.add('error'); valid = false; }

    if (valid && feedback) {
      feedback.textContent = "Thanks for your message! I'll get back to you soon.";
      feedback.className = 'form-feedback success';
      contactForm.reset();
      setTimeout(() => { feedback.textContent = ''; feedback.className = 'form-feedback'; }, 5000);
    } else if (!valid && feedback) {
      feedback.textContent = 'Please fill in all required fields correctly.';
      feedback.className = 'form-feedback error';
    }
  });
}

// ---- Project Category Filter ----
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      if (filter === 'all' || card.dataset.category?.includes(filter)) {
        card.style.display = '';
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
        setTimeout(() => { if (card.classList.contains('hidden')) card.style.display = 'none'; }, 300);
      }
    });
  });
});
