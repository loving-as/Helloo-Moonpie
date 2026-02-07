import { useState, useEffect } from "react";
import { CalendarHeart } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface DateBadgeProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
}

const DateBadge = ({ currentDate, onDateChange }: DateBadgeProps) => {
  const [showPrank, setShowPrank] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [showFinalPrank, setShowFinalPrank] = useState(false);

  const monthDay = currentDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });

  // Handle countdown
  useEffect(() => {
    if (showCountdown && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 500); // Faster countdown for dramatic effect
      return () => clearTimeout(timer);
    } else if (showCountdown && countdown === 0) {
      // Show final prank message
      setTimeout(() => {
        setShowCountdown(false);
        setShowFinalPrank(true);
        setCountdown(10); // Reset for next time
      }, 300);
    }
  }, [showCountdown, countdown]);

  const handleChangeDateClick = () => {
    setShowPrank(true);
  };

  const handlePrankDismiss = () => {
    setShowPrank(false);
    setShowCalendar(true);
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      // Start countdown prank!
      setShowCalendar(false);
      setShowCountdown(true);
    }
  };

  const handleFinalPrankClose = () => {
    setShowFinalPrank(false);
  };

  return (
    <>
      <button
        onClick={handleChangeDateClick}
        className="fixed top-4 right-4 z-30 flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-3 rounded-2xl bg-white/95 backdrop-blur-md border-2 border-red-300 shadow-xl hover:shadow-2xl hover:shadow-red-200/50 hover:scale-105 hover:border-red-500 transition-all duration-300 touch-manipulation"
      >
        <CalendarHeart className="h-5 w-5 sm:h-6 sm:w-6 text-red-500 animate-pulse-glow" />
        <span className="font-romantic text-lg sm:text-xl text-gray-800 drop-shadow-sm">{monthDay}</span>
        <span className="text-xs text-red-500 ml-1 font-semibold">✨ change</span>
      </button>

      {/* Prank message */}
      <Dialog open={showPrank} onOpenChange={setShowPrank}>
        <DialogContent className="border-2 border-red-300 bg-white p-0 max-w-sm overflow-hidden rounded-3xl shadow-2xl [&>button]:hidden">
          <DialogTitle className="sr-only">Prank</DialogTitle>
          <div className="bg-gradient-to-br from-red-400 to-pink-500 p-8 flex flex-col items-center rounded-t-3xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              {[...Array(10)].map((_, i) => (
                <span
                  key={i}
                  className="absolute text-4xl animate-float-heart"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                >
                  💕
                </span>
              ))}
            </div>
            <div className="text-7xl animate-bloom relative z-10">😜</div>
          </div>
          <div className="p-8 text-center space-y-4">
            <p className="font-romantic text-3xl text-gray-800 drop-shadow-sm">
              I knew it! 😏
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              You're so curious! I love that about you 💗
            </p>
            <p className="text-red-600 font-semibold text-base">
              But could you wait for the actual days? 🥰
            </p>
            <button
              onClick={handlePrankDismiss}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-red-500 via-pink-500 to-red-500 text-white font-bold shadow-2xl hover:scale-110 transition-all duration-300 text-lg"
            >
              Let me pick a date 😝
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Calendar picker */}
      <Dialog open={showCalendar} onOpenChange={setShowCalendar}>
        <DialogContent className="border-2 border-red-300 bg-white max-w-sm overflow-hidden rounded-3xl shadow-2xl">
          <DialogTitle className="sr-only">Pick a date</DialogTitle>
          <div className="flex flex-col items-center p-6">
            <p className="font-romantic text-2xl text-gray-800 mb-6 flex items-center gap-2">
              Pick your date, impatient one 😜💕
            </p>
            <Calendar
              mode="single"
              selected={currentDate}
              onSelect={handleDateSelect}
              className={cn("p-3 pointer-events-auto rounded-xl border-2 border-red-200 bg-red-50/50")}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Countdown Prank */}
      <Dialog open={showCountdown} onOpenChange={setShowCountdown}>
        <DialogContent className="border-2 border-red-300 bg-white p-0 max-w-sm overflow-hidden rounded-3xl shadow-2xl [&>button]:hidden">
          <DialogTitle className="sr-only">Unlocking</DialogTitle>
          <div className="bg-gradient-to-br from-red-400 to-pink-500 p-8 flex flex-col items-center rounded-t-3xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              {[...Array(10)].map((_, i) => (
                <span
                  key={i}
                  className="absolute text-4xl animate-float-heart"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                >
                  ⏰
                </span>
              ))}
            </div>
            <div className="text-7xl animate-bloom relative z-10">⏰</div>
          </div>
          <div className="p-8 text-center space-y-6">
            <p className="font-romantic text-4xl text-gray-800 drop-shadow-sm animate-pulse">
              Unlocking... ⏳
            </p>
            <div className="text-8xl font-bold text-red-600 animate-bounce drop-shadow-2xl my-8">
              {countdown}
            </div>
            <p className="text-gray-600 text-lg">
              Preparing your surprise... 💝
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Final Prank - Sweet loving message */}
      <Dialog open={showFinalPrank} onOpenChange={setShowFinalPrank}>
        <DialogContent className="border-2 border-red-300 bg-white p-0 max-w-sm overflow-hidden rounded-3xl shadow-2xl [&>button]:hidden">
          <DialogTitle className="sr-only">Sweet Message</DialogTitle>
          <div className="bg-gradient-to-br from-red-400 to-pink-500 p-8 flex flex-col items-center rounded-t-3xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              {[...Array(12)].map((_, i) => (
                <span
                  key={i}
                  className="absolute text-4xl animate-float-heart"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                >
                  💖
                </span>
              ))}
            </div>
            <div className="text-8xl animate-bloom relative z-10">🥰</div>
          </div>
          <div className="p-8 text-center space-y-5">
            <p className="font-romantic text-3xl text-gray-800 drop-shadow-sm">
              Sorry love! 🥰
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              Caught you! I knew you'd try to peek ahead 😊
            </p>
            <div className="bg-red-50 rounded-2xl p-5 border-2 border-red-200">
              <p className="text-gray-700 text-base mb-2">
                Each day is special at its moment ✨
              </p>
              <p className="text-red-600 font-semibold">
                Could you wait for me? 💕
              </p>
            </div>
            <button
              onClick={handleFinalPrankClose}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-red-500 via-pink-500 to-red-500 text-white font-bold shadow-2xl hover:scale-110 transition-all duration-300 text-lg"
            >
              I'll wait! 💖
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DateBadge;
