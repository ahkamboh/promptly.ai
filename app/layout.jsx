import { Inter } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { neobrutalism } from "@clerk/themes";
import 'clerk-themez/themes/cosmicflux.css';
const inter = Inter({ subsets: ['latin'] });

const imageUrl = 'https://chatbot.design/images/chatbot/DIGITAL%20%28RGB%29/PNG/Contained_Mark_Blue.png';  // Update this URL if necessary

export const metadata = {
  title: {
    default: 'Promptly.ai | Transform Your Ideas into Action',
    template: '%s | Promptly.ai'
  },
  description: 'Transform Your Ideas into Action with Intelligent Prompt Generation',
  keywords: 'prompt generation, AI, software development, digital innovation',
  openGraph: {
    title: 'Promptly.ai | Transform Your Ideas into Action',
    description: 'Transform Your Ideas into Action with Intelligent Prompt Generation',
    url: 'https://ai-chatbot-blond-three.vercel.app/',  // Update this URL if necessary
    type: 'website',
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: 'Promptly.ai - Transform Your Ideas into Action'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Promptly.ai | Transform Your Ideas into Action',
    description: 'Transform Your Ideas into Action with Intelligent Prompt Generation',
    images: [imageUrl]
  }
};
export default function RootLayout({ children }) {
  return (
    <ClerkProvider
    appearance={{
      baseTheme: neobrutalism,
      variables: { colorPrimary: "#fa0053" },
      }}
    >
      <html lang="en">
        <body className={inter.className}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}