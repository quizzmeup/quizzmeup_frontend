const AnswersInput = ({ onChange, value }) => {
  return (
    <div>
      <input
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
