"use client";

import { useRouter } from "next/navigation";

export default function UserNoSession({ code }: any) {
  const router = useRouter();

  localStorage.setItem("code-rem", `Run ${code}`);
  router.push("/login");

  return <p>Redirect to login</p>;
}
