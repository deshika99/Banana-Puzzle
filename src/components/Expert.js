import React from "react";
import GameLevel from "./GameLevel";
import "../styling/Expert.css";

const Expert = () => {
  return (
    <GameLevel
      difficulty="Expert"
      initialTimerDuration={20}
      initialChances={2}
    />
  );
};

export default Expert;
