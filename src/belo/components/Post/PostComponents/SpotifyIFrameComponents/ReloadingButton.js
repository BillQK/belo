import "./ReloadingButton.css";
import { FaUndo } from "react-icons/fa";
const ReloadingButton = (props) => {
  return (
    <div className="d-flex justify-content-center">
      <button className="reloading-button" onClick={props.retry}>
        <FaUndo />
      </button>
    </div>
  );
};

export default ReloadingButton;
