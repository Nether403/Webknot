/**
 * TemplateSelector Component
 * 
 * Allows users to select and preview different prompt templates optimized
 * for specific AI development tools (Bolt.new, WebKnot.ai, Claude Artifacts).
 */

import React, { useState } from 'react';
import { promptTemplates, PromptTemplate } from '../../data/promptTemplates';
import { Info, Check } from 'lucide-react';

interface TemplateSelectorProps {
  selectedTemplateId: string;
  onSelectTemplate: (template: PromptTemplate) => void;
  className?: string;
}

/**
 * TemplateSelector displays available prompt templates with descriptions
 * and allows users to select the optimal template for their target AI tool.
 */
export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplateId,
  onSelectTemplate,
  className = '',
}) => {
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  const getToolIcon = (targetTool: string) => {
    switch (targetTool) {
      case 'bolt-new':
        return '⚡';
      case 'webknot-ai':
        return '💖';
      case 'claude-artifacts':
        return '🤖';
      case 'generic':
        return '🌐';
      default:
        return '📝';
    }
  };

  const getToolColor = (targetTool: string) => {
    switch (targetTool) {
      case 'bolt-new':
        return 'border-yellow-500/30 hover:border-yellow-500/50';
      case 'webknot-ai':
        return 'border-pink-500/30 hover:border-pink-500/50';
      case 'claude-artifacts':
        return 'border-purple-500/30 hover:border-purple-500/50';
      case 'generic':
        return 'border-teal-500/30 hover:border-teal-500/50';
      default:
        return 'border-gray-500/30 hover:border-gray-500/50';
    }
  };

  const getWhyThisTemplate = (template: PromptTemplate): string => {
    switch (template.targetTool) {
      case 'bolt-new':
        return 'Bolt.new works best with structured, section-based prompts that clearly separate requirements, design, and technical details. This template maximizes Bolt\'s understanding of your project structure.';
      case 'webknot-ai':
        return 'WebKnot.ai excels with conversational, natural language prompts. This template uses a friendly tone and clear intent to help WebKnot understand your vision naturally.';
      case 'claude-artifacts':
        return 'Claude Artifacts prefers concise, focused prompts with clear requirements. This template provides just enough detail for Claude to generate clean, well-documented code.';
      case 'generic':
        return 'This versatile template works well with most AI development tools. It balances structure with readability, making it a safe choice for any platform.';
      default:
        return 'This template is optimized for general use across various AI development platforms.';
    }
  };

  const getPreviewSnippet = (template: PromptTemplate): string => {
    const lines = template.template.split('\n').slice(0, 5);
    return lines.join('\n') + '\n...';
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white">Prompt Template</h3>
          <p className="text-sm text-gray-400">
            Choose a template optimized for your target AI tool
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {promptTemplates.map((template) => {
          const isSelected = template.id === selectedTemplateId;
          const toolColor = getToolColor(template.targetTool);

          return (
            <div
              key={template.id}
              className={`relative overflow-hidden rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                isSelected
                  ? 'border-teal-500 scale-[1.02]'
                  : `${toolColor} border-opacity-30`
              }`}
              onClick={() => onSelectTemplate(template)}
            >
              {/* Glass effect background */}
              <div className="absolute inset-0 glass-card" />

              {/* Content */}
              <div className="relative p-4">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{getToolIcon(template.targetTool)}</span>
                    <div>
                      <h4 className="font-semibold text-white">{template.name}</h4>
                      <p className="text-xs text-gray-400 capitalize">
                        {template.targetTool.replace('-', ' ')}
                      </p>
                    </div>
                  </div>

                  {/* Selection indicator */}
                  {isSelected && (
                    <div className="flex items-center gap-1 bg-teal-500/20 px-2 py-1 rounded-full">
                      <Check className="w-4 h-4 text-teal-400" />
                      <span className="text-xs text-teal-400 font-medium">Selected</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-gray-300 mb-3">{template.description}</p>

                {/* Preview snippet */}
                <div className="bg-gray-900/50 rounded-lg p-3 mb-3">
                  <p className="text-xs text-gray-500 mb-1 font-mono">Preview:</p>
                  <pre className="text-xs text-gray-400 font-mono whitespace-pre-wrap overflow-hidden">
                    {getPreviewSnippet(template)}
                  </pre>
                </div>

                {/* Why this template tooltip */}
                <div className="relative">
                  <button
                    className="flex items-center gap-1 text-xs text-teal-400 hover:text-teal-300 transition-colors"
                    onMouseEnter={() => setShowTooltip(template.id)}
                    onMouseLeave={() => setShowTooltip(null)}
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowTooltip(showTooltip === template.id ? null : template.id);
                    }}
                  >
                    <Info className="w-3 h-3" />
                    <span>Why this template?</span>
                  </button>

                  {/* Tooltip */}
                  {showTooltip === template.id && (
                    <div className="absolute bottom-full left-0 mb-2 w-64 z-10">
                      <div className="glass-card p-3 rounded-lg border border-teal-500/20">
                        <p className="text-xs text-gray-300">{getWhyThisTemplate(template)}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected template info */}
      {selectedTemplateId && (
        <div className="glass-card p-4 rounded-xl border border-teal-500/20">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-white mb-1">Template Applied</h4>
              <p className="text-xs text-gray-400">
                Your prompt will be formatted using the{' '}
                <span className="text-teal-400 font-medium">
                  {promptTemplates.find((t) => t.id === selectedTemplateId)?.name}
                </span>{' '}
                template. You can change this at any time.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

