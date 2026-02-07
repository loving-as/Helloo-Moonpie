const RomanticBackground = () => {
  return (
    <>
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 rounded-full bg-primary/20 blur-3xl animate-pulse-glow" 
             style={{ top: '10%', left: '10%', animationDuration: '4s' }}></div>
        <div className="absolute w-80 h-80 rounded-full bg-rose-gold/20 blur-3xl animate-pulse-glow" 
             style={{ top: '60%', right: '10%', animationDuration: '5s', animationDelay: '1s' }}></div>
        <div className="absolute w-72 h-72 rounded-full bg-accent/20 blur-3xl animate-pulse-glow" 
             style={{ bottom: '10%', left: '50%', animationDuration: '6s', animationDelay: '2s' }}></div>
      </div>

      {/* Floating rose petals */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={`petal-${i}`}
            className="absolute animate-float-heart"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${10 + Math.random() * 5}s`,
              fontSize: `${20 + Math.random() * 15}px`,
              opacity: 0.4,
              filter: 'blur(1px)',
            }}
          >
            🌺
          </div>
        ))}
      </div>

      {/* Twinkling stars/sparkles overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute w-1 h-1 bg-warm-glow rounded-full animate-sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Love quotes floating */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        {['❤️', '💕', '💖', '💝', '🌹', '💐', '💘', '💞'].map((emoji, i) => (
          <div
            key={`quote-${i}`}
            className="absolute text-6xl font-romantic text-primary animate-float-heart"
            style={{
              left: `${(i * 15) % 100}%`,
              animationDelay: `${i * 1.5}s`,
              animationDuration: `${15 + Math.random() * 5}s`,
              opacity: 0.15,
            }}
          >
            {emoji}
          </div>
        ))}
      </div>

      {/* Particle hearts effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-2 h-2 animate-float-heart"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
              opacity: Math.random() * 0.3 + 0.2,
            }}
          >
            <div className="w-full h-full bg-primary rounded-full blur-sm"></div>
          </div>
        ))}
      </div>
    </>
  );
};

export default RomanticBackground;

