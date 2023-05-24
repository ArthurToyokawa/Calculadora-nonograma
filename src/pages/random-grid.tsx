import { useCallback, useEffect, useState } from 'react';
import gridGenerator from '../utils/utills-nonogram-generator';
import NonogramTableBool from '../components/nonogram-table-bool';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const [boolGrid, setBoolGrid] = useState<boolean[][]>([]);
  const [columnCoordinates, setColumnCoordinates] = useState<number[][]>([]);
  const [lineCoordinates, setLineCoordinates] = useState<number[][]>([]);
  const [numOfLines, setNumOfLines] = useState(5);
  const [numOfColumns, setNumOfColumns] = useState(5);

  const generateRandomGrid = useCallback(() => {
    const {boolGrid, gridCoordinates} = gridGenerator.generateRandomGrid(numOfLines, numOfColumns);
    setBoolGrid(boolGrid);
    setColumnCoordinates(gridCoordinates.columnCoordinates);
    setLineCoordinates(gridCoordinates.lineCoordinates);
    console.log('boolGrid',boolGrid);
    console.log('gridCoordinates', gridCoordinates);
  },[numOfLines, numOfColumns]);

  useEffect(() => {
    generateRandomGrid();
  },[]);

  return (
    <div style={{padding: '10% 10% 0 10%'}} className="App">
      <button onClick={() => navigate('/solver')}style={{ marginBottom: '1rem'}}>
          Grid solver
      </button>
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
        <button onClick={generateRandomGrid}>
        Generate random grid
        </button>
      </div>
      <NonogramTableBool gridValues={boolGrid} columnCoordinates={columnCoordinates} lineCoordinates={lineCoordinates}/>
    </div>
  );
}

export default App;
