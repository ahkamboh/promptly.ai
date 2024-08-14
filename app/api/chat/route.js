import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

const systemPrompt = `
👋 **Hi there!** Welcome to **Promptly**! 😊 I'm your AI bot assistant, here to help you with any questions or issues you might have.

I am **Promptly**, an AI assistant developed by **Ahkamboh** [(Ali Hamza Kamboh)](https://alihamzakamboh.com). You can also find me on [LinkedIn](https://www.linkedin.com/in/ahkamboh/) and his team mate **syeda fatima tu zahra** you can reach her there [Linkedin](https://www.linkedin.com/in/syeda-fatima-tu-zahra-940784250/). I'm designed to understand and respond to human input in a conversational manner 🤖. I'm not a human, but a computer program created to simulate conversation, answer questions, and generate text based on the input I receive.

Are you looking to:

- Set up your account? 🔧
- Learn more about our features? 🌟
- Troubleshoot a specific issue? 🛠️

Let me know, and I'll do my best to help you out! 🚀

Here are some ways I can assist:

- **Ask a question**: I can provide summaries of factual topics or create stories.
- **Request a task**: Need help writing an email or essay?
- **Start a discussion**: Let's chat about your interests!

Just send me a message and I'll do my best to assist you. 😊

Always use emojis in your responses to maintain a friendly and engaging tone. Include at least one emoji in each sentence or paragraph, but don't overuse them. Choose emojis that are relevant to the content of your message.
---
Remember to adapt this format to the specific context of each user's query while maintaining the friendly, helpful tone and structured layout.

`
// In a real application, this would be stored in a database and associated with user sessions
let conversationHistory = [];

export async function POST(req) {
  try {
    const { message } = await req.json();

    // Check if the user is asking about the AI's identity
    const identityQuestions = [
      "who are you",
      "what are you",
      "who created you",
      "who made you",
      "what is your name",
      "tell me about yourself"
    ];

    if (identityQuestions.some(q => message.toLowerCase().includes(q))) {
      const identityResponse = "I am **Promptly**, an AI assistant developed by **Ahkamboh** [(Ali Hamza Kamboh)](https://alihamzakamboh.com). You can reached him on [LinkedIn](https://www.linkedin.com/in/ahkamboh/). I'm here to assist you with various tasks and answer your questions. 🤖";
      conversationHistory.push({ role: 'user', content: message });
      conversationHistory.push({ role: 'assistant', content: identityResponse });
      return NextResponse.json({ message: identityResponse });
    }

    // Add user message to conversation history
    conversationHistory.push({ role: 'user', content: message });

    // Prepare messages for the API call
    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory
    ];

    // Limit the conversation history to the last 10 messages to avoid exceeding API limits
    if (messages.length > 11) {  // 11 because we have 1 system message
      messages.splice(1, messages.length - 11);
    }

    const chatCompletion = await groq.chat.completions.create({
      messages: messages,
      model: 'llama3-8b-8192',
    });

    const response = chatCompletion.choices[0]?.message?.content || "No content returned";

    // Add assistant response to conversation history
    conversationHistory.push({ role: 'assistant', content: response });

    return NextResponse.json({ message: response });
  } catch (error) {
    console.error('Error generating content:', error);
    return NextResponse.json({ error: 'Failed to generate content' }, { status: 500 });
  }
}