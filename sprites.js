/* Dibujos vectoriales simples para los simuladores (reemplazan a los emojis). dlSprite(ctx, tipo, x, y, tamaño, color) dibuja centrado en (x, y). */
function dlSprite(ctx,kind,x,y,s,color){
  var k=s/44,INK='#1C2733';
  ctx.save();ctx.translate(x,y);ctx.scale(k,k);ctx.lineWidth=2.4;ctx.strokeStyle=INK;ctx.lineJoin='round';ctx.lineCap='round';
  function rr(a,b,w,h,r,fill){ctx.beginPath();if(ctx.roundRect)ctx.roundRect(a,b,w,h,r);else ctx.rect(a,b,w,h);ctx.fillStyle=fill;ctx.fill();ctx.stroke();}
  function circ(cx,cy,r,fill){ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.fillStyle=fill;ctx.fill();ctx.stroke();}
  function wheel(cx,cy,r){circ(cx,cy,r,'#2B3340');circ(cx,cy,r*.4,'#C9D2DE');}
  switch(kind){
    case 'dot': circ(0,0,15,color||'#FFFFFF');break;
    case 'car':
      rr(-20,-2,40,14,5,'#E0283C');
      ctx.beginPath();ctx.moveTo(-11,-2);ctx.lineTo(-6,-12);ctx.lineTo(8,-12);ctx.lineTo(14,-2);ctx.closePath();ctx.fillStyle='#E0283C';ctx.fill();ctx.stroke();
      ctx.beginPath();ctx.moveTo(-7,-3);ctx.lineTo(-4,-10);ctx.lineTo(1,-10);ctx.lineTo(1,-3);ctx.closePath();ctx.fillStyle='#BFE3FF';ctx.fill();
      ctx.beginPath();ctx.moveTo(4,-3);ctx.lineTo(4,-10);ctx.lineTo(8,-10);ctx.lineTo(11,-3);ctx.closePath();ctx.fill();
      wheel(-11,13,5.5);wheel(11,13,5.5);break;
    case 'plane':
      ctx.beginPath();ctx.ellipse(0,0,21,5.5,0,0,Math.PI*2);ctx.fillStyle='#FFFFFF';ctx.fill();ctx.stroke();
      ctx.beginPath();ctx.moveTo(-2,-1);ctx.lineTo(-10,-16);ctx.lineTo(-5,-16);ctx.lineTo(7,-1);ctx.closePath();ctx.fillStyle='#4C7DFF';ctx.fill();ctx.stroke();
      ctx.beginPath();ctx.moveTo(-2,2);ctx.lineTo(-10,15);ctx.lineTo(-5,15);ctx.lineTo(7,2);ctx.closePath();ctx.fill();ctx.stroke();
      ctx.beginPath();ctx.moveTo(-17,-1);ctx.lineTo(-22,-10);ctx.lineTo(-17,-10);ctx.lineTo(-11,-1);ctx.closePath();ctx.fillStyle='#E0283C';ctx.fill();ctx.stroke();
      circ(13,-1,2.2,'#BFE3FF');break;
    case 'train':
      rr(-22,-8,44,18,3,'#2F5BE0');rr(-4,-18,14,12,2,'#FFC400');rr(-20,-16,6,8,1,'#2B3340');
      ctx.beginPath();ctx.moveTo(22,10);ctx.lineTo(22,0);ctx.lineTo(27,10);ctx.closePath();ctx.fillStyle='#FFC400';ctx.fill();ctx.stroke();
      wheel(-13,13,5.5);wheel(0,13,5.5);wheel(13,13,5.5);break;
    case 'box':
      rr(-17,-15,34,30,3,'#D6A05B');ctx.beginPath();ctx.moveTo(0,-15);ctx.lineTo(0,15);ctx.moveTo(-17,-3);ctx.lineTo(17,-3);ctx.stroke();break;
    case 'truck':
      rr(-22,-14,26,24,2,'#FFC400');rr(4,-6,18,16,3,'#E0283C');
      ctx.beginPath();ctx.moveTo(9,-4);ctx.lineTo(18,-4);ctx.lineTo(18,2);ctx.lineTo(9,2);ctx.closePath();ctx.fillStyle='#BFE3FF';ctx.fill();
      wheel(-12,12,5.5);wheel(14,12,5.5);break;
    case 'cart':
      ctx.beginPath();ctx.moveTo(-18,-12);ctx.lineTo(-12,-12);ctx.lineTo(-8,6);ctx.lineTo(14,6);ctx.lineTo(18,-8);ctx.lineTo(-11,-8);ctx.stroke();
      ctx.beginPath();ctx.moveTo(-9,-8);ctx.lineTo(-8,6);ctx.lineTo(14,6);ctx.lineTo(18,-8);ctx.closePath();ctx.fillStyle='#C9D2DE';ctx.fill();ctx.stroke();
      wheel(-4,13,3.8);wheel(11,13,3.8);break;
    case 'balloon':
      ctx.beginPath();ctx.ellipse(0,-4,13,16,0,0,Math.PI*2);ctx.fillStyle='#FF2E5B';ctx.fill();ctx.stroke();
      ctx.beginPath();ctx.moveTo(0,12);ctx.lineTo(-3,17);ctx.lineTo(3,17);ctx.closePath();ctx.fill();ctx.stroke();
      ctx.beginPath();ctx.moveTo(0,17);ctx.quadraticCurveTo(5,22,0,26);ctx.stroke();break;
    case 'planet':
      circ(0,0,12,'#FF9F43');
      ctx.beginPath();ctx.ellipse(0,0,21,6,-0.35,0,Math.PI*2);ctx.stroke();break;
    case 'atom':
      ctx.beginPath();ctx.ellipse(0,0,20,8,0,0,Math.PI*2);ctx.stroke();
      ctx.beginPath();ctx.ellipse(0,0,20,8,Math.PI/3,0,Math.PI*2);ctx.stroke();
      ctx.beginPath();ctx.ellipse(0,0,20,8,-Math.PI/3,0,Math.PI*2);ctx.stroke();
      circ(0,0,5,'#FF2E5B');break;
    case 'bulb':
      ctx.beginPath();ctx.moveTo(-6,5);ctx.lineTo(-3,-5);ctx.lineTo(0,5);ctx.lineTo(3,-5);ctx.lineTo(6,5);ctx.stroke();break;
    case 'soccer':
      circ(0,0,16,'#FFFFFF');
      ctx.beginPath();ctx.moveTo(0,-6);ctx.lineTo(6,-2);ctx.lineTo(4,5);ctx.lineTo(-4,5);ctx.lineTo(-6,-2);ctx.closePath();ctx.fillStyle=INK;ctx.fill();
      ctx.beginPath();ctx.moveTo(0,-6);ctx.lineTo(0,-16);ctx.moveTo(6,-2);ctx.lineTo(15,-5);ctx.moveTo(4,5);ctx.lineTo(9,13);ctx.moveTo(-4,5);ctx.lineTo(-9,13);ctx.moveTo(-6,-2);ctx.lineTo(-15,-5);ctx.stroke();break;
    case 'skater':
      circ(0,-15,6,'#FFD9A8');rr(-8,-8,16,20,6,'#4C7DFF');
      ctx.beginPath();ctx.moveTo(-5,12);ctx.lineTo(-5,19);ctx.moveTo(5,12);ctx.lineTo(5,19);ctx.stroke();
      ctx.beginPath();ctx.moveTo(-10,20);ctx.lineTo(10,20);ctx.stroke();break;
    case 'diver':
      circ(0,0,12,'#FFD9A8');rr(-10,-5,20,8,4,'#2B3340');ctx.beginPath();ctx.moveTo(-13,-2);ctx.lineTo(-15,-6);ctx.moveTo(13,-2);ctx.lineTo(15,-6);ctx.stroke();break;
  }
  ctx.restore();
}
