import { FarmProfile, Region } from '../types';
import { Settings, User, MapPin, Sprout, Droplets, Calendar, Ruler, HelpCircle, BookOpen, Moon, Sun, Monitor } from 'lucide-react';

export default function SettingsTab({ profile, setProfile, theme, setTheme }: { profile: FarmProfile, setProfile: (p: FarmProfile) => void, theme: 'light' | 'dark' | 'system', setTheme: (t: 'light' | 'dark' | 'system') => void }) {
  const regions: Region[] = ['Central', 'Eastern', 'Northern', 'Western'];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white dark:bg-stone-800 p-6 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-700">
        <h2 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-6 flex items-center gap-2">
          <Settings className="text-green-600" />
          Settings
        </h2>
        
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b border-stone-100 dark:border-stone-700 pb-2">Farm Profile</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1 flex items-center gap-1"><User size={16} /> Name</label>
                <input 
                  type="text"
                  value={profile.name} 
                  onChange={e => setProfile({...profile, name: e.target.value})}
                  placeholder="Your name"
                  className="w-full p-3 rounded-xl border border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-900 focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1 flex items-center gap-1"><MapPin size={16} /> Region</label>
                <select 
                  value={profile.region} 
                  onChange={e => setProfile({...profile, region: e.target.value as Region})}
                  className="w-full p-3 rounded-xl border border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-900 focus:ring-2 focus:ring-green-500 outline-none"
                >
                  <option value="">Choose region...</option>
                  {regions.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1 flex items-center gap-1"><Sprout size={16} /> Main Crop</label>
                <input 
                  type="text"
                  value={profile.crop} 
                  onChange={e => setProfile({...profile, crop: e.target.value})}
                  placeholder="e.g. Maize"
                  className="w-full p-3 rounded-xl border border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-900 focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1 flex items-center gap-1"><Calendar size={16} /> Planting Date</label>
                <input 
                  type="date"
                  value={profile.plantingDate} 
                  onChange={e => setProfile({...profile, plantingDate: e.target.value})}
                  className="w-full p-3 rounded-xl border border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-900 focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1 flex items-center gap-1"><Droplets size={16} /> Irrigation</label>
                <input 
                  type="text"
                  value={profile.irrigation} 
                  onChange={e => setProfile({...profile, irrigation: e.target.value})}
                  placeholder="e.g. Rain-fed"
                  className="w-full p-3 rounded-xl border border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-900 focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1 flex items-center gap-1"><Ruler size={16} /> Spacing</label>
                <input 
                  type="text"
                  value={profile.spacing} 
                  onChange={e => setProfile({...profile, spacing: e.target.value})}
                  placeholder="e.g. 1 foot"
                  className="w-full p-3 rounded-xl border border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-900 focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b border-stone-100 dark:border-stone-700 pb-2">Appearance</h3>
            <div className="flex gap-4">
              <button 
                onClick={() => setTheme('light')}
                className={`flex-1 p-4 rounded-xl border flex flex-col items-center gap-2 transition-colors ${theme === 'light' ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400' : 'border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800'}`}
              >
                <Sun size={24} />
                <span className="text-sm font-medium">Light</span>
              </button>
              <button 
                onClick={() => setTheme('dark')}
                className={`flex-1 p-4 rounded-xl border flex flex-col items-center gap-2 transition-colors ${theme === 'dark' ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400' : 'border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800'}`}
              >
                <Moon size={24} />
                <span className="text-sm font-medium">Dark</span>
              </button>
              <button 
                onClick={() => setTheme('system')}
                className={`flex-1 p-4 rounded-xl border flex flex-col items-center gap-2 transition-colors ${theme === 'system' ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400' : 'border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800'}`}
              >
                <Monitor size={24} />
                <span className="text-sm font-medium">System</span>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b border-stone-100 dark:border-stone-700 pb-2">Help & Support</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between p-4 rounded-xl border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors text-left">
                <div className="flex items-center gap-3">
                  <HelpCircle className="text-stone-500" size={20} />
                  <span className="font-medium">Frequently Asked Questions</span>
                </div>
              </button>
              <button className="w-full flex items-center justify-between p-4 rounded-xl border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors text-left">
                <div className="flex items-center gap-3">
                  <BookOpen className="text-stone-500" size={20} />
                  <span className="font-medium">How to use My Garden</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
