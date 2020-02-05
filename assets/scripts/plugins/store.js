const Store = class {

  constructor(initialState) {
    this.state = initialState;
  };


  saveState() {
    cc.sys.localStorage.setItem("state", JSON.stringify(this.state));
  }

  setState(newState) {
    Object.assign(this.state, newState);
  }
}

let savedState = JSON.parse(cc.sys.localStorage.getItem("state"));

window.store = savedState != null ? new Store(savedState) : new Store({});

let saveLocal = () => {
  store.saveState();
  setTimeout(saveLocal, 5000);
}

setTimeout(saveLocal, 5000)
