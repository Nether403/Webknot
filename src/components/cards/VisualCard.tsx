import React from 'react';
import { 
  Circle, 
  CircleDot, 
  CircleDashed, 
  Sparkles, 
  Square, 
  Box, 
  Minimize2,
  Camera,
  Palette,
  Trees,
  Users
} from 'lucide-react';

interface VisualOption {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

interface VisualCardProps {
  type: string;
  option: VisualOption;
  selected: boolean;
  onClick: () => void;
}

const VisualCard: React.FC<VisualCardProps> = ({ type, option, selected, onClick }) => {
  const getIconImagePath = (optionId: string) => {
    const iconImageMap: Record<string, string> = {
      'line': '/Icons/line.svg',
      'solid': '/Icons/solid.png',
      'duotone': '/Icons/Duotone.svg',
      'gradient': '/Icons/Gradient.svg'
    };
    
    return iconImageMap[optionId] || null;
  };

  const getIllustrationImagePath = (optionId: string) => {
    const illustrationImageMap: Record<string, string> = {
      'flat': '/Images/Illustrations/flat.jpg',
      'isometric': '/Images/Illustrations/Isometric.jpg',
      '3d': '/Images/Illustrations/3d.jpg',
      'minimal': '/Images/Illustrations/Minimal.jpg'
    };
    
    return illustrationImageMap[optionId] || null;
  };

  const getImageStylePath = (optionId: string) => {
    const imageStyleMap: Record<string, string> = {
      'photography': '/Images/CI/Photography.jpeg',
      'abstract': '/Images/CI/abstract.jpeg',
      'nature': '/Images/CI/nature.jpeg',
      'lifestyle': '/Images/CI/lifestyle.jpeg'
    };
    
    return imageStyleMap[optionId] || null;
  };

  const getIconComponent = (iconName?: string) => {
    const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
      'circle': Circle,
      'circle-dot': CircleDot,
      'circle-dashed': CircleDashed,
      'sparkles': Sparkles,
      'square': Square,
      'box': Box,
      'minimize-2': Minimize2,
      'camera': Camera,
      'palette': Palette,
      'trees': Trees,
      'users': Users
    };
    
    return iconName ? iconMap[iconName] : null;
  };

  const renderPreview = () => {
    // For icon type, use uploaded images
    if (type === 'icons') {
      const imagePath = getIconImagePath(option.id);
      if (imagePath) {
        return (
          <div className="w-full h-full flex items-center justify-center p-4">
            <img 
              src={imagePath} 
              alt={option.title}
              className="w-full h-full object-contain"
            />
          </div>
        );
      }
    }

    // For illustration type, use uploaded images
    if (type === 'illustrations') {
      const imagePath = getIllustrationImagePath(option.id);
      if (imagePath) {
        return (
          <div className="w-full h-full flex items-center justify-center">
            <img 
              src={imagePath} 
              alt={option.title}
              className="w-full h-full object-cover"
            />
          </div>
        );
      }
    }

    // For images type, use uploaded images
    if (type === 'images') {
      const imagePath = getImageStylePath(option.id);
      if (imagePath) {
        return (
          <div className="w-full h-full flex items-center justify-center">
            <img 
              src={imagePath} 
              alt={option.title}
              className="w-full h-full object-cover"
            />
          </div>
        );
      }
    }
    
    // For other types, use Lucide icons
    const IconComponent = getIconComponent(option.icon);
    
    if (IconComponent) {
      // Render the specific icon for this option
      return (
        <div className="w-full h-full flex items-center justify-center">
          <IconComponent className="w-16 h-16 text-white/80" />
        </div>
      );
    }
    
    // Fallback for options without icons
    switch (type) {
      case 'icons':
        return (
          <div className="w-full h-full flex items-center justify-center">
            <Circle className="w-16 h-16 text-white/80" />
          </div>
        );
      case 'illustrations':
        return (
          <div className="w-full h-full flex items-center justify-center">
            <Square className="w-16 h-16 text-white/80" />
          </div>
        );
      case 'images':
        return (
          <div className="w-full h-full flex items-center justify-center">
            <Camera className="w-16 h-16 text-white/80" />
          </div>
        );
      case 'patterns':
        return (
          <div className="w-full h-full bg-black/20 p-2">
            <div className="grid grid-cols-3 grid-rows-3 gap-1 h-full">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="bg-white/10 rounded-sm" />
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-xl transition-all duration-300 cursor-pointer
        ${selected ? 'ring-2 ring-teal-500 scale-[1.02]' : 'hover:scale-[1.02]'}
      `}
    >
      <div className="absolute inset-0 glass-card" />
      
      <div className="relative p-4">
        <div className="aspect-video mb-3 bg-black/20 rounded-lg overflow-hidden">
          {renderPreview()}
        </div>
        
        <h4 className="text-lg font-semibold mb-1 text-white">{option.title}</h4>
        <p className="text-sm text-gray-300">{option.description}</p>
      </div>
    </div>
  );
};

export default VisualCard;
