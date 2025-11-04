import React from 'react';

interface LayoutCardProps {
  title: string;
  description: string;
  selected?: boolean;
  onClick: () => void;
  children?: React.ReactNode;
}

const LayoutCard: React.FC<LayoutCardProps> = ({
  title,
  description,
  selected = false,
  onClick,
  children
}) => {
  const getLayoutPreview = () => {
    switch (title) {
      case 'Single Column':
        return (
          <div className="w-16 h-16 flex items-center justify-center">
            <div className="w-6 h-16 bg-blue-500/80 rounded-md" />
          </div>
        );
      case 'Two Column':
        return (
          <div className="w-16 h-16 flex items-center justify-center gap-2">
            <div className="w-6 h-16 bg-purple-500/80 rounded-md" />
            <div className="w-6 h-16 bg-purple-500/80 rounded-md" />
          </div>
        );
      case 'Three Column':
        return (
          <div className="w-16 h-16 flex items-center justify-center gap-1">
            <div className="w-4 h-16 bg-teal-500/80 rounded-md" />
            <div className="w-4 h-16 bg-teal-500/80 rounded-md" />
            <div className="w-4 h-16 bg-teal-500/80 rounded-md" />
          </div>
        );
      case 'Grid Layout':
        return (
          <div className="w-16 h-16 grid grid-cols-2 gap-1">
            <div className="bg-pink-500/80 rounded-md" />
            <div className="bg-pink-500/80 rounded-md" />
            <div className="bg-pink-500/80 rounded-md" />
            <div className="bg-pink-500/80 rounded-md" />
          </div>
        );
      case 'Asymmetrical Layout':
        return (
          <div className="w-16 h-16 grid grid-cols-3 gap-1">
            <div className="col-span-2 bg-yellow-500/80 rounded-md" />
            <div className="bg-yellow-500/80 rounded-md" />
            <div className="bg-yellow-500/80 rounded-md" />
            <div className="col-span-2 bg-yellow-500/80 rounded-md" />
          </div>
        );
      case 'Card Based':
        return (
          <div className="w-16 h-16 grid grid-cols-2 gap-2 p-1">
            <div className="bg-indigo-500/80 rounded-md shadow-lg" />
            <div className="bg-indigo-500/80 rounded-md shadow-lg" />
            <div className="bg-indigo-500/80 rounded-md shadow-lg" />
            <div className="bg-indigo-500/80 rounded-md shadow-lg" />
          </div>
        );
      case 'Hero Section':
        return (
          <div className="w-16 h-16 flex flex-col gap-1">
            <div className="h-10 bg-gradient-to-r from-indigo-500/80 to-purple-500/80 rounded-md flex items-center justify-center">
              <div className="w-8 h-1 bg-white/60 rounded" />
            </div>
            <div className="flex-1 bg-indigo-500/40 rounded-md" />
          </div>
        );
      case 'Sticky Header':
        return (
          <div className="w-16 h-16 flex flex-col">
            <div className="h-3 bg-teal-500/80 rounded-t-md flex items-center justify-center gap-1 px-1">
              <div className="w-1 h-1 bg-white/60 rounded-full" />
              <div className="w-1 h-1 bg-white/60 rounded-full" />
              <div className="w-1 h-1 bg-white/60 rounded-full" />
            </div>
            <div className="flex-1 bg-teal-500/20 rounded-b-md" />
          </div>
        );
      case 'Footer':
        return (
          <div className="w-16 h-16 flex flex-col">
            <div className="flex-1 bg-slate-500/20 rounded-t-md" />
            <div className="h-4 bg-slate-500/80 rounded-b-md flex items-center justify-center gap-1">
              <div className="w-1 h-1 bg-white/60 rounded-full" />
              <div className="w-1 h-1 bg-white/60 rounded-full" />
              <div className="w-1 h-1 bg-white/60 rounded-full" />
            </div>
          </div>
        );
      case 'Sidebar Navigation':
        return (
          <div className="w-16 h-16 flex gap-1">
            <div className="w-4 bg-emerald-500/80 rounded-l-md flex flex-col items-center justify-center gap-1 py-2">
              <div className="w-2 h-0.5 bg-white/60 rounded" />
              <div className="w-2 h-0.5 bg-white/60 rounded" />
              <div className="w-2 h-0.5 bg-white/60 rounded" />
            </div>
            <div className="flex-1 bg-emerald-500/20 rounded-r-md" />
          </div>
        );
      default:
        return (
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-lg" />
        );
    }
  };

  return (
    <div
      className={`
        group relative overflow-hidden rounded-xl transition-all duration-300 cursor-pointer
        ${selected ? 'ring-2 ring-teal-500 scale-[1.02]' : 'hover:scale-[1.02]'}
      `}
      onClick={onClick}
    >
      <div className="absolute inset-0 glass-card" />
      
      <div className="relative p-6 flex flex-col items-center text-center z-10">
        {getLayoutPreview()}
        
        <h3 className="text-lg font-bold mt-4 mb-2 text-white">{title}</h3>
        <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
        
        {children && (
          <div className="mt-4 w-full">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default LayoutCard;
