import { Video, MapPin, Clock, DollarSign } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useData } from "../contexts/DataContext";

// Dados padrão caso não haja consultas cadastradas
const consultasPadrao = [
  {
    id: "1",
    nome: "Tarô Completo",
    medium: "Márcia Moraes",
    tipo: "Presencial ou Online",
    duracao: "60 minutos",
    preco: "R$ 350",
    descricao: "Leitura completa com orientação espiritual profunda",
    image: "https://images.unsplash.com/photo-1531149410688-07071dfe6237?w=400&h=300&fit=crop",
  },
  {
    id: "2",
    nome: "Consulta com Cristais",
    medium: "Márcia Moraes",
    tipo: "Presencial",
    duracao: "45 minutos",
    preco: "R$ 280",
    descricao: "Harmonização energética com cristais terapêuticos",
    image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=400&h=300&fit=crop",
  },
  {
    id: "3",
    nome: "Orientação Espiritual",
    medium: "Natasha Horacio",
    tipo: "Online",
    duracao: "50 minutos",
    preco: "R$ 250",
    descricao: "Sessão de orientação para desenvolvimento espiritual",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop",
  },
];

export function Consultas() {
  const navigate = useNavigate();
  const { consultas: consultasAdmin } = useData();

  const consultas = consultasAdmin.length > 0 ? consultasAdmin : consultasPadrao;

  const handleAgendar = (consultaId: string) => {
    navigate(`/pagamento-consulta?id=${consultaId}`);
  };

  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h1 className="text-primary mb-4">Consultas Presenciais e Online</h1>
          <p className="text-xl text-muted-foreground">
            Atendimento espiritual personalizado com profissionais experientes
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {consultas.map((consulta) => (
            <div
              key={consulta.nome}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative aspect-video overflow-hidden">
                <ImageWithFallback
                  src={consulta.image}
                  alt={consulta.nome}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-primary text-white px-3 py-1 rounded-full">
                  {consulta.preco}
                </div>
              </div>

              <div className="p-6">
                <h3 className="mb-2">{consulta.nome}</h3>
                <p className="text-sm text-muted-foreground mb-4">{consulta.medium}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    {consulta.tipo.includes("Online") ? (
                      <Video className="w-4 h-4 text-primary" />
                    ) : (
                      <MapPin className="w-4 h-4 text-primary" />
                    )}
                    <span>{consulta.tipo}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{consulta.duracao}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="w-4 h-4 text-primary" />
                    <span>{consulta.preco}</span>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4 text-sm">{consulta.descricao}</p>

                <Button
                  onClick={() => handleAgendar(consulta.id)}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  Agendar Consulta
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
          <h3 className="text-primary mb-6 text-center">Como Funciona</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">1</span>
              </div>
              <h4 className="mb-2">Escolha sua Consulta</h4>
              <p className="text-sm text-muted-foreground">
                Selecione o tipo de atendimento que mais ressoa com você
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">2</span>
              </div>
              <h4 className="mb-2">Entre em Contato</h4>
              <p className="text-sm text-muted-foreground">
                Fale conosco via WhatsApp para agendar sua sessão
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">3</span>
              </div>
              <h4 className="mb-2">Receba sua Orientação</h4>
              <p className="text-sm text-muted-foreground">
                Compareça no horário agendado e receba seu atendimento
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <Button
              size="lg"
              asChild
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
            >
              <a
                href="https://wa.me/5511999999999?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20as%20consultas"
                target="_blank"
                rel="noopener noreferrer"
              >
                Falar no WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
