/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyPaperPlane extends CGFobject
{

	constructor(scene)
	{
			super(scene);
			this.initBuffers();
	}
		initBuffers(){
		this.vertices = [0,0,0,
                    6,0,0,
                    6,2,-0.5,
                    6,2,0.5,
                    6,2,3,
                    6,2,-3];

		this.indices = [];

		this.primitiveType=this.scene.gl.TRIANGLES;

    this.x = 10;

    this.y = 3.8;

    this.rotationZ = 0;

    this.rotationX = 0;

    this.paperPlaneSpeed = 2;

		this.generatePPlane();

		this.initGLBuffers();
	}

  displayAnimated(){
    this.scene.pushMatrix();
      this.scene.rotate(this.rotationZ, 0, 0, 1);
      this.scene.rotate(this.rotationX,1,0,0);
      this.display();
    this.scene.popMatrix();

  }

	generatePPlane(){
    this.addDoubleSidedTriangle(0,1,2);
    this.addDoubleSidedTriangle(0,1,3);
    this.addDoubleSidedTriangle(0,1,2);
    this.addDoubleSidedTriangle(0,2,5);
    this.addDoubleSidedTriangle(0,3,4);
	}

	addDoubleSidedTriangle(i1,i2,i3){
      this.indices.push(i1,i2,i3);
      this.indices.push(i3,i2,i1);
  }

  update(dTime){
    if(dTime < 3000){
      if(this.x > 0.2){
  			this.x -= dTime * this.paperPlaneSpeed / 1000;
  		}else{
        if(this.y > 0.1){
        this.rotationZ = Math.PI/2;
        this.rotationX = Math.PI;
        this.y -= dTime * this.paperPlaneSpeed / 1000;
        }else{
          this.rotationX = 0;
          this.rotationZ = 0;
        }
      }
    }
  }
};
