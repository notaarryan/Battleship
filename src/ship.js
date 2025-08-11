export class Ship {
  constructor(length) {
    this.length = length;
    this.ifSunken = false;
    this.timesHit = 0;
  }

  hit() {
    if (!this.ifSunken) {
      ++this.timesHit;
    }
    this.isSunken();
  }

  isSunken() {
    if (this.length === this.timesHit) {
      this.ifSunken = true;
    }
  }
}
