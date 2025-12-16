import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface ResultItemProps {
  text: string;
  index: number;
}

const ResultItem: React.FC<ResultItemProps> = ({ text, index }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  return (
    <div className="group relative bg-white border border-slate-200 rounded-xl p-4 hover:border-indigo-300 hover:shadow-md transition-all duration-200 animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
      <p className="text-slate-800 leading-relaxed pr-10 text-sm sm:text-base">
        {text}
      </p>
      
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 p-2 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
        aria-label="Copy to clipboard"
        title="Copy to clipboard"
      >
        {copied ? (
          <Check className="w-4 h-4 text-emerald-500" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </button>
    </div>
  );
};

export default ResultItem;
