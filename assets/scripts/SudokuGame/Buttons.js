cc.Class({
  extends: cc.Component,

  properties: {

    buttonPrefab: {
      default: null,
      type: cc.Prefab
    },
    width: 360
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {

    let size = 5;

    let width = this.width;
    let buttonWidth = 40;
    let paddingWidth = (width - size * buttonWidth) / (size - 1);

    let x = -width / 2;

    for (let i = 0; i < size; i++) {

      let buttonNode = cc.instantiate(this.buttonPrefab);
      buttonNode.setPosition(x, 0);

      let button = buttonNode.getComponent("Button");
      button.width = buttonWidth;
      button.number = i + 1;

      this.node.addChild(buttonNode);

      x += buttonWidth + paddingWidth;

    }
  },
});