import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      message:
        "This form now opens an email addressed to Lisa@seeyesgarden.com.",
    },
    { status: 410 },
  );
}
