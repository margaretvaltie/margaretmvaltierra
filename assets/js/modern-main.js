/*
 * Modern, secure replacement for the old skel-based JavaScript
 * Removes security vulnerabilities while maintaining functionality
 */

(function() {
    'use strict';

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        
        // Remove loading class when page is fully loaded
        const body = document.body;
        body.classList.add('is-loading');
        
        window.addEventListener('load', function() {
            body.classList.remove('is-loading');
        });

        // Smooth scrolling for anchor links
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        anchorLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Simple mobile navigation toggle (if needed in future)
        function createMobileNav() {
            const nav = document.querySelector('#nav');
            if (!nav) return;

            // Create mobile toggle button
            const toggleButton = document.createElement('button');
            toggleButton.className = 'mobile-nav-toggle';
            toggleButton.innerHTML = '☰';
            toggleButton.setAttribute('aria-label', 'Toggle navigation');
            
            // Insert before nav
            nav.parentNode.insertBefore(toggleButton, nav);
            
            // Toggle functionality
            toggleButton.addEventListener('click', function() {
                nav.classList.toggle('mobile-nav-open');
                this.classList.toggle('active');
            });

            // Close nav when clicking outside
            document.addEventListener('click', function(e) {
                if (!nav.contains(e.target) && !toggleButton.contains(e.target)) {
                    nav.classList.remove('mobile-nav-open');
                    toggleButton.classList.remove('active');
                }
            });
        }

        // Initialize mobile nav for small screens
        if (window.innerWidth <= 736) {
            createMobileNav();
        }

        // Handle window resize
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                // Re-initialize mobile nav if needed
                const existingToggle = document.querySelector('.mobile-nav-toggle');
                if (window.innerWidth <= 736 && !existingToggle) {
                    createMobileNav();
                } else if (window.innerWidth > 736 && existingToggle) {
                    existingToggle.remove();
                    const nav = document.querySelector('#nav');
                    if (nav) {
                        nav.classList.remove('mobile-nav-open');
                    }
                }
            }, 250);
        });

        // Form enhancements
        const forms = document.querySelectorAll('form');
        forms.forEach(function(form) {
            // Add form validation feedback
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            inputs.forEach(function(input) {
                input.addEventListener('invalid', function() {
                    this.classList.add('error');
                });
                
                input.addEventListener('input', function() {
                    if (this.validity.valid) {
                        this.classList.remove('error');
                    }
                });
            });
        });

        // Add loading state to form submissions
        const submitButtons = document.querySelectorAll('input[type="submit"]');
        submitButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                const form = this.closest('form');
                if (form && form.checkValidity()) {
                    this.value = 'Sending...';
                    this.disabled = true;
                }
            });
        });

    });

})();