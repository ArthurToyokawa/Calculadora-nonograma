import { useCallback, useEffect, useState } from 'react';
import './App.css';
import gridGenerator from './utils/utills-nonogram-generator';

function App() {
  const [boolGrid, setBoolGrid] = useState<boolean[][]>([])
  const [columnCoordinates, setColumnCoordinates] = useState<number[][]>([])
  const [lineCoordinates, setLineCoordinates] = useState<number[][]>([])
  const [numOfLines, setNumOfLines] = useState(5)
  const [numOfColumns, setNumOfColumns] = useState(5)

  const generateRandomGrid = useCallback(() => {
    const {boolGrid, gridCoordinates} = gridGenerator.generateRandomGrid(numOfLines, numOfColumns)
    setBoolGrid(boolGrid)
    setColumnCoordinates(gridCoordinates.columnCoordinates)
    setLineCoordinates(gridCoordinates.lineCoordinates)
    console.log('boolGrid', boolGrid)
    console.log('gridCoordinates', gridCoordinates)
  },[])
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
      <button onClick={generateRandomGrid}>
        Generate random grid
      </button>
      </div>
      <div style={{display: 'flex'}}>
        <div
          style={{ 
            padding: '1px',
            width: '50px', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'flex-end' 
          }} 
        ></div>
        {columnCoordinates.map((coordinates) => (
          <div 
            style={{ 
              padding: '1px',
              width: '50px', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'flex-end' 
            }} 
          >
            {coordinates.map((num) => (
              <div>{num.toString()}</div>
            ))}
          </div>
      ))}
      </div>
      {boolGrid.map((boolArr, index) => (
        <div style={{display: 'flex'}}>
          <div 
            style={{ 
              padding: '1px',
              width: '50px', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'flex-end',
              justifyContent: 'center' 
            }} 
          >
            <div>{lineCoordinates[index].toString()}</div>
          </div>
          {boolArr.map((bool) => (
            <div 
              style={{ border: '1px solid', width: '50px', height: '50px' }} 
            >
              {bool.toString()}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
