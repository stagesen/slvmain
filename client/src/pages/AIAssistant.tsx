import { useEffect, useState } from "react";
import { useLocation, useParams } from "wouter";
import { v4 as uuidv4 } from "uuid";
import { Bot, BrainCircuit, Cpu, LightbulbIcon, Loader2 } from "lucide-react";
import AIChatInterface from "@/components/ai/AIChatInterface";

const AIAssistant = () => {
  const [sessionId, setSessionId] = useState<string>();
  const [location, setLocation] = useLocation();
  const params = new URLSearchParams(location.split("?")[1]);
  const urlSessionId = params.get("session");

  // Initialize session ID from URL or create a new one
  useEffect(() => {
    if (urlSessionId) {
      setSessionId(urlSessionId);
    } else {
      // Generate a new session ID
      const newSessionId = uuidv4();
      setSessionId(newSessionId);
      
      // Update URL with the session ID
      setLocation(`/ai-assistant?session=${newSessionId}`, { replace: true });
    }
  }, [urlSessionId, setLocation]);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 flex items-center">
            <Bot className="h-8 w-8 text-primary-600 mr-2" />
            AI Care Assistant
          </h1>
          <p className="text-gray-600">
            Get personalized guidance on senior care options, costs, and recommendations
            for facilities that match your specific needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {sessionId ? (
              <AIChatInterface sessionId={sessionId} />
            ) : (
              <div className="flex justify-center items-center h-[50vh]">
                <Loader2 className="h-12 w-12 text-primary-600 animate-spin" />
              </div>
            )}
          </div>

          <div className="space-y-6">
            {/* How It Works */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <LightbulbIcon className="h-5 w-5 text-primary-600 mr-2" />
                How It Works
              </h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="bg-primary-100 text-primary-800 rounded-full h-5 w-5 flex items-center justify-center text-xs font-semibold mr-2 mt-0.5">1</span>
                  <span>Ask questions about senior care options and requirements</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary-100 text-primary-800 rounded-full h-5 w-5 flex items-center justify-center text-xs font-semibold mr-2 mt-0.5">2</span>
                  <span>Get personalized recommendations based on your needs</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary-100 text-primary-800 rounded-full h-5 w-5 flex items-center justify-center text-xs font-semibold mr-2 mt-0.5">3</span>
                  <span>Explore suggested facilities and resources</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary-100 text-primary-800 rounded-full h-5 w-5 flex items-center justify-center text-xs font-semibold mr-2 mt-0.5">4</span>
                  <span>Save your conversation to continue later</span>
                </li>
              </ul>
            </div>

            {/* Sample Questions */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <BrainCircuit className="h-5 w-5 text-primary-600 mr-2" />
                Sample Questions
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>"What's the difference between assisted living and memory care?"</li>
                <li>"How much does senior care typically cost in Denver?"</li>
                <li>"What should I look for when visiting a facility?"</li>
                <li>"Does Medicare cover long-term care expenses?"</li>
                <li>"What are the signs that my parent needs memory care?"</li>
                <li>"Can you recommend facilities in Boulder for someone with mobility issues?"</li>
              </ul>
            </div>

            {/* Privacy Note */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <Cpu className="h-5 w-5 text-primary-600 mr-2" />
                Privacy Note
              </h3>
              <p className="text-sm text-gray-600">
                Conversations with our AI assistant are saved to provide personalized recommendations.
                We don't share your conversation data with third parties.
                Your session ID allows you to continue your conversation later.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
