/* Menú móvil: tocar en cualquier parte de "Física / Matemática / Química / Material" abre la lista de temas. */
(function(){
  var css='.touch-nav .nav-panel a.nav-panel-link.nav-seeall{display:block!important;font-weight:700;color:var(--amber)!important;border-bottom:1px solid rgba(255,255,255,.2);margin-bottom:6px;padding-bottom:12px}.touch-nav .nav-drop summary .nav-toplink-label{pointer-events:none}.nav-seeall{display:none!important}.navbar-links a.nav-juegos{font-weight:700;color:var(--amber-dark)}'+
  '@media(max-width:768px){'+
  '.nav-drop{width:100%}'+
  '.nav-drop summary{display:flex!important;justify-content:space-between;align-items:center;width:100%;box-sizing:border-box;min-height:48px;padding:0 14px!important;font-size:15.5px!important;font-weight:600!important;font-family:Inter,sans-serif;-webkit-tap-highlight-color:rgba(217,164,67,.25)}'+
  '.nav-drop summary .nav-toplink-label{flex:1;display:block;padding:13px 0!important;pointer-events:none;font-size:inherit!important;font-weight:inherit!important}'+
  '.navbar-links>a{width:100%;box-sizing:border-box;display:flex!important;align-items:center;justify-content:flex-start!important;text-align:left!important;min-height:48px;padding:0 14px!important;font-size:15.5px!important;font-weight:600!important}'+
  '.nav-caret{font-size:16px!important;opacity:.85!important;padding:0 6px!important;transition:transform .2s}'+
  '.nav-drop[open] .nav-caret{transform:rotate(180deg)}'+
  '.nav-panel a.nav-panel-link.nav-seeall{display:block!important;font-weight:700;color:var(--amber)!important;border-bottom:1px solid rgba(255,255,255,.2);margin-bottom:6px;padding-bottom:12px}'+
  '}';
  function init(){
    var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
    var mq=window.matchMedia('(max-width:768px)');
    var tq=window.matchMedia('(hover: none)');
    function tactil(){return mq.matches||tq.matches;}
    if(tq.matches)document.documentElement.classList.add('touch-nav');
    var drops=document.querySelectorAll('.nav-drop');
    drops.forEach(function(d){
      var sum=d.querySelector('summary'),lab=d.querySelector('summary .nav-toplink-label'),panel=d.querySelector('.nav-panel');
      if(lab&&panel&&!panel.querySelector('.nav-seeall')){
        var a=document.createElement('a');a.href=lab.getAttribute('href');a.className='nav-panel-link nav-seeall';a.textContent='Ver todo: '+lab.textContent+' →';
        panel.insertBefore(a,panel.firstChild);
      }
      if(!sum)return;
      sum.addEventListener('click',function(e){
        if(!tactil())return;
        e.preventDefault();
        var willOpen=!d.hasAttribute('open');
        drops.forEach(function(o){if(o!==d)o.removeAttribute('open');});
        if(willOpen){d.setAttribute('open','');try{d.scrollIntoView({block:'nearest',behavior:'smooth'});}catch(x){}}
        else d.removeAttribute('open');
      });
    });
    document.addEventListener('click',function(e){if(!tactil()||mq.matches)return;if(!e.target.closest||!e.target.closest('.nav-drop'))drops.forEach(function(o){o.removeAttribute('open');});});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
