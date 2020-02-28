cc.Class({
  extends: cc.Component,

  onLoad() {
    this.node.on(cc.Node.EventType.TOUCH_START, (e) => {
      let sc = cc.find("Canvas/Sudoku").getComponent("Sudoku");
      let cs = state.currentSudoku;
      for (let i = 0; i < sc.size; i++) {
        for (let j = 0; j < sc.size; j++) {
          sc.setSudokuCell(i, j, cs.sudoku_complete[i][j]);
        }
      }

    });
  },


});
