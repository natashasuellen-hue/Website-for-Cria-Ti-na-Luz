import { MessageCircle, Mail, Instagram, Youtube, MapPin } from "lucide-react";
import { Button } from "../components/ui/button";

export function Contato() {
  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h1 className="text-primary mb-4">Fale Conosco</h1>
          <p className="text-xl text-muted-foreground">
            Estamos prontos para atender você. Entre em contato!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div>
            <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
              <h2 className="text-primary mb-6">Cria Ti na Luz por Márcia Moraes</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Centro de desenvolvimento espiritual, consultas e cursos dedicados à sua
                jornada de autoconhecimento e transformação.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="mb-1">Localização</h4>
                    <p className="text-muted-foreground">
                      São Paulo - Zona Norte (Água Fria)<br />
                      Lisboa, Portugal
                    </p>
                  </div>
                </div>


                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="mb-1">E-mail</h4>
                    <a
                      href="mailto:contato@criatinaluz.com"
                      className="text-primary hover:underline"
                    >
                      contato@criatinaluz.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8">
              <h3 className="text-primary mb-4">Redes Sociais</h3>
              <p className="text-muted-foreground mb-6">
                Acompanhe nosso conteúdo nas redes sociais
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full hover:shadow-lg transition-shadow"
                >
                  <Instagram className="w-5 h-5" />
                  <span>Instagram</span>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-full hover:shadow-lg transition-shadow"
                >
                  <Youtube className="w-5 h-5" />
                  <span>YouTube</span>
                </a>
                <a
                  href="https://tiktok.com"
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

          <div className="flex flex-col justify-center">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-12 text-white text-center shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-12 h-12 text-green-600" />
              </div>

              <h2 className="text-3xl mb-4">Fale Conosco no WhatsApp</h2>
              <p className="text-xl mb-8 text-white/90">
                A forma mais rápida e prática de entrar em contato conosco
              </p>

              <div className="space-y-4 mb-8 text-left max-w-md mx-auto">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <span>✓</span>
                  </div>
                  <span className="text-lg">Tire suas dúvidas</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <span>✓</span>
                  </div>
                  <span className="text-lg">Agende sua consulta</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <span>✓</span>
                  </div>
                  <span className="text-lg">Saiba mais sobre nossos serviços</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <span>✓</span>
                  </div>
                  <span className="text-lg">Atendimento personalizado</span>
                </div>
              </div>

              <Button
                size="lg"
                asChild
                className="bg-white text-green-600 hover:bg-white/90 h-16 text-xl px-12"
              >
                <a
                  href="https://wa.me/5511999999999?text=Olá!%20Gostaria%20de%20falar%20com%20o%20Cria%20Ti%20na%20Luz"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-3 w-6 h-6" />
                  Abrir WhatsApp
                </a>
              </Button>
            </div>

            <div className="mt-8 bg-amber-50 border-2 border-primary/20 rounded-2xl p-6 text-center">
              <p className="text-muted-foreground mb-2">Respondemos em até</p>
              <p className="text-3xl text-primary">24 horas</p>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-white rounded-2xl p-8 max-w-4xl mx-auto shadow-lg text-center">
          <h3 className="text-primary mb-4">Dúvidas Frequentes</h3>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div>
              <h4 className="mb-2">Atendem aos finais de semana?</h4>
              <p className="text-muted-foreground">
                Para atendimentos online e eventos presenciais, consulte a disponibilidade no site
                na página de consultas e eventos.
              </p>
            </div>
            <div>
              <h4 className="mb-2">Posso fazer consulta online?</h4>
              <p className="text-muted-foreground">
                Sim! Oferecemos consultas online via vídeo chamada com a mesma qualidade do
                presencial.
              </p>
            </div>
            <div>
              <h4 className="mb-2">Como funcionam os pagamentos?</h4>
              <p className="text-muted-foreground">
                Aceitamos Pix, PayPal e Mercado Pago. O pagamento pode ser feito antes ou após
                a consulta.
              </p>
            </div>
            <div>
              <h4 className="mb-2">O Cria Ti na Luz Club é assinatura?</h4>
              <p className="text-muted-foreground">
                Sim! O Club funciona por assinatura mensal com renovação automática. Você pode
                cancelar quando quiser.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
