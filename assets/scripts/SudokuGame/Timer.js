cc.Class({
  extends: cc.Component,

  properties: {
    mins: 0,
    secs: 0,
  },


  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    let ct = state.currentTime;
    this.mins = ct.mins;
    this.secs = ct.secs;
    this.firstLoop = true;
  },


  update(dt) {
    if (!state.paused || this.firstLoop) {

      this.secs += dt;
      let lc = this.node.getComponent(cc.Label);

      if (this.secs >= 60) {
        this.mins++;
        this.secs -= 60;
      }

      let ct = state.currentTime;

      if ((this.mins * 60 + this.secs) > (ct.mins * 60 + ct.secs)) {
        state.currentTime = {
          mins: this.mins,
          secs: this.secs
        }
      }

      let t = this.secs >= 10 ? Math.floor(this.secs) : "0".concat(Math.floor(this.secs).toString());

      lc.string = this.mins + ":" + t;

      this.firstLoop = false;
    }
  },
});
