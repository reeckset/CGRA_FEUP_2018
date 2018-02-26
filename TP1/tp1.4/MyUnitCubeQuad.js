/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyUnitCubeQuad extends CGFobject
{
	constructor(scene)
	{
		super(scene);

		this.quad = new MyQuad(this.scene);
		this.quad.initBuffers();
	};

	display(){
		//Could have this.scene.pushMatrix() (and then pop after the for loop)
		//but the final matrix happens to be the same as the initial one,
		//so we chose not to do it for efficiency
		for(var i = 0; i < 6; i++){
			this.scene.rotate(Math.PI/2, i % 2, (i+1) % 2, 0);
			this.scene.pushMatrix();
			this.scene.translate(0,0,0.5);
			this.quad.display();
			this.scene.popMatrix();
		}
	}
};
