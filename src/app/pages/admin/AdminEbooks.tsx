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

export function AdminEbooks() {
  const { isAuthenticated } = useAdmin();
  const { ebooks, addEbook, updateEbook, deleteEbook } = useData();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    preco: "",
    image: "",
    planoFree: false,
    valorAvulso: "",
    planosClub: [] as string[],
    valorPlanoClub: "",
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
    const ebook = {
      id: editingId || Date.now().toString(),
      ...formData,
    };

    if (editingId) {
      await updateEbook(editingId, ebook);
    } else {
      await addEbook(ebook);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      nome: "",
      descricao: "",
      preco: "",
      image: "",
      planoFree: false,
      valorAvulso: "",
      planosClub: [],
      valorPlanoClub: "",
      linkPayPal: "",
      linkMercadoPago: "",
      linkWhatsApp: "",
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEdit = (id: string) => {
    const ebook = ebooks.find((e) => e.id === id);
    if (ebook) {
      setFormData({
        nome: ebook.nome,
        descricao: ebook.descricao,
        preco: ebook.preco,
        image: ebook.image,
        planoFree: ebook.planoFree || false,
        valorAvulso: ebook.valorAvulso || "",
        planosClub: ebook.planosClub || [],
        valorPlanoClub: ebook.valorPlanoClub || "",
        linkPayPal: ebook.linkPayPal || "",
        linkMercadoPago: ebook.linkMercadoPago || "",
        linkWhatsApp: ebook.linkWhatsApp || "",
      });
      setEditingId(id);
      setIsEditing(true);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir este e-book?")) {
      await deleteEbook(id);
    }
  };

  const handlePlanoClubToggle = (plano: string) => {
    const updated = formData.planosClub.includes(plano)
      ? formData.planosClub.filter((p) => p !== plano)
      : [...formData.planosClub, plano];
    setFormData({ ...formData, planosClub: updated });
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-amber-600 text-white py-6">
        <div className="container mx-auto px-4">
          <Button
            onClick={() => navigate("/admin/dashboard")}
            variant="ghost"
            className="text-white hover:bg-white/20 mb-4"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Voltar ao Painel
          </Button>
          <h1 className="text-3xl">Gerenciar E-books</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-primary mb-6">
              {isEditing ? "Editar E-book" : "Adicionar Novo E-book"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Nome do E-book</Label>
                <Input
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
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

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="planoFree"
                  checked={formData.planoFree}
                  onChange={(e) => setFormData({ ...formData, planoFree: e.target.checked })}
                  className="w-5 h-5"
                />
                <Label htmlFor="planoFree">E-book Grátis (Plano FREE)</Label>
              </div>

              {!formData.planoFree && (
                <>
                  <div>
                    <Label>Valor Avulso</Label>
                    <Input
                      value={formData.valorAvulso}
                      onChange={(e) => setFormData({ ...formData, valorAvulso: e.target.value })}
                      placeholder="R$ 80"
                      required={!formData.planoFree}
                      className="mt-1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Valor para compra única do e-book
                    </p>
                  </div>

                  <div>
                    <Label>Planos do Club que incluem este e-book</Label>
                    <div className="space-y-2 mt-2">
                      {["Clube", "Premium", "Premium + Acompanhamento"].map((plano) => (
                        <label key={plano} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={formData.planosClub.includes(plano)}
                            onChange={() => handlePlanoClubToggle(plano)}
                            className="w-4 h-4"
                          />
                          <span>{plano}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {formData.planosClub.length > 0 && (
                    <div>
                      <Label>Valor do Menor Plano Club</Label>
                      <Input
                        value={formData.valorPlanoClub}
                        onChange={(e) =>
                          setFormData({ ...formData, valorPlanoClub: e.target.value })
                        }
                        placeholder="R$ 97"
                        required={formData.planosClub.length > 0}
                        className="mt-1"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Valor do plano mais barato que inclui este e-book
                      </p>
                    </div>
                  )}
                </>
              )}

              <ImageUpload
                value={formData.image}
                onChange={(value) => setFormData({ ...formData, image: value })}
                label="Imagem do E-book"
              />

              {!formData.planoFree && (
                <div className="border-t border-border pt-4 mt-4">
                  <h3 className="text-primary mb-4">Links de Pagamento (Compra Avulsa)</h3>
                  <div className="space-y-4">
                    <div>
                      <Label>Link do PayPal</Label>
                      <Input
                        value={formData.linkPayPal}
                        onChange={(e) => setFormData({ ...formData, linkPayPal: e.target.value })}
                        placeholder="https://www.paypal.com/..."
                        required={!formData.planoFree}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label>Link do Mercado Pago</Label>
                      <Input
                        value={formData.linkMercadoPago}
                        onChange={(e) => setFormData({ ...formData, linkMercadoPago: e.target.value })}
                        placeholder="https://www.mercadopago.com.br/..."
                        required={!formData.planoFree}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label>Link do WhatsApp</Label>
                      <Input
                        value={formData.linkWhatsApp}
                        onChange={(e) => setFormData({ ...formData, linkWhatsApp: e.target.value })}
                        placeholder="https://wa.me/5511999999999"
                        required={!formData.planoFree}
                        className="mt-1"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Link completo do WhatsApp para envio de comprovante
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <Button type="submit" className="flex-1 bg-amber-600 hover:bg-amber-700">
                  <Save className="mr-2 w-4 h-4" />
                  {isEditing ? "Salvar Alterações" : "Adicionar E-book"}
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
            <h3 className="mb-4">E-books Cadastrados ({ebooks.length})</h3>
            <div className="space-y-4">
              {ebooks.length === 0 ? (
                <div className="bg-muted rounded-lg p-8 text-center text-muted-foreground">
                  Nenhum e-book cadastrado ainda
                </div>
              ) : (
                ebooks.map((ebook) => (
                  <div key={ebook.id} className="bg-white rounded-lg p-4 shadow-md">
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4>{ebook.nome}</h4>
                          {ebook.planoFree && (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                              Grátis
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{ebook.descricao}</p>
                        {!ebook.planoFree && (
                          <>
                            <p className="text-sm">
                              <span className="text-amber-600">Avulso: {ebook.valorAvulso}</span>
                            </p>
                            {ebook.planosClub && ebook.planosClub.length > 0 && (
                              <p className="text-xs text-purple-600 mt-1">
                                Planos: {ebook.planosClub.join(", ")} ({ebook.valorPlanoClub}/mês)
                              </p>
                            )}
                          </>
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(ebook.id)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(ebook.id)}
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
