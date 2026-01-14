import { Component, inject } from '@angular/core';
import { ImageService } from '../../services/general/image-service';
import { TextContent } from "../../components/about/text-content/text-content";

@Component({
  selector: 'app-about',
  imports: [TextContent],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  _images = inject(ImageService);
}
