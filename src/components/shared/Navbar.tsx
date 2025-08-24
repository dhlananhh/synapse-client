"use client";


import React, { Suspense } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import UserNav from "./UserNav";
import MobileNav from "./MobileNav";
import { ThemeToggle } from "./ThemeToggle";
import SearchBar from "./SearchBar";
import NotificationBell from "@/components/features/notifications/NotificationBell";
import { BrainCircuit } from "lucide-react";


const Navbar = () => {
  const { t } = useTranslation();
  const { currentUser } = useAuth();

  return (
    <header className="fixed top-0 inset-x-0 h-16 z-50 border-b bg-background/80 backdrop-blur-lg">
      <div className="container h-full max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="md:hidden">
            <MobileNav />
          </div>

          <Link href="/" className="hidden md:flex items-center gap-2">
            <BrainCircuit className="h-8 w-8 text-primary" />
            <p className="hidden lg:block text-xl font-bold text-foreground">Synapse</p>
          </Link>
        </div>

        <div className="hidden md:flex flex-1 justify-center">
          <Suspense fallback={ <div className="text-center text-muted-foreground mt-10">Searching...</div> }>
            <SearchBar />
          </Suspense>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {
            currentUser ? (
              <>
                <NotificationBell />
                <UserNav />
              </>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Button asChild variant="ghost">
                  <Link href="/login">
                    { t('navbar.login') }
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/register">
                    { t('navbar.signup') }
                  </Link>
                </Button>
              </div>
            )
          }
        </div>
      </div>
    </header>
  )
}
export default Navbar;
