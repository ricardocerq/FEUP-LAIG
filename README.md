# FEUP-LAIG
Project 1 - Graphical engine that reads an XML file specifying the scene to render. A tree is constructed based on the scene language specification, which allows for the recursive and fault-tolerant parsing of the scene file.

Features include: Geometrical Transformations, textures, materials, animations and shaders. A user interface is included and allows the user to turn lights in the scene on or off.

Primitives: triangle, rectangle, cylinder, sphere, plane, NURBS surface, terrain.

The scene itself is represented as a graph where nodes apply transformations, materials, textures and animations to their children.

Linear and circular animations supported with the possibility of chaining them together to form more complex ones.

The shader developed applies a texture, the heightmap, and alters the positions of the vertices according to the brightness of the image in each sampled area.  

Languages: Javascript and GLSL

Technologies: WebGL

Screenshots
<p align="center">
  <img src="/Project 1/images/print.png" >
    <span class="caption">
      <p align="center">Example Scene</p>
    </span>
</p>
<p align="center">
  <img src="/Project 1/images/print2.png" >
    <span class="caption">
      <p align="center">Example Scene</p>
    </span>
</p>
<p align="center">
  <img src="/Project 1/images/LAIG_T2_G04.1.jpg" >
    <span class="caption">
      <p align="center">Example Scene</p>
    </span>
</p>
<p align="center">
  <img src="/Project 1/images/LAIG_T2_G04.2.jpg" >
    <span class="caption">
      <p align="center">Example Scene</p>
    </span>
</p>
<p align="center">
  <img src="/Project 1/images/LAIG_T2_G04.3.jpg" >
    <span class="caption">
      <p align="center">Example Scene</p>
    </span>
</p>
