import { useState } from 'react';
import { FarmProfile, Message } from '../types';
import { getYieldOptimization } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';
import { Loader2, TrendingUp } from 'lucide-react';

export default function YieldOptimizerTab({ profile, setProfile, addChat }: { profile: FarmProfile, setProfile: (p: FarmProfile) => void, addChat: (m: Message) => void }) {
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState<string | null>(null);

  const handleOptimize = async () => {
    if (!profile.crop || !profile.spacing) {
      alert("Please enter the crop and spacing to get optimization advice.");
      return;
    }

    setLoading(true);
    try {
      const response = await getYieldOptimization(profile);
      setAdvice(response);
      
      addChat({
        id: Date.now().toString(),
        role: 'user',
        content: `I am growing ${profile.crop} with a spacing of ${profile.spacing}. How can I increase my yields?`,
        timestamp: Date.now()
      });
      
      addChat({
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: Date.now() + 1
      });
    } catch (error) {
      console.error(error);
      alert("Sorry, I couldn't get advice right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white dark:bg-stone-800 p-6 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-700">
        <h2 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-6 flex items-center gap-2">
          <TrendingUp className="text-green-600" />
          Yield Optimizer
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">Crop Planted</label>
            <input 
              type="text"
              value={profile.crop} 
              onChange={e => setProfile({...profile, crop: e.target.value})}
              placeholder="e.g. Maize, Beans"
              className="w-full p-3 rounded-xl border border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-900 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">Spacing Used</label>
            <input 
              type="text"
              value={profile.spacing} 
              onChange={e => setProfile({...profile, spacing: e.target.value})}
              placeholder="e.g. 1 foot apart, length of a hand"
              className="w-full p-3 rounded-xl border border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-900 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <button 
            onClick={handleOptimize}
            disabled={loading}
            className="w-full py-4 mt-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-md transition-colors flex justify-center items-center gap-2 disabled:opacity-70"
          >
            {loading ? <Loader2 className="animate-spin" /> : <TrendingUp />}
            {loading ? 'Analyzing...' : 'Increase Yields'}
          </button>
        </div>
      </div>

      {advice && (
        <div className="bg-white dark:bg-stone-800 rounded-2xl shadow-lg border border-stone-200 dark:border-stone-700 overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
          <div className="bg-green-600 dark:bg-green-700 px-6 py-4 flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-full">
              <TrendingUp className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-bold text-white">Optimization Plan</h3>
          </div>
          <div className="p-6 prose prose-stone dark:prose-invert max-w-none prose-p:leading-relaxed prose-headings:text-green-800 dark:prose-headings:text-green-400">
            <ReactMarkdown>{advice}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}
