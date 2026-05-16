const navbar = document.querySelector(".navbar");
const homeSection = document.querySelector("#HOME");
const navLinks = document.querySelectorAll(".navbar .nav-link");
const sections = [...document.querySelectorAll("header[id], section[id], div[id='ABOUT']")];

function updateNavbar() {
    if (!navbar || !homeSection) return;

    const homeSectionHeight = homeSection.offsetHeight;
    navbar.classList.toggle("navbar-scrolled", window.scrollY > homeSectionHeight - 100);
}

function updateActiveLink() {
    const currentSection = sections
        .filter(section => window.scrollY >= section.offsetTop - 120)
        .at(-1);

    if (!currentSection) return;

    navLinks.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${currentSection.id}`);
    });
}

window.addEventListener("scroll", () => {
    updateNavbar();
    updateActiveLink();
});

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        const menu = document.querySelector(".navbar-collapse.show");

        if (menu && window.bootstrap) {
            bootstrap.Collapse.getOrCreateInstance(menu).hide();
        }
    });
});

updateNavbar();
updateActiveLink();

function animateCounters() {
    const counters = document.querySelectorAll(".counter");
    const speed = 180;

    counters.forEach(counter => {
        const target = Number(counter.getAttribute("data-target"));
        const increment = Math.max(1, Math.ceil(target / speed));

        counter.innerText = "0";

        const updateCount = () => {
            const count = Number(counter.innerText);
            const nextValue = Math.min(target, count + increment);

            counter.innerText = nextValue;

            if (nextValue < target) {
                requestAnimationFrame(updateCount);
            }
        };

        updateCount();
    });
}

const counterSection = document.querySelector(".divi");

if (counterSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.45 });

    observer.observe(counterSection);
}
