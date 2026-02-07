import { useEffect, useState } from "react";

interface Heart {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
  emoji: string;
}

const heartEmojis = ["❤️", "💕", "💖", "💝", "💗", "💘", "💞", "💓"];

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const generated: Heart[] = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 30 + 15,
      delay: Math.random() * 8,
      duration: Math.random() * 5 + 5,
      opacity: Math.random() * 0.6 + 0.2,
      emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
    }));
    setHearts(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-float-heart drop-shadow-[0_0_10px_rgba(255,0,68,0.5)]"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
            opacity: heart.opacity,
          }}
        >
          {heart.emoji}
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;
