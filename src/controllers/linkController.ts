import Link from "../models/link.ts";
import { ObjectId } from "@db/mongo";
import { linkCol } from "../../db.ts";
import pswGen from "@rabbit-company/password-generator";

async function createLink(req: Request, headers: Headers): Promise<Response> {
  try {
    const { longUrl, slug }: Link = await req.json();

    const existingSlug = await linkCol.findOne({ slug });
    if (existingSlug) {
      return new Response(JSON.stringify({ error: "Slug must be unique" }), {
        status: 406,
        headers,
      });
    }
    const existingLongUrl = await linkCol.findOne({ longUrl });
    if (existingLongUrl) {
      return new Response(JSON.stringify({ slug: existingLongUrl.slug }), {
        status: 201,
        headers,
      });
    }
    const link: Link = {
      longUrl,
      slug: slug || pswGen.generate(15, true, true, false), // Base64 encode if slug is not provided
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

async function getLinks(): Promise<Response> {
  try {
    const allLinks = await linkCol.find().toArray();
    return new Response(JSON.stringify(allLinks), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
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
    return new Response(JSON.stringify({ error: "Link not found" }), { status: 404 });
  } catch (_error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}


async function updateLink(id: string, req: Request): Promise<Response> {
  try {
    const body = await req.json();
    const result = await linkCol.updateOne(
      { _id: new ObjectId(id) },
      { $set: body },
    );
    if (result.matchedCount === 0) {
      return new Response(JSON.stringify({ error: "Link not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify({ updated: result.modifiedCount }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (_error) {
    return new Response(JSON.stringify({ error: "Bad Request" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}

async function deleteLink(id: string): Promise<Response> {
  try {
    const result = await linkCol.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return new Response(JSON.stringify({ error: "Link not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify({ deleted: result.deletedCount }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (_error) {
    return new Response(JSON.stringify({ error: "Bad Request" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export { createLink, deleteLink, getLink, getLinks, updateLink };
