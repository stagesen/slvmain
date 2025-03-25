import { storage } from "../storage";
import { Message } from "@shared/types";
import { generateAnthropicResponse } from "./anthropic";

// Initial greeting message
const initialGreeting: Message = {
  role: "assistant",
  content: "Hi there! I'm your senior care assistant powered by Anthropic Claude. How can I help you today? I can answer questions about different types of care, financing options, or help you find facilities that match your needs in Colorado.",
  timestamp: new Date()
};

// Create a new AI chat session
export async function createNewAiSession(sessionId: string) {
  const messages = [initialGreeting];
  
  const chat = await storage.createAiChat({
    sessionId,
    userId: null,
    messages: messages as any
  });
  
  return chat;
}

// Process user message and generate a response
export async function handleAiChat(sessionId: string, userMessage: string) {
  // Get existing chat or create a new one
  let chat = await storage.getAiChatBySessionId(sessionId);
  
  if (!chat) {
    chat = await createNewAiSession(sessionId);
  }
  
  // Parse messages from storage
  const messages = chat.messages as unknown as Message[];
  
  // Add user message
  const newUserMessage: Message = {
    role: "user",
    content: userMessage,
    timestamp: new Date()
  };
  
  messages.push(newUserMessage);
  
  // Generate AI response using Anthropic Claude
  const aiResponse = await generateAnthropicResponse(messages, userMessage);
  
  // Add AI response to messages
  const assistantMessage: Message = {
    role: "assistant",
    content: aiResponse.text,
    timestamp: new Date()
  };
  
  messages.push(assistantMessage);
  
  // Update chat with new messages
  await storage.updateAiChatMessages(sessionId, messages);
  
  return {
    message: assistantMessage,
    suggestedFacilities: aiResponse.suggestedFacilities || []
  };
}
