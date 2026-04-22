import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAdmin } from "../../contexts/AdminContext";
import { useData } from "../../contexts/DataContext";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { ImageUpload } from "../../components/ui/image-upload";
import { ArrowLeft, Save, Mail, Trash2 } from "lucide-react";

export function AdminConfiguracoes() {
  const { isAuthenticated } = useAdmin();
  const { siteData, updateSiteData } = useData();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(siteData);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    setFormData(siteData);
  }, [siteData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSiteData(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleDeleteEmail = async (email: string) => {
    if (confirm(`Remover email: ${email}?`)) {
      const updated = {
        ...formData,
        newsletterEmails: formData.newsletterEmails.filter(e => e !== email),
      };
      setFormData(updated);
      await updateSiteData(updated);
    }
  };

  const handleExportEmails = () => {
    const emailList = formData.newsletterEmails.join('\n');
    const blob = new Blob([emailList], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'newsletter-emails.txt';
    a.click();
  };

  if (!isAuthenticated) return null;

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
          <h1 className="text-3xl">Configurações do Site</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="text-primary mb-4">Foto e Biografia da Márcia Moraes</h3>
              <div className="space-y-4">
                <ImageUpload
                  value={formData.marciaImage}
                  onChange={(value) =>
                    setFormData({ ...formData, marciaImage: value })
                  }
                  label="Foto da Márcia"
                />

                <div>
                  <Label>Biografia da Márcia</Label>
                  <Textarea
                    value={formData.marciaBio}
                    onChange={(e) =>
                      setFormData({ ...formData, marciaBio: e.target.value })
                    }
                    className="mt-1"
                    rows={4}
                    placeholder="Sua missão é ajudar pessoas a encontrarem seu caminho e autoconhecimento..."
                  />
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-primary mb-4">Contatos</h3>
              <div className="space-y-4">
                <div>
                  <Label>WhatsApp (com DDI e DDD)</Label>
                  <Input
                    value={formData.whatsapp}
                    onChange={(e) =>
                      setFormData({ ...formData, whatsapp: e.target.value })
                    }
                    placeholder="5511999999999"
                    className="mt-1"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Exemplo: 5511999999999 (Brasil) ou 351999999999 (Portugal)
                  </p>
                </div>

                <div>
                  <Label>E-mail</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Chave Pix</Label>
                  <Input
                    value={formData.pixKey}
                    onChange={(e) =>
                      setFormData({ ...formData, pixKey: e.target.value })
                    }
                    placeholder="CPF, e-mail ou chave aleatória"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-primary mb-4">Links do WhatsApp</h3>
              <div className="space-y-4">
                <div>
                  <Label>WhatsApp Comunidade</Label>
                  <Input
                    value={formData.whatsappComunidade}
                    onChange={(e) =>
                      setFormData({ ...formData, whatsappComunidade: e.target.value })
                    }
                    placeholder="5511999999999"
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Botão "Faça Parte da Comunidade"
                  </p>
                </div>

                <div>
                  <Label>WhatsApp Eventos</Label>
                  <Input
                    value={formData.whatsappEventos}
                    onChange={(e) =>
                      setFormData({ ...formData, whatsappEventos: e.target.value })
                    }
                    placeholder="5511999999999"
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Botões de inscrição em eventos
                  </p>
                </div>

                <div>
                  <Label>WhatsApp Comprovante</Label>
                  <Input
                    value={formData.whatsappComprovante}
                    onChange={(e) =>
                      setFormData({ ...formData, whatsappComprovante: e.target.value })
                    }
                    placeholder="5511999999999"
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Botão "Enviar Comprovante via WhatsApp"
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-primary mb-4">Links de Pagamento</h3>
              <div className="space-y-4">
                <div>
                  <Label>Link do PayPal</Label>
                  <Input
                    value={formData.linkPayPal}
                    onChange={(e) =>
                      setFormData({ ...formData, linkPayPal: e.target.value })
                    }
                    placeholder="https://www.paypal.com/seu-link"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Link do Mercado Pago</Label>
                  <Input
                    value={formData.linkMercadoPago}
                    onChange={(e) =>
                      setFormData({ ...formData, linkMercadoPago: e.target.value })
                    }
                    placeholder="https://www.mercadopago.com.br/seu-link"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-primary mb-4">Redes Sociais</h3>
              <div className="space-y-4">
                <div>
                  <Label>Instagram</Label>
                  <Input
                    value={formData.instagram}
                    onChange={(e) =>
                      setFormData({ ...formData, instagram: e.target.value })
                    }
                    placeholder="https://instagram.com/seu_perfil"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>YouTube</Label>
                  <Input
                    value={formData.youtube}
                    onChange={(e) =>
                      setFormData({ ...formData, youtube: e.target.value })
                    }
                    placeholder="https://youtube.com/@seu_canal"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>TikTok</Label>
                  <Input
                    value={formData.tiktok}
                    onChange={(e) =>
                      setFormData({ ...formData, tiktok: e.target.value })
                    }
                    placeholder="https://tiktok.com/@seu_perfil"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-primary">E-mails da Newsletter</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleExportEmails}
                  disabled={formData.newsletterEmails?.length === 0}
                >
                  Exportar Lista
                </Button>
              </div>
              <div className="bg-muted rounded-lg p-4 max-h-60 overflow-y-auto">
                {formData.newsletterEmails?.length === 0 ? (
                  <p className="text-center text-muted-foreground">
                    Nenhum email cadastrado ainda
                  </p>
                ) : (
                  <div className="space-y-2">
                    {formData.newsletterEmails?.map((email, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-white p-3 rounded-lg"
                      >
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-primary" />
                          <span className="text-sm">{email}</span>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteEmail(email)}
                          className="text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
                <Save className="mr-2 w-4 h-4" />
                Salvar Configurações
              </Button>
            </div>

            {saved && (
              <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg text-center">
                ✓ Configurações salvas com sucesso!
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
