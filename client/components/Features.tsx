import { useState, useRef, useEffect } from "react";

export function Features() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      return () => section.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const featureCards = [
    {
      title: "You Ask",
      description: "Get real answers instantly. Just type your question—no SQL, no dashboards, no devs needed.",
      gradient: "from-cognihash-primary/20 to-cognihash-secondary/20",
      icon: "💬"
    },
    {
      title: "We Orchestrate",
      description: "Our AI-native engine automates data indexing, cross-chain search, and agentic reasoning in seconds.",
      gradient: "from-cognihash-secondary/20 to-cognihash-tertiary/20",
      icon: "⚡"
    },
    {
      title: "You Get Answers",
      description: "Actionable insights delivered quickly for compliance, trading, tracing, or building DeFi.",
      gradient: "from-cognihash-tertiary/20 to-cognihash-primary/20",
      icon: "🎯"
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 lg:py-32 relative overflow-hidden cursor-crosshair">
      {/* Dynamic Background Effect */}
      <div 
        className="absolute inset-0 opacity-10 transition-all duration-500 ease-out pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 180, 159, 0.15), transparent 40%)`
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-white text-5xl lg:text-8xl font-bold leading-tight animate-fade-in-up">
            CogniHash: Built for Speed,
            <br />
            Powered by Intelligence
          </h2>
          <p className="text-white text-lg lg:text-xl max-w-3xl mx-auto animate-fade-in-up delay-200">
            CogniHash lets you cut through blockchain complexity with one simple
            prompt. No more syncing nodes, parsing logs, or chasing dashboards.
            We orchestrate the backend chaos—so you just get the insights.
          </p>
        </div>

        {/* Central Grid Visualization */}
        <div className="flex justify-center mb-16">
          <div className="relative group">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/1a8bb7077a23297a8d2b748fcbf14e207f80c4b4?width=971"
              alt="Grid Circle Visualization"
              className="w-full max-w-lg animate-float group-hover:animate-pulse-glow transition-all duration-500 hover:scale-110 cursor-pointer"
            />
            {/* Floating particles around the image */}
            <div className="absolute -inset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute top-4 left-4 w-2 h-2 bg-cognihash-secondary rounded-full animate-ping"></div>
              <div className="absolute top-8 right-8 w-1 h-1 bg-cognihash-tertiary rounded-full animate-pulse"></div>
              <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-cognihash-primary rounded-full animate-bounce"></div>
              <div className="absolute bottom-4 right-4 w-1 h-1 bg-cognihash-secondary rounded-full animate-ping delay-300"></div>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {featureCards.map((card, index) => (
            <div 
              key={index}
              className="relative group"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card Background Glow */}
              <div 
                className={`absolute -inset-1 bg-gradient-to-r ${card.gradient} rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500 animate-tilt`}
              />
              
              {/* Main Card */}
              <div className="relative border border-white rounded-2xl bg-cognihash-dark p-8 h-48 hover:bg-cognihash-card hover:border-cognihash-secondary transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cognihash-primary/20 cursor-pointer overflow-hidden group">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-cognihash-primary/5 via-transparent to-cognihash-secondary/5 animate-gradient-shift"></div>
                </div>
                
                {/* Floating Icon */}
                <div className="absolute top-4 right-4 text-2xl opacity-50 group-hover:opacity-100 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                  {card.icon}
                </div>
                
                {/* Content */}
                <div className="relative text-center space-y-4">
                  <h3 className="text-cognihash-secondary text-2xl lg:text-3xl font-bold group-hover:text-cognihash-tertiary transition-colors duration-300">
                    {card.title}
                  </h3>
                  <p className="text-white text-lg group-hover:text-gray-100 transition-colors duration-300">
                    {card.description}
                  </p>
                </div>
                
                {/* Interactive Border Animation */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 rounded-2xl border-2 border-cognihash-primary animate-pulse-border"></div>
                </div>

                {/* Ripple Effect on Hover */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-cognihash-primary/10 scale-0 group-hover:scale-100 transition-transform duration-700 ease-out rounded-full"></div>
                </div>
              </div>

              {/* Card Connection Lines */}
              {hoveredCard === index && index < featureCards.length - 1 && (
                <div className="absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-cognihash-primary to-cognihash-secondary animate-draw-line hidden md:block"></div>
              )}
            </div>
          ))}
        </div>

        {/* Interactive Cursor Follower */}
        <div 
          className="fixed w-4 h-4 pointer-events-none z-50 mix-blend-difference"
          style={{
            left: mousePosition.x - 8,
            top: mousePosition.y - 8,
            transition: 'all 0.1s ease-out'
          }}
        >
          <div className="w-full h-full bg-white rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
