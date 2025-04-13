import { createLink, getLink } from "./src/controllers/linkController.ts";

import { serve } from "https://deno.land/std@0.217.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.217.0/http/file_server.ts";

const handler = async (req: Request) => {
  const url = new URL(req.url);
  const path = url.pathname;
  const headers = new Headers({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });

  // Handle API routes
  if (path.startsWith("/api")) {
    if (req.method === "OPTIONS") {
      return new Response(null, { headers });
    }
    if (req.method === "GET" && path === "/api") {
      return new Response("Healthy API!");
    }
    if (path === "/api/links" && (req.method === "POST" || req.method === "OPTIONS")) {
      return await createLink(req, headers);
    }
    return new Response("Not Found", { status: 404 });
  }

  // Handle URL redirects
  if (path.length > 1) {
    try {
      return await getLink(req);
    } catch (error) {
      console.error("Error handling redirect:", error);
    }
  }

  // Serve static files from the dist directory
  return await serveDir(req, {
    fsRoot: "dist",
    urlRoot: "",
  });
};

await serve(handler, { port: 8000 });

