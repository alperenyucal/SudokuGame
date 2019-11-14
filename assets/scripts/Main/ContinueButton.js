cc.Class({
  extends: cc.Component,

  onLoad() {
    if (store.state.currentSudoku == null) {
      let bc = this.node.getComponent(cc.Button);
      bc.interactable = false;
    }
  },

  start() {
    if (store.state.currentSudoku != null) {
      this.node.on(cc.Node.EventType.TOUCH_START, (e) => {
        scene.loadScene("SudokuGame");
        console.log(scene.sceneStack);
      });
    }
  },

});
