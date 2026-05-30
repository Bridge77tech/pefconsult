import type { RiskManagementContent } from './risk-management-content.interface';

const RISK_CAROUSEL_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1576085898323-218337e3e43c?w=500&auto=format&fit=crop&q=60',
    alt: 'Risk Management Training Session 1',
  },
  {
    src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=500&auto=format&fit=crop&q=60',
    alt: 'Risk Management Training Session 2',
  },
  {
    src: 'https://images.pexels.com/photos/1709003/pexels-photo-1709003.jpeg',
    alt: 'Risk Management Workshop',
  },
  {
    src: 'https://images.pexels.com/photos/8761560/pexels-photo-8761560.jpeg',
    alt: 'Risk Management Seminar',
  },
];

const RISK_MANAGEMENT_PROGRAMS = [
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
  {
    title: 'Enterprise & Operational Risk Management',
    description: 'Business Continuity Management',
    path: '/business-continuity-management',
  },
];

export const RISK_MANAGEMENT_CONTENT: Record<string, RiskManagementContent> = {
  'enterprise-risk-management': {
    pageTitle: 'Enterprise Risk Management',
    pageSubtitle:
      'Our Enterprise Risk Management consultancy course helps businesses identify, assess and manage risks so they bring your teams and company forward, profitably.',
    overviewTitle: 'ENTERPRISE RISK MANAGEMENT',
    overviewBody:
      'Enterprise Risk Management (ERM) is a holistic approach that organizations use to identify, assess, prioritize, and manage risks across the entire enterprise. ERM involves a coordinated effort to understand and manage risks in a way that aligns with the organization\'s strategic objectives and enhances its ability to achieve sustainable success.',
    overviewDuration: '3 days',
    overviewLevel: 'Executive, Senior and Middle Level Management',
    outcomesIntro:
      'By the end of this course, participants will have the knowledge and practical skills needed to understand, implement and utilize a robust Enterprise Risk Management (ERM) framework within their organizations. The attendees will have developed the following competencies:',
    attendeesIntro:
      'By the end of this course, participants will gain the knowledge and practical insights needed to understand, implement, and sustain a robust Enterprise Risk Management (ERM) framework within their organizations. The attendees will have developed the following competencies:',
    transformHeading: 'Ready to Transform?',
    transformSubtext:
      'Bring your team in front of the Risk Management masters and equip them with top-class expertise',
    bookingEmail: 'info@pefconsult.com',
    courseManualName: 'Enterprise Risk Management',
    carouselImages: RISK_CAROUSEL_IMAGES,
    expectedOutcomes: [
      {
        icon: 'speaker',
        title: 'ERM Roles & Responsibility',
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
    ],
    whoShouldAttend: [
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
    ],
    testimonials: [
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
    ],
    otherPrograms: RISK_MANAGEMENT_PROGRAMS.filter(
      (p) => p.path !== '/enterprise-risk-management'
    ),
  },

  'operational-risk-management': {
    pageTitle: 'Operational Risk Management',
    pageSubtitle:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
    overviewTitle: 'OPERATIONAL RISK MANAGEMENT',
    overviewBody:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
    overviewDuration: '3 days',
    overviewLevel: 'Executive, Senior and Middle Level Management',
    outcomesIntro:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
    attendeesIntro:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
    transformHeading: 'Ready to Strengthen Operations?',
    transformSubtext:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
    bookingEmail: 'info@pefconsult.com',
    courseManualName: 'Operational Risk Management',
    carouselImages: RISK_CAROUSEL_IMAGES,
    expectedOutcomes: [
      {
        icon: 'speaker',
        title: 'Lorem ipsum',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
      },
      {
        icon: 'lock',
        title: 'Lorem ipsum',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
      },
      {
        icon: 'map',
        title: 'Lorem ipsum',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
      },
      {
        icon: 'key',
        title: 'Lorem ipsum',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
      },
    ],
    whoShouldAttend: [
      {
        role: 'Lorem ipsum ',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
      },
      {
        role: 'Lorem ipsum ',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
      },
      {
        role: 'Lorem ipsum ',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
      },
    ],
    testimonials: [
      {
        quote:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
        name: 'Kwame Asante',
        role: 'Head of Operations, Fidelity Bank',
        org: 'Accra, Ghana',
      },
      {
        quote:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
        name: 'Chinwe Okafor',
        role: 'Risk Manager, First Bank',
        org: 'Lagos, Nigeria',
      },
    ],
    otherPrograms: RISK_MANAGEMENT_PROGRAMS.filter(
      (p) => p.path !== '/operational-risk-management'
    ),
  },

  'credit-risk-management': {
    pageTitle: 'Credit Risk Management',
    pageSubtitle:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.ddd',
    overviewTitle: 'CREDIT RISK MANAGEMENT',
    overviewBody:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.ddd',
    overviewDuration: '3 days',
    overviewLevel: 'Credit Officers, Risk Managers, Senior Management',
    outcomesIntro:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.ddd',
    attendeesIntro:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.ddd',
    transformHeading: 'Ready to Manage Credit Risk?',
    transformSubtext:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.ddd',
    bookingEmail: 'info@pefconsult.com',
    courseManualName: 'Credit Risk Management',
    carouselImages: RISK_CAROUSEL_IMAGES,
    expectedOutcomes: [
      {
        icon: 'speaker',
        title: 'Lorem ipsum',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.ddd',
      },
      {
        icon: 'lock',
        title: 'Lorem ipsum',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.ddd',
      },
      {
        icon: 'map',
        title: 'Lorem ipsum',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.ddd',
      },
      {
        icon: 'key',
        title: 'Lorem ipsum',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.ddd',
      },
    ],
    whoShouldAttend: [
      {
        role: 'Lorem ipsum',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.ddd',
      },
      {
        role: 'Lorem ipsum',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.ddd',
      },
      {
        role: 'Lorem ipsum',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.ddd',
      },
    ],
    testimonials: [
      {
        quote:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.ddd',
        name: 'Ama Boateng',
        role: 'Chief Credit Officer, Consolidated Bank',
        org: 'Accra, Ghana',
      },
      {
        quote:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.ddd',
        name: 'Emeka Nwosu',
        role: 'Risk Director, UBA',
        org: 'Abuja, Nigeria',
      },
    ],
    otherPrograms: RISK_MANAGEMENT_PROGRAMS.filter(
      (p) => p.path !== '/credit-risk-management'
    ),
  },

  'fraud-risk-management': {
    pageTitle: 'Fraud Risk Management',
    pageSubtitle:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.ddd',
    overviewTitle: 'FRAUD RISK MANAGEMENT',
    overviewBody:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.ddd',
    overviewDuration: '3 days',
    overviewLevel: 'Compliance, Audit, Risk and Senior Management',
    outcomesIntro:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.ddd',
    attendeesIntro:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.ddd',
    transformHeading: 'Ready to Tackle Fraud?',
    transformSubtext:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.ddd',
    bookingEmail: 'info@pefconsult.com',
    courseManualName: 'Fraud Risk Management',
    carouselImages: RISK_CAROUSEL_IMAGES,
    expectedOutcomes: [
      {
        icon: 'speaker',
        title: 'Lorem ipsum',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.ddd',
      },
      {
        icon: 'lock',
        title: 'Lorem ipsum',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.ddd',
      },
      {
        icon: 'map',
        title: 'Lorem ipsum',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.ddd',
      },
      {
        icon: 'key',
        title: 'Lorem ipsum',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.ddd',
      },
    ],
    whoShouldAttend: [
      {
        role: 'Lorem ipsum',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.ddd',
      },
      {
        role: 'Lorem ipsum',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.ddd',
      },
      {
        role: 'Lorem ipsum',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.ddd',
      },
    ],
    testimonials: [
      {
        quote:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.ddd',
        name: 'Abena Mensah',
        role: 'Chief Compliance Officer, Stanbic Bank',
        org: 'Accra, Ghana',
      },
      {
        quote:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.ddd',
        name: 'Oluwaseun Adeyemi',
        role: 'Head of Internal Audit, Zenith Bank',
        org: 'Lagos, Nigeria',
      },
    ],
    otherPrograms: RISK_MANAGEMENT_PROGRAMS.filter(
      (p) => p.path !== '/fraud-risk-management'
    ),
  },

  'business-continuity-management': {
    pageTitle: 'Business Continuity Management',
    pageSubtitle:
      'LoremIpsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.ddd',
    overviewTitle: 'BUSINESS CONTINUITY MANAGEMENT',
    overviewBody:
      'LoremIpsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.ddd',
    overviewDuration: '3 days',
    overviewLevel: 'Executive, Senior Management and Business Continuity Practitioners',
    outcomesIntro:
      'LoremIpsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.ddd',
    attendeesIntro:
      'LoremIpsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.ddd',
    transformHeading: 'Ready to Build Resilience?',
    transformSubtext:
      'LoremIpsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.ddd',
    bookingEmail: 'info@pefconsult.com',
    courseManualName: 'Business Continuity Management',
    carouselImages: RISK_CAROUSEL_IMAGES,
    expectedOutcomes: [
      {
        icon: 'speaker',
        title: 'LoremIpsum',
        description:
          'LoremIpsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.ddd',
      },
      {
        icon: 'lock',
        title: 'LoremIpsum',
        description:
          'LoremIpsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.ddd',
      },
      {
        icon: 'map',
        title: 'LoremIpsum',
        description:
          'LoremIpsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.ddd',
      },
      {
        icon: 'key',
        title: 'LoremIpsum',
        description:
          'LoremIpsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.ddd',
      },
    ],
    whoShouldAttend: [
      {
        role: 'LoremIpsum',
        description: 'LoremIpsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.ddd',
      },
      {
        role: 'LoremIpsum',
        description: 'LoremIpsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.ddd',
      },
      {
        role: 'LoremIpsum',
        description: 'LoremIpsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.ddd',
      },
    ],
    testimonials: [
      {
        quote:
          'LoremIpsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.ddd',
        name: 'Kofi Darko',
        role: 'Head of Risk, GCB Bank',
        org: 'Accra, Ghana',
      },
      {
        quote:
          'LoremIpsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.ddd',
        name: 'Ngozi Eze',
        role: 'Director, Business Continuity, MTN Nigeria',
        org: 'Lagos, Nigeria',
      },
    ],
    otherPrograms: RISK_MANAGEMENT_PROGRAMS.filter(
      (p) => p.path !== '/business-continuity-management'
    ),
  },
};
