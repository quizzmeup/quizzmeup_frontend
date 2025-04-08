import "./QuestionsAnswers.css";

const AddAnswerButton = ({ sign, setQuiz, index }) => {
  const handleClick = () => {
    setQuiz((prevSate) => {
      const newQuiz = structuredClone(prevSate);
      newQuiz.questions[index].propositions.push("");
      return newQuiz;
    });
  };
  return (
    <button className={"add-answer-button"} onClick={handleClick}>
      {sign}
    </button>
  );
};
//
export default AddAnswerButton;
