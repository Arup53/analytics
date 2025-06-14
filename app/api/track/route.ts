import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { UAParser } from "ua-parser-js";

const countryNames: Record<string, string> = {
  US: "United States",
  CA: "Canada",
  MX: "Mexico",

  // South America
  BR: "Brazil",
  AR: "Argentina",
  CO: "Colombia",
  CL: "Chile",
  PE: "Peru",

  // Europe
  GB: "United Kingdom",
  DE: "Germany",
  FR: "France",
  IT: "Italy",
  ES: "Spain",
  NL: "Netherlands",
  SE: "Sweden",
  NO: "Norway",
  FI: "Finland",
  DK: "Denmark",
  PL: "Poland",
  RU: "Russia",
  TR: "Turkey",
  PT: "Portugal",
  CH: "Switzerland",
  BE: "Belgium",
  AT: "Austria",
  IE: "Ireland",
  CZ: "Czech Republic",
  HU: "Hungary",
  UA: "Ukraine",
  GR: "Greece",

  // Asia
  IN: "India",
  CN: "China",
  JP: "Japan",
  KR: "South Korea",
  SG: "Singapore",
  MY: "Malaysia",
  ID: "Indonesia",
  TH: "Thailand",
  PH: "Philippines",
  VN: "Vietnam",
  SA: "Saudi Arabia",
  AE: "United Arab Emirates",
  IL: "Israel",
  PK: "Pakistan",
  BD: "Bangladesh",

  // Africa
  ZA: "South Africa",
  NG: "Nigeria",
  EG: "Egypt",
  KE: "Kenya",
  MA: "Morocco",
  GH: "Ghana",
  DZ: "Algeria",
  ET: "Ethiopia",

  // Oceania
  AU: "Australia",
  NZ: "New Zealand",
  FJ: "Fiji",

  // Central America & Caribbean
  CU: "Cuba",
  DO: "Dominican Republic",
  JM: "Jamaica",
  PA: "Panama",
  CR: "Costa Rica",
};

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

/**
 * Get country information from various edge providers
 * This mimics how Vercel and other platforms determine visitor location
 */
function getCountryInfo(req: NextRequest): { code: string; name: string } {
  // Check various headers from different CDNs and edge providers
  // Cloudflare
  const cfCountry = req.headers.get("cf-ipcountry");

  // Vercel
  const vercelCountry = req.headers.get("x-vercel-ip-country");

  // Fastly
  const fastlyCountry = req.headers.get("Fastly-Geo-Country");

  // Akamai
  const akamaiCountry = req.headers
    .get("X-Akamai-Edgescape")
    ?.split(",")
    .find((item) => item.trim().startsWith("country_code="))
    ?.split("=")[1];

  // AWS CloudFront
  const cloudfrontCountry = req.headers.get("CloudFront-Viewer-Country");

  // Use the first available country code, or default to "XX" for unknown
  const countryCode =
    cfCountry ||
    vercelCountry ||
    fastlyCountry ||
    akamaiCountry ||
    cloudfrontCountry ||
    "XX";

  // Look up the country name from our mapping, or use a generic name if not found
  const countryName =
    countryNames[countryCode] ||
    (countryCode === "XX" ? "Unknown" : `Country (${countryCode})`);

  return { code: countryCode, name: countryName };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Incoming request body:", body); // ✅ log

    const { domain, url, event, source = "Direct", user_agent } = body;

    const deviceType = user_agent ? getDeviceType(user_agent) : "DESKTOP";

    const osInfo = user_agent ? getOSInfo(user_agent) : { name: "Unknown" };

    // Get country information using our enhanced method
    const { code: countryCode, name: countryName } = getCountryInfo(req);

    console.log(
      "DeviceType=",
      deviceType,
      "OS=",
      osInfo,
      "Country",
      countryName
    );

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

      const update = await prisma.deviceAnalytics.upsert({
        where: {
          website_name: domain,
          deviceType,
        },
        update: { visitor: { increment: 1 } },
        create: {
          website_name: domain,
          deviceType: deviceType,
        },
      });

      return NextResponse.json({ insert, update }, { headers: corsHeaders });
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
