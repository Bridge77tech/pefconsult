import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CustomButton } from "../buttons/custom-button/custom-button";
import { ImageService } from '../../services/general/image-service';

@Component({
  selector: 'app-footer',
  imports: [CustomButton],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  private readonly router = inject(Router);
  _images = inject(ImageService);

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
