/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyClockHand extends CGFobject
{

	constructor(scene, slices, stacks)
	{
			super(scene);
      this.myCylinder = new MyCylinder(this.scene, slices, stacks);
      this.myCircle = new MyCircle(this.scene, slices);
      this.angle = 0;
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
      this.scene.rotate(this.angle,0,0,1);
      this.scene.rotate(Math.PI/2,1,0,0);
      this.scene.pushMatrix();
        this.scene.translate(0,0,-0.5);
        this.myCylinder.display();
      this.scene.popMatrix();
      this.scene.pushMatrix();
        this.scene.rotate(Math.PI,0,1,0);
        this.scene.translate(0,0,1);
        this.myCircle.display();
      this.scene.popMatrix();
      this.myCircle.display();
    this.scene.popMatrix();
  }

  setAngle(angle){
    this.angle = angle;
  }
};
