/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyCar extends CGFobject
{

	createConstants(){
		this.WHEEL_RADIUS = 0.4;
		this.WIDTH = 2.5;
		this.WHEELBASE = 2.8;
		this.LENGTH = this.WHEELBASE + 1.2;
		this.RIDE_HEIGHT = 0.7;
		this.HITBOX_X = 6.5;
		this.HITBOX_Y = 0.5;
		this.HITBOX_Z = 2.5;
		this.GRAVITY = 10;

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

	constructor(scene)
	{
			super(scene);
			car = this;
			this.createConstants();
			this.initPositionAndSpeed();
			this.generateCar();
	}

	generateCar(){
		this.frontWheelRotation = Math.PI/4;
		this.wheelsRotation = 0;
		this.wheelSpeed = 60;
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
		this.createHeadlightMaterial();
		this.generateWheel();
	}

	display(){
		this.scene.pushMatrix();
		this.scene.translate(this.x, this.y, this.z);
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
				this.scene.translate(0,0,1);
				this.scene.rotate(this.frontWheelRotation, 0, 1, 0);
				this.scene.translate(0,0,-1);
			}

			//Rotate wheels
			this.scene.rotate(willFaceZPositive ? this.wheelsRotation : -this.wheelsRotation, 0, 0, 1);
			this.wheel.display();
		this.scene.popMatrix();
	}

	update(dTime, terrain){
		//put dTime in seconds
		dTime /= 1000;
		this.wheelsRotation += dTime * 2*Math.PI * this.wheelSpeed;

		this.x += this.vx * dTime;
		this.y += this.vy * dTime;
		this.z += this.vz * dTime;

		if(!this.isGroundedOnTerrain(terrain)){
			this.vy -= this.GRAVITY * dTime;
		}else{
			this.vy = 0;
		}

		if(this.isCollidingWithTerrain(terrain)){
			this.vx = 0;
			this.vz = 0;
			console.log("Collided");
		}

		this.carSpeed = Math.sqrt(this.vx*this.vx+this.vz*this.vz);
		this.wheelSpeed = this.carSpeed/(2*Math.PI*this.WHEEL_RADIUS);

	}

	initPositionAndSpeed(){
		this.x = 0;
		this.y = 0;
		this.z = 0;
		this.vx = 0;
		this.vy = 0;
		this.vz = 0;
	}

	isCollidingWithTerrain(terrain){
		for(var z = 0; z < terrain.matrix.length; z++){
			for(var x = 0; x < terrain.matrix.length; x++){ //CHECK IF THERE IS A POINT OF THE TERRAIN WITHING THE HITBOX
				let realX = x*terrain.CELL_SIZE-terrain.SIZE/2;
				let realZ = z*terrain.CELL_SIZE-terrain.SIZE/2;

				if(terrain.matrix[z][x] > this.y + this.HITBOX_Y){
					if(realX < this.x + this.HITBOX_X/2 && realX > this.x){
						this.x = realX - this.HITBOX_X/2;
						return true;
					}
					if(realX < this.x && realX > this.x - this.HITBOX_X/2){
						this.x = realX + this.HITBOX_X/2;
						return true;
					}
					if(realZ < this.z + this.HITBOX_Z/2 && realZ > this.z){
						this.z = realZ - this.HITBOX_Z/2;
						return true;
					}
					if(realZ < this.z && realZ > this.z - this.HITBOX_Z/2){
						this.z = realZ + this.HITBOX_Z/2;
						return true;
					}
				}
			}
		}
		return false;
	}

	isGroundedOnTerrain(terrain){
		for(var z = 0; z < terrain.matrix.length; z++){
			for(var x = 0; x < terrain.matrix.length; x++){
				let realX = x*terrain.CELL_SIZE-terrain.SIZE/2;
				let realZ = z*terrain.CELL_SIZE-terrain.SIZE/2;
				if((realX < this.x + this.HITBOX_X/4 && realX > this.x - this.HITBOX_X/4)
					&& (realZ < this.z + this.HITBOX_Z/4 && realZ > this.z - this.HITBOX_Z/4)
					&& (terrain.matrix[z][x] > this.y)){
						this.y = terrain.matrix[z][x]; //will place the car on top of the terrain
						return true;
					}
			}
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
			this.scene.translate(0, this.RIDE_HEIGHT, 0);
			this.scene.scale(-this.LENGTH, -0.3, this.WIDTH - 2*this.WHEEL_RADIUS - 0.1);
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

	createHeadlightMaterial(){
		this.headLightMaterial = new CGFappearance(this.scene);
		this.headLightMaterial.setAmbient(0.8,0.8,0.8,1);
		this.headLightMaterial.setDiffuse(1,1,1,1);
		this.headLightMaterial.setSpecular(0.4,0.4,0.4,1);
		this.headLightMaterial.setShininess(120);
		this.headLightMaterial.loadTexture(this.HEADLIGHT_TEXTURE);
	}


};

//TODO DELETE THIS
var car;
function liftCar(){
	car.y = 10;
}

function thrustForward(){
	car.vx = -1;
}

function setPos(){
	car.x = 5;
}
