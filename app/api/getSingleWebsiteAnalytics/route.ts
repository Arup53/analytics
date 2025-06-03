import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const website_name = searchParams.get("website_name");

  if (!website_name) {
    return NextResponse.json(
      { error: "Missing website_name query param" },
      { status: 400 }
    );
  }
  const allWebsites = await prisma.websites.findUnique({
    where: {
      website_name: website_name,
    },
    include: {
      visits: true,
      page_views: true,
    },
  });

  return NextResponse.json(allWebsites);
}
