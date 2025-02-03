import { useState, useRef, useEffect } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  useDisclosure,
  Input,
  Avatar,
  Tooltip,
} from "@nextui-org/react";
import { Bot, Send } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { streamResponse, initializeChat, getChatHistory } from '@/appwrite/AssistantService';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'bot';
  content: string;
  timestamp: number;
  isTyping?: boolean;
}

export default function ChatAssistant() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: "bot", 
      content: "Hello! I'm your Career Guidance Expert. How can I help you today?",
      timestamp: Date.now()
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const authStatus = useSelector((state: RootState) => state.auth.status);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      const history = getChatHistory();
      if (history.length > 0) {
        setMessages(history);
      }
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleStreamResponse = async (userMessage: string) => {
    let currentResponse = '';
    const timestamp = Date.now();
    
    // Add user message and initial bot message with typing indicator
    setMessages(prev => [
      ...prev,
      { role: "user", content: userMessage, timestamp },
      { role: "bot", content: '', timestamp: timestamp + 1, isTyping: true }
    ]);
    setIsTyping(true);

    try {
      // Stream the response
      await streamResponse(userMessage, (chunk) => {
        currentResponse += chunk;
        setMessages(prev => [
          ...prev.slice(0, -1),
          { role: "bot", content: currentResponse, timestamp: timestamp + 1, isTyping: true }
        ]);
      });

      // Update final message without typing indicator
      setMessages(prev => [
        ...prev.slice(0, -1),
        { role: "bot", content: currentResponse, timestamp: timestamp + 1 }
      ]);
    } catch (error) {
      setMessages(prev => [
        ...prev.slice(0, -1),
        { 
          role: "bot", 
          content: "I apologize, but I encountered an error. Please try again later.", 
          timestamp: timestamp + 1 
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = async () => {
    if (message.trim() && !isTyping) {
      const userMessage = message.trim();
      setMessage("");
      await handleStreamResponse(userMessage);
    }
  };

  const renderMessage = (msg: Message) => (
    <div className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
      {msg.role === "bot" && (
        <Avatar
          icon={<Bot className="h-4 w-4" />}
          classNames={{
            base: "bg-primary/10 mr-2",
            icon: "text-primary",
          }}
          size="sm"
        />
      )}
      <div
        className={`max-w-[80%] rounded-lg px-4 py-2 ${
          msg.role === "user"
            ? "bg-warning/10 text-warning border border-warning/20"
            : "bg-default-100 text-default-foreground"
        }`}
      >
        {msg.isTyping ? (
          <div className="flex gap-1">
            <span className="animate-bounce">●</span>
            <span className="animate-bounce delay-100">●</span>
            <span className="animate-bounce delay-200">●</span>
          </div>
        ) : (
          <ReactMarkdown
            className="prose prose-sm dark:prose-invert"
            components={{
              a: ({ node, ...props }) => (
                <a {...props} target="_blank" rel="noopener noreferrer" className="text-primary" />
              ),
            }}
          >
            {msg.content}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );

  if (!authStatus) return null;

  return (
    <>
      <Button
        isIconOnly
        className="fixed bottom-4 right-4 h-14 w-14 rounded-full bg-primary/10 backdrop-blur-sm hover:bg-primary/20 transition-colors"
        onPress={() => {
          initializeChat();
          onOpen();
        }}
      >
        <Bot className="h-6 w-6 text-primary" />
      </Button>

      <Drawer
        hideCloseButton
        backdrop="opaque"
        classNames={{
          base: "data-[placement=right]:sm:m-2 data-[placement=left]:sm:m-2 rounded-medium",
          wrapper: "z-[1000]",
        }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="right"
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="absolute top-0 inset-x-0 z-50 flex flex-row gap-2 px-2 py-2 border-b border-default-200/50 justify-between bg-content1/50 backdrop-saturate-150 backdrop-blur-lg">
                <Tooltip content="Close">
                  <Button
                    isIconOnly
                    className="text-default-400"
                    size="sm"
                    variant="light"
                    onPress={onClose}
                  >
                    <svg
                      fill="none"
                      height="20"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="20"
                    >
                      <path d="m13 17 5-5-5-5M6 17l5-5-5-5" />
                    </svg>
                  </Button>
                </Tooltip>
                <div className="flex items-center justify-start gap-2">
                  <Avatar
                    icon={<Bot className="h-5 w-5" />}
                    classNames={{
                      base: "bg-primary/10",
                      icon: "text-primary",
                    }}
                  />
                  <span className="font-medium">Career Assistant</span>
                </div>
              </DrawerHeader>

              <DrawerBody className="pt-16 px-4">
                <div className="flex flex-col gap-4">
                  {messages.map((msg, index) => (
                    <div key={`${msg.timestamp}-${index}`}>{renderMessage(msg)}</div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </DrawerBody>

              <DrawerFooter className="border-t border-default-200/50 bg-content1/50 backdrop-saturate-150 backdrop-blur-lg">
                <div className="flex w-full gap-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask about your tech career path..."
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    disabled={isTyping}
                    endContent={
                      <Button
                        isIconOnly
                        size="sm"
                        variant="flat"
                        className="text-primary"
                        onPress={handleSendMessage}
                        isLoading={isTyping}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    }
                  />
                </div>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}