import { useState, useEffect } from 'react';
import { FarmProfile, Message } from './types';
import { Home, Sprout, TrendingUp, Activity, CalendarDays, Settings, History } from 'lucide-react';
import HomeTab from './components/HomeTab';
import GetAdviceTab from './components/GetAdviceTab';
import YieldOptimizerTab from './components/YieldOptimizerTab';
import GrowthMonitorTab from './components/GrowthMonitorTab';
import SeasonCalendarTab from './components/SeasonCalendarTab';
import SettingsTab from './components/SettingsTab';
import HistoryTab from './components/HistoryTab';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [profile, setProfile] = useState<FarmProfile>({
    name: '',
    region: '',
    landSize: '',
    crop: '',
    irrigation: '',
    plantingDate: '',
    spacing: '',
  });
  const [chats, setChats] = useState<Message[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');

  // Load state from localStorage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('farmProfile');
    if (savedProfile) setProfile(JSON.parse(savedProfile));
    
    const savedChats = localStorage.getItem('farmChats');
    if (savedChats) setChats(JSON.parse(savedChats));
    
    const savedTheme = localStorage.getItem('farmTheme');
    if (savedTheme) setTheme(savedTheme as any);
  }, []);

  // Save state to localStorage on change
  useEffect(() => {
    localStorage.setItem('farmProfile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('farmChats', JSON.stringify(chats));
  }, [chats]);

  useEffect(() => {
    localStorage.setItem('farmTheme', theme);
    if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const renderTab = () => {
    switch (activeTab) {
      case 'home': return <HomeTab profile={profile} />;
      case 'advice': return <GetAdviceTab profile={profile} setProfile={setProfile} addChat={addChat} />;
      case 'yield': return <YieldOptimizerTab profile={profile} setProfile={setProfile} addChat={addChat} />;
      case 'monitor': return <GrowthMonitorTab profile={profile} addChat={addChat} />;
      case 'calendar': return <SeasonCalendarTab profile={profile} addChat={addChat} />;
      case 'history': return <HistoryTab chats={chats} />;
      case 'settings': return <SettingsTab profile={profile} setProfile={setProfile} theme={theme} setTheme={setTheme} />;
      default: return <HomeTab profile={profile} />;
    }
  };

  const addChat = (message: Message) => {
    setChats(prev => [...prev, message]);
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'advice', label: 'Get Advice', icon: Sprout },
    { id: 'yield', label: 'Yield Optimizer', icon: TrendingUp },
    { id: 'monitor', label: 'Growth Monitor', icon: Activity },
  ];

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-[#111b21] text-stone-900 dark:text-stone-100 font-sans pb-20 md:pb-0 flex flex-col md:flex-row">
      
      {/* Mobile Header (WhatsApp Style) */}
      <header className="md:hidden bg-[#008069] dark:bg-[#202c33] text-white sticky top-0 z-20 shadow-md">
        <div className="p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-tight">My Garden</h1>
        </div>
        <div className="flex px-2">
          <button 
            onClick={() => setActiveTab('calendar')} 
            className={`flex-1 pb-3 text-sm font-medium text-center border-b-2 transition-colors ${activeTab === 'calendar' ? 'border-white text-white' : 'border-transparent text-white/70 hover:text-white'}`}
          >
            Calendar
          </button>
          <button 
            onClick={() => setActiveTab('history')} 
            className={`flex-1 pb-3 text-sm font-medium text-center border-b-2 transition-colors ${activeTab === 'history' ? 'border-white text-white' : 'border-transparent text-white/70 hover:text-white'}`}
          >
            History
          </button>
          <button 
            onClick={() => setActiveTab('settings')} 
            className={`flex-1 pb-3 text-sm font-medium text-center border-b-2 transition-colors ${activeTab === 'settings' ? 'border-white text-white' : 'border-transparent text-white/70 hover:text-white'}`}
          >
            Settings
          </button>
        </div>
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-[#008069] dark:bg-[#202c33] text-white min-h-screen sticky top-0">
        <div className="p-6">
          <h1 className="text-2xl font-bold tracking-tight text-white">My Garden</h1>
          <p className="text-white/70 text-sm mt-1">Uganda Extension Service</p>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === item.id ? 'bg-white/20 font-medium shadow-sm' : 'hover:bg-white/10 text-white/80'}`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
          <div className="pt-6 pb-2">
            <p className="px-4 text-xs font-semibold text-white/50 uppercase tracking-wider">More</p>
          </div>
          <button
            onClick={() => setActiveTab('calendar')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'calendar' ? 'bg-white/20 font-medium shadow-sm' : 'hover:bg-white/10 text-white/80'}`}
          >
            <CalendarDays size={20} />
            <span>Season Calendar</span>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'history' ? 'bg-white/20 font-medium shadow-sm' : 'hover:bg-white/10 text-white/80'}`}
          >
            <History size={20} />
            <span>History</span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'settings' ? 'bg-white/20 font-medium shadow-sm' : 'hover:bg-white/10 text-white/80'}`}
          >
            <Settings size={20} />
            <span>Settings</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto max-w-4xl mx-auto w-full">
        {renderTab()}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1f2c34] border-t border-stone-200 dark:border-stone-700 flex justify-around items-center p-2 pb-safe z-20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center p-2 rounded-lg min-w-[64px] transition-colors ${activeTab === item.id ? 'text-[#008069] dark:text-[#00a884]' : 'text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'}`}
          >
            <item.icon size={24} className={activeTab === item.id ? 'fill-[#008069]/20 dark:fill-[#00a884]/20' : ''} />
            <span className="text-[10px] font-medium mt-1">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
