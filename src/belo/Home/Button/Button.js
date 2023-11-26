// Button.js
import "./Button.css";
function Button({ text, onClick, type }) {
  return (
    <button className={`btn btn-${type}`} onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
