"use client";

import HomePage from "@/components/HomePage";

export default function Home() {
  if (typeof window == "undefined") return;
  return <HomePage />;
}
