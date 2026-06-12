// Main JavaScript for Portfolio

document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // 2. Tab Navigation (Removed - converted to anchor links)

    // 3. Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Project Modal Logic
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('project-modal');
    const closeBtn = document.querySelector('.close-btn');
    const modalTitle = document.getElementById('modal-title');
    const modalSubtitle = document.getElementById('modal-subtitle');
    const modalDesc = document.getElementById('modal-desc');

    if (modal && closeBtn) {
        // Open modal
        projectCards.forEach(card => {
            card.addEventListener('click', () => {
                const title = card.getAttribute('data-title');
                const subtitle = card.getAttribute('data-subtitle');
                const desc = card.getAttribute('data-desc');
                
                const imgEl = card.querySelector('.project-image img');
                const imgSrc = imgEl ? imgEl.getAttribute('src') : null;
                const imgAlt = imgEl ? imgEl.getAttribute('alt') : '';

                if (title && desc) {
                    modalTitle.textContent = title;
                    modalSubtitle.textContent = subtitle || '';
                    
                    let finalHTML = '';
                    if (imgSrc) {
                        finalHTML += `<div class="modal-image-container" style="margin-bottom: 1.5rem; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08);">
                            <img src="${imgSrc}" alt="${imgAlt}" style="width: 100%; height: auto; max-height: 320px; object-fit: cover; display: block;">
                        </div>`;
                    }
                    finalHTML += desc;
                    modalDesc.innerHTML = finalHTML;
                    
                    modal.classList.add('show');
                    document.body.style.overflow = 'hidden'; // Prevent background scrolling
                }
            });
        });

        // Close modal (X button)
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        });

        // Close modal (Click outside)
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
    }
});