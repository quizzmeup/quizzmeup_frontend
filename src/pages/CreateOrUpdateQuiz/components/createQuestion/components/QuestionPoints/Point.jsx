const Point = ({ nbOfPoints, selected, onSelect }) => {
  return (
    <div
      className={
        selected ? "point point-selected box-shadow-create-question" : "point"
      }
      onClick={() => onSelect(nbOfPoints)}
    >
      {nbOfPoints}
    </div>
  );
};
export default Point;
