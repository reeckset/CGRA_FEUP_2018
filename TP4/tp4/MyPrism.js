/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyPrism extends CGFobject
{

	constructor(scene, slices, stacks)
	{
			super(scene);
			this.slices = slices;
			this.stacks = stacks;
			this.initBuffers();
	}
	initBuffers(){
	this.vertices = [];

	this.indices = [];

	this.primitiveType=this.scene.gl.TRIANGLES;

	this.normals = []

	this.generatePrism();

	this.initGLBuffers();
}




	generatePrism(){
			let angle = (Math.PI*2) / this.slices;
			for(let i = 0; i < this.slices; i++){ //add slices

				let alphaVertice1 = i*angle;
				let alphaVertice2 = (i+1)*angle;
				let beta = alphaVertice1 + (alphaVertice2-alphaVertice1)/2;
				let stackSize = 1.0/this.stacks;

				for(let stack = 0; stack < this.stacks; stack++){ //add stacks
					let zFront = 0.5-stack*stackSize;
					let zBack = 0.5-(stack+1)*stackSize;
					this.vertices.push(Math.cos(alphaVertice1), Math.sin(alphaVertice1), zFront); //index1
					this.vertices.push(Math.cos(alphaVertice1), Math.sin(alphaVertice1), zBack); //index1+1
					this.vertices.push(Math.cos(alphaVertice2), Math.sin(alphaVertice2), zFront); //index1+2
					this.vertices.push(Math.cos(alphaVertice2), Math.sin(alphaVertice2), zBack); //index1+3

					//let index1 = this.vertices.length/3 - 4; //one aproach
					let index1 = 4*(i*this.stacks+stack) //another aproach of getting the index of the first vertex of the stack
					this.addQuadIndexes(index1);

					//add Normals
					this.addQuadNormals(beta);
				}
			}
	}

	addQuadNormals(angle){
		for(let n = 0; n < 4; n++){ //add normals
			this.normals.push(Math.cos(angle), Math.sin(angle), 0);
		}
	}

	addQuadIndexes(firstIndex){
		this.indices.push(firstIndex, firstIndex+1, firstIndex+2);
		this.indices.push(firstIndex+2, firstIndex+1, firstIndex+3);
	}
};
