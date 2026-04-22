import { HeroBanner } from "../components/home/HeroBanner";
import { QuemEMarcia } from "../components/home/QuemEMarcia";
import { OQueVoceProcura } from "../components/home/OQueVoceProcura";
import { BlogSection } from "../components/home/BlogSection";
import { Newsletter } from "../components/home/Newsletter";
import { ComunidadeWhatsApp } from "../components/home/ComunidadeWhatsApp";

export function Home() {
  return (
    <div>
      <HeroBanner />
      <QuemEMarcia />
      <OQueVoceProcura />
      <ComunidadeWhatsApp />
      <BlogSection />
      <Newsletter />
    </div>
  );
}
