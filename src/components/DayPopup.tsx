import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export interface DayInfo {
  title: string;
  emoji: string;
  date: string;
  message: string;
  icon: string;
  color: string;
  hasBackwardsPrank?: boolean; // New property for backwards prank
  hasPetalFall?: boolean; // New property for petal fall animation
  hasFakeRejection?: boolean; // New property for fake rejection prank
  hasUnwrapGift?: boolean; // New property for unwrap gift animation
  hasTeddyGuess?: boolean; // New property for teddy guessing game
  hasHugTimer?: boolean; // New property for hug timer animation
  hasCatchKiss?: boolean; // New property for catch kiss game
  hasTypingEffect?: boolean; // New property for typing effect
}

const days: DayInfo[] = [
  {
    title: "Rose Day",
    emoji: "🌹",
    date: "Feb 7",
    message: "Just like a rose, my love for you is timeless and beautiful. Every petal whispers how much you mean to me. You are the most beautiful flower in my garden of life. 🌹💕",
    icon: "🌹",
    color: "from-red-400 to-pink-500",
    hasPetalFall: true, // Enable petal fall for Rose Day
  },
  {
    title: "Propose Day",
    emoji: "💍",
    date: "Feb 8",
    message: "Every moment with you feels like a dream I never want to wake up from. You are my today and all of my tomorrows. Will you be mine forever? 💍✨",
    icon: "💍",
    color: "from-yellow-300 to-amber-400",
    hasFakeRejection: true, // Enable fake rejection prank for Propose Day
  },
  {
    title: "Chocolate Day",
    emoji: "🍫",
    date: "Feb 9",
    message: "Life with you is sweeter than the finest chocolate. You melt my heart every single day. Here's a sweet treat for the sweetest person I know! 🍫🤎",
    icon: "🍫",
    color: "from-amber-600 to-yellow-700",
    hasUnwrapGift: true, // Enable unwrap gift for Chocolate Day
  },
  {
    title: "Teddy Day",
    emoji: "🧸",
    date: "Feb 10",
    message: "This teddy is soft, but not as soft as my heart is for you. Hug it tight whenever you miss me, and know that I'm always holding you close in my heart. 🧸💗",
    icon: "🧸",
    color: "from-amber-300 to-orange-400",
    hasTeddyGuess: true, // Enable teddy guessing game for Teddy Day
  },
  {
    title: "Promise Day",
    emoji: "🤝",
    date: "Feb 11",
    message: "I promise to love you endlessly, to stand by you always, and to make you smile every single day. My heart is yours, today, tomorrow, and forever. 🤞💜",
    icon: "🤝",
    color: "from-purple-400 to-indigo-500",
    hasBackwardsPrank: true, // Enable backwards prank for this day
  },
  {
    title: "Hug Day",
    emoji: "🤗",
    date: "Feb 12",
    message: "In my arms is where you belong. Every hug from you feels like coming home. I wish I could hold you forever and never let go. 🤗💚",
    icon: "🤗",
    color: "from-green-400 to-teal-500",
    hasHugTimer: true, // Enable hug timer for Hug Day
  },
  {
    title: "Kiss Day",
    emoji: "💋",
    date: "Feb 13",
    message: "Your kiss is the spark that lights up my entire universe. Every kiss from you is a love letter written on my soul. Sending you a million kisses! 💋❤️",
    icon: "💋",
    color: "from-rose-400 to-red-500",
    hasCatchKiss: true, // Enable catch kiss game for Kiss Day
  },
  {
    title: "Valentine's Day",
    emoji: "❤️",
    date: "Feb 14",
    message: "Hey baby,\n\nI know I'm not the romantic in a way you deserve but I promise you to try in every way to make you feel loved forever.\n\nI feel like stopping when there is no chaos. At that time I take pause but you inspire me to get up and enjoy the life, you make me feel that I deserve more than this. I can't imagine my life without you.\n\nYou are my childhood, I live my life through you, I feel happy when you feel happy. The best time of my day is when I see you smiling, that melts my heart and makes me feel that everything is fine or going to be fine. You give me the confidence to go on in my life. You are that sunshine for which I wake up in the morning.\n\nI love you sooooo much baby. ❤️",
    icon: "❤️",
    color: "from-pink-500 to-red-600",
    hasTypingEffect: true, // Enable typing effect for Valentine's Day
  },
];

interface DayPopupProps {
  dayIndex: number | null;
  onClose: () => void;
}

const DayPopup = ({ dayIndex, onClose }: DayPopupProps) => {
  // ALL HOOKS MUST BE BEFORE ANY CONDITIONAL RETURNS
  // Initialize states
  const [showBackwards, setShowBackwards] = useState(false);
  const [showFixMessage, setShowFixMessage] = useState(false);
  const [showCorrectMessage, setShowCorrectMessage] = useState(false);
  const [showPetalFall, setShowPetalFall] = useState(false);
  const [petalsFallen, setPetalsFallen] = useState(false);
  const [showFakeRejection, setShowFakeRejection] = useState(false);
  const [showSweetReveal, setShowSweetReveal] = useState(false);
  const [showWrappedGift, setShowWrappedGift] = useState(false);
  const [isUnwrapping, setIsUnwrapping] = useState(false);
  const [showUnwrappedMessage, setShowUnwrappedMessage] = useState(false);
  const [showTeddyGuess, setShowTeddyGuess] = useState(false);
  const [correctTeddy, setCorrectTeddy] = useState<number>(0);
  const [showTryAgain, setShowTryAgain] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showHugTimer, setShowHugTimer] = useState(false);
  const [hugProgress, setHugProgress] = useState(0);
  const [showHugDelivered, setShowHugDelivered] = useState(false);
  const [showCatchKiss, setShowCatchKiss] = useState(false);
  const [girlPosition, setGirlPosition] = useState({ x: 10, y: 50 });
  const [kissPosition, setKissPosition] = useState({ x: 80, y: 50 });
  const [showTypingEffect, setShowTypingEffect] = useState(false);
  const [typedMessage, setTypedMessage] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  // Handle backwards prank flow - useEffect is also a hook!
  useEffect(() => {
    if (dayIndex !== null) {
      const day = days[dayIndex];
      
      if (day.hasBackwardsPrank) {
        // Start with backwards text - ensure NO petal fall
        setShowBackwards(true);
        setShowFixMessage(false);
        setShowCorrectMessage(false);
        setShowPetalFall(false); // Make sure petals don't show
        setPetalsFallen(false);
        setShowFakeRejection(false);
        setShowSweetReveal(false);
        setShowWrappedGift(false);
        setIsUnwrapping(false);
        setShowTeddyGuess(false);
        setShowTryAgain(false);
        setWrongAttempts(0);
        setShowHint(false);
        setShowHugTimer(false);
        setHugProgress(0);
        setShowHugDelivered(false);
        setShowCatchKiss(false);
        setGirlPosition({ x: 10, y: 50 });
        setKissPosition({ x: 80, y: 50 });
        setShowTypingEffect(false);
        setTypedMessage("");
        setIsTypingComplete(false);

        // Show backwards text first
        const timer1 = setTimeout(() => {
          setShowBackwards(false);
          setShowFixMessage(true);
        }, 2500); // Show backwards for 2.5 seconds

        // Then show "fixing" message
        const timer2 = setTimeout(() => {
          setShowFixMessage(false);
          setShowCorrectMessage(true);
        }, 7500); // Show fix message for 5 seconds (starts after 2.5s)

        return () => {
          clearTimeout(timer1);
          clearTimeout(timer2);
        };
      } else if (day.hasPetalFall) {
        // Start with petal fall animation - ensure NO backwards text
        setShowPetalFall(true);
        setPetalsFallen(false);
        setShowCorrectMessage(false);
        setShowBackwards(false); // Make sure backwards text doesn't show
        setShowFixMessage(false);
        setShowFakeRejection(false);
        setShowSweetReveal(false);
        setShowWrappedGift(false);
        setIsUnwrapping(false);
        setShowTeddyGuess(false);
        setShowTryAgain(false);
        setWrongAttempts(0);
        setShowHint(false);
        setShowHugTimer(false);
        setHugProgress(0);
        setShowHugDelivered(false);
        setShowCatchKiss(false);
        setGirlPosition({ x: 10, y: 50 });
        setKissPosition({ x: 80, y: 50 });
        setShowTypingEffect(false);
        setTypedMessage("");
        setIsTypingComplete(false);

        // Show message after 3 seconds (petals keep falling)
        const showMessageTimer = setTimeout(() => {
          setPetalsFallen(true);
          setShowCorrectMessage(true);
        }, 3000);

        // Stop petals 2 seconds after message appears (total 5 seconds)
        const stopPetalsTimer = setTimeout(() => {
          setShowPetalFall(false);
        }, 5000); // 3s intro + 2s with message

        return () => {
          clearTimeout(showMessageTimer);
          clearTimeout(stopPetalsTimer);
        };
      } else if (day.hasFakeRejection) {
        // Start with fake rejection - ensure NO other animations
        setShowFakeRejection(true);
        setShowSweetReveal(false);
        setShowCorrectMessage(false);
        setShowBackwards(false);
        setShowFixMessage(false);
        setShowPetalFall(false);
        setPetalsFallen(false);
        setShowWrappedGift(false);
        setIsUnwrapping(false);
        setShowTeddyGuess(false);
        setShowTryAgain(false);
        setWrongAttempts(0);
        setShowHint(false);
        setShowHugTimer(false);
        setHugProgress(0);
        setShowHugDelivered(false);
        setShowCatchKiss(false);
        setGirlPosition({ x: 10, y: 50 });
        setKissPosition({ x: 80, y: 50 });
        setShowTypingEffect(false);
        setTypedMessage("");
        setIsTypingComplete(false);

        // Show sweet reveal after 3 seconds
        const timer1 = setTimeout(() => {
          setShowFakeRejection(false);
          setShowSweetReveal(true);
        }, 3000);

        // Show actual message after sweet reveal (3 more seconds - decreased from 4)
        const timer2 = setTimeout(() => {
          setShowSweetReveal(false);
          setShowCorrectMessage(true);
        }, 6000); // 3s fake rejection + 3s sweet reveal

        return () => {
          clearTimeout(timer1);
          clearTimeout(timer2);
        };
      } else if (day.hasUnwrapGift) {
        // Start with wrapped gift - ensure NO other animations
        setShowWrappedGift(true);
        setIsUnwrapping(false);
        setShowCorrectMessage(false);
        setShowBackwards(false);
        setShowFixMessage(false);
        setShowPetalFall(false);
        setPetalsFallen(false);
        setShowFakeRejection(false);
        setShowSweetReveal(false);
        setShowTeddyGuess(false);
        setShowTryAgain(false);
        setShowHugTimer(false);
        setHugProgress(0);
        setShowHugDelivered(false);
        setShowCatchKiss(false);
        setGirlPosition({ x: 10, y: 50 });
        setKissPosition({ x: 80, y: 50 });
        setShowTypingEffect(false);
        setTypedMessage("");
        setIsTypingComplete(false);
        
        // Gift is shown, waiting for user to click
        // No automatic timers - user interaction required
      } else if (day.hasTeddyGuess) {
        // Start with teddy guessing game - ensure NO other animations
        setShowTeddyGuess(true);
        setCorrectTeddy(3); // The small teddy at the bottom is always the correct one!
        setShowTryAgain(false);
        setWrongAttempts(0);
        setShowHint(false);
        setShowCorrectMessage(false);
        setShowBackwards(false);
        setShowFixMessage(false);
        setShowPetalFall(false);
        setPetalsFallen(false);
        setShowFakeRejection(false);
        setShowSweetReveal(false);
        setShowWrappedGift(false);
        setIsUnwrapping(false);
        setShowHugTimer(false);
        setHugProgress(0);
        setShowHugDelivered(false);
        setShowCatchKiss(false);
        setGirlPosition({ x: 10, y: 50 });
        setKissPosition({ x: 80, y: 50 });
        setShowTypingEffect(false);
        setTypedMessage("");
        setIsTypingComplete(false);
        
        // Teddies are shown, waiting for user to click
        // No automatic timers - user interaction required
      } else if (day.hasHugTimer) {
        // Start with hug timer - ensure NO other animations
        setShowHugTimer(true);
        setHugProgress(0);
        setShowHugDelivered(false);
        setShowCorrectMessage(false);
        setShowBackwards(false);
        setShowFixMessage(false);
        setShowPetalFall(false);
        setPetalsFallen(false);
        setShowFakeRejection(false);
        setShowSweetReveal(false);
        setShowWrappedGift(false);
        setIsUnwrapping(false);
        setShowTeddyGuess(false);
        setShowTryAgain(false);
        setWrongAttempts(0);
        setShowHint(false);

        // Animate progress from 0 to 100 over 4 seconds
        const progressInterval = setInterval(() => {
          setHugProgress(prev => {
            if (prev >= 100) {
              clearInterval(progressInterval);
              return 100;
            }
            return prev + 2; // Increment by 2 every 80ms = 4 seconds total
          });
        }, 80);

        // Show "Hug delivered!" after 4 seconds
        const hugDeliveredTimer = setTimeout(() => {
          setShowHugDelivered(true);
        }, 4000);

        // Show actual message after 2 more seconds (total 6 seconds)
        const messageTimer = setTimeout(() => {
          setShowHugTimer(false);
          setShowHugDelivered(false);
          setShowCorrectMessage(true);
        }, 6000);

        return () => {
          clearInterval(progressInterval);
          clearTimeout(hugDeliveredTimer);
          clearTimeout(messageTimer);
        };
      } else if (day.hasCatchKiss) {
        // Start with catch kiss game - ensure NO other animations
        setShowCatchKiss(true);
        setShowCorrectMessage(false);
        setShowBackwards(false);
        setShowFixMessage(false);
        setShowPetalFall(false);
        setPetalsFallen(false);
        setShowFakeRejection(false);
        setShowSweetReveal(false);
        setShowWrappedGift(false);
        setIsUnwrapping(false);
        setShowTeddyGuess(false);
        setShowTryAgain(false);
        setWrongAttempts(0);
        setShowHint(false);
        setShowHugTimer(false);
        setHugProgress(0);
        setShowHugDelivered(false);

        // Reset positions
        setGirlPosition({ x: 10, y: 50 });
        setKissPosition({ x: 80, y: 50 });

        // Move kiss to random position every 1.5 seconds (avoid girl's position)
        const kissInterval = setInterval(() => {
          setKissPosition(prev => {
            let newX, newY;
            let attempts = 0;
            
            // Try to find a position that's not too close to the girl
            do {
              newX = Math.random() * 80 + 10; // 10-90%
              newY = Math.random() * 70 + 15; // 15-85%
              
              // Calculate distance from girl
              const distanceFromGirl = Math.sqrt(
                Math.pow(newX - girlPosition.x, 2) + 
                Math.pow(newY - girlPosition.y, 2)
              );
              
              // If far enough from girl (>20% distance) or tried too many times, accept position
              if (distanceFromGirl > 20 || attempts > 5) {
                break;
              }
              attempts++;
            } while (attempts < 10);
            
            return { x: newX, y: newY };
          });
        }, 1500); // Changed from 1000ms to 1500ms

        return () => {
          clearInterval(kissInterval);
        };
      } else if (day.hasTypingEffect) {
        // Start with typing effect - ensure NO other animations
        setShowTypingEffect(true);
        setTypedMessage("");
        setIsTypingComplete(false);
        setShowCorrectMessage(false);
        setShowBackwards(false);
        setShowFixMessage(false);
        setShowPetalFall(false);
        setPetalsFallen(false);
        setShowFakeRejection(false);
        setShowSweetReveal(false);
        setShowWrappedGift(false);
        setIsUnwrapping(false);
        setShowTeddyGuess(false);
        setShowTryAgain(false);
        setWrongAttempts(0);
        setShowHint(false);
        setShowHugTimer(false);
        setHugProgress(0);
        setShowHugDelivered(false);
        setShowCatchKiss(false);
        setGirlPosition({ x: 10, y: 50 });
        setKissPosition({ x: 80, y: 50 });

        // Type message character by character
        const fullMessage = day.message;
        let currentIndex = 0;

        const typingInterval = setInterval(() => {
          if (currentIndex < fullMessage.length) {
            setTypedMessage(fullMessage.substring(0, currentIndex + 1));
            currentIndex++;
          } else {
            clearInterval(typingInterval);
            setIsTypingComplete(true);
          }
        }, 80); // Slowed from 50ms to 80ms per character

        return () => {
          clearInterval(typingInterval);
        };
      } else {
        // For non-prank days, show correct message immediately
        setShowBackwards(false);
        setShowFixMessage(false);
        setShowCorrectMessage(true);
        setShowPetalFall(false); // Ensure no petals
        setPetalsFallen(false);
        setShowFakeRejection(false);
        setShowSweetReveal(false);
        setShowWrappedGift(false);
        setIsUnwrapping(false);
        setShowTeddyGuess(false);
        setShowTryAgain(false);
        setWrongAttempts(0);
        setShowHint(false);
        setShowHugTimer(false);
        setHugProgress(0);
        setShowHugDelivered(false);
        setShowCatchKiss(false);
        setGirlPosition({ x: 10, y: 50 });
        setKissPosition({ x: 80, y: 50 });
        setShowTypingEffect(false);
        setTypedMessage("");
        setIsTypingComplete(false);
        setShowTypingEffect(false);
        setTypedMessage("");
        setIsTypingComplete(false);
      }
    }
  }, [dayIndex]);

  // Handle unwrapping the gift
  const handleUnwrap = () => {
    setIsUnwrapping(true);
    
    // After unwrap animation (1s), show the unwrapped message with animation
    setTimeout(() => {
      setShowWrappedGift(false);
      setIsUnwrapping(false);
      setShowUnwrappedMessage(true);
    }, 1000);
    
    // After the reveal animation completes, switch to normal message display
    setTimeout(() => {
      setShowUnwrappedMessage(false);
      setShowCorrectMessage(true);
    }, 1800); // 1s unwrap + 0.8s reveal animation
  };

  // Handle teddy selection
  const handleTeddyClick = (teddyIndex: number) => {
    if (teddyIndex === correctTeddy) {
      // Correct teddy!
      setShowTeddyGuess(false);
      setShowCorrectMessage(true);
    } else {
      // Wrong teddy - show try again message
      const newAttempts = wrongAttempts + 1;
      setWrongAttempts(newAttempts);
      setShowTryAgain(true);
      
      // Show hint after 3 wrong attempts
      if (newAttempts >= 3) {
        setShowHint(true);
      }
      
      // After 2.5 seconds, hide the try again message
      setTimeout(() => {
        setShowTryAgain(false);
      }, 2500); // Decreased from 3000 to 2500 (2.5 seconds)
    }
  };

  // Handle kiss click
  const handleKissClick = () => {
    setShowCatchKiss(false);
    setShowCorrectMessage(true);
  };

  // Handle girl movement with arrow keys
  useEffect(() => {
    if (!showCatchKiss) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      const step = 5;
      setGirlPosition(prev => {
        let newX = prev.x;
        let newY = prev.y;

        if (e.key === 'ArrowLeft') newX = Math.max(5, prev.x - step);
        if (e.key === 'ArrowRight') newX = Math.min(90, prev.x + step);
        if (e.key === 'ArrowUp') newY = Math.max(10, prev.y - step);
        if (e.key === 'ArrowDown') newY = Math.min(85, prev.y + step);

        return { x: newX, y: newY };
      });
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showCatchKiss]);

  // Check collision between girl and kiss
  useEffect(() => {
    if (!showCatchKiss) return;

    const distance = Math.sqrt(
      Math.pow(girlPosition.x - kissPosition.x, 2) + 
      Math.pow(girlPosition.y - kissPosition.y, 2)
    );

    // If girl is close enough to kiss (within 8% distance)
    if (distance < 8) {
      setShowCatchKiss(false);
      setShowCorrectMessage(true);
    }
  }, [girlPosition, kissPosition, showCatchKiss]);

  // Function to reverse text
  const reverseText = (text: string) => {
    return text.split('').reverse().join('');
  };

  // NOW we can do conditional returns
  if (dayIndex === null) return null;
  const day = days[dayIndex];

  return (
    <Dialog open={dayIndex !== null} onOpenChange={() => onClose()}>
      <DialogContent className="border-2 border-red-300 bg-white p-0 max-w-md overflow-hidden rounded-3xl shadow-2xl">
        <VisuallyHidden>
          <DialogTitle>{day.title}</DialogTitle>
        </VisuallyHidden>

        {/* Animated icon area */}
        <div className={`bg-gradient-to-br ${day.color} p-10 flex flex-col items-center justify-center relative overflow-hidden`}>
          {/* Floating hearts background */}
          <div className="absolute inset-0 opacity-20">
            {[...Array(12)].map((_, i) => (
              <span
                key={`heart-${i}`}
                className="absolute text-4xl animate-float-heart"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${6 + Math.random() * 3}s`,
                }}
              >
                💕
              </span>
            ))}
          </div>
          {/* Sparkles */}
          {[...Array(8)].map((_, i) => (
            <span
              key={i}
              className="absolute text-2xl animate-sparkle z-10"
              style={{
                top: `${Math.random() * 80 + 10}%`,
                left: `${Math.random() * 80 + 10}%`,
                animationDelay: `${i * 0.3}s`,
              }}
            >
              ✨
            </span>
          ))}
          <div className="text-8xl animate-bloom mb-3 relative z-10 drop-shadow-2xl">{day.icon}</div>
          <h2 className="font-romantic text-4xl text-white mt-3 drop-shadow-2xl relative z-10">
            {day.emoji} {day.title}
          </h2>
          <p className="text-white/95 text-base mt-2 font-semibold relative z-10">{day.date}</p>
        </div>

        {/* Message */}
        <div className="p-8 text-center backdrop-blur-sm relative">
          {/* Petal Fall Animation - continues throughout */}
          {showPetalFall && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
              {[...Array(25)].map((_, i) => (
                <span
                  key={`petal-${i}`}
                  className="absolute text-3xl animate-petal-fall"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: '-50px',
                    animationDuration: `${3 + Math.random() * 2}s`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationIterationCount: 'infinite',
                    filter: 'drop-shadow(0 2px 4px rgba(255,182,193,0.5))',
                  }}
                >
                  🌹
                </span>
              ))}
            </div>
          )}

          <div className="relative z-10">
            {showPetalFall && !petalsFallen && (
              <div className="space-y-4 py-8">
                <p className="text-red-600 text-3xl font-romantic animate-pulse">
                  Rose petals are falling... 🌹
                </p>
                <p className="text-gray-600 text-lg">
                  Just like my love for you 💕
                </p>
              </div>
            )}

            {showFakeRejection && (
              <div className="space-y-4 py-8">
                <p className="text-gray-600 text-3xl font-romantic animate-pulse">
                  Hmm... 🤔
                </p>
                <p className="text-gray-700 text-xl font-medium">
                  Now, I need to rethink about it...
                </p>
                <div className="flex justify-center gap-2 text-2xl mt-4">
                  <span className="animate-bounce" style={{ animationDelay: '0s' }}>💭</span>
                  <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>💭</span>
                  <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>💭</span>
                </div>
              </div>
            )}

            {showSweetReveal && (
              <div className="space-y-4 py-8">
                <p className="text-red-600 text-4xl font-romantic animate-bloom">
                  Just kidding! 😄
                </p>
                <p className="text-gray-800 text-3xl font-bold animate-pulse-glow">
                  I'm only yours! 💍✨
                </p>
                <div className="flex justify-center gap-3 text-4xl mt-4">
                  <span className="animate-pulse-glow">💖</span>
                  <span className="animate-pulse-glow" style={{ animationDelay: '0.2s' }}>💍</span>
                  <span className="animate-pulse-glow" style={{ animationDelay: '0.4s' }}>💖</span>
                </div>
              </div>
            )}

            {showWrappedGift && (
              <div className="space-y-6 py-8">
                <div 
                  className={`text-8xl cursor-pointer transition-all duration-500 ${
                    isUnwrapping ? 'animate-spin scale-150 opacity-0' : 'hover:scale-110'
                  }`}
                  onClick={handleUnwrap}
                >
                  🎁
                </div>
                <p className="text-amber-700 text-2xl font-romantic animate-pulse">
                  Click to unwrap your sweet surprise! 🍫
                </p>
                <div className="flex justify-center gap-2 text-2xl">
                  <span className="animate-bounce" style={{ animationDelay: '0s' }}>✨</span>
                  <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>🍫</span>
                  <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>✨</span>
                </div>
              </div>
            )}

            {showUnwrappedMessage && (
              <div className="animate-unwrap-reveal">
                <p className="text-gray-800 leading-relaxed text-lg font-medium">
                  {day.message}
                </p>
                <div className="mt-6 flex justify-center gap-3 text-3xl">
                  <span className="animate-pulse-glow">💖</span>
                  <span className="animate-pulse-glow" style={{ animationDelay: '0.3s' }}>✨</span>
                  <span className="animate-pulse-glow" style={{ animationDelay: '0.6s' }}>💖</span>
                </div>
              </div>
            )}

            {showTeddyGuess && (
              <div className="space-y-6 py-8">
                <p className="text-amber-600 text-2xl font-romantic animate-pulse">
                  Pick the teddy holding your message! 🧸
                </p>
                
                {/* Row 1: 3 big teddies */}
                <div className="flex justify-center gap-8 sm:gap-12 my-8">
                  {[0, 1, 2].map((index) => (
                    <div
                      key={index}
                      className="cursor-pointer transition-all duration-300 hover:scale-125 active:scale-95 touch-manipulation"
                      onClick={() => handleTeddyClick(index)}
                    >
                      <span 
                        className="text-6xl sm:text-7xl animate-bounce"
                        style={{ 
                          animationDelay: `${index * 0.2}s`,
                          display: 'block'
                        }}
                      >
                        🧸
                      </span>
                    </div>
                  ))}
                </div>

                {/* Row 3: Small teddy with hearts and text - the correct one! */}
                <div className="flex justify-center items-center gap-2 sm:gap-3 mt-8 flex-wrap px-4">
                  <span className="text-sm sm:text-base text-pink-600/60 font-romantic">Sending</span>
                  <span className="text-lg animate-pulse">💕</span>
                  <div
                    className="cursor-pointer transition-all duration-300 hover:scale-125 active:scale-95 touch-manipulation"
                    onClick={() => handleTeddyClick(3)}
                  >
                    <span 
                      className="text-2xl sm:text-3xl animate-bounce"
                      style={{ 
                        animationDelay: '0.6s',
                        display: 'block'
                      }}
                    >
                      🧸
                    </span>
                  </div>
                  <span className="text-lg animate-pulse">💕</span>
                  <span className="text-sm sm:text-base text-pink-600/60 font-romantic">always</span>
                </div>

                {/* Hint after 5 wrong attempts */}
                {showHint && (
                  <div className="bg-amber-100 rounded-2xl p-5 border-2 border-amber-400 animate-bloom mt-4">
                    <p className="text-amber-800 text-lg font-bold">
                      💡 Hint: You're forgetting the little one, try that! 💕
                    </p>
                  </div>
                )}

                {showTryAgain && !showHint && (
                  <div className="bg-orange-50 rounded-2xl p-5 border-2 border-orange-200 animate-bloom">
                    <p className="text-orange-700 text-lg font-medium">
                      Oops! Not this one, sweetie 💕
                    </p>
                    <p className="text-orange-600 text-base mt-2">
                      The teddies are shuffling... Try again! I believe in you 🧸✨
                    </p>
                  </div>
                )}
              </div>
            )}

            {showHugTimer && (
              <div className="space-y-6 py-8">
                <p className="text-green-600 text-2xl font-romantic animate-pulse">
                  Sending you a virtual hug... ⏱️
                </p>
                
                {/* Progress bar */}
                <div className="w-full max-w-md mx-auto">
                  <div className="bg-green-100 rounded-full h-8 overflow-hidden border-2 border-green-300">
                    <div 
                      className="bg-gradient-to-r from-green-400 to-teal-500 h-full transition-all duration-300 ease-out flex items-center justify-center"
                      style={{ width: `${hugProgress}%` }}
                    >
                      <span className="text-white font-bold text-sm">
                        {hugProgress}%
                      </span>
                    </div>
                  </div>
                  <p className="text-green-700 text-center mt-3 font-medium">
                    Hug loading... {hugProgress}%
                  </p>
                </div>

                {/* Girl and Boy coming together animation */}
                {!showHugDelivered && (
                  <div className="flex justify-center items-center text-8xl relative h-32">
                    <span 
                      className="transition-all duration-700 absolute"
                      style={{ 
                        left: `calc(50% - ${150 - hugProgress * 3}px - 4rem)`,
                        filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))',
                      }}
                    >
                      👧🏻
                    </span>
                    <span 
                      className="text-5xl transition-all duration-500 absolute z-10" 
                      style={{ 
                        opacity: hugProgress >= 40 && hugProgress <= 80 ? 1 : 0,
                        transform: hugProgress >= 40 && hugProgress <= 80 ? 'scale(1.2)' : 'scale(0.5)',
                      }}
                    >
                      💕
                    </span>
                    <span 
                      className="transition-all duration-700 absolute"
                      style={{ 
                        right: `calc(50% - ${150 - hugProgress * 3}px - 4rem)`,
                        filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))',
                      }}
                    >
                      👦🏻
                    </span>
                  </div>
                )}

                {/* Hug delivered message */}
                {showHugDelivered && (
                  <div className="space-y-4 animate-bloom">
                    <div className="text-7xl animate-bounce">
                      🫂
                    </div>
                    <p className="text-green-700 text-3xl font-bold animate-pulse-glow">
                      Hug delivered! 💚
                    </p>
                    <div className="flex justify-center gap-3 text-3xl">
                      <span className="animate-pulse-glow">💚</span>
                      <span className="animate-pulse-glow" style={{ animationDelay: '0.2s' }}>🫂</span>
                      <span className="animate-pulse-glow" style={{ animationDelay: '0.4s' }}>💚</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {showCatchKiss && (
              <div className="space-y-4 py-4">
                <p className="text-rose-600 text-2xl font-romantic animate-pulse">
                  Catch the kiss! 💋
                </p>
                
                {/* Game area - larger on all screens */}
                <div className="relative h-[400px] sm:h-[500px] w-full max-w-4xl mx-auto bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 rounded-3xl border-4 border-rose-300 overflow-hidden shadow-lg">
                  {/* Girl */}
                  <div
                    className="absolute transition-all duration-200 ease-out"
                    style={{
                      left: `${girlPosition.x}%`,
                      top: `${girlPosition.y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <span className="text-5xl sm:text-6xl filter drop-shadow-lg animate-pulse">
                      👧🏻
                    </span>
                  </div>

                  {/* Kiss */}
                  <div
                    className="absolute transition-all duration-700 ease-in-out"
                    style={{
                      left: `${kissPosition.x}%`,
                      top: `${kissPosition.y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <span className="text-4xl sm:text-5xl filter drop-shadow-lg animate-bounce">
                      💋
                    </span>
                  </div>

                  {/* Instructions overlay */}
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 border-2 border-rose-200">
                    <p className="text-rose-700 text-xs sm:text-sm font-semibold">
                      👧🏻 Chase the 💋!
                    </p>
                  </div>
                </div>

                {/* Mobile touch controls */}
                <div className="flex flex-col items-center gap-2 sm:hidden">
                  <button
                    onClick={() => setGirlPosition(prev => ({ ...prev, y: Math.max(10, prev.y - 5) }))}
                    className="w-16 h-16 bg-rose-200 hover:bg-rose-300 active:bg-rose-400 rounded-lg text-3xl flex items-center justify-center border-2 border-rose-300 shadow-md touch-manipulation"
                  >
                    ⬆️
                  </button>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setGirlPosition(prev => ({ ...prev, x: Math.max(5, prev.x - 5) }))}
                      className="w-16 h-16 bg-rose-200 hover:bg-rose-300 active:bg-rose-400 rounded-lg text-3xl flex items-center justify-center border-2 border-rose-300 shadow-md touch-manipulation"
                    >
                      ⬅️
                    </button>
                    <button
                      onClick={() => setGirlPosition(prev => ({ ...prev, y: Math.min(85, prev.y + 5) }))}
                      className="w-16 h-16 bg-rose-200 hover:bg-rose-300 active:bg-rose-400 rounded-lg text-3xl flex items-center justify-center border-2 border-rose-300 shadow-md touch-manipulation"
                    >
                      ⬇️
                    </button>
                    <button
                      onClick={() => setGirlPosition(prev => ({ ...prev, x: Math.min(90, prev.x + 5) }))}
                      className="w-16 h-16 bg-rose-200 hover:bg-rose-300 active:bg-rose-400 rounded-lg text-3xl flex items-center justify-center border-2 border-rose-300 shadow-md touch-manipulation"
                    >
                      ➡️
                    </button>
                  </div>
                </div>

                <div className="flex justify-center gap-2 text-2xl">
                  <span className="animate-pulse">💕</span>
                  <span className="animate-pulse" style={{ animationDelay: '0.2s' }}>💋</span>
                  <span className="animate-pulse" style={{ animationDelay: '0.4s' }}>💕</span>
                </div>
              </div>
            )}

            {showTypingEffect && (
              <div className="space-y-6 py-8">
                <p className="text-amber-900 text-2xl font-serif mb-6 text-center animate-pulse">
                  A special message, just for you... ❤️
                </p>
                
                {/* Old paper letter style */}
                <div className="relative max-w-3xl mx-auto">
                  {/* Paper texture background */}
                  <div 
                    className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 rounded-lg p-8 sm:p-10 shadow-2xl border border-amber-200 min-h-[200px] relative"
                    style={{
                      backgroundImage: `
                        linear-gradient(90deg, rgba(139, 69, 19, 0.03) 1px, transparent 1px),
                        linear-gradient(rgba(139, 69, 19, 0.03) 1px, transparent 1px)
                      `,
                      backgroundSize: '20px 20px',
                    }}
                  >
                    {/* Vintage paper stains/aging effect */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none rounded-lg"
                      style={{
                        background: 'radial-gradient(circle at 20% 30%, rgba(139, 69, 19, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(139, 69, 19, 0.2) 0%, transparent 40%)'
                      }}
                    ></div>
                    
                    {/* Handwritten text */}
                    <p 
                      className="text-gray-800 leading-loose text-lg sm:text-xl font-serif whitespace-pre-wrap relative z-10"
                      style={{ 
                        fontFamily: "'Brush Script MT', 'Lucida Handwriting', 'Segoe Script', cursive",
                        letterSpacing: '0.5px'
                      }}
                    >
                      {typedMessage}
                      {!isTypingComplete && (
                        <span className="inline-block w-0.5 h-6 bg-amber-900 ml-1 animate-pulse">|</span>
                      )}
                    </p>
                    
                    {/* Quill/pen icon while typing */}
                    {!isTypingComplete && (
                      <div className="absolute bottom-4 right-4 text-3xl opacity-40 animate-pulse">
                        🖋️
                      </div>
                    )}
                    
                    {/* Ink blot decoration */}
                    <div className="absolute top-2 right-2 text-sm opacity-20">
                      💧
                    </div>
                  </div>
                  
                  {/* Wax seal effect after completion */}
                  {isTypingComplete && (
                    <div className="flex justify-center mt-8 animate-bloom">
                      <div className="relative">
                        <div className="text-6xl">🔖</div>
                        <div className="absolute -top-2 -right-2 text-3xl animate-pulse-glow">❤️</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Hearts decoration */}
                {isTypingComplete && (
                  <div className="flex justify-center gap-3 text-3xl animate-bloom mt-6">
                    <span className="animate-pulse-glow">💖</span>
                    <span className="animate-pulse-glow" style={{ animationDelay: '0.2s' }}>❤️</span>
                    <span className="animate-pulse-glow" style={{ animationDelay: '0.4s' }}>💝</span>
                    <span className="animate-pulse-glow" style={{ animationDelay: '0.6s' }}>💗</span>
                    <span className="animate-pulse-glow" style={{ animationDelay: '0.8s' }}>💖</span>
                  </div>
                )}
              </div>
            )}

            {showBackwards && (
              <div className="space-y-4">
                <p className="text-red-600 text-2xl font-romantic animate-pulse">
                  Anhaa... something is messed up! 🤔
                </p>
                <p className="text-gray-800 leading-relaxed text-lg font-medium" style={{ direction: 'rtl' }}>
                  {reverseText(day.message)}
                </p>
              </div>
            )}
            
            {showFixMessage && (
              <div className="space-y-4">
                <p className="text-gray-700 text-lg font-medium">
                  Well, we always fix things together, don't we? 💕
                </p>
                <p className="text-gray-600 text-base">
                  What's a little mix-up between us? Let me sort this out! 😊
                </p>
                <div className="flex justify-center gap-2 text-3xl">
                  <span className="animate-bounce">🔧</span>
                  <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>✨</span>
                  <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>💖</span>
                </div>
              </div>
            )}

            {showCorrectMessage && (
              <>
                <p className="text-gray-800 leading-relaxed text-lg font-medium">
                  {day.message}
                </p>
                <div className="mt-6 flex justify-center gap-3 text-3xl">
                  <span className="animate-pulse-glow">💖</span>
                  <span className="animate-pulse-glow" style={{ animationDelay: '0.3s' }}>✨</span>
                  <span className="animate-pulse-glow" style={{ animationDelay: '0.6s' }}>💖</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Heart close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-3xl text-white/90 hover:text-white transition-all hover:scale-125 transform duration-200 drop-shadow-lg animate-pulse-glow z-20"
          aria-label="Close"
        >
          💖
        </button>
      </DialogContent>
    </Dialog>
  );
};

export { days };
export default DayPopup;
