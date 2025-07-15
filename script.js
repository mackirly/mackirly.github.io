document.addEventListener('DOMContentLoaded', function() {
    // Language toggle
    const langToggle = document.getElementById('lang-toggle');
    const currentLang = localStorage.getItem('language') || 'ru';
    
    function setLanguage(lang) {
        document.querySelectorAll('[data-lang]').forEach(el => {
            if (el.getAttribute('data-lang') === lang) {
                el.style.display = '';
            } else {
                el.style.display = 'none';
            }
        });
        localStorage.setItem('language', lang);
    }
    
    setLanguage(currentLang);
    
    langToggle.addEventListener('click', () => {
        const newLang = localStorage.getItem('language') === 'ru' ? 'en' : 'ru';
        setLanguage(newLang);
    });
    
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    body.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    themeToggle.addEventListener('click', () => {
        const newTheme = body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = 'var(--shadow-md)';
        } else {
            navbar.style.boxShadow = 'var(--shadow-sm)';
        }
    });
    
    // Scroll to top button
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Animate sections on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animate skill bars
                if (entry.target.classList.contains('skills')) {
                    const skillItems = entry.target.querySelectorAll('.skill-item');
                    skillItems.forEach(item => {
                        const level = item.getAttribute('data-level');
                        const progress = item.querySelector('.skill-progress');
                        setTimeout(() => {
                            progress.style.width = level + '%';
                        }, 200);
                    });
                }
                
                // Animate stats numbers
                if (entry.target.classList.contains('about')) {
                    animateNumbers();
                }
            }
        });
    }, observerOptions);
    
    // Apply initial styles and observe sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        sectionObserver.observe(section);
    });
    
    // Animate timeline items
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 100);
            }
        });
    }, observerOptions);
    
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        timelineObserver.observe(item);
    });
    
    // Animate project cards
    const projectObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, observerOptions);
    
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        projectObserver.observe(card);
    });
    
    // Animate numbers
    function animateNumbers() {
        const stats = document.querySelectorAll('.stat-item h3');
        stats.forEach(stat => {
            const target = parseInt(stat.innerText);
            const increment = target / 50;
            let current = 0;
            
            const updateNumber = () => {
                if (current < target) {
                    current += increment;
                    stat.innerText = Math.ceil(current) + '+';
                    requestAnimationFrame(updateNumber);
                } else {
                    stat.innerText = target + '+';
                }
            };
            
            updateNumber();
        });
    }
    
    // Typing effect for hero greeting
    const heroGreeting = document.querySelector('.hero-greeting');
    const text = heroGreeting.innerText;
    heroGreeting.innerText = '';
    let charIndex = 0;
    
    function typeText() {
        if (charIndex < text.length) {
            heroGreeting.innerText += text[charIndex];
            charIndex++;
            setTimeout(typeText, 100);
        }
    }
    
    setTimeout(typeText, 500);
    
    // Active navigation highlight
    const navLinks = document.querySelectorAll('.nav-links a');
    const navSections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + 100;
        
        navSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
});

// Add active class styles
const style = document.createElement('style');
style.textContent = `
    .nav-links a.active {
        color: var(--primary-color);
    }
    .nav-links a.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);