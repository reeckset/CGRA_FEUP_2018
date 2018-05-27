/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyCircle extends CGFobject
{

	constructor(scene, slices)
	{
			super(scene);
			this.slices = slices;
			this.initBuffers();
	}
		initBuffers(){
		this.vertices = [];

		this.indices = [];

		this.primitiveType=this.scene.gl.TRIANGLES;

		this.normals = [];
		this.texCoords = [];

		this.generateCircle();

		this.initGLBuffers();
	}

	generateCircle(){

      let MAX_ANGLE = 2*Math.PI;
      let defaultAngle = MAX_ANGLE / this.slices;
      this.vertices.push(0,0,0);
      this.texCoords.push(0.5,0.5);
      this.normals.push(0,0,1);
			for(let a = 0; a < MAX_ANGLE; a+= defaultAngle){
        this.vertices.push(Math.cos(a),Math.sin(a),0);
        this.texCoords.push(Math.cos(a) / 2 + 0.5 , 0.5 - (Math.sin(a) / 2));
        this.normals.push(0,0,1);
      }

      //Indices
      for(let a = 1; a < this.vertices.length/3 - 1; a++){
        this.indices.push(0,a,a+1);
      }
			this.indices.push(0,this.slices,1);

  }
};
