/**
 * Navigation (no animation)
 * - Indicator moves only on: load, click, resize (desktop)
 * - No hover handlers
 * - /viewmore* maps to /candidates
 */

document.addEventListener('DOMContentLoaded', initNav);

function initNav() {
  const links = Array.from(document.querySelectorAll('.nav-a'));
  const indicator = document.getElementById('nav-indicator');
  if (!links.length || !indicator) return;

  // Start with no transitions at all
  indicator.style.transition = 'none';

  const active = findLinkForPath(window.location.pathname, links) || links[0];
  setActiveLink(active, links);
  if (isDesktop()) moveIndicatorTo(active);

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#')) return;

      e.preventDefault();
      setActiveLink(link, links);

      // Keep it instant
      indicator.style.transition = 'none';
      if (isDesktop()) moveIndicatorTo(link);

      window.location.href = href;
    });
  });

  window.addEventListener('resize', () => {
    const current = document.querySelector('.nav-a.is-active');
    if (!current) return;
    indicator.style.transition = 'none';
    if (isDesktop()) moveIndicatorTo(current);
  });
}

function isDesktop(){ return window.innerWidth >= 768; }

function normalizePath(p){
  if (!p) return '/';
  p = p.split('#')[0].split('?')[0];
  if (p !== '/' && p.endsWith('/')) p = p.slice(0, -1);
  return p || '/';
}

// Treat detail pages as "Candidates"
function aliasPath(p){
  const n = normalizePath(p);
  if (n.startsWith('/viewmore')) return '/candidates';
  return n;
}

function findLinkForPath(pathname, links){
  const target = aliasPath(pathname);
  return links.find(a => normalizePath(new URL(a.getAttribute('href'), location.origin).pathname) === target);
}

function setActiveLink(activeLink, links){
  links.forEach(a => {
    a.classList.remove('is-active', 'text-black');
    a.classList.add('text-gray-700');
  });
  activeLink.classList.add('is-active', 'text-black');
  activeLink.classList.remove('text-gray-700');
}

function moveIndicatorTo(el){
  const indicator = document.getElementById('nav-indicator');
  const wrapper = el.closest('.relative');
  if (!indicator || !wrapper) return;

  const wr = wrapper.getBoundingClientRect();
  const r  = el.getBoundingClientRect();
  const padX = 12, padY = 4;

  // Snap immediately (no animation)
  indicator.style.width  = `${r.width + padX*2}px`;
  indicator.style.height = `${r.height + padY*2}px`;
  indicator.style.transform = `translate(${r.left - wr.left - padX}px, ${r.top - wr.top - padY}px)`;
  indicator.style.opacity = '1';
}
