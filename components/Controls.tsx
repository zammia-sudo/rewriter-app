import React from 'react';
import { MAPPING_OPTIONS, TONE_OPTIONS } from '../constants';
import { MappingType, ToneType } from '../types';
import { Settings2, Volume2 } from 'lucide-react';

interface ControlsProps {
  selectedMapping: MappingType;
  selectedTone: ToneType;
  onMappingChange: (mapping: MappingType) => void;
  onToneChange: (tone: ToneType) => void;
  disabled?: boolean;
}

const Controls: React.FC<ControlsProps> = ({
  selectedMapping,
  selectedTone,
  onMappingChange,
  onToneChange,
  disabled
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {/* Style Selector */}
      <div className="space-y-2">
        <label className="flex items-center text-sm font-medium text-slate-700">
          <Settings2 className="w-4 h-4 mr-2 text-slate-400" />
          Rewrite Style
        </label>
        <div className="relative">
          <select
            value={selectedMapping}
            onChange={(e) => onMappingChange(e.target.value as MappingType)}
            disabled={disabled}
            className="block w-full rounded-lg border-slate-300 bg-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 px-3 border transition-colors disabled:bg-slate-50 disabled:text-slate-500 cursor-pointer"
          >
            {MAPPING_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <p className="text-xs text-slate-500 h-4">
          {MAPPING_OPTIONS.find(o => o.value === selectedMapping)?.description}
        </p>
      </div>

      {/* Tone Selector - Only visible if 'switch_tone' is selected */}
      <div className={`space-y-2 transition-opacity duration-200 ${selectedMapping === 'switch_tone' ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
        <label className="flex items-center text-sm font-medium text-slate-700">
          <Volume2 className="w-4 h-4 mr-2 text-slate-400" />
          Target Tone
        </label>
        <select
          value={selectedTone}
          onChange={(e) => onToneChange(e.target.value as ToneType)}
          disabled={disabled || selectedMapping !== 'switch_tone'}
          className="block w-full rounded-lg border-slate-300 bg-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 px-3 border transition-colors disabled:bg-slate-50 disabled:text-slate-500 cursor-pointer"
        >
          {TONE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
         <p className="text-xs text-slate-500 h-4">
          {selectedMapping === 'switch_tone' ? 'Select the desired emotional tone.' : ''}
        </p>
      </div>
    </div>
  );
};

export default Controls;
