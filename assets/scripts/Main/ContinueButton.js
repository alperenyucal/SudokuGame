cc.Class({
  extends: cc.Component,

  onLoad() {
    if (state.currentSudoku == null) {
      let bc = this.node.getComponent(cc.Button);
      bc.interactable = false;
    }
  },

  start() {
    if (state.currentSudoku != null) {
      this.node.on(cc.Node.EventType.TOUCH_START, (e) => {
        scene.loadScene("SudokuGame");
      });
    }
  },

});
