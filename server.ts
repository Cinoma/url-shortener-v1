import { createLink, getLink } from "./src/controllers/linkController.ts";

import { serve } from "https://deno.land/std@0.217.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.217.0/http/file_server.ts";

const handler = async (req: Request) => {
  const url = new URL(req.url);
  const path = url.pathname;
  console.log(`Handling request for path: ${path}`); // Debug log

  const headers = new Headers({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });

  try {
    // Handle API routes
    if (path.startsWith("/api")) {
      console.log(`Processing API request: ${req.method} ${path}`); // Debug log

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

    // Handle URL redirects
    if (path.length > 1) {
      console.log(`Processing redirect for path: ${path}`); // Debug log
      try {
        const response = await getLink(req);
        console.log(`Redirect response status: ${response.status}`); // Debug log
        return response;
      } catch (error) {
        console.error("Error handling redirect:", error);
        return new Response(JSON.stringify({ error: "Redirect failed", details: error.message }), {
          status: 500,
          headers: { ...headers, "Content-Type": "application/json" }
        });
      }
    }

    // Serve static files from the dist directory
    console.log(`Serving static file for path: ${path}`); // Debug log
    return await serveDir(req, {
      fsRoot: "dist",
      urlRoot: "",
    });
  } catch (error) {
    console.error("Unhandled error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error", details: error.message }), {
      status: 500,
      headers: { ...headers, "Content-Type": "application/json" }
    });
  }
};

// Use the port provided by Deno Deploy or fall back to 8000
const port = parseInt(Deno.env.get("PORT") || "8000");
console.log(`Starting server on port ${port}`);

await serve(handler, { port: 8000 });
