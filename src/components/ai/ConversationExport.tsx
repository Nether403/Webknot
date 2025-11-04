/**
 * ConversationExport Component
 * 
 * Premium feature for exporting conversation history
 */

import React, { useState } from 'react';
import { Download, FileText, Lock } from 'lucide-react';
import { Button } from '../ui/Button';
import { isPremiumUser } from '../../utils/premiumTier';
import { exportConversationHistory } from '../../utils/premiumFeatures';
import { toast } from '@/hooks/use-toast';

interface ConversationExportProps {
  conversations: Array<{ role: string; content: string; timestamp: number }>;
  onUpgrade?: () => void;
}

export const ConversationExport: React.FC<ConversationExportProps> = ({
  conversations,
  onUpgrade,
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const isPremium = isPremiumUser();

  const handleExport = async () => {
    if (!isPremium) {
      // Show upgrade prompt
      if (onUpgrade) {
        onUpgrade();
      } else {
        window.dispatchEvent(new CustomEvent('show-upgrade-prompt', {
          detail: { reason: 'feature', type: 'modal' }
        }));
      }
      return;
    }

    if (conversations.length === 0) {
      toast({
        variant: 'destructive',
        title: 'No Conversations',
        description: 'There are no conversations to export.',
        duration: 3000,
      });
      return;
    }

    setIsExporting(true);

    try {
      exportConversationHistory(conversations);
      
      toast({
        title: 'Export Successful',
        description: `Exported ${conversations.length} conversation${conversations.length !== 1 ? 's' : ''} to JSON file.`,
        duration: 5000,
      });
    } catch (error) {
      console.error('[Export] Failed to export conversations:', error);
      
      toast({
        variant: 'destructive',
        title: 'Export Failed',
        description: error instanceof Error ? error.message : 'Failed to export conversations.',
        duration: 5000,
      });
    } finally {
      setIsExporting(false);
    }
  };

  if (!isPremium) {
    return (
      <div className="relative overflow-hidden rounded-lg">
        <div className="absolute inset-0 glass-card" />
        <div className="relative p-4 flex items-center gap-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
              <Lock className="w-5 h-5 text-purple-400" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white">Export Conversations</p>
            <p className="text-xs text-gray-400 mt-0.5">Premium feature</p>
          </div>
          <Button
            onClick={handleExport}
            size="sm"
            className="flex-shrink-0 bg-purple-600 hover:bg-purple-700 text-white"
          >
            Upgrade
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-lg">
      <div className="absolute inset-0 glass-card" />
      <div className="relative p-4">
        <div className="flex items-start gap-3 mb-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center">
              <FileText className="w-5 h-5 text-teal-400" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white">Export Conversation History</p>
            <p className="text-xs text-gray-400 mt-0.5">
              {conversations.length} conversation{conversations.length !== 1 ? 's' : ''} available
            </p>
          </div>
        </div>

        <Button
          onClick={handleExport}
          disabled={isExporting || conversations.length === 0}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white"
          size="sm"
        >
          {isExporting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Exporting...
            </>
          ) : (
            <>
              <Download className="w-4 h-4 mr-2" />
              Export to JSON
            </>
          )}
        </Button>

        <p className="text-xs text-gray-500 mt-2 text-center">
          Premium feature • Exports all conversations as JSON
        </p>
      </div>
    </div>
  );
};
