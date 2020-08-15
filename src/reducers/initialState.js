import config from "../constants/configuration";
import GameState from "../enums/gameState";
import Row from "../enums/row";

const initialRows = [];
for (let i = 0; i < config.Rows; i++) {
  if (i === config.Rows - 1) {
    initialRows.push(new Row(0, config.StartingLength - 1));
  } else {
    initialRows.push(new Row(0, -1));
  }
}
const initialState = {
  rows: initialRows,
  activeRow: config.Rows - 1,
  gameStatus: GameState.Playing,
};

export default initialState;
