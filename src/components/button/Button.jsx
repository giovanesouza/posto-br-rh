import "./Button.css";

export const Button = ({ type, content, onClick, style }) => {
  return (
    <button style={style} type={type} onClick={onClick}>
      {content}
    </button>
  );
};
