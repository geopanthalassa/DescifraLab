/* DescifraLab · claridad.js: unidades sin cortar, formulas con titulo y mapas claros en celular */
(function(){
  function ready(f){if(document.readyState!=='loading')f();else document.addEventListener('DOMContentLoaded',f);}
  ready(function(){
    try{unidades();}catch(e){}
    try{formulas();}catch(e){}
    try{mapas();}catch(e){}
    try{mapasCm();}catch(e){}
    try{juegos();}catch(e){}
  });
  function unidades(){
    var U='m\\/s²|m\\/s2|m\\/s|km\\/h|km\\/s|kg|mol|Hz|kHz|Pa|kPa|J|kJ|W|kW|N|V|Ω|°C|K|cm³|cm²|cm|mm|km|m²|m³|mL|L|s|g|A';
    var re=new RegExp('(\\d)\\s+('+U+')(?![A-Za-zÁ-úÑñ0-9²³])','g');
    var re2=new RegExp('(^|[\\s(])(\\d[\\d.,]*\\s?(?:'+U+'))(?![A-Za-zÁ-úÑñ0-9²³])','g');
    var roots=document.querySelectorAll('.resolucion, .paso-r, .readout, .card p, .card li, .formula-box, .leyenda-item, .exercises details');
    var seen=new Set();
    roots.forEach(function(r){
      var w=document.createTreeWalker(r,NodeFilter.SHOW_TEXT,{acceptNode:function(n){
        var p=n.parentNode;if(!p||/^(SCRIPT|STYLE|INPUT|TEXTAREA|OPTION|SELECT|BUTTON)$/.test(p.nodeName))return NodeFilter.FILTER_REJECT;
        if(p.closest&&p.closest('svg,.u-nw'))return NodeFilter.FILTER_REJECT;return NodeFilter.FILTER_ACCEPT;}});
      var nodes=[];while(w.nextNode())nodes.push(w.currentNode);
      nodes.forEach(function(n){
        if(seen.has(n))return;seen.add(n);
        var t=n.nodeValue;if(!/\d\s*[A-Za-zΩ°]/.test(t))return;
        var out=t.replace(re,'$1 $2');
        if(out!==t)n.nodeValue=out;
        var m=re2.test(out);re2.lastIndex=0;
        if(m&&out.indexOf('\n')<0&&n.parentNode.nodeName!=='DETAILS'){
          var frag=document.createDocumentFragment(),last=0,x;
          while((x=re2.exec(out))){var s=x.index+x[1].length;
            frag.appendChild(document.createTextNode(out.slice(last,s)));
            var sp=document.createElement('span');sp.className='u-nw';sp.textContent=x[2];frag.appendChild(sp);last=s+x[2].length;}
          frag.appendChild(document.createTextNode(out.slice(last)));
          if(n.parentNode&&last>0)n.parentNode.replaceChild(frag,n);
          re2.lastIndex=0;
        }
      });
    });
  }
  function formulas(){
    var COL=['#B8842E','#2F6B5E','#7A4FB0','#2A6FA8','#C0562E'];
    document.querySelectorAll('.card').forEach(function(card){
      var fbs=[].slice.call(card.querySelectorAll(':scope > .formula-box'));
      var ley=card.querySelectorAll(':scope > .formula-leyenda .leyenda-item');
      fbs.forEach(function(fb,i){
        if(fbs.length>1&&fbs.length===ley.length)fb.style.setProperty('--fc',COL[i%COL.length]);
        else if(fbs.length>1)fb.style.setProperty('--fc',COL[i%COL.length]);
        if(fb.children.length)return;
        var t=fb.textContent.trim(),i1=t.indexOf(' — ');
        if(i1>0&&i1<20){
          var label=t.slice(0,i1),rest=t.slice(i1+3),i2=rest.indexOf(': ');
          if(i2>0&&i2<30&&rest.indexOf('=')>i2){label+=' — '+rest.slice(0,i2);rest=rest.slice(i2+2);}
          fb.innerHTML='';
          var a=document.createElement('span');a.className='fb-l';a.textContent=label;
          var b=document.createElement('span');b.className='fb-f';b.textContent=rest;
          fb.appendChild(a);fb.appendChild(b);
        }
      });
    });
  }
  function mapas(){
    document.querySelectorAll('.mapa-organico').forEach(function(map){
      if(map.nextElementSibling&&map.nextElementSibling.classList.contains('mapa-m'))return;
      var core=map.querySelector('.mo-core'),br=[].slice.call(map.querySelectorAll('.mo-branch')),tp=[].slice.call(map.querySelectorAll('.mo-topic'));
      if(!br.length)return;
      var wrap=document.createElement('div');wrap.className='mapa-m';
      var ct=core?(core.querySelector('.mo-core-title')?core.querySelector('.mo-core-title').textContent:core.textContent.trim()):'';
      var cs=core&&core.querySelector('.mo-core-sub')?core.querySelector('.mo-core-sub').textContent:'';
      var h='<span class="mm-core"><b></b><small></small></span><div class="mm-trunk"></div>';
      wrap.innerHTML=h;wrap.querySelector('b').textContent=ct;wrap.querySelector('small').textContent=cs||'mapa principal';
      var trunk=wrap.querySelector('.mm-trunk');
      br.forEach(function(b){
        var col=getComputedStyle(b).backgroundColor;
        var box=document.createElement('div');box.className='mm-br';box.style.setProperty('--c',col);
        var hd=document.createElement('button');hd.type='button';hd.className='mm-head';hd.textContent=txt(b);
        hd.addEventListener('click',function(){b.click();});box.appendChild(hd);
        var bd=document.createElement('div');bd.className='mm-body';
        var mine=tp.filter(function(t){return t.getAttribute('data-target')===b.getAttribute('data-target')&&(b.getAttribute('data-target')||sameColor(t,b));});
        if(!mine.length)mine=tp.filter(function(t){return sameColor(t,b);});
        mine.forEach(function(t){var c=document.createElement('button');c.type='button';c.className='mm-chip';c.textContent=txt(t);c.addEventListener('click',function(){t.click();});bd.appendChild(c);});
        if(mine.length)box.appendChild(bd);else hd.style.borderRadius='14px';
        trunk.appendChild(box);
      });
      map.parentNode.insertBefore(wrap,map.nextSibling);
    });
  }
  function txt(el){var c=el.cloneNode(true);[].slice.call(c.querySelectorAll('br')).forEach(function(b){b.replaceWith(' ');});return c.textContent.replace(/\s+/g,' ').trim();}

  function mapasCm(){
    document.querySelectorAll('.cm').forEach(function(cm){
      if(cm.nextElementSibling&&cm.nextElementSibling.classList.contains('mapa-m'))return;
      var core=cm.querySelector('.cm-core'),list=cm.querySelector('.cm-list');if(!list)return;
      var wrap=document.createElement('div');wrap.className='mapa-m';
      var cn=core?core.cloneNode(true):null,sm=cn&&cn.querySelector('small'),subt=sm?sm.textContent:'';if(sm)sm.remove();
      var coreA=document.createElement(core&&core.getAttribute('href')?'a':'span');coreA.className='mm-core';if(core&&core.getAttribute('href')){coreA.href=core.getAttribute('href');coreA.style.textDecoration='none';coreA.style.color='#fff';}
      coreA.innerHTML='<b></b><small></small>';coreA.querySelector('b').textContent=cn?cn.textContent.trim():'';coreA.querySelector('small').textContent=subt||'mapa conceptual';
      wrap.appendChild(coreA);var trunk=document.createElement('div');trunk.className='mm-trunk';wrap.appendChild(trunk);
      [].slice.call(list.children).forEach(function(li){
        var b=li.querySelector(':scope > .cm-branch');if(!b)return;
        var col=getComputedStyle(b).backgroundColor;
        var box=document.createElement('div');box.className='mm-br';box.style.setProperty('--c',col);
        var hd=document.createElement('a');hd.className='mm-head';hd.href=b.getAttribute('href')||'#';hd.style.textDecoration='none';
        var bc=b.cloneNode(true),bs=bc.querySelector('small'),sub=bs?bs.textContent:'';if(bs)bs.remove();
        hd.textContent=bc.textContent.replace(/\s+/g,' ').trim();
        if(sub){var s=document.createElement('span');s.className='mm-sub';s.textContent=sub;hd.appendChild(s);}
        box.appendChild(hd);
        var tops=li.querySelectorAll('.cm-topic'),bd=document.createElement('div');bd.className='mm-body';
        [].slice.call(tops).forEach(function(t){var c=document.createElement('a');c.className='mm-chip';c.href=t.getAttribute('href')||'#';c.style.textDecoration='none';c.textContent=t.textContent.replace(/\s+/g,' ').trim();bd.appendChild(c);});
        if(tops.length)box.appendChild(bd);else hd.style.borderRadius='14px';
        trunk.appendChild(box);
      });
      cm.parentNode.insertBefore(wrap,cm.nextSibling);
    });
  }

  /* juegos y simuladores */
  function juegos(){
    var gN=0;var SIM=/^(simulaci|simulador|manipulable|experimento|generador|visual)/i;
    document.querySelectorAll('.card').forEach(function(c){
      var t=c.getAttribute('data-tag')||'',h=c.querySelector('h2,h3'),ht=h?h.textContent:'';
      if(/^juego/i.test(t)||/^(juego|reto|desaf)/i.test(ht.trim())){c.classList.add('jg');if(/^juego/i.test(t)){gN++;c.id='juego-'+gN;}watch(c);}
      else if(SIM.test(t)){c.classList.add('sm');}
    });
    if(/^#juego-\d+$/.test(location.hash)){setTimeout(function(){var e=document.getElementById(location.hash.slice(1));if(e)e.scrollIntoView({block:'center'});},350);}
  }
  function watch(c){
    c.querySelectorAll('.readout').forEach(function(r){
      new MutationObserver(function(){
        var x=(r.textContent||'').trim();
        r.classList.remove('ok','bad');
        if(/^¡?(correcto|bien|exacto|muy bien)/i.test(x)){void r.offsetWidth;r.classList.add('ok');confeti(c);}
        else if(/^(no\b|no[.,]|incorrecto|casi|error)/i.test(x)){void r.offsetWidth;r.classList.add('bad');}
      }).observe(r,{childList:true,characterData:true,subtree:true});
    });
  }
  function confeti(c){
    if(window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches)return;
    var cols=['#FFD23F','#3DDCFF','#7CFF6B','#FF7AA8','#B79CFF','#FF8A3D'];
    for(var i=0;i<26;i++){var s=document.createElement('span');s.className='jg-conf';
      s.style.left=(10+Math.random()*80)+'%';s.style.background=cols[i%cols.length];
      s.style.setProperty('--dx',(Math.random()*160-80)+'px');s.style.setProperty('--dr',(Math.random()*720-360)+'deg');
      s.style.animationDelay=(Math.random()*.15)+'s';c.appendChild(s);
      (function(e){setTimeout(function(){e.remove();},1400);})(s);}
  }
  function sameColor(a,b){var ca=(a.className.match(/mo-c-\S+/)||[''])[0],cb=(b.className.match(/mo-c-\S+/)||[''])[0];return ca&&ca===cb;}
})();
