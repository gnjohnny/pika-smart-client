const CustomLoader = ({ size = 48, color = "#4F46E5" }) => {
  const styles = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    .spinner-track {
      transform-origin: center;
      animation: spin 1s linear infinite;
    }
  `;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading"
      aria-busy="true"
      style={{ width: size, height: size, display: "inline-block" }}
    >
      <style>{styles}</style>
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        {/* The Spinning "Plate" Ring */}
        <circle
          className="spinner-track"
          cx="50"
          cy="50"
          r="40"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray="60 140" /* Creates the "gap" in the circle */
        />

        {/* Static Background Ring (Optional, creates a track effect) */}
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke={color}
          strokeWidth="8"
          opacity="0.2"
        />

        {/* Center Icon: Fork (Static) */}
        <path
          d="M40 30 V55 C40 58 42 60 45 60 V75"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M35 30 V45 C35 48 40 48 40 45"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M45 30 V45 C45 48 40 48 40 45"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Center Icon: Knife (Static) */}
        <path
          d="M60 75 V60 C60 60 65 60 65 55 V30 C65 30 60 25 60 30 C60 35 60 75 60 75 Z"
          fill={color}
          stroke={color}
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default CustomLoader;
