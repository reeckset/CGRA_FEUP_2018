var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

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

		this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
		this.gl.clearDepth(100.0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.enable(this.gl.CULL_FACE);
		this.gl.depthFunc(this.gl.LEQUAL);

		this.axis = new CGFaxis(this);

		// Scene elements
		this.myPrism = new MyPrism(this, 8, 20);
		this.myCylinder = new MyCylinder(this, 8, 20);

		// Materials
		this.materialDefault = new CGFappearance(this);
		this.materialDefault.setDiffuse(1,1,1,1);

		this.materialA = new CGFappearance(this);
		this.materialA.setAmbient(0.3,0.3,0.3,1);
		this.materialA.setDiffuse(0.6,0.6,0.6,1);
		this.materialA.setSpecular(0.1,0.1,0.1,1);
		this.materialA.setShininess(120);

		this.materialB = new CGFappearance(this);
		this.materialB.setAmbient(0.3,0.3,0.3,1);
		this.materialB.setDiffuse(0.6,0.6,0.6,1);
		this.materialB.setSpecular(0.8,0.8,0.8,1);
		this.materialB.setShininess(120);

		this.materialC = new CGFappearance(this);
		this.materialC.setAmbient(0.1,0.1,0.1,1);
		this.materialC.setDiffuse(0.4,0.4,0.4,1);
		this.materialC.setSpecular(0.05,0.05,0.05,1);

		this.wallMaterial = new CGFappearance(this);
		this.wallMaterial.setAmbient(0.8,0.8,0.6,1);
		this.wallMaterial.setDiffuse(0.8,0.8,0.6,1);
		this.wallMaterial.setSpecular(0.05,0.05,0.05,1);

	};

	initCameras()
	{
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
	};

	initLights()
	{
		this.setGlobalAmbientLight(0,0,0, 1.0);

		// Positions for four lights
		this.lights[0].setPosition(4, 6, 2, 1);
		this.lights[0].setVisible(true); // show marker on light position (different from enabled

		this.lights[0].setAmbient(0.5, 0.5, 0.5, 1);
		this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[0].setSpecular(1,1,1,1);
		this.lights[0].enable();

		this.lights[1].setPosition(3, 6, 10, 1);
		this.lights[1].setAmbient(0, 0, 0, 1);
		this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[1].setVisible(true);
		this.lights[1].enable();
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
		this.axis.display();

		this.materialDefault.apply();

		// ---- END Background, camera and axis setup

		// ---- BEGIN Scene drawing section

		this.pushMatrix();
		this.materialA.apply();
		this.scale(1.5,5,1.5);
		this.rotate(Math.PI/2, 1,0,0);
			this.pushMatrix();
			this.translate(4, 0, 0);
			this.myCylinder.display();
			this.popMatrix();
		this.myPrism.display();
		this.popMatrix();
		// ---- END Scene drawing section
	};
};
