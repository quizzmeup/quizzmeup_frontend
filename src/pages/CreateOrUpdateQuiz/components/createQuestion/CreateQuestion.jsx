import "./CreateQuestion.css";
import { LuFileSpreadsheet, LuTrash } from "react-icons/lu";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { FaCheck, FaCode } from "react-icons/fa6";
import { useState } from "react";

const CreateQuestion = ({ index, question }) => {
  console.log(question);
  const [codeInput, setCodeInput] = useState(false);

  return (
    <div className="created-question">
      <div className="question-header">
        <div className="question-type">
          {index} - <LuFileSpreadsheet />
        </div>
        <input type="text" placeholder="Votre question" />

        <div className="question-options">
          <button onClick={() => setCodeInput(!codeInput)}>
            <FaCode />
          </button>
          <button>
            <FaChevronUp />
          </button>
          <button>
            <FaChevronDown />
          </button>
          <button>
            <LuTrash />
          </button>
        </div>
      </div>
      <textarea>```js ````</textarea>
    </div>
  );
};
export default CreateQuestion;
