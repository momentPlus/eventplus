import React, { useState, useRef, useEffect } from 'react';
import { Fingerprint, Play, Map, Rocket, Mountain, Tent, Shield, CheckCircle, XCircle, ChevronLeft, Award, Sparkles, Gamepad2, Crosshair, Power, Terminal, BrainCircuit, Volume2, VolumeX, LogOut } from 'lucide-react';

// ==========================================
// 1. قاعدة البيانات والأسئلة
// ==========================================
const quizData = {
  dinosaurs: {
    title: 'أرض الديناصورات',
    color: 'from-emerald-900 to-slate-950',
    shadow: 'shadow-emerald-500/30',
    image: '1.png',
    icon: <Tent size={48} className="text-emerald-300" />,
    questions: [
      { q: 'أين عاشت الديناصورات؟', options: ['في الفضاء', 'على الأرض', 'تحت الأرض فقط'], correct: 1 },
      { q: 'هل الديناصورات موجودة الآن؟', options: ['نعم', 'لا', 'بعضها فقط'], correct: 1 },
      { q: 'ما الذي حدث للديناصورات؟', options: ['انقرضت', 'تطورت إلى مخلوقات أخرى', 'أصبحت بشر'], correct: 0 },
      { q: 'هل كانت كل الديناصورات كبيرة الحجم؟', options: ['نعم كلها كبيرة', 'لا، بعضها صغير', 'كلها صغيرة'], correct: 1 },
      { q: 'ماذا كانت تأكل بعض الديناصورات؟', options: ['الحيوانات', 'النباتات', 'الإجابة أ و ب معاً'], correct: 2 },
      { q: 'ماذا يسمى الديناصور الذي يأكل اللحم؟', options: ['عاشب', 'لاحم', 'مائي'], correct: 1 },
    ]
  },
  rocks: {
    title: 'أرض الصخور (جيو لاند)',
    color: 'from-stone-800 to-slate-950',
    shadow: 'shadow-stone-500/30',
    image: '2.png',
    icon: <Mountain size={48} className="text-stone-300" />,
    questions: [
      { q: 'ما هي الصخور؟', options: ['مواد سائلة', 'مواد صلبة تتكون في الطبيعة', 'غازات في الهواء'], correct: 1 },
      { q: 'كم نوع رئيسي للصخور؟', options: ['نوع واحد', 'نوعان', 'ثلاثة أنواع'], correct: 2 },
      { q: 'تتكون الصخور الرسوبية من ماذا؟', options: ['تبريد الحمم', 'تراكم الرواسب', 'الهواء'], correct: 1 },
      { q: 'أين تتكون الصخور النارية؟', options: ['في الماء فقط', 'من تبريد الماجما أو الحمم', 'في الهواء'], correct: 1 },
      { q: 'ما هي الصخور المتحولة؟', options: ['صخور تتغير بسبب الحرارة والضغط', 'صخور تتكون من الماء', 'صخور من البلاستيك'], correct: 0 },
      { q: 'أي صخر يتكون من الحمم البركانية؟', options: ['صخور رسوبية', 'صخور نارية', 'صخور متحولة'], correct: 1 },
    ]
  },
  space: {
    title: 'الفضاء (مدار)',
    color: 'from-indigo-900 to-slate-950',
    shadow: 'shadow-indigo-500/30',
    image: '3.png',
    icon: <Rocket size={48} className="text-indigo-300" />,
    questions: [
      { q: 'ما هو أقرب كوكب للشمس؟', options: ['الأرض', 'عطارد', 'المريخ'], correct: 1 },
      { q: 'ما هو الكوكب المعروف بالكوكب الأحمر؟', options: ['الزهرة', 'المريخ', 'زحل'], correct: 1 },
      { q: 'كم عدد الكواكب في المجموعة الشمسية؟', options: ['7', '8', '9'], correct: 1 },
      { q: 'ما هو أكبر كوكب في المجموعة الشمسية؟', options: ['المشتري', 'الأرض', 'نبتون'], correct: 0 },
      { q: 'ما اسم القوة التي تُبقي الكواكب في مداراتها حول الشمس؟', options: ['المغناطيسية', 'الجاذبية', 'الاحتكاك'], correct: 1 },
      { q: 'كم تقريبا تستغرق الأرض للدوران حول الشمس؟', options: ['365 يوماً', '30 يوماً', '24 ساعة'], correct: 0 },
    ]
  },
  identity: {
    title: 'هوية وطن',
    color: 'from-rose-900 to-slate-950',
    shadow: 'shadow-rose-500/30',
    image: '4.png',
    icon: <Shield size={48} className="text-rose-300" />,
    questions: [
      { q: 'ماذا تعني المواطنة؟', options: ['حب الوطن وخدمته', 'السفر فقط', 'ترك البلد'], correct: 0 },
      { q: 'من واجبات المواطن في عمان؟', options: ['احترام القوانين', 'كسر القوانين', 'إهمال المدرسة'], correct: 0 },
      { q: 'من حقوق المواطن العماني؟', options: ['التعليم', 'مخالفة النظام', 'الإضرار بالمجتمع'], correct: 0 },
      { q: 'من القيم العمانية؟', options: ['التسامح والتعاون', 'الفوضى', 'الكراهية'], correct: 0 },
    ]
  },
  history: {
    title: 'صوت التاريخ',
    color: 'from-amber-900 to-slate-950',
    shadow: 'shadow-amber-500/30',
    image: '5.png',
    icon: <Award size={48} className="text-amber-300" />,
    questions: [
      { q: 'من هو مؤسس الدولة البوسعيدية في عمان؟', options: ['الإمام أحمد بن سعيد', 'السلطان قابوس', 'سعيد بن تيمور'], correct: 0 },
      { q: 'في أي مدينة تقع قلعة نزوى الشهيرة؟', options: ['مسقط', 'نزوى', 'صلالة'], correct: 1 },
      { q: 'من هو العالم العُماني المعروف في علم الفلك؟', options: ['الخليل بن أحمد الفراهيدي', 'أحمد بن ماجد', 'جابر بن زيد'], correct: 1 },
      { q: 'ماذا كان يعمل أحمد بن ماجد؟', options: ['طبيب', 'ملاح وبحار', 'شاعر'], correct: 1 },
      { q: 'من هو الإمام الذي يُعد من أوائل علماء عُمان؟', options: ['جابر بن زيد', 'أحمد بن سعيد', 'قابوس بن سعيد'], correct: 0 },
    ]
  }
};

// ==========================================
// 2. إدارة الأصوات والمؤثرات
// ==========================================
let audioCtx = null;

const initAudio = () => {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
};

export const playNavSound = (type) => {
  try {
    let audio;
    if (type === 'reset') audio = new Audio('/1.wav');
    else if (type === 'startShow') audio = new Audio('/1.wav');
    else if (type === 'nav') audio = new Audio('/2.wav');
    else if (type === 'toShow') audio = new Audio('/3.wav');

    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(e => console.log('Nav Audio error:', e));
    }
  } catch (e) {}
};

const playSound = (type, stationId = null) => {
  try {
    if (!audioCtx) return;
    const ctx = audioCtx;
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    if (type === 'correct') {
      osc.type = 'sine'; osc.frequency.setValueAtTime(600, ctx.currentTime); osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1);
      gainNode.gain.setValueAtTime(0.5, ctx.currentTime); gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      osc.start(); osc.stop(ctx.currentTime + 0.5);
    } else if (type === 'wrong') {
      osc.type = 'sawtooth'; osc.frequency.setValueAtTime(200, ctx.currentTime);
      gainNode.gain.setValueAtTime(0.3, ctx.currentTime); gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      osc.start(); osc.stop(ctx.currentTime + 0.3);
    }
  } catch(e) {}
};

const enterFullscreen = () => {
  try {
    const elem = document.documentElement;
    if (elem.requestFullscreen) elem.requestFullscreen().catch(() => {});
  } catch (e) {}
};

// ==========================================
// 3. المكون الرئيسي وإدارة الحالة العالمية
// ==========================================
export default function App() {
  const [stage, setStage] = useState('intro');
  const [activeStation, setActiveStation] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const bgMusicRef = useRef(null);

  // التحكم الذكي في موسيقى الخلفية
  useEffect(() => {
    if (!bgMusicRef.current) {
      bgMusicRef.current = new Audio('/Music Main.mp3');
      bgMusicRef.current.loop = true;
      bgMusicRef.current.volume = 0.4; 
    }

    const handleMusic = async () => {
      // الموسيقى تعمل فقط بعد تهيئة الألعاب (في شاشة القائمة والأسئلة)
      if (['quizMenu', 'quizActive'].includes(stage) && !isMuted) {
        try {
          await bgMusicRef.current.play();
        } catch(e) { console.log(e); }
      } else {
        bgMusicRef.current.pause();
      }
    };

    handleMusic();
  }, [stage, isMuted]);

  const resetApp = () => {
    playNavSound('reset'); 
    setStage('intro');
  };

  const renderStage = () => {
    switch(stage) {
      case 'intro': return <IntroScreen onComplete={() => setStage('video')} />;
      case 'video': return <VideoScreen onComplete={() => setStage('map')} onReset={resetApp} />;
      case 'map': return <MapScreen onComplete={() => setStage('quizMenu')} onReset={resetApp} />;
      case 'quizMenu': return <QuizMenu onSelect={(station) => { setActiveStation(station); setStage('quizActive'); }} onReset={resetApp} />;
      case 'quizActive': return <QuizActive stationId={activeStation} onBack={() => setStage('quizMenu')} onReset={resetApp} />;
      default: return <IntroScreen />;
    }
  };

  return (
    <div className="min-h-screen text-slate-100 font-sans dir-rtl overflow-x-hidden relative selection:bg-cyan-500/30 selection:text-cyan-200" dir="rtl">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;900&display=swap');
        * { font-family: 'Tajawal', sans-serif; }
        
        .bg-animated-gradient {
          background: linear-gradient(-45deg, #020617, #0f172a, #083344, #164e63, #020617);
          background-size: 400% 400%;
          animation: gradient-xy 25s ease infinite;
        }
        @keyframes gradient-xy { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .shake { animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both; }
        @keyframes shake { 10%, 90% { transform: translate3d(-1px, 0, 0); } 30%, 70% { transform: translate3d(-4px, 0, 0); } 40%, 60% { transform: translate3d(4px, 0, 0); } }
        .animate-slide-up { animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes sweep { 0% { transform: translateX(-100%) skewX(-15deg); } 100% { transform: translateX(200%) skewX(-15deg); } }
        .animate-float { animation: float 6s ease-in-out infinite; }
        @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-15px) rotate(5deg); } 100% { transform: translateY(0px); } }
        .animate-text-gradient { background-size: 200% auto; animation: textGradient 3s linear infinite; }
        @keyframes textGradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
      `}</style>

      {stage !== 'video' && stage !== 'quizActive' && (
        <div className="fixed inset-0 z-0 bg-animated-gradient">
          <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-cyan-900/40 rounded-full mix-blend-screen blur-[100px] animate-float"></div>
          <div className="absolute top-[20%] right-[-10%] w-[35rem] h-[35rem] bg-blue-900/40 rounded-full mix-blend-screen blur-[100px] animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-[-20%] left-[20%] w-[40rem] h-[40rem] bg-teal-900/30 rounded-full mix-blend-screen blur-[100px] animate-float" style={{animationDelay: '4s'}}></div>
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[60px]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.02]"></div>
        </div>
      )}
      
      {['quizMenu', 'quizActive'].includes(stage) && (
        <button 
          onClick={() => setIsMuted(!isMuted)} 
          className="fixed bottom-6 left-6 z-[150] p-4 bg-slate-900/80 backdrop-blur-xl border border-cyan-500/20 hover:border-cyan-400 rounded-full text-white shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all hover:scale-110 group"
          title={isMuted ? "تشغيل الموسيقى" : "كتم الموسيقى"}
        >
          {isMuted ? <VolumeX size={24} className="text-slate-400" /> : <Volume2 size={24} className="text-cyan-400 group-hover:animate-pulse" />}
        </button>
      )}

      {/* الشريط العلوي */}
      {stage !== 'video' && stage !== 'quizActive' && (
        <header className="bg-slate-900/95 backdrop-blur-3xl border-b-[3px] border-cyan-500 shadow-[0_10px_50px_rgba(6,182,212,0.2)] fixed top-0 w-full z-50 flex justify-between items-center px-4 py-4 sm:px-10">
          <div className="flex items-center gap-3 bg-white/10 p-2 rounded-2xl shadow-[0_0_15px_rgba(255,255,255,0.1)] border border-white/20 transition-all hover:border-cyan-400">
            <img src="LOGO.jpeg" alt="شعار المدرسة" className="h-12 sm:h-16 object-contain rounded-xl bg-white p-1" onError={(e)=>e.target.style.display='none'} />
          </div>
          
          <div className="flex flex-col items-center">
            <div className="bg-cyan-500/20 text-cyan-300 text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full mb-1 tracking-widest border border-cyan-500/30">
              بوابة المعرفة
            </div>
            <h1 className="font-black text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-300 to-cyan-500 tracking-wider drop-shadow-lg animate-text-gradient">
              هكرز المعرفة
            </h1>
          </div>
          
          <div className="flex items-center gap-3 bg-white/10 p-2 rounded-2xl shadow-[0_0_15px_rgba(255,255,255,0.1)] border border-white/20 transition-all hover:border-cyan-400">
            <img src="logo 1.jpg" alt="شعار مسار" className="h-12 sm:h-16 object-contain rounded-xl" onError={(e)=>e.target.style.display='none'} />
          </div>
        </header>
      )}

      <main className={`${stage === 'video' || stage === 'quizActive' ? '' : 'pt-32 pb-12'} min-h-screen flex flex-col items-center justify-center relative z-10 w-full ${stage === 'quizActive' ? 'px-0' : 'px-4 sm:px-6'}`}>
        {renderStage()}
      </main>
    </div>
  );
}

// ==========================================
// شاشة البصمة
// ==========================================
function IntroScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isPressing, setIsPressing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [countdown, setCountdown] = useState(null); 
  const intervalRef = useRef(null);
  
  const scanAudioRef = useRef(null);
  const agreeAudioRef = useRef(null);

  useEffect(() => {
    scanAudioRef.current = new Audio('/Scan.mp3');
    scanAudioRef.current.loop = true; 
    agreeAudioRef.current = new Audio('/Agree.mp3');
  }, []);

  useEffect(() => {
    if (isComplete && countdown !== null && countdown > 0) {
      const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
      return () => clearTimeout(timer);
    } else if (isComplete && countdown === 0) {
      playNavSound('toShow');
      onComplete();
    }
  }, [isComplete, countdown, onComplete]);

  const startPress = () => {
    if (isComplete) return;
    initAudio(); 
    enterFullscreen(); 
    setIsPressing(true);
    
    if (scanAudioRef.current) {
      scanAudioRef.current.currentTime = 0;
      scanAudioRef.current.play().catch(() => {});
    }
    
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const nextProgress = prev + 1.25; 
        if (nextProgress >= 100) {
          clearInterval(intervalRef.current);
          setIsPressing(false);
          setIsComplete(true);
          setCountdown(5); 
          
          if (scanAudioRef.current) scanAudioRef.current.pause();
          if (agreeAudioRef.current) agreeAudioRef.current.play().catch(() => {});
          
          return 100;
        }
        return nextProgress; 
      });
    }, 25);
  };

  const stopPress = () => {
    if (isComplete) return;
    setIsPressing(false);
    clearInterval(intervalRef.current); 
    setProgress(0); 
    if (scanAudioRef.current) { scanAudioRef.current.pause(); scanAudioRef.current.currentTime = 0; }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl p-8 text-center animate-slide-up relative">
      
      <div className="mb-10 flex flex-col items-center justify-center relative animate-float">
        <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-[80px] pointer-events-none"></div>
        <img src="logo 1.jpg" alt="مسار" className="w-64 h-64 sm:w-80 sm:h-80 object-contain drop-shadow-[0_20px_40px_rgba(6,182,212,0.4)] z-10" />
      </div>

      <div className="relative flex flex-col items-center justify-center w-full h-80 mt-4">
        {!isComplete ? (
          <div className="relative z-10 flex items-center justify-center cursor-pointer select-none group w-72 h-72"
               onPointerDown={startPress} onPointerUp={stopPress} onPointerLeave={stopPress}
               onTouchStart={startPress} onTouchEnd={stopPress}>
            
            {isPressing && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="absolute w-[120%] h-[120%] rounded-full border border-cyan-500/40 animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
                <div className="absolute w-[140%] h-[140%] rounded-full border border-teal-500/20 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" style={{animationDelay: '0.5s'}}></div>
                <div className="absolute w-[105%] h-[105%] rounded-full border-2 border-dashed border-cyan-400/50 animate-[spin_4s_linear_infinite]"></div>
              </div>
            )}

            <div className={`absolute inset-0 rounded-full transition-all duration-500 blur-3xl pointer-events-none ${isPressing ? 'bg-cyan-500/40 scale-125' : 'bg-transparent'}`}></div>
            
            <Fingerprint size={220} strokeWidth={1} className={`relative z-10 transition-colors duration-500 ${isPressing ? 'text-slate-800' : 'text-slate-600 group-hover:text-slate-400'} drop-shadow-2xl`} />
            
            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none" style={{ clipPath: `inset(${100 - progress}% 0 0 0)` }}>
              <Fingerprint size={220} strokeWidth={1.5} className="text-cyan-400 drop-shadow-[0_0_30px_rgba(6,182,212,1)]" />
            </div>

            {isPressing && progress > 0 && progress < 100 && (
              <div className="absolute w-[95%] h-[3px] bg-cyan-100 shadow-[0_0_20px_rgba(6,182,212,1),_0_0_10px_rgba(255,255,255,1)] z-30 rounded-full" style={{ bottom: `${progress}%`, left: '2.5%' }}></div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center animate-fade-in scale-110 cursor-pointer" onClick={() => { setCountdown(0); }}>
            <div className="relative flex items-center justify-center w-40 h-40 rounded-full bg-cyan-900/40 border-4 border-cyan-400 shadow-[0_0_40px_rgba(6,182,212,0.6)] group">
              <span className="text-7xl font-black text-cyan-200 animate-pulse">{countdown}</span>
              <svg className="absolute inset-0 w-full h-full animate-[spin_1s_linear_infinite]">
                <circle cx="76" cy="76" r="74" fill="none" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="4" strokeDasharray="300" strokeDashoffset="100" />
              </svg>
            </div>
            <p className="mt-8 text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-400 tracking-widest drop-shadow-lg animate-text-gradient">
              جاري بدء العرض المرئي...
            </p>
          </div>
        )}
      </div>
      
      <p className={`mt-16 text-xl font-bold transition-all duration-300 ${isComplete ? 'text-transparent opacity-0' : isPressing ? 'text-cyan-300 animate-pulse tracking-widest' : 'text-slate-500 tracking-wide'}`}>
        {!isComplete && (isPressing ? 'يرجى إبقاء إصبعك...' : 'اضغط مطولاً على البصمة للبدء')}
      </p>
    </div>
  );
}

// ==========================================
// شاشة الفيديو
// ==========================================
function VideoScreen({ onComplete }) {
  const videoRef = useRef(null);
  
  useEffect(() => {
    playNavSound('startShow'); 
    if (videoRef.current) videoRef.current.play().catch(() => {});
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center animate-fade-in">
      <video ref={videoRef} src="IMG_7342.MP4" controls={false} autoPlay playsInline onEnded={() => { playNavSound('nav'); onComplete(); }} className="w-full h-full object-cover sm:object-contain bg-black" />
      <button onClick={() => { playNavSound('nav'); onComplete(); }} className="absolute top-6 left-6 px-6 py-2 bg-white/10 backdrop-blur-md text-white/80 rounded-full font-bold z-[101] border border-white/10 hover:bg-white/20 transition-colors">تخطي</button>
    </div>
  );
}

// ==========================================
// شاشة الخريطة הפل سكرين
// ==========================================
function MapScreen({ onComplete, onReset }) {
  const [isNavigating, setIsNavigating] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  const handleStartNavigation = () => {
    playNavSound('nav');
    setIsNavigating(true);
    let p = 0;
    const interval = setInterval(() => {
      p += 5; 
      setLoadProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        onComplete();
      }
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950 overflow-y-auto animate-fade-in">
      
      {isNavigating && (
        <div className="fixed inset-0 z-[200] bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center animate-fade-in">
          <div className="relative flex items-center justify-center w-40 h-40">
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle cx="80" cy="80" r="76" fill="none" stroke="rgba(6,182,212,0.2)" strokeWidth="8" />
              <circle cx="80" cy="80" r="76" fill="none" stroke="#22d3ee" strokeWidth="8" strokeDasharray="477" strokeDashoffset={477 - (477 * loadProgress) / 100} className="transition-all duration-100 ease-out" strokeLinecap="round" />
            </svg>
            <span className="text-4xl font-black text-cyan-300">{loadProgress}%</span>
          </div>
          <h3 className="mt-8 text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-400 tracking-widest drop-shadow-lg animate-text-gradient">
            جاري تهيئة منصة الألعاب...
          </h3>
        </div>
      )}

      <div className="w-full flex justify-center items-start z-[101] shrink-0 mt-8 mb-6">
        <div className="bg-slate-900/80 backdrop-blur-xl px-8 py-4 rounded-full border border-cyan-500/30 shadow-[0_10px_30px_rgba(6,182,212,0.2)] flex items-center gap-3">
          <Map className="text-cyan-400" size={32}/> 
          <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-400 tracking-wide animate-text-gradient">
            خارطة المسار
          </h2>
        </div>
      </div>
      
      <div className="w-full p-4 sm:p-12 flex items-center justify-center relative mb-10">
        <img src="phonto.jpg" alt="خريطة" className="w-full h-auto max-h-[65vh] object-contain drop-shadow-[0_0_30px_rgba(6,182,212,0.3)] rounded-3xl" />
      </div>
      
      <div className="flex justify-center w-full px-4 mb-10">
        <button onClick={handleStartNavigation} disabled={isNavigating} className="relative overflow-hidden px-10 py-5 w-full sm:w-auto sm:px-16 bg-gradient-to-r from-cyan-600 to-teal-500 text-slate-950 rounded-full font-black text-2xl shadow-[0_0_40px_rgba(6,182,212,0.4)] hover:scale-105 transition-all flex items-center justify-center gap-4 group">
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[sweep_1.5s_ease-in-out_infinite]"></div>
          <span className="relative z-10 whitespace-nowrap">الدخول لمنصة الألعاب</span> 
          <Gamepad2 size={36} className="relative z-10 animate-bounce"/>
        </button>
      </div>
    </div>
  );
}

// ==========================================
// قائمة المحطات (تم استرجاع التضليل مع النص وإبقاء الصورة خلفية)
// ==========================================
function QuizMenu({ onSelect, onReset }) {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-7xl animate-fade-in relative mt-8">
      <button onClick={onReset} className="absolute -top-16 right-0 px-5 py-2 bg-rose-500/10 backdrop-blur-md text-rose-400 rounded-full font-bold border border-rose-500/30 flex items-center gap-2 hover:bg-rose-500/30 hover:text-white transition-all shadow-lg z-50">
        إنهاء اللعبة <Power size={18}/>
      </button>
      
      <div className="text-center mb-16 relative">
        <div className="inline-flex items-center gap-2 mb-4 bg-cyan-500/10 text-cyan-400 px-5 py-2 rounded-full font-bold text-sm shadow-sm border border-cyan-500/20">
          <Gamepad2 size={18} /> الألعاب التفاعلية
        </div>
        <h2 className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-300 to-cyan-500 mb-4 tracking-tight drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)] animate-text-gradient">
          محطات التحدي
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full px-2">
        {Object.entries(quizData).map(([key, data], index) => (
          <button key={key} onClick={() => { playNavSound('nav'); onSelect(key); }}
                  className={`group relative overflow-hidden rounded-[3rem] text-right flex flex-col items-start justify-end min-h-[350px] shadow-[0_15px_40px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-4 border border-white/10 hover:border-cyan-500/50`}
                  style={{ animationDelay: `${index * 100}ms` }}>
            
            {/* الصورة كخلفية للبطاقة */}
            <div className="absolute inset-0 w-full h-full">
              <img src={data.image} alt={data.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" onError={(e)=>e.target.style.display='none'} />
            </div>

            {/* التضليل المتدرج لضمان وضوح النص */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-500"></div>
            <div className={`absolute inset-0 bg-gradient-to-br ${data.color} opacity-40 mix-blend-color`}></div>

            {/* تأثير اللمعان للمرور بالماوس */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[sweep_2s_ease-in-out_infinite]"></div>
            
            {/* المحتوى النصي للبطاقة (اسم اللعبة وزر اللعب) */}
            <div className="relative z-10 w-full p-8 pt-0">
              <h3 className="text-3xl font-black text-white mb-4 drop-shadow-[0_5px_10px_rgba(0,0,0,0.8)]">{data.title}</h3>
              <div className="flex justify-between items-center w-full">
                <p className="text-cyan-100 font-bold bg-slate-900/60 backdrop-blur-md px-5 py-2.5 rounded-2xl text-sm border border-white/10 shadow-inner">
                  تحديات الألعاب
                </p>
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center transition-all group-hover:bg-cyan-500 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] border border-white/10 group-hover:border-cyan-400">
                  <Play className="text-white group-hover:text-slate-950 ml-1" size={20} fill="currentColor" />
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// شاشة الأسئلة التفاعلية (مع العشوائية)
// ==========================================
function QuizActive({ stationId, onBack }) {
  const station = quizData[stationId];
  
  // دالة لاختيار 5 أسئلة عشوائية في كل محاولة
  const [questions] = useState(() => {
    const shuffled = [...station.questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(5, shuffled.length)); 
  });

  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isShake, setIsShake] = useState(false);

  const handleBackClick = () => {
    playNavSound('nav');
    onBack();
  };

  const handleAnswer = (index) => {
    if (selectedAnswer !== null) return;
    initAudio(); 
    setSelectedAnswer(index);
    if (index === questions[currentQ].correct) { playSound('correct'); setScore(prev => prev + 1); }
    else { playSound('wrong'); setIsShake(true); setTimeout(() => setIsShake(false), 500); }
    setTimeout(() => {
      setSelectedAnswer(null);
      if (currentQ < questions.length - 1) setCurrentQ(prev => prev + 1);
      else setShowResult(true);
    }, 1800);
  };

  if (showResult) {
    const isSuccess = score > questions.length / 2;
    return (
      <div className={`flex flex-col items-center justify-center w-full min-h-screen p-4 sm:p-10 text-center text-white animate-slide-up relative overflow-hidden`}>
        
        <div className="absolute inset-0 w-full h-full z-0">
          <img src={station.image} alt={station.title} className="w-full h-full object-cover" onError={(e)=>e.target.style.display='none'} />
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-md"></div>
          <div className={`absolute inset-0 bg-gradient-to-br ${station.color} opacity-40 mix-blend-color`}></div>
        </div>

        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20 z-0">
          {[...Array(12)].map((_, i) => (
            isSuccess ? 
            <Sparkles key={i} size={40 + Math.random()*40} className="absolute text-emerald-400 animate-float" style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 2}s` }} /> :
            <XCircle key={i} size={40 + Math.random()*40} className="absolute text-rose-500 animate-float" style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 2}s` }} />
          ))}
        </div>
        
        <div className="bg-slate-950/60 p-12 sm:p-16 rounded-[3rem] backdrop-blur-2xl border border-white/10 w-full max-w-3xl mx-auto relative z-10 shadow-2xl">
          
          {isSuccess ? 
            <div className="mb-8"><Award size={120} strokeWidth={1.5} className="text-emerald-400 mx-auto drop-shadow-lg float" /></div> : 
            <div className="mb-8"><Crosshair size={120} strokeWidth={1.5} className="text-rose-500 mx-auto drop-shadow-lg float" /></div>
          }
          
          <h2 className="text-5xl sm:text-6xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-400 animate-text-gradient drop-shadow-md">{isSuccess ? 'إنجاز عظيم!' : 'حاول مجدداً!'}</h2>
          <div className="bg-black/40 rounded-[2.5rem] p-10 mb-12 inline-block min-w-[300px] border border-white/5 shadow-inner">
            <span className="text-8xl font-black text-white drop-shadow-lg">{score}</span>
            <span className="text-4xl text-white/30 mx-3">/</span>
            <span className="text-5xl font-bold text-white/50">{questions.length}</span>
          </div>
          <button onClick={() => { playNavSound('nav'); onBack(); }} className="relative overflow-hidden w-full py-6 bg-gradient-to-r from-cyan-600 to-teal-500 text-slate-950 rounded-full font-black text-2xl shadow-xl group">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[sweep_1.5s_ease-in-out_infinite]"></div>
            <span className="relative z-10 flex items-center justify-center gap-4">
              <img src="game-controller.png" className="w-8 h-8 object-contain drop-shadow-md" alt="Game" /> العودة للمحطات
            </span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-start w-full min-h-screen p-4 sm:p-10 animate-slide-up relative overflow-hidden`}>
      
      <div className="absolute inset-0 w-full h-full z-0">
        <img src={station.image} alt={station.title} className="w-full h-full object-cover" onError={(e)=>e.target.style.display='none'} />
        <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm"></div>
        <div className={`absolute inset-0 bg-gradient-to-br ${station.color} opacity-30 mix-blend-color`}></div>
      </div>

      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3 pointer-events-none z-0"></div>

      <div className="w-full relative z-10 max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-10 text-white">
          <button onClick={handleBackClick} className="w-14 h-14 bg-black/40 hover:bg-black/60 rounded-2xl backdrop-blur-xl border border-white/10 flex items-center justify-center transition-transform hover:scale-105"><ChevronLeft size={28} className="rotate-180" /></button>
          <div className="flex items-center gap-4 bg-black/40 p-2 pr-6 rounded-full backdrop-blur-xl border border-white/10"><span className="font-black text-xl hidden sm:block drop-shadow-md">{station.title}</span></div>
        </div>
        
        <div className="mb-12">
          <div className="bg-black/60 h-5 rounded-full overflow-hidden border border-white/5 p-1 shadow-inner backdrop-blur-md">
             <div className="h-full bg-gradient-to-l from-cyan-400 to-blue-400 rounded-full transition-all duration-700 shadow-[0_0_15px_rgba(6,182,212,0.8)]" style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}></div>
          </div>
        </div>
        
        <div className={`bg-slate-950/60 backdrop-blur-2xl rounded-[3rem] p-8 sm:p-14 shadow-2xl border flex flex-col gap-12 ${isShake ? 'shake border-rose-500' : 'border-white/10'}`}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white text-right leading-tight drop-shadow-lg">{questions[currentQ].q}</h2>
          <div className="space-y-6">
            {questions[currentQ].options.map((opt, idx) => {
              let btnStyle = "bg-white/5 border-white/10 text-white/90 hover:bg-slate-800/80 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:-translate-y-1 relative overflow-hidden group";
              let indexBg = "bg-black/40 text-white/50 border border-white/10 group-hover:border-cyan-500/50 group-hover:text-cyan-400 group-hover:bg-cyan-500/10";
              if (selectedAnswer !== null) {
                if (idx === questions[currentQ].correct) { btnStyle = "bg-emerald-900/60 border-emerald-400 text-emerald-100 scale-[1.02] z-10 shadow-[0_0_30px_rgba(52,211,153,0.3)]"; indexBg = "bg-emerald-500 text-white border-emerald-400"; }
                else if (idx === selectedAnswer) { btnStyle = "bg-rose-900/60 border-rose-500 text-rose-100 shadow-[0_0_30px_rgba(244,63,94,0.3)]"; indexBg = "bg-rose-500 text-white border-rose-500"; }
                else { btnStyle = "bg-black/40 border-transparent text-white/20 opacity-40 scale-95"; indexBg = "bg-black/40 text-white/10 border-transparent"; }
              }
              return (
                <button key={idx} disabled={selectedAnswer !== null} onClick={() => handleAnswer(idx)} className={`w-full text-right p-5 sm:p-7 rounded-[2rem] border font-bold text-xl sm:text-2xl transition-all duration-300 flex items-center gap-5 ${btnStyle}`}>
                  {selectedAnswer === null && <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[sweep_1.5s_ease-in-out_infinite]"></div>}
                  <span className={`relative z-10 w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center text-xl transition-all shadow-inner ${indexBg}`}>{['أ', 'ب', 'ج', 'د'][idx]}</span>
                  <span className="relative z-10 flex-grow pt-1 drop-shadow-md">{opt}</span>
                  <div className="relative z-10 shrink-0">{selectedAnswer === null ? <div className="w-8 h-8 rounded-full border-2 border-white/10 group-hover:border-cyan-400/50 transition-colors"></div> : (idx === questions[currentQ].correct ? <CheckCircle className="text-emerald-400" size={32} /> : idx === selectedAnswer ? <XCircle className="text-rose-500" size={32} /> : <div className="w-8 h-8"></div>)}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}