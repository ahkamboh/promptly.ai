"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  FaUserTie,
  FaRegQuestionCircle,
  FaRedo,
  FaBook,
  FaArrowRight,
  FaRobot,
} from "react-icons/fa";
import CircularProgress from "@mui/material/CircularProgress";
import ReactMarkdown from "react-markdown";
import { useUser, UserButton } from "@clerk/nextjs";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function Card({ icon, text, onClick }) {
  return (
    <div
      className="flex-1 poppins-regular min-w-[180px]   h-48 rounded-xl cursor-pointer bg-[#1e1f20] text-white p-4 shadow-md hover:bg-[#333] transition duration-200 flex flex-col justify-between"
      onClick={onClick}
    >
      <div>{text}</div>
      <div className="flex justify-end items-end">
        <div className="bg-black p-2 rounded-full">{icon}</div>
      </div>
    </div>
  );
}

export default function Page() {
  const { user } = useUser();

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [addClass, setAddClass] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;

    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;

      const shouldAddClass =
        textarea.scrollHeight > 50 || textarea.value.includes("\n");

      if (shouldAddClass !== addClass) {
        setAddClass(shouldAddClass);
      }
    }
  }, [message, addClass]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const newUserMessage = { role: "user", content: message };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setMessage("");

    try {
      setIsLoading(true);
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error(
          "Network response was not ok: " + response.statusText
        );
      }

      const responseData = await response.json();
      const assistantMessage = {
        role: "assistant",
        content: responseData.message,
      };

      setMessages((prevMessages) => [...prevMessages, assistantMessage]);

      if (!reviewSubmitted) {
        setShowReviewModal(true);
      }
    } catch (error) {
      console.error("Error in sendMessage:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant",
          content:
            "I'm sorry, but I encountered an error. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const handleCardClick = (text) => {
    setMessage(text);
    sendMessage();
  };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleReviewSubmit = () => {
    // Handle review submission logic (e.g., save to database)
    console.log("Rating:", rating);
    console.log("Review Text:", reviewText);

    setShowReviewModal(false);
    setReviewSubmitted(true);
  };

  const handleReviewClose = () => {
    setShowReviewModal(false);
  };

  return (
    <div className="relative ">
      <div className=" p-5">
        <UserButton />
      </div>
      <div className="overflow-y-auto h-[calc(100vh-152px)] w-full relative  sm:px-12 sm:pr-10 sm:pb-0 pb-12  ">
        <div className="max-w-3xl mx-auto  ">
          <div>
            {user && (
              <div className="sm:p-0 p-8">
                <h1 id="user-name">Hello, {user.firstName}!</h1>
                <h1 className="text-[#444746] Mixcase-500 text-4xl">
                  How can I help you today?
                </h1>
              </div>
            )}
            <div className="flex justify-center mt-16  smp-0 :pl-5 ">
              <div className="flex  gap-2  scroll-hidden overflow-x-auto">
                <Card
                  icon={<FaUserTie className="text-2xl" />}
                  text="Walk me through how to apply for a new role"
                  onClick={() =>
                    handleCardClick("Walk me through how to apply for a new role")
                  }
                />
                <Card
                  icon={<FaRegQuestionCircle className="text-2xl" />}
                  text="What is the status of my application?"
                  onClick={() =>
                    handleCardClick("What is the status of my application?")
                  }
                />
                <Card
                  icon={<FaRedo className="text-2xl" />}
                  text="How do I reset my password?"
                  onClick={() =>
                    handleCardClick("How do I reset my password?")
                  }
                />
                <Card
                  icon={<FaBook className="text-2xl" />}
                  text="Can you recommend some learning resources?"
                  onClick={() =>
                    handleCardClick("Can you recommend some learning resources?")
                  }
                />
              </div>
            </div>
          </div>
          <div className="p-4 poppins-regular text-sm  w-full">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex mb-2 w-full ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div className="flex items-start pb-7">
                  <div className=" rounded-full  overflow-hidden object-cover  text-white mt-1">
                    {msg.role === "user" ? (
                      <img
                        src={user?.imageUrl}
                        alt="User Profile"
                        onError={(e) =>
                          (e.target.src =
                            "https://chatbot.design/images/chatbot/DIGITAL%20%28RGB%29/PNG/Contained_Mark_Blue.png")
                        }
                        className=" h-10 w-10"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full overflow-hidden ">
                        <img
                          src="https://chatbot.design/images/chatbot/DIGITAL%20%28RGB%29/PNG/Contained_Mark_Blue.png"
                          alt=""
                        />
                      </div>
                    )}
                  </div>
                  <div className=" p-3 w-full rounded-lg  text-white">
                    {msg.content ? (
                  <ReactMarkdown 
                  className="w-full prose prose-invert prose-sm max-w-none"
                  components={{
                    h1: ({node, ...props}) => <h1 className="text-2xl font-bold mb-2" {...props} />,
                    h2: ({node, ...props}) => <h2 className="text-xl font-bold mb-2" {...props} />,
                    h3: ({node, ...props}) => <h3 className="text-lg font-bold mb-1" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc pl-4 mb-2" {...props} />,
                    ol: ({node, ...props}) => <ol className="list-decimal pl-4 mb-2" {...props} />,
                    li: ({node, ...props}) => <li className="mb-1" {...props} />,
                    p: ({node, ...props}) => <p className="mb-2" {...props} />,
                    a: ({node, ...props}) => <a className="text-blue-300 hover:underline" {...props} />,
                    blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-gray-500 pl-2 italic" {...props} />,
                    code: ({node, ...props}) => <code className="bg-gray-800 rounded px-1" {...props} />,
                    pre: ({node, ...props}) => <pre className="bg-gray-800 rounded p-2 mb-2 overflow-x-auto" {...props} />,
                  }}
                >
                  {msg.content}
                </ReactMarkdown>
                    ) :   <CircularProgress size={24} />}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef}></div>
          </div>
        </div>
      </div>
      <div
          className={`bg-[#1e1f20] poppins-regular text-white max-w-3xl min-h-16 fixed bottom-5 left-1/2 transform scroll-sp -translate-x-1/2 z-50 w-[90%] p-4 shadow-lg flex ${addClass ? 'rounded-xl' : 'rounded-full'} ${addClass ? 'items-end' : 'items-center'}`}
        >
          <textarea
            ref={textareaRef}
            placeholder="Enter a prompt here..."
            className="textarea-field bg-[#1e1f20] flex-grow p-2 border-none focus:outline-none resize-none overflow-y-auto"
            value={message}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            rows="1"
            style={{ maxHeight: '200px', minHeight: '14px' }}
          />
          <FaArrowRight
            className="ml-4 text-xl text-white cursor-pointer"
            onClick={sendMessage}
          />
        </div>

      <Modal
        open={showReviewModal}
        onClose={handleReviewClose}
        aria-labelledby="review-modal-title"
        aria-describedby="review-modal-description"
       
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "#fff",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <h2 id="review-modal-title" className="poppins-regular "> Rate Your Experience</h2>
          <Rating
            name="user-rating"
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
          <TextField
            id="review-modal-description"
            label="Write your review"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            value={reviewText}
            onChange={(event) => setReviewText(event.target.value)}
            sx={{ mt: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleReviewSubmit}
            sx={{ mt: 2 }}
          >
            Submit Review
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
