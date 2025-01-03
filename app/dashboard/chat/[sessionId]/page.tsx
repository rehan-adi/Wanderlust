"use client";

import axios from "axios";
import Link from "next/link";
import { toast } from "sonner";
import Image from "next/image";
import "tailwindcss/tailwind.css";
import ReactMarkdown from "react-markdown";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Send,
  Settings,
  CreditCard,
  LayoutDashboard,
  Loader2,
  PlusCircle,
  BrainCircuit,
  Sparkles,
  ImageIcon,
  Zap,
  Bot,
  QrCode,
  Check,
  Copy,
} from "lucide-react";

interface ChatHistory {
  prompt: string;
  message: string;
  createdAt: string;
}

interface ChatMessage {
  id: number;
  sessionId?: string;
  model?: string;
  text?: string;
  content: string;
  isUser: boolean;
}

function LeftSidebar({ onNewChat }: { onNewChat: () => void }) {
  const router = useRouter();

  const [chatHistory, setChatHistory] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getChatHistory();
  }, []);

  const getChatHistory = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/chat/get-sessions");
      setChatHistory(response.data.sessions);
    } catch (error) {
      console.log("Failed to get chat history:", error);
    } finally {
      setLoading(false);
    }
  };

  const getHistory = async (sessionId: string) => {
    router.push(`/dashboard/chat/${sessionId}`);
  };

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
        <div className="px-4">
          <div className="text-black font-semibold mb-4 mt-6">Recent Chats</div>
          <div className="space-y-2">
            {loading ? (
              <div className="flex justify-center items-center h-14">
                <Loader2 className="animate-spin h-4 w-4" />
              </div>
            ) : (
              <>
                {chatHistory.map((chat: any) => (
                  <Button
                    key={chat.id}
                    variant="outline"
                    className="w-full py-5 justify-start"
                    onClick={() => getHistory(chat.id)}
                  >
                    <div className="truncate max-w-full">
                      {chat.chatHistory?.[0]?.prompt || "Untitled Chat"}
                    </div>
                  </Button>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function RightSidebar() {
  const { data: session } = useSession();

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
              className="rounded-full"
            />
          </div>
        ) : (
          <div className="flex justify-end px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 36 36"
              fill="none"
              width="40"
              height="40"
            >
              <circle cx="18" cy="18" r="18" fill="#3c46ff"></circle>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="m7.358 14.641 5.056-5.055A2 2 0 0 1 13.828 9h8.343a2 2 0 0 1 1.414.586l5.056 5.055a2 2 0 0 1 .055 2.771l-9.226 9.996a2 2 0 0 1-2.94 0l-9.227-9.996a2 2 0 0 1 .055-2.77Zm6.86-1.939-.426 1.281a2.07 2.07 0 0 1-1.31 1.31l-1.28.426a.296.296 0 0 0 0 .561l1.28.428a2.07 2.07 0 0 1 1.31 1.309l.427 1.28c.09.27.471.27.56 0l.428-1.28a2.07 2.07 0 0 1 1.309-1.31l1.281-.427a.296.296 0 0 0 0-.56l-1.281-.428a2.07 2.07 0 0 1-1.309-1.309l-.427-1.28a.296.296 0 0 0-.561 0z"
                fill="#fff"
              ></path>
            </svg>
          </div>
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

function ChatHistory() {
  const { sessionId } = useParams();
  const { data: session } = useSession();
  const router = useRouter();

  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [chatSessionId, setChatSessionId] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [chatStarted, setChatStarted] = useState(false);
  const [chatLoading, setChatLoading] = useState<boolean>(false);
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const [isLeftOpen, setIsLeftOpen] = useState(false);
  const [isRightOpen, setIsRightOpen] = useState(false);

  useEffect(() => {
    if (!sessionId) return;

    const fetchChatHistory = async () => {
      setChatLoading(true);
      try {
        const response = await axios.get(
          `/api/chat/get-chat-history?sessionId=${sessionId}`
        );
        setChatHistory(response.data.chatHistory);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      } finally {
        setChatLoading(false);
      }
    };

    fetchChatHistory();
  }, [sessionId]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      text: message,
      content: message,
      isUser: true,
    };

    setChatMessages((prevMessages) => [...prevMessages, userMessage]);
    setMessage("");
    setLoading(true);

    if (!chatStarted) {
      setChatStarted(true);
    }

    try {
      const response = await axios.post("/api/chat/send-message", {
        prompt: userMessage.text,
        chatSessionId: sessionId,
      });

      if (response.status == 201) {
        const Response: ChatMessage = {
          id: Date.now() + 1,
          model: "Flash",
          content: response.data.aiResponse || "No response received.",
          isUser: false,
        };

        setChatMessages((prevMessages) => [...prevMessages, Response]);
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      const errorMessage: ChatMessage = {
        id: Date.now() + 2,
        text: "Sorry, there was an error processing your request. Please try again later.",
        content:
          "Sorry, there was an error processing your request. Please try again later.",
        isUser: false,
      };
      setChatMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleNewChat = async () => {
    setChatMessages([]);
    setChatStarted(false);
    try {
      const response = await axios.post("/api/chat/create-session");
      if (response.status == 201) {
        setChatSessionId(response.data.sessionId);
        localStorage.setItem("sessionId", response.data.sessionId);
        router.push("/dashboard/chat");
        toast.success("New chat session created successfully!");
      }
    } catch (error) {
      console.log("Failed to create new chat:", error);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left Sidebar */}
      <div className="hidden md:block">
        <LeftSidebar onNewChat={handleNewChat} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
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

        <main className="flex-1 overflow-auto p-6">
          {chatLoading ? (
            <div className="max-w-2xl mx-auto py-4 mb-[80px] space-y-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="space-y-6 animate-pulse">
                  {/* User's Prompt Skeleton */}
                  <div className="flex items-start flex-col justify-center gap-2">
                    <div className="flex items-center mb-2 gap-4">
                      <div className="w-9 h-9 bg-gray-300 rounded-full"></div>
                      <div className="w-16 h-5 bg-gray-300 rounded"></div>
                    </div>
                    <div className="bg-gray-200 p-3 ml-7 rounded-xl shadow-md w-3/4 h-12"></div>
                  </div>

                  {/* AI's Message Skeleton */}
                  <div className="flex flex-col py-3 items-start">
                    <div className="flex justify-center items-center gap-4">
                      <div className="flex justify-center items-center gap-4">
                        <div className="flex items-center border border-black border-opacity-25 rounded-full p-2 mb-2">
                          <BrainCircuit size={21} />
                        </div>
                        <span className="text-base text-black font-bold mb-1">
                          Flash
                        </span>
                      </div>
                    </div>
                    <div className="bg-gray-200 mt-3 ml-7 rounded-xl shadow-md w-3/4 h-20"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="max-w-2xl mx-auto py-4 mb-[80px] md:mt-0 mt-10 space-y-6">
              {chatHistory.length > 0 ? (
                chatHistory.map((chat, index) => (
                  <div key={index} className="space-y-6">
                    {/* User's Prompt */}
                    <div className="flex flex-col items-start gap-2">
                      <div className="flex items-center justify-start gap-4 mb-2">
                        {session?.user?.image && (
                          <div className="flex justify-start">
                            <Image
                              src={session.user.image}
                              alt="User Avatar"
                              width={35}
                              height={35}
                              blurDataURL="data:..."
                              placeholder="blur"
                              className="rounded-full"
                            />
                          </div>
                        )}
                        {session?.user?.name && (
                          <div className="font-bold text-black text-base">
                            {session.user.name}
                          </div>
                        )}
                      </div>
                      <div className="bg-gray-100 p-3 ml-7 rounded-xl shadow-md text-black font-medium max-w-xl">
                        <ReactMarkdown>{chat.prompt}</ReactMarkdown>
                      </div>
                    </div>

                    {/* AI's Message */}

                    <div className="flex flex-col py-3 items-start max-w-[95%]">
                      <div className="flex justify-center items-center gap-4">
                        <div className="flex items-center border border-black border-opacity-25 rounded-full p-2 mb-2">
                          <BrainCircuit size={21} />
                        </div>
                        <span className="text-base text-black font-bold mb-1">
                          Flash
                        </span>
                      </div>
                      <div className="text-black font-medium mt-3 ml-7">
                        <ReactMarkdown
                          className="prose max-w-xl leading-relaxed space-y-4"
                          components={{
                            code({
                              node,
                              inline,
                              className,
                              children,
                              ...props
                            }: any) {
                              const match = /language-(\w+)/.exec(
                                className || ""
                              );
                              const codeContent = String(children).replace(
                                /\n$/,
                                ""
                              );
                              return !inline && match ? (
                                <div className="relative group">
                                  <button
                                    className="absolute right-1 top-1 bg-gray-100 text-black text-xs font-medium px-2 py-1 rounded border"
                                    onClick={() => handleCopy(codeContent)}
                                  >
                                    {copied ? (
                                      <>
                                        <Check
                                          size={13}
                                          className="inline-block text-black mr-0.5"
                                        />{" "}
                                        Copied!
                                      </>
                                    ) : (
                                      <>
                                        <Copy
                                          size={12}
                                          className="inline-block mr-0.5"
                                        />{" "}
                                        Copy code
                                      </>
                                    )}
                                  </button>
                                  <SyntaxHighlighter
                                    language={match[1]}
                                    PreTag="div"
                                    style={atomDark}
                                  >
                                    {codeContent}
                                  </SyntaxHighlighter>
                                </div>
                              ) : (
                                <code className={className} {...props}>
                                  {children}
                                </code>
                              );
                            },
                          }}
                        >
                          {chat.message}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground">
                  No chat history available for this session.
                </p>
              )}
            </div>
          )}
        </main>

        <div className="fixed py-4 w-full bottom-0 bg-white flex justify-center items-center">
          <div className="relative md:w-[666px] w-[90vw]">
            <div className="relative w-full max-w-2xl">
              <Textarea
                className="min-h-[40px] pr-20 text-black font-medium pl-12 py-2 resize-none"
                placeholder="Send a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <Bot className="absolute left-4 top-3 h-5 w-5" />
              <button
                className="absolute right-4 top-2.5 bg-transparent p-1 rounded-sm transition-colors hover:bg-muted"
                onClick={handleSendMessage}
                disabled={loading || !message.trim()}
              >
                {loading ? (
                  <Loader2 className="animate-spin h-5 w-5" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="hidden lg:block">
        <RightSidebar />
      </div>
    </div>
  );
}

export default ChatHistory;
