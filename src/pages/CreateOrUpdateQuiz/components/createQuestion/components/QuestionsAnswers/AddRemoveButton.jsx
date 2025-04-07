import { LuTrash } from "react-icons/lu";

const AddRemoveButton = ({ sign, propositionIndex, setQuiz, index }) => {
  const handleClick = () => {
    setQuiz((prevSate) => {
      const newQuiz = structuredClone(prevSate);

      //delete a possible answer
      if (sign === "-") {
        newQuiz.questions[index].propositions.splice(propositionIndex, 1);
      } else {
        newQuiz.questions[index].propositions.push("");
      }

      return newQuiz;
    });
  };
  return (
    <button onClick={handleClick}>{sign === "-" ? <LuTrash /> : sign}</button>
  );
};
//
export default AddRemoveButton;
