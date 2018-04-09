/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyCylinder extends CGFobject
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

		this.normals = [];

		this.texCoords = [];

		this.generateCylinder();

		this.initGLBuffers();
	}




	generateCylinder(){
			let angle = (Math.PI*2) / this.slices;

			this.texPatchLengthS = 1/this.slices;
			this.texPatchLengthT = 1/this.stacks;

			let sTexCoord = 0;
			//set first two vertices
			this.createVertices(0);
			for(let i = 1; i <= this.slices; i++){ //add slices
				let tTexCoord = 0;
				this.createVertices(angle*i);
				for(let stack = 0; stack < this.stacks; stack++){ //add stacks
					let index = (i*(this.stacks+1)+stack);
					this.addQuadIndexes(index);

					this.texCoords.push(sTexCoord, -tTexCoord);
					tTexCoord += this.texPatchLengthT;
				}
				sTexCoord += this.texPatchLengthS;
			}
			this.createVertices(0);
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
			this.addQuadNormal(angle);
		}
	}
};
