// TODO CRIAR CLASSE MODELO PARA OS TYPES
type GridCoordinates = {
    lineCoordinates: number[][]
    columnCoordinates: number[][]
  }

const createBooleanArray = (len: number):boolean[] => {
    const booleanArray: boolean[] = []
    for(let i = 0; i<len; i++){
        //75% chance of true
        booleanArray.push(Math.random() < 0.75)    
    }
    return booleanArray
}


const generateCoordinates = (boolArr: boolean[]):number[] => {
    const coordinates:number[] = boolArr.reduce((arr, curr) => {
        if(curr) {
            arr[arr.length - 1]++
        } else if (arr[arr.length - 1] !== 0) {
            arr.push(0)
        }
        return arr
    }, [0])
    if(coordinates[coordinates.length - 1] === 0) {
        coordinates.pop();
    } 
    return coordinates;
}


const generateParallelBooleanArray = (boolGrid: boolean[][]): boolean[][] => {
    //creates array with size equal to the number of items inside a boolArr
    const parallelBoolGrid: boolean[][] = Array.from(Array(boolGrid[0].length), () => []);
    boolGrid.forEach((arr, index) => {
        arr.forEach((bool, index) => {
            parallelBoolGrid[index].push(bool)
        })
    });
    return parallelBoolGrid
}


const generateRandomGrid = (horLen: number, verLen: number): {boolGrid: boolean[][], gridCoordinates: GridCoordinates } => {
    let lineCoordinates:number[][] = [];
    let columnCoordinates:number[][]  = []
    let boolGrid:boolean[][]  = [];
    for (let i = 0; i < horLen; i++) {
        const boolArr = createBooleanArray(verLen)
        boolGrid.push(boolArr)
        lineCoordinates.push(generateCoordinates(boolArr))
    }
    const parallelBoolArray = generateParallelBooleanArray(boolGrid)
    for (let i = 0; i < verLen; i++) {
        columnCoordinates.push(generateCoordinates(parallelBoolArray[i]))
    }
    return {boolGrid, gridCoordinates: {lineCoordinates, columnCoordinates}}
}


export default {createBooleanArray, generateCoordinates, generateParallelBooleanArray, generateRandomGrid} 






