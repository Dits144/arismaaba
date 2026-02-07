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
