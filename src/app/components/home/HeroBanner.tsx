import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { useData } from "../../contexts/DataContext";

const slidesPadrao = [
  {
    id: "1",
    title: "Aula ao Vivo: Desvendando o Tarô",
    subtitle: "Quinta-feira, 24 de Abril às 20h",
    badge: "Plano Free",
    bgImage: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=1920&h=1080&fit=crop",
    linkPage: "/club",
  },
  {
    id: "2",
    title: "Agende seu Atendimento Espiritual",
    subtitle: "Consultas presenciais e online",
    badge: "Consultas",
    bgImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1920&h=1080&fit=crop",
    linkPage: "/consultas",
  },
  {
    id: "3",
    title: "Faça Parte da Comunidade",
    subtitle: "Cria Ti na Luz Club",
    badge: "Comunidade",
    bgImage: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1920&h=1080&fit=crop",
    linkPage: "/club",
  },
];

export function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const { banners } = useData();

  const slides = banners.length > 0 ? banners : slidesPadrao;

  const handleSaibaMais = (linkPage: string) => {
    navigate(linkPage);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000); // 8 segundos para dar tempo de ler

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-[400px] md:h-[500px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-700 ${
            index === currentSlide ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
          }`}
        >
          <div
            className="h-full bg-cover bg-center relative"
            style={{ backgroundImage: `url(${slide.bgImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />
            <div className="relative h-full container mx-auto px-4 flex items-center justify-center text-center">
              <div>
                <div className="inline-block bg-primary text-white px-4 py-2 rounded-full mb-6">
                  {slide.badge}
                </div>
                <h1 className="text-3xl md:text-5xl lg:text-6xl mb-4 text-white">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl text-white/90 mb-8">
                  {slide.subtitle}
                </p>
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90"
                  onClick={() => handleSaibaMais(slide.linkPage)}
                >
                  Saiba Mais
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all"
      >
        <ChevronLeft className="w-6 h-6 text-primary" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all"
      >
        <ChevronRight className="w-6 h-6 text-primary" />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? "bg-primary w-8" : "bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
