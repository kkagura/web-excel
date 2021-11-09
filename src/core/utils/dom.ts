export function attr(el: HTMLElement, key: string): HTMLElement;

export function attr(el: HTMLElement, key: string, value: string): string;

export function attr(el: HTMLElement, key: string, value?: string) {
  if (value !== undefined) {
    el.setAttribute(key, value);
    return el;
  } else {
    return el.getAttribute(key);
  }
}
