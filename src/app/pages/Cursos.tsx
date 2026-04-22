import { GraduationCap, BookOpen, Play, Crown } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useData } from "../contexts/DataContext";

const cursosPadrao = [
  {
    id: "1",
    nome: "Clube da Navalha",
    descricao: "Desenvolvimento espiritual e autoconhecimento profundo através de técnicas exclusivas",
    valorAvulso: "R$ 97",
    planoClub: "Clube",
    valorPlanoClub: "R$ 97",
    cursosInclusos: ["Raio-X da Profissão", "Meditação Clube", "E-books Olho do Observador"],
    aoVivo: true,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop",
  },
  {
    id: "2",
    nome: "ABC do Cria Ti na Luz",
    descricao: "Curso essencial para iniciantes no desenvolvimento espiritual",
    valorAvulso: "R$ 60",
    planoClub: "Premium",
    valorPlanoClub: "R$ 297",
    cursosInclusos: ["Clube da Navalha", "Workshop Chá Feminino", "Ritual do Pote", "Numeromancia", "Sansarana"],
    aoVivo: true,
    image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=400&h=300&fit=crop",
  },
  {
    id: "3",
    nome: "Workshop Ritual do Pote",
    descricao: "Aprenda o poderoso ritual do pote com Caboclo Sete Matas",
    valorAvulso: "R$ 197",
    planoClub: "Premium",
    valorPlanoClub: "R$ 297",
    cursosInclusos: ["ABC do Cria Ti na Luz", "Clube da Navalha", "Workshop Chá Feminino", "Numeromancia", "Sansarana"],
    aoVivo: true,
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400&h=300&fit=crop",
  },
];

const ebooksPadrao = [
  {
    id: "1",
    nome: "Nossa Senhora do Peregrino",
    descricao: "E-book completo sobre a devoção e orações",
    preco: "Grátis",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop",
    planoFree: true,
  },
  {
    id: "2",
    nome: "7 Clãs Ciganos",
    descricao: "Conheça os mistérios dos clãs ciganos",
    preco: "Grátis",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop",
    planoFree: true,
  },
  {
    id: "3",
    nome: "Olho do Observador",
    descricao: "Série de e-books sobre desenvolvimento da visão espiritual",
    preco: "R$ 80",
    valorAvulso: "R$ 80",
    planosClub: ["Clube", "Premium", "Premium + Acompanhamento"],
    valorPlanoClub: "R$ 97",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop",
    planoFree: false,
  },
];

export function Cursos() {
  const navigate = useNavigate();
  const { cursos: cursosAdmin, ebooks: ebooksAdmin } = useData();

  const cursos = cursosAdmin.length > 0 ? cursosAdmin : cursosPadrao;
  const ebooks = ebooksAdmin.length > 0 ? ebooksAdmin : ebooksPadrao;

  const handleComprarAvulso = (cursoId: string) => {
    navigate(`/pagamento-curso?id=${cursoId}`);
  };

  const handleAssinarClub = () => {
    navigate("/club");
  };

  const handleComprarEbook = (ebookId: string) => {
    const ebook = ebooks.find(e => e.id === ebookId);
    if (ebook?.planoFree) {
      navigate("/pagamento-club?plano=free");
    } else {
      navigate(`/pagamento-curso?id=${ebookId}&tipo=ebook`);
    }
  };

  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h1 className="text-primary mb-4">Cursos e E-books</h1>
          <p className="text-xl text-muted-foreground">
            Aprenda com cursos ao vivo e materiais exclusivos
          </p>
        </div>

        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-primary">Cursos</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cursos.map((curso) => (
              <div
                key={curso.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative aspect-video overflow-hidden">
                  <ImageWithFallback
                    src={curso.image}
                    alt={curso.nome}
                    className="w-full h-full object-cover"
                  />
                  {curso.aoVivo && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full flex items-center gap-1">
                      <Play className="w-4 h-4" />
                      <span className="text-sm">Ao Vivo</span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="mb-2">{curso.nome}</h3>
                  <p className="text-muted-foreground mb-4 text-sm">{curso.descricao}</p>

                  <div className="bg-muted rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Valor Avulso:</span>
                      <span className="text-xl text-primary">{curso.valorAvulso}</span>
                    </div>
                    <p className="text-xs text-muted-foreground italic">
                      Compra única deste curso
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 mb-4 border-2 border-purple-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Crown className="w-5 h-5 text-purple-600" />
                      <span className="text-sm">
                        Ou no Plano <strong>{curso.planoClub}</strong>
                      </span>
                    </div>
                    <p className="text-2xl text-purple-600 mb-2">{curso.valorPlanoClub}/mês</p>
                    <p className="text-xs text-muted-foreground mb-2">
                      Inclui acesso a {curso.cursosInclusos.length + 1} cursos:
                    </p>
                    <ul className="text-xs space-y-1">
                      <li>✓ {curso.nome}</li>
                      {curso.cursosInclusos.slice(0, 3).map((c, i) => (
                        <li key={i}>✓ {c}</li>
                      ))}
                      {curso.cursosInclusos.length > 3 && (
                        <li className="text-purple-600">+ outros cursos...</li>
                      )}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <Button
                      onClick={() => handleComprarAvulso(curso.id)}
                      className="w-full bg-primary hover:bg-primary/90"
                    >
                      Comprar Avulso
                    </Button>
                    <Button
                      onClick={handleAssinarClub}
                      variant="outline"
                      className="w-full border-2 border-purple-600 text-purple-600 hover:bg-purple-50"
                    >
                      Assinar pelo Club
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-primary">E-books</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ebooks.map((ebook) => (
              <div
                key={ebook.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-[4/5] overflow-hidden bg-gradient-to-br from-amber-100 to-orange-100">
                  <ImageWithFallback
                    src={ebook.image}
                    alt={ebook.nome}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-5">
                  <h4 className="mb-2">{ebook.nome}</h4>
                  <p className="text-sm text-muted-foreground mb-4">{ebook.descricao}</p>

                  {ebook.planoFree ? (
                    <>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3 text-center">
                        <p className="text-green-700">✓ Grátis no Plano FREE</p>
                      </div>
                      <Button
                        onClick={() => handleComprarEbook(ebook.id)}
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        Solicitar Grátis
                      </Button>
                    </>
                  ) : (
                    <>
                      {ebook.valorAvulso && (
                        <div className="bg-muted rounded-lg p-3 mb-3">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-muted-foreground">Valor Avulso:</span>
                            <span className="text-lg text-primary">{ebook.valorAvulso}</span>
                          </div>
                          <p className="text-xs text-muted-foreground italic">Compra única</p>
                        </div>
                      )}

                      {ebook.planosClub && ebook.planosClub.length > 0 && (
                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-3 mb-3 border border-purple-200">
                          <div className="flex items-center gap-1 mb-1">
                            <Crown className="w-4 h-4 text-purple-600" />
                            <span className="text-xs">Ou nos Planos:</span>
                          </div>
                          <p className="text-sm text-purple-600 mb-1">
                            {ebook.planosClub.join(", ")}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            A partir de {ebook.valorPlanoClub}/mês
                          </p>
                        </div>
                      )}

                      <div className="space-y-2">
                        <Button
                          onClick={() => handleComprarEbook(ebook.id)}
                          className="w-full bg-amber-600 hover:bg-amber-700"
                        >
                          Comprar Avulso
                        </Button>
                        {ebook.planosClub && (
                          <Button
                            onClick={handleAssinarClub}
                            variant="outline"
                            className="w-full border-2 border-purple-600 text-purple-600 hover:bg-purple-50 text-sm"
                          >
                            Ver Planos do Club
                          </Button>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-16 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 text-center max-w-4xl mx-auto">
          <h3 className="text-primary mb-4">Quer Acesso a Todos os Cursos?</h3>
          <p className="text-lg text-muted-foreground mb-6">
            Assine o Cria Ti na Luz Club e tenha acesso ilimitado a todos os cursos, e-books e
            conteúdos exclusivos!
          </p>
          <Button
            onClick={handleAssinarClub}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <Crown className="mr-2 w-5 h-5" />
            Ver Planos do Club
          </Button>
        </div>
      </div>
    </div>
  );
}
