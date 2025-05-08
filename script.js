// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Course card hover effect
document.querySelectorAll('.course-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animated counter for statistics
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.counter');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                let count = 0;
                const updateCounter = () => {
                    if (count < target) {
                        count += Math.ceil(target / 100);
                        counter.innerText = count.toLocaleString();
                        setTimeout(updateCounter, 10);
                    } else {
                        counter.innerText = target.toLocaleString();
                    }
                };
                updateCounter();
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelector('.statistics').forEach(stat => {
    observer.observe(stat);
});

// Counter animation for statistics
function animateCounter(counter) {
    const target = +counter.getAttribute('data-target');
    const duration = 2000; // Animation duration in milliseconds
    const step = target / (duration / 16); // Update every 16ms (60fps)
    let current = 0;
    
    const updateCounter = () => {
        current += step;
        if (current < target) {
            counter.textContent = Math.round(current).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target.toLocaleString();
        }
    };
    
    updateCounter();
}

// Intersection Observer for counter animation
const observerOptions2 = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            animateCounter(counter);
            observer.unobserve(counter);
        }
    });
}, observerOptions2);

// Observe all counters
document.querySelectorAll('.counter').forEach(counter => {
    counterObserver.observe(counter);
});

// Counter Animation
function animateCounter2(counter) {
    const target = parseInt(counter.getAttribute('data-target'));
    const count = parseInt(counter.innerText);
    const increment = target / 200;

    if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(() => animateCounter2(counter), 1);
    } else {
        counter.innerText = target;
    }
}

// Initialize counters when they come into view
const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('counter')) {
                animateCounter2(entry.target);
            }
            observer.unobserve(entry.target);
        }
    });
};

const observer3 = new IntersectionObserver(observerCallback, {
    threshold: 0.5
});

document.querySelectorAll('.counter').forEach(counter => {
    observer3.observe(counter);
});

// 3D Tilt Effect
document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});

// Mobile menu functionality
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinks.classList.toggle('active');
    // Prevent background scrolling when menu is open
    if (navLinks.classList.contains('active')) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = '';
    }
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && 
        !navLinks.contains(e.target) && 
        !menuToggle.contains(e.target)) {
        navLinks.classList.remove('active');
        body.style.overflow = '';
    }
});

// Close menu when clicking on a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        body.style.overflow = '';
    });
});

// Close menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        body.style.overflow = '';
    }
});

// Login functionality
const loginForm = document.querySelector('.modal form');
const emailInput = document.querySelector('.modal input[type="email"]');
const passwordInput = document.querySelector('.modal input[type="password"]');
const errorMessage = document.createElement('div');
errorMessage.classList.add('error-message');
loginForm.insertBefore(errorMessage, loginForm.firstChild);

// Form validation
function validateForm() {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    
    if (!email || !password) {
        showError('Please fill in all fields');
        return false;
    }
    
    if (!isValidEmail(email)) {
        showError('Please enter a valid email address');
        return false;
    }
    
    if (password.length < 6) {
        showError('Password must be at least 6 characters long');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

function hideError() {
    errorMessage.style.display = 'none';
}

// Handle form submission
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideError();
    
    if (!validateForm()) {
        return;
    }
    
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    
    try {
        // Here you would typically make an API call to your backend
        // For demo purposes, we'll simulate a successful login
        const user = { email, name: email.split('@')[0] };
        localStorage.setItem('user', JSON.stringify(user));
        
        // Update UI
        updateLoginState();
        
        // Close modal
        modal.classList.remove('show');
        loginForm.reset();
        
    } catch (error) {
        showError('Login failed. Please try again.');
    }
});

// Update UI based on login state
function updateLoginState() {
    const user = JSON.parse(localStorage.getItem('user'));
    const loginBtn = document.querySelector('.login-btn');
    
    if (user) {
        loginBtn.textContent = `Welcome, ${user.name}`;
        loginBtn.onclick = handleLogout;
    } else {
        loginBtn.textContent = 'Login';
        loginBtn.onclick = () => modal.classList.add('show');
    }
}

// Handle logout
function handleLogout() {
    localStorage.removeItem('user');
    updateLoginState();
}

// Check login state on page load
document.addEventListener('DOMContentLoaded', updateLoginState);

// Login modal
const loginBtn = document.querySelector('.login-btn');
const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('.close-btn');

loginBtn.addEventListener('click', () => {
    modal.classList.add('show');
});

closeBtn.addEventListener('click', () => {
    modal.classList.remove('show');
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
    }
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Show sending state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        try {
            // In a real application, you would send this data to your server
            // For now, we'll simulate a successful submission
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        } catch (error) {
            alert('Sorry, there was an error sending your message. Please try again later.');
        } finally {
            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Hide scroll indicator when scrolling down
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop) {
        document.querySelector('.scroll-indicator').style.opacity = '0';
    } else {
        document.querySelector('.scroll-indicator').style.opacity = '0.8';
    }
    lastScrollTop = st <= 0 ? 0 : st;
});

// Initialize tilt effect
document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});
