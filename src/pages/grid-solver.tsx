import { useCallback, useEffect, useState } from 'react';
import NonogramTableBoxState from '../components/nonogram-table-box-state';
import Solver from '../utils/utills-nonogram-solver';
import gridGen from '../utils/utills-nonogram-generator';
import { BoxState } from '../models/box-state';
import NonogramTableBool from '../components/nonogram-table-bool';

function App() {
  const [boxGrid, setBoxGrid] = useState<BoxState[][]>([
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
  ]);
  const [testBoolGrid, setTestBoolGrid] = useState<boolean[][]>([
    [true, false, true, false, false],
    [true, true, true, true, true],
    [false, true, true, true, false],
    [false, true, true, true, true],
    [true, false, true, true, true]
  ]);
  const [columnCoordinates, setColumnCoordinates] = useState<number[][]>([
    [2, 1],
    [3],
    [5],
    [4],
    [1, 2]
  ]);
  const [lineCoordinates, setLineCoordinates] = useState<number[][]>([
    [1, 1],
    [5],
    [3],
    [4],
    [1, 3]
  ]);

  const handleClickSolve = () => {
    console.log('solveGrid');
    // setBoxGrid(Solver.solveGrid({ columnCoordinates, lineCoordinates }));
    console.log(Solver.getCoordinateLocations([0, 1, 0, 0, 1], [1, 2]));
  };

  const getRandomGrid = () => {
    const newGrid = gridGen.generateRandomGrid(5, 5);
    setTestBoolGrid(newGrid.boolGrid);
    setBoxGrid(testConvertBox(newGrid.boolGrid));

    setColumnCoordinates(newGrid.gridCoordinates.columnCoordinates);
    setLineCoordinates(newGrid.gridCoordinates.lineCoordinates);

    console.log('NEWGRID');
    console.log('boolGrid', JSON.stringify(newGrid.boolGrid));
    console.log('colCoordinates', JSON.stringify(newGrid.gridCoordinates.columnCoordinates));
    console.log('lineCoordinates', JSON.stringify(newGrid.gridCoordinates.lineCoordinates));
  };

  function testConvertBox(grid: boolean[][]): BoxState[][] {
    const matrix: BoxState[][] = [];

    for (let i = 0; i < grid.length; i++) {
      const row: number[] = [];
      for (let j = 0; j < grid[0].length; j++) {
        row.push(0);
      }
      matrix.push(row);
    }

    return matrix;
  }

  return (
    <div style={{ padding: '10% 10% 0 10%' }} className="App">
      <div style={{ display: 'flex', marginBottom: '1rem' }}>
        <label style={{ marginRight: '0.25rem' }}>input selector should go here</label>
      </div>
      <div style={{ display: 'flex' }}>
        <button onClick={handleClickSolve}>solve grid</button>
      </div>
      <div style={{ display: 'flex' }}>
        <button onClick={getRandomGrid}>newGrid</button>
      </div>
      <h1>Box</h1>
      <div style={{ display: 'flex' }}>
        <h1>generatedBox</h1>
        <NonogramTableBool
          gridValues={testBoolGrid}
          columnCoordinates={columnCoordinates}
          lineCoordinates={lineCoordinates}
        />
        <h1>SolvingResult</h1>
        <NonogramTableBoxState
          gridValues={boxGrid}
          columnCoordinates={columnCoordinates}
          lineCoordinates={lineCoordinates}
        />
      </div>
    </div>
  );
}

export default App;
