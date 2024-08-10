// app/api/generate/route.js

import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

// Initialize GROQ with your API key
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Define the system prompt
const systemPrompt = `
You are the customer support bot for HeadstarterAI, an AI-powered platform for software engineering (SWE) interview preparation. Your role is to assist users with the following:

1. Help users set up accounts, schedule interviews, and navigate the platform.
2. Troubleshoot issues like login problems, audio/video errors, and interview disruptions.
3. Clarify how AI feedback and interview assessments work.
4. Answer questions about the platform’s purpose, pricing, and benefits.
5. Recognize when to escalate complex issues to a human agent.
6. Maintain clear, polite, and empathetic communication.
7. Ensure users have a smooth experience, helping them prepare effectively for SWE interviews.
8. Ensure your response in plain text not in md language, just only and only in plain text.
`;

export async function POST(req) {
  try {
    // Extract message from the request body
    const { message } = await req.json();

    // Concatenate system prompt and user message
    const prompt = systemPrompt + message;

    // Generate content using GROQ's chat completions
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: 'llama3-8b-8192', // Ensure this model ID is correct for GROQ
    });

    // Extract and return the generated text
    const response = chatCompletion.choices[0]?.message?.content || "No content returned";

    return NextResponse.json({ message: response });
  } catch (error) {
    console.error('Error generating content:', error);
    return NextResponse.json({ error: 'Failed to generate content' }, { status: 500 });
  }
}
