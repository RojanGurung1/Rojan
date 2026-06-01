document.addEventListener('DOMContentLoaded', () => {
    
    /* --- SYSTEM & INITIAL STATE THEME SETTINGS --- */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    
    if (savedTheme === 'light' || (!savedTheme && prefersLight)) {
        body.classList.add('light-mode');
    }
    
    // Theme toggle click handler
    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        const activeTheme = body.classList.contains('light-mode') ? 'light' : 'dark';
        localStorage.setItem('theme', activeTheme);
        
        // Brief scale-up effect on toggle button
        themeToggleBtn.style.transform = 'scale(0.85)';
        setTimeout(() => {
            themeToggleBtn.style.transform = 'scale(1)';
        }, 150);
    });

    /* --- MOBILE MENU DRAWERS --- */
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    mobileNavToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        const icon = mobileNavToggle.querySelector('i');
        if (navMenu.classList.contains('open')) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    });

    // Close menu when clicking a link or clicking outside
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            mobileNavToggle.querySelector('i').className = 'fas fa-bars';
        });
    });

    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileNavToggle.contains(e.target) && navMenu.classList.contains('open')) {
            navMenu.classList.remove('open');
            mobileNavToggle.querySelector('i').className = 'fas fa-bars';
        }
    });

    /* --- VANILLA TYPING EFFECT IN HERO --- */
    const typedTextSpan = document.getElementById('typed-text');
    const words = ["Computer Science Student", "Full-Stack Developer", "UI/UX Enthusiast", "Problem Solver"];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newWordDelay = 2000;
    let wordIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < words[wordIndex].length) {
            typedTextSpan.textContent += words[wordIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            setTimeout(erase, newWordDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typedTextSpan.textContent = words[wordIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(type, typingDelay + 300);
        }
    }

    // Start typing animation
    if (words.length) setTimeout(type, 1000);

    /* --- ACTIVE MENU LINK HIGHLIGHTING ON SCROLL --- */
    const sections = document.querySelectorAll('section');
    
    const navObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };
    
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, navObserverOptions);
    
    sections.forEach(section => {
        navObserver.observe(section);
    });

    /* --- PORTFOLIO FILTERING LOGIC --- */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from other buttons
            filterButtons.forEach(button => button.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all' || cardCategory === filterValue) {
                    // Smooth reveal animation
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    // Smooth hide animation
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    /* --- SCROLL-TO-TOP BUTTON VISIBILITY --- */
    const scrollTopBtn = document.getElementById('scroll-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    /* --- CONTACT FORM DECORATIONS & ACTION --- */
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get inputs
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            
            // Simple validation
            if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
                alert('Please fill out all fields.');
                return;
            }
            
            // Simulation submit state
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            setTimeout(() => {
                // Success feedback
                formStatus.textContent = "Thank you! Your message has been sent successfully. I will get back to you soon.";
                formStatus.className = "form-status success";
                
                // Clear form
                contactForm.reset();
                
                // Reset button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                
                // Hide status message after 5 seconds
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 6000);
                
            }, 1800); // 1.8 seconds artificial delay
        });
    }
});
