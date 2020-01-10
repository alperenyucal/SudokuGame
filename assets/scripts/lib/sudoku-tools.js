/** Compare two sudoku grids */
export function gridsEqual(size, grid1, grid2) {
  for (let row = 0; row < size; row++)
    for (let col = 0; col < size; col++)
      if (grid1[row][col] !== grid2[row][col])
        return false
  return true
}


export function rowErrors(sudoku) {

  let size = sudoku.length;
  let errors = [...Array(size)].map(e => Array(size).fill(false));


  let first = {
    row: null,
    col: null
  };

  for (let num = 1; num <= size; num++) {
    for (let row = 0; row < size; row++) {
      let numCount = 0;
      for (let col = 0; col < size; col++) {
        if (sudoku[row][col] == num) {
          numCount++;

          if (numCount == 1)
            first = {
              row: row,
              col: col
            }

          else if (numCount > 1) {
            errors[row][col] = true;
          }
        }
      }

      if (numCount > 1)
        errors[first.row][first.col] = true;
      numCount = 0;
    }
  }

  return errors;
};


export function colErrors(sudoku) {

  let size = sudoku.length;
  let errors = [...Array(size)].map(e => Array(size).fill(false));


  let first = {
    row: null,
    col: null
  };

  for (let num = 1; num <= size; num++) {
    for (let col = 0; col < size; col++) {
      let numCount = 0;
      for (let row = 0; row < size; row++) {
        if (sudoku[row][col] == num) {
          numCount++;

          if (numCount == 1)
            first = {
              row: row,
              col: col
            }

          else if (numCount > 1) {
            errors[row][col] = true;
          }
        }
      }

      if (numCount > 1)
        errors[first.row][first.col] = true;
      numCount = 0;
    }
  }

  return errors;
};


export function regErrors(sudoku, regBorders) {

  let size = sudoku.length;


  let errors = [...Array(size)].map(e => Array(size).fill(false));
  let regional = [...Array(size)].map(e => Array());

  for (let i = 0; i < size; i++)
    for (let j = 0; j < size; j++)
      regional[regBorders[i][j]].push({
        num: sudoku[i][j],
        row: i,
        col: j
      });


  let first = {
    row: null,
    col: null
  };

  for (let num = 1; num <= size; num++) {
    for (let reg = 0; reg < size; reg++) {
      let numCount = 0;
      for (let i = 0; i < size; i++) {
        let c = regional[reg][i];
        if (c.num == num) {
          numCount++;

          if (numCount == 1)
            first = {
              row: c.row,
              col: c.col
            }

          else if (numCount > 1) {
            errors[c.row][c.col] = true;
          }
        }
      }

      if (numCount > 1)
        errors[first.row][first.col] = true;
      numCount = 0;
    }
  }


  return errors;
};


export function allErrors(sudoku, regBorders) {

  let size = sudoku.length;
  let errors = [...Array(size)].map(e => Array(size).fill(false));

  let re = rowErrors(sudoku);
  let ce = colErrors(sudoku);
  let rg = regErrors(sudoku, regBorders);

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      errors[row][col] = (re[row][col] || ce[row][col] || rg[row][col]);
    }
  }

  return errors;

}
