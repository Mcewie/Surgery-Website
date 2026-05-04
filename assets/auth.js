// Client-side access gate for the Riverbank Surgery private site.
//
// IMPORTANT: This is a deterrent, not real security. The hash and the
// allowed-emails list are visible to anyone with the source. For genuine
// privacy, deploy behind a host that supports password protection
// (e.g. Netlify Site Protection, Cloudflare Access, an authenticated proxy).

const Auth = (() => {
  // SHA-256 hex of the password. Default password is: riverbank2026
  // To change, run in a browser console:
  //   crypto.subtle.digest('SHA-256', new TextEncoder().encode('newpass'))
  //     .then(b => console.log([...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')))
  const PASSWORD_HASH =
    '0c325bac04042545714175996bc9127585aa936f8549a9db7246661d2b3c17ed';

  // Whitelist of permitted emails. Lower-case. Empty array = any email accepted.
  const ALLOWED_EMAILS = [];

  // Session length in milliseconds (12 hours).
  const SESSION_MS = 12 * 60 * 60 * 1000;
  const SESSION_KEY = 'riverbank.session';

  async function sha256Hex(text) {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
  }

  async function signIn(email, password) {
    if (!email || !password) return false;
    if (ALLOWED_EMAILS.length && !ALLOWED_EMAILS.includes(email)) return false;
    const hash = await sha256Hex(password);
    if (hash !== PASSWORD_HASH) return false;
    const session = { email, expires: Date.now() + SESSION_MS };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return true;
  }

  function currentSession() {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (!raw) return null;
      const s = JSON.parse(raw);
      if (!s.expires || s.expires < Date.now()) {
        sessionStorage.removeItem(SESSION_KEY);
        return null;
      }
      return s;
    } catch {
      return null;
    }
  }

  function isSignedIn() {
    return currentSession() !== null;
  }

  function signOut() {
    sessionStorage.removeItem(SESSION_KEY);
  }

  function requireAuth() {
    if (!isSignedIn()) {
      window.location.replace('index.html');
    }
  }

  return { signIn, signOut, isSignedIn, currentSession, requireAuth };
})();
