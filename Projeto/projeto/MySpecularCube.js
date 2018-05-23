/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MySpecularCube extends CGFobject
{
	constructor(scene, textureTop, textureBottom, textureFront, textureBack, textureLeft, textureRight)
	{
		super(scene);

		this.quad = new Plane(this.scene, 8, 0,1,0,1);
		this.createMaterials(textureTop, textureBottom, textureFront, textureBack, textureLeft, textureRight);
		this.quad.initBuffers();
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

	createMaterials(textureTop, textureBottom, textureFront, textureBack, textureLeft, textureRight){
		this.topMaterial = this.newDefaultMaterial();
		this.topMaterial.loadTexture(textureTop);

		this.bottomMaterial = this.newDefaultMaterial();
		this.bottomMaterial.loadTexture(textureBottom);

		this.frontMaterial = this.newDefaultMaterial();
		this.frontMaterial.loadTexture(textureFront);

		this.backMaterial = this.newDefaultMaterial();
		this.backMaterial.loadTexture(textureBack);

		this.leftMaterial = this.newDefaultMaterial();
		this.leftMaterial.loadTexture(textureLeft);

		this.rightMaterial = this.newDefaultMaterial();
		this.rightMaterial.loadTexture(textureRight);
	}

	newDefaultMaterial(){
		let material = new CGFappearance(this.scene);
		material.setAmbient(0.3,0.3,0.3,1);
		material.setDiffuse(0.3,0.3,0.3,1);
		material.setSpecular(1,1,1,1);
		material.setShininess(50);
		return material
	}
};
