import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Consultas } from "./pages/Consultas";
import { Eventos } from "./pages/Eventos";
import { Loja } from "./pages/Loja";
import { Club } from "./pages/Club";
import { DesenvolvimentoEspiritual } from "./pages/DesenvolvimentoEspiritual";
import { Contato } from "./pages/Contato";
import { Cursos } from "./pages/Cursos";
import { PagamentoConsulta } from "./pages/PagamentoConsulta";
import { PagamentoClub } from "./pages/PagamentoClub";
import { PagamentoCurso } from "./pages/PagamentoCurso";
import { AdminLogin } from "./pages/admin/AdminLogin";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminProdutos } from "./pages/admin/AdminProdutos";
import { AdminConsultas } from "./pages/admin/AdminConsultas";
import { AdminCursos } from "./pages/admin/AdminCursos";
import { AdminEbooks } from "./pages/admin/AdminEbooks";
import { AdminEventos } from "./pages/admin/AdminEventos";
import { AdminArtigos } from "./pages/admin/AdminArtigos";
import { AdminConfiguracoes } from "./pages/admin/AdminConfiguracoes";
import { AdminPlanosClub } from "./pages/admin/AdminPlanosClub";
import { AdminBanners } from "./pages/admin/AdminBanners";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "consultas", element: <Consultas /> },
      { path: "eventos", element: <Eventos /> },
      { path: "loja", element: <Loja /> },
      { path: "cursos", element: <Cursos /> },
      { path: "club", element: <Club /> },
      { path: "desenvolvimento-espiritual", element: <DesenvolvimentoEspiritual /> },
      { path: "contato", element: <Contato /> },
      { path: "pagamento-consulta", element: <PagamentoConsulta /> },
      { path: "pagamento-club", element: <PagamentoClub /> },
      { path: "pagamento-curso", element: <PagamentoCurso /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLogin />,
  },
  {
    path: "/admin/dashboard",
    element: <AdminDashboard />,
  },
  {
    path: "/admin/produtos",
    element: <AdminProdutos />,
  },
  {
    path: "/admin/consultas",
    element: <AdminConsultas />,
  },
  {
    path: "/admin/cursos",
    element: <AdminCursos />,
  },
  {
    path: "/admin/ebooks",
    element: <AdminEbooks />,
  },
  {
    path: "/admin/eventos",
    element: <AdminEventos />,
  },
  {
    path: "/admin/artigos",
    element: <AdminArtigos />,
  },
  {
    path: "/admin/configuracoes",
    element: <AdminConfiguracoes />,
  },
  {
    path: "/admin/planos-club",
    element: <AdminPlanosClub />,
  },
  {
    path: "/admin/banners",
    element: <AdminBanners />,
  },
]);
