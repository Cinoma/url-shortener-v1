import Link from "../models/link.ts";
import { linkCol } from "../../db.ts";
import pswGen from "@rabbit-company/password-generator";

function normalizeUrl(url: string): string {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }
  return url;
}

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

async function createLink(req: Request, headers: Headers): Promise<Response> {
  try {
    const { longUrl, slug }: Link = await req.json();

    const normalizedUrl = normalizeUrl(longUrl);
    if (!isValidUrl(normalizedUrl)) {
      return new Response(JSON.stringify({ error: "Invalid URL format" }), {
        status: 400,
        headers,
      });
    }

    const existingSlug = await linkCol.findOne({ slug });
    if (existingSlug) {
      return new Response(JSON.stringify({ error: "Slug must be unique" }), {
        status: 406,
        headers,
      });
    }

    const existingLongUrl = await linkCol.findOne({ longUrl: normalizedUrl });
    if (existingLongUrl) {
      return new Response(JSON.stringify({ slug: existingLongUrl.slug }), {
        status: 201,
        headers,
      });
    }

    const link: Link = {
      longUrl: normalizedUrl,
      slug: slug || pswGen.generate(15, true, true, false),
      createdAt: new Date(),
    };
    await linkCol.insertOne(link);
    return new Response(JSON.stringify({ slug: link.slug }), {
      status: 200,
      headers,
    });
  } catch (_error) {
    return new Response(JSON.stringify({ error: "Bad Request" }), {
      status: 400,
      headers,
    });
  }
}

async function getLink(req: Request): Promise<Response> {
  try {
    const path = new URL(req.url).pathname.split("/").pop();
    const link = await linkCol.findOne({ slug: path });
    if (link) {
      return Response.redirect(link.longUrl);
    }
    return new Response(JSON.stringify({ error: "Link not found" }), {
      status: 404,
    });
  } catch (_error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export { createLink, getLink };
