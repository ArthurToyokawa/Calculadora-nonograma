import {describe, expect, test} from '@jest/globals';
import generator from './utills-nonogram-generator'

describe("createBooleanArray", () => {
    test("should create an array of the specified length", () => {
      const len = 5;
      const result = generator.createBooleanArray(len);
      expect(result.length).toBe(len);
    });
  
    test("should contain booleans", () => {
      const len = 5;
      const result = generator.createBooleanArray(len);
      result.forEach((item) => expect(typeof item).toBe("boolean"));
    });
  });
  
  describe("generateCoordinates", () => {
    test("should return an array", () => {
      const boolArr = [true, false, true];
      const result = generator.generateCoordinates(boolArr);
      expect(Array.isArray(result)).toBe(true);
    });
  
    test("should correctly generate coordinates", () => {
      const boolArr = [true, true, false, true, false];
      const result = generator.generateCoordinates(boolArr);
      expect(result).toEqual([2, 1]);
    });
  });
  
  describe("generateParallelBooleanArray", () => {
    test("should return an array of arrays", () => {
      const boolColumn = [[true, false], [false, true]];
      const result = generator.generateParallelBooleanArray(boolColumn);
      expect(Array.isArray(result)).toBe(true);
      result.forEach((item) => expect(Array.isArray(item)).toBe(true));
    });
  
    test("should correctly generate parallel boolean arrays", () => {
      const boolColumn = [[true, false], [false, true]];
      const result = generator.generateParallelBooleanArray(boolColumn);
      expect(result).toEqual([[true, false], [false, true]]);
    });
  });
  
  // describe("generateRandomGridCoordinates", () => {
  //   test("should return an object with lineCoordinates and columnCoordinates", () => {
  //     const horLen = 3;
  //     const verLen = 4;
  //     const result = generator.generateRandomGridCoordinates(horLen, verLen);
  //     expect(result).toHaveProperty("lineCoordinates");
  //     expect(result).toHaveProperty("columnCoordinates");
  //   });
  
  //   test("should correctly generate line and column coordinates", () => {
  //     const horLen = 3;
  //     const verLen = 4;
  //     const result = generator.generateRandomGridCoordinates(horLen, verLen);
  //     expect(result.lineCoordinates.length).toBe(horLen);
  //     expect(result.columnCoordinates.length).toBe(verLen);
  //   });
  // });