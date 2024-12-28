"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useSession } from "next-auth/react";
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
  Image as ImageIcon,
  Sparkles,
  PlusCircle,
  QrCode,
  BrainCircuit,
} from "lucide-react";

interface ChatMessage {
  id: number;
  model: string;
  text: string;
  isUser: boolean;
}

interface SidebarProps {
  onNewChat: () => void;
}

function LeftSidebar({ onNewChat }: SidebarProps) {
  return (
    <>
      <div className="w-64 h-screen bg-background border-r z-50 flex flex-col fixed left-0 top-0">
        <div className="flex items-center border-b py-4 mb-6 justify-center">
          <Link
            href="/"
            className="flex justify-center font-secondary text-xl items-center gap-3"
          >
            <BrainCircuit size={25} />
            <span className="mt-1">Wanderlust AI</span>
          </Link>
        </div>
        <div className="px-4">
          <Button
            variant="outline"
            className="mb-4 w-full py-5 justify-start"
            onClick={onNewChat}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            New Chat
          </Button>
        </div>
      </div>
    </>
  );
}

function RightSidebar() {
  const { data: session, status } = useSession();

  return (
    <div className="w-64 h-screen bg-background border-l z-50 flex flex-col fixed right-0 top-0">
      <div className="border-b py-3 mb-6">
        {session?.user?.image ? (
          <div className="flex justify-end px-4">
            <Image
              src={session.user.image}
              alt="User Avatar"
              width={40}
              height={40}
              blurDataURL="data:..."
              placeholder="blur"
              className="rounded-full cursor-pointer"
            />
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="px-4">
        <Button
          variant="outline"
          className="gap-2 py-5 w-full justify-start mb-2"
        >
          <Bot className="w-4 h-4" />
          Characters
          <span className="text-xs bg-primary/10 px-2 py-0.5 rounded ml-auto">
            Comming
          </span>
        </Button>
        <Link href="/settings">
          <Button
            variant="outline"
            className="gap-2 py-5 w-full justify-start mb-2"
          >
            <Settings className="w-4 h-4" />
            Settings
          </Button>
        </Link>
        <Link href="/dashboard">
          <Button
            variant="outline"
            className="gap-2 py-5 w-full justify-start mb-2"
          >
            <Zap className="w-4 h-4" />
            AI Assistants
          </Button>
        </Link>
        <Link href="/dashboard/generate">
          <Button
            variant="outline"
            className="gap-2 py-5 w-full justify-start mb-2"
          >
            <ImageIcon className="w-4 h-4" />
            Image Generation
          </Button>
        </Link>
        <Button
          variant="outline"
          className="gap-2 py-5 w-full justify-start mb-2"
        >
          <Sparkles className="w-4 h-4" />
          Creative Writing
        </Button>
        <div className="md:mt-[250px] mt-[225px]">
          <Link href="/pricing">
            <Button
              variant="outline"
              className="gap-2 py-5 w-full justify-start mb-2"
            >
              <CreditCard className="w-4 h-4" />
              Pricing
              <span className="text-xs bg-primary/10 px-2 py-0.5 rounded ml-auto">
                Cheap
              </span>
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button
              variant="outline"
              className="gap-2 py-5 w-full justify-start"
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Button>
          </Link>
        </div>
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
        model: "Flask",
        isUser: true,
      };
      setChatMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage("");

      if (!chatStarted) {
        setChatStarted(true);
      }

      setTimeout(() => {
        const aiResponse: ChatMessage = {
          id: Date.now() + 1,
          model: "Flash",
          text: "This is a simulated AI response from flux Ai, that can build any project you want in a one prompt and a one click ",
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
            <SheetContent side="left" className="w-64">
              <div className="py-4">
                <LeftSidebar onNewChat={handleNewChat} />
              </div>
            </SheetContent>
          </Sheet>

          <Sheet open={isRightOpen} onOpenChange={setIsRightOpen}>
            <SheetTrigger asChild>
              <Settings size={20} />
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
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
              chatStarted ? "mt-10 mb-20 md:mt-0" : ""
            }`}
          >
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-center mb-4 ${
                  msg.isUser ? "justify-end" : "justify-start"
                }`}
              >
                {/* AI Bot Avatar, Model Name, and Message */}
                {!msg.isUser && (
                  <div className="flex flex-col items-start">
                    <div className="flex justify-center items-center gap-4">
                      <div className="flex items-center mb-2">
                        <Image
                          src="/images/man.png"
                          alt="AI Bot"
                          width={35}
                          height={35}
                          className="rounded-full"
                        />
                      </div>
                      {msg.model && (
                        <span className="text-base text-gray-700 font-bold mb-1">
                          {msg.model}
                        </span>
                      )}
                    </div>
                    <div className="text-black mt-3 font-semibold">
                      {msg.text}
                    </div>
                  </div>
                )}

                {/* User Message */}
                {msg.isUser && (
                  <div className="p-3 bg-blue-500 text-white rounded-lg font-semibold max-w-[80%] ml-auto">
                    {msg.text}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="fixed py-4 w-full bottom-0 bg-white flex justify-center items-center">
            <div className="relative md:w-[666px] w-[90vw]">
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
