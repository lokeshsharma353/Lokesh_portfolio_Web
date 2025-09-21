// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Ensure skills and projects are visible on page load and remove toggle buttons
document.addEventListener('DOMContentLoaded', function() {
    const skillsGrid = document.querySelector('.skills-grid');
    if (skillsGrid) {
        skillsGrid.style.display = 'grid';
        skillsGrid.style.opacity = '1';
        skillsGrid.style.transform = 'translateY(0)';
    }
    
    const projectsContent = document.querySelector('.projects-content');
    if (projectsContent) {
        projectsContent.style.display = 'block';
        projectsContent.style.opacity = '1';
        projectsContent.style.transform = 'translateY(0)';
    }
    
    // Remove toggle buttons
    const skillsToggle = document.getElementById('skillsToggle');
    if (skillsToggle) {
        skillsToggle.remove();
    }
    
    const projectsToggle = document.getElementById('projectsToggle');
    if (projectsToggle) {
        projectsToggle.remove();
    }
});

// Contact Form Handling with WhatsApp Integration
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Create WhatsApp message
        const whatsappMessage = `Hi Lokesh! I'm ${name}.\n\nEmail: ${email}\n\nMessage: ${message}`;
        const whatsappURL = `https://wa.me/919588563701?text=${encodeURIComponent(whatsappMessage)}`;
        
        // Open WhatsApp
        window.open(whatsappURL, '_blank');
        
        // Reset form
        contactForm.reset();
        alert('Redirecting to WhatsApp to send your message!');
    });
}

// Resume Download Functionality
const downloadBtn = document.getElementById('downloadResume');
if (downloadBtn) {
    downloadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        const resumeContent = `LOKESH SHARMA
Software Engineer
Email: lokeshsharma353.india@gmail.com

EDUCATION
Bachelor of Technology in Computer Science Engineering
Maharshi Dayanand University, Rohtak, India | 2022 - 2026

SKILLS
Languages: Java, Python, SQL, JavaScript, HTML, CSS, C
Frameworks: Spring Boot, React, Flask, PyTorch, TensorFlow
Tools: GitHub, Docker, MySQL, VS Code, Jupyter Notebook

PROJECTS
• RkEnterprise - Scalable Interior WebApp
• CityStarGym - Complete gym management system
• Hotel Management System - Admin authentication system`;
        
        const blob = new Blob([resumeContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Lokesh_Sharma_Resume.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    });
}

// Cursor Trail Effect
document.addEventListener('mousemove', (e) => {
    const trail = document.querySelector('.cursor-trail');
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
    trail.style.opacity = '1';
});

// Animated Counter for Stats
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 20);
}

// Intersection Observer for Stats Animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target);
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.stats-grid');
if (statsSection) {
    observer.observe(statsSection);
}

// Typing Effect for Hero Subtitle
const typingTexts = ['Web Developer', 'Frontend Expert', 'UI/UX Designer', 'Problem Solver'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;
    
    const currentText = typingTexts[textIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => isDeleting = true, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
    }
    
    setTimeout(typeEffect, isDeleting ? 50 : 100);
}

// Start typing effect
setTimeout(typeEffect, 1000);

// Smooth scroll with offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll animations
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
});

document.querySelectorAll('.project-card, .stat-item, .contact-form').forEach(el => {
    animateOnScroll.observe(el);
});