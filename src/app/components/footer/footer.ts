import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ImageService } from '../../services/general/image-service';
import { CustomButton } from '../buttons/custom-button/custom-button';
import { EmailService } from '../../services/email/email.service';

@Component({
  selector: 'app-footer',
  imports: [CustomButton, FormsModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  private readonly router = inject(Router);
  private readonly emailService = inject(EmailService);
  private readonly cdr = inject(ChangeDetectorRef);
  _images = inject(ImageService);

  subscriptionEmail = '';
  subscriptionError = '';
  subscriptionSending = false;
  subscriptionSuccess = false;

  contactEmail = '';
  contactTopic = '';
  contactMessage = '';
  contactError = '';
  contactSending = false;
  contactSuccess = false;

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  requestCourseBook() {
    if (!this.subscriptionEmail.trim() || !this.isValidEmail(this.subscriptionEmail)) {
      this.subscriptionError = 'Please enter a valid email address.';
      return;
    }
    this.subscriptionError = '';
    this.subscriptionSending = true;
    this.subscriptionSuccess = false;

    this.emailService.sendCourseBookRequest({ from_email: this.subscriptionEmail })
      .then(() => {
        this.subscriptionSending = false;
        this.subscriptionSuccess = true;
        this.subscriptionEmail = '';
        this.cdr.detectChanges();
      })
      .catch(() => {
        this.subscriptionSending = false;
        this.subscriptionError = 'Failed to send. Please try again.';
        this.cdr.detectChanges();
      });
  }

  sendMessage() {
    if (!this.contactEmail.trim() || !this.isValidEmail(this.contactEmail)) {
      this.contactError = 'Please enter a valid email address.';
      return;
    }
    if (!this.contactMessage.trim()) {
      this.contactError = 'Please enter a message.';
      return;
    }
    this.contactError = '';
    this.contactSending = true;
    this.contactSuccess = false;

    this.emailService.sendContactMessage({
      from_email: this.contactEmail,
      topic: this.contactTopic,
      message: this.contactMessage,
    })
      .then(() => {
        this.contactSending = false;
        this.contactSuccess = true;
        this.contactEmail = '';
        this.contactTopic = '';
        this.contactMessage = '';
        this.cdr.detectChanges();
      })
      .catch(() => {
        this.contactSending = false;
        this.contactError = 'Failed to send. Please try again.';
        this.cdr.detectChanges();
      });
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}
