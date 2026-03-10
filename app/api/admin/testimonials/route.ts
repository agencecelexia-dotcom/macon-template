import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";
import { cookies } from "next/headers";

const ADMIN_TOKEN = "macon-admin-session-v1";

const WRITE_DIR = process.env.VERCEL
  ? join("/tmp", "storage")
  : join(process.cwd(), "storage");

const FILE = join(WRITE_DIR, "testimonials.json");
const SEED = join(process.cwd(), "storage", "testimonials.json");

async function isAuthed() {
  const cookieStore = await cookies();
  return cookieStore.get("admin_auth")?.value === ADMIN_TOKEN;
}

function ensureDir() {
  try { if (!existsSync(WRITE_DIR)) mkdirSync(WRITE_DIR, { recursive: true }); } catch { /* ignore */ }
}

interface Testimonial {
  id: string;
  clientName: string;
  role: string;
  projectType: string;
  rating: number;
  quote: string;
  date: string;
}

function readData(): Testimonial[] {
  ensureDir();
  if (existsSync(FILE)) {
    try { return JSON.parse(readFileSync(FILE, "utf-8")); } catch { /* fall through */ }
  }
  if (existsSync(SEED)) {
    try { return JSON.parse(readFileSync(SEED, "utf-8")); } catch { /* fall through */ }
  }
  return [];
}

function writeData(data: Testimonial[]) {
  ensureDir();
  writeFileSync(FILE, JSON.stringify(data, null, 2));
}

export async function GET() {
  return NextResponse.json(readData());
}

export async function POST(request: NextRequest) {
if (!(await isAuthed())) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  try {
    const body = await request.json();
    const items = readData();
    const item: Testimonial = { id: crypto.randomUUID(), ...body };
    items.push(item);
    writeData(items);
    return NextResponse.json(item, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
if (!(await isAuthed())) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  try {
    const body = await request.json();
    const items = readData();
    const idx = items.findIndex((t) => t.id === body.id);
    if (idx === -1) return NextResponse.json({ error: "Non trouvé" }, { status: 404 });
    items[idx] = { ...items[idx], ...body };
    writeData(items);
    return NextResponse.json(items[idx]);
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
if (!(await isAuthed())) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  try {
    const { id } = await request.json();
    const items = readData();
    const idx = items.findIndex((t) => t.id === id);
    if (idx === -1) return NextResponse.json({ error: "Non trouvé" }, { status: 404 });
    items.splice(idx, 1);
    writeData(items);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
