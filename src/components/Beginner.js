import React from 'react';
import GameLevel from './GameLevel';
import '../styling/Beginner.css';

const Beginner = () => {
  // Define the conditions for the Beginner level
  const initialTimerDuration = 30; // Initial timer duration in seconds
  const initialChances = 3; // Initial number of chances
  const maxQuestions = 15; // Maximum number of questions

  return (
    <GameLevel
      difficulty="Beginner"
      initialTimerDuration={initialTimerDuration}
      initialChances={initialChances}
      maxQuestions={maxQuestions}
    />
  );
};
export default Beginner;