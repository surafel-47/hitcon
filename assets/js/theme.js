// Theme management for consistent dark mode across pages
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme based on localStorage or system preference
    const initializeTheme = () => {
        // Check localStorage first
        const savedTheme = localStorage.getItem('darkMode');
        
        if (savedTheme !== null) {
            // Use saved preference
            if (savedTheme === 'true') {
                document.documentElement.classList.add('dark');
                window.Alpine && Alpine.store('darkMode', true);
            } else {
                document.documentElement.classList.remove('dark');
                window.Alpine && Alpine.store('darkMode', false);
            }
        } else {
            // Check system preference if no saved preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (prefersDark) {
                document.documentElement.classList.add('dark');
                localStorage.setItem('darkMode', 'true');
                window.Alpine && Alpine.store('darkMode', true);
            }
        }
    };

    // Call immediately
    initializeTheme();

    // Set up Alpine store when Alpine is ready
    if (window.Alpine) {
        setupAlpine();
    } else {
        document.addEventListener('alpine:init', setupAlpine);
    }

    function setupAlpine() {
        Alpine.store('darkMode', document.documentElement.classList.contains('dark'));
        
        Alpine.store('toggleDarkMode', function() {
            const isDark = document.documentElement.classList.contains('dark');
            
            if (isDark) {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('darkMode', 'false');
                Alpine.store('darkMode', false);
            } else {
                document.documentElement.classList.add('dark');
                localStorage.setItem('darkMode', 'true');
                Alpine.store('darkMode', true);
            }
        });
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (localStorage.getItem('darkMode') === null) {
            // Only auto-switch if user hasn't set a preference
            if (e.matches) {
                document.documentElement.classList.add('dark');
                window.Alpine && Alpine.store('darkMode', true);
            } else {
                document.documentElement.classList.remove('dark');
                window.Alpine && Alpine.store('darkMode', false);
            }
        }
    });

    // Add lazy loading for images
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // If data-src is set, use it as the source
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
}); 