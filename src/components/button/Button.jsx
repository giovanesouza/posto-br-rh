import "./Button.css";

export const Button = ({ type, content, onClick }) => {
  return (
    <button type={type} onClick={onClick}>
      {content}
    </button>
  );
};
