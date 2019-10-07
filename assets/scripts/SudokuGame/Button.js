cc.Class({
  extends: cc.Component,

  properties: {
    width: 50,
    number: 0,
    selected: false
  },

  setSelected(selected) {
    if (selected) {
      this.selected = true;
      var action = cc.scaleTo(0.2, 1.5);
      this.node.runAction(action);
    }
    else {
      this.selected = false;
      var action = cc.scaleTo(0.2, 1);
      this.node.runAction(action);
    };
  },
  // LIFE-CYCLE CALLBACKS:

  onLoad() {

    this.node.width = this.node.height = this.width;
    let labelNode = this.node.getChildByName("Label")
    labelNode.color = cc.color(0, 0, 255, 255);

    let label = this.node.getChildByName("Label").getComponent(cc.Label);
    label.string = this.number != null ? this.number : "";
  }
});
