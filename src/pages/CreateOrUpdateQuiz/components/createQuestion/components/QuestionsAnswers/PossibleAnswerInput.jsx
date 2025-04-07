const PossibleAnswerInput = ({
  index,
  proposition,
  setQuiz,
  propositionIndex,
  isRightAnswer,
}) => {
  const handlePossibleAnswerChange = (event) => {
    setQuiz((prevState) => {
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
      type="text"
      value={proposition}
      onChange={handlePossibleAnswerChange}
    />
  );
};
export default PossibleAnswerInput;
