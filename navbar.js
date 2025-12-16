class CustomNavbar extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                * {
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0;
                    font-family: 'Inter', sans-serif;
                }
                nav {
                    background-color: #2A5360;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    position: sticky;
                    top: 0;
                    z-index: 100;
                }
                .nav-container {
                    max-width: 1280px;
                    margin: 0 auto;
                    padding: 0 1rem;
                }
                .nav-content {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1rem 0;
                }
                .logo {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: white;
                    text-decoration: none;
                    font-weight: 700;
                    font-size: 1.5rem;
                }
                .nav-links {
                    display: flex;
                    gap: 2rem;
                    align-items: center;
                }
                .nav-link {
                    color: rgba(255, 255, 255, 0.9);
                    text-decoration: none;
                    font-weight: 500;
                    transition: color 0.3s, transform 0.3s;
                    padding: 0.5rem 0;
                    position: relative;
                }
                .nav-link:hover {
                    color: #53ABA9;
                    transform: translateY(-2px);
                }
                .nav-link.active {
                    color: #53ABA9;
                }
                .nav-link.active::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 2px;
                    background-color: #53ABA9;
                }
                .mobile-menu-btn {
                    display: none;
                    background: none;
                    border: none;
                    color: white;
                    cursor: pointer;
                }
                @media (max-width: 768px) {
                    .mobile-menu-btn {
                        display: block;
                    }
                    .nav-links {
                        display: none;
                        position: absolute;
                        top: 100%;
                        left: 0;
                        right: 0;
                        background-color: #2A5360;
                        flex-direction: column;
                        gap: 0;
                        padding: 1rem;
                        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                    }
                    .nav-links.open {
                        display: flex;
                    }
                    .nav-link {
                        width: 100%;
                        padding: 1rem;
                        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    }
                    .nav-link:last-child {
                        border-bottom: none;
                    }
                }
            </style>
            <nav>
                <div class="nav-container">
                    <div class="nav-content">
                        <a href="index.html" class="logo">
                            <i data-feather="compass" class="text-accent w-6 h-6"></i>
                            <span>Sea Glass Heaven</span>
                        </a>
                        
                        <button class="mobile-menu-btn" id="mobileMenuBtn">
                            <i data-feather="menu" class="w-6 h-6"></i>
                        </button>
                        
                        <div class="nav-links" id="navLinks">
                            <a href="index.html" class="nav-link active">Home</a>
                            <a href="booking.html" class="nav-link">Rooms</a>
                            <a href="restaurant.html" class="nav-link">Restaurant</a>
                            <a href="dashboard.html" class="nav-link">Dashboard</a>
                            <a href="login.html" class="nav-link">
                                <i data-feather="user" class="w-4 h-4 inline mr-1"></i>
                                Login
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        `;

        // Initialize mobile menu toggle
        const mobileMenuBtn = this.shadowRoot.getElementById('mobileMenuBtn');
        const navLinks = this.shadowRoot.getElementById('navLinks');
        
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });

        // Update active link based on current page
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const links = this.shadowRoot.querySelectorAll('.nav-link');
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPath || (currentPath === '' && href === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Replace feather icons in shadow DOM
        setTimeout(() => {
            const featherIcons = this.shadowRoot.querySelectorAll('[data-feather]');
            featherIcons.forEach(icon => {
                const iconName = icon.getAttribute('data-feather');
                const svg = feather.icons[iconName].toSvg();
                icon.outerHTML = svg;
            });
        }, 100);
    }
}

customElements.define('custom-navbar', CustomNavbar);