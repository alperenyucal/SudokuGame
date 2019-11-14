const Store = class {

  constructor(initialState) {
    this.state = initialState;
  };


  saveState() {
    cc.sys.localStorage.setItem("state", JSON.stringify(this.state));
  }
  // saved games
  // current game
  // user info
  // other stuff

  setState(newState) {
    Object.assign(this.state, newState);
    this.saveState();
  }
}

let savedState = JSON.parse(cc.sys.localStorage.getItem("state"));

window.store = savedState != null ? new Store(savedState) : new Store({});
