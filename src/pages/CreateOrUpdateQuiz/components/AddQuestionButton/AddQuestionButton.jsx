import "./addQuestionButton.css";
import { LuFileSpreadsheet } from "react-icons/lu";
import { FaCheck } from "react-icons/fa6";

const addQuestionButton = ({ setQuiz }) => {
  const freeAnswersQuestionSchema = {
    markdownCode: "",
    multipleChoices: false,
    propositions: [],
    rightAnswers: [],
    title: "",
    points: 1,
  };

  const QCMQuestionSchema = {
    markdownCode: "",
    multipleChoices: true,
    propositions: ["", ""],
    rightAnswers: [],
    title: "",
    points: 1,
  };

  const handleClick = (questionType) => {
    setQuiz((prevState) => {
      const newQuiz = structuredClone(prevState);
      if (questionType === "QCMQuestion") {
        newQuiz.questions.push(QCMQuestionSchema);
      } else {
        newQuiz.questions.push(freeAnswersQuestionSchema);
      }
      return newQuiz;
    });
  };
  return (
    <div className="buttons-add-question">
      <button onClick={() => handleClick("freeAnswerQuestion")}>
        <LuFileSpreadsheet /> Ajouter une question Texte
      </button>
      <button onClick={() => handleClick("QCMQuestion")}>
        <FaCheck /> Ajouter une question QCM
      </button>
    </div>
  );
};
export default addQuestionButton;
