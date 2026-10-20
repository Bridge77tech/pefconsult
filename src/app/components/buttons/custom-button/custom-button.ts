import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  imports: [],
  templateUrl: './custom-button.html',
  styleUrl: './custom-button.scss',
})
export class CustomButton {
  label = input<string>('Send');
  prefixIcon = input<string>();
  suffixIcon = input<string>();
  isButtonLoading = input<boolean>(false);
  labelFontSize = input<number>(16);
  fontWeight = input<number>(200);
  padding = input<string>();
  borderRadius = input<string>();
  lineHeight = input<string>();
  /** Figma hover fill; buttons without one keep their colour on hover. */
  hoverColor = input<string>();
  /** Figma hover transition length. */
  hoverDuration = input<string>('200ms');

  onClickEvent = output<void>()
  onClick() {
    this.onClickEvent.emit();
  }
}
