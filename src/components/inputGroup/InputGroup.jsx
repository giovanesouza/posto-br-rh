import "./InputGroup.css";

export const InputGroup = ({
  label,
  type,
  name,
  placeholder,
  value,
  checked,
  step,
  min,
  max,
  minLength,
  maxLength,
  onChange,
  autoFocus,
  readOnly,
  disabled,
  inputClassName
}) => {
  return (
    <div
      className={
        type != "checkbox" ? "input-group" : "input-group-checkbox"
      }
    >
      <label htmlFor={name}>{label}</label>
      <input
        autoComplete="off"
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        checked={checked}
        step={step}
        min={min}
        max={max}
        minLength={minLength}
        maxLength={maxLength}
        onChange={onChange}
        autoFocus={autoFocus}
        readOnly={readOnly}
        disabled={disabled}
        className={inputClassName}
      />
    </div>
  );
};
