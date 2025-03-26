import { useState } from "react";
import { Link } from "wouter";
import { Bot, ArrowRight, CheckCircle, SendHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AIAssistantPreviewProps {
  minimized?: boolean;
}

const AIAssistantPreview = ({ minimized = false }: AIAssistantPreviewProps) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <section id="chat" className={`py-12 md:py-16 ${minimized ? 'bg-gray-50' : 'bg-primary-600 text-white'}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {minimized ? (
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">AI-Powered Care Recommendations</h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Get personalized care suggestions based on your specific needs with our intelligent assistant
              </p>
            </div>
          ) : null}
          
          <div className={`grid grid-cols-1 ${minimized ? 'lg:grid-cols-3' : 'lg:grid-cols-5'} gap-8 items-center`}>
            {!minimized && (
              <div className="lg:col-span-3">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Get Personalized Care Recommendations
                </h2>
                <p className="text-white text-opacity-90 mb-6">
                  Our AI assistant can help you navigate senior care options based on your specific needs, preferences, and budget.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 text-white text-opacity-90 mt-0.5" />
                    <span>Answer a few questions about care needs</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 text-white text-opacity-90 mt-0.5" />
                    <span>Get matched with relevant facilities</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 text-white text-opacity-90 mt-0.5" />
                    <span>Learn about care options in plain language</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 text-white text-opacity-90 mt-0.5" />
                    <span>Connect with local resources in your area</span>
                  </li>
                </ul>
                <Link href="/ai-assistant">
                  <Button variant="secondary" className="px-6 py-3 text-primary-700 hover:bg-gray-100">
                    Chat with Our AI Assistant
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            )}
            
            <div className={minimized ? "lg:col-span-3 mx-auto max-w-md w-full" : "lg:col-span-2"}>
              <div className="bg-white rounded-lg shadow-xl p-4 text-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Care Assistant</h3>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Online</span>
                </div>
                <div className="space-y-3 mb-4">
                  <div className="flex items-start">
                    <div className="bg-primary-100 rounded-lg p-3 max-w-[85%]">
                      <p className="text-primary-800 text-sm">
                        Hi there! I'm your senior care assistant. How can I help you today?
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start justify-end">
                    <div className="bg-gray-100 rounded-lg p-3 max-w-[85%]">
                      <p className="text-gray-800 text-sm">
                        My mom needs memory care in Denver. What should I look for?
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-primary-100 rounded-lg p-3 max-w-[85%]">
                      <p className="text-primary-800 text-sm">
                        For memory care in Denver, look for facilities with secure areas, specialized staff training, and memory-focused activities. Would you like to see some recommended facilities?
                      </p>
                    </div>
                  </div>
                </div>
                <div className="border-t pt-3">
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Ask me anything..."
                      className="flex-1"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                    <Link href="/ai-assistant">
                      <Button 
                        className="p-2"
                        disabled={!inputValue.trim()}
                      >
                        <SendHorizontal className="h-5 w-5" />
                        <span className="sr-only">Send</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              
              {minimized && (
                <div className="text-center mt-6">
                  <Link href="/ai-assistant">
                    <Button className="px-6 py-3">
                      Start a Full Conversation
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAssistantPreview;
