import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    revalidatePath("/");
    revalidatePath("/blog");
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (error) {
    return NextResponse.json(
      { revalidated: false, error: "Revalidation failed", details: (error as Error).message },
      { status: 500 },
    );
  }
}
