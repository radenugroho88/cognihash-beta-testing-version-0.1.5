import { useState, useEffect } from "react";

export function DataClarity() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"problems" | "solution">(
    "problems",
  );

  const problemPoints = [
    {
      title: "Fragmented Data",
      description:
        "Blockchain data scattered across multiple sources, making comprehensive analysis nearly impossible.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          />
        </svg>
      ),
      metric: "85%",
      metricLabel: "Sources Disconnected",
      color: "red",
      gradient: "from-red-500/10 to-red-600/5",
    },
    {
      title: "Manual Analysis",
      description:
        "Time-consuming manual processes that delay critical decision-making in fast-moving markets.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      metric: "12h",
      metricLabel: "Average Analysis Time",
      color: "amber",
      gradient: "from-amber-500/10 to-amber-600/5",
    },
    {
      title: "Complex Tools",
      description:
        "Existing solutions require extensive technical knowledge, limiting accessibility for most users.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
      metric: "73%",
      metricLabel: "Users Need Training",
      color: "purple",
      gradient: "from-purple-500/10 to-purple-600/5",
    },
  ];

  const solutionPoints = [
    {
      title: "Unified Intelligence",
      description:
        "AI agents automatically aggregate and correlate data from all blockchain sources.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      metric: "100%",
      metricLabel: "Sources Connected",
      color: "green",
      gradient: "from-cognihash-primary/10 to-cognihash-secondary/5",
    },
    {
      title: "Instant Results",
      description:
        "Real-time analysis powered by AI delivers insights in seconds, not hours.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      metric: "<30s",
      metricLabel: "Response Time",
      color: "blue",
      gradient: "from-cognihash-secondary/10 to-cognihash-tertiary/5",
    },
    {
      title: "Natural Language",
      description:
        "Simple conversational interface - just ask questions in plain English.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      ),
      metric: "0%",
      metricLabel: "Technical Knowledge Required",
      color: "emerald",
      gradient: "from-cognihash-tertiary/10 to-cognihash-primary/5",
    },
  ];

  const currentData = activeTab === "problems" ? problemPoints : solutionPoints;

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,180,159,0.3)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(0,180,159,0.05)_1px,transparent_1px),linear-gradient(-45deg,rgba(20,241,178,0.05)_1px,transparent_1px)] bg-[length:60px_60px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block relative">
            <h2 className="text-4xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
              <span className="text-white block mb-2">The Data is Clear</span>
              <span className="gradient-text block">
                Understanding it Isn't
              </span>
            </h2>

            {/* Decorative Elements */}
            <div className="absolute -top-8 -right-12 w-16 h-16 border border-cognihash-primary/20 rounded-xl rotate-45 animate-pulse"></div>
            <div className="absolute -bottom-8 -left-12 w-12 h-12 border border-cognihash-secondary/30 rounded-full animate-bounce"></div>
          </div>

          <p className="text-white/70 text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed mt-6">
            Traditional blockchain analysis creates more problems than it
            solves.
            <span className="text-cognihash-tertiary font-medium">
              {" "}
              We're changing that.
            </span>
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex gap-2">
            <button
              onClick={() => setActiveTab("problems")}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === "problems"
                  ? "bg-red-500/20 text-red-300 border border-red-400/30"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              Current Problems
            </button>
            <button
              onClick={() => setActiveTab("solution")}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === "solution"
                  ? "bg-cognihash-primary/20 text-cognihash-tertiary border border-cognihash-primary/30"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              CogniHash Solution
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Visual Representation */}
          <div className="lg:col-span-5">
            <div className="sticky top-8">
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 lg:p-10">
                {/* Background Glow */}
                <div
                  className={`absolute inset-0 rounded-3xl transition-all duration-1000 ${
                    activeTab === "problems"
                      ? "bg-gradient-to-br from-red-500/5 via-transparent to-orange-500/5"
                      : "bg-gradient-to-br from-cognihash-primary/5 via-transparent to-cognihash-secondary/5"
                  }`}
                ></div>

                <div className="relative z-10">
                  <h3
                    className={`text-center text-xl font-bold mb-8 transition-colors duration-500 ${
                      activeTab === "problems"
                        ? "text-red-300"
                        : "text-cognihash-tertiary"
                    }`}
                  >
                    {activeTab === "problems"
                      ? "Current State: Fragmented"
                      : "CogniHash: Unified"}
                  </h3>

                  {/* Central Visualization */}
                  <div className="relative w-48 h-48 mx-auto mb-8">
                    {/* Central Hub */}
                    <div
                      className={`absolute inset-8 rounded-full border-2 flex items-center justify-center transition-all duration-1000 ${
                        activeTab === "problems"
                          ? "bg-gradient-to-br from-red-500/20 to-orange-500/20 border-red-400/40"
                          : "bg-gradient-to-br from-cognihash-primary/20 to-cognihash-secondary/20 border-cognihash-primary/40"
                      }`}
                    >
                      <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ${
                          activeTab === "problems"
                            ? "bg-red-500/30 border border-red-400/50"
                            : "bg-cognihash-primary/30 border border-cognihash-primary/50"
                        }`}
                      >
                        {activeTab === "problems" ? (
                          <svg
                            className="w-8 h-8 text-red-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.34 16.5c-.77.833.192 2.5 1.732 2.5z"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-8 h-8 text-cognihash-tertiary"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                          </svg>
                        )}
                      </div>
                    </div>

                    {/* Orbiting Data Points */}
                    {[0, 1, 2, 3, 4, 5].map((index) => {
                      const angle = index * 60 * (Math.PI / 180);
                      const radius = 80;
                      const x = 50 + (radius / 2) * Math.cos(angle);
                      const y = 50 + (radius / 2) * Math.sin(angle);

                      return (
                        <div
                          key={index}
                          className={`absolute w-6 h-6 rounded-full border transition-all duration-1000 ${
                            activeTab === "problems"
                              ? "bg-gray-600/40 border-gray-500/60 animate-pulse"
                              : "bg-cognihash-primary/40 border-cognihash-primary/60"
                          }`}
                          style={{
                            top: `${y}%`,
                            left: `${x}%`,
                            transform: "translate(-50%, -50%)",
                            animationDelay: `${index * 0.2}s`,
                          }}
                        >
                          {activeTab === "solution" && (
                            <div className="w-full h-full rounded-full bg-cognihash-secondary/30 animate-ping"></div>
                          )}
                        </div>
                      );
                    })}

                    {/* Connection Lines for Solution */}
                    {activeTab === "solution" && (
                      <div className="absolute inset-0">
                        {[0, 1, 2].map((index) => (
                          <div
                            key={index}
                            className="absolute w-0.5 bg-gradient-to-t from-cognihash-primary/30 to-transparent rounded-full"
                            style={{
                              height: "40px",
                              top: "50%",
                              left: "50%",
                              transformOrigin: "bottom",
                              transform: `translate(-50%, -100%) rotate(${index * 120}deg)`,
                              animation: `connectionPulse 2s ease-in-out infinite ${index * 0.3}s`,
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Status Indicator */}
                  <div className="text-center">
                    <div
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-500 ${
                        activeTab === "problems"
                          ? "bg-red-500/10 border-red-400/30 text-red-300"
                          : "bg-cognihash-primary/10 border-cognihash-primary/30 text-cognihash-tertiary"
                      }`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${
                          activeTab === "problems"
                            ? "bg-red-400 animate-pulse"
                            : "bg-cognihash-secondary animate-ping"
                        }`}
                      ></div>
                      <span className="text-sm font-medium">
                        {activeTab === "problems"
                          ? "Disconnected & Complex"
                          : "Connected & Simple"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Cards */}
          <div className="lg:col-span-7">
            <div className="space-y-4">
              {currentData.map((item, index) => (
                <div
                  key={index}
                  className="group relative"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div
                    className={`
                    relative bg-white/5 backdrop-blur-xl border rounded-2xl p-6 transition-all duration-500 cursor-pointer
                    ${
                      hoveredIndex === index
                        ? `border-${item.color}-400/40 bg-white/10 transform translate-x-2 shadow-2xl`
                        : "border-white/10 hover:border-white/20"
                    }
                  `}
                  >
                    {/* Background Gradient */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    ></div>

                    <div className="relative z-10 flex items-start gap-6">
                      {/* Icon */}
                      <div
                        className={`
                        w-14 h-14 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center
                        transition-all duration-300 group-hover:scale-110 group-hover:bg-white/20
                        ${hoveredIndex === index ? `text-${item.color}-300` : "text-white/60"}
                      `}
                      >
                        {item.icon}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h4
                          className={`text-xl lg:text-2xl font-bold mb-3 transition-colors duration-300 ${
                            hoveredIndex === index
                              ? "text-cognihash-tertiary"
                              : "text-white"
                          }`}
                        >
                          {item.title}
                        </h4>
                        <p
                          className={`text-lg leading-relaxed transition-colors duration-300 ${
                            hoveredIndex === index
                              ? "text-white"
                              : "text-white/70"
                          }`}
                        >
                          {item.description}
                        </p>
                      </div>

                      {/* Metric */}
                      <div className="text-right flex-shrink-0">
                        <div
                          className={`text-2xl lg:text-3xl font-bold transition-colors duration-300 ${
                            activeTab === "problems"
                              ? "text-red-400"
                              : "text-cognihash-secondary"
                          }`}
                        >
                          {item.metric}
                        </div>
                        <div
                          className={`text-xs text-white/60 mt-1 transition-colors duration-300 ${
                            hoveredIndex === index ? "text-white/80" : ""
                          }`}
                        >
                          {item.metricLabel}
                        </div>
                      </div>
                    </div>

                    {/* Progress Indicator */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5 rounded-b-2xl overflow-hidden">
                      <div
                        className={`h-full transition-all duration-700 ease-out ${
                          activeTab === "problems"
                            ? `bg-gradient-to-r ${item.gradient}`
                            : "bg-gradient-to-r from-cognihash-primary to-cognihash-secondary"
                        }`}
                        style={{
                          width: hoveredIndex === index ? "100%" : "0%",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <div className="relative inline-block">
            <div className="bg-gradient-to-r from-cognihash-primary to-cognihash-secondary p-1 rounded-2xl">
              <div className="bg-cognihash-dark rounded-2xl px-8 py-6">
                <h3 className="text-white text-xl lg:text-2xl font-bold mb-2">
                  Ready to Experience the Difference?
                </h3>
                <p className="text-cognihash-tertiary text-lg">
                  Join thousands who've already transformed their blockchain
                  analysis workflow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
