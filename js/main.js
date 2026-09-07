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
        const prevBtn = lightbox.querySelector('.lightbox-prev');
        const nextBtn = lightbox.querySelector('.lightbox-next');

        let images = [];
        let current = 0;

        function photoUrl(photo) {
            const style = photo.getAttribute('style') || '';
            const match = style.match(/url\(['"]?([^'")]+)['"]?\)/);
            return match ? match[1] : null;
        }

        function updateArrows() {
            if (prevBtn) prevBtn.style.display = images.length > 1 ? '' : 'none';
            if (nextBtn) nextBtn.style.display = images.length > 1 ? '' : 'none';
        }

        function showImage(index) {
            if (images.length === 0) return;
            current = (index + images.length) % images.length;
            lightboxImg.src = images[current];
            lightboxImg.alt = 'Enlarged session photo ' + (current + 1) + ' of ' + images.length;
        }

        function openLightbox(urls, index) {
            images = urls.slice();
            current = index || 0;
            showImage(current);
            updateArrows();
            lightbox.classList.add('open');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            lightbox.classList.remove('open');
            document.body.style.overflow = '';
        }

        document.querySelectorAll('.event-photo').forEach(function (photo) {
            photo.addEventListener('click', function () {
                const urls = [];
                const photos = document.querySelectorAll('.event-photo');
                photos.forEach(function (p) {
                    const url = photoUrl(p);
                    if (url) urls.push(url);
                });
                const start = urls.indexOf(photoUrl(photo));
                openLightbox(urls, start >= 0 ? start : 0);
            });
        });

        if (prevBtn) {
            prevBtn.addEventListener('click', function (event) {
                event.stopPropagation();
                showImage(current - 1);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function (event) {
                event.stopPropagation();
                showImage(current + 1);
            });
        }

        closeBtn.addEventListener('click', closeLightbox);

        lightbox.addEventListener('click', function (event) {
            if (event.target === lightbox) {
                closeLightbox();
            }
        });

        document.addEventListener('keydown', function (event) {
            if (!lightbox.classList.contains('open')) return;
            if (event.key === 'Escape') closeLightbox();
            if (event.key === 'ArrowLeft') showImage(current - 1);
            if (event.key === 'ArrowRight') showImage(current + 1);
        });
    }

    initLightbox();
})();