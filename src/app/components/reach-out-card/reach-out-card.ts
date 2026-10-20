import { Component, output } from '@angular/core';
import { CustomButton } from '../buttons/custom-button/custom-button';

@Component({
  selector: 'app-reach-out-card',
  imports: [CustomButton],
  templateUrl: './reach-out-card.html',
  styleUrl: './reach-out-card.scss',
})
export class ReachOutCard {
  callClick = output<void>();
}
