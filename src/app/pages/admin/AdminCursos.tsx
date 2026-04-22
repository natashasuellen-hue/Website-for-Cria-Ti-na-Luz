import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAdmin } from "../../contexts/AdminContext";
import { useData } from "../../contexts/DataContext";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { ImageUpload } from "../../components/ui/image-upload";
import { ArrowLeft, Save, Edit, Trash2, X, Plus } from "lucide-react";

export function AdminCursos() {
  const { isAuthenticated } = useAdmin();
  const { cursos, addCurso, updateCurso, deleteCurso } = useData();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    valorAvulso: "",
    planoClub: "",
    valorPlanoClub: "",
    cursosInclusos: [""],
    aoVivo: true,
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
    const curso = {
      id: editingId || Date.now().toString(),
      ...formData,
      cursosInclusos: formData.cursosInclusos.filter(c => c.trim() !== ""),
    };

    if (editingId) {
      await updateCurso(editingId, curso);
    } else {
      await addCurso(curso);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      nome: "",
      descricao: "",
      valorAvulso: "",
      planoClub: "",
      valorPlanoClub: "",
      cursosInclusos: [""],
      aoVivo: true,
      image: "",
      linkPayPal: "",
      linkMercadoPago: "",
      linkWhatsApp: "",
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEdit = (id: string) => {
    const curso = cursos.find((c) => c.id === id);
    if (curso) {
      setFormData({
        ...curso,
        cursosInclusos: curso.cursosInclusos.length > 0 ? curso.cursosInclusos : [""],
      });
      setEditingId(id);
      setIsEditing(true);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir este curso?")) {
      await deleteCurso(id);
    }
  };

  const addCursoIncluso = () => {
    setFormData({
      ...formData,
      cursosInclusos: [...formData.cursosInclusos, ""],
    });
  };

  const removeCursoIncluso = (index: number) => {
    const updated = formData.cursosInclusos.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      cursosInclusos: updated.length > 0 ? updated : [""],
    });
  };

  const updateCursoIncluso = (index: number, value: string) => {
    const updated = [...formData.cursosInclusos];
    updated[index] = value;
    setFormData({ ...formData, cursosInclusos: updated });
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
          <h1 className="text-3xl">Gerenciar Cursos</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-primary mb-6">
              {isEditing ? "Editar Curso" : "Adicionar Novo Curso"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Nome do Curso</Label>
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Valor Avulso</Label>
                  <Input
                    value={formData.valorAvulso}
                    onChange={(e) => setFormData({ ...formData, valorAvulso: e.target.value })}
                    placeholder="R$ 97"
                    required
                    className="mt-1"
                  />
                </div>

                <div className="flex items-center gap-2 mt-6">
                  <input
                    type="checkbox"
                    id="aoVivo"
                    checked={formData.aoVivo}
                    onChange={(e) => setFormData({ ...formData, aoVivo: e.target.checked })}
                    className="w-5 h-5"
                  />
                  <Label htmlFor="aoVivo">Curso Ao Vivo</Label>
                </div>
              </div>

              <div>
                <Label>Plano do Club que inclui este curso</Label>
                <select
                  value={formData.planoClub}
                  onChange={(e) => setFormData({ ...formData, planoClub: e.target.value })}
                  required
                  className="w-full mt-1 p-2 border rounded-lg"
                >
                  <option value="">Selecione...</option>
                  <option value="Clube">Clube (R$ 97/mês)</option>
                  <option value="Premium">Premium (R$ 297/mês)</option>
                  <option value="Premium + Acompanhamento">Premium + Acompanhamento (R$ 497/mês)</option>
                </select>
              </div>

              <div>
                <Label>Valor do Plano Club</Label>
                <Input
                  value={formData.valorPlanoClub}
                  onChange={(e) => setFormData({ ...formData, valorPlanoClub: e.target.value })}
                  placeholder="R$ 297"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Outros Cursos Inclusos no Plano</Label>
                <p className="text-xs text-muted-foreground mb-2">
                  Liste outros cursos que vêm junto neste plano
                </p>
                {formData.cursosInclusos.map((curso, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <Input
                      value={curso}
                      onChange={(e) => updateCursoIncluso(index, e.target.value)}
                      placeholder="Nome do curso incluso"
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeCursoIncluso(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addCursoIncluso}
                  className="w-full"
                >
                  <Plus className="mr-2 w-4 h-4" />
                  Adicionar Curso
                </Button>
              </div>

              <ImageUpload
                value={formData.image}
                onChange={(value) => setFormData({ ...formData, image: value })}
                label="Imagem do Curso"
              />

              <div className="border-t border-border pt-4 mt-4">
                <h3 className="text-primary mb-4">Links de Pagamento (Compra Avulsa)</h3>
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
                      Link completo do WhatsApp para envio de comprovante
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
                  <Save className="mr-2 w-4 h-4" />
                  {isEditing ? "Salvar Alterações" : "Adicionar Curso"}
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
            <h3 className="mb-4">Cursos Cadastrados ({cursos.length})</h3>
            <div className="space-y-4">
              {cursos.length === 0 ? (
                <div className="bg-muted rounded-lg p-8 text-center text-muted-foreground">
                  Nenhum curso cadastrado ainda
                </div>
              ) : (
                cursos.map((curso) => (
                  <div key={curso.id} className="bg-white rounded-lg p-4 shadow-md">
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4>{curso.nome}</h4>
                          {curso.aoVivo && (
                            <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                              Ao Vivo
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{curso.descricao}</p>
                        <div className="flex gap-4 text-sm">
                          <span className="text-primary">Avulso: {curso.valorAvulso}</span>
                          <span className="text-purple-600">
                            {curso.planoClub}: {curso.valorPlanoClub}/mês
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          +{curso.cursosInclusos.length} cursos inclusos
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(curso.id)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(curso.id)}
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
