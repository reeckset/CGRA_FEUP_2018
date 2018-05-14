var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

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
		this.option1=true; this.option2=false; this.speed=3;

		//Creating the default material for the scene
		this.materialDefault = new CGFappearance(this);
		this.materialDefault.setDiffuse(1,1,1,1);

		this.car = new MyCar(this, 1);
		this.terrain = new MyTerrain(this, -1);
	};

	initCameras()
	{
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
	};

	initLights()
	{
		this.setGlobalAmbientLight(0.4,0.4,0.4, 1.0);
/*
		this.lights[0].setVisible(true); // show marker on light position (different from enabled
		this.lights[0].setPosition(0,5,0,1);
			this.lights[0].setAmbient(0,0,0,1);
		this.lights[0].setDiffuse(1, 1, 1, 10.0);
		this.lights[0].setSpecular(1,1,1,1);
		this.lights[0].setQuadraticAttenuation(0);
		this.lights[0].setLinearAttenuation(0);
		this.lights[0].setConstantAttenuation(0);
		this.lights[0].enable();*/
	};

	updateLights()
	{
		for (var i = 0; i < this.lights.length; i++)
			this.lights[i].update();
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

		this.car.update(dTime, this.terrain);
	}
};
