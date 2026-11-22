/* Menú móvil: tocar en cualquier parte de "Física / Matemática / Química / Material" abre la lista de temas. */
(function(){
  var css='.nav-seeall{display:none!important}'+
  '@media(max-width:768px){'+
  '.nav-drop{width:100%}'+
  '.nav-drop summary{display:flex!important;justify-content:space-between;align-items:center;width:100%;box-sizing:border-box;min-height:52px;font-size:16px!important;font-weight:600!important;-webkit-tap-highlight-color:rgba(217,164,67,.25)}'+
  '.nav-drop summary .nav-toplink-label{flex:1;display:block;padding:14px 0!important;pointer-events:none}'+
  '.nav-caret{font-size:16px!important;opacity:.85!important;padding:0 6px!important;transition:transform .2s}'+
  '.nav-drop[open] .nav-caret{transform:rotate(180deg)}'+
  '.nav-panel a.nav-panel-link.nav-seeall{display:block!important;font-weight:700;color:var(--amber)!important;border-bottom:1px solid rgba(255,255,255,.2);margin-bottom:6px;padding-bottom:12px}'+
  '}';
  function init(){
    var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
    var mq=window.matchMedia('(max-width:768px)');
    var drops=document.querySelectorAll('.nav-drop');
    drops.forEach(function(d){
      var sum=d.querySelector('summary'),lab=d.querySelector('summary .nav-toplink-label'),panel=d.querySelector('.nav-panel');
      if(lab&&panel&&!panel.querySelector('.nav-seeall')){
        var a=document.createElement('a');a.href=lab.getAttribute('href');a.className='nav-panel-link nav-seeall';a.textContent='Ver todo: '+lab.textContent+' →';
        panel.insertBefore(a,panel.firstChild);
      }
      if(!sum)return;
      sum.addEventListener('click',function(e){
        if(!mq.matches)return;
        e.preventDefault();
        var willOpen=!d.hasAttribute('open');
        drops.forEach(function(o){if(o!==d)o.removeAttribute('open');});
        if(willOpen){d.setAttribute('open','');try{d.scrollIntoView({block:'nearest',behavior:'smooth'});}catch(x){}}
        else d.removeAttribute('open');
      });
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
