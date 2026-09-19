import {
  UserProfile,
  JobOpportunity,
  ReportItem,
  WalletDocument,
  SmartReminder,
  OfferItem,
  SeasonalCampaign
} from '../types';

export const initialUserProfileEn: UserProfile = {
  id: 'usr-1',
  name: 'Ahmed',
  nationalId: '1190000000',
  role: 'Beneficiary (Mobility Disability)',
  birthDate: '1990/05/12',
  disabilityType: 'Mobility Disability (Severe)',
  bloodType: 'O+',
  phone: '+966 50 123 4567',
  email: 'ahmad.demo@example.com',
  guardianName: 'Maryam (Companion)',
  emergencyPhone: '050 111 2222',
  emergencyContact: {
    name: 'Maryam',
    phone: '050 111 2222',
    relation: 'Companion',
  },
  city: 'Riyadh',
  avatarUrl:
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
  assistiveDevices: ['Electric Wheelchair'],
  mobilityNeeds: [
    'Accessible ramps and wide elevators',
    'Nearby designated parking spaces',
    'Accessible travel seating with extra legroom',
    'Wheelchair assistance at airports and train stations'
  ],
  approvedAccommodations: [
    'Traffic Facilitation Card',
    '50% Transportation Fare Discount (Beneficiary + Companion)',
    
  ],
  aiPersonalization: {
    enabled: true,
    shareDisabilityType: true,
    shareAssistiveDevices: true,
    shareCityLocation: true,
    useUploadedDocs: true,
  },
};

export const initialOpportunitiesEn: JobOpportunity[] = [
  {
    id: 'job-1',
    title: 'Technical Support & Systems Specialist',
    company: 'Saudi Telecom Company (STC)',
    companyLogo: 'stc',
    location: 'Riyadh (Accessible Workplace)',
    type: 'Full Time',
    category: 'jobs',
    postedAt: '2 hours ago',
    salary: '10,500 - 13,000 SAR',
    description:
      'Provide technical support for digital systems in an accessible workplace with appropriate support for employees with mobility disabilities.',
    skills: [
      'Technical Support & Networking',
      'Windows Server',
      'Troubleshooting & Customer Care'
    ],
    deadline: 'September 25, 2026',
    requirements: [
      'Diploma or Bachelor degree in Information Technology or related field',
      'Knowledge of technical support and troubleshooting',
      'Good communication skills'
    ],
    accessibilityMatrix: {
      assistiveTech: true,
      lighting: true,
      visualPaths: true,
      reservedParking: true,
      ramps: true,
      elevators: true,
      restrooms: true
    }
  },
  {
    id: 'job-2',
    title: 'Data Analyst & Digital Solutions',
    company: 'Elm Information Security (Elm)',
    companyLogo: 'elm',
    location: 'Riyadh (Hybrid)',
    type: 'Full Time',
    category: 'jobs',
    postedAt: '5 hours ago',
    salary: '12,000 - 15,500 SAR',
    description:
      'Analyze data and build digital dashboards in an accessible work environment.',
    skills: [
      'Data Analytics & SQL',
      'Power BI Dashboards',
      'Python Programming',
      'Analytical Thinking'
    ],
    deadline: 'September 30, 2026',
    requirements: [
      'Bachelor degree in Computer Science, Data Science, or Statistics',
      'Knowledge of Power BI, SQL, and Python',
      'Good teamwork skills'
    ],
    accessibilityMatrix: {
      assistiveTech: true,
      lighting: true,
      visualPaths: true,
      reservedParking: true,
      ramps: true,
      elevators: true,
      restrooms: true
    }
  },
  {
    id: 'job-3',
    title: 'Accessible UI / UX & Web Development Program',
    company: 'Al Rajhi Bank',
    companyLogo: 'alrajhi',
    location: 'Riyadh (Accessible On-site & Hybrid)',
    type: 'Cooperative Training',
    category: 'training',
    postedAt: '1 day ago',
    salary: '4,000 SAR / Month Stipend',
    trainingProvider: 'Technology Training Academy',
    trainingDate: 'October 1, 2026 - December 31, 2026',
    trainingType: 'Co-op Training & Career Development',
    skills: [
      'UI/UX Product Design',
      'Digital Accessibility (WCAG)',
      'React & Tailwind CSS'
    ],
    deadline: 'September 20, 2026',
    description:
      'A training program focused on developing accessible digital interfaces for people with disabilities.',
    requirements: [
      'Student or recent graduate in Software Engineering or Design',
      'Basic knowledge of React, CSS, and WCAG guidelines'
    ],
    accessibilityMatrix: {
      assistiveTech: true,
      lighting: true,
      visualPaths: true,
      reservedParking: true,
      ramps: true,
      elevators: true,
      restrooms: true
    }
  },
  {
    id: 'job-4',
    title: 'Customer Experience Specialist',
    company: 'Digital Services Company',
    companyLogo: 'aramco',
    location: 'Remote',
    type: 'Full Time',
    category: 'jobs',
    postedAt: '2 days ago',
    salary: '8,500 - 11,000 SAR',
    description:
      'Handle customer inquiries and digital support tickets remotely in a flexible work environment.',
    skills: [
      'Digital Customer Service',
      'Helpdesk Ticket Resolution',
      'Effective Communication'
    ],
    deadline: 'September 28, 2026',
    requirements: [
      'High school diploma or Associate degree minimum',
      'Good communication skills'
    ],
    accessibilityMatrix: {
      assistiveTech: true,
      lighting: true,
      visualPaths: true,
      reservedParking: true,
      ramps: true,
      elevators: true,
      restrooms: true
    }
  }
];

export const initialJobsEn = initialOpportunitiesEn;

export const initialReportsEn: ReportItem[] = [
  {
    id: 'rep-1',
    referenceNumber: '#2026-1287',
    title: 'Unauthorized Parking in Accessible Space',
    category: 'parking',
    categoryLabel: 'Accessible Parking Reports',
    description:
      'A vehicle is parked in a designated accessible parking space without a clear permit.',
    location: 'Riyadh - Public Area',
    coordinates: 'Demo Location',
    imageUrl:
      'https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=500&auto=format&fit=crop&q=80',
    status: 'Under Review',
    createdAt: '3 hours ago',
    timeline: [
      {
        title: 'Report Received',
        date: '2026/09/19 - 10:15 AM',
        description:
          'The report was registered and a reference number was generated.',
        completed: true
      },
      {
        title: 'Under Review',
        date: '2026/09/19 - 10:45 AM',
        description:
          'The report and attached information are being reviewed.',
        completed: true
      },
      {
        title: 'Referred to the Relevant Authority',
        date: 'Pending',
        description:
          'The report will be directed to the relevant authority based on the location and issue type.',
        completed: false
      },
      {
        title: 'Report Closed',
        date: 'Expected',
        description:
          'The report status will be updated after the issue is addressed.',
        completed: false
      }
    ]
  },
  {
    id: 'rep-2',
    referenceNumber: '#2026-0982',
    title: 'Sidewalk Ramp Not Accessible for Wheelchairs',
    category: 'urban_roads',
    categoryLabel: 'Roads & Urban Accessibility',
    description:
      'A sudden height difference at the end of a sidewalk ramp makes wheelchair access difficult.',
    location: 'Riyadh - Public Area',
    coordinates: 'Demo Location',
    imageUrl:
      'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=500&auto=format&fit=crop&q=80',
    status: 'Referred',
    createdAt: '2 days ago',
    timeline: [
      {
        title: 'Report Received',
        date: '2026/09/17 - 02:00 PM',
        description:
          'The accessibility issue and report location were recorded.',
        completed: true
      },
      {
        title: 'Report Referred',
        date: '2026/09/18 - 09:00 AM',
        description:
          'The report was referred to the relevant authority for review.',
        completed: true
      },
      {
        title: 'Issue Resolution',
        date: 'Expected',
        description:
          'The status will be updated after the issue is addressed.',
        completed: false
      }
    ]
  }
];

export const initialWalletDocumentsEn: WalletDocument[] = [
  {
    id: 'doc-1',
    title: 'Traffic Facilitation Card',
    category: 'verified',
    type: 'card',
    issuer: 'Relevant Accessibility Authority',
    code: 'TSH-DEMO-99281',
    issueDate: '2026/01/01',
    expiryDate: '2027/01/01',
    iconName: 'Car',
    colorScheme: 'green',
    isVerified: true,
    allowAI: true,
    qrData: 'MUEENI-DEMO-TSH-AHMED',
    details: {
      'Beneficiary ID': 'DEMO-M-88390',
      'Card Type': 'Accessible Parking and Transportation Facilitation',
      'Verification Status': 'Demo data for presentation'
    }
  },
  {
    id: 'doc-2',
    title: 'Transportation Fare Discount Card',
    category: 'verified',
    type: 'card',
    issuer: 'Relevant Transportation Authority',
    code: 'TRN-DEMO-55420',
    issueDate: '2026/01/10',
    expiryDate: '2027/01/10',
    iconName: 'Bus',
    colorScheme: 'blue',
    isVerified: true,
    allowAI: true,
    qrData: 'MUEENI-DEMO-TRANSPORT-AHMED',
    details: {
      'Discount Rate': '50%',
      'Companion Discount': 'Available based on eligibility',
      'Verification Status': 'Demo data for presentation'
    }
  },
  {
    id: 'doc-3',
    title: 'Travel Assistance Document',
    category: 'verified',
    type: 'ticket',
    issuer: 'Travel Service',
    code: 'ORD-DEMO-77210',
    issueDate: '2026/06/01',
    expiryDate: '2026/12/31',
    iconName: 'Plane',
    colorScheme: 'purple',
    isVerified: true,
    allowAI: true,
    qrData: 'MUEENI-DEMO-FLIGHT-AHMED',
    details: {
      'Service': 'Mobility assistance during travel',
      'Ground Assistance':
        'Available depending on the booking and service provider'
    }
  },
  {
    id: 'doc-4',
    title: 'National Digital Identity',
    category: 'verified',
    type: 'id',
    issuer: 'Digital Identity Service',
    code: 'DEMO-ID-1190000000',
    issueDate: '1442/04/15',
    expiryDate: '1452/04/15',
    iconName: 'ShieldCheck',
    colorScheme: 'teal',
    isVerified: true,
    allowAI: false,
    qrData: 'MUEENI-DEMO-DIGITAL-ID-AHMED',
    details: {
      'Full Name': 'Ahmed',
      'Birthplace': 'Riyadh',
      'Blood Type': 'O+',
      'Digital Verification': 'Demo data for presentation'
    }
  },
  {
    id: 'doc-5',
    title: 'Physical Rehabilitation Medical Report',
    category: 'my_documents',
    type: 'medical_file',
    issuer: 'Medical Provider',
    code: 'MED-DEMO-8831',
    issueDate: '2026/03/15',
    expiryDate: '2027/03/15',
    iconName: 'FileHeart',
    colorScheme: 'indigo',
    fileSize: '2.4 MB (PDF)',
    isVerified: true,
    allowAI: true,
    fileUrl: '#',
    details: {
      'Diagnosis': 'Mobility Disability',
      'Assistive Device': 'Electric Wheelchair',
      'Source': 'Demo data for presentation',
      'AI Permission': 'Enabled'
    }
  },
  {
    id: 'doc-6',
    title: 'Cybersecurity Program Certificate',
    category: 'my_documents',
    type: 'certificate',
    issuer: 'Training Provider',
    code: 'CERT-DEMO-CYBER-2026',
    issueDate: '2026/05/20',
    iconName: 'Award',
    colorScheme: 'slate',
    fileSize: '1.1 MB (PDF)',
    isVerified: false,
    allowAI: true,
    fileUrl: '#',
    details: {
      'Program Name': 'Fundamentals of Cybersecurity & Cloud Computing',
      'Training Hours': '60 Hours',
      'Source': 'Demo data for presentation',
      'AI Permission': 'Enabled'
    }
  }
];

export const initialWalletDocsEn = initialWalletDocumentsEn;

export const initialRemindersEn: SmartReminder[] = [
  {
    id: 'rem-1',
    title: 'Upcoming Rehabilitation Session',
    subtitle: 'Physical rehabilitation appointment - Demo',
    targetDate: '2026/09/25',
    dueInDays: 6,
    type: 'medical',
    location: 'Riyadh - Demo Location',
    completed: false
  },
  {
    id: 'rem-2',
    title: 'Renew Traffic Facilitation Card',
    subtitle: 'Reminder to review and update the facilitation card',
    targetDate: '2026/10/01',
    dueInDays: 12,
    type: 'card_renewal',
    location: 'Digital Services',
    completed: false
  },
  {
    id: 'rem-3',
    title: 'Review Medical Report',
    subtitle: 'Periodic review of rehabilitation needs',
    targetDate: '2026/10/15',
    dueInDays: 26,
    type: 'annual_report',
    location: 'Health Platform - Demo',
    completed: false
  }
];

export const initialOffersEn: OfferItem[] = [
  {
    id: 'off-1',
    title: 'Accessibility-Friendly Services',
    company: 'MUEENI Partners',
    discount: '15% Off',
    category: 'cafes',
    categoryLabel: 'Cafes & Dining',
    validUntil: '31/12/2026',
    expiryDate: '31/12/2026',
    imageUrl:
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=500&auto=format&fit=crop&q=80',
    description:
      'Demo offer for accessibility-friendly services designed with people with disabilities in mind.',
    terms: [
      'Demo offer for presentation',
      'Terms may vary by service provider'
    ],
    promoCode: 'MUEENI15',
    isFeatured: true
  },
  {
    id: 'off-2',
    title: 'Accessible Accommodation',
    company: 'MUEENI Partners',
    discount: '25% Off',
    category: 'hotels',
    categoryLabel: 'Hotels & Stays',
    validUntil: '30/11/2026',
    expiryDate: '30/11/2026',
    imageUrl:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&auto=format&fit=crop&q=80',
    description:
      'Demo offer showing accommodation options designed with accessibility in mind.',
    terms: [
      'Advance booking may be required',
      'Demo offer for presentation'
    ],
    promoCode: 'STAY25',
    isFeatured: true
  },
  {
    id: 'off-3',
    title: 'Accessible Transportation Support',
    company: 'MUEENI Partners',
    discount: '10% Off',
    category: 'travel',
    categoryLabel: 'Travel & Transportation',
    validUntil: '15/12/2026',
    expiryDate: '15/12/2026',
    imageUrl:
      'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=500&auto=format&fit=crop&q=80',
    description:
      'Demo transportation service designed to consider the needs of people with mobility disabilities.',
    terms: [
      'Demo offer for presentation'
    ],
    promoCode: 'ACCESS10'
  }
];

export const purpleSaturdayCampaignEn: SeasonalCampaign = {
  id: 'camp-purple',
  title: 'Purple Saturday',
  subtitle: 'Accessibility Awareness Campaign',
  date: 'November 28, 2026',
  badge: 'Upcoming Campaign',
  description:
    'A demo awareness campaign promoting accessibility, inclusion, and equal opportunities for people with disabilities.',
  period: 'November 2026',
  active: true,
  participantsCount: 1489,
  isJoined: false,
  joined: false,
  organizer: 'MUEENI AI',
  purpose:
    'Raise awareness about accessible public and digital services.',
  targetGroup:
    'People with disabilities, families, and companions',
  startDate: 'November 20, 2026',
  endDate: 'November 30, 2026',
  location: 'Saudi Arabia',
  status: 'upcoming',
  bannerColor: 'from-purple-900 via-indigo-900 to-purple-950',
  features: [
    'Accessibility awareness content',
    'Information about accessible services',
    'Encouraging organizations to improve accessibility'
  ]
};

export const initialCampaignsEn: SeasonalCampaign[] = [
  purpleSaturdayCampaignEn,
  {
    id: 'camp-2',
    title: 'Digital Accessibility Week',
    subtitle: 'Technology for Everyone',
    date: 'December 3, 2026',
    badge: 'Coming Soon',
    description:
      'An awareness campaign about designing digital services and applications for people with different accessibility needs.',
    period: 'December 2026',
    active: true,
    participantsCount: 3240,
    organizer: 'MUEENI AI',
    purpose:
      'Raise awareness about the importance of digital accessibility.',
    targetGroup:
      'People with disabilities, developers, and digital product designers',
    startDate: 'December 1, 2026',
    endDate: 'December 7, 2026',
    location: 'Online',
    status: 'upcoming',
    bannerColor: 'from-emerald-900 to-teal-950',
    features: [
      'WCAG accessibility awareness',
      'Tips for designing accessible applications'
    ]
  },
  {
    id: 'camp-3',
    title: 'Accessible Community',
    subtitle: 'Towards a More Inclusive Environment',
    date: 'October 15, 2026',
    badge: 'Completed',
    description:
      'An awareness campaign encouraging better accessibility in public spaces and services.',
    period: 'October 2026',
    active: false,
    participantsCount: 1820,
    organizer: 'MUEENI AI',
    purpose:
      'Promote inclusion and improve accessibility for people with disabilities.',
    targetGroup:
      'People with disabilities and service providers',
    startDate: 'October 10, 2026',
    endDate: 'October 20, 2026',
    location: 'Saudi Arabia',
    status: 'expired',
    bannerColor: 'from-amber-950 to-stone-900',
    features: [
      'Awareness of mobility barriers',
      'Encouraging accessibility issue reporting'
    ]
  }
];

export const connectedEntitiesEn = [
  {
    name: 'Riyadh Municipality',
    role: 'Information about municipal accessibility barriers and services',
    icon: 'MapPin'
  },
  {
    name: 'Transport General Authority',
    role: 'Information about transportation and accessibility services',
    icon: 'Bus'
  },
  {
    name: 'Ministry of Human Resources & Social Development',
    role: 'Information about employment, rehabilitation, and services',
    icon: 'Users'
  },
  {
    name: 'Ministry of Health',
    role: 'Information about healthcare and rehabilitation services',
    icon: 'Stethoscope'
  },
  {
    name: 'Authority for the Care of People with Disabilities',
    role: 'Information about disability policies and support services',
    icon: 'Award'
  }
];

export const localKnowledgeBaseEn: {
  keywords: string[];
  answer: string;
  entity: { name: string; role: string; link?: string };
  action?: { label: string; tabTarget: string };
}[] = [
  {
    keywords: [
      'facilitation',
      'parking',
      'card',
      'renew',
      'traffic',
      'permit'
    ],
    answer:
      'You can view information about the Traffic Facilitation Card and accessible parking options through MUEENI. For official requirements or applications, users should verify the information with the relevant authority.',
    entity: {
      name: 'Authority for the Care of People with Disabilities',
      role: 'Information and services related to people with disabilities'
    },
    action: {
      label: 'Open Digital Wallet',
      tabTarget: 'wallet'
    }
  },
  {
    keywords: [
      'fare',
      'ticket',
      'flight',
      'travel',
      'train',
      'bus',
      'transport',
      'discount'
    ],
    answer:
      'You can view information about transportation discounts and mobility assistance through MUEENI. Eligibility and requirements may vary by service provider, so users should verify the information with the official source.',
    entity: {
      name: 'Transport General Authority',
      role: 'Information related to transportation and accessibility services'
    },
    action: {
      label: 'View Documents in Wallet',
      tabTarget: 'wallet'
    }
  },
  {
    keywords: [
      'job',
      'jobs',
      'career',
      'employment',
      'apply',
      'training',
      'internship'
    ],
    answer:
      'The Empowerment Portal in MUEENI provides employment and training opportunities that can be filtered according to accessibility needs, such as ramps, elevators, and assistive technology.',
    entity: {
      name: 'Ministry of Human Resources & Social Development',
      role: 'Information about employment, training, and services'
    },
    action: {
      label: 'Explore Jobs & Training',
      tabTarget: 'jobs'
    }
  },
  {
    keywords: [
      'rights',
      'labor',
      'regulations',
      'law',
      'workplace'
    ],
    answer:
      'MUEENI provides information and guidance related to disability rights and accessible workplaces. Users should verify official laws and requirements with the relevant authority.',
    entity: {
      name: 'Authority for the Care of People with Disabilities',
      role: 'Information and guidance about disability rights'
    },
    action: {
      label: 'Explore Accessible Opportunities',
      tabTarget: 'jobs'
    }
  },
  {
    keywords: [
      'appointment',
      'medical',
      'hospital',
      'rehab',
      'sehhaty',
      'doctor'
    ],
    answer:
      'You can organize medical appointments, reminders, and rehabilitation-related documents through MUEENI. The AI assistant can also help organize and explain the available information.',
    entity: {
      name: 'Ministry of Health',
      role: 'Information about healthcare and rehabilitation services'
    },
    action: {
      label: 'View Reminders & Appointments',
      tabTarget: 'profile'
    }
  },
  {
    keywords: [
      'report',
      'violation',
      'voice heard',
      'parking violation',
      'barrier',
      'sidewalk'
    ],
    answer:
      'The "Voice Heard" service in MUEENI helps users organize report information and document accessibility issues. The user can then submit the report to the relevant authority and follow its status.',
    entity: {
      name: 'Relevant Municipal Authority',
      role: 'Receiving and handling accessibility and municipal reports'
    },
    action: {
      label: 'Submit a New Report',
      tabTarget: 'reports'
    }
  },
  {
    keywords: [
      'purple saturday',
      'purple',
      'discount',
      'offers',
      'initiative'
    ],
    answer:
      'The campaigns and offers section in MUEENI presents initiatives and discounts related to accessibility. Users should check the terms and the service provider before using an offer.',
    entity: {
      name: 'MUEENI AI',
      role: 'Organizing and presenting accessibility-related initiatives and offers'
    },
    action: {
      label: 'Explore Offers',
      tabTarget: 'offers'
    }
  }
];