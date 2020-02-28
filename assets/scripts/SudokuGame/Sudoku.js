import { gridsEqual, allErrors } from "../lib/sudoku-tools"

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
    this.cs = state.currentSudoku;

    this.selectedCell;
    this.selectedButton = null;
    this.eraseMode = false;
    this.noteMode = false;

  },


  setSudokuCell(row, column, number) {
    if (!this.cs.initials[row][column]) {
      this.grid[row][column].setNumber(number);
      this.cs.sudoku[row][column] = number;
    }
    this.node.emit("sudoku-changed");
  },

  setCellNote(row, column, number, position) {
    if (!this.cs.initials[row][column]) {
      this.cs.notes[row][column][position] = number;
      this.grid[row][column].setNote(number, position);
      this.node.emit("sudoku-changed");
    }
  },


  cellHandler(cell) {
    if (this.eraseMode)
      if (this.noteMode)
        this.setCellNote(cell.row, cell.column, null, this.selectedButton.number - 1);
      else
        this.setSudokuCell(cell.row, cell.column, null);

    else if (this.inputMethod === "ButtonFirst")
      this.selectedCell = cell;

    else if (this.inputMethod === "CellFirst") {
      if (this.selectedButton != null) {
        if (this.noteMode) {
          let pos = this.selectedButton.number - 1;
          let nts = state.currentSudoku.notes[cell.row][cell.column];
          let number = nts[pos] == this.selectedButton.number ? null : this.selectedButton.number;
          this.setCellNote(cell.row, cell.column, number, pos);
        }
        else {
          let number = cell.number == this.selectedButton.number ? null : this.selectedButton.number;
          this.setSudokuCell(cell.row, cell.column, number);
        }
      }
    };
  },


  buttonHandler(button) {
    if (this.inputMethod === "ButtonFirst") {/*
      let s = this.selectedCell;
      this.grid[s.row][s.column].setNumber(button.number, () => {
        this.setSudokuCell(cell.row, cell.column, button.number);
      })
    */}
    else if (this.inputMethod === "CellFirst") {
      this.eraseMode = false;

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


  checkErrors() {
    let errors = allErrors(this.cs.sudoku, this.cs.region_sequence);

    for (let i = 0; i < this.size; i++)
      for (let j = 0; j < this.size; j++)
        this.grid[i][j].setError(errors[i][j]);

  },

  renderGrid() {

    let width = this.node.width / this.size;

    this.cellWidth = width;

    let x = -this.node.width / 2;
    let y = this.node.width / 2 - width;

    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {

        let cellNode = cc.instantiate(this.cellPrefab);
        let cell = cellNode.getComponent("Cell");

        cell.width = width;
        cell.setNumber(this.cs.sudoku[i][j]);
        cell.notes = this.cs.notes[i][j];
        cell.row = i;
        cell.column = j;
        cell.size = this.size;

        cell.isInitial = this.cs.initials[i][j];

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

    let node = new cc.Node("Box-Borders");
    node.parent = this.node;

    let ctx = node.addComponent(cc.Graphics);


    let x;
    let y = -1 * this.node.width / 2;
    let w = this.node.width / this.size;

    for (let i = this.size - 1; i >= 0; --i) {
      x = -1 * this.node.width / 2;
      for (let j = 0; j < this.size; j++) {

        if (i === 0 || this.cs.region_sequence[i][j] !== this.cs.region_sequence[i - 1][j]) {
          ctx.moveTo(x, y + w);
          ctx.lineTo(x + w, y + w);
        }

        if (j === 0 || this.cs.region_sequence[i][j] !== this.cs.region_sequence[i][j - 1]) {
          ctx.moveTo(x, y);
          ctx.lineTo(x, y + w);
        }

        if (i === this.size - 1 || this.cs.region_sequence[i][j] !== this.cs.region_sequence[i + 1][j]) {
          ctx.moveTo(x, y);
          ctx.lineTo(x + w, y);
        }

        if (j === this.size - 1 || this.cs.region_sequence[i][j] !== this.cs.region_sequence[i][j + 1]) {
          ctx.moveTo(x + w, y);
          ctx.lineTo(x + w, y + w);
        }

        x += w;
      }
      y += w;
    }
    ctx.lineWidth = 5;
    ctx.lineCap = cc.Graphics.LineCap.ROUND;
    ctx.strokeColor = cc.color(0, 0, 0);
    ctx.stroke();
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.size = this.cs.sudoku.length;
  },


  start() {

    this.grid = [...Array(this.size)].map(e => Array(this.size).fill(null));

    this.node.on("sudoku-changed", () => {
      this.checkErrors();

      if (JSON.stringify(this.cs.sudoku) == JSON.stringify(this.cs.sudoku_complete)) {
        state.currentSudoku = null
        cc.director.loadScene("GameFinished");
      }
    });

    this.renderGrid();
    this.checkErrors();
    this.createBoxBorders();
  },

});
