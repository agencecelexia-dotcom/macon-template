"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { company } from "@/lib/data/company";
import {
  LayoutDashboard,
  FileText,
  Image,
  Wrench,
  MessageSquareQuote,
  FolderKanban,
  LogOut,
  Menu,
  X,
} from "lucide-react";

export type AdminTab =
  | "dashboard"
  | "contenu"
  | "photos"
  | "services"
  | "temoignages"
  | "projets";

const TABS: { id: AdminTab; label: string; icon: React.ElementType }[] = [
  { id: "dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { id: "contenu", label: "Contenu", icon: FileText },
  { id: "photos", label: "Photos", icon: Image },
  { id: "services", label: "Services", icon: Wrench },
  { id: "temoignages", label: "Témoignages", icon: MessageSquareQuote },
  { id: "projets", label: "Projets", icon: FolderKanban },
];

interface Props {
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
}

export function AdminSidebar({ activeTab, onTabChange }: Props) {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  const nav = (
    <nav className="flex flex-col h-full">
      {/* Brand */}
      <div className="p-6 border-b border-white/10">
        <h2 className="text-lg font-bold text-white truncate">{company.name}</h2>
        <p className="text-xs text-white/50 mt-1">Administration</p>
      </div>

      {/* Tabs */}
      <div className="flex-1 py-4 space-y-1 px-3">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                onTabChange(tab.id);
                setMobileOpen(false);
              }}
              className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-white/15 text-accent-500"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Logout */}
      <div className="p-3 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:text-red-400 hover:bg-white/5 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Déconnexion
        </button>
      </div>
    </nav>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-primary-900 text-white shadow-lg"
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-primary-900 transform transition-transform duration-200 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {nav}
      </aside>
    </>
  );
}
