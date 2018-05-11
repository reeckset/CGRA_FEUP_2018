/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyTrapezoid extends CGFobject
{

  //alpha is the angle of the left triangle, beta is the corresponding angle on the right
	constructor(scene, alpha, beta)
	{
		super(scene);
    this.alpha = alpha;
    this.beta = beta;
		this.height = 1;

    this.leftWidth = (alpha == Math.PI / 2) ? 0 : (this.height / Math.tan(alpha));
    this.rightWidth = (beta == Math.PI / 2) ? 0 : (this.height / Math.tan(beta));
    this.width = 1 + this.leftWidth + this.rightWidth;

		this.trapezoid = new MyTrapezoidQuad(this.scene, this.alpha, this.beta, 0, 1, 0, 1);

		this.initBuffers();
	};

  initBuffers()
	{




    /**
    /////////////// TO DO ////////////////
    */






		// Generate vertices and normals
		this.vertices = [];
		this.normals = [];

		// Uncomment below to init texCoords
		this.texCoords = [];

		this.generateQuads();
		this.generateTrapezoids();
		}

	display(){

		this.scene.pushMatrix();
/*
		this.topQuad = new MyQuad(this.scene, 0,1,0,1);
		this.topQuadRotY = Math.PI/2;
		this.topQuadRotZ = 0;
		this.topQuadScaleX = 1;
		this.topQuadScaleY = 1;
		this.topQuadX = - this.width / 2 + this.leftWidth + this.height / 2;
		this.topQuadY = 0.5;

		displayQuad(quad, x, y, rotationZ, rotationY, scaleX, scaleY)

*/
		this.displayQuad(this.leftQuad, this.leftQuadX, this.leftQuadY, this.leftQuadRotZ, this.leftQuadRotY, this.leftQuadScaleX, this.leftQuadScaleY);
		this.displayQuad(this.topQuad, this.topQuadX, this.topQuadY, this.topQuadRotZ, this.topQuadRotY, this.topQuadScaleX, this.topQuadScaleY);
		this.displayQuad(this.bottomQuad, this.bottomQuadX, this.bottomQuadY, this.bottomQuadRotZ, this.bottomQuadRotY, this.bottomQuadScaleX, this.bottomQuadScaleY);
		this.displayQuad(this.rightQuad, this.rightQuadX, this.rightQuadY, this.rightQuadRotZ, this.rightQuadRotY, this.rightQuadScaleX, this.rightQuadScaleY);

		this.displayTrapezoids();

		this.scene.popMatrix();
	}

  generateQuads() {

		this.leftQuad = new MyQuad(this.scene, 0,1,0,1);
		this.leftQuadRotY = Math.PI/2;
		this.leftQuadRotZ = this.alpha + Math.PI/2;
		this.leftQuadScaleX = 1;
		this.leftQuadY = 0;

		if(this.alpha == Math.PI/2) { // Left Side has a 90º degree angle

			this.leftQuadX = -this.width / 2;
			this.leftQuadScaleY = 1;

			//this.generateQuad(1, 1, this.alpha, -this.width / 2 , 0, false);


    } else {
      //this.generateQuad(1, this.getSideLength(this.leftWidth, this.alpha), this.alpha, -this.getDeltaX(this.leftWidth), 0, false);

			this.leftQuadX = -this.getDeltaX(this.leftWidth);
			this.leftQuadScaleY = this.getSideLength(this.leftWidth, this.alpha);
    }


		this.topQuad = new MyQuad(this.scene, 0,1,0,1);
		this.topQuadRotY = Math.PI/2;
		this.topQuadRotZ = Math.PI/2;
		this.topQuadScaleX = 1;
		this.topQuadScaleY = 1;
		this.topQuadX = - this.width / 2 + this.leftWidth + this.height / 2;
		this.topQuadY = 0.5;

		//this.generateQuad(1, 1, 0, - this.width / 2 + this.leftWidth + this.height / 2, 0.5, false);




		this.rightQuad = new MyQuad(this.scene, 0,1,0,1);
		this.rightQuadRotY = Math.PI/2;
		this.rightQuadScaleX = 1;
		this.rightQuadY = 0;


    if(this.beta == Math.PI/2) { // Right Side has a 90º degree angle
      // this.generateQuad(1, 1, this.beta, this.width/2, 0, true);

			this.rightQuadRotZ = this.beta + Math.PI/2;
			this.rightQuadScaleY = 1;
			this.rightQuadX = this.width/2;

    } else {
      // this.generateQuad(1, this.getSideLength(this.rightWidth, this.beta), -this.beta, this.getDeltaX(this.rightWidth), 0, false);

			this.rightQuadRotZ = -this.beta + Math.PI/2;
			this.rightQuadScaleY = this.getSideLength(this.rightWidth, this.beta);
			this.rightQuadX = this.getDeltaX(this.rightWidth);
    }


		this.bottomQuad = new MyQuad(this.scene, 0,1,0,1);
		this.bottomQuadRotY = -Math.PI/2;
		this.bottomQuadRotZ = Math.PI/2;
		this.bottomQuadScaleX = 1;
		this.bottomQuadScaleY = this.width;
		this.bottomQuadX = 0;
		this.bottomQuadY = -0.5;
    //this.generateQuad(1, this.width, 0, 0, -0.5, true);

  }

  // generates a quad with depth (measured in z-axis) and height (measured in y-axis),
  //with an angle made with the horizontal (x-axis)
	//rotate180 is a flag to switch the facing direction of the quad
  generateQuad(depth, height, angle, x, y, rotate180) {

    let quad = new MyQuad(this.scene, 0,1,0,1);

    this.scene.pushMatrix();
    this.scene.translate(x, y, 0);
		this.scene.rotate(angle + Math.PI/2, 0, 0, 1);

		if(rotate180) {
			this.scene.rotate(-Math.PI/2, 0, 1, 0);
		} else {
			this.scene.rotate(Math.PI/2, 0, 1, 0);
		}

		this.scene.scale(depth, height, 1);

    quad.display();

    this.scene.popMatrix();


  }

	displayQuad(quad, x, y, rotationZ, rotationY, scaleX, scaleY) {
    this.scene.pushMatrix();

		this.scene.translate(x, y, 0);
		this.scene.rotate(rotationZ, 0, 0, 1);
		this.scene.rotate(rotationY, 0, 1, 0);

		this.scene.scale(scaleX, scaleY, 1);

    quad.display();

    this.scene.popMatrix();
	}

	getSideLength(xWidth, angle) {
		return xWidth / Math.cos(angle);
	}

	getDeltaX(xWidth) {
		return (this.width - xWidth) / 2;
	}

	generateTrapezoids() {
		this.frontTrapezoid = new MyTrapezoidQuad(this.scene, this.alpha, this.beta);
		this.backTrapezoid = new MyTrapezoidQuad(this.scene, this.beta, this.alpha);
	}

	displayTrapezoids(){
		this.scene.pushMatrix();
		this.scene.translate(0,0,0.5);
		this.frontTrapezoid.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0,0,-0.5);
		this.scene.rotate(Math.PI, 0, 1, 0);
		this.backTrapezoid.display();
		this.scene.popMatrix();
	}

};
