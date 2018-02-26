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
      //Plano xOy (face 1)
				-0.5, -0.5, -0.5,
        -0.5, 0.5, -0.5,
        0.5, -0.5, -0.5,
        0.5, 0.5, -0.5,
      //Plano xOy (face 2)
				-0.5, -0.5, 0.5,
        -0.5, 0.5, 0.5,
        0.5, -0.5, 0.5,
        0.5, 0.5, 0.5,
      //Plano xOz (face 1)
				-0.5, -0.5, -0.5,
        -0.5, -0.5, 0.5,
        0.5, -0.5, -0.5,
        0.5, -0.5, 0.5,
      //Plano xOz (face 2)
				-0.5, 0.5, -0.5,
        -0.5, 0.5, 0.5,
        0.5, 0.5, -0.5,
        0.5, 0.5, 0.5,
      //Plano yOz (face 1)
				-0.5, -0.5, -0.5,
        -0.5, -0.5, 0.5,
        -0.5, 0.5, -0.5,
        -0.5, 0.5, 0.5,
      //Plano yOz (face 2)
				0.5, -0.5, -0.5,
        0.5, -0.5, 0.5,
        0.5, 0.5, -0.5,
        0.5, 0.5, 0.5,
				];

		this.indices = [
				//Plano xOy (face 1)
        0, 1, 2,
        2, 1, 3
        //Plano xOy (face 2) //TODO
        0, 1, 2,
        2, 1, 3
        //Plano xOz (face 1)//TODO
        0, 1, 2,
        2, 1, 3
        //Plano xOz (face 2)//TODO
        0, 1, 2,
        2, 1, 3
        //Plano yOz (face 1)//TODO
        0, 1, 2,
        2, 1, 3
        //Plano yOz (face 2)//TODO
        0, 1, 2,
        2, 1, 3

			];

		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
