import React, { useState } from "react";

const CheckDarkMode = () => {
  const [checked, setChecked] = useState(true);

  return (
    <input
      checked={checked}
      type="checkbox"
      id="checkbox"
      onChange={() => {
        setChecked(!checked);
        document.body.classList.toggle("dark");
      }}
    />
  );
};

export default CheckDarkMode;
