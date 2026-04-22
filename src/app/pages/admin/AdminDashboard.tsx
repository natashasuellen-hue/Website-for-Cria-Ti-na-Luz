import { useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { useAdmin } from "../../contexts/AdminContext";
import { Button } from "../../components/ui/button";
import {
  ShoppingBag,
  Calendar,
  MessageSquare,
  FileText,
  Settings,
  LogOut,
  Sparkles,
  GraduationCap,
  BookOpen,
  Crown,
  Image,
} from "lucide-react";

export function AdminDashboard() {
  const { isAuthenticated, logout } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin");
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const cards = [
    {
      title: "Banners da Página Inicial",
      description: "Gerenciar slides do carrossel principal",
      icon: Image,
      link: "/admin/banners",
      gradient: "from-orange-500 to-amber-500",
    },
    {
      title: "Produtos da Loja",
      description: "Gerenciar produtos, preços e imagens",
      icon: ShoppingBag,
      link: "/admin/produtos",
      gradient: "from-amber-500 to-yellow-500",
    },
    {
      title: "Consultas",
      description: "Adicionar e editar tipos de consultas",
      icon: Sparkles,
      link: "/admin/consultas",
      gradient: "from-yellow-500 to-green-500",
    },
    {
      title: "Cursos",
      description: "Gerenciar cursos avulsos",
      icon: GraduationCap,
      link: "/admin/cursos",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "E-books",
      description: "Gerenciar e-books e materiais digitais",
      icon: BookOpen,
      link: "/admin/ebooks",
      gradient: "from-amber-500 to-orange-500",
    },
    {
      title: "Planos do Club",
      description: "Links de pagamento para cada plano",
      icon: Crown,
      link: "/admin/planos-club",
      gradient: "from-purple-600 to-pink-600",
    },
    {
      title: "Eventos Presenciais",
      description: "Brasil e Portugal - datas, locais e inscrições",
      icon: Calendar,
      link: "/admin/eventos",
      gradient: "from-orange-600 to-red-500",
    },
    {
      title: "Artigos do Blog",
      description: "Publicar conteúdos e notícias",
      icon: FileText,
      link: "/admin/artigos",
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      title: "Dados do Site",
      description: "WhatsApp, redes sociais, foto da Márcia",
      icon: Settings,
      link: "/admin/configuracoes",
      gradient: "from-purple-500 to-pink-500",
    },
  ];

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-primary to-amber-600 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl mb-2">Painel Administrativo</h1>
              <p className="text-white/90">Gerencie todo o conteúdo do site</p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              <LogOut className="mr-2 w-4 h-4" />
              Sair
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <Link
              key={card.title}
              to={card.link}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div
                className={`w-16 h-16 rounded-full bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-4`}
              >
                <card.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-2">{card.title}</h3>
              <p className="text-muted-foreground">{card.description}</p>
            </Link>
          ))}
        </div>

        <div className="mt-12 bg-amber-50 border-2 border-primary/20 rounded-2xl p-8 text-center">
          <h3 className="text-primary mb-4">Bem-vinda ao Painel Administrativo!</h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Aqui você pode gerenciar todos os aspectos do site Cria Ti na Luz. Clique em qualquer
            card acima para começar a editar conteúdos, adicionar produtos, criar eventos e muito
            mais.
          </p>
        </div>
      </div>
    </div>
  );
}
