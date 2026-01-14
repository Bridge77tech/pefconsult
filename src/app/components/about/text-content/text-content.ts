import { Component, input } from '@angular/core';

@Component({
  selector: 'app-text-content',
  imports: [],
  templateUrl: './text-content.html',
  styleUrl: './text-content.scss',
})
export class TextContent {

  icon = input<string>();
  titleText = input<string>();
  contentText = input<string>();
}
