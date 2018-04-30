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

			this.createMaterials(sideTexture, baseTexture);

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

	      this.scene.pushMatrix(); //Display cylinder side
					this.materialSide.apply();
	        this.myCylinderSide.display();
	      this.scene.popMatrix();

	      this.scene.pushMatrix(); //Display Base with null z value
					this.materialBase.apply();
	        this.scene.rotate(Math.PI,0,1,0); //rotate so it will be faced properly
	        this.myCircle.display();
	      this.scene.popMatrix();

				this.scene.translate(0,0,1); //display base with positive z value
	      this.myCircle.display();
			this.scene.popMatrix();

    this.scene.popMatrix();

  }

	createMaterials(sideTexture, baseTexture){
		this.materialSide = new CGFappearance(this.scene);
		this.materialSide.setAmbient(0.8,0.8,0.8,1);
		this.materialSide.setDiffuse(1,1,1,1);
		this.materialSide.setSpecular(0.4,0.4,0.4,1);
		this.materialSide.setShininess(120);
		this.materialSide.loadTexture(sideTexture);

		this.materialBase = new CGFappearance(this.scene);
		this.materialBase.setAmbient(0.8,0.8,0.8,1);
		this.materialBase.setDiffuse(1,1,1,1);
		this.materialBase.setSpecular(0.4,0.4,0.4,1);
		this.materialBase.setShininess(120);
		this.materialBase.loadTexture(baseTexture);
	}
};
