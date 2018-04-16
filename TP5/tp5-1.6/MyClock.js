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

  }
};
