/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyUnitCube extends CGFobject
{
	constructor(scene)
	{
		super(scene);
		this.initBuffers();
	};

	initBuffers()
	{
		this.vertices = [
				-0.5, -0.5, -0.5,
				0.5, -0.5, -0.5,
				-0.5, 0.5, -0.5,
				0.5, 0.5, -0.5,
				-0.5, -0.5, 0.5,
				0.5, -0.5, 0.5,
				-0.5, 0.5, 0.5,
				0.5, 0.5, 0.5
				];

		this.indices = [
				2, 1, 0, //normal to Z-Axis
				1, 2, 3,
				4, 5, 6,
				7, 6, 5,

				1, 3, 5, //normal to X-Axis
				7, 5, 3,
				4, 2, 0,
				2, 4, 6,

				6, 3, 2, //normal to Y-Axis
				3, 6, 7,
				0, 1, 4,
				1, 5, 4
			];

		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
}
};
