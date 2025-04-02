import { RxOpenInNewWindow } from "react-icons/rx";
import "./OpenButton.css";

const OpenButton = () => {
  return (
    <button className="open-button">
      <RxOpenInNewWindow />
    </button>
  );
};

export default OpenButton;
