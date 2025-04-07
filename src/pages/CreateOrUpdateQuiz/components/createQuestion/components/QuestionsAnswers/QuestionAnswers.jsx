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
          // question={question}
          // setQuiz={setQuiz}
          // index={index}
          value={question.rightAnswers}
          onChange={handleOnchangeAnswer}
        />
      )}
      {question.multipleChoices &&
        question.propositions.map((proposition, propositionIndex) => {
          return (
            <MultipleChoiceAnswers
              key={propositionIndex}
              proposition={proposition}
              index={index}
              propositionIndex={propositionIndex}
              setQuiz={setQuiz}
              question={question}
            />
          );
        })}
    </div>
  );
};
//
export default QuestionAnswers;
