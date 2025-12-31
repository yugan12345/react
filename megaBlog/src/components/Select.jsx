import React, { useId, forwardRef } from "react";

const Select = forwardRef(function Select(
  { options = [], label, className = "", value, onChange, ...props },
  ref
) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="mb-1 inline-block">
          {label}
        </label>
      )}

      <select
        id={id}
        ref={ref}
        value={value}                       // 🔥 REQUIRED
        onChange={(e) => onChange(e.target.value)} // 🔥 REQUIRED
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
});

export default Select;
