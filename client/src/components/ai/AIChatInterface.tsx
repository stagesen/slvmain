import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Bot, User, Send, Loader2, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Message } from "@shared/types";
import { Facility } from "@shared/types";
import FacilityCard from "@/components/facilities/FacilityCard";

interface AIChatProps {
  sessionId?: string;
}

const AIChatInterface = ({ sessionId: initialSessionId }: AIChatProps) => {
  const [sessionId, setSessionId] = useState<string | undefined>(initialSessionId);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedFacilities, setSuggestedFacilities] = useState<Facility[]>([]);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Quick prompt suggestions
  const quickPrompts = [
    "What's the difference between assisted living and memory care?",
    "How much does senior care cost in Denver?",
    "What should I look for when touring a facility?",
    "Does Medicare cover long-term care?",
  ];

  // Initialize chat session
  useEffect(() => {
    const initializeChat = async () => {
      try {
        setIsLoading(true);
        
        // If no session ID was provided, create a new session
        if (!sessionId) {
          const response = await apiRequest("GET", "/api/ai/session");
          const data = await response.json();
          setSessionId(data.sessionId);
          setMessages(data.messages as Message[]);
        } 
        // Otherwise, fetch the existing session
        else {
          const response = await apiRequest("GET", `/api/ai/session/${sessionId}`);
          const data = await response.json();
          setMessages(data.messages as Message[]);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to initialize chat. Please try again.",
          variant: "destructive",
        });
        console.error("Error initializing chat:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeChat();
  }, [sessionId, toast]);

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !sessionId) return;

    const userMessage: Message = {
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await apiRequest("POST", "/api/ai/chat", {
        sessionId,
        message: userMessage.content,
      });
      
      const data = await response.json();
      setMessages((prev) => [...prev, data.message]);
      
      if (data.suggestedFacilities && data.suggestedFacilities.length > 0) {
        setSuggestedFacilities(data.suggestedFacilities);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    setInputValue(prompt);
  };

  return (
    <div className="flex flex-col h-[80vh] max-h-[800px]">
      <Card className="flex flex-col h-full">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bot className="h-6 w-6 mr-2 text-primary-600" />
            Senior Care AI Assistant
          </CardTitle>
          <CardDescription>
            Ask questions about senior care options, costs, or specific concerns
          </CardDescription>
        </CardHeader>
        
        <CardContent className="flex-grow overflow-y-auto mb-4 space-y-4">
          {messages.length > 0 ? (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex items-start max-w-[80%] ${
                      message.role === "user"
                        ? "bg-primary-100 text-primary-800"
                        : "bg-gray-100 text-gray-800"
                    } rounded-lg p-3`}
                  >
                    <div className="mt-1 mr-2">
                      {message.role === "user" ? (
                        <User className="h-5 w-5 text-primary-600" />
                      ) : (
                        <Bot className="h-5 w-5 text-gray-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Suggested Facilities */}
              {suggestedFacilities.length > 0 && (
                <div className="mt-4 mb-2">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Recommended Facilities:
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    {suggestedFacilities.map((facility) => (
                      <FacilityCard key={facility.id} facility={facility} />
                    ))}
                  </div>
                </div>
              )}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-3 flex items-center">
                    <Loader2 className="h-5 w-5 text-gray-600 animate-spin mr-2" />
                    <p className="text-sm text-gray-600">Thinking...</p>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          ) : isLoading ? (
            <div className="flex justify-center items-center h-full">
              <Loader2 className="h-8 w-8 text-primary-600 animate-spin" />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 space-y-4">
              <Bot className="h-16 w-16 text-primary-200" />
              <h3 className="text-xl font-medium">How can I help you today?</h3>
              <p>Ask me questions about senior care options, pricing, or specific concerns.</p>
            </div>
          )}
        </CardContent>
        
        {/* Quick Prompts */}
        <div className="px-6 mb-4">
          <div className="flex flex-wrap gap-2">
            {quickPrompts.map((prompt, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => handleQuickPrompt(prompt)}
              >
                <Lightbulb className="h-3 w-3 mr-1" />
                {prompt}
              </Button>
            ))}
          </div>
        </div>
        
        <CardFooter className="border-t pt-4">
          <div className="flex w-full gap-2">
            <Input
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              className="flex-grow"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AIChatInterface;
