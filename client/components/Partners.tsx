export function Partners() {
  const partnerLogos = [
    "https://cdn.builder.io/api/v1/image/assets%2F1bea0cc41c084038a6a915a367aa70f5%2Fbb3e2892ca2f4c04839193967499c733?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F1bea0cc41c084038a6a915a367aa70f5%2F2db5bf5685db406c88a30a834c36204e?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F1bea0cc41c084038a6a915a367aa70f5%2F889c581941c149a5a9937d3ed6d7a3bd?format=webp&width=800",
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
          <div className="flex items-center gap-16 animate-scroll-infinite">
            {/* First set of logos */}
            {partnerLogos.map((logo, index) => (
              <div key={index} className="flex-shrink-0 min-w-0">
                <img
                  src={logo}
                  alt={partnerNames[index]}
                  className="h-16 lg:h-24 w-auto opacity-80 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}

            {/* Duplicate set for seamless animation */}
            {partnerLogos.map((logo, index) => (
              <div key={`duplicate-${index}`} className="flex-shrink-0 min-w-0">
                <img
                  src={logo}
                  alt={partnerNames[index]}
                  className="h-16 lg:h-24 w-auto opacity-80 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}

            {/* Triple set for extra smoothness */}
            {partnerLogos.map((logo, index) => (
              <div key={`triple-${index}`} className="flex-shrink-0 min-w-0">
                <img
                  src={logo}
                  alt={partnerNames[index]}
                  className="h-16 lg:h-24 w-auto opacity-80 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
