cc.Class({
  extends: cc.Component,


  start() {

    this.node.on(cc.Node.EventType.TOUCH_START, (e) => {

      cc.loader.loadRes("data", function (err, jsonAsset) {
        let index = Math.floor(Math.random() * 40);

        let newSudoku = jsonAsset.json[index]
        store.setState({
          currentSudoku: Object.assign(newSudoku, {
            initials: newSudoku.finalized.map(row => row.map(i => { if (i != null) return true })),
          }),
          currentTime: {
            mins: 0,
            secs: 0
          }
        });

        scene.loadScene("SudokuGame");
      });
    });
  },


});
