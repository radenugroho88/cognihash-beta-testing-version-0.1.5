import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { Partners } from "../components/Partners";
import { DataClarity } from "../components/DataClarity";
import { Features } from "../components/Features";
import { BuiltForSpeed } from "../components/BuiltForSpeed";
import { WhyChoose } from "../components/WhyChoose";
import { CallToAction } from "../components/CallToAction";
import { Footer } from "../components/Footer";

export default function Index() {
  return (
    <div className="bg-cognihash-dark min-h-screen">
      <Header />
      <Hero />
      <Partners />
      <DataClarity />
      <Features />
      <BuiltForSpeed />
      <WhyChoose />
      <CallToAction />
      <Footer />
    </div>
  );
}
