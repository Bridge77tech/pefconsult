import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { ImageService } from '../../services/general/image-service';
import { TextContent } from '../../components/about/text-content/text-content';
import { ReachOutCard } from '../../components/reach-out-card/reach-out-card';
import { RevealDirective } from '../../shared/reveal/reveal.directive';

@Component({
  selector: 'app-about',
  imports: [TextContent, ReachOutCard, RevealDirective],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  _images = inject(ImageService);
  platformId = inject(PLATFORM_ID);

  scrollToFooter() {
    if (!isPlatformBrowser(this.platformId)) return;
    document.querySelector('app-footer')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
