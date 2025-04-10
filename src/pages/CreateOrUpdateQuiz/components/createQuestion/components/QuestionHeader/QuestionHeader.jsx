import "./QuestionHeader.css";
import { LuFileSpreadsheet, LuTrash } from "react-icons/lu";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { FaCheck, FaCode } from "react-icons/fa6";
import { useEffect, useState } from "react";
import {
  handleClickOptionToUp,
  handleClickOptionDelete,
  handleClickOptionToDown,
} from "./createQuestionsUtils";

const QuestionHeader = ({ setQuizVersion, index, question, isLastIndex }) => {
  const [codeInput, setCodeInput] = useState(false);

  const updatequestionField = (field, value) => {
    setQuizVersion((prevState) => {
      const newQuiz = structuredClone(prevState);
      newQuiz.questions[index][field] = value;
      return newQuiz;
    });
  };

  useEffect(() => {
    if (question.markdownCode) {
      setCodeInput(true);
    }
  }, [question.markdownCode]);

  //Handle form functions
  const handleOnchangeTitle = (event) => {
    updatequestionField("title", event.target.value);
  };

  const handleOnChangeMarkDown = (event) => {
    updatequestionField("markdownCode", event.target.value);
  };
  return (
    <div className="question-header">
      <div>
        <div className="question-type">
          <span>{index + 1}</span> <span>-</span>
          {question.multipleChoices ? (
            <FaCheck color="#ffffff" size={20} />
          ) : (
            <LuFileSpreadsheet color="#ffffff" size={20} />
          )}
        </div>
        <input
          aria-label="Titre de la question"
          type="text"
          placeholder="Votre question"
          value={question.title}
          onChange={handleOnchangeTitle}
        />

        <div className="question-options">
          <button
            className={codeInput ? "box-shadow-create-question" : undefined}
            onClick={() => setCodeInput((prevState) => !prevState)}
          >
            <FaCode size={17} />
          </button>
          <button
            onClick={() => handleClickOptionToUp(index, setQuizVersion)}
            disabled={index === 0}
          >
            <FaChevronUp />
          </button>
          <button
            onClick={() => handleClickOptionToDown(index, setQuizVersion)}
            disabled={isLastIndex}
          >
            <FaChevronDown />
          </button>
          <button
            onClick={() => handleClickOptionDelete(index, setQuizVersion)}
          >
            <LuTrash />
          </button>
        </div>
      </div>
      {codeInput && (
        <textarea
          value={question.markdownCode}
          onChange={handleOnChangeMarkDown}
          placeholder="Extrait de code (facultatif)"
        ></textarea>
      )}
    </div>
  );
};
export default QuestionHeader;
