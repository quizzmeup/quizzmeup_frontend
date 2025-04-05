import "./CreateQuestion.css";
import { LuFileSpreadsheet, LuTrash } from "react-icons/lu";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { FaCheck, FaCode } from "react-icons/fa6";
import { useState } from "react";
import { handleClickQuestionOptions } from "../../createQuestionsUtils";

const CreateQuestion = ({ index, lastIndex, question, setQuiz }) => {
  const [codeInput, setCodeInput] = useState(false);

  //Handle form functions
  const handleOnchangeTitle = (event) => {
    setQuiz((prevState) => {
      const newQuiz = structuredClone(prevState);
      newQuiz.questions[index] = event.target.value;
      return newQuiz;
    });
  };

  //handle the otpions buttons

  // const handleClickQuestionOptions = (event, option) => {
  //   if (option === "toggleTextArea") {
  //     return setCodeInput(!codeInput);
  //   }

  //   setQuiz((prevState) => {
  //     const newQuiz = structuredClone(prevState);

  //     const newQuizQuestions = newQuiz.questions.toSpliced(index, 1);

  //     if (option === "toUp") {
  //       newQuizQuestions.splice(index - 1, 0, prevState.questions[index]);
  //     }

  //     if (option === "toDown") {
  //       newQuizQuestions.splice(index + 1, 0, prevState.questions[index]);
  //     }
  //     newQuiz.questions = newQuizQuestions;

  //     if (option === "delete") {
  //       return newQuiz;
  //     }

  //     return newQuiz;
  //   });
  // };

  return (
    <div className="created-question">
      <div className="question-header">
        <div className="question-type">
          {index} - <LuFileSpreadsheet />
        </div>
        <input
          type="text"
          placeholder="Votre question"
          value={question.title}
          onChange={handleOnchangeTitle}
        />

        <div className="question-options">
          <button
            onClick={(event) =>
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
export default CreateQuestion;
