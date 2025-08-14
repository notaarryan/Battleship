import { Gameboard } from "./gameboard";

export class Player {
  constructor(isComputer = false) {
    this.playerName;
    this.isComputer = isComputer;
    this.isReal = !isComputer;
    this.gameboard = new Gameboard();
  }
}
