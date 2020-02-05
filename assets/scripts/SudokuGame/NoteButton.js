/** Changes note mode */

cc.Class({
  extends: cc.Component,

  onLoad() {
    this.node.on(cc.Node.EventType.TOUCH_START, (e) => {
      let sc = cc.find("Canvas/Sudoku").getComponent("Sudoku");
      sc.noteMode = !sc.noteMode;
      this.node.opacity = sc.noteMode ? 255 : 150;
      console.log(sc.noteMode);
    });
  },


});
