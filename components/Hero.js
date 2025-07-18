// Hero Component - Netflix-style Banner
class Hero {
    constructor() {
        this.element = null;
        this.currentUser = null;
        this.init();
    }

    init() {
        this.getCurrentUser();
        this.render();
        this.attachEventListeners();
        this.startHeroAnimations();
    }

    getCurrentUser() {
        const storedProfile = sessionStorage.getItem('selectedProfile');
        if (storedProfile) {
            this.currentUser = JSON.parse(storedProfile);
        }
    }

    render() {
        const heroHTML = `
            <section id="hero" class="hero-banner" data-section="hero">
                <div class="hero-background">
                    <div class="hero-video-container">
                        <video autoplay muted loop class="hero-video">
                            <source src="/assets/videos/hero-background.mp4" type="video/mp4">
                        </video>
                        <div class="hero-video-overlay"></div>
                    </div>
                </div>
                <div class="hero-content">
                    <div class="hero-info">
                        <div class="hero-badge">
                            <span class="featured-tag">FEATURED DEVELOPER</span>
                        </div>
                        <h1 class="hero-title">Jash Patel</h1>
                        <div class="hero-meta">
                            <span class="match">98% Match</span>
                            <span class="year">2024</span>
                            <span class="rating">HD</span>
                            <span class="duration">Full Stack Developer</span>
                            <span class="category">Computer Science</span>
                        </div>
                        <p class="hero-description">
                            A passionate Computer Science student specializing in data engineering and full-stack development. 
                            Experience building scalable data pipelines, AI-powered applications, and modern web solutions 
                            using cutting-edge technologies. Currently seeking opportunities to make an impact in the tech industry.
                        </p>
                        <div class="hero-buttons">
                            <button class="hero-btn play-btn">
                                <i class="fas fa-play"></i>
                                View Portfolio
                            </button>
                            <button class="hero-btn info-btn">
                                <i class="fas fa-info-circle"></i>
                                More Info
                            </button>
                            <button class="hero-btn like-btn" data-liked="false">
                                <i class="fas fa-thumbs-up"></i>
                            </button>
                            <button class="hero-btn add-btn" data-added="false">
                                <i class="fas fa-plus"></i>
                            </button>
                            <button class="hero-btn share-btn">
                                <i class="fas fa-share"></i>
                            </button>
                            <button class="hero-btn download-btn">
                                <i class="fas fa-download"></i>
                            </button>
                        </div>
                        <div class="hero-stats">
                            <div class="stat-item">
                                <span class="stat-number">4+</span>
                                <span class="stat-label">Projects</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-number">3+</span>
                                <span class="stat-label">Years Experience</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-number">15+</span>
                                <span class="stat-label">Technologies</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-number">2+</span>
                                <span class="stat-label">Internships</span>
                            </div>
                        </div>
                    </div>
                    <div class="hero-side-info">
                        <div class="quick-info-card">
                            <h3>Quick Info</h3>
                            <div class="info-item">
                                <i class="fas fa-graduation-cap"></i>
                                <span>BS Computer Science + MIS Minor</span>
                            </div>
                            <div class="info-item">
                                <i class="fas fa-university"></i>
                                <span>University of Illinois at Chicago</span>
                            </div>
                            <div class="info-item">
                                <i class="fas fa-map-marker-alt"></i>
                                <span>Chicago, IL</span>
                            </div>
                            <div class="info-item">
                                <i class="fas fa-briefcase"></i>
                                <span>Seeking Full-time Opportunities</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="hero-fade"></div>
                <div class="scroll-indicator">
                    <div class="scroll-arrow">
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <span>Scroll to explore</span>
                </div>
            </section>
        `;

        // Replace existing hero section
        const existingHero = document.getElementById('hero');
        if (existingHero) {
            existingHero.outerHTML = heroHTML;
        } else {
            const mainContent = document.querySelector('.content-rows');
            if (mainContent) {
                mainContent.insertAdjacentHTML('afterbegin', heroHTML);
            }
        }

        this.element = document.getElementById('hero');
    }

    attachEventListeners() {
        if (!this.element) return;

        const playBtn = this.element.querySelector('.play-btn');
        const infoBtn = this.element.querySelector('.info-btn');
        const likeBtn = this.element.querySelector('.like-btn');
        const addBtn = this.element.querySelector('.add-btn');
        const shareBtn = this.element.querySelector('.share-btn');
        const downloadBtn = this.element.querySelector('.download-btn');
        const scrollIndicator = this.element.querySelector('.scroll-indicator');

        if (playBtn) {
            playBtn.addEventListener('click', () => this.scrollToProjects());
        }

        if (infoBtn) {
            infoBtn.addEventListener('click', () => this.showMoreInfo());
        }

        if (likeBtn) {
            likeBtn.addEventListener('click', () => this.toggleLike());
        }

        if (addBtn) {
            addBtn.addEventListener('click', () => this.toggleAddToList());
        }

        if (shareBtn) {
            shareBtn.addEventListener('click', () => this.shareProfile());
        }

        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => this.downloadResume());
        }

        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => this.scrollToNext());
        }

        // Auto-hide video controls
        const video = this.element.querySelector('.hero-video');
        if (video) {
            video.addEventListener('loadeddata', () => {
                // Ensure video plays smoothly
                video.play().catch(e => console.log('Video autoplay failed:', e));
            });
        }
    }

    scrollToProjects() {
        const projectsSection = document.getElementById('projects') || 
                              document.querySelector('[data-section="projects"]');
        if (projectsSection) {
            projectsSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    showMoreInfo() {
        const aboutSection = document.getElementById('about') || 
                           document.querySelector('[data-section="about"]');
        if (aboutSection) {
            aboutSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    toggleLike() {
        const likeBtn = this.element.querySelector('.like-btn');
        const icon = likeBtn.querySelector('i');
        const isLiked = likeBtn.getAttribute('data-liked') === 'true';

        if (!isLiked) {
            icon.classList.remove('fa-thumbs-up');
            icon.classList.add('fa-heart');
            likeBtn.style.background = 'var(--netflix-red)';
            likeBtn.style.color = 'var(--netflix-white)';
            likeBtn.setAttribute('data-liked', 'true');
            this.showNotification('Added to favorites!', 'success');
        } else {
            icon.classList.remove('fa-heart');
            icon.classList.add('fa-thumbs-up');
            likeBtn.style.background = 'transparent';
            likeBtn.style.color = 'var(--netflix-white)';
            likeBtn.setAttribute('data-liked', 'false');
            this.showNotification('Removed from favorites', 'info');
        }
    }

    toggleAddToList() {
        const addBtn = this.element.querySelector('.add-btn');
        const icon = addBtn.querySelector('i');
        const isAdded = addBtn.getAttribute('data-added') === 'true';

        if (!isAdded) {
            icon.classList.remove('fa-plus');
            icon.classList.add('fa-check');
            addBtn.style.background = 'var(--netflix-green)';
            addBtn.style.color = 'var(--netflix-white)';
            addBtn.setAttribute('data-added', 'true');
            this.showNotification('Added to your list!', 'success');
        } else {
            icon.classList.remove('fa-check');
            icon.classList.add('fa-plus');
            addBtn.style.background = 'transparent';
            addBtn.style.color = 'var(--netflix-white)';
            addBtn.setAttribute('data-added', 'false');
            this.showNotification('Removed from your list', 'info');
        }
    }

    shareProfile() {
        if (navigator.share) {
            navigator.share({
                title: 'Jash Patel - Developer Portfolio',
                text: 'Check out this amazing developer portfolio!',
                url: window.location.href
            }).then(() => {
                this.showNotification('Profile shared successfully!', 'success');
            }).catch(() => {
                this.fallbackShare();
            });
        } else {
            this.fallbackShare();
        }
    }

    fallbackShare() {
        // Copy URL to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            this.showNotification('Portfolio URL copied to clipboard!', 'success');
        }).catch(() => {
            this.showShareModal();
        });
    }

    showShareModal() {
        const shareModalHTML = `
            <div class="share-modal" id="shareModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Share Portfolio</h3>
                        <button class="close-modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="share-options">
                            <a href="https://twitter.com/intent/tweet?text=Check out this amazing developer portfolio!&url=${encodeURIComponent(window.location.href)}" 
                               target="_blank" class="share-option twitter">
                                <i class="fab fa-twitter"></i>
                                <span>Twitter</span>
                            </a>
                            <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}" 
                               target="_blank" class="share-option linkedin">
                                <i class="fab fa-linkedin"></i>
                                <span>LinkedIn</span>
                            </a>
                            <a href="mailto:?subject=Developer Portfolio&body=Check out this amazing portfolio: ${window.location.href}" 
                               class="share-option email">
                                <i class="fas fa-envelope"></i>
                                <span>Email</span>
                            </a>
                            <button class="share-option copy-link" data-url="${window.location.href}">
                                <i class="fas fa-link"></i>
                                <span>Copy Link</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', shareModalHTML);

        const modal = document.getElementById('shareModal');
        const closeBtn = modal.querySelector('.close-modal');
        const copyBtn = modal.querySelector('.copy-link');

        closeBtn.addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });

        copyBtn.addEventListener('click', () => {
            const url = copyBtn.getAttribute('data-url');
            navigator.clipboard.writeText(url).then(() => {
                copyBtn.innerHTML = '<i class="fas fa-check"></i><span>Copied!</span>';
                setTimeout(() => modal.remove(), 1000);
            });
        });
    }

    downloadResume() {
        // Create a temporary link to download the resume
        const link = document.createElement('a');
        link.href = './Jash Patel Resume.pdf';
        link.download = 'Jash_Patel_Resume.pdf';
        link.target = '_blank';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        this.showNotification('Resume download started!', 'success');
    }

    scrollToNext() {
        const aboutSection = document.getElementById('about') || 
                           document.querySelector('[data-section="about"]');
        if (aboutSection) {
            aboutSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    startHeroAnimations() {
        // Animate hero content on load
        const heroInfo = this.element.querySelector('.hero-info');
        const heroSideInfo = this.element.querySelector('.hero-side-info');
        
        if (heroInfo) {
            heroInfo.style.opacity = '0';
            heroInfo.style.transform = 'translateY(50px)';
            
            setTimeout(() => {
                heroInfo.style.transition = 'all 1s ease-out';
                heroInfo.style.opacity = '1';
                heroInfo.style.transform = 'translateY(0)';
            }, 500);
        }

        if (heroSideInfo) {
            heroSideInfo.style.opacity = '0';
            heroSideInfo.style.transform = 'translateX(50px)';
            
            setTimeout(() => {
                heroSideInfo.style.transition = 'all 1s ease-out';
                heroSideInfo.style.opacity = '1';
                heroSideInfo.style.transform = 'translateX(0)';
            }, 800);
        }

        // Animate stats
        this.animateStats();
        
        // Animate scroll indicator
        this.animateScrollIndicator();
    }

    animateStats() {
        const stats = this.element.querySelectorAll('.stat-number');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const stat = entry.target;
                    const finalValue = stat.textContent;
                    const numericValue = parseInt(finalValue);
                    
                    if (!isNaN(numericValue)) {
                        this.countUp(stat, numericValue, finalValue);
                    }
                    observer.unobserve(stat);
                }
            });
        });

        stats.forEach(stat => observer.observe(stat));
    }

    countUp(element, target, suffix) {
        let current = 0;
        const increment = target / 30; // 30 frames for smooth animation
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + suffix.replace(/\d/g, '');
            }
        }, 50);
    }

    animateScrollIndicator() {
        const scrollIndicator = this.element.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            setInterval(() => {
                scrollIndicator.style.animation = 'none';
                setTimeout(() => {
                    scrollIndicator.style.animation = 'bounce 2s infinite';
                }, 100);
            }, 4000);
        }
    }

    showNotification(message, type = 'info') {
        const notificationHTML = `
            <div class="hero-notification ${type}" id="heroNotification">
                <div class="notification-content">
                    <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
                    <span>${message}</span>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', notificationHTML);

        const notification = document.getElementById('heroNotification');
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Export for use in main script
window.Hero = Hero;
