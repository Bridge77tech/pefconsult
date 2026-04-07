import { isPlatformBrowser } from '@angular/common';
import { Component, inject, HostListener, ElementRef, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { CustomButton } from "../buttons/custom-button/custom-button";
import { ImageService } from '../../services/general/image-service';

@Component({
  selector: 'app-menu',
  imports: [CustomButton],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {

  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);
  isShowMenu: boolean = false;

  _images = inject(ImageService);
  private readonly host = inject(ElementRef);

  menuItems = [
    {
      label: 'Home',
      path: '/home'
    },
    {
      label: 'Services',
      path: '/services'
    },
    {
      label: 'About',
      path: '/about'
    }
  ]

  protected routeTo(path: string) {
    this.isShowMenu = false;
    this.router.navigate([path]);
  }

  protected onMenuClick() {
    this.isShowMenu = !this.isShowMenu;
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
    }
  }
}
