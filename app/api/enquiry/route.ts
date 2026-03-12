import { NextRequest, NextResponse } from "next/server";
import { enquirySchema } from "@/lib/validation";
import { appendRenderLead } from "@/lib/google-sheets";
import { sendEnquiryNotification } from "@/lib/gmail";
import { isRateLimited } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a few minutes." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const result = enquirySchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = result.data;

    // Reject honeypot submissions silently
    if (data.honeypot) {
      return NextResponse.json({ success: true });
    }

    const timestamp = new Date().toLocaleString("en-GB", {
      timeZone: "Europe/London",
    });

    // Fire and forget — don't let one failure block the other
    const [sheetsResult, emailResult] = await Promise.allSettled([
      appendRenderLead({ ...data, timestamp }),
      sendEnquiryNotification(data),
    ]);

    if (sheetsResult.status === "rejected") {
      console.error("[Enquiry] Google Sheets error:", sheetsResult.reason);
    }
    if (emailResult.status === "rejected") {
      console.error("[Enquiry] Gmail error:", emailResult.reason);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Enquiry] Unexpected error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try calling us instead." },
      { status: 500 }
    );
  }
}
