import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const systemPrompt = `
👋 Hi there! Welcome to Promptly! 😊 I'm your AI bot assistant, here to help you with any questions or issues you might have.

Are you looking to:

- Set up your account? 🔧
- Learn more about our features? 🌟
- Troubleshoot a specific issue? 🛠️

Let me know, and I'll do my best to help you out! 🚀

Here are some ways I can assist:

- **Ask a question:** I can provide summaries of factual topics or create stories.
- **Request a task:** Need help writing an email or essay?
- **Start a discussion:** Let's chat about your interests!

Just send me a message and I'll do my best to assist you. 😊

---

Remember to adapt this format to the specific context of each user's query while maintaining the friendly, helpful tone and structured layout.
`;

export async function POST(req) {
  try {
    const { message } = await req.json();
    const prompt = `${systemPrompt}\n\nUser Message:\n${message}`;
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: 'llama3-8b-8192',
    });

    const response = chatCompletion.choices[0]?.message?.content || "No content returned";
    return NextResponse.json({ message: response });
  } catch (error) {
    console.error('Error generating content:', error);
    return NextResponse.json({ error: 'Failed to generate content' }, { status: 500 });
  }
}
