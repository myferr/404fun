"use client";

import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { CodeBlock } from "@/components/custom/code-block";

const demoCode = `  const [apiHeader, setApiHeader] = useState<string | undefined>();

  useEffect(() => {
    fetch("https://404fun.vercel.app/api")
      .then(async (res) => {
        const data = await res.json();
        if (data.header) setApiHeader(data.header);
      })
      .catch(() => {});
  }, []);
`;

export default function Home() {
  const [apiHeader, setApiHeader] = useState<string | undefined>();

  useEffect(() => {
    fetch("https://404fun.vercel.app/api")
      .then(async (res) => {
        const data = await res.json();
        if (data.header) setApiHeader(data.header);
      })
      .catch(() => {});
  }, []);
  return (
    <div>
      <Link
        className="flex gap-2 items-center text-muted-foreground hover:text-accent-foreground m-3"
        href={"/"}
      >
        <FaArrowLeft /> back / home
      </Link>
      <div className="flex flex-col items-center justify-center min-h-screen gap-3">
        <h1 className="text-3xl">
          {apiHeader ? apiHeader : "Couldn't generate"}
        </h1>
        <CodeBlock language="ts" code={demoCode} title="getHeader.ts" />
      </div>
    </div>
  );
}
