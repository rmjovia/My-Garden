import { FarmProfile } from '../types';
import { Bell, Sun, CloudRain } from 'lucide-react';

export default function HomeTab({ profile }: { profile: FarmProfile }) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const calculateDaysPlanted = () => {
    if (!profile.plantingDate) return 0;
    const planted = new Date(profile.plantingDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - planted.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-green-100 dark:bg-green-900/30 p-6 rounded-2xl border border-green-200 dark:border-green-800">
        <h2 className="text-2xl font-bold text-green-800 dark:text-green-300">
          {getGreeting()}, {profile.name || 'Farmer'}!
        </h2>
        <p className="text-green-700 dark:text-green-400 mt-1">
          Welcome to My Garden. Let's grow together.
        </p>
      </div>

      {profile.crop && profile.plantingDate && (
        <div className="bg-white dark:bg-stone-800 p-6 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full text-amber-600 dark:text-amber-400">
              <Bell size={24} />
            </div>
            <h3 className="text-lg font-semibold">Weekly Prompt</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b border-stone-100 dark:border-stone-700 pb-2">
              <span className="text-stone-500 dark:text-stone-400">Crop</span>
              <span className="font-medium">{profile.crop}</span>
            </div>
            <div className="flex justify-between items-center border-b border-stone-100 dark:border-stone-700 pb-2">
              <span className="text-stone-500 dark:text-stone-400">Days Planted</span>
              <span className="font-medium">{calculateDaysPlanted()} days</span>
            </div>
            <div className="flex justify-between items-center border-b border-stone-100 dark:border-stone-700 pb-2">
              <span className="text-stone-500 dark:text-stone-400">Location</span>
              <span className="font-medium">{profile.region || 'Not set'}</span>
            </div>
            <div className="pt-2">
              <span className="text-stone-500 dark:text-stone-400 block mb-1">What you should see:</span>
              <p className="text-sm bg-stone-50 dark:bg-stone-900 p-3 rounded-lg border border-stone-100 dark:border-stone-700">
                {calculateDaysPlanted() < 10 
                  ? "You should start seeing small green shoots coming out of the soil. Make sure the soil is moist but not flooded."
                  : calculateDaysPlanted() < 42
                  ? "Your plants should be growing more leaves and getting taller. This is the time to look out for pests and consider weeding."
                  : "Your plants are maturing. Check for signs of flowering or fruiting depending on your crop."}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-stone-800 p-6 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-700">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Sun className="text-yellow-500" size={20} />
            Farm Overview
          </h3>
          {profile.region ? (
            <ul className="space-y-2 text-sm">
              <li><span className="text-stone-500">Region:</span> {profile.region}</li>
              <li><span className="text-stone-500">Land Size:</span> {profile.landSize || 'Not set'}</li>
              <li><span className="text-stone-500">Main Crop:</span> {profile.crop || 'Not set'}</li>
              <li><span className="text-stone-500">Irrigation:</span> {profile.irrigation || 'Not set'}</li>
            </ul>
          ) : (
            <p className="text-sm text-stone-500">Go to Settings or Get Advice to set up your farm profile.</p>
          )}
        </div>
        
        <div className="bg-white dark:bg-stone-800 p-6 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-700">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <CloudRain className="text-blue-500" size={20} />
            Quick Tips
          </h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-stone-600 dark:text-stone-300">
            <li>Always use certified seeds for better yields.</li>
            <li>Mulching helps keep water in the soil during dry days.</li>
            <li>Check your plants early morning for pests.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
