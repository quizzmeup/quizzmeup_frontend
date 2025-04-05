import "./AnswerField.css";

const AnswerField = ({ question, currentAnswers, onChange }) => {
  const isQcm = question.propositions?.length > 0;

  const handleTextChange = (e) => {
    onChange([e.target.value]);
  };

  const toggleProp = (prop) => {
    if (currentAnswers.includes(prop)) {
      onChange(currentAnswers.filter((p) => p !== prop));
    } else {
      onChange([...currentAnswers, prop]);
    }
  };

  return (
    <div className="answer-field">
      {isQcm ? (
        <ul className="qcm-list">
          {question.propositions.map((prop, i) => (
            <li key={i} className="qcm-item">
              <label>
                <input
                  type="checkbox"
                  checked={currentAnswers.includes(prop)}
                  onChange={() => toggleProp(prop)}
                />
                {prop}
              </label>
            </li>
          ))}
        </ul>
      ) : (
        <textarea
          className="answer-textarea"
          placeholder="Tape ta réponse ici..."
          value={currentAnswers[0] || ""} // Les réponses libres sont stockées dans un tableau avec un seul élément
          onChange={handleTextChange}
        />
      )}
    </div>
  );
};

export default AnswerField;
