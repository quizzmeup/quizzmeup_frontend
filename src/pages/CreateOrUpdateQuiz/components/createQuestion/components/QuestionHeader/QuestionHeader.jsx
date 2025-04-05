import "./questionHeader.css";
import { LuFileSpreadsheet, LuTrash } from "react-icons/lu";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { FaCheck, FaCode } from "react-icons/fa6";
import { useState } from "react";
import { handleClickQuestionOptions } from "../../../../createQuestionsUtils";

const QuestionHeader = ({ setQuiz, index, question, lastIndex }) => {
  const [codeInput, setCodeInput] = useState(false);

  //Handle form functions
  const handleOnchangeTitle = (event) => {
    setQuiz((prevState) => {
      const newQuiz = structuredClone(prevState);
      newQuiz.questions[index] = event.target.value;
      return newQuiz;
    });
  };
  return (
    <div className="question-header">
      <div>
        <div className="question-type">
          {index + 1}-
          {question.multipleChoices ? <FaCheck /> : <LuFileSpreadsheet />}
        </div>
        <input
          type="text"
          placeholder="Votre question"
          value={question.title}
          onChange={handleOnchangeTitle}
        />

        <div className="question-options">
          <button
            onClick={() =>
              handleClickQuestionOptions(
                "toggleTextArea",
                setQuiz,
                index,
                codeInput,
                setCodeInput
              )
            }
          >
            <FaCode />
          </button>
          <button
            onClick={() =>
              handleClickQuestionOptions(
                "toUp",
                setQuiz,
                index,
                codeInput,
                setCodeInput
              )
            }
            disabled={index === 0}
          >
            <FaChevronUp />
          </button>
          <button
            onClick={() =>
              handleClickQuestionOptions(
                "toDown",
                setQuiz,
                index,
                codeInput,
                setCodeInput
              )
            }
            disabled={index === lastIndex}
          >
            <FaChevronDown />
          </button>
          <button
            onClick={() =>
              handleClickQuestionOptions(
                "delete",
                setQuiz,
                index,
                codeInput,
                setCodeInput
              )
            }
          >
            <LuTrash />
          </button>
        </div>
      </div>
      {codeInput && <textarea>```js ````</textarea>}
    </div>
  );
};
export default QuestionHeader;
