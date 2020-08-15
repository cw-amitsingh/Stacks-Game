import config from "../constants/configuration";

export default class Row {
  // public readonly left: number;
  // public readonly length: number;
  // public readonly right: number;
  constructor(left, length) {
    this.left = left;
    this.length = length;
    this.right = left + length - 1;
  }
  setLeft(left) {
    const clampedLeft = Math.min(
      Math.max(left, 0),
      config.Columns - this.length
    );
    if (clampedLeft === this.left) {
      return this;
    }
    return new Row(clampedLeft, this.length);
  }

  setLength(length) {
    return new Row(this.left, length);
  }

  isOn(index) {
    return this.left <= index && index <= this.right;
  }

  getIntersection(row) {
    return {
      left: Math.max(row.left, this.left),
      right: Math.min(row.right, this.right),
    };
  }

  setLeftRight(left, right) {
    if (right < left) {
      return new Row(this.left, -1);
    }
    return new Row(left, right - left + 1);
  }
}
