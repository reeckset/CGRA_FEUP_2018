/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */



class MyTerrain extends Plane
{
  createConstants(){
    this.TEXTURE = '../resources/images/terrain.jpg';

    this.matrix = [ [ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
                    [ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
                    [ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
                    [ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
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
};
