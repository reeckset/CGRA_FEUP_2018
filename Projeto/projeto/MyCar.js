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
		this.WHEELBASE = 3;
		this.HITBOX_X = 6.5;
		this.HITBOX_Y = 0.5;
		this.HITBOX_Z = 2.5;
		this.GRAVITY = 10;

		this.TYRE_TEXTURE =  '../resources/images/tyre.jpg';
		this.WHEEL_SIDE_TEXTURE =  '../resources/images/wheel_side_2.jpg';
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
		this.wheelsRotation = Math.PI/4;
		this.RPM = 60;

		this.generateWheel();

		this.scene.pushMatrix();
			this.wheel.display();
		this.scene.popMatrix();
	}

	display(){
		this.scene.pushMatrix();
		this.scene.translate(this.x, this.y, this.z);

			//Display wheels (Arguments are X,Y,Z,willFaceZPositive,isFrontWheel)
			this.displayWheel(-this.WHEELBASE/2,this.WHEEL_RADIUS,this.WIDTH/2,false, true);
			this.displayWheel(-this.WHEELBASE/2,this.WHEEL_RADIUS,-this.WIDTH/2,true,true);
			this.displayWheel(this.WHEELBASE/2,this.WHEEL_RADIUS,this.WIDTH/2,false);
			this.displayWheel(this.WHEELBASE/2,this.WHEEL_RADIUS,-this.WIDTH/2,true);

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
				this.scene.rotate(this.frontWheelRotation, 0, 1, 0);
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
		this.wheelsRotation += dTime / 60 * 2*Math.PI * this.RPM;

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
