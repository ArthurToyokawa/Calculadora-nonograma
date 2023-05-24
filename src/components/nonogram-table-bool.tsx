import { useEffect } from 'react';

//TODO para frente toda nonogram table vai set usada o boxstate
type NonogramTableBoolParams = {
  columnCoordinates: number[][]
  lineCoordinates: number[][]
  gridValues: boolean[][]
}

function NonogramTableBool(params: NonogramTableBoolParams) {

  useEffect(() => {
    console.log(params);
  }, []);
  if(
    params.gridValues.length === 0 || 
    params.columnCoordinates.length === 0 ||
    params.lineCoordinates.length === 0
  )
    return <></>;
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
        params.gridValues.map((boolArr, index) => (
          <div key={'f'+index} style={{display: 'flex'}}>
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
            {boolArr.map((bool, sonIndex) => (
              <div 
                key={'s'+index+sonIndex}
                style={{ border: '1px solid', width: '50px', height: '50px' }} 
              >
                {bool.toString()}
              </div>
            ))}
          </div>
        )) 
      }
    </div>
  );
}

export default NonogramTableBool;