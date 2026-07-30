(() => {
  'use strict';
  const root=document.documentElement, body=document.body;
  const themeButton=document.querySelector('#theme-toggle');
  const menuButton=document.querySelector('.menu-toggle');
  const jumpButton=document.querySelector('.chapter-jump-toggle');
  const menu=document.querySelector('#chapter-menu');
  const chapters=[...document.querySelectorAll('.chapter')];
  const links=[...document.querySelectorAll('.chapter-menu a')];
  const progress=document.querySelector('#progress-bar');
  const progressLabel=document.querySelector('#progress-label');

  const setTheme=theme=>{
    root.dataset.theme=theme;
    localStorage.setItem('tempo-wdd-theme',theme);
    themeButton.setAttribute('aria-label',theme==='dark'?'Activer le mode clair':'Activer le mode sombre');
    document.querySelector('meta[name="theme-color"]').content=theme==='dark'?'#071225':'#F7F2E8';
  };
  setTheme(root.dataset.theme);
  themeButton.addEventListener('click',()=>setTheme(root.dataset.theme==='dark'?'light':'dark'));
  document.querySelector('#print-button').addEventListener('click',()=>window.print());
  const setMenu=open=>{body.classList.toggle('menu-open',open);menuButton.setAttribute('aria-expanded',String(open));jumpButton.setAttribute('aria-expanded',String(open));};
  menuButton.addEventListener('click',()=>setMenu(!body.classList.contains('menu-open')));
  jumpButton.addEventListener('click',()=>setMenu(!body.classList.contains('menu-open')));
  links.forEach(link=>link.addEventListener('click',()=>setMenu(false)));
  addEventListener('keydown',event=>{if(event.key==='Escape')setMenu(false);});

  const activate=id=>{links.forEach(link=>link.classList.toggle('active',link.hash===`#${id}`));const chapter=document.querySelector(`#${id}`)?.dataset.chapter||'01';progressLabel.textContent=`${chapter} / 12`;};
  const observer=new IntersectionObserver(entries=>{const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(visible)activate(visible.target.id);},{rootMargin:'-20% 0px -55%',threshold:[0,.15,.4,.7]});
  chapters.forEach(chapter=>observer.observe(chapter));
  const updateProgress=()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=`${max?Math.min(100,scrollY/max*100):0}%`;};
  addEventListener('scroll',updateProgress,{passive:true}); updateProgress();

  document.querySelectorAll('.site-node').forEach(node=>node.addEventListener('click',()=>{
    document.querySelectorAll('.site-node').forEach(n=>n.classList.remove('active'));node.classList.add('active');
    document.querySelector('#node-index').textContent=String(node.dataset.node).padStart(2,'0');
    document.querySelector('#node-label').textContent=node.dataset.label||'Architecture Tempo';
    document.querySelector('#node-title').textContent=node.dataset.title||node.querySelector('b')?.textContent||'Tempo';
    document.querySelector('#node-copy').textContent=node.dataset.copy||'';
  }));
  document.querySelectorAll('.flow-step').forEach(step=>step.addEventListener('click',()=>{
    document.querySelectorAll('.flow-step').forEach(s=>s.classList.remove('active'));step.classList.add('active');
    const n=String(step.dataset.flow).padStart(2,'0');
    document.querySelector('#flow-label').textContent=`Étape ${n} / 11`;
    document.querySelector('#flow-title').textContent=step.dataset.title||'';
    document.querySelector('#flow-description').textContent=step.dataset.description||'';
  }));

  const video=document.querySelector('#tempo-prototype-video');
  const fallback=document.querySelector('.video-fallback');
  const showFallback=()=>{video.hidden=true;fallback.hidden=false;};
  video.addEventListener('loadeddata',()=>{fallback.hidden=true;video.hidden=false;});
  video.addEventListener('error',showFallback);video.querySelector('source')?.addEventListener('error',showFallback);
  setTimeout(()=>{if(video.readyState===0)showFallback();},800);
})();
