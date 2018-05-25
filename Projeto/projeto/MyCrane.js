/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

//The Crane will have 6 states, described below:
// State 0 - The Crane is stopped, and ready to start the full animation

// State 1 - The Crane will rotate on hingeCylinder to pick up the car
// State 2 - The Crane will rotate back on hingeCylinder to lift up the car
// State 3 - The Crane will rotate on armCylinder to rotate the car
// State 4 - The Crane will drop the car down
// State 5 - The Crane will rotate on armCylinder rotate back to starting position

class MyCrane extends CGFobject
{

	constructor(scene)
	{
		super(scene);
    this.hingeCylinder = new MyCylinder(scene, 10, 10, this.createMaterial("../resources/images/metal_bolts.jpg"), this.createMaterial("../resources/images/metal_bolts.jpg"));
    this.armCylinder = new MyCylinder(scene, 10, 10, this.createMaterial("../resources/images/metal_bolts.jpg"), this.createMaterial("../resources/images/metal_bolts.jpg"));
		this.magnetCylinder = new MyCylinder(scene, 10, 10, this.createMaterial("../resources/images/magnet.jpg"), this.createMaterial("../resources/images/magnet.jpg"));
		this.car = new MyVehicle(this.scene);
		this.topHingeAngle = Math.PI/3;
		this.craneAngle = 0;
		this.TOP_HINGE_ROTATION_SPEED = 14E-4;
		this.GRAVITY = 10E-3;
		this.state = 0; //initial state
  };

	display(){
		this.scene.pushMatrix();
			this.scene.rotate(this.craneAngle, 0, 1, 0);

    this.scene.pushMatrix();
      this.scene.translate(-5,9,0);

      this.scene.rotate(Math.PI - this.topHingeAngle, 0, 0, 1);

			this.scene.translate(0,5,0);

			this.scene.rotate(-Math.PI/2, 1, 0, 0);
			this.displayMagnet();

    this.scene.popMatrix();

    this.scene.pushMatrix();
      this.scene.translate(-5,9,0);
      this.scene.rotate(Math.PI - this.topHingeAngle, 0, 0, 1)
      this.scene.scale(0.5,-5,-0.5);
      this.scene.rotate(Math.PI/2, 1, 0, 0);
      this.armCylinder.display();
    this.scene.popMatrix();

		this.scene.pushMatrix();
      this.scene.translate(-5,9,-0.5);
      this.hingeCylinder.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
      this.scene.rotate(Math.PI/6 + Math.PI, 0, 0, 1)
      this.scene.translate(-0.3,-0.5,0);
      this.scene.scale(0.5,10,0.5);
      this.scene.rotate(Math.PI/2, 1, 0, 0);
      this.armCylinder.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
      this.scene.rotate(Math.PI/2, -1, 0, 0);
      this.hingeCylinder.display();
    this.scene.popMatrix();
		this.scene.popMatrix();
	}

  displayMagnet(){
		this.scene.pushMatrix();
    this.scene.rotate(-this.topHingeAngle, 0,1,0);
    this.scene.translate(0,0,2);

		if(this.state > 1 && this.state < 4){
			this.scene.pushMatrix();
				this.scene.translate(3, 0, 2.75);
				this.scene.rotate(-Math.PI/2, 1, 0, 0);
				this.car.frontWheelAngle = Math.PI + this.scene.car.frontWheelAngle;
				this.car.display();
			this.scene.popMatrix();
		}

		this.magnetCylinder.display();
    this.scene.translate(0,0,-2);
    this.scene.scale(0.2,0.2,2);
    this.armCylinder.display();
		this.scene.popMatrix();
  }


	update(dTime) {
		switch(this.state) {
			case 1:
				this.pickUpCar(dTime);
				break;
			case 2:
				this.liftUpCar(dTime);
				break;
			case 3:
				this.rotateCrane(dTime);
				break;
			case 4:
				this.dropCar(dTime);
				break;
			case 5:
				this.rotateToStartingPosition(dTime);
				break;
			default: // case 0
				break;
		}
	}

	pickUpCar(dTime) {
		if(this.topHingeAngle < Math.PI/6){
			this.topHingeAngle = Math.PI/6;
			this.car.carRotation = Math.PI + this.scene.car.carRotation;
			this.scene.car.enabled = false;
			this.state = 2;
		} else {
			this.topHingeAngle -= dTime * this.TOP_HINGE_ROTATION_SPEED;
		}
	}

	liftUpCar(dTime) {
		if(this.topHingeAngle > Math.PI/3){
			this.topHingeAngle = Math.PI/3;
			this.state = 3;
		} else {
			this.topHingeAngle += dTime * this.TOP_HINGE_ROTATION_SPEED;
		}
	}

	rotateCrane(dTime) {
		if(this.craneAngle > Math.PI){
			this.craneAngle = Math.PI;
			this.scene.car.y = 3;
			this.state = 4;
		} else {
			this.craneAngle += dTime * 2 * this.TOP_HINGE_ROTATION_SPEED;
		}
	}

	dropCar(dTime) {
		if(!this.scene.car.isGroundedOnTerrain){
			this.state = 5;
		} else {
			if(!this.scene.car.enabled){
				this.scene.car.x += 17;
				this.scene.car.carRotation += Math.PI;
			}
			this.scene.car.enabled = true;

		}
	}

	rotateToStartingPosition(dTime) {
		if(this.craneAngle < 0){
			this.craneAngle = 0;
			this.state = 0;
		} else {
			this.craneAngle -= dTime * 2 * this.TOP_HINGE_ROTATION_SPEED;
		}
	}

	createMaterial(texture){
		let material = new CGFappearance(this.scene);
		material.setAmbient(0.8,0.8,0.8,1);
		material.setDiffuse(1,1,1,1);
		material.setSpecular(0.4,0.4,0.4,1);
		material.setShininess(120);
		material.loadTexture(texture);
    return material;
	}
};
