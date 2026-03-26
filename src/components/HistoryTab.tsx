import { Message } from '../types';
import { History } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function HistoryTab({ chats }: { chats: Message[] }) {
  if (chats.length === 0) {
    return (
      <div className="whatsapp-bg h-[600px] flex flex-col items-center justify-center rounded-2xl border border-stone-200 dark:border-stone-700 animate-in fade-in duration-500">
        <History className="text-stone-400 mb-4" size={48} />
        <h2 className="text-xl font-bold text-stone-700 dark:text-stone-300 mb-2">No Messages Yet</h2>
        <p className="text-stone-500 dark:text-stone-400 text-center max-w-xs">
          Your conversations with the agricultural extension officer will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500 h-[calc(100vh-120px)] flex flex-col rounded-2xl overflow-hidden shadow-lg border border-stone-200 dark:border-stone-700">
      <div className="bg-[#008069] dark:bg-[#202c33] p-4 flex items-center gap-3 text-white z-10">
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shrink-0">
          <span className="font-bold text-white text-sm">AG</span>
        </div>
        <div>
          <h2 className="font-bold text-lg leading-tight">Agri Officer</h2>
          <p className="text-xs text-white/80">Uganda Extension Service</p>
        </div>
      </div>
      
      <div className="whatsapp-bg flex-1 p-4 overflow-y-auto relative">
        <div className="space-y-4">
          {chats.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] md:max-w-[75%] p-3 rounded-lg relative shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-[#d9fdd3] dark:bg-[#005c4b] text-[#111b21] dark:text-[#e9edef] rounded-tr-none' 
                  : 'bg-white dark:bg-[#202c33] text-[#111b21] dark:text-[#e9edef] rounded-tl-none'
              }`}>
                {/* Tail for WhatsApp look */}
                <div className={`absolute top-0 w-4 h-4 ${
                  msg.role === 'user' 
                    ? '-right-2 bg-[#d9fdd3] dark:bg-[#005c4b] [clip-path:polygon(0_0,0%_100%,100%_0)]' 
                    : '-left-2 bg-white dark:bg-[#202c33] [clip-path:polygon(100%_0,0_0,100%_100%)]'
                }`}></div>

                {msg.image && (
                  <div className="mb-2">
                    <img src={msg.image} alt="Uploaded plant" className="max-w-full h-auto rounded-lg max-h-64 object-cover" />
                  </div>
                )}
                <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-1 prose-headings:my-2 prose-ul:my-1 prose-li:my-0">
                  {msg.role === 'assistant' ? (
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  ) : (
                    <p className="whitespace-pre-wrap m-0">{msg.content}</p>
                  )}
                </div>
                <div className="text-[10px] text-right mt-1 opacity-60 flex justify-end items-center gap-1">
                  {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  {msg.role === 'user' && (
                    <svg viewBox="0 0 16 15" width="16" height="15" className="fill-blue-500 dark:fill-blue-400"><path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path></svg>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
