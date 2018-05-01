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

		this.TYRE_TEXTURE =  '../resources/images/tyre.jpg';
		this.WHEEL_SIDE_TEXTURE =  '../resources/images/wheel_side_2.jpg';
	}

	constructor(scene)
	{
			super(scene);
			this.createConstants();
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

	update(dTime){
		this.wheelsRotation += dTime / 60000 * 2*Math.PI * this.RPM;
	}

};
