import {describe, expect, test} from '@jest/globals';
import generator from './utills-nonogram-generator'

describe('createEmptyBox', () => {
  test('should return a box with the correct dimensions', () => {
    const emptyBox = createEmptyBox(3, 4);
    expect(emptyBox.length).toEqual(3);
    expect(emptyBox[0].length).toEqual(4);
    expect(emptyBox[1].length).toEqual(4);
    expect(emptyBox[2].length).toEqual(4);
  });

  test('should return a box with all elements set to empty', () => {
    const emptyBox = createEmptyBox(3, 4);
    expect(emptyBox.every(row => row.every(element => element === BoxState.empty))).toBe(true);
  });
});

describe('fillEmptyRows', () => {
  test('should fill the row with crossed if coordinates array is empty', () => {
    const emptyRow = [BoxState.empty, BoxState.empty, BoxState.empty]
    const crossedRow = [BoxState.crossed, BoxState.crossed, BoxState.crossed]
    const filledRow = fillEmptyRows(emptyRow, []);
    expect(filledRow).toEqual(crossedRow);
  });
  test('should return the original row if coordinates array is not empty', () => {
    const emptyRow = [BoxState.empty, BoxState.empty, BoxState.empty]
    const filledRow = fillEmptyRows(emptyRow, [1]);
    expect(filledRow).toEqual(emptyRow);
  });
});

describe('fillFullRows', () => {
  test('should return the original Row if the coordinates matches the Row size', () => {
    const emptyRow = [BoxState.empty, BoxState.empty, BoxState.empty]
    const filledRow = fillFullRows(emptyRow, [2]);
    expect(filledRow).toEqual(emptyRow);
  });

  test('should fill the row with filled if the coordinates matches the Row size', () => {
    const originalBox = [      [BoxState.empty, BoxState.empty, BoxState.empty],
      [BoxState.filled, BoxState.filled, BoxState.filled],
      [BoxState.crossed, BoxState.crossed, BoxState.crossed],
    ];
    const expectedBox = [      [BoxState.empty, BoxState.empty, BoxState.empty],
      [BoxState.filled, BoxState.filled, BoxState.filled],
      [BoxState.filled, BoxState.filled, BoxState.filled],
    ];
    const filledBox = fillFullRows(originalBox, [3]);
    expect(filledBox).toEqual(expectedBox);
  });

  test('should not fill any rows if the provided coordinates do not match the box size', () => {
    const originalBox = [      [BoxState.empty, BoxState.empty, BoxState.empty],
      [BoxState.filled, BoxState.filled, BoxState.filled],
      [BoxState.crossed, BoxState.crossed, BoxState.crossed],
    ];
    const filledBox = fillFullRows(originalBox, [2]);
    expect(filledBox).toEqual(original
