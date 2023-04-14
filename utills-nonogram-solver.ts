
type CoordinateLocations = {
  coordinate: number
  firstPossibleBox: number
  lastPossibleBox: number
}

type CoordinatesGrid = {
  lineCoordinates: number[][]
  columnCoordinates: number[][]
}

enum BoxState {
  empty,
  filled,
  crossed,
}

const coordinatesGrid: CoordinatesGrid = {
  lineCoordinates: [ [ 3 ], [ 2, 1 ], [ 4 ], [ 5 ], [ 2, 1 ] ],
  columnCoordinates: [ [ 3 ], [ 5 ], [ 1, 3 ], [ 4 ], [ 2 ] ]
}

const answer = [
  [ false, true, true, true, false ],
  [ true, true, false, true, false ],
  [ true, true, true, true, false ],
  [ true, true, true, true, true ],
  [ false, true, true, false, true ]
]

const createEmptyBox = (lineLenght: number, columnLenght: number):BoxState[][] => {
  const emptyBox : BoxState[][] = []
  for(let i = 0; i < lineLenght; i++) {
    emptyBox.push(Array.from(Array(columnLenght), () => BoxState.empty))
  }
  return emptyBox;
}

const fillEmptyRows = (boxArray: BoxState[], coordinates: number[]):BoxState[] => {
  if(coordinates.length === 0) {
    boxArray.fill(BoxState.crossed)
  }
  return boxArray;
}
const fillFullRows = (boxArray: BoxState[], coordinates: number[]):BoxState[] => {
  if(coordinates.length === 1 && coordinates[0] === boxArray.length) {
    boxArray.fill(BoxState.filled)
  }
  return boxArray;
}

//if all coordinates are filled cross the rest of the boxes
const CrossCompleteLines = (boxArray: BoxState[], coordinates: number[]):BoxState[] => {
  const coordinatesTotal = coordinates.reduce((total, curr) => {
    total += curr
    return total
  }, 0) 
  const gridTotal = boxArray.reduce((total, curr) => {
    if(curr === BoxState.filled){
      total++
    }
    return total
  }, 0)
  if(gridTotal === coordinatesTotal){
    return boxArray.map((box) => {
      if(box === BoxState.empty || box === BoxState.crossed) {
        return BoxState.crossed
      } 
      return BoxState.filled
    })
  }
  return boxArray;
}

const fillOverlappingBoxes = (boxArray: BoxState[], coordinates: number[]):BoxState[] => {
  const locations = getCoordinateLocations(boxArray, coordinates)
  console.log(locations)
  for(let i = 0; i< coordinates.length; i++){
    const possibleBoxesLen = locations[i].lastPossibleBox - locations[i].firstPossibleBox
    if(coordinates[i] > possibleBoxesLen/2 ){
      //se for um numero impar o math.ceil e math.floor arrnajam para ele pegar os numeros do meio
      const coordinateDiff = Math.ceil(coordinates[i] - possibleBoxesLen/2)
      console.log('coordinateDiff', coordinateDiff)
      console.log('startFilling', Math.ceil(locations[i].firstPossibleBox + (possibleBoxesLen/2)-coordinateDiff))
      console.log('stopFilling', Math.floor(locations[i].firstPossibleBox + (possibleBoxesLen/2)+coordinateDiff))
      boxArray.fill(
        BoxState.filled, 
        Math.ceil(locations[i].firstPossibleBox + (possibleBoxesLen/2)-coordinateDiff), 
        Math.floor(locations[i].firstPossibleBox + (possibleBoxesLen/2)+coordinateDiff)
      )
    } 
  }
  return boxArray;
}

const crossImpossibleLocations = (boxArray: BoxState[], coordinates: number[]):BoxState[] => {
  const locations = getCoordinateLocations(boxArray, coordinates)
  console.log(locations)
  const possibleIndexes: number[] = [];
  console.log('test')
  locations.forEach(location => {
    for (let i = location.firstPossibleBox; i <= location.lastPossibleBox; i++) {
      possibleIndexes.push(i);
    }
  });
  console.log('test1')
  console.log('boxlen ', boxArray.length)
  for (let i = 0; i < boxArray.length; i++) {
    console.log('test: ', i)
    if (!possibleIndexes.includes(i)) {
      boxArray[i] = BoxState.crossed
    }
  }
  console.log('locations ', locations)
  console.log('possibleIndexes ', possibleIndexes)

  return boxArray;
}

const getCoordinateLocations = (boxArray: BoxState[], coordinates: number[]):CoordinateLocations[] => {
  const possibleBoxes = getCoordinatePossibleBoxes(boxArray, coordinates);
  const reversePossibleBoxes = getCoordinatePossibleBoxes(boxArray.slice().reverse(), coordinates.slice().reverse()).reverse()
  const coordinateLocations: CoordinateLocations[] = []
  for(let i = 0; i< coordinates.length; i++){
    coordinateLocations.push(
      {
        coordinate: coordinates[i], 
        firstPossibleBox: possibleBoxes[i],
        lastPossibleBox: boxArray.length - reversePossibleBoxes[i]
      }
      )
    }
    return coordinateLocations;
  }
  
  const getCoordinatePossibleBoxes = (boxArray: BoxState[], coordinates: number[]): number[] => {
    // possivel fazer as coordenadas pelo array pela esquerda e para direita, para ver as possiveis blocos
    const possibleBoxes: number[] = []
    let startingBox = 0;
    coordinates.forEach((coordinate) => {
      // console.log('startingBox ',startingBox)
      //verifica a coordenada se ela pode ser preenchida
    let verificaCoordenada = true;
    while(verificaCoordenada) {
      //se tem um cross move a coordenada para o localCross+1
      const coordinateCrossIndex = boxArray.slice(startingBox, startingBox+coordinate).indexOf(BoxState.crossed)
      if(coordinateCrossIndex !== -1) {
        startingBox += coordinateCrossIndex+1
        // console.log('startingBoxCrossed ',startingBox)
      } else if(boxArray[startingBox+coordinate] === BoxState.filled) {
        //se o ultimo local+1 da coordenada esta preenchido move a inicial 1 para frente
        startingBox++
        // console.log('startingBoxFilled ',startingBox)
      } else {
        possibleBoxes.push(startingBox)
        startingBox += coordinate+1
        // console.log('startingBoxEnd ',startingBox-1)
        verificaCoordenada = false
      }
    }
  })
  
  return possibleBoxes
}

const solveGrid = (coordinatesGrid: CoordinatesGrid): BoxState[][] => {
  const box = createEmptyBox(coordinatesGrid.lineCoordinates.length, coordinatesGrid.columnCoordinates.length)
  console.log(box)
  coordinatesGrid.lineCoordinates.forEach((coordinates, index) => {
    // corre todos os algoritimos 
    // fillEmptyRows(box[index], coordinates)
    // fillFullRows(box[index], coordinates)
  });
  // checa se teve alguma mudanca na box se teve corre denovo o algoritimo se nao corre outro algoritimo
  console.log(box)
  return box;
}

// TODO
// se uma coordenada fica no inicio ou fim de um array de coordenadas e tem uma cross bloqueia/preenche todas antes
// se uma coordenada esta completa da cross nas caixas adjacentes
// se uma coordenada esta completa nao utiliza ela ou as suas casas em outros algoritimos
// adicionar checagens se uma caixa esta vazia antes de a modificar

const testCoordinates = [ 3, 2 ];
const testBox = [
  BoxState.empty, 
  BoxState.crossed, //if cross 1
  BoxState.empty,
  BoxState.empty,
  BoxState.empty,
  BoxState.filled, // if filled 5
  BoxState.empty,
  BoxState.empty, // inicio segunda coordenada 7
  BoxState.crossed, //if cross 8
  BoxState.empty, 
  BoxState.empty, 
  BoxState.crossed,
  BoxState.empty, 
]
console.log('testboxlen ', testBox.length)
// console.log(getCoordinateLocations(testBox, testCoordinates))

const testCoordinates2 = [ 3 ];
const testBox2 = [
  BoxState.empty,
  BoxState.empty,
  BoxState.empty,
  BoxState.empty,
  BoxState.empty,
]
// console.log(fillOverlappingBoxes(testBox2, testCoordinates2))

console.log('result ', crossImpossibleLocations(testBox, testCoordinates))

