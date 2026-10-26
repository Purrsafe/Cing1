import React from 'react';

interface WhiteLilyMotifProps {
  className?: string;
  variant?: 'corner' | 'center' | 'divider' | 'crest' | 'watermark' | 'sketch' | 'seal';
  size?: number;
  tone?: 'ink' | 'gold' | 'sepia';
}

export const WhiteLilyMotif: React.FC<WhiteLilyMotifProps> = ({
  className = '',
  variant = 'sketch',
  size = 56,
  tone = 'sepia',
}) => {
  const strokeColor = tone === 'ink' ? '#1C1917' : tone === 'sepia' ? '#8C714E' : '#C5A880';
  const hatchColor = tone === 'ink' ? '#44403C' : tone === 'sepia' ? '#A38350' : '#D4AF37';
  const fillColor = '#FFFFFF';

  // Architectural / Botanical Hand-Drawn Pen-and-Ink Sketch of White Lily (Matching Page 1 Grand Saigon Sketch)
  if (variant === 'sketch' || variant === 'seal') {
    return (
      <div className={`inline-flex flex-col items-center justify-center select-none ${className}`}>
        <svg
          width={size}
          height={size}
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-xs"
        >
          {variant === 'seal' && (
            <>
              {/* Outer double hand-inked circle seal */}
              <circle
                cx="60"
                cy="60"
                r="56"
                stroke={strokeColor}
                strokeWidth="1.2"
                strokeDasharray="2 3"
                opacity="0.85"
              />
              <circle
                cx="60"
                cy="60"
                r="52"
                stroke={strokeColor}
                strokeWidth="0.8"
                opacity="0.6"
              />
            </>
          )}

          {/* Lily Leaves (Stem & Foliage in Pen Hatching) */}
          <path
            d="M60 112 C58 95 56 78 60 62"
            stroke={strokeColor}
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          {/* Left curved leaf */}
          <path
            d="M59 86 C45 88 30 102 24 112 C34 100 48 94 59 90"
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth="1.1"
          />
          {/* Leaf hatching */}
          <path d="M36 102 L42 96 M42 97 L49 92 M49 93 L54 89" stroke={hatchColor} strokeWidth="0.75" />

          {/* Right curved leaf */}
          <path
            d="M61 80 C74 82 90 94 98 106 C88 95 72 88 61 84"
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth="1.1"
          />
          {/* Right leaf hatching */}
          <path d="M86 98 L80 93 M80 94 L72 89 M72 90 L66 85" stroke={hatchColor} strokeWidth="0.75" />

          {/* Lily Petals (Detailed Architectural Sketch Contours & Cross-Hatching) */}
          
          {/* Petal 1: Back Left */}
          <path
            d="M60 62 C46 54 28 46 16 52 C26 66 45 68 60 64"
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth="1.2"
          />
          {/* Hatching for shadow */}
          <path d="M30 55 L38 60 M24 53 L32 58 M40 58 L48 62" stroke={hatchColor} strokeWidth="0.7" />

          {/* Petal 2: Back Right */}
          <path
            d="M60 62 C74 54 92 46 104 52 C94 66 75 68 60 64"
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth="1.2"
          />
          <path d="M90 55 L82 60 M96 53 L88 58 M80 58 L72 62" stroke={hatchColor} strokeWidth="0.7" />

          {/* Petal 3: Top Center (Reaching upward with graceful outward tip) */}
          <path
            d="M60 60 C54 42 48 24 60 8 C72 24 66 42 60 60 Z"
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth="1.3"
          />
          {/* Center vein & feather hatchings on top petal */}
          <path d="M60 12 L60 52" stroke={strokeColor} strokeWidth="0.8" strokeDasharray="1 1.5" />
          <path d="M56 22 L59 25 M55 30 L59 33 M54 38 L59 41" stroke={hatchColor} strokeWidth="0.65" />
          <path d="M64 22 L61 25 M65 30 L61 33 M66 38 L61 41" stroke={hatchColor} strokeWidth="0.65" />

          {/* Petal 4: Bottom Left Forefront (Sweeping curve) */}
          <path
            d="M60 62 C48 64 32 72 26 86 C40 84 52 74 60 62 Z"
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth="1.3"
          />
          <path d="M38 78 L45 74 M44 80 L51 76 M31 82 L38 77" stroke={hatchColor} strokeWidth="0.7" />

          {/* Petal 5: Bottom Right Forefront */}
          <path
            d="M60 62 C72 64 88 72 94 86 C80 84 68 74 60 62 Z"
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth="1.3"
          />
          <path d="M82 78 L75 74 M76 80 L69 76 M89 82 L82 77" stroke={hatchColor} strokeWidth="0.7" />

          {/* Stamens & Anthers (Pistil reaching out with pollen-tipped anthers) */}
          {/* Center pistil */}
          <path d="M60 60 C60 48 59 36 60 28" stroke={strokeColor} strokeWidth="1.2" strokeLinecap="round" />
          <ellipse cx="60" cy="27" rx="3.5" ry="1.8" fill={strokeColor} transform="rotate(-10 60 27)" />

          {/* Left stamen 1 */}
          <path d="M59 60 C54 50 46 42 42 36" stroke={strokeColor} strokeWidth="1" strokeLinecap="round" />
          <ellipse cx="41" cy="35" rx="3" ry="1.5" fill={strokeColor} transform="rotate(-35 41 35)" />

          {/* Left stamen 2 */}
          <path d="M59 60 C52 53 40 48 34 46" stroke={strokeColor} strokeWidth="1" strokeLinecap="round" />
          <ellipse cx="33" cy="45" rx="3" ry="1.5" fill={strokeColor} transform="rotate(-60 33 45)" />

          {/* Right stamen 1 */}
          <path d="M61 60 C66 50 74 42 78 36" stroke={strokeColor} strokeWidth="1" strokeLinecap="round" />
          <ellipse cx="79" cy="35" rx="3" ry="1.5" fill={strokeColor} transform="rotate(35 79 35)" />

          {/* Right stamen 2 */}
          <path d="M61 60 C68 53 80 48 86 46" stroke={strokeColor} strokeWidth="1" strokeLinecap="round" />
          <ellipse cx="87" cy="45" rx="3" ry="1.5" fill={strokeColor} transform="rotate(60 87 45)" />

          {/* Delicate decorative dots / pollen scatter */}
          <circle cx="56" cy="52" r="0.75" fill={strokeColor} />
          <circle cx="64" cy="52" r="0.75" fill={strokeColor} />
          <circle cx="58" cy="46" r="0.65" fill={strokeColor} />
          <circle cx="62" cy="46" r="0.65" fill={strokeColor} />
        </svg>
      </div>
    );
  }

  if (variant === 'divider') {
    return (
      <div className={`flex items-center justify-center gap-3 my-3 w-full ${className}`}>
        <div className="h-[1px] flex-1 max-w-[90px] bg-gradient-to-r from-transparent to-[#C5A880]/60" />
        <div className="flex items-center gap-1.5 text-[#8C714E]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
          <svg
            width={size}
            height={size / 2}
            viewBox="0 0 80 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-[#8C714E]"
          >
            {/* Architectural Lily blossom center */}
            <path
              d="M40 6 C36 14 28 20 18 18 C28 22 35 27 38 36 C40 27 47 22 62 18 C52 20 44 14 40 6 Z"
              fill="#FFFFFF"
              stroke={strokeColor}
              strokeWidth="1.2"
            />
            <path d="M40 20 L40 12" stroke={strokeColor} strokeWidth="1" strokeLinecap="round" />
            <path d="M38 21 L34 16" stroke={strokeColor} strokeWidth="0.9" strokeLinecap="round" />
            <path d="M42 21 L46 16" stroke={strokeColor} strokeWidth="0.9" strokeLinecap="round" />
            <circle cx="40" cy="11" r="1.3" fill={strokeColor} />
            <circle cx="33" cy="15" r="1.1" fill={strokeColor} />
            <circle cx="47" cy="15" r="1.1" fill={strokeColor} />
          </svg>
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
        </div>
        <div className="h-[1px] flex-1 max-w-[90px] bg-gradient-to-l from-transparent to-[#C5A880]/60" />
      </div>
    );
  }

  if (variant === 'corner') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`pointer-events-none ${className}`}
      >
        <path
          d="M2 78 L2 2 L78 2"
          stroke="#C5A880"
          strokeWidth="0.75"
          strokeDasharray="2 2"
        />
        <path
          d="M6 74 L6 6 L74 6"
          stroke="#C5A880"
          strokeWidth="1.2"
        />
        {/* Hand-sketched Lily petal curling into corner */}
        <path
          d="M10 10 C20 10 34 16 38 32 C32 26 24 22 10 24 Z"
          fill="#FFFFFF"
          stroke={strokeColor}
          strokeWidth="0.9"
        />
        <path
          d="M10 10 C10 20 16 34 32 38 C26 32 22 24 24 10 Z"
          fill="#FAF8F5"
          stroke={strokeColor}
          strokeWidth="0.9"
        />
        <path d="M16 16 L28 28" stroke={hatchColor} strokeWidth="0.75" />
        <circle cx="10" cy="10" r="2.5" fill={strokeColor} />
      </svg>
    );
  }

  if (variant === 'watermark') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`pointer-events-none opacity-[0.07] ${className}`}
      >
        {/* Large architectural sketch Lily watermark */}
        <path
          d="M100 20 C90 55 60 75 25 80 C65 95 85 125 100 175 C115 125 135 95 175 80 C140 75 110 55 100 20 Z"
          fill="#FFFFFF"
          stroke="#8A7352"
          strokeWidth="2"
        />
        <circle cx="100" cy="90" r="6" fill="#8A7352" />
        <path d="M100 84 L100 50" stroke="#8A7352" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M94 86 L76 64" stroke="#8A7352" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M106 86 L124 64" stroke="#8A7352" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  // Fallback crest
  return (
    <div className={`inline-flex flex-col items-center justify-center ${className}`}>
      <WhiteLilyMotif variant="seal" size={size} tone={tone} />
    </div>
  );
};
