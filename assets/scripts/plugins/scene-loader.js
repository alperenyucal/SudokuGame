const Scene = class {
	constructor() {
		this.clear();
	};

	loadScene(sceneName, callback) {
		if (this.sceneStack.length == 0) {
			this.sceneStack.push(cc.director.getScene().name);
		}

		cc.director.loadScene(sceneName, callback);
		this.sceneStack.push(sceneName);
	};

	goBack() {
		if (this.sceneStack.length > 1) {
			let sceneName = this.sceneStack[this.sceneStack.length - 2];
			this.sceneStack.pop();
			cc.director.loadScene(sceneName);

			if (this.sceneStack.length == 1)
				this.clear();
		}
	}

	goHome() {
		cc.director.loadScene(this.sceneStack[0]);
		this.clear();
	}

	clear() {
		this.sceneStack = [];
	}

};

window.scene = new Scene();
