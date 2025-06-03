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

export async function POST(req: NextResponse) {
  const res = await req.json();
  const { domain, url, event, source = "none" } = res;
  if (!url.includes(domain))
    return NextResponse.json(
      {
        error:
          "the script points to a different domain than the current url. make sure thy match",
      },
      { headers: corsHeaders }
    );

  if (event === "session_start") {
    const insert = await prisma.visits.create({
      data: {
        website_domain: domain,
        source,
      },
    });
    return NextResponse.json({ insert }, { headers: corsHeaders });
  }

  if (event === "pageview") {
    const insert = await prisma.pageViews.create({
      data: {
        domain,
        page: url,
      },
    });
    return NextResponse.json({ insert }, { headers: corsHeaders });
  }

  return NextResponse.json(
    { message: "error in post request in track api" },
    { headers: corsHeaders }
  );
}
