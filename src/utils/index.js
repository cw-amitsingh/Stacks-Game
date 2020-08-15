import GameState from "../enums/gameState";

export const getTitle = (gameStatus) => {
  switch (gameStatus) {
    case GameState.Won:
      return "You won!!! Hurray";
    case GameState.Lost:
      return "You lost!!! Please Try again.";
    case GameState.Playing:
    default:
      return "Stacks Game 3";
  }
};
