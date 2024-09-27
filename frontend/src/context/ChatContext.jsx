import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { server } from "../main";
import toast from "react-hot-toast";

// Importing Google Generative AI SDK
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
//console.log('API Key:', apiKey); // Make sure the API key is correctly loaded

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [newRequestLoading, setNewRequestLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const [selected, setSelected] = useState(null);
  const [createLod, setCreateLod] = useState(false);
  const [loading, setLoading] = useState(false);

  // Function to call the generative model and fetch a response
  async function fetchResponse() {
    if (prompt === "") {
      toast.error("Write a prompt");
      return;
    }
    setNewRequestLoading(true);
    const currentPrompt = prompt; // Store the prompt before resetting
    setPrompt("");

    try {
      // Start the chat session
      const chatSession = model.startChat({
        generationConfig,
        history: [
          {
            role: "user",
            parts: [
              {
                text: "You are a chat assistant for language translation. Only answer related to language translation. If user asks unrelated questions, tell them that you cannot help. Okay?",
              },
            ],
          },
          {
            role: "model",
            parts: [
              { text: "Okay, I understand. I will only answer questions related to language translation." },
            ],
          },
        ],
      });

      // Send the user's prompt as a message to the model
      const result = await chatSession.sendMessage(currentPrompt);

      const message = {
        question: currentPrompt,
        answer: result.response?.text() || "No response", // Safely access response text
      };

      setMessages((prev) => [...prev, message]);
      setNewRequestLoading(false);

      // Store the chat on the server
      await axios.post(
        `${server}/api/chat/${selected}`, // Fixed string interpolation
        {
          question: currentPrompt,
          answer: message.answer,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
      setNewRequestLoading(false);
    }
  }

  async function fetchChats() {
    try {
      const { data } = await axios.get(`${server}/api/chat/all`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setChats(data);
      if (data.length > 0) {
        setSelected(data[0]._id);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch chats");
    }
  }

  async function createChat() {
    setCreateLod(true);
    try {
      const { data } = await axios.post(
        `${server}/api/chat/new`, // Fixed string interpolation
        {},
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      fetchChats();
      setCreateLod(false);
    } catch (error) {
      toast.error("Something went wrong while creating chat");
      setCreateLod(false);
    }
  }

  async function fetchMessages() {
    setLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/chat/${selected}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setMessages(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Failed to fetch messages");
    }
  }

  async function deleteChat(id) {
    try {
      const { data } = await axios.delete(`${server}/api/chat/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      toast.success(data.message);
      fetchChats();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while deleting chat");
    }
  }

  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    if (selected) {
      fetchMessages();
    }
  }, [selected]);

  return (
    <ChatContext.Provider
      value={{
        fetchResponse,
        messages,
        prompt,
        setPrompt,
        newRequestLoading,
        chats,
        createChat,
        createLod,
        selected,
        setSelected,
        loading,
        setLoading,
        deleteChat,
        fetchChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatData = () => useContext(ChatContext);
