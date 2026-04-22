import { MessageCircle } from "lucide-react";
import { Button } from "../ui/button";
import { useData } from "../../contexts/DataContext";

export function ComunidadeWhatsApp() {
  const { siteData } = useData();

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <MessageCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-primary mb-4">
            Faça Parte da Comunidade Cria Ti na Luz
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Conecte-se com pessoas que compartilham da mesma jornada espiritual. Receba
            conteúdos exclusivos, avisos de lives e participe de discussões transformadoras.
          </p>
          <Button
            size="lg"
            asChild
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
          >
            <a
              href={`https://wa.me/${siteData.whatsappComunidade}?text=Quero%20fazer%20parte%20da%20comunidade%20Cria%20Ti%20na%20Luz`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="mr-2 w-5 h-5" />
              Entrar no WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
