import { Mail } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { useData } from "../../contexts/DataContext";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const { addNewsletterEmail } = useData();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addNewsletterEmail(email);
    alert(`✅ Obrigado por se inscrever! Você receberá novidades no email: ${email}`);
    setEmail("");
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-orange-100 to-amber-100">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-primary mb-4">Receba Novidades da Egrégora</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Inscreva-se para receber conteúdos exclusivos, avisos de eventos e novidades
            do Cria Ti na Luz
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Seu melhor e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-white border-2 border-primary/20 focus:border-primary h-12 text-lg px-4"
            />
            <Button
              type="submit"
              size="lg"
              className="bg-primary hover:bg-primary/90 h-12 px-8"
            >
              Inscrever-se
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
