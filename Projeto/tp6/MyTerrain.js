/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */



class MyTerrain extends Plane
{
  createConstants(){
    this.TEXTURE = '../resources/images/terrain_2.jpg';

    this.matrix = [ [ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
                    [ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
                    [ 0.0 , 0.0 , -4.0, -4.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
                    [ 0.0 , 0.0 , -4.0, -4.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0],
                    [ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
                    [ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
                    [ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
                    [ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0],
                    [ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 2.0, 2.0, 2.0, 2.0, 1.0, 0.0],
                    [ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 2.0, 2.0, 2.0, 2.0, 1.0, 0.0],
                    [ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 2.0, 2.0, 2.0, 2.0, 1.0, 0.0],
                    [ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 2.0, 2.0, 2.0, 3.0, 1.0, 0.0],
                    [ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 2.0, 2.0, 3.0, 3.0, 1.0, 0.0],
                    [ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 2.0, 2.0, 0.0, 0.0],
                    [ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
                    [ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
                  ];

    this.SIZE = 50;
    this.CELL_SIZE = this.SIZE/this.matrix.length;
  }

	constructor(scene, minS, maxS, minT, maxT, y)
	{
    super(scene, 15, minS, maxS, minT, maxT);
    this.createConstants();
    this.addY(y);

    this.createMaterial();
    this.initBuffers();
  };

  initBuffers()
	{
    if(!this.matrix) return;
    super.initBuffers();

		this.generatePlane();

	};

	generatePlane(){
		/* example for nrDivs = 3 :
		(numbers represent index of point in vertices array)

				y
				^
				|
		0    1  |  2    3
				|
		4	 5	|  6    7
		--------|--------------> x
		8    9  |  10  11
				|
		12  13  |  14  15

		*/

		var yCoord = 0.5;
		let tTexCoord = this.minT;
		for (var j = 0; j <= this.nrDivs; j++)
		{
			var xCoord = -0.5;
			let sTexCoord = this.minS;
			for (var i = 0; i <= this.nrDivs; i++)
			{
				this.vertices.push(xCoord, yCoord, this.matrix[j][i]);

				// As this plane is being drawn on the xy plane, the normal to the plane will be along the positive z axis.
				// So all the vertices will have the same normal, (0, 0, 1).

				this.normals.push(0,0,1);

				// texCoords should be computed here; uncomment and fill the blanks
				this.texCoords.push(sTexCoord, -tTexCoord);

				xCoord += this.patchLength;
				sTexCoord += this.texPatchLengthS;
			}
			tTexCoord -= this.texPatchLengthT;
			yCoord -= this.patchLength;
		}

    for(var i = 1; i <= this.nrDivs-1; i++){
      for (var j = 1; j <= this.nrDivs-1; j++){
        let currentPoint = [this.vertices[j*this.nrDivs*3+i*3], this.vertices[j*this.nrDivs*3+i*3+2], this.vertices[j*this.nrDivs*3+i*3+1]];

        let adjacentLeftPoint = [this.vertices[j*this.nrDivs*3+(i-1)*3], this.vertices[j*this.nrDivs*3+(i-1)*3+2], this.vertices[j*this.nrDivs*3+(i-1)*3+1]];
        let adjacentRightPoint = [this.vertices[j*this.nrDivs*3+(i+1)*3], this.vertices[j*this.nrDivs*3+(i+1)*3+2], this.vertices[j*this.nrDivs*3+(i+1)*3+1]];

        let adjacentAbovePoint = [this.vertices[(j+1)*this.nrDivs*3+i*3+1], this.vertices[(j+1)*this.nrDivs*3+i*3+2], this.vertices[(j+1)*this.nrDivs*3+i*3+1]];
        let adjacentBelowPoint = [this.vertices[(j-1)*this.nrDivs*3+i*3+1], this.vertices[(j-1)*this.nrDivs*3+i*3+2], this.vertices[(j-1)*this.nrDivs*3+i*3+1]];

        let vectorPositiveX = [currentPoint[0] - adjacentLeftPoint[0], currentPoint[1] - adjacentLeftPoint[1], currentPoint[2] - adjacentLeftPoint[2]];
        let vectorNegativeX = [adjacentRightPoint[0] - currentPoint[0],  adjacentRightPoint[1] - currentPoint[1], adjacentRightPoint[2] - currentPoint[2]];

        let vectorPositiveZ = [currentPoint[0] - adjacentBelowPoint[0], currentPoint[1] - adjacentBelowPoint[1], currentPoint[2] - adjacentBelowPoint[2]];
        let vectorNegativeZ = [adjacentAbovePoint[0] - currentPoint[0], adjacentAbovePoint[1] - currentPoint[1], adjacentAbovePoint[2] - currentPoint[2]];

        let firstNormal = this.cross(vectorNegativeZ, [0,0,1]);
        let secondNormal = this.cross(vectorPositiveZ, [0,0,1]);
        let thirdNormal = this.cross(vectorNegativeX, [1,0,0]);
        let forthNormal = this.cross(vectorPositiveX, [1,0,0]);

        let x =  (firstNormal[0] + secondNormal[0] + thirdNormal[0] + forthNormal[0])/4;
        let y = (firstNormal[1] + secondNormal[1] + thirdNormal[1] + forthNormal[1])/4;
        let z = (firstNormal[2] + secondNormal[2] + thirdNormal[2] + forthNormal[2])/4;

        this.normals[j*this.nrDivs*3+i*3] = z;
        this.normals[j*this.nrDivs*3+i*3+1] = x;
        this.normals[j*this.nrDivs*3+i*3+2] = y;

      }
    }
	}

	display(){
		this.scene.pushMatrix();
    this.material.apply();
    this.scene.scale(this.SIZE, 1, this.SIZE);
    this.scene.rotate(Math.PI/2, -1,0,0);
    super.display();
		this.scene.popMatrix();
	}

  createMaterial(texture){
    this.material = new CGFappearance(this.scene);
    this.material.setAmbient(0.3,0.3,0.3,1);
		this.material.setDiffuse(0.7,0.7,0.7,1);
		this.material.setSpecular(0,0,0,1);
		this.material.setShininess(50);
		this.material.loadTexture(this.TEXTURE);
  }

  addY(val){
    for(var x = 0; x < this.matrix.length; x++){
      for(var z = 0; z < this.matrix.length; z++){
        this.matrix[x][z] += val;
      }
    }
  }

  cross(vector1, vector2){
    return [vector1[1] * vector2[2] - vector1[2] * vector2[1], vector1[2] * vector2[0] - vector1[0] * vector2[2], vector1[0] * vector2[1] - vector1[1] * vector2[0]]
  }
};
