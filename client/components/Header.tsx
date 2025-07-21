import { Button } from "./ui/button";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 lg:px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img 
            src="https://api.builder.io/api/v1/image/assets/TEMP/6aa47291b1deceac179cead818ec277edb612266?width=112" 
            alt="CogniHash Logo" 
            className="w-14 h-14"
          />
          <h1 className="text-white font-jakarta font-bold text-2xl lg:text-3xl">
            CogniHash
          </h1>
        </div>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-6 px-8 py-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm">
            <a href="#" className="text-white hover:text-cognihash-secondary transition-colors">
              Products
            </a>
            <a href="#" className="text-white hover:text-cognihash-secondary transition-colors">
              Resources
            </a>
            <a href="#" className="text-white hover:text-cognihash-secondary transition-colors">
              Pricing
            </a>
            <a href="#" className="text-white hover:text-cognihash-secondary transition-colors">
              Blog
            </a>
          </div>
        </nav>

        {/* CTA Button */}
        <Button className="cognihash-button text-white border-0 px-6 py-2 rounded-sm font-abc-diatype">
          Join Beta
        </Button>
      </div>
    </header>
  );
}
