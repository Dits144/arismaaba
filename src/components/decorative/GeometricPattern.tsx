export function GeometricPattern({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <defs>
        <pattern
          id="islamic-pattern"
          x="0"
          y="0"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          {/* 8-pointed star pattern */}
          <polygon
            points="10,2 12,8 18,8 13,12 15,18 10,14 5,18 7,12 2,8 8,8"
            fill="currentColor"
            opacity="0.1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#islamic-pattern)" />
    </svg>
  );
}

export function WaveDivider({ 
  className = "", 
  flip = false 
}: { 
  className?: string; 
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 1440 120"
      className={`w-full ${flip ? 'rotate-180' : ''} ${className}`}
      preserveAspectRatio="none"
      fill="currentColor"
    >
      <path d="M0,64 C288,120 576,0 864,64 C1152,128 1440,32 1440,32 L1440,120 L0,120 Z" />
    </svg>
  );
}

export function GradientOrb({ 
  className = "",
  color = "accent"
}: { 
  className?: string;
  color?: "accent" | "primary";
}) {
  const colorClass = color === "accent" 
    ? "from-accent/30 to-accent/5" 
    : "from-primary/20 to-primary/5";
    
  return (
    <div 
      className={`absolute rounded-full bg-gradient-radial ${colorClass} blur-3xl ${className}`}
    />
  );
}
