import { useState } from "react";

export function CallToAction() {
  const [animatedText, setAnimatedText] = useState("Data");
  
  const texts = ["Data", "Insight", "Decision", "Answer", "Result"];
  
  // Simple text rotation (in a real app you'd want proper animation)
  React.useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedText(prev => {
        const currentIndex = texts.indexOf(prev);
        const nextIndex = (currentIndex + 1) % texts.length;
        return texts[nextIndex];
      });
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main CTA Section */}
        <div className="text-center mb-16 space-y-6">
          <h2 className="text-white text-5xl lg:text-8xl font-bold">
            You Ask. We Built It.
          </h2>
          <p className="text-white text-lg lg:text-xl">
            CogniHash Mobile is almost here—built for speed, made for you.
          </p>
        </div>

        {/* Animated Text Section */}
        <div className="text-center mb-16">
          <h3 className="text-white text-5xl lg:text-8xl font-light inline-block mr-8">
            Go Straight to
          </h3>
          <span className="text-cognihash-secondary text-5xl lg:text-8xl font-normal">
            {animatedText}
          </span>
        </div>

        {/* Feature Highlight Boxes */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="border border-white rounded-3xl p-16 text-center">
            <h4 className="text-cognihash-secondary text-4xl lg:text-6xl font-bold uppercase">
              Agent Powered
            </h4>
          </div>
          
          <div className="border border-white rounded-3xl p-16 text-center">
            <h4 className="text-cognihash-secondary text-4xl lg:text-6xl font-bold uppercase">
              Built for Speed
            </h4>
          </div>
          
          <div className="border border-white rounded-3xl bg-cognihash-card p-16 text-center">
            <h4 className="text-cognihash-secondary text-4xl lg:text-6xl font-bold uppercase">
              No Code Flow
            </h4>
          </div>
        </div>

        {/* Demo Images */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="border border-white rounded-3xl overflow-hidden">
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/d80490ce4d2b404c231ead52517261c8f77531be?width=1346" 
              alt="CogniHash Interface Demo" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="border border-white rounded-3xl overflow-hidden">
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/27880eae650ced34709b275292b4ca4107ca04b4?width=2302" 
              alt="CogniHash Mobile Demo" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
