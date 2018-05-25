class VehicleAppearance{

  constructor(scene, roofTexture, frontWindowTexture, leftWindowTexture, rightWindowTexture, backWindowTexture, leftDoorTexture, rightDoorTexture, leftSkirt, rightSkirt, lowerBackTexture, frontGrillTexture,  hoodTexture,  wheelTexture){
    this.scene = scene;
    this.roof = this.createMaterial(roofTexture);
    this.frontWindow = this.createMaterial(frontWindowTexture);
    this.leftWindow = this.createMaterial(leftWindowTexture);
    this.rightWindow = this.createMaterial(rightWindowTexture);
    this.backWindow = this.createMaterial(backWindowTexture);
    this.leftDoor = this.createMaterial(leftDoorTexture);
    this.rightDoor = this.createMaterial(rightDoorTexture);
    this.leftSkirt = this.createMaterial(leftSkirt);
    this.rightSkirt = this.createMaterial(rightSkirt);
    this.lowerBack = this.createMaterial(lowerBackTexture);
    this.frontGrill = this.createMaterial(frontGrillTexture);
    this.hood = this.createMaterial(hoodTexture);
    this.wheel = this.createMaterial(wheelTexture);
  }

  createMaterial(texture){
		let material = new CGFappearance(this.scene);
		material.setAmbient(0.3,0.3,0.3,1);
		material.setDiffuse(1,1,1,1);
		material.setSpecular(0.4,0.4,0.4,1);
		material.setShininess(120);
		material.loadTexture(texture);
    return material;
	}
}
