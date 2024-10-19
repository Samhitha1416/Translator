import React, { useState } from "react";
import { UserData } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../components/Loading";
import backgroundImage from "../assets/flags.jpg"; // Adjust the path to your image

const Login = () => {
  const [email, setEmail] = useState("");

  const { loginUser, btnLoading } = UserData();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    loginUser(email, navigate);
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <form
        className="p-6 rounded shadow-md w-full md:w-[500px] border border-black"
        onSubmit={submitHandler}
        style={formStyle}
      >
        {/* Welcome Message and Tagline */}
        <div className="text-center text-black mb-4">
          <h3 style={neonTextStyle}>Welcome to Language Connect</h3>
          <p style={taglineStyle}>Bridging Language Gaps with Ease</p>
        </div>

        <h2 className="text-2xl mb-4" style={headingStyle}>Login</h2>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="email" style={labelStyle}>
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full rounded outline-none focus:ring-2 focus:ring-blue-500"
            style={{ borderColor: "#fff", color: "#fff", backgroundColor: "transparent" }}
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

// Styles
const formStyle = {
  backgroundColor: "#000", // Black background for the form
  color: "#fff", // White text color
};

const neonTextStyle = {
  position: "relative",
  textAlign: "center",
  fontSize: "50px",
  fontFamily: "'Megrim', cursive",
  color: "#00c7ff", // Change text color to blue
  textShadow: `
    0 0 5px #00c7ff,
    0 0 10px #00c7ff,
    0 0 20px #00c7ff,
    0 0 40px #00c7ff,
    0 0 80px #00c7ff
  `,
};

const taglineStyle = {
  fontFamily: "'Pompiere', cursive",
  fontWeight: "300",
  textAlign: "center",
  fontSize: "20px",
  color: "#fff",
};

const headingStyle = {
  color: "#fff",
  fontFamily: "'Source Sans Pro', sans-serif", // Updated font for h2
  fontWeight: "600", // Optional: Add font weight for extra styling
};

const labelStyle = {
  color: "#fff",
  fontFamily: "'Source Sans Pro', sans-serif", // Updated font for label
  fontWeight: "400", // Optional: Add font weight for extra styling
};

// Inject the custom button styles into the document
const buttonStyleSheet = document.createElement("style");
buttonStyleSheet.type = "text/css";
buttonStyleSheet.innerText = `
  .custom-btn {
    color: #fff;
    width: 130px;
    height: 40px;
    padding: 10px 25px;
    font-family: 'Lato', sans-serif;
    font-weight: 500;
    background: transparent;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    display: inline-block;
  }
  
  .btn-15 {
    color: #00c7ff;
    border: 1px solid #00c7ff;
    box-shadow: 0 0 5px #00c7ff, 0 0 5px #00c7ff inset;
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
    background: #00c7ff;
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
`;
document.head.appendChild(buttonStyleSheet);

// Exporting the component
export default Login;
