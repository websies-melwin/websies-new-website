// Header Loader - Dynamically loads the global header component
document.addEventListener('DOMContentLoaded', function() {
    // Create header placeholder
    const headerPlaceholder = document.getElementById('header-placeholder');
    
    if (headerPlaceholder) {
        // Fetch the header component
        fetch('/components/header.html')
            .then(response => response.text())
            .then(data => {
                headerPlaceholder.innerHTML = data;
                
                // Initialize header functionality
                initializeHeader();
                
                // Set active navigation item based on current page
                setActiveNavigation();
            })
            .catch(error => {
                console.error('Error loading header:', error);
                // Fallback: try relative path
                fetch('components/header.html')
                    .then(response => response.text())
                    .then(data => {
                        headerPlaceholder.innerHTML = data;
                        initializeHeader();
                        setActiveNavigation();
                    })
                    .catch(err => console.error('Failed to load header component:', err));
            });
    }
});

function initializeHeader() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Re-initialize auth functions if auth.js is loaded
    if (typeof initAuth === 'function') {
        initAuth();
    }
}

function setActiveNavigation() {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';
    
    // Get all navigation links
    const navLinks = document.querySelectorAll('[data-nav]');
    
    navLinks.forEach(link => {
        // Remove any existing active classes
        link.classList.remove('text-accent');
        link.classList.add('text-white/70');
        
        // Check if this is the active page
        if (currentPage === 'pricing.html' && link.getAttribute('data-nav') === 'pricing') {
            link.classList.remove('text-white/70');
            link.classList.add('text-accent');
        } else if ((currentPage === 'index.html' || currentPage === '') && link.getAttribute('data-nav') === 'home') {
            link.classList.remove('text-white/70');
            link.classList.add('text-accent');
        }
    });
}

// Export functions for use in other scripts
window.toggleUserDropdown = function() {
    const dropdown = document.getElementById('userDropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
    }
}

window.openLoginModal = function() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.classList.add('active');
    }
}

window.closeLoginModal = function() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

window.handleLogin = function(event) {
    event.preventDefault();
    // This will be handled by auth.js
    if (typeof handleLoginSubmit === 'function') {
        handleLoginSubmit(event);
    }
}

window.switchToSignup = function() {
    // Implement signup modal switch
    console.log('Switch to signup');
}