import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import {
  ShoppingBag, Heart, User, X, Plus, Minus, ChevronLeft, ChevronRight,
  Instagram, Twitter, Facebook, Search, Menu, ArrowRight, Check,
  Package, Truck, RefreshCw, Mail, Phone, MapPin, Star, Shield, Award,
  Sparkles, Eye, TrendingUp, Filter, ChevronDown
} from "lucide-react";

const ALL_PRODUCTS = [
  { id:1,  name:"Cashmere Oversized Coat",   brand:"Maison Margiela", price:890,  orig:890,  cat:"Clothing",    colors:["#1a1a1a","#8B7355","#C9B99A"], sizes:["XS","S","M","L","XL"], img:"https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=800&q=90", rating:4.9, isNew:true,  sale:false },
  { id:2,  name:"Leather Structured Tote",   brand:"The Row",         price:1200, orig:1200, cat:"Accessories", colors:["#2C1810","#1a1a1a","#D4C5A9"], sizes:["OS"],               img:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=90", rating:5.0, isNew:true,  sale:false },
  { id:3,  name:"Silk Slip Dress",           brand:"Bottega Veneta",  price:390,  orig:650,  cat:"Clothing",    colors:["#C4A882","#1a1a1a","#8B6F47"], sizes:["XS","S","M","L"],   img:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=90", rating:4.8, isNew:false, sale:true  },
  { id:4,  name:"Wool Tailored Blazer",      brand:"Saint Laurent",   price:1500, orig:1500, cat:"Clothing",    colors:["#1a1a1a","#3D2B1F","#6B6B6B"], sizes:["XS","S","M","L","XL"], img:"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=90", rating:4.9, isNew:false, sale:false },
  { id:5,  name:"Knit Cashmere Sweater",     brand:"Loro Piana",      price:380,  orig:380,  cat:"Clothing",    colors:["#C9B99A","#8B7355","#F5F0E8"], sizes:["S","M","L","XL"],   img:"https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=90", rating:4.7, isNew:false, sale:false },
  { id:6,  name:"Leather Ankle Boots",       brand:"Celine",          price:580,  orig:900,  cat:"Accessories", colors:["#1a1a1a","#3D2B1F"],           sizes:["36","37","38","39","40","41"], img:"https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=90", rating:4.8, isNew:false, sale:true  },
  { id:7,  name:"Woven Mini Bag",            brand:"Bottega Veneta",  price:980,  orig:980,  cat:"Accessories", colors:["#C4A882","#1a1a1a"],           sizes:["OS"],               img:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=90", rating:5.0, isNew:true,  sale:false },
  { id:8,  name:"Merino Turtleneck",         brand:"Loro Piana",      price:460,  orig:460,  cat:"Clothing",    colors:["#F5F0E8","#1a1a1a","#8B7355"], sizes:["XS","S","M","L","XL"], img:"https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=90", rating:4.6, isNew:true,  sale:false },
  { id:9,  name:"Gold Chain Necklace",       brand:"Maison Margiela", price:340,  orig:340,  cat:"Accessories", colors:["#BFA46A","#C0C0C0"],           sizes:["OS"],               img:"https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=90", rating:4.9, isNew:false, sale:false },
  { id:10, name:"Tailored Midi Skirt",       brand:"Saint Laurent",   price:490,  orig:490,  cat:"Clothing",    colors:["#1a1a1a","#C4A882","#8B7355"], sizes:["XS","S","M","L"],   img:"https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=800&q=90", rating:4.7, isNew:true,  sale:false },
  { id:11, name:"Merino Wool Scarf",         brand:"Loro Piana",      price:290,  orig:290,  cat:"Accessories", colors:["#C9B99A","#8B7355","#1a1a1a"], sizes:["OS"],               img:"https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800&q=90", rating:4.8, isNew:false, sale:false },
  { id:12, name:"Relaxed Linen Shirt",       brand:"Celine",          price:299,  orig:420,  cat:"Clothing",    colors:["#F5F0E8","#1a1a1a","#C4A882"], sizes:["XS","S","M","L","XL"], img:"https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=90", rating:4.6, isNew:false, sale:true  },
  { id:13, name:"Suede Chelsea Boots",       brand:"The Row",         price:820,  orig:820,  cat:"Accessories", colors:["#8B7355","#1a1a1a"],           sizes:["36","37","38","39","40","41"], img:"https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&q=90", rating:4.8, isNew:true,  sale:false },
  { id:14, name:"Draped Satin Blouse",       brand:"Saint Laurent",   price:520,  orig:520,  cat:"Clothing",    colors:["#F5F0E8","#C4A882","#1a1a1a"], sizes:["XS","S","M","L"],   img:"https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=800&q=90", rating:4.7, isNew:true,  sale:false },
  { id:15, name:"Classic Trench Coat",       brand:"Maison Margiela", price:1100, orig:1400, cat:"Clothing",    colors:["#C9B99A","#1a1a1a","#8B7355"], sizes:["XS","S","M","L","XL"], img:"https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=800&q=90", rating:4.9, isNew:false, sale:true  },
  { id:16, name:"Structured Shoulder Bag",   brand:"Celine",          price:760,  orig:760,  cat:"Accessories", colors:["#1a1a1a","#C4A882","#2C1810"], sizes:["OS"],               img:"https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=90", rating:4.8, isNew:false, sale:false },
];

const LOOKBOOK = [
  { id:1, img:"https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=700&q=90&fit=crop&h=1000", title:"Urban Nomad",    desc:"Oversized coat · Leather boots",  products:[1,6] },
  { id:2, img:"https://images.unsplash.com/photo-1483985988355-763728e1935b?w=700&q=90&fit=crop&h=1000", title:"Parisian Dusk",  desc:"Silk dress · Gold accessories",    products:[3,9] },
  { id:3, img:"https://images.unsplash.com/photo-1509631179647-0177331693ae?w=700&q=90&fit=crop&h=1000", title:"Quiet Luxury",   desc:"Cashmere knit · Tailored coat",    products:[5,1] },
  { id:4, img:"https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=700&q=90&fit=crop&h=1000", title:"The Edit",       desc:"Leather tote · Blazer",            products:[2,4] },
  { id:5, img:"https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=700&q=90&fit=crop&h=1000", title:"Maison Mood",    desc:"Slip dress · Chain necklace",      products:[3,9] },
  { id:6, img:"https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=700&q=90&fit=crop&h=1000", title:"Golden Hour",    desc:"Satin blouse · Midi skirt",        products:[14,10] },
  { id:7, img:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=700&q=90&fit=crop&h=1000", title:"After Dark",     desc:"Silk dress · Ankle boots",         products:[3,6] },
  { id:8, img:"https://images.unsplash.com/photo-1475180098004-ca77a66827be?w=700&q=90&fit=crop&h=1000", title:"Structured Day", desc:"Trench coat · Shoulder bag",       products:[15,16] },
];

const REVIEWS = [
  { id:1, name:"Amelia T.",   loc:"London", rating:5, text:"Absolutely stunning quality. The cashmere coat exceeded every expectation — worth every single penny.", product:"Cashmere Oversized Coat" },
  { id:2, name:"Sophie R.",   loc:"Paris",  rating:5, text:"The silk dress drapes beautifully. LUXE has become my go-to destination for true investment pieces.", product:"Silk Slip Dress" },
  { id:3, name:"Isabella M.", loc:"Milan",  rating:5, text:"Impeccable craftsmanship throughout. The leather tote is completely timeless — I get compliments everywhere I go.", product:"Leather Structured Tote" },
  { id:4, name:"Charlotte B.",loc:"NYC",    rating:5, text:"The trench coat is perfect in every way. Fast shipping, beautiful packaging, and the quality speaks for itself.", product:"Classic Trench Coat" },
];

const sp  = { type:"spring", stiffness:300, damping:30 };
const spF = { type:"spring", stiffness:400, damping:28 };
const ease = [0.2,0.9,0.4,1.1];
const fadeUp = {
  hidden:  { opacity:0, y:36 },
  visible: (i=0) => ({ opacity:1, y:0, transition:{ delay:i*0.07, duration:0.75, ease } }),
};

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Montserrat',sans-serif;cursor:none;background:#070707;overflow-x:hidden;}
html{scroll-behavior:smooth;}
*{cursor:none!important;}
::-webkit-scrollbar{width:3px;}
::-webkit-scrollbar-track{background:#070707;}
::-webkit-scrollbar-thumb{background:rgba(191,164,106,0.3);border-radius:2px;}
.gold{background:linear-gradient(135deg,#BFA46A,#E8D5A3,#8C7540);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
.nav-glass{background:rgba(7,7,7,0.96);backdrop-filter:blur(8px);border-bottom:1px solid rgba(191,164,106,0.28);}
.nav-link{color:#ffffff;font-size:10px;letter-spacing:0.22em;text-transform:uppercase;background:none;border:none;border-bottom:2px solid transparent;padding-bottom:4px;transition:all 0.3s;font-family:'Montserrat',sans-serif;font-weight:500;position:relative;}
.nav-link::after{content:'';position:absolute;bottom:-2px;left:0;width:0;height:2px;background:linear-gradient(90deg,#BFA46A,#E8D5A3);transition:width 0.3s ease;}
.nav-link:hover::after,.nav-link.active::after{width:100%;}
.nav-link:hover{color:#BFA46A;}
.nav-link.active{color:#BFA46A;}
.icon-btn{color:#ffffff;background:none;border:none;display:flex;align-items:center;transition:all 0.3s;}
.icon-btn:hover{color:#BFA46A;transform:scale(1.12);}
.card-wrap{position:relative;overflow:hidden;border-radius:14px;aspect-ratio:3/4;}
.card-wrap img{width:100%;height:100%;object-fit:cover;transition:transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94);}
.card-wrap:hover img{transform:scale(1.07);}
.card-ov{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.88) 0%,rgba(0,0,0,0.1) 55%,transparent 100%);opacity:0;transition:opacity 0.45s;}
.card-wrap:hover .card-ov{opacity:1;}
.card-bdr{position:absolute;inset:0;border-radius:14px;border:1px solid rgba(191,164,106,0.35);opacity:0;transition:opacity 0.45s;}
.card-wrap:hover .card-bdr{opacity:1;}
.qv{position:absolute;bottom:14px;left:14px;right:14px;opacity:0;transform:translateY(10px);transition:all 0.3s;}
.card-wrap:hover .qv{opacity:1;transform:translateY(0);}
@keyframes shimmer{0%{background-position:-200% 0;}100%{background-position:200% 0;}}
@keyframes pulse-gold{0%,100%{box-shadow:0 0 0 0 rgba(191,164,106,0.4);}50%{box-shadow:0 0 24px 10px rgba(191,164,106,0.12);}}
.pulse{animation:pulse-gold 3s infinite;}
@keyframes float{0%,100%{transform:translateY(0);}50%{transform:translateY(-8px);}}
input,textarea,button{cursor:none!important;}
`;

// ─── Cursor ───────────────────────────────────────────────────────────────────
function Cursor() {
  const ring = useRef(null);
  const dot = useRef(null);
  const frame = useRef(null);

  useEffect(() => {
    const move = (e) => {
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        if (ring.current) ring.current.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
        if (dot.current) dot.current.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
      });
    };
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <>
      <div ref={ring} style={{ position: "fixed", width: 40, height: 40, borderRadius: "50%", border: "1.5px solid rgba(191,164,106,0.75)", pointerEvents: "none", zIndex: 9999, transition: "transform 0.1s ease" }} />
      <div ref={dot} style={{ position: "fixed", width: 6, height: 6, borderRadius: "50%", background: "#BFA46A", pointerEvents: "none", zIndex: 9999, transition: "transform 0.04s ease" }} />
    </>
  );
}
function useCountdown(h=8,m=23,s=45){
  const [t,setT]=useState({h,m,s});
  useEffect(()=>{
    const id=setInterval(()=>setT(p=>{
      let{h,m,s}=p;
      if(s>0)return{h,m,s:s-1};
      if(m>0)return{h,m:m-1,s:59};
      if(h>0)return{h:h-1,m:59,s:59};
      return{h:0,m:0,s:0};
    }),1000);
    return()=>clearInterval(id);
  },[]);
  return t;
}
function Flip({v}){
  return <motion.span key={v} initial={{rotateX:-90,opacity:0}} animate={{rotateX:0,opacity:1}} transition={{duration:0.32,ease:"easeOut"}} style={{display:"inline-block",minWidth:"2ch",textAlign:"center"}}>{String(v).padStart(2,"0")}</motion.span>;
}

function Marquee(){
  const items=["New Arrivals 2026","Maison Margiela","The Row","Saint Laurent","Bottega Veneta","Loro Piana","Celine","Free Worldwide Shipping","Sustainable Luxury","Expert Curation"];
  return(
    <div style={{overflow:"hidden",borderTop:"1px solid rgba(191,164,106,0.2)",borderBottom:"1px solid rgba(191,164,106,0.2)",padding:"13px 0",background:"rgba(191,164,106,0.025)"}}>
      <motion.div animate={{x:["0%","-50%"]}} transition={{duration:26,repeat:Infinity,ease:"linear"}}
        style={{display:"flex",gap:56,whiteSpace:"nowrap"}}>
        {[...items,...items].map((item,i)=>(
          <span key={i} style={{color:"rgba(191,164,106,0.8)",fontSize:10,letterSpacing:"0.4em",textTransform:"uppercase",display:"flex",alignItems:"center",gap:20,fontWeight:500}}>
            {item}<span style={{color:"rgba(191,164,106,0.35)",fontSize:7}}>◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function Toast({msg,onDone}){
  useEffect(()=>{const t=setTimeout(onDone,2800);return()=>clearTimeout(t);},[onDone]);
  return(
    <motion.div initial={{opacity:0,y:60,x:"-50%"}} animate={{opacity:1,y:0}} exit={{opacity:0,y:20}}
      style={{position:"fixed",bottom:32,left:"50%",zIndex:300,display:"flex",alignItems:"center",gap:12,padding:"14px 26px",borderRadius:12,background:"linear-gradient(135deg,#BFA46A,#8C7540)",boxShadow:"0 8px 40px rgba(191,164,106,0.5)",border:"1px solid rgba(255,255,255,0.15)"}}>
      <Check size={15} color="#fff"/>
      <span style={{color:"#fff",fontSize:12,fontWeight:500,letterSpacing:"0.05em"}}>{msg}</span>
    </motion.div>
  );
}

function SearchPanel({open,onClose,onView}){
  const [q,setQ]=useState("");
  const res=q.length>1?ALL_PRODUCTS.filter(p=>p.name.toLowerCase().includes(q.toLowerCase())||p.brand.toLowerCase().includes(q.toLowerCase())):[];
  useEffect(()=>{if(!open)setQ("");},[open]);
  return(
    <AnimatePresence>
      {open&&(<>
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
          style={{position:"fixed",inset:0,zIndex:110,background:"rgba(0,0,0,0.88)",backdropFilter:"blur(16px)"}} onClick={onClose}/>
        <motion.div initial={{y:-40,opacity:0}} animate={{y:0,opacity:1}} exit={{y:-20,opacity:0}} transition={sp}
          style={{position:"fixed",top:0,left:0,right:0,zIndex:120,background:"#0A0A0A",borderBottom:"1px solid rgba(191,164,106,0.25)",padding:"28px 48px 36px"}}>
          <div style={{display:"flex",alignItems:"center",gap:16,maxWidth:800,margin:"0 auto",marginBottom:q.length>1?28:16}}>
            <Search size={22} color="#BFA46A"/>
            <input autoFocus value={q} onChange={e=>setQ(e.target.value)} placeholder="Search pieces, brands…"
              style={{flex:1,background:"none",border:"none",outline:"none",color:"#fff",fontSize:26,fontFamily:"'Cormorant Garamond',serif",fontWeight:300}}/>
            <motion.button whileTap={{scale:0.85}} onClick={onClose} style={{background:"none",border:"none",color:"rgba(255,255,255,0.4)"}}>
              <X size={22}/>
            </motion.button>
          </div>
          {res.length>0&&(
            <div style={{maxWidth:800,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:14}}>
              {res.map(p=>(
                <motion.div key={p.id} whileHover={{scale:1.03,y:-3}} onClick={()=>{onView(p);onClose();}}
                  style={{cursor:"pointer",borderRadius:10,overflow:"hidden",border:"1px solid rgba(191,164,106,0.15)",transition:"border-color 0.3s"}}
                  onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(191,164,106,0.55)"}
                  onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(191,164,106,0.15)"}>
                  <img src={p.img} alt={p.name} style={{width:"100%",height:120,objectFit:"cover"}}/>
                  <div style={{padding:"10px 12px",background:"#111"}}>
                    <p style={{color:"rgba(191,164,106,0.7)",fontSize:8,letterSpacing:"0.22em",textTransform:"uppercase"}}>{p.brand}</p>
                    <p style={{color:"#fff",fontSize:12,fontWeight:400,marginTop:2}}>{p.name}</p>
                    <p style={{color:"rgba(255,255,255,0.4)",fontSize:11,marginTop:2}}>${p.price.toLocaleString()}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          {q.length>1&&res.length===0&&<p style={{maxWidth:800,margin:"0 auto",color:"rgba(255,255,255,0.25)",fontSize:13,textAlign:"center",letterSpacing:"0.1em"}}>No results for "{q}"</p>}
          {q.length===0&&(
            <div style={{maxWidth:800,margin:"0 auto"}}>
              <p style={{color:"rgba(255,255,255,0.2)",fontSize:9,letterSpacing:"0.3em",textTransform:"uppercase",marginBottom:14,fontWeight:500}}>Popular Searches</p>
              <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                {["Cashmere","Leather","Silk","Saint Laurent","Sale Items","New Arrivals"].map(s=>(
                  <button key={s} onClick={()=>setQ(s)}
                    style={{padding:"7px 18px",borderRadius:20,border:"1px solid rgba(191,164,106,0.2)",background:"transparent",color:"rgba(255,255,255,0.55)",fontSize:11,letterSpacing:"0.1em",transition:"all 0.3s"}}
                    onMouseEnter={e=>{e.target.style.borderColor="#BFA46A";e.target.style.color="#BFA46A";}}
                    onMouseLeave={e=>{e.target.style.borderColor="rgba(191,164,106,0.2)";e.target.style.color="rgba(255,255,255,0.55)";}}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </>)}
    </AnimatePresence>
  );
}

// ─── Account Panel — FIXED (no stray wishlist button) ─────────────────────────
function AccountPanel({open,onClose}){
  const [tab,setTab]=useState("login");
  const [form,setForm]=useState({email:"",password:"",name:""});
  const [done,setDone]=useState(false);
  const submit=()=>{setDone(true);setTimeout(()=>{setDone(false);onClose();},1600);};
  const inp={width:"100%",background:"rgba(255,255,255,0.03)",border:"1px solid rgba(191,164,106,0.15)",borderRadius:6,padding:"13px 16px",fontSize:13,color:"#fff",outline:"none",fontFamily:"'Montserrat',sans-serif",transition:"border-color 0.3s"};
  return(
    <AnimatePresence>
      {open&&(<>
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
          style={{position:"fixed",inset:0,zIndex:90,background:"rgba(0,0,0,0.8)",backdropFilter:"blur(12px)"}} onClick={onClose}/>
        <motion.aside initial={{x:"100%"}} animate={{x:0}} exit={{x:"100%"}} transition={sp}
          style={{position:"fixed",right:0,top:0,bottom:0,zIndex:100,width:"100%",maxWidth:420,background:"#0A0A0A",borderLeft:"1px solid rgba(191,164,106,0.25)",display:"flex",flexDirection:"column",overflowY:"auto"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"28px 32px",borderBottom:"1px solid rgba(191,164,106,0.1)"}}>
            <div>
              <p style={{color:"rgba(191,164,106,0.6)",fontSize:9,letterSpacing:"0.35em",textTransform:"uppercase",marginBottom:4}}>Welcome</p>
              <span style={{color:"#fff",fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:300}}>My Account</span>
            </div>
            <motion.button whileTap={{scale:0.85}} onClick={onClose}
              style={{width:36,height:36,borderRadius:"50%",border:"1px solid rgba(255,255,255,0.12)",display:"flex",alignItems:"center",justifyContent:"center",background:"none"}}>
              <X size={15} color="#888"/>
            </motion.button>
          </div>
          <div style={{flex:1,padding:32}}>
            <div style={{display:"flex",marginBottom:28,background:"rgba(255,255,255,0.03)",borderRadius:8,padding:4}}>
              {["login","register"].map(t=>(
                <button key={t} onClick={()=>setTab(t)}
                  style={{flex:1,padding:"10px",fontSize:9,letterSpacing:"0.2em",textTransform:"uppercase",background:tab===t?"rgba(191,164,106,0.15)":"none",border:"none",color:tab===t?"#BFA46A":"rgba(255,255,255,0.35)",borderRadius:6,cursor:"pointer",transition:"all 0.3s",fontFamily:"'Montserrat',sans-serif",fontWeight:500}}>
                  {t==="login"?"Sign In":"Register"}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              {done?(
                <motion.div key="done" initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} style={{textAlign:"center",padding:"56px 0"}}>
                  <div className="pulse" style={{width:68,height:68,borderRadius:"50%",background:"rgba(191,164,106,0.12)",border:"1px solid #BFA46A",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 18px"}}>
                    <Check size={30} color="#BFA46A"/>
                  </div>
                  <p style={{color:"#fff",fontFamily:"'Cormorant Garamond',serif",fontSize:24,fontWeight:300}}>Welcome to LUXE</p>
                  <p style={{color:"rgba(255,255,255,0.35)",fontSize:11,marginTop:8}}>Your account is ready</p>
                </motion.div>
              ):(
                <motion.div key={tab} initial={{opacity:0,x:10}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-10}} style={{display:"flex",flexDirection:"column",gap:14}}>
                  {tab==="register"&&(
                    <div>
                      <p style={{color:"rgba(255,255,255,0.4)",fontSize:9,letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:8}}>Full Name</p>
                      <input value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="Your name" style={inp}
                        onFocus={e=>e.target.style.borderColor="rgba(191,164,106,0.5)"} onBlur={e=>e.target.style.borderColor="rgba(191,164,106,0.15)"}/>
                    </div>
                  )}
                  <div>
                    <p style={{color:"rgba(255,255,255,0.4)",fontSize:9,letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:8}}>Email</p>
                    <input value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} type="email" placeholder="your@email.com" style={inp}
                      onFocus={e=>e.target.style.borderColor="rgba(191,164,106,0.5)"} onBlur={e=>e.target.style.borderColor="rgba(191,164,106,0.15)"}/>
                  </div>
                  <div>
                    <p style={{color:"rgba(255,255,255,0.4)",fontSize:9,letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:8}}>Password</p>
                    <input value={form.password} onChange={e=>setForm(f=>({...f,password:e.target.value}))} type="password" placeholder="••••••••" style={inp}
                      onFocus={e=>e.target.style.borderColor="rgba(191,164,106,0.5)"} onBlur={e=>e.target.style.borderColor="rgba(191,164,106,0.15)"}/>
                  </div>
                  {tab==="login"&&<a href="#" style={{color:"rgba(191,164,106,0.5)",fontSize:10,letterSpacing:"0.15em",textDecoration:"none",textAlign:"right"}}>Forgot password?</a>}
                  <motion.button whileHover={{scale:1.02,boxShadow:"0 0 30px rgba(191,164,106,0.3)"}} whileTap={{scale:0.97}} onClick={submit}
                    style={{marginTop:8,padding:"14px",fontSize:10,letterSpacing:"0.25em",textTransform:"uppercase",fontWeight:600,color:"#000",borderRadius:6,background:"linear-gradient(135deg,#BFA46A,#E8D5A3,#8C7540)",border:"none",fontFamily:"'Montserrat',sans-serif"}}>
                    {tab==="login"?"Sign In":"Create Account"}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
            <div style={{marginTop:28,padding:"20px",borderRadius:10,border:"1px solid rgba(191,164,106,0.1)",background:"rgba(191,164,106,0.02)"}}>
              <p style={{color:"rgba(191,164,106,0.7)",fontSize:9,letterSpacing:"0.25em",textTransform:"uppercase",marginBottom:14}}>Member Benefits</p>
              {[["Early access","New arrivals 24hr before public"],["Exclusive pricing","Up to 20% off for members"],["Free express shipping","On every order, always"],["Personal stylist","Book a free 1-on-1 session"]].map(([title,sub],i)=>(
                <div key={i} style={{display:"flex",gap:12,alignItems:"flex-start",marginBottom:12}}>
                  <div style={{width:5,height:5,borderRadius:"50%",background:"#BFA46A",flexShrink:0,marginTop:5}}/>
                  <div>
                    <p style={{color:"rgba(255,255,255,0.65)",fontSize:11,fontWeight:500}}>{title}</p>
                    <p style={{color:"rgba(255,255,255,0.25)",fontSize:10,marginTop:2}}>{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.aside>
      </>)}
    </AnimatePresence>
  );
}

function WishlistPanel({open,onClose,wishIds,onView,onRemove,onAddToCart}){
  const items=ALL_PRODUCTS.filter(p=>wishIds.includes(p.id));
  return(
    <AnimatePresence>
      {open&&(<>
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
          style={{position:"fixed",inset:0,zIndex:90,background:"rgba(0,0,0,0.78)",backdropFilter:"blur(12px)"}} onClick={onClose}/>
        <motion.aside initial={{x:"100%"}} animate={{x:0}} exit={{x:"100%"}} transition={sp}
          style={{position:"fixed",right:0,top:0,bottom:0,zIndex:100,width:"100%",maxWidth:440,background:"#0A0A0A",borderLeft:"1px solid rgba(191,164,106,0.25)",display:"flex",flexDirection:"column"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"28px 32px",borderBottom:"1px solid rgba(191,164,106,0.1)"}}>
            <div>
              <p style={{color:"rgba(191,164,106,0.6)",fontSize:9,letterSpacing:"0.35em",textTransform:"uppercase",marginBottom:4}}>Saved Pieces</p>
              <span style={{color:"#fff",fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:300}}>Wishlist {items.length>0&&`(${items.length})`}</span>
            </div>
            <motion.button whileTap={{scale:0.85}} onClick={onClose}
              style={{width:36,height:36,borderRadius:"50%",border:"1px solid rgba(255,255,255,0.12)",display:"flex",alignItems:"center",justifyContent:"center",background:"none"}}>
              <X size={15} color="#888"/>
            </motion.button>
          </div>
          {items.length===0?(
            <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:16}}>
              <div style={{width:68,height:68,borderRadius:"50%",border:"1px solid rgba(191,164,106,0.15)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Heart size={26} color="#2a2a2a"/>
              </div>
              <p style={{color:"rgba(255,255,255,0.25)",fontSize:11,letterSpacing:"0.25em",textTransform:"uppercase"}}>No saved pieces yet</p>
            </div>
          ):(
            <div style={{flex:1,overflowY:"auto",padding:"24px 32px",display:"flex",flexDirection:"column",gap:18}}>
              {items.map(p=>(
                <motion.div key={p.id} layout initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}}
                  style={{display:"flex",gap:14,alignItems:"flex-start"}}>
                  <div style={{position:"relative",flexShrink:0,cursor:"pointer"}} onClick={()=>{onView(p);onClose();}}>
                    <img src={p.img} alt={p.name} style={{width:76,height:92,objectFit:"cover",borderRadius:8}}/>
                    <div style={{position:"absolute",inset:0,borderRadius:8,border:"1px solid rgba(191,164,106,0.15)"}}/>
                  </div>
                  <div style={{flex:1}}>
                    <p style={{color:"rgba(191,164,106,0.7)",fontSize:8,letterSpacing:"0.25em",textTransform:"uppercase",marginBottom:3}}>{p.brand}</p>
                    <p style={{color:"#fff",fontSize:13,fontWeight:400,marginBottom:4}}>{p.name}</p>
                    <p style={{color:"#BFA46A",fontSize:13,fontFamily:"'Cormorant Garamond',serif"}}>${p.price.toLocaleString()}</p>
                    <div style={{display:"flex",gap:8,marginTop:10}}>
                      <motion.button whileTap={{scale:0.95}} onClick={()=>{onAddToCart(p,1);}}
                        style={{padding:"7px 14px",fontSize:8,letterSpacing:"0.18em",textTransform:"uppercase",color:"#000",borderRadius:4,background:"linear-gradient(135deg,#BFA46A,#8C7540)",border:"none",fontWeight:600}}>
                        Add to Bag
                      </motion.button>
                      <motion.button whileTap={{scale:0.85}} onClick={()=>onRemove(p.id)}
                        style={{width:30,height:30,borderRadius:"50%",border:"1px solid rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",background:"none",color:"rgba(255,255,255,0.3)"}}>
                        <X size={12}/>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.aside>
      </>)}
    </AnimatePresence>
  );
}

function CartDrawer({open,onClose,cart,onQty,onRemove}){
  const subtotal=cart.reduce((s,i)=>s+i.price*i.qty,0);
  const [step,setStep]=useState("bag");
  return(
    <AnimatePresence>
      {open&&(<>
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
          style={{position:"fixed",inset:0,zIndex:90,background:"rgba(0,0,0,0.82)",backdropFilter:"blur(14px)"}} onClick={()=>{onClose();setStep("bag");}}/>
        <motion.aside initial={{x:"100%"}} animate={{x:0}} exit={{x:"100%"}} transition={sp}
          style={{position:"fixed",right:0,top:0,bottom:0,zIndex:100,width:"100%",maxWidth:440,display:"flex",flexDirection:"column",background:"#0A0A0A",borderLeft:"1px solid rgba(191,164,106,0.25)"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"28px 32px",borderBottom:"1px solid rgba(191,164,106,0.1)"}}>
            <div>
              <p style={{color:"rgba(191,164,106,0.6)",fontSize:9,letterSpacing:"0.35em",textTransform:"uppercase",marginBottom:4}}>
                {step==="bag"?"Your Selection":step==="checkout"?"Checkout":"Order Complete"}
              </p>
              <span style={{color:"#fff",fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:300}}>
                {step==="bag"?"Shopping Bag":step==="checkout"?"Review Order":"Thank You"}
                {step==="bag"&&cart.length>0&&<span style={{color:"rgba(191,164,106,0.6)",fontSize:14,fontFamily:"'Montserrat',sans-serif"}}> ({cart.length})</span>}
              </span>
            </div>
            <motion.button whileTap={{scale:0.85}} onClick={()=>{onClose();setStep("bag");}}
              style={{width:36,height:36,borderRadius:"50%",border:"1px solid rgba(255,255,255,0.12)",display:"flex",alignItems:"center",justifyContent:"center",background:"none"}}>
              <X size={15} color="#888"/>
            </motion.button>
          </div>
          <AnimatePresence mode="wait">
            {step==="confirm"?(
              <motion.div key="ok" initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:20,padding:32}}>
                <div className="pulse" style={{width:80,height:80,borderRadius:"50%",background:"rgba(191,164,106,0.1)",border:"1px solid #BFA46A",display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <Check size={38} color="#BFA46A"/>
                </div>
                <div style={{textAlign:"center"}}>
                  <p style={{color:"#fff",fontFamily:"'Cormorant Garamond',serif",fontSize:30,fontWeight:300,marginBottom:8}}>Order Placed!</p>
                  <p style={{color:"rgba(255,255,255,0.4)",fontSize:12}}>Confirmation sent to your email</p>
                  <p style={{color:"rgba(191,164,106,0.6)",fontSize:11,marginTop:6,letterSpacing:"0.1em"}}>Estimated delivery: 3–5 business days</p>
                </div>
                <motion.button whileTap={{scale:0.95}} onClick={()=>{onClose();setStep("bag");}}
                  style={{padding:"12px 32px",fontSize:9,letterSpacing:"0.25em",textTransform:"uppercase",color:"#BFA46A",border:"1px solid rgba(191,164,106,0.3)",borderRadius:4,background:"transparent"}}>
                  Continue Shopping
                </motion.button>
              </motion.div>
            ):step==="checkout"?(
              <motion.div key="checkout" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} style={{flex:1,overflowY:"auto",padding:"24px 32px",display:"flex",flexDirection:"column",gap:14}}>
                <div style={{padding:16,borderRadius:10,border:"1px solid rgba(191,164,106,0.1)",background:"rgba(191,164,106,0.03)"}}>
                  <p style={{color:"rgba(191,164,106,0.6)",fontSize:9,letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:12}}>Order Summary</p>
                  {cart.map(i=>(
                    <div key={i.id} style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                      <span style={{color:"rgba(255,255,255,0.5)",fontSize:11}}>{i.name} ×{i.qty}</span>
                      <span style={{color:"rgba(255,255,255,0.65)",fontSize:11}}>${(i.price*i.qty).toLocaleString()}</span>
                    </div>
                  ))}
                  <div style={{borderTop:"1px solid rgba(255,255,255,0.06)",marginTop:10,paddingTop:10,display:"flex",justifyContent:"space-between"}}>
                    <span style={{color:"rgba(255,255,255,0.4)",fontSize:11}}>Total</span>
                    <span style={{color:"#BFA46A",fontSize:16,fontFamily:"'Cormorant Garamond',serif"}}>${subtotal.toLocaleString()}</span>
                  </div>
                </div>
                {[["Delivery Address","14 Mayfair Lane, London"],["Payment","•••• •••• •••• 4242"],["Shipping","Express — Complimentary"]].map(([l,v])=>(
                  <div key={l} style={{padding:"13px 16px",borderRadius:8,border:"1px solid rgba(255,255,255,0.06)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <span style={{color:"rgba(255,255,255,0.35)",fontSize:10}}>{l}</span>
                    <span style={{color:"rgba(255,255,255,0.65)",fontSize:11}}>{v}</span>
                  </div>
                ))}
                <div style={{display:"flex",gap:10,marginTop:8}}>
                  <motion.button whileTap={{scale:0.95}} onClick={()=>setStep("bag")}
                    style={{flex:1,padding:"13px",fontSize:9,letterSpacing:"0.2em",textTransform:"uppercase",color:"rgba(255,255,255,0.5)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:6,background:"transparent"}}>
                    Back
                  </motion.button>
                  <motion.button whileHover={{scale:1.02,boxShadow:"0 0 30px rgba(191,164,106,0.3)"}} whileTap={{scale:0.97}} onClick={()=>setStep("confirm")}
                    style={{flex:2,padding:"13px",fontSize:10,letterSpacing:"0.25em",textTransform:"uppercase",fontWeight:600,color:"#000",borderRadius:6,background:"linear-gradient(135deg,#BFA46A,#E8D5A3,#8C7540)",border:"none"}}>
                    Place Order
                  </motion.button>
                </div>
              </motion.div>
            ):cart.length===0?(
              <motion.div key="empty" style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:18}}>
                <div style={{width:72,height:72,borderRadius:"50%",border:"1px solid rgba(191,164,106,0.15)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <ShoppingBag size={28} color="#2a2a2a"/>
                </div>
                <div style={{textAlign:"center"}}>
                  <p style={{color:"rgba(255,255,255,0.3)",fontSize:11,letterSpacing:"0.25em",textTransform:"uppercase"}}>Your bag is empty</p>
                  <p style={{color:"rgba(255,255,255,0.15)",fontSize:11,marginTop:6}}>Discover our curated collection</p>
                </div>
                <motion.button whileTap={{scale:0.95}} onClick={onClose}
                  style={{padding:"11px 28px",fontSize:9,letterSpacing:"0.25em",textTransform:"uppercase",color:"#BFA46A",border:"1px solid rgba(191,164,106,0.3)",borderRadius:4,background:"transparent"}}>
                  Continue Shopping
                </motion.button>
              </motion.div>
            ):(
              <motion.div key="bag" initial={{opacity:0}} animate={{opacity:1}} style={{display:"flex",flexDirection:"column",flex:1}}>
                <div style={{flex:1,overflowY:"auto",padding:"22px 32px",display:"flex",flexDirection:"column",gap:18}}>
                  <AnimatePresence>
                    {cart.map(item=>(
                      <motion.div key={item.id} layout initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}} style={{display:"flex",gap:14}}>
                        <div style={{position:"relative",flexShrink:0}}>
                          <img src={item.img} alt={item.name} style={{width:72,height:88,objectFit:"cover",borderRadius:8}}/>
                          <div style={{position:"absolute",inset:0,borderRadius:8,border:"1px solid rgba(191,164,106,0.15)"}}/>
                        </div>
                        <div style={{flex:1}}>
                          <p style={{color:"rgba(191,164,106,0.7)",fontSize:8,letterSpacing:"0.25em",textTransform:"uppercase",marginBottom:3}}>{item.brand}</p>
                          <p style={{color:"#fff",fontSize:12,fontWeight:400,marginBottom:3}}>{item.name}</p>
                          <p style={{color:"#BFA46A",fontSize:13,fontFamily:"'Cormorant Garamond',serif"}}>${item.price.toLocaleString()}</p>
                          <div style={{display:"flex",alignItems:"center",gap:10,marginTop:8}}>
                            <motion.button whileTap={{scale:0.8}} onClick={()=>onQty(item.id,-1)} style={{width:26,height:26,borderRadius:"50%",border:"1px solid rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",background:"none"}}><Minus size={10} color="#777"/></motion.button>
                            <span style={{color:"#fff",minWidth:16,textAlign:"center",fontSize:13,fontWeight:500}}>{item.qty}</span>
                            <motion.button whileTap={{scale:0.8}} onClick={()=>onQty(item.id,1)} style={{width:26,height:26,borderRadius:"50%",border:"1px solid rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",background:"none"}}><Plus size={10} color="#777"/></motion.button>
                            <motion.button whileTap={{scale:0.85}} onClick={()=>onRemove(item.id)} style={{marginLeft:"auto",background:"none",border:"none",color:"rgba(255,255,255,0.2)"}}><X size={13}/></motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                <div style={{padding:"20px 32px",borderTop:"1px solid rgba(191,164,106,0.1)",display:"flex",flexDirection:"column",gap:12}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <span style={{color:"rgba(255,255,255,0.4)",fontSize:10,letterSpacing:"0.25em",textTransform:"uppercase"}}>Subtotal</span>
                    <motion.span key={subtotal} initial={{opacity:0}} animate={{opacity:1}} style={{color:"#fff",fontFamily:"'Cormorant Garamond',serif",fontSize:26,fontWeight:300}}>${subtotal.toLocaleString()}</motion.span>
                  </div>
                  <div style={{display:"flex",gap:8,alignItems:"center"}}>
                    <Truck size={12} color="rgba(191,164,106,0.55)"/>
                    <span style={{color:"rgba(255,255,255,0.25)",fontSize:10}}>Complimentary express worldwide shipping</span>
                  </div>
                  <motion.button whileHover={{scale:1.02,boxShadow:"0 0 30px rgba(191,164,106,0.3)"}} whileTap={{scale:0.97}} onClick={()=>setStep("checkout")}
                    style={{padding:"15px",fontSize:10,letterSpacing:"0.25em",textTransform:"uppercase",fontWeight:600,color:"#000",borderRadius:6,background:"linear-gradient(135deg,#BFA46A,#E8D5A3,#8C7540)",border:"none",fontFamily:"'Montserrat',sans-serif"}}>
                    Proceed to Checkout
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.aside>
      </>)}
    </AnimatePresence>
  );
}

// ─── Quick View — FIXED: wishlist btn + bright visible icons ──────────────────
function QuickView({product,onClose,onAdd,onWish,wishlist}){
  const [size,setSize]=useState(null);
  const [color,setColor]=useState(product.colors[0]);
  const [qty,setQty]=useState(1);
  const [added,setAdded]=useState(false);
  const [wishedLocal,setWishedLocal]=useState(wishlist?.includes(product.id)||false);
  const disc=product.sale?Math.round((1-product.price/product.orig)*100):0;
  const handle=()=>{onAdd(product,qty);setAdded(true);setTimeout(()=>{setAdded(false);onClose();},900);};
  const handleWish=()=>{
    onWish&&onWish(product.id);
    setWishedLocal(w=>!w);
  };
  return(
    <AnimatePresence>
      <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
        style={{position:"fixed",inset:0,zIndex:80,display:"flex",alignItems:"center",justifyContent:"center",padding:24,background:"rgba(0,0,0,0.92)",backdropFilter:"blur(28px)"}}
        onClick={onClose}>
        <motion.div initial={{scale:0.88,opacity:0,y:20}} animate={{scale:1,opacity:1,y:0}} exit={{scale:0.92,opacity:0}} transition={sp}
          onClick={e=>e.stopPropagation()}
          style={{position:"relative",width:"100%",maxWidth:820,display:"grid",gridTemplateColumns:"1fr 1fr",borderRadius:20,overflow:"hidden",background:"#0D0D0D",border:"1px solid rgba(191,164,106,0.25)"}}>
          <motion.button whileTap={{scale:0.85}} onClick={onClose}
            style={{position:"absolute",top:16,right:16,zIndex:10,width:36,height:36,borderRadius:"50%",background:"rgba(0,0,0,0.75)",border:"1px solid rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <X size={14} color="#888"/>
          </motion.button>
          <div style={{position:"relative",overflow:"hidden"}}>
            <img src={product.img} alt={product.name} style={{width:"100%",height:"100%",objectFit:"cover",minHeight:440}}/>
            {product.isNew&&<div style={{position:"absolute",top:16,left:16,padding:"5px 14px",borderRadius:20,background:"rgba(191,164,106,0.92)",fontSize:8,letterSpacing:"0.3em",textTransform:"uppercase",color:"#000",fontWeight:700}}>New</div>}
            {disc>0&&<div style={{position:"absolute",top:product.isNew?48:16,left:16,padding:"5px 14px",borderRadius:20,background:"rgba(200,40,40,0.88)",fontSize:8,letterSpacing:"0.2em",textTransform:"uppercase",color:"#fff",fontWeight:700}}>-{disc}%</div>}
          </div>
          <div style={{padding:"36px 32px",display:"flex",flexDirection:"column",gap:16,overflowY:"auto",maxHeight:"90vh"}}>
            <div>
              <p style={{color:"rgba(191,164,106,0.75)",fontSize:9,letterSpacing:"0.35em",textTransform:"uppercase",marginBottom:8}}>{product.brand}</p>
              <h3 style={{color:"#fff",fontFamily:"'Cormorant Garamond',serif",fontSize:26,fontWeight:300,lineHeight:1.2,marginBottom:10}}>{product.name}</h3>
              <div style={{display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
                <p style={{color:"#fff",fontFamily:"'Cormorant Garamond',serif",fontSize:24}}>${product.price.toLocaleString()}</p>
                {product.sale&&<p style={{color:"rgba(255,255,255,0.3)",fontSize:16,textDecoration:"line-through"}}>${product.orig.toLocaleString()}</p>}
                <div style={{display:"flex",gap:2,alignItems:"center"}}>
                  {[...Array(5)].map((_,i)=><Star key={i} size={10} fill={i<Math.floor(product.rating)?"#BFA46A":"none"} color="#BFA46A"/>)}
                  <span style={{color:"rgba(255,255,255,0.3)",fontSize:10,marginLeft:4}}>{product.rating}</span>
                </div>
              </div>
            </div>
            <div>
              <p style={{color:"rgba(255,255,255,0.3)",fontSize:9,letterSpacing:"0.25em",textTransform:"uppercase",marginBottom:10}}>Colour</p>
              <div style={{display:"flex",gap:8}}>
                {product.colors.map(c=>(
                  <motion.button key={c} whileTap={{scale:0.85}} onClick={()=>setColor(c)}
                    style={{width:28,height:28,borderRadius:"50%",background:c,border:color===c?"2.5px solid #BFA46A":"2px solid transparent",outline:color===c?"1px solid rgba(191,164,106,0.4)":"none",outlineOffset:2,cursor:"pointer",transition:"all 0.2s"}}/>
                ))}
              </div>
            </div>
            <div>
              <p style={{color:"rgba(255,255,255,0.3)",fontSize:9,letterSpacing:"0.25em",textTransform:"uppercase",marginBottom:10}}>Size</p>
              <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                {product.sizes.map(s=>(
                  <motion.button key={s} whileTap={{scale:0.9}} onClick={()=>setSize(s)}
                    style={{padding:"7px 13px",borderRadius:5,fontSize:10,letterSpacing:"0.1em",border:size===s?"1px solid #BFA46A":"1px solid rgba(255,255,255,0.1)",color:size===s?"#BFA46A":"rgba(255,255,255,0.4)",background:size===s?"rgba(191,164,106,0.08)":"transparent",cursor:"pointer",transition:"all 0.2s",fontFamily:"'Montserrat',sans-serif"}}>
                    {s}
                  </motion.button>
                ))}
              </div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:12,border:"1px solid rgba(255,255,255,0.08)",borderRadius:8,padding:"10px 14px",width:"fit-content"}}>
              <motion.button whileTap={{scale:0.8}} onClick={()=>setQty(q=>Math.max(1,q-1))} style={{background:"none",border:"none"}}><Minus size={12} color="#777"/></motion.button>
              <span style={{color:"#fff",minWidth:20,textAlign:"center",fontSize:14,fontWeight:500}}>{qty}</span>
              <motion.button whileTap={{scale:0.8}} onClick={()=>setQty(q=>q+1)} style={{background:"none",border:"none"}}><Plus size={12} color="#777"/></motion.button>
            </div>

            {/* ── Add to Bag ── */}
            <motion.button whileHover={{scale:1.02,boxShadow:"0 0 30px rgba(191,164,106,0.3)"}} whileTap={{scale:0.96}} onClick={handle}
              style={{padding:"15px",borderRadius:8,fontSize:10,letterSpacing:"0.25em",textTransform:"uppercase",fontWeight:600,color:added?"#fff":"#000",background:added?"#2D6A4F":"linear-gradient(135deg,#BFA46A,#E8D5A3,#8C7540)",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8,transition:"background 0.3s",fontFamily:"'Montserrat',sans-serif"}}>
              {added?<><Check size={14}/> Added to Bag</>:"Add to Bag"}
            </motion.button>

            {/* ── Save to Wishlist — FIXED: correct placement, functional ── */}
            <motion.button whileTap={{scale:0.95}} onClick={handleWish}
              style={{padding:"12px",borderRadius:8,fontSize:10,letterSpacing:"0.2em",textTransform:"uppercase",border:`1px solid ${wishedLocal?"#BFA46A":"rgba(191,164,106,0.3)"}`,background:wishedLocal?"rgba(191,164,106,0.1)":"transparent",color:wishedLocal?"#BFA46A":"rgba(191,164,106,0.8)",display:"flex",alignItems:"center",justifyContent:"center",gap:8,transition:"all 0.25s",fontFamily:"'Montserrat',sans-serif",fontWeight:500}}>
              <Heart size={14} fill={wishedLocal?"#BFA46A":"none"} color={wishedLocal?"#BFA46A":"rgba(191,164,106,0.8)"}/>
              {wishedLocal?"Saved to Wishlist":"Save to Wishlist"}
            </motion.button>

            {/* ── Info strip — FIXED: fully visible, interactive ── */}
            <div style={{display:"flex",gap:0,borderRadius:8,overflow:"hidden",border:"1px solid rgba(191,164,106,0.18)"}}>
              {[
                [Truck,   "Free Shipping",  "On all orders"],
                [RefreshCw,"30-Day Returns","Easy & free"],
                [Package,  "Gift Wrap",     "Add at checkout"],
              ].map(([Icon,label,sub],i)=>(
                <motion.div key={i} whileHover={{background:"rgba(191,164,106,0.1)"}}
                  style={{flex:1,padding:"13px 6px",display:"flex",flexDirection:"column",alignItems:"center",gap:5,borderRight:i<2?"1px solid rgba(191,164,106,0.12)":"none",background:"rgba(191,164,106,0.04)",transition:"background 0.3s",cursor:"pointer"}}>
                  <Icon size={15} color="#BFA46A"/>
                  <span style={{color:"rgba(255,255,255,0.75)",fontSize:9,letterSpacing:"0.1em",textAlign:"center",fontWeight:500}}>{label}</span>
                  <span style={{color:"rgba(255,255,255,0.35)",fontSize:8,textAlign:"center"}}>{sub}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function PCard({product,onView,wishlist,onWish,index}){
  const ref=useRef(null);
  const inView=useInView(ref,{once:true,margin:"-60px"});
  const isW=wishlist.includes(product.id);
  const disc=product.sale?Math.round((1-product.price/product.orig)*100):0;
  return(
    <motion.div ref={ref} variants={fadeUp} initial="hidden" animate={inView?"visible":"hidden"} custom={index}>
      <div className="card-wrap">
        <img src={product.img} alt={product.name} loading="lazy"/>
        <div className="card-ov"/>
        <div className="card-bdr"/>
        <div className="qv">
          <motion.button whileTap={{scale:0.95}} onClick={()=>onView(product)}
            style={{width:"100%",padding:"11px",fontSize:9,letterSpacing:"0.25em",textTransform:"uppercase",color:"#fff",borderRadius:6,background:"rgba(0,0,0,0.72)",backdropFilter:"blur(12px)",border:"1px solid rgba(191,164,106,0.45)",cursor:"pointer",fontFamily:"'Montserrat',sans-serif",fontWeight:500}}>
            Quick View
          </motion.button>
        </div>
        <motion.button whileTap={{scale:0.7}} onClick={()=>onWish(product.id)}
          style={{position:"absolute",top:13,right:13,width:34,height:34,borderRadius:"50%",background:"rgba(0,0,0,0.6)",backdropFilter:"blur(8px)",border:"1px solid rgba(255,255,255,0.08)",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <Heart size={14} fill={isW?"#BFA46A":"none"} color={isW?"#BFA46A":"rgba(255,255,255,0.7)"}/>
        </motion.button>
        {product.isNew&&<div style={{position:"absolute",top:13,left:13,padding:"4px 10px",borderRadius:20,background:"rgba(191,164,106,0.92)",fontSize:8,letterSpacing:"0.22em",textTransform:"uppercase",color:"#000",fontWeight:700}}>New</div>}
        {disc>0&&!product.isNew&&<div style={{position:"absolute",top:13,left:13,padding:"4px 10px",borderRadius:20,background:"rgba(200,40,40,0.85)",fontSize:8,letterSpacing:"0.15em",textTransform:"uppercase",color:"#fff",fontWeight:700}}>-{disc}%</div>}
        <div style={{position:"absolute",bottom:52,left:13,display:"flex",gap:2}}>
          {[...Array(5)].map((_,i)=><Star key={i} size={8} fill={i<Math.floor(product.rating)?"#BFA46A":"none"} color="rgba(191,164,106,0.7)"/>)}
        </div>
      </div>
      <div style={{marginTop:13,paddingLeft:2}}>
        <p style={{color:"rgba(191,164,106,0.7)",fontSize:9,letterSpacing:"0.28em",textTransform:"uppercase",marginBottom:4,fontWeight:500}}>{product.brand}</p>
        <p style={{color:"#fff",fontFamily:"'Cormorant Garamond',serif",fontSize:17,fontWeight:300,marginBottom:4}}>{product.name}</p>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <p style={{color:"rgba(255,255,255,0.75)",fontSize:13}}>${product.price.toLocaleString()}</p>
          {disc>0&&<p style={{color:"rgba(255,255,255,0.3)",fontSize:11,textDecoration:"line-through"}}>${product.orig.toLocaleString()}</p>}
        </div>
      </div>
    </motion.div>
  );
}

function Reviews(){
  const [a,setA]=useState(0);
  useEffect(()=>{const id=setInterval(()=>setA(x=>(x+1)%REVIEWS.length),4500);return()=>clearInterval(id);},[]);
  return(
    <section style={{padding:"100px 48px",background:"rgba(191,164,106,0.02)",borderTop:"1px solid rgba(191,164,106,0.08)",borderBottom:"1px solid rgba(191,164,106,0.08)"}}>
      <div style={{maxWidth:800,margin:"0 auto",textAlign:"center"}}>
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{once:true}}
          style={{color:"rgba(191,164,106,0.65)",fontSize:9,letterSpacing:"0.45em",textTransform:"uppercase",marginBottom:16,fontWeight:500}}>Client Stories</motion.p>
        <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{once:true}} custom={1}
          style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(32px,4vw,52px)",fontWeight:300,color:"#fff",marginBottom:52}}>What Our Clients Say</motion.h2>
        <AnimatePresence mode="wait">
          <motion.div key={a} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}}
            style={{padding:"40px",borderRadius:16,border:"1px solid rgba(191,164,106,0.15)",background:"rgba(191,164,106,0.03)"}}>
            <div style={{display:"flex",justifyContent:"center",gap:4,marginBottom:20}}>
              {[...Array(5)].map((_,i)=><Star key={i} size={16} fill="#BFA46A" color="#BFA46A"/>)}
            </div>
            <p style={{color:"rgba(255,255,255,0.72)",fontSize:17,fontFamily:"'Cormorant Garamond',serif",fontWeight:300,lineHeight:1.8,fontStyle:"italic",marginBottom:24}}>"{REVIEWS[a].text}"</p>
            <div>
              <p style={{color:"#fff",fontSize:12,fontWeight:500,letterSpacing:"0.1em"}}>{REVIEWS[a].name}</p>
              <p style={{color:"rgba(191,164,106,0.5)",fontSize:10,marginTop:2,letterSpacing:"0.15em"}}>{REVIEWS[a].loc} · {REVIEWS[a].product}</p>
            </div>
          </motion.div>
        </AnimatePresence>
        <div style={{display:"flex",justifyContent:"center",gap:8,marginTop:24}}>
          {REVIEWS.map((_,i)=>(
            <motion.button key={i} onClick={()=>setA(i)} whileTap={{scale:0.8}}
              style={{width:i===a?24:8,height:8,borderRadius:4,background:i===a?"#BFA46A":"rgba(191,164,106,0.2)",border:"none",cursor:"pointer",transition:"all 0.3s"}}/>
          ))}
        </div>
      </div>
    </section>
  );
}

function Hero({onShop}){
  const ref=useRef(null);
  const op = 1;
  return(
    <section ref={ref} style={{position:"relative",height:"100vh",overflow:"hidden"}}>
<video autoPlay loop muted playsInline preload="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.58) saturate(0.85)" }}>
  <source src={`${basePath}/videos/hero.mp4`} type="video/mp4" />
</video>
      <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,rgba(0,0,0,0.38) 0%,rgba(0,0,0,0.05) 40%,rgba(0,0,0,0.65) 100%)"}}/>
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at center,transparent 35%,rgba(0,0,0,0.45) 100%)"}}/>
      <div style={{position:"absolute",inset:0,opacity:0.03,backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",backgroundSize:"180px"}}/>
      <div style={{position:"absolute",top:0,left:0,right:0,height:100,background:"linear-gradient(to bottom,rgba(0,0,0,0.7),transparent)"}}/>
      <div style={{position:"absolute",bottom:0,left:0,right:0,height:160,background:"linear-gradient(to top,rgba(7,7,7,1),transparent)"}}/>
      <motion.div style={{opacity:op,position:"relative",zIndex:10,height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"0 24px"}}>
        <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.3,duration:1}}
          style={{display:"flex",alignItems:"center",gap:18,marginBottom:36}}>
          <div style={{width:48,height:1,background:"rgba(191,164,106,0.6)"}}/>
          <span style={{color:"rgba(191,164,106,0.95)",fontSize:9,letterSpacing:"0.55em",textTransform:"uppercase",fontWeight:600}}>Collection 2026</span>
          <div style={{width:48,height:1,background:"rgba(191,164,106,0.6)"}}/>
        </motion.div>
        <motion.h1 initial={{opacity:0,y:50}} animate={{opacity:1,y:0}} transition={{delay:0.5,duration:1.2,ease:[0.16,1,0.3,1]}}
          style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(54px,11vw,130px)",fontWeight:300,color:"#fff",lineHeight:0.92,letterSpacing:"-0.02em",marginBottom:32}}>
          Timeless<br/><em style={{fontStyle:"italic",color:"#E8D5A3"}}>Elegance.</em>
        </motion.h1>
        <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.95,duration:0.9}}
          style={{color:"rgba(255,255,255,0.55)",letterSpacing:"0.3em",textTransform:"uppercase",fontSize:10,marginBottom:52,fontWeight:400}}>
          Discover the new collection
        </motion.p>
        <motion.div initial={{opacity:0,scale:0.92}} animate={{opacity:1,scale:1}} transition={{delay:1.15,...sp}} style={{display:"flex",gap:14,alignItems:"center"}}>
          <motion.button className="pulse" whileHover={{scale:1.06,boxShadow:"0 0 50px rgba(191,164,106,0.5)"}} whileTap={{scale:0.95}} onClick={onShop}
            style={{padding:"17px 48px",fontSize:10,letterSpacing:"0.3em",textTransform:"uppercase",color:"#000",borderRadius:3,background:"linear-gradient(135deg,#BFA46A,#E8D5A3,#8C7540)",border:"none",fontWeight:600,fontFamily:"'Montserrat',sans-serif"}}>
            Shop Now
          </motion.button>
          <motion.button whileHover={{scale:1.05,borderColor:"rgba(255,255,255,0.55)"}} whileTap={{scale:0.95}}
            style={{padding:"16px 34px",fontSize:10,letterSpacing:"0.3em",textTransform:"uppercase",color:"#fff",borderRadius:3,background:"transparent",border:"1px solid rgba(255,255,255,0.35)",fontWeight:400,fontFamily:"'Montserrat',sans-serif",transition:"border-color 0.3s"}}>
            Explore
          </motion.button>
        </motion.div>
      </motion.div>
      <motion.div animate={{y:[0,10,0]}} transition={{repeat:Infinity,duration:2.5,ease:"easeInOut"}}
        style={{position:"absolute",bottom:44,left:"50%",transform:"translateX(-50%)",zIndex:10,display:"flex",flexDirection:"column",alignItems:"center",gap:10}}>
        <span style={{color:"rgba(255,255,255,0.3)",fontSize:8,letterSpacing:"0.4em",textTransform:"uppercase"}}>Scroll</span>
        <div style={{width:1,height:48,background:"linear-gradient(to bottom,rgba(191,164,106,0.8),transparent)"}}/>
      </motion.div>
    </section>
  );
}

function CatPage({cat,onView,wishlist,onWish,onBack}){
  const map={"new-arrivals":"New Arrivals","clothing":"Clothing","accessories":"Accessories","sale":"Sale"};
  const label=map[cat]||cat;
  const items=cat==="new-arrivals"?ALL_PRODUCTS.filter(p=>p.isNew):cat==="sale"?ALL_PRODUCTS.filter(p=>p.sale):ALL_PRODUCTS.filter(p=>p.cat.toLowerCase()===label.toLowerCase());
  return(
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} style={{minHeight:"100vh",paddingTop:72,background:"#070707"}}>
      <div style={{padding:"48px 48px 80px",maxWidth:1280,margin:"0 auto"}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:48}}>
          <motion.button whileTap={{scale:0.9}} onClick={onBack}
            style={{background:"none",border:"none",color:"rgba(191,164,106,0.8)",display:"flex",alignItems:"center",gap:6,fontSize:10,letterSpacing:"0.2em",textTransform:"uppercase",fontWeight:500}}>
            <ChevronLeft size={14}/> Home
          </motion.button>
          <span style={{color:"rgba(255,255,255,0.15)"}}>·</span>
          <span style={{color:"#BFA46A",fontSize:10,letterSpacing:"0.2em",textTransform:"uppercase",fontWeight:500}}>{label}</span>
        </div>
        <div style={{marginBottom:56}}>
          <p style={{color:"rgba(191,164,106,0.65)",fontSize:9,letterSpacing:"0.45em",textTransform:"uppercase",marginBottom:14,fontWeight:500}}>{items.length} Pieces Available</p>
          <h1 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(38px,5vw,64px)",fontWeight:300,color:"#fff"}}>{label}</h1>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:"40px 22px"}}>
          {items.map((p,i)=><PCard key={p.id} product={p} index={i} onView={onView} wishlist={wishlist} onWish={onWish}/>)}
        </div>
        {items.length===0&&<div style={{textAlign:"center",padding:"80px 0"}}><p style={{color:"rgba(255,255,255,0.2)",fontSize:14}}>No pieces in this collection yet.</p></div>}
      </div>
    </motion.div>
  );
}

function ContactPage({onBack}){
  const [sent,setSent]=useState(false);
  const inp={width:"100%",background:"rgba(255,255,255,0.02)",border:"1px solid rgba(191,164,106,0.12)",borderRadius:6,padding:"12px 16px",fontSize:13,color:"#fff",outline:"none",fontFamily:"'Montserrat',sans-serif",transition:"border-color 0.3s"};
  return(
    <motion.div initial={{opacity:0}} animate={{opacity:1}} style={{minHeight:"100vh",paddingTop:72,background:"#070707"}}>
      <div style={{padding:"48px 48px 80px",maxWidth:900,margin:"0 auto"}}>
        <motion.button whileTap={{scale:0.9}} onClick={onBack}
          style={{background:"none",border:"none",color:"rgba(191,164,106,0.8)",display:"flex",alignItems:"center",gap:6,fontSize:10,letterSpacing:"0.2em",textTransform:"uppercase",fontWeight:500,marginBottom:48}}>
          <ChevronLeft size={14}/> Back
        </motion.button>
        <p style={{color:"rgba(191,164,106,0.65)",fontSize:9,letterSpacing:"0.45em",textTransform:"uppercase",marginBottom:14,fontWeight:500}}>We'd love to hear from you</p>
        <h1 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(38px,5vw,64px)",fontWeight:300,color:"#fff",marginBottom:56}}>Contact</h1>
        {sent?(
          <motion.div initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} style={{textAlign:"center",padding:"60px"}}>
            <div style={{width:72,height:72,borderRadius:"50%",border:"1px solid #BFA46A",background:"rgba(191,164,106,0.1)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px"}}>
              <Check size={32} color="#BFA46A"/>
            </div>
            <p style={{color:"#fff",fontFamily:"'Cormorant Garamond',serif",fontSize:30,fontWeight:300}}>Message Sent</p>
            <p style={{color:"rgba(255,255,255,0.35)",fontSize:12,marginTop:8}}>We'll be in touch within 24 hours</p>
          </motion.div>
        ):(
          <div style={{display:"grid",gridTemplateColumns:"1fr 1.4fr",gap:56}}>
            <div style={{display:"flex",flexDirection:"column",gap:28}}>
              {[[Mail,"Email","hello@luxe.com"],[Phone,"Phone","+44 20 7946 0321"],[MapPin,"Mayfair, London","14 Bond Street, W1S 1SB"]].map(([Icon,label,val])=>(
                <div key={label} style={{display:"flex",gap:16,alignItems:"flex-start"}}>
                  <div style={{width:44,height:44,borderRadius:"50%",border:"1px solid rgba(191,164,106,0.2)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <Icon size={16} color="#BFA46A"/>
                  </div>
                  <div>
                    <p style={{color:"rgba(191,164,106,0.65)",fontSize:9,letterSpacing:"0.25em",textTransform:"uppercase",marginBottom:6}}>{label}</p>
                    <p style={{color:"rgba(255,255,255,0.65)",fontSize:13,fontWeight:300}}>{val}</p>
                  </div>
                </div>
              ))}
              <div style={{marginTop:4,padding:"20px",borderRadius:10,border:"1px solid rgba(191,164,106,0.1)",background:"rgba(191,164,106,0.02)"}}>
                <p style={{color:"rgba(191,164,106,0.65)",fontSize:9,letterSpacing:"0.25em",textTransform:"uppercase",marginBottom:12}}>Opening Hours</p>
                {[["Monday–Friday","9:00 – 18:00"],["Saturday","10:00 – 17:00"],["Sunday","Closed"]].map(([d,t])=>(
                  <div key={d} style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                    <span style={{color:"rgba(255,255,255,0.35)",fontSize:11}}>{d}</span>
                    <span style={{color:"rgba(255,255,255,0.6)",fontSize:11}}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:16}}>
              {[["Name","Your name","text"],["Email","your@email.com","email"]].map(([l,ph,t])=>(
                <div key={l}>
                  <p style={{color:"rgba(255,255,255,0.35)",fontSize:9,letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:8}}>{l}</p>
                  <input type={t} placeholder={ph} style={inp}
                    onFocus={e=>e.target.style.borderColor="rgba(191,164,106,0.45)"} onBlur={e=>e.target.style.borderColor="rgba(191,164,106,0.12)"}/>
                </div>
              ))}
              <div>
                <p style={{color:"rgba(255,255,255,0.35)",fontSize:9,letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:8}}>Message</p>
                <textarea placeholder="How can we help?" rows={5} style={{...inp,resize:"none"}}
                  onFocus={e=>e.target.style.borderColor="rgba(191,164,106,0.45)"} onBlur={e=>e.target.style.borderColor="rgba(191,164,106,0.12)"}/>
              </div>
              <motion.button whileHover={{scale:1.02,boxShadow:"0 0 30px rgba(191,164,106,0.25)"}} whileTap={{scale:0.97}} onClick={()=>setSent(true)}
                style={{padding:"15px",fontSize:10,letterSpacing:"0.25em",textTransform:"uppercase",fontWeight:600,color:"#000",borderRadius:6,background:"linear-gradient(135deg,#BFA46A,#E8D5A3,#8C7540)",border:"none",fontFamily:"'Montserrat',sans-serif"}}>
                Send Message
              </motion.button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function LUXE(){
  const [page,setPage]          =useState("home");
  const [cartOpen,setCartOpen]  =useState(false);
  const [cart,setCart]          =useState([]);
  const [wish,setWish]          =useState([]);
  const [wishOpen,setWishOpen]  =useState(false);
  const [qv,setQv]              =useState(null);
  const [toast,setToast]        =useState(null);
  const [navOpen,setNavOpen]    =useState(false);
  const [srch,setSrch]          =useState(false);
  const [acct,setAcct]          =useState(false);
  const countdown               =useCountdown(8,23,45);
  const shopRef                 =useRef(null);
  const [lookIdx,setLookIdx]    =useState(0);

    const basePath = '/LUXE-fashion-e-commerce-';
    
  useEffect(()=>{ if(page!=="home") window.scrollTo(0,0); },[page]);

  const cartCount=cart.reduce((s,i)=>s+i.qty,0);
  const wishCount=wish.length;

  const addToCart=useCallback((p,qty=1)=>{
    setCart(prev=>{
      const ex=prev.find(i=>i.id===p.id);
      if(ex) return prev.map(i=>i.id===p.id?{...i,qty:i.qty+qty}:i);
      return[...prev,{...p,qty}];
    });
    setToast(`${p.name} added to bag`);
  },[]);

  const updQty=(id,d)=>setCart(prev=>prev.map(i=>i.id===id?{...i,qty:Math.max(1,i.qty+d)}:i));
  const remItem=(id)=>setCart(prev=>prev.filter(i=>i.id!==id));
  const togWish=(id)=>{
    setWish(prev=>prev.includes(id)?prev.filter(x=>x!==id):[...prev,id]);
    setToast(wish.includes(id)?"Removed from wishlist":"Saved to wishlist");
  };
  const remWish=(id)=>setWish(prev=>prev.filter(x=>x!==id));
  const goShop=()=>{ if(shopRef.current) shopRef.current.scrollIntoView({behavior:"smooth"}); };

  const visibleCount=3;
  const maxIdx=LOOKBOOK.length-visibleCount;
  const prevLook=()=>setLookIdx(i=>Math.max(0,i-1));
  const nextLook=()=>setLookIdx(i=>Math.min(maxIdx,i+1));

  const NAV=[
    {label:"New Arrivals",pg:"new-arrivals"},
    {label:"Clothing",pg:"clothing"},
    {label:"Accessories",pg:"accessories"},
    {label:"Sale",pg:"sale"},
  ];

  return(
    <div style={{background:"#070707",minHeight:"100vh",color:"#fff"}}>
      <style>{CSS}</style>
      <Cursor/>

      <motion.nav className="nav-glass" initial={{y:-80,opacity:0}} animate={{y:0,opacity:1}} transition={{...sp,delay:0.1}}
        style={{position:"fixed",top:0,left:0,right:0,zIndex:50,padding:"0 48px",height:72,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <motion.button className="gold" whileHover={{scale:1.03}} whileTap={{scale:0.97}} onClick={()=>setPage("home")}
          style={{fontFamily:"'Cormorant Garamond',serif",fontSize:26,letterSpacing:"0.45em",textTransform:"uppercase",fontWeight:300,background:"none",border:"none"}}>
          LUXE
        </motion.button>
        <div style={{display:"flex",alignItems:"center",gap:36}}>
          {NAV.map(({label,pg})=>(
            <motion.button key={pg} whileHover={{y:-1}} onClick={()=>setPage(pg)}
              className={`nav-link${page===pg?" active":""}`}>
              {label}
            </motion.button>
          ))}
        </div>
        <div style={{display:"flex",alignItems:"center",gap:22}}>
          <motion.button className="icon-btn" whileTap={{scale:0.85}} onClick={()=>setSrch(true)}><Search size={18}/></motion.button>
          <motion.button className="icon-btn" whileTap={{scale:0.85}} onClick={()=>setAcct(true)}><User size={18}/></motion.button>
          <motion.button className="icon-btn" whileTap={{scale:0.85}} onClick={()=>setWishOpen(true)}
            style={{position:"relative",color:"#ffffff"}}>
            <Heart size={18} fill={wishCount>0?"rgba(191,164,106,0.3)":"none"}/>
            <AnimatePresence>
              {wishCount>0&&(
                <motion.span key={wishCount} initial={{scale:0}} animate={{scale:1}} exit={{scale:0}} transition={spF}
                  style={{position:"absolute",top:-7,right:-7,width:16,height:16,borderRadius:"50%",background:"linear-gradient(135deg,#BFA46A,#8C7540)",fontSize:8,display:"flex",alignItems:"center",justifyContent:"center",color:"#000",fontWeight:700}}>
                  {wishCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
          <motion.button className="icon-btn" whileTap={{scale:0.85}} onClick={()=>setCartOpen(true)}
            style={{position:"relative",color:"#ffffff"}}>
            <ShoppingBag size={18}/>
            <AnimatePresence>
              {cartCount>0&&(
                <motion.span key={cartCount} initial={{scale:0}} animate={{scale:1}} exit={{scale:0}} transition={spF}
                  style={{position:"absolute",top:-7,right:-7,width:17,height:17,borderRadius:"50%",background:"linear-gradient(135deg,#BFA46A,#8C7540)",fontSize:9,display:"flex",alignItems:"center",justifyContent:"center",color:"#000",fontWeight:700}}>
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
          <motion.button className="icon-btn" style={{display:"none"}} whileTap={{scale:0.85}} onClick={()=>setNavOpen(o=>!o)}><Menu size={20}/></motion.button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {navOpen&&(
          <motion.div initial={{x:"100%"}} animate={{x:0}} exit={{x:"100%"}} transition={sp}
            style={{position:"fixed",inset:0,zIndex:60,background:"#070707",display:"flex",flexDirection:"column",paddingTop:88,paddingLeft:48,gap:28}}>
            <motion.button whileTap={{scale:0.85}} onClick={()=>setNavOpen(false)} style={{position:"absolute",top:20,right:24,background:"none",border:"none",color:"#fff"}}><X size={22}/></motion.button>
            {NAV.map(({label,pg},i)=>(
              <motion.button key={pg} initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} transition={{delay:i*0.07}}
                onClick={()=>{setPage(pg);setNavOpen(false);}}
                style={{color:"#fff",fontFamily:"'Cormorant Garamond',serif",fontSize:36,fontWeight:300,background:"none",border:"none",textAlign:"left"}}>
                {label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {page!=="home"&&(
          <motion.div key={page} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
            {page==="contact"
              ?<ContactPage onBack={()=>setPage("home")}/>
              :<CatPage cat={page} onView={setQv} wishlist={wish} onWish={togWish} onBack={()=>setPage("home")}/>
            }
          </motion.div>
        )}
      </AnimatePresence>

      {page==="home"&&(<>
        <Hero onShop={goShop}/>
        <Marquee/>

        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",borderBottom:"1px solid rgba(191,164,106,0.08)"}}>
          {[["Est. 2019","Heritage"],["340+","Curated Pieces"],["42","Countries"],["5★","Average Rating"]].map(([v,l],i)=>(
            <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{once:true}} custom={i}
              style={{padding:"32px 48px",borderRight:i<3?"1px solid rgba(191,164,106,0.08)":"none",display:"flex",flexDirection:"column",gap:6}}>
              <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:30,fontWeight:300,color:"rgba(191,164,106,0.7)"}}>{v}</span>
              <span style={{color:"rgba(255,255,255,0.28)",fontSize:9,letterSpacing:"0.25em",textTransform:"uppercase",fontWeight:500}}>{l}</span>
            </motion.div>
          ))}
        </div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",borderBottom:"1px solid rgba(191,164,106,0.08)"}}>
          {[[Truck,"Free Shipping","On all orders worldwide"],[RefreshCw,"Easy Returns","30-day hassle-free"],[Shield,"Authenticity","100% verified luxury"],[Award,"Expert Curation","Handpicked by stylists"]].map(([Icon,title,sub],i)=>(
            <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{once:true}} custom={i}
              style={{padding:"26px 28px",borderRight:i<3?"1px solid rgba(191,164,106,0.06)":"none",display:"flex",gap:14,alignItems:"flex-start"}}>
              <div style={{width:40,height:40,borderRadius:"50%",border:"1px solid rgba(191,164,106,0.2)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <Icon size={16} color="#BFA46A"/>
              </div>
              <div>
                <p style={{color:"#fff",fontSize:11,fontWeight:600,marginBottom:3,letterSpacing:"0.05em"}}>{title}</p>
                <p style={{color:"rgba(255,255,255,0.3)",fontSize:10}}>{sub}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <section ref={shopRef} style={{padding:"96px 48px 80px"}}>
          <div style={{maxWidth:1280,margin:"0 auto"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:52}}>
              <div>
                <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{once:true}}
                  style={{color:"rgba(191,164,106,0.7)",fontSize:9,letterSpacing:"0.45em",textTransform:"uppercase",marginBottom:14,fontWeight:500}}>Curated Selection</motion.p>
                <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{once:true}} custom={1}
                  style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(38px,5vw,64px)",fontWeight:300,color:"#fff",lineHeight:1}}>The Edit</motion.h2>
              </div>
              <motion.button variants={fadeUp} initial="hidden" whileInView="visible" viewport={{once:true}} custom={2}
                onClick={()=>setPage("clothing")}
                style={{color:"rgba(191,164,106,0.75)",fontSize:9,letterSpacing:"0.28em",textTransform:"uppercase",background:"none",border:"none",display:"flex",alignItems:"center",gap:8,fontWeight:500,transition:"color 0.3s"}}
                onMouseEnter={e=>e.currentTarget.style.color="#BFA46A"}
                onMouseLeave={e=>e.currentTarget.style.color="rgba(191,164,106,0.75)"}>
                View All <ArrowRight size={12}/>
              </motion.button>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:"40px 22px"}}>
              {ALL_PRODUCTS.slice(0,8).map((p,i)=>(
                <PCard key={p.id} product={p} index={i} onView={setQv} wishlist={wish} onWish={togWish}/>
              ))}
            </div>
            <div style={{textAlign:"center",marginTop:52}}>
              <motion.button whileHover={{scale:1.03,borderColor:"#BFA46A",color:"#BFA46A"}} whileTap={{scale:0.97}} onClick={()=>setPage("clothing")}
                style={{padding:"14px 44px",fontSize:10,letterSpacing:"0.25em",textTransform:"uppercase",color:"rgba(191,164,106,0.8)",border:"1px solid rgba(191,164,106,0.3)",borderRadius:4,background:"transparent",fontWeight:500,fontFamily:"'Montserrat',sans-serif",transition:"all 0.3s"}}>
                View All 16 Pieces
              </motion.button>
            </div>
          </div>
        </section>

        {/* LOOKBOOK */}
        <section style={{padding:"0 0 100px"}}>
          <div style={{padding:"0 48px",marginBottom:52,display:"flex",alignItems:"flex-end",justifyContent:"space-between"}}>
            <div>
              <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{once:true}}
                style={{color:"rgba(191,164,106,0.7)",fontSize:9,letterSpacing:"0.45em",textTransform:"uppercase",marginBottom:14,fontWeight:500}}>Styled for You</motion.p>
              <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{once:true}} custom={1}
                style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(38px,5vw,64px)",fontWeight:300,color:"#fff"}}>Lookbook</motion.h2>
            </div>
            <div style={{display:"flex",gap:10}}>
              <motion.button whileTap={{scale:0.85}} onClick={prevLook} disabled={lookIdx===0}
                style={{width:46,height:46,borderRadius:"50%",border:`1px solid ${lookIdx===0?"rgba(191,164,106,0.12)":"rgba(191,164,106,0.3)"}`,background:"transparent",display:"flex",alignItems:"center",justifyContent:"center",color:lookIdx===0?"rgba(255,255,255,0.2)":"#fff",transition:"all 0.3s"}}>
                <ChevronLeft size={18}/>
              </motion.button>
              <motion.button whileTap={{scale:0.85}} onClick={nextLook} disabled={lookIdx>=maxIdx}
                style={{width:46,height:46,borderRadius:"50%",border:`1px solid ${lookIdx>=maxIdx?"rgba(191,164,106,0.12)":"rgba(191,164,106,0.3)"}`,background:"transparent",display:"flex",alignItems:"center",justifyContent:"center",color:lookIdx>=maxIdx?"rgba(255,255,255,0.2)":"#fff",transition:"all 0.3s"}}>
                <ChevronRight size={18}/>
              </motion.button>
            </div>
          </div>

          <div style={{margin:"0 48px 40px",borderRadius:18,overflow:"hidden",position:"relative",height:280}}>
    <video autoPlay loop muted playsInline preload="none" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.48) saturate(0.7)" }}>
  <source src={`${basePath}/videos/lookbook.mp4`} type="video/mp4" />
</video>
            <div style={{position:"absolute",inset:0,background:"linear-gradient(to right,rgba(7,7,7,0.7) 0%,transparent 40%,transparent 60%,rgba(7,7,7,0.7) 100%)"}}/>
            <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:12}}>
              <div style={{display:"flex",alignItems:"center",gap:16}}>
                <div style={{width:40,height:1,background:"rgba(191,164,106,0.5)"}}/>
                <span style={{color:"rgba(191,164,106,0.9)",fontSize:9,letterSpacing:"0.55em",textTransform:"uppercase",fontWeight:600}}>Behind the Collection</span>
                <div style={{width:40,height:1,background:"rgba(191,164,106,0.5)"}}/>
              </div>
              <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:36,fontWeight:300,color:"#fff",letterSpacing:"0.02em"}}>The Making of LUXE</h3>
              <p style={{color:"rgba(255,255,255,0.4)",fontSize:11,letterSpacing:"0.15em"}}>SS26 Campaign</p>
            </div>
          </div>

          <motion.div initial={{scaleX:0}} whileInView={{scaleX:1}} viewport={{once:true}}
            transition={{duration:1.8,ease:[0.16,1,0.3,1]}}
            style={{height:1,background:"linear-gradient(90deg,transparent 0%,rgba(191,164,106,0.6) 30%,rgba(232,213,163,0.9) 50%,rgba(191,164,106,0.6) 70%,transparent 100%)",margin:"0 0 48px 0",transformOrigin:"left"}}/>

          <div style={{padding:"0 48px",overflow:"hidden"}}>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>
              {LOOKBOOK.slice(lookIdx,lookIdx+visibleCount).map((item,i)=>(
                <motion.div key={item.id}
                  initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:i*0.1,duration:0.6}}
                  style={{position:"relative",borderRadius:16,overflow:"hidden",height:560,cursor:"pointer"}}
                  onMouseEnter={e=>{
                    e.currentTarget.querySelector(".look-img").style.transform="scale(1.06)";
                    e.currentTarget.querySelector(".look-info-box").style.opacity="1";
                    e.currentTarget.querySelector(".look-info-box").style.transform="translateY(0)";
                    e.currentTarget.querySelector(".look-dark").style.opacity="1";
                    e.currentTarget.querySelector(".look-glow").style.opacity="1";
                  }}
                  onMouseLeave={e=>{
                    e.currentTarget.querySelector(".look-img").style.transform="scale(1)";
                    e.currentTarget.querySelector(".look-info-box").style.opacity="0";
                    e.currentTarget.querySelector(".look-info-box").style.transform="translateY(12px)";
                    e.currentTarget.querySelector(".look-dark").style.opacity="0";
                    e.currentTarget.querySelector(".look-glow").style.opacity="0";
                  }}>
                  <img className="look-img" src={item.img} alt={item.title}
                    style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"top center",transition:"transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)"}}/>
                  <div className="look-dark" style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,0.9) 0%,rgba(0,0,0,0.2) 50%,transparent 100%)",opacity:0,transition:"opacity 0.4s"}}/>
                  <div className="look-glow" style={{position:"absolute",inset:0,borderRadius:16,border:"1px solid rgba(191,164,106,0.4)",opacity:0,transition:"opacity 0.4s"}}/>
                  <div style={{position:"absolute",top:18,left:18,fontFamily:"'Cormorant Garamond',serif",fontSize:11,color:"rgba(191,164,106,0.5)",letterSpacing:"0.15em"}}>0{item.id}</div>
                  <div className="look-info-box" style={{position:"absolute",bottom:0,left:0,right:0,padding:"28px 24px",opacity:0,transform:"translateY(12px)",transition:"all 0.4s ease"}}>
                    <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:24,fontWeight:300,color:"#fff",marginBottom:6}}>{item.title}</p>
                    <p style={{color:"rgba(255,255,255,0.5)",fontSize:12,marginBottom:18,letterSpacing:"0.05em"}}>{item.desc}</p>
                    <div style={{display:"flex",gap:10}}>
                      <button onClick={()=>{
                        const products=item.products.map(id=>ALL_PRODUCTS.find(p=>p.id===id)).filter(Boolean);
                        if(products[0]) setQv(products[0]);
                      }}
                        style={{padding:"9px 18px",fontSize:9,letterSpacing:"0.22em",textTransform:"uppercase",color:"#000",borderRadius:4,background:"linear-gradient(135deg,#BFA46A,#8C7540)",border:"none",fontWeight:600,fontFamily:"'Montserrat',sans-serif"}}>
                        Shop the Look
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div style={{display:"flex",justifyContent:"center",gap:8,marginTop:32}}>
              {Array.from({length:maxIdx+1}).map((_,i)=>(
                <motion.button key={i} onClick={()=>setLookIdx(i)} whileTap={{scale:0.8}}
                  style={{width:i===lookIdx?24:8,height:8,borderRadius:4,background:i===lookIdx?"#BFA46A":"rgba(191,164,106,0.2)",border:"none",transition:"all 0.3s"}}/>
              ))}
            </div>
          </div>
        </section>

        <Reviews/>

        <section style={{position:"relative",padding:"120px 48px",overflow:"hidden",minHeight:640}}>
<video autoPlay loop muted playsInline preload="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.5, filter: "saturate(0.6) brightness(0.75)" }}>
  <source src={`${basePath}/videos/product-bg.mp4`} type="video/mp4" />
</video>
          <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(7,7,7,0.7) 0%,rgba(15,10,3,0.58) 100%)"}}/>
          <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at center,transparent 38%,rgba(0,0,0,0.5) 100%)"}}/>
          <div style={{position:"relative",zIndex:10,maxWidth:700,margin:"0 auto",textAlign:"center"}}>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{once:true}}
              style={{display:"flex",alignItems:"center",justifyContent:"center",gap:18,marginBottom:36}}>
              <div style={{width:36,height:1,background:"rgba(191,164,106,0.5)"}}/>
              <span style={{color:"rgba(191,164,106,0.95)",fontSize:8,letterSpacing:"0.55em",textTransform:"uppercase",fontWeight:600}}>Limited Edition</span>
              <div style={{width:36,height:1,background:"rgba(191,164,106,0.5)"}}/>
            </motion.div>
            <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{once:true}} custom={1}
              style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(44px,9vw,90px)",fontWeight:300,color:"#fff",lineHeight:0.95,marginBottom:24}}>
              Silk Heritage<br/><em style={{color:"#E8D5A3",fontStyle:"italic"}}>Scarf</em>
            </motion.h2>
            <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{once:true}} custom={2}
              style={{color:"rgba(255,255,255,0.5)",fontSize:10,letterSpacing:"0.3em",textTransform:"uppercase",marginBottom:64,fontWeight:400}}>
              Only 12 pieces remaining worldwide
            </motion.p>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{once:true}} custom={3}
              style={{display:"flex",justifyContent:"center",gap:56,marginBottom:64}}>
              {[["Hours",countdown.h],["Min",countdown.m],["Sec",countdown.s]].map(([label,val])=>(
                <div key={label} style={{textAlign:"center"}}>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:60,fontWeight:300,color:"#fff",lineHeight:1,marginBottom:10}}>
                    <Flip v={val}/>
                  </div>
                  <p style={{color:"rgba(191,164,106,0.65)",fontSize:8,letterSpacing:"0.35em",textTransform:"uppercase",fontWeight:500}}>{label}</p>
                </div>
              ))}
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{once:true}} custom={4} style={{marginBottom:52}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
                <span style={{color:"rgba(255,255,255,0.35)",fontSize:8,letterSpacing:"0.28em",textTransform:"uppercase",fontWeight:500}}>Stock Remaining</span>
                <span style={{color:"rgba(191,164,106,0.75)",fontSize:9,fontWeight:600}}>12 / 100</span>
              </div>
              <div style={{height:2,background:"rgba(255,255,255,0.1)",borderRadius:1}}>
                <motion.div style={{height:"100%",background:"linear-gradient(90deg,#BFA46A,#E8D5A3)",borderRadius:1}}
                  initial={{width:"0%"}} whileInView={{width:"12%"}} viewport={{once:true}}
                  transition={{duration:2.2,ease:[0.16,1,0.3,1],delay:0.6}}/>
              </div>
            </motion.div>
            <motion.button variants={fadeUp} initial="hidden" whileInView="visible" viewport={{once:true}} custom={5}
              className="pulse" whileHover={{scale:1.04,boxShadow:"0 0 60px rgba(191,164,106,0.4)"}} whileTap={{scale:0.96}}
              style={{padding:"18px 60px",fontSize:10,letterSpacing:"0.35em",textTransform:"uppercase",color:"#000",borderRadius:3,background:"linear-gradient(135deg,#BFA46A,#E8D5A3,#8C7540)",border:"none",fontWeight:600,fontFamily:"'Montserrat',sans-serif"}}>
              Pre-Order Now — $1,800
            </motion.button>
          </div>
        </section>

        <footer style={{borderTop:"1px solid rgba(191,164,106,0.1)",padding:"80px 48px 52px"}}>
          <div style={{maxWidth:1280,margin:"0 auto"}}>
            <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:48,marginBottom:64}}>
              <div>
                <span className="gold" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:28,letterSpacing:"0.45em",textTransform:"uppercase",fontWeight:300,display:"block",marginBottom:16}}>LUXE</span>
                <p style={{color:"rgba(255,255,255,0.22)",fontSize:12,lineHeight:1.9,maxWidth:240,marginBottom:28,fontWeight:300}}>Curating the world's finest fashion since 2019. Where heritage meets modernity.</p>
                <div style={{display:"flex",gap:12}}>
                  {[Instagram,Twitter,Facebook].map((Icon,i)=>(
                    <motion.a key={i} href="#" whileHover={{scale:1.15}} whileTap={{scale:0.85}}
                      style={{width:36,height:36,borderRadius:"50%",border:"1px solid rgba(191,164,106,0.15)",display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(255,255,255,0.3)",textDecoration:"none",transition:"all 0.3s"}}
                      onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(191,164,106,0.6)";e.currentTarget.style.color="#BFA46A";}}
                      onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(191,164,106,0.15)";e.currentTarget.style.color="rgba(255,255,255,0.3)";}}>
                      <Icon size={14}/>
                    </motion.a>
                  ))}
                </div>
              </div>
              {[
                {title:"Company",links:[["About","home"],["Sustainability","home"],["Careers","home"],["Press","home"]]},
                {title:"Shop",links:[["New Arrivals","new-arrivals"],["Clothing","clothing"],["Accessories","accessories"],["Sale","sale"]]},
                {title:"Support",links:[["Size Guide","home"],["Shipping","home"],["Returns","home"],["Contact","contact"]]},
              ].map(col=>(
                <div key={col.title}>
                  <p style={{color:"rgba(191,164,106,0.55)",fontSize:8,letterSpacing:"0.35em",textTransform:"uppercase",marginBottom:20,fontWeight:600}}>{col.title}</p>
                  <div style={{display:"flex",flexDirection:"column",gap:11}}>
                    {col.links.map(([label,pg])=>(
                      <motion.button key={label} onClick={()=>setPage(pg)} whileHover={{x:4}}
                        style={{color:"rgba(255,255,255,0.3)",fontSize:12,fontWeight:300,background:"none",border:"none",textAlign:"left",transition:"color 0.3s",fontFamily:"'Montserrat',sans-serif"}}
                        onMouseEnter={e=>e.target.style.color="rgba(255,255,255,0.7)"}
                        onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.3)"}>
                        {label}
                      </motion.button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div style={{borderTop:"1px solid rgba(191,164,106,0.08)",paddingTop:48,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:24}}>
              <div>
                <p style={{color:"rgba(255,255,255,0.2)",fontSize:8,letterSpacing:"0.35em",textTransform:"uppercase",marginBottom:8,fontWeight:500}}>Stay in the know</p>
                <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:26,fontWeight:300,color:"rgba(255,255,255,0.75)"}}>Join the Inner Circle</p>
              </div>
              <div style={{display:"flex"}}>
                <input type="email" placeholder="your@email.com"
                  style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(191,164,106,0.15)",borderRight:"none",borderRadius:"3px 0 0 3px",padding:"13px 20px",fontSize:11,color:"#fff",outline:"none",width:256,fontFamily:"'Montserrat',sans-serif",transition:"border-color 0.3s"}}
                  onFocus={e=>e.target.style.borderColor="rgba(191,164,106,0.5)"}
                  onBlur={e=>e.target.style.borderColor="rgba(191,164,106,0.15)"}/>
                <motion.button whileHover={{background:"linear-gradient(135deg,#D4B896,#BFA46A)"}} whileTap={{scale:0.97}}
                  style={{padding:"13px 22px",fontSize:9,letterSpacing:"0.22em",textTransform:"uppercase",color:"#000",background:"linear-gradient(135deg,#BFA46A,#8C7540)",border:"none",borderRadius:"0 3px 3px 0",fontWeight:600,fontFamily:"'Montserrat',sans-serif"}}>
                  Subscribe
                </motion.button>
              </div>
            </div>
            <motion.p initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}}
              style={{color:"rgba(255,255,255,0.08)",fontSize:9,textAlign:"center",marginTop:52,letterSpacing:"0.25em",textTransform:"uppercase"}}>
              © 2026 LUXE. All rights reserved. Crafted with intention.
            </motion.p>
          </div>
        </footer>
      </>)}

      <SearchPanel  open={srch}      onClose={()=>setSrch(false)}      onView={p=>{setQv(p);setSrch(false);}}/>
      <AccountPanel open={acct}      onClose={()=>setAcct(false)}/>
      <WishlistPanel open={wishOpen} onClose={()=>setWishOpen(false)} wishIds={wish} onView={setQv} onRemove={remWish} onAddToCart={addToCart}/>
      <CartDrawer   open={cartOpen}  onClose={()=>setCartOpen(false)} cart={cart} onQty={updQty} onRemove={remItem}/>
      <AnimatePresence>
        {/* Pass onWish and wishlist into QuickView so the Save button works */}
        {qv&&<QuickView product={qv} onClose={()=>setQv(null)} onAdd={addToCart} onWish={togWish} wishlist={wish}/>}
      </AnimatePresence>
      <AnimatePresence>
        {toast&&<Toast msg={toast} onDone={()=>setToast(null)}/>}
      </AnimatePresence>
    </div>
  );
}
