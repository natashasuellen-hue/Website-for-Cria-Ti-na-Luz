import { Calendar, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { useData } from "../../contexts/DataContext";
import { Link } from "react-router";

const postsPadrao = [
  {
    id: "1",
    title: "Como iniciar sua jornada espiritual",
    excerpt: "Descubra os primeiros passos para se conectar com sua espiritualidade",
    date: "15 de Abril, 2026",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop",
  },
  {
    id: "2",
    title: "O poder dos cristais na sua vida",
    excerpt: "Entenda como os cristais podem auxiliar no seu desenvolvimento pessoal",
    date: "10 de Abril, 2026",
    image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=600&h=400&fit=crop",
  },
  {
    id: "3",
    title: "Tarô: além da previsão do futuro",
    excerpt: "Conheça o tarô como ferramenta de autoconhecimento e transformação",
    date: "5 de Abril, 2026",
    image: "https://images.unsplash.com/photo-1531149410688-07071dfe6237?w=600&h=400&fit=crop",
  },
];

export function BlogSection() {
  const { artigos } = useData();

  const posts = artigos.length > 0 ? artigos.slice(0, 3) : postsPadrao;

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-primary mb-4">Últimos Artigos</h2>
          <p className="text-lg text-muted-foreground">
            Conteúdos sobre espiritualidade e desenvolvimento pessoal
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.title}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="aspect-video overflow-hidden">
                <ImageWithFallback
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
                <h3 className="mb-2">{post.title}</h3>
                <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                <Link
                  to={`/blog/${post.id}`}
                  className="flex items-center gap-2 text-primary hover:gap-3 transition-all"
                >
                  Ler mais <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
