import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import type { RiskManagementContent } from '../../../shared/risk-management/risk-management-content.interface';

@Component({
  selector: 'app-risk-management-page',
  standalone: true,
  imports: [],
  templateUrl: './risk-management-page.html',
  styleUrl: './risk-management-page.scss',
})
export class RiskManagementPage {
  @Input() content!: RiskManagementContent;

  @ViewChild('browseGrid') browseGridRef!: ElementRef<HTMLElement>;

  showDownloadModal = false;

  // drag-to-scroll state (browse grid)
  private isDragging = false;
  private dragStartX = 0;
  private scrollStartLeft = 0;

  constructor(private _router: Router) {}

  bookCourse(): void {
    window.location.href = `mailto:${this.content.bookingEmail}?subject=Inquiry: ${this.content.pageTitle} Course`;
  }

  downloadManual(): void {
    this.showDownloadModal = true;
  }

  closeModal(): void {
    this.showDownloadModal = false;
  }

  navigateTo(path: string): void {
    this._router.navigate([path]);
  }

  // ===== Drag-to-scroll =====
  onDragStart(event: MouseEvent): void {
    const el = this.browseGridRef.nativeElement;
    this.isDragging = true;
    this.dragStartX = event.pageX - el.offsetLeft;
    this.scrollStartLeft = el.scrollLeft;
    el.style.cursor = 'grabbing';
  }

  onDragMove(event: MouseEvent): void {
    if (!this.isDragging) return;
    event.preventDefault();
    const el = this.browseGridRef.nativeElement;
    const walk = (event.pageX - el.offsetLeft - this.dragStartX) * 1.5;
    el.scrollLeft = this.scrollStartLeft - walk;
  }

  onDragEnd(): void {
    this.isDragging = false;
    const el = this.browseGridRef?.nativeElement;
    if (el) el.style.cursor = 'grab';
  }
}
