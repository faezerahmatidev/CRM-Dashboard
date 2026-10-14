import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-social',
  standalone: true,
  template: `
    <div class="social">
      <p>Or sign in with</p>
      <div class="social-row">
        <button type="button" aria-label="Sign in with Twitter">
          <svg viewBox="0 0 24 24"><path d="M20.4 7.1a4.8 4.8 0 0 1-1.4.4 2.4 2.4 0 0 0 1.1-1.4 4.9 4.9 0 0 1-1.6.6 2.4 2.4 0 0 0-4.2 1.6c0 .2 0 .4.1.5A6.9 6.9 0 0 1 9.4 6.3a2.4 2.4 0 0 0 .7 3.2 2.4 2.4 0 0 1-1.1-.3v.1c0 1.2.8 2.1 2 2.4a2.5 2.5 0 0 1-1.1 0 2.4 2.4 0 0 0 2.3 1.7A4.9 4.9 0 0 1 7 14.4a7 7 0 0 0 3.7 1.1c4.4 0 6.9-3.7 6.9-6.9v-.3c.4-.4.8-.8 1.1-1.2Z"/></svg>
        </button>
        <button type="button" aria-label="Sign in with Google">
          <svg viewBox="0 0 24 24"><path d="M12.2 11v2.6h3.7c-.2 1-1.2 2.9-3.7 2.9a4.3 4.3 0 0 1 0-8.6c1.1 0 1.8.5 2.2.9l1.5-1.5C15 6.4 13.7 5.8 12.2 5.8a6.2 6.2 0 0 0 0 12.4c3.6 0 6-2.5 6-6.1 0-.2 0-.4 0-.6h-6Z"/></svg>
        </button>
        <button type="button" aria-label="Sign in with Facebook">
          <svg viewBox="0 0 24 24"><path d="M13.4 18.5v-6h2l.3-2.3h-2.3V8.7c0-.7.2-1.1 1.2-1.1h1.2V5.5c-.2 0-.9-.1-1.7-.1-1.7 0-2.9 1-2.9 3v1.8H9.2v2.3h2V18.5h2.2Z"/></svg>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .social { margin-top: 56px; text-align: center; }
    .social p { font-size: 11px; color: var(--primary-grey); margin: 0 0 14px; }
    .social-row { display: flex; gap: 10px; justify-content: center; }
    .social-row button {
      width: 38px; height: 38px;
      border: 1px solid var(--outline);
      border-radius: 7px;
      background: #fff;
      cursor: pointer;
      display: grid; place-items: center;
      transition: border-color .2s, transform .15s;
    }
    .social-row button:hover { border-color: var(--primary); transform: translateY(-1px); }
    .social-row svg { width: 15px; height: 15px; fill: var(--primary-grey); }
  `],
})
export class AuthSocial {}
