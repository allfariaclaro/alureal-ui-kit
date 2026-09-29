const root=document.documentElement;
const themeButton=document.querySelector('[data-theme-toggle]');
const modal=document.querySelector('[data-modal]');
const toast=document.querySelector('[data-toast]');
const openModal=document.querySelector('[data-open-modal]');
const closeModal=document.querySelector('[data-close-modal]');

const preferred=localStorage.getItem('alureal-theme');
if(preferred) root.dataset.theme=preferred;

themeButton?.addEventListener('click',()=>{
  const next=root.dataset.theme==='light'?'dark':'light';
  root.dataset.theme=next; localStorage.setItem('alureal-theme',next);
});

function setModal(open){modal.hidden=!open;document.body.style.overflow=open?'hidden':'';if(open)closeModal?.focus();}
openModal?.addEventListener('click',()=>setModal(true));
closeModal?.addEventListener('click',()=>setModal(false));
modal?.addEventListener('click',e=>{if(e.target===modal)setModal(false)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.hidden)setModal(false)});

document.querySelector('[data-show-toast]')?.addEventListener('click',()=>{
  toast.hidden=false;clearTimeout(window.__toastTimer);window.__toastTimer=setTimeout(()=>toast.hidden=true,3200);
});

// portfolio-polish-2026-09-29
let lastFocused=null;
openModal?.addEventListener('click',()=>{lastFocused=openModal});
closeModal?.addEventListener('click',()=>queueMicrotask(()=>lastFocused?.focus()));
modal?.addEventListener('click',event=>{if(event.target===modal)queueMicrotask(()=>lastFocused?.focus())});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!modal.hidden)queueMicrotask(()=>lastFocused?.focus())});
themeButton?.setAttribute('aria-label','Alternar entre tema claro e escuro');
