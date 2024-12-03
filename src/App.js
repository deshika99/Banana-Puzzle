import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";  // Import Routes and Route from react-router-dom v6
import SplashScreen from "./components/SplashScreen";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import StartPlay from "./components/StartPlay";
import Beginner from "./components/Beginner";
import Intermediate from "./components/Intermediate";
import Expert from "./components/Expert";
import Timewrap from "./components/Timewrap";
import HowToPlay from "./components/HowToPlay";
import Leaderboard from "./components/Leaderboard";
import Profile from "./components/Profile";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes> {/* Use Routes to wrap all Route components */}
          {/* Define the routes with 'element' instead of 'component' */}
          <Route path="/" element={<SplashScreen />} />
          <Route path="/homepage" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/start-play" element={<StartPlay />} />
          <Route path="/beginner" element={<Beginner />} />
          <Route path="/intermediate" element={<Intermediate />} />
          <Route path="/expert" element={<Expert />} />
          <Route path="/timewrap" element={<Timewrap />} />
          <Route path="/howtoplay" element={<HowToPlay />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
