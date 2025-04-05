import { useState } from "react";
import "./QuestionPoints.css";
import Point from "./Point";

const QuestionPoints = ({ question, setQuiz, index }) => {
  const [questionPoints, setQuestionPoints] = useState(question.points);
  const [nbOfPointsElem, setNbOfPointElem] = useState(
    question.points > 4 ? question.points : 4
  );

  const displayPointsElement = [
    <Point key={"+"} nbOfPoints={"+"} setNbOfPointElem={setNbOfPointElem} />,
  ];
  for (let i = 0; i < nbOfPointsElem; i++) {
    displayPointsElement.unshift(
      <Point
        key={i}
        nbOfPoints={nbOfPointsElem - i}
        setNbOfPointElem={setNbOfPointElem}
        setQuiz={setQuiz}
        selected={nbOfPointsElem - i === question.points}
        index={index}
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
