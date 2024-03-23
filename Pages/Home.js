import React, { useState, useEffect } from "react";
import './Home.css'
import { Link } from 'react-router-dom';
import '../App.py'

const ChatMessage = ({ text, from }) => {
  return (
    <div className={`chat-message ${from === 'You' ? 'right' : 'left'}`}>
      <div className="message-cage">{text}</div>
    </div>
  );
};

function ChatbotHomepage() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [restaurantData, setRestaurantData] = useState(null);
  const [typeQuestion, setTypeQuestion] = useState(null);
  const [cusineTypeQuestion, setCusineTypeQuestion] = useState(null);
  const [costPersonQuestion, setCostPersonQuestion] = useState(null);
  const [allerygyQuestion, setallergyQuestion] = useState(null);
  const [addQuestion, setaddQuestion] = useState(null);
  const [userInput, setUserInput] = useState('');


  useEffect(() => {
    async function fetchInitialQuestion() {
      try { 
        const response = await fetch('http://127.0.0.1:5000/api/choice');
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
  }, []);

  const handleSubmitChoiceResponse = async (event) => {
    event.preventDefault();
    setChatHistory(prevChatHistory => [...prevChatHistory, { text: userInput, from: 'User' }]);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/choice-response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_choice: userInput }),
      });
      
      if (response.ok) {
        const responseData = await response.json();
        setChatHistory(prevChatHistory => [...prevChatHistory, { text: responseData.response, from: 'Bot' }]);
      } else {
        console.error('Failed to submit user choice');
      }
    } catch (error) {
      console.error('Error submitting user choice:', error);
    }

    setUserInput('');
  };

  const fetchNextQuestion = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/get-location');
      if (response.ok) {
        const data = await response.json();
        const question = data.question;
        setChatHistory(prevChatHistory => [...prevChatHistory, { text: question, from: 'Bot' }]);
      } else {
        console.error('Failed to fetch next question from /api/get-location');
      }
    } catch (error) {
      console.error('Error fetching next question from /api/get-location:', error);
    }
  };

  // Call fetchNextQuestion when the component renders
  React.useEffect(() => {
    fetchNextQuestion();
  }, []);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const currentMessage = message;

    try {
        const response = await fetch('http://127.0.0.1:5000/api/handle-input', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ input: currentMessage }),
        });

        if (response.ok) {
            const data = await response.json();
            const reply = data.response;

            if (reply && reply !== 'No restaurants available in this location.') {
                setRestaurantData(null);
            }
            setChatHistory(prevChatHistory => [...prevChatHistory, { text: currentMessage, from: 'You' }, { text: reply, from: 'Bot' }]);

            const nextQuestion = data.next_question;
            if (nextQuestion) {
                setTypeQuestion(nextQuestion);
            } else {
                setTypeQuestion(null);
            }

            setMessage('');
        } else {
            console.error('Failed to send message to the backend');
        }
    } catch (error) {
        console.error('Error sending message:', error);
    }
};

  useEffect(() => {
    async function fetchTypeQuestion() {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/get-type');
        if (response.ok) {
          const data = await response.json();
          const question = data.question;
          setChatHistory(prevChatHistory => [...prevChatHistory, { text: question, from: 'Bot' }]);
        } else {
          console.error('Failed to fetch type question');
        }
      } catch (error) {
        console.error('Error fetching type question:', error);
      }
    }

    if (typeQuestion) {
      fetchTypeQuestion();
    }
  }, [typeQuestion]);

  const handleSubmitType = async (event) => {
    event.preventDefault();
    const currentMessage = message;
  
    try {
      const response = await fetch('http://127.0.0.1:5000/api/handle-type', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: currentMessage }),
      });
  
      if (response.ok) {
        const data = await response.json();
        const reply = data.response;
  
        setChatHistory(prevChatHistory => [
          ...prevChatHistory,
          { text: currentMessage, from: 'You' },
          { text: reply, from: 'Bot' }
        ]);

        const nextQuestion = data.next_question;
        if (nextQuestion) {
          setCusineTypeQuestion(nextQuestion);
        } else {
          setCusineTypeQuestion(null);
        }
  
        setMessage('');
      } else {
        console.error('Failed to send message to the backend');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    async function fetchCuisineTypeQuestion() {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/get-cusinetype');
        if (response.ok) {
          const data = await response.json();
          const question = data.question;
          setChatHistory(prevChatHistory => [...prevChatHistory, { text: question, from: 'Bot' }]);
        } else {
          console.error('Failed to fetch cuisine type question');
        }
      } catch (error) {
        console.error('Error fetching cuisine type question:', error);
      }
    }

    if (cusineTypeQuestion) {
      fetchCuisineTypeQuestion();
    }
  }, [cusineTypeQuestion]);

  const handleSubmitCuisineType = async (event) => {
    event.preventDefault();
    const currentMessage = message;
  
    try {
      // Add the user's input to the chat history
      setChatHistory(prevChatHistory => [
        ...prevChatHistory,
        { text: currentMessage, from: 'You' }
      ]);

      const response = await fetch('http://127.0.0.1:5000/api/handle-restaurant-type', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: currentMessage }),
      });
  
      if (response.ok) {
        const data = await response.json();
        const reply = data.response;

        // Update chat history with bot's response
        setChatHistory(prevChatHistory => [
          ...prevChatHistory,
          { text: reply, from: 'Bot' }
        ]);

        const nextQuestion = data.next_question;
        if (nextQuestion) {
          setCostPersonQuestion(nextQuestion);
        } else {
          setCostPersonQuestion(null);
        }
  
        setMessage('');
      } else {
        console.error('Failed to send message to the backend');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    async function fetchCostPersonQuestion() {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/get-costPerson');
        if (response.ok) {
          const data = await response.json();
          const question = data.question;
          setChatHistory(prevChatHistory => [...prevChatHistory, { text: question, from: 'Bot' }]);
        } else {
          console.error('Failed to fetch cuisine type question');
        }
      } catch (error) {
        console.error('Error fetching cuisine type question:', error);
      }
    }

    if (costPersonQuestion) {
      fetchCostPersonQuestion();
    }
  }, [costPersonQuestion]);

   

  const handleSubmitCostPerson = async (event) => {
    event.preventDefault();
    const currentMessage = message;
  
    try {
      const response = await fetch('http://127.0.0.1:5000/api/handle-costPerson', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: currentMessage }),
      });
  
      if (response.ok) {
        const data = await response.json();
        const reply = data.response;

        // Update chat history with bot's response
        setChatHistory(prevChatHistory => [
          ...prevChatHistory,
          { text: currentMessage, from: 'You' },
          { text: reply, from: 'Bot' }
        ]);

        const nextQuestion = data.next_question;
        if (nextQuestion) {
          setallergyQuestion(nextQuestion);
        } else {
          setallergyQuestion(null);
        }
  
        setMessage('');
      } else {
        console.error('Failed to send message to the backend');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };


  useEffect(() => {
    async function fetchallergyQuestion() {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/get-allergy');
        if (response.ok) {
          const data = await response.json();
          const question = data.question;
          setChatHistory(prevChatHistory => [...prevChatHistory, { text: question, from: 'Bot' }]);
        } else {
          console.error('Failed to fetch cuisine type question');
        }
      } catch (error) {
        console.error('Error fetching cuisine type question:', error);
      }
    }

    if (allerygyQuestion) {
      fetchallergyQuestion();
    }
  }, [allerygyQuestion]);

   

  const handleSubmitallergy = async (event) => {
    event.preventDefault();
    const currentMessage = message;
  
    try {
      const response = await fetch('http://127.0.0.1:5000/api/handle-allergy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: currentMessage }),
      });
  
      if (response.ok) {
        const data = await response.json();
        const reply = data.response;
  
        // Update chat history with bot's response
        setChatHistory(prevChatHistory => [
          ...prevChatHistory,
          { text: currentMessage, from: 'You' },
          { text: reply, from: 'Bot' }
        ]);
  
        const nextQuestion = data.next_question;
        if (nextQuestion) {
          // Update addQuestion state with the next question
          setaddQuestion(nextQuestion);
        } else {
          setaddQuestion(null);
        }
  
        setMessage('');
      } else {
        console.error('Failed to send message to the backend');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };


  document.body.style = 'background: linear-gradient(#F9AC16, #E9CBAC, #F16A41);';
  return (
    <div className="chatbot-homepage">
      
      <div className="header">
      
        <h1>WELCOME TO FLAVOUR CRAFT!</h1>
      </div>
      <div className="actions">
        <Link to="/"><button>Home</button></Link>
        <Link to="/login"><button>Login</button></Link>
        <Link to="/aboutus"><button>About Us</button></Link>
      </div>
      <div className="chat-container">
        <div className="chat-history">
          {chatHistory.map((msg, index) => (
            <ChatMessage key={index} text={msg.text} from={msg.from} />
          ))}
        </div>
        {restaurantData && ( // Check if restaurant data is available
          <div className="restaurant-info message-cage">
            <h2>{restaurantData.Restaurant_Name}</h2>
            <p>Description: {restaurantData.Restaurant_description}</p>
            <p>Type: {restaurantData.Restaurant_type}</p>
            {/* Render other properties as needed */}
          </div>
        )}
        <div className="input-and-recommendation">
          <form onSubmit={userInput?handleSubmitChoiceResponse:allerygyQuestion? handleSubmitallergy:costPersonQuestion?handleSubmitCostPerson:cusineTypeQuestion ? handleSubmitCuisineType : typeQuestion ? handleSubmitType : handleSubmit}>
            <input
              type="text"
              value={message}
              onChange={handleChange}
              placeholder={allerygyQuestion?allerygyQuestion:costPersonQuestion ? costPersonQuestion:cusineTypeQuestion ? cusineTypeQuestion : typeQuestion ? typeQuestion : "Ask your Question..."}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChatbotHomepage;