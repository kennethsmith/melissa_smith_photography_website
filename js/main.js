/* ============================================================
   Melissa Smith Photography — Main JavaScript
   ============================================================ */

(function () {
    'use strict';

    /* ---------- Mobile Navigation Toggle ---------- */

    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            navMenu.classList.toggle('open');
        });

        navMenu.querySelectorAll('.nav-link').forEach(function (link) {
            link.addEventListener('click', function () {
                navMenu.classList.remove('open');
            });
        });
    }

    /* ---------- Hero Slideshow ---------- */

    function initHeroSlideshow() {
        const slides = document.querySelectorAll('.hero-slide');
        if (slides.length === 0) return;

        let current = 0;
        const interval = 6000;

        function nextSlide() {
            slides[current].classList.remove('active');
            current = (current + 1) % slides.length;
            slides[current].classList.add('active');
        }

        setInterval(nextSlide, interval);
    }

    initHeroSlideshow();

    /* ---------- Carousel ---------- */

    function initCarousel() {
        const carousel = document.querySelector('.carousel');
        if (!carousel) return;

        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        const dotsContainer = carousel.querySelector('.carousel-dots');
        const interval = 5000;

        let current = 0;
        let autoPlay;

        if (slides.length === 0) return;

        slides.forEach(function (slide, index) {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            dot.setAttribute('aria-label', 'Go to slide ' + (index + 1));
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', function () {
                goToSlide(index);
                restartAutoPlay();
            });
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll('.carousel-dot');

        function goToSlide(index) {
            slides[current].classList.remove('carousel-active');
            dots[current].classList.remove('active');
            current = (index + slides.length) % slides.length;
            slides[current].classList.add('carousel-active');
            dots[current].classList.add('active');
        }

        function nextSlide() {
            goToSlide(current + 1);
        }

        function prevSlide() {
            goToSlide(current - 1);
        }

        function startAutoPlay() {
            autoPlay = setInterval(nextSlide, interval);
        }

        function restartAutoPlay() {
            clearInterval(autoPlay);
            startAutoPlay();
        }

        prevBtn.addEventListener('click', function () {
            prevSlide();
            restartAutoPlay();
        });

        nextBtn.addEventListener('click', function () {
            nextSlide();
            restartAutoPlay();
        });

        carousel.addEventListener('mouseenter', function () {
            clearInterval(autoPlay);
        });

        carousel.addEventListener('mouseleave', function () {
            startAutoPlay();
        });

        slides[0].classList.add('carousel-active');
        startAutoPlay();
    }

    initCarousel();

    /* ---------- Gallery Session Filters ---------- */

    function initSessionFilters() {
        const filters = document.querySelectorAll('.filter-btn');
        if (filters.length === 0) return;

        const cards = document.querySelectorAll('.session-card');

        filters.forEach(function (filter) {
            filter.addEventListener('click', function () {
                filters.forEach(function (f) {
                    f.classList.remove('active');
                });
                filter.classList.add('active');

                const category = filter.getAttribute('data-filter');

                cards.forEach(function (card) {
                    if (category === 'all' || card.getAttribute('data-category') === category) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });
    }

    initSessionFilters();

    /* ---------- Event Gallery Lightbox ---------- */

    function initLightbox() {
        const lightbox = document.querySelector('.lightbox');
        if (!lightbox) return;

        const lightboxImg = lightbox.querySelector('.lightbox-img');
        const closeBtn = lightbox.querySelector('.lightbox-close');

        document.querySelectorAll('.event-photo').forEach(function (photo) {
            photo.addEventListener('click', function () {
                const style = photo.getAttribute('style') || '';
                const match = style.match(/url\(['"]?([^'")]+)['"]?\)/);
                if (!match) return;

                lightboxImg.src = match[1];
                lightbox.classList.add('open');
                lightboxImg.alt = 'Enlarged session photo';
                document.body.style.overflow = 'hidden';
            });
        });

        function closeLightbox() {
            lightbox.classList.remove('open');
            document.body.style.overflow = '';
        }

        closeBtn.addEventListener('click', closeLightbox);

        lightbox.addEventListener('click', function (event) {
            if (event.target === lightbox) {
                closeLightbox();
            }
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && lightbox.classList.contains('open')) {
                closeLightbox();
            }
        });
    }

    initLightbox();
})();