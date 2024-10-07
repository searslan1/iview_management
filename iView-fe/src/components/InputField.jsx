import React from 'react';

const InputField = ({
  label,
  value,
  onChange,
  maxLength,
  placeholder,
  type = 'text',
  style,
  className
}) => (
  <div style={{ marginBottom: '15px', ...style }} className={className}>
    {label && <label style={{ marginBottom: '8px', display: 'block' }}>{label}</label>}
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      maxLength={maxLength}
      placeholder={placeholder}
      style={{
        width: '100%',
        padding: '10px',
        borderRadius: '15px',
        border: '1px solid #ccc',
        boxSizing: 'border-box',
        ...style,
      }}
      className={className}
    />
  </div>
);

export default InputField;
