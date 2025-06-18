import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { website_name, userId, project_name } = body;
  console.log(userId);
  const createWebsite = await prisma.websites.create({
    data: {
      project_name,
      website_name,
      userId: userId,
    },
  });

  return NextResponse.json(createWebsite);
}
