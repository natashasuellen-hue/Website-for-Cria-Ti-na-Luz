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

export function AdminEventos() {
  const { isAuthenticated } = useAdmin();
  const { eventos, addEvento, updateEvento, deleteEvento } = useData();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nome: "",
    data: "",
    horario: "",
    local: "",
    valor: "",
    descricao: "",
    vagas: "",
    image: "",
    pais: "brasil" as "brasil" | "portugal",
    linkWhatsApp: "",
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const evento = {
      id: editingId || Date.now().toString(),
      ...formData,
    };

    if (editingId) {
      await updateEvento(editingId, evento);
    } else {
      await addEvento(evento);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      nome: "",
      data: "",
      horario: "",
      local: "",
      valor: "",
      descricao: "",
      vagas: "",
      image: "",
      pais: "brasil",
      linkWhatsApp: "",
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEdit = (id: string) => {
    const evento = eventos.find((e) => e.id === id);
    if (evento) {
      setFormData(evento);
      setEditingId(id);
      setIsEditing(true);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir este evento?")) {
      await deleteEvento(id);
    }
  };

  const eventosBrasil = eventos.filter((e) => e.pais === "brasil");
  const eventosPortugal = eventos.filter((e) => e.pais === "portugal");

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
          <h1 className="text-3xl">Gerenciar Eventos</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-primary mb-6">
              {isEditing ? "Editar Evento" : "Adicionar Novo Evento"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Nome do Evento</Label>
                <Input
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  required
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Data</Label>
                  <Input
                    value={formData.data}
                    onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                    placeholder="28 de Abril, 2026"
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Horário</Label>
                  <Input
                    value={formData.horario}
                    onChange={(e) => setFormData({ ...formData, horario: e.target.value })}
                    placeholder="14h às 18h"
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label>País</Label>
                <select
                  value={formData.pais}
                  onChange={(e) =>
                    setFormData({ ...formData, pais: e.target.value as "brasil" | "portugal" })
                  }
                  required
                  className="w-full mt-1 p-2 border rounded-lg"
                >
                  <option value="brasil">🇧🇷 Brasil</option>
                  <option value="portugal">🇵🇹 Portugal</option>
                </select>
              </div>

              <div>
                <Label>Local</Label>
                <Input
                  value={formData.local}
                  onChange={(e) => setFormData({ ...formData, local: e.target.value })}
                  placeholder="São Paulo - Zona Norte (Água Fria)"
                  required
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Valor</Label>
                  <Input
                    value={formData.valor}
                    onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
                    placeholder="R$ 180 ou Gratuito"
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Vagas</Label>
                  <Input
                    value={formData.vagas}
                    onChange={(e) => setFormData({ ...formData, vagas: e.target.value })}
                    placeholder="25 vagas"
                    required
                    className="mt-1"
                  />
                </div>
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
                label="Imagem do Evento"
              />

              <div className="border-t border-border pt-4 mt-4">
                <Label>Link do WhatsApp para Inscrições</Label>
                <Input
                  value={formData.linkWhatsApp}
                  onChange={(e) => setFormData({ ...formData, linkWhatsApp: e.target.value })}
                  placeholder="https://wa.me/5511999999999"
                  required
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Link completo do WhatsApp que abrirá ao clicar em "Fazer Inscrição"
                </p>
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
                  <Save className="mr-2 w-4 h-4" />
                  {isEditing ? "Salvar Alterações" : "Adicionar Evento"}
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
            <h3 className="mb-4">Eventos Cadastrados ({eventos.length})</h3>

            <div className="mb-6">
              <h4 className="text-sm text-muted-foreground mb-3">🇧🇷 Brasil ({eventosBrasil.length})</h4>
              <div className="space-y-3">
                {eventosBrasil.length === 0 ? (
                  <div className="bg-muted rounded-lg p-4 text-center text-sm text-muted-foreground">
                    Nenhum evento no Brasil
                  </div>
                ) : (
                  eventosBrasil.map((evento) => (
                    <div key={evento.id} className="bg-white rounded-lg p-4 shadow-md">
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <h4 className="mb-1">{evento.nome}</h4>
                          <p className="text-xs text-muted-foreground mb-2">
                            {evento.data} • {evento.horario}
                          </p>
                          <p className="text-xs text-muted-foreground mb-1">{evento.local}</p>
                          <div className="flex gap-4 text-xs">
                            <span className="text-primary">{evento.valor}</span>
                            <span className="text-muted-foreground">{evento.vagas}</span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(evento.id)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(evento.id)}
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

            <div>
              <h4 className="text-sm text-muted-foreground mb-3">🇵🇹 Portugal ({eventosPortugal.length})</h4>
              <div className="space-y-3">
                {eventosPortugal.length === 0 ? (
                  <div className="bg-muted rounded-lg p-4 text-center text-sm text-muted-foreground">
                    Nenhum evento em Portugal
                  </div>
                ) : (
                  eventosPortugal.map((evento) => (
                    <div key={evento.id} className="bg-white rounded-lg p-4 shadow-md">
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <h4 className="mb-1">{evento.nome}</h4>
                          <p className="text-xs text-muted-foreground mb-2">
                            {evento.data} • {evento.horario}
                          </p>
                          <p className="text-xs text-muted-foreground mb-1">{evento.local}</p>
                          <div className="flex gap-4 text-xs">
                            <span className="text-primary">{evento.valor}</span>
                            <span className="text-muted-foreground">{evento.vagas}</span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(evento.id)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(evento.id)}
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
    </div>
  );
}
