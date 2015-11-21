function MyTriangle(scene, x1, y1, z1,x2, y2, z2, x3, y3, z3) {
  CGFobject.call(this,scene);

  this.p1 = [x1, y1, z1];
  this.p2 = [x2, y2, z2];
  this.p3 = [x3, y3, z3];
  this.ampS = 0;
  this.ampT = 0;

  this.initBuffers();
 };

 MyTriangle.prototype = Object.create(CGFobject.prototype);
 MyTriangle.prototype.constructor = MyTriangle;

 MyTriangle.prototype.initBuffers = function() {
    var p1 = this.p1;
    var p2 = this.p2;
    var p3 = this.p3;

    this.vertices = [
     p1[0],p1[1], p1[2],
     p2[0],p2[1], p2[2],
    p3[0],p3[1], p3[2],
    ];

   this.indices = [
    0, 1, 2,
    ];
 
    var x = ((p2[1] - p1[1])*(p3[2] - p1[2]) - (p2[2] - p1[2])*(p3[1] - p1[1]))/Math.sqrt(Math.pow((p2[1] - p1[1])*(p3[2] - p1[2]) - (p2[2] - p1[2])*(p3[1] - p1[1]),2) + Math.pow((p2[2] - p1[2])*(p3[0] - p1[0]) - (p2[0] - p1[0]) * (p3[2] - p1[2]),2) + Math.pow((p2[0] - p1[0])*(p3[1] - p1[1]) - (p2[1] - p1[1])*(p3[0] - p1[0]),2));
    var y = ((p2[2] - p1[2])*(p3[0] - p1[0]) - (p2[0] - p1[0])*(p3[2] - p1[2]))/Math.sqrt(Math.pow((p2[1] - p1[1])*(p3[2] - p1[2]) - (p2[2] - p1[2])*(p3[1] - p1[1]), 2) + Math.pow((p2[2] - p1[2])*(p3[0] - p1[0]) - (p2[0] - p1[0])*(p3[2] - p1[2]),2) + Math.pow((p2[0] - p1[0])*(p3[1] - p1[1]) - (p2[1] - p1[1])*(p3[0] - p1[0]),2));
    var z = ((p2[0] - p1[0])*(p3[1] - p1[1]) - (p2[1] - p1[1])*(p3[0] - p1[0]))/Math.sqrt(Math.pow((p2[1] - p1[1])*(p3[2] - p1[2])- (p2[2] - p1[2])*(p3[1] - p1[1]), 2) + Math.pow((p2[2] - p1[2])*(p3[0] - p1[0]) - (p2[0] - p1[0])*(p3[2] - p1[2]),2) + Math.pow((p2[0] - p1[0])*(p3[1] - p1[1]) - (p2[1] - p1[1])*(p3[0] - p1[0]), 2));
    
   this.normals =[ 
     x, y, z,
     x, y, z,
     x, y, z,
   ];
  
    var A = vec3.fromValues(this.p1[0],this.p1[1],this.p1[2]);
    var B = vec3.fromValues(this.p2[0],this.p2[1],this.p2[2]);
    var P = vec3.fromValues(this.p3[0],this.p3[1],this.p3[2]);
    var AP = vec3.create();
    vec3.subtract(AP, P, A);
    var AB = vec3.create();
    vec3.subtract(AB, B, A);
    var M = vec3.create();
    var temp = vec3.dot(AP, AB)/vec3.dot(AB, AB);
    vec3.scale(M, AB, temp);
    vec3.add(M, A, M);
    this.p3Sdist = vec3.distance(M, A);
    this.p3Tdist = vec3.distance(M, P);
    this.p2Sdist = vec3.distance(A, B);
    this.updateTexCoords(1,1);
  
  this.primitiveType = this.scene.gl.TRIANGLES;
  
  this.initGLBuffers();
 };

 MyTriangle.prototype.updateTexCoords = function(ampS, ampT){
  if(this.ampS == ampS && this.ampT == ampT)
    return;
  this.ampS = ampS;
  this.ampT = ampT;

  this.texCoords = [
          0,0,
          this.p2Sdist/ampS, 0,
          (this.p3Sdist)/ampS, (this.p3Tdist)/ampT
          ];

  this.updateTexCoordsGLBuffers();

}