import fs from "fs";
import path from "path";

export interface OrderItem {
  productId: string;
  title: string;
  artist: string;
  price: number;
  quantity: number;
  image: string;
  slug: string;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  pincode: string;
}

export interface OrderRecord {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  totalPrice: number;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  paymentStatus: "Pending Verification" | "Verified" | "Rejected";
  utrNumber?: string;
  status: "Payment Verification Pending" | "Confirmed" | "In Atelier Preparation" | "Shipped" | "Delivered" | "Cancelled";
  trackingNumber?: string;
  verifiedAt?: string;
  verifiedBy?: string;
  verificationNote?: string;
  createdAt: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");

const SEED_ORDERS: OrderRecord[] = [
  {
    id: "MW-982310",
    userId: "usr_seed_collector_01",
    userEmail: "collector@mintedwhimsy.com",
    userName: "Rahul Verma",
    items: [
      {
        productId: "p1",
        title: "Blushing Peonies",
        artist: "Priya Nair",
        price: 18500,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80",
        slug: "blushing-peonies",
      },
    ],
    subtotal: 18500,
    shippingFee: 0,
    totalPrice: 18500,
    shippingAddress: {
      fullName: "Rahul Verma",
      phone: "+91 98765 43210",
      address: "Flat 402, Lotus Residency, 12th Main Road",
      apartment: "Indiranagar",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560038",
    },
    paymentMethod: "UPI (collector@okhdfcbank)",
    paymentStatus: "Verified",
    utrNumber: "439201948291",
    status: "Confirmed",
    trackingNumber: "DTDC-BLR-892341",
    createdAt: "2026-01-20T14:30:00.000Z",
  },
];

function ensureOrdersFile(): OrderRecord[] {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(ORDERS_FILE)) {
      fs.writeFileSync(ORDERS_FILE, JSON.stringify(SEED_ORDERS, null, 2), "utf8");
      return SEED_ORDERS;
    }
    const content = fs.readFileSync(ORDERS_FILE, "utf8");
    return JSON.parse(content || "[]");
  } catch (err) {
    console.error("Error reading orders file:", err);
    return [];
  }
}

function saveOrdersToFile(orders: OrderRecord[]): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf8");
  } catch (err) {
    console.error("Error writing orders file:", err);
  }
}

export async function getOrdersByUserId(userId: string): Promise<OrderRecord[]> {
  const orders = ensureOrdersFile();
  return orders
    .filter((o) => o.userId === userId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getAllOrders(): Promise<OrderRecord[]> {
  const orders = ensureOrdersFile();
  return orders.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function isUtrAlreadyUsed(utr: string): boolean {
  if (!utr) return false;
  const cleanUtr = utr.trim();
  const orders = ensureOrdersFile();
  return orders.some(
    (o) =>
      o.utrNumber &&
      o.utrNumber.trim().toLowerCase() === cleanUtr.toLowerCase() &&
      o.paymentStatus !== "Rejected"
  );
}

export async function updateOrderPaymentVerification(
  orderId: string,
  action: "approve" | "reject",
  adminInfo?: { id: string; email: string; note?: string }
): Promise<OrderRecord | null> {
  const orders = ensureOrdersFile();
  const orderIndex = orders.findIndex((o) => o.id === orderId);
  if (orderIndex === -1) return null;

  const target = orders[orderIndex];
  if (action === "approve") {
    target.paymentStatus = "Verified";
    target.status = "Confirmed";
    target.verifiedAt = new Date().toISOString();
    target.verifiedBy = adminInfo ? adminInfo.email : "Authorized Atelier Admin";
    target.verificationNote = adminInfo?.note || "Bank credit confirmed for 9926398315@axl";
  } else {
    target.paymentStatus = "Rejected";
    target.status = "Cancelled";
    target.verifiedAt = new Date().toISOString();
    target.verifiedBy = adminInfo ? adminInfo.email : "Authorized Atelier Admin";
    target.verificationNote = adminInfo?.note || "Payment uncredited or invalid reference rejected by curator";
  }

  orders[orderIndex] = target;
  saveOrdersToFile(orders);
  return target;
}

export async function createOrder(data: {
  userId: string;
  userEmail: string;
  userName: string;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  totalPrice: number;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  utrNumber?: string;
  paymentStatus?: "Pending Verification" | "Verified" | "Rejected";
  status?: "Payment Verification Pending" | "Confirmed" | "In Atelier Preparation" | "Shipped" | "Delivered" | "Cancelled";
}): Promise<OrderRecord> {
  const orders = ensureOrdersFile();

  // Security Fix (SEC-01): New orders must NEVER default to "Verified".
  // Only authenticated gateway verifiers or admin ledger approvals can mark payment as Verified.
  const initialPaymentStatus: "Pending Verification" | "Verified" | "Rejected" =
    data.paymentStatus || "Pending Verification";
  const initialStatus =
    data.status || (initialPaymentStatus === "Verified" ? "Confirmed" : "Payment Verification Pending");

  const newOrder: OrderRecord = {
    id: `MW-${Math.floor(100000 + Math.random() * 900000)}`,
    userId: data.userId,
    userEmail: data.userEmail,
    userName: data.userName || data.userEmail,
    items: data.items,
    subtotal: data.subtotal,
    shippingFee: data.shippingFee,
    totalPrice: data.totalPrice,
    shippingAddress: data.shippingAddress,
    paymentMethod: data.paymentMethod,
    paymentStatus: initialPaymentStatus,
    utrNumber: data.utrNumber?.trim(),
    status: initialStatus,
    trackingNumber: `EXP-${Math.floor(10000000 + Math.random() * 90000000)}`,
    createdAt: new Date().toISOString(),
  };

  orders.unshift(newOrder);
  saveOrdersToFile(orders);
  return newOrder;
}
