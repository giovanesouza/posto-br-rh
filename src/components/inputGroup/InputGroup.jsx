import React, { useState } from "react";
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
  inputClassName,
  icon,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleTogglePasswordVisibility = () => {
    if (icon === "visibility" || icon === "visibility_off") {
      setIsPasswordVisible(!isPasswordVisible);
    }
  };

  return (
    <div
      className={type != "checkbox" ? "input-group" : "input-group-checkbox"}
    >
      <label htmlFor={name}>{label}</label>
      <input
        autoComplete="off"
        type={isPasswordVisible && type === "password" ? "text" : type}
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

      {icon && (
        <span
          className="material-symbols-outlined input-group-icon"
          onClick={handleTogglePasswordVisibility}
          style={{
            cursor:
              icon === "visibility" || icon === "visibility_off"
                ? "pointer"
                : "default",
          }}
        >
          {icon === "visibility" || icon === "visibility_off"
            ? isPasswordVisible
              ? "visibility"
              : "visibility_off"
            : icon}
        </span>
      )}
    </div>
  );
};
