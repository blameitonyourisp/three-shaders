import*as e from"three";import{Pass as r,FullScreenQuad as t}from"three/addons/postprocessing/Pass.js";class i extends r{constructor({width:r=window.innerWidth,height:i=window.innerHeight}={}){super();const a={uniforms:{tDiffuse:{value:null},time:{value:0},u_resolution:{value:new e.Vector2(r,i)}},vertexShader:"#define GLSLIFY 1\nvarying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1);}",fragmentShader:"#define GLSLIFY 1\nvarying vec2 vUv;uniform sampler2D tDiffuse;uniform vec2 u_resolution;uniform float time;float rand(vec2 co){return fract(sin(dot(co,vec2(12.9898,78.233)))*43758.5453);}float character(int n,vec2 p){int x=int(p.x)% 6;int y=int(p.y)% 6;if(x==5){return 0.0;}if(y==5){return 0.0;}int a=25-(5-x+5*y);if(((n>>a)&1)==1)return 1.0;return 0.0;}int choice(int n[10]){vec2 pix=gl_FragCoord.xy;float cell_x=6.0;float cell_y=6.0;vec2 cell=floor(pix/vec2(cell_x,cell_y))*vec2(cell_x,cell_y);float dx=rand(cell/u_resolution.xy);int index=int(dx*10.0);return n[9];}int[10]getIntegerBitmapArray(float gray){int integerBitmapArray[10];if(gray<0.059){integerBitmapArray=int[](0,0,0,0,0,0,0,0,0,0);return integerBitmapArray;}if(gray<0.118){integerBitmapArray=int[](4096,4096,4096,4096,4096,4096,4096,4096,4096,4096);return integerBitmapArray;}if(gray<0.176){integerBitmapArray=int[](69632,69632,264,264,130,130,131200,131200,131200,131200);return integerBitmapArray;}if(gray<0.235){integerBitmapArray=int[](324,324,324,14336,14336,14336,131204,131204,2228352,2228352);return integerBitmapArray;}if(gray<0.294){integerBitmapArray=int[](10560,10560,10560,10560,10560,4325508,4325508,4325508,4325508,4325508);return integerBitmapArray;}if(gray<0.353){integerBitmapArray=int[](32505856,32505856,317440,317440,4260932,4260932,4473092,4473092,4261956,4464900);return integerBitmapArray;}if(gray<0.412){integerBitmapArray=int[](9507104,9507104,9507104,9507104,9507104,4198694,4198694,4198694,4198694,4198694);return integerBitmapArray;}if(gray<0.471){integerBitmapArray=int[](4329809,4329809,4329809,4226052,4226052,4226052,6359110,6359110,12853516,12853516);return integerBitmapArray;}if(gray<0.529){integerBitmapArray=int[](15762465,15762465,15762465,15762465,14684612,14684612,12720268,6360134,2306832,8788065);return integerBitmapArray;}if(gray<0.588){integerBitmapArray=int[](4329631,4329631,4539953,18157905,4334111,4334111,4357252,4357252,332772,332772);return integerBitmapArray;}if(gray<0.647){integerBitmapArray=int[](32641220,32641220,32641220,32641220,32641220,1016800,1016800,1016800,1016800,1016800);return integerBitmapArray;}if(gray<0.706){integerBitmapArray=int[](23385164,23385164,15238702,15238702,18128177,18128177,15255089,15255089,9415048,9415048);return integerBitmapArray;}if(gray<0.765){integerBitmapArray=int[](15255086,15255086,15255086,15255086,1096767,1096767,6595871,6595871,1097263,1097263);return integerBitmapArray;}if(gray<0.824){integerBitmapArray=int[](18415153,32641183,18405233,18667121,23385646,16267326,18732593,32575775,32584238,15252014);return integerBitmapArray;}if(gray<0.882){integerBitmapArray=int[](18415150,18415150,16303663,16303663,15266878,15266878,18398767,18398767,16284175,16284175);return integerBitmapArray;}if(gray<0.941){integerBitmapArray=int[](15324974,15324974,16268351,16268351,15268926,15268926,16285230,16285230,16398526,16398526);return integerBitmapArray;}else{integerBitmapArray=int[](16301615,16301615,16301615,32554047,32554047,32554047,11512810,11512810,11512810,11512810);return integerBitmapArray;}}void main(){vec4 previousPassColor=texture2D(tDiffuse,vUv);int row=int(gl_FragCoord.y/8.0)% 2;int column=int(gl_FragCoord.x/8.0)% 2;vec2 pix=gl_FragCoord.xy;float cell_x=6.0;float cell_y=6.0;vec2 cell=vec2(floor(pix.x/cell_x)*cell_x,floor(pix.y/cell_y)*cell_y);vec3 col=texture2D(tDiffuse,cell/u_resolution.xy).rgb;float dx=rand(cell/u_resolution.xy+time*0.0);float grad=5.0;float maxRand=0.044;float den=1.0/(maxRand*2.0);float x=dx*grad-log(den)-grad/2.0;float random=1.0/(den+exp(-x))-maxRand;float gray=clamp(0.33*col.r+0.33*col.g+0.33*col.b+random*1.0,0.0,1.0);int integerBitmap=choice(getIntegerBitmapArray(gray));col=col*character(integerBitmap,pix)+col*0.0;gl_FragColor=vec4(col,1.0);}"};this.uniforms=e.UniformsUtils.clone(a.uniforms),this.material=new e.ShaderMaterial({uniforms:this.uniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.fsQuad=new t(this.material)}render(e,r,t,i){this.uniforms.tDiffuse.value=t.texture,this.uniforms.time.value+=i,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(r),this.clear&&e.clear(),this.fsQuad.render(e))}}var a="#define GLSLIFY 1\nvarying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1);}";class n extends r{constructor({width:r=window.innerWidth,height:i=window.innerHeight}={}){super(),this.renderTargetA=new e.WebGLRenderTarget(r,i,{type:e.HalfFloatType}),this.renderTargetB=new e.WebGLRenderTarget(r,i,{type:e.HalfFloatType}),this.blurUniforms=e.UniformsUtils.clone({tDiffuse:{value:null},u_resolution:{value:new e.Vector2(r,i)},uKernel:{value:[.0625,.25,.375,.25,.0625]},uHorizontal:{value:!0}}),this.blurMaterial=new e.ShaderMaterial({uniforms:this.blurUniforms,vertexShader:a,fragmentShader:"#define GLSLIFY 1\nvarying vec2 vUv;uniform sampler2D tDiffuse;uniform vec2 u_resolution;uniform float uKernel[5];uniform bool uHorizontal;void main(){vec4 fragColor=texture2D(tDiffuse,vUv);vec4 blurColor;for(int i=0;i<5;i++){if(uHorizontal){float offset=(float(i)-(5.0-1.0)/2.0)/u_resolution.x;vec2 pixel=vec2(vUv.x+offset,vUv.y);blurColor+=texture(tDiffuse,pixel)*uKernel[i];}else{float offset=(float(i)-(5.0-1.0)/2.0)/u_resolution.y;vec2 pixel=vec2(vUv.x,vUv.y+offset);blurColor+=texture(tDiffuse,pixel)*uKernel[i];}}gl_FragColor=blurColor;}"}),this.combineUniforms=e.UniformsUtils.clone({tDiffuse:{value:null},tBlur:{value:null},u_resolution:{value:new e.Vector2(r,i)}}),this.combineMaterial=new e.ShaderMaterial({uniforms:this.combineUniforms,vertexShader:a,fragmentShader:"#define GLSLIFY 1\nvarying vec2 vUv;uniform sampler2D tDiffuse;uniform sampler2D tBlur;void main(){vec4 fragColor=texture(tDiffuse,vUv);vec4 blurColor=texture(tBlur,vUv);gl_FragColor=(fragColor+blurColor)*0.75;}"}),this.filterUniforms=e.UniformsUtils.clone({tDiffuse:{value:null},u_resolution:{value:new e.Vector2(r,i)}}),this.filterMaterial=new e.ShaderMaterial({uniforms:this.filterUniforms,vertexShader:a,fragmentShader:"#define GLSLIFY 1\nvarying vec2 vUv;uniform sampler2D tDiffuse;void main(){vec4 fragColor=texture2D(tDiffuse,vUv);vec4 bloomColor;float brightness=dot(fragColor.rgb,vec3(0.2126,0.7152,0.0722));float threshold=0.75;if(brightness>threshold){bloomColor=fragColor.rgba;}else{bloomColor=vec4(0.0,0.0,0.0,fragColor.a);}gl_FragColor=bloomColor;}"}),this.fsQuad=new t}render(e,r,t){this.fsQuad.material=this.filterMaterial,this.filterUniforms.tDiffuse.value=t.texture,e.setRenderTarget(this.renderTargetA),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.blurMaterial,this.blurUniforms.tDiffuse.value=this.renderTargetA.texture,e.setRenderTarget(this.renderTargetB),e.clear(),this.fsQuad.render(e),this.blurUniforms.tDiffuse.value=this.renderTargetB.texture,this.blurUniforms.uHorizontal.value=!1,e.setRenderTarget(this.renderTargetA),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.combineMaterial,this.combineUniforms.tDiffuse.value=t.texture,this.combineUniforms.tBlur.value=this.renderTargetA.texture,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(r),this.clear&&e.clear(),this.fsQuad.render(e))}}class o extends r{constructor({width:r=window.innerWidth,height:i=window.innerHeight}={}){super();const a={uniforms:{tDiffuse:{value:null},u_resolution:{value:new e.Vector2(r,i)}},vertexShader:"#define GLSLIFY 1\nvarying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1);}",fragmentShader:"#define GLSLIFY 1\nvarying vec2 vUv;uniform sampler2D tDiffuse;uniform vec2 u_resolution;void main(){vec4 previousPassColor=texture2D(tDiffuse,vUv);vec3 previousColor=previousPassColor.rgb;vec2 pixel=gl_FragCoord.xy;float pixelSize=5.0;vec2 cell=vec2(floor(pixel.x/pixelSize)*pixelSize,floor(pixel.y/pixelSize)*pixelSize);vec3 cellSample=texture2D(tDiffuse,cell/u_resolution.xy).rgb;gl_FragColor=vec4(cellSample,1.0);}"};this.uniforms=e.UniformsUtils.clone(a.uniforms),this.material=new e.ShaderMaterial({uniforms:this.uniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.fsQuad=new t(this.material)}render(e,r,t){this.uniforms.tDiffuse.value=t.texture,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(r),this.clear&&e.clear(),this.fsQuad.render(e))}}export{i as AsciiPass,n as BloomPass,o as PixelatePass};
