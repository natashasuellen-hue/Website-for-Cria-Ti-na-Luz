import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAdmin } from "../../contexts/AdminContext";
import { useData } from "../../contexts/DataContext";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { ImageUpload } from "../../components/ui/image-upload";
import { ArrowLeft, Save, Edit, Trash2, X } from "lucide-react";

export function AdminConsultas() {
  const { isAuthenticated } = useAdmin();
  const { consultas, addConsulta, updateConsulta, deleteConsulta } = useData();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nome: "",
    medium: "",
    tipo: "",
    duracao: "",
    preco: "",
    descricao: "",
    image: "",
    linkPayPal: "",
    linkMercadoPago: "",
    linkWhatsApp: "",
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const consulta = {
      id: editingId || Date.now().toString(),
      ...formData,
    };

    if (editingId) {
      await updateConsulta(editingId, consulta);
    } else {
      await addConsulta(consulta);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      nome: "",
      medium: "",
      tipo: "",
      duracao: "",
      preco: "",
      descricao: "",
      image: "",
      linkPayPal: "",
      linkMercadoPago: "",
      linkWhatsApp: "",
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEdit = (id: string) => {
    const consulta = consultas.find((c) => c.id === id);
    if (consulta) {
      setFormData(consulta);
      setEditingId(id);
      setIsEditing(true);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta consulta?")) {
      await deleteConsulta(id);
    }
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
          <h1 className="text-3xl">Gerenciar Consultas</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-primary mb-6">
              {isEditing ? "Editar Consulta" : "Adicionar Nova Consulta"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Nome da Consulta</Label>
                <Input
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Médium/Profissional</Label>
                <Input
                  value={formData.medium}
                  onChange={(e) => setFormData({ ...formData, medium: e.target.value })}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Tipo (Presencial, Online ou ambos)</Label>
                <Input
                  value={formData.tipo}
                  onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                  placeholder="Presencial ou Online"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Duração</Label>
                <Input
                  value={formData.duracao}
                  onChange={(e) => setFormData({ ...formData, duracao: e.target.value })}
                  placeholder="60 minutos"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Preço</Label>
                <Input
                  value={formData.preco}
                  onChange={(e) => setFormData({ ...formData, preco: e.target.value })}
                  placeholder="R$ 350"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Descrição</Label>
                <Textarea
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  required
                  className="mt-1"
                  rows={3}
                />
              </div>

              <ImageUpload
                value={formData.image}
                onChange={(value) => setFormData({ ...formData, image: value })}
                label="Imagem da Consulta"
              />

              <div className="border-t border-border pt-4 mt-4">
                <h3 className="text-primary mb-4">Links de Pagamento</h3>
                <div className="space-y-4">
                  <div>
                    <Label>Link do PayPal</Label>
                    <Input
                      value={formData.linkPayPal}
                      onChange={(e) => setFormData({ ...formData, linkPayPal: e.target.value })}
                      placeholder="https://www.paypal.com/..."
                      required
                      className="mt-1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Cole o link direto do botão de pagamento do PayPal
                    </p>
                  </div>

                  <div>
                    <Label>Link do Mercado Pago</Label>
                    <Input
                      value={formData.linkMercadoPago}
                      onChange={(e) => setFormData({ ...formData, linkMercadoPago: e.target.value })}
                      placeholder="https://www.mercadopago.com.br/..."
                      required
                      className="mt-1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Cole o link direto do botão de pagamento do Mercado Pago
                    </p>
                  </div>

                  <div>
                    <Label>Link do WhatsApp</Label>
                    <Input
                      value={formData.linkWhatsApp}
                      onChange={(e) => setFormData({ ...formData, linkWhatsApp: e.target.value })}
                      placeholder="https://wa.me/5511999999999"
                      required
                      className="mt-1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Link completo do WhatsApp (abrirá ao clicar em "Enviar Comprovante")
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
                  <Save className="mr-2 w-4 h-4" />
                  {isEditing ? "Salvar Alterações" : "Adicionar Consulta"}
                </Button>
                {isEditing && (
                  <Button type="button" variant="outline" onClick={resetForm}>
                    <X className="mr-2 w-4 h-4" />
                    Cancelar
                  </Button>
                )}
              </div>
            </form>
          </div>

          <div>
            <h3 className="mb-4">Consultas Cadastradas ({consultas.length})</h3>
            <div className="space-y-4">
              {consultas.length === 0 ? (
                <div className="bg-muted rounded-lg p-8 text-center text-muted-foreground">
                  Nenhuma consulta cadastrada ainda
                </div>
              ) : (
                consultas.map((consulta) => (
                  <div key={consulta.id} className="bg-white rounded-lg p-4 shadow-md">
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <h4 className="mb-1">{consulta.nome}</h4>
                        <p className="text-sm text-muted-foreground mb-1">{consulta.medium}</p>
                        <p className="text-primary mb-1">{consulta.preco}</p>
                        <p className="text-xs text-muted-foreground">
                          {consulta.tipo} • {consulta.duracao}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(consulta.id)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(consulta.id)}
                          className="text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
