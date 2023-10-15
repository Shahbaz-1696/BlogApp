/* eslint-disable react/prop-types */
import React, { useId } from "react";

const Input = React.forwardRef(function Input({
  type = "text",
  label,
  className = "",
  ...props
}, ref) {
  const id = useId();
  return (
    <div>
      {label && (
        <label htmlFor={id} className="inline-block pl-1 mb-1">
          {label}
        </label>
      )}
      <input
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none duration-200 w-full border border-gray-200 focus:bg-gray-50 ${className}`}
        type={type}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
});

export default Input;
