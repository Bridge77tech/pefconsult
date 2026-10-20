import { Component, computed, inject, input, output } from '@angular/core';
import { ImageService } from '../../../services/general/image-service';

/** Illustration box in card coordinates (Figma px); the card clips anything past its edges. */
export interface ServiceCardImageBox {
  left: number;
  top: number;
  width: number;
  height: number;
}

@Component({
  selector: 'app-service-card',
  imports: [],
  templateUrl: './service-card.html',
  styleUrl: './service-card.scss',
})
export class ServiceCard {
  _images = inject(ImageService);
  backgroundColor = input<string>('');
  /** Words wrapped in *asterisks* render in the muted title colour, e.g. 'Board *Evaluation*'. */
  label = input<string>('');
  /** Figma wraps each title at its own text-box width. */
  titleWidth = input<number>(238);
  /** Mobile text-box width; defaults to ~92.5% of the desktop one. */
  mobileTitleWidth = input<number>();
  iconUrl = input<string>('');
  imageBox = input<ServiceCardImageBox>();
  /** Illustration box on the 358x155 mobile card (Figma mobile frame). */
  mobileImageBox = input<ServiceCardImageBox>();
  learnButtonColor = input<string>('');

  titleParts = computed(() =>
    this.label()
      .split('*')
      .map((text, i) => ({ text, muted: i % 2 === 1 }))
      .filter((part) => part.text),
  );
  plainLabel = computed(() => this.label().replaceAll('*', ''));

  onButtonClickEvent = output<void>();
  onClick() {
    this.onButtonClickEvent.emit();
  }
}
