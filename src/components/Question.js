import { queryByTestId } from "@testing-library/react";
import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // add useEffect code
  useEffect(() => {
    const reverseTimeRemaining = setTimeout(() => {
      setTimeRemaining(timeRemaining - 1)
    }, 1000)

    if (reverseTimeRemaining >= 0) {
      return function() { 
      clearTimeout(reverseTimeRemaining)
      }
    }
  },[timeRemaining, question])

  useEffect(() => {
    setTimeout(() => {
      onAnswered(false)
    }, 10000);
  }, [])


  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(false);
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
