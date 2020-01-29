cc.Class({
  extends: cc.Component,

  properties: {
    isInitial: false,
    error: false,
  },

  ctor() {
    this.row = 0;
    this.column = 0;
  },

  setNote(number, position) {
    if (!this.isInitial) {
      let nts = this.node.getChildByName("Notes").getComponent("Notes");
      nts.grid[position].string = number || "";
    }
  },

  setNumber(number) {
    if (!this.isInitial) {
      this.number = number;
      let label = this.node.getChildByName("Label").getComponent(cc.Label);
      label.string = this.number || "";
      let nts = this.node.getChildByName("Notes");
      nts.active = this.number != null ? false : true;
    }
  },

  setError(error) {
    if (!this.isInitial) {
      let labelNode = this.node.getChildByName("Label");
      if (error) {
        this.error = true;
        labelNode.color = cc.color(255, 0, 0);
      }
      else {
        this.error = false;
        labelNode.color = cc.color(0, 0, 150);
      };
    }
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {

    let nts = this.node.getChildByName("Notes").getComponent("Notes");
    nts.notes = this.notes;

    this.node.width = this.node.height = this.width;

    let boxNode = new cc.Node("Box");
    boxNode.parent = this.node;
    let ctx = boxNode.addComponent(cc.Graphics);
    ctx.lineWidth = 1.5;
    ctx.lineCap = cc.Graphics.LineCap.ROUND;
    ctx.strokeColor = cc.color(0, 0, 0);
    ctx.rect(0, 0, this.width, this.width);
    ctx.stroke();

  },

  start() {
    let labelNode = this.node.getChildByName("Label");

    if (this.isInitial) this.node.getChildByName("Notes").active = false;

    if (!this.error)
      labelNode.color = this.isInitial ? cc.color(0, 0, 0) : cc.color(0, 0, 150);
    else
      labelNode.color = cc.color(255, 0, 0);
  },

});
