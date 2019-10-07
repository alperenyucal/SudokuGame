import { gridsEqual } from "../lib/sudoku-tools"

cc.Class({
  extends: cc.Component,

  properties: {

    cellPrefab: {
      default: null,
      type: cc.Prefab
    },

    inputMethod: "ButtonFirst"

  },


  ctor() {
    this.selectedCell;
    this.selectedButton = null;
    this.sudoku = [[3, 5, null, null, 9, 6, null, 8, 7], [null, 6, null, 7, 8, 1, 5, 3, 9], [null, 8, 7, null, null, null, 1, null, 2], [5, 2, 6, null, 3, null, 9, null, 4], [null, null, null, null, 6, null, null, 5, 3], [null, 9, 3, 5, 1, null, null, null, null], [null, null, 5, 9, 2, 3, 7, null, 8], [7, 4, 2, null, null, null, 3, null, 1], [null, null, null, null, null, 4, 6, 2, 5]]
    this.sudoku_complete = [[3, 5, 1, 2, 9, 6, 4, 8, 7], [2, 6, 4, 7, 8, 1, 5, 3, 9], [9, 8, 7, 3, 4, 5, 1, 6, 2], [5, 2, 6, 8, 3, 7, 9, 1, 4], [1, 7, 8, 4, 6, 9, 2, 5, 3], [4, 9, 3, 5, 1, 2, 8, 7, 6], [6, 1, 5, 9, 2, 3, 7, 4, 8], [7, 4, 2, 6, 5, 8, 3, 9, 1], [8, 3, 9, 1, 7, 4, 6, 2, 5]]
    this.box_sequence = [[0, 0, 0, 1, 1, 1, 2, 2, 2], [0, 0, 0, 1, 1, 1, 2, 2, 2], [0, 0, 0, 1, 1, 1, 2, 2, 2], [3, 3, 3, 4, 4, 4, 5, 5, 5], [3, 3, 3, 4, 4, 4, 5, 5, 5], [3, 3, 3, 4, 4, 4, 5, 5, 5], [6, 6, 6, 7, 7, 7, 8, 8, 8], [6, 6, 6, 7, 7, 7, 8, 8, 8], [6, 6, 6, 7, 7, 7, 8, 8, 8]]

    /*this.sudoku = [[null, null, null, 5, 3], [5, null, 4, null, 1], [3, 2, 5, null, 4], [4, null, 2, null, 5], [1, 5, 3, 4, 2]];
    this.sudoku_complete = [[2, 4, 1, 5, 3], [5, 3, 4, 2, 1], [3, 2, 5, 1, 4], [4, 1, 2, 3, 5], [1, 5, 3, 4, 2]];
    this.box_sequence = [[0, 0, 0, 1, 1], [0, 0, 1, 1, 1], [2, 2, 2, 3, 3], [2, 2, 4, 3, 3], [4, 4, 4, 4, 3]];*/
    this.size = this.sudoku.length;
    this.grid = [...Array(this.size)].map(e => Array(this.size).fill(null));
    this.initials = this.sudoku.map(row => row.map(i => { if (i != null) return true }));
  },

  setSudokuCell(row, column, number) {

    this.sudoku[row][column] = number;
    this.node.emit("sudoku-changed");
  },

  cellHandler(cell) {
    if (this.inputMethod === "ButtonFirst") {
      this.selectedCell = cell;
    }
    else if (this.inputMethod === "CellFirst") {
      if (this.selectedButton != null) {
        let number = cell.number == this.selectedButton.number ? null : this.selectedButton.number;
        cell.setNumber(number, () => {
          this.setSudokuCell(cell.row, cell.column, number);
        });
      }
    };
  },


  buttonHandler(button) {
    if (this.inputMethod === "ButtonFirst") {
      let s = this.selectedCell;
      this.grid[s.row][s.column].setNumber(button.number, () => {
        this.setSudokuCell(cell.row, cell.column, button.number);
      })
    }
    else if (this.inputMethod === "CellFirst") {
      if (this.selectedButton != null)
        this.selectedButton.setSelected(false);


      if (this.selectedButton == button) {
        this.selectedButton = null;
        button.setSelected(false);
      }
      else {
        this.selectedButton = button
        button.setSelected(true);
      }
    }
  },


  renderGrid() {

    let size = this.size;
    let width = this.node.width / size;

    let sudoku = this.sudoku;

    let x = -this.node.width / 2;
    let y = this.node.width / 2 - width;

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {

        let cellNode = cc.instantiate(this.cellPrefab);
        let cell = cellNode.getComponent("Cell");

        cell.width = width;
        cell.setNumber(sudoku[i][j]);
        cell.row = i;
        cell.column = j;

        if (this.initials[i][j]) cell.isInitial = true;

        cellNode.name = "cell" + i.toString() + j.toString();
        cellNode.setPosition(x, y);
        cellNode.on(cc.Node.EventType.TOUCH_START, () => { this.cellHandler(cell) });

        this.node.addChild(cellNode);
        this.grid[i][j] = cell;

        x += width;
      }
      x = -this.node.width / 2;
      y -= width;
    }

    this.selectedCell = this.grid[0][0];
  },


  createBoxBorders() {

    let box_sequence = this.box_sequence;
    let node = new cc.Node("Box-Borders");
    node.parent = this.node;

    let ctx = node.addComponent(cc.Graphics);

    let size = box_sequence.length

    let x;
    let y = -1 * this.node.width / 2;
    let w = this.node.width / size;

    for (let i = size - 1; i >= 0; --i) {
      x = -1 * this.node.width / 2;
      for (let j = 0; j < size; j++) {

        if (i === 0 || box_sequence[i][j] !== box_sequence[i - 1][j]) {
          ctx.moveTo(x, y + w);
          ctx.lineTo(x + w, y + w);
        }

        if (j === 0 || box_sequence[i][j] !== box_sequence[i][j - 1]) {
          ctx.moveTo(x, y);
          ctx.lineTo(x, y + w);
        }

        if (i === size - 1 || box_sequence[i][j] !== box_sequence[i + 1][j]) {
          ctx.moveTo(x, y);
          ctx.lineTo(x + w, y);
        }

        if (j === size - 1 || box_sequence[i][j] !== box_sequence[i][j + 1]) {
          ctx.moveTo(x + w, y);
          ctx.lineTo(x + w, y + w);
        }

        x += w;
      }
      y += w;
    }
    ctx.lineWidth = 5;
    ctx.lineCap = cc.Graphics.LineCap.ROUND;
    ctx.strokeColor = cc.color(0, 0, 0, 255);
    ctx.stroke();
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.renderGrid();
    this.createBoxBorders();

    this.node.on("sudoku-changed", () => {
      if (gridsEqual(this.size, this.sudoku, this.sudoku_complete))
        cc.director.loadScene("GameFinished");
    });
  },

});
