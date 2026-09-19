import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  Mic,
  MicOff,
  Sparkles,
  HelpCircle,
  Building2,
  Volume2,
  Trash2,
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { ChatMessage } from '../types';
import { connectedEntities, localKnowledgeBase } from '../data/mockData';
import { speakArabic, stopSpeaking } from '../utils/narrator';

interface AIAssistantViewProps {
  onNavigateTab: (tab: string) => void;
}

export const AIAssistantView: React.FC<AIAssistantViewProps> = ({
  onNavigateTab,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      text: 'مرحباً بك في مُعِيني! أنا مستشارك الذكي المعتمد للإجابة على استفساراتك حول كافة الخدمات والأنظمة والحقوق والتسهيلات المتاحة للأشخاص ذوي الإعاقة في المملكة العربية السعودية.',
      timestamp: 'الآن',
      responsibleEntity: {
        name: 'هيئة رعاية الأشخاص ذوي الإعاقة (APD)',
        role: 'المنظومة الوطنية الموحدة للحقوق والخدمات',
      },
    },
  ]);

  const [inputQuestion, setInputQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    'كيف أجدد بطاقة التسهيلات؟',
    'ما هي شروط تذكرة الإركاب؟',
    'حقوقي في مواقف العمل',
    'كيف أقدم على وظيفة؟',
    'كيف أحجز موعد طب؟',
    'ما هي عروض السبت البنفسجي؟',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputQuestion).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuestion('');
    setIsLoading(true);

    try {
      // Call full-stack server endpoint
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: messages.slice(-4),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const assistantMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          text: data.reply,
          timestamp: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
          responsibleEntity: data.responsibleEntity,
        };

        // Determine potential action
        const qLower = query.toLowerCase();
        if (qLower.includes('تسهيل') || qLower.includes('إركاب') || qLower.includes('بطاق')) {
          assistantMsg.suggestedAction = { label: 'فتح المحفظة الرقمية بالملف الشخصي', tabTarget: 'wallet' };
        } else if (qLower.includes('وظي') || qLower.includes('تدريب') || qLower.includes('عمل')) {
          assistantMsg.suggestedAction = { label: 'استعراض بوابة الوظائف', tabTarget: 'jobs' };
        } else if (qLower.includes('بلاغ') || qLower.includes('موقف') || qLower.includes('رصيف')) {
          assistantMsg.suggestedAction = { label: 'تقديم بلاغ في صوتك مسموع', tabTarget: 'reports' };
        } else if (qLower.includes('عرض') || qLower.includes('خصم') || qLower.includes('بنفسج')) {
          assistantMsg.suggestedAction = { label: 'استكشاف العروض والخصومات', tabTarget: 'offers' };
        }

        setMessages((prev) => [...prev, assistantMsg]);
        return;
      }
    } catch (err) {
      console.warn('API error, using local fallback:', err);
    } finally {
      setIsLoading(false);
    }

    // Local smart fallback matching
    const qLower = query.toLowerCase();
    const matched = localKnowledgeBase.find((item) =>
      item.keywords.some((k) => qLower.includes(k))
    );

    const fallbackReply = matched
      ? matched.answer
      : 'شكراً لاستفسارك. يمكنك الاستفادة من مختلف الخدمات والتسهيلات المتاحة لذوي الإعاقة عبر بوابات مُعِيني الموحدة.';

    const fallbackMsg: ChatMessage = {
      id: `bot-${Date.now()}`,
      sender: 'assistant',
      text: fallbackReply,
      timestamp: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
      responsibleEntity: matched?.entity || {
        name: 'هيئة رعاية الأشخاص ذوي الإعاقة',
        role: 'الجهة المنظمة للخدمات والأنظمة',
      },
      suggestedAction: matched?.action,
    };

    setMessages((prev) => [...prev, fallbackMsg]);
    setIsLoading(false);
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      // If Web Speech is unavailable, pick a random suggested prompt for demo
      const randomPrompt = suggestedQuestions[Math.floor(Math.random() * suggestedQuestions.length)];
      setInputQuestion(randomPrompt);
      return;
    }

    try {
      // @ts-expect-error SpeechRecognition window API
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'ar-SA';
      recognition.interimResults = false;

      setIsListening(true);
      recognition.start();

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputQuestion(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };
    } catch {
      setIsListening(false);
    }
  };

  const handleClearHistory = () => {
    stopSpeaking();
    setMessages([
      {
        id: 'msg-welcome',
        sender: 'assistant',
        text: 'تم بدء محادثة جديدة. تفضل بطرح أي سؤال حول الخدمات والحقوق والأنظمة.',
        timestamp: 'الآن',
      },
    ]);
  };

  return (
    <div id="mueeni-assistant-screen" className="space-y-4 pb-24 animate-fade-in">
      {/* Bot Welcome Card */}
      <section className="bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-900 text-white rounded-3xl p-5 shadow-md relative overflow-hidden border border-blue-500/30">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-13 h-13 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shrink-0 shadow-xs">
              <Bot className="w-7 h-7 text-cyan-300 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white">المستشار الذكي</h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-400/20 text-cyan-200 border border-cyan-300/30">
                  AI Assistant
                </span>
              </div>
              <p className="text-xs text-blue-100 mt-1 max-w-sm leading-relaxed">
                مساعدك الذكي للإجابة الفورية وتوجيهك للإجراءات والأنظمة المعتمدة في المملكة.
              </p>
            </div>
          </div>

          <button
            id="clear-chat-history-btn"
            onClick={handleClearHistory}
            title="بدء محادثة جديدة"
            aria-label="مسح المحادثة وبدء محادثة جديدة"
            className="w-9 h-9 rounded-2xl bg-white/10 hover:bg-white/20 text-blue-100 flex items-center justify-center transition-all shrink-0"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Suggested Questions Pills */}
      <section className="space-y-2">
        <div className="flex items-center gap-1.5 px-1 text-xs font-extrabold text-slate-700">
          <HelpCircle className="w-4 h-4 text-emerald-600" />
          <span>أسئلة شائعة ومقترحة:</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              className="px-3.5 py-2 rounded-2xl bg-white hover:bg-emerald-50 hover:border-emerald-400 border border-slate-200/90 text-xs font-bold text-slate-700 whitespace-nowrap shadow-2xs transition-all shrink-0 active:scale-95 flex items-center gap-1.5"
            >
              <span>{q}</span>
              <span className="text-emerald-600 text-xs font-black">؟</span>
            </button>
          ))}
        </div>
      </section>

      {/* Connected Entities Badges */}
      <section className="p-3.5 rounded-2xl bg-slate-50/90 border border-slate-200/80">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-slate-600 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-blue-600" />
            <span>الجهات الحكومية المربوطة بالمنظومة:</span>
          </span>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
            ربط حي معتمد
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {connectedEntities.map((ent, idx) => (
            <span
              key={idx}
              className="text-[10px] font-bold px-2.5 py-1 rounded-xl bg-white border border-slate-200 text-slate-700 shadow-2xs"
            >
              {ent.name}
            </span>
          ))}
        </div>
      </section>

      {/* Chat Messages List */}
      <section
        id="chat-messages-container"
        className="space-y-4 min-h-[260px] max-h-[420px] overflow-y-auto p-2"
        role="log"
        aria-live="polite"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.sender === 'user' ? 'items-end' : 'items-start'
            }`}
          >
            <div
              className={`max-w-[88%] sm:max-w-[78%] rounded-3xl p-4 shadow-2xs space-y-2.5 ${
                msg.sender === 'user'
                  ? 'bg-emerald-600 text-white rounded-bl-sm font-medium'
                  : 'bg-white text-slate-800 border border-slate-200/80 rounded-br-sm'
              }`}
            >
              <div className="flex items-center justify-between gap-3 text-[11px] opacity-80 border-b border-black/5 pb-1">
                <div className="flex items-center gap-1 font-bold">
                  {msg.sender === 'assistant' ? (
                    <>
                      <Bot className="w-3.5 h-3.5 text-emerald-600" />
                      <span>المستشار الذكي</span>
                    </>
                  ) : (
                    <span>أنت</span>
                  )}
                </div>
                <span>{msg.timestamp}</span>
              </div>

              {/* Message text with readable spacing */}
              <p className="text-sm leading-relaxed whitespace-pre-line font-medium">
                {msg.text}
              </p>

              {/* Responsible Entity Badge */}
              {msg.responsibleEntity && (
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/90 text-slate-800 text-xs flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="font-bold block text-[11px] text-slate-900 truncate">
                      الجهة المسؤولة: {msg.responsibleEntity.name}
                    </span>
                    <span className="text-[10px] text-slate-500 block truncate">
                      {msg.responsibleEntity.role}
                    </span>
                  </div>
                </div>
              )}

              {/* Action Button inside chat */}
              {msg.suggestedAction && (
                <button
                  onClick={() => onNavigateTab(msg.suggestedAction!.tabTarget || 'assistant')}
                  className="w-full mt-2 py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>{msg.suggestedAction.label}</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Read Aloud Voice Button */}
              {msg.sender === 'assistant' && (
                <div className="flex justify-end pt-1">
                  <button
                    onClick={() => speakArabic(msg.text)}
                    aria-label="قراءة الإجابة بصوت واضح"
                    className="flex items-center gap-1 text-[11px] font-bold text-slate-500 hover:text-emerald-700 transition-colors"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>استماع صوتي</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start gap-2">
            <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600 animate-spin" />
              <span className="text-xs font-bold text-slate-600">
                المستشار الذكي يحلل استفسارك ويبحث في المنظومة...
              </span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </section>

      {/* Chat Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="flex items-center gap-2 bg-white p-2 rounded-3xl border border-slate-300 shadow-sm focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-400"
      >
        <button
          type="button"
          id="assistant-voice-mic-btn"
          onClick={handleVoiceInput}
          title="التحدث صوتياً"
          aria-label="تسجيل صوتي للسؤال"
          className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all shrink-0 ${
            isListening
              ? 'bg-red-500 text-white animate-pulse'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>

        <input
          id="assistant-query-input"
          type="text"
          value={inputQuestion}
          onChange={(e) => setInputQuestion(e.target.value)}
          placeholder="اكتب سؤالك هنا (عن الحقوق، التسهيلات، الوظائف، المواعيد)..."
          className="flex-1 bg-transparent px-2 text-sm text-slate-900 font-medium placeholder:text-slate-400 outline-hidden"
          disabled={isLoading}
        />

        <button
          type="submit"
          id="assistant-send-query-btn"
          disabled={!inputQuestion.trim() || isLoading}
          aria-label="إرسال السؤال"
          className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all shrink-0 ${
            inputQuestion.trim() && !isLoading
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          <Send className="w-5 h-5 rotate-180" />
        </button>
      </form>
    </div>
  );
};
