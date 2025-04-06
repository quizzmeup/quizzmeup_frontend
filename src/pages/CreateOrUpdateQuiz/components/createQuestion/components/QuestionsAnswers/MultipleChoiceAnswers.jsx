import AnswersInput from "./AnswersInput";
import RightWrongButton from "./RightWrongButton";
import AddRemoveButton from "./AddRemoveButton";
import { useState } from "react";

const MultipleChoiceAnswers = ({
  index,
  proposition,
  isRightAnswer,
  onChange,
  question,
}) => {
  const [rightAnswer, setRightAnswer] = useState(isRightAnswer[0]);

  console.log(isRightAnswer[0]);

  const handleChangeRightAnswer = (event) => {
    setRightAnswer(!rightAnswer[index]);
  };

  return (
    <div>
      <AnswersInput value={proposition} onChange={onChange} />
      <RightWrongButton
        isRightAnswer={isRightAnswer}
        index={index}
        onClick={handleChangeRightAnswer}
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

export default MultipleChoiceAnswers;
