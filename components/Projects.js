// Projects Component with Netflix-style Trailer Functionality
class Projects {
    constructor() {
        this.element = null;
        this.projectsData = {
            'agrimitra': {
                title: 'AgriMitra',
                subtitle: 'AI-Powered Waste Management',
                description: 'Comprehensive waste management platform using Flask, React, OpenAI, and weather APIs to provide real-time disposal guidance and alerts for rural communities.',
                longDescription: 'AgriMitra is a revolutionary platform that combines artificial intelligence with environmental consciousness. The application provides intelligent waste categorization, disposal recommendations, and community-wide waste management solutions. Built with a robust Flask backend and modern React frontend, it integrates OpenAI for smart recommendations and weather APIs for optimal disposal timing.',
                technologies: ['Python', 'Flask', 'React', 'OpenAI', 'MongoDB', 'Weather APIs', 'TensorFlow'],
                github: 'https://github.com/jashp007',
                demo: '#',
                trailer: './assets/videos/agrimitra-demo.mp4', // Placeholder video path
                thumbnail: 'https://via.placeholder.com/300x450/1db954/ffffff?text=AgriMitra',
                match: '95%',
                year: '2025',
                duration: '3 min demo',
                category: 'AI & Environment',
                features: [
                    'Smart waste categorization using AI',
                    'Real-time weather integration',
                    'Community waste tracking',
                    'Automated disposal reminders',
                    'Environmental impact analytics'
                ]
            },
            'finance-guru': {
                title: 'Finance Guru',
                subtitle: 'AI Financial Planning Assistant',
                description: 'Comprehensive financial planning assistant using OpenAI, Node.js, and React, offering budgeting tools, investment advice, and retirement projections.',
                longDescription: 'Finance Guru revolutionizes personal financial management by providing AI-powered insights and recommendations. The platform offers comprehensive budgeting tools, investment tracking, retirement planning, and personalized financial advice based on user behavior and market trends.',
                technologies: ['React', 'Node.js', 'MongoDB', 'OpenAI', 'OAuth', 'Chart.js', 'Express'],
                github: 'https://github.com/jashp007',
                demo: '#',
                trailer: './assets/videos/finance-guru-demo.mp4',
                thumbnail: 'https://via.placeholder.com/300x450/3498db/ffffff?text=Finance+Guru',
                match: '92%',
                year: '2024',
                duration: '4 min demo',
                category: 'FinTech & AI',
                features: [
                    'AI-powered financial advice',
                    'Automated budget tracking',
                    'Investment portfolio analysis',
                    'Retirement planning calculator',
                    'Expense categorization'
                ]
            },
            'campus-nav': {
                title: 'Campus Navigator',
                subtitle: 'Smart Campus Navigation',
                description: 'Advanced campus map navigation tool using C++ and graph data structures with Dijkstra\'s algorithm for optimal pathfinding.',
                longDescription: 'Campus Navigator is a sophisticated pathfinding application that helps students and visitors navigate complex university campuses efficiently. Built with advanced graph algorithms and optimized data structures, it provides real-time navigation with multiple route options.',
                technologies: ['C++', 'Graph Algorithms', 'Dijkstra', 'Data Structures', 'Qt', 'OpenGL'],
                github: 'https://github.com/jashp007',
                demo: '#',
                trailer: './assets/videos/campus-nav-demo.mp4',
                thumbnail: 'https://via.placeholder.com/300x450/9b59b6/ffffff?text=Campus+Nav',
                match: '88%',
                year: '2023',
                duration: '2 min demo',
                category: 'Algorithms & Navigation',
                features: [
                    'Shortest path calculation',
                    'Real-time route optimization',
                    'Interactive campus map',
                    'Building directory integration',
                    'Accessibility route options'
                ]
            },
            'steam-analysis': {
                title: 'Steam Gaming Analysis',
                subtitle: 'Gaming Behavior Analytics',
                description: 'Comprehensive data analysis using Steam API to collect and process gaming data, categorizing users into behavioral segments with machine learning.',
                longDescription: 'Steam Gaming Analysis provides deep insights into gaming behavior patterns using advanced data science techniques. The platform processes vast amounts of gaming data to identify trends, predict user preferences, and segment players based on behavior patterns.',
                technologies: ['Python', 'Steam API', 'Machine Learning', 'Pandas', 'Scikit-learn', 'Matplotlib', 'Jupyter'],
                github: 'https://github.com/jashp007',
                demo: '#',
                trailer: './assets/videos/steam-analysis-demo.mp4',
                thumbnail: 'https://via.placeholder.com/300x450/e67e22/ffffff?text=Steam+Analytics',
                match: '90%',
                year: '2023',
                duration: '3 min demo',
                category: 'Data Science & ML',
                features: [
                    'Gaming behavior analysis',
                    'User segmentation algorithms',
                    'Predictive gaming recommendations',
                    'Interactive data visualizations',
                    'Trend analysis and reporting'
                ]
            }
        };
        this.init();
    }

    init() {
        this.render();
        this.attachEventListeners();
    }

    render() {
        const projectsHTML = `
            <section class="content-row" id="projects" data-section="projects">
                <h2 class="row-title">Featured Projects</h2>
                <div class="projects-container">
                    <div class="netflix-slider">
                        <div class="slider-container" id="projectsSlider">
                            ${this.renderProjectCards()}
                        </div>
                        <div class="slider-controls">
                            <button class="slider-btn prev-btn" id="prevBtn">
                                <i class="fas fa-chevron-left"></i>
                            </button>
                            <button class="slider-btn next-btn" id="nextBtn">
                                <i class="fas fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        `;

        // Insert projects section
        const mainContent = document.querySelector('.content-rows');
        if (mainContent) {
            // Replace existing projects section or insert
            const existingProjects = mainContent.querySelector('#projects');
            if (existingProjects) {
                existingProjects.outerHTML = projectsHTML;
            } else {
                mainContent.insertAdjacentHTML('afterbegin', projectsHTML);
            }
            this.element = document.getElementById('projects');
        }
    }

    renderProjectCards() {
        return Object.entries(this.projectsData).map(([key, project]) => `
            <div class="movie-card enhanced-project-card" data-project="${key}">
                <div class="card-image">
                    <img src="${project.thumbnail}" alt="${project.title}">
                    <div class="card-overlay">
                        <div class="card-actions">
                            <button class="action-btn play-trailer" data-project="${key}">
                                <i class="fas fa-play"></i>
                            </button>
                            <button class="action-btn add-to-list" data-project="${key}">
                                <i class="fas fa-plus"></i>
                            </button>
                            <button class="action-btn like-project" data-project="${key}">
                                <i class="fas fa-thumbs-up"></i>
                            </button>
                            <button class="action-btn more-info" data-project="${key}">
                                <i class="fas fa-chevron-down"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card-info">
                    <div class="card-header">
                        <h4>${project.title}</h4>
                        <div class="card-meta">
                            <span class="match">${project.match} Match</span>
                            <span class="year">${project.year}</span>
                            <span class="duration">${project.duration}</span>
                        </div>
                    </div>
                    <p class="card-description">${project.description}</p>
                    <div class="tech-tags">
                        ${project.technologies.slice(0, 4).map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        ${project.technologies.length > 4 ? `<span class="tech-tag">+${project.technologies.length - 4} more</span>` : ''}
                    </div>
                </div>
            </div>
        `).join('');
    }

    attachEventListeners() {
        if (!this.element) return;

        // Project card interactions
        const projectCards = this.element.querySelectorAll('.movie-card');
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => this.handleCardHover(card));
            card.addEventListener('mouseleave', () => this.handleCardLeave(card));
        });

        // Action buttons
        const playButtons = this.element.querySelectorAll('.play-trailer');
        playButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const projectKey = btn.getAttribute('data-project');
                this.playTrailer(projectKey);
            });
        });

        const moreInfoButtons = this.element.querySelectorAll('.more-info');
        moreInfoButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const projectKey = btn.getAttribute('data-project');
                this.showProjectDetails(projectKey);
            });
        });

        const addToListButtons = this.element.querySelectorAll('.add-to-list');
        addToListButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleAddToList(btn);
            });
        });

        const likeButtons = this.element.querySelectorAll('.like-project');
        likeButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleLike(btn);
            });
        });

        // Slider controls
        const prevBtn = this.element.querySelector('#prevBtn');
        const nextBtn = this.element.querySelector('#nextBtn');
        
        if (prevBtn) prevBtn.addEventListener('click', () => this.slideProjects('prev'));
        if (nextBtn) nextBtn.addEventListener('click', () => this.slideProjects('next'));

        // Card click for details
        projectCards.forEach(card => {
            card.addEventListener('click', () => {
                const projectKey = card.getAttribute('data-project');
                this.showProjectDetails(projectKey);
            });
        });
    }

    handleCardHover(card) {
        card.style.transform = 'scale(1.05) translateY(-10px)';
        card.style.zIndex = '100';
        
        // Show enhanced info
        const overlay = card.querySelector('.card-overlay');
        if (overlay) {
            overlay.style.opacity = '1';
        }
    }

    handleCardLeave(card) {
        card.style.transform = 'scale(1) translateY(0)';
        card.style.zIndex = '1';
        
        const overlay = card.querySelector('.card-overlay');
        if (overlay) {
            overlay.style.opacity = '0';
        }
    }

    playTrailer(projectKey) {
        const project = this.projectsData[projectKey];
        if (!project) return;

        const trailerModalHTML = `
            <div class="trailer-modal" id="trailerModal">
                <div class="trailer-container">
                    <div class="trailer-header">
                        <h2>${project.title}</h2>
                        <button class="close-trailer">&times;</button>
                    </div>
                    <div class="trailer-content">
                        <div class="video-container">
                            <div class="video-placeholder">
                                <i class="fas fa-play-circle"></i>
                                <p>Project Demo Coming Soon!</p>
                                <p class="video-info">Experience this project in action</p>
                                <a href="${project.demo}" class="demo-link" target="_blank">
                                    <i class="fas fa-external-link-alt"></i>
                                    View Live Demo
                                </a>
                            </div>
                        </div>
                        <div class="trailer-info">
                            <div class="trailer-meta">
                                <span class="category">${project.category}</span>
                                <span class="year">${project.year}</span>
                                <span class="match">${project.match} Match</span>
                            </div>
                            <p class="trailer-description">${project.longDescription}</p>
                            <div class="trailer-features">
                                <h4>Key Features:</h4>
                                <ul>
                                    ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                                </ul>
                            </div>
                            <div class="trailer-tech">
                                <h4>Technologies:</h4>
                                <div class="tech-list">
                                    ${project.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
                                </div>
                            </div>
                            <div class="trailer-actions">
                                <a href="${project.github}" target="_blank" class="trailer-btn github-btn">
                                    <i class="fab fa-github"></i>
                                    View Code
                                </a>
                                <a href="${project.demo}" target="_blank" class="trailer-btn demo-btn">
                                    <i class="fas fa-external-link-alt"></i>
                                    Live Demo
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', trailerModalHTML);

        const modal = document.getElementById('trailerModal');
        const closeBtn = modal.querySelector('.close-trailer');

        // Close trailer functionality
        const closeTrailer = () => {
            modal.remove();
        };

        closeBtn.addEventListener('click', closeTrailer);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeTrailer();
        });

        // ESC key to close
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                closeTrailer();
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
    }

    showProjectDetails(projectKey) {
        const project = this.projectsData[projectKey];
        if (!project) return;

        const detailsModalHTML = `
            <div class="project-details-modal" id="projectDetailsModal">
                <div class="details-container">
                    <div class="details-header">
                        <div class="details-title">
                            <h1>${project.title}</h1>
                            <p class="subtitle">${project.subtitle}</p>
                        </div>
                        <button class="close-details">&times;</button>
                    </div>
                    <div class="details-content">
                        <div class="details-hero">
                            <img src="${project.thumbnail}" alt="${project.title}">
                            <div class="details-overlay">
                                <button class="play-trailer-large" data-project="${projectKey}">
                                    <i class="fas fa-play"></i>
                                    Watch Trailer
                                </button>
                            </div>
                        </div>
                        <div class="details-info">
                            <div class="details-meta">
                                <div class="meta-group">
                                    <span class="match-large">${project.match} Match</span>
                                    <span class="year">${project.year}</span>
                                    <span class="category-badge">${project.category}</span>
                                </div>
                                <div class="details-actions">
                                    <button class="details-action-btn like-btn">
                                        <i class="fas fa-thumbs-up"></i>
                                    </button>
                                    <button class="details-action-btn add-btn">
                                        <i class="fas fa-plus"></i>
                                    </button>
                                    <button class="details-action-btn share-btn">
                                        <i class="fas fa-share"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="details-description">
                                <p>${project.longDescription}</p>
                            </div>
                            <div class="details-features">
                                <h3>Key Features</h3>
                                <div class="features-grid">
                                    ${project.features.map(feature => `
                                        <div class="feature-item">
                                            <i class="fas fa-check-circle"></i>
                                            <span>${feature}</span>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                            <div class="details-tech">
                                <h3>Technologies Used</h3>
                                <div class="tech-grid">
                                    ${project.technologies.map(tech => `<span class="tech-item">${tech}</span>`).join('')}
                                </div>
                            </div>
                            <div class="details-links">
                                <a href="${project.github}" target="_blank" class="project-link github-link">
                                    <i class="fab fa-github"></i>
                                    View Source Code
                                </a>
                                <a href="${project.demo}" target="_blank" class="project-link demo-link">
                                    <i class="fas fa-external-link-alt"></i>
                                    Live Demo
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', detailsModalHTML);

        const modal = document.getElementById('projectDetailsModal');
        const closeBtn = modal.querySelector('.close-details');
        const playTrailerBtn = modal.querySelector('.play-trailer-large');

        const closeDetails = () => modal.remove();

        closeBtn.addEventListener('click', closeDetails);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeDetails();
        });

        if (playTrailerBtn) {
            playTrailerBtn.addEventListener('click', () => {
                closeDetails();
                this.playTrailer(projectKey);
            });
        }
    }

    toggleAddToList(button) {
        const icon = button.querySelector('i');
        if (icon.classList.contains('fa-plus')) {
            icon.classList.remove('fa-plus');
            icon.classList.add('fa-check');
            button.style.background = 'var(--netflix-green)';
        } else {
            icon.classList.remove('fa-check');
            icon.classList.add('fa-plus');
            button.style.background = 'rgba(42, 42, 42, 0.8)';
        }
    }

    toggleLike(button) {
        const icon = button.querySelector('i');
        if (icon.classList.contains('fa-thumbs-up')) {
            icon.classList.remove('fa-thumbs-up');
            icon.classList.add('fa-thumbs-down');
            button.style.background = 'var(--netflix-red)';
        } else {
            icon.classList.remove('fa-thumbs-down');
            icon.classList.add('fa-thumbs-up');
            button.style.background = 'rgba(42, 42, 42, 0.8)';
        }
    }

    slideProjects(direction) {
        const slider = this.element.querySelector('#projectsSlider');
        const cardWidth = 320; // Width + margin
        const visibleCards = Math.floor(slider.parentElement.offsetWidth / cardWidth);
        const scrollAmount = cardWidth * visibleCards;

        if (direction === 'next') {
            slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        } else {
            slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
    }
}

// Export for use in main script
window.Projects = Projects;
