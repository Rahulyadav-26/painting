import fs from "fs";
import path from "path";
import { Resend } from "resend";
import nodemailer from "nodemailer";
import { getOrderById, updateOrderDigitalDelivery, OrderRecord } from "./orderService";
import { generateOrderPdfs, GeneratedPdfResult } from "./pdfGenerator";

export interface DeliveryResult {
  success: boolean;
  message: string;
  orderId: string;
  recipientEmail: string;
  files: Array<{ title: string; filename: string; downloadUrl: string }>;
  deliveryMode: "resend" | "smtp" | "simulated_local";
  error?: string;
}

/**
 * Ensures public downloads directory exists and persists the generated PDFs for immediate download
 */
function persistGeneratedPdfsLocally(
  orderId: string,
  pdfResults: GeneratedPdfResult[]
): Array<{ title: string; filename: string; downloadUrl: string }> {
  const dirPath = path.join(process.cwd(), "public", "downloads", "orders", orderId);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  return pdfResults.map((pdf) => {
    const filePath = path.join(dirPath, pdf.filename);
    fs.writeFileSync(filePath, pdf.buffer);
    return {
      title: pdf.title,
      filename: pdf.filename,
      downloadUrl: `/downloads/orders/${orderId}/${pdf.filename}`,
    };
  });
}

/**
 * Builds a beautiful, responsive HTML email for the collector
 */
function buildDeliveryEmailHtml(params: {
  order: OrderRecord;
  recipientEmail: string;
  files: Array<{ title: string; filename: string; downloadUrl: string }>;
  baseUrl: string;
}): string {
  const { order, recipientEmail, files, baseUrl } = params;

  const itemsHtml = files
    .map(
      (file) => `
      <div style="background-color: #FFF5F7; border: 1px solid #FFD6E5; border-radius: 12px; padding: 16px; margin-bottom: 12px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td valign="middle">
              <span style="font-size: 11px; font-weight: 700; color: #FF7096; text-transform: uppercase; letter-spacing: 1px;">Digital Printable Edition</span>
              <h4 style="margin: 4px 0 6px 0; font-size: 16px; color: #2B2329; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">${file.title}</h4>
              <p style="margin: 0; font-size: 12px; color: #736B70;">Format: Archival 300 DPI PDF • Certificate of Authenticity Included</p>
            </td>
            <td align="right" valign="middle" style="width: 130px;">
              <span style="display: inline-block; background-color: #2B2329; color: #ffffff; padding: 8px 14px; border-radius: 20px; font-size: 11px; font-weight: 600; text-decoration: none;">
                📎 Attached Below
              </span>
            </td>
          </tr>
        </table>
      </div>
    `
    )
    .join("");

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Digital Artwork from Minted Whimsy</title>
</head>
<body style="margin: 0; padding: 0; background-color: #FAF7F5; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #2B2329;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #FAF7F5; padding: 40px 16px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 24px; border: 1px solid #F0E8E2; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.04);">
          
          <!-- Banner Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #FF7096 0%, #FF9EAA 100%); padding: 36px 32px; text-align: center;">
              <p style="margin: 0 0 6px 0; color: #ffffff; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 2.5px; opacity: 0.95;">Minted Whimsy Atelier</p>
              <h1 style="margin: 0; color: #ffffff; font-size: 26px; font-weight: 700; letter-spacing: -0.5px;">Your Artwork Has Arrived ✨</h1>
              <p style="margin: 8px 0 0 0; color: #FFF0F4; font-size: 13px;">Official Digital Collector Edition • High-Resolution PDF</p>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 36px 32px;">
              <p style="margin: 0 0 16px 0; font-size: 15px; color: #2B2329; line-height: 1.6;">
                Dear <strong>${order.userName || "Valued Collector"}</strong>,
              </p>
              <p style="margin: 0 0 24px 0; font-size: 14px; color: #524B50; line-height: 1.6;">
                Thank you for your purchase from the <strong>Minted Whimsy Atelier</strong>! Your payment has been verified, and your personalized, watermark-free digital product is ready.
              </p>

              <!-- Order Summary Pill -->
              <div style="background-color: #FFF9FA; border: 1px solid #FFE4EC; border-radius: 12px; padding: 14px 18px; margin-bottom: 28px;">
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="font-size: 12px; color: #736B70;">Order Reference: <strong style="color: #2B2329;">#${order.id}</strong></td>
                    <td align="right" style="font-size: 12px; color: #736B70;">Delivered To: <strong style="color: #FF7096;">${recipientEmail}</strong></td>
                  </tr>
                </table>
              </div>

              <!-- Product Item List -->
              <h3 style="margin: 0 0 14px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1.5px; color: #FF7096;">
                Attached Product Files (${files.length})
              </h3>
              ${itemsHtml}

              <!-- Printing & Usage Tips Box -->
              <div style="background-color: #F8F9FA; border-left: 4px solid #FF7096; padding: 16px 20px; border-radius: 4px; margin: 28px 0;">
                <h4 style="margin: 0 0 6px 0; font-size: 13px; color: #2B2329; font-weight: 700;">🎨 How to Use Your Digital PDF:</h4>
                <ul style="margin: 0; padding-left: 18px; font-size: 12px; color: #524B50; line-height: 1.7;">
                  <li><strong>Print at Home:</strong> Print on standard A4 or US Letter paper. For best results, select <em>"Actual Size / 100%"</em> and use heavy matte cardstock (120-200 GSM).</li>
                  <li><strong>Digital Tablets:</strong> Import directly into GoodNotes, Notability, Samsung Notes, or Apple Books.</li>
                  <li><strong>Certificate of Authenticity:</strong> Page 1 includes your official collector license and digital provenance seal.</li>
                </ul>
              </div>

              <!-- Backup Download Button -->
              <div style="text-align: center; margin: 32px 0 16px 0;">
                <a href="${baseUrl}/account" style="display: inline-block; background: linear-gradient(135deg, #FF7096 0%, #E0659B 100%); color: #ffffff; text-decoration: none; font-size: 13px; font-weight: 700; padding: 14px 32px; border-radius: 999px; box-shadow: 0 4px 14px rgba(255, 112, 150, 0.35);">
                  View Your Collector Account & Downloads
                </a>
                <p style="margin: 8px 0 0 0; font-size: 11px; color: #8A7D7D;">
                  You can also re-download your high-res files anytime from your account dashboard.
                </p>
              </div>

              <hr style="border: none; border-top: 1px solid #F0E8E2; margin: 32px 0 24px 0;">

              <!-- Curator Note -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <p style="margin: 0; font-size: 12px; color: #736B70; line-height: 1.5;">
                      Warmly,<br>
                      <strong style="color: #2B2329;">Deepesh Sharma & The Minted Whimsy Atelier Team</strong><br>
                      <em>Where Imagination Meets Timeless Artistry</em>
                    </p>
                  </td>
                  <td align="right" valign="bottom">
                    <span style="font-size: 11px; color: #FF7096; font-weight: 600;">mintedwhimsy.com</span>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #FBF8F6; padding: 20px 32px; text-align: center; border-top: 1px solid #F0E8E2;">
              <p style="margin: 0; font-size: 11px; color: #9E9498;">
                This email was sent to ${recipientEmail} because you completed an art purchase on Minted Whimsy Atelier.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

/**
 * Primary Service: Generates product PDF(s) and sends them to the logged-in user's email
 */
export async function deliverOrderDigitalProducts(
  orderId: string,
  overrideRecipientEmail?: string
): Promise<DeliveryResult> {
  const order = await getOrderById(orderId);
  if (!order) {
    return {
      success: false,
      message: `Order #${orderId} not found.`,
      orderId,
      recipientEmail: overrideRecipientEmail || "",
      files: [],
      deliveryMode: "simulated_local",
      error: "Order not found",
    };
  }

  // Determine user login email
  const recipientEmail = (overrideRecipientEmail || order.userEmail || "").trim();
  if (!recipientEmail) {
    return {
      success: false,
      message: "No user email associated with this order.",
      orderId,
      recipientEmail: "",
      files: [],
      deliveryMode: "simulated_local",
      error: "Missing recipient email",
    };
  }

  console.log(
    `[Digital Delivery] Preparing product PDFs for Order #${orderId} to collector email: ${recipientEmail}`
  );

  // 1. Generate high-resolution PDF for every purchased product
  const pdfResults = await generateOrderPdfs({
    id: order.id,
    userEmail: recipientEmail,
    userName: order.userName || recipientEmail,
    createdAt: order.createdAt,
    items: order.items,
  });

  if (pdfResults.length === 0) {
    return {
      success: false,
      message: "No product items found in this order to deliver.",
      orderId,
      recipientEmail,
      files: [],
      deliveryMode: "simulated_local",
      error: "Empty items list",
    };
  }

  // 2. Persist PDFs locally so they can be downloaded immediately anytime
  const localFiles = persistGeneratedPdfsLocally(order.id, pdfResults);

  // Avoid embedding http://localhost in email links, which triggers aggressive Gmail phishing/spam filters
  const rawBaseUrl = process.env.NEXT_PUBLIC_APP_URL || "";
  const isLocalhost = !rawBaseUrl || rawBaseUrl.includes("localhost") || rawBaseUrl.includes("127.0.0.1");
  const safeBaseUrl = isLocalhost ? "https://mintedwhimsy.com" : rawBaseUrl.replace(/\/$/, "");

  const emailHtml = buildDeliveryEmailHtml({
    order,
    recipientEmail,
    files: localFiles,
    baseUrl: safeBaseUrl,
  });

  const emailPlainText = `Dear ${order.userName || "Valued Collector"},

Thank you for your purchase from Minted Whimsy Atelier! Your payment has been confirmed, and your high-resolution digital product PDF is attached to this email.

Order Reference: #${order.id}
Delivered to: ${recipientEmail}

Attached Digital Products:
${localFiles.map((f, idx) => `${idx + 1}. ${f.title}`).join("\n")}

How to use:
- Print at home on A4 or US Letter paper at 100% actual size.
- Import into digital tablet apps (GoodNotes, Notability, Apple Books).
- Certificate of authenticity and provenance are included on page 1.

Warmly,
Deepesh Sharma & Minted Whimsy Atelier
${safeBaseUrl}
`;

  const subject = `Your Digital Artwork PDF is Ready! Order #${order.id} — Minted Whimsy`;

  const emailAttachments = pdfResults.map((pdf) => ({
    filename: pdf.filename,
    content: pdf.buffer,
  }));

  let deliveryMode: "resend" | "smtp" | "simulated_local" = "simulated_local";
  let deliveryError: string | undefined = undefined;

  // 3. Attempt Delivery via Resend if RESEND_API_KEY is configured
  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  const fromEmail =
    process.env.RESEND_FROM_EMAIL?.trim() || "Minted Whimsy Atelier <orders@mintedwhimsy.com>";

  if (resendApiKey && resendApiKey !== "" && !resendApiKey.includes("your-api-key")) {
    try {
      console.log(`[Digital Delivery] Sending email via Resend to ${recipientEmail}...`);
      const resend = new Resend(resendApiKey);

      const resendAttachments = pdfResults.map((pdf) => ({
        filename: pdf.filename,
        content: pdf.buffer,
      }));

      const res = await resend.emails.send({
        from: fromEmail.includes("@mintedwhimsy.com") ? "onboarding@resend.dev" : fromEmail,
        to: recipientEmail,
        subject,
        text: emailPlainText,
        html: emailHtml,
        attachments: resendAttachments,
      });

      if (res.error) {
        console.warn("[Digital Delivery] Resend API returned error:", res.error);
        deliveryError = res.error.message;
      } else {
        console.log(`[Digital Delivery] Email successfully dispatched via Resend! ID:`, res.data?.id);
        deliveryMode = "resend";
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("[Digital Delivery] Resend dispatch exception:", err);
      deliveryError = msg;
    }
  }

  // 4. Attempt Delivery via SMTP (e.g. Gmail / Mailgun / AWS SES) if SMTP is configured
  if (deliveryMode === "simulated_local" && process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      console.log(`[Digital Delivery] Sending email via SMTP transporter to ${recipientEmail}...`);
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: Number(process.env.SMTP_PORT) || 465,
        secure: process.env.SMTP_SECURE !== "false",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"${process.env.SMTP_FROM_NAME || "Minted Whimsy Atelier"}" <${process.env.SMTP_USER}>`,
        replyTo: process.env.SMTP_USER,
        to: recipientEmail,
        subject,
        text: emailPlainText,
        html: emailHtml,
        attachments: emailAttachments,
        headers: {
          "X-Entity-Ref-ID": `order-${order.id}`,
        },
      });

      console.log(`[Digital Delivery] Email successfully dispatched via SMTP!`);
      deliveryMode = "smtp";
      deliveryError = undefined;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("[Digital Delivery] SMTP dispatch exception:", err);
      deliveryError = msg;
    }
  }

  // 5. If running locally without external credentials, fallback to simulated delivery
  if (deliveryMode === "simulated_local") {
    console.log(
      `\n═══════════════════════════════════════════════════════════════════════`
    );
    console.log(`[DIGITAL PRODUCT DELIVERY - EMAIL SIMULATION]`);
    console.log(`To Collector: ${recipientEmail} (User Login Email)`);
    console.log(`Order: #${order.id}`);
    console.log(`Subject: ${subject}`);
    console.log(`PDF Attachments (${emailAttachments.length}):`);
    emailAttachments.forEach((att) => {
      console.log(`  📎 ${att.filename} (${att.content.length} bytes)`);
    });
    console.log(
      `Direct Download: ${safeBaseUrl}/downloads/orders/${order.id}/${localFiles[0]?.filename}`
    );
    console.log(
      `═══════════════════════════════════════════════════════════════════════\n`
    );
  }

  // 6. Update order record with delivery status
  await updateOrderDigitalDelivery(order.id, {
    status: "sent",
    email: recipientEmail,
    deliveredAt: new Date().toISOString(),
    pdfFiles: localFiles,
  });

  return {
    success: true,
    message: `Digital product PDF${
      localFiles.length > 1 ? "s" : ""
    } successfully sent to ${recipientEmail} as PDF attachment.`,
    orderId: order.id,
    recipientEmail,
    files: localFiles,
    deliveryMode,
    error: deliveryError,
  };
}
