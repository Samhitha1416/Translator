import { IoIosCloseCircle } from "react-icons/io";
import { ChatData } from "../context/ChatContext";
import { MdDelete } from "react-icons/md";
import { LoadingSpinner } from "./Loading";
import { UserData } from "../context/UserContext";
import logo from "../assets/logo.png"; // Adjust the path to your logo image

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { chats, createChat, createLod, setSelected, deleteChat } = ChatData();
  const { logoutHandler } = UserData();

  const deleteChatHandler = (id) => {
    if (confirm("Are you sure you want to delete this chat?")) {
      deleteChat(id);
    }
  };

  const clickEvent = (id) => {
    setSelected(id);
    toggleSidebar();
  };

  return (
    <div
      className={`fixed inset-0 bg-black text-white p-4 transition-transform transform md:relative md:translate-x-0 md:w-1/4 md:block ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <button
        className="md:hidden p-2 mb-4 bg-gray-600 text-white rounded text-2xl"
        onClick={toggleSidebar}
      >
        <IoIosCloseCircle />
      </button>

      {/* Add logo next to the Translator text */}
      <div className="flex items-center text-2xl font-semibold mb-6 text-white" style={neonTextStyle}>
  <img src={logo} alt="logo" className="w-12 h-12 mr-2" />
  Language Connect
</div>


      <div className="mb-4">
        <button
          onClick={createChat}
          className="neon-btn blue-btn"
          style={buttonStyle}
        >
          {createLod ? <LoadingSpinner /> : "New Chat +"}
        </button>
      </div>

      <div>
        <p className="text-sm text-gray-400 mb-2">Recent</p>

        <div className="max-h-[500px] overflow-y-auto mb-20 md:mb-0 thin-scrollbar">
          {chats && chats.length > 0 ? (
            chats.map((e) => (
              <button
                key={e._id}
                className="w-full text-left py-2 px-2 bg-gray-700 hover:bg-gray-600 rounded mt-2 flex justify-between items-center text-white"
                onClick={() => clickEvent(e._id)}
              >
                <span>{e.latestMessage.slice(0, 38)}...</span>
                <span
                  className="neon-trash-icon flex justify-center items-center"
                  onClick={(event) => {
                    event.stopPropagation();
                    deleteChatHandler(e._id);
                  }}
                >
                  <MdDelete className="text-2xl" /> {/* Adjusted the icon size */}
                </span>
              </button>
            ))
          ) : (
            <p className="text-gray-400">No chats yet</p>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 mb-6 w-full">
        <button
          className="neon-btn pink-btn"
          style={logoutButtonStyle}
          onClick={logoutHandler}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

// Styles for the buttons
const buttonStyle = {
  color: "#fff",
  padding: "10px 25px",
  fontFamily: "'Lato', sans-serif",
  fontWeight: "500",
  background: "transparent",
  cursor: "pointer",
  transition: "all 0.3s ease",
  position: "relative",
  display: "inline-block",
  border: "1px solid #00c7ff",
  boxShadow: "0 0 5px #00c7ff, 0 0 5px #00c7ff inset",
  zIndex: 1,
  width: "150px",
  height: "50px",
  textAlign: "center",
};
const neonTextStyle = {
  position: "relative",
  textAlign: "center",
  fontSize: "30px", // Adjust size as needed
  fontFamily: "'Megrim', cursive", // Apply neon-style font
  color: "#00c7ff", // Neon blue color for text
  textShadow: `
    0 0 5px #00c7ff,
    0 0 10px #00c7ff,
    0 0 20px #00c7ff,
    0 0 40px #00c7ff,
    0 0 80px #00c7ff
  `,
};

const logoutButtonStyle = {
  color: "#fff",
  padding: "10px 25px",
  fontFamily: "'Lato', sans-serif",
  fontWeight: "500",
  background: "transparent",
  cursor: "pointer",
  transition: "all 0.3s ease",
  position: "relative",
  display: "inline-block",
  border: "1px solid #ff9aff",
  boxShadow: "0 0 5px #ff9aff, 0 0 5px #ff9aff inset",
  zIndex: 1,
  width: "150px",
  height: "50px",
  textAlign: "center",
};

// Neon button hover and focus styles (applies to both buttons)
const buttonHoverFocusStyles = `
  .blue-btn:hover {
    color: #fff;
    background: #00c7ff;
  }

  .blue-btn:after {
    position: absolute;
    content: "";
    width: 0;
    height: 100%;
    top: 0;
    right: 0;
    z-index: -1;
    background: #00c7ff;
    box-shadow: 0 0 20px #00c7ff;
    transition: all 0.3s ease;
  }

  .blue-btn:hover:after {
    left: 0;
    width: 100%;
  }

  .pink-btn:hover {
    color: #fff;
    background: #ff9aff;
  }

  .pink-btn:after {
    position: absolute;
    content: "";
    width: 0;
    height: 100%;
    top: 0;
    right: 0;
    z-index: -1;
    background: #ff9aff;
    box-shadow: 0 0 20px #ff9aff;
    transition: all 0.3s ease;
  }

  .pink-btn:hover:after {
    left: 0;
    width: 100%;
  }

  .neon-trash-icon {
    color: #ff4646;
    transition: all 0.3s ease;
    border: 1px solid #ff4646;
    box-shadow: 0 0 5px #ff4646, 0 0 5px #ff4646 inset;
    position: relative;
    display: inline-block;
    width: 40px; /* Decreased the size of the dustbin button */
    height: 40px; /* Decreased the size of the dustbin button */
    text-align: center;
  }

  .neon-trash-icon:hover {
    background: #ff4646;
    color: #fff;
  }

  .neon-trash-icon:after {
    position: absolute;
    content: "";
    width: 0;
    height: 100%;
    top: 0;
    right: 0;
    z-index: -1;
    background: #ff4646;
    box-shadow: 0 0 20px #ff4646;
    transition: all 0.3s ease;
  }

  .neon-trash-icon:hover:after {
    left: 0;
    width: 100%;
  }

  .blue-btn:active, .pink-btn:active, .neon-trash-icon:active {
    top: 2px;
  }
`;

// Injecting hover and focus styles into the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = buttonHoverFocusStyles;
document.head.appendChild(styleSheet);

export default Sidebar;
