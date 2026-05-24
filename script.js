window.addEventListener('load',()=>setTimeout(()=>document.querySelector('.preloader').classList.add('hide'),650));
const cursor=document.querySelector('.cursor');
window.addEventListener('mousemove',e=>{cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px'});
let lastY=0;const topbar=document.getElementById('topbar');
window.addEventListener('scroll',()=>{const y=scrollY;topbar.classList.toggle('hide',y>lastY&&y>160);lastY=y});
const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target)}}),{threshold:.16});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
const countIO=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;entry.target.querySelectorAll('[data-count]').forEach(el=>{const target=+el.dataset.count;let n=0;const step=Math.max(1,Math.ceil(target/70));const t=setInterval(()=>{n+=step;if(n>=target){n=target;clearInterval(t)}el.textContent=n+(target===100?'%':'')},22)});countIO.unobserve(entry.target)}));
const stats=document.querySelector('.heroStats'); if(stats) countIO.observe(stats);
// premium rain
const canvas=document.getElementById('rainCanvas'),ctx=canvas.getContext('2d');let drops=[];function size(){canvas.width=innerWidth;canvas.height=innerHeight;const amount=innerWidth<800?115:240;drops=Array.from({length:amount},()=>({x:Math.random()*canvas.width,y:Math.random()*canvas.height,l:Math.random()*28+18,s:Math.random()*7+6,o:Math.random()*.48+.24,w:Math.random()*1.2+.55}))}size();addEventListener('resize',size);
function rain(){ctx.clearRect(0,0,canvas.width,canvas.height);for(const d of drops){ctx.strokeStyle='rgba(255,229,178,.72)';ctx.lineWidth=d.w;ctx.globalAlpha=d.o;ctx.beginPath();ctx.moveTo(d.x,d.y);ctx.lineTo(d.x+3.5,d.y+d.l);ctx.stroke();ctx.globalAlpha=d.o*.22;ctx.strokeStyle='rgba(255,255,255,.55)';ctx.beginPath();ctx.moveTo(d.x-1,d.y-2);ctx.lineTo(d.x+2,d.y+d.l*.55);ctx.stroke();d.y+=d.s;d.x+=.55;if(d.y>canvas.height){d.y=-35;d.x=Math.random()*canvas.width}}requestAnimationFrame(rain)}rain();
// magnetic buttons
for(const b of document.querySelectorAll('.magnetic')){b.addEventListener('mousemove',e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.12}px,${(e.clientY-r.top-r.height/2)*.18}px)`});b.addEventListener('mouseleave',()=>b.style.transform='')}
