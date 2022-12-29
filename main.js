(()=>{"use strict";var e=document.querySelector(".profile__title"),t=document.querySelector(".profile__subtitle"),n=document.querySelector(".profile__avatar"),r=document.querySelector(".edit-form"),o=document.querySelector(".edit-avatar-form"),c=document.querySelector(".edit-form__input-text-name"),a=document.querySelector(".edit-form__input-text-job"),i=document.querySelector(".add-card-form"),u=document.querySelector(".add-card-form__input-text-card-name"),l=document.querySelector(".add-card-form__input-text-link"),s=document.querySelector(".edit-avatar-form__input-text-link"),d=Array.from(document.querySelectorAll(".edit-form__button")),f=Array.from(document.querySelectorAll(".popup__close-button")),m=document.querySelector(".profile__edit-button"),p=document.querySelector(".profile__add-button"),y=document.querySelector(".profile__avatar-wrapper"),_=document.querySelector(".popup_edit-form"),v=document.querySelector(".popup_add-card-form"),h=document.querySelector(".popup_image"),S=document.querySelector(".popup_edit-avatar"),b=Array.from(document.querySelectorAll(".popup")),q=document.querySelector(".template").content,E=document.querySelector(".popup__image"),g=document.querySelector(".popup__title"),k=document.querySelector(".elements"),C=function(e){"Escape"===e.key&&x(document.querySelector(".popup_opened"))};function L(e){e.classList.add("popup_opened"),window.addEventListener("keydown",C)}function x(e){e.classList.remove("popup_opened"),window.removeEventListener("keydown",C)}function A(e){d.forEach((function(t){e?(t.textContent="Сохранить",t.disabled=!1):(t.textContent="Сохранение...",t.disabled=!0)}))}b.forEach((function(e){e.addEventListener("click",(function(t){t.target.classList.contains("popup")&&x(e)}))}));var w={baseUrl:"https://nomoreparties.co/v1/plus-cohort-18",headers:{authorization:"73a65b3f-f1cb-4973-9fdd-42c64f95341a","Content-Type":"application/json"}},U=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},j=function(e){return fetch(e,{headers:w.headers}).then((function(e){return U(e)}))};function O(t,n,r,o,c,a){var i=q.querySelector(".element").cloneNode(!0),u=i.querySelector(".element__like"),l=i.querySelector(".element__trash"),s=i.querySelector(".element__image"),d=i.querySelector(".element__like-number");return i.querySelector(".element__title").textContent=t,s.alt=t,s.src=n,a.filter((function(t){return t.name===e.textContent})).length>0&&u.classList.add("element__like_active"),u.addEventListener("click",(function(e){e.target.classList.contains("element__like_active")?(e.target.classList.remove("element__like_active"),function(e){return fetch("".concat(w.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:w.headers}).then((function(e){return U(e)}))}(c).then((function(e){d.textContent=e.likes.length})).catch((function(e){console.log(e)}))):(e.target.classList.add("element__like_active"),function(e){return fetch("".concat(w.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:w.headers}).then((function(e){return U(e)}))}(c).then((function(e){d.textContent=e.likes.length})).catch((function(e){console.log(e)})))})),d.textContent=a.length,r===o?l.addEventListener("click",(function(e){e.preventDefault(),function(e){return fetch("".concat(w.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:w.headers}).then((function(e){return U(e)}))}(c).then((function(){e.target.closest(".element").remove()})).catch((function(e){console.log(e)}))})):l.style.display="none",s.addEventListener("click",(function(){E.src=n,g.textContent=t,E.alt=t,L(h)})),i}function T(e){k.prepend(e)}var D=function(e,t,n){var r=t.querySelector(n.submitButtonSelector);e?(r.classList.add(n.inactiveButtonClass),r.disabled=!0):(r.classList.remove(n.inactiveButtonClass),r.disabled=!1)},P=function(e){return e.some((function(e){return!e.validity.valid}))},B=function(e,t,n){t.classList.add(".".concat(t.id,"-error")),e.querySelector(".".concat(t.id,"-error")).textContent=n},M=function(e,t,n){t.classList.remove(n.inputErrorClass),e.querySelector(".".concat(t.id,"-error")).textContent=""};function N(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var I={formElement:".edit-form",inputElement:".edit-form__input-text",submitButtonSelector:".edit-form__button",inactiveButtonClass:"edit-form__button_disabled",inputErrorClass:"edit-form__input-text_type_error",errorClass:".edit-form__input-error"};Promise.all([j("".concat(w.baseUrl,"/users/me")),j("".concat(w.baseUrl,"/cards"))]).then((function(r){var o,c,a=(c=2,function(e){if(Array.isArray(e))return e}(o=r)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return i}}(o,c)||function(e,t){if(e){if("string"==typeof e)return N(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?N(e,t):void 0}}(o,c)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),i=a[0],u=a[1];e.textContent=i.name,t.textContent=i.about,n.src=i.avatar;var l=i._id;!function(e,t){e.forEach((function(e){T(O(e.name,e.link,e.owner._id,t,e._id,e.likes))}))}(u.reverse(),l)})).catch((function(e){console.log(e)})),function(e){Array.from(document.querySelectorAll(e.formElement)).forEach((function(t){Array.from(t.querySelectorAll(e.inputElement)).forEach((function(n){!function(e,t,n){var r=Array.from(e.querySelectorAll(n.inputElement));t.addEventListener("input",(function(){!function(e,t,n,r){t.validity.patternMismatch?t.setCustomValidity(n):t.setCustomValidity(""),t.validity.valid?M(e,t,r):B(e,t,t.validationMessage)}(e,t,t.dataset.errorMessage,n),D(P(r),e,n)}))}(t,n,e)}))}))}(I),r.addEventListener("submit",(function(n){var r,o;n.preventDefault(),A(!1),(r=c.value,o=a.value,fetch("".concat(w.baseUrl,"/users/me"),{method:"PATCH",headers:w.headers,body:JSON.stringify({name:r,about:o})}).then((function(e){return U(e)}))).then((function(n){e.textContent=n.name,t.textContent=n.about,x(_)})).catch((function(e){console.log(e)})).finally((function(){A(!0)}))})),o.addEventListener("submit",(function(e){var t;e.preventDefault(),A(!1),(t=s.value,fetch("".concat(w.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:w.headers,body:JSON.stringify({avatar:t})}).then((function(e){return U(e)}))).then((function(t){n.src=t.avatar,x(S),D(!0,o,I),e.target.reset()})).catch((function(e){console.log(e)})).finally((function(){A(!0)}))})),i.addEventListener("submit",(function(e){var t,n;e.preventDefault(),A(!1),(t=u.value,n=l.value,fetch("".concat(w.baseUrl,"/cards"),{method:"POST",headers:w.headers,body:JSON.stringify({name:t,link:n})}).then((function(e){return U(e)}))).then((function(t){T(O(t.name,t.link,t.owner._id,t.owner._id,t._id,t.likes)),x(v),e.target.reset(),D(!0,v,I)})).catch((function(e){console.log(e)})).finally((function(){A(!0)}))})),f.forEach((function(e){var t=e.closest(".popup");e.addEventListener("click",(function(){x(t)}))})),m.addEventListener("click",(function(){c.value=e.textContent,a.value=t.textContent,L(_);var n=Array.from(r.querySelectorAll(".edit-form__input-text"));n.forEach((function(e){!function(e,t,n){""===t.value?B(e,t,t.validationMessage):M(e,t,n)}(r,e,I),D(P(n),_,I)}))})),p.addEventListener("click",(function(){L(v)})),y.addEventListener("click",(function(){L(S)}))})();