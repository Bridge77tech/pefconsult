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

/** Course types share one page design; each type has its own colour theme. */
export type CourseType =
  | 'enterprise-operational-risk'
  | 'corporate-governance'
  | 'strategy-performance'
  | 'it-governance-audit';

/** Colours that change per course type (from the Figma course frames). */
export interface CourseTheme {
  bannerBg: string;
  pillBg: string;
  pillText: string;
  circleLight: string;
  circleDark: string;
  cardBg: string;
}

export const COURSE_THEMES: Record<CourseType, CourseTheme> = {
  'enterprise-operational-risk': {
    bannerBg: '#955D09',
    pillBg: '#F0EADA',
    pillText: '#955D09',
    circleLight: '#E5BDAB',
    circleDark: '#6D3700',
    cardBg: 'rgba(245, 245, 225, 0.45)',
  },
  'corporate-governance': {
    bannerBg: '#95095F',
    pillBg: '#F0DADA',
    pillText: '#95097B',
    circleLight: '#E5ABC7',
    circleDark: '#6D0049',
    cardBg: 'rgba(241, 225, 245, 0.45)',
  },
  // No Figma course frames yet for these two: banner is the programme's Services colour and
  // the other tones are the risk palette hue-rotated onto it (same lightness and saturation).
  'strategy-performance': {
    bannerBg: '#099533',
    pillBg: '#DAF0E3',
    pillText: '#099533',
    circleLight: '#ABE5AC',
    circleDark: '#006D16',
    cardBg: 'rgba(225, 245, 239, 0.45)',
  },
  'it-governance-audit': {
    bannerBg: '#749509',
    pillBg: '#E8F0DA',
    pillText: '#749509',
    circleLight: '#E5E2AB',
    circleDark: '#5E6D00',
    cardBg: 'rgba(232, 245, 225, 0.45)',
  },
};

export interface CourseData {
  id: string;
  title: string;
  route: string;
  category: string;
  type: CourseType;
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
  active?: boolean;
}

@Injectable({ providedIn: 'root' })
export class CourseDataService {
  private readonly courses = coursesData.courses as CourseData[];

  getCourseById(id: string): CourseData | null {
    return this.courses.find(c => c.id === id) ?? null;
  }

  getTheme(course: CourseData): CourseTheme {
    return COURSE_THEMES[course.type] ?? COURSE_THEMES['enterprise-operational-risk'];
  }

  /** Courses in the same programme as the current one, which is flagged (Figma highlights it). */
  getBrowseList(currentId: string): CourseBrowseItem[] {
    const current = this.getCourseById(currentId);
    return this.courses
      .filter(c => c.type === current?.type)
      .map(c => ({
        category: c.category,
        label: c.title,
        path: c.route,
        active: c.id === currentId,
      }));
  }

}
