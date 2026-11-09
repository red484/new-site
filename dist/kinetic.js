(()=>{const items=[
['아이돌코인','FANDOM','#f585ed','#35113b','https://www.idolcoin.ashwoodfriends.com/','좋아하는 AI 아이돌과 함께 만드는 새로운 팬덤의 경험.'],
['AFMovie','CREATE','#e2ff00','#2535ef','https://afmovie.ashwoodfriends.com/','상상 속 한 장면을 꺼내 보세요. 한 줄의 아이디어에서 시작하는 영상 만들기.'],
['달빛 사주','DISCOVER','#3433eb','#e5ff75','https://saju.ashwoodfriends.com/','나를 이해하는 또 하나의 방법. 오늘의 질문에서 내일의 가능성을 발견하세요.'],
['온서','CONNECT','#ff603b','#401923','https://onseo.ashwoodfriends.com/','새로운 캐릭터를 만나고, 대화를 나누고. 당신의 말에서 시작되는 다음 이야기.'],
['Citrush','GROW','#1b8549','#e2ff00','https://citrush.ashwoodfriends.com/','상품의 가능성을 콘텐츠로. 마케팅 아이디어를 실행으로 연결하는 에이전트.'],
['이짤이이짤','EXPRESS','#f5eee1','#fe5a36','https://zzal.ashwoodfriends.com/','긴 설명보다 정확한 한 장. 지금 내 기분을 표현할 새로운 짤을 만나보세요.']];
const canvas=document.querySelector('#patterns'),ctx=canvas.getContext('2d'),grid=document.querySelector('#services'),stage=document.querySelector('.playground'),dialog=document.querySelector('#detail'),dc=document.querySelector('#detail-pattern'),dx=dc.getContext('2d');const oc=document.querySelector('#opening-pattern'),ox=oc.getContext('2d');let stopped=matchMedia('(prefers-reduced-motion: reduce)').matches,unite=false,blend=0,selected=0,t=0,last=performance.now();
items.forEach((it,i)=>{const b=document.createElement('button');b.className='service';b.style.setProperty('--ink',it[3]);b.style.setProperty('--bg',it[2]);b.innerHTML=`<span class="num">0${i+1}</span><span class="category">${it[1]}</span><span class="name">${it[0]}</span><span class="arrow">↗</span>`;b.setAttribute('aria-label',it[0]+' 소개 보기');b.onclick=()=>open(i);grid.append(b)});
function size(c){const r=c.getBoundingClientRect(),d=Math.min(devicePixelRatio||1,2);if(c.width!==Math.round(r.width*d)||c.height!==Math.round(r.height*d)){c.width=Math.round(r.width*d);c.height=Math.round(r.height*d)}return[r.width,r.height,d]}
function pattern(c,i,x,y,w,h,time){const it=items[i];c.save();c.beginPath();c.rect(x,y,w,h);c.clip();c.translate(x,y);c.fillStyle=it[2];c.fillRect(0,0,w,h);c.fillStyle=it[3];const s=Math.min(w,h),phase=time*.65+i*.45;
if(i===0){const step=s/3.5;for(let a=-1;a<w/step+1;a++)for(let b=-1;b<h/step+1;b++){let k=(Math.sin(phase+(a+b)*.65)+1)/2;c.save();c.translate(a*step+step/2,b*step+step/2);c.rotate(k*Math.PI/2);let r=step*(.18+k*.25);c.beginPath();for(let n=0;n<8;n++){let ang=n*Math.PI/4,rr=n%2?r*.36:r;n?c.lineTo(Math.cos(ang)*rr,Math.sin(ang)*rr):c.moveTo(Math.cos(ang)*rr,Math.sin(ang)*rr)}c.closePath();c.fill();c.restore()}}
if(i===1){c.translate(w/2,h/2);c.rotate(Math.sin(phase)*.6);let unit=s/7;for(let a=-16;a<17;a++)c.fillRect(a*unit*(1.1+.45*Math.sin(phase)),-h*2,unit*.45,h*4)}
if(i===2){c.translate(w/2,h/2);for(let a=9;a>0;a--){c.fillStyle=a%2?it[3]:it[2];c.beginPath();c.arc(Math.sin(phase+a*.2)*s*.1,0,a*s/10,0,Math.PI*2);c.fill()}}
if(i===3){const unit=s/3;c.translate(w/2,h/2);c.rotate(Math.sin(phase)*.3);for(let a=-4;a<5;a++)for(let b=-4;b<5;b++){c.save();c.translate(a*unit,b*unit);c.rotate(phase+(a+b)*.4);c.beginPath();c.moveTo(-unit*.43,-unit*.43);c.lineTo(unit*.43,-unit*.43);c.quadraticCurveTo(unit*.43,unit*.43,-unit*.43,unit*.43);c.closePath();c.fill();c.restore()}}
if(i===4){c.translate(w/2,h/2);c.rotate(phase*.35);const u=s/5;for(let a=-10;a<11;a++)for(let b=-10;b<11;b++)if((a+b)%2===0){const k=.7+.3*Math.sin(phase+a*.35);c.fillRect(a*u,b*u,u*k,u*k)}}
if(i===5){let u=s/4;for(let a=-1;a<w/u+1;a++)for(let b=-1;b<h/u+1;b++){c.save();c.translate(a*u+u/2,b*u+u/2);c.rotate(Math.sin(phase+a*.3+b*.3)*Math.PI);c.beginPath();c.arc(0,0,u*.43,0,Math.PI);c.fill();c.restore()}}c.restore()}
const openingTitle=document.querySelector('.opening-title');
const palettes=[['#edff43','#17633c'],['#f6a3e7','#3825dc'],['#f4efe4','#ee532d'],['#edff43','#2923dc']];
const ease=v=>{v=Math.max(0,Math.min(1,v));return v<.5?8*v*v*v*v:1-Math.pow(-2*v+2,4)/2};
function meshPoint(u,v,state){
 const x=u*2-1,y=v*2-1;
 if(state===0)return [u+.045*Math.sin(v*Math.PI*2),v+.055*Math.sin(u*Math.PI*2)];
 if(state===1)return [u+.12*Math.sin(v*Math.PI),v+.10*Math.sin(u*Math.PI*2)];
 if(state===2){const theta=x*Math.PI*.8-Math.PI/2,r=.13+v*.78;return [.5+Math.cos(theta)*r,.92+Math.sin(theta)*r]}
 return [u+.07*Math.sin(v*Math.PI*3),v+.06*Math.sin(u*Math.PI*3)];
}
function openingDraw(){if(oc.style.visibility==='hidden')return;const[w,h,d]=size(oc);ox.setTransform(d,0,0,d,0,0);
 const beat=t/2.4,stage=Math.floor(beat),fraction=beat-stage,from=stage%4,to=(from+1)%4;
 const k=ease((fraction-.25)/.65),pal=palettes[Math.floor(t/9.6)%4];
 ox.fillStyle=pal[0];ox.fillRect(0,0,w,h);ox.fillStyle=pal[1];
 const cols=12,rows=8,ww=w*1.35,hh=h*1.35,offsetX=(w-ww)/2,offsetY=(h-hh)/2;
 function point(u,v){const a=meshPoint(u,v,from),b=meshPoint(u,v,to);return[offsetX+(a[0]+(b[0]-a[0])*k)*ww,offsetY+(a[1]+(b[1]-a[1])*k)*hh]}
 for(let row=0;row<rows;row++)for(let col=0;col<cols;col++)if((row+col)%2===0){ox.beginPath();let first=true;
 const corners=[[col/cols,row/rows],[(col+1)/cols,row/rows],[(col+1)/cols,(row+1)/rows],[col/cols,(row+1)/rows]];
 for(let side=0;side<4;side++){const a=corners[side],b=corners[(side+1)%4];for(let j=0;j<6;j++){const f=j/6,p=point(a[0]+(b[0]-a[0])*f,a[1]+(b[1]-a[1])*f);if(first){ox.moveTo(...p);first=false}else ox.lineTo(...p)}}ox.closePath();ox.fill();ox.strokeStyle=pal[1];ox.lineWidth=.7;ox.stroke()}
 const reveal=stopped?1:ease((t-1.5)/1.8),band=h*(w<600?.37:.34)*reveal;
 ox.fillStyle='#f3f0e7';ox.fillRect(0,h/2-band,w,band*2);
 openingTitle.style.opacity=String(reveal);openingTitle.style.transform='translateY('+(1-reveal)*30+'px)';
}
window.drawAshwoodPattern=pattern;
function render(now){let dt=Math.max(0,Math.min((now-last)/1000,.05));last=now;if(document.hidden||(!canvas.getClientRects().length&&!oc.getClientRects().length&&!dialog.open)){requestAnimationFrame(render);return}if(!stopped&&!document.hidden)t+=dt;blend+=(Number(unite)-blend)*(stopped?1:Math.min(1,dt*5));const[w,h,d]=size(canvas);ctx.setTransform(d,0,0,d,0,0);ctx.clearRect(0,0,w,h);const cols=innerWidth<=750?2:3,rows=6/cols;
items.forEach((_,i)=>{const x=i%cols*w/cols,y=Math.floor(i/cols)*h/rows;const destX=w/2+Math.cos(i*Math.PI/3)*w*.25-w*.18,destY=h/2+Math.sin(i*Math.PI/3)*h*.26-h*.24;pattern(ctx,i,x+(destX-x)*blend,y+(destY-y)*blend,w/cols+(w*.36-w/cols)*blend,h/rows+(h*.48-h/rows)*blend,t)});
if(blend>.001){ctx.fillStyle=`rgba(15,15,15,${blend*.68})`;ctx.fillRect(0,0,w,h)}openingDraw();if(dialog.open){const[a,b,z]=size(dc);dx.setTransform(z,0,0,z,0,0);pattern(dx,selected,0,0,a,b,typeof window.ashwoodDetailClock==='number'?(window.ashwoodDetailClock+=stopped?0:dt*.32):t)}requestAnimationFrame(render)}
function open(i){selected=i;const it=items[i];document.querySelector('#detail-title').textContent=it[0];document.querySelector('#detail-number').textContent=`0${i+1} / ${it[1]}`;document.querySelector('#detail-description').textContent=it[5];document.querySelector('#visit').href=it[4];if(!dialog.open)dialog.showModal()}
document.querySelector('.close').onclick=()=>dialog.close();document.querySelector('#next').onclick=()=>open((selected+1)%6);const pause=document.querySelector('#pause');function sync(){pause.textContent=stopped?'모션 재생 ▷':'모션 멈추기 Ⅱ';pause.setAttribute('aria-pressed',String(stopped));document.querySelector('#opening-pause').textContent=pause.textContent;document.querySelector('#opening-pause').setAttribute('aria-pressed',String(stopped))}sync();document.querySelector('#opening-replay').onclick=()=>{t=0;stopped=false;sync();document.querySelector('.opening').scrollIntoView({behavior:'instant'})};document.querySelector('#opening-pause').onclick=()=>{stopped=!stopped;sync()};pause.onclick=()=>{stopped=!stopped;sync()};document.querySelector('#unite').onclick=e=>{unite=!unite;stage.classList.toggle('is-united',unite);grid.inert=unite;document.querySelector('.united').setAttribute('aria-hidden',String(!unite));e.currentTarget.setAttribute('aria-pressed',String(unite));e.currentTarget.textContent=unite?'여섯 서비스로 돌아가기 ↗':'하나로 모아보기 ↗'};requestAnimationFrame(render)})();
