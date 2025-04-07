import AnswersInput from "./AnswersInput";
import RightWrongButton from "./RightWrongButton";
import AddRemoveButton from "./AddRemoveButton";
import MultipleChoiceAnswers from "./MultipleChoiceAnswers";
import { useState } from "react";

const QuestionAnswers = ({ question, setQuiz, index }) => {
  const handleOnchangeAnswer = (event) => {
    setQuiz((prevState) => {
      const newQuiz = structuredClone(prevState);
      newQuiz.questions[index].rightAnswers = event.target.value;
      return newQuiz;
    });
  };
  return (
    <div>
      <h3>
        {question.multipleChoices ? "Réponses possibles" : "Réponse attendue"}
      </h3>
      {!question.multipleChoices && (
        <AnswersInput
          question={question}
          setQuiz={setQuiz}
          index={index}
          value={question.rightAnswers}
          onChange={handleOnchangeAnswer}
        />
      )}
      {question.multipleChoices &&
        question.propositions.map((proposition, index) => {
          const isRightAnswer = [];
          for (let i = 0; i < proposition.length; i++) {
            if (question.rightAnswers.includes(proposition)) {
              isRightAnswer.push(true);
            } else {
              isRightAnswer.push(false);
            }
          }
          return (
            <MultipleChoiceAnswers
              key={index}
              isRightAnswer={isRightAnswer}
              proposition={proposition}
              index={index}
              onChange={handleOnchangeAnswer}
              question={question}
            />
          );
        })}
    </div>
  );
};
//
export default QuestionAnswers;
