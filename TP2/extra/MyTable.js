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

		this.materialTampoMesa = new CGFappearance(this.scene);
		this.materialTampoMesa.setAmbient(0.25,0.1,0.1,1);
		this.materialTampoMesa.setDiffuse(0.25,0.1,0.1,1);
		this.materialTampoMesa.setSpecular(0.25,0.1,0.1,1);
		this.materialTampoMesa.setShininess(30);

		this.materialPerna = new CGFappearance(this.scene);
		this.materialPerna.setAmbient(0.8,0.8,0.8,1);
		this.materialPerna.setDiffuse(0.8,0.8,0.8,1);
		this.materialPerna.setSpecular(0.8,0.8,0.8,1);
		this.materialPerna.setShininess(120);

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
		this.materialPerna.apply();
		this.unitCubeQuad.display();

		this.scene.popMatrix();
	}

	displayTop(x,y,z){
		this.scene.pushMatrix();

		this.scene.translate(x,y,z);
		this.scene.scale(5,0.3,3);
		this.scene.translate(0,0.5,0);
		this.materialTampoMesa.apply();
		this.unitCubeQuad.display();

		this.scene.popMatrix();
	}
};
