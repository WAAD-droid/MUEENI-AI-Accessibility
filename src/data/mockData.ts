import {
  UserProfile,
  JobOpportunity,
  ReportItem,
  WalletDocument,
  SmartReminder,
  OfferItem,
  SeasonalCampaign
} from '../types';

export const initialUserProfile: UserProfile = {
  id: 'usr-1',
  name: 'أحمد',
  nationalId: '1190000000',
  role: 'مستفيد (إعاقة حركية)',
  birthDate: '1990/05/12',
  disabilityType: 'إعاقة حركية (شديدة)',
  bloodType: 'O+',
  phone: '+966 50 123 4567',
  email: 'ahmad.demo@example.com',
  guardianName: 'مريم (المرافقة)',
  emergencyPhone: '050 111 2222',
  emergencyContact: {
    name: 'مريم',
    phone: '050 111 2222',
    relation: 'المرافقة',
  },
  city: 'الرياض',
  avatarUrl:
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
  assistiveDevices: ['كرسي متحرك كهربائي'],
  mobilityNeeds: [
    'منحدرات حركة ومصاعد عريضة',
    'مواقف سيارات قريبة ومخصصة',
    'مقاعد سفر مهيأة ومساحة إضافية للأرجل',
    'خدمة المساعدة الأرضية في المطارات ومحطات القطار'
  ],
  approvedAccommodations: [
    'بطاقة التسهيلات المرورية',
    'تخفيض أجور الإركاب 50% (المستفيد + المرافق)',
    
  ],
  aiPersonalization: {
    enabled: true,
    shareDisabilityType: true,
    shareAssistiveDevices: true,
    shareCityLocation: true,
    useUploadedDocs: true,
  },
};

export const initialOpportunities: JobOpportunity[] = [
  {
    id: 'job-1',
    title: 'أخصائي دعم تقني ونظم',
    company: 'شركة الاتصالات السعودية (STC)',
    companyLogo: 'stc',
    location: 'الرياض (مقر مجهز)',
    type: 'دوام كامل',
    category: 'jobs',
    postedAt: 'منذ ساعتين',
    salary: '10,500 - 13,000 ريال',
    description:
      'تقديم الدعم الفني للبنية التحتية والأنظمة الرقمية في بيئة عمل مهيأة، مع توفير تجهيزات مناسبة لدعم الموظفين ذوي الإعاقة الحركية.',
    skills: [
      'الدعم الفني والشبكات',
      'أنظمة Windows Server',
      'خدمة العملاء وحل المشكلات'
    ],
    deadline: '25 سبتمبر 2026',
    requirements: [
      'شهادة دبلوم أو بكالوريوس في تقنية المعلومات أو تخصص ذي صلة',
      'إجادة التعامل مع أنظمة الدعم الفني وحل المشكلات',
      'مهارات تواصل ممتازة'
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
    title: 'محلل بيانات وحلول رقمية',
    company: 'شركة علم (Elm)',
    companyLogo: 'elm',
    location: 'الرياض (عمل هجين)',
    type: 'دوام كامل',
    category: 'jobs',
    postedAt: 'منذ 5 ساعات',
    salary: '12,000 - 15,500 ريال',
    description:
      'تحليل البيانات وبناء لوحات التحكم الرقمية في بيئة عمل مهيأة وفق مبادئ الوصول الشامل.',
    skills: [
      'تحليل البيانات و SQL',
      'لوحات Power BI',
      'برمجة Python',
      'التفكير التحليلي'
    ],
    deadline: '30 سبتمبر 2026',
    requirements: [
      'بكالوريوس في علوم الحاسب أو علم البيانات أو الإحصاء',
      'إتقان أدوات Power BI و SQL و Python',
      'القدرة على العمل الجماعي'
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
    title: 'برنامج تدريب تطوير واجهات وتجربة مستخدم ميسرة',
    company: 'مصرف الراجحي',
    companyLogo: 'alrajhi',
    location: 'الرياض (حضور ميسر وعن بُعد)',
    type: 'تدريب تعاوني',
    category: 'training',
    postedAt: 'منذ يوم',
    salary: 'مكافأة 4,000 ريال شهرياً',
    trainingProvider: 'أكاديمية تقنية',
    trainingDate: '1 أكتوبر 2026 - 31 ديسمبر 2026',
    trainingType: 'تدريب تعاوني وتأهيل لسوق العمل',
    skills: [
      'تصميم تجربة المستخدم UI/UX',
      'معايير الوصول الرقمي WCAG',
      'React & Tailwind'
    ],
    deadline: '20 سبتمبر 2026',
    description:
      'برنامج تدريبي لتطوير واجهات تطبيقات مهيأة للأشخاص ذوي الإعاقة ومتوافقة مع مبادئ الوصول الرقمي.',
    requirements: [
      'طالب أو خريج حديث في هندسة البرمجيات أو التصميم',
      'معرفة بأساسيات React وCSS ومعايير WCAG'
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
    title: 'أخصائي خدمة عملاء',
    company: 'شركة رقمية',
    companyLogo: 'aramco',
    location: 'عن بُعد (Remote)',
    type: 'دوام كامل',
    category: 'jobs',
    postedAt: 'منذ يومين',
    salary: '8,500 - 11,000 ريال',
    description:
      'إدارة استفسارات العملاء والتذاكر الرقمية من المنزل مع توفير بيئة عمل مرنة.',
    skills: [
      'خدمة العملاء الرقمية',
      'إدارة تذاكر الدعم',
      'التواصل الفعّال'
    ],
    deadline: '28 سبتمبر 2026',
    requirements: [
      'شهادة ثانوية أو دبلوم كحد أدنى',
      'مهارات تواصل جيدة'
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

export const initialJobs = initialOpportunities;

export const initialReports: ReportItem[] = [
  {
    id: 'rep-1',
    referenceNumber: '#2026-1287',
    title: 'وقوف غير نظامي في مواقف ذوي الإعاقة',
    category: 'parking',
    categoryLabel: 'بلاغات مواقف السيارات',
    description:
      'سيارة تقف في موقف مخصص للأشخاص ذوي الإعاقة بدون تصريح واضح.',
    location: 'الرياض - منطقة عامة',
    coordinates: 'Demo Location',
    imageUrl:
      'https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=500&auto=format&fit=crop&q=80',
    status: 'قيد المراجعة',
    createdAt: 'منذ 3 ساعات',
    timeline: [
      {
        title: 'تم استلام البلاغ آلياً',
        date: '2026/09/19 - 10:15 ص',
        description:
          'تم تسجيل البلاغ وتوليد الرمز المرجعي.',
        completed: true
      },
      {
        title: 'قيد المراجعة',
        date: '2026/09/19 - 10:45 ص',
        description:
          'جاري مراجعة البلاغ والمعلومات المرفقة.',
        completed: true
      },
      {
        title: 'تمت الإحالة للجهة المختصة',
        date: 'قيد الانتظار',
        description:
          'سيتم توجيه البلاغ إلى الجهة المختصة حسب الموقع ونوع المشكلة.',
        completed: false
      },
      {
        title: 'إغلاق البلاغ',
        date: 'متوقع',
        description:
          'سيتم تحديث حالة البلاغ بعد معالجة المشكلة.',
        completed: false
      }
    ]
  },
  {
    id: 'rep-2',
    referenceNumber: '#2026-0982',
    title: 'منحدر رصيف غير مهيأ للكراسي المتحركة',
    category: 'urban_roads',
    categoryLabel: 'تحسين الطرق والمشهد الحضري',
    description:
      'وجود ارتفاع مفاجئ عند نهاية منحدر الرصيف مما يصعب عبور الكرسي المتحرك بأمان.',
    location: 'الرياض - منطقة عامة',
    coordinates: 'Demo Location',
    imageUrl:
      'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=500&auto=format&fit=crop&q=80',
    status: 'تمت الإحالة',
    createdAt: 'منذ يومين',
    timeline: [
      {
        title: 'تم استلام البلاغ',
        date: '2026/09/17 - 02:00 م',
        description:
          'تم تسجيل الملاحظة وموقع البلاغ.',
        completed: true
      },
      {
        title: 'تمت الإحالة',
        date: '2026/09/18 - 09:00 ص',
        description:
          'تمت إحالة البلاغ إلى الجهة المختصة للمراجعة.',
        completed: true
      },
      {
        title: 'اكتمال المعالجة',
        date: 'متوقع',
        description:
          'سيتم تحديث الحالة بعد معالجة المشكلة.',
        completed: false
      }
    ]
  }
];

export const initialWalletDocuments: WalletDocument[] = [
  {
    id: 'doc-1',
    title: 'بطاقة تسهيلات مرورية',
    category: 'verified',
    type: 'card',
    issuer: 'جهة مختصة',
    code: 'TSH-DEMO-99281',
    issueDate: '2026/01/01',
    expiryDate: '2027/01/01',
    iconName: 'Car',
    colorScheme: 'green',
    isVerified: true,
    allowAI: true,
    qrData: 'MUEENI-DEMO-TSH-AHMED',
    details: {
      'رقم المستفيد': 'DEMO-M-88390',
      'نوع البطاقة': 'مواقف خاصة وتسهيلات تنقل',
      'حالة التوثيق': 'بيانات تجريبية للعرض'
    }
  },
  {
    id: 'doc-2',
    title: 'بطاقة تخفيض أجور الإركاب',
    category: 'verified',
    type: 'card',
    issuer: 'جهة النقل المختصة',
    code: 'TRN-DEMO-55420',
    issueDate: '2026/01/10',
    expiryDate: '2027/01/10',
    iconName: 'Bus',
    colorScheme: 'blue',
    isVerified: true,
    allowAI: true,
    qrData: 'MUEENI-DEMO-TRANSPORT-AHMED',
    details: {
      'نسبة الخصم': '50%',
      'تخفيض المرافق': 'متاح حسب الأهلية',
      'حالة التوثيق': 'بيانات تجريبية للعرض'
    }
  },
  {
    id: 'doc-3',
    title: 'مستند مساعدة السفر',
    category: 'verified',
    type: 'ticket',
    issuer: 'خدمة سفر',
    code: 'ORD-DEMO-77210',
    issueDate: '2026/06/01',
    expiryDate: '2026/12/31',
    iconName: 'Plane',
    colorScheme: 'purple',
    isVerified: true,
    allowAI: true,
    qrData: 'MUEENI-DEMO-FLIGHT-AHMED',
    details: {
      'الخدمة': 'مساعدة حركية أثناء السفر',
      'المساعدة الأرضية': 'متاحة حسب الحجز والجهة المقدمة للخدمة'
    }
  },
  {
    id: 'doc-4',
    title: 'الهوية الوطنية الرقمية',
    category: 'verified',
    type: 'id',
    issuer: 'خدمة هوية رقمية',
    code: 'DEMO-ID-1190000000',
    issueDate: '1442/04/15',
    expiryDate: '1452/04/15',
    iconName: 'ShieldCheck',
    colorScheme: 'teal',
    isVerified: true,
    allowAI: false,
    qrData: 'MUEENI-DEMO-DIGITAL-ID-AHMED',
    details: {
      'الاسم الكامل': 'أحمد',
      'مكان الميلاد': 'الرياض',
      'فصيلة الدم': 'O+',
      'التوثيق الرقمي': 'بيانات تجريبية للعرض'
    }
  },
  {
    id: 'doc-5',
    title: 'تقرير طبي للتأهيل الحركي',
    category: 'my_documents',
    type: 'medical_file',
    issuer: 'جهة طبية',
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
      'التشخيص': 'إعاقة حركية',
      'الجهاز المساعد': 'كرسي متحرك كهربائي',
      'المصدر': 'بيانات تجريبية للعرض',
      'إذن الذكاء الاصطناعي': 'مفعل'
    }
  },
  {
    id: 'doc-6',
    title: 'شهادة إتمام برنامج الأمن السيبراني',
    category: 'my_documents',
    type: 'certificate',
    issuer: 'جهة تدريبية',
    code: 'CERT-DEMO-CYBER-2026',
    issueDate: '2026/05/20',
    iconName: 'Award',
    colorScheme: 'slate',
    fileSize: '1.1 MB (PDF)',
    isVerified: false,
    allowAI: true,
    fileUrl: '#',
    details: {
      'اسم البرنامج': 'أساسيات الأمن السيبراني والحوسبة السحابية',
      'الساعات التدريبية': '60 ساعة',
      'المصدر': 'بيانات تجريبية للعرض',
      'إذن الذكاء الاصطناعي': 'مفعل'
    }
  }
];

export const initialWalletDocs = initialWalletDocuments;

export const initialReminders: SmartReminder[] = [
  {
    id: 'rem-1',
    title: 'موعد جلسة التأهيل القادمة',
    subtitle: 'موعد تأهيل طبي - بيانات تجريبية',
    targetDate: '2026/09/25',
    dueInDays: 6,
    type: 'medical',
    location: 'الرياض - بيانات تجريبية',
    completed: false
  },
  {
    id: 'rem-2',
    title: 'تجديد بطاقة التسهيلات',
    subtitle: 'تذكير بتحديث بيانات بطاقة التسهيلات',
    targetDate: '2026/10/01',
    dueInDays: 12,
    type: 'card_renewal',
    location: 'الخدمات الرقمية',
    completed: false
  },
  {
    id: 'rem-3',
    title: 'مراجعة التقرير الطبي',
    subtitle: 'مراجعة دورية للاحتياجات التأهيلية',
    targetDate: '2026/10/15',
    dueInDays: 26,
    type: 'annual_report',
    location: 'منصة صحية - بيانات تجريبية',
    completed: false
  }
];

export const initialOffers: OfferItem[] = [
  {
    id: 'off-1',
    title: 'خدمات مهيأة لسهولة الوصول',
    company: 'MUEENI Partners',
    discount: 'خصم 15%',
    category: 'cafes',
    categoryLabel: 'مطاعم وكافيهات',
    validUntil: '31/12/2026',
    expiryDate: '31/12/2026',
    imageUrl:
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=500&auto=format&fit=crop&q=80',
    description:
      'عروض تجريبية على خدمات مهيأة مع مراعاة احتياجات الأشخاص ذوي الإعاقة.',
    terms: [
      'عرض تجريبي للعرض داخل التطبيق',
      'قد تختلف الشروط حسب الجهة المقدمة للخدمة'
    ],
    promoCode: 'MUEENI15',
    isFeatured: true
  },
  {
    id: 'off-2',
    title: 'إقامة مهيأة',
    company: 'MUEENI Partners',
    discount: 'خصم 25%',
    category: 'hotels',
    categoryLabel: 'فنادق وإقامة',
    validUntil: '30/11/2026',
    expiryDate: '30/11/2026',
    imageUrl:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&auto=format&fit=crop&q=80',
    description:
      'عرض تجريبي على خيارات إقامة تراعي سهولة الوصول.',
    terms: [
      'الحجز المسبق مطلوب',
      'العرض تجريبي للعرض داخل التطبيق'
    ],
    promoCode: 'STAY25',
    isFeatured: true
  },
  {
    id: 'off-3',
    title: 'دعم النقل المهيأ',
    company: 'MUEENI Partners',
    discount: 'خصم 10%',
    category: 'travel',
    categoryLabel: 'طيران ومواصلات',
    validUntil: '15/12/2026',
    expiryDate: '15/12/2026',
    imageUrl:
      'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=500&auto=format&fit=crop&q=80',
    description:
      'عرض تجريبي لخدمات نقل تراعي احتياجات الأشخاص ذوي الإعاقة الحركية.',
    terms: [
      'العرض تجريبي للعرض داخل التطبيق'
    ],
    promoCode: 'ACCESS10'
  }
];

export const purpleSaturdayCampaign: SeasonalCampaign = {
  id: 'camp-purple',
  title: 'السبت البنفسجي',
  subtitle: 'حملة توعوية لسهولة الوصول',
  date: '28 نوفمبر 2026',
  badge: 'حملة قادمة',
  description:
    'حملة توعوية تجريبية لتعزيز سهولة الوصول والدمج وتكافؤ الفرص للأشخاص ذوي الإعاقة.',
  period: 'نوفمبر 2026',
  active: true,
  participantsCount: 1489,
  isJoined: false,
  joined: false,
  organizer: 'MUEENI AI',
  purpose:
    'تعزيز الوعي بأهمية توفير الخدمات والأماكن الرقمية والعامة المهيأة.',
  targetGroup:
    'الأشخاص ذوو الإعاقة وأسرهم والمرافقون',
  startDate: '20 نوفمبر 2026',
  endDate: '30 نوفمبر 2026',
  location: 'المملكة العربية السعودية',
  status: 'upcoming',
  bannerColor: 'from-purple-900 via-indigo-900 to-purple-950',
  features: [
    'محتوى توعوي حول سهولة الوصول',
    'التعريف بالخدمات المهيأة',
    'تشجيع الجهات على تحسين إمكانية الوصول'
  ]
};

export const initialCampaigns: SeasonalCampaign[] = [
  purpleSaturdayCampaign,
  {
    id: 'camp-2',
    title: 'أسبوع الوصول الرقمي',
    subtitle: 'تقنية متاحة للجميع',
    date: '3 ديسمبر 2026',
    badge: 'قادم قريباً',
    description:
      'حملة توعوية حول تصميم الخدمات والتطبيقات الرقمية بطريقة أكثر شمولاً.',
    period: 'ديسمبر 2026',
    active: true,
    participantsCount: 3240,
    organizer: 'MUEENI AI',
    purpose:
      'رفع الوعي بأهمية الوصول الرقمي للأشخاص ذوي الإعاقة.',
    targetGroup:
      'الأشخاص ذوو الإعاقة والمطورون ومصممو المنتجات الرقمية',
    startDate: '1 ديسمبر 2026',
    endDate: '7 ديسمبر 2026',
    location: 'أونلاين',
    status: 'upcoming',
    bannerColor: 'from-emerald-900 to-teal-950',
    features: [
      'محتوى تعليمي حول WCAG',
      'نصائح لتصميم تطبيقات مهيأة'
    ]
  },
  {
    id: 'camp-3',
    title: 'مجتمع مهيأ للجميع',
    subtitle: 'نحو بيئة أكثر شمولاً',
    date: '15 أكتوبر 2026',
    badge: 'منتهية',
    description:
      'حملة توعوية تشجع على تحسين الأماكن العامة والخدمات لتكون أكثر سهولة للأشخاص ذوي الإعاقة.',
    period: 'أكتوبر 2026',
    active: false,
    participantsCount: 1820,
    organizer: 'MUEENI AI',
    purpose:
      'تعزيز المشاركة المجتمعية وتحسين تجربة الأشخاص ذوي الإعاقة.',
    targetGroup:
      'الأشخاص ذوو الإعاقة والجهات الخدمية',
    startDate: '10 أكتوبر 2026',
    endDate: '20 أكتوبر 2026',
    location: 'المملكة العربية السعودية',
    status: 'expired',
    bannerColor: 'from-amber-950 to-stone-900',
    features: [
      'التوعية بالعوائق الحركية',
      'تشجيع الإبلاغ عن مشاكل سهولة الوصول'
    ]
  }
];

export const connectedEntities = [
  {
    name: 'أمانة منطقة الرياض',
    role: 'معلومات حول العوائق والخدمات البلدية',
    icon: 'MapPin'
  },
  {
    name: 'الهيئة العامة للنقل',
    role: 'معلومات حول النقل والتسهيلات',
    icon: 'Bus'
  },
  {
    name: 'وزارة الموارد البشرية والتنمية الاجتماعية',
    role: 'معلومات حول التأهيل والوظائف والخدمات',
    icon: 'Users'
  },
  {
    name: 'وزارة الصحة',
    role: 'معلومات حول الخدمات الصحية والتأهيلية',
    icon: 'Stethoscope'
  },
  {
    name: 'هيئة رعاية الأشخاص ذوي الإعاقة',
    role: 'معلومات حول السياسات والخدمات الداعمة',
    icon: 'Award'
  }
];

export const localKnowledgeBase: {
  keywords: string[];
  answer: string;
  entity: { name: string; role: string; link?: string };
  action?: { label: string; tabTarget: string };
}[] = [
  {
    keywords: ['تسهيلات', 'بطاقة التسهيلات', 'تجديد', 'مواقف', 'موقف'],
    answer:
      'يمكنك الاطلاع على معلومات بطاقة التسهيلات وخيارات المواقف المخصصة من خلال منصة مُعِيني. للحصول على المتطلبات أو تنفيذ أي إجراء رسمي، يرجى التحقق من الجهة المختصة.',
    entity: {
      name: 'هيئة رعاية الأشخاص ذوي الإعاقة',
      role: 'معلومات وخدمات مرتبطة بالأشخاص ذوي الإعاقة'
    },
    action: {
      label: 'فتح المحفظة الرقمية',
      tabTarget: 'wallet'
    }
  },
  {
    keywords: ['إركاب', 'تذكرة', 'تذاكر', 'سفر', 'طيران', 'قطار', 'حافلات', 'نقل'],
    answer:
      'يمكنك الاطلاع على معلومات تخفيضات النقل وخدمات المساعدة أثناء السفر من خلال مُعِيني. تختلف الأهلية والمتطلبات حسب الجهة المقدمة للخدمة، لذلك يُنصح بالتحقق من المصدر الرسمي.',
    entity: {
      name: 'الهيئة العامة للنقل',
      role: 'معلومات متعلقة بالنقل والخدمات المساندة'
    },
    action: {
      label: 'عرض المستندات في المحفظة',
      tabTarget: 'wallet'
    }
  },
  {
    keywords: ['وظيفة', 'وظائف', 'عمل', 'توظيف', 'تقديم', 'تدريب'],
    answer:
      'توفر بوابة التمكين في مُعِيني فرصًا وظيفية وبرامج تدريبية يمكن تصفيتها حسب احتياجات سهولة الوصول، مثل توفر المنحدرات والمصاعد والتقنيات المساعدة.',
    entity: {
      name: 'وزارة الموارد البشرية والتنمية الاجتماعية',
      role: 'معلومات حول التوظيف والتدريب والخدمات'
    },
    action: {
      label: 'الانتقال إلى الوظائف والتدريب',
      tabTarget: 'jobs'
    }
  },
  {
    keywords: ['حقوق', 'حقوقي', 'مواقف العمل', 'نظام العمل', 'بيئة العمل'],
    answer:
      'يمكنك استخدام مُعِيني للوصول إلى معلومات وإرشادات مرتبطة بحقوق الأشخاص ذوي الإعاقة وتهيئة بيئة العمل. يجب التحقق من الأنظمة والمتطلبات الرسمية من الجهة المختصة.',
    entity: {
      name: 'هيئة رعاية الأشخاص ذوي الإعاقة',
      role: 'معلومات وإرشادات حول حقوق الأشخاص ذوي الإعاقة'
    },
    action: {
      label: 'استعراض الفرص المهيأة',
      tabTarget: 'jobs'
    }
  },
  {
    keywords: ['موعد', 'طب', 'طبي', 'صحة', 'تقرير', 'مستشفى', 'تقرير طبي'],
    answer:
      'يمكنك تنظيم المواعيد والتذكيرات الطبية والمستندات المتعلقة بالتأهيل من خلال مُعِيني، مع إمكانية استخدام الذكاء الاصطناعي لمساعدتك في تنظيم المعلومات.',
    entity: {
      name: 'وزارة الصحة',
      role: 'معلومات حول الخدمات الصحية والتأهيلية'
    },
    action: {
      label: 'عرض التنبيهات والمواعيد',
      tabTarget: 'profile'
    }
  },
  {
    keywords: ['بلاغ', 'مخالفة', 'صوتك مسموع', 'وقوف غير نظامي', 'رصيف', 'طريق', 'عائق'],
    answer:
      'تتيح لك خدمة "صوتك مسموع" داخل مُعِيني تنظيم بيانات البلاغ وتوثيق المشكلة، ثم توجيه المستخدم إلى الجهة المختصة لتقديم البلاغ الرسمي ومتابعته.',
    entity: {
      name: 'الجهة البلدية المختصة',
      role: 'استقبال ومعالجة بلاغات العوائق والخدمات البلدية'
    },
    action: {
      label: 'رفع بلاغ جديد',
      tabTarget: 'reports'
    }
  },
  {
    keywords: ['السبت البنفسجي', 'بنفسجي', 'خصم', 'عروض', 'مبادرة'],
    answer:
      'يعرض قسم الحملات والعروض في مُعِيني المبادرات والخصومات المرتبطة بسهولة الوصول. تحقق من شروط كل عرض والجهة المقدمة له قبل استخدامه.',
    entity: {
      name: 'مُعِيني AI',
      role: 'تنظيم وعرض المبادرات والعروض المتعلقة بسهولة الوصول'
    },
    action: {
      label: 'استكشاف العروض',
      tabTarget: 'offers'
    }
  }
];