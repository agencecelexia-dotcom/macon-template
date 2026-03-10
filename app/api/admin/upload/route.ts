import { NextRequest, NextResponse } from "next/server";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { cookies } from "next/headers";

const ADMIN_TOKEN = "macon-admin-session-v1";

async function isAuthed() {
  const cookieStore = await cookies();
  return cookieStore.get("admin_auth")?.value === ADMIN_TOKEN;
}

export async function POST(request: NextRequest) {
if (!(await isAuthed())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const path = formData.get("path") as string | null;

    if (!file || !path) {
      return NextResponse.json({ error: "Fichier et chemin requis" }, { status: 400 });
    }

    // Sanitize path to prevent directory traversal
    const safePath = path.replace(/\.\.\//g, "").replace(/^\//, "");
    const destDir = join(process.cwd(), "public", dirname(safePath));
    const destPath = join(process.cwd(), "public", safePath);

    if (!existsSync(destDir)) {
      mkdirSync(destDir, { recursive: true });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    writeFileSync(destPath, buffer);

    return NextResponse.json({ ok: true, path: `/${safePath}` });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
