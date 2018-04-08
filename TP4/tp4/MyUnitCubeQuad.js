/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyUnitCubeQuad extends CGFobject
{
	constructor(scene, minS, maxS, minT, maxT)
	{
		super(scene);

		this.quad = new MyQuad(this.scene, minS, maxS, minT, maxT);
		this.quad.initBuffers();
	};

	display(){
		this.scene.pushMatrix();
		for(var i = 0; i < 6; i++){
			this.scene.rotate(Math.PI/2, i % 2, (i+1) % 2, 0);
			this.scene.pushMatrix();
			this.scene.translate(0,0,0.5);
			this.quad.display();
			this.scene.popMatrix();
		}
		this.scene.popMatrix();
	}
};
