import { useState, useCallback } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface ConfirmPopupProps {
  open: boolean;
  question: string;
  emoji: string;
  color: string;
  onConfirm: () => void;
  onClose: () => void;
}

const ConfirmPopup = ({ open, question, emoji, color, onConfirm, onClose }: ConfirmPopupProps) => {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [escaped, setEscaped] = useState(false);

  const runAway = useCallback(() => {
    // Get dialog content dimensions - allow movement within the whole popup
    const isMobile = window.innerWidth < 640;
    
    // More room to move - can go anywhere in the popup
    const maxDistance = isMobile ? 100 : 180;
    const minDistance = isMobile ? 50 : 80;
    
    const angle = Math.random() * 2 * Math.PI;
    const distance = minDistance + Math.random() * (maxDistance - minDistance);
    
    let x = Math.cos(angle) * distance;
    let y = Math.sin(angle) * distance;
    
    // Allow movement within the entire popup bounds
    // Limit to stay inside the white card but give lots of space
    const maxX = isMobile ? 120 : 180;
    const maxY = isMobile ? 100 : 150; // Can move up into the pink area too!
    
    x = Math.max(-maxX, Math.min(maxX, x));
    y = Math.max(-maxY, Math.min(maxY, y));
    
    setNoPosition({ x, y });
    setEscaped(true);

    setTimeout(() => {
      setNoPosition({ x: 0, y: 0 });
      setEscaped(false);
    }, 1000);
  }, []);

  const handleOpenChange = (val: boolean) => {
    if (!val) {
      setNoPosition({ x: 0, y: 0 });
      setEscaped(false);
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="border-2 border-red-300 bg-white p-0 max-w-sm rounded-3xl shadow-2xl [&>button]:hidden overflow-hidden">
        <DialogTitle className="sr-only">Confirmation</DialogTitle>

        <div className={`bg-gradient-to-br ${color} p-6 sm:p-8 flex flex-col items-center justify-center rounded-t-3xl relative overflow-hidden`}>
          {/* Floating hearts in header */}
          <div className="absolute inset-0 opacity-30">
            {[...Array(8)].map((_, i) => (
              <span
                key={i}
                className="absolute text-3xl animate-float-heart"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              >
                💕
              </span>
            ))}
          </div>
          <div className="text-6xl sm:text-7xl animate-bloom mb-2 relative z-10 drop-shadow-2xl">{emoji}</div>
        </div>

        <div className="p-6 sm:p-8 text-center space-y-6">
          <p className="font-romantic text-xl sm:text-2xl text-gray-800 leading-relaxed drop-shadow-sm">
            {question}
          </p>

          <div className="flex items-center justify-center gap-4 sm:gap-6 relative min-h-[80px] sm:min-h-[100px]">
            <button
              onClick={() => {
                setNoPosition({ x: 0, y: 0 });
                setEscaped(false);
                onConfirm();
              }}
              className="px-6 sm:px-10 py-3 sm:py-4 rounded-full bg-gradient-to-r from-red-500 via-pink-500 to-red-500 text-white font-bold text-lg sm:text-xl shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 touch-manipulation"
            >
              Yes 💕✨
            </button>

            <button
              onMouseEnter={runAway}
              onTouchStart={runAway}
              className="px-6 sm:px-10 py-3 sm:py-4 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 font-bold text-lg sm:text-xl shadow-xl hover:shadow-2xl transition-all duration-150 border-2 border-gray-300 touch-manipulation"
              style={{
                transform: `translate(${noPosition.x}px, ${noPosition.y}px)`,
                transition: "transform 0.2s ease-out",
                position: escaped ? "absolute" : "relative",
                zIndex: 50,
              }}
            >
              No 💔
            </button>
          </div>

          {escaped && (
            <p className="text-sm sm:text-base text-red-600 animate-fade-in font-semibold flex items-center justify-center gap-2">
              <span className="text-xl sm:text-2xl">😜</span>
              Hehe, you can't say no!
              <span className="text-xl sm:text-2xl">💗</span>
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmPopup;
