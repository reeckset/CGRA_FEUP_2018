/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyCube extends CGFobject
{
	constructor(scene, topMaterial, bottomMaterial, frontMaterial, backMaterial, leftMaterial, rightMaterial)
	{
		super(scene);

		this.quad = new Plane(this.scene, 8, 0,1,0,1);
		this.quad.initBuffers();

		this.topMaterial = topMaterial;

		this.bottomMaterial = bottomMaterial;

		this.frontMaterial = frontMaterial;

		this.backMaterial = backMaterial;

		this.leftMaterial = leftMaterial;

		this.rightMaterial = rightMaterial;
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
