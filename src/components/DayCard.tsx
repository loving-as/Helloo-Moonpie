import { DayInfo } from "./DayPopup";

interface DayCardProps {
  day: DayInfo;
  index: number;
  locked: boolean;
  onClick: () => void;
}

const DayCard = ({ day, index, locked, onClick }: DayCardProps) => {
  return (
    <button
      onClick={onClick}
      className="group relative w-full text-left p-5 sm:p-6 rounded-2xl backdrop-blur-md border-2 transition-all duration-300 ease-out overflow-hidden bg-white/90 border-red-200 hover:border-red-400 hover:shadow-2xl hover:shadow-red-200/50 hover:-translate-y-2 hover:scale-[1.02] active:scale-[0.98] touch-manipulation"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Decorative roses in corners */}
      <>
        <span className="absolute top-2 right-2 text-lg sm:text-xl opacity-30 group-hover:opacity-70 transition-opacity">🌹</span>
        <span className="absolute bottom-2 left-2 text-lg sm:text-xl opacity-30 group-hover:opacity-70 transition-opacity">💕</span>
      </>
      
      <div className="flex items-center gap-4 sm:gap-5 relative z-10">
        <span className="text-4xl sm:text-5xl group-hover:animate-bounce-soft drop-shadow-lg">
          {day.emoji}
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="font-romantic text-2xl sm:text-3xl transition-all duration-300 text-gray-800 group-hover:text-red-600 group-hover:scale-105 truncate">
            {day.title}
          </h3>
          <p className="text-gray-600 text-sm mt-1 flex items-center gap-2">
            <span>💝</span>
            {day.date}
          </p>
        </div>
        {locked ? (
          <div className="text-red-500 text-2xl sm:text-3xl animate-pulse-glow flex-shrink-0">
            🔒
          </div>
        ) : (
          <div className="text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 flex-shrink-0">
            <span className="text-xl sm:text-2xl">→</span>
          </div>
        )}
      </div>
    </button>
  );
};

export default DayCard;
