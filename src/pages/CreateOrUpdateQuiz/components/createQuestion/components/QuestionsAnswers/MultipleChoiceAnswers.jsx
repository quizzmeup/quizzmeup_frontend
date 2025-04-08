import "./QuestionsAnswers.css";
import PossibleAnswerInput from "./PossibleAnswerInput";
import RightWrongButton from "./RightWrongButton";
import AddAnswerButton from "./AddAnswerButton";
import RemoveAnswerButton from "./RemoveAnswerButton";

const MultipleChoiceAnswers = ({
  index,
  propositionIndex,
  proposition,
  setQuiz,
  question,
}) => {
  //check if this proposition is include in the rightAnswers array and set the rightAnswers selection logo
  const isRightAnswer = question.rightAnswers.includes(proposition);

  return (
    <div className="QCM-answers">
      {question.propositions.length > 2 && (
        <RemoveAnswerButton
          sign="trash"
          propositionIndex={propositionIndex}
          setQuiz={setQuiz}
          index={index}
        />
      )}
      <PossibleAnswerInput
        index={index}
        proposition={proposition}
        propositionIndex={propositionIndex}
        setQuiz={setQuiz}
        isRightAnswer={isRightAnswer}
      />
      <RightWrongButton
        question={question}
        proposition={proposition}
        setQuiz={setQuiz}
        index={index}
        isRightAnswer={isRightAnswer}
      />
      {propositionIndex === question.propositions.length - 1 && (
        <AddAnswerButton sign="+" setQuiz={setQuiz} index={index} />
      )}
    </div>
  );
};
//
export default MultipleChoiceAnswers;
