export function MosqueBackgroundPattern({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <svg
        className="absolute w-full h-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Main mosque pattern */}
          <pattern
            id="mosque-bg-pattern"
            x="0"
            y="0"
            width="250"
            height="300"
            patternUnits="userSpaceOnUse"
          >
            <g fill="currentColor" opacity="0.04">
              {/* Main Mosque Structure */}
              {/* Central Large Dome */}
              <ellipse cx="125" cy="200" rx="50" ry="35" />
              <rect x="85" y="165" width="80" height="35" />
              
              {/* Central Tall Minaret */}
              <rect x="118" y="70" width="14" height="95" />
              <ellipse cx="125" cy="70" rx="12" ry="8" />
              <rect x="122" y="55" width="6" height="18" />
              {/* Crescent on top */}
              <circle cx="125" cy="50" r="4" />
              
              {/* Left Minaret */}
              <rect x="55" y="110" width="10" height="90" />
              <ellipse cx="60" cy="110" rx="8" ry="5" />
              <rect x="57" y="100" width="6" height="12" />
              <circle cx="60" cy="96" r="3" />
              
              {/* Right Minaret */}
              <rect x="185" y="110" width="10" height="90" />
              <ellipse cx="190" cy="110" rx="8" ry="5" />
              <rect x="187" y="100" width="6" height="12" />
              <circle cx="190" cy="96" r="3" />
              
              {/* Left Small Dome */}
              <ellipse cx="80" cy="200" rx="25" ry="18" />
              <rect x="60" y="182" width="40" height="18" />
              
              {/* Right Small Dome */}
              <ellipse cx="170" cy="200" rx="25" ry="18" />
              <rect x="150" y="182" width="40" height="18" />
              
              {/* Base/Foundation */}
              <rect x="40" y="200" width="170" height="8" />
              
              {/* Decorative arches on base */}
              <path d="M50,200 Q50,190 60,190 Q70,190 70,200" fill="none" stroke="currentColor" strokeWidth="1" />
              <path d="M80,200 Q80,190 90,190 Q100,190 100,200" fill="none" stroke="currentColor" strokeWidth="1" />
              <path d="M110,200 Q110,185 125,185 Q140,185 140,200" fill="none" stroke="currentColor" strokeWidth="1" />
              <path d="M150,200 Q150,190 160,190 Q170,190 170,200" fill="none" stroke="currentColor" strokeWidth="1" />
              <path d="M180,200 Q180,190 190,190 Q200,190 200,200" fill="none" stroke="currentColor" strokeWidth="1" />
            </g>
          </pattern>
          
          {/* Decorative Islamic geometric pattern */}
          <pattern
            id="geometric-overlay"
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <g fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.03">
              {/* 8-pointed star */}
              <polygon points="20,5 23,15 33,15 25,21 28,31 20,25 12,31 15,21 7,15 17,15" />
            </g>
          </pattern>
        </defs>
        
        {/* Apply patterns */}
        <rect width="100%" height="100%" fill="url(#mosque-bg-pattern)" />
        <rect width="100%" height="100%" fill="url(#geometric-overlay)" />
      </svg>
    </div>
  );
}

export function FloatingMosques({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Top right mosque */}
      <svg
        className="absolute -top-10 -right-20 w-96 h-96 text-accent/5"
        viewBox="0 0 200 200"
      >
        <g fill="currentColor">
          <ellipse cx="100" cy="140" rx="45" ry="30" />
          <rect x="65" y="110" width="70" height="30" />
          <rect x="93" y="40" width="14" height="70" />
          <ellipse cx="100" cy="40" rx="12" ry="8" />
          <rect x="96" y="25" width="8" height="18" />
          <circle cx="100" cy="20" r="5" />
        </g>
      </svg>
      
      {/* Bottom left mosque */}
      <svg
        className="absolute -bottom-10 -left-20 w-80 h-80 text-primary/5"
        viewBox="0 0 200 200"
      >
        <g fill="currentColor">
          <ellipse cx="100" cy="150" rx="40" ry="25" />
          <rect x="70" y="125" width="60" height="25" />
          <rect x="95" y="60" width="10" height="65" />
          <ellipse cx="100" cy="60" rx="8" ry="5" />
          <rect x="97" y="48" width="6" height="14" />
          <circle cx="100" cy="44" r="4" />
        </g>
      </svg>
      
      {/* Center decorative mosque (very faint) */}
      <svg
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] text-accent/[0.02]"
        viewBox="0 0 300 300"
      >
        <g fill="currentColor">
          <ellipse cx="150" cy="220" rx="70" ry="45" />
          <rect x="95" y="175" width="110" height="45" />
          <rect x="140" y="60" width="20" height="115" />
          <ellipse cx="150" cy="60" rx="18" ry="12" />
          <rect x="145" y="40" width="10" height="24" />
          <circle cx="150" cy="32" r="8" />
          
          {/* Side minarets */}
          <rect x="70" y="120" width="12" height="100" />
          <ellipse cx="76" cy="120" rx="10" ry="7" />
          <circle cx="76" cy="108" r="5" />
          
          <rect x="218" y="120" width="12" height="100" />
          <ellipse cx="224" cy="120" rx="10" ry="7" />
          <circle cx="224" cy="108" r="5" />
          
          {/* Small domes */}
          <ellipse cx="110" cy="220" rx="30" ry="20" />
          <ellipse cx="190" cy="220" rx="30" ry="20" />
        </g>
      </svg>
    </div>
  );
}
