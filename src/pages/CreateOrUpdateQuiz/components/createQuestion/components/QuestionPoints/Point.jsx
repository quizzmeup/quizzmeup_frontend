const Point = ({ nbOfPoints, selected, onSelect }) => {
  return (
    <div
      className={selected ? "point point-selected" : "point"}
      onClick={() => onSelect(nbOfPoints)}
    >
      {nbOfPoints}
    </div>
  );
};
export default Point;
