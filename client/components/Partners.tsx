export function Partners() {
  const partnerLogos = [
    "https://api.builder.io/api/v1/image/assets/TEMP/712d85962d625151c2dbe8e8a9f6a9c404bfad91?width=1596",
    "https://api.builder.io/api/v1/image/assets/TEMP/a1e3884d9dbbaccdc8b134ff09ec85bce5bb4393?width=799",
    "https://api.builder.io/api/v1/image/assets/TEMP/3f25cc0bf8917ac8c6f2a0e6f84da6962699ec32?width=745"
  ];

  const partnerNames = ["Superteam Indonesia", "Seeker", "Pyth"];

  return (
    <section className="py-20 lg:py-32">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-white text-5xl lg:text-8xl font-bold">
            Our Partner & Ecosystem
          </h2>
        </div>

        {/* Animated Logo Container */}
        <div className="relative overflow-hidden">
          <div className="flex items-center gap-16 animate-scroll">
            {/* First set of logos */}
            {partnerLogos.map((logo, index) => (
              <div key={index} className="flex-shrink-0">
                <img 
                  src={logo} 
                  alt={partnerNames[index]} 
                  className="h-16 lg:h-24 w-auto opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
            
            {/* Duplicate set for seamless animation */}
            {partnerLogos.map((logo, index) => (
              <div key={`duplicate-${index}`} className="flex-shrink-0">
                <img 
                  src={logo} 
                  alt={partnerNames[index]} 
                  className="h-16 lg:h-24 w-auto opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </section>
  );
}
