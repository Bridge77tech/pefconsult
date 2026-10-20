import { afterNextRender, Directive, ElementRef, inject, input, OnDestroy } from '@angular/core';

/**
 * Adds the `revealed` class to its host so CSS can play a Figma reveal transition.
 * - `view` (default): once the host scrolls into view (Figma's "mouse enter" section reveals).
 * - `load`: right after first render (Figma's "after delay" hero entrances; the delay lives in CSS).
 * Visitors who prefer reduced motion get the end state immediately.
 */
@Directive({
  selector: '[appReveal]',
})
export class RevealDirective implements OnDestroy {
  appReveal = input<'view' | 'load' | ''>('view');
  /** Portion of the host that must be visible before it reveals. */
  revealThreshold = input(0.15);

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private observer?: IntersectionObserver;

  constructor() {
    // runs in the browser only, so SSR output keeps the start state until hydration
    afterNextRender(() => {
      const el = this.host.nativeElement;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (this.appReveal() === 'load' || reduced) {
        requestAnimationFrame(() => el.classList.add('revealed'));
        return;
      }
      this.observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            el.classList.add('revealed');
            this.observer?.disconnect();
          }
        },
        { threshold: this.revealThreshold() },
      );
      this.observer.observe(el);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
