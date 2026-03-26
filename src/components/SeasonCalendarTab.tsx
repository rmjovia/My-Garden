import { useState } from 'react';
import { FarmProfile, Message, Region } from '../types';
import { getSeasonCalendar } from '../services/geminiService';
import { Loader2, CalendarDays, Sun, CloudRain, Cloud } from 'lucide-react';

interface MonthData {
  month: string;
  season: 'Rainy' | 'Dry' | 'Moderate';
  activities: string;
}

export default function SeasonCalendarTab({ profile, addChat }: { profile: FarmProfile, addChat: (m: Message) => void }) {
  const [loading, setLoading] = useState(false);
  const [calendarData, setCalendarData] = useState<MonthData[] | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<Region | ''>(profile.region || '');

  const regions: Region[] = ['Central', 'Eastern', 'Northern', 'Western'];

  const handleGetCalendar = async () => {
    if (!selectedRegion) {
      alert("Please select a region to view the calendar.");
      return;
    }

    setLoading(true);
    try {
      const response = await getSeasonCalendar(selectedRegion);
      const data = JSON.parse(response);
      setCalendarData(data);
      
      addChat({
        id: Date.now().toString(),
        role: 'user',
        content: `What is the season calendar for the ${selectedRegion} region?`,
        timestamp: Date.now()
      });
      
      addChat({
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Here is the season calendar for the ${selectedRegion} region. Please check the calendar view for details.`,
        timestamp: Date.now() + 1
      });
    } catch (error) {
      console.error(error);
      alert("Sorry, I couldn't get the calendar right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white dark:bg-stone-800 p-6 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-700">
        <h2 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-6 flex items-center gap-2">
          <CalendarDays className="text-green-600" />
          Season Calendar
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">Select Region</label>
            <select 
              value={selectedRegion} 
              onChange={e => setSelectedRegion(e.target.value as Region)}
              className="w-full p-3 rounded-xl border border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-900 focus:ring-2 focus:ring-green-500 outline-none"
            >
              <option value="">Choose region...</option>
              {regions.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          <button 
            onClick={handleGetCalendar}
            disabled={loading}
            className="w-full py-4 mt-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-md transition-colors flex justify-center items-center gap-2 disabled:opacity-70"
          >
            {loading ? <Loader2 className="animate-spin" /> : <CalendarDays />}
            {loading ? 'Loading...' : 'View Calendar'}
          </button>
        </div>
      </div>

      {calendarData && (
        <div className="bg-white dark:bg-stone-800 rounded-2xl shadow-lg border border-stone-200 dark:border-stone-700 overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
          <div className="bg-green-600 dark:bg-green-700 px-6 py-4 flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-full">
              <CalendarDays className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-bold text-white">Yearly Calendar: {selectedRegion}</h3>
          </div>
          <div className="p-6 bg-stone-50 dark:bg-stone-900/50">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {calendarData.map((item, idx) => (
                <div key={idx} className={`p-5 rounded-xl border shadow-sm transition-all hover:shadow-md ${
                  item.season === 'Rainy' ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800' :
                  item.season === 'Dry' ? 'bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800' :
                  'bg-white border-stone-200 dark:bg-stone-800 dark:border-stone-700'
                }`}>
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-bold text-lg text-stone-800 dark:text-stone-200">{item.month}</h4>
                    {item.season === 'Rainy' ? <CloudRain className="text-blue-500" /> :
                     item.season === 'Dry' ? <Sun className="text-amber-500" /> :
                     <Cloud className="text-stone-500" />}
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                    item.season === 'Rainy' ? 'bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-100' :
                    item.season === 'Dry' ? 'bg-amber-200 text-amber-800 dark:bg-amber-800 dark:text-amber-100' :
                    'bg-stone-200 text-stone-800 dark:bg-stone-700 dark:text-stone-200'
                  }`}>
                    {item.season}
                  </span>
                  <p className="text-sm mt-3 text-stone-700 dark:text-stone-300 leading-relaxed">{item.activities}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
