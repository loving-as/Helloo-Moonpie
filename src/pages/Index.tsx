import { useState, useEffect } from "react";
import FloatingHearts from "@/components/FloatingHearts";
import RomanticBackground from "@/components/RomanticBackground";
import CupidArrows from "@/components/CupidArrows";
import HeartBorder from "@/components/HeartBorder";
import DayCard from "@/components/DayCard";
import DayPopup, { days } from "@/components/DayPopup";
import ConfirmPopup from "@/components/ConfirmPopup";
import DateBadge from "@/components/DateBadge";
import LockedDayPopup from "@/components/LockedDayPopup";
import { getCurrentDate, isDayUnlocked, setTestDate } from "@/lib/dateUtils";

// TESTING: Uncomment the line below to test with a specific date
// setTestDate(new Date(2026, 1, 15)); // Feb 9, 2026
// PRODUCTION: Comment out the line above or set to null
// setTestDate(null);

const confirmQuestions: { question: string }[] = [
  { question: "Will you take me as the fragrance of your life? 🌹" },
  { question: "Will you say yes to being mine forever and ever? 💍" },
  { question: "Will you take me as the sweetest part of your life? 🍫" },
  { question: "Will you take me as the softest place in your heart? 🧸" },
  { question: "Do you promise to be with me forever and always? 🤞" },
  { question: "Will you take me as the most comforting part of your life? 🤗" },
  { question: "Will you take me as all the naughtiness and juicy moments in your life? 💋" },
  { question: "Will you be my Valentine, today and for all eternity? ❤️" },
];

const Index = () => {
  const [currentDate, setCurrentDate] = useState(getCurrentDate());
  const [confirmDay, setConfirmDay] = useState<number | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [lockedDay, setLockedDay] = useState<number | null>(null);

  // Update the date at midnight every day
  useEffect(() => {
    const updateDate = () => {
      setCurrentDate(getCurrentDate());
    };

    // Calculate milliseconds until next midnight
    const now = getCurrentDate();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const msUntilMidnight = tomorrow.getTime() - now.getTime();

    // Set timeout to update at midnight
    const midnightTimeout = setTimeout(() => {
      updateDate();
      // Then set an interval to update every day
      const dailyInterval = setInterval(updateDate, 24 * 60 * 60 * 1000);
      return () => clearInterval(dailyInterval);
    }, msUntilMidnight);

    return () => clearTimeout(midnightTimeout);
  }, []);

  const handleDayClick = (index: number) => {
    if (isDayUnlocked(index, currentDate)) {
      setConfirmDay(index);
    } else {
      setLockedDay(index);
    }
  };

  const handleConfirm = () => {
    const day = confirmDay;
    setConfirmDay(null);
    setSelectedDay(day);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-rose-50 via-red-50 to-pink-50 overflow-hidden">
      {/* Romantic animated background */}
      <RomanticBackground />
      
      {/* Animated Background with Roses */}
      <div className="absolute inset-0 opacity-10 rose-pattern"></div>
      
      {/* Romantic Sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute text-2xl animate-sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          >
            ✨
          </div>
        ))}
      </div>
      
      {/* Floating Roses */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={`rose-${i}`}
            className="absolute text-4xl animate-float-heart"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
              opacity: 0.3,
            }}
          >
            🌹
          </div>
        ))}
      </div>
      
      <FloatingHearts />
      <CupidArrows />
      <HeartBorder />
      <DateBadge currentDate={currentDate} onDateChange={setCurrentDate} />

      <main className="relative z-10 flex flex-col items-center px-4 py-12 sm:py-20">
        <div className="text-center mb-12 animate-fade-in">
          <div className="mb-4 text-6xl animate-pulse-glow">💝</div>
          <p className="text-red-600 text-lg mb-2 tracking-widest uppercase flex items-center justify-center gap-2 font-bold">
            <span className="text-2xl animate-sparkle">✨</span> 
            Happy Valentine's Week 
            <span className="text-2xl animate-sparkle" style={{ animationDelay: '0.5s' }}>✨</span>
          </p>
          <h1 className="font-romantic text-5xl sm:text-8xl text-gray-800 mb-4 drop-shadow-[0_2px_20px_rgba(220,20,60,0.3)] animate-pulse-glow">
            For My Love
          </h1>
          <div className="flex justify-center gap-3 text-4xl mb-4 animate-bounce-soft">
            <span>❤️</span>
            <span style={{ animationDelay: '0.2s' }} className="animate-bounce-soft">💕</span>
            <span style={{ animationDelay: '0.4s' }} className="animate-bounce-soft">💖</span>
          </div>
          <p className="text-gray-700 text-lg max-w-md mx-auto backdrop-blur-sm bg-white/80 rounded-full px-6 py-3 border-2 border-red-300 shadow-lg">
            8 days of love, wrapped in magic — just for you, my darling 🌹
          </p>
        </div>

        <div className="w-full max-w-md space-y-3 relative">
          {/* Decorative border */}
          <div className="absolute -inset-4 bg-gradient-to-r from-red-200/40 via-pink-200/40 to-red-200/40 rounded-3xl blur-xl -z-10"></div>
          <div className="absolute -inset-2 border-2 border-red-200 rounded-3xl -z-10"></div>
          
          {days.map((day, index) => (
            <DayCard
              key={day.title}
              day={day}
              index={index}
              locked={!isDayUnlocked(index, currentDate)}
              onClick={() => handleDayClick(index)}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-700 font-romantic text-2xl animate-pulse-glow mb-4 flex items-center justify-center gap-2">
            <span className="text-3xl">💖</span>
            Made with endless love just for you
            <span className="text-3xl">💖</span>
          </p>
          <div className="flex justify-center gap-4 text-3xl mt-4">
            <span className="animate-sway">🌹</span>
            <span className="animate-pulse-glow">💝</span>
            <span className="animate-sway" style={{ animationDelay: '1s' }}>🌹</span>
          </div>
        </div>
      </main>

      {/* Locked day popup */}
      {lockedDay !== null && (
        <LockedDayPopup
          open={lockedDay !== null}
          day={days[lockedDay]}
          onClose={() => setLockedDay(null)}
        />
      )}

      {/* Confirmation Popup */}
      {confirmDay !== null && (
        <ConfirmPopup
          open={confirmDay !== null}
          question={confirmQuestions[confirmDay].question}
          emoji={days[confirmDay].emoji}
          color={days[confirmDay].color}
          onConfirm={handleConfirm}
          onClose={() => setConfirmDay(null)}
        />
      )}

      <DayPopup dayIndex={selectedDay} onClose={() => setSelectedDay(null)} />
    </div>
  );
};

export default Index;
