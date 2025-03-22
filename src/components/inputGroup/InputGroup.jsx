import "./InputGroup.css";

export const InputGroup = ({
  label,
  type,
  name,
  placeholder,
  value,
  maxLength,
  onChange,
  autoFocus
}) => {
  return (
    <div
      className={
        type != "checkbox" ? "input-group" : "input-group-checkbox"
      }
    >
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        maxLength={maxLength}
        onChange={onChange}
        autoFocus={autoFocus}
      />
    </div>
  );
};
