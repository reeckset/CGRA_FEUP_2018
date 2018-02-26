/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyFloor extends CGFobject
{

	constructor(scene)
	{
		super(scene);

		this.unitCubeQuad = new MyUnitCubeQuad(this.scene);
	};



	display(){
			this.scene.pushMatrix();

			this.scene.scale(8,0.1,6);
			this.scene.translate(0,0.5,0);
			this.unitCubeQuad.display();

			this.scene.popMatrix();
	}
};
