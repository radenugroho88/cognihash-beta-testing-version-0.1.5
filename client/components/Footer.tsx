import { ChevronRight } from "lucide-react";

export function Footer() {
  return (
    <footer
      className="relative pt-16 pb-8"
      style={{
        background:
          "linear-gradient(180deg, rgba(14, 21, 26, 0.75) 0%, #134156 28.07%, #00B49F 75%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Products */}
          <div className="space-y-4">
            <h3 className="text-white text-xl font-bold">Products</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-white text-lg hover:text-cognihash-secondary transition-colors"
                >
                  CogniHash AI
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-white text-xl font-bold">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-white text-lg hover:text-cognihash-secondary transition-colors"
                >
                  Cogni Docs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white text-lg hover:text-cognihash-secondary transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white text-lg hover:text-cognihash-secondary transition-colors"
                >
                  Integrations
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white text-lg hover:text-cognihash-secondary transition-colors"
                >
                  Community
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-white text-xl font-bold">Company</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-white text-lg hover:text-cognihash-secondary transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white text-lg hover:text-cognihash-secondary transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white text-lg hover:text-cognihash-secondary transition-colors"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white text-lg hover:text-cognihash-secondary transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white text-lg hover:text-cognihash-secondary transition-colors"
                >
                  YouTube
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white text-lg hover:text-cognihash-secondary transition-colors"
                >
                  Brandkit
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4 lg:col-span-1">
            <p className="text-white text-lg">
              Sign up for our newsletter to stay up to date
            </p>

            {/* Newsletter Form */}
            <div className="flex border-b border-white">
              <input
                type="email"
                placeholder="Your email..."
                className="flex-1 bg-transparent text-white placeholder-white/70 py-6 px-0 border-0 outline-0 text-lg"
              />
              <button className="p-6 hover:bg-white/10 transition-colors">
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            {/* Status */}
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-white"></div>
              <span className="text-white text-lg">
                All systems operational
              </span>
            </div>

            {/* Legal Links */}
            <div className="flex gap-8">
              <a
                href="#"
                className="text-white text-lg hover:text-cognihash-secondary transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-white text-lg hover:text-cognihash-secondary transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>

        {/* Large Logo */}
        <div className="flex justify-end items-center gap-8 mt-16">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/bcac5662857d490b76161671e482b0b47c4bc27a?width=620"
            alt="CogniHash Logo"
            className="w-32 h-32"
          />
          <h2 className="text-white text-8xl lg:text-9xl font-jakarta font-bold">
            CogniHash
          </h2>
        </div>
      </div>
    </footer>
  );
}
