import React, { useEffect, useState } from 'react';
const DatePicker = ({ value, onChange, label, style, minDate }) => {
  const [selectedDate, setSelectedDate] = useState(value);
  useEffect(() => {
    setSelectedDate(value);
  }, [value]);
  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
    onChange(newDate);
  };
  return (
    <div style={style}>
      {label && <label style={{ marginBottom: '8px', display: 'block' }}>{label}</label>}
      <input
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        min={minDate} // Minimum tarih belirleniyor
        style={{
          width: '100%',
          padding: '10px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          boxSizing: 'border-box',
          ...style
        }}
      />
    </div>
  );
};
export default DatePicker;