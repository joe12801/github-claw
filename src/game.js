// 简单 FC 风格热血格斗原型（单机，Canvas）
// Controls: ← → (move), ↑ (jump), Z (attack), X (special)
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const W = canvas.width, H = canvas.height;
const GROUND_Y = H - 48;
let keys = {};

addEventListener('keydown', e=>{ keys[e.key]=true; e.preventDefault(); });
addEventListener('keyup', e=>{ keys[e.key]=false; });

function rectIntersect(a,b){
  return a.x < b.x+b.w && a.x+a.w > b.x && a.y < b.y+b.h && a.y+a.h > b.y;
}

class Actor{
  constructor(x,y,w,h,color){
    this.x=x;this.y=y;this.w=w;this.h=h;this.color=color;
    this.vx=0;this.vy=0;this.hp=100;this.maxHp=100;this.facing=1;this.onGround=false;
    this.attackTimer=0;this.attackCooldown=0;this.score=0;
  }
  box(){return {x:this.x,y:this.y,w:this.w,h:this.h}};
  attackBox(){
    const aw = 28, ah = 16, ax = this.facing>0 ? this.x+this.w : this.x-aw;
    return {x:ax, y:this.y + this.h/2 - ah/2, w:aw, h:ah};
  }
}

const player = new Actor(80, GROUND_Y-64, 28, 48, '#ffdd55');
player.specialMeter=0;
let enemies = [];
let spawnTimer = 0;
let gameOver=false;

function spawnEnemy(){
  const ex = Math.random()>0.5 ? W-80 : 40;
  const e = new Actor(ex, GROUND_Y-48, 28, 48, '#ff6b6b');
  e.vx = 0; e.aiTimer = 0; e.attackPower = 12; e.score=50;
  enemies.push(e);
}

function update(dt){
  if(gameOver) return;
  // input
  let moving=false;
  if(keys['ArrowLeft']){ player.vx = -140; player.facing = -1; moving=true }
  else if(keys['ArrowRight']){ player.vx = 140; player.facing = 1; moving=true }
  else player.vx = 0;
  if(keys['ArrowUp'] && player.onGround){ player.vy = -320; player.onGround=false }

  // attack
  if(keys['z'] || keys['Z']){
    if(player.attackCooldown<=0){ player.attackTimer = 12; player.attackCooldown = 18; }
  }
  if(player.attackCooldown>0) player.attackCooldown -= dt*60;
  if(player.attackTimer>0) player.attackTimer -= dt*60;
  // special (simple charged hit)
  if(keys['x']||keys['X']){ player.specialMeter = Math.min(100, player.specialMeter + dt*40); }
  else if(player.specialMeter>=100){
    // release special
    player.attackTimer = 30; player.attackCooldown = 30; player.specialMeter=0;
    // wide attack
    enemies.forEach(en=>{ if(rectIntersect(en.box(), {x:player.x-80,y:player.y-20,w:player.w+160,h:player.h+40})) en.hp -= 40 });
  }

  // physics
  player.vy += 900*dt; player.x += player.vx*dt; player.y += player.vy*dt;
  if(player.y + player.h >= GROUND_Y){ player.y = GROUND_Y - player.h; player.vy=0; player.onGround=true }
  player.x = Math.max(8, Math.min(W-player.w-8, player.x));

  // enemy AI and update
  for(let i=enemies.length-1;i>=0;i--){
    const e = enemies[i];
    const dx = (player.x - e.x);
    e.aiTimer += dt;
    if(Math.abs(dx) > 40) e.vx = Math.sign(dx)*60;
    else e.vx = 0;
    // move
    e.vy += 900*dt; e.x += e.vx*dt; e.y += e.vy*dt;
    if(e.y + e.h >= GROUND_Y){ e.y = GROUND_Y - e.h; e.vy=0 }
    // attack player if close
    if(Math.abs(player.x - e.x) < 36 && Math.abs(player.y - e.y) < 20 && e.aiTimer>1.0){
      player.hp -= e.attackPower; e.aiTimer = 0;
    }
    // check being hit by player
    if(player.attackTimer>0){
      const ab = player.attackBox();
      if(rectIntersect(ab, e.box())){ e.hp -= (player.attackTimer>20?24:14); player.score += 10 }
    }
    if(e.hp<=0){ player.score += e.score; enemies.splice(i,1) }
  }

  // spawn
  spawnTimer -= dt;
  if(spawnTimer <= 0){ spawnEnemy(); spawnTimer = 1.6 + Math.random()*1.2 }

  // death
  if(player.hp<=0) gameOver=true;
}

function draw(){
  // clear
  ctx.fillStyle = '#6fa3ff'; ctx.fillRect(0,0,W,H);
  // ground
  ctx.fillStyle = '#2d2f36'; ctx.fillRect(0, GROUND_Y, W, H-GROUND_Y);
  // player
  ctx.fillStyle = player.color; ctx.fillRect(player.x, player.y, player.w, player.h);
  // player attack box
  if(player.attackTimer>0){ const ab = player.attackBox(); ctx.fillStyle='rgba(255,255,255,0.4)'; ctx.fillRect(ab.x,ab.y,ab.w,ab.h) }
  // enemies
  enemies.forEach(e=>{ ctx.fillStyle=e.color; ctx.fillRect(e.x,e.y,e.w,e.h); });
  // HUD
  ctx.fillStyle='#000a'; ctx.fillRect(6,6,220,52);
  // HP bar
  ctx.fillStyle='#222'; ctx.fillRect(12,12,200,12);
  ctx.fillStyle='#ff6b6b'; ctx.fillRect(12,12,200*(player.hp/player.maxHp),12);
  ctx.fillStyle='#fff'; ctx.font='12px monospace'; ctx.fillText('HP: '+Math.max(0,Math.floor(player.hp)),16,36);
  ctx.fillText('Score: '+player.score,110,36);
  // special meter
  ctx.fillStyle='#222'; ctx.fillRect(12,44,200,6);
  ctx.fillStyle='#ffd166'; ctx.fillRect(12,44,200*(player.specialMeter/100),6);

  if(gameOver){ ctx.fillStyle='rgba(0,0,0,0.6)'; ctx.fillRect(0,0,W,H); ctx.fillStyle='#fff'; ctx.font='28px monospace'; ctx.fillText('GAME OVER', W/2-80, H/2); }
}

let last=0; function loop(t){
  if(!last) last=t; const dt = Math.min(1/30, (t-last)/1000); last=t;
  update(dt); draw(); requestAnimationFrame(loop);
}

// init
spawnTimer = 0.6;
for(let i=0;i<2;i++) spawnEnemy();
requestAnimationFrame(loop);
