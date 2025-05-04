document.addEventListener('DOMContentLoaded', () => {
    console.log('JS loaded!');
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

    // EmailJS integration for contact form with debug logging
    const form = document.getElementById('contact-form');
    if (form) {
        console.log('Contact form found. Attaching submit handler.');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submit intercepted. Attempting to send via EmailJS...');
            emailjs.sendForm('service_iddkulb', 'template_bh5osl9', this)
                .then(function(response) {
                    console.log('EmailJS sendForm success:', response);
                    alert('Message sent successfully!');
                    form.reset();
                }, function(error) {
                    console.error('EmailJS sendForm error:', error);
                    alert('Failed to send message. Please try again later.');
                });
        });
    } else {
        console.warn('Contact form not found on page.');
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
            nav.classList.toggle('nav-open');
        });
        hamburger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                nav.classList.toggle('nav-open');
            }
        });
    }

    // Carousel for project 1 gallery
    if (document.querySelector('.carousel')) {
        const track = document.querySelector('.carousel-track');
        const slides = Array.from(document.querySelectorAll('.carousel-slide'));
        const prevBtn = document.querySelector('.carousel-arrow.left');
        const nextBtn = document.querySelector('.carousel-arrow.right');
        let current = 0;
        let interval = null;

        function showSlide(idx) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === idx);
            });
            current = idx;
        }

        function nextSlide() {
            showSlide((current + 1) % slides.length);
        }
        function prevSlide() {
            showSlide((current - 1 + slides.length) % slides.length);
        }

        function startAuto() {
            if (interval) clearInterval(interval);
            interval = setInterval(nextSlide, 4000);
        }
        function stopAuto() {
            if (interval) clearInterval(interval);
        }

        nextBtn.addEventListener('click', () => {
            nextSlide();
            startAuto();
        });
        prevBtn.addEventListener('click', () => {
            prevSlide();
            startAuto();
        });
        track.addEventListener('mouseenter', stopAuto);
        track.addEventListener('mouseleave', startAuto);
        track.addEventListener('focusin', stopAuto);
        track.addEventListener('focusout', startAuto);

        // Touch/swipe support
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
    }
}); 