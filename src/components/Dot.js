import React from "react";
import Color from "color";

const Dot = ({ color, isOn, size }) => {
  const backgroundColor = isOn
    ? Color(color).lighten(0.4)
    : Color(color).alpha(0.3).desaturate(0.5);
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: backgroundColor,
        boxShadow: isOn
          ? `0 0 ${size / 2}px ${color}, 0 0 ${size}px ${color}`
          : undefined,
      }}
    />
  );
};

export default Dot;
