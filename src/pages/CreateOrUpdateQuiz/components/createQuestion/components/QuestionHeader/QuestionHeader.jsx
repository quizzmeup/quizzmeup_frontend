import "./questionHeader.css";
import { LuFileSpreadsheet, LuTrash } from "react-icons/lu";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { FaCheck, FaCode } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { handleClickQuestionOptions } from "../../../../createQuestionsUtils";

const QuestionHeader = ({ setQuiz, index, question, lastIndex }) => {
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
      {codeInput && (
        <textarea
          value={question.markdownCode}
          onChange={handleOnChangeMarkDown}
        ></textarea>
      )}
    </div>
  );
};
export default QuestionHeader;
