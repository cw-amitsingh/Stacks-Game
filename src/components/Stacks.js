import React, { useEffect } from "react";
import useGameModel from "../hooks/controller";
import colors from "../styles/colors";
import Board from "./Board";
import { Overview } from "./Overview";

export const Stacks = () => {
  const [state, action] = useGameModel();

  useEffect(() => {
    window.addEventListener("keydown", action);
    window.addEventListener("mousedown", action);
    return () => {
      window.removeEventListener("keydown", action);
      window.removeEventListener("mousedown", action);
    };
  }, [action]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Overview gameStatus={state.gameStatus} />
      <Board color={colors.pink} dotSize={20} rows={state.rows} />
    </div>
  );
};
