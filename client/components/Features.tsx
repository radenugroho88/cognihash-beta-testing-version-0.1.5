export function Features() {
  return (
    <section className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-white text-5xl lg:text-8xl font-bold leading-tight">
            CogniHash: Built for Speed,
            <br />
            Powered by Intelligence
          </h2>
          <p className="text-white text-lg lg:text-xl max-w-3xl mx-auto">
            CogniHash lets you cut through blockchain complexity with one simple
            prompt. No more syncing nodes, parsing logs, or chasing dashboards.
            We orchestrate the backend chaos—so you just get the insights.
          </p>
        </div>

        {/* Central Grid Visualization */}
        <div className="flex justify-center mb-16">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/1a8bb7077a23297a8d2b748fcbf14e207f80c4b4?width=971"
            alt="Grid Circle Visualization"
            className="w-full max-w-lg animate-float"
          />
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="relative">
            <div className="border border-white rounded-2xl bg-cognihash-dark p-8 h-48 hover:bg-cognihash-card hover:border-cognihash-secondary transition-all duration-300 hover:scale-105">
              <div className="text-center space-y-4">
                <h3 className="text-cognihash-secondary text-2xl lg:text-3xl font-bold">
                  You Ask
                </h3>
                <p className="text-white text-lg">
                  Get real answers instantly. Just type your question—no SQL, no
                  dashboards, no devs needed.
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="border border-white rounded-2xl bg-cognihash-dark p-8 h-48 hover:bg-cognihash-card hover:border-cognihash-secondary transition-all duration-300 hover:scale-105">
              <div className="text-center space-y-4">
                <h3 className="text-cognihash-secondary text-2xl lg:text-3xl font-bold">
                  We Orchestrate
                </h3>
                <p className="text-white text-lg">
                  Our AI-native engine automates data indexing, cross-chain
                  search, and agentic reasoning in seconds.
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="border border-white rounded-2xl bg-cognihash-dark p-8 h-48 hover:bg-cognihash-card hover:border-cognihash-secondary transition-all duration-300 hover:scale-105">
              <div className="text-center space-y-4">
                <h3 className="text-cognihash-secondary text-2xl lg:text-3xl font-bold">
                  You Get Answers
                </h3>
                <p className="text-white text-lg">
                  Actionable insights delivered quickly for compliance, trading,
                  tracing, or building DeFi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
