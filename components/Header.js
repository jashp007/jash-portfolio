// Header Component - Netflix Style Navigation
class Header {
    constructor() {
        this.element = null;
        this.init();
    }

    init() {
        this.render();
        this.attachEventListeners();
        this.initScrollEffect();
    }

    render() {
        const headerHTML = `
            <header class="netflix-header" id="mainHeader">
                <div class="header-left">
                    <div class="netflix-logo-main">JASHFLIX</div>
                    <nav class="main-nav">
                        <a href="#hero" class="nav-item active" data-section="hero">Home</a>
                        <a href="#about" class="nav-item" data-section="about">About</a>
                        <a href="#projects" class="nav-item" data-section="projects">Projects</a>
                        <a href="#skills" class="nav-item" data-section="skills">Skills</a>
                        <a href="#experience" class="nav-item" data-section="experience">Experience</a>
                        <a href="#contact" class="nav-item" data-section="contact">Contact</a>
                    </nav>
                    <div class="mobile-menu-toggle">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div class="header-right">
                    <div class="search-container">
                        <div class="search-icon"><i class="fas fa-search"></i></div>
                        <input type="text" class="search-input" placeholder="Search projects, skills...">
                    </div>
                    <div class="notifications">
                        <i class="fas fa-bell"></i>
                        <span class="notification-badge">3</span>
                    </div>
                    <div class="profile-dropdown">
                        <img src="https://via.placeholder.com/32x32/e50914/ffffff?text=JP" alt="Profile" class="profile-pic">
                        <i class="fas fa-caret-down"></i>
                        <div class="dropdown-menu">
                            <a href="#" class="dropdown-item">
                                <i class="fas fa-user"></i>
                                View Profile
                            </a>
                            <a href="#" class="dropdown-item">
                                <i class="fas fa-cog"></i>
                                Settings
                            </a>
                            <a href="#" class="dropdown-item" id="switchProfile">
                                <i class="fas fa-users"></i>
                                Switch Profile
                            </a>
                            <hr class="dropdown-divider">
                            <a href="./Jash Patel Resume.pdf" class="dropdown-item" target="_blank">
                                <i class="fas fa-download"></i>
                                Download Resume
                            </a>
                        </div>
                    </div>
                </div>
            </header>
        `;

        // Insert header at the beginning of main content
        const mainContent = document.getElementById('mainContent');
        if (mainContent) {
            mainContent.insertAdjacentHTML('afterbegin', headerHTML);
            this.element = document.getElementById('mainHeader');
        }
    }

    attachEventListeners() {
        if (!this.element) return;

        // Navigation items
        const navItems = this.element.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => this.handleNavigation(e));
        });

        // Mobile menu toggle
        const mobileToggle = this.element.querySelector('.mobile-menu-toggle');
        if (mobileToggle) {
            mobileToggle.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Search functionality
        const searchIcon = this.element.querySelector('.search-icon');
        const searchInput = this.element.querySelector('.search-input');
        
        if (searchIcon) {
            searchIcon.addEventListener('click', () => this.toggleSearch());
        }

        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
            searchInput.addEventListener('blur', () => this.closeSearch());
        }

        // Profile dropdown
        const profileDropdown = this.element.querySelector('.profile-dropdown');
        if (profileDropdown) {
            profileDropdown.addEventListener('click', () => this.toggleProfileDropdown());
        }

        // Switch profile
        const switchProfile = this.element.querySelector('#switchProfile');
        if (switchProfile) {
            switchProfile.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchToProfileScreen();
            });
        }

        // Notifications
        const notifications = this.element.querySelector('.notifications');
        if (notifications) {
            notifications.addEventListener('click', () => this.showNotifications());
        }

        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!profileDropdown.contains(e.target)) {
                this.closeProfileDropdown();
            }
        });
    }

    initScrollEffect() {
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > 100) {
                this.element.classList.add('scrolled');
            } else {
                this.element.classList.remove('scrolled');
            }

            // Hide/show header on scroll
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                this.element.classList.add('hidden-scroll');
            } else {
                this.element.classList.remove('hidden-scroll');
            }

            lastScrollY = currentScrollY;

            // Update active navigation
            this.updateActiveNavigation();
        });
    }

    handleNavigation(e) {
        e.preventDefault();
        
        const targetSection = e.target.getAttribute('data-section');
        const targetElement = document.getElementById(targetSection) || 
                             document.querySelector(`[data-section="${targetSection}"]`);

        // Update active state
        this.element.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        e.target.classList.add('active');

        // Smooth scroll to section
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }

        // Close mobile menu if open
        this.closeMobileMenu();
    }

    updateActiveNavigation() {
        const sections = ['hero', 'about', 'projects', 'skills', 'experience', 'contact'];
        const navItems = this.element.querySelectorAll('.nav-item');

        let activeSection = 'hero';

        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId) || 
                           document.querySelector(`[data-section="${sectionId}"]`);
            if (section) {
                const rect = section.getBoundingClientRect();
                if (rect.top <= 100 && rect.bottom >= 100) {
                    activeSection = sectionId;
                }
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-section') === activeSection) {
                item.classList.add('active');
            }
        });
    }

    toggleMobileMenu() {
        const nav = this.element.querySelector('.main-nav');
        const toggle = this.element.querySelector('.mobile-menu-toggle');
        
        nav.classList.toggle('mobile-open');
        toggle.classList.toggle('active');
    }

    closeMobileMenu() {
        const nav = this.element.querySelector('.main-nav');
        const toggle = this.element.querySelector('.mobile-menu-toggle');
        
        nav.classList.remove('mobile-open');
        toggle.classList.remove('active');
    }

    toggleSearch() {
        const searchContainer = this.element.querySelector('.search-container');
        const searchInput = this.element.querySelector('.search-input');
        
        searchContainer.classList.toggle('active');
        if (searchContainer.classList.contains('active')) {
            searchInput.focus();
        }
    }

    closeSearch() {
        setTimeout(() => {
            const searchContainer = this.element.querySelector('.search-container');
            searchContainer.classList.remove('active');
        }, 200);
    }

    handleSearch(query) {
        if (query.length < 2) return;

        // Simple search functionality
        const searchableElements = document.querySelectorAll('[data-searchable]');
        searchableElements.forEach(element => {
            const text = element.textContent.toLowerCase();
            if (text.includes(query.toLowerCase())) {
                element.style.background = 'rgba(229, 9, 20, 0.2)';
                setTimeout(() => {
                    element.style.background = '';
                }, 2000);
            }
        });
    }

    toggleProfileDropdown() {
        const dropdown = this.element.querySelector('.dropdown-menu');
        dropdown.classList.toggle('active');
    }

    closeProfileDropdown() {
        const dropdown = this.element.querySelector('.dropdown-menu');
        dropdown.classList.remove('active');
    }

    switchToProfileScreen() {
        const mainContent = document.getElementById('mainContent');
        const profileScreen = document.getElementById('profileScreen');
        
        mainContent.classList.add('hidden');
        profileScreen.classList.remove('hidden');
    }

    showNotifications() {
        // Create notifications modal
        const notificationsHTML = `
            <div class="notifications-modal" id="notificationsModal">
                <div class="notifications-content">
                    <div class="notifications-header">
                        <h3>Notifications</h3>
                        <button class="close-notifications">&times;</button>
                    </div>
                    <div class="notifications-list">
                        <div class="notification-item">
                            <i class="fas fa-star"></i>
                            <div class="notification-text">
                                <p>New project added to featured list</p>
                                <span>2 hours ago</span>
                            </div>
                        </div>
                        <div class="notification-item">
                            <i class="fas fa-user-plus"></i>
                            <div class="notification-text">
                                <p>Profile viewed by recruiter</p>
                                <span>1 day ago</span>
                            </div>
                        </div>
                        <div class="notification-item">
                            <i class="fas fa-code"></i>
                            <div class="notification-text">
                                <p>GitHub repository updated</p>
                                <span>3 days ago</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', notificationsHTML);

        const modal = document.getElementById('notificationsModal');
        const closeBtn = modal.querySelector('.close-notifications');

        closeBtn.addEventListener('click', () => {
            modal.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
}

// Export for use in main script
window.Header = Header;
