import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-776d5af1/health", (c) => {
  return c.json({ status: "ok" });
});

// Produtos endpoints
app.get("/make-server-776d5af1/produtos", async (c) => {
  try {
    const data = await kv.get("produtos");
    return c.json(data || []);
  } catch (error) {
    console.log("Error fetching produtos:", error);
    return c.json({ error: error.message }, 500);
  }
});

app.post("/make-server-776d5af1/produtos", async (c) => {
  try {
    const body = await c.req.json();
    const currentData = (await kv.get("produtos")) || [];
    const updated = [...currentData, body];
    await kv.set("produtos", updated);
    return c.json(updated);
  } catch (error) {
    console.log("Error adding produto:", error);
    return c.json({ error: error.message }, 500);
  }
});

app.put("/make-server-776d5af1/produtos/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const currentData = (await kv.get("produtos")) || [];
    const updated = currentData.map((p: any) => (p.id === id ? body : p));
    await kv.set("produtos", updated);
    return c.json(updated);
  } catch (error) {
    console.log("Error updating produto:", error);
    return c.json({ error: error.message }, 500);
  }
});

app.delete("/make-server-776d5af1/produtos/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const currentData = (await kv.get("produtos")) || [];
    const updated = currentData.filter((p: any) => p.id !== id);
    await kv.set("produtos", updated);
    return c.json(updated);
  } catch (error) {
    console.log("Error deleting produto:", error);
    return c.json({ error: error.message }, 500);
  }
});

// Consultas endpoints
app.get("/make-server-776d5af1/consultas", async (c) => {
  try {
    const data = await kv.get("consultas");
    return c.json(data || []);
  } catch (error) {
    console.log("Error fetching consultas:", error);
    return c.json({ error: error.message }, 500);
  }
});

app.post("/make-server-776d5af1/consultas", async (c) => {
  try {
    const body = await c.req.json();
    const currentData = (await kv.get("consultas")) || [];
    const updated = [...currentData, body];
    await kv.set("consultas", updated);
    return c.json(updated);
  } catch (error) {
    console.log("Error adding consulta:", error);
    return c.json({ error: error.message }, 500);
  }
});

app.put("/make-server-776d5af1/consultas/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const currentData = (await kv.get("consultas")) || [];
    const updated = currentData.map((p: any) => (p.id === id ? body : p));
    await kv.set("consultas", updated);
    return c.json(updated);
  } catch (error) {
    console.log("Error updating consulta:", error);
    return c.json({ error: error.message }, 500);
  }
});

app.delete("/make-server-776d5af1/consultas/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const currentData = (await kv.get("consultas")) || [];
    const updated = currentData.filter((p: any) => p.id !== id);
    await kv.set("consultas", updated);
    return c.json(updated);
  } catch (error) {
    console.log("Error deleting consulta:", error);
    return c.json({ error: error.message }, 500);
  }
});

// Eventos endpoints
app.get("/make-server-776d5af1/eventos", async (c) => {
  try {
    const data = await kv.get("eventos");
    return c.json(data || []);
  } catch (error) {
    console.log("Error fetching eventos:", error);
    return c.json({ error: error.message }, 500);
  }
});

app.post("/make-server-776d5af1/eventos", async (c) => {
  try {
    const body = await c.req.json();
    const currentData = (await kv.get("eventos")) || [];
    const updated = [...currentData, body];
    await kv.set("eventos", updated);
    return c.json(updated);
  } catch (error) {
    console.log("Error adding evento:", error);
    return c.json({ error: error.message }, 500);
  }
});

app.put("/make-server-776d5af1/eventos/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const currentData = (await kv.get("eventos")) || [];
    const updated = currentData.map((p: any) => (p.id === id ? body : p));
    await kv.set("eventos", updated);
    return c.json(updated);
  } catch (error) {
    console.log("Error updating evento:", error);
    return c.json({ error: error.message }, 500);
  }
});

app.delete("/make-server-776d5af1/eventos/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const currentData = (await kv.get("eventos")) || [];
    const updated = currentData.filter((p: any) => p.id !== id);
    await kv.set("eventos", updated);
    return c.json(updated);
  } catch (error) {
    console.log("Error deleting evento:", error);
    return c.json({ error: error.message }, 500);
  }
});

// Artigos endpoints
app.get("/make-server-776d5af1/artigos", async (c) => {
  try {
    const data = await kv.get("artigos");
    return c.json(data || []);
  } catch (error) {
    console.log("Error fetching artigos:", error);
    return c.json({ error: error.message }, 500);
  }
});

app.post("/make-server-776d5af1/artigos", async (c) => {
  try {
    const body = await c.req.json();
    const currentData = (await kv.get("artigos")) || [];
    const updated = [...currentData, body];
    await kv.set("artigos", updated);
    return c.json(updated);
  } catch (error) {
    console.log("Error adding artigo:", error);
    return c.json({ error: error.message }, 500);
  }
});

app.put("/make-server-776d5af1/artigos/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const currentData = (await kv.get("artigos")) || [];
    const updated = currentData.map((p: any) => (p.id === id ? body : p));
    await kv.set("artigos", updated);
    return c.json(updated);
  } catch (error) {
    console.log("Error updating artigo:", error);
    return c.json({ error: error.message }, 500);
  }
});

app.delete("/make-server-776d5af1/artigos/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const currentData = (await kv.get("artigos")) || [];
    const updated = currentData.filter((p: any) => p.id !== id);
    await kv.set("artigos", updated);
    return c.json(updated);
  } catch (error) {
    console.log("Error deleting artigo:", error);
    return c.json({ error: error.message }, 500);
  }
});

// Cursos endpoints
app.get("/make-server-776d5af1/cursos", async (c) => {
  try {
    const data = await kv.get("cursos");
    return c.json(data || []);
  } catch (error) {
    console.log("Error fetching cursos:", error);
    return c.json({ error: error.message }, 500);
  }
});

app.post("/make-server-776d5af1/cursos", async (c) => {
  try {
    const body = await c.req.json();
    const currentData = (await kv.get("cursos")) || [];
    const updated = [...currentData, body];
    await kv.set("cursos", updated);
    return c.json(updated);
  } catch (error) {
    console.log("Error adding curso:", error);
    return c.json({ error: error.message }, 500);
  }
});

app.put("/make-server-776d5af1/cursos/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const currentData = (await kv.get("cursos")) || [];
    const updated = currentData.map((p: any) => (p.id === id ? body : p));
    await kv.set("cursos", updated);
    return c.json(updated);
  } catch (error) {
    console.log("Error updating curso:", error);
    return c.json({ error: error.message }, 500);
  }
});

app.delete("/make-server-776d5af1/cursos/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const currentData = (await kv.get("cursos")) || [];
    const updated = currentData.filter((p: any) => p.id !== id);
    await kv.set("cursos", updated);
    return c.json(updated);
  } catch (error) {
    console.log("Error deleting curso:", error);
    return c.json({ error: error.message }, 500);
  }
});

// Ebooks endpoints
app.get("/make-server-776d5af1/ebooks", async (c) => {
  try {
    const data = await kv.get("ebooks");
    return c.json(data || []);
  } catch (error) {
    console.log("Error fetching ebooks:", error);
    return c.json({ error: error.message }, 500);
  }
});

app.post("/make-server-776d5af1/ebooks", async (c) => {
  try {
    const body = await c.req.json();
    const currentData = (await kv.get("ebooks")) || [];
    const updated = [...currentData, body];
    await kv.set("ebooks", updated);
    return c.json(updated);
  } catch (error) {
    console.log("Error adding ebook:", error);
    return c.json({ error: error.message }, 500);
  }
});

app.put("/make-server-776d5af1/ebooks/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const currentData = (await kv.get("ebooks")) || [];
    const updated = currentData.map((p: any) => (p.id === id ? body : p));
    await kv.set("ebooks", updated);
    return c.json(updated);
  } catch (error) {
    console.log("Error updating ebook:", error);
    return c.json({ error: error.message }, 500);
  }
});

app.delete("/make-server-776d5af1/ebooks/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const currentData = (await kv.get("ebooks")) || [];
    const updated = currentData.filter((p: any) => p.id !== id);
    await kv.set("ebooks", updated);
    return c.json(updated);
  } catch (error) {
    console.log("Error deleting ebook:", error);
    return c.json({ error: error.message }, 500);
  }
});

// Banners endpoints
app.get("/make-server-776d5af1/banners", async (c) => {
  try {
    const data = await kv.get("banners");
    return c.json(data || []);
  } catch (error) {
    console.log("Error fetching banners:", error);
    return c.json({ error: error.message }, 500);
  }
});

app.post("/make-server-776d5af1/banners", async (c) => {
  try {
    const body = await c.req.json();
    const currentData = (await kv.get("banners")) || [];
    const updated = [...currentData, body];
    await kv.set("banners", updated);
    return c.json(updated);
  } catch (error) {
    console.log("Error adding banner:", error);
    return c.json({ error: error.message }, 500);
  }
});

app.put("/make-server-776d5af1/banners/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const currentData = (await kv.get("banners")) || [];
    const updated = currentData.map((p: any) => (p.id === id ? body : p));
    await kv.set("banners", updated);
    return c.json(updated);
  } catch (error) {
    console.log("Error updating banner:", error);
    return c.json({ error: error.message }, 500);
  }
});

app.delete("/make-server-776d5af1/banners/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const currentData = (await kv.get("banners")) || [];
    const updated = currentData.filter((p: any) => p.id !== id);
    await kv.set("banners", updated);
    return c.json(updated);
  } catch (error) {
    console.log("Error deleting banner:", error);
    return c.json({ error: error.message }, 500);
  }
});

// SiteData endpoints
app.get("/make-server-776d5af1/sitedata", async (c) => {
  try {
    const data = await kv.get("siteData");
    return c.json(data || null);
  } catch (error) {
    console.log("Error fetching siteData:", error);
    return c.json({ error: error.message }, 500);
  }
});

app.put("/make-server-776d5af1/sitedata", async (c) => {
  try {
    const body = await c.req.json();
    await kv.set("siteData", body);
    return c.json(body);
  } catch (error) {
    console.log("Error updating siteData:", error);
    return c.json({ error: error.message }, 500);
  }
});

Deno.serve(app.fetch);