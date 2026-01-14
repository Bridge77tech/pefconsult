import { Component, input } from '@angular/core';

@Component({
  selector: 'app-service-container',
  imports: [],
  templateUrl: './service-container.html',
  styleUrl: './service-container.scss',
})
export class ServiceContainer {
  label = input<string>();
  description = input<string>();
  backgroundColor = input<string>();
}
