import { useRef, useState } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "./button";

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export function ImageUpload({ value, onChange, label }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Por favor, selecione um arquivo de imagem válido");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("A imagem deve ter no máximo 5MB");
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();

    reader.onload = (event) => {
      const result = event.target?.result as string;
      onChange(result);
      setIsUploading(false);
    };

    reader.onerror = () => {
      alert("Erro ao carregar imagem");
      setIsUploading(false);
    };

    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-3">
      {label && <label className="text-sm font-medium">{label}</label>}

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="flex-shrink-0"
        >
          <Upload className="w-4 h-4 mr-2" />
          {isUploading ? "Carregando..." : "Escolher Imagem"}
        </Button>

        {value && (
          <Button
            type="button"
            variant="outline"
            onClick={handleRemove}
            className="flex-shrink-0"
          >
            <X className="w-4 h-4 mr-2" />
            Remover
          </Button>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {value && (
        <div className="mt-3 relative rounded-lg overflow-hidden border border-border bg-muted">
          <img
            src={value}
            alt="Preview"
            className="max-w-full h-auto max-h-64 object-contain mx-auto"
          />
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        Formatos aceitos: JPG, PNG, GIF, WEBP. Tamanho máximo: 5MB
      </p>
    </div>
  );
}
