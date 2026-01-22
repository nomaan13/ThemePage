// Navigation functionality for PortfolioPro CMS

class Navigation {
    constructor() {
        this.navbar = null;
        this.navLinks = null;
        this.currentPage = null;
        this.initialize();
    }
    
    initialize() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }
    
    setup() {
        this.navbar = document.querySelector('.navbar');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.currentPage = this.getCurrentPage();
        
        this.highlightActiveLink();
        this.setupMobileMenu();
        this.setupScrollEffect();
    }
    
    getCurrentPage() {
        const path = window.location.pathname;
        const page = path.split('/').pop();
        
        if (!page || page === '' || page === 'index.html') {
            return 'home';
        }
        
        return page.replace('.html', '');
    }
    
    highlightActiveLink() {
        this.navLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            const linkPageName = this.extractPageName(linkPage);
            
            link.classList.remove('active');
            
            if (linkPageName === this.currentPage) {
                link.classList.add('active');
            }
        });
    }
    
    extractPageName(url) {
        if (!url) return '';
        
        // Remove ../ if present
        let cleanUrl = url.replace('../', '');
        
        // Remove .html
        cleanUrl = cleanUrl.replace('.html', '');
        
        // Handle home page
        if (cleanUrl === '' || cleanUrl === 'index') {
            return 'home';
        }
        
        return cleanUrl;
    }
    
    setupMobileMenu() {
        const toggler = document.querySelector('.navbar-toggler');
        if (!toggler) return;
        
        toggler.addEventListener('click', () => {
            this.navbar.classList.toggle('expanded');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.navbar.classList.contains('expanded') && 
                !e.target.closest('.navbar')) {
                this.navbar.classList.remove('expanded');
                const collapse = document.querySelector('.navbar-collapse');
                if (collapse.classList.contains('show')) {
                    toggler.click();
                }
            }
        });
    }
    
    setupScrollEffect() {
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll <= 0) {
                this.navbar.classList.remove('scroll-up');
                return;
            }
            
            if (currentScroll > lastScroll && !this.navbar.classList.contains('scroll-down')) {
                // Scrolling down
                this.navbar.classList.remove('scroll-up');
                this.navbar.classList.add('scroll-down');
            } else if (currentScroll < lastScroll && this.navbar.classList.contains('scroll-down')) {
                // Scrolling up
                this.navbar.classList.remove('scroll-down');
                this.navbar.classList.add('scroll-up');
            }
            
            lastScroll = currentScroll;
            
            // Add shadow when scrolled
            if (currentScroll > 50) {
                this.navbar.classList.add('shadow-sm');
            } else {
                this.navbar.classList.remove('shadow-sm');
            }
        });
    }
}

// Initialize navigation
let portfolioNavigation = null;

document.addEventListener('DOMContentLoaded', function() {
    portfolioNavigation = new Navigation();
});

// Export for use in other files
window.PortfolioNavigation = Navigation;