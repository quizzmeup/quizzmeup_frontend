import "./QuestionsAnswers.css";
const PossibleAnswerInput = ({
  index,
  proposition,
  setQuizVersion,
  propositionIndex,
  isRightAnswer,
}) => {
  const handlePossibleAnswerChange = (event) => {
    setQuizVersion((prevState) => {
      const newQuiz = structuredClone(prevState);

      if (isRightAnswer) {
        // update the right answer corresponding to the proposition
        newQuiz.questions[index].rightAnswers[
          newQuiz.questions[index].rightAnswers.indexOf(proposition)
        ] = event.target.value;
      }
      newQuiz.questions[index].propositions[propositionIndex] =
        event.target.value;
      return newQuiz;
    });
  };

  return (
    <input
      className={
        isRightAnswer
          ? "answer-inputs box-shadow-create-question good-answer-input"
          : "answer-inputs wrong-answer-input"
      }
      aria-label="Réponse possible"
      type="text"
      value={proposition}
      onChange={handlePossibleAnswerChange}
    />
  );
};
export default PossibleAnswerInput;
