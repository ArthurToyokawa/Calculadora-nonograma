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


const generateParallelBooleanArray = (boolColumn): boolean[][] => {
    //creates array with size equal to the number of items inside a boolArr
    const parallelBoolArray: boolean[][] = Array.from(Array(boolColumn[0].length), () => []);
    boolColumn.forEach((arr, index) => {
        arr.forEach((bool, index) => {
            parallelBoolArray[index].push(bool)
        })
    });
    return parallelBoolArray
}


const generateRandomCoordinatesGrid = (horLen: number, verLen: number): CoordinatesGrid => {
    let lineCoordinates:number[][] = [];
    let columnCoordinates:number[][]  = []
    let boolColumn:boolean[][]  = [];
    for (let i = 0; i < horLen; i++) {
        const boolArr = createBooleanArray(verLen)
        boolColumn.push(boolArr)
        lineCoordinates.push(generateCoordinates(boolArr))
    }
    const parallelBoolArray = generateParallelBooleanArray(boolColumn)
    for (let i = 0; i < verLen; i++) {
        columnCoordinates.push(generateCoordinates(parallelBoolArray[i]))
    }
    return {lineCoordinates, columnCoordinates}
}

export default {createBooleanArray, generateCoordinates, generateParallelBooleanArray, generateRandomCoordinatesGrid} 






