import { useState, useRef } from 'react';
import { FarmProfile, Message } from '../types';
import { analyzePlantImage, chatWithOfficer } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';
import { Loader2, Activity, Upload, Send, Image as ImageIcon } from 'lucide-react';

export default function GrowthMonitorTab({ profile, addChat }: { profile: FarmProfile, addChat: (m: Message) => void }) {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('');
  const [chatMessage, setChatMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const calculateStage = () => {
    if (!profile.plantingDate) return 'Unknown';
    const planted = new Date(profile.plantingDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - planted.getTime());
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (days <= 10) return 'Germination (5-10 days)';
    if (days <= 42) return 'Vegetative stage (3-6 weeks)';
    if (days <= 70) return 'Flowering';
    return 'Harvest maturity';
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMimeType(file.type);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image && !chatMessage) {
      alert("Please upload an image or type a message.");
      return;
    }

    setLoading(true);
    try {
      let response = '';
      const stage = calculateStage();

      if (image) {
        response = await analyzePlantImage(image, mimeType, profile, stage, chatMessage);
        addChat({
          id: Date.now().toString(),
          role: 'user',
          content: chatMessage || "Please analyze my plant's progress.",
          image: image,
          timestamp: Date.now()
        });
      } else {
        response = await chatWithOfficer(chatMessage, profile);
        addChat({
          id: Date.now().toString(),
          role: 'user',
          content: chatMessage,
          timestamp: Date.now()
        });
      }

      setAnalysis(response);
      
      addChat({
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: Date.now() + 1
      });
      
      setChatMessage('');
      setImage(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (error) {
      console.error(error);
      alert("Sorry, I couldn't process that right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!profile.crop || !profile.plantingDate) {
    return (
      <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-2xl border border-amber-200 dark:border-amber-800 text-center">
        <Activity className="mx-auto text-amber-500 mb-4" size={48} />
        <h2 className="text-xl font-bold text-amber-800 dark:text-amber-400 mb-2">Monitor Not Active</h2>
        <p className="text-amber-700 dark:text-amber-500">
          Please set your crop and planting date in Settings or Yield Optimizer to activate the Growth Monitor.
        </p>
      </div>
    );
  }

  const currentStage = calculateStage();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white dark:bg-stone-800 p-6 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-700">
        <h2 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-2 flex items-center gap-2">
          <Activity className="text-green-600" />
          Growth Monitor
        </h2>
        <p className="text-stone-600 dark:text-stone-400 mb-6">Tracking your {profile.crop}</p>
        
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-200 dark:border-green-800 mb-6">
          <h3 className="text-sm font-semibold text-green-800 dark:text-green-400 uppercase tracking-wider mb-1">Current Stage</h3>
          <p className="text-xl font-bold text-green-700 dark:text-green-300">{currentStage}</p>
        </div>

        <div className="space-y-4">
          <div className="border-2 border-dashed border-stone-300 dark:border-stone-600 rounded-xl p-6 text-center hover:bg-stone-50 dark:hover:bg-stone-700/50 transition-colors cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            {image ? (
              <img src={image} alt="Uploaded plant" className="max-h-48 mx-auto rounded-lg shadow-sm" />
            ) : (
              <div className="flex flex-col items-center text-stone-500 dark:text-stone-400">
                <Upload size={32} className="mb-2" />
                <p className="font-medium">Tap to upload a photo of your plant</p>
                <p className="text-xs mt-1">Take a clear picture showing the leaves and stem</p>
              </div>
            )}
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleImageUpload}
            />
          </div>

          <div className="flex gap-2">
            <input 
              type="text"
              value={chatMessage}
              onChange={e => setChatMessage(e.target.value)}
              placeholder="Ask a question or describe your plant..."
              className="flex-1 p-3 rounded-xl border border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-900 focus:ring-2 focus:ring-green-500 outline-none"
              onKeyDown={e => e.key === 'Enter' && handleAnalyze()}
            />
            <button 
              onClick={handleAnalyze}
              disabled={loading || (!image && !chatMessage)}
              className="p-3 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-md transition-colors disabled:opacity-50 flex items-center justify-center min-w-[56px]"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
            </button>
          </div>
        </div>
      </div>

      {analysis && (
        <div className="bg-white dark:bg-stone-800 rounded-2xl shadow-lg border border-stone-200 dark:border-stone-700 overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
          <div className="bg-green-600 dark:bg-green-700 px-6 py-4 flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-full">
              <Activity className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-bold text-white">Analysis & Advice</h3>
          </div>
          <div className="p-6 prose prose-stone dark:prose-invert max-w-none prose-p:leading-relaxed prose-headings:text-green-800 dark:prose-headings:text-green-400">
            <ReactMarkdown>{analysis}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}
