cc.Class({
  extends: cc.Component,
  start() {
    this.node.on(cc.Node.EventType.TOUCH_START, (e) => {
      scene.goBack();
    });
  }
});
