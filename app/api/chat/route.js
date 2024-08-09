/*import { Source_Serif_4 } from 'next/font/google'
import { NextResponse } from 'next/server' // Import NextResponse from Next.js for handling responses
import Gemini from 'gemini' // Import the Gemini library for interacting with the Gemini API

// System prompt for the AI, providing guidelines on how to respond to users
const systemPrompt = `
You are the customer support bot for HeadstarterAI, an AI-powered platform for software engineering (SWE) interview preparation. Your role is to assist users with the following:

1. Help users set up accounts, schedule interviews, and navigate the platform.
2. Troubleshoot issues like login problems, audio/video errors, and interview disruptions.
3. Clarify how AI feedback and interview assessments work.
4. Answer questions about the platform’s purpose, pricing, and benefits.
5. Recognize when to escalate complex issues to a human agent.
6. Maintain clear, polite, and empathetic communication.
7. Ensure users have a smooth experience, helping them prepare effectively for SWE interviews.
`;

// POST function to handle incoming requests

export async function POST(req) {
  const gemini = new Gemini({ apiKey: 'AIzaSyCtYz07r40wfwOOHhpGhjyF6APEK20FAFw' }) // Create a new instance of the Gemini client with your API key
  const data = await req.json() // Parse the JSON body of the incoming request

  // Create a chat completion request to the Gemini API
  const completion = await gemini.chat.completions.create({
    messages: [{ role: 'system', content: systemPrompt }, ...data], // Include the system prompt and user messages
    model: 'gemini-model', // Specify the Gemini model to use
    stream: true, // Enable streaming responses
  })

  // Create a ReadableStream to handle the streaming response
  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder() // Create a TextEncoder to convert strings to Uint8Array
      try {
        // Iterate over the streamed chunks of the response
        for await (const chunk of completion) {
          const content = chunk.choices[0]?.delta?.content // Extract the content from the chunk
          if (content) {
            const text = encoder.encode(content) // Encode the content to Uint8Array
            controller.enqueue(text) // Enqueue the encoded text to the stream
          }
        }
      } catch (err) {
        controller.error(err) // Handle any errors that occur during streaming
      } finally {
        controller.close() // Close the stream when done
      }
    },
  })

  return new NextResponse(stream) // Return the stream as the response
}
*/


/*const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

import { Source_Serif_4 } from 'next/font/google' 
import { NextResponse } from 'next/server' // Import NextResponse for handling responses

// System prompt for Gemini, providing guidelines
const systemPrompt = `
You are the customer support bot for HeadstarterAI, an AI-powered platform for software engineering (SWE) interview preparation. Your role is to assist users with the following:

1. Help users set up accounts, schedule interviews, and navigate the platform.
2. Troubleshoot issues like login problems, audio/video errors, and interview disruptions.
3. Clarify how AI feedback and interview assessments work.
4. Answer questions about the platform’s purpose, pricing, and benefits.
5. Recognize when to escalate complex issues to a human agent.
6. Maintain clear, polite, and empathetic communication.
7. Ensure users have a smooth experience, helping them prepare effectively for SWE interviews.
`;

// POST function to handle incoming requests
export async function POST(req) {
  // No need for OpenAI library or chat completion request

  const data = await req.json(); // Parse the JSON body of the incoming request

  // Create a Gemini request using the system prompt and user message
  const request = {
    prompt: systemPrompt + data.message, // Concatenate system prompt and user message
    temperature: 0.7, // Adjust temperature for desired response style (optional)
    max_tokens: 1024, // Set maximum number of tokens for response (optional)
  };

  // Assuming you have a function to call Gemini (replace with your implementation)
  const response = await callGemini(request);

  // Return the Gemini response as NextResponse
  return new NextResponse(JSON.stringify({ message: response }));
}

// Function to call Gemini (replace with your actual implementation)
async function callGemini(request) {
  // Implement your logic to call the Gemini API with the request object
  // This might involve using a library or making a direct API call
  // Replace with your specific implementation details
  const geminiResponse = await fetch('https://your-gemini-endpoint', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });

  const responseData = await geminiResponse.json();
  return responseData.choices[0].text; // Extract the generated text from the response
}
*/


import { NextRequest, NextResponse } from 'next/server';
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


































/*import { Source_Serif_4 } from 'next/font/google'
import {NextResponse} from 'next/server' // Import NextResponse from Next.js for handling responses
import OpenAI from 'openai' // Import OpenAI library for interacting with the OpenAI API

// System prompt for the AI, providing guidelines on how to respond to users
const systemPrompt = `
You are the customer support bot for HeadstarterAI, an AI-powered platform for software engineering (SWE) interview preparation. Your role is to assist users with the following:

1. Help users set up accounts, schedule interviews, and navigate the platform.
2. Troubleshoot issues like login problems, audio/video errors, and interview disruptions.
3. Clarify how AI feedback and interview assessments work.
4. Answer questions about the platform’s purpose, pricing, and benefits.
5. Recognize when to escalate complex issues to a human agent.
6. Maintain clear, polite, and empathetic communication.
7. Ensure users have a smooth experience, helping them prepare effectively for SWE interviews.
`;

// POST function to handle incoming requests

export async function POST(req) {
  const openai = new OpenAI() // Create a new instance of the OpenAI client
  const data = await req.json() // Parse the JSON body of the incoming request

  // Create a chat completion request to the OpenAI API
  const completion = await openai.chat.completions.create({
    messages: [{role: 'system', content: systemPrompt}, ...data], // Include the system prompt and user messages
    model: 'gpt-3.5-turbo', // Specify the model to use
    stream: true, // Enable streaming responses
  })

  // Create a ReadableStream to handle the streaming response
  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder() // Create a TextEncoder to convert strings to Uint8Array
      try {
        // Iterate over the streamed chunks of the response
        for await (const chunk of completion) {
          const content = chunk.choices[0]?.delta?.content // Extract the content from the chunk
          if (content) {
            const text = encoder.encode(content) // Encode the content to Uint8Array
            controller.enqueue(text) // Enqueue the encoded text to the stream
          }
        }
      } catch (err) {
        controller.error(err) // Handle any errors that occur during streaming
      } finally {
        controller.close() // Close the stream when done
      }
    },
  })

  return new NextResponse(stream) // Return the stream as the response
}*/