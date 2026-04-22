import { Link } from "react-router";
import { Instagram, Youtube, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-primary mb-4">Cria Ti na Luz</h3>
            <p className="text-muted-foreground mb-4">
              Desenvolvimento espiritual e autoconhecimento com Márcia Moraes
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-background hover:bg-primary hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-background hover:bg-primary hover:text-white transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-background hover:bg-primary hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4">Links Rápidos</h4>
            <div className="flex flex-col gap-2">
              <Link to="/consultas" className="text-muted-foreground hover:text-primary transition-colors">
                Consultas
              </Link>
              <Link to="/eventos" className="text-muted-foreground hover:text-primary transition-colors">
                Eventos
              </Link>
              <Link to="/cursos" className="text-muted-foreground hover:text-primary transition-colors">
                Cursos
              </Link>
              <a href="https://cria-ti-na-luz-club.memberkit.com.br" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                Cria Ti na Luz Club
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4">Contato</h4>
            <div className="flex flex-col gap-3">
              <a
                href="https://wa.me/5512996841668"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>+55 (12) 99684-1668</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Cria Ti na Luz por Márcia Moraes. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
