type NonogramTableParams = {
  columnCoordinates: number[][]
  lineCoordinates: number[][]
  boolGrid: boolean[][]
}

function NonogramTable(params: NonogramTableParams) {
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
        {params.columnCoordinates.map((coordinates) => (
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
      {params.boolGrid.map((boolArr, index) => (
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
            <div>{params.lineCoordinates[index].toString()}</div>
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
  )
}

export default NonogramTable;