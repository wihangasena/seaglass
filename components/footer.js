class CustomFooter extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                * {
                    box-sizing: border-box;
                }
                footer {
                    background-color: #2A5360;
                    color: rgba(255, 255, 255, 0.9);
                    padding: 3rem 0 1.5rem;
                }
                .footer-container {
                    max-width: 1280px;
                    margin: 0 auto;
                    padding: 0 1rem;
                }
                .footer-content {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 2rem;
                    margin-bottom: 2rem;
                }
                .footer-section h3 {
                    color: white;
                    font-size: 1.25rem;
                    margin-bottom: 1rem;
                    font-weight: 600;
                }
                .footer-section p {
                    line-height: 1.6;
                    margin-bottom: 0.5rem;
                }
                .social-links {
                    display: flex;
                    gap: 1rem;
                    margin-top: 1rem;
                }
                .social-link {
                    color: #53ABA9;
                    transition: color 0.3s, transform 0.3s;
                }
                .social-link:hover {
                    color: white;
                    transform: translateY(-2px);
                }
                .footer-bottom {
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                    padding-top: 1.5rem;
                    text-align: center;
                    color: rgba(255, 255, 255, 0.7);
                }
                .footer-links {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 1.5rem;
                    margin: 1rem 0;
                }
                .footer-links a {
                    color: rgba(255, 255, 255, 0.8);
                    text-decoration: none;
                    transition: color 0.3s;
                }
                .footer-links a:hover {
                    color: #53ABA9;
                }
                @media (max-width: 768px) {
                    .footer-content {
                        grid-template-columns: 1fr;
                        gap: 1.5rem;
                    }
                    .footer-links {
                        flex-direction: column;
                        align-items: center;
                        gap: 0.75rem;
                    }
                }
            </style>
            <footer>
                <div class="footer-container">
                    <div class="footer-content">
                        <div class="footer-section">
                            <h3>Sea Glass Heaven</h3>
                            <p>Experience coastal serenity with modern luxury. Your digital gateway to a perfect beachside stay.</p>
                            <div class="social-links">
                                <a href="#" class="social-link">
                                    <i data-feather="instagram" class="w-5 h-5"></i>
                                </a>
                                <a href="#" class="social-link">
                                    <i data-feather="facebook" class="w-5 h-5"></i>
                                </a>
                                <a href="#" class="social-link">
                                    <i data-feather="twitter" class="w-5 h-5"></i>
                                </a>
                                <a href="#" class="social-link">
                                    <i data-feather="youtube" class="w-5 h-5"></i>
                                </a>
                            </div>
                        </div>
                        <div class="footer-section">
                            <h3>Contact Us</h3>
                            <p>
                                <i data-feather="map-pin" class="w-4 h-4 inline mr-2"></i>
                                123 Ocean Drive, Coastal Paradise
                            </p>
                            <p>
                                <i data-feather="phone" class="w-4 h-4 inline mr-2"></i>
                                +1 (555) 123-4567
                            </p>
                            <p>
                                <i data-feather="mail" class="w-4 h-4 inline mr-2"></i>
                                hello@seaglassheaven.com
                            </p>
                        </div>
                        <div class="footer-section">
                            <h3>Quick Links</h3>
                            <p><a href="booking.html">Book a Room</a></p>
                            <p><a href="restaurant.html">Restaurant Reservations</a></p>
                            <p><a href="checkin.html">Online Check-In</a></p>
                            <p><a href="dashboard.html">Guest Dashboard</a></p>
                        </div>
                    </div>
                    <div class="footer-bottom">
                        <div class="footer-links">
                            <a href="#">Privacy Policy</a>
                            <a href="#">Terms of Service</a>
                            <a href="#">Accessibility</a>
                            <a href="#">Careers</a>
                            <a href="#">Sustainability</a>
                        </div>
                        <p>&copy; ${new Date().getFullYear()} Sea Glass Heaven. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        `;

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

customElements.define('custom-footer', CustomFooter);