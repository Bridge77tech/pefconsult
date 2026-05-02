import { Injectable } from '@angular/core';
import coursesData from '../../../data/courses.json';

export interface CourseButton {
  label: string;
  icon: string;
  action: string;
  type?: string;
}

export interface CourseOutcomeItem {
  icon: string;
  title: string;
  description: string;
}

export interface CourseAttendeeItem {
  role: string;
  description: string;
}

export interface CourseTestimonialItem {
  quote: string;
  name: string;
  role: string;
  location: string;
}

export interface CourseOtherProgram {
  category: string;
  label: string;
  path: string;
}

export interface CourseData {
  id: string;
  title: string;
  route: string;
  category: string;
  hero: {
    pageTitle: string;
    subtitle: string;
    buttons: CourseButton[];
  };
  overview: {
    badge: string;
    heading: string;
    description: string;
    duration: string;
    level: string;
  };
  expectedOutcomes: {
    sectionLabel: string;
    description: string;
    items: CourseOutcomeItem[];
  };
  whoShouldAttend: {
    sectionLabel: string;
    description: string;
    items: CourseAttendeeItem[];
  };
  testimonials: {
    sectionLabel: string;
    description: string;
    items: CourseTestimonialItem[];
  };
  readyToTransform: {
    heading: string;
    description: string;
    buttons: CourseButton[];
  };
  downloadModal: {
    heading: string;
    body: string;
    secondaryText: string;
    ctaLabel: string;
  };
  otherPrograms: CourseOtherProgram[];
}

export interface CourseBrowseItem {
  category: string;
  label: string;
  path: string;
}

@Injectable({ providedIn: 'root' })
export class CourseDataService {
  private readonly courses = coursesData.courses as CourseData[];

  getCourseById(id: string): CourseData | null {
    return this.courses.find(c => c.id === id) ?? null;
  }

  getBrowseListExcluding(currentId: string): CourseBrowseItem[] {
    return this.courses
      .filter(c => c.id !== currentId)
      .map(c => ({ category: c.category, label: c.title, path: c.route }));
  }
}
