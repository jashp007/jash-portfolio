// Legacy Netflix Clone Portfolio JavaScript
// This file maintains backward compatibility while the new component system loads

// Check if component system is available
const useComponentSystem = typeof window.PortfolioApp !== 'undefined';

if (!useComponentSystem) {
    console.log('Loading legacy script system...');
    
    // Original profile selection logic (fallback)
    document.addEventListener('DOMContentLoaded', function() {
        const profileScreen = document.getElementById('profileScreen');
        const mainContent = document.getElementById('mainContent');
        const profileItems = document.querySelectorAll('.profile-item');
        
        // Only initialize if components haven't already handled this
        if (profileScreen && !profileScreen.classList.contains('component-handled')) {
            // Handle profile selection
            profileItems.forEach(item => {
                item.addEventListener('click', function() {
                    const profileType = this.getAttribute('data-profile');
                    
                    if (profileType === 'guest') {
                        alert('Add Profile functionality would be implemented here');
                        return;
                    }
                    
                    // Animate profile selection
                    this.style.transform = 'scale(1.1)';
                    this.style.opacity = '0.8';
                    
                    setTimeout(() => {
                        profileScreen.classList.add('hidden');
                        mainContent.classList.remove('hidden');
                        initializeLegacyFeatures();
                    }, 500);
                });
            });
            
            // Manage profiles button
            const manageProfilesBtn = document.querySelector('.manage-profiles');
            if (manageProfilesBtn) {
                manageProfilesBtn.addEventListener('click', function() {
                    alert('Manage Profiles functionality would be implemented here');
                });
            }
        }
    });
}

// Legacy feature initialization
function initializeLegacyFeatures() {
    if (useComponentSystem) {
        console.log('Component system active, skipping legacy initialization');
        return;
    }
    
    initializeLegacyHeader();
    initializeLegacyHeroButtons();
    initializeLegacyMovieCards();
    initializeLegacySkillBadges();
    initializeLegacyContactMethods();
    initializeLegacyScrollEffects();
}

// Legacy Netflix Header Functionality
function initializeLegacyHeader() {
    const header = document.querySelector('.netflix-header');
    const navItems = document.querySelectorAll('.nav-item');
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Navigation active state
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Smooth scroll to section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Profile dropdown functionality
    const profileDropdown = document.querySelector('.profile-dropdown');
    if (profileDropdown) {
        profileDropdown.addEventListener('click', function() {
            // Return to profile selection
            const mainContent = document.getElementById('mainContent');
            const profileScreen = document.getElementById('profileScreen');
            
            mainContent.classList.add('hidden');
            profileScreen.classList.remove('hidden');
        });
    }
    
    // Search functionality
    const searchIcon = document.querySelector('.search-icon');
    if (searchIcon) {
        searchIcon.addEventListener('click', function() {
            alert('Search functionality would be implemented here');
        });
    }
    
    // Notifications
    const notifications = document.querySelector('.notifications');
    if (notifications) {
        notifications.addEventListener('click', function() {
            alert('Notifications functionality would be implemented here');
        });
    }
}

// Hero Section Buttons
function initializeLegacyHeroButtons() {
    const playBtn = document.querySelector('.play-btn');
    const infoBtn = document.querySelector('.info-btn');
    const likeBtn = document.querySelector('.like-btn');
    const addBtn = document.querySelector('.add-btn');
    
    if (playBtn) {
        playBtn.addEventListener('click', function() {
            // Scroll to projects section
            const projectsSection = document.querySelector('#projects');
            if (projectsSection) {
                projectsSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    if (infoBtn) {
        infoBtn.addEventListener('click', function() {
            // Scroll to about section
            const aboutSection = document.querySelector('.about-netflix');
            if (aboutSection) {
                aboutSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    if (likeBtn) {
        likeBtn.addEventListener('click', function() {
            // Toggle like state
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-thumbs-up')) {
                icon.classList.remove('fa-thumbs-up');
                icon.classList.add('fa-thumbs-down');
                this.style.background = 'var(--netflix-red)';
                this.style.borderColor = 'var(--netflix-red)';
            } else {
                icon.classList.remove('fa-thumbs-down');
                icon.classList.add('fa-thumbs-up');
                this.style.background = 'transparent';
                this.style.borderColor = 'var(--netflix-white)';
            }
        });
    }
    
    if (addBtn) {
        addBtn.addEventListener('click', function() {
            // Toggle add to list
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-plus')) {
                icon.classList.remove('fa-plus');
                icon.classList.add('fa-check');
                this.style.background = 'var(--netflix-white)';
                this.style.color = 'var(--netflix-black)';
            } else {
                icon.classList.remove('fa-check');
                icon.classList.add('fa-plus');
                this.style.background = 'transparent';
                this.style.color = 'var(--netflix-white)';
            }
        });
    }
}

// Movie Cards (Project Cards) Functionality
function initializeLegacyMovieCards() {
    const movieCards = document.querySelectorAll('.movie-card');
    
    movieCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectType = this.getAttribute('data-project');
            showProjectModal(projectType);
        });
        
        // Enhanced hover effect
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '100';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
}

// Project Modal (Netflix-style)
function showProjectModal(projectType) {
    const projectData = {
        'agrimitra': {
            title: 'AgriMitra',
            description: 'AI-powered waste management platform using Flask, React, OpenAI, and weather APIs to provide real-time disposal guidance and alerts for rural communities.',
            technologies: ['Python', 'Flask', 'React', 'OpenAI', 'MongoDB', 'Weather APIs'],
            github: 'https://github.com/jashp007',
            demo: '#'
        },
        'finance-guru': {
            title: 'Finance Guru',
            description: 'Financial planning assistant using OpenAI, Node.js, and React, offering budgeting tools, investment advice, and retirement projections.',
            technologies: ['React', 'Node.js', 'MongoDB', 'OpenAI', 'OAuth'],
            github: 'https://github.com/jashp007',
            demo: '#'
        },
        'campus-nav': {
            title: 'Campus Navigator',
            description: 'Console-based campus map navigation tool using C++ and graph data structures with Dijkstra\'s algorithm for shortest path calculation.',
            technologies: ['C++', 'Graph Algorithms', 'Dijkstra', 'Data Structures'],
            github: 'https://github.com/jashp007',
            demo: '#'
        },
        'steam-analysis': {
            title: 'Steam Gaming Analysis',
            description: 'Data-driven analysis using Steam API to collect and process data, categorizing users into behavioral segments with machine learning.',
            technologies: ['Python', 'Steam API', 'Machine Learning', 'Pandas', 'Scikit-learn'],
            github: 'https://github.com/jashp007',
            demo: '#'
        }
    };
    
    const project = projectData[projectType];
    if (!project) return;
    
    // Create modal HTML
    const modalHTML = `
        <div class="project-modal" id="projectModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${project.title}</h2>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <p>${project.description}</p>
                    <div class="modal-technologies">
                        <h4>Technologies Used:</h4>
                        <div class="tech-list">
                            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                    </div>
                    <div class="modal-buttons">
                        <a href="${project.github}" target="_blank" class="modal-btn github-btn">
                            <i class="fab fa-github"></i> View Code
                        </a>
                        <a href="${project.demo}" class="modal-btn demo-btn">
                            <i class="fas fa-external-link-alt"></i> Live Demo
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add modal styles
    const modalStyles = `
        <style>
            .project-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            }
            
            .modal-content {
                background: var(--netflix-dark);
                border-radius: 8px;
                max-width: 600px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                animation: slideIn 0.3s ease;
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 2rem;
                border-bottom: 1px solid var(--netflix-gray);
            }
            
            .modal-header h2 {
                color: var(--netflix-white);
                font-size: 1.8rem;
            }
            
            .close-modal {
                background: none;
                border: none;
                color: var(--netflix-white);
                font-size: 2rem;
                cursor: pointer;
                padding: 0;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .close-modal:hover {
                color: var(--netflix-red);
            }
            
            .modal-body {
                padding: 2rem;
            }
            
            .modal-body p {
                color: var(--netflix-light-gray);
                line-height: 1.6;
                margin-bottom: 2rem;
            }
            
            .modal-technologies h4 {
                color: var(--netflix-white);
                margin-bottom: 1rem;
            }
            
            .tech-list {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
                margin-bottom: 2rem;
            }
            
            .tech-tag {
                background: var(--netflix-red);
                color: var(--netflix-white);
                padding: 0.3rem 0.8rem;
                border-radius: 20px;
                font-size: 0.8rem;
                font-weight: 600;
            }
            
            .modal-buttons {
                display: flex;
                gap: 1rem;
                flex-wrap: wrap;
            }
            
            .modal-btn {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.8rem 1.5rem;
                border-radius: 4px;
                text-decoration: none;
                font-weight: 600;
                transition: all 0.3s ease;
            }
            
            .github-btn {
                background: var(--netflix-gray);
                color: var(--netflix-white);
            }
            
            .github-btn:hover {
                background: var(--netflix-light-gray);
                color: var(--netflix-black);
            }
            
            .demo-btn {
                background: var(--netflix-red);
                color: var(--netflix-white);
            }
            
            .demo-btn:hover {
                background: #f40612;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideIn {
                from { transform: translateY(-50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', modalStyles);
    
    // Close modal functionality
    const modal = document.getElementById('projectModal');
    const closeBtn = modal.querySelector('.close-modal');
    
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
    
    // Add fadeOut animation
    const fadeOutStyle = `
        <style>
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        </style>
    `;
    document.head.insertAdjacentHTML('beforeend', fadeOutStyle);
}

// Global trailer function for both legacy and component systems
window.openTrailer = function(projectKey) {
    // Check if Projects component is available and use it
    if (window.portfolioApp && window.portfolioApp.components.projects) {
        window.portfolioApp.components.projects.playTrailer(projectKey);
        return;
    }
    
    // Fallback to legacy modal system
    showProjectModal(projectKey);
};

// Skill Badges Interaction
function initializeLegacySkillBadges() {
    const skillBadges = document.querySelectorAll('.skill-badge');
    
    skillBadges.forEach(badge => {
        badge.addEventListener('click', function() {
            // Toggle selected state
            this.classList.toggle('selected');
            
            if (this.classList.contains('selected')) {
                this.style.background = 'var(--netflix-red)';
                this.style.transform = 'scale(1.05)';
            } else {
                this.style.background = 'var(--netflix-gray)';
                this.style.transform = 'scale(1)';
            }
        });
    });
}

// Contact Methods
function initializeLegacyContactMethods() {
    const contactMethods = document.querySelectorAll('.contact-method');
    
    contactMethods.forEach(method => {
        method.addEventListener('click', function(e) {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Scroll Effects
function initializeLegacyScrollEffects() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe content rows
    const contentRows = document.querySelectorAll('.content-row');
    contentRows.forEach(row => {
        row.style.opacity = '0';
        row.style.transform = 'translateY(50px)';
        row.style.transition = 'all 0.6s ease';
        observer.observe(row);
    });
}

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
    // ESC key to close modals
    if (e.key === 'Escape') {
        const modal = document.getElementById('projectModal');
        if (modal) {
            modal.remove();
        }
    }
    
    // Enter key on profile selection
    if (e.key === 'Enter' && !document.getElementById('mainContent').classList.contains('hidden')) {
        const focusedProfile = document.activeElement;
        if (focusedProfile.classList.contains('profile-item')) {
            focusedProfile.click();
        }
    }
});

// Smooth scrolling for all internal links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});