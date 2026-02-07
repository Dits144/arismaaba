export function MosqueSilhouette({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 200"
      className={className}
      preserveAspectRatio="xMidYMax slice"
      fill="currentColor"
    >
      {/* Main Dome */}
      <ellipse cx="600" cy="200" rx="120" ry="80" />
      <rect x="520" y="120" width="160" height="80" />
      
      {/* Central Minaret */}
      <rect x="580" y="20" width="40" height="100" />
      <ellipse cx="600" cy="20" rx="25" ry="15" />
      <rect x="595" y="0" width="10" height="25" />
      
      {/* Left Minaret */}
      <rect x="380" y="60" width="30" height="140" />
      <ellipse cx="395" cy="60" rx="20" ry="12" />
      <rect x="390" y="42" width="10" height="22" />
      
      {/* Right Minaret */}
      <rect x="790" y="60" width="30" height="140" />
      <ellipse cx="805" cy="60" rx="20" ry="12" />
      <rect x="800" y="42" width="10" height="22" />
      
      {/* Left Small Dome */}
      <ellipse cx="450" cy="200" rx="70" ry="50" />
      <rect x="400" y="150" width="100" height="50" />
      
      {/* Right Small Dome */}
      <ellipse cx="750" cy="200" rx="70" ry="50" />
      <rect x="700" y="150" width="100" height="50" />
      
      {/* Far Left Structure */}
      <rect x="200" y="100" width="120" height="100" />
      <ellipse cx="260" cy="100" rx="60" ry="35" />
      
      {/* Far Right Structure */}
      <rect x="880" y="100" width="120" height="100" />
      <ellipse cx="940" cy="100" rx="60" ry="35" />
      
      {/* Base */}
      <rect x="0" y="180" width="1200" height="20" />
    </svg>
  );
}

export function MosquePattern({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id="mosque-pattern"
          x="0"
          y="0"
          width="200"
          height="200"
          patternUnits="userSpaceOnUse"
        >
          {/* Single Mosque */}
          <g fill="currentColor" opacity="0.03">
            {/* Main Dome */}
            <ellipse cx="100" cy="150" rx="40" ry="25" />
            <rect x="70" y="125" width="60" height="25" />
            
            {/* Central Minaret */}
            <rect x="95" y="60" width="10" height="65" />
            <ellipse cx="100" cy="60" rx="8" ry="5" />
            <rect x="98" y="50" width="4" height="12" />
            
            {/* Left Minaret */}
            <rect x="55" y="90" width="8" height="60" />
            <ellipse cx="59" cy="90" rx="6" ry="4" />
            <rect x="57" y="82" width="4" height="10" />
            
            {/* Right Minaret */}
            <rect x="137" y="90" width="8" height="60" />
            <ellipse cx="141" cy="90" rx="6" ry="4" />
            <rect x="139" y="82" width="4" height="10" />
            
            {/* Small domes */}
            <ellipse cx="70" cy="150" rx="20" ry="12" />
            <ellipse cx="130" cy="150" rx="20" ry="12" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#mosque-pattern)" />
    </svg>
  );
}

export function IslamicArchPattern({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id="arch-pattern"
          x="0"
          y="0"
          width="50"
          height="60"
          patternUnits="userSpaceOnUse"
        >
          <g fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.08">
            {/* Islamic Arch */}
            <path d="M5,60 L5,30 Q5,10 25,10 Q45,10 45,30 L45,60" />
            {/* Inner arch */}
            <path d="M10,60 L10,32 Q10,15 25,15 Q40,15 40,32 L40,60" />
            {/* Dome top */}
            <ellipse cx="25" cy="10" rx="8" ry="4" />
            {/* Crescent */}
            <path d="M23,2 Q25,0 27,2 Q26,3 25,3 Q24,3 23,2" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#arch-pattern)" />
    </svg>
  );
}
