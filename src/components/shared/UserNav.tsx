"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { UserAvatar } from "./UserAvatar";
import ConfirmDialog from "./ConfirmDialog";
import { Bookmark } from "lucide-react";


export default function UserNav() {
  const { currentUser, logout } = useAuth();
  const [ isLogoutDialogOpen, setIsLogoutDialogOpen ] = useState(false);
  const [ isLoggingOut, setIsLoggingOut ] = useState(false);

  if (!currentUser)
    return null;

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    logout();
    setIsLoggingOut(false);
    setIsLogoutDialogOpen(false);
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full" aria-label="Open user menu">
            <UserAvatar user={ currentUser } />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{ currentUser.username }</p>
              <p className="text-xs leading-none text-muted-foreground">
                { currentUser.id }@synapse.io
              </p>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <Link
              href={ `/u/${currentUser.username}` }
            >
              Profile
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link
              href="/saved"
            >
              <Bookmark className="mr-2 h-4 w-4" />
              Saved
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link
              href="/settings"
            >
              Settings
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={ () => setIsLogoutDialogOpen(true) }
            className="cursor-pointer"
          >
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>


      <ConfirmDialog
        open={ isLogoutDialogOpen }
        onOpenChange={ setIsLogoutDialogOpen }
        onConfirm={ handleLogout }
        title="Are you sure you want to log out?"
        description="You will be returned to the login page."
        confirmText="Log Out"
        isConfirming={ isLoggingOut }
      />
    </>
  )
}
