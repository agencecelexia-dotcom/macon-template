/**
 * sync-client.ts — Template Macon
 * Lit CLIENT.md et genere lib/config/client.config.ts
 * Usage: npm run sync-client
 */

import * as fs from "fs";
import * as path from "path";

const ROOT = path.resolve(__dirname, "..");
const CLIENT_MD = path.join(ROOT, "CLIENT.md");
const OUTPUT = path.join(ROOT, "lib", "config", "client.config.ts");

function extractNumber(s: string): number {
  const match = s.match(/[\\d.]+/);
  return match ? Number(match[0]) : 0;
}

function phoneToHref(phone: string): string {
  const digits = phone.replace(/\\s+/g, "");
  if (digits.startsWith("0")) return "tel:+33" + digits.slice(1);
  return "tel:" + digits;
}

function esc(s: string): string {
  return s.replace(/\\\\/g, "\\\\").replace(/"/g, '\\"');
}

function main() {
  if (!fs.existsSync(CLIENT_MD)) {
    console.warn("CLIENT.md introuvable - conserve config existante.");
    if (fs.existsSync(OUTPUT)) {
      console.log("client.config.ts existant conserve.");
    }
    process.exit(0);
  }

  const content = fs.readFileSync(CLIENT_MD, "utf-8");
  const rawLines = content.split(/\r?\n/);
  const vars = new Map<string, string>();

  for (const line of rawLines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const match = trimmed.match(/^([A-Z_0-9]+):\s*"(.*)"$/);
    if (match) vars.set(match[1], match[2]);
  }

  console.log("CLIENT.md lu (" + vars.size + " variables)");

  const get = (key: string) => vars.get(key) ?? "";

  const telephone = get("TELEPHONE");
  const telephoneHref = phoneToHref(telephone);
  const anneesExperience = extractNumber(get("ANNEES_EXPERIENCE")) || 15;
  const nombreInterventions = extractNumber(get("NOMBRE_INTERVENTIONS")) || 500;
  const noteGoogle = extractNumber(get("NOTE_GOOGLE")) || 4.8;
  const nombreAvis = extractNumber(get("NOMBRE_AVIS")) || 45;
  const tauxSatisfaction = get("TAUX_SATISFACTION").replace(/%/g, "").trim() || "98";
  const anneeCreation = extractNumber(get("ANNEE_CREATION")) || 2010;

  const out: string[] = [];
  out.push("// FICHIER AUTO-GENERE - ne pas modifier manuellement");
  out.push("// Modifie CLIENT.md puis relance : npm run sync-client");
  out.push("");
  out.push("export const clientConfig = {");
  out.push('  NOM_ENTREPRISE: "' + esc(get("NOM_ENTREPRISE")) + '",');
  out.push('  NOM_DIRIGEANT: "' + esc(get("NOM_DIRIGEANT")) + '",');
  out.push('  PRENOM_DIRIGEANT: "' + esc(get("PRENOM_DIRIGEANT")) + '",');
  out.push('  GENRE_DIRIGEANT: "' + esc(get("GENRE_DIRIGEANT") || "masculin") + '",');
  out.push('  TELEPHONE: "' + esc(telephone) + '",');
  out.push('  TELEPHONE_HREF: "' + esc(telephoneHref) + '",');
  out.push('  EMAIL: "' + esc(get("EMAIL")) + '",');
  out.push('  ADRESSE: "' + esc(get("ADRESSE")) + '",');
  out.push('  VILLE: "' + esc(get("VILLE")) + '",');
  out.push('  CODE_POSTAL: "' + esc(get("CODE_POSTAL")) + '",');
  out.push('  DEPARTEMENT: "' + esc(get("DEPARTEMENT")) + '",');
  out.push('  REGION: "' + esc(get("REGION")) + '",');
  out.push('  HORAIRES_SEMAINE: "' + esc(get("HORAIRES_SEMAINE") || "8h - 18h") + '",');
  out.push('  HORAIRES_SAMEDI: "' + esc(get("HORAIRES_SAMEDI") || "9h - 12h") + '",');
  out.push('  HORAIRES_DIMANCHE: "' + esc(get("HORAIRES_DIMANCHE") || "Ferme") + '",');
  out.push("  ANNEES_EXPERIENCE: " + anneesExperience + ",");
  out.push("  NOMBRE_INTERVENTIONS: " + nombreInterventions + ",");
  out.push("  NOTE_GOOGLE: " + noteGoogle + ",");
  out.push("  NOMBRE_AVIS: " + nombreAvis + ",");
  out.push('  TAUX_SATISFACTION: "' + tauxSatisfaction + '",');
  out.push("  ANNEE_CREATION: " + anneeCreation + ",");
  out.push('  SLOGAN: "' + esc(get("SLOGAN")) + '",');
  out.push('  DESCRIPTION_ENTREPRISE: "' + esc(get("DESCRIPTION_ENTREPRISE")) + '",');
  out.push('  META_TITLE: "' + esc(get("META_TITLE")) + '",');
  out.push('  META_DESCRIPTION: "' + esc(get("META_DESCRIPTION")) + '",');
  out.push('  FACEBOOK_URL: "' + esc(get("FACEBOOK_URL")) + '",');
  out.push('  INSTAGRAM_URL: "' + esc(get("INSTAGRAM_URL")) + '",');
  out.push('  GOOGLE_URL: "' + esc(get("GOOGLE_URL")) + '",');
  out.push('  SIRET: "' + esc(get("SIRET")) + '",');
  out.push('  ZONE_INTERVENTION: "' + esc(get("ZONE_INTERVENTION")) + '",');
  out.push('  ZONE_KM: "' + esc(get("ZONE_KM") || "30") + '",');
  out.push("} as const;");
  out.push("");
  out.push("export type ClientConfig = typeof clientConfig;");

  const dir = require("path").dirname(OUTPUT);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(OUTPUT, out.join("\n"), "utf-8");
  console.log("client.config.ts genere -> " + OUTPUT);
}

main();