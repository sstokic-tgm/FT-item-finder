!function r(n,s,c){function o(t,e){if(!s[t]){if(!n[t]){var a="function"==typeof require&&require;if(!e&&a)return a(t,!0);if(l)return l(t,!0);throw(e=new Error("Cannot find module '"+t+"'")).code="MODULE_NOT_FOUND",e}a=s[t]={exports:{}},n[t][0].call(a.exports,function(e){return o(n[t][1][e]||e)},a,a.exports,r,n,s,c)}return s[t].exports}for(var l="function"==typeof require&&require,e=0;e<c.length;e++)o(c[e]);return o}({1:[function(e,t,a){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.getLeafStates=function e(t){let a={};for(const r of t.children)r instanceof HTMLInputElement?0===s(r).length&&(a[r.id]=r.checked):r instanceof HTMLUListElement&&(a={...a,...e(r)});return a},a.makeCheckboxTree=function(e){e=function t(a){{if("string"==typeof a)return[(0,o.createHTML)(["input",{type:"checkbox",id:a,checked:"true"}]),(0,o.createHTML)(["label",{for:a},a])];{const r=(0,o.createHTML)(["ul"]);for(let e=0;e<a.length;e++){const n=a[e],s=e===a.length-1;for(const c of t(n))r.appendChild(c);s||"string"!=typeof n||r.appendChild((0,o.createHTML)(["br"]))}return[r]}}}(e)[0];if(e instanceof HTMLUListElement)return e.classList.add("treeview"),function e(t){for(const a of t.children)a instanceof HTMLInputElement?r(a):a instanceof HTMLUListElement&&e(a)}(e),e;throw"Internal error"};var o=e("./html");function s(t){var a=t.parentElement;if(a instanceof HTMLUListElement)for(let e=0;e<a.children.length;e++)if(a.children[e]===t){var r=a.children[e+3];if(r instanceof HTMLUListElement)return Array.from(r.children).filter(e=>e instanceof HTMLInputElement);break}return[]}function c(r){r=function(t){var a=t.parentElement;if(a instanceof HTMLUListElement){t=a.parentElement;if(t instanceof HTMLUListElement){let e;for(const r of t.children)if(r instanceof HTMLInputElement)e=r;else if(r===a)return e}}}(r);if(r){let e=!1,t=!1,a=!1;for(const n of s(r))n.checked?e=!0:t=!0,n.indeterminate&&(a=!0);a||e&&t?r.indeterminate=!0:e?(r.checked=!0,r.indeterminate=!1):t&&(r.checked=!1,r.indeterminate=!1),c(r)}}function r(e){e.addEventListener("change",function(e){e=e.target;e instanceof HTMLInputElement&&(!function e(t){for(const a of s(t))a.checked!==t.checked&&(a.checked=t.checked,a.indeterminate=!1,e(a))}(e),c(e))})}},{"./html":2}],2:[function(e,t,a){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.createHTML=function a(t){const r=document.createElement(t[0]);function n(e){if("string"==typeof e||e instanceof HTMLElement)r.append(e);else if(Array.isArray(e))r.append(a(e));else for(const t in e)r.setAttribute(t,e[t])}for(let e=1;e<t.length;e++)n(t[e]);return r}},{}],3:[function(e,t,a){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.Item=void 0,a.downloadItems=async function(){var e="https://raw.githubusercontent.com/sstokic-tgm/JFTSE/development/auth-server/src/main/resources/res/Item_Parts_Ini3.xml",t=await fetch(e);t.ok||alert("Failed downloading item data from "+e);e=await t.text();l=function(e){e.length<1e3&&console.warn(`Items file is only ${e.length} bytes long`);var t=[];for(var[,a]of e.matchAll(/\<Item (.*)\/\>/g)){var r,n,s=new c;for([,r,n]of a.matchAll(/\s?([^=]*)="([^"]*)"/g))switch(r){case"Index":break;case"_Name_":s.name_kr=n;break;case"Name_N":s.name_en=n;break;case"UseType":s.useType=n;break;case"MaxUse":s.maxUse=parseInt(n);break;case"Hide":s.hidden=!!parseInt(n);break;case"Resist":s.resist=n;break;case"Char":switch(n){case"NIKI":s.character="Niki";break;case"LUNLUN":s.character="LunLun";break;case"LUCY":s.character="Lucy";break;case"SHUA":s.character="Shua";break;case"DHANPIR":s.character="Dhanpir";break;case"POCHI":s.character="Pochi";break;case"AL":s.character="Al";break;default:console.warn(`Found unknown character "${n}"`)}break;case"Part":switch(String(n)){case"BAG":s.part="Backpack";break;case"GLASSES":s.part="Face";break;case"HAND":s.part="Hand";break;case"SOCKS":s.part="Socks";break;case"FOOT":s.part="Shoes";break;case"CAP":s.part="Hat";break;case"PANTS":s.part="Lower";break;case"RACKET":s.part="Racket";break;case"BODY":s.part="Upper";break;case"HAIR":s.part="Hair";break;case"DYE":s.part="Dye";break;default:console.warn("Found unknown part "+n)}break;case"Level":s.level=parseInt(n);break;case"STR":s.str=parseInt(n);break;case"STA":s.sta=parseInt(n);break;case"DEX":s.dex=parseInt(n);break;case"WIL":s.wil=parseInt(n);break;case"AddHP":s.hp=parseInt(n);break;case"AddQuick":s.quickslots=parseInt(n);break;case"AddBuff":s.buffslots=parseInt(n);break;case"SmashSpeed":s.smash=parseInt(n);break;case"MoveSpeed":s.movement=parseInt(n);break;case"ChargeshotSpeed":s.charge=parseInt(n);break;case"LobSpeed":s.lob=parseInt(n);break;case"ServeSpeed":s.serve=parseInt(n);break;case"MAX_STR":s.str=parseInt(n);break;case"MAX_STA":s.sta=parseInt(n);break;case"MAX_DEX":s.dex=parseInt(n);break;case"MAX_WIL":s.wil=parseInt(n);break;case"EnchantElement":s.element_enchantable=!!parseInt(n);break;case"EnableParcel":s.parcel_enabled=!!parseInt(n);break;case"BallSpin":s.spin=parseInt(n);break;case"ATSS":s.atss=parseInt(n);break;case"DFSS":s.dfss=parseInt(n);break;case"Socket":s.socket=parseInt(n);break;case"Gauge":s.gauge=parseInt(n);break;case"GaugeBattle":s.gauge_battle=parseInt(n);break;default:console.warn(`Found unknown item attribute "${r}"`)}t.push(s)}return t}(e),console.log(`Loaded ${l.length} items`)},a.getResultsTable=function(e,t){var a={Hat:[],Hair:[],Dye:[],Upper:[],Lower:[],Shoes:[],Socks:[],Hand:[],Backpack:[],Face:[],Racket:[]};for(const n of l)e(n)&&(a[n.part]=t(a[n.part],n));var r=(0,o.createHTML)(["table",["col"],["col"],["col"],["col"],["col"],["col"],["col"],["col"],["col"],["col"],["col"],["col"],["tr",["th","Name"],["th","Character"],["th","Str"],["th","Sta"],["th","Dex"],["th","Wil"],["th","Smash"],["th","Movement"],["th","Charge"],["th","Lob"],["th","Serve"],["th","Level"]]]);for(const s of Object.values(a))for(const c of s)r.appendChild(function(e){e=(0,o.createHTML)(["tr",["td",e.name_en],["td",e.character],["td",""+e.str],["td",""+e.sta],["td",""+e.dex],["td",""+e.wil],["td",""+e.smash],["td",""+e.movement],["td",""+e.charge],["td",""+e.lob],["td",""+e.serve],["td",""+e.level]]);return e}(c));return r};var o=e("./html");class c{name_kr="";name_en="";useType="";maxUse=0;hidden=!1;resist="";character="Niki";part="Hat";level=0;str=0;sta=0;dex=0;wil=0;hp=0;quickslots=0;buffslots=0;smash=0;movement=0;charge=0;lob=0;serve=0;max_str=0;max_sta=0;max_dex=0;max_wil=0;element_enchantable=!1;parcel_enabled=!1;spin=0;atss=0;dfss=0;socket=0;gauge=0;gauge_battle=0}a.Item=c;let l=[]},{"./html":2}],4:[function(e,t,a){"use strict";var l=e("./checkboxTree"),i=e("./itemLookup");const n=["Characters",["Niki","LunLun","Lucy","Shua","Dhanpir","Pochi","Al"]],s=["Parts",["Head",["Hat","Hair","Dye"],"Upper","Lower","Legs",["Shoes","Socks"],"Aux",["Hand","Backpack","Face"],"Racket"]],c=["Availability",["Shop",["Gold","AP","Allow gacha"],"Guardian","Parcel enabled","Parcel disabled","Exclude unavailable items"]];!function(){var e,t;for([e,t]of[[n,"characterFilters"],[s,"partsFilter"],[c,"availabilityFilter"]]){var a=document.getElementById(t);if(!a)return;var r=(0,l.makeCheckboxTree)(e);r.addEventListener("change",o),a.innerText="",a.appendChild(r)}}();let r;function d(e,t){return e==t?0:e<t?-1:1}function o(){const e=[];{var t=document.getElementById("characterFilters")?.children[0];if(!(t instanceof HTMLUListElement))throw"Internal error";const n=(0,l.getLeafStates)(t);e.push(e=>n[e.character])}{t=document.getElementById("partsFilter")?.children[0];if(!(t instanceof HTMLUListElement))throw"Internal error";const s=(0,l.getLeafStates)(t);e.push(e=>s[e.part])}{t=document.getElementById("levelrange");if(!(t instanceof HTMLInputElement))throw"Internal error";const c=parseInt(t.value);e.push(e=>e.level<=c)}const r=[];t=document.getElementById("priority list");if(!(t instanceof HTMLOListElement))throw"Internal error";for(const o of Array.from(t.childNodes).filter(e=>!e.textContent?.includes("\n")).map(e=>e.textContent))switch(o){case"Movement Speed":r.push((e,t)=>d(e.movement,t.movement));break;case"Charge":r.push((e,t)=>d(e.charge,t.charge));break;case"Lob":r.push((e,t)=>d(e.lob,t.lob));break;case"Str":r.push((e,t)=>d(e.str,t.str));break;case"Dex":r.push((e,t)=>d(e.dex,t.dex));break;case"Sta":r.push((e,t)=>d(e.sta,t.sta));break;case"Will":r.push((e,t)=>d(e.wil,t.wil));break;case"Serve":r.push((e,t)=>d(e.serve,t.serve));break;case"Quickslots":r.push((e,t)=>d(e.quickslots,t.quickslots));break;case"Buffslots":r.push((e,t)=>d(e.buffslots,t.buffslots));break;case"HP":r.push((e,t)=>d(e.hp,t.hp))}var t=(0,i.getResultsTable)(t=>e.every(e=>e(t)),(e,t)=>{if(0===e.length)return[t];for(const a of r)switch(a(e[0],t)){case-1:return[t];case 1:return e}return[...e,t]}),a=document.getElementById("results");a&&(a.innerText="",a.appendChild(t))}document.addEventListener("dragstart",({target:e})=>{e instanceof HTMLElement&&(r=e)}),document.addEventListener("dragover",e=>{e.preventDefault()}),document.addEventListener("drop",({target:e})=>{var t,a;e instanceof HTMLElement&&"dropzone"==e.className&&e!==r&&r.parentNode===e.parentNode&&(a=(t=Array.from(r.parentNode?.children??new HTMLCollection)).indexOf(r),r.remove(),a>t.indexOf(e)?e.before(r):e.after(r),o())}),(0,i.downloadItems)().then(()=>{const e=document.getElementById("loading");e&&(e.hidden=!0);for(const t of["filter group","priority group","results group"]){const e=document.getElementById(t);e&&(e.hidden=!1)}o()});{const u=document.getElementById("levelDisplay");if(!(u instanceof HTMLLabelElement))throw"Internal error";const f=document.getElementById("levelrange");if(!(f instanceof HTMLInputElement))throw"Internal error";e=()=>{u.textContent="Max level requirement: "+f.value,o()},f.addEventListener("input",e),e()}},{"./checkboxTree":1,"./itemLookup":3}]},{},[4]);
