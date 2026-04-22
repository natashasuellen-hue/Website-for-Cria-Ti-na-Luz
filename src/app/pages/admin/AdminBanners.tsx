import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAdmin } from "../../contexts/AdminContext";
import { useData } from "../../contexts/DataContext";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { ImageUpload } from "../../components/ui/image-upload";
import { ArrowLeft, Save, Edit, Trash2, X } from "lucide-react";

export function AdminBanners() {
  const { isAuthenticated } = useAdmin();
  const { banners, addBanner, updateBanner, deleteBanner } = useData();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    badge: "",
    bgImage: "",
    linkPage: "/",
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const banner = {
      id: editingId || Date.now().toString(),
      ...formData,
    };

    if (editingId) {
      await updateBanner(editingId, banner);
    } else {
      await addBanner(banner);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: "",
      subtitle: "",
      badge: "",
      bgImage: "",
      linkPage: "/",
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEdit = (id: string) => {
    const banner = banners.find((b) => b.id === id);
    if (banner) {
      setFormData(banner);
      setEditingId(id);
      setIsEditing(true);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir este banner?")) {
      await deleteBanner(id);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white py-6">
        <div className="container mx-auto px-4">
          <Button
            onClick={() => navigate("/admin/dashboard")}
            variant="ghost"
            className="text-white hover:bg-white/20 mb-4"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Voltar ao Painel
          </Button>
          <h1 className="text-3xl">Gerenciar Banners da Página Inicial</h1>
          <p className="text-white/80 mt-2">
            Configure os slides do carrossel principal
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-primary mb-6">
              {isEditing ? "Editar Banner" : "Adicionar Novo Banner"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Título Principal</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Aula ao Vivo: Desvendando o Tarô"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Subtítulo</Label>
                <Input
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="Quinta-feira, 24 de Abril às 20h"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Badge/Etiqueta</Label>
                <Input
                  value={formData.badge}
                  onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                  placeholder="Plano Free"
                  required
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Texto que aparece no selo laranja acima do título
                </p>
              </div>

              <ImageUpload
                value={formData.bgImage}
                onChange={(value) => setFormData({ ...formData, bgImage: value })}
                label="Imagem de Fundo do Banner"
              />

              <div>
                <Label>Link do Botão "Saiba Mais"</Label>
                <select
                  value={formData.linkPage}
                  onChange={(e) => setFormData({ ...formData, linkPage: e.target.value })}
                  required
                  className="w-full mt-1 p-2 border rounded-lg"
                >
                  <option value="/">Página Inicial</option>
                  <option value="/consultas">Consultas</option>
                  <option value="/eventos">Eventos</option>
                  <option value="/cursos">Cursos</option>
                  <option value="/club">Cria Ti na Luz Club</option>
                  <option value="/desenvolvimento-espiritual">Desenvolvimento Espiritual</option>
                  <option value="/contato">Fale Conosco</option>
                </select>
                <p className="text-xs text-muted-foreground mt-1">
                  Escolha para qual página o botão "Saiba Mais" vai redirecionar
                </p>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
                  <Save className="mr-2 w-4 h-4" />
                  {isEditing ? "Salvar Alterações" : "Adicionar Banner"}
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
            <h3 className="mb-4">Banners Cadastrados ({banners.length})</h3>
            <div className="space-y-4">
              {banners.length === 0 ? (
                <div className="bg-muted rounded-lg p-8 text-center text-muted-foreground">
                  Nenhum banner cadastrado ainda
                </div>
              ) : (
                banners.map((banner) => (
                  <div key={banner.id} className="bg-white rounded-lg p-4 shadow-md">
                    <div className="flex gap-4">
                      {banner.bgImage && (
                        <img
                          src={banner.bgImage}
                          alt={banner.title}
                          className="w-32 h-20 object-cover rounded-lg"
                        />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs bg-primary text-white px-2 py-1 rounded">
                            {banner.badge}
                          </span>
                        </div>
                        <h4 className="mb-1">{banner.title}</h4>
                        <p className="text-sm text-muted-foreground mb-1">{banner.subtitle}</p>
                        <p className="text-xs text-primary">
                          Botão vai para: {banner.linkPage}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(banner.id)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(banner.id)}
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
