"use client";

import { useEffect } from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const theme =
      typeof window !== "undefined" &&
      typeof localStorage !== "undefined" &&
      localStorage.getItem("theme") === "dark"
        ? "dark"
        : "light";
    document.documentElement.className = theme;
  }, []);

  return <>{children}</>;
}
