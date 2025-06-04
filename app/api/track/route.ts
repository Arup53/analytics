import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: Request) {
  const res = await req.json();
  const { domain, url, event, source = "Direct" } = res;

  if (!url.includes(domain)) {
    return NextResponse.json(
      {
        error:
          "The script points to a different domain than the current URL. Make sure they match.",
      },
      { headers: corsHeaders }
    );
  }

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
    { message: "Error in POST request in track API" },
    { headers: corsHeaders }
  );
}
