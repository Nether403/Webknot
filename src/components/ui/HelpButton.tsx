/**
 * HelpButton Component
 * 
 * A reusable help button with tooltip that links to documentation.
 * Used throughout AI components to provide contextual help.
 */

import React from 'react';
import { HelpCircle } from 'lucide-react';
import { Tooltip } from './tooltip';

export interface HelpButtonProps {
  tooltip: string;
  href: string;
  ariaLabel?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const HelpButton: React.FC<HelpButtonProps> = ({
  tooltip,
  href,
  ariaLabel = 'Learn more',
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <Tooltip content={tooltip}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="p-1 hover:bg-white/10 rounded-lg transition-colors inline-flex items-center justify-center"
        aria-label={ariaLabel}
      >
        <HelpCircle className={`${sizeClasses[size]} text-gray-400 hover:text-teal-400 transition-colors`} />
      </a>
    </Tooltip>
  );
};

export default HelpButton;
