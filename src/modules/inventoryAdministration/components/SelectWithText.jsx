import React, { useState } from "react";

const SelectWithText = ({ optionsSelect, onChange, name }) => {
  const [options, setOptions] = useState(optionsSelect);
  return (
    <select
      className="select__with__text"
      onChange={(e) => {
        onChange(e);
      }}
      name={name ? name : "connection_type"}
    >
      {options?.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default SelectWithText;
