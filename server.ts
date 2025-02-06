import { createLink, getLink } from "./src/controllers/linkController.ts";

const handler = async (req: Request) => {
  const url = new URL(req.url);
  const path = url.pathname;
  const headers = new Headers({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });

  if (req.method === "OPTIONS") {
    return new Response(null, { headers });
  }
  if (req.method === "GET" && path === "/api") {
    return new Response("Healthy API!");
  }
  if (
    (req.method === "POST" || req.method === "OPTIONS") && path === "/api/links"
  ) {
    return await createLink(req, headers);
  }
  if (req.method === "GET") {
    return await getLink(req);
  }
  return new Response("Method Not Allowed", { status: 405, headers });
};

console.log("Server running on http://localhost:8000");
Deno.serve(handler);
