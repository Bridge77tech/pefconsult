import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Footer } from "../../components/footer/footer";
import { Menu } from "../../components/menu/menu";
import { ImageService } from '../../services/general/image-service';

@Component({
  selector: 'app-main-layout',
  imports: [
    Menu, 
    RouterOutlet, 
    Footer,
    CommonModule,
  ],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {
  _images = inject(ImageService);
  isHomeRoute: boolean = false;
  isMobileMenuHidden: boolean = false;
  private lastScroll = 0;
  private router = inject(Router);
  private routerSub: Subscription | null = null;

  private checks(path?: string) {
    // prefer an explicit path when provided, otherwise use the router URL
    // avoid using `window` directly so this runs under SSR
    const currentRoute = path ?? (this.router?.url ?? '/');
    this.isHomeRoute = currentRoute === '/home';
  }

  ngOnInit() {
    // initial check
    this.checks();

    // Listen to router navigation end events to update `isHomeRoute` on client-side route changes
    this.routerSub = this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((ev: NavigationEnd) => this.checks(ev.urlAfterRedirects || ev.url));
  }

  ngOnDestroy() {
    this.routerSub?.unsubscribe();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // guard for SSR: do nothing if `window` is not available
    if (typeof window === 'undefined') return;

    // only apply this behavior on narrow screens (mobile)
    if (window.innerWidth > 768) return;

    const current = window.scrollY ?? window.pageYOffset ?? 0;

    // if user scrolls down and is past a small threshold, hide the menu
    if (current > this.lastScroll && current > 50) {
      this.isMobileMenuHidden = true;
    }

    // show only when scrolled to (or very near) the top
    if (current <= 10) {
      this.isMobileMenuHidden = false;
    }

    this.lastScroll = current;
  }


}
