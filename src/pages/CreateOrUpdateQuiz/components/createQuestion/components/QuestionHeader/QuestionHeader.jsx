import "./questionHeader.css";
import { LuFileSpreadsheet, LuTrash } from "react-icons/lu";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { FaCheck, FaCode } from "react-icons/fa6";
import { useEffect, useState } from "react";
import {
  handleClickOptionToUp,
  handleClickOptionDelete,
  handleClickOptionToDown,
} from "./createQuestionsUtils";

const QuestionHeader = ({ setQuiz, index, question, isLastIndex }) => {
  const [codeInput, setCodeInput] = useState(false);

  useEffect(() => {
    if (question.markdownCode) {
      setCodeInput(true);
    }
  }, [question.markdownCode]);

  //Handle form functions
  const handleOnchangeTitle = (event) => {
    setQuiz((prevState) => {
      const newQuiz = structuredClone(prevState);
      newQuiz.questions[index].title = event.target.value;
      return newQuiz;
    });
  };

  const handleOnChangeMarkDown = (event) => {
    setQuiz((prevState) => {
      const newQuiz = structuredClone(prevState);
      newQuiz.questions[index].markdownCode = event.target.value;
      return newQuiz;
    });
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
            onClick={() => handleClickOptionToUp(index, setQuiz)}
            disabled={index === 0}
          >
            <FaChevronUp />
          </button>
          <button
            onClick={() => handleClickOptionToDown(index, setQuiz)}
            disabled={isLastIndex}
          >
            <FaChevronDown />
          </button>
          <button onClick={() => handleClickOptionDelete(index, setQuiz)}>
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
