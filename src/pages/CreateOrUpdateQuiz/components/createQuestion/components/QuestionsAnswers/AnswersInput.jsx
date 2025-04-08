import "./QuestionsAnswers.css";
const AnswersInput = ({ onChange, value }) => {
  return (
    <div>
      <input
        className="answer-inputs box-shadow-create-question"
        aria-label="Réponse attendue"
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
