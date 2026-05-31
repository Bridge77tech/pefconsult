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

  private checkRoute(path?: string) {
  const currentRoute = path ?? this.router.url;

  // Handle /home, /home?, /home#, etc.
  this.isHomeRoute =
    currentRoute === '/home' || currentRoute.startsWith('/home') || currentRoute === '/';
}

ngOnInit() {
  // Initial check
  this.checkRoute();

  // Update on navigation
  this.routerSub = this.router.events
    .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
    .subscribe(event => {
      this.checkRoute(event.urlAfterRedirects);
      if (typeof window !== 'undefined') {
        setTimeout(() => {
          window.scrollTo(0, 0);
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
          if (document.scrollingElement) {
            (document.scrollingElement as HTMLElement).scrollTop = 0;
          }
        }, 0);
      }
    });
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
