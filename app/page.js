"use client";

import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

export default function Home() {
  const router = useRouter();

  useLayoutEffect(() => {
    router.push("/browse");
  }, []);

  return <h2>Hello</h2>;
}
