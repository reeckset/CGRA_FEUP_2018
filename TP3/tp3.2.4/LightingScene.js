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
		this.table = new MyTable(this);
		this.wall = new Plane(this);
		this.floor = new MyQuad(this);
		this.chair = new MyChair(this);

		this.boardA = new Plane(this, BOARD_A_DIVISIONS);
		this.boardB = new Plane(this, BOARD_B_DIVISIONS);

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

		this.columnMaterial = new CGFappearance(this);
		this.columnMaterial.setAmbient(0.8,0.8,0.8,1);
		this.columnMaterial.setDiffuse(0.8,0.8,0.8,1);
		this.columnMaterial.setSpecular(0,0,0,1);

	};

	initCameras()
	{
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
	};

	initLights()
	{
		this.setGlobalAmbientLight(0,0,0, 1.0);

		// Positions for four lights
		this.lights[0].setPosition(10, 9, 3, 1);
		this.lights[0].setVisible(true); // show marker on light position (different from enabled

		this.lights[0].setAmbient(0.5, 0.5, 0.5, 1);
		this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[0].setSpecular(1,1,1,1);
		this.lights[0].enable();

		this.lights[1].setPosition(9, 9, 17, 1);
		this.lights[1].setAmbient(0.5, 0.5, 0.5, 1);
		this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[1].setSpecular(1,1,1,1);
		this.lights[1].setLinearAttenuation(0.15);
		this.lights[1].setConstantAttenuation(0);
		this.lights[1].setQuadraticAttenuation(0);
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

		// Floor
		this.pushMatrix();
			this.translate(7.5, 0, 7.5);
			this.rotate(-90 * degToRad, 1, 0, 0);
			this.scale(15, 15, 0.2);
			this.materialC.apply();
			this.floor.display();
		this.popMatrix();

		// Left Wall
		this.pushMatrix();
			this.translate(0, 4, 7.5);
			this.rotate(90 * degToRad, 0, 1, 0);
			this.scale(15, 8, 0.2);
			this.wallMaterial.apply();
			this.wall.display();
		this.popMatrix();

		// Plane Wall
		this.pushMatrix();
			this.translate(7.5, 4, 0);
			this.scale(15, 8, 0.2);
			this.wallMaterial.apply();
			this.wall.display();
		this.popMatrix();

		// First Table
		this.pushMatrix();
			this.translate(5, 0, 8);
			this.table.display();
		this.popMatrix();

		// Second Table
		this.pushMatrix();
			this.translate(11, 0, 8);
			this.table.display();
		this.popMatrix();

		// Board A
		this.pushMatrix();
			this.translate(4, 4.5, 0.2);
			this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);

			this.materialA.apply();
			this.boardA.display();
		this.popMatrix();

		// Board B
		this.pushMatrix();
			this.translate(10.5, 4.5, 0.2);
			this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);

			this.materialB.apply();
			this.boardB.display();
		this.popMatrix();

		// Chair A
		this.pushMatrix();
			this.translate(5, 0, 10);
			this.chair.display();
		this.popMatrix();


		// Chair B
		this.pushMatrix();
			this.translate(11, 0, 10);
			this.chair.display();
		this.popMatrix();

		this.pushMatrix();
		this.columnMaterial.apply();
		this.translate(2,0,14);
		this.scale(1,8,1);
		this.translate(0,0.5,0); //make bottom be on the floor
		this.rotate(Math.PI/2, 1,0,0);
		this.pushMatrix();
		this.translate(12, 0, 0);
		this.myCylinder.display();
		this.popMatrix();
		this.myPrism.display();
		this.popMatrix();

		// ---- END Scene drawing section
	};
};
