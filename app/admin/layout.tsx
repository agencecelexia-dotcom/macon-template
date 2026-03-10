import type { Metadata } from "next";
import { AdminBodyClass } from "./AdminBodyClass";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Administration",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminBodyClass />
      {children}
    </>
  );
}
