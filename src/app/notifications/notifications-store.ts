import { Injectable, effect, signal } from '@angular/core';
import { POSTS, Post } from './notifications-data';

function clone(list: Post[]): Post[] {
  return list.map((p) => ({
    ...p,
    member: { ...p.member },
    comments: p.comments.map((c) => ({ ...c, member: { ...c.member } })),
  }));
}

/** Notifications feed state: newest-first sort and per-post comments. */
@Injectable({ providedIn: 'root' })
export class NotificationsStore {
  private static readonly STORAGE_KEY = 'crm-dashboard-notifications-v1';

  private readonly _posts = signal<Post[]>(NotificationsStore.load());
  readonly posts = this._posts.asReadonly();

  private readonly _newestFirst = signal(true);
  readonly newestFirst = this._newestFirst.asReadonly();

  constructor() {
    effect(() => {
      try {
        localStorage.setItem(NotificationsStore.STORAGE_KEY, JSON.stringify(this._posts()));
      } catch {
        // Storage unavailable (private mode) — keep in-memory state.
      }
    });
  }

  private static load(): Post[] {
    try {
      const raw = localStorage.getItem(NotificationsStore.STORAGE_KEY);
      if (!raw) return clone(POSTS);
      const parsed = JSON.parse(raw) as Post[];
      return Array.isArray(parsed) && parsed.length ? parsed : clone(POSTS);
    } catch {
      return clone(POSTS);
    }
  }

  visible(): Post[] {
    const newest = this._newestFirst();
    return [...this._posts()].sort((a, b) =>
      newest ? b.stamp.localeCompare(a.stamp) : a.stamp.localeCompare(b.stamp),
    );
  }

  toggleSort(): void {
    this._newestFirst.update((v) => !v);
  }

  removePost(id: string): void {
    this._posts.update((list) => list.filter((p) => p.id !== id));
  }

  addComment(postId: string, text: string): void {
    const clean = text.trim();
    if (!clean) return;
    this._posts.update((list) =>
      list.map((p) =>
        p.id === postId
          ? {
              ...p,
              comments: [
                ...p.comments,
                {
                  author: 'You',
                  text: clean,
                  date: 'Just now',
                  member: { initials: 'YO', color: 'linear-gradient(135deg,#5e81f4,#9698d6)' },
                },
              ],
            }
          : p,
      ),
    );
  }
}
