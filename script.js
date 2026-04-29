// ========================================
// GLOBAL VARIABLES
// ========================================
let musicPlaying = false;
let confettiAnimationId = null;

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initCustomCursor();
    initParticles();
    initMusicToggle();
    initHeroButton();
    initInteractiveButtons();
    initScrollAnimations();
});

// ========================================
// LOADING ANIMATION
// ========================================
function initLoader() {
    const loader = document.getElementById('loader');
    
    // Hide loader after 2 seconds
    setTimeout(() => {
        loader.classList.add('hidden');
        
        // Remove loader from DOM after animation completes
        setTimeout(() => {
            loader.remove();
        }, 500);
    }, 2000);
}

// ========================================
// CUSTOM CURSOR
// ========================================
function initCustomCursor() {
    const cursor = document.getElementById('cursor');
    const cursorGlow = document.getElementById('cursorGlow');
    
    // Only enable custom cursor on desktop
    if (window.innerWidth <= 768) {
        cursor.style.display = 'none';
        cursorGlow.style.display = 'none';
        return;
    }
    
    // Track cursor position
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });
    
    // Add hover effect for clickable elements
    const clickableElements = document.querySelectorAll('button, a, .response-button');
    
    clickableElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-hover');
        });
        
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-hover');
        });
    });
}

// ========================================
// FLOATING PARTICLES
// ========================================
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random position and size
    const startX = Math.random() * 100;
    const size = Math.random() * 6 + 4;
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 5;
    
    particle.style.left = startX + '%';
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.animationDuration = duration + 's';
    particle.style.animationDelay = delay + 's';
    
    container.appendChild(particle);
}

// ========================================
// MUSIC TOGGLE
// ========================================
function initMusicToggle() {
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    
    musicToggle.addEventListener('click', () => {
        if (musicPlaying) {
            bgMusic.pause();
            musicToggle.classList.remove('playing');
        } else {
            bgMusic.play().catch(err => {
                console.log('Audio playback failed:', err);
            });
            musicToggle.classList.add('playing');
        }
        musicPlaying = !musicPlaying;
    });
}

// ========================================
// HERO BUTTON - SCROLL TO MESSAGE
// ========================================
function initHeroButton() {
    const ctaButton = document.getElementById('ctaButton');
    const messageSection = document.getElementById('messageSection');
    
    ctaButton.addEventListener('click', () => {
        messageSection.scrollIntoView({ behavior: 'smooth' });
        
        // Start typewriter effect after scrolling
        setTimeout(() => {
            startTypewriter();
            createFloatingHearts();
        }, 800);
    });
}

// ========================================
// TYPEWRITER EFFECT
// ========================================
function startTypewriter() {
    const typewriterText = document.getElementById('typewriterText');
    const message = "Main jaanta hoon yeh thora unexpected hai 😄 Lekin maine socha… kyun na apni skills use karun tumhe smile dene ke liye? Kabhi kabhi kisi baat ko kehne ka best tareeqa yeh hota hai ke usay create kiya jaye. Toh… hum yahan hain.";
    
    let index = 0;
    const speed = 50; // milliseconds per character
    
    // Clear any existing text
    typewriterText.textContent = '';
    
    function type() {
        if (index < message.length) {
            typewriterText.textContent += message.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ========================================
// FLOATING HEARTS
// ========================================
function createFloatingHearts() {
    const floatingHearts = document.getElementById('floatingHearts');
    const heartCount = 15;
    
    for (let i = 0; i < heartCount; i++) {
        setTimeout(() => {
            createHeart(floatingHearts);
        }, i * 300);
    }
}

function createHeart(container) {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.textContent = '❤️';
    
    // Random position
    const startX = Math.random() * 80 + 10;
    heart.style.left = startX + '%';
    
    // Random animation duration
    const duration = Math.random() * 2 + 3;
    heart.style.animationDuration = duration + 's';
    
    container.appendChild(heart);
    
    // Remove heart after animation
    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

// ========================================
// INTERACTIVE BUTTONS (YES/NO)
// ========================================
function initInteractiveButtons() {
    const yesButton = document.getElementById('yesButton');
    const noButton = document.getElementById('noButton');
    const successMessage = document.getElementById('successMessage');
    const buttonsContainer = document.querySelector('.buttons-container');
    
    let noClickCount = 0;
    
    // YES Button - Show success message and confetti
    yesButton.addEventListener('click', () => {
        // Hide buttons
        buttonsContainer.style.opacity = '0';
        buttonsContainer.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            buttonsContainer.style.display = 'none';
            
            // Show success message
            successMessage.classList.add('show');
            
            // Trigger confetti
            launchConfetti();
        }, 300);
    });
    
    // NO Button - Run away from cursor
    noButton.addEventListener('mouseover', () => {
        moveButtonRandomly(noButton);
        noClickCount++;
        
        // Change button text after a few hovers
        if (noClickCount === 3) {
            noButton.textContent = "Really? 🥺";
        } else if (noClickCount === 5) {
            noButton.textContent = "Please? 🙏";
        } else if (noClickCount === 7) {
            noButton.textContent = "Just one chance? 💕";
        }
    });
    
    // NO Button click (if they manage to click it)
    noButton.addEventListener('click', () => {
        moveButtonRandomly(noButton);
    });
}

function moveButtonRandomly(button) {
    const container = button.parentElement;
    const containerRect = container.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    
    // Calculate max positions to keep button within container
    const maxX = containerRect.width - buttonRect.width;
    const maxY = containerRect.height - buttonRect.height;
    
    // Generate random position
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    // Apply position (using absolute positioning)
    button.style.position = 'absolute';
    button.style.left = randomX + 'px';
    button.style.top = randomY + 'px';
    button.style.transition = 'all 0.3s ease';
}

// ========================================
// CONFETTI ANIMATION
// ========================================
function launchConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const confettiPieces = [];
    const confettiCount = 150;
    const colors = ['#ff6b9d', '#a78bfa', '#fbbf24', '#ff8fab', '#c4b5fd'];
    
    // Create confetti pieces
    for (let i = 0; i < confettiCount; i++) {
        confettiPieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            w: Math.random() * 10 + 5,
            h: Math.random() * 10 + 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 10 - 5,
            speedX: Math.random() * 3 - 1.5,
            speedY: Math.random() * 3 + 2,
            opacity: 1
        });
    }
    
    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        let activeConfetti = 0;
        
        confettiPieces.forEach(confetti => {
            if (confetti.y < canvas.height && confetti.opacity > 0) {
                activeConfetti++;
                
                // Update position
                confetti.x += confetti.speedX;
                confetti.y += confetti.speedY;
                confetti.rotation += confetti.rotationSpeed;
                
                // Fade out near bottom
                if (confetti.y > canvas.height - 100) {
                    confetti.opacity -= 0.02;
                }
                
                // Draw confetti
                ctx.save();
                ctx.translate(confetti.x, confetti.y);
                ctx.rotate(confetti.rotation * Math.PI / 180);
                ctx.globalAlpha = confetti.opacity;
                ctx.fillStyle = confetti.color;
                ctx.fillRect(-confetti.w / 2, -confetti.h / 2, confetti.w, confetti.h);
                ctx.restore();
            }
        });
        
        // Continue animation if there are active confetti pieces
        if (activeConfetti > 0) {
            confettiAnimationId = requestAnimationFrame(animateConfetti);
        } else {
            // Clean up when done
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
    
    animateConfetti();
}

// ========================================
// SCROLL ANIMATIONS
// ========================================
function initScrollAnimations() {
    const cards = document.querySelectorAll('.memory-card');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    cards.forEach(card => observer.observe(card));
}

// ========================================
// WINDOW RESIZE HANDLER
// ========================================
window.addEventListener('resize', () => {
    const canvas = document.getElementById('confettiCanvas');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
});

// ========================================
// SMOOTH SCROLL REVEAL
// ========================================
window.addEventListener('scroll', () => {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator && window.scrollY > 100) {
        scrollIndicator.style.opacity = '0';
    }
});

// ========================================
// EASTER EGG: KONAMI CODE
// ========================================
(function() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                triggerEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    function triggerEasterEgg() {
        // Extra confetti burst
        launchConfetti();
        
        // Change background temporarily
        document.body.style.background = 'linear-gradient(45deg, #ff6b9d, #a78bfa, #fbbf24)';
        document.body.style.backgroundSize = '400% 400%';
        document.body.style.animation = 'gradientShift 3s ease infinite';
        
        setTimeout(() => {
            document.body.style.background = '';
            document.body.style.animation = '';
        }, 5000);
    }
    
    // Add gradient animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
    `;
    document.head.appendChild(style);
})();

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Log a special message in console
console.log('%c Made with ❤️ by Hamza ', 'background: linear-gradient(135deg, #ff6b9d 0%, #a78bfa 100%); color: white; padding: 10px 20px; font-size: 16px; font-weight: bold; border-radius: 8px;');
console.log('%c If you\'re reading this, you\'re pretty cool 😎 ', 'color: #ff6b9d; font-size: 14px; font-style: italic;');
