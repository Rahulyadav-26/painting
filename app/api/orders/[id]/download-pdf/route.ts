import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { getOrderById } from "@/lib/orderService";
import { generateProductPdf } from "@/lib/pdfGenerator";
import fs from "fs";
import path from "path";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json(
        { error: "Authentication required to download artwork." },
        { status: 401 }
      );
    }

    const { id: orderId } = await context.params;
    const order = await getOrderById(orderId);

    if (!order) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    // Security check
    if (order.userId !== user.id && user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Access forbidden: You can only download artwork from your own orders." },
        { status: 403 }
      );
    }

    if (order.paymentStatus !== "Verified") {
      return NextResponse.json(
        { error: "Artwork download is only available after payment verification." },
        { status: 403 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const requestedProductId = searchParams.get("productId");

    const item = requestedProductId
      ? order.items.find((i) => i.productId === requestedProductId) || order.items[0]
      : order.items[0];

    if (!item) {
      return NextResponse.json({ error: "No product item found in order." }, { status: 404 });
    }

    // Check if pre-generated file exists on disk
    const savedPath = path.join(
      process.cwd(),
      "public",
      "downloads",
      "orders",
      order.id,
      `${item.title.replace(/[^a-zA-Z0-9_-]/g, "_")}_Order_${order.id}.pdf`
    );

    let pdfBuffer: Buffer;
    let filename: string;

    if (fs.existsSync(savedPath)) {
      pdfBuffer = fs.readFileSync(savedPath);
      filename = path.basename(savedPath);
    } else {
      const generated = await generateProductPdf({
        orderId: order.id,
        orderCreatedAt: order.createdAt,
        customerName: order.userName || user.name || user.email,
        customerEmail: user.email,
        productId: item.productId,
        productTitle: item.title,
        artist: item.artist,
        image: item.image,
        slug: item.slug,
      });
      pdfBuffer = generated.buffer;
      filename = generated.filename;
    }

    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": pdfBuffer.length.toString(),
      },
    });
  } catch (error: any) {
    console.error("GET /api/orders/[id]/download-pdf error:", error);
    return NextResponse.json(
      { error: "Failed to download product PDF.", details: error?.message || String(error), stack: error?.stack },
      { status: 500 }
    );
  }
}
