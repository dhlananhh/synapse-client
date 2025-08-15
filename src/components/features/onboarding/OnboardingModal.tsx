"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { BrainCircuit, Compass, MessageSquarePlus, Vote } from "lucide-react";

export default function OnboardingModal() {
  const { isOnboardingModalOpen, setIsOnboardingModalOpen } = useAuth();

  const handleGetStarted = () => {
    localStorage.setItem("onboardingComplete", "true");
    setIsOnboardingModalOpen(false);
  };

  return (
    <Dialog open={ isOnboardingModalOpen } onOpenChange={ setIsOnboardingModalOpen }>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="items-center text-center">
          <BrainCircuit className="h-12 w-12 text-primary" />
          <DialogTitle className="text-2xl mt-2">Welcome to Synapse!</DialogTitle>
          <DialogDescription>
            Your new account is ready. Here's a quick guide to get started.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex items-start gap-4">
            <Compass className="h-6 w-6 mt-1 text-primary flex-shrink-0" />
            <div>
              <h4 className="font-semibold">Explore Communities</h4>
              <p className="text-sm text-muted-foreground">Find topics you"re passionate about in different communities (c/...).</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <MessageSquarePlus className="h-6 w-6 mt-1 text-primary flex-shrink-0" />
            <div>
              <h4 className="font-semibold">Contribute to Discussions</h4>
              <p className="text-sm text-muted-foreground">Create posts, share your thoughts in comments, and chat with others.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Vote className="h-6 w-6 mt-1 text-primary flex-shrink-0" />
            <div>
              <h4 className="font-semibold">Vote on Content</h4>
              <p className="text-sm text-muted-foreground">Upvote content you find helpful and interesting to promote it to others.</p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={ handleGetStarted } className="w-full">
            Let"s Go!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
