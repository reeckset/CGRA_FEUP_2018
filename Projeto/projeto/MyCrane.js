/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyCrane extends CGFobject
{

	constructor(scene)
	{
		super(scene);
    this.hingeCylinder = new MyCylinder(scene, 10, 10, "../resources/images/black.png", "../resources/images/black.png");
    this.armCylinder = new MyCylinder(scene, 10, 10, "../resources/images/black.png", "../resources/images/black.png");
    this.TOP_HINGE_ANGLE = Math.PI/6;
  };

	display(){

    this.scene.pushMatrix();
      this.scene.translate(-5,9,0);
      this.scene.rotate(Math.PI - this.TOP_HINGE_ANGLE, 0, 0, 1);
      this.scene.translate(0,5,0);
      this.scene.rotate(-Math.PI/2, 1, 0, 0);
      this.displayMagnet();
    this.scene.popMatrix();

    this.scene.pushMatrix();
      this.scene.translate(-5,9,0);
      this.scene.rotate(Math.PI - this.TOP_HINGE_ANGLE, 0, 0, 1)
      this.scene.scale(0.5,-5,0.5);
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
	}

  displayMagnet(){
    this.scene.rotate(-this.TOP_HINGE_ANGLE, 0,1,0);
    this.scene.translate(0,0,2);
    this.armCylinder.display();
    this.scene.translate(0,0,-2);
    this.scene.scale(0.2,0.2,2);
    this.armCylinder.display();
  }
};
