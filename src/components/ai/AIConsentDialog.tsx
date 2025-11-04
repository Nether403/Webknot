import React, { useEffect, useState } from 'react';
import { Shield, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '../ui/Button';

export interface AIConsentDialogProps {
  onAccept?: () => void;
  onDecline?: () => void;
}

/**
 * AIConsentDialog displays a consent dialog explaining AI data usage.
 * Shows on first AI feature use and stores consent in localStorage.
 * 
 * @param onAccept - Optional callback when user accepts
 * @param onDecline - Optional callback when user declines
 */
export const AIConsentDialog: React.FC<AIConsentDialogProps> = ({ 
  onAccept, 
  onDecline 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if consent has already been given
    const consent = localStorage.getItem('lovabolt-ai-consent');
    if (!consent) {
      setIsOpen(true);
    }
  }, []);

  const handleAccept = () => {
    // Store consent in localStorage
    localStorage.setItem('lovabolt-ai-consent', JSON.stringify({
      accepted: true,
      timestamp: Date.now(),
      version: '1.0'
    }));
    
    setIsOpen(false);
    onAccept?.();
  };

  const handleDecline = () => {
    // Store decline in localStorage
    localStorage.setItem('lovabolt-ai-consent', JSON.stringify({
      accepted: false,
      timestamp: Date.now(),
      version: '1.0'
    }));
    
    setIsOpen(false);
    onDecline?.();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
      
      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl p-6">
        <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-blue-500/10 pointer-events-none" />
          
          <div className="relative p-8">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-teal-500/20 rounded-lg">
                <Shield className="w-6 h-6 text-teal-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">AI Features & Privacy</h2>
                <p className="text-sm text-gray-400">Your data, your choice</p>
              </div>
            </div>
            
            {/* Content */}
            <div className="space-y-6 text-gray-300">
              <p className="text-base">
                LovaBolt uses Google's Gemini AI to provide intelligent suggestions
                and enhance your project specifications. We want to be transparent about
                how your data is used.
              </p>
              
              {/* What we send */}
              <div className="bg-gray-800/50 p-5 rounded-lg border border-gray-700/50">
                <div className="flex items-start gap-3 mb-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-white mb-2">What we send to Google:</h3>
                    <ul className="text-sm space-y-2 text-gray-400">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-teal-500/60 rounded-full mt-1.5 flex-shrink-0" />
                        <span>Your project descriptions (anonymized and sanitized)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-teal-500/60 rounded-full mt-1.5 flex-shrink-0" />
                        <span>Design selections (no personal data)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-teal-500/60 rounded-full mt-1.5 flex-shrink-0" />
                        <span>Generated prompts (technical content only)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* What we DON'T send */}
              <div className="bg-gray-800/50 p-5 rounded-lg border border-gray-700/50">
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-white mb-2">What we DON'T send:</h3>
                    <ul className="text-sm space-y-2 text-gray-400">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mt-1.5 flex-shrink-0" />
                        <span>Personal information (names, emails, phone numbers)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mt-1.5 flex-shrink-0" />
                        <span>IP addresses or session data</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mt-1.5 flex-shrink-0" />
                        <span>Any sensitive or personally identifiable information</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Additional info */}
              <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                <p className="text-sm">
                  <span className="font-semibold text-white">You're in control:</span> You can disable AI features 
                  anytime in settings. The application will continue to work perfectly using our rule-based system.
                </p>
              </div>
              
              <p className="text-xs text-gray-400">
                By accepting, you agree to our use of AI features as described above.{' '}
                <a 
                  href="/privacy" 
                  className="text-teal-400 hover:text-teal-300 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read our Privacy Policy
                </a>
              </p>
            </div>
            
            {/* Actions */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:justify-end">
              <Button
                onClick={handleDecline}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800/50"
              >
                Decline (Use Standard Features)
              </Button>
              <Button
                onClick={handleAccept}
                className="bg-teal-600 hover:bg-teal-700 text-white"
              >
                Accept and Enable AI Features
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
