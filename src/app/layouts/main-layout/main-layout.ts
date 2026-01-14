import { Component, inject } from '@angular/core';
import { Menu } from "../../components/menu/menu";
import { RouterOutlet } from "@angular/router";
import { Footer } from "../../components/footer/footer";
import { ImageService } from '../../services/general/image-service';

@Component({
  selector: 'app-main-layout',
  imports: [
    Menu, 
    RouterOutlet, 
    Footer,
  ],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {
  _images = inject(ImageService);
  isHomeRoute: boolean = false;

  checks() {
    // check if the route is /home 
    // if so then show isHomeRoute as true
    const currentRoute = window.location.pathname;
    this.isHomeRoute = currentRoute === '/home';
  }

}
