const HeartBorder = () => {
  return (
    <>
      {/* Corner hearts */}
      <div className="fixed top-4 left-4 text-5xl animate-pulse-glow z-20 pointer-events-none opacity-60">
        💝
      </div>
      <div className="fixed top-4 right-4 text-5xl animate-pulse-glow z-20 pointer-events-none opacity-60" style={{ animationDelay: '0.5s' }}>
        💝
      </div>
      <div className="fixed bottom-4 left-4 text-5xl animate-pulse-glow z-20 pointer-events-none opacity-60" style={{ animationDelay: '1s' }}>
        💝
      </div>
      <div className="fixed bottom-4 right-4 text-5xl animate-pulse-glow z-20 pointer-events-none opacity-60" style={{ animationDelay: '1.5s' }}>
        💝
      </div>

      {/* Side hearts */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 flex flex-col gap-8 z-20 pointer-events-none opacity-50">
        {[...Array(5)].map((_, i) => (
          <div
            key={`left-${i}`}
            className="text-3xl animate-sway"
            style={{ animationDelay: `${i * 0.3}s` }}
          >
            🌹
          </div>
        ))}
      </div>
      <div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-8 z-20 pointer-events-none opacity-50">
        {[...Array(5)].map((_, i) => (
          <div
            key={`right-${i}`}
            className="text-3xl animate-sway"
            style={{ animationDelay: `${i * 0.3 + 0.15}s` }}
          >
            🌹
          </div>
        ))}
      </div>

      {/* Top and bottom hearts */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 flex gap-8 z-20 pointer-events-none opacity-50">
        {[...Array(7)].map((_, i) => (
          <div
            key={`top-${i}`}
            className="text-2xl animate-bounce-soft"
            style={{ animationDelay: `${i * 0.2}s` }}
          >
            💕
          </div>
        ))}
      </div>
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex gap-8 z-20 pointer-events-none opacity-50">
        {[...Array(7)].map((_, i) => (
          <div
            key={`bottom-${i}`}
            className="text-2xl animate-bounce-soft"
            style={{ animationDelay: `${i * 0.2 + 0.1}s` }}
          >
            💕
          </div>
        ))}
      </div>
    </>
  );
};

export default HeartBorder;

