/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyCylinder extends CGFobject
{

	constructor(scene, slices, stacks, sideTexture, baseTexture)
	{
			super(scene);
      this.myCylinderSide = new MyCylinderSide(this.scene, slices, stacks);
      this.myCircle = new MyCircle(this.scene, slices);

			createMaterials(sideTexture, baseTexture);

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

    this.scene.popMatrix();

  }

	createTextures(sideTexture, baseTexture){
		this.materialSide = new CGFappearance(this);
		this.materialSide.setAmbient(0.3,0.3,0.3,1);
		this.materialSide.setDiffuse(0.6,0.6,0.6,1);
		this.materialSide.setSpecular(0.1,0.1,0.1,1);
		this.materialSide.setShininess(120);
		this.materialSide.loadTexture(sideTexture);

		this.materialBase = new CGFappearance(this);
		this.materialBase.setAmbient(0.3,0.3,0.3,1);
		this.materialBase.setDiffuse(0.6,0.6,0.6,1);
		this.materialBase.setSpecular(0.1,0.1,0.1,1);
		this.materialBase.setShininess(120);
		this.materialBase.loadTexture(baseTexture);
	}

	update(dTime){
		this.secondsHand.subtractAngle(Math.PI*2/(60 * 1000) * dTime);
		this.minutesHand.subtractAngle(Math.PI*2/(60 * 60 * 1000) * dTime);
		this.hoursHand.subtractAngle(Math.PI*2/(60 * 60 * 60 * 1000) * dTime);
	}
};
