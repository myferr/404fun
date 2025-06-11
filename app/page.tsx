"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaGithub, FaMoon, FaSun } from "react-icons/fa6";
import { useState } from "react";
import { ApiReference } from "@/components/custom/api-reference";

const apiEndpoint = {
  method: "GET" as const,
  path: "/api/",
  description: "Get a random 404 header message",
};

const apiEndpointAmount = {
  method: "GET" as const,
  path: "/api/amount",
  description: "Get the total number of available 404 header messages",
};

const apiEndpoint2 = {
  method: "GET" as const,
  path: "/api/gen",
  description:
    "Generate a 404 header message using Google's Gemini 2.5 Flash model",
  parameters: [
    {
      name: "key",
      type: "string",
      required: true,
      description: "Your Gemini API Key",
    },
    {
      name: "prompt",
      type: "string",
      required: false,
      description: "A prompt to the model",
    },
  ],
};

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      return document.getElementById("layout")?.classList.contains("dark")
        ? "dark"
        : "light";
    }
    return "light";
  });

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    const layout = document.getElementById("layout");
    if (layout) {
      layout.classList.remove(theme);
      layout.classList.add(newTheme);
    }
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme); // triggers re-render
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-3">
      <h1 className="text-3xl">404-fun</h1>

      <div className="gap-2 flex">
        <Link href={"/demo"}>
          <Button variant={"secondary"}>Demo</Button>
        </Link>
      </div>
      <div className="flex gap-1">
        <Link href={"https://github.com/myferr/404fun"}>
          <Button variant={"ghost"}>
            <FaGithub />
          </Button>
        </Link>

        <Button variant={"ghost"} onClick={toggleTheme}>
          {theme === "dark" ? <FaMoon /> : <FaSun />}
        </Button>
      </div>
      <div>
        <ApiReference endpoint={apiEndpoint} />
        <ApiReference endpoint={apiEndpointAmount} />
        <ApiReference endpoint={apiEndpoint2} />
      </div>
    </div>
  );
}
