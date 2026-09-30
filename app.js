const menuButton = document.querySelector('.menu-button');
const globalNav = document.querySelector('.global-nav');

if (menuButton && globalNav) {
  const closeMenu = () => {
    menuButton.setAttribute('aria-expanded', 'false');
    globalNav.classList.remove('open');
    document.body.classList.remove('menu-open');
  };

  menuButton.addEventListener('click', () => {
    const next = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(next));
    globalNav.classList.toggle('open', next);
    document.body.classList.toggle('menu-open', next);
  });

  globalNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => {
    if (window.innerWidth > 960) closeMenu();
  });
}

document.querySelectorAll('.faq-question').forEach((button) => {
  const answer = document.getElementById(button.getAttribute('aria-controls'));
  if (!answer) return;
  answer.hidden = button.getAttribute('aria-expanded') !== 'true';

  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));
    answer.hidden = expanded;
  });
});

const basePath = document.querySelector('meta[name="site-base-path"]')?.content.replace(/\/$/, '') || '';
const locationPath = window.location.pathname.replace(/index\.html$/, '').replace(/\/$/, '') || '/';
const currentPath = basePath && (locationPath === basePath || locationPath.startsWith(`${basePath}/`))
  ? locationPath.slice(basePath.length) || '/'
  : locationPath;
document.querySelectorAll('[data-nav-path]').forEach((link) => {
  const target = (link.getAttribute('data-nav-path') || '').replace(/\/$/, '') || '/';
  if (target === currentPath) link.setAttribute('aria-current', 'page');
});
