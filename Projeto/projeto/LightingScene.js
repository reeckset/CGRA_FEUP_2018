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
		this.drift_mode = false;
		this.show_axis = false;
		this.show_primary_solids = false;

		//Creating the default material for the scene
		this.materialDefault = new CGFappearance(this);
		this.materialDefault.setDiffuse(1,1,1,1);

		this.materialPickupZone = new CGFappearance(this);
		this.materialPickupZone.setDiffuse(1,1,1,1);
		this.materialPickupZone.setAmbient(0.7,0.7,0.7,1);
		this.materialPickupZone.setSpecular(0.4,0.4,0.4,1);
		this.materialPickupZone.setShininess(120);
		this.materialPickupZone.loadTexture("../resources/images/no_parking.jpg");


		this.vehicleAppearances = [ new VehicleAppearance(this,
																											'../resources/images/hummer_top.jpg',
																											'../resources/images/hummer_front_window.jpg',
																											'../resources/images/hummer_side_windows.png',
																											'../resources/images/hummer_side_windows_inverted.png',
																											'../resources/images/hummer_back_window.jpg',
																											'../resources/images/hummer_side_lower.png',
																											'../resources/images/hummer_side_lower_inverted.png',
																											'../resources/images/hummer_side_skirt.png',
																											'../resources/images/hummer_side_skirt_inverted.png',
																											'../resources/images/hummer_back_middle.png',
																											'../resources/images/hummer_front_radiator.jpg',
																											'../resources/images/hummer_hood.jpg',
																											'../resources/images/wheel_side.jpg'),
																new VehicleAppearance(this,
																											'../resources/images/camo/hummer_top.jpg',
																											'../resources/images/camo/hummer_front_window.jpg',
																											'../resources/images/camo/hummer_side_windows.png',
																											'../resources/images/camo/hummer_side_windows_inverted.png',
																											'../resources/images/camo/hummer_back_window.jpg',
																											'../resources/images/camo/hummer_side_lower.png',
																											'../resources/images/camo/hummer_side_lower_inverted.png',
																											'../resources/images/camo/hummer_side_skirt.png',
																											'../resources/images/camo/hummer_side_skirt_inverted.png',
																											'../resources/images/camo/hummer_back_middle.png',
																											'../resources/images/camo/hummer_front_radiator.jpg',
																											'../resources/images/camo/hummer_hood.jpg',
																											'../resources/images/camo/wheel_side.jpg')];
		this.selectedAppearance = 0;
		this.currVehicleAppearance = this.vehicleAppearances[this.selectedAppearance];
		this.car = new MyVehicle(this);
		this.terrain = new MyTerrain(this, 0,1,0,1,0);
		this.crane = new MyCrane(this);
		this.pickUpZone = new Plane(this, 8, 0,1,0,1);
		this.demo_cylinder = new MyCylinder(this, 8, 8, this.createMaterial("../resources/images/feup_logo.jpg"), this.createMaterial("../resources/images/feup_logo.jpg"));
		this.demo_trapezoid = new MyTrapezoid(this, 50, 0, this.createMaterial("../resources/images/feup_logo.jpg"),
																														this.createMaterial("../resources/images/feup_logo.jpg"),
																														this.createMaterial("../resources/images/feup_logo.jpg"),
																														this.createMaterial("../resources/images/feup_logo.jpg"),
																														this.createMaterial("../resources/images/feup_logo.jpg"));

	};

	initCameras()
	{
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(-30, 20, -30), vec3.fromValues(0, 0, 0));
	};

	initLights()
	{
		this.setGlobalAmbientLight(0.8,0.8,0.8, 1.0);

		this.lights[0].setVisible(true); // show marker on light position (different from enabled
		this.lights[0].setPosition(0,10,5,1);
			this.lights[0].setAmbient(0,0,0,1);
		this.lights[0].setDiffuse(2, 2, 2, 1);
		this.lights[0].setSpecular(1,1,1,1);
		this.lights[0].setQuadraticAttenuation(0);
		this.lights[0].setLinearAttenuation(0.1);
		this.lights[0].setConstantAttenuation(0);
		this.lights[0].enable();

		this.lights[1].setVisible(true); // show marker on light position (different from enabled
		this.lights[1].setPosition(0,10,-5,1);
			this.lights[1].setAmbient(0,0,0,1);
		this.lights[1].setDiffuse(1, 1, 1, 1);
		this.lights[1].setSpecular(1,1,1,1);
		this.lights[1].setQuadraticAttenuation(0);
		this.lights[1].setLinearAttenuation(0.2);
		this.lights[1].setConstantAttenuation(0);
		this.lights[1].enable();
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
		if(this.show_axis) this.axis.display();

		this.materialDefault.apply();

		// ---- END Background, camera and axis setup

		// ---- BEGIN Scene drawing section

		this.pushMatrix();
		this.car.display();
		this.popMatrix();

		this.pushMatrix();
		this.terrain.display();
		this.popMatrix();

		this.pushMatrix();
		this.translate(-7, 0, 15);
		this.crane.display();
		this.popMatrix();

		if(this.show_primary_solids) {
			this.pushMatrix();
				this.translate(25, 0, 25);
				this.scale(1,5,1);
				this.rotate(-Math.PI/2, 1, 0, 0);
				this.demo_cylinder.display();
			this.popMatrix();

			this.pushMatrix();
				this.translate(17, 3, 25);
				this.scale(5,5,5);
				this.demo_trapezoid.display();
			this.popMatrix();
		}

		this.pushMatrix();
		this.translate(-16, 0.01, 15);
		this.scale(5,1,4);
		this.rotate(Math.PI, 0, 1, 0);
		this.rotate(-Math.PI/2, 1,0,0);
		this.materialPickupZone.apply();
		this.pickUpZone.display();
		this.popMatrix();


		// ---- END Scene drawing section
	};

	update(currTime){
		var dTime = this.lastTime ? currTime - this.lastTime : 0;
		this.lastTime = currTime;

		if(this.gui.isKeyPressed("KeyW")){
			this.car.accelerate(dTime*this.horsepower);
		}else if(this.gui.isKeyPressed("KeyS")){
			this.car.accelerate(-dTime*this.horsepower);
		}
		if(this.gui.isKeyPressed("KeyA")){
			this.car.updateWheelAngle(dTime);
		}else if(this.gui.isKeyPressed("KeyD")){
			this.car.updateWheelAngle(-dTime);
		}else{
			this.car.stopTurningWheels();
		}
		this.car.update(dTime, this.terrain);

		this.car.DRIFT_MODE = this.drift_mode;

		this.crane.update(dTime);

		//return this.x - (this.WHEELBASE/2) * Math.abs(Math.cos(this.carRotation));

		if(this.car.x - (this.car.WHEELBASE/2) * Math.cos(this.car.carRotation) > -17
		&& this.car.x - (this.car.WHEELBASE/2) * Math.cos(this.car.carRotation) < -13
			&& this.car.getRealZ() > 14 && this.car.getRealZ() < 16){
				if(this.crane.state == 0){
					this.crane.state = 1;
				}
				this.car.speed = 0;
		}
	}

	liftCar(){
		this.car.y += 10;
	}

	createMaterial(texture){
		let material = new CGFappearance(this);
		material.setAmbient(0.8,0.8,0.8,1);
		material.setDiffuse(1,1,1,1);
		material.setSpecular(0.4,0.4,0.4,1);
		material.setShininess(120);
		material.loadTexture(texture);
    return material;
	}
};
