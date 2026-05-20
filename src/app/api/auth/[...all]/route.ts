import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest, NextResponse } from "next/server";

const handler = toNextJsHandler(auth);

const allowedOrigins = [
  "https://saarthidesk.vercel.app",
  "https://www.saarthidesk.com",
  "https://saarthidesk.com",
  "http://localhost:3000"
];

function getCorsHeaders(req: NextRequest) {
  const origin = req.headers.get("origin") || "";
  const isAllowed = allowedOrigins.includes(origin) || origin.endsWith(".vercel.app") || origin.startsWith("http://localhost:");
  
  return {
    "Access-Control-Allow-Origin": isAllowed ? origin : allowedOrigins[0],
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE, PATCH",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, better-auth-token, better-auth-accept-language, x-requested-with",
    "Access-Control-Allow-Credentials": "true",
  };
}

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, {
    status: 204,
    headers: getCorsHeaders(req),
  });
}

export async function GET(req: NextRequest) {
  const res = await handler.GET(req);
  if (res) {
    const headers = getCorsHeaders(req);
    Object.entries(headers).forEach(([key, val]) => {
      res.headers.set(key, val);
    });
  }
  return res;
}

export async function POST(req: NextRequest) {
  const res = await handler.POST(req);
  if (res) {
    const headers = getCorsHeaders(req);
    Object.entries(headers).forEach(([key, val]) => {
      res.headers.set(key, val);
    });
  }
  return res;
}
