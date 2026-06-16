"use client";

import Header from "@/components/Header";

export default function PageShell({ children, className = "" }) {
  return (
    <div className={`min-h-screen flex flex-col bg-[#09090b] ${className}`.trim()}>
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
