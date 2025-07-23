import { useState, useEffect } from "react";

export function CallToAction() {
  const [animatedText, setAnimatedText] = useState("Data");

  const texts = ["Data", "Insight", "Decision", "Answer", "Result"];

  // Simple text rotation (in a real app you'd want proper animation)
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedText((prev) => {
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


      </div>
    </section>
  );
}
