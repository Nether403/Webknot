import { LayoutOption, DesignStyle, ColorTheme, FunctionalityOption, Font } from '../types';

export const layoutOptions: LayoutOption[] = [
  {
    id: 'single-column',
    title: 'Single Column',
    description: 'Content in one vertical line, ideal for mobile or minimalist designs.',
    category: 'column'
  },
  {
    id: 'two-column',
    title: 'Two Column',
    description: 'Content split into two columns, perfect for blogs with sidebars.',
    category: 'column'
  },
  {
    id: 'three-column',
    title: 'Three Column',
    description: 'Content divided into three columns, ideal for content-rich dashboards.',
    category: 'column'
  },
  {
    id: 'grid-layout',
    title: 'Grid Layout',
    description: 'Content organized in a responsive grid system, perfect for galleries or portfolios.',
    category: 'column'
  },
  {
    id: 'asymmetrical',
    title: 'Asymmetrical Layout',
    description: 'Dynamic, uneven placement of elements for artistic and unique designs.',
    category: 'column'
  },
  {
    id: 'card-based',
    title: 'Card Based',
    description: 'Content grouped into modular cards, great for blog posts or product listings.',
    category: 'special'
  },
  {
    id: 'hero-section',
    title: 'Hero Section',
    description: 'Full-width, eye-catching area at the top, perfect for landing pages.',
    category: 'special'
  },
  {
    id: 'sticky-header',
    title: 'Sticky Header',
    description: 'Navigation that stays fixed at the top while scrolling.',
    category: 'special'
  },
  {
    id: 'footer',
    title: 'Footer',
    description: 'Bottom section for additional navigation, contact info, and site details.',
    category: 'special'
  },
  {
    id: 'sidebar',
    title: 'Sidebar Navigation',
    description: 'Side-positioned navigation menu for easy access to sections.',
    category: 'special'
  }
];

export const designStyles: DesignStyle[] = [
  {
    id: 'material-design',
    title: 'Material Design',
    description: 'Google\'s design system with depth, bold colors, and meaningful motion.'
  },
  {
    id: 'fluent-design',
    title: 'Fluent Design',
    description: 'Microsoft\'s design language featuring light, depth, motion, and material.'
  },
  {
    id: 'apple-hig',
    title: 'Apple Human Interface',
    description: 'Apple\'s design principles emphasizing clarity, deference, and depth.'
  },
  {
    id: 'minimalist',
    title: 'Minimalist',
    description: 'Clean design with essential elements only, focusing on content and functionality.'
  },
  {
    id: 'neumorphism',
    title: 'Neumorphism',
    description: 'Soft UI design with subtle shadows and depth, creating a tactile experience.'
  },
  {
    id: 'glassmorphism',
    title: 'Glassmorphism',
    description: 'Frosted glass effect with elegant blur and translucent surfaces.'
  },
  {
    id: 'digital-brutalism',
    title: 'Digital Brutalism',
    description: 'Bold, raw design with strong contrasts and unconventional layouts.'
  },
  {
    id: 'organic-design',
    title: 'Organic Design',
    description: 'Natural flowing shapes, soft elements, and biomorphic forms.'
  },
  {
    id: 'retro-futurism',
    title: 'Retro Futurism',
    description: 'Vintage aesthetics meets future technology with bold geometry.'
  }
];

export const colorThemes: ColorTheme[] = [
  {
    id: 'custom-theme',
    title: 'Custom Theme',
    description: 'Create your own unique color palette',
    colors: ['#3B82F6', '#1E40AF', '#F59E0B'],
    distribution: [40, 40, 20],
    isCustom: true
  },
  // Material Design inspired
  {
    id: 'material-blue',
    title: 'Material Blue',
    description: 'Google\'s signature blue with vibrant accents',
    colors: ['#1976D2', '#2196F3', '#BBDEFB'],
    distribution: [45, 35, 20]
  },
  {
    id: 'material-red',
    title: 'Material Red',
    description: 'Bold red with energetic highlights',
    colors: ['#D32F2F', '#F44336', '#FFCDD2'],
    distribution: [40, 40, 20]
  },
  // Fluent Design inspired
  {
    id: 'fluent-azure',
    title: 'Fluent Azure',
    description: 'Microsoft\'s modern blue with soft gradients',
    colors: ['#0078D4', '#50E6FF', '#F3F2F1'],
    distribution: [50, 25, 25]
  },
  {
    id: 'fluent-orchid',
    title: 'Fluent Orchid',
    description: 'Elegant purple with light accents',
    colors: ['#8764B8', '#C239B3', '#FAF9F8'],
    distribution: [45, 30, 25]
  },
  // Apple HIG inspired
  {
    id: 'apple-sky',
    title: 'Apple Sky',
    description: 'Clean iOS blue with subtle grays',
    colors: ['#007AFF', '#5AC8FA', '#F2F2F7'],
    distribution: [40, 30, 30]
  },
  {
    id: 'apple-graphite',
    title: 'Apple Graphite',
    description: 'Sophisticated dark gray with blue hints',
    colors: ['#1C1C1E', '#48484A', '#0A84FF'],
    distribution: [50, 30, 20]
  },
  // Minimalist palettes
  {
    id: 'monochrome-modern',
    title: 'Monochrome Modern',
    description: 'Sophisticated grayscale with blue accents',
    colors: ['#374151', '#9CA3AF', '#3B82F6'],
    distribution: [50, 30, 20]
  },
  {
    id: 'minimal-beige',
    title: 'Minimal Beige',
    description: 'Warm neutrals with subtle contrast',
    colors: ['#F5F5DC', '#D4C5B9', '#8B7355'],
    distribution: [50, 30, 20]
  },
  {
    id: 'pure-contrast',
    title: 'Pure Contrast',
    description: 'Classic black and white with gray tones',
    colors: ['#000000', '#FFFFFF', '#6B7280'],
    distribution: [40, 40, 20]
  },
  // Neumorphism palettes
  {
    id: 'soft-gray',
    title: 'Soft Gray',
    description: 'Gentle grays perfect for soft shadows',
    colors: ['#E0E5EC', '#A0AEC0', '#2D3748'],
    distribution: [60, 25, 15]
  },
  {
    id: 'cream-shadow',
    title: 'Cream Shadow',
    description: 'Warm cream tones with subtle depth',
    colors: ['#F7F3E9', '#D4C5B9', '#8B7355'],
    distribution: [55, 30, 15]
  },
  // Glassmorphism palettes
  {
    id: 'frosted-blue',
    title: 'Frosted Blue',
    description: 'Translucent blues with glass-like clarity',
    colors: ['#4A90E2', '#7CB9E8', '#E8F4F8'],
    distribution: [40, 35, 25]
  },
  {
    id: 'aurora-glass',
    title: 'Aurora Glass',
    description: 'Iridescent colors with ethereal glow',
    colors: ['#667EEA', '#764BA2', '#F093FB'],
    distribution: [35, 35, 30]
  },
  // Digital Brutalism palettes
  {
    id: 'brutal-contrast',
    title: 'Brutal Contrast',
    description: 'Stark black and white with neon punch',
    colors: ['#000000', '#FFFFFF', '#FF00FF'],
    distribution: [45, 40, 15]
  },
  {
    id: 'cyber-yellow',
    title: 'Cyber Yellow',
    description: 'Bold yellow with dark industrial tones',
    colors: ['#FFFF00', '#000000', '#FF0000'],
    distribution: [40, 45, 15]
  },
  {
    id: 'tech-neon',
    title: 'Tech Neon',
    description: 'Futuristic dark theme with neon highlights',
    colors: ['#1F2937', '#6366F1', '#00F5FF'],
    distribution: [60, 25, 15]
  },
  // Organic Design palettes
  {
    id: 'forest-green',
    title: 'Forest Green',
    description: 'Natural greens with earth tone accents',
    colors: ['#10B981', '#059669', '#D1FAE5'],
    distribution: [45, 35, 20]
  },
  {
    id: 'earth-tones',
    title: 'Earth Tones',
    description: 'Warm browns and natural beiges',
    colors: ['#8B4513', '#D2691E', '#F5DEB3'],
    distribution: [40, 35, 25]
  },
  {
    id: 'botanical-sage',
    title: 'Botanical Sage',
    description: 'Soft sage greens with natural accents',
    colors: ['#87AE73', '#B5C99A', '#F1F8E8'],
    distribution: [45, 30, 25]
  },
  {
    id: 'ocean-breeze',
    title: 'Ocean Breeze',
    description: 'Calming blues and teals inspired by the sea',
    colors: ['#0EA5E9', '#0891B2', '#F0F9FF'],
    distribution: [50, 30, 20]
  },
  // Retro Futurism palettes
  {
    id: 'retro-sunset',
    title: 'Retro Sunset',
    description: 'Vintage 80s sunset gradient',
    colors: ['#FF6B9D', '#FEC84D', '#C2FFF9'],
    distribution: [35, 35, 30]
  },
  {
    id: 'neon-nights',
    title: 'Neon Nights',
    description: 'Electric pinks and purples with dark base',
    colors: ['#0D0221', '#FF006E', '#8338EC'],
    distribution: [50, 25, 25]
  },
  {
    id: 'space-age',
    title: 'Space Age',
    description: 'Cosmic blues with metallic silver',
    colors: ['#1A1A2E', '#16213E', '#0F3460'],
    distribution: [40, 35, 25]
  },
  // Universal favorites
  {
    id: 'sunset-warmth',
    title: 'Sunset Warmth',
    description: 'Warm oranges and yellows with soft accents',
    colors: ['#F97316', '#FCD34D', '#FEF3C7'],
    distribution: [40, 35, 25]
  },
  {
    id: 'royal-purple',
    title: 'Royal Purple',
    description: 'Elegant purples with sophisticated highlights',
    colors: ['#8B5CF6', '#7C3AED', '#F3E8FF'],
    distribution: [40, 40, 20]
  },
  {
    id: 'coral-reef',
    title: 'Coral Reef',
    description: 'Vibrant coral with aqua accents',
    colors: ['#FF6B6B', '#4ECDC4', '#FFE66D'],
    distribution: [40, 35, 25]
  },
  {
    id: 'midnight-blue',
    title: 'Midnight Blue',
    description: 'Deep navy with silver and teal highlights',
    colors: ['#1E3A8A', '#3B82F6', '#E0F2FE'],
    distribution: [50, 30, 20]
  }
];

export const fonts: Font[] = [
  {
    id: 'inter',
    name: 'Inter',
    family: "'Inter', sans-serif",
    style: 'modern',
    weights: ['Light', 'Regular', 'Medium', 'Semibold', 'Bold']
  },
  {
    id: 'poppins',
    name: 'Poppins',
    family: "'Poppins', sans-serif",
    style: 'friendly',
    weights: ['Light', 'Regular', 'Medium', 'Semibold', 'Bold']
  },
  {
    id: 'roboto',
    name: 'Roboto',
    family: "'Roboto', sans-serif",
    style: 'clean',
    weights: ['Light', 'Regular', 'Medium', 'Bold']
  },
  {
    id: 'playfair',
    name: 'Playfair Display',
    family: "'Playfair Display', serif",
    style: 'elegant',
    weights: ['Regular', 'Medium', 'Semibold', 'Bold']
  },
  {
    id: 'montserrat',
    name: 'Montserrat',
    family: "'Montserrat', sans-serif",
    style: 'geometric',
    weights: ['Light', 'Regular', 'Medium', 'Semibold', 'Bold']
  },
  {
    id: 'source-sans',
    name: 'Source Sans Pro',
    family: "'Source Sans Pro', sans-serif",
    style: 'professional',
    weights: ['Light', 'Regular', 'Semibold', 'Bold']
  }
];

export const functionalityOptions: FunctionalityOption[] = [
  {
    id: 'basic-package',
    title: 'Basic Package',
    description: 'Essential features for a simple website',
    category: 'functionality',
    tier: 'basic',
    features: [
      'Contact Form',
      'Social Media Integration',
      'Basic SEO Setup',
      'Mobile Responsive Design',
      'Simple Navigation Menu',
      'Image Gallery',
      'Basic Analytics'
    ]
  },
  {
    id: 'standard-package',
    title: 'Standard Package',
    description: 'Advanced features for growing businesses',
    category: 'functionality',
    tier: 'standard',
    features: [
      'All Basic Features',
      'Blog System with CMS',
      'Newsletter Integration',
      'Custom Forms Builder',
      'Advanced Image Gallery',
      'Search Functionality',
      'User Comments System',
      'Content Management',
      'Multi-language Support',
      'Advanced SEO Tools'
    ]
  },
  {
    id: 'advanced-package',
    title: 'Advanced Package',
    description: 'Comprehensive solution for established businesses',
    category: 'functionality',
    tier: 'advanced',
    features: [
      'All Standard Features',
      'User Authentication System',
      'Role-based Access Control',
      'Advanced Analytics Dashboard',
      'API Integration Capabilities',
      'E-commerce Ready',
      'Payment Gateway Integration',
      'Inventory Management',
      'Customer Management',
      'Automated Workflows',
      'Advanced Security Features'
    ]
  },
  {
    id: 'enterprise-package',
    title: 'Enterprise Package',
    description: 'Full-featured solution for large organizations',
    category: 'functionality',
    tier: 'enterprise',
    features: [
      'All Advanced Features',
      'Custom Workflow Automation',
      'Advanced Security & Compliance',
      'Multi-tenant Architecture',
      'Advanced Reporting & Analytics',
      'Custom Integrations',
      'Priority Support',
      'White-label Options',
      'Advanced Performance Optimization',
      'Custom Feature Development'
    ]
  },
  {
    id: 'responsive-design',
    title: 'Responsive Design',
    description: 'Optimized for all screen sizes and devices',
    category: 'technical',
    features: [
      'Mobile-First Approach',
      'Fluid Layouts',
      'Responsive Images',
      'Touch-Friendly Interface',
      'Breakpoint Optimization'
    ]
  },
  {
    id: 'dark-mode',
    title: 'Dark Mode Support',
    description: 'Alternative color scheme for low-light conditions',
    category: 'technical',
    features: [
      'System Preference Detection',
      'Manual Toggle Option',
      'Persistent User Preference',
      'Optimized Color Contrast'
    ]
  },
  {
    id: 'pwa-features',
    title: 'Progressive Web App',
    description: 'Modern web app capabilities',
    category: 'technical',
    features: [
      'Offline Functionality',
      'App-like Experience',
      'Push Notifications',
      'Install Prompts'
    ]
  },
  {
    id: 'accessibility',
    title: 'Accessibility Features',
    description: 'WCAG 2.1 AA compliance and inclusive design',
    category: 'technical',
    features: [
      'Screen Reader Support',
      'Keyboard Navigation',
      'High Contrast Mode',
      'Focus Management',
      'ARIA Labels'
    ]
  }
];

export const visualTypes = [
  {
    id: 'icons',
    title: 'Icons',
    description: 'Choose your icon style',
    options: [
      { id: 'line', title: 'Line Icons', description: 'Clean and minimal line-based icons', icon: 'circle' },
      { id: 'solid', title: 'Solid Icons', description: 'Bold and filled icon style', icon: 'circle-dot' },
      { id: 'duotone', title: 'Duotone Icons', description: 'Two-toned iconic style', icon: 'circle-dashed' },
      { id: 'gradient', title: 'Gradient Icons', description: 'Modern icons with color gradients', icon: 'sparkles' }
    ]
  },
  {
    id: 'illustrations',
    title: 'Illustrations',
    description: 'Select illustration style',
    options: [
      { id: 'flat', title: 'Flat Illustrations', description: '2D illustrations with solid colors', icon: 'square' },
      { id: 'isometric', title: 'Isometric', description: '3D isometric illustration style', icon: 'box' },
      { id: '3d', title: '3D Illustrations', description: 'Realistic 3D rendered illustrations', icon: 'box' },
      { id: 'minimal', title: 'Minimal', description: 'Simple and clean illustrations', icon: 'minimize-2' }
    ]
  },
  {
    id: 'images',
    title: 'Images',
    description: 'Pick your image style',
    options: [
      { id: 'photography', title: 'Photography', description: 'High-quality photographic content', icon: 'camera' },
      { id: 'abstract', title: 'Abstract', description: 'Artistic and abstract imagery', icon: 'palette' },
      { id: 'nature', title: 'Nature', description: 'Natural landscapes and organic elements', icon: 'trees' },
      { id: 'lifestyle', title: 'Lifestyle', description: 'People and lifestyle photography', icon: 'users' }
    ]
  }
];

export const backgroundPatterns = [
  { id: 'geometric', title: 'Geometric', description: 'Regular shapes and mathematical patterns' },
  { id: 'organic', title: 'Organic', description: 'Natural flowing patterns' },
  { id: 'abstract', title: 'Abstract', description: 'Modern abstract patterns' },
  { id: 'minimal', title: 'Minimal', description: 'Simple repeating patterns' }
];

export const animationTypes = [
  {
    id: 'fade-in',
    title: 'Fade In',
    description: 'Smooth opacity transitions for content reveal'
  },
  {
    id: 'slide-up',
    title: 'Slide Up',
    description: 'Content slides up from bottom with easing'
  },
  {
    id: 'scale-in',
    title: 'Scale In',
    description: 'Elements scale from small to full size'
  },
  {
    id: 'hover-effects',
    title: 'Hover Effects',
    description: 'Interactive hover states for buttons and cards'
  },
  {
    id: 'loading-states',
    title: 'Loading States',
    description: 'Skeleton loaders and progress indicators'
  },
  {
    id: 'parallax',
    title: 'Parallax Scrolling',
    description: 'Multi-layer depth animations on scroll'
  },
  {
    id: 'micro-interactions',
    title: 'Micro Interactions',
    description: 'Subtle feedback animations for user actions'
  },
  {
    id: 'page-transitions',
    title: 'Page Transitions',
    description: 'Smooth animations between different pages'
  }
];

export const fontWeights = ['Light', 'Regular', 'Medium', 'Semibold', 'Bold'];
export const textAlignments = ['Left', 'Center', 'Right'];
export const fontSizes = ['Small', 'Medium', 'Large', 'Extra Large'];
export const lineHeights = ['Tight', 'Normal', 'Relaxed', 'Loose'];