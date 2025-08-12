import { Ship } from "./ship";

export class Gameboard {
  constructor() {
    this.gameboard = Array.from({ length: 10 }, () => Array(10).fill(0));
    this.ships = [];
    this.missedHits = [];
  }

  #getOrientation(p1, p2) {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;

    if (dy === 0) {
      return "horizontal";
    } else if (dx === 0) {
      return "vertical";
    } else {
      return -1;
    }
  }

  placeShip(p1, p2, ship) {
    if (!(ship instanceof Ship)) {
      return;
    }
    if (this.#getOrientation(p1, p2) === -1) {
      return;
    }

    ship.orientation = this.#getOrientation(p1, p2);
    ship.start = p1;
    ship.end = p2;

    if (ship.orientation === "vertical") {
      let x = p1.x;
      for (let i = p1.y; i <= p2.y; i++) {
        if (this.gameboard[x][i] === 1) {
          return;
        }
      }
    } else {
      let y = p1.y;

      for (let i = p1.x; i <= p2.x; i++) {
        if (this.gameboard[i][y] === 1) {
          return;
        }
      }
    }

    let shipObj = {
      ship: ship,
      path: [],
      sunk: ship.ifSunken,
    };

    if (ship.orientation === "vertical") {
      let x = p1.x;
      for (let i = p1.y; i <= p2.y; i++) {
        this.gameboard[x][i] = 1;
        shipObj.path = [...shipObj.path, [x, i]];
      }
    } else {
      let y = p1.y;

      for (let i = p1.x; i <= p2.x; i++) {
        this.gameboard[i][y] = 1;
        shipObj.path = [...shipObj.path, [i, y]];
      }
    }

    this.ships.push(shipObj);
  }

  receiveAttack(coords) {
    const hitX = coords[0];
    const hitY = coords[1];

    let shipHit;

    for (let i = 0; i < this.ships.length; i++) {
      if (this.ships[i].path.some(([x, y]) => x === hitX && y === hitY)) {
        shipHit = this.ships[i];
        this.ships[i].ship.hit();
        this.ships[i].ship.isSunken();
        return;
      } else {
        this.missedHits.push(coords);
      }
    }
  }
}
