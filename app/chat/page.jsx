'use client'
import React, { useState, useEffect, useRef } from 'react';
import { FaUserTie, FaRegQuestionCircle, FaRedo, FaBook, FaArrowRight } from 'react-icons/fa';

function Card({ icon, text }) {
  return (
    <div className="flex-1 min-w-[calc(25%-1.5rem)] h-40 rounded-md bg-[#1e1f20] text-white p-4 shadow-md hover:bg-[#333] transition duration-200 flex flex-col justify-between">
      <div>{text}</div>
      <div className="flex justify-end items-end">
        {icon}
      </div>
    </div>
  );
}

function Page() {
  const [prompt, setPrompt] = useState("");
  const [largeContent, setLargeContent] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const newHeight = textarea.scrollHeight;
      textarea.style.height = `${newHeight}px`;

      if (newHeight > 64) { // If content height exceeds 4rem (64px)
        setLargeContent(true);
      } else {
        setLargeContent(false);
      }

      // Adjust the textarea to expand upwards by shifting its margin-top
      textarea.style.marginTop = `-${newHeight - 64}px`;
    }
  }, [prompt]);

  const handleInputChange = (event) => {
    setPrompt(event.target.value);
  };

  const handlePromptSubmit = () => {
    // Implement your prompt forwarding logic here
    alert(`Prompt: ${prompt}`);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent new line
      handlePromptSubmit();
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-16">
      <div>
        <div>
          <h1 id="user-name">Hello, Ali</h1>
          <h1 className="text-[#444746] Mixcase-500 text-4xl mt-4">How can I help you today?</h1>
        </div>
        <div className="flex justify-center mt-16">
          <div className="flex flex-wrap gap-2">
            <Card icon={<FaUserTie className="text-2xl" />} text="Walk me through how to apply for a new role" />
            <Card icon={<FaRegQuestionCircle className="text-2xl" />} text="What is the status of my application?" />
            <Card icon={<FaRedo className="text-2xl" />} text="How do I reset my password?" />
            <Card icon={<FaBook className="text-2xl" />} text="Can you recommend some learning resources?" />
          </div>
        </div>
        <div className="mt-16 relative">
          <textarea
            ref={textareaRef}
            placeholder="Enter a prompt here..."
            className={`textarea-field ${largeContent ? 'no-radius' : ''}`}
            value={prompt}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            rows="1"
          />
          <FaArrowRight
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white cursor-pointer"
            onClick={handlePromptSubmit}
          />
        </div>
      </div>
    </div>
  );
}

export default Page;


