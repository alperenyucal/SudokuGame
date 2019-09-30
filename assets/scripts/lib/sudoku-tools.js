export function createGrid(size, value) {
  let grid = []
  for (let i = 0; i < size; i++) {
    grid.push([])
    for (let j = 0; j < size; j++)
      grid[i].push(value)
  }
  return grid
}

function isInRow(sudoku, num, row, size) {
  if (num !== undefined) {
    let count = 0
    for (let col = 0; col < size; col++)
      if (num == sudoku[row][col]) count++
    if (count > 1)
      return true
  }
  return false
}

function isInColumn(sudoku, num, col, size) {
  if (num !== undefined) {
    let count = 0
    for (let row = 0; row < size; row++)
      if (num == sudoku[row][col]) count++
    if (count > 1)
      return true
  }
  return false
}

function isInRegion(sudoku, num, box_sequence, reg, size) {
  if (num !== undefined) {
    let count = 0
    for (let row = 0; row < size; row++)
      for (let col = 0; col < size; col++)
        if (box_sequence[row][col] == reg && num == sudoku[row][col]) count++

    if (count > 1)
      return true
  }
  return false
}

export function isValid(sdk, sq, num, row, col) {
  let sz = sdk.length
  let reg = sq[row][col]
  return isInColumn(sdk, num, col, sz) || isInRow(sdk, num, row, sz) || isInRegion(sdk, num, sq, reg, sz)
}

export function gridsEqual(size, grid1, grid2) {
  for (let row = 0; row < size; row++)
    for (let column = 0; column < size; column++)
      if (grid1[row][column] !== grid2[row][column])
        return false
  return true
}