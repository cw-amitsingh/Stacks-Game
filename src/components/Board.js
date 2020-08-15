import React from "react";
import config from "../constants/configuration";
import Dot from "./Dot";

const Spacer = ({ size }) => <div style={{ width: size, height: size }} />;

const Board = ({ color, dotSize, rows }) => {
  const spacing = dotSize / 4;
  const dotRows = [];
  for (let i = 0; i < config.Rows; i++) {
    const dotColumn = [];
    const row = rows[i];
    for (let j = 0; j < config.Columns; j++) {
      dotColumn.push(
        <React.Fragment key={`cell-${i}:${j}`}>
          <Dot color={color} size={dotSize} isOn={row.isOn(j)} />
          <Spacer size={spacing} />
        </React.Fragment>
      );
    }
    dotRows.push(
      <React.Fragment key={`row-${i}`}>
        <div style={{ display: "flex" }}>{dotColumn}</div>
        <Spacer size={spacing} />
      </React.Fragment>
    );
  }
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>{dotRows}</div>
  );
};

export default Board;
