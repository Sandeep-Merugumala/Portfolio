document.addEventListener("DOMContentLoaded", () => {
    // 1. LOADER LOGIC
    const loader = document.getElementById('loader-wrapper');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 2500);

    // 2. THEME TOGGLE LOGIC
    const themeCheckbox = document.getElementById('input');
    const body = document.body;
    
    // Check saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        themeCheckbox.checked = false;
    } else {
        body.classList.remove('light-mode');
        themeCheckbox.checked = true;
    }

    themeCheckbox.addEventListener('change', () => {
        if (themeCheckbox.checked) {
            body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        }
    });

    // 3. SMOOTH SCROLLING
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 4. EMAILJS FORM SUBMISSION
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default refresh
            
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'Sending...';
            
            // REPLACE THESE WITH YOUR ACTUAL EMAILJS IDs
            const serviceID = 'service_0vbv57j';
            const templateID = 'template_jt0xrhu';

            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    btn.innerText = 'Sent!';
                    alert('Message Sent Successfully!');
                    contactForm.reset();
                    setTimeout(() => { btn.innerText = originalText; }, 3000);
                }, (err) => {
                    btn.innerText = 'Failed';
                    alert('Failed to send message. Please check your internet or try again later.');
                    console.log('FAILED...', err);
                    setTimeout(() => { btn.innerText = originalText; }, 3000);
                });
        });
    }
});

// Robot Eye Tracking
document.addEventListener('mousemove', (e) => {
    const eyes = document.querySelectorAll('.eye');
    eyes.forEach(eye => {
        const rect = eye.getBoundingClientRect();
        const x = rect.left + (rect.width / 2);
        const y = rect.top + (rect.height / 2);
        const angle = Math.atan2(e.clientY - y, e.clientX - x);
        const radius = 10; 
        const moveX = Math.cos(angle) * radius;
        const moveY = Math.sin(angle) * radius;
        eye.querySelector('.pupil').style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});