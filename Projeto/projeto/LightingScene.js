var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

var NUM_LIGHTS = 2;

var fps = 60;

class LightingScene extends CGFscene
{
	constructor()
	{
		super();
	};

	init(application)
	{
		super.init(application);

		this.initCameras();

		this.initLights();

		this.enableTextures(true);

		this.updatePeriod = 1000/fps;
		this.lastTime = 0;

		this.gl.clearColor(0.0, 0.56, 0.8, 1.0);
		this.gl.clearDepth(100.0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.enable(this.gl.CULL_FACE);
		this.gl.depthFunc(this.gl.LEQUAL);

		this.axis = new CGFaxis(this);

		//Interface
		this.enable_lights=true;
		this.enable_light_1=true;
		this.enable_light_2=true;
		this.horsepower = 150;

		//Creating the default material for the scene
		this.materialDefault = new CGFappearance(this);
		this.materialDefault.setDiffuse(1,1,1,1);

		this.car = new MyCar(this);
		this.terrain = new MyTerrain(this, -1);
	};

	initCameras()
	{
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
	};

	initLights()
	{
		this.setGlobalAmbientLight(0.4,0.4,0.4, 1.0);

		this.lights[0].setVisible(true); // show marker on light position (different from enabled
		this.lights[0].setPosition(0,10,5,1);
			this.lights[0].setAmbient(0,0,0,1);
		this.lights[0].setDiffuse(1, 1, 1, 1.0);
		this.lights[0].setSpecular(1,1,1,1);
		this.lights[0].setQuadraticAttenuation(0);
		this.lights[0].setLinearAttenuation(0.1);
		this.lights[0].setConstantAttenuation(0);
		this.lights[0].enable();

		this.lights[1].setVisible(true); // show marker on light position (different from enabled
		this.lights[1].setPosition(0,10,-5,1);
			this.lights[1].setAmbient(0,0,0,1);
		this.lights[1].setDiffuse(1, 1, 1, 1.0);
		this.lights[1].setSpecular(1,1,1,1);
		this.lights[1].setQuadraticAttenuation(0);
		this.lights[1].setLinearAttenuation(0.2);
		this.lights[1].setConstantAttenuation(0);
		this.lights[1].enable();

		console.dir(this.lights);
	};

	updateLights()
	{
		for (var i = 0; i < NUM_LIGHTS; i++){
			this.lights[i].update();
			if(this.enable_lights) this.lights[i].enable();
			else this.lights[i].disable();
		}
		if(this.enable_lights) {
			if(this.enable_light_1) this.lights[0].enable();
			else this.lights[0].disable();

			if(this.enable_light_2) this.lights[1].enable();
			else this.lights[1].disable();
		}
	}


	display()
	{
		// ---- BEGIN Background, camera and axis setup

		// Clear image and depth buffer everytime we update the scene
		this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		// Initialize Model-View matrix as identity (no transformation)
		this.updateProjectionMatrix();
		this.loadIdentity();

		// Apply transformations corresponding to the camera position relative to the origin
		this.applyViewMatrix();

		// Update all lights used
		this.updateLights();

		// Draw axis
		//this.axis.display();

		this.materialDefault.apply();

		// ---- END Background, camera and axis setup

		// ---- BEGIN Scene drawing section

		this.pushMatrix();
		this.car.display();
		this.popMatrix();

		this.pushMatrix();
		this.terrain.display();
		this.popMatrix();


		// ---- END Scene drawing section
	};

	update(currTime, terrain){
		var dTime = currTime - this.lastTime;
		this.lastTime = currTime;

		if(this.gui.isKeyPressed("KeyW")){
			this.car.accelerate(dTime*this.horsepower);
		}
		if(this.gui.isKeyPressed("KeyS")){
			this.car.accelerate(-dTime*this.horsepower);
		}
		if(this.gui.isKeyPressed("KeyA")){
			this.car.updateWheelAngle(dTime);
		}
		if(this.gui.isKeyPressed("KeyD")){
			this.car.updateWheelAngle(-dTime);
		}
		this.car.update(dTime, this.terrain);
	}

	//TODO DELTE THIS
	liftCar(){
			this.car.liftCar();
	}
};
