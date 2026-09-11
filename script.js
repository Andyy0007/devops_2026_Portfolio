// ===================================
// Portfolio interactions
// ===================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

function closeMenu() {
    navMenu?.classList.remove('active');
    hamburger?.classList.remove('active');
}

hamburger?.addEventListener('click', () => {
    navMenu?.classList.toggle('active');
    hamburger.classList.toggle('active');
});

hamburger?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        hamburger.click();
    }
});

navLinks.forEach(link => link.addEventListener('click', closeMenu));

document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', event => {
        const selector = anchor.getAttribute('href');
        if (!selector || selector === '#') return;
        const target = document.querySelector(selector);
        if (target) {
            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Scroll reveal
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.skill-category, .project-card, .cert-card, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    revealObserver.observe(el);
});

// Active navigation link
const sections = [...document.querySelectorAll('section[id]')];
const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => link.classList.toggle(
                'active', link.getAttribute('href') === `#${entry.target.id}`
            ));
        }
    });
}, { rootMargin: '-25% 0px -65% 0px' });
sections.forEach(section => sectionObserver.observe(section));

// ===================================
// Make the portfolio content accurate
// ===================================
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) heroTitle.innerHTML = 'Hi, I\'m Anadi.<br><span class="highlight">DevOps & Observability Engineer</span>';

const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) heroSubtitle.textContent = 'I automate infrastructure, deployments and monitoring.';

const heroDescription = document.querySelector('.hero-description');
if (heroDescription) heroDescription.textContent = '3 years of hands-on experience across AppDynamics, Dynatrace, Linux and production monitoring — building deeper DevOps capabilities with AWS, Kubernetes, Terraform and CI/CD.';

// Replace placeholder project cards with real portfolio projects.
const projectCards = document.querySelectorAll('.project-card');
const projectData = [
    {
        title: 'AWS EKS DevOps Platform', badge: 'Featured',
        description: 'End-to-end DevOps platform covering Terraform infrastructure, Ansible configuration, Docker, Kubernetes, Helm, CI/CD and Prometheus/Grafana observability.',
        tech: ['AWS', 'EKS', 'Terraform', 'Ansible', 'Docker', 'Helm', 'GitHub Actions', 'Prometheus', 'Grafana'],
        link: 'https://github.com/Andyy0007/aws-eks-devops-platform', linkText: 'View on GitHub →'
    },
    {
        title: 'Docker Python Application', badge: 'Docker',
        description: 'Flask application containerized with Docker and paired with PostgreSQL and Kubernetes components for hands-on DevOps practice.',
        tech: ['Python', 'Flask', 'Docker', 'PostgreSQL', 'Kubernetes'],
        link: 'https://github.com/Andyy0007/docker-python-app', linkText: 'View on GitHub →'
    },
    {
        title: 'Enterprise APM & Observability', badge: 'Production',
        description: 'Enterprise monitoring and operations work across application, server, database, synthetic and infrastructure monitoring, alerting and RCA workflows.',
        tech: ['AppDynamics', 'Dynatrace', 'Moogsoft', 'Service Xchange', 'ServiceNow'],
        link: '#experience', linkText: 'See Experience →'
    }
];

projectCards.forEach((card, index) => {
    const data = projectData[index];
    if (!data) return;
    card.classList.toggle('featured', index === 0);
    const header = card.querySelector('.project-header');
    const title = card.querySelector('.project-header h3');
    const badge = card.querySelector('.project-badge');
    const description = card.querySelector('.project-description');
    const tech = card.querySelector('.project-tech');
    const link = card.querySelector('.project-link');
    if (title) title.textContent = data.title;
    if (badge) badge.textContent = data.badge;
    if (description) description.textContent = data.description;
    if (tech) tech.innerHTML = data.tech.map(item => `<span>${item}</span>`).join('');
    if (link) {
        link.href = data.link;
        link.textContent = data.linkText;
        if (!data.link.startsWith('#')) {
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
        }
    }
});

// ===================================
// Real contact form — static GitHub Pages compatible
// ===================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    // FormSubmit handles the server-side email delivery; no backend is needed on GitHub Pages.
    contactForm.action = 'https://formsubmit.co/anadimishra208@gmail.com';
    contactForm.method = 'POST';

    const addHidden = (name, value) => {
        if (!contactForm.querySelector(`input[name="${name}"]`)) {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = name;
            input.value = value;
            contactForm.prepend(input);
        }
    };

    addHidden('_subject', 'New Portfolio Contact — Anadi Mishra');
    addHidden('_template', 'table');
    addHidden('_captcha', 'true');
    addHidden('_next', `${window.location.origin}${window.location.pathname}#contact`);

    contactForm.addEventListener('submit', () => {
        const button = contactForm.querySelector('button[type="submit"]');
        const status = document.getElementById('formStatus');
        if (button) {
            button.disabled = true;
            button.textContent = 'Sending…';
        }
        if (status) status.textContent = 'Sending your message…';
    });
}

// Copy email on click (without breaking the mailto action)
const emailLink = document.querySelector('a[href^="mailto:"]');
emailLink?.addEventListener('contextmenu', event => {
    const email = emailLink.textContent.trim();
    navigator.clipboard?.writeText(email).catch(() => {});
});

// Back to top
const backToTop = document.createElement('button');
backToTop.type = 'button';
backToTop.className = 'back-to-top';
backToTop.setAttribute('aria-label', 'Back to top');
backToTop.textContent = '↑';
backToTop.style.cssText = 'position:fixed;bottom:28px;right:28px;width:46px;height:46px;border:0;border-radius:50%;background:linear-gradient(135deg,#FF6B6B,#FF5252);color:#fff;font-size:22px;cursor:pointer;display:none;z-index:999;box-shadow:0 8px 24px rgba(0,0,0,.25);';
document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
    backToTop.style.display = window.scrollY > 500 ? 'grid' : 'none';
});
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Small visual polish injected without requiring a framework.
const polish = document.createElement('style');
polish.textContent = `
    .hero-title .highlight { color: #FF6B6B; }
    .eyebrow { display:inline-block; padding:7px 12px; margin-bottom:16px; border:1px solid rgba(69,183,209,.4); border-radius:999px; color:#9fe8f4; background:rgba(69,183,209,.08); font-size:.85rem; font-weight:700; }
    .hero-links { display:flex; gap:18px; flex-wrap:wrap; margin-top:20px; }
    .hero-links a { color:var(--text-secondary); text-decoration:none; }
    .hero-links a:hover { color:var(--secondary-color); }
    .project-card.featured { border-color:rgba(69,183,209,.65); box-shadow:0 12px 40px rgba(69,183,209,.12); }
    .project-card .project-link { margin-top:auto; }
    .contact-form input,.contact-form textarea { width:100%; padding:14px 16px; margin-bottom:14px; border:1px solid var(--border-color); border-radius:8px; background:#202938; color:var(--text-primary); font:inherit; }
    .contact-form input:focus,.contact-form textarea:focus { outline:none; border-color:var(--accent-color); box-shadow:0 0 0 3px rgba(69,183,209,.12); }
    .form-status { min-height:24px; margin-top:10px; color:var(--secondary-color); font-size:.9rem; }
    .availability { margin-top:18px; color:#48BB78; font-size:.92rem; }
    .availability::before { content:'●'; margin-right:8px; }
    .animate-in { animation: portfolioReveal .6s ease-out forwards; }
    @keyframes portfolioReveal { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
    @media (prefers-reduced-motion:reduce) { .animate-in { animation:none; opacity:1 !important; } }
`;
document.head.appendChild(polish);

console.log('%c🚀 Anadi Mishra | DevOps & Observability Portfolio', 'font-size:18px;font-weight:700;');
console.log('%cAWS • Kubernetes • Docker • Terraform • CI/CD • AppDynamics • Dynatrace', 'font-size:12px;');
