// Mobile menu functionality
document.addEventListener('DOMContentLoaded', () => {
    // Alpine data for mobile menu
    window.mobileMenuData = function() {
        return {
            isOpen: false,
            init() {
                // Close menu when clicking outside
                document.addEventListener('click', (e) => {
                    // If the click is outside the menu and the toggle button
                    if (this.isOpen && 
                        !e.target.closest('#mobile-menu') && 
                        !e.target.closest('#mobile-menu-toggle')) {
                        this.isOpen = false;
                    }
                });

                // Close menu when escape key is pressed
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape' && this.isOpen) {
                        this.isOpen = false;
                    }
                });
            },
            toggle() {
                this.isOpen = !this.isOpen;
                
                // Prevent scrolling when menu is open
                if (this.isOpen) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            },
            close() {
                this.isOpen = false;
                document.body.style.overflow = '';
            }
        };
    };
}); 