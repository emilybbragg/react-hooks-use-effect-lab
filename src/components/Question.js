/*When the Question component renders, create a side effect using useEffect and use setTimeout 
to run a callback function after 1 second*/

import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // add useEffect code
  useEffect (() => {
  if (timeRemaining === 0) {
    setTimeRemaining(10);
    onAnswered(false);
    return;
  }

  //initializing timeout to run
  const timerID = setTimeout(() => {
    setTimeRemaining((timeRemaining) => timeRemaining - 1)
  }, 1000);

  //cleanup function for useEffect to clean up after the timeout function: using dependencies timeRemaining, onAnswered
  return function () {
    clearTimeout(timerID);
  };
}, [timeRemaining, onAnswered]);

//reset timer if question is answered correctly
function handleAnswer(isCorrect) {
  setTimeRemaining(10);
  onAnswered(isCorrect);
}

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;