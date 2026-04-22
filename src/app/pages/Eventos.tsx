import { Calendar, MapPin, DollarSign, Users } from "lucide-react";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useData } from "../contexts/DataContext";

const eventosBrasilPadrao = [
  {
    id: "1",
    nome: "Workshop: Desvendando o Tarô",
    data: "28 de Abril, 2026",
    horario: "14h às 18h",
    local: "São Paulo - Zona Norte (Água Fria)",
    valor: "R$ 180",
    descricao: "Workshop intensivo sobre leitura de tarô para todos os níveis",
    vagas: "25 vagas",
    image: "https://images.unsplash.com/photo-1531149410688-07071dfe6237?w=600&h=400&fit=crop",
    pais: "brasil" as const,
    linkWhatsApp: "https://wa.me/5511999999999",
  },
  {
    id: "2",
    nome: "Ritual da Lua Cheia",
    data: "5 de Maio, 2026",
    horario: "19h às 22h",
    local: "São Paulo - Zona Norte (Água Fria)",
    valor: "Gratuito",
    descricao: "Ritual coletivo de conexão com a energia lunar",
    vagas: "40 vagas",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop",
    pais: "brasil" as const,
    linkWhatsApp: "https://wa.me/5511999999999",
  },
  {
    id: "3",
    nome: "Curso: Cristaloterapia Essencial",
    data: "12 de Maio, 2026",
    horario: "10h às 17h",
    local: "São Paulo - Zona Norte (Água Fria)",
    valor: "R$ 350",
    descricao: "Curso completo sobre o poder terapêutico dos cristais",
    vagas: "20 vagas",
    image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=600&h=400&fit=crop",
    pais: "brasil" as const,
    linkWhatsApp: "https://wa.me/5511999999999",
  },
];

const eventosPortugalPadrao = [
  {
    id: "4",
    nome: "Retiro Espiritual",
    data: "15 de Junho, 2026",
    horario: "Dia completo",
    local: "Lisboa, Portugal",
    valor: "€120",
    descricao: "Um dia de imersão espiritual com práticas e rituais",
    vagas: "30 vagas",
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&h=400&fit=crop",
    pais: "portugal" as const,
    linkWhatsApp: "https://wa.me/5511999999999",
  },
  {
    id: "5",
    nome: "Palestra: O Caminho da Espiritualidade",
    data: "22 de Junho, 2026",
    horario: "18h às 21h",
    local: "Porto, Portugal",
    valor: "Gratuito",
    descricao: "Palestra aberta sobre desenvolvimento espiritual",
    vagas: "50 vagas",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&h=400&fit=crop",
    pais: "portugal" as const,
    linkWhatsApp: "https://wa.me/5511999999999",
  },
];

export function Eventos() {
  const { eventos: eventosAdmin, siteData } = useData();

  const eventosBrasil = eventosAdmin.length > 0
    ? eventosAdmin.filter(e => e.pais === "brasil")
    : eventosBrasilPadrao;

  const eventosPortugal = eventosAdmin.length > 0
    ? eventosAdmin.filter(e => e.pais === "portugal")
    : eventosPortugalPadrao;

  const handleInscricao = (linkWhatsApp: string) => {
    window.open(linkWhatsApp, "_blank");
  };

  const EventoCard = ({ evento }: { evento: typeof eventosBrasil[0] }) => (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
      <div className="relative aspect-video overflow-hidden">
        <ImageWithFallback
          src={evento.image}
          alt={evento.nome}
          className="w-full h-full object-cover"
        />
        {evento.valor === "Gratuito" ? (
          <div className="absolute top-3 right-3 bg-green-500 text-white px-4 py-2 rounded-full">
            Gratuito
          </div>
        ) : (
          <div className="absolute top-3 right-3 bg-primary text-white px-4 py-2 rounded-full">
            {evento.valor}
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="mb-3">{evento.nome}</h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-primary" />
            <span>{evento.data} - {evento.horario}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{evento.local}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Users className="w-4 h-4 text-primary" />
            <span>{evento.vagas}</span>
          </div>
        </div>

        <p className="text-muted-foreground mb-4">{evento.descricao}</p>

        <Button
          onClick={() => handleInscricao(evento.linkWhatsApp)}
          className="w-full bg-primary hover:bg-primary/90"
        >
          Fazer Inscrição
        </Button>
      </div>
    </div>
  );

  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h1 className="text-primary mb-4">Eventos Presenciais</h1>
          <p className="text-xl text-muted-foreground">
            Participe de workshops, rituais e encontros transformadores
          </p>
        </div>

        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-4xl">🇧🇷</span>
            <h2 className="text-primary">Brasil</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventosBrasil.map((evento) => (
              <EventoCard key={evento.nome} evento={evento} />
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-8">
            <span className="text-4xl">🇵🇹</span>
            <h2 className="text-primary">Portugal</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventosPortugal.map((evento) => (
              <EventoCard key={evento.nome} evento={evento} />
            ))}
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 text-center">
          <h3 className="text-primary mb-4">Quer receber avisos de novos eventos?</h3>
          <p className="text-muted-foreground mb-6">
            Entre para nossa comunidade no WhatsApp e seja o primeiro a saber
          </p>
          <Button
            size="lg"
            asChild
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
          >
            <a
              href={`https://wa.me/${siteData.whatsappEventos}?text=Quero%20receber%20avisos%20de%20eventos`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Entrar na Comunidade
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
