document.addEventListener("DOMContentLoaded",()=>{

console.log("JS LOADED");

const form=document.querySelector(".request-form");

const addressInput=document.getElementById("address_1");
const cityInput=form.querySelector('input[name="city"]');
const stateInput=form.querySelector('input[name="state"]');
const zipInput=form.querySelector('input[name="zip"]');
const phoneInput=form.querySelector('input[name="phone"]');
const suggestionBox=document.getElementById("address-suggestions");

const smartyKey="261093549341300043";

let debounceTimer;

// =====================
// AUTOCOMPLETE
// =====================
addressInput.addEventListener("input",e=>{

console.log("typing:",e.target.value);

clearTimeout(debounceTimer);

debounceTimer=setTimeout(()=>{
fetchSuggestions(e.target.value.trim());
},400);

});

async function fetchSuggestions(value){

console.log("fetch:",value);

cityInput.value="";
stateInput.value="";
zipInput.value="";

if(value.length<3){
suggestionBox.innerHTML="";
return;
}

const url=
`https://us-autocomplete.api.smarty.com/suggest?key=${smartyKey}`+
`&search=${encodeURIComponent(value)}`+
`&max-results=6`;

console.log("REQUEST:",url);

try{

const res=await fetch(url);

console.log("STATUS:",res.status);

if(!res.ok){
throw new Error("HTTP "+res.status);
}

const data=await res.json();

renderSuggestions(data.suggestions||[]);

}catch(err){

console.error("SMARTY ERROR:",err);

}

}

function renderSuggestions(list){

suggestionBox.innerHTML="";

list.forEach(s=>{

const item=document.createElement("div");

item.className="suggestion-item";

item.textContent=
`${s.street_line||""}, ${s.city||""}, ${s.state||""} ${s.zipcode||""}`;

item.addEventListener("click",()=>{

addressInput.value=s.street_line||"";
cityInput.value=s.city||"";
stateInput.value=s.state||"";
zipInput.value=s.zipcode||"";

suggestionBox.innerHTML="";

});

suggestionBox.appendChild(item);

});

}

// =====================
// PHONE FORMAT
// =====================
phoneInput.addEventListener("input",e=>{

let value=e.target.value.replace(/\D/g,"").slice(0,10);

const p1=value.slice(0,3);
const p2=value.slice(3,6);
const p3=value.slice(6,10);

if(value.length>6)
e.target.value=`(${p1}) ${p2}-${p3}`;
else if(value.length>3)
e.target.value=`(${p1}) ${p2}`;
else if(value.length>0)
e.target.value=`(${p1}`;

});

});
