import { useCallback, useEffect, useState } from 'react';
import NonogramTableBoxState from '../components/nonogram-table-box-state';

function App() {
  const boxGrid = [
    [1, 2, 2, 1, 1],
    [1, 2, 0, 0, 1],
    [1, 1, 0, 0, 1],
    [2, 1, 1, 1, 2], 
    [1, 2, 1, 1, 1]
  ];
  const [columnCoordinates, setColumnCoordinates] = useState<number[][]>([
    [1, 1],
    [1, 2],
    [1, 3],
    [3],
    [5]
  ]);
  const [lineCoordinates, setLineCoordinates] = useState<number[][]>([
    [2, 1],
    [1, 2],
    [4],
    [4],
    [1, 1, 1]
  ]);

  const solveGrid = () => {
    console.log('solveGrid');
  };

  return (
    <div style={{padding: '10% 10% 0 10%'}} className="App">
      <div style={{display: 'flex', marginBottom: '1rem'}}>
        <label style={{marginRight: '0.25rem'}}>input selector should go here</label>
      </div>
      <div style={{display: 'flex'}}>
        <button onClick={solveGrid}>
        solve grid
        </button>
      </div>
      <NonogramTableBoxState gridValues={boxGrid} columnCoordinates={columnCoordinates} lineCoordinates={lineCoordinates}/>
    </div>
  );
}

export default App;
