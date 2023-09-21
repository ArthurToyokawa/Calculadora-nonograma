import { useCallback, useEffect, useState } from 'react';
import NonogramTableBoxState from '../components/nonogram-table-box-state';
import Solver from '../utils/utills-nonogram-solver';
import { BoxState } from '../models/box-state';

function App() {
  const [boxGrid, setBoxGrid] = useState<BoxState[][]>([
    [1, 2, 2, 1, 1],
    [1, 2, 0, 0, 1],
    [1, 1, 0, 0, 1],
    [2, 1, 1, 1, 2],
    [1, 2, 1, 1, 1]
  ]);
  const [columnCoordinates, setColumnCoordinates] = useState<number[][]>([
    [1, 3],
    [5],
    [3],
    [5],
    [1, 1]
  ]);
  const [lineCoordinates, setLineCoordinates] = useState<number[][]>([
    [2, 1],
    [4],
    [4],
    [5],
    [2, 1]
  ]);

  const handleClickSolve = () => {
    console.log('solveGrid');
    setBoxGrid(Solver.solveGrid({ columnCoordinates, lineCoordinates }));
  };

  return (
    <div style={{ padding: '10% 10% 0 10%' }} className="App">
      <div style={{ display: 'flex', marginBottom: '1rem' }}>
        <label style={{ marginRight: '0.25rem' }}>input selector should go here</label>
      </div>
      <div style={{ display: 'flex' }}>
        <button onClick={handleClickSolve}>solve grid</button>
      </div>
      <NonogramTableBoxState
        gridValues={boxGrid}
        columnCoordinates={columnCoordinates}
        lineCoordinates={lineCoordinates}
      />
    </div>
  );
}

export default App;
