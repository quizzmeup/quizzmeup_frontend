import "./QuestionsAnswers.css";

const AddAnswerButton = ({ icon, setQuizVersion, index }) => {
  const handleClick = () => {
    setQuizVersion((prevSate) => {
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
