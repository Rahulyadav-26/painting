import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "fs";
import path from "path";
import { products } from "@/data/products";

export interface GeneratePdfOptions {
  orderId: string;
  orderCreatedAt?: string;
  customerName: string;
  customerEmail: string;
  productId: string;
  productTitle: string;
  artist?: string;
  medium?: string;
  image?: string;
  slug?: string;
}

export interface GeneratedPdfResult {
  filename: string;
  buffer: Buffer;
  title: string;
  productId: string;
}

/**
 * Resolves local image file path from public folder
 */
function resolveLocalImagePath(rawPath?: string, slug?: string): string | null {
  if (!rawPath) return null;

  // Clean query params or hashes
  const cleanPath = rawPath.split("?")[0];

  // Try exact path in public/
  if (cleanPath.startsWith("/")) {
    const fullPath = path.join(process.cwd(), "public", cleanPath.slice(1));
    if (fs.existsSync(fullPath)) return fullPath;
  } else {
    const fullPath = path.join(process.cwd(), "public", cleanPath);
    if (fs.existsSync(fullPath)) return fullPath;
  }

  // Fallback to product images directory
  const filename = path.basename(cleanPath);
  const candidate = path.join(process.cwd(), "public", "images", "products", filename);
  if (fs.existsSync(candidate)) return candidate;

  // Fallback based on slug
  if (slug) {
    const catalogProduct = products.find((p) => p.slug === slug);
    if (catalogProduct && catalogProduct.images.length > 0) {
      for (const img of catalogProduct.images) {
        const cPath = path.join(process.cwd(), "public", img.startsWith("/") ? img.slice(1) : img);
        if (fs.existsSync(cPath)) return cPath;
      }
    }
  }

  // Generic fallback: first available product image in public/images/products
  const defaultFallback = path.join(
    process.cwd(),
    "public",
    "images",
    "products",
    "autumn-daily-planner-original.jpg"
  );
  if (fs.existsSync(defaultFallback)) return defaultFallback;

  return null;
}

/**
 * Creates a sanitized, safe filename for attachments
 */
export function sanitizePdfFileName(title: string, orderId: string): string {
  const cleanTitle = title
    .replace(/[^a-zA-Z0-9_-]/g, "_")
    .replace(/_+/g, "_")
    .slice(0, 40);
  return `${cleanTitle}_Order_${orderId}.pdf`;
}

/**
 * Generates an archival, collector-grade PDF containing:
 * Page 1: Official Certificate of Digital Provenance & License
 * Page 2: High-Resolution Printable Product Artwork (A4 300-DPI ready)
 */
export async function generateProductPdf(
  options: GeneratePdfOptions
): Promise<GeneratedPdfResult> {
  const doc = await PDFDocument.create();

  // Load standard fonts
  const fontTitle = await doc.embedFont(StandardFonts.HelveticaBold);
  const fontBody = await doc.embedFont(StandardFonts.Helvetica);
  const fontSerif = await doc.embedFont(StandardFonts.TimesRoman);
  const fontSerifBold = await doc.embedFont(StandardFonts.TimesRomanBold);

  // Brand Palette
  const colorRoseGold = rgb(0.85, 0.35, 0.52); // #D95985
  const colorDeepText = rgb(0.17, 0.14, 0.16); // #2B2329
  const colorMuted = rgb(0.45, 0.42, 0.44); // #736B70
  const colorBorder = rgb(0.88, 0.76, 0.65); // Warm Gold / Sand
  const colorLightBg = rgb(0.99, 0.98, 0.96); // Warm Ivory

  // A4 Dimensions (Points: 72 points per inch)
  const pageWidth = 595.28;
  const pageHeight = 841.89;

  // ─────────────────────────────────────────────────────────
  // PAGE 1: CERTIFICATE OF DIGITAL PROVENANCE & COLLECTOR LICENSE
  // ─────────────────────────────────────────────────────────
  const certPage = doc.addPage([pageWidth, pageHeight]);

  // Background tint
  certPage.drawRectangle({
    x: 0,
    y: 0,
    width: pageWidth,
    height: pageHeight,
    color: colorLightBg,
  });

  // Outer Decorative Double Border
  certPage.drawRectangle({
    x: 24,
    y: 24,
    width: pageWidth - 48,
    height: pageHeight - 48,
    borderColor: colorBorder,
    borderWidth: 2,
  });

  certPage.drawRectangle({
    x: 30,
    y: 30,
    width: pageWidth - 60,
    height: pageHeight - 60,
    borderColor: colorRoseGold,
    borderWidth: 0.75,
  });

  // Corner Accents (Decorative plus symbols)
  const drawCorner = (x: number, y: number) => {
    certPage.drawLine({
      start: { x: x - 6, y },
      end: { x: x + 6, y },
      thickness: 1,
      color: colorRoseGold,
    });
    certPage.drawLine({
      start: { x, y: y - 6 },
      end: { x, y: y + 6 },
      thickness: 1,
      color: colorRoseGold,
    });
  };
  drawCorner(36, pageHeight - 36);
  drawCorner(pageWidth - 36, pageHeight - 36);
  drawCorner(36, 36);
  drawCorner(pageWidth - 36, 36);

  let currentY = pageHeight - 75;

  // Atelier Brand Header
  const brandTitle = "M I N T E D   W H I M S Y   A T E L I E R";
  const brandWidth = fontTitle.widthOfTextAtSize(brandTitle, 13);
  certPage.drawText(brandTitle, {
    x: (pageWidth - brandWidth) / 2,
    y: currentY,
    size: 13,
    font: fontTitle,
    color: colorRoseGold,
  });

  currentY -= 20;

  const headerSub = "FINE ART & DIGITAL ARCHIVES | AUTHENTIC COLLECTOR EDITION";
  const headerSubWidth = fontBody.widthOfTextAtSize(headerSub, 8);
  certPage.drawText(headerSub, {
    x: (pageWidth - headerSubWidth) / 2,
    y: currentY,
    size: 8,
    font: fontBody,
    color: colorMuted,
  });

  currentY -= 25;

  // Horizontal divider
  certPage.drawLine({
    start: { x: 70, y: currentY },
    end: { x: pageWidth - 70, y: currentY },
    thickness: 1,
    color: colorBorder,
  });

  currentY -= 40;

  // Main Certificate Title
  const certHeading = "CERTIFICATE OF DIGITAL AUTHENTICITY";
  const certHeadingWidth = fontSerifBold.widthOfTextAtSize(certHeading, 18);
  certPage.drawText(certHeading, {
    x: (pageWidth - certHeadingWidth) / 2,
    y: currentY,
    size: 18,
    font: fontSerifBold,
    color: colorDeepText,
  });

  currentY -= 18;

  const certSubheading = "OFFICIAL WATERMARK-FREE ARCHIVAL MASTER DELIVERY";
  const certSubWidth = fontTitle.widthOfTextAtSize(certSubheading, 9);
  certPage.drawText(certSubheading, {
    x: (pageWidth - certSubWidth) / 2,
    y: currentY,
    size: 9,
    font: fontTitle,
    color: colorRoseGold,
  });

  currentY -= 35;

  const pIntro =
    "This certificate confirms that the digital art / printable asset specified below has been authenticated, licensed, and registered to the authorized collector:";
  certPage.drawText(pIntro, {
    x: 65,
    y: currentY,
    size: 9.5,
    font: fontSerif,
    color: colorMuted,
    maxWidth: pageWidth - 130,
    lineHeight: 14,
  });

  currentY -= 40;

  // Collector & Product Info Box
  certPage.drawRectangle({
    x: 60,
    y: currentY - 180,
    width: pageWidth - 120,
    height: 195,
    color: rgb(1, 1, 1),
    borderColor: colorBorder,
    borderWidth: 0.8,
  });

  const drawRow = (label: string, value: string, yPos: number, isHighlighted = false) => {
    certPage.drawText(label.toUpperCase(), {
      x: 78,
      y: yPos,
      size: 8.5,
      font: fontTitle,
      color: colorRoseGold,
    });
    certPage.drawText(value, {
      x: 210,
      y: yPos,
      size: isHighlighted ? 10.5 : 9.5,
      font: isHighlighted ? fontTitle : fontBody,
      color: colorDeepText,
      maxWidth: 300,
    });
    // light line under row
    certPage.drawLine({
      start: { x: 75, y: yPos - 6 },
      end: { x: pageWidth - 75, y: yPos - 6 },
      thickness: 0.4,
      color: rgb(0.92, 0.9, 0.88),
    });
  };

  let rowY = currentY - 18;
  drawRow("Artwork Title:", options.productTitle, rowY, true);
  rowY -= 26;
  drawRow("Original Artist:", options.artist || "Minted Whimsy Atelier", rowY);
  rowY -= 26;
  drawRow("Authorized Collector:", options.customerName || "Valued Collector", rowY);
  rowY -= 26;
  drawRow("Registered Login Email:", options.customerEmail, rowY, true);
  rowY -= 26;
  drawRow("Order Identifier:", `#${options.orderId}`, rowY);
  rowY -= 26;
  drawRow(
    "Certificate Edition:",
    `MW-ARCHIVE-${options.orderId.replace(/[^0-9]/g, "") || "8821"}-${options.productId || "1"}`,
    rowY
  );
  rowY -= 26;
  const issueDate = options.orderCreatedAt
    ? new Date(options.orderCreatedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
  drawRow("Date of Acquisition:", issueDate, rowY);

  currentY -= 230;

  // Legal & Usage Rights Box
  certPage.drawRectangle({
    x: 60,
    y: currentY - 95,
    width: pageWidth - 120,
    height: 105,
    color: rgb(0.98, 0.95, 0.96),
    borderColor: rgb(0.95, 0.82, 0.88),
    borderWidth: 0.75,
  });

  certPage.drawText("COLLECTOR USAGE LICENSE & RIGHTS", {
    x: 75,
    y: currentY - 12,
    size: 8.5,
    font: fontTitle,
    color: colorRoseGold,
  });

  const licenseText =
    "- Personal Use Grant: Unlimited home printing, journal display, & digital tablet annotation (GoodNotes, Notability, Procreate).\n" +
    "- Watermark-Free Guarantee: The accompanying high-resolution artwork page is delivered completely unblemished and ready for framing.\n" +
    "- Archival Preservation: Keep this authenticated document as permanent digital proof of your acquisition from Minted Whimsy Atelier.";

  certPage.drawText(licenseText, {
    x: 75,
    y: currentY - 30,
    size: 8.5,
    font: fontBody,
    color: colorDeepText,
    lineHeight: 14,
    maxWidth: pageWidth - 150,
  });

  currentY -= 135;

  // Atelier Seal & Signature
  certPage.drawLine({
    start: { x: 75, y: currentY },
    end: { x: 230, y: currentY },
    thickness: 1,
    color: colorDeepText,
  });

  certPage.drawText("Deepesh Sharma", {
    x: 75,
    y: currentY + 6,
    size: 13,
    font: fontSerifBold,
    color: colorRoseGold,
  });

  certPage.drawText("Principal Curator & Founder\nMinted Whimsy Atelier", {
    x: 75,
    y: currentY - 14,
    size: 8,
    font: fontBody,
    color: colorMuted,
    lineHeight: 11,
  });

  // Right Seal Badge
  certPage.drawRectangle({
    x: pageWidth - 235,
    y: currentY - 20,
    width: 160,
    height: 48,
    borderColor: colorBorder,
    borderWidth: 1,
    color: rgb(1, 1, 1),
  });

  certPage.drawText("* MINTED WHIMSY *", {
    x: pageWidth - 222,
    y: currentY + 14,
    size: 8.5,
    font: fontTitle,
    color: colorRoseGold,
  });

  certPage.drawText("DIGITALLY VERIFIED EDITION", {
    x: pageWidth - 227,
    y: currentY - 2,
    size: 7.5,
    font: fontTitle,
    color: colorDeepText,
  });

  certPage.drawText("Atelier Registry | Certified", {
    x: pageWidth - 215,
    y: currentY - 14,
    size: 7,
    font: fontBody,
    color: colorMuted,
  });

  // Footer page label
  certPage.drawText("Page 1 of 2 - Certificate of Authenticity (Keep for your records)", {
    x: (pageWidth - 260) / 2,
    y: 42,
    size: 7.5,
    font: fontBody,
    color: colorMuted,
  });

  // ─────────────────────────────────────────────────────────
  // PAGE 2: HIGH-RESOLUTION PRINTABLE PRODUCT CANVAS
  // ─────────────────────────────────────────────────────────
  const artPage = doc.addPage([pageWidth, pageHeight]);

  // Clean white printable background
  artPage.drawRectangle({
    x: 0,
    y: 0,
    width: pageWidth,
    height: pageHeight,
    color: rgb(1, 1, 1),
  });

  // Subtle header on art page
  artPage.drawText(`MINTED WHIMSY ATELIER | ${options.productTitle.toUpperCase()}`, {
    x: 36,
    y: pageHeight - 32,
    size: 8,
    font: fontTitle,
    color: colorMuted,
  });

  artPage.drawText(`COLLECTOR EDITION #${options.orderId}`, {
    x: pageWidth - 180,
    y: pageHeight - 32,
    size: 8,
    font: fontTitle,
    color: colorRoseGold,
  });

  // Load and embed product image
  const imagePath = resolveLocalImagePath(options.image, options.slug);

  if (imagePath && fs.existsSync(imagePath)) {
    try {
      const imgBytes = fs.readFileSync(imagePath);
      const isPng = imagePath.toLowerCase().endsWith(".png");
      const embeddedImg = isPng ? await doc.embedPng(imgBytes) : await doc.embedJpg(imgBytes);

      const marginX = 36;
      const marginY = 48;
      const maxCanvasW = pageWidth - marginX * 2;
      const maxCanvasH = pageHeight - marginY * 2 - 20;

      // Fit to dimensions while preserving aspect ratio
      const imgDims = embeddedImg.scaleToFit(maxCanvasW, maxCanvasH);

      const drawX = marginX + (maxCanvasW - imgDims.width) / 2;
      const drawY = marginY + (maxCanvasH - imgDims.height) / 2;

      // Draw high-resolution artwork
      artPage.drawImage(embeddedImg, {
        x: drawX,
        y: drawY,
        width: imgDims.width,
        height: imgDims.height,
      });

      // Subtle framing border around printable area
      artPage.drawRectangle({
        x: drawX - 1,
        y: drawY - 1,
        width: imgDims.width + 2,
        height: imgDims.height + 2,
        borderColor: rgb(0.9, 0.9, 0.9),
        borderWidth: 0.5,
      });
    } catch (err) {
      console.error("Error embedding product image in PDF:", err);
      // Fallback text if image embedding fails
      artPage.drawText("Printable Artwork Master", {
        x: 180,
        y: 400,
        size: 18,
        font: fontTitle,
        color: colorDeepText,
      });
    }
  }

  // Footer on art page
  artPage.drawText(
    `High-Resolution 300 DPI Archival Edition | Watermark Free | Licensed exclusively to ${options.customerEmail}`,
    {
      x: 36,
      y: 22,
      size: 7.5,
      font: fontBody,
      color: colorMuted,
    }
  );

  const pdfBytes = await doc.save();
  const buffer = Buffer.from(pdfBytes);
  const filename = sanitizePdfFileName(options.productTitle, options.orderId);

  return {
    filename,
    buffer,
    title: options.productTitle,
    productId: options.productId,
  };
}

/**
 * Generates all PDFs for all items in an order
 */
export async function generateOrderPdfs(order: {
  id: string;
  userEmail: string;
  userName: string;
  createdAt?: string;
  items: Array<{
    productId: string;
    title: string;
    artist?: string;
    image?: string;
    slug?: string;
  }>;
}): Promise<GeneratedPdfResult[]> {
  const results: GeneratedPdfResult[] = [];

  for (const item of order.items) {
    const pdf = await generateProductPdf({
      orderId: order.id,
      orderCreatedAt: order.createdAt,
      customerName: order.userName || order.userEmail,
      customerEmail: order.userEmail,
      productId: item.productId,
      productTitle: item.title,
      artist: item.artist,
      image: item.image,
      slug: item.slug,
    });
    results.push(pdf);
  }

  return results;
}
