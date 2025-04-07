const AnswersInput = ({ question, setQuiz, index, onChange, value }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Votre réponse"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
//
export default AnswersInput;
