export class Ship {
  constructor(length) {
    this.length = length;
    this.ifSunken = false;
    this.timesHit = 0;
    this.start = null;
    this.end = null;
    this.orientation = null;
  }

  hit() {
    if (!this.ifSunken) {
      ++this.timesHit;
    }
  }

  isSunken() {
    if (this.length === this.timesHit) {
      this.ifSunken = true;
    }
  }
}
