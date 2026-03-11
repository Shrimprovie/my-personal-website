import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (session) {
    // 在实际应用中，这里应该调用 signOut
    // 但为了简化，我们直接重定向
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  return NextResponse.redirect(new URL('/', request.url));
}