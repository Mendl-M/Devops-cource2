/* --- MATRIX DIGITAL RAIN LOGIC --- */
const canvas = document.getElementById('matrix');
if (canvas) {
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // תווים של המטריקס (קטאקנה ומספרים)
    const characters = "ｦｱｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890";
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function drawMatrix() {
        // אפקט ה-Trail: צובעים בשחור שקוף מאוד בכל פריים
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#0F0"; // ירוק זוהר
        ctx.font = `${fontSize}px monospace`;

        drops.forEach((y, i) => {
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            const x = i * fontSize;
            ctx.fillText(text, x, y * fontSize);

            // החזרה למעלה באקראיות אחרי שהטיפה עברה את גובה המסך
            if (y * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        });
    }
    setInterval(drawMatrix, 35);
}

/* --- EXISTING FUNCTIONALITY (MODIFIED) --- */

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Active navigation highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 250) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Contact form validation and submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const name = document.getElementById('name').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Reset error messages
        document.querySelectorAll('.error-message').forEach(msg => {
            msg.classList.remove('show');
        });
        
        let isValid = true;
        
        if (name.length < 2) {
            showError('nameError', 'ERROR: Invalid Name Protocol');
            isValid = false;
        }
        
        if (!isValidEmail(email)) {
            showError('emailError', 'ERROR: Secure Connection Failed (Email)');
            isValid = false;
        }
        
        if (message.length < 10) {
            showError('messageError', 'ERROR: Payload Too Small');
            isValid = false;
        }

        if (isValid) {
            // אפקט הצלחה בסגנון מטריקס
            const btn = document.querySelector('.submit-btn');
            btn.textContent = "TRANSMITTING...";
            btn.disabled = true;

            setTimeout(() => {
                const successMsg = document.querySelector('.success-message');
                if (successMsg) {
                    successMsg.textContent = "Data sent to the source. Welcome to the desert of the real.";
                    successMsg.classList.add('show');
                }
                btn.textContent = "TRANSMITTED";
            }, 1500);
        }
    });
}

function showError(id, message) {
    const errorEl = document.getElementById(id);
    if (errorEl) {
        errorEl.textContent = message;
        errorEl.classList.add('show');
    }
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
        
        if (isValid) {
            // Show success message
            if (successMsg) {
                successMsg.classList.add('show');
                successMsg.textContent = `Thank you ${name}! Your message has been received. I'll get back to you soon!`;
            }
            
            // Reset form
            this.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                if (successMsg) {
                    successMsg.classList.remove('show');
                }
            }, 5000);
            
            console.log('Form submitted:', { name, email, message });
        }
    });
}

// Helper function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Helper function to show error message
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

// Intersection Observer for fade-in animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all skill cards and project cards
document.querySelectorAll('.skill-card, .project-card').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

console.log('Portfolio loaded successfully');
