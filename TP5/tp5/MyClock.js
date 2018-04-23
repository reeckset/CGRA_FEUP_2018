/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyClock extends CGFobject
{

	constructor(scene, slices, stacks, texture)
	{
			super(scene);
      this.myCylinder = new MyCylinder(this.scene, slices, stacks);
      this.myCircle = new MyCircle(this.scene, slices);
      this.clockFaceMaterial = new CGFappearance(this.scene);
  		this.clockFaceMaterial.setAmbient(0.8,0.8,0.6,1);
  		this.clockFaceMaterial.setDiffuse(0.8,0.8,0.6,1);
  		this.clockFaceMaterial.setSpecular(0.05,0.05,0.05,1);
  		this.clockFaceMaterial.loadTexture(texture);

			this.clockHandMaterial = new CGFappearance(this.scene);
			this.clockHandMaterial.setAmbient(0.8,0.8,0.6,1);
  		this.clockHandMaterial.setDiffuse(0.8,0.8,0.6,1);
  		this.clockHandMaterial.setSpecular(0.05,0.05,0.05,1);
  		this.clockHandMaterial.loadTexture('../resources/images/table.png');

			this.secondsHand = new MyClockHand(this.scene, 12, 1, 0.4);
			this.minutesHand = new MyClockHand(this.scene, 12, 1, 0.3);
			this.hoursHand = new MyClockHand(this.scene, 12, 1, 0.2);
			this.initBuffers();
	}
		initBuffers(){

    this.vertices = [];

    this.indices = [];

    this.primitiveType=this.scene.gl.TRIANGLES;

    this.normals = [];
    this.texCoords = [];

		this.initGLBuffers();
	}

	display(){

    this.scene.pushMatrix();

			this.scene.pushMatrix();
				this.scene.scale(0.5,0.5,0.1);

	      this.scene.pushMatrix();
	        this.scene.translate(0,0,-0.5);
	        this.myCylinder.display();
	      this.scene.popMatrix();

	      this.scene.pushMatrix();
	        this.scene.rotate(Math.PI,0,1,0);
	        this.scene.translate(0,0,1);
	        this.myCircle.display();
	      this.scene.popMatrix();


				this.clockFaceMaterial.apply();
	      this.myCircle.display();
			this.scene.popMatrix();

			this.clockHandMaterial.apply();

			this.scene.pushMatrix();
			this.scene.translate(0,0,0.01);
			this.secondsHand.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();
			this.scene.translate(0,0,0.025);
			this.minutesHand.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();
			this.scene.translate(0,0,0.04);
			this.hoursHand.display();
			this.scene.popMatrix();
    this.scene.popMatrix();

  }

	update(dTime){
		this.secondsHand.subtractAngle(Math.PI*2/(60 * 1000) * dTime);
		this.minutesHand.subtractAngle(Math.PI*2/(60 * 60 * 1000) * dTime);
		this.hoursHand.subtractAngle(Math.PI*2/(60 * 60 * 60 * 1000) * dTime);
	}
};
