import { useNavigate, useSearchParams } from "react-router";
import { useData } from "../contexts/DataContext";
import { Button } from "../components/ui/button";
import { ArrowLeft, GraduationCap, BookOpen } from "lucide-react";

export function PagamentoCurso() {
  const [searchParams] = useSearchParams();
  const cursoId = searchParams.get("id");
  const tipo = searchParams.get("tipo");
  const { cursos, ebooks, siteData } = useData();
  const navigate = useNavigate();

  let item: any = null;
  let isCurso = tipo !== "ebook";

  if (isCurso) {
    item = cursos.find((c) => c.id === cursoId);
  } else {
    item = ebooks.find((e) => e.id === cursoId);
  }

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-primary mb-4">{isCurso ? "Curso" : "E-book"} não encontrado</h2>
          <Button onClick={() => navigate("/cursos")}>Voltar para Cursos</Button>
        </div>
      </div>
    );
  }

  const handleWhatsApp = () => {
    if (item.linkWhatsApp) {
      window.open(item.linkWhatsApp, "_blank");
    }
  };

  const preco = isCurso ? item.valorAvulso : item.preco;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12">
      <div className="container mx-auto px-4">
        <Button
          onClick={() => navigate("/cursos")}
          variant="outline"
          className="mb-6"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Voltar
        </Button>

        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-amber-600 text-white p-8 text-center">
            {isCurso ? (
              <GraduationCap className="w-16 h-16 mx-auto mb-4" />
            ) : (
              <BookOpen className="w-16 h-16 mx-auto mb-4" />
            )}
            <h1 className="text-3xl mb-2">Finalizar Compra</h1>
            <p className="text-white/90">Complete sua compra avulsa</p>
          </div>

          <div className="p-8">
            <div className="bg-muted rounded-xl p-6 mb-6">
              <h3 className="text-primary mb-4">Detalhes da Compra</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{isCurso ? "Curso" : "E-book"}:</span>
                  <span>{item.nome}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Descrição:</span>
                  <span className="text-right text-sm">{item.descricao}</span>
                </div>
                {isCurso && item.aoVivo && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Formato:</span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      Ao vivo + Gravação
                    </span>
                  </div>
                )}
                <div className="flex justify-between pt-4 border-t border-border">
                  <span className="text-xl">Total:</span>
                  <span className="text-2xl text-primary">{preco}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <h3 className="text-primary">Escolha a Forma de Pagamento</h3>

              <div className="bg-green-50 border-2 border-green-500 rounded-xl p-6 text-center">
                <h4 className="mb-2">Pix (Recomendado)</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Aprovação instantânea
                </p>
                <div className="bg-white rounded-lg p-4 mb-4">
                  <p className="text-sm text-muted-foreground mb-1">Chave Pix:</p>
                  <p className="text-xl text-foreground break-all">{siteData.pixKey}</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Faça o Pix e envie o comprovante
                </p>
              </div>

              {item.linkPayPal && (
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 h-14"
                  onClick={() => window.open(item.linkPayPal, "_blank")}
                >
                  <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.767.767 0 0 1 .758-.653h8.265c2.04 0 3.893.424 5.162 1.674 1.173 1.158 1.591 2.82 1.244 4.944-.557 3.405-2.793 5.618-5.712 5.618h-2.94a.767.767 0 0 0-.758.653l-.738 4.626a.641.641 0 0 1-.633.655h-2.516z"/>
                  </svg>
                  Pagar com PayPal
                </Button>
              )}

              {item.linkMercadoPago && (
                <Button
                  className="w-full bg-blue-400 hover:bg-blue-500 h-14"
                  onClick={() => window.open(item.linkMercadoPago, "_blank")}
                >
                  Pagar com Mercado Pago
                </Button>
              )}
            </div>

            <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6">
              <h4 className="mb-3">📱 Após o Pagamento</h4>
              <p className="text-muted-foreground mb-4">
                Envie o comprovante via WhatsApp com as seguintes informações:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mb-4">
                <li>Seu nome completo</li>
                <li>Seu melhor e-mail</li>
                <li>Comprovante de pagamento</li>
              </ul>
              <Button
                onClick={handleWhatsApp}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
              >
                Enviar Comprovante via WhatsApp
              </Button>
            </div>

            {isCurso && item.planoClub && (
              <div className="mt-6 bg-purple-50 border-2 border-purple-200 rounded-xl p-6 text-center">
                <p className="text-sm text-muted-foreground mb-2">💡 Dica:</p>
                <p className="mb-3">
                  No plano <strong>{item.planoClub}</strong> por <strong>{item.valorPlanoClub}/mês</strong>,
                  você tem acesso a este e mais {item.cursosInclusos?.length || 0} cursos!
                </p>
                <Button
                  onClick={() => navigate("/club")}
                  variant="outline"
                  className="border-2 border-purple-600 text-purple-600"
                >
                  Ver Planos do Club
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
