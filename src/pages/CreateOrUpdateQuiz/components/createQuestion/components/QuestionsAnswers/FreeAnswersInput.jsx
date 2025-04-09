import "./QuestionsAnswers.css";
const FreeAnswersInput = ({ onChange, value }) => {
  return (
    <div>
      <input
        className="answer-inputs box-shadow-create-question"
        aria-label="Réponse attendue"
        type="text"
        placeholder="Tapez la réponse attendue"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
//
export default FreeAnswersInput;
