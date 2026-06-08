import webIcon from '../assets/web.png'
import softwareIcon from '../assets/software.png'
import bookingIcon from '../assets/online-booking.png'
import automationIcon from '../assets/automation.png'
import mobileIcon from '../assets/mobile.png'
import marketingIcon from '../assets/marketing.png'

export const SERVICES = [
  {
    id: '01',
    slug: 'website-development',
    title: 'Website Development',
    icon: webIcon,
    description:
      'Professional websites, ecommerce stores, landing pages, and portals built to convert visitors into customers.',
    features: ['Responsive design', 'Basic SEO', 'Modern custom design'],
  },
  {
    id: '02',
    slug: 'software-development',
    title: 'Software Development',
    icon: softwareIcon,
    description:
      'Custom software solutions tailored to your business workflows — from internal tools to full-scale platforms.',
    features: ['Custom dashboards', 'API integrations', 'Scalable architecture'],
  },
  {
    id: '03',
    slug: 'booking-systems',
    title: 'Booking Systems',
    icon: bookingIcon,
    description:
      'Booking platforms with calendars, M-Pesa payments, reminders, staff schedules, and client portals.',
    features: ['Online bookings', 'M-Pesa payments', 'Client portals'],
  },
  {
    id: '04',
    slug: 'ai-automation',
    title: 'AI Automation',
    icon: automationIcon,
    description:
      'AI workflows, customer support automation, reporting, and task systems that reduce manual work.',
    features: ['AI workflows', 'Smart reporting', 'Customer automation'],
  },
  {
    id: '05',
    slug: 'mobile-development',
    title: 'Mobile Development',
    icon: mobileIcon,
    description:
      'Native and cross-platform mobile apps for Android and iOS that deliver seamless user experiences.',
    features: ['Android & iOS', 'Offline support', 'Push notifications'],
  },
  {
    id: '06',
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    icon: marketingIcon,
    description:
      'Data-driven campaigns across social media, search, and email to grow your brand and drive revenue.',
    features: ['Social media ads', 'SEO & content', 'Email campaigns'],
  },
]

export const SERVICE_HERO_CONFIG = {
  'website-development': {
    badge: 'Web Development',
    title: 'Website Development',
    accent: 'Digital Experiences',
    description:
      'Design, build, and launch websites, ecommerce stores, and landing pages that convert with performance, brand clarity, and mobile-first user experience.',
    perks: [
      'Responsive and fast builds',
      'Ecommerce and landing pages',
      'SEO-ready web architecture',
      'Modern custom design',
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&q=80',
        badge: 'Web Development',
      },
      {
        url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80',
        badge: 'Ecommerce UX',
      },
      {
        url: 'https://images.unsplash.com/photo-1559526324-593bc073d938?w=900&q=80',
        badge: 'Landing Pages',
      },
      {
        url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=900&q=80',
        badge: 'Website Design',
      },
    ],
    solutions: [
      {
        sector: 'Website Services',
        tag: 'Web',
        tagColor: '#FF4D9E',
        items: [
          'Custom website design',
          'Ecommerce storefronts',
          'CMS-powered pages',
          'Landing page optimization',
        ],
      },
      {
        sector: 'Performance',
        tag: 'Speed',
        tagColor: '#34d399',
        items: [
          'Fast page load times',
          'Mobile-first layouts',
          'SEO-friendly structure',
          'Reliable hosting support',
        ],
      },
      {
        sector: 'Growth',
        tag: 'Scale',
        tagColor: '#a78bfa',
        items: [
          'Lead capture pages',
          'Conversion-focused flows',
          'Analytics-ready setup',
          'Brand experience consistency',
        ],
      },
    ],
  },
  'software-development': {
    badge: 'Software Development',
    title: 'Software Development',
    accent: 'Custom Platforms',
    description:
      'Build powerful business software, dashboards, and enterprise tools that automate workflows and improve team productivity.',
    perks: [
      'Custom workflows and dashboards',
      'API and data integrations',
      'Scalable platform architecture',
      'Secure enterprise-grade systems',
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=900&q=80',
        badge: 'Custom Apps',
      },
      {
        url: 'https://images.unsplash.com/photo-1531497865148-9052b7e1c029?w=900&q=80',
        badge: 'Enterprise Tools',
      },
      {
        url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=900&q=80',
        badge: 'Data Integration',
      },
      {
        url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&q=80',
        badge: 'Software UX',
      },
    ],
    solutions: [
      {
        sector: 'Platform Engineering',
        tag: 'Build',
        tagColor: '#4f46e5',
        items: [
          'Custom business workflows',
          'Backend services and APIs',
          'Integration with third-party tools',
          'Automated processes and reporting',
        ],
      },
      {
        sector: 'User Experience',
        tag: 'UX',
        tagColor: '#ec4899',
        items: [
          'Intuitive dashboards',
          'Role-based access',
          'Mobile-friendly admin panels',
          'Modern system interfaces',
        ],
      },
      {
        sector: 'Reliability',
        tag: 'Scale',
        tagColor: '#f59e0b',
        items: [
          'Scalable architecture',
          'Secure data handling',
          'Performance monitoring',
          'Maintenance and support',
        ],
      },
    ],
  },
  'booking-systems': {
    badge: 'Booking Systems',
    title: 'Booking & Scheduling',
    accent: 'Automated Reservations',
    description:
      'Deliver booking experiences with calendar management, payments, reminders, and client self-service for appointments and events.',
    perks: [
      'Online booking automation',
      'Payment integration',
      'Staff and resource scheduling',
      'Client notifications and reminders',
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&q=80',
        badge: 'Booking Flow',
      },
      {
        url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=900&q=80',
        badge: 'Calendar UI',
      },
      {
        url: 'https://images.unsplash.com/photo-1564866657313-30f6dabbb46d?w=900&q=80',
        badge: 'Client Portal',
      },
      {
        url: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=900&q=80',
        badge: 'Automated Reminders',
      },
    ],
    solutions: [
      {
        sector: 'Appointment Automation',
        tag: 'Booking',
        tagColor: '#10b981',
        items: [
          'Online scheduling',
          'Availability management',
          'Instant booking confirmation',
          'Recurring appointments',
        ],
      },
      {
        sector: 'Payments',
        tag: 'Checkout',
        tagColor: '#ef4444',
        items: [
          'Secure payment integration',
          'M-Pesa and card support',
          'Deposit and invoicing',
          'Receipt automation',
        ],
      },
      {
        sector: 'Customer Care',
        tag: 'Service',
        tagColor: '#8b5cf6',
        items: [
          'Client portal access',
          'Automated SMS/email alerts',
          'Staff assignment tools',
          'Feedback & ratings',
        ],
      },
    ],
  },
  'ai-automation': {
    badge: 'AI Automation',
    title: 'AI-Powered Automation',
    accent: 'Smarter Workflows',
    description:
      'Use AI to automate repetitive business tasks, personalize customer interactions, and surface insights across operations.',
    perks: [
      'AI workflow orchestration',
      'Smart customer support',
      'Automated reporting',
      'Task process automation',
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80',
        badge: 'AI Workflows',
      },
      {
        url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&q=80',
        badge: 'Automation Engine',
      },
      {
        url: 'https://images.unsplash.com/photo-1581091012184-3d0a0bca9625?w=900&q=80',
        badge: 'Smart Analytics',
      },
      {
        url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=900&q=80',
        badge: 'AI Assistant',
      },
    ],
    solutions: [
      {
        sector: 'AI Workflows',
        tag: 'Smart',
        tagColor: '#22c55e',
        items: [
          'Process automation',
          'AI decision support',
          'Task routing',
          'Intelligent triggers',
        ],
      },
      {
        sector: 'Customer Automation',
        tag: 'Support',
        tagColor: '#3b82f6',
        items: [
          'Chatbot responses',
          'Lead qualification',
          'Support ticketing',
          'Personalized messaging',
        ],
      },
      {
        sector: 'Insight',
        tag: 'Analytics',
        tagColor: '#f59e0b',
        items: [
          'Automated reports',
          'Trend detection',
          'Forecasting models',
          'Performance dashboards',
        ],
      },
    ],
  },
  'mobile-development': {
    badge: 'Mobile Development',
    title: 'Mobile App Development',
    accent: 'Apps for Every Device',
    description:
      'Deliver native and cross-platform mobile apps that engage users, support offline workflows, and launch with polished App Store-ready experiences.',
    perks: [
      'Native iOS & Android builds',
      'Cross-platform frameworks',
      'Push notifications',
      'Offline-ready experiences',
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=900&q=80',
        badge: 'Mobile UI',
      },
      {
        url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&q=80',
        badge: 'App Development',
      },
      {
        url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=900&q=80',
        badge: 'User Experience',
      },
      {
        url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=900&q=80',
        badge: 'App Launch',
      },
    ],
    solutions: [
      {
        sector: 'App Strategy',
        tag: 'Mobile',
        tagColor: '#f43f5e',
        items: [
          'Product discovery',
          'UX and UI design',
          'Platform choice guidance',
          'App launch planning',
        ],
      },
      {
        sector: 'App Build',
        tag: 'Develop',
        tagColor: '#0ea5e9',
        items: [
          'Native Android/iOS',
          'Cross-platform apps',
          'Offline data sync',
          'Push notification setup',
        ],
      },
      {
        sector: 'Release',
        tag: 'Launch',
        tagColor: '#f97316',
        items: [
          'App Store submission',
          'Beta testing',
          'Performance optimization',
          'App analytics setup',
        ],
      },
    ],
  },
  'digital-marketing': {
    badge: 'Digital Marketing',
    title: 'Digital Marketing',
    accent: 'Growth Campaigns',
    description:
      'Reach more customers with campaigns, content, and ads that build visibility, drive leads, and amplify your online presence.',
    perks: [
      'Data-driven campaign strategy',
      'Social media and search ads',
      'Content and SEO support',
      'Performance tracking',
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&q=80',
        badge: 'Marketing Strategy',
      },
      {
        url: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=900&q=80',
        badge: 'Campaigns',
      },
      {
        url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=900&q=80',
        badge: 'Brand Growth',
      },
      {
        url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=900&q=80',
        badge: 'Analytics',
      },
    ],
    solutions: [
      {
        sector: 'Brand Growth',
        tag: 'Awareness',
        tagColor: '#ec4899',
        items: [
          'Brand strategy',
          'Content creation',
          'Social media presence',
          'Audience engagement',
        ],
      },
      {
        sector: 'Performance Ads',
        tag: 'Paid',
        tagColor: '#22c55e',
        items: [
          'Search ads',
          'Social ad campaigns',
          'Lead generation funnels',
          'ROI optimization',
        ],
      },
      {
        sector: 'Insights',
        tag: 'Data',
        tagColor: '#2563eb',
        items: [
          'Campaign analytics',
          'Conversion tracking',
          'Audience insights',
          'Continuous optimization',
        ],
      },
    ],
  },
}
