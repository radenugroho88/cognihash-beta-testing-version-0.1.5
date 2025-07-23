import { useState, useEffect } from "react";

export function DataClarity() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => (prev >= 100 ? 0 : prev + 0.5));
    }, 50);
    return () => clearInterval(timer);
  }, []);

  const problemPoints = [
    {
      title: "Fragmented Data",
      description: "On-chain and off-chain data lives in silos.",
      icon: "🔗",
      metric: "85%",
      metricLabel: "Data Sources Disconnected",
      gradient: "from-red-500/20 to-orange-500/20",
      accentColor: "border-red-400/50"
    },
    {
      title: "Manual Analysis", 
      description: "Analysis takes hours of manual work.",
      icon: "⏱️",
      metric: "12h",
      metricLabel: "Average Analysis Time",
      gradient: "from-yellow-500/20 to-amber-500/20",
      accentColor: "border-yellow-400/50"
    },
    {
      title: "Complex Tools",
      description: "Required complex understanding to interpret",
      icon: "🧩",
      metric: "73%",
      metricLabel: "Users Need Training",
      gradient: "from-purple-500/20 to-violet-500/20",
      accentColor: "border-purple-400/50"
    }
  ];

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-cognihash-primary via-transparent to-cognihash-secondary"></div>
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 180, 159, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 180, 159, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            transform: `translateX(${progress * 0.5}px) translateY(${progress * 0.3}px)`
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="relative inline-block">
            <h2 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
              <span className="text-white block">The Data is Clear</span>
              <span className="gradient-text block">Understanding it Isn't</span>
            </h2>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-8 w-4 h-4 bg-cognihash-secondary rounded-full animate-ping opacity-60"></div>
            <div className="absolute -bottom-4 -left-8 w-3 h-3 bg-cognihash-tertiary rounded-full animate-bounce opacity-80"></div>
          </div>
          
          <p className="text-white/80 text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed">
            Traditional blockchain analysis is broken. We're fixing it with AI-native intelligence.
          </p>
        </div>

        {/* Main Problem Showcase */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left: Problem Visualization */}
          <div className="relative">
            {/* Glassmorphism Container */}
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 lg:p-12">
              <div className="absolute inset-0 bg-gradient-to-br from-cognihash-primary/5 via-transparent to-cognihash-secondary/5 rounded-3xl"></div>
              
              {/* Central Data Hub Visualization */}
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <h3 className="text-white text-2xl font-bold mb-4">Current State</h3>
                  <div className="relative w-32 h-32 mx-auto">
                    {/* Central Circle */}
                    <div className="absolute inset-4 bg-gradient-to-br from-red-500/40 to-orange-500/40 rounded-full border-2 border-red-400/60 flex items-center justify-center">
                      <span className="text-2xl">📊</span>
                    </div>
                    
                    {/* Orbiting Data Points */}
                    {[0, 1, 2, 3].map((index) => (
                      <div
                        key={index}
                        className="absolute w-6 h-6 bg-gray-500/60 rounded-full border border-gray-400/40"
                        style={{
                          top: `${50 + 40 * Math.sin((index * Math.PI) / 2 + progress * 0.02)}%`,
                          left: `${50 + 40 * Math.cos((index * Math.PI) / 2 + progress * 0.02)}%`,
                          transform: 'translate(-50%, -50%)'
                        }}
                      >
                        <div className="w-full h-full rounded-full animate-pulse bg-red-400/40"></div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Disconnected Status */}
                  <div className="flex items-center justify-center gap-2 text-red-400">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">Fragmented & Isolated</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Stats */}
            <div className="absolute -top-6 -right-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">85%</div>
                <div className="text-xs text-white/60">Disconnected</div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400">12h</div>
                <div className="text-xs text-white/60">Manual Work</div>
              </div>
            </div>
          </div>

          {/* Right: Problem List */}
          <div className="space-y-6">
            <h3 className="text-white text-3xl lg:text-4xl font-bold mb-8">
              The Problems We Solve
            </h3>
            
            {problemPoints.map((problem, index) => (
              <div
                key={index}
                className="group relative"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Problem Card */}
                <div className={`
                  relative bg-white/5 backdrop-blur-xl border rounded-2xl p-6 transition-all duration-500 cursor-pointer
                  ${hoveredIndex === index 
                    ? `${problem.accentColor} bg-white/10 transform scale-105 shadow-2xl shadow-cognihash-primary/20` 
                    : 'border-white/10 hover:border-white/20'
                  }
                `}>
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${problem.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  <div className="relative z-10 flex items-start gap-4">
                    {/* Icon */}
                    <div className={`
                      w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-xl
                      transition-all duration-300 group-hover:scale-110 group-hover:rotate-12
                    `}>
                      {problem.icon}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white text-xl lg:text-2xl font-bold mb-2 group-hover:text-cognihash-tertiary transition-colors">
                        {problem.title}
                      </h4>
                      <p className="text-white/80 text-lg group-hover:text-white transition-colors">
                        {problem.description}
                      </p>
                    </div>
                    
                    {/* Metric */}
                    <div className="text-right">
                      <div className="text-2xl font-bold text-red-400 group-hover:text-cognihash-secondary transition-colors">
                        {problem.metric}
                      </div>
                      <div className="text-xs text-white/60 group-hover:text-white/80 transition-colors">
                        {problem.metricLabel}
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 rounded-b-2xl overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${problem.gradient} transition-all duration-700 ease-out`}
                      style={{ 
                        width: hoveredIndex === index ? '100%' : '0%' 
                      }}
                    ></div>
                  </div>
                </div>

                {/* Connection Line */}
                {hoveredIndex === index && index < problemPoints.length - 1 && (
                  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-0.5 h-6 bg-gradient-to-b from-cognihash-primary to-transparent animate-draw-line"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Solution Preview */}
        <div className="text-center">
          <div className="relative inline-block">
            <div className="bg-gradient-to-r from-cognihash-primary to-cognihash-secondary p-1 rounded-3xl">
              <div className="bg-cognihash-dark rounded-3xl px-8 py-6">
                <h3 className="text-white text-2xl lg:text-3xl font-bold mb-2">
                  CogniHash Changes Everything
                </h3>
                <p className="text-cognihash-tertiary text-lg">
                  From fragmented to unified. From hours to seconds. From complex to simple.
                </p>
              </div>
            </div>
            
            {/* Arrow Indicator */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="w-6 h-6 bg-cognihash-secondary rounded-full flex items-center justify-center animate-bounce">
                <svg className="w-4 h-4 text-cognihash-dark" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L9 9.586V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cognihash-tertiary rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animation: `float 6s ease-in-out infinite`
            }}
          />
        ))}
      </div>
    </section>
  );
}
