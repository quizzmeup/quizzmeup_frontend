import PossibleAnswerInput from "./PossibleAnswerInput";
import RightWrongButton from "./RightWrongButton";
import AddRemoveButton from "./AddRemoveButton";

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
    <div>
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
      />{" "}
      {question.propositions.length > 2 && (
        <AddRemoveButton
          sign="-"
          propositionIndex={propositionIndex}
          setQuiz={setQuiz}
          index={index}
        />
      )}
      {propositionIndex === question.propositions.length - 1 && (
        <AddRemoveButton sign="+" setQuiz={setQuiz} index={index} />
      )}
    </div>
  );
};
//
export default MultipleChoiceAnswers;
