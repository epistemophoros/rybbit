import { NextRequest, NextResponse } from "next/server";

const BACKEND =
  process.env.BACKEND_INTERNAL_URL ||
  (process.env.NODE_ENV === "production" ? "http://backend:3001" : null);

export async function GET(request: NextRequest, { params }: { params: Promise<{ path?: string[] }> }) {
  return proxy(request, await params);
}
export async function POST(request: NextRequest, { params }: { params: Promise<{ path?: string[] }> }) {
  return proxy(request, await params);
}
export async function PUT(request: NextRequest, { params }: { params: Promise<{ path?: string[] }> }) {
  return proxy(request, await params);
}
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ path?: string[] }> }) {
  return proxy(request, await params);
}
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ path?: string[] }> }) {
  return proxy(request, await params);
}
export async function HEAD(request: NextRequest, { params }: { params: Promise<{ path?: string[] }> }) {
  return proxy(request, await params);
}
export async function OPTIONS(request: NextRequest, { params }: { params: Promise<{ path?: string[] }> }) {
  return proxy(request, await params);
}

async function proxy(request: NextRequest, { path }: { path?: string[] }) {
  if (!BACKEND) {
    return NextResponse.json({ error: "API proxy not configured" }, { status: 502 });
  }
  const pathStr = path?.length ? path.join("/") : "";
  const url = new URL(`/api/${pathStr}`, BACKEND);
  request.nextUrl.searchParams.forEach((v, k) => url.searchParams.set(k, v));
  const headers = new Headers(request.headers);
  headers.delete("host");
  const res = await fetch(url.toString(), {
    method: request.method,
    headers,
    body: request.body,
    duplex: "half",
  });
  const resHeaders = new Headers(res.headers);
  resHeaders.delete("content-encoding");
  return new NextResponse(res.body, {
    status: res.status,
    statusText: res.statusText,
    headers: resHeaders,
  });
}
