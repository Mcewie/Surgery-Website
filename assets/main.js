// Shared chrome (nav + footer) and auth guard for protected pages.

(function () {
  // Auth guard — must run before rendering anything sensitive.
  if (typeof Auth !== 'undefined') {
    Auth.requireAuth();
  }

  const navHTML = `
    <header class="site-nav">
      <div class="nav-inner container">
        <a class="nav-brand" href="home.html">
          <span class="brand-mark small">RS</span>
          <span>Riverbank Surgery</span>
        </a>
        <nav>
          <a href="home.html" data-nav="home">Home</a>
          <a href="overview.html" data-nav="overview">Overview</a>
          <a href="timeline.html" data-nav="timeline">Timeline</a>
          <a href="documents.html" data-nav="documents">Documents</a>
          <a href="information.html" data-nav="information">Information</a>
          <a href="updates.html" data-nav="updates">Updates</a>
          <a href="contact.html" data-nav="contact">Contact</a>
        </nav>
        <button id="signout-btn" class="ghost" type="button">Sign out</button>
      </div>
    </header>
  `;

  const footerHTML = `
    <footer class="site-foot">
      <div class="container">
        <p>&copy; ${new Date().getFullYear()} Riverbank Surgery — private project workspace.</p>
        <p class="muted small">Confidential. Do not share access without authorisation.</p>
      </div>
    </footer>
  `;

  document.querySelectorAll('[data-include="nav"]').forEach(el => { el.outerHTML = navHTML; });
  document.querySelectorAll('[data-include="footer"]').forEach(el => { el.outerHTML = footerHTML; });

  // Highlight current nav item.
  const path = window.location.pathname.split('/').pop().replace('.html', '') || 'home';
  const activeLink = document.querySelector(`[data-nav="${path}"]`);
  if (activeLink) activeLink.classList.add('active');

  // Sign-out wiring.
  const signOutBtn = document.getElementById('signout-btn');
  if (signOutBtn) {
    signOutBtn.addEventListener('click', () => {
      if (typeof Auth !== 'undefined') Auth.signOut();
      window.location.href = 'index.html';
    });
  }
})();
