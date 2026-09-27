// Riverbank, Westcott — site behaviour.
//
// The enquiry form has no server: submitting it opens a pre-filled email to
// the selling agent. Set AGENT_EMAIL once the agent is appointed.

const AGENT_EMAIL = 'agent@example.com'; // TO CONFIRM: selling agent's enquiry address

(function () {
  // ---------- Mobile navigation ----------
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('nav-links');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.addEventListener('click', e => {
      if (e.target.closest('a')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ---------- Highlight the section in view ----------
  const links = nav ? Array.from(nav.querySelectorAll('a[href^="#"]')) : [];
  if (links.length && 'IntersectionObserver' in window) {
    const byId = new Map(links.map(a => [a.getAttribute('href').slice(1), a]));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        links.forEach(a => { a.classList.remove('active'); a.removeAttribute('aria-current'); });
        const link = byId.get(entry.target.id);
        if (link) { link.classList.add('active'); link.setAttribute('aria-current', 'true'); }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    byId.forEach((_, id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
  }

  // ---------- Disabled "Register to bid" placeholder ----------
  document.querySelectorAll('a[aria-disabled="true"]').forEach(a => {
    a.addEventListener('click', e => e.preventDefault());
  });

  // ---------- Enquiry form -> pre-filled email ----------
  const form = document.getElementById('enquiry-form');
  if (!form) return;
  const errorBox = document.getElementById('form-error');

  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const value = name => String(data.get(name) || '').trim();

    const problems = [];
    const nameInput = form.elements.name;
    const emailInput = form.elements.email;
    nameInput.removeAttribute('aria-invalid');
    emailInput.removeAttribute('aria-invalid');

    if (!value('name')) { problems.push('your name'); nameInput.setAttribute('aria-invalid', 'true'); }
    if (!emailInput.checkValidity() || !value('email')) {
      problems.push('a valid email address');
      emailInput.setAttribute('aria-invalid', 'true');
    }
    if (problems.length) {
      errorBox.textContent = 'Please enter ' + problems.join(' and ') + '.';
      errorBox.hidden = false;
      form.querySelector('[aria-invalid="true"]').focus();
      return;
    }
    errorBox.hidden = true;

    const lines = [
      'Enquiry: Riverbank, Westcott',
      '',
      'Name: ' + value('name'),
      'Email: ' + value('email'),
      'Phone: ' + (value('phone') || '—'),
      'Company: ' + (value('company') || '—'),
      'Wider marketing: ' + (data.get('marketing') ? 'Yes, happy to hear about other properties' : 'No'),
      '',
      'Message:',
      value('message') || '—',
    ];
    const href = 'mailto:' + AGENT_EMAIL +
      '?subject=' + encodeURIComponent('Register interest — Riverbank, Westcott') +
      '&body=' + encodeURIComponent(lines.join('\n'));
    window.location.href = href;
  });
})();
