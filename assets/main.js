// Riverbank, Westcott — site behaviour.
//
// The site has no server. Forms marked data-mailto build a pre-filled email
// to the agent; the agent verifies applicants and approves data-room access.
// Set AGENT_EMAIL once the agent is appointed.

const AGENT_EMAIL = 'agent@example.com'; // TO CONFIRM: appointed agent's registrations address

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

  // ---------- Print buttons (bid form) ----------
  document.querySelectorAll('[data-print]').forEach(btn => {
    btn.addEventListener('click', () => window.print());
  });

  // ---------- Forms -> pre-filled email ----------
  document.querySelectorAll('form[data-mailto]').forEach(form => {
    const errorBox = form.querySelector('.form-error');

    const labelFor = el => {
      const label = form.querySelector(`label[for="${el.id}"]`);
      return (el.dataset.label || (label ? label.textContent : el.name))
        .replace(/\*|\(optional\)/g, '').replace(/\s+/g, ' ').trim();
    };

    form.addEventListener('submit', e => {
      e.preventDefault();
      const fields = Array.from(form.elements).filter(el => el.name && el.type !== 'submit');
      fields.forEach(el => el.removeAttribute('aria-invalid'));

      const invalid = fields.filter(el => {
        if (!el.required) return false;
        if (el.type === 'checkbox') return !el.checked;
        if (el.type === 'radio') return !form.querySelector(`input[name="${el.name}"]:checked`);
        return !String(el.value).trim() || !el.checkValidity();
      });

      if (invalid.length) {
        const seen = new Set();
        const names = invalid.filter(el => !seen.has(el.name) && seen.add(el.name)).map(labelFor);
        invalid.forEach(el => el.setAttribute('aria-invalid', 'true'));
        errorBox.textContent = 'Please complete: ' + names.join('; ') + '.';
        errorBox.hidden = false;
        invalid[0].focus();
        return;
      }
      errorBox.hidden = true;

      const lines = [form.dataset.mailtoIntro || 'Riverbank, Westcott', ''];
      const done = new Set();
      fields.forEach(el => {
        if (done.has(el.name)) return;
        done.add(el.name);
        let value;
        if (el.type === 'checkbox') value = el.checked ? 'Yes' : 'No';
        else if (el.type === 'radio') {
          const checked = form.querySelector(`input[name="${el.name}"]:checked`);
          value = checked ? checked.value : '—';
        } else value = String(el.value).trim() || '—';
        lines.push(`${labelFor(el)}: ${value}`);
      });

      window.location.href = 'mailto:' + AGENT_EMAIL +
        '?subject=' + encodeURIComponent(form.dataset.mailto) +
        '&body=' + encodeURIComponent(lines.join('\n'));
    });
  });
})();
