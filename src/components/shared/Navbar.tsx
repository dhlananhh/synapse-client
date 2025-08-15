"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BrainCircuit } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import UserNav from "./UserNav";
import { ThemeToggle } from "./ThemeToggle";
import SearchBar from "./SearchBar";
import NotificationBell from "@/components/features/notifications/NotificationBell";

const Navbar = () => {
  const { currentUser } = useAuth();

  return (
    <header className="fixed top-0 inset-x-0 h-16 z-[49] border-b bg-background/80 backdrop-blur-lg">
      <div className="container h-full max-w-7xl mx-auto flex items-center justify-between gap-2">
        <Link href="/" className="flex items-center gap-2">
          <BrainCircuit className="h-8 w-8 text-primary" />
          <p className="hidden sm:block text-xl font-bold text-foreground">Synapse</p>
        </Link>

        <SearchBar />

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
                  <Link href="/login">Log In</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Sign Up</Link>
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
