"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const BaseLayoutPage: React.FC = () => {
  const { status } = useSession();
  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (status === "authenticated") {
    return redirect("/dashboard/home");
  }
  if (status === "unauthenticated") {
    return redirect("/login");
  }
};

export default BaseLayoutPage;
