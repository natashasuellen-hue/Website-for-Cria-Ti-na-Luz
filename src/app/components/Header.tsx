import { Link } from "react-router";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import logo from "../../imports/cria_ti_na_luz.png";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: "Início", path: "/" },
    { label: "Consultas", path: "/consultas" },
    { label: "Eventos", path: "/eventos" },
    { label: "Cursos", path: "/cursos" },
    { label: "Desenvolvimento Espiritual", path: "/desenvolvimento-espiritual" },
    { label: "Fale Conosco", path: "/contato" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Cria Ti na Luz" className="w-12 h-12 md:w-14 md:h-14" />
            <div className="flex flex-col">
              <span className="text-2xl md:text-3xl text-primary" style={{ fontWeight: 600 }}>
                Cria Ti na Luz
              </span>
              <span className="text-sm md:text-base text-muted-foreground">
                por Márcia Moraes
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            <Button asChild className="bg-primary hover:bg-primary/90">
              <a href="https://cria-ti-na-luz-club.memberkit.com.br" target="_blank" rel="noopener noreferrer">
                Acesso ao Club
              </a>
            </Button>
          </div>

          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-primary" />
            ) : (
              <Menu className="w-6 h-6 text-primary" />
            )}
          </button>
        </div>

        <nav className="hidden lg:flex items-center gap-1 pb-3 overflow-x-auto">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="px-4 py-2 rounded-lg hover:bg-muted transition-colors whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {mobileMenuOpen && (
          <nav className="lg:hidden pb-4 flex flex-col gap-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="px-4 py-3 rounded-lg hover:bg-muted transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button asChild className="bg-primary hover:bg-primary/90 mt-4">
              <a href="https://cria-ti-na-luz-club.memberkit.com.br" target="_blank" rel="noopener noreferrer">
                Acesso ao Club
              </a>
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
}
