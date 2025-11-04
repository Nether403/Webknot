/**
 * PromptEnhancement Component
 * 
 * Displays side-by-side comparison of original and AI-enhanced prompts
 * Highlights new sections and provides accept/reject/edit controls
 */

import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Sparkles, Check, X, Edit, Copy, ChevronDown, ChevronUp } from 'lucide-react';
import type { PromptEnhancement as PromptEnhancementType } from '../../types/gemini';
import { FeedbackButtons } from './FeedbackButtons';
import { getFeedbackService } from '../../services/feedbackService';

interface PromptEnhancementProps {
  enhancement: PromptEnhancementType;
  isLoading: boolean;
  onAccept: () => void;
  onReject: () => void;
  onEdit: (editedPrompt: string) => void;
  enhancementId?: string;
}

export const PromptEnhancement: React.FC<PromptEnhancementProps> = ({
  enhancement,
  isLoading,
  onAccept,
  onReject,
  onEdit,
  enhancementId = `enhancement_${Date.now()}`,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPrompt, setEditedPrompt] = useState(enhancement.enhancedPrompt);
  const [copiedOriginal, setCopiedOriginal] = useState(false);
  const [copiedEnhanced, setCopiedEnhanced] = useState(false);
  const [showOriginal, setShowOriginal] = useState(true);
  const [showEnhanced, setShowEnhanced] = useState(true);
  const [feedbackGiven, setFeedbackGiven] = useState(false);

  const handleCopyOriginal = async () => {
    try {
      await navigator.clipboard.writeText(enhancement.originalPrompt);
      setCopiedOriginal(true);
      setTimeout(() => setCopiedOriginal(false), 2000);
    } catch (error) {
      console.error('Failed to copy original prompt:', error);
    }
  };

  const handleCopyEnhanced = async () => {
    try {
      await navigator.clipboard.writeText(enhancement.enhancedPrompt);
      setCopiedEnhanced(true);
      setTimeout(() => setCopiedEnhanced(false), 2000);
    } catch (error) {
      console.error('Failed to copy enhanced prompt:', error);
    }
  };

  const handleSaveEdit = () => {
    onEdit(editedPrompt);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedPrompt(enhancement.enhancedPrompt);
    setIsEditing(false);
  };
  
  const handleAccept = () => {
    // Record acceptance feedback
    const feedbackService = getFeedbackService();
    feedbackService.recordEnhancementAction(enhancementId, true);
    setFeedbackGiven(true);
    onAccept();
  };
  
  const handleReject = () => {
    // Record rejection feedback
    const feedbackService = getFeedbackService();
    feedbackService.recordEnhancementAction(enhancementId, false);
    setFeedbackGiven(true);
    onReject();
  };

  // Highlight new sections in the enhanced prompt
  const highlightNewSections = (text: string, addedSections: string[]) => {
    if (addedSections.length === 0) return text;

    let highlightedText = text;
    
    // For each added section, wrap it in a span with highlighting
    addedSections.forEach(section => {
      // Find the section header in the text
      const sectionRegex = new RegExp(`(##\\s+${section.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[^#]*?)(?=##|$)`, 'g');
      highlightedText = highlightedText.replace(
        sectionRegex,
        '<span class="bg-teal-500/20 border-l-4 border-teal-500 pl-4 block">$1</span>'
      );
    });

    return highlightedText;
  };

  if (isLoading) {
    return (
      <div className="glass-card rounded-lg p-8">
        <div className="flex items-center justify-center gap-3">
          <div className="relative">
            <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg text-white font-medium">Enhancing your prompt with AI...</span>
            <span className="text-sm text-gray-400">This may take a moment (up to 3 seconds)</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-teal-500/20 rounded-lg">
            <Sparkles className="w-6 h-6 text-teal-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2">AI-Enhanced Prompt</h3>
            <p className="text-gray-300 mb-4">
              Your prompt has been enhanced with professional details and best practices.
            </p>
            
            {/* Improvements List */}
            {enhancement.improvements.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-semibold text-teal-400">Improvements Added:</p>
                <ul className="space-y-1">
                  {enhancement.improvements.map((improvement, index) => (
                    <li key={index} className="text-sm text-gray-300 flex items-start gap-2">
                      <Check className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" />
                      <span>{improvement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Original Prompt */}
        <div className="glass-card rounded-lg overflow-hidden">
          <div className="bg-white/5 p-4 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-white">Original Prompt</h4>
                <button
                  onClick={() => setShowOriginal(!showOriginal)}
                  className="p-1 hover:bg-white/10 rounded transition-colors"
                  aria-label={showOriginal ? 'Collapse' : 'Expand'}
                >
                  {showOriginal ? (
                    <ChevronUp className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>
              <Button
                onClick={handleCopyOriginal}
                size="sm"
                variant="ghost"
                className="text-gray-400 hover:text-white"
              >
                <Copy className="w-4 h-4 mr-2" />
                {copiedOriginal ? 'Copied!' : 'Copy'}
              </Button>
            </div>
          </div>
          {showOriginal && (
            <div className="p-4 max-h-96 overflow-y-auto">
              <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono">
                {enhancement.originalPrompt}
              </pre>
            </div>
          )}
        </div>

        {/* Enhanced Prompt */}
        <div className="glass-card rounded-lg overflow-hidden border-2 border-teal-500/30">
          <div className="bg-teal-500/10 p-4 border-b border-teal-500/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-teal-400" />
                <h4 className="font-semibold text-white">Enhanced Prompt</h4>
                <button
                  onClick={() => setShowEnhanced(!showEnhanced)}
                  className="p-1 hover:bg-white/10 rounded transition-colors"
                  aria-label={showEnhanced ? 'Collapse' : 'Expand'}
                >
                  {showEnhanced ? (
                    <ChevronUp className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>
              <Button
                onClick={handleCopyEnhanced}
                size="sm"
                variant="ghost"
                className="text-teal-400 hover:text-teal-300"
              >
                <Copy className="w-4 h-4 mr-2" />
                {copiedEnhanced ? 'Copied!' : 'Copy'}
              </Button>
            </div>
          </div>
          {showEnhanced && (
            <div className="p-4 max-h-96 overflow-y-auto">
              {isEditing ? (
                <textarea
                  value={editedPrompt}
                  onChange={(e) => setEditedPrompt(e.target.value)}
                  className="w-full h-80 bg-white/5 text-gray-300 rounded-lg p-3 font-mono text-sm border border-white/10 focus:border-teal-500 focus:outline-none resize-none"
                  placeholder="Edit your enhanced prompt..."
                />
              ) : (
                <div
                  className="text-sm text-gray-300 whitespace-pre-wrap font-mono"
                  dangerouslySetInnerHTML={{
                    __html: highlightNewSections(
                      enhancement.enhancedPrompt,
                      enhancement.addedSections
                    ),
                  }}
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center justify-center gap-4">
          {isEditing ? (
            <>
              <Button
                onClick={handleSaveEdit}
                className="bg-teal-600 hover:bg-teal-700 text-white"
              >
                <Check className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
              <Button
                onClick={handleCancelEdit}
                variant="outline"
                className="text-gray-300"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={handleAccept}
                className="bg-teal-600 hover:bg-teal-700 text-white"
              >
                <Check className="w-4 h-4 mr-2" />
                Accept Enhancement
              </Button>
              <Button
                onClick={() => setIsEditing(true)}
                variant="outline"
                className="text-gray-300"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button
                onClick={handleReject}
                variant="outline"
                className="text-gray-300"
              >
                <X className="w-4 h-4 mr-2" />
                Use Original
              </Button>
            </>
          )}
        </div>
        
        {/* Feedback Buttons */}
        {!feedbackGiven && !isEditing && (
          <FeedbackButtons
            target="enhancement"
            targetId={enhancementId}
            metadata={{
              improvementsCount: enhancement.improvements.length,
              addedSectionsCount: enhancement.addedSections.length,
            }}
          />
        )}
      </div>

      {/* Legend */}
      {enhancement.addedSections.length > 0 && (
        <div className="glass-card rounded-lg p-4">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <div className="w-4 h-4 bg-teal-500/20 border-l-4 border-teal-500" />
            <span>New sections added by AI are highlighted in teal</span>
          </div>
        </div>
      )}
    </div>
  );
};
