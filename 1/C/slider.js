// Create a slider in react
// 1. Have its value stored in state
// 2. Have it fire an event with the value
// 3. Have it fire the event only when the user has stopped moving it

import React, { useState, useRef, useEffect } from "react";

const Slider = () => {
  const [value, setValue] = useState(0);
  const timeoutId = useRef(null);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => {
      // Fire the event with the value when the user has stopped moving the slider
      console.log("Value:", value);
    }, 500);
  }, [value]);

  return (
    <div>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={handleChange}
      />
      <p>Value: {value}</p>
    </div>
  );
};

export default Slider;