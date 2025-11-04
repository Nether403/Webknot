/**
 * Analytics Dashboard Page
 * 
 * Standalone page to view comprehensive analytics
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ComprehensiveAnalyticsDashboard } from './ai';

export const AnalyticsDashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.2)_0%,transparent_70%)] pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
        
        {/* Dashboard */}
        <ComprehensiveAnalyticsDashboard />
      </div>
    </div>
  );
};
