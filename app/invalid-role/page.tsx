// app/invalid-role/page.tsx
"use client";

import { useSearchParams } from "next/navigation";

export default function InvalidRolePage() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role");
  const reason = searchParams.get("reason");

  const getMessage = () => {
    if (reason === "invalid") {
      return `🚫 The role "${role}" is not a valid dashboard role.`;
    } else if (reason === "unauthorized") {
      return `🚫 You do not have access to the "${role}" dashboard.`;
    } else {
      return "🚫 Access Denied.";
    }
  };

  return (
    <div className="text-center text-red-500 mt-10 text-xl">
      {getMessage()}
    </div>
  );
}
