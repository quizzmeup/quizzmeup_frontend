import "./AddQuestionButton.css";
import { LuFileSpreadsheet } from "react-icons/lu";
import { FaCheck } from "react-icons/fa6";

const AddQuestionButton = ({ setQuizVersion }) => {
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
    setQuizVersion((prevState) => {
      const newQuiz = structuredClone(prevState);

      switch (questionType) {
        case "QCM":
          newQuiz.questions.push(QCMQuestionSchema);
          break;
        case "free":
          newQuiz.questions.push(freeAnswersQuestionSchema);
          break;
        default:
          throw new Error("Type de question inconnue");
      }
      return newQuiz;
    });
  };
  return (
    <div className="buttons-add-question">
      <button
        aria-label="Ajouter une question à réponse libre"
        onClick={() => handleClick("free")}
      >
        <LuFileSpreadsheet /> Ajouter une question Texte
      </button>
      <button
        aria-label="Ajouter une question QCM"
        onClick={() => handleClick("QCM")}
      >
        <FaCheck /> Ajouter une question QCM
      </button>
    </div>
  );
};
export default AddQuestionButton;
