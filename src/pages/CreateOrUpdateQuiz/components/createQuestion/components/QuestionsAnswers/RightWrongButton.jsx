import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const RightWrongButton = ({
  index,
  isRightAnswer,
  proposition,
  setQuizVersion,
}) => {
  const handleClick = () => {
    if (proposition !== "") {
      setQuizVersion((prevState) => {
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
    }
  };
  return (
    <button
      onClick={handleClick}
      className={
        isRightAnswer
          ? "QCM-good-answer-choice-button QCM-good-answer box-shadow-create-question"
          : "QCM-good-answer-choice-button QCM-wrong-aswer box-shadow-create-question"
      }
    >
      {isRightAnswer ? <FaCheck /> : <ImCross />}
    </button>
  );
};
//
export default RightWrongButton;
