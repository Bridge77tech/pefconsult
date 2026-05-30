import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-page',
  imports: [],
  templateUrl: './error-page.html',
  styleUrl: './error-page.scss',
})
export class ErrorPage {
  private router = inject(Router);

  goHome() {
    this.router.navigate(['/home']);
  }

  goServices() {
    this.router.navigate(['/services']);
  }

  goAbout() {
    this.router.navigate(['/about']);
  }

  goERM() {
    this.router.navigate(['/enterprise-risk-management']);
  }
}
