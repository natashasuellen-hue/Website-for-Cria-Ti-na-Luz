import { Link } from "react-router";
import { Sparkles, Calendar, Users, Heart } from "lucide-react";

const cards = [
  {
    icon: Sparkles,
    title: "Consultas",
    description: "Atendimento espiritual personalizado presencial ou online",
    link: "/consultas",
    gradient: "from-orange-500 to-amber-500",
  },
  {
    icon: Calendar,
    title: "Eventos Presenciais",
    description: "Encontros, workshops e rituais especiais",
    link: "/eventos",
    gradient: "from-amber-500 to-yellow-500",
  },
  {
    icon: Users,
    title: "Cria Ti na Luz Club",
    description: "Plataforma com aulas ao vivo e comunidade exclusiva",
    link: "/club",
    gradient: "from-orange-600 to-red-500",
  },
  {
    icon: Heart,
    title: "Desenvolvimento Espiritual",
    description: "Encontros presenciais em São Paulo e Portugal",
    link: "/desenvolvimento-espiritual",
    gradient: "from-amber-600 to-orange-600",
  },
];

export function OQueVoceProcura() {
  return (
    <section className="py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-primary mb-4">O Que Você Está Procurando?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Escolha a jornada que mais ressoa com você
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <Link
              key={card.title}
              to={card.link}
              className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <card.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-2">{card.title}</h3>
              <p className="text-muted-foreground">{card.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
