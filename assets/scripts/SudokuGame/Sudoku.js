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
    let cs = store.state.currentSudoku;

    this.selectedCell;
    this.selectedButton = null;
    this.eraseMode = false;
    this.noteMode = false;
    this.size = cs.finalized.length;

  },


  setSudokuCell(row, column, number) {
    this.grid[row][column].setNumber(number);
    let sdkcpy = JSON.parse(JSON.stringify(store.state.currentSudoku.finalized));
    sdkcpy[row][column] = number;
    store.setState({ currentSudoku: Object.assign({}, store.state.currentSudoku, { finalized: sdkcpy }) });
    this.node.emit("sudoku-changed");
  },

  setCellNote(row, column, number, position) {
    // something like this
    let ntscpy = JSON.parse(JSON.stringify(store.state.currentSudoku.notes));
    ntscpy[row][column][position] = number;
    store.setState({ currentSudoku: Object.assign({}, store.state.currentSudoku, { notes: ntscpy }) });
    this.grid[row][column].setNote(number, position);
    this.node.emit("sudoku-changed");
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
          let nts = store.state.currentSudoku.notes[cell.row][cell.column];
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
    let cs = store.state.currentSudoku
    let size = cs.finalized.length;
    let errors = allErrors(cs.finalized, cs.box_sequence);

    for (let i = 0; i < size; i++)
      for (let j = 0; j < size; j++)
        this.grid[i][j].setError(errors[i][j]);

  },

  renderGrid() {

    let cs = store.state.currentSudoku;

    let size = cs.finalized.length;
    let width = this.node.width / size;

    this.cellWidth = width;

    let sudoku = cs.finalized;

    let x = -this.node.width / 2;
    let y = this.node.width / 2 - width;

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {

        let cellNode = cc.instantiate(this.cellPrefab);
        let cell = cellNode.getComponent("Cell");

        cell.width = width;
        cell.setNumber(sudoku[i][j]);
        cell.notes = cs.notes[i][j];
        cell.row = i;
        cell.column = j;
        cell.size = size;

        cell.isInitial = cs.initials[i][j];

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
    let cs = store.state.currentSudoku;

    let box_sequence = cs.box_sequence;
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
    this.size = cs.finalized.length;
  },


  start() {
    let cs = store.state.currentSudoku;
    let size = cs.finalized.length;

    this.grid = [...Array(size)].map(e => Array(size).fill(null));

    this.node.on("sudoku-changed", () => {
      this.checkErrors();

      if (gridsEqual(cs.finalized.length, cs.finalized, cs.sudoku)) {
        cc.director.loadScene("GameFinished");
        store.setState({ currentSudoku: null })
      }

      console.log(store.state);
    });

    this.renderGrid();
    this.checkErrors();
    this.createBoxBorders();
  },

});
