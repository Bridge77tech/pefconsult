import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseBrowseItem, CourseData, CourseDataService, CourseTheme } from '../../services/course/course-data.service';

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
  theme: CourseTheme | null = null;
  otherPrograms: CourseBrowseItem[] = [];
  showDownloadModal = false;

  private isDragging = false;
  private dragStartX = 0;
  private scrollStartLeft = 0;

  readonly outcomeIcons: Partial<Record<string, string>> = {
    speaker: 'assets/course/speaker.svg',
    lock: 'assets/course/lock.svg',
    map: 'assets/course/map.svg',
    key: 'assets/course/key.svg',
    person: 'assets/course/person.png',
  };

  // Figma course hero photo strip (order as in the design)
  readonly carouselImages = [1, 2, 3, 4, 5, 6].map((n) => ({
    src: `images/course/course-photo-${n}.jpg`,
    alt: `PEF Consult training session ${n}`,
  }));

  ngOnInit(): void {
    const courseId = this.route.snapshot.data['courseId'] as string;
    this.course = this.courseDataService.getCourseById(courseId);
    if (!this.course) {
      this.router.navigate(['/services']);
      return;
    }
    this.theme = this.courseDataService.getTheme(this.course);
    this.otherPrograms = this.courseDataService.getBrowseList(courseId);
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
