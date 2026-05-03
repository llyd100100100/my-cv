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

    // 4. Career Duration Calculation (Boryung + STGen)
    const calculateExperience = () => {
        // Boryung: 2020.10.01 ~ 2022.05.31
        const boryungStart = new Date('2020-10-01');
        const boryungEnd = new Date('2022-05-31');
        const boryungDuration = boryungEnd - boryungStart;

        // STGen: 2023.01.01 ~ Present
        const stgenStart = new Date('2023-01-01');
        const stgenEnd = new Date(); // Present
        const stgenDuration = stgenEnd - stgenStart;

        // Total Duration
        const totalDuration = boryungDuration + stgenDuration;
        const totalYears = totalDuration / (1000 * 60 * 60 * 24 * 365.25);

        const years = Math.floor(totalYears);
        const months = Math.round((totalYears - years) * 12);

        // Update Hero Text
        const expKo = document.getElementById('experience-ko');
        const expEn = document.getElementById('experience-en');

        if (expKo) expKo.textContent = `${years}년 ${months}개월`;
        if (expEn) expEn.textContent = `${years} years ${months} months`;

        // Update About Stats (Total Years)
        const totalExpStat = document.getElementById('total-experience');
        if (totalExpStat) {
            totalExpStat.textContent = `${years}+`;
        }
    };

    calculateExperience();
});