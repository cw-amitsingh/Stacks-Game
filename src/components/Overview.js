import React from "react";
import { getTitle } from "../utils";

export const Overview = ({ gameStatus }) => (
  <h1
    style={{
      fontWeight: 900,
      marginBottom: "60px",
      color: "white",
      fontSize: 50,
      fontFamily: "Open sans",
    }}
  >
    {getTitle(gameStatus)}
  </h1>
);
