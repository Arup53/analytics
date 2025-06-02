import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const allWebsites = await prisma.websites.findMany();

  return NextResponse.json(allWebsites);
}
