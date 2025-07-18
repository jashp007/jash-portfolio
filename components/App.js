// Main Application Controller - Component-based Netflix Portfolio
class PortfolioApp {
    constructor() {
        this.components = {};
        this.isInitialized = false;
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.start());
        } else {
            this.start();
        }
    }

    start() {
        this.loadComponentStyles();
        this.initializeProfileScreen();
        this.setupGlobalEventListeners();
        this.setupKeyboardShortcuts();
    }

    loadComponentStyles() {
        // Load component-specific styles
        const componentStylesLink = document.createElement('link');
        componentStylesLink.rel = 'stylesheet';
        componentStylesLink.href = './components/components.css';
        document.head.appendChild(componentStylesLink);
    }

    initializeProfileScreen() {
        // Always start with profile screen
        if (window.ProfileScreen) {
            this.components.profileScreen = new window.ProfileScreen();
        }
    }

    initializeMainComponents() {
        // Initialize all main application components
        try {
            if (window.Header && !this.components.header) {
                this.components.header = new window.Header();
            }

            if (window.Hero && !this.components.hero) {
                this.components.hero = new window.Hero();
            }

            if (window.Projects && !this.components.projects) {
                this.components.projects = new window.Projects();
            }

            // Initialize other existing components
            this.initializeLegacyComponents();

            this.isInitialized = true;
            this.showLoadingComplete();

        } catch (error) {
            console.error('Error initializing components:', error);
            this.showErrorMessage('Failed to load some components. Please refresh the page.');
        }
    }

    initializeLegacyComponents() {
        // Initialize existing functionality that's not yet componentized
        this.initializeSkillBadges();
        this.initializeContactMethods();
        this.initializeScrollEffects();
        this.initializeExperienceCards();
        this.initializeAboutSection();
    }

    initializeSkillBadges() {
        const skillBadges = document.querySelectorAll('.skill-badge');
        
        skillBadges.forEach(badge => {
            badge.addEventListener('click', function() {
                this.classList.toggle('selected');
                
                if (this.classList.contains('selected')) {
                    this.style.background = 'var(--netflix-red)';
                    this.style.transform = 'scale(1.05)';
                } else {
                    this.style.background = 'var(--netflix-gray)';
                    this.style.transform = 'scale(1)';
                }
            });

            // Add search functionality
            badge.setAttribute('data-searchable', badge.textContent);
        });
    }

    initializeContactMethods() {
        const contactMethods = document.querySelectorAll('.contact-method');
        
        contactMethods.forEach(method => {
            method.addEventListener('click', function(e) {
                // Add click animation
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);

                // Track contact method usage
                const methodType = this.href.includes('mailto') ? 'email' : 
                                 this.href.includes('tel') ? 'phone' :
                                 this.href.includes('linkedin') ? 'linkedin' : 'github';
                
                console.log(`Contact method used: ${methodType}`);
            });
        });
    }

    initializeScrollEffects() {
        // Enhanced intersection observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.classList.add('animated');
                }
            });
        }, observerOptions);
        
        // Observe content rows and cards
        const animatedElements = document.querySelectorAll('.content-row, .experience-card, .about-card');
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(50px)';
            element.style.transition = 'all 0.6s ease';
            observer.observe(element);
        });
    }

    initializeExperienceCards() {
        const experienceCards = document.querySelectorAll('.experience-card');
        
        experienceCards.forEach((card, index) => {
            // Add enhanced hover effects
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
                this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '';
            });

            // Add staggered animation
            card.style.animationDelay = `${index * 0.2}s`;
        });
    }

    initializeAboutSection() {
        const aboutCard = document.querySelector('.about-card');
        if (aboutCard) {
            // Add interactive elements to about section
            aboutCard.addEventListener('click', function() {
                this.classList.toggle('expanded');
            });
        }
    }

    setupGlobalEventListeners() {
        // Global keyboard navigation
        document.addEventListener('keydown', (e) => this.handleGlobalKeyboard(e));
        
        // Global smooth scrolling
        document.addEventListener('click', (e) => {
            if (e.target.matches('a[href^="#"]')) {
                e.preventDefault();
                this.smoothScrollTo(e.target.getAttribute('href'));
            }
        });

        // Global error handling - COMMENTED OUT TO PREVENT ERROR BANNER
        // TODO: Add back when videos are ready
        /*
        window.addEventListener('error', (e) => {
            console.error('Global error:', e.error);
            
            // Only show error banner for critical errors, not video/resource loading errors
            const errorMessage = e.error.message || '';
            const filename = e.filename || '';
            
            // Ignore resource loading errors and video errors
            if (errorMessage.includes('video') || 
                errorMessage.includes('network') ||
                filename.includes('.mp4') ||
                filename.includes('.webm') ||
                e.error.name === 'NetworkError') {
                console.warn('Resource loading error (ignored):', errorMessage);
                return;
            }
            
            // Only show banner for actual JavaScript errors that affect functionality
            if (errorMessage.includes('undefined') || 
                errorMessage.includes('null') ||
                errorMessage.includes('Cannot read') ||
                errorMessage.includes('function')) {
                this.showErrorMessage('Something went wrong. Please refresh the page.');
            }
        });

        // Handle unhandled promise rejections
        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
            // Only show error for critical promise rejections
            if (e.reason && e.reason.message && !e.reason.message.includes('video')) {
                this.showErrorMessage('Something went wrong. Please try again.');
            }
        });
        */

        // Handle visibility changes (tab switching)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                // Pause any running animations or videos
                const videos = document.querySelectorAll('video');
                videos.forEach(video => video.pause());
            } else {
                // Resume videos when tab becomes visible
                const videos = document.querySelectorAll('video[autoplay]');
                videos.forEach(video => video.play());
            }
        });
    }

    setupKeyboardShortcuts() {
        const shortcuts = {
            'KeyH': () => this.navigateToSection('hero'),
            'KeyA': () => this.navigateToSection('about'),
            'KeyP': () => this.navigateToSection('projects'),
            'KeyS': () => this.navigateToSection('skills'),
            'KeyE': () => this.navigateToSection('experience'),
            'KeyC': () => this.navigateToSection('contact'),
            'Escape': () => this.closeAllModals(),
            'KeyF': () => this.focusSearch(),
            'KeyR': () => this.downloadResume()
        };

        document.addEventListener('keydown', (e) => {
            // Only trigger shortcuts if no input is focused and no modals are open
            if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA' && 
                !document.querySelector('.trailer-modal, .project-details-modal, .notifications-modal')) {
                
                const shortcut = shortcuts[e.code];
                if (shortcut && (e.ctrlKey || e.metaKey)) {
                    e.preventDefault();
                    shortcut();
                }
            }
        });
    }

    handleGlobalKeyboard(e) {
        switch (e.key) {
            case 'Escape':
                this.closeAllModals();
                break;
            case '/':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    this.focusSearch();
                }
                break;
            case 'F1':
                e.preventDefault();
                this.showKeyboardShortcuts();
                break;
        }
    }

    navigateToSection(sectionId) {
        const section = document.getElementById(sectionId) || 
                       document.querySelector(`[data-section="${sectionId}"]`);
        if (section) {
            this.smoothScrollTo(`#${sectionId}`);
        }
    }

    smoothScrollTo(target) {
        const element = document.querySelector(target);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    closeAllModals() {
        const modals = document.querySelectorAll('.trailer-modal, .project-details-modal, .notifications-modal, .share-modal');
        modals.forEach(modal => {
            const video = modal.querySelector('video');
            if (video) video.pause();
            modal.remove();
        });
    }

    focusSearch() {
        const searchInput = document.querySelector('.search-input');
        const searchContainer = document.querySelector('.search-container');
        
        if (searchInput && searchContainer) {
            searchContainer.classList.add('active');
            searchInput.focus();
        }
    }

    downloadResume() {
        const link = document.createElement('a');
        link.href = './Jash Patel Resume.pdf';
        link.download = 'Jash_Patel_Resume.pdf';
        link.target = '_blank';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    showKeyboardShortcuts() {
        const shortcutsHTML = `
            <div class="shortcuts-modal" id="shortcutsModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Keyboard Shortcuts</h3>
                        <button class="close-modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="shortcuts-grid">
                            <div class="shortcut-item">
                                <kbd>Ctrl/⌘ + H</kbd>
                                <span>Navigate to Home</span>
                            </div>
                            <div class="shortcut-item">
                                <kbd>Ctrl/⌘ + A</kbd>
                                <span>Navigate to About</span>
                            </div>
                            <div class="shortcut-item">
                                <kbd>Ctrl/⌘ + P</kbd>
                                <span>Navigate to Projects</span>
                            </div>
                            <div class="shortcut-item">
                                <kbd>Ctrl/⌘ + S</kbd>
                                <span>Navigate to Skills</span>
                            </div>
                            <div class="shortcut-item">
                                <kbd>Ctrl/⌘ + E</kbd>
                                <span>Navigate to Experience</span>
                            </div>
                            <div class="shortcut-item">
                                <kbd>Ctrl/⌘ + C</kbd>
                                <span>Navigate to Contact</span>
                            </div>
                            <div class="shortcut-item">
                                <kbd>Ctrl/⌘ + /</kbd>
                                <span>Focus Search</span>
                            </div>
                            <div class="shortcut-item">
                                <kbd>Ctrl/⌘ + R</kbd>
                                <span>Download Resume</span>
                            </div>
                            <div class="shortcut-item">
                                <kbd>Esc</kbd>
                                <span>Close Modals</span>
                            </div>
                            <div class="shortcut-item">
                                <kbd>F1</kbd>
                                <span>Show This Help</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', shortcutsHTML);

        const modal = document.getElementById('shortcutsModal');
        const closeBtn = modal.querySelector('.close-modal');

        closeBtn.addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    }

    showLoadingComplete() {
        console.log('🎬 Netflix Portfolio loaded successfully!');
        console.log('💡 Press F1 for keyboard shortcuts');
        
        // Optional: Show a brief loading complete notification
        const notification = document.createElement('div');
        notification.className = 'loading-complete';
        notification.innerHTML = `
            <div class="loading-content">
                <i class="fas fa-check-circle"></i>
                <span>Portfolio Loaded</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }

    showErrorMessage(message) {
        const errorHTML = `
            <div class="error-notification" id="errorNotification">
                <div class="error-content">
                    <i class="fas fa-exclamation-triangle"></i>
                    <span>${message}</span>
                    <button class="close-error">&times;</button>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', errorHTML);

        const notification = document.getElementById('errorNotification');
        const closeBtn = notification.querySelector('.close-error');

        closeBtn.addEventListener('click', () => notification.remove());

        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // Public method to initialize main app (called from ProfileScreen)
    initializeMain() {
        this.initializeMainComponents();
    }
}

// Initialize the application
window.portfolioApp = new PortfolioApp();

// Make the initializeMain method globally available for ProfileScreen
window.initializeMainApp = () => {
    if (window.portfolioApp) {
        window.portfolioApp.initializeMain();
    }
};
