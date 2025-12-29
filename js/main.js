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

document.addEventListener('click', (e) => {
    if (!e.target.closest('.header')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('mobile-open');
        body.classList.remove('nav-open');
    }
});

const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

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

const CAROUSEL_INTERVAL = 5000;
let carouselIntervalId = null;
function startCarouselAuto(){ if (!carousel) return; stopCarouselAuto(); carouselIntervalId = setInterval(()=> showSlide(currentIndex + 1), CAROUSEL_INTERVAL); }
function stopCarouselAuto(){ if (carouselIntervalId){ clearInterval(carouselIntervalId); carouselIntervalId = null; } }
startCarouselAuto();
carousel && carousel.addEventListener('mouseenter', stopCarouselAuto);
carousel && carousel.addEventListener('mouseleave', startCarouselAuto);
nextBtn && nextBtn.addEventListener('click', () => { startCarouselAuto(); });
prevBtn && prevBtn.addEventListener('click', () => { startCarouselAuto(); });

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

showSmallSlide(0);

const SMALL_CAROUSEL_INTERVAL = 6000;
let smallCarouselIntervalId = null;
function startSmallAuto(){ if (!smallCarousel) return; stopSmallAuto(); smallCarouselIntervalId = setInterval(()=> showSmallSlide(smallIndex + 1), SMALL_CAROUSEL_INTERVAL); }
function stopSmallAuto(){ if (smallCarouselIntervalId){ clearInterval(smallCarouselIntervalId); smallCarouselIntervalId = null; } }
startSmallAuto();
smallCarousel && smallCarousel.addEventListener('mouseenter', stopSmallAuto);
smallCarousel && smallCarousel.addEventListener('mouseleave', startSmallAuto);
smallNext && smallNext.addEventListener('click', () => { startSmallAuto(); });
smallPrev && smallPrev.addEventListener('click', () => { startSmallAuto(); });

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section, footer, .handles, .projects-gallery img");

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



