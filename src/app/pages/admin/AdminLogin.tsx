import { useState } from "react";
import { useNavigate } from "react-router";
import { useAdmin } from "../../contexts/AdminContext";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Lock } from "lucide-react";

export function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAdmin();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(password);
    if (success) {
      navigate("/admin/dashboard");
    } else {
      setError("Senha incorreta!");
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-amber-100">
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 w-full max-w-md">
        <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="w-10 h-10 text-white" />
        </div>

        <h1 className="text-center text-primary mb-2">Painel Administrativo</h1>
        <p className="text-center text-muted-foreground mb-8">
          Cria Ti na Luz por Márcia Moraes
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2">Senha de Acesso</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="Digite sua senha"
              className="h-12 text-lg"
              autoFocus
            />
            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          </div>

          <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 h-12">
            Entrar no Painel
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Acesso restrito apenas para administradores
        </p>
      </div>
    </div>
  );
}
