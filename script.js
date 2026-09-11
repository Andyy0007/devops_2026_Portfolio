const hamburger=document.querySelector('.hamburger');
const navMenu=document.querySelector('.nav-menu');
const navLinks=document.querySelectorAll('.nav-link');
function closeMenu(){navMenu?.classList.remove('open');hamburger?.setAttribute('aria-expanded','false')}
hamburger?.setAttribute('aria-expanded','false');
hamburger?.addEventListener('click',()=>{const open=navMenu?.classList.toggle('open');hamburger?.setAttribute('aria-expanded',String(!!open))});
navLinks.forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const id=a.getAttribute('href');if(!id||id==='#')return;const target=document.querySelector(id);if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth',block:'start'});closeMenu()}}));
const reveal=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('animate-in');reveal.unobserve(entry.target)}}),{threshold:.1,rootMargin:'0px 0px -45px'});
document.querySelectorAll('.stack-card,.project-card,.project-feature,.timeline-item,.credential-grid>div').forEach(el=>reveal.observe(el));
const sections=[...document.querySelectorAll('section[id]')];
const sectionObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){navLinks.forEach(link=>link.classList.toggle('active',link.getAttribute('href')===`#${entry.target.id}`))}}),{rootMargin:'-35% 0px -55%'});
sections.forEach(section=>sectionObserver.observe(section));
const form=document.getElementById('contactForm');
if(form){form.action='https://formsubmit.co/anadimishra208@gmail.com';form.method='POST';form.addEventListener('submit',()=>{const button=form.querySelector('button[type="submit"]');const status=document.getElementById('formStatus');if(button){button.disabled=true;button.innerHTML='Sending…'}if(status)status.textContent='Sending your message…'})}
const top=document.createElement('button');top.type='button';top.className='back-to-top';top.setAttribute('aria-label','Back to top');top.textContent='↑';document.body.appendChild(top);
window.addEventListener('scroll',()=>top.classList.toggle('show',scrollY>550),{passive:true});top.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));
const extra=document.createElement('style');extra.textContent='.animate-in{animation:reveal .65s ease-out both}@keyframes reveal{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}.back-to-top{position:fixed;right:24px;bottom:24px;width:42px;height:42px;border:1px solid rgba(94,234,212,.25);border-radius:10px;background:rgba(9,16,29,.85);backdrop-filter:blur(12px);color:#5eead4;font-size:18px;display:grid;place-items:center;opacity:0;pointer-events:none;transform:translateY(8px);transition:.25s;z-index:999}.back-to-top.show{opacity:1;pointer-events:auto;transform:none}.back-to-top:hover{background:rgba(94,234,212,.08)}@media(prefers-reduced-motion:reduce){.animate-in{animation:none!important;opacity:1!important}}';document.head.appendChild(extra);
console.log('%cAnadi Mishra | DevOps & Observability Engineer','font-weight:700;font-size:16px');
