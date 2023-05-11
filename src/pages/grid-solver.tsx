import { useCallback, useEffect, useState } from 'react';
import gridGenerator from '../utils/utills-nonogram-generator';
import NonogramTable from '../components/nonogram-table';

function App() {
  // const [boolGrid, setBoolGrid] = useState<boolean[][]>([])
  const boolGrid = [
    [true, false, false, true, true],
    [true, false, true, true, true],
    [true, true, true, true, true],
    [false, true, true, true, false], 
    [true, false, true, true, true]
  ];
  const boxGrid = [
    [1, 2, 2, 1, 1],
    [1, 2, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [2, 1, 1, 1, 2], 
    [1, 2, 1, 1, 1]
  ];
  const [columnCoordinates, setColumnCoordinates] = useState<number[][]>([]);
  const [lineCoordinates, setLineCoordinates] = useState<number[][]>([]);
  const [numOfLines, setNumOfLines] = useState(5);
  const [numOfColumns, setNumOfColumns] = useState(5);

  // const generateRandomGrid = useCallback(() => {
  //   const {boolGrid, gridCoordinates} = gridGenerator.generateRandomGrid(numOfLines, numOfColumns)
  //   setBoolGrid(boolGrid)
  //   setColumnCoordinates(gridCoordinates.columnCoordinates)
  //   setLineCoordinates(gridCoordinates.lineCoordinates)
  //   console.log('boolGrid', boolGrid)
  //   console.log('gridCoordinates', gridCoordinates)
  // },[numOfLines, numOfColumns])

  // useEffect(() => {
  //   generateRandomGrid()
  // },[])

  const solveGrid = () => {
    console.log('solveGrid');
  };

  return (
    <div style={{padding: '10% 10% 0 10%'}} className="App">
      <div style={{display: 'flex', marginBottom: '1rem'}}>
        <label style={{marginRight: '0.25rem'}}>lines</label>
        <input 
          value={numOfLines} 
          onChange={(evt) => setNumOfLines(parseInt(evt.target.value))} 
          type='number' 
          style={{marginRight: '0.25rem'}}/>
        <label style={{marginRight: '0.25rem'}}>columns</label>
        <input 
          value={numOfColumns} 
          onChange={(evt) => setNumOfColumns(parseInt(evt.target.value))} 
          type='number'/>
      </div>
      <div style={{display: 'flex'}}>
        <button onClick={solveGrid}>
        solve grid
        </button>
      </div>
      <NonogramTable gridValues={boxGrid} columnCoordinates={columnCoordinates} lineCoordinates={lineCoordinates}/>
    </div>
  );
}

export default App;
