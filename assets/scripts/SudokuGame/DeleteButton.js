cc.Class({
  extends: cc.Component,

  onLoad() {
    this.node.on(cc.Node.EventType.TOUCH_START, (e) => {
      let sc = cc.find("Canvas/Sudoku").getComponent("Sudoku");
      if (!sc.eraseMode) {
        if (sc.selectedButton != null) {
          sc.selectedButton.setSelected(false);
          sc.selectedButton = null;
        }
        sc.eraseMode = true;
      }
      else
        sc.eraseMode = false;
    });
  },

});
