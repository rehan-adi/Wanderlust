"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  CodeXml,
  MessageSquare,
  Send,
  Settings,
  CreditCard,
  LayoutDashboard,
  Bot,
  UserCheck,
  FileText,
  Zap,
  Image,
  Mic,
  Sparkles,
  PanelLeftOpen,
  PlusCircle,
  QrCode,
} from "lucide-react";

interface ChatMessage {
  id: number;
  text: string;
  isUser: boolean;
}

interface SidebarProps {
  onNewChat: () => void;
}

function LeftSidebar({ onNewChat }: SidebarProps) {
  const previousChats = [
    { id: 1, title: "Chat about React" },
    { id: 2, title: "AI Basics Discussion" },
    { id: 3, title: "Code Review Session" },
  ];

  return (
    <div className="w-64 h-screen bg-background border-r p-4 flex flex-col fixed left-0 top-0">
      <Button
        variant="outline"
        className="mb-4 w-full justify-start"
        onClick={onNewChat}
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        New Chat
      </Button>
      <div className="flex-grow overflow-y-auto">
        {previousChats.map((chat) => (
          <Button
            key={chat.id}
            variant="ghost"
            className="w-full justify-start mb-2"
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            {chat.title}
          </Button>
        ))}
      </div>
    </div>
  );
}

function RightSidebar() {
  return (
    <div className="w-64 h-screen bg-background border-l p-4 flex flex-col fixed right-0 top-0">
      <Button variant="outline" className="gap-2 w-full justify-start mb-2">
        <Bot className="w-4 h-4" />
        Characters
      </Button>
      <Button variant="outline" className="gap-2 w-full justify-start mb-2">
        <Settings className="w-4 h-4" />
        Model Settings
      </Button>
      <Button variant="outline" className="gap-2 w-full justify-start mb-2">
        <Zap className="w-4 h-4" />
        AI Assistants
      </Button>
      <Button variant="outline" className="gap-2 w-full justify-start mb-2">
        <Image className="w-4 h-4" />
        Image Generation
      </Button>
      <Button variant="outline" className="gap-2 w-full justify-start mb-2">
        <Mic className="w-4 h-4" />
        Voice Interaction
      </Button>
      <Button variant="outline" className="gap-2 w-full justify-start mb-2">
        <Sparkles className="w-4 h-4" />
        Creative Writing
      </Button>
      <div className="mt-auto">
        <Button variant="outline" className="gap-2 w-full justify-start mb-2">
          <CreditCard className="w-4 h-4" />
          Buy Credits
          <span className="text-xs bg-primary/10 px-2 py-0.5 rounded ml-auto">
            Cheap
          </span>
        </Button>
        <Button variant="outline" className="gap-2 w-full justify-start">
          <LayoutDashboard className="w-4 h-4" />
          Dashboard
          <span className="text-xs bg-primary/10 px-2 py-0.5 rounded ml-auto">
            New
          </span>
        </Button>
      </div>
    </div>
  );
}

export default function Chatpage() {
  const [message, setMessage] = useState("");
  const [isLeftOpen, setIsLeftOpen] = useState(false);
  const [isRightOpen, setIsRightOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatStarted, setChatStarted] = useState(false);

  const features = [
    { title: "Code Generation", icon: <CodeXml className="w-5 h-5" /> },
    { title: "Essay Generation", icon: <FileText className="w-5 h-5" /> },
    { title: "Mentorship", icon: <UserCheck className="w-5 h-5" /> },
    { title: "Question & Answer", icon: <MessageSquare className="w-5 h-5" /> },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now(),
        text: message,
        isUser: true,
      };
      setChatMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage("");

      if (!chatStarted) {
        setChatStarted(true);
      }

      // Simulate AI response
      setTimeout(() => {
        const aiResponse: ChatMessage = {
          id: Date.now() + 1,
          text: "This is a simulated AI response.",
          isUser: false,
        };
        setChatMessages((prevMessages) => [...prevMessages, aiResponse]);
      }, 1000);
    }
  };

  const handleNewChat = () => {
    setChatMessages([]);
    setChatStarted(false);
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left Sidebar */}
      <div className="hidden md:block">
        <LeftSidebar onNewChat={handleNewChat} />
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center px-4 md:px-0">

        {/* Mobile Navigation */}
        <div className="md:hidden fixed top-0 left-0 right-0 border-b py-4 bg-background flex justify-between items-center px-4 z-50">
          <Sheet open={isLeftOpen} onOpenChange={setIsLeftOpen}>
            <SheetTrigger asChild>
              <QrCode size={20} />
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] sm:w-[340px]">
              <div className="py-4">
                <LeftSidebar onNewChat={handleNewChat} />
              </div>
            </SheetContent>
          </Sheet>

          <Sheet open={isRightOpen} onOpenChange={setIsRightOpen}>
            <SheetTrigger asChild>
              <Settings size={20} />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-64"
            >
                <RightSidebar />
            </SheetContent>
          </Sheet>
        </div>

        {/* Chat Content */}
        <div className="w-full max-w-2xl flex flex-col items-center justify-center min-h-screen py-8 md:py-12">
          {!chatStarted && (
            <>
              {/* Header */}
              <div className="text-center mt-14 mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                  Unlock the Power Of AI
                </h1>
                <p className="text-muted-foreground text-sm md:text-base font-semibold">
                  Chat with AI to get answers to your questions.
                </p>
              </div>

              {/* Feature Cards */}
              <div className="grid gap-3 md:px-24 px-5 mb-8 w-full">
                {features.map((feature, index) => (
                  <Card
                    key={index}
                    className="px-4 py-3 hover:bg-accent/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {feature.icon}
                        <span className="font-medium">{feature.title}</span>
                      </div>
                      <Bot className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </Card>
                ))}
              </div>
            </>
          )}

          {/* Chat Messages */}
          <div
            className={`w-full flex-grow overflow-y-auto mb-4 ${
              chatStarted ? "mt-20 md:mt-0" : ""
            }`}
          >
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`mb-2 p-2 rounded-lg ${
                  msg.isUser
                    ? "bg-primary text-primary-foreground ml-auto"
                    : "bg-muted"
                } max-w-[80%] ${msg.isUser ? "text-right" : "text-left"}`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="w-full mt-auto">
            <div className="relative">
              <Input
                className="w-full px-12 py-6 bg-background"
                placeholder="Send a message..."
                value={message}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setMessage(e.target.value)
                }
                onKeyPress={(e: React.KeyboardEvent) => {
                  if (e.key === "Enter") {
                    handleSendMessage();
                  }
                }}
              />
              <button className="absolute bg-transparent left-4 top-1/2 -translate-y-1/2">
                <Bot className="w-5 h-5 text-gray-500" />
              </button>
              <button
                className="absolute bg-transparent right-4 top-1/2 -translate-y-1/2"
                onClick={handleSendMessage}
              >
                <Send className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Right Navigation */}
      <div className="hidden lg:block">
        <RightSidebar />
      </div>
    </div>
  );
}
