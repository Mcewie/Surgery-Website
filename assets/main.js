// Shared site chrome: injects the top navigation and footer into every
// page that contains <div data-include="nav"></div> and
// <div data-include="footer"></div>.

(function () {
  const navHTML = `
    <header class="site-nav">
      <div class="nav-inner container">
        <a class="nav-brand" href="index.html">
          <span class="brand-mark small">RS</span>
          <span>Riverbank Surgery</span>
        </a>
        <nav>
          <a href="index.html" data-nav="index">Home</a>
          <a href="overview.html" data-nav="overview">Overview</a>
          <a href="timeline.html" data-nav="timeline">Timeline</a>
          <a href="documents.html" data-nav="documents">Documents</a>
          <a href="information.html" data-nav="information">Information</a>
          <a href="updates.html" data-nav="updates">Updates</a>
          <a href="contact.html" data-nav="contact">Contact</a>
        </nav>
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

  // Highlight the current nav item.
  const path = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
  const activeLink = document.querySelector(`[data-nav="${path}"]`);
  if (activeLink) activeLink.classList.add('active');
})();
