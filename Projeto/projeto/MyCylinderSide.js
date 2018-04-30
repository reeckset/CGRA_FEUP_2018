/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyCylinderSide extends CGFobject
{

	constructor(scene, slices, stacks)
	{
			super(scene);
			this.slices = slices;
			this.stacks = stacks;
			this.patchLengthS = 1/slices;
			this.patchLengthT = 1/stacks;
			this.currS = 1;
			this.initBuffers();
	}
		initBuffers(){
		this.vertices = [];

		this.indices = [];

		this.primitiveType=this.scene.gl.TRIANGLES;

		this.normals = [];
		this.texCoords = [];

		this.generateCylinder();

		this.initGLBuffers();
	}




	generateCylinder(){
			let angle = (Math.PI*2) / this.slices;

			//set first two vertices
			this.createVertices(0);
			for(let i = 1; i <= this.slices; i++){ //add slices
				this.createVertices(angle*i);
				for(let stack = 0; stack < this.stacks; stack++){ //add stacks
					let index = (i*(this.stacks+1)+stack);
					this.addQuadIndexes(index);
				}
			}
	}

	addQuadNormal(angle){
			this.normals.push(Math.cos(angle), Math.sin(angle), 0);
	}

	addQuadIndexes(firstIndex){
		this.indices.push(firstIndex-this.stacks-1, firstIndex-this.stacks, firstIndex);
		this.indices.push(firstIndex-this.stacks, firstIndex+1, firstIndex);
	}

	createVertices(angle){
		let stackSize = 1.0/this.stacks;
		for(let stack = 0; stack <= this.stacks; stack++){ //add stacks
			this.vertices.push(Math.cos(angle), Math.sin(angle), 0.5-stack*stackSize);
			//add Normals
			this.texCoords.push(this.currS, this.patchLengthT*(this.stacks-stack));
			this.addQuadNormal(angle);
		}
		this.currS -= this.patchLengthS;
	}
};
