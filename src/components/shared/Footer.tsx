"use client";

import React from "react";
import { BrainCircuit } from "lucide-react";
import Link from "next/link";
import { PATHS } from "@/lib/paths";


export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto max-w-7xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <BrainCircuit className="h-6 w-6 text-primary" />
          <span className="font-bold">Synapse</span>
        </div>
        <p className="text-sm text-muted-foreground">
          &copy; { new Date().getFullYear() } Synapse. All rights reserved.
        </p>
        <div className="flex gap-4 text-sm font-medium">
          <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">About</Link>
          <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy</Link>
          <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
