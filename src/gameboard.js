import { Ship } from "./ship";

export class Gameboard {
  constructor() {
    this.gameboard = Array.from({ length: 10 }, () => Array(10).fill(0));
    this.availableShips = {
      carrier: new Ship(5),
      battleship: new Ship(4),
      cruiser: new Ship(3),
      submarine: new Ship(3),
      destroyer: new Ship(2),
    };
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

  placeShip(p1, p2, shipType) {
    if (typeof shipType !== "string") {
      return;
    }
    shipType = shipType.toLowerCase();
    if (!(shipType in this.availableShips)) {
      return;
    }
    const orientation = this.#getOrientation(p1, p2);
    if (orientation === -1) {
      return;
    }

    this.availableShips[shipType].orientation = orientation;
    this.availableShips[shipType].start = p1;
    this.availableShips[shipType].end = p2;

    if (this.availableShips[shipType].orientation === "vertical") {
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
      ship: this.availableShips[shipType],
      path: [],
      sunk: this.availableShips[shipType].ifSunken,
    };

    if (shipObj.ship.orientation === "vertical") {
      let x = p1.x;
      for (let i = p1.y; i <= p2.y; i++) {
        this.gameboard[x][i] = 1;
        shipObj.path.push([x, i]);
      }
    } else {
      let y = p1.y;

      for (let i = p1.x; i <= p2.x; i++) {
        this.gameboard[i][y] = 1;
        shipObj.path.push([i, y]);
      }
    }

    this.ships.push(shipObj);
    delete this.availableShips[shipType];
  }

  receiveAttack(coords) {
    const hitX = coords[0];
    const hitY = coords[1];
    if (!(0 <= hitX && hitX < 10 && 0 <= hitY && hitY < 10)) {
      return;
    }
    let hit = false;

    let shipHit;

    for (let i = 0; i < this.ships.length; i++) {
      if (this.ships[i].path.some(([x, y]) => x === hitX && y === hitY)) {
        shipHit = this.ships[i];
        this.ships[i].ship.hit();
        this.ships[i].ship.isSunken();
        hit = true;
        break;
      }
    }

    if (!hit) {
      this.missedHits.push(coords);
    }
  }
}
