import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAdmin } from "../../contexts/AdminContext";
import { useData } from "../../contexts/DataContext";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { ArrowLeft, Save, Edit, Trash2, X } from "lucide-react";

export function AdminArtigos() {
  const { isAuthenticated } = useAdmin();
  const { artigos, addArtigo, updateArtigo, deleteArtigo } = useData();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    date: "",
    image: "",
    content: "",
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const artigo = {
      id: editingId || Date.now().toString(),
      ...formData,
    };

    if (editingId) {
      await updateArtigo(editingId, artigo);
    } else {
      await addArtigo(artigo);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: "",
      excerpt: "",
      date: "",
      image: "",
      content: "",
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEdit = (id: string) => {
    const artigo = artigos.find((a) => a.id === id);
    if (artigo) {
      setFormData({
        title: artigo.title,
        excerpt: artigo.excerpt,
        date: artigo.date,
        image: artigo.image,
        content: artigo.content || "",
      });
      setEditingId(id);
      setIsEditing(true);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir este artigo?")) {
      await deleteArtigo(id);
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
          <h1 className="text-3xl">Gerenciar Artigos do Blog</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-primary mb-6">
              {isEditing ? "Editar Artigo" : "Adicionar Novo Artigo"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Título do Artigo</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Resumo</Label>
                <Textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  required
                  className="mt-1"
                  rows={3}
                  placeholder="Breve descrição do artigo que aparece na listagem"
                />
              </div>

              <div>
                <Label>Data de Publicação</Label>
                <Input
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  placeholder="15 de Abril, 2026"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label>URL da Imagem de Capa</Label>
                <Input
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://..."
                  required
                  className="mt-1"
                />
                {formData.image && (
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="mt-2 w-full h-40 object-cover rounded-lg"
                  />
                )}
              </div>

              <div>
                <Label>Conteúdo Completo (opcional)</Label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="mt-1"
                  rows={8}
                  placeholder="Texto completo do artigo (caso queira criar páginas individuais no futuro)"
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
                  <Save className="mr-2 w-4 h-4" />
                  {isEditing ? "Salvar Alterações" : "Publicar Artigo"}
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
            <h3 className="mb-4">Artigos Publicados ({artigos.length})</h3>
            <div className="space-y-4">
              {artigos.length === 0 ? (
                <div className="bg-muted rounded-lg p-8 text-center text-muted-foreground">
                  Nenhum artigo publicado ainda
                </div>
              ) : (
                artigos.map((artigo) => (
                  <div key={artigo.id} className="bg-white rounded-lg p-4 shadow-md">
                    <div className="flex gap-4">
                      {artigo.image && (
                        <img
                          src={artigo.image}
                          alt={artigo.title}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                      )}
                      <div className="flex-1">
                        <h4 className="mb-1">{artigo.title}</h4>
                        <p className="text-xs text-muted-foreground mb-2">{artigo.date}</p>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {artigo.excerpt}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(artigo.id)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(artigo.id)}
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
