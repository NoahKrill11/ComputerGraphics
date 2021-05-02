#include "colors.inc"
#include "stones.inc"
#include "textures.inc"    // pre-defined scene elements
#include "shapes.inc"
#include "glass.inc"
#include "metals.inc"
#include "woods.inc"

background { color Cyan }
  camera {
    location <0, 2, -15>
    look_at  <0, 1,  2>
  }
  sphere {
     <0,0,0>,1 translate <0,clock,0> pigment {rgb 10}
     scale <1,clock+1,0.5>
    texture {
      pigment { color Yellow }
      
    }
  }
  
  light_source { <2, 4, -3> color White}
  difference {
 sphere { <1,3,1>, 1 translate <clock,0,0> }   // smaller sphere
 sphere { <6,3,0>, 4.7 translate <clock,0,0>} // larger sphere
 rotate <0,clock,0>        
 pigment { White}       // color it white
}

union {
    box { <-5.5, 2, -1>, <-3.5, 4, 1> }
    cylinder { <-3.5, 3, -1>, <-3.5, 3, 1>, 1}
    rotate <0,0,clock*100>         
    
  
    pigment { White} 
  }

  
