import { BoxState } from '../models/box-state';
import { CoordinateLocations } from '../models/coordinate-locations';
import { GridCoordinates } from '../models/grid-coordinates';

const solveGrid = (gridCoordinates: GridCoordinates): BoxState[][] => {
  let box = createEmptyBox(
    gridCoordinates.lineCoordinates.length,
    gridCoordinates.columnCoordinates.length
  );
  let solving = true;
  while (solving) {
    const newBox = runSolvingAlgorithims(box, gridCoordinates);
    if (JSON.stringify(newBox) === JSON.stringify(box)) {
      console.log('SOLVED');
      solving = false;
    }
    box = newBox;
    console.log('NEWBOX', JSON.stringify(newBox.slice()));
    //TEST
    solving = false;
  }

  return box;
};

const cloneBox = (box: BoxState[][]): BoxState[][] => {
  return JSON.parse(JSON.stringify(box));
};

const runSolvingAlgorithims = (box: BoxState[][], gridCoordinates: GridCoordinates) => {
  let newBox = cloneBox(box);
  gridCoordinates.lineCoordinates.forEach((coordinates, index) => {
    newBox[index] = fillEmptyRows(newBox[index], coordinates);
    newBox[index] = fillFullRows(newBox[index], coordinates);
    newBox[index] = fillOverlappingBoxes(newBox[index], coordinates);
    newBox[index] = CrossCompleteCoordinates(newBox[index], coordinates);
    newBox[index] = crossImpossibleLocations(newBox[index], coordinates);
  });
  newBox = generateParallelBoxArray(newBox);
  gridCoordinates.columnCoordinates.forEach((coordinates, index) => {
    newBox[index] = fillEmptyRows(newBox[index], coordinates);
    newBox[index] = fillFullRows(newBox[index], coordinates);
    newBox[index] = fillOverlappingBoxes(newBox[index], coordinates);
    newBox[index] = CrossCompleteCoordinates(newBox[index], coordinates);
    newBox[index] = crossImpossibleLocations(newBox[index], coordinates);
  });
  newBox = generateParallelBoxArray(newBox);
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
    }, coordinates.length - 1);
    const newBoxArr: BoxState[] = [];
    if (coordinatesTotal === boxArray.length) {
      coordinates.forEach((c, i) => {
        for (let i = 0; i < c; i++) {
          newBoxArr.push(BoxState.FILLED);
        }
        if (i !== coordinates.length - 1) {
          newBoxArr.push(BoxState.CROSSED);
        }
      });
      boxArray = newBoxArr;
    }
  }
  return boxArray;
};

//if all coordinates are filled cross the rest of the boxes
const CrossCompleteCoordinates = (boxArray: BoxState[], coordinates: number[]): BoxState[] => {
  const locations = getCoordinateLocations(boxArray, coordinates);
  const AllCoordinatesComplete = locations.every((location) => {
    return location.isComplete;
  });
  if (AllCoordinatesComplete) {
    boxArray = boxArray.map((box) => {
      if (box === BoxState.EMPTY || box === BoxState.CROSSED) {
        return BoxState.CROSSED;
      }
      return BoxState.FILLED;
    });
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
  if (JSON.stringify(coordinates) === '[1,2]') {
    console.log('ALGORITIMO ESTRANHO');
    console.log(boxArray);
  }
  coordinates.forEach((coordinate, i) => {
    let verificaCoordenada = true;
    // TODO SE É UMA COORDENADA NO INICIO/FIM OU DEPOIS DE UMA COORDENADA COMPLETA E TEM UMA CASA PREENCHIDA
    // TODO NOMEAR ESSA VAR MELHOR
    const treatFilledBox = i === 0 || coordinateLocations[i - 1].isComplete;
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
        // TODO SE É UMA COORDENADA NO INICIO/FIM OU DEPOIS DE UMA COORDENADA COMPLETA E TEM UMA CASA PREENCHIDA
        // O lastPossibleBox = casaPreenchidaIndex + coordenada
        const isComplete = boxArray.slice(startingBox, startingBox + coordinate).every((state) => {
          return state === BoxState.FILLED;
        });
        let lastPossibleBox = 0;
        if (isComplete) {
          lastPossibleBox = startingBox + coordinate;
        } else if (treatFilledBox) {
          const coordinateFilledIndex = boxArray
            .slice(startingBox, startingBox + coordinate)
            .indexOf(BoxState.FILLED);
          const filledInCoordinate = coordinateFilledIndex !== -1;
          if (filledInCoordinate) {
            const sum = coordinateFilledIndex + coordinate + 1;
            if (sum > boxArray.length) {
              lastPossibleBox = boxArray.length;
            } else {
              lastPossibleBox = sum;
            }
          }
        }
        coordinateLocations.push({
          coordinate: coordinates[i],
          firstPossibleBox: startingBox,
          lastPossibleBox: lastPossibleBox,
          isComplete
        });
        startingBox += coordinate + 1;
        verificaCoordenada = false;
      }
    }
  });

  // fazendo a logica de coordenadas com as coordenadas e rows reversas

  if (JSON.stringify(coordinates) === '[1,2]') {
    console.log(JSON.stringify(coordinateLocations));
  }

  startingBox = 0;

  const reverseBox = boxArray.slice().reverse();
  const reverseCoordinates = coordinates.slice().reverse();
  coordinateLocations.reverse();

  reverseCoordinates.forEach((coordinate, i) => {
    if (!coordinateLocations[i].isComplete) {
      let verificaCoordenada = true;
      // TODO NOMEAR ESSA VAR MELHOR
      const treatFilledBox = i === 0 || coordinateLocations[i - 1].isComplete;
      if (treatFilledBox && coordinateLocations[i].lastPossibleBox !== 0) {
        startingBox = reverseBox.length - coordinateLocations[i].lastPossibleBox;
        // console.log(
        //   'coordinate ',
        //   coordinate,
        //   ', lastPossibleBox ',
        //   coordinateLocations[i].lastPossibleBox,
        //   ', startingBox ',
        //   startingBox
        // );
      }

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
          // TODO SE É UMA COORDENADA NO INICIO/FIM OU DEPOIS DE UMA COORDENADA COMPLETA E TEM UMA CASA PREENCHIDA TRATAR IGUAL EM CIMA
          //TODO TRAAR O ISCOMPLETE PRA SETAR O LASPOSSIBLEbOX E O FIRSTPOSSIBLEBOX
          let firstPossibleBox = reverseBox.length;
          if (isComplete) {
            firstPossibleBox = reverseBox.length - startingBox - coordinate;
          }
          // else if (treatFilledBox) {
          //   const coordinateFilledIndex = reverseBox
          //     .slice(startingBox, startingBox + coordinate)
          //     .indexOf(BoxState.FILLED);
          //   const filledInCoordinate = coordinateFilledIndex !== -1;
          //   if (filledInCoordinate) {
          //     firstPossibleBox = reverseBox.length - coordinateFilledIndex - coordinate;
          //   }
          // }

          // TODO SÓ SETAR O FIRSTPOSSIBLE BOX SE ISCOMPLETE OU TREAT
          // coordinateLocations[i].firstPossibleBox = firstPossibleBox;
          coordinateLocations[i].lastPossibleBox = reverseBox.length - startingBox;
          coordinateLocations[i].isComplete = isComplete;
          startingBox += coordinate + 1;
          verificaCoordenada = false;
        }
      }
    }
  });

  const returnlocations = coordinateLocations.reverse();
  if (JSON.stringify(coordinates) === '[1,2]') {
    console.log('RETURN ', JSON.stringify(returnlocations));
  }

  return returnlocations;
};

export default {
  solveGrid,
  fillEmptyRows,
  fillFullRows,
  CrossCompleteLines: CrossCompleteCoordinates,
  getCoordinateLocations,
  fillOverlappingBoxes,
  crossImpossibleLocations
};
