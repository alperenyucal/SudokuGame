cc.Class({
  extends: cc.Component,

  properties: {
    width: 50,
    number: null,
    isInitial: false
  },

  ctor() {
    this.row = 0;
    this.column = 0;
  },

  setNumber(number) {
    if (!this.isInitial) {
      this.number = number;
      let label = this.node.getChildByName("Label").getComponent(cc.Label);
      label.string = this.number != null ? this.number : "";
      let sn = cc.find("Canvas/Sudoku");
      let sc = sn.getComponent("Sudoku");
      sc.sudoku[this.row][this.column] = number;
      sn.emit("sudoku-changed", this);
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


    this.node.on(cc.Node.EventType.TOUCH_START, (e) => {
      let sn = cc.find("Canvas/Sudoku");
      let sc = sn.getComponent("Sudoku");

      if (sc.inputMethod === "ButtonFirst") {
        sc.selectedCell = this;
      }
      else if (sc.inputMethod === "CellFirst") {
        let s = this.number == sc.selectedButton ? null : sc.selectedButton;
        this.setNumber(s);
      }

      this.sudoku = cc.find("Canvas/Sudoku").getComponent("Sudoku").sudoku;
    });


  },

});
