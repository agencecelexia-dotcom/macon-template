"use client";

import { useState } from "react";
import { Save, Loader2, CheckCircle2 } from "lucide-react";

interface FieldDef {
  key: string;
  label: string;
  type?: "text" | "textarea" | "password";
  placeholder?: string;
}

interface SectionDef {
  title: string;
  fields: FieldDef[];
}

const SECTIONS: SectionDef[] = [
  {
    title: "Identité",
    fields: [
      { key: "NOM_ENTREPRISE", label: "Nom de l'entreprise", placeholder: "Maçonnerie Durand" },
      { key: "NOM_LEGAL", label: "Nom légal (si différent)", placeholder: "SARL Durand Maçonnerie" },
      { key: "PRENOM_DIRIGEANT", label: "Prénom du dirigeant", placeholder: "Philippe" },
      { key: "NOM_DIRIGEANT", label: "Nom du dirigeant", placeholder: "Durand" },
      { key: "GENRE_DIRIGEANT", label: "Genre (M/F)", placeholder: "M" },
    ],
  },
  {
    title: "Contact",
    fields: [
      { key: "TELEPHONE", label: "Téléphone", placeholder: "04 78 00 00 00" },
      { key: "EMAIL", label: "Email", placeholder: "contact@maconnerie-durand.fr" },
      { key: "ADRESSE", label: "Adresse", placeholder: "15 Rue de la République" },
      { key: "CODE_POSTAL", label: "Code postal", placeholder: "69002" },
      { key: "VILLE", label: "Ville", placeholder: "Lyon" },
      { key: "DEPARTEMENT", label: "Département", placeholder: "Rhône" },
      { key: "REGION", label: "Région", placeholder: "Auvergne-Rhône-Alpes" },
      { key: "ZONE_KM", label: "Zone d'intervention (km)", placeholder: "30-50 km" },
    ],
  },
  {
    title: "Horaires",
    fields: [
      { key: "HORAIRES_SEMAINE", label: "Lundi - Vendredi", placeholder: "8h-18h" },
      { key: "HORAIRES_SAMEDI", label: "Samedi", placeholder: "9h-12h" },
      { key: "HORAIRES_DIMANCHE", label: "Dimanche", placeholder: "Fermé" },
    ],
  },
  {
    title: "Contenu du site",
    fields: [
      { key: "SLOGAN", label: "Slogan", placeholder: "Votre maçon de confiance à Lyon" },
      { key: "DESCRIPTION_ENTREPRISE", label: "Description de l'entreprise", type: "textarea", placeholder: "Présentation de votre entreprise..." },
      { key: "META_TITLE_ACCUEIL", label: "Titre SEO accueil", placeholder: "Maçonnerie Durand | Maçon à Lyon" },
      { key: "META_DESC_ACCUEIL", label: "Méta description accueil", type: "textarea", placeholder: "Description pour les moteurs de recherche..." },
    ],
  },
  {
    title: "Réseaux sociaux",
    fields: [
      { key: "FACEBOOK_URL", label: "Facebook", placeholder: "https://facebook.com/..." },
      { key: "INSTAGRAM_URL", label: "Instagram", placeholder: "https://instagram.com/..." },
      { key: "GOOGLE_URL", label: "Fiche Google", placeholder: "https://g.page/..." },
    ],
  },
  {
    title: "Légal",
    fields: [
      { key: "DOMAINE", label: "Nom de domaine", placeholder: "maconnerie-durand.fr" },
      { key: "SIRET", label: "SIRET", placeholder: "123 456 789 00012" },
    ],
  },
  {
    title: "Certifications",
    fields: [
      { key: "RGE", label: "Certification RGE", placeholder: "Oui / Non" },
      { key: "ASSURANCE_DECENNALE", label: "Assurance décennale", placeholder: "Oui - Nom assureur" },
    ],
  },
  {
    title: "Chiffres clés",
    fields: [
      { key: "ANNEES_EXPERIENCE", label: "Années d'expérience", placeholder: "15" },
      { key: "NOMBRE_INTERVENTIONS", label: "Nombre d'interventions", placeholder: "200" },
      { key: "NOTE_GOOGLE", label: "Note Google", placeholder: "4.8" },
      { key: "NOMBRE_AVIS", label: "Nombre d'avis", placeholder: "47" },
      { key: "ANNEE_CREATION", label: "Année de création", placeholder: "2010" },
      { key: "TAUX_SATISFACTION", label: "Taux de satisfaction (%)", placeholder: "98" },
    ],
  },
  {
    title: "Administration",
    fields: [
      { key: "ADMIN_PASSWORD", label: "Mot de passe admin", type: "password", placeholder: "••••••••" },
    ],
  },
];

export default function ContenuTab() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function handleChange(key: string, val: string) {
    setValues((prev) => ({ ...prev, [key]: val }));
    setSaved(false);
  }

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/save-client", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fields: values }),
      });
      if (res.ok) setSaved(true);
    } catch {
      alert("Erreur lors de la sauvegarde.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Contenu du site</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saving ? "Sauvegarde..." : saved ? "Sauvegardé" : "Sauvegarder"}
        </button>
      </div>

      {SECTIONS.map((section) => (
        <div key={section.title} className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">{section.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {section.fields.map((f) => (
              <div key={f.key} className={f.type === "textarea" ? "md:col-span-2" : ""}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
                {f.type === "textarea" ? (
                  <textarea
                    rows={3}
                    placeholder={f.placeholder}
                    value={values[f.key] || ""}
                    onChange={(e) => handleChange(f.key, e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                ) : (
                  <input
                    type={f.type || "text"}
                    placeholder={f.placeholder}
                    value={values[f.key] || ""}
                    onChange={(e) => handleChange(f.key, e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
