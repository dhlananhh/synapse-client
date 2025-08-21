"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, ExternalLink } from "lucide-react";


interface SettingsRowProps {
  title: string;
  description: string;
  children: React.ReactNode;
  href?: string;
  isExternal?: boolean;
}


export default function SettingsRow({
  title,
  description,
  children,
  href,
  isExternal,
}: SettingsRowProps) {

  const content = (
    <div className="flex justify-between items-center p-4 border-b">
      <div className="flex flex-col">
        <h4 className="font-semibold">{ title }</h4>
        <p className="text-sm text-muted-foreground">{ description }</p>
      </div>
      <div className="flex items-center gap-2">
        { children }
        { href && !isExternal && <ChevronRight className="h-5 w-5 text-muted-foreground" /> }
        { href && isExternal && <ExternalLink className="h-5 w-5 text-muted-foreground" /> }
      </div>
    </div>
  );

  if (href) {
    return (
      <Link
        href={ href }
        target={ isExternal ? "_blank" : undefined }
        rel={ isExternal ? "noopener noreferrer" : undefined }
        className="block hover:bg-secondary/50"
      >
        { content }
      </Link>
    );
  }

  return content;
}
