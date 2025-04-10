import "./QuestionsAnswers.css";
import PossibleAnswerInput from "./PossibleAnswerInput";
import RightWrongButton from "./RightWrongButton";
import AddAnswerButton from "./AddAnswerButton";
import RemoveAnswerButton from "./RemoveAnswerButton";

const MultipleChoiceAnswers = ({
  index,
  propositionIndex,
  proposition,
  setQuizVersion,
  question,
}) => {
  //check if this proposition is include in the rightAnswers array and set the rightAnswers selection logo
  const isRightAnswer =
    proposition && question.rightAnswers.includes(proposition);

  return (
    <div className="multiple-choice-answers">
      {question.propositions.length > 2 && (
        <RemoveAnswerButton
          propositionIndex={propositionIndex}
          setQuizVersion={setQuizVersion}
          index={index}
        />
      )}
      <PossibleAnswerInput
        index={index}
        proposition={proposition}
        propositionIndex={propositionIndex}
        setQuizVersion={setQuizVersion}
        isRightAnswer={isRightAnswer}
      />
      <RightWrongButton
        question={question}
        proposition={proposition}
        setQuizVersion={setQuizVersion}
        index={index}
        isRightAnswer={isRightAnswer}
      />
      {propositionIndex === question.propositions.length - 1 && (
        <AddAnswerButton
          icon="+"
          setQuizVersion={setQuizVersion}
          index={index}
        />
      )}
    </div>
  );
};
//
export default MultipleChoiceAnswers;
