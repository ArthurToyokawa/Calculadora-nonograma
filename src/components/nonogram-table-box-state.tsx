import { useEffect } from 'react';
import { BoxState } from '../models/box-state';
import './nonogram-table-box-state.css';

type NonogramTableBoxStateParams = {
  columnCoordinates: number[][];
  lineCoordinates: number[][];
  gridValues: BoxState[][];
};

function NonogramTableBoxState(params: NonogramTableBoxStateParams) {
  useEffect(() => {
    console.log(params);
  }, []);
  if (
    params.gridValues.length === 0 ||
    params.columnCoordinates.length === 0 ||
    params.lineCoordinates.length === 0
  )
    return <></>;
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div
          style={{
            padding: '1px',
            width: '50px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end'
          }}></div>
        {params.columnCoordinates.map((coordinates, index) => (
          <div
            key={index}
            style={{
              padding: '1px',
              width: '50px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end'
            }}>
            {coordinates.map((num, index) => (
              <div key={index}>{num.toString()}</div>
            ))}
          </div>
        ))}
      </div>
      {params.gridValues.map((boxArray, index) => (
        <div key={'f' + index} style={{ display: 'flex' }}>
          <div
            style={{
              padding: '1px',
              width: '50px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              justifyContent: 'center'
            }}>
            <div>{params.lineCoordinates[index].toString()}</div>
          </div>
          {boxArray.map((state, sonIndex) => (
            <div
              key={'s' + index + sonIndex}
              style={{ border: '1px solid', width: '50px', height: '50px' }}
              className={BoxState[state]}>
              {BoxState[state]}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default NonogramTableBoxState;
