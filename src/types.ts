export type UserRole = 'beneficiary' | 'provider';

export interface AccessibilitySettings {
  textSize: 'small' | 'normal' | 'large' | 'xlarge' | number;
  highContrast: boolean;
  darkMode: boolean;
  reducedMotion: boolean;
  dyslexiaFont: boolean;
  largeTouchTargets?: boolean;
  largeTouch?: boolean;
  colorBlindMode?: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia';
  screenReader?: boolean;
  screenReaderEnabled?: boolean;
}

export interface AIPersonalizationSettings {
  enabled: boolean;
  shareDisabilityType: boolean;
  shareAssistiveDevices: boolean;
  shareCityLocation: boolean;
  useUploadedDocs: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  nationalId: string;
  role: string;
  birthDate?: string;
  disabilityType: string;
  bloodType: string;
  phone: string;
  email: string;
  city?: string;
  avatarUrl?: string;
  guardianName?: string;
  emergencyPhone?: string;
  emergencyContact: {
    name: string;
    phone: string;
    relation?: string;
  };
  assistiveDevices?: string[];
  mobilityNeeds?: string[];
  approvedAccommodations?: string[];
  aiPersonalization?: AIPersonalizationSettings;
}

export interface JobOpportunity {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  type: string;
  category: 'jobs' | 'training';
  postedAt: string;
  salary?: string;
  description: string;
  requirements: string[];
  skills?: string[];
  deadline?: string;
  trainingProvider?: string;
  trainingDate?: string;
  trainingType?: string;
  accessibilityMatrix: {
    assistiveTech: boolean; // تكنولوجيا مساعدة
    lighting: boolean; // إضاءة مهيأة
    visualPaths: boolean; // مسارات بصرية
    reservedParking: boolean; // مواقف مخصصة
    ramps: boolean; // منحدرات حركة
    elevators?: boolean; // مصاعد ناطقة ومهيأة
    restrooms?: boolean; // دورات مياه مجهزة
  };
  applied?: boolean;
}

export interface ReportItem {
  id: string;
  referenceNumber: string;
  title: string;
  problemType?: 'صعوبة وصول' | 'موقف مخصص' | 'مدخل' | 'مصعد' | 'مرفق' | 'أخرى' | string;
  category: 'parking' | 'urban_roads' | 'buildings' | 'transport' | 'other';
  categoryLabel: string;
  description: string;
  location: string;
  coordinates: string;
  imageUrl?: string;
  fileAttachment?: string;
  status: 'تم الاستلام' | 'قيد المراجعة' | 'تمت الإحالة' | 'تم الحل' | string;
  createdAt: string;
  timeline: {
    title: string;
    date: string;
    description: string;
    completed: boolean;
  }[];
}

export interface WalletDocument {
  id: string;
  title: string;
  category: 'verified' | 'my_documents'; // الموثقة والمربوطة vs مستنداتي الشخصية
  type: 'card' | 'report' | 'id' | 'ticket' | 'medical_file' | 'certificate';
  issuer: string;
  code: string;
  issueDate: string;
  expiryDate?: string;
  iconName: string;
  colorScheme: 'green' | 'blue' | 'purple' | 'teal' | 'indigo' | 'slate';
  qrData?: string;
  details: Record<string, string>;
  fileSize?: string;
  isVerified?: boolean;
  allowAI?: boolean; // إذن قراءة المستند بواسطة الذكاء الاصطناعي
  fileUrl?: string;
}

export interface SmartReminder {
  id: string;
  title: string;
  subtitle: string;
  targetDate: string;
  dueInDays: number;
  type: 'medical' | 'renewal' | 'card_renewal' | 'annual_report' | 'appointment' | 'system';
  location?: string;
  completed: boolean;
}

export interface OfferItem {
  id: string;
  title: string;
  company: string;
  discount: string;
  category: 'all' | 'cafes' | 'food' | 'hotels' | 'shopping' | 'health' | 'travel' | 'transport';
  categoryLabel: string;
  validUntil?: string;
  expiryDate?: string;
  imageUrl: string;
  description: string;
  terms?: string[];
  promoCode: string;
  isFeatured?: boolean;
  isPurpleSaturday?: boolean;
}

export interface SeasonalCampaign {
  id: string;
  title: string;
  subtitle?: string;
  badge?: string;
  description: string;
  date?: string;
  period?: string;
  active?: boolean;
  participantsCount: number;
  isJoined?: boolean;
  joined?: boolean;
  bannerColor?: string;
  features?: string[];
  organizer?: string;
  purpose?: string;
  targetAudience?: string;
  targetGroup?: string;
  startDate?: string;
  endDate?: string;
  locationStatus?: string;
  location?: string;
  campaignStatus?: string;
  status?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  responsibleEntity?: {
    name: string;
    role: string;
    link?: string;
  };
  suggestedAction?: {
    label: string;
    tabTarget?: string;
  };
  isPersonalized?: boolean;
}

