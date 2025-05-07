// Page Loader Script
document.addEventListener('DOMContentLoaded', function() {
    // Create the loading overlay element
    const overlay = document.createElement('div');
    overlay.className = 'page-loading-overlay';
    overlay.innerHTML = '<div class="loader"></div>';
    document.body.prepend(overlay);
    
    // Function to check if all HTMX components are loaded
    function checkComponentsLoaded() {
        // Get all elements with HTMX load attributes
        const htmxElements = document.querySelectorAll('[hx-trigger="load"]');
        
        if (htmxElements.length === 0) {
            hideLoader();
            return;
        }
        
        // Set up a mutation observer to detect when components are added
        const observer = new MutationObserver((mutations) => {
            let allLoaded = true;
            
            htmxElements.forEach(el => {
                // Check if the element has content
                if (el.children.length === 0) {
                    allLoaded = false;
                }
            });
            
            if (allLoaded) {
                hideLoader();
                observer.disconnect();
            }
        });
        
        // Start observing
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        
        // Fallback - hide loader after 5 seconds regardless
        setTimeout(hideLoader, 5000);
    }
    
    // Hide the loader
    function hideLoader() {
        overlay.classList.add('loaded');
        // Remove from DOM after transition completes
        setTimeout(() => {
            overlay.remove();
        }, 500);
    }
    
    // Start checking for loaded components
    checkComponentsLoaded();
}); 