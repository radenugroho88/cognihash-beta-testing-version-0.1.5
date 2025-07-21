export function BuiltForSpeed() {
  return (
    <section className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-white text-5xl lg:text-8xl font-bold">
            Purpose-Built to Clarity & Advantage
          </h2>
          <p className="text-white text-lg lg:text-xl max-w-3xl mx-auto">
            From query to clarity—instantly. Deeper insights. No-code answers.
            Zero data grind.
          </p>
        </div>

        {/* Central Visualization */}
        <div className="flex justify-center mb-16">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/0087a03421e5fae8a768f794a8ce5891b47d06a6?width=1274"
            alt="Purpose Built Visualization"
            className="w-full max-w-2xl animate-float"
          />
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="relative">
            <div className="border border-white rounded-2xl bg-cognihash-dark p-8 h-48">
              <div className="text-center space-y-4">
                <h3 className="text-cognihash-secondary text-2xl lg:text-3xl font-bold">
                  Deeper Insights
                </h3>
                <p className="text-white text-lg">
                  Provide insights and solutions with analysis, improving
                  decision-making through data interpretation.
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="border border-white rounded-2xl bg-cognihash-dark p-8 h-48">
              <div className="text-center space-y-4">
                <h3 className="text-cognihash-secondary text-2xl lg:text-3xl font-bold">
                  No-Code Interface
                </h3>
                <p className="text-white text-lg">
                  Intuitive design, efficient for all users, enabling seamless
                  integration and adaptability without technical expertise.
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="border border-white rounded-2xl bg-cognihash-dark p-8 h-48">
              <div className="text-center space-y-4">
                <h3 className="text-cognihash-secondary text-2xl lg:text-3xl font-bold">
                  You Get Answers
                </h3>
                <p className="text-white text-lg">
                  Minimize with no-code, user-friendly interface, optimizing
                  resource use and boosting efficiency.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
