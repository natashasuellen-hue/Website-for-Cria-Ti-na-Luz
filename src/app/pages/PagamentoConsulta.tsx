import { useNavigate, useSearchParams } from "react-router";
import { useData } from "../contexts/DataContext";
import { Button } from "../components/ui/button";
import { ArrowLeft, CreditCard } from "lucide-react";

export function PagamentoConsulta() {
  const [searchParams] = useSearchParams();
  const consultaId = searchParams.get("id");
  const { consultas, siteData } = useData();
  const navigate = useNavigate();

  const consulta = consultas.find((c) => c.id === consultaId);

  if (!consulta) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-primary mb-4">Consulta não encontrada</h2>
          <Button onClick={() => navigate("/consultas")}>Voltar para Consultas</Button>
        </div>
      </div>
    );
  }

  const handleWhatsApp = () => {
    if (consulta.linkWhatsApp) {
      window.open(consulta.linkWhatsApp, "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-12">
      <div className="container mx-auto px-4">
        <Button
          onClick={() => navigate("/consultas")}
          variant="outline"
          className="mb-6"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Voltar
        </Button>

        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-amber-600 text-white p-8 text-center">
            <CreditCard className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-3xl mb-2">Finalizar Pagamento</h1>
            <p className="text-white/90">Complete sua reserva de consulta</p>
          </div>

          <div className="p-8">
            <div className="bg-muted rounded-xl p-6 mb-6">
              <h3 className="text-primary mb-4">Detalhes da Consulta</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Consulta:</span>
                  <span>{consulta.nome}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Profissional:</span>
                  <span>{consulta.medium}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tipo:</span>
                  <span>{consulta.tipo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duração:</span>
                  <span>{consulta.duracao}</span>
                </div>
                <div className="flex justify-between pt-4 border-t border-border">
                  <span className="text-xl">Total:</span>
                  <span className="text-2xl text-primary">{consulta.preco}</span>
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

              {consulta.linkPayPal && (
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 h-14"
                  onClick={() => window.open(consulta.linkPayPal, "_blank")}
                >
                  <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.767.767 0 0 1 .758-.653h8.265c2.04 0 3.893.424 5.162 1.674 1.173 1.158 1.591 2.82 1.244 4.944-.557 3.405-2.793 5.618-5.712 5.618h-2.94a.767.767 0 0 0-.758.653l-.738 4.626a.641.641 0 0 1-.633.655h-2.516z"/>
                  </svg>
                  Pagar com PayPal
                </Button>
              )}

              {consulta.linkMercadoPago && (
                <Button
                  className="w-full bg-blue-400 hover:bg-blue-500 h-14"
                  onClick={() => window.open(consulta.linkMercadoPago, "_blank")}
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
                <li>Comprovante de pagamento</li>
                <li>Data e horário de preferência</li>
              </ul>
              <Button
                onClick={handleWhatsApp}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
              >
                Enviar Comprovante via WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
