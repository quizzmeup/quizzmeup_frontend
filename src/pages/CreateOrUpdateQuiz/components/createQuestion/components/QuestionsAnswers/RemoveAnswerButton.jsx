import "./QuestionsAnswers.css";
import { LuTrash } from "react-icons/lu";

const RemoveAnswerButton = ({ propositionIndex, setQuiz, index }) => {
  const handleClick = () => {
    setQuiz((prevSate) => {
      const newQuiz = structuredClone(prevSate);
      newQuiz.questions[index].propositions.splice(propositionIndex, 1);
      return newQuiz;
    });
  };
  return (
    <button className="possible-answer-trash-button" onClick={handleClick}>
      <LuTrash className="possible-answer-trash-icon" />
    </button>
  );
};
//
export default RemoveAnswerButton;
