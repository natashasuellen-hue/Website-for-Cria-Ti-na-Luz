import { MapPin, Calendar, Users, Sparkles } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useState } from "react";
import { useData } from "../contexts/DataContext";

export function DesenvolvimentoEspiritual() {
  const { siteData } = useData();
  const [formData, setFormData] = useState({
    nome: "",
    whatsapp: "",
    local: "",
    disponibilidade: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mensagem = `Olá! Quero participar do Desenvolvimento Espiritual Presencial.\n\nNome: ${formData.nome}\nWhatsApp: ${formData.whatsapp}\nLocal: ${formData.local}\nDisponibilidade: ${formData.disponibilidade}`;
    window.open(
      `https://wa.me/${siteData.whatsapp}?text=${encodeURIComponent(mensagem)}`,
      "_blank"
    );
  };

  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h1 className="text-primary mb-4">Desenvolvimento Espiritual Presencial</h1>
          <p className="text-xl text-muted-foreground">
            Encontros presenciais para evolução espiritual com método exclusivo
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-primary mb-4">O que é o Desenvolvimento Espiritual?</h2>
            <p className="text-lg mb-4 leading-relaxed">
              Um programa presencial de encontros regulares para aprofundar seu conhecimento
              espiritual, desenvolver suas habilidades mediúnicas e conectar-se com sua essência.
            </p>
            <p className="text-lg mb-4 leading-relaxed">
              Com o método exclusivo Cria Ti na Luz, você aprenderá práticas ancestrais,
              técnicas de desenvolvimento mediúnico e terá acompanhamento personalizado.
            </p>
            <p className="text-lg leading-relaxed">
              Ideal para iniciantes e praticantes que buscam evolução contínua em um ambiente
              seguro e acolhedor.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-primary mb-6">Diferenciais do Método</h3>
            <ul className="space-y-4">
              {[
                "Método exclusivo desenvolvido por Márcia Moraes",
                "Grupos pequenos para atenção individualizada",
                "Práticas guiadas em cada encontro",
                "Suporte contínuo entre os encontros",
                "Material didático exclusivo",
                "Certificado ao final do ciclo",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <span className="text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-primary mb-8 text-center">Locais e Horários</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">🇧🇷</span>
                <h3>São Paulo</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-lg">Zona Norte - Água Fria</span>
                </div>
                <div className="flex items-start gap-2">
                  <Calendar className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-lg">Encontros quinzenais</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">🇵🇹</span>
                <h3>Portugal</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-lg">Lisboa</span>
                </div>
                <div className="flex items-start gap-2">
                  <Calendar className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-lg">Datas marcadas (consulte agenda)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-primary mb-6 text-center">Quero Participar</h2>
          <p className="text-center text-muted-foreground mb-8">
            Preencha o formulário e entraremos em contato para agendar sua primeira sessão
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="nome">Nome Completo</Label>
              <Input
                id="nome"
                type="text"
                placeholder="Seu nome completo"
                required
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                className="mt-2 h-12 text-lg"
              />
            </div>

            <div>
              <Label htmlFor="whatsapp">WhatsApp</Label>
              <Input
                id="whatsapp"
                type="tel"
                placeholder="(11) 99999-9999"
                required
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className="mt-2 h-12 text-lg"
              />
            </div>

            <div>
              <Label>Local de Preferência</Label>
              <div className="mt-3 space-y-3">
                {[
                  { value: "🇧🇷 São Paulo - Zona Norte (Água Fria)", emoji: "🇧🇷" },
                  { value: "🇵🇹 Portugal - Lisboa", emoji: "🇵🇹" },
                ].map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center gap-3 p-4 bg-muted rounded-lg cursor-pointer hover:bg-primary/10 transition-colors"
                  >
                    <input
                      type="radio"
                      name="local"
                      value={option.value}
                      required
                      onChange={(e) =>
                        setFormData({ ...formData, local: option.value })
                      }
                      className="w-5 h-5 text-primary"
                    />
                    <span className="text-lg">{option.value}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <Label>Disponibilidade</Label>
              <div className="mt-3 space-y-3">
                {[
                  { value: "sabado_manha", label: "Sábado - Manhã" },
                  { value: "sabado_tarde", label: "Sábado - Tarde" },
                  { value: "semana_manha", label: "Semana - Manhã" },
                  { value: "semana_tarde", label: "Semana - Tarde" },
                ].map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center gap-3 p-4 bg-muted rounded-lg cursor-pointer hover:bg-primary/10 transition-colors"
                  >
                    <input
                      type="radio"
                      name="disponibilidade"
                      value={option.value}
                      required
                      onChange={(e) =>
                        setFormData({ ...formData, disponibilidade: option.label })
                      }
                      className="w-5 h-5 text-primary"
                    />
                    <span className="text-lg">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 h-14 text-lg"
            >
              Quero Participar
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
