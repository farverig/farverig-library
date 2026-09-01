document.querySelectorAll('#year').forEach(el => el.textContent = new Date().getFullYear());
document.querySelectorAll('.filter-row .chip').forEach(chip => {chip.addEventListener('click',()=>{chip.parentElement.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));chip.classList.add('active');});});
const menu=document.querySelector('#site-menu');const openButton=document.querySelector('.menu-button');const closeButton=document.querySelector('.menu-close');if(menu&&openButton){const closeMenu=()=>{menu.hidden=true;openButton.setAttribute('aria-expanded','false');document.body.style.overflow='';};openButton.addEventListener('click',()=>{menu.hidden=false;openButton.setAttribute('aria-expanded','true');document.body.style.overflow='hidden';});closeButton?.addEventListener('click',closeMenu);menu.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));}

const scrollVideos=document.querySelectorAll('[data-scroll-video]');
scrollVideos.forEach(video=>{
  const section=video.closest('.book-shot');
  if(!section)return;
  let duration=0;
  let ticking=false;
  const update=()=>{
    ticking=false;
    if(!duration)return;
    const rect=section.getBoundingClientRect();
    const maxScroll=section.offsetHeight-window.innerHeight;
    if(maxScroll<=0)return;
    const progress=Math.min(1,Math.max(0,-rect.top/maxScroll));
    const target=progress*Math.max(0,duration-.05);
    if(Number.isFinite(target)&&Math.abs(video.currentTime-target)>.025){
      try{video.currentTime=target;}catch(e){}
    }
  };
  const requestUpdate=()=>{if(!ticking){ticking=true;requestAnimationFrame(update);}};
  video.addEventListener('loadedmetadata',()=>{
    duration=video.duration||0;
    if(duration>0){section.classList.add('ready');update();}
  });
  video.addEventListener('error',()=>section.classList.remove('ready'));
  window.addEventListener('scroll',requestUpdate,{passive:true});
  window.addEventListener('resize',requestUpdate);
});
