// Elizabeth Buras Real Estate Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }

    // Hero Video Management
    const heroVideo = document.getElementById('heroVideo');
    const videoToggle = document.getElementById('videoToggle');
    
    if (heroVideo && videoToggle) {
        let isPlaying = true;
        
        // Respect user's motion preferences
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            heroVideo.pause();
            heroVideo.style.display = 'none';
            isPlaying = false;
            updateVideoToggleIcon(false);
        }
        
        // Video toggle functionality
        videoToggle.addEventListener('click', function() {
            if (isPlaying) {
                heroVideo.pause();
                isPlaying = false;
                updateVideoToggleIcon(false);
            } else {
                heroVideo.play().catch(e => console.log('Video play failed:', e));
                isPlaying = true;
                updateVideoToggleIcon(true);
            }
        });
        
        // Update toggle icon
        function updateVideoToggleIcon(playing) {
            const icon = videoToggle.querySelector('svg');
            if (playing) {
                // Pause icon
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6"></path>';
                videoToggle.title = 'Pause video';
            } else {
                // Play icon
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6l5-3-5-3z"></path>';
                videoToggle.title = 'Play video';
            }
        }
        
        // Handle video events
        heroVideo.addEventListener('loadstart', function() {
            console.log('Video loading started');
        });
        
        heroVideo.addEventListener('canplay', function() {
            console.log('Video can start playing');
        });
        
        heroVideo.addEventListener('error', function(e) {
            console.error('Video error:', e);
            // Hide video and show fallback image
            heroVideo.style.display = 'none';
            videoToggle.style.display = 'none';
        });
        
        // Optimize video for mobile
        if (window.innerWidth < 768) {
            heroVideo.preload = 'none';
        }
        
        // Pause video when not visible (for performance)
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting && isPlaying) {
                    heroVideo.pause();
                } else if (entry.isIntersecting && isPlaying) {
                    heroVideo.play().catch(e => console.log('Video autoplay failed:', e));
                }
            });
        });
        
        videoObserver.observe(heroVideo);
    }

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Toggle hamburger icon
            const icon = menuToggle.querySelector('svg');
            if (mobileMenu.classList.contains('hidden')) {
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
            } else {
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
            }
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!menuToggle.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenu.classList.add('hidden');
                const icon = menuToggle.querySelector('svg');
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
            }
        });

        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                const icon = menuToggle.querySelector('svg');
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
            });
        });
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name')?.trim();
            const email = formData.get('email')?.trim();
            const phone = formData.get('phone')?.trim();
            const message = formData.get('message')?.trim();

            // Basic validation
            if (!name || !email || !message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }

            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                showNotification('Thank you for your message! Elizabeth will get back to you soon.', 'success');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);

            // For actual implementation, you would send the data to your server:
            /*
            fetch('/submit-contact-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    phone: phone,
                    message: message
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    showNotification('Thank you for your message! Elizabeth will get back to you soon.', 'success');
                    contactForm.reset();
                } else {
                    showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
                }
            })
            .catch(error => {
                showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
            })
            .finally(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
            */
        });
    }

    // Notification System
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type} fixed top-4 right-4 z-50 max-w-sm p-4 rounded-lg shadow-lg`;
        
        // Set background color based on type
        let bgColor = 'bg-blue-500'; // info
        if (type === 'success') bgColor = 'bg-green-500';
        if (type === 'error') bgColor = 'bg-red-500';
        if (type === 'warning') bgColor = 'bg-yellow-500';
        
        notification.className += ` ${bgColor} text-white`;
        
        notification.innerHTML = `
            <div class="flex items-center justify-between">
                <span class="text-sm font-medium">${message}</span>
                <button class="notification-close ml-4 text-white hover:text-gray-200 focus:outline-none">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        `;

        // Add to DOM
        document.body.appendChild(notification);

        // Show notification with animation
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.style.transition = 'all 0.3s ease';
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 10);

        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            hideNotification(notification);
        });

        // Auto hide after 5 seconds
        setTimeout(() => {
            hideNotification(notification);
        }, 5000);
    }

    function hideNotification(notification) {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    // Enhanced Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', function() {
            const currentScrollY = window.scrollY;
            
            // Add/remove enhanced styling based on scroll position
            if (currentScrollY > 50) {
                navbar.classList.add('bg-white/98', 'shadow-lg');
                navbar.classList.remove('bg-white/95');
            } else {
                navbar.classList.add('bg-white/95');
                navbar.classList.remove('bg-white/98', 'shadow-lg');
            }
            
            lastScrollY = currentScrollY;
        });
    }

    // Image Loading Optimization
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            this.style.opacity = '0.5';
            console.warn('Failed to load image:', this.src);
        });
    });

    // Add hover effects to cards with smooth transitions
    document.querySelectorAll('.hover\\:shadow-lg').forEach(card => {
        card.style.transition = 'all 0.3s ease';
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Performance monitoring
    function checkPerformance() {
        if ('connection' in navigator) {
            const connection = navigator.connection;
            
            // Adjust video quality based on connection
            if (connection.effectiveType === 'slow-2g' || connection.saveData) {
                const heroVideo = document.getElementById('heroVideo');
                if (heroVideo) {
                    heroVideo.style.display = 'none';
                    console.log('Video hidden due to slow connection');
                }
            }
        }
    }
    
    checkPerformance();

    // Simple analytics tracking (replace with your actual analytics code)
    function trackEvent(category, action, label) {
        // Google Analytics example:
        // gtag('event', action, {
        //     event_category: category,
        //     event_label: label
        // });
        
        console.log(`Event tracked: ${category} - ${action} - ${label}`);
    }

    // Track video interactions
    if (heroVideo) {
        heroVideo.addEventListener('play', () => trackEvent('Video', 'Play', 'Hero Video'));
        heroVideo.addEventListener('pause', () => trackEvent('Video', 'Pause', 'Hero Video'));
    }

    // Track form submissions
    if (contactForm) {
        contactForm.addEventListener('submit', function() {
            trackEvent('Contact', 'Form Submit', 'Contact Form');
        });
    }

    // Track external link clicks
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('External Link', 'Click', this.href);
        });
    });

    // Track phone number clicks
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('Contact', 'Phone Click', this.href);
        });
    });

    // Track email clicks
    document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('Contact', 'Email Click', this.href);
        });
    });

    console.log('🏠 Elizabeth Buras Real Estate website loaded successfully!');
    console.log('🎬 Video hero section with customer photos implemented!');
}); 