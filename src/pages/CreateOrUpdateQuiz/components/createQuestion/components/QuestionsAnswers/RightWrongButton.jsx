import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const RightWrongButton = ({ index, isRightAnswer, onClick }) => {
  return (
    <button onClick={onClick}>
      {isRightAnswer[index] ? <FaCheck /> : <ImCross />}
    </button>
  );
};

export default RightWrongButton;
