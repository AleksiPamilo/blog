import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const session = await getServerSession(authOptions);
    const id = req.nextUrl.searchParams.get("id");

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!id) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    const fetchRes = await fetch(
      `${strapiUrl}/api/users-permissions/follow-status/${id}`,
      { headers: { Authorization: `Bearer ${session.jwt}` } }
    );
    const json = await fetchRes.json();

    if (fetchRes.status !== 200) {
      return new NextResponse(fetchRes.statusText, { status: fetchRes.status });
    }

    return new NextResponse(
      JSON.stringify({
        isFollowing: json.isFollowing,
      }),
      { status: 200 }
    );
  } catch {
    return new NextResponse("Internal server error", { status: 500 });
  }
}
