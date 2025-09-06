// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const homeSection = document.querySelector('#HOME');
    const homeSectionHeight = homeSection.offsetHeight;
    
    if (window.scrollY > homeSectionHeight - 100) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});

// Animated counters
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
}

// Intersection Observer for counters animation
const counterSection = document.querySelector('.divi');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (counterSection) {
    observer.observe(counterSection);
}
