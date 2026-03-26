import { useState } from 'react';
import { FarmProfile, Message, Region } from '../types';
import { getFarmingAdvice } from '../services/geminiService';
import { Loader2, Sprout, Ruler, CalendarDays, Layers, TrendingUp, AlertTriangle, Leaf, AlertCircle, MessageCircle } from 'lucide-react';

interface AdviceData {
  spacing: string;
  plantingSeason: string;
  soilSuitability: string;
  marketDemand: string;
  riskAssessment: string;
  warningsAndAlternatives?: string;
  companionCrops: string;
  summary: string;
}

export default function GetAdviceTab({ profile, setProfile, addChat }: { profile: FarmProfile, setProfile: (p: FarmProfile) => void, addChat: (m: Message) => void }) {
  const [loading, setLoading] = useState(false);
  const [adviceData, setAdviceData] = useState<AdviceData | null>(null);

  const regions: Region[] = ['Central', 'Eastern', 'Northern', 'Western'];
  const crops = ['Maize', 'Beans', 'Cassava', 'Matooke', 'Coffee', 'Groundnuts', 'Tomatoes'];
  const irrigations = ['Rain-fed only', 'Watering can', 'Drip irrigation', 'Trenches/Furrows'];
  const landSizes = ['Less than 1 acre', '1-2 acres', '3-5 acres', 'More than 5 acres'];

  const handleGetAdvice = async () => {
    if (!profile.region || !profile.crop || !profile.landSize || !profile.irrigation) {
      alert("Please fill in all fields to get the best advice.");
      return;
    }

    setLoading(true);
    try {
      const response = await getFarmingAdvice(profile);
      const data = JSON.parse(response);
      setAdviceData(data);
      
      addChat({
        id: Date.now().toString(),
        role: 'user',
        content: `I need advice for growing ${profile.crop} on ${profile.landSize} in the ${profile.region} region using ${profile.irrigation}.`,
        timestamp: Date.now()
      });
      
      addChat({
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Here is your advice for ${profile.crop}:\n\n**Spacing:** ${data.spacing}\n**Season:** ${data.plantingSeason}\n**Summary:** ${data.summary}`,
        timestamp: Date.now() + 1
      });
    } catch (error) {
      console.error(error);
      alert("Sorry, I couldn't get advice right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const AdviceCard = ({ title, content, icon }: { title: string, content: string, icon: React.ReactNode }) => (
    <div className="bg-white dark:bg-stone-800 p-5 rounded-xl border border-stone-200 dark:border-stone-700 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center gap-3 mb-3">
        <div className="bg-[#e8f5e9] dark:bg-[#005c4b] p-2 rounded-full text-[#008069] dark:text-[#00a884]">
          {icon}
        </div>
        <h4 className="font-bold text-stone-800 dark:text-stone-200">{title}</h4>
      </div>
      <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">{content}</p>
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white dark:bg-stone-800 p-6 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-700">
        <h2 className="text-2xl font-bold text-[#008069] dark:text-[#00a884] mb-6 flex items-center gap-2">
          <Sprout className="text-[#008069]" />
          Get Farming Advice
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">Select Region</label>
            <select 
              value={profile.region} 
              onChange={e => setProfile({...profile, region: e.target.value as Region})}
              className="w-full p-3 rounded-xl border border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-900 focus:ring-2 focus:ring-[#008069] outline-none"
            >
              <option value="">Choose region...</option>
              {regions.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">Select Land Size</label>
            <select 
              value={profile.landSize} 
              onChange={e => setProfile({...profile, landSize: e.target.value})}
              className="w-full p-3 rounded-xl border border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-900 focus:ring-2 focus:ring-[#008069] outline-none"
            >
              <option value="">Choose land size...</option>
              {landSizes.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">Select Crop</label>
            <select 
              value={profile.crop} 
              onChange={e => setProfile({...profile, crop: e.target.value})}
              className="w-full p-3 rounded-xl border border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-900 focus:ring-2 focus:ring-[#008069] outline-none"
            >
              <option value="">Choose crop...</option>
              {crops.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">Select Irrigation Means</label>
            <select 
              value={profile.irrigation} 
              onChange={e => setProfile({...profile, irrigation: e.target.value})}
              className="w-full p-3 rounded-xl border border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-900 focus:ring-2 focus:ring-[#008069] outline-none"
            >
              <option value="">Choose irrigation...</option>
              {irrigations.map(i => <option key={i} value={i}>{i}</option>)}
            </select>
          </div>

          <button 
            onClick={handleGetAdvice}
            disabled={loading}
            className="w-full py-4 mt-4 bg-[#008069] hover:bg-[#005c4b] text-white font-bold rounded-xl shadow-md transition-colors flex justify-center items-center gap-2 disabled:opacity-70"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Sprout />}
            {loading ? 'Getting Advice...' : 'Get Advice'}
          </button>
        </div>
      </div>

      {adviceData && (
        <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-500">
          <h3 className="text-xl font-bold text-[#008069] dark:text-[#00a884] mb-4">Your Professional Advice</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AdviceCard title="Spacing" content={adviceData.spacing} icon={<Ruler size={20} />} />
            <AdviceCard title="Planting Season" content={adviceData.plantingSeason} icon={<CalendarDays size={20} />} />
            <AdviceCard title="Soil Suitability" content={adviceData.soilSuitability} icon={<Layers size={20} />} />
            <AdviceCard title="Market Demand" content={adviceData.marketDemand} icon={<TrendingUp size={20} />} />
            <AdviceCard title="Risk Assessment" content={adviceData.riskAssessment} icon={<AlertTriangle size={20} />} />
            <AdviceCard title="Companion Crops" content={adviceData.companionCrops} icon={<Leaf size={20} />} />
          </div>

          {adviceData.warningsAndAlternatives && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl shadow-sm dark:bg-red-900/20 dark:border-red-600">
              <h4 className="font-bold text-red-800 dark:text-red-400 flex items-center gap-2"><AlertCircle size={18}/> Warning & Alternatives</h4>
              <p className="text-red-700 dark:text-red-300 text-sm mt-1">{adviceData.warningsAndAlternatives}</p>
            </div>
          )}

          <div className="bg-[#008069] dark:bg-[#005c4b] text-white p-5 rounded-xl shadow-md mt-6">
            <h4 className="font-bold mb-2 flex items-center gap-2"><MessageCircle size={18}/> Local Summary</h4>
            <p className="text-green-50 dark:text-stone-200">{adviceData.summary}</p>
          </div>
        </div>
      )}
    </div>
  );
}
