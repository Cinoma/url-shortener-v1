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

  try {
    // Handle API routes
    if (path.startsWith("/api")) {
      if (req.method === "OPTIONS") {
        return new Response(null, { headers });
      }
      if (req.method === "GET" && path === "/api") {
        return new Response("Healthy API!", { headers });
      }
      if (path === "/api/links" && (req.method === "POST" || req.method === "OPTIONS")) {
        return await createLink(req, headers);
      }
      return new Response("Not Found", { status: 404, headers });
    }

    // Handle static assets first
    if (path.startsWith("/assets/")) {
      return await serveDir(req, {
        fsRoot: "dist",
        urlRoot: "",
        showDirListing: false,
      });
    }

    // Handle URL redirects
    if (path.length > 1) {
      try {
        const response = await getLink(req);
        return response;
      } catch (error) {
        console.error("Error handling redirect:", error);
        return new Response(JSON.stringify({ error: "Redirect failed", details: error.message }), {
          status: 500,
          headers: { ...headers, "Content-Type": "application/json" }
        });
      }
    }

    // Serve index.html for root path and other unmatched routes
    return await serveDir(req, {
      fsRoot: "dist",
      urlRoot: "",
      showDirListing: false,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { ...headers, "Content-Type": "application/json" }
    });
  }
};

const port = parseInt(Deno.env.get("PORT") || "8000");

await serve(handler, { port });

