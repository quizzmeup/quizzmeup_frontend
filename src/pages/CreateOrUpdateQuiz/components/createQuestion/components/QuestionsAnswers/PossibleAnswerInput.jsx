const PossibleAnswerInput = ({
  index,
  proposition,
  setQuiz,
  propositionIndex,
}) => {
  const handlePossibleAnswersChange = (event) => {
    setQuiz((prevState) => {
      const newQuiz = structuredClone(prevState);
      newQuiz.questions[index].propositions[propositionIndex] =
        event.target.value;
      return newQuiz;
    });
  };

  return (
    <input
      type="text"
      value={proposition}
      onChange={handlePossibleAnswersChange}
    />
  );
};
export default PossibleAnswerInput;
