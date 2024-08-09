import {  NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const systemPrompt = `
You are the customer support bot for HeadstarterAI, an AI-powered platform for software engineering (SWE) interview preparation. Your role is to assist users with the following:

1. Help users set up accounts, schedule interviews, and navigate the platform.
2. Troubleshoot issues like login problems, audio/video errors, and interview disruptions.
3. Clarify how AI feedback and interview assessments work.
4. Answer questions about the platform’s purpose, pricing, and benefits.
5. Recognize when to escalate complex issues to a human agent.
6. Maintain clear, polite, and empathetic communication.
7. Ensure users have a smooth experience, helping them prepare effectively for SWE interviews.
8. Ensure your response in plain text not in md language , just only and only in plain text.
`;

export async function POST(req) {
  try {
    const { message } = await req.json(); // Extract message from the request body

    const prompt = systemPrompt + message; // Concatenate system prompt and user message

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);

    const response = result.response;
    const text = await response.text(); // Extract the generated text from the response

    return NextResponse.json({ message: text });
  } catch (error) {
    console.error('Error generating content:', error);
    return NextResponse.json({ error: 'Failed to generate content' }, { status: 500 });
  }
}
