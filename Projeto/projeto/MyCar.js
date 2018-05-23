/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyCar extends CGFobject
{

	createConstants(){
		this.WHEEL_RADIUS = 0.4; //Radius of the car's wheels
		this.WIDTH = 2.5; //Width of the car
		this.WHEELBASE = 2.8; //Wheelbase of the car
		this.LENGTH = this.WHEELBASE + 1.2; //Length of the car
		this.RIDE_HEIGHT = 0.7;
		this.HITBOX_X = 6.5;
		this.HITBOX_Y = 1.1; //Determines the car's Y coordinate where front/side collisions will be detected
		this.HITBOX_Z = 2.5;
		this.GRAVITY = 10;
		this.THRUST = 0.00003; //How fast the car accelerates
		this.MAX_WHEEL_ANGLE = Math.PI/3; //How far the front wheels can steer
		this.STEERING_INPUT_SENSITIVITY = 0.01; //How much an "A" or "D" keys input steers the front wheels
		this.BREAKING_POWER = 0.00008; //Stregth of the car's breaking (usually faster than this.THRUST)
		this.FRICTION = 1; //How much friction there is to stop the car
		this.STEERING_SPRING = 1; //Determines how fast the front wheels fall back in place proportionally to the car's speed
		this.TURNING_SENSITIVITY = 0.01; //Determines how much the car turns
		this.MAX_SPEED = 20; //Maximum speed for the car
		this.TURNING_OVER_SPEED = 0.2; //Determines how much the wheel can turn proportionally to the car's speed
		this.DRIFT_MODE = true;
		this.loadTextures();
	}

	constructor(scene)
	{
			super(scene);
			this.createConstants();
			this.initPositionAndSpeed();
			this.generateCar();
	}

	loadTextures(){
		this.TYRE_TEXTURE =  '../resources/images/tyre.jpg';
		this.WHEEL_SIDE_TEXTURE =  '../resources/images/wheel_side_2.jpg';
		this.SIDE_WINDOWS_TEXTURE = '../resources/images/hummer_side_windows.png';
		this.SIDE_WINDOWS_INVERTED_TEXTURE = '../resources/images/hummer_side_windows_inverted.png';
		this.SIDE_LOWER_TEXTURE = '../resources/images/hummer_side_lower.png';
		this.SIDE_LOWER_INVERTED_TEXTURE = '../resources/images/hummer_side_lower_inverted.png';
		this.SIDE_SKIRT_TEXTURE = '../resources/images/hummer_side_skirt.png';
		this.SIDE_SKIRT_INVERTED_TEXTURE = '../resources/images/hummer_side_skirt_inverted.png';
		this.BACK_MIDDLE_TEXTURE = '../resources/images/hummer_back_middle.png';
		this.TOP_TEXTURE =  '../resources/images/hummer_top.jpg';
		this.BACK_WINDOW_TEXTURE = '../resources/images/hummer_back_window.jpg';
		this.HOOD_TEXTURE = '../resources/images/hummer_hood.jpg';
		this.RADIATOR_TEXTURE = '../resources/images/hummer_front_radiator.jpg';
		this.UNDERSIDE_TEXTURE = '../resources/images/hummer_underside.jpg';
		this.FRONT_BUMPER_TEXTURE = '../resources/images/hummer_front_bumper.jpg';
		this.REAR_BUMPER_TEXTURE = '../resources/images/hummer_rear_bumper.jpg';
		this.FRONT_WINDOW_TEXTURE = '../resources/images/hummer_front_window.jpg';
		this.HEADLIGHT_TEXTURE = '../resources/images/headlight.jpg';

		this.EMPTY_TEXTURE = '../resources/images/black.png';
	}

	generateCar(){
		this.speed = 0;
		this.carRotation = Math.PI;
		this.frontWheelAngle = 0;
		this.wheelsRotation = 0;
		this.wheelSpeed = 60;
		this.isTurningWheels = false;
		this.xAngle = 0;
		this.zAngle = 0;

		this.topTrapezoid = new MyTrapezoid(this.scene, 13, 35,
					this.TOP_TEXTURE, this.EMPTY_TEXTURE, this.SIDE_WINDOWS_TEXTURE, this.SIDE_WINDOWS_INVERTED_TEXTURE, this.FRONT_WINDOW_TEXTURE, this.BACK_WINDOW_TEXTURE);
		this.base = new MyUnitCubeQuad(this.scene,
					this.HOOD_TEXTURE, this.EMPTY_TEXTURE, this.SIDE_LOWER_TEXTURE, this.SIDE_LOWER_INVERTED_TEXTURE, this.RADIATOR_TEXTURE, this.BACK_MIDDLE_TEXTURE);
		this.sideSkirtLeft = new MyTrapezoid(this.scene, 22, -30,
					this.EMPTY_TEXTURE, this.EMPTY_TEXTURE, this.SIDE_SKIRT_TEXTURE, this.EMPTY_TEXTURE, this.EMPTY_TEXTURE, this.EMPTY_TEXTURE);
		this.sideSkirtRight = new MyTrapezoid(this.scene, 22, -30,
					this.EMPTY_TEXTURE, this.EMPTY_TEXTURE, this.EMPTY_TEXTURE, this.SIDE_SKIRT_INVERTED_TEXTURE, this.EMPTY_TEXTURE, this.EMPTY_TEXTURE);
		this.bottomTrapezoid = new MyTrapezoid(this.scene, 6, 0,
					this.UNDERSIDE_TEXTURE, this.EMPTY_TEXTURE, this.EMPTY_TEXTURE, this.EMPTY_TEXTURE, this.REAR_BUMPER_TEXTURE, this.FRONT_BUMPER_TEXTURE);
		this.axel = new MyCylinder(this.scene, 6, 6, this.EMPTY_TEXTURE, this.EMPTY_TEXTURE);
		this.headLight = new MySemiSphere(this.scene, 10, 10, this.HEADLIGHT_TEXTURE);
		this.mirror = new MySideMirror(this.scene);
		this.createHeadlightMaterial();
		this.generateWheel();
	}

	display(){
		this.scene.pushMatrix();
		this.scene.translate(this.x - this.WHEELBASE, this.y, this.z);
		if(!this.DRIFT_MODE) this.scene.translate(this.WHEELBASE/2, 0, 0);
		else this.scene.translate(-this.speed / 4, 0, 0);
		this.scene.rotate(this.carRotation, 0, 1, 0);
		if(!this.DRIFT_MODE) this.scene.translate(-this.WHEELBASE/2, 0, 0);
		else this.scene.translate(this.speed / 4, 0, 0);

		this.scene.rotate(this.xAngle, 1, 0, 0);
		this.scene.rotate(this.zAngle, 0, 0, 1);

			//Display wheels (Arguments are X,Y,Z,willFaceZPositive,isFrontWheel)
			this.displayWheel(-this.WHEELBASE/2,this.WHEEL_RADIUS,this.WIDTH/2,false, true);
			this.displayWheel(-this.WHEELBASE/2,this.WHEEL_RADIUS,-this.WIDTH/2,true,true);
			this.displayWheel(this.WHEELBASE/2,this.WHEEL_RADIUS,this.WIDTH/2,false);
			this.displayWheel(this.WHEELBASE/2,this.WHEEL_RADIUS,-this.WIDTH/2,true);

			this.displayAxels();

			this.displayTopTrapezoid();
			this.displayBottomTrapezoid();
			this.displayBase();
			this.displaySideSkirts();
			this.displayHeadlights();

			this.displayMirrors();

		this.scene.popMatrix();
	}

	generateWheel(){
		this.wheel = new MyCylinder(this.scene, 20, 8,
			this.TYRE_TEXTURE, this.WHEEL_SIDE_TEXTURE);
	}

	displayWheel(x,y,z,willFaceZPositive, isFrontWheel){
		this.scene.pushMatrix();
			this.scene.translate(x,y,z);
			this.scene.scale(this.WHEEL_RADIUS,this.WHEEL_RADIUS,this.WHEEL_RADIUS);
			if(!willFaceZPositive){
				this.scene.rotate(Math.PI, 0,1,0);
			}

			//Center front wheel and turn it
			if(isFrontWheel){
				this.scene.translate(0,0,0.5);
				this.scene.rotate(this.frontWheelAngle, 0, 1, 0);
				this.scene.translate(0,0,-0.5);
			}

			//Rotate wheels
			this.scene.rotate(willFaceZPositive ? this.wheelsRotation : -this.wheelsRotation, 0, 0, 1);
			this.wheel.display();
		this.scene.popMatrix();
	}

	update(dTime, terrain){
		//put dTime in seconds
		dTime /= 1000;

		if(this.speed > this.MAX_SPEED) this.speed = this.MAX_SPEED;

		this.wheelsRotation += dTime * 2*Math.PI * this.wheelSpeed;
		if(Math.abs(this.speed) >= 0.1) this.speed -= this.FRICTION*(this.speed/Math.abs(this.speed))*dTime;
		else this.speed = 0;

		if(!this.isTurningWheels){
		 	if(Math.abs(this.frontWheelAngle) >= 0.1){
				let newFrontWheelAngle = this.frontWheelAngle - this.STEERING_SPRING*this.frontWheelAngle/Math.abs(this.frontWheelAngle)*dTime*Math.abs(this.speed);
				if(this.frontWheelAngle *newFrontWheelAngle <= 0) this.frontWheelAngle = 0;
				else this.frontWheelAngle = newFrontWheelAngle;
			}
			else this.frontWheelAngle = 0;
		}

		this.carRotation += this.speed*this.frontWheelAngle*this.TURNING_SENSITIVITY;

		this.vx = -this.speed*Math.cos(this.carRotation);
		this.vz = this.speed*Math.sin(this.carRotation);

		this.x += this.vx * dTime;
		this.y += this.vy * dTime;
		this.z += this.vz * dTime;

		/*if(!this.isGroundedOnTerrain(terrain)){
			this.vy -= this.GRAVITY * dTime;
		}*/
		//this.y = 0;
		this.handleTerrainCollision(terrain);

		this.wheelSpeed = this.speed/(2*Math.PI*this.WHEEL_RADIUS);
	}

	initPositionAndSpeed(){
		this.x = 0;
		this.y = 0;
		this.z = 0;
		this.vx = 0;
		this.vy = 0;
		this.vz = 0;
	}

	isGroundedOnTerrain(terrain){
		var distanceToCurrentPosition = Infinity;
		var nextY;
		var nextX;
		for(var z = 0; z < terrain.matrix.length; z++){
			for(var x = 0; x < terrain.matrix.length; x++){
				let realX = x*terrain.CELL_SIZE-terrain.SIZE/2;
				let realZ = z*terrain.CELL_SIZE-terrain.SIZE/2;
				let currDistance = ((realX-this.x)*(realX-this.x)+(realZ*this.z)*(realZ*this.z));
				if(currDistance < distanceToCurrentPosition){
					distanceToCurrentPosition = currDistance;
					nextY = terrain.matrix[z][x];
					nextX = realX;
				}
			}
		}
		if(nextY > this.y){
			this.y = nextY;
			return true;
		}
		return false;
	}

	displayTopTrapezoid(){

		this.scene.pushMatrix();
			this.scene.translate((this.LENGTH-3)/2, this.RIDE_HEIGHT+0.8, 0);
			this.scene.scale(3, 0.5, this.WIDTH);
			this.topTrapezoid.display();
		this.scene.popMatrix();
	}

	displayBottomTrapezoid(){

		this.scene.pushMatrix();
			this.scene.translate(0, this.RIDE_HEIGHT-0.05, 0);
			this.scene.scale(-this.LENGTH, -0.4, this.WIDTH - 2*this.WHEEL_RADIUS - 0.1);
			this.bottomTrapezoid.display();
		this.scene.popMatrix();
	}

	displayBase(){
		this.scene.pushMatrix();
			this.scene.translate(0,this.RIDE_HEIGHT+0.35,0);
			this.scene.scale(this.LENGTH, 0.4, this.WIDTH);
			this.base.display();
		this.scene.popMatrix();
	}

	displaySideSkirts(){
		this.scene.pushMatrix();
			this.scene.translate(-0.072,this.RIDE_HEIGHT,this.WIDTH/2 - 0.05);
			this.scene.scale(-2.25, -0.3, 0.1);
			this.sideSkirtLeft.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-0.072,this.RIDE_HEIGHT,-(this.WIDTH/2 - 0.05));
			this.scene.scale(-2.25, -0.3, 0.1);
			this.sideSkirtRight.display();
		this.scene.popMatrix();
	}

	displayAxels(){
		this.scene.pushMatrix();
			this.scene.translate(-this.WHEELBASE/2,this.WHEEL_RADIUS,-this.WIDTH/2);
			this.scene.scale(0.05,0.05,this.WIDTH - 0.2);
			this.axel.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(this.WHEELBASE/2,this.WHEEL_RADIUS,-this.WIDTH/2);
			this.scene.scale(0.05,0.05,this.WIDTH - 0.2);
			this.axel.display();
		this.scene.popMatrix();
	}

	displayHeadlights(){
		this.scene.pushMatrix();
			this.headLightMaterial.apply();
			this.scene.translate(-this.LENGTH/2,this.RIDE_HEIGHT + 0.35,0.75);
			this.scene.rotate(Math.PI/2,0,0,1);
			this.scene.scale(0.15,0.07,0.15);
			this.headLight.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.headLightMaterial.apply();
			this.scene.translate(-this.LENGTH/2,this.RIDE_HEIGHT + 0.35,-0.75);
			this.scene.rotate(Math.PI/2,0,0,1);
			this.scene.scale(0.15,0.07,0.15);
			this.headLight.display();
		this.scene.popMatrix();
	}

	displayMirrors(){
		this.scene.pushMatrix();
			this.scene.translate(-this.WHEELBASE/2 + 0.45,this.RIDE_HEIGHT + 0.5,this.WIDTH/2 + 0.1);
			this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.scene.scale(0.2,0.3,0.1);
			this.mirror.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.scale(1, 1, -1);
			this.scene.translate(-this.WHEELBASE/2 + 0.45,this.RIDE_HEIGHT + 0.5,this.WIDTH/2 + 0.1);
			this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.scene.scale(0.2,-0.3,0.1);
			this.mirror.display();
		this.scene.popMatrix();
	}

	createHeadlightMaterial(){
		this.headLightMaterial = new CGFappearance(this.scene);
		this.headLightMaterial.setAmbient(0.8,0.8,0.8,1);
		this.headLightMaterial.setDiffuse(1,1,1,1);
		this.headLightMaterial.setSpecular(0.4,0.4,0.4,1);
		this.headLightMaterial.setShininess(120);
		this.headLightMaterial.loadTexture(this.HEADLIGHT_TEXTURE);
	}

	accelerate(amount){
		if(amount*this.speed < 0){
			this.speed+=amount*this.BREAKING_POWER;
		}else{
			this.speed+=amount*this.THRUST;
		}
	}

	updateWheelAngle(amount){
		this.isTurningWheels = true;
		this.frontWheelAngle=Math.max(Math.min(this.frontWheelAngle+amount*this.STEERING_INPUT_SENSITIVITY, this.getMaxWheelAngle()), -this.getMaxWheelAngle());
	}

	stopTurningWheels(){
		this.isTurningWheels = false;
	}

	getMaxWheelAngle(){
		return Math.max(Math.min(this.MAX_WHEEL_ANGLE / (this.TURNING_OVER_SPEED*Math.abs(this.speed)) || this.MAX_WHEEL_ANGLE, this.MAX_WHEEL_ANGLE), 0);
	}

	getTerrainHeightInCoords(terrain, x,z){
		let matrixX = (x+terrain.SIZE/2)/terrain.SIZE*(terrain.matrix.length-1);
	 	let matrixZ = (z+terrain.SIZE/2)/terrain.SIZE*(terrain.matrix.length-1);

		let matrixXlower = Math.floor(matrixX);
		let matrixXhigher = Math.ceil(matrixX);
		let matrixZlower = Math.floor(matrixZ);
		let matrixZhigher = Math.ceil(matrixZ);

		let matrixXPercent = (matrixX-matrixXlower)/(matrixXhigher - matrixXlower);
		let matrixZPercent = (matrixZ-matrixZlower)/(matrixZhigher - matrixZlower)

		let heightXlZl = terrain.matrix[matrixZlower][matrixXlower];
		let heightXlZh = terrain.matrix[matrixZhigher][matrixXlower];
		let heightXhZl = terrain.matrix[matrixZlower][matrixXhigher];
		let heightXhZh = terrain.matrix[matrixZhigher][matrixXhigher];

		if(matrixZPercent + matrixXPercent <  1){ //TRIANGLE FACED TO NEGATIVE X AND Z
			var vector1 = [0, heightXlZh - heightXlZl, 1];
			var vector2 = [1, heightXhZl - heightXlZl, 0];
			var normal = this.cross(vector1, vector2);
			let d = - (normal[0]*1 + normal[1]*heightXhZl);
			var getPlaneY = function(x,z){ return - (normal[0]*x + normal[2]*z + d)/normal[1]};
			return getPlaneY(matrixXPercent, matrixZPercent);
		}else{ //TRIANGLE FACED TO POSITIVE X AND Z
			var vector1 = [0, heightXhZh - heightXhZl, 1];
			var vector2 = [1, heightXhZh - heightXlZh, 0];
			var normal = this.cross(vector1, vector2);
			let d = - (normal[0]*1 + normal[1]*heightXhZl + normal[2]*0);
			var getPlaneY = function(x,z){ return - (normal[0]*x + normal[2]*z + d)/normal[1]};
			return getPlaneY(matrixXPercent, matrixZPercent);
		}
	}

	handleTerrainCollision(terrain){
		this.y = this.getTerrainHeightInCoords(terrain, this.getRealX(), this.getRealZ());
		this.calcZAngle(terrain);
		this.calcXAngle(terrain);
	}

	calcXAngle(terrain){
			let vector1 = [Math.cos(this.carRotation) * (this.WHEELBASE/2), Math.sin(this.carRotation) * (this.WHEELBASE/2)];
			let vector2 = [Math.sin(this.carRotation) * (this.WIDTH/2), Math.cos(this.carRotation) * (this.WIDTH/2)];

			let rightBackWheelX = this.getRealX() + vector1[0] - vector2[0];
			let rightBackWheelZ = this.getRealZ() + vector1[1] - vector2[1];

			let leftBackWheelX = this.getRealX() + vector1[0] + vector2[0];
			let leftBackWheelZ = this.getRealZ() + vector1[1] + vector2[1];

			let rightBackWheelY = this.getTerrainHeightInCoords(terrain, rightBackWheelX, rightBackWheelZ);
			let leftBackWheelY = this.getTerrainHeightInCoords(terrain, leftBackWheelX, leftBackWheelZ);

			let horizontalDistanceBackWheels = Math.sqrt(Math.pow(rightBackWheelX - leftBackWheelX, 2)
																									+Math.pow(rightBackWheelZ - leftBackWheelZ, 2));

			this.xAngle = Math.atan((rightBackWheelY - leftBackWheelY)/horizontalDistanceBackWheels);
	}

	calcZAngle(terrain){

		let vector1 = [Math.cos(this.carRotation) * (this.WHEELBASE/2), -Math.sin(this.carRotation) * (this.WHEELBASE/2)];
		let vector2 = [Math.cos(this.carRotation) * (this.WIDTH/2), Math.sin(-this.carRotation) * (this.WIDTH/2)];

		let rightBackWheelX = this.getRealX() + vector1[0] - vector2[0];
		let rightBackWheelZ = this.getRealZ() + vector1[1] - vector2[1];

		let rightBackWheelY = this.getTerrainHeightInCoords(terrain, rightBackWheelX, rightBackWheelZ);

		let rightFrontWheelX = this.getRealX() - vector1[0] - vector2[0];
		let rightFrontWheelZ = this.getRealZ() - vector1[1] - vector2[1];

		let rightFrontWheelY = this.getTerrainHeightInCoords(terrain, rightFrontWheelX, rightFrontWheelZ);

		let horizontalDistanceRightWheels = Math.sqrt(Math.pow(rightBackWheelX - rightFrontWheelX, 2)
																								+Math.pow(rightBackWheelZ - rightFrontWheelZ, 2));

		this.zAngle = -Math.atan((rightFrontWheelY - rightBackWheelY) / horizontalDistanceRightWheels);
	}

	getRealX(){
		return this.x - (this.WHEELBASE/2) * Math.abs(Math.cos(this.carRotation));
	}

	getRealZ(){
		return	this.z + (this.WHEELBASE/2) * Math.sin(this.carRotation);
	}

	cross(vector1, vector2){
		return [vector1[1] * vector2[2] - vector1[2] * vector2[1], vector1[2] * vector2[0] - vector1[0] * vector2[2], vector1[0] * vector2[1] - vector1[1] * vector2[0]]
	}

};
