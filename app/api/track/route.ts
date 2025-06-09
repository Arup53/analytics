import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { UAParser } from "ua-parser-js";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS(request) {
  return NextResponse.json({}, { headers: corsHeaders });
}

function getDeviceType(userAgent: string) {
  const parser = new UAParser(userAgent);
  const device = parser.getDevice();
  const deviceType = device.type?.toLowerCase() || "";

  if (deviceType.includes("mobile")) return "MOBILE";
  if (deviceType.includes("tablet")) return "TABLET";
  return "DESKTOP";
}

function getOSInfo(userAgent: string): { name: string } {
  const parser = new UAParser(userAgent);
  const os = parser.getOS();
  return {
    name: os.name || "Unknown",
  };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Incoming request body:", body); // ✅ log

    const { domain, url, event, source = "Direct", user_agent } = body;

    const deviceType = user_agent ? getDeviceType(user_agent) : "DESKTOP";

    const osInfo = user_agent ? getOSInfo(user_agent) : { name: "Unknown" };

    console.log("DeviceType=", deviceType, "OS=", osInfo);

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
          website_domain: domain,
          source: "direct",
          websites: {
            connect: { website_name: domain }, // Connect to existing website
          },
        },
      });
      return NextResponse.json({ insert }, { headers: corsHeaders });
    }

    if (event === "session_end") {
      return NextResponse.json(
        { message: "sessison ended" },
        { headers: corsHeaders }
      );
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
