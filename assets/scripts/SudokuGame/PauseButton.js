cc.Class({
    extends: cc.Component,
  
    onLoad() {
      this.node.on(cc.Node.EventType.TOUCH_START, (e) => {
        state.paused = true;
        cc.find("Canvas/Pause Layout").active = true;
      });
    },
  
  
  });
  