import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS(request) {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Incoming request body:", body); // ✅ log

    const { domain, url, event, source = "Direct" } = body;

    if (!url.includes(domain)) {
      return NextResponse.json(
        { error: "Domain mismatch" },
        { status: 400, headers: corsHeaders }
      );
    }

    // handle session_start
    if (event === "session_start") {
      const insert = await prisma.visits.create({
        data: {
          website_name: domain,
          website_domain: domain,
          source,
        },
      });
      return NextResponse.json({ insert }, { headers: corsHeaders });
    }

    // handle pageview
    if (event === "pageview") {
      const insert = await prisma.pageViews.create({
        data: {
          website_name: domain,
          domain,
          page: url,
        },
      });
      return NextResponse.json({ insert }, { headers: corsHeaders });
    }

    return NextResponse.json(
      { error: "Unknown event" },
      { status: 400, headers: corsHeaders }
    );
  } catch (err) {
    console.error("🔥 API /track ERROR:", err); // ✅ log the actual error
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500, headers: corsHeaders }
    );
  }
}
