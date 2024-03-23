import logo from './logo.svg';
import './App.css';
import LoginSignup from './Components/LoginSignup/LoginSignup';
import { Route, Link, Routes } from 'react-router-dom';
import ChatbotHomepage from './Pages/Home';
import ForgotPassword from './Pages/ForgotPW';
import Signup from './Components/LoginSignup/Signup';
import aboutus from './Pages/AboutUs';
import Login from './Components/LoginSignup/Login';
import HomeBase from './Pages/HomeBase';
import ResetPW from './Pages/ResetPW'
import Selection from './Components/LoginSignup/SelectionPage';
import Homelong from './Pages/Homelong';



function App() {
  return (
    <div className="App">
      <Routes>
      <Route exact path="/homeshort" Component={ChatbotHomepage}/>
      <Route exact path="/forgotpassword" Component={ForgotPassword}/>
      {/* <Route exact path="/signup" Component={Signup}/> */}
      <Route exact path="/signup" Component={LoginSignup}/> //real signup
      <Route exact path="/aboutus" Component={aboutus}/>
      <Route exact path="/login" Component={Login}/> //real login
      <Route exact path="/" Component={HomeBase}/>
      <Route exact path="/reset" Component={ResetPW}/>
      <Route exact path="/select" Component={Selection}/>
      <Route exact path="/homelong" Component={Homelong}/>
    
      </Routes>
    </div>
  );
}

export default App;
