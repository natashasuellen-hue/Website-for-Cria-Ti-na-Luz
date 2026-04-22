import { ShoppingCart, Star } from "lucide-react";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useData } from "../contexts/DataContext";

const produtosPadrao = [
  {
    id: "1",
    nome: "Kit Cristais de Proteção",
    preco: "R$ 89,90",
    descricao: "Conjunto com 7 cristais essenciais para proteção energética",
    image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=400&h=400&fit=crop",
    destaque: true,
  },
  {
    id: "2",
    nome: "Baralho Cigano Completo",
    preco: "R$ 120,00",
    descricao: "Baralho cigano premium com manual ilustrado",
    image: "https://images.unsplash.com/photo-1621361365424-06f0e1eb5c49?w=400&h=400&fit=crop",
    destaque: true,
  },
  {
    id: "3",
    nome: "Incenso Natural - Mix 10 Aromas",
    preco: "R$ 45,00",
    descricao: "Caixa com 10 aromas naturais para limpeza energética",
    image: "https://images.unsplash.com/photo-1602874801006-96632be89a5a?w=400&h=400&fit=crop",
    destaque: true,
  },
  {
    id: "4",
    nome: "Vela Ritualística Laranja",
    preco: "R$ 25,00",
    descricao: "Vela artesanal para rituais de prosperidade",
    image: "https://images.unsplash.com/photo-1602874801006-96632be89a5a?w=400&h=400&fit=crop",
    destaque: false,
  },
  {
    id: "5",
    nome: "Pêndulo de Cristal",
    preco: "R$ 55,00",
    descricao: "Pêndulo de quartzo para radiestesia",
    image: "https://images.unsplash.com/photo-1611252407028-c2ec24c5c42c?w=400&h=400&fit=crop",
    destaque: false,
  },
  {
    id: "6",
    nome: "Defumador Cerâmica",
    preco: "R$ 65,00",
    descricao: "Defumador artesanal em cerâmica com tripé",
    image: "https://images.unsplash.com/photo-1608455534527-22625f534b61?w=400&h=400&fit=crop",
    destaque: false,
  },
  {
    id: "7",
    nome: "Livro: Manual do Tarô",
    preco: "R$ 78,00",
    descricao: "Guia completo para leitura de tarô por Márcia Moraes",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop",
    destaque: false,
  },
  {
    id: "8",
    nome: "Kit Altar Completo",
    preco: "R$ 180,00",
    descricao: "Kit com todos os itens essenciais para seu altar",
    image: "https://images.unsplash.com/photo-1509641498745-13c26fd1ed89?w=400&h=400&fit=crop",
    destaque: false,
  },
  {
    id: "9",
    nome: "Água Floral Energizada",
    preco: "R$ 35,00",
    descricao: "Spray energizado para limpeza de ambientes",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop",
    destaque: false,
  },
];

export function Loja() {
  const { produtos: produtosAdmin, siteData } = useData();

  const produtos = produtosAdmin.length > 0 ? produtosAdmin : produtosPadrao;

  const handleComprar = (produto: string) => {
    window.open(
      `https://wa.me/${siteData.whatsapp}?text=${encodeURIComponent(
        `Olá! Tenho interesse no produto: ${produto}`
      )}`,
      "_blank"
    );
  };

  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h1 className="text-primary mb-4">Loja Virtual</h1>
          <p className="text-xl text-muted-foreground">
            Produtos espirituais cuidadosamente selecionados para sua jornada
          </p>
        </div>

        <div className="mb-12">
          <h3 className="text-primary mb-6">Mais Vendidos</h3>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {produtos
              .filter((p) => p.destaque)
              .map((produto) => (
                <div
                  key={produto.nome}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative">
                    <div className="aspect-square overflow-hidden bg-muted">
                      <ImageWithFallback
                        src={produto.image}
                        alt={produto.nome}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute top-3 left-3 bg-amber-400 text-foreground px-3 py-1 rounded-full flex items-center gap-1">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm">Destaque</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h4 className="mb-2">{produto.nome}</h4>
                    <p className="text-sm text-muted-foreground mb-4">{produto.descricao}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl text-primary">{produto.preco}</span>
                      <Button
                        onClick={() => handleComprar(produto.nome)}
                        className="bg-primary hover:bg-primary/90"
                      >
                        <ShoppingCart className="mr-2 w-4 h-4" />
                        Comprar
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div>
          <h3 className="text-primary mb-6">Todos os Produtos</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {produtos.map((produto) => (
              <div
                key={produto.nome}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-square overflow-hidden bg-muted">
                  <ImageWithFallback
                    src={produto.image}
                    alt={produto.nome}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-4">
                  <h4 className="mb-1 text-base">{produto.nome}</h4>
                  <p className="text-xs text-muted-foreground mb-3">{produto.descricao}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl text-primary">{produto.preco}</span>
                    <Button
                      onClick={() => handleComprar(produto.nome)}
                      size="sm"
                      className="bg-primary hover:bg-primary/90"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 max-w-3xl mx-auto">
          <h3 className="text-primary mb-4 text-center">Como Comprar</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl text-white">1</span>
              </div>
              <h4 className="mb-2">Escolha o Produto</h4>
              <p className="text-sm text-muted-foreground">Clique em "Comprar" no item desejado</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl text-white">2</span>
              </div>
              <h4 className="mb-2">Fale Conosco</h4>
              <p className="text-sm text-muted-foreground">Confirme disponibilidade via WhatsApp</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl text-white">3</span>
              </div>
              <h4 className="mb-2">Receba em Casa</h4>
              <p className="text-sm text-muted-foreground">Entregamos para todo o Brasil</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
