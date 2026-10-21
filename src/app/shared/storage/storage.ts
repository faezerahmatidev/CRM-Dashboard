/** Shared localStorage persistence for the signal stores.
 *
 * Every feature store used to duplicate the same try/catch load + save block
 * with an unchecked `JSON.parse(raw) as T[]` cast, so a single corrupted
 * entry could crash a view. These helpers centralize that logic and validate
 * the stored shape before trusting it.
 */

/** True when the stored value is an object with a string field `key`. */
export function hasStringKey(key: string): (value: unknown) => boolean {
  return (value: unknown): boolean =>
    typeof value === 'object' && value !== null && typeof (value as Record<string, unknown>)[key] === 'string';
}

/** Load a list from storage, falling back to `seed()` on any problem. */
export function loadList<T>(storageKey: string, seed: () => T[], isItem: (value: unknown) => boolean): T[] {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return seed();
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0 || !parsed.every(isItem)) return seed();
    // Guarded by `every(isItem)` above; the single centralized cast.
    return parsed as T[];
  } catch {
    return seed();
  }
}

/** Persist a list; silently keeps in-memory state when storage is unavailable. */
export function saveList(storageKey: string, value: unknown): void {
  try {
    localStorage.setItem(storageKey, JSON.stringify(value));
  } catch {
    // Storage unavailable (private mode) — keep in-memory state.
  }
}
