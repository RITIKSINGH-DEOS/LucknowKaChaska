"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function AdminLogoutButton() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
      router.refresh();
      window.location.reload();
    } catch {
      setIsLoggingOut(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoggingOut}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium text-neutral-600 hover:text-red-700 hover:bg-red-50 border border-neutral-300 rounded transition-colors"
      title="Logout from admin session"
    >
      <LogOut className="w-3.5 h-3.5" />
      <span>{isLoggingOut ? "Exiting..." : "Logout"}</span>
    </button>
  );
}
