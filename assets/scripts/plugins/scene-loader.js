const Scene = class {
	constructor() {
		this.clear();
	};

	loadScene(sceneName, callback) {
		if (this.sceneStack.length == 0) {
			this.mainScene = cc.director.getScene().name;
			this.sceneStack.push(this.mainScene);
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
		cc.director.loadScene(this.mainScene);
		this.clear();
	}

	clear() {
		this.mainScene = null;
		this.sceneStack = [];
	}

};

window.scene = new Scene();