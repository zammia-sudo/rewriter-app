import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Controls from './components/Controls';
import ResultItem from './components/ResultItem';
import { MAX_CHARS } from './constants';
import { AppState, MappingType, ToneType } from './types';
import { rephraseText } from './services/saplingService';
import { Wand2, AlertCircle, Loader2, ArrowRight } from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    inputText: '',
    results: [],
    isLoading: false,
    error: null,
    selectedMapping: 'paraphrase',
    selectedTone: 'straightforward',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= MAX_CHARS) {
      setState(prev => ({ ...prev, inputText: text, error: null }));
    }
  };

  const handleRewrite = async () => {
    if (!state.inputText.trim()) return;

    setState(prev => ({ ...prev, isLoading: true, error: null, results: [] }));

    try {
      const results = await rephraseText({
        text: state.inputText,
        mapping: state.selectedMapping,
        tone_mapping: state.selectedMapping === 'switch_tone' ? state.selectedTone : undefined,
      });

      setState(prev => ({
        ...prev,
        isLoading: false,
        results: results,
      }));
    } catch (err: any) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: err.message || 'An unexpected error occurred while processing your request.',
      }));
    }
  };

  const setMapping = useCallback((mapping: MappingType) => {
    setState(prev => ({ ...prev, selectedMapping: mapping }));
  }, []);

  const setTone = useCallback((tone: ToneType) => {
    setState(prev => ({ ...prev, selectedTone: tone }));
  }, []);

  const charCount = state.inputText.length;
  const isOverLimit = charCount > MAX_CHARS;
  const isInputEmpty = state.inputText.trim().length === 0;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />

      <main className="flex-grow max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Input & Controls */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-slate-800">Input Text</h2>
                <span className={`text-xs font-medium px-2 py-1 rounded-md transition-colors ${
                  isOverLimit ? 'bg-red-50 text-red-600' : 
                  charCount > MAX_CHARS * 0.9 ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-500'
                }`}>
                  {charCount} / {MAX_CHARS}
                </span>
              </div>
              
              <textarea
                value={state.inputText}
                onChange={handleInputChange}
                placeholder="Paste or type your text here to rewrite it..."
                className="w-full h-48 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none transition-all text-slate-700 placeholder:text-slate-400 sm:text-sm leading-relaxed"
                spellCheck={false}
              />

              <div className="mt-6">
                <Controls 
                  selectedMapping={state.selectedMapping}
                  selectedTone={state.selectedTone}
                  onMappingChange={setMapping}
                  onToneChange={setTone}
                  disabled={state.isLoading}
                />
              </div>

              <button
                onClick={handleRewrite}
                disabled={isInputEmpty || state.isLoading}
                className={`w-full flex items-center justify-center py-3.5 px-4 rounded-xl text-white font-medium shadow-md transition-all duration-200
                  ${isInputEmpty || state.isLoading 
                    ? 'bg-slate-300 cursor-not-allowed shadow-none' 
                    : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-200 hover:-translate-y-0.5 active:translate-y-0'
                  }`}
              >
                {state.isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5 mr-2" />
                    Rewrite Text
                  </>
                )}
              </button>
            </div>
            
            <div className="hidden lg:block">
               <div className="bg-indigo-50 rounded-xl p-5 border border-indigo-100">
                  <h3 className="text-indigo-900 font-semibold text-sm mb-2">Pro Tip</h3>
                  <p className="text-indigo-700 text-xs leading-relaxed">
                    Try using the "Split Sentences" mode for complex legal or technical paragraphs to improve readability immediately.
                  </p>
               </div>
            </div>
          </div>

          {/* Right Column: Output Area */}
          <div className="lg:col-span-7">
            <div className="h-full flex flex-col">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-800">Rewritten Results</h2>
                {state.results.length > 0 && (
                  <span className="text-xs text-slate-500 font-medium">
                    {state.results.length} suggestion{state.results.length !== 1 ? 's' : ''} found
                  </span>
                )}
              </div>

              {state.error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start space-x-3 mb-6 animate-fade-in">
                  <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-medium text-red-800">Optimization Failed</h3>
                    <p className="text-sm text-red-600 mt-1">{state.error}</p>
                  </div>
                </div>
              )}

              <div className="flex-grow space-y-4">
                {state.results.length > 0 ? (
                  state.results.map((result, idx) => (
                    <ResultItem key={`${idx}-${result.substring(0, 10)}`} text={result} index={idx} />
                  ))
                ) : (
                  !state.isLoading && !state.error && (
                    <div className="h-full min-h-[300px] flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 p-8 text-center">
                      <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                        <ArrowRight className="w-6 h-6 text-slate-300" />
                      </div>
                      <h3 className="text-slate-900 font-medium mb-1">No results yet</h3>
                      <p className="text-slate-500 text-sm max-w-xs mx-auto">
                        Enter your text on the left and select a style to generate optimized variations here.
                      </p>
                    </div>
                  )
                )}
                
                {state.isLoading && (
                   <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-24 bg-white rounded-xl border border-slate-100 shadow-sm p-4 animate-pulse">
                           <div className="h-4 bg-slate-100 rounded w-3/4 mb-3"></div>
                           <div className="h-4 bg-slate-100 rounded w-1/2"></div>
                        </div>
                      ))}
                   </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white py-6">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-slate-400 text-xs">
            Powered by Sapling API • Built for enterprise productivity
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
