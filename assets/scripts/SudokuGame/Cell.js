cc.Class({
  extends: cc.Component,

  properties: {
    width: 50,
    number: null,
    isInitial: false,
    error: false
  },

  ctor() {
    this.row = 0;
    this.column = 0;
  },

  setNumber(number, callback) {
    if (!this.isInitial) {
      this.number = number;
      let label = this.node.getChildByName("Label").getComponent(cc.Label);
      label.string = this.number != null ? this.number : "";
      typeof callback === 'function' && callback();
    }
  },

  setError(error) {
    if (!this.isInitial) {
      let labelNode = this.node.getChildByName("Label");
      if (error) {
        this.error = true;
        labelNode.color = cc.color(255, 0, 0, 150);
      }
      else {
        this.error = false;
        labelNode.color = cc.color(0, 0, 150, 150);
      };
    }
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {

    this.node.width = this.node.height = this.width;

    let boxNode = new cc.Node("Box");
    boxNode.parent = this.node;
    let ctx = boxNode.addComponent(cc.Graphics);
    ctx.lineWidth = 1;
    ctx.lineCap = cc.Graphics.LineCap.ROUND;
    ctx.strokeColor = cc.color(0, 0, 0, 255);
    ctx.rect(0, 0, this.width, this.width);
    ctx.stroke();

    let labelNode = this.node.getChildByName("Label")
    labelNode.setPosition(this.width / 2, this.width / 2);

    labelNode.color = this.isInitial ? cc.color(0, 0, 0, 255) : cc.color(0, 0, 150, 150);
  },

});
