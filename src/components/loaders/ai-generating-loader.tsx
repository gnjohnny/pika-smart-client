const AIGeneratingRecipeLoader = ({ size = 64, color = "#4F46E5" }) => {
  // Inline styles for the animation to ensure it works without external CSS files
  const styles = `
    @keyframes riseAndFade {
      0% { transform: translateY(0) scale(0.5); opacity: 0; }
      50% { opacity: 1; }
      100% { transform: translateY(-15px) scale(1); opacity: 0; }
    }
    .ai-sparkle {
      transform-box: fill-box;
      transform-origin: center;
      animation: riseAndFade 1.5s infinite ease-out;
    }
    .sparkle-1 { animation-delay: 0s; }
    .sparkle-2 { animation-delay: 0.5s; }
    .sparkle-3 { animation-delay: 1s; }
  `;

  return (
    <div style={{ width: size, height: size, display: "inline-block" }}>
      <style>{styles}</style>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        {/* The Cooking Pot */}
        <path
          d="M20 55 C20 75 35 90 50 90 C65 90 80 75 80 55 L80 45 L20 45 Z"
          fill={color}
          stroke={color}
          strokeWidth="4"
          strokeLinejoin="round"
        />
        {/* Pot Rim/Lip */}
        <path
          d="M15 45 L85 45"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* AI Sparkles (The "Steam") */}
        {/* Left Sparkle */}
        <path
          className="ai-sparkle sparkle-1"
          d="M40 30 L42 25 L44 30 L49 32 L44 34 L42 39 L40 34 L35 32 Z"
          fill={color}
        />
        {/* Center Sparkle (Higher) */}
        <path
          className="ai-sparkle sparkle-2"
          d="M50 20 L52 15 L54 20 L59 22 L54 24 L52 29 L50 24 L45 22 Z"
          fill={color}
        />
        {/* Right Sparkle */}
        <path
          className="ai-sparkle sparkle-3"
          d="M60 30 L62 25 L64 30 L69 32 L64 34 L62 39 L60 34 L55 32 Z"
          fill={color}
        />
      </svg>
    </div>
  );
};

export default AIGeneratingRecipeLoader;
