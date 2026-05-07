import { Injectable } from '@angular/core';

// ─── EmailJS credentials ────────────────────────────────────────────────────
// 1. Sign up free at https://www.emailjs.com
// 2. Add an Email Service (connect your Outlook / Gmail)
// 3. Create an Email Template with these variables:
//      {{from_email}}  {{topic}}  {{message}}
// 4. Paste your IDs below
const EMAILJS_SERVICE_ID = 'service_qz9c6te';
const EMAILJS_TEMPLATE_ID = 'template_4fhef5c';
const EMAILJS_PUBLIC_KEY = '3sNW6MS44WcDQMZ1h';
// ────────────────────────────────────────────────────────────────────────────

export interface ContactPayload {
  from_email: string;
  topic: string;
  message: string;
}

export interface CourseBookPayload {
  from_email: string;
}

@Injectable({ providedIn: 'root' })
export class EmailService {
  private send(templateParams: Record<string, string>): Promise<void> {
    return fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: EMAILJS_SERVICE_ID,
        template_id: EMAILJS_TEMPLATE_ID,
        user_id: EMAILJS_PUBLIC_KEY,
        template_params: templateParams,
      }),
    }).then((res) => {
      if (!res.ok) throw new Error(`EmailJS error: ${res.status}`);
    });
  }

  sendContactMessage(payload: ContactPayload): Promise<void> {
    return this.send({
      from_email: payload.from_email,
      topic: payload.topic,
      message: payload.message,
    });
  }

  sendCourseBookRequest(payload: CourseBookPayload): Promise<void> {
    return this.send({
      from_email: payload.from_email,
      topic: 'Course Book Request',
      message: `Please send me the course book. My email: ${payload.from_email}`,
    });
  }
}
