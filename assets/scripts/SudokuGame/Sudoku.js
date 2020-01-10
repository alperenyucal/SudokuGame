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
    this.selectedCell;
    this.selectedButton = null;
    this.eraseMode = false;
  },


  setSudokuCell(row, column, number) {
    this.sudoku[row][column] = number;
    store.setState({ currentSudoku: Object.assign({}, store.state.currentSudoku, { finalized: this.sudoku }) });
    this.node.emit("sudoku-changed", {
      row: row,
      column: column,
      number: number,
      cell: this.grid[row][column]
    });
  },


  cellHandler(cell) {
    if (this.eraseMode) {
      cell.setNumber(null, () => {
        this.setSudokuCell(cell.row, cell.column, null);
      });
    }
    else if (this.inputMethod === "ButtonFirst") {
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
    let errors = allErrors(this.sudoku, this.box_sequence);

    for (let i = 0; i < this.size; i++)
      for (let j = 0; j < this.size; j++)
        this.grid[i][j].setError(errors[i][j]);

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
        cell.size = size;

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
    ctx.strokeColor = cc.color(0, 0, 0);
    ctx.stroke();
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    let cs = store.state.currentSudoku;

    this.sudoku = cs.finalized;
    this.sudoku_complete = cs.sudoku;
    this.box_sequence = cs.box_sequence;
    this.initials = cs.initials;

    this.size = this.sudoku.length;
  },


  start() {

    this.grid = [...Array(this.size)].map(e => Array(this.size).fill(null));

    this.node.on("sudoku-changed", (c) => {
      this.checkErrors();

      if (gridsEqual(this.size, this.sudoku, this.sudoku_complete)) {
        cc.director.loadScene("GameFinished");
        store.setState({ currentSudoku: null })
      }
    });

    this.renderGrid();
    this.checkErrors();
    this.createBoxBorders();
  },

});
