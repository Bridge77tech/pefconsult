import { Component, inject, HostListener, ElementRef } from '@angular/core';
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

  private readonly router = inject(Router)
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

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as Node;
    if (!this.host.nativeElement.contains(target) && this.isShowMenu) {
      this.isShowMenu = false;
    }
  }
}
