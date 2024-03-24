import React, { useState, useEffect } from "react";
import './Home.css'
import { Link } from "react-router-dom";


const ChatMessage = ({ text, from }) => {
    return (
      <div className={`chat-message ${from === 'You' ? 'right' : 'left'}`}>
        <div className="message-cage">{text}</div>
      </div>
    );
};

const Homelong = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [restaurantData, setRestaurantData] = useState(null);
  const [nextQuestion, setNextQuestion] = useState('');

  useEffect(() => {
    async function fetchInitialQuestion() {
      try {
        const response = await fetch('https://backend-oy0f.onrender.com');
        if (response.ok) {
          const data = await response.json();
          const question = data.question;
          setChatHistory([{ text: question, from: 'Bot' }]);
        } else {
          console.error('Failed to fetch initial question');
        }
      } catch (error) {
        console.error('Error fetching initial question:', error);
      }
    }

    fetchInitialQuestion();
  }, []);

  useEffect(() => {
    fetchNextQuestion();
  }, []);

  const fetchNextQuestion = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/get-addition');
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const data = await response.json();
      setNextQuestion(data.question);
      // Add next question to chat history
      setChatHistory(prevChatHistory => [...prevChatHistory, { text: data.question, from: 'Bot' }]);
    } catch (error) {
      console.error("Error fetching next question:", error);
    }
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user's question to chat history
    setChatHistory([...chatHistory, { text: message, from: "User" }]);
    setMessage("");

    try {
      const response = await fetch('http://127.0.0.1:5000/api/handle-addition', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: message }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      const responseData = await response.json();

      // Add response from backend to chat history
      setChatHistory(prevChatHistory => [...prevChatHistory, { text: responseData.response, from: "Server" }]);

      // If restaurant data is available, set it
      if (responseData.restaurantData) {
        setRestaurantData(responseData.restaurantData);
      }

      // Fetch next question after handling the current one
      fetchNextQuestion();
    } catch (error) {
      console.error("Error handling submission:", error);
    }
  };

  document.body.style = 'background: linear-gradient(#F9AC16, #E9CBAC, #F16A41);';
  return (
    <div className="chatbot-homepage">
      <div className="header">
        <h1>WELCOME TO FLAVOUR CRAFT!</h1>
        {/* <h2>Join us to Level up you Dining Experience!</h2> */}
      </div>
      <div className="actions">
        <Link to="/">
          {" "}
          <button>Home</button>{" "}
        </Link>
        <Link to="/login">
          {" "}
          <button>Login</button>{" "}
        </Link>
        <Link to="/aboutus">
          {" "}
          <button>About Us</button>{" "}
        </Link>
        
      </div>
      <div className="chat-container">
        <div className="chat-history">
          {chatHistory.map((msg, index) => (
            <ChatMessage key={index} text={msg.text} from={msg.from} />
          ))}
        </div>

        {restaurantData && (
          <div className="restaurant-info message-cage">
            <h2>{restaurantData.Restaurant_Name}</h2>
            <p>Description: {restaurantData.Restaurant_description}</p>
            <p>Type: {restaurantData.Restaurant_type}</p>
          </div>
        )}

        <div className="input-long-base-question">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={message}
              onChange={handleChange}
              placeholder={nextQuestion || "Ask your Question..."}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Homelong;
