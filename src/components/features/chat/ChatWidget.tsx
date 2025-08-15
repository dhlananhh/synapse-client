"use client";

import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useChatStore } from "@/store/useChatStore";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { X, MessageSquare, Send } from "lucide-react";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { format } from "date-fns";


export default function ChatWidget() {
  const { currentUser } = useAuth();
  const { isChatOpen, activeConversation, closeChat, sendMessage } = useChatStore();
  const messageEndRef = useRef<HTMLDivElement>(null);
  const [ messageText, setMessageText ] = useState("");

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [ activeConversation?.messages ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageText.trim()) {
      sendMessage(messageText.trim());
      setMessageText("");
    }
  }

  if (!isChatOpen || !activeConversation || !currentUser) return null;

  return (
    <Card className="fixed bottom-4 right-4 z-50 w-full max-w-sm flex flex-col h-[60vh] max-h-[500px]">
      <CardHeader className="flex flex-row items-center justify-between p-3 border-b">
        <div className="flex items-center gap-2">
          <UserAvatar user={ activeConversation.contact } />
          <p className="font-bold">{ activeConversation.contact.username }</p>
        </div>
        <Button variant="ghost" size="icon" onClick={ closeChat }>
          <X className="h-5 w-5" />
        </Button>
      </CardHeader>

      <CardContent className="p-3 flex-grow overflow-y-auto">
        <div className="space-y-4">
          {
            activeConversation.messages.map(msg => (
              <div key={ msg.id } className={ cn(
                "flex items-end gap-2 text-sm",
                msg.senderId === currentUser.id ? "justify-end" : "justify-start"
              ) }>
                {
                  msg.senderId !== currentUser.id && (
                    <UserAvatar user={ activeConversation.contact } className="h-6 w-6" />
                  )
                }
                <div className={ cn(
                  "p-2 rounded-lg max-w-[75%]",
                  msg.senderId === currentUser.id ? "bg-primary text-primary-foreground" : "bg-muted"
                ) }>
                  <p>{ msg.text }</p>
                </div>
              </div>
            ))
          }
        </div>
        <div ref={ messageEndRef } />
      </CardContent>

      <div className="p-3 border-t">
        <form onSubmit={ handleSendMessage } className="flex items-center gap-2">
          <Textarea
            value={ messageText }
            onChange={ (e) => setMessageText(e.target.value) }
            placeholder="Type a message..."
            rows={ 1 }
            className="resize-none"
          />
          <Button type="submit" size="icon">
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </Card>
  )
}
