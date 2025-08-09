document.addEventListener('DOMContentLoaded', function() {
    // Professional loading and initialization
    initializePortfolio();
    
    function initializePortfolio() {
        // Add loading states
        document.body.classList.add('loading');
        
        // Initialize components
        setTimeout(() => {
            document.body.classList.remove('loading');
            initializeScrollEffects();
            initializeIntersectionObserver();
            initializeSmoothScrolling();
            initializeKeyboardNavigation();
        }, 100);
    }
    
    function initializeScrollEffects() {
        // Enhanced scroll effects with throttling
        let ticking = false;
        
        function updateScrollEffects() {
            checkSection();
            updateScrollProgress();
            ticking = false;
        }
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        });
    }
    
    function initializeIntersectionObserver() {
        // Modern intersection observer for better performance
        const observerOptions = {
            threshold: [0.1, 0.5, 0.9],
            rootMargin: '-50px 0px -50px 0px'
        };
        
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                    updateActiveSection(entry.target.id);
                }
            });
        }, observerOptions);
        
        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }
    
    function updateActiveSection(sectionId) {
        // Update active states
        sections.forEach(section => {
            section.classList.toggle('active', section.id === sectionId);
        });
        
        // Update dock navigation
        navLinks.forEach(link => {
            const isActive = link.getAttribute('href').substring(1) === sectionId;
            link.classList.toggle('active', isActive);
            
            const indicator = link.querySelector('.running-indicator');
            if (indicator) {
                indicator.style.opacity = isActive ? '1' : '0';
                indicator.style.transform = `translateX(-50%) scale(${isActive ? 1 : 0})`;
            }
        });
    }
    
    function initializeSmoothScrolling() {
        // Enhanced smooth scrolling with easing
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Show professional transition
                    showSectionTransition();
                    
                    setTimeout(() => {
                        targetSection.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                        
                        // Update URL without triggering scroll
                        history.pushState(null, null, targetId);
                    }, 300);
                }
            });
        });
    }
    
    function showSectionTransition() {
        const sectionTransition = document.querySelector('.section-transition');
        if (sectionTransition) {
            sectionTransition.classList.add('active');
            setTimeout(() => {
                sectionTransition.classList.remove('active');
            }, 600);
        }
    }
    
    function initializeKeyboardNavigation() {
        // Professional keyboard navigation
        document.addEventListener('keydown', function(e) {
            // Escape key handling
            if (e.key === 'Escape') {
                closeAllModals();
            }
            
            // Arrow key navigation
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                if (!isModalOpen()) {
                    e.preventDefault();
                    navigateToNextSection(e.key === 'ArrowDown');
                }
            }
        });
    }
    
    function navigateToNextSection(isDown) {
        const currentSection = document.querySelector('section.active');
        const allSections = Array.from(sections);
        const currentIndex = allSections.indexOf(currentSection);
        
        let nextIndex;
        if (isDown) {
            nextIndex = (currentIndex + 1) % allSections.length;
        } else {
            nextIndex = (currentIndex - 1 + allSections.length) % allSections.length;
        }
        
        const nextSection = allSections[nextIndex];
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    function closeAllModals() {
        document.querySelectorAll('.project-modal.active, .modal-overlay.active').forEach(modal => {
            modal.classList.remove('active');
        });
    }
    
    function isModalOpen() {
        return document.querySelector('.project-modal.active, .modal-overlay.active') !== null;
    }
    
    function updateScrollProgress() {
        // Add scroll progress indicator
        const scrollProgress = document.querySelector('.scroll-progress');
        if (scrollProgress) {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            scrollProgress.style.width = `${scrollPercent}%`;
        }
    }
    
    // Section visibility on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.dock-item');
    
    function checkSection() {
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Activate the section
                updateActiveSection(sectionId);
            }
        });
    }
    
    // Create background particles
    function createBackgroundParticles() {
        const particleCount = window.innerWidth > 768 ? 30 : 15;
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const particlesContainer = document.createElement('div');
            particlesContainer.className = 'background-particles';
            particlesContainer.style.position = 'absolute';
            particlesContainer.style.top = '0';
            particlesContainer.style.left = '0';
            particlesContainer.style.width = '100%';
            particlesContainer.style.height = '100%';
            particlesContainer.style.pointerEvents = 'none';
            particlesContainer.style.zIndex = '0';
            
            section.appendChild(particlesContainer);
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.style.position = 'absolute';
                particle.style.width = `${1 + Math.random() * 2}px`;
                particle.style.height = particle.style.width;
                particle.style.backgroundColor = 'rgba(66, 134, 244, 0.05)';
                particle.style.borderRadius = '50%';
                
                // Random position
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}%`;
                
                // Animation
                const duration = 20 + Math.random() * 30;
                const delay = Math.random() * 10;
                particle.style.animation = `float ${duration}s ${delay}s infinite ease-in-out`;
                
                particlesContainer.appendChild(particle);
            }
        });
        
        // Add keyframes animation
        const style = document.createElement('style');
        if (!document.getElementById('particle-keyframes')) {
            style.id = 'particle-keyframes';
        style.textContent = `
            @keyframes float {
                0%, 100% { 
                    transform: translate(0, 0) rotate(0deg); 
                    opacity: 0.05;
                }
                25% { 
                    transform: translate(30px, -30px) rotate(90deg); 
                    opacity: 0.1;
                }
                50% { 
                    transform: translate(-20px, 40px) rotate(180deg); 
                    opacity: 0.05;
                }
                75% { 
                    transform: translate(40px, 20px) rotate(270deg); 
                    opacity: 0.08;
                }
            }
        `;
        document.head.appendChild(style);
        }
    }
    
    // Initialize background particles
    if (window.innerWidth > 480) {
        createBackgroundParticles();
    }
    
    // Professional resize handling
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            checkSection();
            // Reinitialize particles on significant size changes
            if (Math.abs(window.innerWidth - (window.lastWidth || 0)) > 200) {
                const existingParticles = document.querySelectorAll('.background-particles');
                existingParticles.forEach(container => container.remove());
                
                if (window.innerWidth > 480) {
                    createBackgroundParticles();
                }
                window.lastWidth = window.innerWidth;
            }
        }, 250);
    });
    
    // Add scroll progress bar
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    scrollProgress.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--accent-color), var(--accent-hover));
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(scrollProgress);
    
    // Initialize everything
    checkSection();
    
    // Performance monitoring (development only)
    if (window.location.hostname === 'localhost') {
        console.log('Portfolio initialized successfully');
        
        // Monitor performance
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log(`Page load time: ${perfData.loadEventEnd - perfData.loadEventStart}ms`);
            }, 0);
        });
    }
    
    // Add professional error handling
    window.addEventListener('error', function(e) {
        console.error('Portfolio error:', e.error);
        // Could send to analytics service in production
    });
});