"use client";

import { useState } from "react";
import { AdminSidebar, type AdminTab } from "@/components/admin/AdminSidebar";
import DashboardTab from "@/components/admin/DashboardTab";
import ContenuTab from "@/components/admin/ContenuTab";
import PhotosTab from "@/components/admin/PhotosTab";
import ServicesTab from "@/components/admin/ServicesTab";
import TemoignagesTab from "@/components/admin/TemoignagesTab";
import ProjetsTab from "@/components/admin/ProjetsTab";

const TAB_COMPONENTS: Record<AdminTab, React.ComponentType> = {
  dashboard: DashboardTab,
  contenu: ContenuTab,
  photos: PhotosTab,
  services: ServicesTab,
  temoignages: TemoignagesTab,
  projets: ProjetsTab,
};

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const ActiveComponent = TAB_COMPONENTS[activeTab];

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 overflow-y-auto p-6 lg:p-8">
        <ActiveComponent />
      </main>
    </div>
  );
}
