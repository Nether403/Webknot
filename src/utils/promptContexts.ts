/**
 * Contextual information for different project type/purpose combinations
 * Provides specific guidance, user stories, and recommendations
 */

export interface ProjectContext {
  description: string;
  userStory: string;
  targetAudience: string;
  keyGoals: string[];
  designConsiderations: string[];
  recommendedComponents: string[];
  recommendedAnimations: string[];
  suggestedPages: string[];
  primaryCTA: string;
  technicalPriorities: string[];
  accessibilityNotes: string[];
  warnings?: string[];
}

export interface CombinationValidity {
  isValid: boolean;
  reason?: string;
  alternative?: string;
}

/**
 * Validates if a project type/purpose combination makes sense
 */
export function validateCombination(projectType: string, purpose: string): CombinationValidity {
  const invalidCombinations: Record<string, string[]> = {
    'Mobile App': ['E-commerce'],
    Dashboard: ['Portfolio', 'Blog', 'Events', 'News and Entertainment'],
    'E-commerce': ['Portfolio', 'Blog', 'Education'],
    Portfolio: ['E-commerce', 'Business', 'Social Media'],
  };

  const invalid = invalidCombinations[projectType];
  if (invalid?.includes(purpose)) {
    return {
      isValid: false,
      reason: `${projectType} projects are typically not used for ${purpose} purposes`,
      alternative: getAlternativeSuggestion(projectType, purpose),
    };
  }

  return { isValid: true };
}

function getAlternativeSuggestion(projectType: string, purpose: string): string {
  const suggestions: Record<string, Record<string, string>> = {
    'Mobile App': {
      'E-commerce': 'Consider using "E-commerce" as the project type instead',
    },
    Dashboard: {
      Portfolio: 'Consider using "Portfolio" as the project type with "Business" purpose',
      Blog: 'Consider using "Website" type with "Blog" purpose',
    },
  };

  return (
    suggestions[projectType]?.[purpose] ||
    'Consider reviewing your project type and purpose selection'
  );
}

/**
 * Get contextual information for a project type/purpose combination
 */
export function getProjectContext(projectType: string, purpose: string): ProjectContext {
  const key = `${projectType}:${purpose}`;
  return contextMap[key] || getDefaultContext(projectType, purpose);
}

function getDefaultContext(projectType: string, purpose: string): ProjectContext {
  return {
    description: `A ${projectType} for ${purpose} purposes`,
    userStory: `As a user, I want a ${projectType} that serves ${purpose} needs`,
    targetAudience: 'General audience',
    keyGoals: [
      'Achieve project objectives',
      'Provide value to users',
      'Maintain quality standards',
    ],
    designConsiderations: ['User-friendly interface', 'Responsive design', 'Modern aesthetics'],
    recommendedComponents: [],
    recommendedAnimations: [],
    suggestedPages: ['Home', 'About', 'Contact'],
    primaryCTA: 'Get Started',
    technicalPriorities: ['Performance', 'Security', 'Scalability'],
    accessibilityNotes: ['WCAG 2.1 AA compliance', 'Keyboard navigation', 'Screen reader support'],
  };
}

const contextMap: Record<string, ProjectContext> = {
  'Website:Portfolio': {
    description: 'A professional portfolio website to showcase work, skills, and achievements',
    userStory:
      'As a creative professional, I want to display my best work in an engaging way that attracts potential clients and employers',
    targetAudience: 'Potential clients, employers, collaborators, and industry peers',
    keyGoals: [
      'Showcase best work with high-quality visuals',
      'Demonstrate skills and expertise',
      'Generate leads and inquiries',
      'Build professional credibility',
    ],
    designConsiderations: [
      'Visual-first design with large, high-quality images',
      'Clean, minimalist layout to let work speak for itself',
      'Smooth scrolling and transitions',
      'Mobile-responsive for viewing on all devices',
    ],
    recommendedComponents: ['carousel', 'masonry-grid', 'lightbox'],
    recommendedAnimations: ['fade-in-on-scroll', 'parallax-scroll', 'hover-lift'],
    suggestedPages: [
      'Home - Featured work and introduction',
      'Portfolio - Complete project gallery',
      'About - Background and skills',
      'Contact - Contact form and social links',
    ],
    primaryCTA: 'View My Work / Get In Touch',
    technicalPriorities: [
      'Image optimization and lazy loading',
      'Smooth animations without performance impact',
      'SEO optimization for discoverability',
    ],
    accessibilityNotes: [
      'Ensure all images have descriptive alt text',
      'Provide keyboard navigation for galleries',
      'Maintain sufficient contrast in text overlays',
    ],
  },

  'Website:Business': {
    description: 'A professional business website to establish online presence and generate leads',
    userStory:
      'As a business owner, I want a credible online presence that converts visitors into customers',
    targetAudience: 'Potential customers, business partners, investors, and stakeholders',
    keyGoals: [
      'Establish credibility and trust',
      'Generate qualified leads',
      'Showcase products/services',
      'Provide company information',
    ],
    designConsiderations: [
      'Professional, trustworthy design',
      'Clear value proposition above the fold',
      'Strategic placement of CTAs',
      'Social proof (testimonials, logos, stats)',
    ],
    recommendedComponents: ['hero-section', 'feature-grid', 'testimonial-carousel', 'contact-form'],
    recommendedAnimations: ['fade-in', 'count-up', 'slide-in'],
    suggestedPages: [
      'Home - Value proposition and overview',
      'About - Company story and team',
      'Services - Detailed offerings',
      'Contact - Multiple contact options',
    ],
    primaryCTA: 'Get Started / Request Quote / Contact Us',
    technicalPriorities: [
      'Fast page load times',
      'Lead capture forms with validation',
      'Analytics integration',
      'SEO optimization',
    ],
    accessibilityNotes: [
      'WCAG 2.1 AA compliance',
      'Clear heading hierarchy',
      'Accessible forms with proper labels',
    ],
  },

  'Website:Blog': {
    description: 'A blog website focused on publishing and sharing written content regularly',
    userStory:
      'As a content creator, I want to publish articles that engage readers and build an audience',
    targetAudience:
      'Readers interested in specific topics, subscribers, and potential collaborators',
    keyGoals: [
      'Publish high-quality content regularly',
      'Build engaged readership',
      'Establish thought leadership',
      'Grow email subscriber list',
    ],
    designConsiderations: [
      'Content-first design with excellent readability',
      'Clear typography and generous whitespace',
      'Easy navigation between posts',
      'Email subscription forms',
    ],
    recommendedComponents: ['article-card', 'category-filter', 'search-bar', 'newsletter-signup'],
    recommendedAnimations: ['fade-in', 'smooth-scroll'],
    suggestedPages: [
      'Home - Latest posts',
      'Blog Archive - All posts with filtering',
      'Individual Post Pages',
      'About - Author bio',
      'Contact',
    ],
    primaryCTA: 'Read More / Subscribe / Share',
    technicalPriorities: [
      'Fast page loads for SEO',
      'SEO optimization for each post',
      'Social sharing buttons',
      'Email integration',
      'RSS feed',
    ],
    accessibilityNotes: [
      'Excellent readability (font size, line height, contrast)',
      'Proper heading structure',
      'Alt text for all images',
    ],
  },

  'Website:E-commerce': {
    description: 'An e-commerce website for selling products or services online',
    userStory: 'As a merchant, I want to sell products online with a seamless shopping experience',
    targetAudience: 'Online shoppers, customers looking for specific products',
    keyGoals: [
      'Drive online sales',
      'Provide seamless checkout experience',
      'Build customer trust',
      'Reduce cart abandonment',
    ],
    designConsiderations: [
      'Product-focused design with high-quality images',
      'Clear pricing and availability',
      'Prominent add-to-cart buttons',
      'Trust signals (reviews, secure checkout)',
    ],
    recommendedComponents: [
      'product-grid',
      'shopping-cart',
      'product-quick-view',
      'review-stars',
      'checkout-progress',
    ],
    recommendedAnimations: ['add-to-cart', 'fade-in', 'slide-in'],
    suggestedPages: [
      'Home - Featured products',
      'Shop - Product catalog',
      'Product Detail - Individual product pages',
      'Cart - Shopping cart',
      'Checkout - Purchase flow',
      'Account - Order history',
    ],
    primaryCTA: 'Shop Now / Add to Cart / Buy Now',
    technicalPriorities: [
      'Secure payment processing',
      'Inventory management',
      'Fast product search',
      'Mobile-optimized checkout',
      'SSL certificate',
    ],
    accessibilityNotes: [
      'Accessible product filters',
      'Clear error messages in forms',
      'Keyboard-navigable checkout',
    ],
  },

  'Website:Education': {
    description: 'An educational website to teach, inform, and provide learning resources',
    userStory:
      'As an educator, I want to provide accessible learning materials that help students succeed',
    targetAudience: 'Students, learners, educators, and parents',
    keyGoals: [
      'Deliver educational content effectively',
      'Provide structured learning paths',
      'Engage learners with interactive content',
      'Build learning community',
    ],
    designConsiderations: [
      'Clear, organized information architecture',
      'Distraction-free learning environment',
      'Progress indicators',
      'Multimedia content support',
    ],
    recommendedComponents: [
      'course-card',
      'progress-bar',
      'video-player',
      'quiz-component',
      'accordion-faq',
    ],
    recommendedAnimations: ['progress-fill', 'check-mark', 'fade-in'],
    suggestedPages: [
      'Home - Course overview',
      'Courses - Learning content',
      'Resources - Downloadable materials',
      'About - Mission and instructors',
      'Community - Peer interaction',
    ],
    primaryCTA: 'Start Learning / Enroll / Download Resources',
    technicalPriorities: [
      'Video hosting and streaming',
      'User authentication',
      'Progress tracking',
      'Content management system',
      'Mobile learning support',
    ],
    accessibilityNotes: [
      'WCAG 2.1 AA compliance',
      'Captions for all video content',
      'Screen reader compatible',
      'Multiple learning modalities',
    ],
  },

  'Web App:Business': {
    description: 'A business web application to streamline operations and improve productivity',
    userStory: 'As a business user, I want a powerful tool that helps me work more efficiently',
    targetAudience: 'Business professionals, teams, managers, and administrators',
    keyGoals: [
      'Improve operational efficiency',
      'Centralize business processes',
      'Enable team collaboration',
      'Provide real-time insights',
    ],
    designConsiderations: [
      'Functional, productivity-focused UI',
      'Clear navigation and workflows',
      'Data visualization',
      'Responsive for desktop and mobile',
    ],
    recommendedComponents: [
      'data-table',
      'form-builder',
      'modal',
      'tabs',
      'dropdown-menu',
      'notification-toast',
    ],
    recommendedAnimations: ['fade', 'slide', 'loading-spinner'],
    suggestedPages: [
      'Dashboard - Key metrics',
      'Main Workspace - Core functionality',
      'Reports - Analytics',
      'Settings - Configuration',
      'User Management',
    ],
    primaryCTA: 'Get Started / Sign Up / Request Demo',
    technicalPriorities: [
      'User authentication',
      'Real-time data updates',
      'API integrations',
      'Data security',
      'Performance optimization',
    ],
    accessibilityNotes: [
      'WCAG 2.1 AA compliance',
      'Keyboard shortcuts',
      'Screen reader support',
      'Focus management',
    ],
  },

  'Dashboard:Business': {
    description: 'A business dashboard for monitoring KPIs and making data-driven decisions',
    userStory: 'As a business leader, I want real-time insights to make informed decisions quickly',
    targetAudience: 'Executives, managers, analysts, and stakeholders',
    keyGoals: [
      'Monitor key performance indicators',
      'Identify trends and anomalies',
      'Enable data-driven decisions',
      'Generate reports',
    ],
    designConsiderations: [
      'Data visualization focused',
      'Customizable widgets',
      'Real-time data updates',
      'Export capabilities',
    ],
    recommendedComponents: [
      'chart-widget',
      'stat-card',
      'data-table',
      'filter-panel',
      'date-range-picker',
    ],
    recommendedAnimations: ['count-up', 'chart-draw', 'fade-in', 'loading-skeleton'],
    suggestedPages: [
      'Overview - Key metrics',
      'Detailed Analytics',
      'Reports',
      'Settings',
      'Alerts',
    ],
    primaryCTA: 'View Details / Export Report / Configure',
    technicalPriorities: [
      'Real-time data updates',
      'Data aggregation',
      'API integrations',
      'Export functionality',
      'Role-based access',
    ],
    accessibilityNotes: [
      'Data tables with proper headers',
      'Alt text for charts',
      'Keyboard navigation',
      'Screen reader compatible data',
    ],
  },

  'E-commerce:E-commerce': {
    description: 'A comprehensive e-commerce platform for online retail business',
    userStory:
      'As an online retailer, I want a full-featured platform to sell products and manage my business',
    targetAudience: 'Online shoppers, repeat customers, wholesale buyers',
    keyGoals: [
      'Maximize online sales',
      'Provide excellent shopping experience',
      'Build customer loyalty',
      'Streamline order fulfillment',
    ],
    designConsiderations: [
      'Product-centric design',
      'Intuitive navigation and search',
      'Mobile-first shopping experience',
      'Trust and security signals',
    ],
    recommendedComponents: [
      'product-grid',
      'shopping-cart',
      'wishlist',
      'product-comparison',
      'review-system',
      'checkout-flow',
    ],
    recommendedAnimations: ['add-to-cart', 'wishlist-heart', 'loading-spinner'],
    suggestedPages: [
      'Home - Featured products',
      'Shop - Product catalog',
      'Product Pages',
      'Cart',
      'Checkout',
      'Account Dashboard',
      'Order Tracking',
    ],
    primaryCTA: 'Shop Now / Add to Cart / Checkout',
    technicalPriorities: [
      'Payment gateway integration',
      'Inventory management',
      'Order management system',
      'Shipping integration',
      'Security (PCI compliance)',
    ],
    accessibilityNotes: [
      'Accessible product filters and search',
      'Clear checkout process',
      'Error handling in forms',
      'Screen reader support',
    ],
  },

  'Portfolio:Portfolio': {
    description: 'A professional portfolio to showcase creative work and attract opportunities',
    userStory:
      'As a creative professional, I want a stunning portfolio that showcases my unique style and attracts clients',
    targetAudience: 'Potential clients, employers, creative directors, collaborators',
    keyGoals: [
      'Showcase best work prominently',
      'Demonstrate unique style and skills',
      'Generate client inquiries',
      'Stand out from competition',
    ],
    designConsiderations: [
      'Bold, memorable design that reflects personal brand',
      'Large, high-quality project imagery',
      'Case study format for projects',
      'Smooth, impressive interactions',
    ],
    recommendedComponents: [
      'project-grid',
      'project-detail-modal',
      'image-gallery',
      'testimonial-slider',
      'contact-form',
    ],
    recommendedAnimations: [
      'parallax-scroll',
      'reveal-on-scroll',
      'hover-effects',
      'smooth-page-transitions',
    ],
    suggestedPages: [
      'Home - Hero and featured work',
      'Work - Complete portfolio',
      'Project Case Studies',
      'About - Story and process',
      'Contact',
    ],
    primaryCTA: 'View Work / Hire Me / Get In Touch',
    technicalPriorities: [
      'Image optimization',
      'Fast loading despite heavy media',
      'SEO for discoverability',
      'Analytics to track engagement',
    ],
    accessibilityNotes: [
      'Alt text for all portfolio images',
      'Keyboard-accessible galleries',
      'Sufficient color contrast',
    ],
  },
};
