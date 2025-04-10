import { useState } from "react";
import "./QuestionPoints.css";
import Point from "./Point";

const QuestionPoints = ({ question, setQuizVersion, index }) => {
  const [nbOfPointsElem, setNbOfPointElem] = useState(
    question.points > 4 ? question.points : 4
  );
  const onSelect = (nbOfPoints) => {
    if (nbOfPoints === "+") {
      return setNbOfPointElem((prevState) => prevState + 1);
    }

    setQuizVersion((prevState) => {
      const newQuiz = structuredClone(prevState);
      newQuiz.questions[index].points = nbOfPoints;
      return newQuiz;
    });
  };

  const displayPointsElement = [
    <Point key={"+"} nbOfPoints={"+"} onSelect={() => onSelect("+")} />,
  ];
  for (let i = 0; i < nbOfPointsElem; i++) {
    displayPointsElement.unshift(
      <Point
        key={i}
        nbOfPoints={nbOfPointsElem - i}
        selected={nbOfPointsElem - i === question.points}
        onSelect={onSelect}
      />
    );
  }

  return (
    <div className="question-points">
      <h3>Points alloués: </h3>
      {displayPointsElement}
    </div>
  );
};
export default QuestionPoints;
