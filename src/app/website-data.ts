import {Injectable, signal, PLATFORM_ID, inject} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {PORTFOLIO_PROJECTS, PortfolioProject} from './portfolio-data';

export interface AboutData {
  headerTitle: string;
  headerSubtitle: string;
  bannerImage: string;
  mission: string;
  vision: string;
  storyTitle: string;
  storyParagraph: string;
}

export interface ContactData {
  headerTitle: string;
  headerSubtitle: string;
  bannerImage: string;
  address: string;
  email: string;
  phone: string;
  formTitle: string;
  officeTitle: string;
  workingHours: string;
}

export interface PortfolioPageData {
  headerTitle: string;
  headerSubtitle: string;
  bannerImage: string;
}

export interface ServiceStep {
  title: string;
  desc: string;
}

export interface ServiceFAQ {
  q: string;
  a: string;
}

export interface ServiceBenefit {
  title: string;
  icon: string;
  desc: string;
}

export interface ServiceDetailItem {
  title: string;
  icon: string;
  image: string;
  longDescription: string;
  benefits: ServiceBenefit[];
  process: ServiceStep[];
  faqs: ServiceFAQ[];
}

export interface ServicesPageData {
  headerTitle: string;
  headerSubtitle: string;
  bannerImage: string;
  secondaryTitle: string;
  secondaryDescription: string;
  serviceDetails: Record<string, ServiceDetailItem>;
}

export interface SystemData {
  typography: {
    h1Family: string;
    h2Family: string;
    h3Family: string;
    h4Family: string;
    bodyFamily: string;
    baseFontSize: string;
  };
  colors: {
    bodyBackground: string;
    buttonBackground: string;
    footerBackground: string;
    headerBackground: string;
    navbarBackground: string;
  };
}

export interface WebsiteData {
  home: {
    heroTitle: string;
    heroSubtitle: string;
    bannerImage: string;
    heroImages: string[];
    heroTrustText: string;
    brands: { name: string; icon: string; img: string }[];
    featuresTitle: string;
    featuresSubtitle: string;
    features: { title: string; desc: string; icon: string }[];
    businessNaturesTitle: string;
    businessNaturesSubtitle: string;
    businessNatures: { category: string; title: string; icon: string; desc: string }[];
    portfolioTitle: string;
    projectsTitle: string;
    projectsSubtitle: string;
    projects: PortfolioProject[];
    portfolioDisplayFormat: string;
    proposalTitle: string;
    proposalSubtitle: string;
    proposalButtonText: string;
    ratingValue: string;
    ratingLabel: string;
    projectOverviewTitle: string;
    galleryTitle: string;
    gallerySubtitle: string;
    videoTitle: string;
    videoDescription: string;
    videoStats: { value: string; label: string }[];
    videoUrl: string;
    testimonialsTitle: string;
    testimonialsSubtitle: string;
    testimonials: { name: string; role: string; quote: string; image: string }[];
    ctaTitle: string;
    ctaSubtitle: string;
    ctaButtonText: string;
    theme: {
      primaryColor: string;
      fontFamily: string;
    }
  };
  about: AboutData;
  contact: ContactData;
  portfolio: PortfolioPageData;
  products: PortfolioPageData;
  services: ServicesPageData;
  footer: {
    bannerImage: string;
    description: string;
    address: string;
    phone: string;
    email: string;
    schedule: string;
    copyright: string;
    privacyPolicy: string;
    privacyLastUpdated: string;
    privacyFontSize: string;
    privacyFontFamily: string;
    termsOfService: string;
    termsLastUpdated: string;
    termsFontSize: string;
    termsFontFamily: string;
    disclaimer: string;
    disclaimerLastUpdated: string;
    disclaimerFontSize: string;
    disclaimerFontFamily: string;
    cookiePolicy: string;
    cookieLastUpdated: string;
    cookieFontSize: string;
    cookieFontFamily: string;
  };
  faq: {
    headerTitle: string;
    headerSubtitle: string;
    bannerImage: string;
    questions: ServiceFAQ[];
    ctaTitle: string;
    ctaDescription: string;
    ctaPhone: string;
  };
  system: SystemData;
  [key: string]: unknown;
}

@Injectable({
  providedIn: 'root'
})
export class WebsiteDataService {
  private platformId = inject(PLATFORM_ID);
  
  private initialData: WebsiteData = {
    home: {
      heroTitle: 'Full-Service Engineering & Power Integration.',
      heroSubtitle: 'We simplify your operations by combining professional solar setups with expert electrical contracting and industrial sourcing. Reliable power and aftermarket support, all under one roof.',
      bannerImage: 'assets/images/regenerated_image_1777756664557.png',
      heroImages: [
        'https://thumbs.dreamstime.com/b/community-driven-solar-energy-project-represented-panel-house-roof-basking-bright-sun-symbolizing-pursuit-415609601.jpg',
        'https://img.freepik.com/premium-photo/solar-panels-green-energy-home-white-background-3d-illustration_175992-241.jpg',
        'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?q=80&w=2070&auto=format&fit=crop'
      ],
      heroTrustText: 'Trusted by 500+ Businesses',
      brands: [
        { name: 'Brand 1', icon: '', img: '/img/logo/Picture1.png' },
        { name: 'Brand 2', icon: '', img: '/img/logo/Picture2.png' },
        { name: 'Brand 3', icon: '', img: '/img/logo/Picture3.png' },
        { name: 'Brand 4', icon: '', img: '/img/logo/Picture4.png' },
        { name: 'Brand 5', icon: '', img: '/img/logo/Picture5.png' },
        { name: 'Brand 6', icon: '', img: '/img/logo/Picture6.png' },
        { name: 'Brand 7', icon: '', img: '/img/logo/Picture7.png' },
        { name: 'Brand 8', icon: '', img: '/img/logo/Picture8.png' },
        { name: 'Brand 9', icon: '', img: '/img/logo/Picture9.png' },
        { name: 'Brand 10', icon: '', img: '/img/logo/Picture10.png' },
        { name: 'Brand 11', icon: '', img: '/img/logo/Picture11.png' },
        { name: 'Brand 12', icon: '', img: '/img/logo/Picture12.png' },
        { name: 'Brand 13', icon: '', img: '/img/logo/Picture13.png' },
        { name: 'Brand 14', icon: '', img: '/img/logo/Picture14.png' }
      ],
      featuresTitle: 'Why Choose Us?',
      featuresSubtitle: 'We don\'t just install panels; we build long-term energy independence for our clients with premium hardware and expert engineering.',
      features: [
        { title: 'Expert Installation', desc: 'Our certified engineers ensure every panel and wire is perfectly placed for maximum efficiency and safety.', icon: 'engineering' },
        { title: 'Premium Quality', desc: 'We only use top-tier solar panels, battery supplies, and volt switch panels from trusted global manufacturers.', icon: 'verified' },
        { title: 'Lifetime Support', desc: 'Our relationship doesn\'t end at installation. We provide ongoing maintenance and technical support for your system.', icon: 'support_agent' }
      ],
      businessNaturesTitle: 'Nature of Business',
      businessNaturesSubtitle: 'Comprehensive electrical and engineering solutions tailored to your specific requirements.',
      businessNatures: [
        { category: 'Contracting', title: 'Electrical Works', icon: 'electrical_services', desc: 'Expert contracting and sub-contracting for all types of electrical installations and wiring.' },
        { category: 'Telecommunications', title: 'Telecom Projects', icon: 'cell_tower', desc: 'Pole erection, fiber optic cable laying & fixing, cable splicing, batteries and rectifier installation.' },
        { category: 'Sustainable Energy', title: 'Solar PV Systems', icon: 'solar_power', desc: 'Design, supply, and installation of Solar PV Systems for residential, commercial, and industrial.' },
        { category: 'Power Backup', title: 'UPS Systems', icon: 'battery_charging_full', desc: 'Complete UPS supply, reliable installation, and ongoing maintenance.' },
        { category: 'HVAC', title: 'Air Conditioning', icon: 'ac_unit', desc: 'Supply, installation, and maintenance of advanced Air Conditioning Systems.' },
        { category: 'Construction', title: 'General Construction', icon: 'architecture', desc: 'Small and medium-sized construction projects and professional renovation services.' }
      ],
      portfolioTitle: 'Our Portfolio',
      projectsTitle: 'Accomplished Projects',
      projectsSubtitle: 'Explore some of our recent installations and see how we are empowering the community with clean energy.',
      projects: PORTFOLIO_PROJECTS,
      portfolioDisplayFormat: 'grid',
      proposalTitle: 'Get a Detailed Proposal',
      proposalSubtitle: 'Every roof is unique. Our engineers provide a free site visit and 3D shading analysis for precise accuracy.',
      proposalButtonText: 'Send My Details',
      ratingValue: '4.9/5',
      ratingLabel: 'Average Rating',
      projectOverviewTitle: 'Project Overview',
      galleryTitle: 'Gallery',
      gallerySubtitle: 'A Closer Look',
      videoTitle: 'Experience the Power of the Sun',
      videoDescription: 'Watch how Blucid Enterprise transforms homes and businesses with sustainable energy. Our integrated solar solutions provide reliable, cost-effective power while reducing your carbon footprint.',
      videoStats: [
        { value: '500+', label: 'Installations' },
        { value: '15MW', label: 'Clean Energy' }
      ],
      videoUrl: 'https://youbite-medical.web.app/blucid.mp4',
      testimonialsTitle: 'Testimonials',
      testimonialsSubtitle: 'What our clients say about us',
      testimonials: [
        {
          name: 'Roberto Santos',
          role: 'Homeowner, Calamba',
          quote: 'Switching to solar with Blucid was the best decision for our family. Our electric bill dropped by 80% and the installation was incredibly professional.',
          image: 'https://picsum.photos/seed/person1/100/100'
        },
        {
          name: 'Maria Clara',
          role: 'Business Owner, Real',
          quote: 'The team at Blucid handled everything from the wiring to the volt switch panels. Their technical expertise is unmatched in Laguna.',
          image: 'https://picsum.photos/seed/person2/100/100'
        },
        {
          name: 'Antonio Luna',
          role: 'Facility Manager',
          quote: 'We needed a robust battery backup system for our warehouse. Blucid delivered a high-capacity solution that has never failed us.',
          image: 'https://picsum.photos/seed/person3/100/100'
        }
      ],
      ctaTitle: 'Ready to switch to solar?',
      ctaSubtitle: 'Join hundreds of satisfied customers in Laguna who are saving thousands on their electricity bills.',
      ctaButtonText: 'Start Your Journey',
      theme: {
        primaryColor: '#00adef',
        fontFamily: 'Inter'
      }
    },
    about: {
      headerTitle: 'About Us',
      headerSubtitle: 'Our story and mission to green energy',
      bannerImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop',
      mission: 'Recognize our customer needs and provide flexibility in sourcing, competitive prices, on-time deliveries and customized solutions for their unique needs. Ensure attentive, effective and proactive customer service and personalized attention to customers. Sustain our reputation as a reliable, professional, customer-oriented, dynamic player in the market. Continually build our skills and knowledge to meet the growing and diverse needs of customers. Continuously improve our business processes leading to prompt and efficient sales and after sales services. Achieve profitable growth, operational and organizational excellence without compromising from our values and business ethics.',
      vision: 'BLUCID aims to be the preferred partner in supplying products and services for manufacturing, industrial, automotive, medical & banking industries. Being the "preferred choice" both for customers, suppliers and employees.',
      storyTitle: 'Pioneering Sustainable Energy in Laguna',
      storyParagraph: 'Founded with a vision to make clean energy accessible to everyone, Blucid Enterprise Inc. has grown into a leading provider of solar solutions in Calamba and the surrounding regions.'
    },
    contact: {
      headerTitle: 'Get In Touch',
      headerSubtitle: 'We would love to hear from you',
      bannerImage: 'https://images.unsplash.com/photo-1516387938699-a93567ec168e?q=80&w=2071&auto=format&fit=crop',
      address: '123 Solar Street, Calamba, Laguna',
      email: 'info@blucidinc.com',
      phone: '+63 912 345 6789',
      formTitle: 'Project Details',
      officeTitle: 'Our Office',
      workingHours: 'MON to FRI at 8:00 AM - 5:00 PM'
    },
    portfolio: {
      headerTitle: 'Our Portfolio',
      headerSubtitle: 'Explore our successful engineering projects, solar installations, and electrical solutions across the Philippines.',
      bannerImage: 'https://images.unsplash.com/photo-1509391366360-fe5bb65830bb?q=80&w=2070&auto=format&fit=crop',
    },
    products: {
      headerTitle: 'Our Products',
      headerSubtitle: 'High-performance solar hardware and electrical components for every installation.',
      bannerImage: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=2072&auto=format&fit=crop',
    },
    services: {
      headerTitle: 'Our Services',
      headerSubtitle: 'Comprehensive solutions for every need',
      bannerImage: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=2070&auto=format&fit=crop',
      secondaryTitle: 'Custom Wiring & Installation',
      secondaryDescription: 'Beyond solar panels, we specialize in complete wiring installation setups. Whether it\'s a new building or a retrofit, our team ensures your electrical infrastructure is robust, safe, and ready for high-efficiency energy.',
      serviceDetails: {
        'solar-installation': {
          title: 'Solar PV Systems',
          icon: 'solar_power',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyQctbPWABdXPJKsNvikAgQgGF8mU-tF2UDw&s',
          longDescription: 'Our comprehensive solar installation service is designed to provide you with a seamless transition to clean energy. We handle everything from initial site assessment to final grid connection, ensuring your system is optimized for the specific conditions of your property in Laguna.',
          benefits: [
            { title: 'Cost Savings', icon: 'payments', desc: 'Reduce your monthly electricity bills by up to 85%.' },
            { title: 'Eco-Friendly', icon: 'eco', desc: 'Significantly lower your carbon footprint.' },
            { title: 'Property Value', icon: 'trending_up', desc: 'Increase the market value of your home or business.' },
            { title: 'Energy Security', icon: 'security', desc: 'Protect yourself from rising utility costs.' }
          ],
          process: [
            { title: 'Consultation & Site Audit', desc: 'We visit your property to analyze roof orientation, shading, and energy needs.' },
            { title: 'Custom Engineering', desc: 'Our engineers design a system tailored to your specific energy profile and budget.' },
            { title: 'Professional Installation', desc: 'Our certified team installs the panels, inverters, and mounting hardware with precision.' },
            { title: 'Testing & Commissioning', desc: 'We rigorously test the system before connecting it to the grid and handing it over.' }
          ],
          faqs: [
            { q: 'How long does a typical installation take?', a: 'Most residential installations are completed within 2-3 days, while larger commercial projects can take 1-2 weeks.' },
            { q: 'Will I still have power during an outage?', a: 'Standard grid-tied systems shut down during outages for safety. To have power during an outage, you\'ll need a battery backup system.' }
          ]
        },
        'electrical-works': {
          title: 'Electrical Contracting',
          icon: 'electrical_services',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7_lL0dV4xZPt7GKHfcPdbajtWNEDqsK-VJw&s',
          longDescription: 'Expert contracting and sub-contracting for all types of electrical installations and wiring. We guarantee safety, compliance, and optimized performance for all projects.',
          benefits: [
            { title: 'Safety First', icon: 'verified_user', desc: 'All wiring is exactly to code.' },
            { title: 'Turnkey Solution', icon: 'bolt', desc: 'Everything from mapping to final approval.' }
          ],
          process: [
            { title: 'Load Analysis', desc: 'Calculate energy demands and map layout.' },
            { title: 'Installation Phase', desc: 'Secure, organized, and properly labeled deployment.' }
          ],
          faqs: [
            { q: 'Do you handle the permits?', a: 'Yes, we take care of all local permits.' }
          ]
        },
        'telecom-projects': {
          title: 'Telecom Projects',
          icon: 'cell_tower',
          image: 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?q=80&w=2000',
          longDescription: 'Comprehensive telecommunication installations including pole erection, fiber optic cable laying & fixing, cable splicing, and battery/rectifier installation.',
          benefits: [
            { title: 'High Bandwidth', icon: 'network_check', desc: 'State of the art fiber optic splicing.' },
            { title: 'Robust Backbone', icon: 'hub', desc: 'End-to-end reliable telecom infrastructure.' }
          ],
          process: [
            { title: 'Site Survey', desc: 'Determine the best layouts for telecom poles and lines.' },
            { title: 'Execution', desc: 'Laying cable, splicing, and final load tests.' }
          ],
          faqs: [
            { q: 'Do you provide maintenance?', a: 'Yes, full maintenance is available for existing networks.' }
          ]
        },
        'ups-systems': {
          title: 'UPS Systems',
          icon: 'battery_saver',
          image: 'https://roadtrek.com.au/wp-content/uploads/2022/11/web-IMG_8873-1024x819.jpg',
          longDescription: 'Reliable Uninterruptible Power Supply (UPS) supply, installation, and maintenance to avoid any downtime for critical equipment during grid failure.',
          benefits: [
            { title: 'Zero Downtime', icon: 'timer', desc: 'Instant active backup power.' },
            { title: 'Protection', icon: 'security', desc: 'Surge and spike protection for your devices.' }
          ],
          process: [
            { title: 'Load Calculation', desc: 'Determine required standard capacity.' },
            { title: 'Hardware Setup', desc: 'Rack mounting, wiring, and synthetic load testing.' }
          ],
          faqs: [
            { q: 'What is the battery lifespan?', a: 'Depending on the model, it can last 3-6 years.' }
          ]
        },
        'air-conditioning': {
          title: 'Air Conditioning Systems',
          icon: 'ac_unit',
          image: 'https://images.unsplash.com/photo-1595166258077-8fa0663db6c1?q=80&w=2000',
          longDescription: 'Complete supply, installation, and maintenance of advanced Air Conditioning systems, ensuring optimal climate control and efficiency.',
          benefits: [
            { title: 'Energy Efficiency', icon: 'eco', desc: 'Using advanced inverter compressor systems.' },
            { title: 'Comfort', icon: 'ac_unit', desc: 'Perfectly balanced climate at your fingertips.' }
          ],
          process: [
            { title: 'Layout Design', desc: 'Determine unit placements and capacity.' },
            { title: 'Installation & Maintenance', desc: 'Quick installation and regular cleaning schedules.' }
          ],
          faqs: [
            { q: 'Do you fix existing setups?', a: 'Yes, we have full diagnostic and repair capabilities.' }
          ]
        },
        'construction-renovation': {
          title: 'Construction & Renovation',
          icon: 'architecture',
          image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000',
          longDescription: 'Reliable execution of small and medium-sized construction projects, along with renovation services tailored space modifications.',
          benefits: [
            { title: 'Quality Craftsmanship', icon: 'handyman', desc: 'Impeccable details and durable building techniques.' },
            { title: 'Schedule Adherence', icon: 'event', desc: 'Strict timeline management for on-time delivery.' }
          ],
          process: [
            { title: 'Blueprint and Permits', desc: 'Finalize plans and acquire required docs.' },
            { title: 'Building Phase', desc: 'Manage trades, construction, and inspections.' }
          ],
          faqs: [
            { q: 'Is it turnkey?', a: 'Yes, we handle everything from conception to handover.' }
          ]
        }
      }
    },
    footer: {
      bannerImage: '',
      description: 'Leading the way in sustainable energy solutions. We provide high-quality solar installations and electrical services for a brighter, greener future.',
      address: 'B1 L12, Cuervo II Rd, Real, Calamba, 4027 Laguna',
      phone: '(049) 520 5780',
      email: 'info@blucidinc.com',
      schedule: 'Mon - Fri: 8:00 AM - 5:00 PM',
      copyright: '© 2018 - 2026 Blucid Enterprise Inc. All rights reserved.',
      privacyPolicy: `Welcome to Blucid Enterprise Inc. We are committed to protecting your privacy and ensuring your technical and commercial data is handled securely.

1. INFORMATION COLLECTION
We collect information necessary for trading and engineering services, including contact details, company information, and technical specifications provided for project sourcing.

2. DATA USAGE
Your information is used solely to facilitate procurement, engineering support, and customer service. We do not sell or share your data for marketing purposes.

3. SECURITY
We implement robust security measures to protect your design plans and business communications from unauthorized access.`,
      privacyLastUpdated: 'January 2024',
      privacyFontSize: '14px',
      privacyFontFamily: 'Arial',
      termsOfService: `By accessing our website, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.

1. SERVICE SCOPE
Blucid Enterprise Inc. provides trading and engineering services for manufacturing, industrial, and automotive sectors. Quotations are valid for 15 days unless specified.

2. TECHNICAL RESPONSIBILITY
While we provide engineering advice and solar system designs, local site verification and implementation safety are the responsibility of the client's registered engineers.`,
      termsLastUpdated: 'January 2024',
      termsFontSize: '14px',
      termsFontFamily: 'Arial',
      disclaimer: `The materials on Blucid Enterprise Inc.'s website are provided on an 'as is' basis. Blucid Enterprise Inc. makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties.

1. ESTIMATES VS ACTUALS
Solar energy production estimates are based on historical meteorological data and do not guarantee future performance.`,
      disclaimerLastUpdated: 'January 2024',
      disclaimerFontSize: '14px',
      disclaimerFontFamily: 'Arial',
      cookiePolicy: `We use cookies to help improve your experience of our website. This cookie policy is part of Blucid Enterprise Inc.'s privacy policy, and covers the use of cookies between your device and our site.

1. ESSENTIAL COOKIES
Necessary for secure login to the admin dashboard and project tracking features.`,
      cookieLastUpdated: 'January 2024',
      cookieFontSize: '14px',
      cookieFontFamily: 'Arial'
    },
    faq: {
      headerTitle: 'Frequently Asked Questions',
      headerSubtitle: 'Find answers to common questions',
      bannerImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop',
      questions: [
        { q: 'How much does a solar system cost?', a: 'The cost varies depending on your energy needs and the system size. We offer free assessments to provide an accurate quote.' },
        { q: 'Do you offer warranties?', a: 'Yes, all our solar panels come with a 25-year performance warranty and our workmanship is guaranteed for 5 years.' },
        { q: 'How long does installation take?', a: 'Most residential installations take 2-4 days, while commercial projects depend on the scale.' }
      ],
      ctaTitle: 'Still have questions?',
      ctaDescription: 'Can\'t find the answer you\'re looking for? Please chat to our friendly team.',
      ctaPhone: '0495205780'
    },
    system: {
      typography: {
        h1Family: 'Inter',
        h2Family: 'Inter',
        h3Family: 'Inter',
        h4Family: 'Inter',
        bodyFamily: 'Inter',
        baseFontSize: '16px'
      },
      colors: {
        bodyBackground: '#ffffff',
        buttonBackground: '#00adef',
        footerBackground: '#0f172a',
        headerBackground: '#ffffff',
        navbarBackground: '#ffffff'
      }
    }
  };

  data = signal<WebsiteData>(this.initialData);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('blucid_website_content');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          this.data.update(d => ({...d, ...parsed}));
        } catch {
          console.error('Failed to load website content');
        }
      }
    }
  }

  saveData(newData: WebsiteData) {
    this.data.set(newData);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('blucid_website_content', JSON.stringify(newData));
    }
  }

  saveDraft(draftData: WebsiteData) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('blucid_website_draft', JSON.stringify(draftData));
    }
  }

  loadDraft(): WebsiteData | null {
    if (isPlatformBrowser(this.platformId)) {
      const draft = localStorage.getItem('blucid_website_draft');
      if (draft) {
        try {
          return JSON.parse(draft) as WebsiteData;
        } catch {
          return null;
        }
      }
    }
    return null;
  }
}





