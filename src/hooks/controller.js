import React, { useEffect } from "react";
import config from "../constants/configuration";
import { Actions } from "../enums/Actions";
import GameState from "../enums/gameState";
import initialState from "../reducers/initialState";
import FrameRunner from "./frameRunner";

const replaceRow = (rows, i, row) => {
  return [...rows.slice(0, i), row, ...rows.slice(i + 1, rows.length)];
};

const reducer = (state, action) => {
  switch (action.type) {
    case Actions.SetRowPosition: {
      const activeRow = state.rows[state.activeRow];
      if (state.gameStatus !== GameState.Playing) {
        return state;
      }
      state = {
        ...state,
        rows: replaceRow(
          state.rows,
          state.activeRow,
          activeRow.setLeft(action.start)
        ),
      };
      return state;
    }
    case Actions.AddNewRow: {
      const newActiveRowIndex = state.activeRow - 1;
      const currentActiveRow = state.rows[state.activeRow];
      const isFirstRow = state.activeRow === state.rows.length - 1;
      let updatedActiveRow;
      if (isFirstRow) {
        updatedActiveRow = currentActiveRow;
      } else {
        const previousRow = state.rows[state.activeRow + 1];
        const intersection = previousRow.getIntersection(currentActiveRow);
        updatedActiveRow = currentActiveRow.setLeftRight(
          intersection.left,
          intersection.right
        );
      }
      const updatedRows = replaceRow(
        state.rows,
        state.activeRow,
        updatedActiveRow
      );
      if (updatedActiveRow.length < 0) {
        return {
          ...state,
          gameStatus: GameState.Lost,
        };
      }
      if (newActiveRowIndex < 0) {
        return {
          ...state,
          rows: updatedRows,
          gameStatus: GameState.Won,
        };
      }
      const nextActiveRow = state.rows[newActiveRowIndex];
      return {
        ...state,
        activeRow: newActiveRowIndex,
        rows: replaceRow(
          updatedRows,
          newActiveRowIndex,
          nextActiveRow
            .setLength(updatedActiveRow.length)
            .setLeft(updatedActiveRow.left)
        ),
      };
    }
    case Actions.Restart: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

const useGameModel = () => {
  const frameRunnerRef = React.useRef(new FrameRunner());
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const handleFrame = (frameCount, frameLength, totalDuration) => {
    const activeRow = state.rows[state.activeRow];
    const ms = totalDuration % config.MillisecondsPerIteration;
    const uniquePosition = config.Columns - activeRow.length;
    const totalPositions = uniquePosition * 2;
    const msPerPosition = config.MillisecondsPerIteration / totalPositions;
    const currentPosition = Math.floor(ms / msPerPosition);
    const newStart =
      currentPosition > uniquePosition
        ? totalPositions - currentPosition
        : currentPosition;
    if (newStart !== activeRow.start) {
      dispatch({ type: Actions.SetRowPosition, start: newStart });
    }
  };
  useEffect(() => {
    frameRunnerRef.current.replaceOnFrame(handleFrame);
  }, [handleFrame]);
  useEffect(() => {
    frameRunnerRef.current.start();
  }, []);
  useEffect(() => {
    if (state.gameStatus === GameState.Lost) {
      frameRunnerRef.current.stop();
    } else if (state.gameStatus === GameState.Won) {
      frameRunnerRef.current.stop();
    }
  }, [state.gameStatus]);

  const action = React.useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (state.gameStatus === GameState.Lost) {
        dispatch({ type: Actions.Restart });
        frameRunnerRef.current.start();
      } else if (state.gameStatus === GameState.Playing) {
        dispatch({ type: Actions.AddNewRow });
      }
    },
    [state.gameStatus]
  );

  return [state, action];
};

export default useGameModel;
