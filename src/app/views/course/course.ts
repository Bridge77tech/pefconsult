import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseBrowseItem, CourseData, CourseDataService } from '../../services/course/course-data.service';

@Component({
  selector: 'app-course',
  imports: [],
  templateUrl: './course.html',
  styleUrl: './course.scss',
})
export class Course implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private courseDataService = inject(CourseDataService);

  @ViewChild('browseGrid') browseGridRef!: ElementRef<HTMLElement>;

  course: CourseData | null = null;
  otherPrograms: CourseBrowseItem[] = [];
  showDownloadModal = false;

  private isDragging = false;
  private dragStartX = 0;
  private scrollStartLeft = 0;

  readonly carouselImages = [
    {
      src: 'https://images.unsplash.com/photo-1576085898323-218337e3e43c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHByZXNlbnRhdGlvbnxlbnwwfHwwfHx8MA%3D%3D',
      alt: 'Training Session 1',
    },
    {
      src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJlc2VudGF0aW9ufGVufDB8fDB8fHww',
      alt: 'Training Session 2',
    },
    {
      src: 'https://images.pexels.com/photos/1709003/pexels-photo-1709003.jpeg',
      alt: 'Workshop 3',
    },
    {
      src: 'https://images.pexels.com/photos/8761560/pexels-photo-8761560.jpeg',
      alt: 'Seminar 4',
    },
  ];

  ngOnInit(): void {
    const courseId = this.route.snapshot.data['courseId'] as string;
    this.course = this.courseDataService.getCourseById(courseId);
    if (!this.course) {
      this.router.navigate(['/services']);
      return;
    }
    this.otherPrograms = this.courseDataService.getBrowseListExcluding(courseId);
  }

  bookCourse(): void {
    window.location.href = `mailto:info@pefconsult.com?subject=Inquiry: ${this.course?.title} Course`;
  }

  downloadManual(): void {
    this.showDownloadModal = true;
  }

  closeModal(): void {
    this.showDownloadModal = false;
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

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
