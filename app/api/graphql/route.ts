import { NextRequest, NextResponse } from "next/server";
import { handler } from "@/graphql/server";

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}
