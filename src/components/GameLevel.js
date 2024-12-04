import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../styling/GameLevel.css";
import GameOverOverlay from "./GameOverOverlay"; // Game over screen
import Leaderboard from "./Leaderboard"; // Leaderboard screen

const GameLevel = ({ difficulty, initialTimerDuration, initialChances }) => {
  const [question, setQuestion] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [answer, setAnswer] = useState("");
  const [timer, setTimer] = useState(initialTimerDuration);
  const [chances, setChances] = useState(initialChances);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [leaderboardVisible, setLeaderboardVisible] = useState(false);

  // Fetch question from the API
  const fetchQuestion = async () => {
    try {
      const response = await fetch("https://marcconrad.com/uob/banana/api.php");
      const data = await response.json();

      if (data && data.question) {
        setQuestion(data.question);
        const match = data.question.match(/https:\/\/.+\.png/);
        if (match) {
          setImageUrl(match[0]); // Extract the image URL
        } else {
          console.error("No image URL found in the question.");
          setImageUrl("");
        }
        setTimer(initialTimerDuration); // Reset the timer
      } else {
        console.error("Invalid data format from API.");
      }
    } catch (error) {
      console.error("Error fetching question:", error);
    }
  };

  // Load question on component mount
  useEffect(() => {
    fetchQuestion(); // Fetch the first question on mount
  }, []);

  // Timer countdown logic
  useEffect(() => {
    if (timer > 0 && !gameOver) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }

    if (timer === 0 && !gameOver) {
      handleTimeout();
    }
  }, [timer, gameOver]);

  // Handle timeout
  const handleTimeout = () => {
    setChances((prevChances) => {
      if (prevChances - 1 === 0) {
        setGameOver(true); // End the game
        setLeaderboardVisible(true); // Show the leaderboard
      }
      return Math.max(prevChances - 1, 0);
    });
    fetchQuestion(); // Load a new question
  };

  // Handle answer submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (gameOver) return;

    const lastDigit = imageUrl.match(/\d(?=\.png)/)[0];
    if (answer.trim() === lastDigit) {
      // Correct answer
      setScore((prevScore) => prevScore + 10); // Award points
      fetchQuestion(); // Fetch the next question
    } else {
      // Incorrect answer
      setChances((prevChances) => {
        if (prevChances - 1 === 0) {
          setGameOver(true); // End the game
          setLeaderboardVisible(true); // Show the leaderboard
        }
        return Math.max(prevChances - 1, 0);
      });
    }
    setAnswer(""); // Clear the input field
  };

  return (
    <div className="game-level-container">
      {/* Game Over or Leaderboard Overlay */}
      {leaderboardVisible ? (
        <Leaderboard score={score} />
      ) : gameOver ? (
        <GameOverOverlay score={score} />
      ) : (
        <>
          {/* Timer and chances */}
          <div className="timer-container">
            <h3 className="timer">Time left: {timer} seconds</h3>
            <h3 className="chances">Chances left: {chances}</h3>
            <h3 className="score">Score: {score}</h3>
          </div>

          {/* Question and answer */}
          <div className="question-container">
            {imageUrl ? (
              <img src={imageUrl} alt="Question" className="question-image" />
            ) : (
              <p>Loading question...</p>
            )}
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Enter your answer"
                disabled={gameOver}
              />
              <button type="submit" disabled={gameOver}>
                Submit
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

GameLevel.propTypes = {
  difficulty: PropTypes.string.isRequired,
  initialTimerDuration: PropTypes.number.isRequired,
  initialChances: PropTypes.number.isRequired,
};

export default GameLevel;