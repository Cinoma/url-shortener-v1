import {
  createLink,
  deleteLink,
  getLink,
  getLinks,
  updateLink,
} from "./src/controllers/linkController.ts";

const PORT = 3000;

async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const path = url.pathname;
  const id = path.split("/")[3];

  if (req.method === "GET" && path === "/") {
    return new Response("Hello, World!");
  } else if (req.method === "POST" && path === "/api/links") {
    return await createLink(req);
  } else if (req.method === "GET" && path === "/api/links") {
    return await getLinks(req);
  } else if (req.method === "GET" && path === "/api/links/incomplete/count") {
    // Handle GET /api/links/incomplete/count
  } else if (req.method === "GET" && path.startsWith("/api/links/")) {
    return await getLink(id);
  } else if (req.method === "PUT" && path.startsWith("/api/links/")) {
    return await updateLink(id, req);
  } else if (req.method === "DELETE" && path.startsWith("/api/links/")) {
    return await deleteLink(id);
  } else {
    return new Response("Not Found", { status: 404 });
  }
}

console.log(`HTTP webserver running. Access it at: http://localhost:${PORT}/`);
Deno.serve({ port: PORT }, handler);
