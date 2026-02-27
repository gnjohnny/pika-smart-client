import { useId } from "react";

const CustomTrashSvg = ({ className }: { className?: string }) => {
  // useId ensures the clipPath ID is unique even if multiple loaders render simultaneously
  const clipId = useId();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={className}
    >
      <defs>
        <clipPath id={clipId}>
          <rect x="0" y="0" width="100" height="43" />
        </clipPath>
      </defs>

      {/* Outer Rotating Track */}
      <circle
        cx="50"
        cy="50"
        r="46"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        opacity="0.15"
      />
      <circle
        cx="50"
        cy="50"
        r="46"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeDasharray="140 280"
        strokeLinecap="round"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 50 50"
          to="360 50 50"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Falling Recipe Card (Clipped to disappear inside bin) */}
      <g clipPath={`url(#${clipId})`}>
        <g>
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,-25; 0,25"
            dur="1s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0; 1; 1"
            keyTimes="0; 0.2; 1"
            dur="1s"
            repeatCount="indefinite"
          />

          {/* Recipe Card Body */}
          <rect
            x="36"
            y="15"
            width="28"
            height="34"
            rx="3"
            fill="currentColor"
            opacity="0.8"
          />
          {/* Card Lines */}
          <line
            x1="42"
            y1="24"
            x2="58"
            y2="24"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <line
            x1="42"
            y1="32"
            x2="58"
            y2="32"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <line
            x1="42"
            y1="40"
            x2="50"
            y2="40"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </g>
      </g>

      {/* Shaking Trash Bin */}
      <g
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0,0; -1,0; 1,0; -1,0; 1,0; 0,0"
          dur="1s"
          repeatCount="indefinite"
        />
        {/* Bin Body */}
        <path d="M 32 43 L 38 76 L 62 76 L 68 43 Z" />
        {/* Vertical Ridges */}
        <line x1="42" y1="52" x2="44" y2="67" />
        <line x1="50" y1="52" x2="50" y2="67" />
        <line x1="58" y1="52" x2="56" y2="67" />

        {/* Lid base */}
        <line x1="28" y1="38" x2="72" y2="38" />
        {/* Lid Handle */}
        <path d="M 44 38 L 44 31 L 56 31 L 56 38" />
      </g>
    </svg>
  );
};

export default CustomTrashSvg;
