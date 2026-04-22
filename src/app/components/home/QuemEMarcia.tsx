import { Instagram, Youtube } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { useData } from "../../contexts/DataContext";

export function QuemEMarcia() {
  const { siteData } = useData();

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
              <ImageWithFallback
                src={siteData.marciaImage}
                alt="Márcia Moraes"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-primary text-white p-6 rounded-2xl shadow-xl">
              <p className="text-4xl">15+</p>
              <p>Anos de experiência</p>
            </div>
          </div>

          <div>
            <h2 className="text-primary mb-6">Quem é Márcia Moraes</h2>
            <p className="text-lg mb-6 leading-relaxed">
              Sua missão é ajudar pessoas a encontrarem seu caminho e autoconhecimento. Fundadora da Egrégora Cria Ti na Luz. Márcia já inspirou a vida de milhares de alunos.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href={siteData.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full hover:shadow-lg transition-shadow"
              >
                <Instagram className="w-5 h-5" />
                <span>Instagram</span>
              </a>
              <a
                href={siteData.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-full hover:shadow-lg transition-shadow"
              >
                <Youtube className="w-5 h-5" />
                <span>YouTube</span>
              </a>
              <a
                href={siteData.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full hover:shadow-lg transition-shadow"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
                <span>TikTok</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
