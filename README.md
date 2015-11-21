# FEUP-LAIG
Project 1 - Graphical engine that reads an XML file specifying the scene to render. A tree is constructed based on the scene language specification, which allows for the recursive and fault-tolerant parsing of the scene file.

Features include: Geometrical Transformations, textures, materials, animations and shaders.

Primitives: triangle, rectangle, cylinder, sphere, plane, NURBS surface, terrain.

The scene itself is represented as a graph where nodes apply transformations, materials, textures and animations to their children.

Linear and circular animations supported with the possibility of chaining them together to form more complex ones.

The shader developed applies a texture, the heightmap, and alters the positions of the vertices according to the brightness of the image in each sampled area.  

Languages: Javascript and GLSL

Technologies: WebGL
