document.addEventListener('DOMContentLoaded', () => {
    // Handle back to portfolio navigation
    const backToPortfolio = document.querySelector('a[href="../index.html"]');
    if (backToPortfolio) {
        backToPortfolio.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = '../index.html';
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href;
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Add pixel art effect to borders on hover
    const pixelBorders = document.querySelectorAll('.pixel-border');
    pixelBorders.forEach(border => {
        border.addEventListener('mouseenter', () => {
            border.style.borderColor = '#FF6584';
        });
        border.addEventListener('mouseleave', () => {
            border.style.borderColor = '#6C63FF';
        });
    });

    // EmailJS integration for contact form
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            emailjs.sendForm('service_iddkulb', 'template_bh5osl9', this)
                .then(function(response) {
                    alert('Message sent successfully!');
                    form.reset();
                }, function(error) {
                    alert('Failed to send message. Please try again later.');
                });
        });
    }

    // Add animation to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Add typing effect to hero section
    const heroText = document.querySelector('.pixel-text');
    if (heroText) {
        const text = heroText.textContent;
        heroText.textContent = '';
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                heroText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        typeWriter();
    }

    // Hamburger menu toggle for mobile
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            nav.classList.toggle('open');
        });
    }

    // Carousel functionality for project gallery
    document.querySelectorAll('.carousel').forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
        const prevButton = carousel.querySelector('.carousel-arrow.left');
        const nextButton = carousel.querySelector('.carousel-arrow.right');
        let currentIndex = 0;
        let autoSlide;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            currentIndex = index;
        }

        function prevSlide() {
            showSlide((currentIndex - 1 + slides.length) % slides.length);
        }

        function nextSlide() {
            showSlide((currentIndex + 1) % slides.length);
        }

        function startAuto() {
            clearInterval(autoSlide);
            autoSlide = setInterval(nextSlide, 6000);
        }

        if (prevButton) prevButton.addEventListener('click', () => { prevSlide(); startAuto(); });
        if (nextButton) nextButton.addEventListener('click', () => { nextSlide(); startAuto(); });

        let startX = null;
        track.addEventListener('touchstart', e => {
            startX = e.touches[0].clientX;
        });
        track.addEventListener('touchend', e => {
            if (startX === null) return;
            let endX = e.changedTouches[0].clientX;
            if (endX - startX > 50) prevSlide();
            else if (startX - endX > 50) nextSlide();
            startAuto();
            startX = null;
        });

        showSlide(0);
        startAuto();
    });
}); 