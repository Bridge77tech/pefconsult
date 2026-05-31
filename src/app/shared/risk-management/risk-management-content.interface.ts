export interface RiskManagementContent {
  pageTitle: string;
  pageSubtitle: string;
  carouselImages: { src: string; alt: string }[];
  bookingEmail: string;
  courseManualName: string;
  overviewTitle: string;
  overviewBody: string;
  overviewDuration: string;
  overviewLevel: string;
  outcomesIntro: string;
  expectedOutcomes: {
    icon: 'speaker' | 'lock' | 'map' | 'key' | 'eye' | 'users' | 'shield' | 'trending-up';
    title: string;
    description: string;
  }[];
  attendeesIntro: string;
  whoShouldAttend: {
    role: string;
    description: string;
  }[];
  testimonials: {
    quote: string;
    name: string;
    role: string;
    org: string;
  }[];
  transformHeading: string;
  transformSubtext: string;
  otherPrograms: {
    category: string;
    label: string;
    path: string;
  }[];
}
