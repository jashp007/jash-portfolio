// Profile Screen Component
class ProfileScreen {
    constructor() {
        this.element = null;
        this.profiles = {
            jash: {
                name: 'Jash Patel',
                avatar: 'https://via.placeholder.com/150x150/e50914/ffffff?text=JP',
                role: 'Developer',
                isActive: true
            },
            recruiter: {
                name: 'Recruiter',
                avatar: 'https://via.placeholder.com/150x150/333333/ffffff?text=HR',
                role: 'Hiring Manager',
                isActive: true
            },
            guest: {
                name: 'Add Profile',
                avatar: null,
                role: 'New User',
                isActive: false
            }
        };
        this.init();
    }

    init() {
        this.render();
        this.attachEventListeners();
        this.addAnimations();
    }

    render() {
        const profileScreenHTML = `
            <div id="profileScreen" class="profile-screen">
                <div class="profile-background">
                    <div class="bg-animation"></div>
                </div>
                <div class="netflix-logo">
                    <h1>JASHFLIX</h1>
                </div>
                <div class="profile-container">
                    <h1 class="profile-title">Who's coding today?</h1>
                    <div class="profiles-grid">
                        ${this.renderProfiles()}
                    </div>
                    <div class="profile-actions">
                        <button class="manage-profiles">Manage Profiles</button>
                    </div>
                </div>
            </div>
        `;

        // Replace existing profile screen or create new one
        const existingScreen = document.getElementById('profileScreen');
        if (existingScreen) {
            existingScreen.outerHTML = profileScreenHTML;
        } else {
            document.body.insertAdjacentHTML('afterbegin', profileScreenHTML);
        }

        this.element = document.getElementById('profileScreen');
    }

    renderProfiles() {
        return Object.entries(this.profiles).map(([key, profile]) => {
            if (key === 'guest') {
                return `
                    <div class="profile-item add-profile" data-profile="${key}">
                        <div class="profile-avatar guest">
                            <i class="fas fa-user-plus"></i>
                        </div>
                        <span class="profile-name">${profile.name}</span>
                    </div>
                `;
            }

            return `
                <div class="profile-item" data-profile="${key}">
                    <div class="profile-avatar">
                        <img src="${profile.avatar}" alt="${profile.name}">
                        <div class="profile-status ${profile.isActive ? 'active' : ''}"></div>
                    </div>
                    <span class="profile-name">${profile.name}</span>
                    <span class="profile-role">${profile.role}</span>
                </div>
            `;
        }).join('');
    }

    attachEventListeners() {
        if (!this.element) return;

        const profileItems = this.element.querySelectorAll('.profile-item');
        const manageButton = this.element.querySelector('.manage-profiles');

        profileItems.forEach(item => {
            item.addEventListener('click', () => this.selectProfile(item));
            item.addEventListener('mouseenter', () => this.hoverProfile(item));
            item.addEventListener('mouseleave', () => this.unhoverProfile(item));
        });

        if (manageButton) {
            manageButton.addEventListener('click', () => this.showManageProfiles());
        }

        // Keyboard navigation
        this.setupKeyboardNavigation();
    }

    selectProfile(profileItem) {
        const profileType = profileItem.getAttribute('data-profile');
        
        if (profileType === 'guest') {
            this.showAddProfileModal();
            return;
        }

        // Animation before transition
        profileItem.style.transform = 'scale(1.2)';
        profileItem.style.opacity = '0.8';
        
        // Add selection effect
        profileItem.classList.add('selected');

        setTimeout(() => {
            this.transitionToMain(profileType);
        }, 800);
    }

    hoverProfile(profileItem) {
        if (!profileItem.classList.contains('selected')) {
            profileItem.style.transform = 'scale(1.1)';
            profileItem.querySelector('.profile-avatar').style.boxShadow = '0 0 20px rgba(229, 9, 20, 0.5)';
        }
    }

    unhoverProfile(profileItem) {
        if (!profileItem.classList.contains('selected')) {
            profileItem.style.transform = 'scale(1)';
            profileItem.querySelector('.profile-avatar').style.boxShadow = '';
        }
    }

    transitionToMain(profileType) {
        const profile = this.profiles[profileType];
        
        // Store selected profile info
        sessionStorage.setItem('selectedProfile', JSON.stringify({
            type: profileType,
            ...profile
        }));

        // Transition animation
        this.element.style.animation = 'fadeOut 0.5s ease-out';
        
        setTimeout(() => {
            this.element.classList.add('hidden');
            const mainContent = document.getElementById('mainContent');
            if (mainContent) {
                mainContent.classList.remove('hidden');
                
                // Update header with profile info
                this.updateHeaderProfile(profile);
                
                // Initialize main application components
                this.initializeMainApp();
            }
        }, 500);
    }

    updateHeaderProfile(profile) {
        const profilePic = document.querySelector('.profile-pic');
        if (profilePic) {
            profilePic.src = profile.avatar;
            profilePic.alt = profile.name;
        }
    }

    initializeMainApp() {
        // Initialize all main components using the global method
        if (window.initializeMainApp) {
            window.initializeMainApp();
        }
    }

    showAddProfileModal() {
        const addProfileModalHTML = `
            <div class="add-profile-modal" id="addProfileModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>Add New Profile</h2>
                        <button class="close-modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <form class="add-profile-form">
                            <div class="form-group">
                                <label for="profileName">Profile Name</label>
                                <input type="text" id="profileName" placeholder="Enter profile name" required>
                            </div>
                            <div class="form-group">
                                <label for="profileRole">Role</label>
                                <select id="profileRole" required>
                                    <option value="">Select role</option>
                                    <option value="Developer">Developer</option>
                                    <option value="Recruiter">Recruiter</option>
                                    <option value="Client">Client</option>
                                    <option value="Student">Student</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Choose Avatar</label>
                                <div class="avatar-selection">
                                    <div class="avatar-option" data-avatar="https://via.placeholder.com/150x150/e50914/ffffff?text=D">
                                        <img src="https://via.placeholder.com/150x150/e50914/ffffff?text=D" alt="Developer">
                                    </div>
                                    <div class="avatar-option" data-avatar="https://via.placeholder.com/150x150/3498db/ffffff?text=R">
                                        <img src="https://via.placeholder.com/150x150/3498db/ffffff?text=R" alt="Recruiter">
                                    </div>
                                    <div class="avatar-option" data-avatar="https://via.placeholder.com/150x150/9b59b6/ffffff?text=C">
                                        <img src="https://via.placeholder.com/150x150/9b59b6/ffffff?text=C" alt="Client">
                                    </div>
                                    <div class="avatar-option" data-avatar="https://via.placeholder.com/150x150/27ae60/ffffff?text=S">
                                        <img src="https://via.placeholder.com/150x150/27ae60/ffffff?text=S" alt="Student">
                                    </div>
                                </div>
                            </div>
                            <div class="form-actions">
                                <button type="button" class="cancel-btn">Cancel</button>
                                <button type="submit" class="create-btn">Create Profile</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', addProfileModalHTML);

        const modal = document.getElementById('addProfileModal');
        const closeBtn = modal.querySelector('.close-modal');
        const cancelBtn = modal.querySelector('.cancel-btn');
        const form = modal.querySelector('.add-profile-form');
        const avatarOptions = modal.querySelectorAll('.avatar-option');

        let selectedAvatar = '';

        // Avatar selection
        avatarOptions.forEach(option => {
            option.addEventListener('click', () => {
                avatarOptions.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                selectedAvatar = option.getAttribute('data-avatar');
            });
        });

        // Close modal
        const closeModal = () => modal.remove();
        closeBtn.addEventListener('click', closeModal);
        cancelBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        // Form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('profileName').value;
            const role = document.getElementById('profileRole').value;
            
            if (!selectedAvatar) {
                alert('Please select an avatar');
                return;
            }

            this.createNewProfile(name, role, selectedAvatar);
            closeModal();
        });
    }

    createNewProfile(name, role, avatar) {
        const profileKey = name.toLowerCase().replace(/\s+/g, '_');
        
        this.profiles[profileKey] = {
            name: name,
            avatar: avatar,
            role: role,
            isActive: true
        };

        // Re-render profiles
        const profilesGrid = this.element.querySelector('.profiles-grid');
        profilesGrid.innerHTML = this.renderProfiles();
        
        // Re-attach event listeners
        this.attachEventListeners();

        // Show success message
        this.showNotification(`Profile "${name}" created successfully!`);
    }

    showManageProfiles() {
        const manageModalHTML = `
            <div class="manage-profiles-modal" id="manageProfilesModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>Manage Profiles</h2>
                        <button class="close-modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="profiles-management">
                            ${Object.entries(this.profiles).filter(([key]) => key !== 'guest').map(([key, profile]) => `
                                <div class="manage-profile-item" data-profile="${key}">
                                    <div class="profile-info">
                                        <img src="${profile.avatar}" alt="${profile.name}">
                                        <div class="profile-details">
                                            <h4>${profile.name}</h4>
                                            <p>${profile.role}</p>
                                        </div>
                                    </div>
                                    <div class="profile-actions">
                                        <button class="edit-profile" data-profile="${key}">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button class="delete-profile" data-profile="${key}">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        <div class="manage-actions">
                            <button class="add-new-profile">Add New Profile</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', manageModalHTML);

        const modal = document.getElementById('manageProfilesModal');
        const closeBtn = modal.querySelector('.close-modal');
        const addNewBtn = modal.querySelector('.add-new-profile');

        closeBtn.addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });

        addNewBtn.addEventListener('click', () => {
            modal.remove();
            this.showAddProfileModal();
        });
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (this.element.classList.contains('hidden')) return;

            const profiles = this.element.querySelectorAll('.profile-item');
            const currentFocus = document.activeElement;
            const currentIndex = Array.from(profiles).indexOf(currentFocus);

            switch (e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    const prevIndex = currentIndex > 0 ? currentIndex - 1 : profiles.length - 1;
                    profiles[prevIndex].focus();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    const nextIndex = currentIndex < profiles.length - 1 ? currentIndex + 1 : 0;
                    profiles[nextIndex].focus();
                    break;
                case 'Enter':
                    e.preventDefault();
                    if (currentFocus && currentFocus.classList.contains('profile-item')) {
                        this.selectProfile(currentFocus);
                    }
                    break;
            }
        });

        // Make profile items focusable
        const profiles = this.element.querySelectorAll('.profile-item');
        profiles.forEach((profile, index) => {
            profile.setAttribute('tabindex', index === 0 ? '0' : '-1');
        });
    }

    addAnimations() {
        // Add entrance animations
        const profiles = this.element.querySelectorAll('.profile-item');
        profiles.forEach((profile, index) => {
            profile.style.animationDelay = `${index * 0.1}s`;
            profile.classList.add('profile-entrance');
        });

        // Add background animations
        const bgAnimation = this.element.querySelector('.bg-animation');
        if (bgAnimation) {
            bgAnimation.style.animation = 'backgroundFloat 20s ease-in-out infinite';
        }
    }

    showNotification(message) {
        const notificationHTML = `
            <div class="profile-notification" id="profileNotification">
                <i class="fas fa-check-circle"></i>
                <span>${message}</span>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', notificationHTML);

        const notification = document.getElementById('profileNotification');
        
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
window.ProfileScreen = ProfileScreen;
