/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MySemiSphere extends CGFobject
{

	constructor(scene, slices, stacks, texture)
	{
			super(scene);
			this.slices = slices;
			this.stacks = stacks;
      this.alpha = (Math.PI*2) / this.slices; // rotates on xOz plane
      this.beta = (Math.PI / 2) / this.stacks; // rotates on xOy plane
			this.createMaterial(texture);
			this.initBuffers();
	}
	initBuffers(){
	this.vertices = [];

	this.indices = [];

	this.primitiveType=this.scene.gl.TRIANGLES;

	this.normals = [];

	this.texCoords = [];

	this.generateLamp();

	this.initGLBuffers();
}

	displayTextured(){
		this.material.apply();
		this.display();
	}


	generateLamp(){


      this.createStack(0,  false);

      for(let b = 1; b <= this.stacks; b++) {
        this.createStack(b, true);
      }

	}

  addQuadIndexes(firstIndex){ //creates
    this.indices.push(firstIndex-this.slices, firstIndex-this.slices - 1, firstIndex);
    this.indices.push(firstIndex, firstIndex-this.slices - 1, firstIndex - 1);
  }

	addLastQuadIndexes(firstIndex){ //For joining the first and last vertices of a slice with the ones on the previous stack
    this.indices.push(firstIndex+this.slices - 1, firstIndex, firstIndex - 1);
    this.indices.push(firstIndex - 1, firstIndex, firstIndex - this.slices);
  }

  // beta is the current angle, createQuads is a flag that specifies if the indexes can be generated
  //(on first iteration, the flag will be false)
  createStack(b, createQuads) {

    // Generate First Vertex
    // (must be done because on the first iteration, the vertex has nothing to connect to, to create a face)
    let currBeta = (b*this.beta);
    this.createVertex(0, currBeta);

    //Generate remaining vertexes and faces, joining them
    for (var a = 1; a < this.slices; a++) {

      let currAlpha =(a*this.alpha);

      this.createVertex(currAlpha, currBeta);

      if(createQuads) {
        this.addQuadIndexes(b * this.slices + a);
      }

    }
		if(createQuads) {
			this.addLastQuadIndexes(b * this.slices);
		}

  }

  createVertex(currAlpha, currBeta) {
		let x = Math.cos(currBeta)*Math.cos(currAlpha);
		let y = Math.sin(currBeta);
		let z =   Math.cos(currBeta)*Math.sin(currAlpha);

    this.vertices.push(x, y, z);

    this.normals.push(x, y, z);

		this.texCoords.push(x/2 + 0.5, z/2 + 0.5);
  }

	createMaterial(texture){
		this.material = new CGFappearance(this.scene);
		this.material.setAmbient(0.8,0.8,0.8,1);
		this.material.setDiffuse(1,1,1,1);
		this.material.setSpecular(0.4,0.4,0.4,1);
		this.material.setShininess(120);
		this.material.loadTexture(texture);
	}
};
