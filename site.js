import { firebaseConfig } from "./firebase-config.js";
import {THEME_PRESETS, MONTHLY_THEMES} from "./theme-presets.js";

const DEFAULT={hero:{eyebrow:"a little corner of the internet, kept warm",heading:"Where handwritten letters, moonlit stories, and golden sunflowers bloom.",lead:"Welcome to Moony Sunflowers — a soft place for words, paper, tiny dreams, and the people who make them worth writing.",letterGreeting:"Dear little reader,",letterBody:"If you've wandered here looking for a quiet place, you may stay awhile. There are stories tucked in drawers, and a moon that never minds if you arrive late.",signature:"— Dimple ♡"},books:[{title:"Your Book Title",kind:"featured book",description:"Replace this with the real blurb.",cover:"",button:"Order / Support"},{title:"Another Book Title",kind:"co-authored",description:"Add your anthology details.",cover:"",button:"Order / Support"},{title:"A Future Book",kind:"from the writing desk",description:"Use this for a forthcoming release.",cover:"",button:"DM to enquire"}],stories:[{category:"poetry",title:"The Moon Keeps Letters",description:"For every unsent thing, there is a night sky willing to keep it safe.",body:"Some nights, I imagine the moon is an old post office.\\n\\nIt receives all the letters we never sent."},{category:"short",title:"The Post Office at 7 PM",description:"A tiny tale about an almost-missed letter.",body:"At seven, the post office smelled of rain, paper and someone's jasmine perfume."},{category:"musing",title:"Why I Still Write Letters",description:"On slowness, handwriting, and the strange intimacy of ink.",body:"Writing a letter asks us to slow down enough to notice our own handwriting."}],magazine:[{issue:"Issue 01",title:"Moon Notes — Issue 01",date:"January 2026",url:"",cover:""},{issue:"Issue 02",title:"Sunflower Mail — Issue 02",date:"February 2026",url:"",cover:""},{issue:"Issue 03",title:"Letters to Spring — Issue 03",date:"March 2026",url:"",cover:""}],links:{snailMail:"",community:"",instagramDm:"https://ig.me/m/dimple_writes07",instagram:"https://www.instagram.com/dimple_writes07/",goodreads:"",amazon:""},payment:{upi:"dimplelokhande@fam",name:"Dimple"},theme:{base:"#CDE0C9",accent:"#E8A838",paper:"#FAF6EE",ink:"#2C221E",plum:"#3B222E",logo:"assets/moony_sunflowers_logo.png",authorPhoto:"assets/dimple_author_photo.png",qr:"assets/upi_scanner_qr.jpeg",headingFont:"Playfair Display",bodyFont:"Plus Jakarta Sans",scriptFont:"Caveat",radius:"28px",mode:"manual",active:"evergreen-library"}};
let state=DEFAULT;
const esc=s=>String(s||"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function merge(a,b){return {...a,...b,hero:{...a.hero,...(b.hero||{})},links:{...a.links,...(b.links||{})},payment:{...a.payment,...(b.payment||{})},theme:{...a.theme,...(b.theme||{})}}}
function render(){
 document.documentElement.style.setProperty("--base",state.theme.base);document.documentElement.style.setProperty("--accent",state.theme.accent);document.documentElement.style.setProperty("--paper",state.theme.paper);document.documentElement.style.setProperty("--ink",state.theme.ink);document.documentElement.style.setProperty("--plum",state.theme.plum);document.documentElement.style.setProperty("--heading-font",`"${state.theme.headingFont||"Playfair Display"}",serif`);document.documentElement.style.setProperty("--body-font",`"${state.theme.bodyFont||"Plus Jakarta Sans"}",sans-serif`);document.documentElement.style.setProperty("--script-font",`"${state.theme.scriptFont||"Caveat"},cursive`);document.documentElement.style.setProperty("--theme-radius",state.theme.radius||"28px");
 [["heroEyebrow","eyebrow"],["heroHeading","heading"],["heroLead","lead"],["letterGreeting","letterGreeting"],["letterBody","letterBody"],["signature","signature"]].forEach(([id,k])=>document.getElementById(id).textContent=state.hero[k]);
 document.getElementById("siteLogo").src=state.theme.logo||"assets/moony_sunflowers_logo.png";
 document.getElementById("authorPhoto").src=state.theme.authorPhoto||"assets/dimple_author_photo.png";
 document.getElementById("qr").src=state.theme.qr||"assets/upi_scanner_qr.jpeg";
 document.getElementById("upiId").textContent=state.payment.upi;
 document.getElementById("upiPay").href=`upi://pay?pa=${encodeURIComponent(state.payment.upi)}&pn=${encodeURIComponent(state.payment.name)}&cu=INR`;
 ["dmHero","dmPay","dmFooter"].forEach(id=>document.getElementById(id).href=state.links.instagramDm);
 document.getElementById("ig").href=state.links.instagram;
 document.getElementById("goodreads").href=state.links.goodreads||"#";document.getElementById("amazon").href=state.links.amazon||"#";
 document.getElementById("mailForm").src=state.links.snailMail;document.getElementById("mailForm").parentElement.classList.toggle("has-form",!!state.links.snailMail);
 document.getElementById("communityForm").src=state.links.community;document.getElementById("communityForm").parentElement.classList.toggle("has-form",!!state.links.community);
 document.getElementById("booksGrid").innerHTML=state.books.map((b,i)=>`<article class="book card"><div class="cover" ${b.cover?`style="background-image:url('${esc(b.cover)}');background-size:cover;background-position:center"`:""}><b>${esc(b.title)}</b><small>${esc(b.kind)}</small></div><div class="bookinfo"><p class="tiny">${esc(b.kind)}</p><h3>${esc(b.title)}</h3><p>${esc(b.description)}</p><a class="btn primary" href="${b.button&&b.button.toLowerCase().includes("dm")?esc(state.links.instagramDm):"#support"}">${esc(b.button||"Order / Support")}</a></div></article>`).join("");
 document.getElementById("storiesGrid").innerHTML=state.stories.map((s,i)=>`<article class="story" data-cat="${esc(s.category)}" data-title="${esc(s.title)}"><span class="tag">${esc(s.category)}</span><h3>${esc(s.title)}</h3><p>${esc(s.description)}</p><button data-story="${i}">Read slowly →</button></article>`).join("");
 document.getElementById("magGrid").innerHTML=state.magazine.map((m,i)=>`<article class="magcard card"><div class="magcover" ${m.cover?`style="background-image:url('${esc(m.cover)}');background-size:cover;background-position:center"`:""}><span>${esc(m.issue)}</span><b>${esc(m.title)}</b><small>${esc(m.date)}</small></div><button class="btn primary" data-mag="${i}">Open issue</button></article>`).join("");
 document.querySelectorAll("[data-story]").forEach(b=>b.onclick=()=>{let s=state.stories[+b.dataset.story];document.getElementById("readerBody").innerHTML=`<h2>${esc(s.title)}</h2>${s.body.split("\\n").map(p=>`<p>${esc(p)}</p>`).join("")}`;document.getElementById("reader").showModal()});
 document.querySelectorAll("[data-mag]").forEach(b=>b.onclick=()=>{let u=state.magazine[+b.dataset.mag].url;if(!u)return toast("Add a Heyzine or PDF URL in Admin Panel.");document.getElementById("magFrame").src=u;document.getElementById("magModal").showModal()});
}
function toast(x){let t=document.getElementById("toast");t.textContent=x;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200)}
async function load(){
 try{let saved=JSON.parse(localStorage.getItem("moonyPublicPreview")||"null");if(saved)state=merge(DEFAULT,saved)}catch{}
 if(firebaseConfig){
  try{
   const [{initializeApp},{getFirestore,doc,getDoc}]=await Promise.all([
    import("https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js"),
    import("https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js")
   ]);
   const app=initializeApp(firebaseConfig),db=getFirestore(app),snap=await getDoc(doc(db,"site","content"));
   if(snap.exists())state=merge(DEFAULT,snap.data());
  }catch(e){console.warn("Firebase public content unavailable; using defaults/local preview.",e)}
 }
 if(state.theme?.mode==="monthly"){const id=MONTHLY_THEMES[new Date().getMonth()+1];if(id&&THEME_PRESETS[id])state.theme={...state.theme,...THEME_PRESETS[id],mode:"monthly",active:id};}
 render();
}
document.getElementById("menu").onclick=()=>document.getElementById("navLinks").classList.toggle("open");
document.getElementById("copyUpi").onclick=async()=>{try{await navigator.clipboard.writeText(state.payment.upi);toast("UPI ID copied ✦")}catch{toast("Please copy the UPI ID manually.")}};
document.querySelectorAll(".tab").forEach(t=>t.onclick=()=>{document.querySelectorAll(".tab").forEach(x=>x.classList.remove("active"));t.classList.add("active");filterStories()});
document.getElementById("search").oninput=filterStories;
function filterStories(){let f=document.querySelector(".tab.active").dataset.filter,q=document.getElementById("search").value.toLowerCase();document.querySelectorAll(".story").forEach(c=>c.hidden=!((f==="all"||c.dataset.cat===f)&&c.dataset.title.toLowerCase().includes(q)))}
document.querySelectorAll(".close").forEach(b=>b.onclick=()=>b.closest("dialog").close());
document.getElementById("readerTheme").onclick=()=>document.querySelector(".reader").classList.toggle("dark");
const quotes=["A story is a room you can return to.","Write the sentence you wish someone had sent you.","Small letters can carry very large feelings.","Keep a little sunlight between the pages.","Somewhere, a future reader is waiting for your words.","Let your unfinished thoughts breathe."];let qi=Math.floor(Math.random()*quotes.length);function quote(){document.getElementById("quote").textContent=quotes[qi]}document.getElementById("newQuote").onclick=()=>{qi=(qi+1)%quotes.length;quote()};quote();document.getElementById("year").textContent=new Date().getFullYear();load();
