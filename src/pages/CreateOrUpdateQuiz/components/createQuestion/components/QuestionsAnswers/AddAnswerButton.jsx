import "./QuestionsAnswers.css";

const AddAnswerButton = ({ icon, setQuiz, index }) => {
  const handleClick = () => {
    setQuiz((prevSate) => {
      const newQuiz = structuredClone(prevSate);
      newQuiz.questions[index].propositions.push("");
      return newQuiz;
    });
  };
  return (
    <button className={"add-answer-button"} onClick={handleClick}>
      {icon}
    </button>
  );
};
//
export default AddAnswerButton;
