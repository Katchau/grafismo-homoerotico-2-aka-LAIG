/**
 * MyInterface
 * @constructor
 */

 /* Construtor da interface */
function MyInterface() {
	//call CGFinterface constructor
	CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * init
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
	// call CGFinterface init
	CGFinterface.prototype.init.call(this, application);

	// init GUI. For more information on the methods, check:
	//  http://workshop.chromeexperiments.com/examples/gui

	this.gui = new dat.GUI();

	this.currScene = 0;

	return true;
};

//easter egg - o Bruno é boa pessoa, mas eu não >:)
MyInterface.prototype.removeFolder = function(name) {
  var folder = this.gui.__folders[name];
  if (!folder) {
    return;
  }
  folder.close();
  this.gui.__ul.removeChild(folder.domElement.parentNode);
  delete this.gui.__folders[name];
  this.gui.onResize();
}

/* Adiciona ao menu as luzes disponiveis */
MyInterface.prototype.addLightGroup = function(){
		this.removeFolder("Lights");
    var groupLights = this.gui.addFolder("Lights");
    groupLights.open();
    for(var i = 0; i < this.scene.total_lights; i++){
        groupLights.add(this.scene.lightStatus, i, this.scene.lightStatus[i]).name(this.scene.lightNames[i]);
    }
}

/* Permite ao clicar na tecla 'M' ou 'm' alterar os materiais aos objetos */
MyInterface.prototype.changeMat = function () {
    if(this.scene.has_next_mat){
        this.scene.has_next_mat = false;
        this.scene.material_pos++;
    }
    else{
        this.scene.has_next_mat = true;
        this.scene.material_pos = 0;
    }
    console.log("Key pressed M");
};

/* Permite ao clicar na tecla 'V' ou 'v' alterar a view */
MyInterface.prototype.changeView = function () {
    this.scene.curr_cam += 1;
    if(this.scene.curr_cam == this.scene.cameras.length)
        this.scene.curr_cam = 0;
    this.scene.changeCamera();
    this.setActiveCamera(this.scene.camera);
    console.log("Key pressed V");
};

MyInterface.prototype.watchMovie = function () {
    if(this.scene.gameStart == false){
        this.scene.changeViewHome();
        this.scene.repeat = true;
        this.scene.reset = false;
    }
};

MyInterface.prototype.changeDSX = function(){
    this.scene.rings = [];
    this.currScene++;
    if (this.currScene > 1)
        this.currScene = 0;
    this.scene.cage.pickPieces(this.currScene);
    this.scene.graph.loadedOk = false;
    if(this.currScene == 0)
        new MySceneGraph("dsx.dsx",this.scene);
    else if(this.currScene == 1)
        new MySceneGraph("dsx2.dsx",this.scene);
};

/**
 * processKeyboard
 * @param event {Event}
 */
MyInterface.prototype.processKeyboard = function(event) {
	// call CGFinterface default code (omit if you want to override)
	CGFinterface.prototype.processKeyboard.call(this,event);

	// Check key codes e.g. here: http://www.asciitable.com/
	// or use String.fromCharCode(event.keyCode) to compare chars

	// for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp
	switch (event.keyCode || event.which)
	{
		case 86:
            this.changeView();
			break;
        case 118:
            this.changeView();
            break;
        case 77:
            this.changeMat();
            break;
        case 109:
            this.changeMat();
            break;
        case 98:
            this.changeDSX();
            break;
        case 66:
            this.changeDSX();
            break;
        case 85:
            this.scene.cage.undoBoard();
            break;
        case 117:
            this.scene.cage.undoBoard();
            break;
        case 82:
            if(this.scene.gameStart){
                this.scene.cage.resetGame();
                this.scene.changeViewHome();
            }
            break;
        case 114:
            if(this.scene.gameStart){
                this.scene.cage.resetGame();
                this.scene.changeViewHome();
            }
            break;
        case 102:
            this.watchMovie();
            break;
        case 70:
            this.watchMovie();
            break;
	};
};
