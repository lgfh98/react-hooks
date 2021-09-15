import React from "react";

const CheckDarkMode = () => {
  return (
    <input
      type="checkbox"
      id="checkbox"
      onChange={() => {
        document.body.classList.toggle("dark");
      }}
    />
  );
};

export default CheckDarkMode;
