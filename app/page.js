'use client'

import { Box, Button, Stack, TextField, Typography, Avatar, CircularProgress } from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import SupportAgentIcon from '@mui/icons-material/SupportAgent'; // Import the icon
import ReactMarkdown from 'react-markdown';
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/nextjs';


export default function Home() {
  const { user } = useUser();

  if (!user) {
    return <div>Loading...</div>;
  }

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm the Headstarter support assistant. How can I help you today?",
    },
  ]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;  // Don't send empty messages

    setMessage('');
    setMessages((messages) => [
      ...messages,
      { role: 'user', content: message },
      { role: 'assistant', content: '' }, // Placeholder for the loading animation
    ]);

    try {
      setIsLoading(true);
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }), // Send only the message in the body
      });

      if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
      }

      const responseData = await response.json();
      const assistantMessage = responseData.message; // Extract the message content

      setMessages((messages) => {
        const lastMessage = messages[messages.length - 1];
        const otherMessages = messages.slice(0, messages.length - 1);
        return [
          ...otherMessages,
          { ...lastMessage, content: assistantMessage }, // Set the plain text content
        ];
      });
    } catch (error) {
      console.error('Error in sendMessage:', error);
      setMessages((messages) => [
        ...messages,
        { role: 'assistant', content: "I'm sorry, but I encountered an error. Please try again later." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      {/* <UserButton />
      <SignedIn>
        <h1 className='text-black  font-bold text-3xl'>Sign in</h1>
      </SignedIn>

      <SignedOut>
        <SignInButton mode="redirect">
          <h1 className='text-black font-bold text-3xl'>Signout</h1>
        </SignInButton>
      </SignedOut> */}

      {/* <div id="user-name">Hello, {user.firstName} {user.lastName}!</div> */}

      {/* <div className="flex flex-col items-center min-h-screen bg-gray-200 pt-24">
  
        <div className="w-full max-w-md h-[80vh] bg-white rounded-lg shadow-lg flex flex-col overflow-hidden mt-10">
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-center mb-2 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`flex items-center justify-center rounded-full p-2 ${
                    message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
                  }`}
                >
                  {message.role === 'user' ? (
                    <PersonIcon />
                  ) : (
                    <SupportAgentIcon />
                  )}
                </div>
                <div
                  className={`ml-2 p-3 rounded-lg max-w-xs ${
                    message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
                  }`}
                >
                  {message.content ? (
                    <ReactMarkdown className='ReactMarkdown'>
                      {message.content}
                    </ReactMarkdown>
                  ) : (
                    <CircularProgress size={24} />
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 flex space-x-2">
            <input
              type="text"
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              className="flex-grow p-2 border border-gray-300 rounded"
            />
            <button
              onClick={sendMessage}
              disabled={isLoading}
              className={`px-4 py-2 rounded bg-blue-500 text-white ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>
      </div> */}

    </>
  );
}
