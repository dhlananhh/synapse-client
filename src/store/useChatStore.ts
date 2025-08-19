import { create } from "zustand";
import { User, Post } from "@/types";
import { mockPosts } from "@/libs/mock-data";

export type Conversation = {
  contact: User;
  messages: {
    id: string;
    text: string;
    senderId: string;
    timestamp: string;
  }[];
};

interface ChatState {
  conversations: Conversation[];
  activeConversation: Conversation | null;
  isChatOpen: boolean;
  openChatWith: (contact: User) => void;
  closeChat: () => void;
  sendMessage: (text: string) => void;
}

const findOrCreateConversation = (state: ChatState, contact: User): Conversation => {
  let convo = state.conversations.find(c => c.contact.id === contact.id);
  if (!convo) {
    convo = {
      contact,
      messages: [
        { id: `msg_auto_${Date.now()}`, text: `You are now connected with ${contact.username}`, senderId: "system", timestamp: new Date().toISOString() }
      ],
    };
  }
  return convo;
};

export const useChatStore = create<ChatState>((set, get) => ({
  conversations: [],
  activeConversation: null,
  isChatOpen: false,

  openChatWith: (contact) => {
    const convo = findOrCreateConversation(get(), contact);
    set(state => ({
      isChatOpen: true,
      activeConversation: convo,
      conversations: state.conversations.find(c => c.contact.id === contact.id)
        ? state.conversations
        : [ ...state.conversations, convo ]
    }));
  },

  closeChat: () => set({ isChatOpen: false, activeConversation: null }),

  sendMessage: (text) => {
    const currentUser = { id: "u3", username: "dev_guru" };
    if (!get().activeConversation || !currentUser) return;

    const newMessage = {
      id: `msg_${Date.now()}`,
      text,
      senderId: currentUser.id,
      timestamp: new Date().toISOString()
    };

    set(state => ({
      conversations: state.conversations.map(convo =>
        convo.contact.id === state.activeConversation?.contact.id
          ? { ...convo, messages: [ ...convo.messages, newMessage ] }
          : convo
      )
    }));

    setTimeout(() => {
      const activeContact = get().activeConversation?.contact;
      if (!activeContact) return;

      const replyMessage = {
        id: `msg_reply_${Date.now()}`,
        text: `This is a simulated reply to "${text.substring(0, 15)}..."`,
        senderId: activeContact.id,
        timestamp: new Date().toISOString()
      };

      set(state => ({
        conversations: state.conversations.map(convo =>
          convo.contact.id === activeContact.id
            ? { ...convo, messages: [ ...convo.messages, replyMessage ] }
            : convo
        )
      }));
    }, 1500);
  },
}));
