import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { cookies } from "next/headers";

const ADMIN_TOKEN = "macon-admin-session-v1";
const CLIENT_MD_PATH = join(process.cwd(), "CLIENT.md");

async function isAuthed() {
  const cookieStore = await cookies();
  return cookieStore.get("admin_auth")?.value === ADMIN_TOKEN;
}

export async function POST(request: NextRequest) {
if (!(await isAuthed())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const { fields } = await request.json() as { fields: Record<string, string> };
    if (!fields || typeof fields !== "object") {
      return NextResponse.json({ error: "Champs invalides" }, { status: 400 });
    }

    let content: string;
    try {
      content = readFileSync(CLIENT_MD_PATH, "utf-8");
    } catch {
      return NextResponse.json({ error: "CLIENT.md introuvable" }, { status: 500 });
    }

    for (const [key, value] of Object.entries(fields)) {
      if (!value) continue;
      const regex = new RegExp(`^(\${key}\\s*=\\s*).*$`, "m");
      if (regex.test(content)) {
        content = content.replace(regex, `$1${value}`);
      } else {
        content += `\n${key} = ${value}\n`;
      }
    }

    writeFileSync(CLIENT_MD_PATH, content, "utf-8");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
