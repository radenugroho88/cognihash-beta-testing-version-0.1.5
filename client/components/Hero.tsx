import { Button } from "./ui/button";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Background Wave Grid */}
      <div className="absolute inset-0 wave-grid">
        <div className="absolute top-0 left-0 w-full h-[234px] opacity-50">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/ac9e6225e937dffab147aa936eba1ed8c7458741?width=3840"
            alt="Wave Grid Top"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[234px] opacity-50">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/5e3bb49b68c0388624f60ce204d9d3c227c469b6?width=3840"
            alt="Wave Grid Bottom"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-6xl mx-auto text-center pt-20">
        <div className="space-y-6">
          {/* Main Title */}
          <h1 className="text-6xl lg:text-8xl xl:text-9xl font-bold leading-none">
            <span className="gradient-text">Automation</span>
            <span className="text-white"> for Crypto Decision</span>
          </h1>

          {/* Description */}
          <p className="text-white text-xl lg:text-3xl font-light max-w-4xl mx-auto leading-relaxed">
            CogniHash is an AI-native platform that reads complex blockchain
            data, so you don't have to. Just ask, and get actionable
            intelligence.
          </p>

          {/* CTA Button */}
          <div className="pt-8">
            <Button className="cognihash-button text-white px-8 py-3 text-lg font-medium rounded-sm hover:scale-105 transition-transform animate-glow">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
