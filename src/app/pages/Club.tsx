import { Check, Crown, Sparkles, Users, Star } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { useData } from "../contexts/DataContext";

const planos = [
  {
    id: "free",
    nome: "Free",
    preco: "Grátis",
    valor: 0,
    destaque: false,
    icon: Users,
    beneficios: [
      "Portal do mês (live dia 01)",
      "E-book Nossa Senhora do Peregrino",
      "E-book 7 Clãs Ciganos",
      "Meditação guiada",
    ],
    cta: "Entrar Grátis",
    gradient: "from-gray-500 to-gray-600",
  },
  {
    id: "clube",
    nome: "Clube",
    preco: "R$ 97",
    valor: 97,
    periodo: "/mês",
    destaque: false,
    icon: Sparkles,
    beneficios: [
      "Tudo do plano Free",
      "Clube da Navalha",
      "Raio-X da Profissão",
      "Meditação Clube",
      "E-books Olho do Observador",
    ],
    cta: "Assinar Clube",
    gradient: "from-orange-500 to-amber-500",
  },
  {
    id: "premium",
    nome: "Premium",
    preco: "R$ 297",
    valor: 297,
    periodo: "/mês",
    destaque: false,
    icon: Crown,
    beneficios: [
      "Tudo do plano Clube",
      "Curso ABC do Cria Ti na Luz",
      "Workshop Chá Feminino",
      "Ritual do Pote",
      "Numeromancia",
      "Sansarana",
      "Todos os novos cursos inclusos",
    ],
    cta: "Assinar Premium",
    gradient: "from-amber-600 to-orange-600",
  },
  {
    id: "premium-plus",
    nome: "Premium + Acompanhamento",
    preco: "R$ 497",
    valor: 497,
    periodo: "/mês",
    destaque: true,
    icon: Star,
    beneficios: [
      "Tudo dos planos anteriores",
      "Acompanhamento individual mensal",
      "Sessões com Vovó Maria Conga",
      "Atendimento com Pomba Gira Maria Quitéria",
      "Orientação com Maria Padilha",
      "Consulta com Exu Caveira",
      "Mentoria com Márcia Moraes",
      "Suporte de Natasha Horacio",
      "Acompanhamento com Izzi Correia",
    ],
    cta: "Garantir Minha Vaga",
    gradient: "from-purple-600 to-pink-600",
    vagas: "Apenas 20 vagas disponíveis",
  },
];

export function Club() {
  const navigate = useNavigate();
  const { siteData } = useData();

  const handlePlanoClick = (planoId: string) => {
    navigate(`/pagamento-club?plano=${planoId}`);
  };

  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h1 className="text-primary mb-4">Cria Ti na Luz Club</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Uma plataforma exclusiva com aulas ao vivo, cursos completos e uma comunidade
            vibrante para sua evolução espiritual.
          </p>
          <p className="text-lg">
            Experiência única para todos os níveis, do iniciante ao avançado.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {planos.map((plano) => (
            <div
              key={plano.nome}
              className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden ${
                plano.destaque ? "ring-4 ring-primary transform scale-105" : ""
              }`}
            >
              {plano.destaque && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-2">
                  <p className="flex items-center justify-center gap-2">
                    <Crown className="w-4 h-4" />
                    MAIS POPULAR
                  </p>
                </div>
              )}

              <div className={`p-6 ${plano.destaque ? "pt-14" : ""}`}>
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${plano.gradient} flex items-center justify-center mb-4`}>
                  <plano.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="mb-2">{plano.nome}</h3>
                <div className="mb-4">
                  <span className="text-4xl text-primary">{plano.preco}</span>
                  {plano.periodo && <span className="text-muted-foreground">{plano.periodo}</span>}
                </div>

                {plano.vagas && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg mb-4 text-sm">
                    ⚠️ {plano.vagas}
                  </div>
                )}

                <ul className="space-y-3 mb-6">
                  {plano.beneficios.map((beneficio) => (
                    <li key={beneficio} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{beneficio}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handlePlanoClick(plano.id)}
                  className={`w-full bg-gradient-to-r ${plano.gradient} hover:opacity-90`}
                  size="lg"
                >
                  {plano.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-amber-50 border-2 border-primary/30 rounded-2xl p-8 max-w-4xl mx-auto">
          <h3 className="text-primary mb-4 text-center">Como Funciona o Pagamento</h3>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl text-white">1</span>
              </div>
              <h4 className="mb-2">Escolha seu Plano</h4>
              <p className="text-sm text-muted-foreground">Clique no botão do plano desejado</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl text-white">2</span>
              </div>
              <h4 className="mb-2">Faça o Pagamento</h4>
              <p className="text-sm text-muted-foreground">Pix, PayPal ou Mercado Pago</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl text-white">3</span>
              </div>
              <h4 className="mb-2">Envie o Comprovante</h4>
              <p className="text-sm text-muted-foreground">Nome + e-mail + comprovante via WhatsApp</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 text-center">
            <p className="mb-4">
              <strong>Após o pagamento, envie para nosso WhatsApp:</strong>
            </p>
            <ul className="text-left max-w-md mx-auto mb-4 space-y-2">
              <li>✓ Seu nome completo</li>
              <li>✓ Seu e-mail</li>
              <li>✓ Comprovante de pagamento</li>
            </ul>
            <Button
              size="lg"
              asChild
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
            >
              <a
                href="https://wa.me/5511999999999?text=Olá!%20Quero%20enviar%20meu%20comprovante%20de%20pagamento"
                target="_blank"
                rel="noopener noreferrer"
              >
                Enviar Comprovante via WhatsApp
              </a>
            </Button>
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 md:p-12">
          <h3 className="text-primary text-center mb-8">Depoimentos de Alunos</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                nome: "Ana Paula Silva",
                texto: "O Club transformou minha vida! As aulas são incríveis e a comunidade é muito acolhedora.",
                foto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
              },
              {
                nome: "Carlos Eduardo",
                texto: "Melhor investimento que fiz. O acompanhamento individual é simplesmente transformador.",
                foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
              },
              {
                nome: "Mariana Costa",
                texto: "Estou no plano Premium há 6 meses e já sinto uma evolução enorme no meu desenvolvimento espiritual.",
                foto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
              },
            ].map((depoimento) => (
              <div key={depoimento.nome} className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={depoimento.foto}
                    alt={depoimento.nome}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-foreground">{depoimento.nome}</p>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground italic">{depoimento.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
