import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { projectId, publicAnonKey } from "/utils/supabase/info";

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-776d5af1`;

const apiCall = async (endpoint: string, options?: RequestInit) => {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${publicAnonKey}`,
      ...options?.headers,
    },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "API call failed");
  }
  return response.json();
};

interface Produto {
  id: string;
  nome: string;
  preco: string;
  descricao: string;
  image: string;
  destaque: boolean;
  linkPayPal: string;
  linkMercadoPago: string;
  linkWhatsApp: string;
}

interface Consulta {
  id: string;
  nome: string;
  medium: string;
  tipo: string;
  duracao: string;
  preco: string;
  descricao: string;
  image: string;
  linkPayPal: string;
  linkMercadoPago: string;
  linkWhatsApp: string;
}

interface Evento {
  id: string;
  nome: string;
  data: string;
  horario: string;
  local: string;
  valor: string;
  descricao: string;
  vagas: string;
  image: string;
  pais: "brasil" | "portugal";
  linkWhatsApp: string;
}

interface ArtigoBlog {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  content?: string;
}

interface Banner {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  bgImage: string;
  linkPage: string;
}

interface Curso {
  id: string;
  nome: string;
  descricao: string;
  valorAvulso: string;
  planoClub: string;
  valorPlanoClub: string;
  cursosInclusos: string[];
  aoVivo: boolean;
  image: string;
  linkPayPal: string;
  linkMercadoPago: string;
  linkWhatsApp: string;
}

interface Ebook {
  id: string;
  nome: string;
  descricao: string;
  preco: string;
  image: string;
  planoFree?: boolean;
  valorAvulso?: string;
  planosClub?: string[];
  valorPlanoClub?: string;
  linkPayPal: string;
  linkMercadoPago: string;
  linkWhatsApp: string;
}

interface PlanoClub {
  id: string;
  nome: string;
  preco: string;
  linkPayPal: string;
  linkMercadoPago: string;
  linkWhatsApp: string;
}

interface SiteData {
  marciaImage: string;
  marciaBio: string;
  whatsapp: string;
  email: string;
  instagram: string;
  youtube: string;
  tiktok: string;
  pixKey: string;
  whatsappComunidade: string;
  whatsappEventos: string;
  newsletterEmails: string[];
  planosClub: PlanoClub[];
}

interface DataContextType {
  produtos: Produto[];
  consultas: Consulta[];
  eventos: Evento[];
  artigos: ArtigoBlog[];
  cursos: Curso[];
  ebooks: Ebook[];
  banners: Banner[];
  siteData: SiteData;
  addProduto: (produto: Produto) => Promise<void>;
  updateProduto: (id: string, produto: Produto) => Promise<void>;
  deleteProduto: (id: string) => Promise<void>;
  addConsulta: (consulta: Consulta) => Promise<void>;
  updateConsulta: (id: string, consulta: Consulta) => Promise<void>;
  deleteConsulta: (id: string) => Promise<void>;
  addEvento: (evento: Evento) => Promise<void>;
  updateEvento: (id: string, evento: Evento) => Promise<void>;
  deleteEvento: (id: string) => Promise<void>;
  addArtigo: (artigo: ArtigoBlog) => Promise<void>;
  updateArtigo: (id: string, artigo: ArtigoBlog) => Promise<void>;
  deleteArtigo: (id: string) => Promise<void>;
  addCurso: (curso: Curso) => Promise<void>;
  updateCurso: (id: string, curso: Curso) => Promise<void>;
  deleteCurso: (id: string) => Promise<void>;
  addEbook: (ebook: Ebook) => Promise<void>;
  updateEbook: (id: string, ebook: Ebook) => Promise<void>;
  deleteEbook: (id: string) => Promise<void>;
  addBanner: (banner: Banner) => Promise<void>;
  updateBanner: (id: string, banner: Banner) => Promise<void>;
  deleteBanner: (id: string) => Promise<void>;
  updateSiteData: (data: Partial<SiteData>) => Promise<void>;
  addNewsletterEmail: (email: string) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const defaultSiteData: SiteData = {
  marciaImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=600&fit=crop",
  marciaBio: "Sua missão é ajudar pessoas a encontrarem seu caminho e autoconhecimento. Fundadora da Egrégora Cria Ti na Luz. Márcia já inspirou a vida de milhares de alunos.",
  whatsapp: "5512996841668",
  email: "contato@criatinaluz.com",
  instagram: "https://instagram.com",
  youtube: "https://youtube.com",
  tiktok: "https://tiktok.com",
  pixKey: "contato@criatinaluz.com",
  whatsappComunidade: "5512996841668",
  whatsappEventos: "5512996841668",
  newsletterEmails: [],
  planosClub: [
    {
      id: "free",
      nome: "Free",
      preco: "Grátis",
      linkPayPal: "",
      linkMercadoPago: "",
      linkWhatsApp: "https://wa.me/5511999999999",
    },
    {
      id: "clube",
      nome: "Clube",
      preco: "R$ 97",
      linkPayPal: "",
      linkMercadoPago: "",
      linkWhatsApp: "https://wa.me/5511999999999",
    },
    {
      id: "premium",
      nome: "Premium",
      preco: "R$ 297",
      linkPayPal: "",
      linkMercadoPago: "",
      linkWhatsApp: "https://wa.me/5511999999999",
    },
    {
      id: "premium-plus",
      nome: "Premium + Acompanhamento",
      preco: "R$ 497",
      linkPayPal: "",
      linkMercadoPago: "",
      linkWhatsApp: "https://wa.me/5511999999999",
    },
  ],
};

export function DataProvider({ children }: { children: ReactNode }) {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [artigos, setArtigos] = useState<ArtigoBlog[]>([]);
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [ebooks, setEbooks] = useState<Ebook[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [siteData, setSiteData] = useState<SiteData>(defaultSiteData);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [
          produtosData,
          consultasData,
          eventosData,
          artigosData,
          cursosData,
          ebooksData,
          bannersData,
          siteDataData,
        ] = await Promise.all([
          apiCall("/produtos"),
          apiCall("/consultas"),
          apiCall("/eventos"),
          apiCall("/artigos"),
          apiCall("/cursos"),
          apiCall("/ebooks"),
          apiCall("/banners"),
          apiCall("/sitedata"),
        ]);

        setProdutos(produtosData);
        setConsultas(consultasData);
        setEventos(eventosData);
        setArtigos(artigosData);
        setCursos(cursosData);
        setEbooks(ebooksData);
        setBanners(bannersData);
        if (siteDataData) {
          setSiteData({ ...defaultSiteData, ...siteDataData });
        }
      } catch (error) {
        console.error("Error loading data from Supabase:", error);
      }
    };

    loadData();
  }, []);

  const addProduto = async (produto: Produto) => {
    try {
      const updated = await apiCall("/produtos", {
        method: "POST",
        body: JSON.stringify(produto),
      });
      setProdutos(updated);
    } catch (error) {
      console.error("Error adding produto:", error);
    }
  };

  const updateProduto = async (id: string, produto: Produto) => {
    try {
      const updated = await apiCall(`/produtos/${id}`, {
        method: "PUT",
        body: JSON.stringify(produto),
      });
      setProdutos(updated);
    } catch (error) {
      console.error("Error updating produto:", error);
    }
  };

  const deleteProduto = async (id: string) => {
    try {
      const updated = await apiCall(`/produtos/${id}`, {
        method: "DELETE",
      });
      setProdutos(updated);
    } catch (error) {
      console.error("Error deleting produto:", error);
    }
  };

  const addConsulta = async (consulta: Consulta) => {
    try {
      const updated = await apiCall("/consultas", {
        method: "POST",
        body: JSON.stringify(consulta),
      });
      setConsultas(updated);
    } catch (error) {
      console.error("Error adding consulta:", error);
    }
  };

  const updateConsulta = async (id: string, consulta: Consulta) => {
    try {
      const updated = await apiCall(`/consultas/${id}`, {
        method: "PUT",
        body: JSON.stringify(consulta),
      });
      setConsultas(updated);
    } catch (error) {
      console.error("Error updating consulta:", error);
    }
  };

  const deleteConsulta = async (id: string) => {
    try {
      const updated = await apiCall(`/consultas/${id}`, {
        method: "DELETE",
      });
      setConsultas(updated);
    } catch (error) {
      console.error("Error deleting consulta:", error);
    }
  };

  const addEvento = async (evento: Evento) => {
    try {
      const updated = await apiCall("/eventos", {
        method: "POST",
        body: JSON.stringify(evento),
      });
      setEventos(updated);
    } catch (error) {
      console.error("Error adding evento:", error);
    }
  };

  const updateEvento = async (id: string, evento: Evento) => {
    try {
      const updated = await apiCall(`/eventos/${id}`, {
        method: "PUT",
        body: JSON.stringify(evento),
      });
      setEventos(updated);
    } catch (error) {
      console.error("Error updating evento:", error);
    }
  };

  const deleteEvento = async (id: string) => {
    try {
      const updated = await apiCall(`/eventos/${id}`, {
        method: "DELETE",
      });
      setEventos(updated);
    } catch (error) {
      console.error("Error deleting evento:", error);
    }
  };

  const addArtigo = async (artigo: ArtigoBlog) => {
    try {
      const updated = await apiCall("/artigos", {
        method: "POST",
        body: JSON.stringify(artigo),
      });
      setArtigos(updated);
    } catch (error) {
      console.error("Error adding artigo:", error);
    }
  };

  const updateArtigo = async (id: string, artigo: ArtigoBlog) => {
    try {
      const updated = await apiCall(`/artigos/${id}`, {
        method: "PUT",
        body: JSON.stringify(artigo),
      });
      setArtigos(updated);
    } catch (error) {
      console.error("Error updating artigo:", error);
    }
  };

  const deleteArtigo = async (id: string) => {
    try {
      const updated = await apiCall(`/artigos/${id}`, {
        method: "DELETE",
      });
      setArtigos(updated);
    } catch (error) {
      console.error("Error deleting artigo:", error);
    }
  };

  const addCurso = async (curso: Curso) => {
    try {
      const updated = await apiCall("/cursos", {
        method: "POST",
        body: JSON.stringify(curso),
      });
      setCursos(updated);
    } catch (error) {
      console.error("Error adding curso:", error);
    }
  };

  const updateCurso = async (id: string, curso: Curso) => {
    try {
      const updated = await apiCall(`/cursos/${id}`, {
        method: "PUT",
        body: JSON.stringify(curso),
      });
      setCursos(updated);
    } catch (error) {
      console.error("Error updating curso:", error);
    }
  };

  const deleteCurso = async (id: string) => {
    try {
      const updated = await apiCall(`/cursos/${id}`, {
        method: "DELETE",
      });
      setCursos(updated);
    } catch (error) {
      console.error("Error deleting curso:", error);
    }
  };

  const addEbook = async (ebook: Ebook) => {
    try {
      const updated = await apiCall("/ebooks", {
        method: "POST",
        body: JSON.stringify(ebook),
      });
      setEbooks(updated);
    } catch (error) {
      console.error("Error adding ebook:", error);
    }
  };

  const updateEbook = async (id: string, ebook: Ebook) => {
    try {
      const updated = await apiCall(`/ebooks/${id}`, {
        method: "PUT",
        body: JSON.stringify(ebook),
      });
      setEbooks(updated);
    } catch (error) {
      console.error("Error updating ebook:", error);
    }
  };

  const deleteEbook = async (id: string) => {
    try {
      const updated = await apiCall(`/ebooks/${id}`, {
        method: "DELETE",
      });
      setEbooks(updated);
    } catch (error) {
      console.error("Error deleting ebook:", error);
    }
  };

  const updateSiteData = async (data: Partial<SiteData>) => {
    try {
      const updated = { ...siteData, ...data };
      await apiCall("/sitedata", {
        method: "PUT",
        body: JSON.stringify(updated),
      });
      setSiteData(updated);
    } catch (error) {
      console.error("Error updating siteData:", error);
    }
  };

  const addNewsletterEmail = async (email: string) => {
    try {
      const updated = {
        ...siteData,
        newsletterEmails: [...siteData.newsletterEmails, email],
      };
      await apiCall("/sitedata", {
        method: "PUT",
        body: JSON.stringify(updated),
      });
      setSiteData(updated);
    } catch (error) {
      console.error("Error adding newsletter email:", error);
    }
  };

  const addBanner = async (banner: Banner) => {
    try {
      const updated = await apiCall("/banners", {
        method: "POST",
        body: JSON.stringify(banner),
      });
      setBanners(updated);
    } catch (error) {
      console.error("Error adding banner:", error);
    }
  };

  const updateBanner = async (id: string, banner: Banner) => {
    try {
      const updated = await apiCall(`/banners/${id}`, {
        method: "PUT",
        body: JSON.stringify(banner),
      });
      setBanners(updated);
    } catch (error) {
      console.error("Error updating banner:", error);
    }
  };

  const deleteBanner = async (id: string) => {
    try {
      const updated = await apiCall(`/banners/${id}`, {
        method: "DELETE",
      });
      setBanners(updated);
    } catch (error) {
      console.error("Error deleting banner:", error);
    }
  };

  return (
    <DataContext.Provider
      value={{
        produtos,
        consultas,
        eventos,
        artigos,
        cursos,
        ebooks,
        banners,
        siteData,
        addProduto,
        updateProduto,
        deleteProduto,
        addConsulta,
        updateConsulta,
        deleteConsulta,
        addEvento,
        updateEvento,
        deleteEvento,
        addArtigo,
        updateArtigo,
        deleteArtigo,
        addCurso,
        updateCurso,
        deleteCurso,
        addEbook,
        updateEbook,
        deleteEbook,
        addBanner,
        updateBanner,
        deleteBanner,
        updateSiteData,
        addNewsletterEmail,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within DataProvider");
  }
  return context;
}
