import { useState } from "react";
import "./QuestionPoints.css";
import Point from "./Point";

const QuestionPoints = ({ question, setQuiz, index }) => {
  const [nbOfPointsElem, setNbOfPointElem] = useState(
    question.points > 4 ? question.points : 4
  );
  const onSelect = (nbOfPoints) => {
    console.log(nbOfPoints);

    if (nbOfPoints === "+") {
      return setNbOfPointElem((prevState) => prevState + 1);
    }

    setQuiz((prevState) => {
      const newQuiz = structuredClone(prevState);
      newQuiz.questions[index].points = nbOfPoints;
      return newQuiz;
    });
  };
  const displayPointsElement = [
    <Point
      key={"+"}
      nbOfPoints={"+"}
      onSelect={() => setNbOfPointElem((prevState) => prevState + 1)}
    />,
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
