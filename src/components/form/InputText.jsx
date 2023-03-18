import React from "react";

const InputText = ({ name, type, placeholder, value, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </label>
      <input
        required
        type={type}
        name={name}
        id={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default InputText;

{
  /* <div className="radio_group">
  <label htmlFor="transaction_type">Income</label>
  <input type="radio" value="income" name="transaction_type" defaultChecked />
</div>; */
}
