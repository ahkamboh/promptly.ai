

'use client'

import { Box, Button, Stack, TextField, Typography, Avatar } from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

export default function Home() {
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
      { role: 'assistant', content: '' },
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
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight="100vh"
      sx={{ backgroundColor: '#f0f0f0', position: 'relative', paddingTop: '100px' }}
    >
      <Typography 
        variant="h4" 
        sx={{ 
          position: 'absolute', 
          top: 0, 
          width: '100%', 
          textAlign: 'center', 
          padding: '20px 0', 
          backgroundColor: '#fff', 
          boxShadow: '0px 2px 4px rgba(0,0,0,0.1)' 
        }}
      >
        HeadStarter User Support Chatbot
      </Typography>
      <Box
        sx={{
          width: '500px',
          maxHeight: '80vh',
          bgcolor: 'white',
          borderRadius: 2,
          boxShadow: 3,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          marginTop: '40px'  // Adjusted for spacing under fixed header
        }}
      >
        <Stack spacing={2} sx={{ p: 2, overflowY: 'auto', flex: 1 }}>
          {messages.map((message, index) => (
            <Box
              key={index}
              display="flex"
              alignItems="center"
              sx={{
                justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              <Avatar sx={{
                bgcolor: message.role === 'user' ? '#007bff' : '#e0e0e0',
                color: message.role === 'user' ? 'white' : 'black',
                mr: message.role === 'user' ? 1 : 0,
                ml: message.role === 'user' ? 0 : 1,
              }}>
                {message.role === 'user' ? <PersonIcon /> : <SupportAgentIcon />}
              </Avatar>
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 1,
                  bgcolor: message.role === 'user' ? '#007bff' : '#e0e0e0',
                  color: message.role === 'user' ? 'white' : 'black',
                }}
              >
                {message.content}
              </Box>
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Stack>
        <Stack direction="row" spacing={2} sx={{ p: 2 }}>
          <TextField
            label="Message"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
          />
          <Button 
            variant="contained"
            onClick={sendMessage}
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

























