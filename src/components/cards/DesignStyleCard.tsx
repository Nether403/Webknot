import React from 'react';
import { DesignStyle } from '../../types';

interface DesignStyleCardProps {
  style: DesignStyle;
  selected: boolean;
  onClick: () => void;
}

const DesignStyleCard: React.FC<DesignStyleCardProps> = ({ style, selected, onClick }) => {
  // Map style IDs to image filenames
  const getImagePath = (styleId: string): string | null => {
    const imageMap: Record<string, string> = {
      'apple-hig': '/Images/Design-Styles/Apple-human-interface.jpeg',
      'digital-brutalism': '/Images/Design-Styles/Brutalism2.jpeg',
      'fluent-design': '/Images/Design-Styles/Fluent.jpeg',
      'glassmorphism': '/Images/Design-Styles/GlassMorphism.jpeg',
      'minimalist': '/Images/Design-Styles/Minimalism.jpeg',
      'neumorphism': '/Images/Design-Styles/neumorphism.jpeg',
      'organic-design': '/Images/Design-Styles/Organic-design.jpeg',
      'retro-futurism': '/Images/Design-Styles/retrofuture.jpeg',
    };
    return imageMap[styleId] || null;
  };

  const renderPreview = (styleId: string) => {
    const imagePath = getImagePath(styleId);
    
    // If we have an image, use it
    if (imagePath) {
      return (
        <img 
          src={imagePath} 
          alt={style.title}
          className="w-full h-full object-cover"
        />
      );
    }
    
    // Fallback to generated previews for styles without images
    switch (styleId) {
      case 'material-design':
        return (
          <div className="grid grid-cols-2 gap-1 h-full">
            <div className="bg-blue-500/40 rounded-md shadow-lg transform hover:scale-105 transition-transform" />
            <div className="bg-purple-500/40 rounded-md shadow-lg transform hover:scale-105 transition-transform" />
            <div className="bg-teal-500/40 rounded-md shadow-lg transform hover:scale-105 transition-transform" />
            <div className="bg-pink-500/40 rounded-md shadow-lg transform hover:scale-105 transition-transform" />
          </div>
        );
      case 'retro-futurism':
        return (
          <div className="grid grid-cols-4 gap-1 h-full">
            <div className="col-span-2 bg-cyan-500/30 rounded-md" />
            <div className="bg-pink-500/30 rounded-md" />
            <div className="bg-yellow-500/30 rounded-md" />
            <div className="bg-purple-500/30 rounded-md" />
            <div className="col-span-3 bg-teal-500/30 rounded-md" />
          </div>
        );
      default:
        return (
          <div className="grid grid-cols-4 gap-1 h-full">
            <div className="col-span-2 bg-white/10 rounded-md" />
            <div className="bg-white/15 rounded-md" />
            <div className="bg-white/20 rounded-md" />
            <div className="bg-white/15 rounded-md" />
            <div className="col-span-3 bg-white/10 rounded-md" />
          </div>
        );
    }
  };

  return (
    <div
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-xl transition-all duration-300 cursor-pointer group
        ${selected ? 'ring-2 ring-teal-500 scale-[1.02]' : 'hover:scale-[1.02]'}
      `}
    >
      <div className="absolute inset-0 glass-card" />
      
      <div className="relative p-6">
        <div className="aspect-video mb-4 rounded-lg overflow-hidden bg-black/20 backdrop-blur-sm p-2">
          {renderPreview(style.id)}
        </div>
        
        <h3 className="text-lg font-bold mb-2 text-white">{style.title}</h3>
        <p className="text-gray-300 text-sm leading-relaxed">{style.description}</p>
      </div>
    </div>
  );
};

export default DesignStyleCard;
