import * as T from 'three';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
const W=936,H=2026;
function outline(w,h,r){const s=new T.Shape(),x=-w/2,y=-h/2;s.moveTo(x+r,y);s.lineTo(x+w-r,y);s.quadraticCurveTo(x+w,y,x+w,y+r);s.lineTo(x+w,y+h-r);s.quadraticCurveTo(x+w,y+h,x+w-r,y+h);s.lineTo(x+r,y+h);s.quadraticCurveTo(x,y+h,x,y+h-r);s.lineTo(x,y+r);s.quadraticCurveTo(x,y,x+r,y);return s;}
function solid(w,h,r,d,material,bevel=.018){const g=new T.ExtrudeGeometry(outline(w,h,r),{depth:d,bevelEnabled:true,bevelSegments:5,steps:1,bevelSize:bevel,bevelThickness:bevel,curveSegments:32});g.translate(0,0,-d/2);return new T.Mesh(g,material)}
function face(w,h,r,mat){const g=new T.ShapeGeometry(outline(w,h,r),32),p=g.attributes.position,uv=[];for(let i=0;i<p.count;i++)uv.push((p.getX(i)+w/2)/w,(p.getY(i)+h/2)/h);g.setAttribute('uv',new T.Float32BufferAttribute(uv,2));return new T.Mesh(g,mat)}
window.createThreePhone=host=>{
 let renderer;try{renderer=new T.WebGLRenderer({alpha:true,antialias:true,powerPreference:'high-performance'});}catch(e){const p=window.createPhotographicPhone(host);let key='';return{update(a,b,t){const s=t<.5?a:b,k=s.i+'-'+s.type;if(k!==key){key=k;host.style.setProperty('--accent',s.accent);host.style.setProperty('--ink',s.ink);p.setContent(s.type===0?`<div class="service-splash"><small>ASHWOOD FRIENDS</small><strong>${s.name}</strong><div class="splash-art"><i></i><i></i><i></i><i></i></div><p>${s.tagline}</p></div>`:`<div class="site-screen"><img class="site-capture" src="assets/${s.file}" alt="${s.name}"></div>`);}p.turn(s.i,0,true)},resize(){}}}
 host.classList.add('real-3d-phone');host.replaceChildren(renderer.domElement);renderer.domElement.setAttribute('role','img');renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setClearColor(0,0);renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=.9;
 const scene=new T.Scene(),camera=new T.PerspectiveCamera(32,1,.1,100);camera.position.set(0,0,11.3);
 const pmrem=new T.PMREMGenerator(renderer),room=new RoomEnvironment();scene.environment=pmrem.fromScene(room,.035).texture;pmrem.dispose();room.dispose();scene.environmentIntensity=.85;
 scene.add(new T.HemisphereLight(0xffffff,0x39404e,.65));const key=new T.DirectionalLight(0xfff9f1,1.7);key.position.set(-4,6,5);scene.add(key);const rim=new T.DirectionalLight(0xe1eaff,2.2);rim.position.set(5,2,-4);scene.add(rim);
 const phone=new T.Group();scene.add(phone);
 const metal=new T.MeshStandardMaterial({color:0x9a9da3,metalness:1,roughness:.23});
 const polished=new T.MeshStandardMaterial({color:0xd3d6da,metalness:1,roughness:.12});
 const ceramic=new T.MeshPhysicalMaterial({color:0xaeb2b9,metalness:.65,roughness:.26,clearcoat:.45,clearcoatRoughness:.24});
 const black=new T.MeshStandardMaterial({color:0x08090b,roughness:.23,metalness:.4});
 const gasket=new T.MeshStandardMaterial({color:0x202328,roughness:.46});
 const add=(mesh,x=0,y=0,z=0)=>{mesh.position.set(x,y,z);phone.add(mesh);return mesh};
 add(solid(2.78,5.8,.4,.26,metal,.028));
 add(solid(2.745,5.765,.385,.018,polished,.01),0,0,.145);
 add(solid(2.70,5.72,.37,.018,black,.012),0,0,.166);
 add(solid(2.73,5.75,.38,.018,gasket,.009),0,0,-.151);
 add(solid(2.70,5.72,.37,.024,ceramic,.012),0,0,-.172);
 // A single screen remains attached to the same solid device through every chapter.
 const screenMaterial=new T.ShaderMaterial({uniforms:{first:{value:null},second:{value:null},progress:{value:0}},vertexShader:`varying vec2 screenUV; void main(){screenUV=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,fragmentShader:`uniform sampler2D first;uniform sampler2D second;uniform float progress;varying vec2 screenUV;void main(){vec2 uv=screenUV;float boundary=1.0-progress;if(uv.x<boundary){gl_FragColor=texture2D(first,vec2(uv.x+progress,uv.y));}else{gl_FragColor=texture2D(second,vec2(uv.x-boundary,uv.y));}#include <colorspace_fragment>
}`.replace('}#include','}\n#include'),toneMapped:false});
 add(face(2.60,5.60,.31,screenMaterial),0,0,.190);
 const glass=new T.MeshPhysicalMaterial({color:0xffffff,metalness:0,roughness:.10,transparent:true,opacity:.035,clearcoat:1,clearcoatRoughness:.08,depthWrite:false});add(face(2.61,5.61,.31,glass),0,0,.193);
 add(solid(.76,.205,.102,.007,black,.004),0,2.53,.207);
 add(face(.052,.052,.026,new T.MeshBasicMaterial({color:0x101d2b})),.255,2.53,.215);
 add(face(.77,.025,.012,new T.MeshBasicMaterial({color:0xcccccc,transparent:true,opacity:.8})),0,-2.68,.201);
 // Recessed camera deck, machined rings and layered optical glass.
 add(solid(2.48,1.40,.25,.115,metal,.026),0,2.04,-.25);
 add(solid(2.43,1.35,.23,.008,ceramic,.008),0,2.04,-.324);
 const cyl=(r,d,mat,x,y,z)=>{const m=new T.Mesh(new T.CylinderGeometry(r,r,d,64),mat);m.rotation.x=Math.PI/2;return add(m,x,y,z)};
 const lensGlass=new T.MeshPhysicalMaterial({color:0x080c18,metalness:.4,roughness:.075,clearcoat:1});
 for(const [x,y] of [[.73,2.36],[.73,1.72],[.04,2.04]]){
  cyl(.294,.08,polished,x,y,-.364);cyl(.268,.091,black,x,y,-.375);cyl(.235,.015,lensGlass,x,y,-.428);
  for(const r of [.20,.16,.10]){const ring=new T.Mesh(new T.TorusGeometry(r,.008,8,64),new T.MeshStandardMaterial({color:r===.10?0x172b41:0x222a35,metalness:.8,roughness:.15}));add(ring,x,y,-.44)}
  cyl(.059,.007,new T.MeshPhysicalMaterial({color:0x10273a,metalness:.6,roughness:.07}),x,y,-.445);
  const reflection=face(.075,.022,.011,new T.MeshBasicMaterial({color:0x7590b0,transparent:true,opacity:.42}));reflection.rotation.z=-.5;add(reflection,x-.05,y+.074,-.453);reflection.rotation.y=Math.PI;
 }
 cyl(.095,.018,new T.MeshStandardMaterial({color:0xe8dccb,roughness:.55}),-.76,2.28,-.343);cyl(.066,.016,black,-.76,1.87,-.343);cyl(.016,.018,black,-.76,1.65,-.344);
 // Side rails, button recesses, antenna breaks and the bottom port.
 for(const [x,y,h] of [[-1.413,1.44,.45],[-1.413,.82,.45],[-1.413,2.08,.19],[1.413,1.02,.75],[1.413,-1.35,.39]]){
  const b=solid(.037,h,.018,.11,polished,.007);add(b,x,y,0);
 }
 for(const x of [-1.413,1.413])for(const y of [-2.28,2.28])add(new T.Mesh(new T.BoxGeometry(.018,.025,.25),gasket),x,y,0);
 add(new T.Mesh(new T.BoxGeometry(.37,.022,.095),black),0,-2.929,0);add(new T.Mesh(new T.BoxGeometry(.25,.023,.018),metal),0,-2.931,.006);
 for(let j=-6;j<=6;j++){if(Math.abs(j)<3)continue;const hole=new T.Mesh(new T.SphereGeometry(.025,16,8),black);hole.scale.y=.25;add(hole,j*.13,-2.932,0)}
 const cache=new Map();let dirty=true,lastState='';
 function screen(s){const id=s.i+'-'+s.type;if(cache.has(id))return cache.get(id);const canvas=document.createElement('canvas');canvas.width=W;canvas.height=H;const ctx=canvas.getContext('2d');const tex=new T.CanvasTexture(canvas);tex.colorSpace=T.SRGBColorSpace;tex.anisotropy=renderer.capabilities.getMaxAnisotropy();const entry={tex};cache.set(id,entry);
  const text=(str,x,y,width,lh)=>{let line='';for(const ch of str){if(ch==='\n'||ctx.measureText(line+ch).width>width){ctx.fillText(line,x,y);line='';y+=lh;if(ch==='\n')continue}line+=ch}ctx.fillText(line,x,y)};
  const status=(light)=>{ctx.fillStyle=light?'#fff':'#17151a';ctx.font='600 26px Arial';ctx.fillText('9:41',57,64);ctx.fillRect(810,45,34,16);ctx.fillRect(846,50,3,6);for(let j=0;j<4;j++)ctx.fillRect(760+j*8,60-j*4,5,5+j*4)};
  ctx.fillStyle=s.accent;ctx.fillRect(0,0,W,H);
  if(s.type===0){ctx.fillStyle=s.ink;ctx.font='500 22px Arial';ctx.fillText('ASHWOOD FRIENDS',70,240);ctx.font='700 112px Arial';text(s.name,70,400,800,120);ctx.save();ctx.beginPath();ctx.roundRect(70,610,796,740,28);ctx.clip();window.drawAshwoodPattern(ctx,s.i,70,610,796,740,.6);ctx.restore();ctx.font='600 46px Arial';text(s.tagline,70,1530,790,66);ctx.font='500 22px Arial';ctx.fillText(s.category,70,1810);ctx.beginPath();ctx.moveTo(70,1850);ctx.lineTo(866,1850);ctx.strokeStyle=s.ink;ctx.lineWidth=2;ctx.stroke();status(false);tex.needsUpdate=true;
  }else{const im=new Image();im.onload=()=>{const scale=W/im.width;const height=im.height*scale;const offset=s.type===2&&s.i!==0?Math.min(Math.max(0,height-H+110),s.i===1?1750:1450):0;ctx.drawImage(im,0,0,im.width,1,0,0,W,H);ctx.drawImage(im,0,105-offset,W,height);ctx.drawImage(im,0,0,im.width,1,0,0,W,105);const p=ctx.getImageData(20,20,1,1).data;status(p[0]+p[1]+p[2]<380);tex.needsUpdate=true;dirty=true};im.src=window.phoneScreenTextures[s.file];}
  return entry;
 }
 const api={get needsRender(){return dirty},update(a,b,mix,pose){const from=screen(a),to=screen(b);screenMaterial.uniforms.first.value=from.tex;screenMaterial.uniforms.second.value=to.tex;screenMaterial.uniforms.progress.value=mix;phone.rotation.set(pose.pitch,pose.yaw,pose.roll);phone.position.set(0,pose.y||0,0);phone.scale.setScalar(pose.scale||1);renderer.domElement.setAttribute('aria-label',(mix<.5?a:b).name+' 앱 화면이 표시된 3D 스마트폰');const state=[a.i,a.type,b.i,b.type,mix,pose.pitch,pose.yaw,pose.roll,pose.scale,host.clientWidth].join('|');if(dirty||state!==lastState){renderer.render(scene,camera);lastState=state;dirty=false}},resize(){renderer.setSize(host.clientWidth,host.clientWidth,false);dirty=true}};
 new ResizeObserver(api.resize).observe(host);renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault()});renderer.domElement.addEventListener('webglcontextrestored',()=>{dirty=true;cache.forEach(e=>e.tex.needsUpdate=true)});return api;
};
