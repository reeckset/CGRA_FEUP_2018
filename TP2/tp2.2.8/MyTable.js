/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyTable extends CGFobject
{

	constructor(scene)
	{
		super(scene);

		this.unitCubeQuad = new MyUnitCubeQuad(this.scene);

		this.tableSizeX = 5;
		this.tableSizeZ = 3;
		this.legSide = 0.3;
	};



	display(){
			var legAbsoluteX = this.tableSizeX/2 - this.legSide/2; //To align leg side with table top
			var legAbsoluteZ = this.tableSizeZ/2 - this.legSide/2;

			this.displayLeg(legAbsoluteX,0,legAbsoluteZ);
			this.displayLeg(legAbsoluteX,0,-legAbsoluteZ);
			this.displayLeg(-legAbsoluteX,0,legAbsoluteZ);
			this.displayLeg(-legAbsoluteX,0,-legAbsoluteZ);
			this.displayTop(0,3.5,0);
	}

	displayLeg(x,y,z){
		this.scene.pushMatrix();

		this.scene.translate(x,y,z);
		this.scene.scale(0.3, 3.5, 0.3);
		this.scene.translate(0, 0.5, 0);
		this.unitCubeQuad.display();

		this.scene.popMatrix();
	}

	displayTop(x,y,z){
		this.scene.pushMatrix();

		this.scene.translate(x,y,z);
		this.scene.scale(5,0.3,3);
		this.scene.translate(0,0.5,0);
		this.unitCubeQuad.display();

		this.scene.popMatrix();
	}
};
