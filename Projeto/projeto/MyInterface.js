
class MyInterface extends CGFinterface {


	/**
	 * MyInterface
	 * @constructor
	 */
 	constructor () {
 		super();
 	}

	/**
	 * init
	 * @param {CGFapplication} application
	 */
	init(application) {
		// call CGFinterface init
		super.init(application);

		// init GUI. For more information on the methods, check:
		//  http://workshop.chromeexperiments.com/examples/gui

		this.gui = new dat.GUI();

		// add a button:
		// the first parameter is the object that is being controlled (in this case the scene)
		// the identifier 'doSomething' must be a function declared as part of that object (i.e. a member of the scene class)
		// e.g. LightingScene.prototype.doSomething = function () { console.log("Doing something..."); };

    this.gui.add(this.scene, 'show_axis').name('Apresentar Eixos');
    this.gui.add(this.scene, 'show_primary_solids').name('Apresentar Sólidos de Demonstração');
    this.gui.add(this.scene, 'drift_mode').name('Modo de Drift');
    this.gui.add(this.scene, 'selectedAppearance', {'Regular':0, 'Camo':1}).onChange((value) => {
      this.scene.currVehicleAppearance = this.scene.vehicleAppearances[this.scene.selectedAppearance];
      this.scene.car.updateTexture();
    });

		// add a group of controls (and open/expand by defult)

		var group=this.gui.addFolder("Lights");

		// add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
		// e.g. this.option1=true; this.option2=false;

    group.add(this.scene, 'enable_lights').name('Ativar todas as luzes');
		group.add(this.scene, 'enable_light_1').name('Ativar luz 1');
		group.add(this.scene, 'enable_light_2').name('Ativar luz 2');

		// add a slider
		// must be a numeric variable of the scene, initialized in scene.init e.g.
		// this.speed=3;
		// min and max values can be specified as parameters

		this.gui.add(this.scene, 'horsepower', 100, 600);

    this.initKeys();
		return true;
	};

  initKeys(){
    this.scene.gui = this;
    this.processKeyboard = function(){};
    this.activeKeys = {};
  }

  processKeyDown(event){
    this.activeKeys[event.code] = true;
  }
  processKeyUp(event){
    this.activeKeys[event.code] = false;
  }

  isKeyPressed(keyCode){
    return this.activeKeys[keyCode] || false;
  }
};
