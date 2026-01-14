import { Component, inject, input, output } from '@angular/core';
import { ImageService } from '../../../services/general/image-service';

@Component({
  selector: 'app-service-card',
  imports: [],
  templateUrl: './service-card.html',
  styleUrl: './service-card.scss',
})
export class ServiceCard {
  _images = inject(ImageService);
  backgroundColor = input<string>('');
  label = input<string>('');
  iconUrl = input<string>('');
  learnButtonColor = input<string>('');


  onButtonClickEvent = output<void>();
  onClick() {
    this.onButtonClickEvent.emit();
  }
}
