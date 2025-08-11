import { Ship } from "../ship";

test("Hit function", () => {
  const ship = new Ship(2);
  ship.hit();
  expect(ship.timesHit).toBe(1);
});

test("isSunken function", () => {
  const ship = new Ship(2);
  ship.hit();
  ship.hit();
  expect(ship.ifSunken).toBe(true);
});
