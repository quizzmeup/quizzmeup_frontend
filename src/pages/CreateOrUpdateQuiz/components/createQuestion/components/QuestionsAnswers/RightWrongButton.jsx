import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const RightWrongButton = ({ index, question, proposition, setQuiz }) => {
  //check if this proposition is include in the rightAnswers array and set the rightAnswers selection logo
  const isRightAnswer = question.rightAnswers.includes(proposition);

  const handleClick = () => {
    setQuiz((prevState) => {
      const newQuiz = structuredClone(prevState);

      //if proposition isn't the right answer, add it to rightAnswers array
      if (!isRightAnswer) {
        newQuiz.questions[index].rightAnswers.push(proposition);
        return newQuiz;
      } else {
        //if proposition already in rightAnswers array=> remove it
        const rightAnswerIndex =
          newQuiz.questions[index].rightAnswers.indexOf(proposition);
        newQuiz.questions[index].rightAnswers.splice(rightAnswerIndex, 1);
        return newQuiz;
      }
    });
  };
  return (
    <button onClick={handleClick}>
      {isRightAnswer ? <FaCheck /> : <ImCross />}
    </button>
  );
};
//
export default RightWrongButton;
