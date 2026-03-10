"use client";

import { useState } from "react";
import {
  Eye,
  Users,
  MousePointerClick,
  FileText,
  RefreshCw,
  Phone,
  Mail,
  X,
  TrendingUp,
  Clock,
  Percent,
} from "lucide-react";

// ─── Demo data ───
type SubmissionStatus = "Nouveau" | "Contacté" | "En cours" | "Converti";

interface DemoSubmission {
  id: string;
  date: string;
  fullName: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
  status: SubmissionStatus;
}

const DEMO_SUBMISSIONS: DemoSubmission[] = [
  { id: "1", date: "2026-03-09", fullName: "Jean-Pierre Martin", email: "jpmartin@gmail.com", phone: "06 12 34 56 78", projectType: "Construction neuve", message: "Projet de construction maison 120m² à Villeurbanne.", status: "Nouveau" },
  { id: "2", date: "2026-03-08", fullName: "Sophie Lefèvre", email: "sophie.l@orange.fr", phone: "06 98 76 54 32", projectType: "Rénovation façade", message: "Ravalement façade immeuble 3 étages centre Lyon.", status: "Contacté" },
  { id: "3", date: "2026-03-07", fullName: "Marc Dubois", email: "m.dubois@free.fr", phone: "07 11 22 33 44", projectType: "Extension", message: "Extension 40m² pour garage + chambre.", status: "En cours" },
  { id: "4", date: "2026-03-05", fullName: "Isabelle Moreau", email: "isa.moreau@laposte.net", phone: "06 55 44 33 22", projectType: "Mur de clôture", message: "Mur de clôture en parpaing enduit, 25m linéaires.", status: "Converti" },
  { id: "5", date: "2026-03-04", fullName: "Patrick Roux", email: "proux@gmail.com", phone: "06 77 88 99 00", projectType: "Terrasse", message: "Création terrasse béton 50m² avec muret.", status: "Nouveau" },
];

const STATUS_COLORS: Record<SubmissionStatus, string> = {
  Nouveau: "bg-blue-100 text-blue-700",
  "Contacté": "bg-yellow-100 text-yellow-700",
  "En cours": "bg-purple-100 text-purple-700",
  "Converti": "bg-green-100 text-green-700",
};

const TOP_PAGES = [
  { page: "/", views: 1245 },
  { page: "/services", views: 876 },
  { page: "/construction-neuve", views: 654 },
  { page: "/realisations", views: 521 },
  { page: "/contact", views: 489 },
];

const TRAFFIC_SOURCES = [
  { source: "Google (organique)", pct: 52 },
  { source: "Direct", pct: 23 },
  { source: "Google Maps", pct: 14 },
  { source: "Facebook", pct: 7 },
  { source: "Autres", pct: 4 },
];

export default function DashboardTab() {
  const [submissions, setSubmissions] = useState(DEMO_SUBMISSIONS);
  const [selectedSub, setSelectedSub] = useState<DemoSubmission | null>(null);

  function updateStatus(id: string, status: SubmissionStatus) {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status } : s))
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
        <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700">
          <RefreshCw className="w-4 h-4" /> Actualiser
        </button>
      </div>

      {/* Primary stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Pages vues", value: "3 847", icon: Eye, color: "text-blue-600 bg-blue-50" },
          { label: "Visiteurs uniques", value: "1 234", icon: Users, color: "text-emerald-600 bg-emerald-50" },
          { label: "Clics CTA", value: "189", icon: MousePointerClick, color: "text-amber-600 bg-amber-50" },
          { label: "Demandes devis", value: "12", icon: FileText, color: "text-purple-600 bg-purple-50" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-lg ${s.color}`}>
                <s.icon className="w-5 h-5" />
              </div>
              <span className="text-sm text-gray-500">{s.label}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Secondary stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Durée moy. session", value: "2m 34s", icon: Clock },
          { label: "Vues cette semaine", value: "847", icon: TrendingUp },
          { label: "Taux de rebond", value: "42%", icon: Percent },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4">
            <div className="p-2 rounded-lg bg-gray-50 text-gray-500">
              <s.icon className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-gray-400">{s.label}</p>
              <p className="text-lg font-semibold text-gray-900">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Submissions table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Dernières demandes</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
              <tr>
                <th className="px-5 py-3 text-left">Date</th>
                <th className="px-5 py-3 text-left">Nom</th>
                <th className="px-5 py-3 text-left">Projet</th>
                <th className="px-5 py-3 text-left">Statut</th>
                <th className="px-5 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {submissions.map((sub) => (
                <tr key={sub.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3 text-gray-500">{sub.date}</td>
                  <td className="px-5 py-3 font-medium text-gray-900">{sub.fullName}</td>
                  <td className="px-5 py-3 text-gray-600">{sub.projectType}</td>
                  <td className="px-5 py-3">
                    <select
                      value={sub.status}
                      onChange={(e) => updateStatus(sub.id, e.target.value as SubmissionStatus)}
                      className={`text-xs font-medium px-2 py-1 rounded-full border-0 ${STATUS_COLORS[sub.status]}`}
                    >
                      {(Object.keys(STATUS_COLORS) as SubmissionStatus[]).map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-5 py-3">
                    <button
                      onClick={() => setSelectedSub(sub)}
                      className="text-xs text-blue-600 hover:underline"
                    >
                      Voir détail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Two columns: top pages + traffic */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top pages */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-semibold text-gray-900 mb-4">Pages les plus vues</h2>
          <div className="space-y-3">
            {TOP_PAGES.map((p) => (
              <div key={p.page} className="flex items-center justify-between">
                <span className="text-sm text-gray-600 truncate mr-4">{p.page}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${(p.views / TOP_PAGES[0].views) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-400 w-12 text-right">{p.views}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic sources */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-semibold text-gray-900 mb-4">Sources de trafic</h2>
          <div className="space-y-3">
            {TRAFFIC_SOURCES.map((t) => (
              <div key={t.source} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{t.source}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${t.pct}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-400 w-10 text-right">{t.pct}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detail modal */}
      {selectedSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setSelectedSub(null)}>
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">{selectedSub.fullName}</h3>
              <button onClick={() => setSelectedSub(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3 text-sm text-gray-600">
              <p><strong>Projet :</strong> {selectedSub.projectType}</p>
              <p><strong>Date :</strong> {selectedSub.date}</p>
              <p><strong>Message :</strong> {selectedSub.message}</p>
            </div>
            <div className="flex gap-3 mt-6">
              <a
                href={`tel:${selectedSub.phone.replace(/\s/g, "")}`}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-colors"
              >
                <Phone className="w-4 h-4" /> {selectedSub.phone}
              </a>
              <a
                href={`mailto:${selectedSub.email}`}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                <Mail className="w-4 h-4" /> Email
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
