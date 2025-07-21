export function DataClarity() {
  return (
    <section className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4">
        <div className="border border-white rounded-3xl bg-cognihash-card p-8 lg:p-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-12">
              {/* Main Title */}
              <h2 className="text-4xl lg:text-6xl font-light leading-tight">
                <span className="text-white">The Data is Clear</span>
                <br />
                <span className="text-cognihash-tertiary">Understanding it Isn't</span>
              </h2>

              {/* Problem Points */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-white text-2xl lg:text-4xl font-bold mb-2">
                    Fragmented Data
                  </h3>
                  <p className="text-white text-2xl lg:text-4xl font-light">
                    On-chain and off-chain data lives in silos.
                  </p>
                </div>

                <div>
                  <h3 className="text-white text-2xl lg:text-4xl font-bold mb-2">
                    Manual Analysis
                  </h3>
                  <p className="text-white text-2xl lg:text-4xl font-light">
                    Analysis takes hours of manual work.
                  </p>
                </div>

                <div>
                  <h3 className="text-white text-2xl lg:text-4xl font-bold mb-2">
                    Common tools
                  </h3>
                  <p className="text-white text-2xl lg:text-4xl font-light">
                    required complex understanding to interpret
                  </p>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="flex justify-center">
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/638c2a9ee56a1877ed6120a92cdbf288023275bd?width=1126" 
                alt="Fragmented Data Visualization" 
                className="w-full max-w-lg rounded-3xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
