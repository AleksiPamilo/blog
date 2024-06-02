import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const session = await getServerSession(authOptions);
    const { id } = await req.json();

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!id) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    let apiUrl = `${strapiUrl}/api/users-permissions/follow`;

    const fetchRes = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        followeeId: id,
      }),
    });

    if (fetchRes.status !== 200) {
      const json = await fetchRes.json();
      return new NextResponse(JSON.stringify(json.error), { status: fetchRes.status });
    }

    return new NextResponse("User followed successfully", { status: 200 });
  } catch {
    return new NextResponse("Internal server error", { status: 500 });
  }
}
