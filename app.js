let cart=[];const $=id=>document.getElementById(id);
function peso(n){return "₱"+Number(n).toLocaleString("en-PH")}
function render(){
 let q=$("search").value.toLowerCase().trim(), arr=PRODUCTS.filter(p=>(p.name+" "+p.category+" "+p.description).toLowerCase().includes(q));
 const s=$("sort").value;
 if(s==="low")arr.sort((a,b)=>a.price-b.price); if(s==="high")arr.sort((a,b)=>b.price-a.price);
 $("resultCount").textContent=arr.length; $("empty").hidden=arr.length!==0;
 $("products").innerHTML=arr.map(p=>`<article class="card">
 <img src="${p.image}" alt="${esc(p.name)}" loading="lazy">
 <div class="cardBody"><div class="tag">${esc(p.category)}</div><h3>${esc(p.name)}</h3>
 <div class="price">${peso(p.price)}</div><p class="desc">${esc(p.description)}</p><div class="stock">● ${esc(p.stock)}</div>
 <button class="secondary" onclick="openProduct('${p.id}')">View product</button></div></article>`).join("");
}
function esc(x){return String(x).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function openProduct(id){
 let p=PRODUCTS.find(x=>x.id===id);if(!p)return;
 $("dImg").src=p.image;$("dImg").alt=p.name;$("dCategory").textContent=p.category;$("dName").textContent=p.name;$("dPrice").textContent=peso(p.price);$("dDesc").textContent=p.description;$("dStock").textContent="● "+p.stock;
 $("inquire").href=makeLink([`Hi CLTX4! I'm interested in: ${p.name}`,`Price: ${peso(p.price)}`,`Product ID: ${p.id}`].join("\n"));
 $("addBtn").onclick=()=>{if(!cart.includes(p.id))cart.push(p.id);updateCart();productDialog.close();};
 productDialog.showModal();
}
function makeLink(text){
 // Replace with your own Messenger/WhatsApp/Telegram/etc. link.
 const base="https://wa.me/?text=";
 return base+encodeURIComponent(text);
}
function updateCart(){
 $("cartCount").textContent=cart.length;
 $("cartItems").innerHTML=cart.length?cart.map(id=>{let p=PRODUCTS.find(x=>x.id===id);return `<div class="cartRow"><span>${esc(p.name)}<br><small>${peso(p.price)}</small></span><button class="remove" onclick="removeCart('${p.id}')">Remove</button></div>`}).join(""):"<p>No items selected.</p>";
 let text=cart.map(id=>{let p=PRODUCTS.find(x=>x.id===id);return `• ${p.name} — ${peso(p.price)} (${p.id})`}).join("\n");
 $("cartInquire").href=makeLink("Hi CLTX4! I'd like to inquire about:\n"+text);
}
function removeCart(id){cart=cart.filter(x=>x!==id);updateCart()}
$("search").addEventListener("input",render);$("sort").addEventListener("change",render);
$("cartBtn").onclick=()=>{updateCart();cartDialog.showModal()};render();updateCart();

function openPayment(type){
  const links={
    // Replace these placeholders with your real links/details before publishing.
    gcash:"#",
    paypal:"#",
    messenger:"https://m.me/",
    facebook:"https://www.facebook.com/"
  };
  const labels={
    gcash:"GCash",
    paypal:"PayPal",
    messenger:"Messenger",
    facebook:"Facebook"
  };
  if(links[type]==="#"){
    alert(labels[type]+" is ready as an option. Add your real "+labels[type]+" payment/link in app.js.");
    return false;
  }
  window.open(links[type],"_blank");
  return false;
}
