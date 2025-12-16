// Shared JavaScript for Sea Glass Heaven
document.addEventListener('DOMContentLoaded', function() {
    // Global initialization
    console.log('Sea Glass Heaven Portal Loaded');

    // Example of a global function for API calls
    window.fetchHotelData = async function(endpoint) {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/${endpoint}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching hotel data:', error);
            return null;
        }
    };

    // Toggle mobile menu (if not using component)
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Form validation helper
    window.validateEmail = function(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    // Date formatting helper
    window.formatDate = function(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    // Currency formatting
    window.formatCurrency = function(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };
});