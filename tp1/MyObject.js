/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyObject extends CGFobject
{
	constructor(scene)
	{
		super(scene);
		this.initBuffers();
	};

	initBuffers()
	{
		this.vertices = [
				-0.5, -0.5, 0,
				0.5, -0.5, 0,
				-0.5, 0.5, 0,
				0.5, 0.5, 0
				];

		this.indices = [
				//0, 1, 2,
				//3, 2, 1
			];
		
		
		/*this.createTriangle(0,1.5,0,
							-1,0.5,0,
							1,0.5,0);*/

		this.createBox(-0.5,-0.5,-0.5,
							0.5,0.5,0.5);
		//this.createRectangle(0,0,0,1,0,0,0,1,0,1,1,0);

		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();

	};

	createTriangle(x1, y1, z1, x2, y2, z2, x3, y3, z3){
			this.insertInArray(this.insertInArray(x1,y1,z1, this.vertices)/3,
										this.insertInArray(x2,y2,z2, this.vertices)/3,
										this.insertInArray(x3,y3,z3, this.vertices)/3,
										this.indices);
			//this.updateTexCoordsGLBuffers( );
								
	};

	insertInArray(x, y, z, array){
		for(let i=0; i < array.length; i+=3){
			if(array[i] == x && array[i+1]==y && array[i+2]==z){
				return i;
			}
		}
		array.push(x);
		array.push(y);
		array.push(z);
		return array.length - 3;
	}

	createRectangle(x1,y1,z1,x2,y2,z2,x3,y3,z3,x4,y4,z4){
			this.createTriangle(x1,y1,z1,x2,y2,z2,x3,y3,z3);
			this.createTriangle(x2,y2,z2,x4,y4,z4,x3,y3,z3);
	}

	createBox(x1,y1,z1,x2,y2,z2){
		//make 1(x,y,z) be the point with lower y
		if(y1 < y2){
			let tempX = x2;
			let tempY = y2;
			let tempZ = z2;
			x2 = x1;
			y2 = y1;
			z2 = z1;
			x1 = tempX;
			y1 = tempY;
			z1 = tempZ;
		}
		//create Top and bottom rectangles
		this.createRectangle(x1,y1,z1,
							x1,y1,z2,
							x2,y1,z1,
							x2,y1,z2);
		this.createRectangle(x1,y2,z2,
							x1,y2,z1,
							x2,y2,z2,
							x2,y2,z1,);

		//create Side rectangles
		this.createRectangle(x1,y2,z1,
							x1,y2,z2,
							x1,y1,z1,
							x1,y1,z2);
		this.createRectangle(x2,y2,z2,
							x2,y2,z1,
							x2,y1,z2,
							x2,y1,z1);

		//create front and back rectangles
		this.createRectangle(x2,y1,z1,
							x2,y2,z1,
							x1,y1,z1,
							x1,y2,z1);
		this.createRectangle(x2,y2,z2,
							x2,y1,z2,
							x1,y2,z2,
							x1,y1,z2);					
		
	}

	extract(dx, dy, dz){
		 var indicesSize = this.indices.length;
		 for(let i=0; i < indicesSize; i+=3){

			 var x1 = this.vertices[this.indices[i]*3];
			 var y1 = this.vertices[this.indices[i]*3+1];
			 var z1 = this.vertices[this.indices[i]*3+2];
			 var x2 = this.vertices[this.indices[i+1]*3];
			 var y2 = this.vertices[this.indices[i+1]*3+1];
			 var z2 = this.vertices[this.indices[i+1]*3+2];
			 var x3 = this.vertices[this.indices[i+2]*3];
			 var y3 = this.vertices[this.indices[i+2]*3+1];
			 var z3 = this.vertices[this.indices[i+2]*3+2];

			 var tx1 = x1+dx;
			 var ty1 = y1+dy;
			 var tz1 = z1+dz;
			 var tx2 = x2+dx;
			 var ty2 = y2+dy;
			 var tz2 = z2+dz;
			 var tx3 = x3+dx;
			 var ty3 = y3+dy;
			 var tz3 = z3+dz;

			 	this.createTriangle(tx1,ty1,tz1,
														tx2,ty2,tz2,
														tx3,ty3,tz3);
				this.createRectangle(tx1,ty1,tz1,tx2,ty2,tz2,x1,y1,z1,x2,y2,z2);
				this.createRectangle(tx1,ty1,tz1,tx3,ty3,tz3,x1,y1,z1,x3,y3,z3);
				this.createRectangle(tx3,ty3,tz3,tx2,ty2,tz2,x3,y3,z3,x2,y2,z2);
		 }
	}
};
