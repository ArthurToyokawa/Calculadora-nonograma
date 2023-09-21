import { BoxState } from '../models/box-state';
import { CoordinateLocations } from '../models/coordinate-locations';
import { GridCoordinates } from '../models/grid-coordinates';

const solveGrid = (gridCoordinates: GridCoordinates): BoxState[][] => {
  let box = createEmptyBox(
    gridCoordinates.lineCoordinates.length,
    gridCoordinates.columnCoordinates.length
  );
  const solving = true;

  for (let i = 0; i < 2; i++) {
    const newBox = runSolvingAlgorithims(box, gridCoordinates);
    console.log(JSON.stringify(newBox) === JSON.stringify(box));
    console.log(JSON.stringify(box));
    console.log(JSON.stringify(newBox));
    box = newBox;
    console.log('NEWBOX');
    console.log(newBox);
  }
  // while (solving) {
  //   const newBox = runSolvingAlgorithims(box, gridCoordinates);
  //   console.log(JSON.stringify(newBox) === JSON.stringify(box));
  //   console.log(JSON.stringify(box));
  //   console.log(JSON.stringify(newBox));
  //   if (JSON.stringify(newBox) === JSON.stringify(box)) {
  //     solving = false;
  //   }
  //   box = newBox;
  //   console.log('NEWBOX');
  //   console.log(newBox.slice());
  // }

  return box;
};

const cloneBox = (box: BoxState[][]): BoxState[][] => {
  return JSON.parse(JSON.stringify(box));
};

const runSolvingAlgorithims = (box: BoxState[][], gridCoordinates: GridCoordinates) => {
  let newBox = cloneBox(box);
  // TODO separate the simple algorothyms and run them only once fillEmptyRows fillFullRows CrossCompleteCoordinateRows
  gridCoordinates.lineCoordinates.forEach((coordinates, index) => {
    // corre todos os algoritimos
    fillEmptyRows(newBox[index], coordinates);
    fillFullRows(newBox[index], coordinates);
    fillOverlappingBoxes(newBox[index], coordinates);
    CrossCompleteCoordinateRows(newBox[index], coordinates);
    crossImpossibleLocations(newBox[index], coordinates);
  });
  console.log('FLIP BOX');
  newBox = generateParallelBoxArray(newBox);
  gridCoordinates.columnCoordinates.forEach((coordinates, index) => {
    // corre todos os algoritimos
    fillEmptyRows(newBox[index], coordinates);
    fillFullRows(newBox[index], coordinates);
    fillOverlappingBoxes(newBox[index], coordinates);
    CrossCompleteCoordinateRows(newBox[index], coordinates);
    crossImpossibleLocations(newBox[index], coordinates);
  });
  newBox = generateParallelBoxArray(newBox);
  // console.log(box);
  return newBox;
};

const generateParallelBoxArray = (box: BoxState[][]) => {
  const parallelGrid: BoxState[][] = Array.from(Array(box[0].length), () => []);
  box.forEach((arr) => {
    arr.forEach((box, index) => {
      parallelGrid[index].push(box);
    });
  });
  return parallelGrid;
};

const createEmptyBox = (lineLenght: number, columnLenght: number): BoxState[][] => {
  const emptyBox: BoxState[][] = [];
  for (let i = 0; i < lineLenght; i++) {
    emptyBox.push(Array.from(Array(columnLenght), () => BoxState.EMPTY));
  }
  return emptyBox;
};

const fillEmptyRows = (boxArray: BoxState[], coordinates: number[]): BoxState[] => {
  if (coordinates.length === 0) {
    boxArray.fill(BoxState.CROSSED);
  }
  return boxArray;
};
const fillFullRows = (boxArray: BoxState[], coordinates: number[]): BoxState[] => {
  if (coordinates.length === 1 && coordinates[0] === boxArray.length) {
    boxArray.fill(BoxState.FILLED);
  } else {
    const coordinatesTotal = coordinates.reduce((total, curr) => {
      total += curr;
      return total;
    }, 0);
    //TODO CODE BELOW DOES NOT WORK AS INTENDED
    const gridTotal = boxArray.reduce((total, curr) => {
      if (curr === BoxState.FILLED) {
        total++;
      }
      return total;
    }, 0);
    if (gridTotal === coordinatesTotal) {
      return boxArray.map((box) => {
        if (box === BoxState.EMPTY || box === BoxState.CROSSED) {
          return BoxState.CROSSED;
        }
        return BoxState.FILLED;
      });
    }
  }
  return boxArray;
};

//if all coordinates are filled cross the rest of the boxes
const CrossCompleteCoordinateRows = (boxArray: BoxState[], coordinates: number[]): BoxState[] => {
  const locations = getCoordinateLocations(boxArray, coordinates);
  const completeCoordinates = locations.every((location) => {
    return location.isComplete;
  });
  if (completeCoordinates) {
    console.log('FOI', locations);
    //CODE NOT CHANGING BOX VALUES
    boxArray.forEach((box) => {
      if (box === BoxState.EMPTY || box === BoxState.CROSSED) {
        box = BoxState.CROSSED;
      }
      box = BoxState.FILLED;
    });
    console.log(boxArray);
  }

  return boxArray;
  // if the coordinatesLocations.isComplete = true cross all empty spots
};

const fillOverlappingBoxes = (boxArray: BoxState[], coordinates: number[]): BoxState[] => {
  // console.log('fillOverlappingBoxes');
  const locations = getCoordinateLocations(boxArray, coordinates);
  // console.log(locations);
  for (let i = 0; i < coordinates.length; i++) {
    const possibleBoxesLen = locations[i].lastPossibleBox - locations[i].firstPossibleBox;
    if (coordinates[i] > possibleBoxesLen / 2) {
      //se for um numero impar o math.ceil e math.floor arrnajam para ele pegar os numeros do meio
      const coordinateDiff = Math.ceil(coordinates[i] - possibleBoxesLen / 2);
      // console.log('coordinateDiff', coordinateDiff);
      // console.log('startFilling', Math.ceil(locations[i].firstPossibleBox + (possibleBoxesLen/2)-coordinateDiff));
      // console.log('stopFilling', Math.floor(locations[i].firstPossibleBox + (possibleBoxesLen/2)+coordinateDiff));
      boxArray.fill(
        BoxState.FILLED,
        Math.ceil(locations[i].firstPossibleBox + possibleBoxesLen / 2 - coordinateDiff),
        Math.floor(locations[i].firstPossibleBox + possibleBoxesLen / 2 + coordinateDiff)
      );
    }
  }
  return boxArray;
};

const crossImpossibleLocations = (boxArray: BoxState[], coordinates: number[]): BoxState[] => {
  const locations = getCoordinateLocations(boxArray, coordinates);
  const possibleIndexes: number[] = [];
  locations.forEach((location) => {
    for (let i = location.firstPossibleBox; i <= location.lastPossibleBox; i++) {
      possibleIndexes.push(i);
    }
  });
  for (let i = 0; i < boxArray.length; i++) {
    if (!possibleIndexes.includes(i)) {
      boxArray[i] = BoxState.CROSSED;
    }
  }

  return boxArray;
};

const getCoordinateLocations = (
  boxArray: BoxState[],
  coordinates: number[]
): CoordinateLocations[] => {
  const coordinateLocations: CoordinateLocations[] = [];
  // faz as coordenadas pelo array pela esquerda e pela direita, para ver as possiveis blocos
  let startingBox = 0;

  coordinates.forEach((coordinate, i) => {
    let verificaCoordenada = true;
    while (verificaCoordenada) {
      const coordinateCrossIndex = boxArray
        .slice(startingBox, startingBox + coordinate)
        .indexOf(BoxState.CROSSED);
      const crossInCoordinate = coordinateCrossIndex !== -1;
      if (crossInCoordinate) {
        startingBox += coordinateCrossIndex + 1;
      } else if (
        //se o ultimo local+1 da coordenada esta preenchido
        boxArray[startingBox + coordinate] === BoxState.FILLED
      ) {
        startingBox++;
      } else {
        const isComplete = boxArray.slice(startingBox, startingBox + coordinate).every((state) => {
          return state === BoxState.FILLED;
        });

        coordinateLocations.push({
          coordinate: coordinates[i],
          firstPossibleBox: startingBox,
          lastPossibleBox: isComplete ? startingBox + coordinate : 0,
          isComplete
        });
        startingBox += coordinate + 1;
        verificaCoordenada = false;
      }
    }
  });

  // fazendo a logica de coordenadas com as coordenadas e rows reversas

  startingBox = 0;

  const reverseBox = boxArray.slice().reverse();
  const reverseCoordinates = coordinates.slice().reverse();
  coordinateLocations.reverse();

  reverseCoordinates.forEach((coordinate, i) => {
    if (!coordinateLocations[i].isComplete) {
      let verificaCoordenada = true;
      while (verificaCoordenada) {
        const coordinateCrossIndex = reverseBox
          .slice(startingBox, startingBox + coordinate)
          .indexOf(BoxState.CROSSED);
        const crossInCoordinate = coordinateCrossIndex !== -1;
        if (crossInCoordinate) {
          startingBox += coordinateCrossIndex + 1;
        } else if (
          //se o ultimo local+1 da coordenada esta preenchido
          reverseBox[startingBox + coordinate] === BoxState.FILLED
        ) {
          startingBox++;
        } else {
          const isComplete = reverseBox
            .slice(startingBox, startingBox + coordinate)
            .every((state) => {
              state === BoxState.FILLED;
            });
          coordinateLocations[i].lastPossibleBox = boxArray.length - startingBox;
          coordinateLocations[i].isComplete = isComplete;
          startingBox += coordinate + 1;
          verificaCoordenada = false;
        }
      }
    }
  });

  return coordinateLocations.reverse();
};

// const getCoordinatePossibleBoxes = (boxArray: BoxState[], coordinates: number[]): {possibleBoxes : number, isSolved: boolean}[] => {
//   // faz as coordenadas pelo array pela esquerda e pela direita, para ver as possiveis blocos
//   const possibleBoxes: number[] = [];
//   let startingBox = 0;
//   coordinates.forEach((coordinate) => {
//     //verifica a coordenada se ela pode ser preenchida
//     let verificaCoordenada = true;
//     while(verificaCoordenada) {
//       //se tem um cross move a coordenada para o localCross+1
//       const coordinateCrossIndex = boxArray.slice(startingBox, startingBox+coordinate).indexOf(BoxState.CROSSED);
//       if(coordinateCrossIndex !== -1) {
//         startingBox += coordinateCrossIndex+1;
//       } else if(boxArray[startingBox+coordinate] === BoxState.FILLED) {
//         //se o ultimo local+1 da coordenada esta preenchido move a inicial 1 para frente
//         startingBox++;
//       } else {
//         possibleBoxes.push(startingBox);
//         startingBox += coordinate+1;
//         verificaCoordenada = false;
//       }
//     }
//   });
//   // se uma coordenada esta no inicio ou no fim guarda seu index e se ela for completa ela é marcada como completa
//   // se uma coordenada com o inicio e fim marcado tbm marca como completa
//   // faz o fluxo duas vezes uma vez certo e outra reverso retornado o coordinateLocations

//   return possibleBoxes;
// };

// TODO
// se uma coordenada fica no inicio ou fim de um array de coordenadas e tem uma cross bloqueia/preenche todas antes
// se uma coordenada esta completa da cross nas caixas adjacentes
// se uma coordenada esta completa nao utiliza ela ou as suas casas em outros algoritimos
// se uma coordenada só tem uma caixa possivel porque uma caixa preenchida só pode ser de uma coordenada
// adicionar checagens se uma caixa esta vazia antes de a modificar

// const testCoordinates = [ 3, 2 ];
// const testBox = [
//   BoxState.empty,
//   BoxState.crossed, //if cross 1
//   BoxState.empty,
//   BoxState.empty,
//   BoxState.empty,
//   BoxState.filled, // if filled 5
//   BoxState.empty,
//   BoxState.empty, // inicio segunda coordenada 7
//   BoxState.crossed, //if cross 8
//   BoxState.empty,
//   BoxState.empty,
//   BoxState.crossed,
//   BoxState.empty,
// ];
// console.log('testboxlen ', testBox.length);
// // console.log(getCoordinateLocations(testBox, testCoordinates))

// const testCoordinates2 = [ 3 ];
// const testBox2 = [
//   BoxState.empty,
//   BoxState.empty,
//   BoxState.empty,
//   BoxState.empty,
//   BoxState.empty,
// ];
// // console.log(fillOverlappingBoxes(testBox2, testCoordinates2))

// console.log('result ', crossImpossibleLocations(testBox, testCoordinates));

// export default {};

export default {
  solveGrid,
  fillEmptyRows,
  fillFullRows,
  CrossCompleteLines: CrossCompleteCoordinateRows,
  fillOverlappingBoxes,
  crossImpossibleLocations
};
