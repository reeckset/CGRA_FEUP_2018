/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyLamp extends CGFobject
{

	constructor(scene, slices, stacks)
	{
			super(scene);
			this.slices = slices;
			this.stacks = stacks;
      this.alpha = (Math.PI*2) / this.slices; // rotates on xOz plane
      this.beta = (Math.PI / 2) / this.stacks; // rotates on xOy plane
			this.initBuffers();
	}
	initBuffers(){
	this.vertices = [];

	this.indices = [];

	this.primitiveType=this.scene.gl.TRIANGLES;

	this.normals = []

	this.generateLamp();

	this.initGLBuffers();
}




	generateLamp(){


      this.createStack(0,  false);

      for(let b = 1; b <= this.stacks; b++) {
        this.createStack(b, true);
      }

      console.dir(this.vertices);
      console.dir(this.indices);


	}

  addQuadIndexes(firstIndex){
    this.indices.push(firstIndex-this.slices, firstIndex-this.slices - 1, firstIndex);
    this.indices.push(firstIndex, firstIndex-this.slices - 1, firstIndex - 1);
  }

  // beta is the current angle, createQuads is a flag that specifies if the indexes can be generated
  //(on first iteration, the flag will be false)
  createStack(b, createQuads) {

    // Generate First Vertex
    // (must be done because on the first iteration, the vertex has nothing to connect to, to create a face)
    let currBeta = (b*this.beta);
    this.createVertex(0, currBeta);
    console.log("currAlpha: " + 0);
    console.log("currBeta: " + currBeta);

    //Generate remaining vertexes and faces, joining them
    for (var a = 1; a <= this.slices; a++) {

      let currAlpha =(a*this.alpha);
      console.log("currAlpha: " + currAlpha);
      console.log("currBeta: " + currBeta);

      this.createVertex(currAlpha, currBeta);

      if(createQuads) {
        this.addQuadIndexes(b * this.slices + a)
      }

    }
  }

  createVertex(currAlpha, currBeta) {
    this.vertices.push(
      Math.cos(currBeta)*Math.cos(currAlpha), // x
      Math.sin(currBeta), // y
      Math.cos(currBeta)*Math.sin(currAlpha) // z
    );

    this.normals.push(
      Math.cos(currBeta)*Math.cos(currAlpha), // x
      Math.sin(currBeta), // y
      Math.cos(currBeta)*Math.sin(currAlpha) // z
    );

    //this.vertices = this.vertices.concat(v); // push the current generated vertex into the vertices array
  }
};
