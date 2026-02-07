import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { DayInfo } from "./DayPopup";

interface LockedDayPopupProps {
  open: boolean;
  day: DayInfo;
  onClose: () => void;
}

const LockedDayPopup = ({ open, day, onClose }: LockedDayPopupProps) => {
  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent className="border-2 border-red-300 bg-white p-0 max-w-sm overflow-hidden rounded-3xl shadow-2xl [&>button]:hidden">
        <DialogTitle className="sr-only">Locked</DialogTitle>
        <div className={`bg-gradient-to-br ${day.color} p-8 flex flex-col items-center rounded-t-3xl relative overflow-hidden`}>
          {/* Animated locked hearts */}
          <div className="absolute inset-0 opacity-20">
            {[...Array(6)].map((_, i) => (
              <span
                key={i}
                className="absolute text-3xl animate-float-heart"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              >
                🔐
              </span>
            ))}
          </div>
          <div className="text-7xl animate-bloom relative z-10 drop-shadow-2xl">🔒</div>
        </div>
        <div className="p-8 text-center space-y-5">
          <p className="font-romantic text-3xl text-gray-800 drop-shadow-sm">
            Not yet, my love! 💕
          </p>
          <p className="text-gray-700 leading-relaxed text-lg">
            <strong className="text-red-600 font-bold">{day.title}</strong> unlocks on <strong className="text-red-600 font-bold">{day.date}</strong>
          </p>
          <div className="bg-red-50 rounded-2xl p-5 border-2 border-red-200">
            <p className="text-gray-700 text-base">
              You can change the date from the top-right corner if you want. But could you wait for me? 🥰
            </p>
          </div>
          <button
            onClick={onClose}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-red-500 via-pink-500 to-red-500 text-white font-bold shadow-2xl hover:scale-110 transition-all duration-300 text-lg touch-manipulation"
          >
            I'll wait! 💖
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LockedDayPopup;
