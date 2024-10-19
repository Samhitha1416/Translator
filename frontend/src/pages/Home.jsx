import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import Header from "../components/Header";
import { ChatData } from "../context/ChatContext";
import { CgProfile } from "react-icons/cg";
import { FaRobot } from "react-icons/fa";
import { LoadingBig, LoadingSmall } from "../components/Loading";
import { IoMdSend, IoMdMic, IoMdMicOff } from "react-icons/io"; // Removed duplicate IoMdMic import
import { useSpeechRecognition } from "react-speech-kit"; // Import the speech recognition hook

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false); // Track if the app is listening
  const [text, setText] = useState(""); // Text captured from speech recognition

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const {
    fetchResponse,
    messages,
    prompt,
    setPrompt,
    newRequestLoading,
    loading,
    chats,
  } = ChatData();

  // Use the speech recognition hook
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      setText(result);
      setPrompt(result); // Optionally set the recognized text to the input field
    },
  });

  const submitHandler = (e) => {
    e.preventDefault();
    fetchResponse();
  };

  const handleListen = () => {
    if (isListening) {
      stop();
      setIsListening(false);
    } else {
      listen({ interimResults: true }); // Listen for speech input
      setIsListening(true);
    }
  };

  const messagecontainerRef = useRef();

  useEffect(() => {
    if (messagecontainerRef.current) {
      messagecontainerRef.current.scrollTo({
        top: messagecontainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className="flex h-screen bg-black text-white">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className="flex flex-1 flex-col">
        <button
          onClick={toggleSidebar}
          className="md:hidden p-4 bg-gray-700 text-2xl"
        >
          <GiHamburgerMenu />
        </button>

        <div className="flex-1 p-6 mb-20 md:mb-0">
          <Header />

          {loading ? (
            <LoadingBig />
          ) : (
            <div
              className="flex-1 p-6 max-h-[600px] overflow-y-auto mb-20 md:mb-0 thin-scrollbar"
              ref={messagecontainerRef}
            >
              {messages && messages.length > 0 ? (
                messages.map((e, i) => (
                  <div key={i}>
                    <div className="mb-4 p-4 rounded bg-blue-500 text-white flex gap-1">
                      <div className="bg-white p-2 rounded-full text-black text-2xl h-10">
                        <CgProfile />
                      </div>
                      {e.question}
                    </div>

                    <div className="mb-4 p-4 rounded bg-gray-500 text-white flex gap-1">
                      <div className="bg-white p-2 rounded-full text-black text-2xl h-10">
                        <FaRobot />
                      </div>
                      <p dangerouslySetInnerHTML={{ __html: e.answer }}></p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No chat yet</p>
              )}

              {newRequestLoading && <LoadingSmall />}
            </div>
          )}
        </div>
      </div>

      {chats && chats.length === 0 ? (
        ""
      ) : (
        <div className="fixed bottom-0 right-0 left-auto p-4 bg-black w-full md:w-[75%]">
          <form
            onSubmit={submitHandler}
            className="flex justify-center items-center"
          >
            <input
              className="flex-grow p-4 bg-gray-700 rounded-l text-white outline-none"
              type="text"
              placeholder="Enter the sentence which you want to translate along with specific language"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              required
            />

            {/* Microphone Button for Speech Recognition */}
            <button
              type="button"
              className={`ml-2 px-4 py-3 ${
                isListening ? "bg-red-500" : "bg-gray-500"
              } text-white text-xl rounded-full transition-transform transform hover:scale-110`}
              onClick={handleListen}
            >
              {isListening ? <IoMdMic /> : <IoMdMicOff />} {/* Conditional rendering of icons */}
            </button>

            <button
              type="submit"
              className="ml-2 px-6 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white text-xl rounded-full hover:from-green-500 hover:to-green-700 transition-transform transform hover:scale-110"
            >
              <IoMdSend />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Home;
