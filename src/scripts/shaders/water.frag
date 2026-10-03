#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

// Adapted from Lucas Bebber / Codrops water distortion demo.
// See THIRD_PARTY_NOTICES.md.

uniform float u_time;
varying vec2 v_position;
uniform sampler2D u_image;
uniform sampler2D u_maps;
uniform vec2 u_mouse;
uniform float u_dpi;
uniform vec2 u_resolution;
uniform vec2 u_uvScale;
uniform vec2 u_uvOffset;

vec2 pixel(){
  return u_uvScale*u_dpi/u_resolution;
}
float wave(float x,float freq, float speed){
  return sin(x*freq+((u_time*(3.1415/2.0))*speed));
}
vec2 waves(vec2 pos){
  vec4 maps=texture2D(u_maps,pos);
  float mask=maps.r;
  float y=maps.g;
  float y2=pow(y,2.0);

  vec2 intensity=vec2(
    0.5-(y2*0.5),
    0.2+(y2*1.8)
  )*pixel();

  vec2 waves=vec2(
    wave(y,400.0-(y2*200.0),-0.03),
     wave(y,400.0-(y2*400.0*0.05),-0.045)
    +wave(y,900.0-(y2*900.0*0.05),-0.05)
    +wave(pos.x,20.0+(y2*20.0*1.5),-0.01)
  );
  return pos+(waves*intensity*mask);
}
vec2 depth(vec2 pos){
  vec2 intensity=vec2(0.01,0.01);
  float d=0.05-pow(texture2D(u_maps,pos).b,1.0);
  return pos+(intensity*u_mouse*d);
}
void main(){
  vec2 pos=v_position.xy*u_uvScale+u_uvOffset;

  vec2 turbulence=depth(waves(pos));
  vec4 c=texture2D(u_image,turbulence);


  gl_FragColor=vec4(c.rgb,1.0);

}
