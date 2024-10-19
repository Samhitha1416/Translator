import React, { useState } from "react";
import { UserData } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../components/Loading";
import { ChatData } from "../context/ChatContext";
import backgroundImage from "../assets/flags.jpg";

const Verify = () => {
  const [otp, setOtp] = useState("");

  const { verifyUser, btnLoading } = UserData();
  const { fetchChats } = ChatData();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    verifyUser(Number(otp), navigate, fetchChats);
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <form
        className="bg-black p-6 rounded shadow-md w-full md:w-[500px] border border-black"
        onSubmit={submitHandler}
      >
        <h2 className="text-2xl mb-4" style={headingStyle}>Verify</h2>
        <div className="mb-4">
          <label className="block text-white mb-2" htmlFor="otp">
            OTP:
          </label>
          <input
            type="number"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="border border-white p-2 w-full rounded outline-none bg-transparent text-white focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex justify-center">
          <button
            className="custom-btn btn-15"
            disabled={btnLoading}
          >
            {btnLoading ? <LoadingSpinner /> : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};
const headingStyle = {
  color: "#fff",
  fontFamily: "'Source Sans Pro', sans-serif", // Updated font for h2
  fontWeight: "600", // Optional: Add font weight for extra styling
};
// Injecting button and input styles into the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `
  .custom-btn {
    color: #fff; /* Keep text color white */
    width: 130px;
    height: 40px;
    padding: 10px 25px;
    font-family: 'Lato', sans-serif;
    font-weight: 500;
    background: transparent; /* Keep background transparent */
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    display: inline-block;
  }

  .btn-15 {
    color: #00c7ff; /* Blue text color */
    border: 1px solid #00c7ff; /* Blue border */
    box-shadow: 0 0 5px #00c7ff, 0 0 5px #00c7ff inset; /* Blue shadow */
    z-index: 1;
  }

  .btn-15:after {
    position: absolute;
    content: "";
    width: 0;
    height: 100%;
    top: 0;
    right: 0;
    z-index: -1;
    background: #00c7ff; /* Blue background for the hover effect */
    transition: all 0.3s ease;
  }

  .btn-15:hover {
    color: #fff; 
  }

  .btn-15:hover:after {
    left: 0;
    width: 100%;
  }

  .btn-15:active {
    top: 2px;
  }

  /* Input styles */
  input[type="number"] {
    border: 1px solid white; /* White border */
    padding: 10px; /* Padding */
    width: 100%; /* Full width */
    border-radius: 4px; /* Rounded corners */
    outline: none; /* Remove outline */
    background-color: transparent; /* Transparent background */
    color: white; /* White text color */
  }

  input[type="number"]:focus {
    ring: 2px solid #00c7ff; /* Blue ring on focus */
  }
`;
document.head.appendChild(styleSheet);

export default Verify;
