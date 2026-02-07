const CupidArrows = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-5">
      {/* Flying Cupid arrows */}
      {[...Array(8)].map((_, i) => (
        <div
          key={`arrow-${i}`}
          className="absolute"
          style={{
            top: `${10 + (i * 12)}%`,
            animationDelay: `${i * 2}s`,
            animation: `flyAcross ${8 + Math.random() * 4}s linear infinite`,
          }}
        >
          <div className="text-4xl opacity-60 drop-shadow-[0_0_10px_rgba(255,0,68,0.6)]">
            💘
          </div>
        </div>
      ))}

      {/* Floating love letters */}
      {[...Array(6)].map((_, i) => (
        <div
          key={`letter-${i}`}
          className="absolute text-3xl opacity-40 animate-float-heart"
          style={{
            left: `${15 + (i * 15)}%`,
            animationDelay: `${i * 1.5}s`,
            animationDuration: `${12 + Math.random() * 3}s`,
          }}
        >
          💌
        </div>
      ))}

      {/* Heart explosions */}
      {[...Array(4)].map((_, i) => (
        <div
          key={`explosion-${i}`}
          className="absolute"
          style={{
            left: `${20 + (i * 20)}%`,
            top: `${30 + (i * 15)}%`,
            animation: `heartExplosion ${3 + i}s ease-in-out infinite`,
            animationDelay: `${i * 2}s`,
          }}
        >
          <div className="relative">
            <span className="absolute text-2xl animate-ping opacity-30">💖</span>
            <span className="text-3xl">💖</span>
          </div>
        </div>
      ))}

      <style>{`
        @keyframes flyAcross {
          0% {
            left: -10%;
            transform: rotate(-45deg) scale(0.5);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
            transform: rotate(-20deg) scale(1);
          }
          90% {
            opacity: 0.8;
            transform: rotate(20deg) scale(1);
          }
          100% {
            left: 110%;
            transform: rotate(45deg) scale(0.5);
            opacity: 0;
          }
        }

        @keyframes heartExplosion {
          0%, 100% {
            transform: scale(1);
            opacity: 0.4;
          }
          50% {
            transform: scale(1.5);
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
};

export default CupidArrows;

