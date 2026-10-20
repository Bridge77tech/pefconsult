import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, inject, HostListener, ElementRef, PLATFORM_ID } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map, startWith } from 'rxjs/operators';
import { CustomButton } from "../buttons/custom-button/custom-button";
import { ImageService } from '../../services/general/image-service';

@Component({
  selector: 'app-menu',
  imports: [CustomButton, RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {

  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly cdr = inject(ChangeDetectorRef);
  isShowMenu: boolean = false;

  _images = inject(ImageService);
  private readonly host = inject(ElementRef);

  menuItems = [
    { label: 'Home',     path: '/home'     },
    { label: 'About',    path: '/about'    },
    { label: 'Services', path: '/services' },
  ];

  /** Nav item for the current page; course pages belong to Services. */
  protected readonly activePath = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map((e) => e.urlAfterRedirects),
      startWith(this.router.url),
      map((url) => this.sectionFor(url)),
    ),
    { initialValue: '/home' },
  );

  private sectionFor(url: string): string {
    const path = url.split(/[?#]/)[0];
    if (path === '/' || path.startsWith('/home')) return '/home';
    if (path.startsWith('/about')) return '/about';
    return '/services';
  }

  protected routeTo(path: string) {
    this.isShowMenu = false;
    this.cdr.detectChanges();
    this.router.navigate([path]);
  }

  protected onMenuClick() {
    this.isShowMenu = !this.isShowMenu;
    this.cdr.detectChanges();
  }

  scrollToFooter() {
    if (!isPlatformBrowser(this.platformId)) return;
    const footer = document.querySelector('app-footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as Node;
    if (!this.host.nativeElement.contains(target) && this.isShowMenu) {
      this.isShowMenu = false;
      this.cdr.detectChanges();
    }
  }
}
