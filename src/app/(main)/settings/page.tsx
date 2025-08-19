"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";
import UpdateProfileForm from "@/components/features/settings/UpdateProfileForm";


export default function SettingsPage() {
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (currentUser === undefined) return;

    if (currentUser === null) {
      router.push("/login?from=/settings");
    }
  }, [ currentUser, router ]);

  if (currentUser === undefined) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="mt-10">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <UpdateProfileForm />
    </div>
  )
} 
