import { useEffect } from 'react';
import { BoxState } from '../models/box-state';

type NonogramTableParams = {
  columnCoordinates: number[][]
  lineCoordinates: number[][]
  gridValues: boolean[][] | BoxState[][]
}

function NonogramTable(params: NonogramTableParams) {

  useEffect(() => {
    console.log(typeof params.gridValues[0][0] === 'boolean');
  }, []);

  return (
    <div>
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
        {params.columnCoordinates.map((coordinates, index) => (
          <div 
            key={index}
            style={{ 
              padding: '1px',
              width: '50px', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'flex-end' 
            }} 
          >
            {coordinates.map((num, index) => (
              <div key={index}>{num.toString()}</div>
            ))}
          </div>
        ))}
      </div>
      {
        Array.isArray(params.gridValues[0][0]) && typeof params.gridValues[0][0] === 'boolean'?  
          params.gridValues.map((boolArr, index) => (
            <div key={index} style={{display: 'flex'}}>
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
                <div>{params.lineCoordinates[index].toString()}</div>
              </div>
              {boolArr.map((bool) => (
                <div 
                  key={index}
                  style={{ border: '1px solid', width: '50px', height: '50px' }} 
                >
                  {bool.toString()}
                </div>
              ))}
            </div>
          )) :
          <p>rerer</p>
      
      }
    </div>
  );
}

export default NonogramTable;