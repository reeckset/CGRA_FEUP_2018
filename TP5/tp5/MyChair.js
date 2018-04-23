/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyChair extends CGFobject
{

	constructor(scene)
	{
		super(scene);

		this.unitCubeQuad = new MyUnitCubeQuad(this.scene);

		this.material = new CGFappearance(this.scene);
		this.material.setAmbient(0.25,0.1,0.1,1);
		this.material.setDiffuse(0.25,0.1,0.1,1);
		this.material.setSpecular(0.25,0.1,0.1,1);
		this.material.setShininess(30);

		this.seatHorSize = 2;
		this.legSide = 0.3;
		this.legHeight = 2;
		this.seatWidth = 0.5;
	};



	display(){
			var legAbsDistance = this.seatHorSize/2 - this.legSide/2; //To align leg side with table top
			var seatHeight = this.legHeight + this.seatWidth/2;
			this.displayLeg(legAbsDistance,0,legAbsDistance);
			this.displayLeg(legAbsDistance,0,-legAbsDistance);
			this.displayLeg(-legAbsDistance,0,legAbsDistance);
			this.displayLeg(-legAbsDistance,0,-legAbsDistance);
			this.displayTop(0,this.legHeight,0);
			this.displayLeg(legAbsDistance,seatHeight,legAbsDistance);
			this.displayLeg(-legAbsDistance,seatHeight,legAbsDistance);
			this.displayBack(-legAbsDistance + this.seatHorSize/2 - this.legSide/2,seatHeight,legAbsDistance-this.legSide/2);
	}

	displayLeg(x,y,z){
		this.scene.pushMatrix();
		this.material.apply();
		this.scene.translate(x,y,z);
		this.scene.scale(this.legSide, this.legHeight, this.legSide);
		this.scene.translate(0, 0.5, 0);
		this.unitCubeQuad.display();

		this.scene.popMatrix();
	}

	displayTop(x,y,z){
		this.scene.pushMatrix();

		this.scene.translate(x,y,z);
		this.scene.scale(this.seatHorSize,this.legSide,this.seatHorSize);
		this.scene.translate(0,0.5,0);
		this.unitCubeQuad.display();

		this.scene.popMatrix();
	}

	displayBack(x,y,z){
		//Center Figure
		this.scene.pushMatrix();
		this.scene.translate(x,y,z);
		this.scene.scale(this.seatHorSize/2,this.seatHorSize/2,this.legSide);
		this.scene.rotate(Math.PI/4, 0,0,1);
		this.scene.translate(0.5,0.5,0.5);
		this.unitCubeQuad.display();
		this.scene.popMatrix();

		//TopBar
		this.scene.pushMatrix();
		this.scene.translate(x,y+Math.sqrt(2)*this.seatHorSize/2,z);
		this.scene.scale(this.seatHorSize, this.legSide, this.legSide);
		this.scene.translate(0, 0.5, 0.5);
		this.unitCubeQuad.display();
		this.scene.popMatrix();
	}
};
