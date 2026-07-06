/**
 * Eunico Portfolio - Premium JavaScript Functionality
 */

document.addEventListener('DOMContentLoaded', () => {
    // --------------------------------------------------------------------------
    // 1. Theme Configuration (Dark / Light Mode)
    // --------------------------------------------------------------------------
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Load theme from localStorage or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // --------------------------------------------------------------------------
    // 2. Typing Animation Effect (Hero Section)
    // --------------------------------------------------------------------------
    const typingTextElement = document.getElementById('typing-text');
    const words = [
        "BSIT Graduate.",
        "Flask & PHP Developer.",
        "Data Entry Specialist.",
        "Administrative Officer."
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            // Remove character
            typingTextElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Deleting is faster
        } else {
            // Add character
            typingTextElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Standard typing speed
        }

        // State checks
        if (!isDeleting && charIndex === currentWord.length) {
            // Word finished typing, pause before deleting
            isDeleting = true;
            typingSpeed = 2000; // Pause at the end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            // Move to next word
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Short pause before starting next word
        }

        setTimeout(typeEffect, typingSpeed);
    }

    // Initialize typing effect
    if (typingTextElement) {
        setTimeout(typeEffect, 1000);
    }

    // --------------------------------------------------------------------------
    // 3. Desktop Interactive Cursor Glow
    // --------------------------------------------------------------------------
    const cursorGlow = document.getElementById('cursor-glow');

    if (window.matchMedia('(pointer: fine)').matches) {
        // Only run on devices with a mouse
        cursorGlow.style.display = 'block';

        window.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = `${e.clientX}px`;
            cursorGlow.style.top = `${e.clientY}px`;
        });
    }

    // --------------------------------------------------------------------------
    // 4. Mobile Navigation Hamburger Menu
    // --------------------------------------------------------------------------
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    function toggleMenu() {
        navToggle.classList.toggle('open');
        navMenu.classList.toggle('open');
        // Prevent body scrolling when mobile menu is open
        document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : 'auto';
    }

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', toggleMenu);
    }

    // Close menu when clicking link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    // --------------------------------------------------------------------------
    // 5. Scroll Active Link Highlighting
    // --------------------------------------------------------------------------
    const sections = document.querySelectorAll('section');

    function highlightNavLinkOnScroll() {
        let scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 120; // offset header height
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector(`.nav-link[href*=${sectionId}]`)?.classList.add('active');
            } else {
                document.querySelector(`.nav-link[href*=${sectionId}]`)?.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNavLinkOnScroll);

    // --------------------------------------------------------------------------
    // 6. Skills Category Filtering
    // --------------------------------------------------------------------------
    const skillFilterBtns = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    skillFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            skillFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            skillCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // --------------------------------------------------------------------------
    // 7. Projects Category Filtering
    // --------------------------------------------------------------------------
    const projectFilterBtns = document.querySelectorAll('.project-filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    projectFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            projectFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // --------------------------------------------------------------------------
    // 8. Skill Progress Bars Animation on Scroll
    // --------------------------------------------------------------------------
    const skillSection = document.getElementById('skills');
    const progressBars = document.querySelectorAll('.progress');

    // Create an intersection observer to trigger progression fills
    const observerOptions = {
        root: null,
        threshold: 0.15 // trigger when 15% of section is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate each progress bar to its style width
                progressBars.forEach(bar => {
                    const widthStyle = bar.style.width;
                    // Reset to 0 first, then transition to full width for animation visual
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = widthStyle;
                        bar.style.transition = 'width 1.5s cubic-bezier(0.1, 0.8, 0.2, 1)';
                    }, 50);
                });
                // Once triggered, disconnect to prevent repeating
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    if (skillSection) {
        observer.observe(skillSection);
    }

    // --------------------------------------------------------------------------
    // 9. Contact Form Validation & Feedback popup
    // --------------------------------------------------------------------------
    const contactForm = document.getElementById('portfolio-contact-form');
    const formFeedback = document.getElementById('form-feedback');
    const feedbackCloseBtn = document.getElementById('feedback-close');

    if (contactForm && formFeedback) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Perform simple frontend validation check
            const name = document.getElementById('form-name').value.trim();
            const email = document.getElementById('form-email').value.trim();
            const subject = document.getElementById('form-subject').value.trim();
            const message = document.getElementById('form-message').value.trim();

            if (name && email && subject && message) {
                const actionUrl = contactForm.getAttribute('action');
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const submitBtnText = submitBtn.querySelector('span');
                const originalText = submitBtnText.textContent;
                
                // Show sending state
                submitBtnText.textContent = "Sending...";
                submitBtn.disabled = true;

                // Send request via fetch
                fetch(actionUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        subject: subject,
                        message: message
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success === 'true' || data.success === true) {
                        // Show feedback popup alert
                        formFeedback.classList.remove('hidden');
                        contactForm.reset();
                    } else {
                        alert("Oops! " + (data.message || "There was an issue sending your message. Please try again or email directly."));
                    }
                })
                .catch(error => {
                    console.error("Form Submit Error:", error);
                    alert("An error occurred while sending your message. Please verify your internet connection and try again.");
                })
                .finally(() => {
                    // Restore button state
                    submitBtnText.textContent = originalText;
                    submitBtn.disabled = false;
                });
            }
        });
    }

    if (feedbackCloseBtn && formFeedback) {
        feedbackCloseBtn.addEventListener('click', () => {
            formFeedback.classList.add('hidden');
        });
    }
});
