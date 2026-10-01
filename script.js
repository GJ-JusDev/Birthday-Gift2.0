document.addEventListener("DOMContentLoaded", () => {
    // --- Page Transition Logic ---
    const openBtn = document.getElementById("open-btn");
    const landingPage = document.getElementById("landing-page");
    const messagePage = document.getElementById("message-page");

    openBtn.addEventListener("click", () => {
        // Fade out landing page
        landingPage.style.opacity = '0';
        landingPage.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            landingPage.style.display = 'none';
            messagePage.style.display = 'flex';
            
            // Trigger reflow to ensure the transition happens
            void messagePage.offsetWidth;
            
            messagePage.style.opacity = '1';
            messagePage.style.transform = 'translateY(0)';
        }, 1000); // Wait for the 1s CSS transition
    });


    // --- Particle Animations ---
    const heartsContainer = document.querySelector('.hearts-container');
    const starsContainer = document.querySelector('.stars-container');
    const particlesContainer = document.querySelector('.particles-container');

    // 1. Floating Hearts
    function createHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = '💜';
        heart.style.position = 'absolute';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.bottom = '-30px';
        heart.style.fontSize = (Math.random() * 15 + 10) + 'px'; // 10px to 25px
        heart.style.opacity = '0';
        
        // Random duration between 8s and 14s
        const duration = Math.random() * 6 + 8;
        heart.style.animation = `floatUp ${duration}s linear forwards`;
        
        heartsContainer.appendChild(heart);
        
        // Cleanup
        setTimeout(() => {
            if (heartsContainer.contains(heart)) {
                heart.remove();
            }
        }, duration * 1000);
    }

    // 2. Twinkling Stars
    function createStar() {
        const star = document.createElement('div');
        star.style.position = 'absolute';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.top = Math.random() * 60 + 'vh'; // Mostly in the sky portion
        
        const size = Math.random() * 2 + 1; // 1px to 3px
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        
        star.style.backgroundColor = '#fff';
        star.style.borderRadius = '50%';
        star.style.boxShadow = `0 0 ${size * 2}px #fff`;
        
        // Random twinkle duration
        const duration = Math.random() * 3 + 2;
        star.style.animation = `twinkle ${duration}s infinite ease-in-out`;
        
        // Random delay so they don't all twinkle at once
        star.style.animationDelay = (Math.random() * 5) + 's';
        
        starsContainer.appendChild(star);
    }

    // 3. Glowing Fireflies (Particles)
    // Add dynamic keyframes for fireflies
    const dynamicStyle = document.createElement('style');
    dynamicStyle.innerHTML = `
        @keyframes fireflyFloat {
            0% { transform: translate(0, 0) scale(1); opacity: 0; }
            20% { opacity: 0.7; }
            80% { opacity: 0.7; }
            100% { transform: translate(var(--dx), var(--dy)) scale(0.5); opacity: 0; }
        }
    `;
    document.head.appendChild(dynamicStyle);

    function createFirefly() {
        const firefly = document.createElement('div');
        firefly.style.position = 'absolute';
        firefly.style.left = Math.random() * 100 + 'vw';
        firefly.style.bottom = (Math.random() * 40 + 10) + 'vh'; // Mostly near horizon/ground
        
        const size = Math.random() * 3 + 2;
        firefly.style.width = size + 'px';
        firefly.style.height = size + 'px';
        firefly.style.backgroundColor = '#ffca28';
        firefly.style.borderRadius = '50%';
        firefly.style.boxShadow = `0 0 ${size * 3}px #ffca28`;
        firefly.style.opacity = '0';
        
        // Random drift targets
        const dx = (Math.random() - 0.5) * 80; // -40px to +40px horizontal
        const dy = - (Math.random() * 100 + 40); // 40px to 140px upward
        
        firefly.style.setProperty('--dx', `${dx}px`);
        firefly.style.setProperty('--dy', `${dy}px`);
        
        const duration = Math.random() * 5 + 4; // 4s to 9s
        firefly.style.animation = `fireflyFloat ${duration}s ease-in-out forwards`;
        
        particlesContainer.appendChild(firefly);
        
        // Cleanup
        setTimeout(() => {
            if (particlesContainer.contains(firefly)) {
                firefly.remove();
            }
        }, duration * 1000);
    }

    // --- Initialization ---

    // Generate initial static stars
    for (let i = 0; i < 40; i++) {
        createStar();
    }

    // Start intervals for floating elements
    setInterval(createHeart, 2500); // A heart every 2.5 seconds
    setInterval(createFirefly, 1000); // A firefly every 1 second

    // --- Download feature ---
    const pixelHeart = document.querySelector('.pixel-heart');
    if (pixelHeart) {
        pixelHeart.title = "Click to save the letter!";
        pixelHeart.addEventListener('click', () => {
            const card = document.querySelector('.glass-card');
            
            // html2canvas struggles with backdrop-filter glassmorphism. 
            // We temporarily give it a solid dark purple background for a clean screenshot.
            const originalBackground = card.style.background;
            const originalBackdrop = card.style.backdropFilter;
            
            card.style.background = '#2b1055';
            card.style.backdropFilter = 'none';
            card.style.webkitBackdropFilter = 'none';
            
            html2canvas(card, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#2b1055' // solid background to avoid ugly transparent artifacts
            }).then(canvas => {
                const link = document.createElement('a');
                link.download = 'Letter_For_Baby_Jing.png';
                link.href = canvas.toDataURL('image/png');
                link.click();
                
                // Restore original styles
                card.style.background = originalBackground;
                card.style.backdropFilter = originalBackdrop;
                card.style.webkitBackdropFilter = originalBackdrop;
            });
        });
    }
});
