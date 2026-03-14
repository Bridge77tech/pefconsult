import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ImageService } from '../../services/general/image-service';

@Component({
  selector: 'app-enterprise-risk-management',
  imports: [],
  templateUrl: './enterprise-risk-management.html',
  styleUrl: './enterprise-risk-management.scss',
})
export class EnterpriseRiskManagement {
  _images = inject(ImageService);
  _router = inject(Router);

  @ViewChild('browseGrid') browseGridRef!: ElementRef<HTMLElement>;

  // drag-to-scroll state (browse grid)
  private isDragging = false;
  private dragStartX = 0;
  private scrollStartLeft = 0;

  carouselImages = [
    {
      src: 'https://images.unsplash.com/photo-1576085898323-218337e3e43c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHByZXNlbnRhdGlvbnxlbnwwfHwwfHx8MA%3D%3D',
      alt: 'ERM Training Session 1',
    },
    {
      src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJlc2VudGF0aW9ufGVufDB8fDB8fHww',
      alt: 'ERM Training Session 2',
    },
    {
      src: 'https://images.pexels.com/photos/1709003/pexels-photo-1709003.jpeg',
      alt: 'ERM Workshop 3',
    },
    { src: 'https://images.pexels.com/photos/8761560/pexels-photo-8761560.jpeg',
      alt: 'ERM Seminar 4' },
  ];

  expectedOutcomes = [
    {
      icon: 'speaker',
      title: 'ERM Roles Responsibility ',
      description:
        'Comprehensive understanding of the roles and responsibilities of stakeholders involved in implementing and sustaining an ERM framework.',
    },
    {
      icon: 'lock',
      title: 'Risk Capacity, Appetite and Tolerance',
      description:
        'Wholesome clarity and deep understanding on risk capacity, risk appetite, and risk tolerance, and how they guide organizational decision-making.',
    },
    {
      icon: 'map',
      title: 'Roadmap For Implementation',
      description:
        'Acquire a practical roadmap for effective ERM implementation within the organization',
    },
    {
      icon: 'key',
      title: 'Appreciate The Risk Management Process',
      description:
        'Gain a comprehensive understanding of the enterprise risk management (ERM) process and its key components.',
    },
  ];

  whoShouldAttend = [
    {
      role: 'Senior & Middle Level Management',
      description: 'Leaders responsible for overall risk strategy.',
    },

    {
      role: 'Internal Control, Internal Audit',
      description: 'Internal teams managing day to day activities',
    },

    {
      role: 'Senior Management',
      description: 'Executives needing to integrate risk into operations',
    },
  ];

  testimonials = [
    {
      quote:
        'The Enterprise Risk Management was a game-changer for my department. The course materials were practical and immediately applicable',
      name: 'Mark Oteng Anjo',
      role: 'CIO, 1st financial solutions',
      org: 'Accra, Ghana',
    },
    {
      quote:
        'We have thoroughly benefitted from the training PEF consult provided. We have developed robust systems and are pleased with the outcome',
      name: 'Angela Ubanu',
      role: 'Finance director, 1st financial solutions',
      org: 'Kampala, Uganda',
    },
  ];

  otherPrograms = [
    {
      title: 'Enterprise & Operational Risk Management',
      description: 'Enterprise Risk Management',
      path: '/enterprise-risk-management',
    },

    {
      title: 'Enterprise & Operational Risk Management',
      description: 'Operational Risk Management',
      path: '/operational-risk-management',
    },

    {
      title: 'Enterprise & Operational Risk Management',
      description: 'Credit Risk Management',
      path: '/credit-risk-management',
    },

    {
      title: 'Enterprise & Operational Risk Management',
      description: 'Fraud Risk Management',
      path: '/fraud-risk-management',
    },
  ];

  bookCourse() {
    document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' });
  }

  downloadManual() {
    alert('Course manual download coming soon!');
  }

  navigateTo(path: string) {
    this._router.navigate([path]);
  }

  // ===== Drag-to-scroll =====
  onDragStart(event: MouseEvent) {
    const el = this.browseGridRef.nativeElement;
    this.isDragging = true;
    this.dragStartX = event.pageX - el.offsetLeft;
    this.scrollStartLeft = el.scrollLeft;
    el.style.cursor = 'grabbing';
  }

  onDragMove(event: MouseEvent) {
    if (!this.isDragging) return;
    event.preventDefault();
    const el = this.browseGridRef.nativeElement;
    const walk = (event.pageX - el.offsetLeft - this.dragStartX) * 1.5;
    el.scrollLeft = this.scrollStartLeft - walk;
  }

  onDragEnd() {
    this.isDragging = false;
    const el = this.browseGridRef?.nativeElement;
    if (el) el.style.cursor = 'grab';
  }
}
