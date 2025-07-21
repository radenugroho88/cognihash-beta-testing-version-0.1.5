export function WhyChoose() {
  return (
    <section className="py-20 lg:py-32">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-6">
          <h2 className="text-white text-4xl lg:text-6xl font-medium">
            Why choose CogniHash?
          </h2>
          <p className="text-white text-lg lg:text-xl max-w-4xl mx-auto">
            CogniHash is building the first AI-native OS for blockchain
            thinking. Where AI agents don't just observe the chain—they
            understand, trace, and act on it in real time.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="border border-white rounded-3xl bg-cognihash-card p-8 lg:p-12">
            <div className="space-y-6">
              <h3 className="text-cognihash-secondary text-3xl lg:text-4xl font-bold uppercase">
                Analytics ≠ Intelligence
              </h3>
              <p className="text-white text-sm lg:text-base uppercase leading-relaxed">
                CogniHash is building the first agentic AI operating system for
                the modular, real-time, onchain world.
              </p>
            </div>
          </div>

          <div className="border border-white rounded-3xl bg-cognihash-card p-8 lg:p-12">
            <div className="space-y-6">
              <h3 className="text-cognihash-secondary text-3xl lg:text-4xl font-bold uppercase">
                Versatile & Adaptable
              </h3>
              <p className="text-white text-sm lg:text-base uppercase leading-relaxed">
                CogniHash architecture seamlessly integrates with any existing
                blockchain protocol—from DeFi to other on-chain activities and
                beyond.
              </p>
            </div>
          </div>

          <div className="border border-white rounded-3xl bg-cognihash-card p-8 lg:p-12">
            <div className="space-y-6">
              <h3 className="text-cognihash-secondary text-3xl lg:text-4xl font-bold uppercase">
                User Friendly
              </h3>
              <p className="text-white text-sm lg:text-base uppercase leading-relaxed">
                Each agent owns a single responsibility. The system coordinates.
                Control is composable.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
