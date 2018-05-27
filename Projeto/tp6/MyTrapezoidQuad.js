/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyTrapezoidQuad extends CGFobject
{
	constructor(scene, alpha, beta)
	{
		super(scene);
    this.alpha = alpha;
    this.beta = beta;

    this.height = 1;

    this.leftWidth = (alpha == Math.PI / 2) ? 0 : (this.height / Math.tan(alpha));
    this.rightWidth = (beta == Math.PI / 2) ? 0 : (this.height / Math.tan(beta));
    this.width = 1;


		this.initBuffers();
	};

	initBuffers()
	{

		this.vertices = [
				-this.width/2, -0.5, 0,
				-this.width / 2 + this.leftWidth, 0.5, 0,
				this.width / 2 - this.rightWidth, 0.5, 0,
				this.width/2, -0.5 , 0
				];

		this.indices = [
				0, 2, 1,
				0, 3, 2
			];

		this.primitiveType=this.scene.gl.TRIANGLES;

		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1
		];

		this.texCoords = [
			0, 1,
			this.leftWidth, 0,
			1 - this.rightWidth, 0,
			1, 1
		];

		this.initGLBuffers();

	};

};
