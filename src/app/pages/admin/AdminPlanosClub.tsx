import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAdmin } from "../../contexts/AdminContext";
import { useData } from "../../contexts/DataContext";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { ArrowLeft, Save } from "lucide-react";

const planosDefault = [
  {
    id: "free",
    nome: "Free",
    preco: "Grátis",
    linkPayPal: "",
    linkMercadoPago: "",
    linkWhatsApp: "https://wa.me/5511999999999",
  },
  {
    id: "clube",
    nome: "Clube",
    preco: "R$ 97",
    linkPayPal: "",
    linkMercadoPago: "",
    linkWhatsApp: "https://wa.me/5511999999999",
  },
  {
    id: "premium",
    nome: "Premium",
    preco: "R$ 297",
    linkPayPal: "",
    linkMercadoPago: "",
    linkWhatsApp: "https://wa.me/5511999999999",
  },
  {
    id: "premium-plus",
    nome: "Premium + Acompanhamento",
    preco: "R$ 497",
    linkPayPal: "",
    linkMercadoPago: "",
    linkWhatsApp: "https://wa.me/5511999999999",
  },
];

export function AdminPlanosClub() {
  const { isAuthenticated } = useAdmin();
  const { siteData, updateSiteData } = useData();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(siteData.planosClub || planosDefault);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    setFormData(siteData.planosClub || planosDefault);
  }, [siteData.planosClub]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedData = { ...siteData, planosClub: formData };
    await updateSiteData(updatedData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updatePlano = (id: string, field: string, value: string) => {
    setFormData(
      formData.map((plano) =>
        plano.id === id ? { ...plano, [field]: value } : plano
      )
    );
  };

  if (!isAuthenticated) return null;

  if (!formData || formData.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-primary mb-4">Carregando...</h2>
          <Button onClick={() => navigate("/admin/dashboard")}>
            Voltar ao Painel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-white py-6">
        <div className="container mx-auto px-4">
          <Button
            onClick={() => navigate("/admin/dashboard")}
            variant="ghost"
            className="text-white hover:bg-white/20 mb-4"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Voltar ao Painel
          </Button>
          <h1 className="text-3xl">Configurar Planos do Club</h1>
          <p className="text-white/80 mt-2">
            Configure os links de pagamento individuais para cada plano
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {formData.map((plano) => (
            <div
              key={plano.id}
              className="bg-white rounded-2xl p-8 shadow-lg border-2 border-primary/10"
            >
              <div className="mb-6">
                <h2 className="text-2xl text-primary mb-1">{plano.nome}</h2>
                <p className="text-lg text-muted-foreground">{plano.preco}</p>
              </div>

              <div className="space-y-6">
                <div>
                  <Label>Link do PayPal</Label>
                  <Input
                    value={plano.linkPayPal}
                    onChange={(e) =>
                      updatePlano(plano.id, "linkPayPal", e.target.value)
                    }
                    placeholder="https://www.paypal.com/..."
                    className="mt-2"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Cole o link direto do botão de pagamento do PayPal para este
                    plano
                  </p>
                </div>

                <div>
                  <Label>Link do Mercado Pago</Label>
                  <Input
                    value={plano.linkMercadoPago}
                    onChange={(e) =>
                      updatePlano(plano.id, "linkMercadoPago", e.target.value)
                    }
                    placeholder="https://www.mercadopago.com.br/..."
                    className="mt-2"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Cole o link direto do botão de pagamento do Mercado Pago para
                    este plano
                  </p>
                </div>

                <div>
                  <Label>Link do WhatsApp para Comprovante</Label>
                  <Input
                    value={plano.linkWhatsApp}
                    onChange={(e) =>
                      updatePlano(plano.id, "linkWhatsApp", e.target.value)
                    }
                    placeholder="https://wa.me/5511999999999"
                    className="mt-2"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Link do WhatsApp que abrirá quando o cliente clicar em "Enviar
                    Comprovante"
                  </p>
                </div>
              </div>
            </div>
          ))}

          <div className="flex gap-4 pt-6">
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90 h-14"
            >
              <Save className="mr-2 w-5 h-5" />
              Salvar Configurações
            </Button>
          </div>

          {saved && (
            <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg text-center">
              ✓ Planos salvos com sucesso!
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
