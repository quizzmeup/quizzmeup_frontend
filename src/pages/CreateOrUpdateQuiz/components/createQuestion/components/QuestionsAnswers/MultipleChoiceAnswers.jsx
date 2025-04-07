import AnswersInput from "./AnswersInput";
import PossibleAnswerInput from "./PossibleAnswerInput";
import RightWrongButton from "./RightWrongButton";
import AddRemoveButton from "./AddRemoveButton";
import { useState } from "react";

const MultipleChoiceAnswers = ({
  index,
  propositionIndex,
  proposition,
  isRightAnswer,
  setQuiz,
  question,
}) => {
  const [rightAnswer, setRightAnswer] = useState(isRightAnswer[0]);

  // console.log(isRightAnswer[0]);

  // const handleChangeRightAnswer = (event) => {
  //   setRightAnswer(!rightAnswer[index]);
  // };

  return (
    <div>
      <PossibleAnswerInput
        index={index}
        proposition={proposition}
        propositionIndex={propositionIndex}
        setQuiz={setQuiz}
      />
      <RightWrongButton
        question={question}
        proposition={proposition}
        setQuiz={setQuiz}
        index={index}
      />
      {index === question.propositions.length - 1 && (
        <div>
          <AddRemoveButton sign="+" />
          <AddRemoveButton sign="-" />
        </div>
      )}
    </div>
  );
};
//
export default MultipleChoiceAnswers;
