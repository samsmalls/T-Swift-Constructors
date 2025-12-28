// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const body = document.body;

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('mobile-open');
    body.classList.toggle('nav-open');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('mobile-open');
        body.classList.remove('nav-open');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.header')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('mobile-open');
        body.classList.remove('nav-open');
    }
});

// Scroll Blur Effect
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Carousel functionality
const carousel = document.getElementById('carousel');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentIndex = 0;

function showSlide(index) {
    if (!carousel) return;
    const len = slides.length;
    currentIndex = (index + len) % len;
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    slides.forEach((s, i) => s.setAttribute('aria-hidden', i !== currentIndex));
}

nextBtn && nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    showSlide(currentIndex + 1);
});

prevBtn && prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    showSlide(currentIndex - 1);
});

// Initialize
showSlide(0);

// Optional keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') showSlide(currentIndex + 1);
    if (e.key === 'ArrowLeft') showSlide(currentIndex - 1);
});

// Small carousel (What We Do) handlers
const smallCarousel = document.getElementById('smallCarousel');
const smallSlides = document.querySelectorAll('.small-slide');
const smallPrev = document.getElementById('smallPrev');
const smallNext = document.getElementById('smallNext');
const smallExplanation = document.getElementById('smallExplanation');
let smallIndex = 0;

function showSmallSlide(i) {
    if (!smallCarousel) return;
    const len = smallSlides.length;
    smallIndex = (i + len) % len;
    smallCarousel.style.transform = `translateX(-${smallIndex * 100}%)`;
    smallSlides.forEach((s, idx) => s.setAttribute('aria-hidden', idx !== smallIndex));
    // Update explanation text for each slide — placeholder sentences
    const explanations = [
        'Beautiful bungalow with elegant finishes and quality craftsmanship. Your dream family home realized.',
        'Bungalow construction with quality finishes and attention to detail. Perfect residential spaces for families.',
        'Modern apartment complexes built with durability and modern amenities. Comfortable urban living solutions.',
        'Professional roofing services for residential and commercial properties. Weatherproof protection guaranteed.'
    ];
    smallExplanation.querySelector('.explain-text').textContent = explanations[smallIndex] || '';
}

smallNext && smallNext.addEventListener('click', (e) => { e.stopPropagation(); showSmallSlide(smallIndex + 1); });
smallPrev && smallPrev.addEventListener('click', (e) => { e.stopPropagation(); showSmallSlide(smallIndex - 1); });

// init small carousel
showSmallSlide(0);



document.addEventListener("DOMContentLoaded", () => {
  // Select all sections you want animated
  const sections = document.querySelectorAll("section, footer, .handles");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("scroll-animate", "in-view");
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  sections.forEach(section => observer.observe(section));
});



const FORM_ENDPOINT = 'https://formspree.io/f/xanrdjen'; 
const SITE_OWNER_EMAIL = 'TswiftConstructors@gmail.com';

const contactForm = document.getElementById('contact-form');
if (contactForm){
  const submitBtn = document.getElementById('contact-submit');
  const statusEl = document.getElementById('contact-status');

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!submitBtn) return;

    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();

    if (!name || !email || !message){
      statusEl.textContent = 'Please fill all fields.';
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    statusEl.textContent = '';

    // Endpoint preference: data-endpoint on form overrides FORM_ENDPOINT constant
    const endpoint = contactForm.dataset.endpoint?.trim() || FORM_ENDPOINT.trim();

    try {
      if (endpoint){
        // send JSON via fetch — most form endpoints including Formspree accept application/json
        // Set a timeout using AbortController so the request can't hang indefinitely
        const controller = new AbortController();
        const FETCH_TIMEOUT = 10000; // 10 seconds
        const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

        try {
          const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ name, email, message }),
            signal: controller.signal
          });

          clearTimeout(timeoutId);

          if (res.ok){
            statusEl.textContent = 'Message sent successfully! Thank you for reaching out.';
            contactForm.reset();
          } else {
            // try to parse JSON message for debugging
            let text = 'Failed to send message.';
            try { const json = await res.json(); if (json?.error) text = json.error; } catch(e){}
            statusEl.textContent = text;
          }
        } catch (err) {
          clearTimeout(timeoutId);
          if (err.name === 'AbortError'){
            statusEl.textContent = 'Request timed out — please try again later.';
          } else {
            console.error('Fetch error', err);
            statusEl.textContent = 'Network error while sending. Please check your connection and try again.';
          }
        }

      } else {
        // fallback: open user's mail client addressed to SITE_OWNER_EMAIL so messages reach you
        const subject = encodeURIComponent('Website contact from ' + name);
        const body = encodeURIComponent(`From: ${name} <${email}>%0A%0A${message}`);
        window.location.href = `mailto:${encodeURIComponent(SITE_OWNER_EMAIL)}?subject=${subject}&body=${body}`;
        statusEl.textContent = 'Opening your email client so you can send the message…';
      }

    } catch (err) {
      console.error('Contact submit error', err);
      statusEl.textContent = 'An unexpected error occurred. Please try again later.';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send message';
    }
  });
}
