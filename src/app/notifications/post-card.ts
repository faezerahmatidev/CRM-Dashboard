import { Component, Input, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContactAvatar } from '../shared/contact-avatar/contact-avatar';
import { DotsMenu } from '../shared/dots-menu/dots-menu';
import { thumbPalette } from '../shared/catalog-thumb/thumb-palette';
import { Post } from './notifications-data';
import { NotificationsStore } from './notifications-store';

/** Single feed post: author, photos, comments and a working composer. */
@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [FormsModule, ContactAvatar, DotsMenu],
  template: `
    <article class="post">
      <div class="post-head">
        <app-contact-avatar [initials]="post.member.initials" [color]="post.member.color" [size]="40" [radius]="12" />
        <span class="post-titles">
          <b>{{ post.author }}</b>
          <span>{{ post.date }}</span>
        </span>
        <span class="post-menu">
          <app-dots-menu (remove)="remove()" />
        </span>
      </div>

      @if (post.photos.length) {
        <div class="photos" [class]="post.photos.length > 1 ? 'multi' : 'single'">
          @for (seed of post.photos; track $index) {
            <span class="photo" [style.background]="palette(seed)" role="img" [attr.aria-label]="post.author + ' photo ' + ($index + 1)"></span>
          }
        </div>
      }

      <p class="post-text">{{ post.text }}</p>

      @if (post.comments.length) {
        <h4>Comments</h4>
        <ul class="comments">
          @for (c of post.comments; track $index) {
            <li>
              <app-contact-avatar [initials]="c.member.initials" [color]="c.member.color" [size]="28" [radius]="8" />
              <span class="comment-body">
                <span class="bubble">{{ c.text }}</span>
                <span class="cdate">{{ c.date }}</span>
              </span>
            </li>
          }
        </ul>
      }

      <div class="composer">
        <input [(ngModel)]="draft" (keyup.enter)="send()" placeholder="Add your comment" [attr.aria-label]="'Comment on ' + post.author + ' post'" />
        <button class="icon" type="button" aria-label="Attach">
          <svg viewBox="0 0 24 24"><path d="M21 11.5l-8.5 8.5a5.5 5.5 0 0 1-7.8-7.8L13 4a3.7 3.7 0 0 1 5.2 5.2l-8.2 8.2a1.85 1.85 0 0 1-2.6-2.6L15 7.5" /></svg>
        </button>
        <button class="icon" type="button" aria-label="Emoji">
          <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M9 9.5h.01M15 9.5h.01M8.5 14.5c1 1.2 2.2 1.8 3.5 1.8s2.5-.6 3.5-1.8" /></svg>
        </button>
        <button class="send" type="button" (click)="send()">Send</button>
      </div>
    </article>
  `,
  styles: [`
    .post {
      border: 1px solid var(--outline);
      border-radius: 12px;
      background: #fff;
      padding: 18px 20px;
      min-width: 0;
    }
    .post-head { display: flex; align-items: center; gap: 12px; }
    .post-titles { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
    .post-titles b { font-size: 12.5px; }
    .post-titles span { font-size: 10px; color: var(--primary-grey); }
    .photos { display: grid; gap: 10px; margin: 14px 0 4px; }
    .photos.multi { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    .photo { border-radius: 10px; aspect-ratio: 4 / 3; min-height: 90px; }
    .photos.single .photo { aspect-ratio: 16 / 8; }
    .post-text { font-size: 11.5px; line-height: 1.75; margin: 12px 0 0; }
    .post h4 { font-size: 12px; font-weight: 900; margin: 16px 0 10px; }
    .comments { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }
    .comments li { display: flex; align-items: flex-start; gap: 10px; }
    .comment-body { display: flex; flex-direction: column; gap: 3px; min-width: 0; }
    .bubble { font-size: 11px; background: var(--bg-light); border-radius: 12px; padding: 10px 14px; line-height: 1.6; }
    .cdate { font-size: 9.5px; color: var(--primary-grey); }
    .composer {
      display: flex; align-items: center; gap: 8px;
      background: var(--bg-light); border-radius: 10px;
      padding: 7px 7px 7px 14px; margin-top: 14px;
    }
    .composer input {
      flex: 1; border: 0; outline: none; background: transparent;
      font-size: 12px; font-family: inherit; min-width: 0;
    }
    .composer .icon {
      border: 0; background: transparent; cursor: pointer;
      color: var(--primary-grey); display: grid; place-items: center; padding: 4px;
    }
    .composer .icon svg {
      width: 15px; height: 15px; stroke: currentColor; fill: none;
      stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round;
    }
    .send {
      border: 0; border-radius: 8px; background: var(--primary); color: #fff;
      font-size: 11px; font-weight: 900; padding: 9px 22px; cursor: pointer; font-family: inherit;
    }
  `],
})
export class PostCard {
  private store = inject(NotificationsStore);

  @Input() post!: Post;

  draft = '';
  palette = thumbPalette;

  send(): void {
    if (!this.draft.trim()) return;
    this.store.addComment(this.post.id, this.draft);
    this.draft = '';
  }

  remove(): void {
    this.store.removePost(this.post.id);
  }
}
