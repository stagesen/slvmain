import Anthropic from '@anthropic-ai/sdk';
import { ServiceType } from '@shared/schema';
import { storage } from '../storage';

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// the newest Anthropic model is "claude-3-7-sonnet-20250219" which was released February 24, 2025
const MODEL = "claude-3-7-sonnet-20250219";

// System prompt for the AI assistant
const SYSTEM_PROMPT = `You are a knowledgeable senior care assistant for SeniorLivingColorado, a platform that helps seniors and their families find appropriate care facilities across Colorado's Front Range.

Your role is to:
1. Answer questions about different types of senior care (Assisted Living, Memory Care, Nursing Homes, etc.)
2. Provide information about costs, insurance coverage, and financial assistance options
3. Suggest appropriate care options based on the user's described needs
4. Help users understand what to look for when evaluating facilities
5. Provide empathetic guidance throughout the senior care search process

When suggesting facilities, focus on Colorado locations, especially along the Front Range (Denver, Boulder, Fort Collins, Colorado Springs, etc.).

Always be empathetic, patient, and understanding - this is a difficult and emotional process for many families.`;

// Function to generate AI response using Anthropic Claude
export async function generateAnthropicResponse(messageHistory: any[], userMessage: string) {
  try {
    // Format message history for Anthropic's API
    const formattedMessages = messageHistory.map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    // Add the latest user message
    formattedMessages.push({
      role: 'user',
      content: userMessage
    });

    // Call Anthropic API
    const response = await anthropic.messages.create({
      model: MODEL,
      system: SYSTEM_PROMPT,
      messages: formattedMessages,
      max_tokens: 1024,
    });

    // Extract response content
    const assistantResponse = response.content[0].text;
    
    // Look for potential facility recommendations based on the conversation
    let suggestedFacilities: any[] = [];
    
    // Check for service type mentions to suggest relevant facilities
    const serviceTypes = [
      { type: ServiceType.ASSISTED_LIVING, keywords: ['assisted living'] },
      { type: ServiceType.MEMORY_CARE, keywords: ['memory care', 'alzheimer', 'dementia'] },
      { type: ServiceType.NURSING_HOME, keywords: ['nursing home', 'skilled nursing'] },
      { type: ServiceType.INDEPENDENT_LIVING, keywords: ['independent living'] }
    ];
    
    // Check which service types are mentioned in the conversation
    const messageLower = userMessage.toLowerCase();
    for (const serviceTypeInfo of serviceTypes) {
      if (serviceTypeInfo.keywords.some(keyword => messageLower.includes(keyword))) {
        // Get facilities of this type
        const facilities = await storage.getFacilities({ serviceType: serviceTypeInfo.type, limit: 3 });
        suggestedFacilities = facilities;
        break;
      }
    }
    
    // Check for city mentions if no service type matches were found
    if (suggestedFacilities.length === 0) {
      const cities = ['Denver', 'Boulder', 'Colorado Springs', 'Fort Collins', 'Aurora'];
      for (const city of cities) {
        if (messageLower.includes(city.toLowerCase())) {
          const facilities = await storage.getFacilities({ city, limit: 3 });
          suggestedFacilities = facilities;
          break;
        }
      }
    }

    return {
      text: assistantResponse,
      suggestedFacilities: suggestedFacilities
    };
  } catch (error) {
    console.error('Error generating Anthropic response:', error);
    return {
      text: "I'm sorry, I'm having trouble connecting to my knowledge base right now. Please try again in a moment, or contact our support team for assistance.",
      suggestedFacilities: []
    };
  }
}