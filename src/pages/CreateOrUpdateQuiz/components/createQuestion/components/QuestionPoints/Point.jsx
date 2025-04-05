const Point = ({ nbOfPoints, setNbOfPointElem, selected, setQuiz, index }) => {
  const handleClickPoint = (event) => {
    if (nbOfPoints === "+") {
      return setNbOfPointElem((prevState) => prevState + 1);
    }

    setQuiz((prevState) => {
      const newQuiz = structuredClone(prevState);
      newQuiz.questions[index].points = nbOfPoints;
      return newQuiz;
    });
  };
  return (
    <div
      className={selected ? "point point-selected" : "point"}
      onClick={handleClickPoint}
    >
      {nbOfPoints}
    </div>
  );
};
export default Point;
