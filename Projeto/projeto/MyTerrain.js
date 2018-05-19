/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyTerrain extends CGFobject
{
  createConstants(){
    this.TEXTURE = '../resources/images/terrain.jpg';

    this.matrix = [[ 2.0 , 3.0 , 2.0, 4.0, 2.5, 2.4, 2.3, 1.3 ],
                    [ 2.0 , 3.0 , 2.0, 4.0, 7.5, 6.4, 4.3, 1.3 ],
                    [ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ],
                    [ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ],
                    [ 0.0 , 0.0 , 2.0, 4.0, 2.5, 2.4, 0.0, 0.0 ],
                    [ 0.0 , 0.0 , 2.0, 4.0, 3.5, 2.4, 0.0, 0.0 ],
                    [ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ],
                    [ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ],
                    [ 2.0 , 3.0 , 2.0, 1.0, 2.5, 2.4, 2.3, 1.3 ]
                    ];

    this.SIZE = 50;
    this.CELL_SIZE = this.SIZE/this.matrix.length;
  }

	constructor(scene, y)
	{
		super(scene);
    this.createConstants();
    this.addY(y);
    this.plane = new Plane(this.scene, this.matrix.length - 1,0,1,0,1,this.matrix);
    this.createMaterial();
  };

	display(){
		this.scene.pushMatrix();
    this.material.apply();
    this.scene.scale(this.SIZE, 1, this.SIZE);
    this.scene.rotate(Math.PI/2, -1,0,0);
    this.plane.display();
		this.scene.popMatrix();
	}

  createMaterial(texture){
    this.material = new CGFappearance(this.scene);
		this.material.setAmbient(0.8,0.8,0.8,1);
		this.material.setDiffuse(1,1,1,1);
		this.material.setSpecular(0.4,0.4,0.4,1);
		this.material.setShininess(120);
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
