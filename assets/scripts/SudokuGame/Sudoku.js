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
    this.selectedButton = 1;
    this.sudoku = [[null, null, null, 5, 3], [5, null, 4, null, 1], [3, 2, 5, null, 4], [4, null, 2, null, 5], [1, 5, 3, 4, 2]];
    this.sudoku_complete = [[2, 4, 1, 5, 3], [5, 3, 4, 2, 1], [3, 2, 5, 1, 4], [4, 1, 2, 3, 5], [1, 5, 3, 4, 2]];
    this.box_sequence = [[0, 0, 0, 1, 1], [0, 0, 1, 1, 1], [2, 2, 2, 3, 3], [2, 2, 4, 3, 3], [4, 4, 4, 4, 3]];
    this.size = this.sudoku.length;
    this.grid = [...Array(this.size)].map(e => Array(this.size).fill(null));
    this.initials = this.sudoku.map(row => row.map(i => { if (i != null) return true }));
  },


  cellHandler(cell) {
    if (this.inputMethod === "ButtonFirst") {
      this.selectedCell = cell;
    }
    else if (this.inputMethod === "CellFirst") {
      let s = cell.number == this.selectedButton ? null : this.selectedButton;
      if (cell.setNumber(s)) {
        this.sudoku[cell.row][cell.column] = s;
        this.node.emit("sudoku-changed");
      };
    }
  },


  buttonHandler(button) {
    if (this.inputMethod === "ButtonFirst") {
      let s = this.selectedCell;
      if (this.grid[s.row][s.column].setNumber(button.number)) {
        this.sudoku[cell.row][cell.column] = button.number;
        this.node.emit("sudoku-changed");
      }
    }
    else if (this.inputMethod === "CellFirst") {
      this.selectedButton = this.selectedButton == button.number ? null : button.number;
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
