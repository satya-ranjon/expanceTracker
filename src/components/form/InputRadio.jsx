import React from "react";

const InputRadio = ({ label, value, checked, onChange }) => {
  return (
    <div className="radio_group">
      <label htmlFor="transaction_type">{label}</label>
      <input
        type="radio"
        value={value}
        name="type"
        checked={checked}
        onChange={onChange}
      />
    </div>
  );
};

export default InputRadio;
