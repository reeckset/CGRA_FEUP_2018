/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MySideMirror extends MyCube
{
	constructor(scene, blackMaterial, glassMaterial)
	{
		super(scene, blackMaterial,
                blackMaterial,
                glassMaterial,
                blackMaterial,
                blackMaterial,
                blackMaterial);
	};

	display(){
		this.scene.pushMatrix();

			this.frontMaterial.apply();
			this.scene.pushMatrix();
			this.scene.translate(0,0,0.5);
			this.quad.display();
			this.scene.popMatrix();

			this.backMaterial.apply();
			this.scene.pushMatrix();
			this.scene.rotate(Math.PI, 0,1,0);
			this.scene.translate(0,0,0.5);
			this.quad.display();
			this.scene.popMatrix();

			this.rightMaterial.apply();
			this.scene.pushMatrix();
			this.scene.rotate(Math.PI/2, 0,1,0);
			this.scene.translate(0,0,0.5);
			this.quad.display();
			this.scene.popMatrix();

			this.leftMaterial.apply();
			this.scene.pushMatrix();
			this.scene.rotate(-Math.PI/2, 0,1,0);
			this.scene.translate(0,0,0.5);
			this.quad.display();
			this.scene.popMatrix();

			this.bottomMaterial.apply();
			this.scene.pushMatrix();
			this.scene.rotate(Math.PI/2, 1,0,0);
			this.scene.translate(0,0,0.5);
			this.quad.display();
			this.scene.popMatrix();

			this.topMaterial.apply();
			this.scene.pushMatrix();
			this.scene.rotate(-Math.PI/2, 1,0,0);
			this.scene.translate(0,0,0.5);
			this.quad.display();
			this.scene.popMatrix();
			this.scene.popMatrix();
	}
};
