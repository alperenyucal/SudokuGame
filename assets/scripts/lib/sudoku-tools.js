export function gridsEqual(size, grid1, grid2) {
  for (let row = 0; row < size; row++)
    for (let column = 0; column < size; column++)
      if (grid1[row][column] !== grid2[row][column])
        return false
  return true
}