(this["webpackJsonpmy-vault"]=this["webpackJsonpmy-vault"]||[]).push([[0],{14:function(e,t,a){e.exports=a(48)},19:function(e,t,a){},20:function(e,t,a){},22:function(e,t,a){},43:function(e,t,a){},48:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),l=a(12),i=a.n(l),r=(a(19),a(2)),c=a(3),o=a(5),u=a(4),p=(a(20),a(1)),d=a.n(p),h=a(13),m=a(6),g=(a(22),a(8)),y=window.$,v=function(e){Object(o.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(r.a)(this,a),(n=t.call(this,e)).state={pubDisabled:!1,privDisabled:!1,encryptedData:null,decryptedData:null,input:null,key:null},n}return Object(c.a)(a,[{key:"handlePubClick",value:function(){this.setState({pubDisabled:!this.state.pubDisabled})}},{key:"handlePrivClick",value:function(){this.setState({privDisabled:!this.state.privDisabled})}},{key:"disabledPubInput",value:function(){return this.state.pubDisabled?s.a.createElement("div",{className:"input-group mb-3"},s.a.createElement("input",{type:"text",onPaste:this.handleChange.bind(this),onChange:this.handleChange.bind(this),className:"form-control",placeholder:this.langPublicKey(),"aria-describedby":"button-addon4",disabled:!0}),s.a.createElement("div",{className:"input-group-append",id:"button-addon4"},s.a.createElement("button",{className:"btn btn-outline-secondary",onClick:this.handlePubClick.bind(this)},this.langSave()))):s.a.createElement("div",{className:"input-group mb-3"},s.a.createElement("input",{type:"text",onPaste:this.handleChange.bind(this),onChange:this.handleChange.bind(this),className:"form-control",placeholder:this.langPublicKey(),"aria-describedby":"button-addon4"}),s.a.createElement("div",{className:"input-group-append",id:"button-addon4"},s.a.createElement("button",{className:"btn btn-outline-secondary",onClick:this.handlePubClick.bind(this),type:"button"},this.langSave())))}},{key:"disabledPrivInput",value:function(){return this.state.privDisabled?s.a.createElement("div",{className:"input-group mb-5"},s.a.createElement("input",{type:"text",id:"disabledTextInput",onPaste:this.handleChange.bind(this),onChange:this.handleChange.bind(this),className:"form-control",placeholder:this.langPrivateKey(),"aria-describedby":"button-addon5",disabled:!0}),s.a.createElement("div",{className:"input-group-append",id:"button-addon5"},s.a.createElement("button",{className:"btn btn-outline-secondary",onClick:this.handlePrivClick.bind(this),type:"button"},this.langSave()))):s.a.createElement("div",{className:"input-group mb-5"},s.a.createElement("input",{type:"text",id:"disabledTextInput",onPaste:this.handleChange.bind(this),onChange:this.handleChange.bind(this),className:"form-control",placeholder:this.langPrivateKey(),"aria-describedby":"button-addon5"}),s.a.createElement("div",{className:"input-group-append",id:"button-addon5"},s.a.createElement("button",{className:"btn btn-outline-secondary",onClick:this.handlePrivClick.bind(this),type:"button"},this.langSave())))}},{key:"decryptData",value:function(){var e=Object(m.a)(d.a.mark((function e(){var t,a,n,s,l,i,r,c,o;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,g.initWorker({path:"openpgp.worker.js"});case 3:return t=this.state.key.substr(96,743).replace(/\s+/g,"\n"),a=this.state.encryptedData.trim().substr(86),n="-----BEGIN PGP MESSAGE-----\n    Version: OpenPGP.js v4.10.7\n    Comment: https://openpgpjs.org\n"+a,s="-----BEGIN PGP PUBLIC KEY BLOCK-----\n    Version: OpenPGP.js v4.10.7\n    Comment: https://openpgpjs.org\n    \n"+t+"\n-----END PGP PUBLIC KEY BLOCK-----","",e.next=11,g.key.readArmored(s);case 11:return l=e.sent,i=Object(h.a)(l.keys,1),r=i[0],e.t0=g,e.next=17,g.message.readArmored(n);case 17:return e.t1=e.sent,e.t2=[r],e.t3={message:e.t1,privateKeys:e.t2},e.next=22,e.t0.decrypt.call(e.t0,e.t3);case 22:c=e.sent,o=c.data,this.setState({decryptedData:o}),this.setState({input:"",encryptedData:""}),e.next=31;break;case 28:e.prev=28,e.t4=e.catch(0),console.log(e.t4);case 31:case"end":return e.stop()}}),e,this,[[0,28]])})));return function(){return e.apply(this,arguments)}}()},{key:"encryptData",value:function(){var e=Object(m.a)(d.a.mark((function e(){var t,a,n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,g.initWorker({path:"openpgp.worker.js"});case 3:return t=this.state.key.substr(95,641).replace(/\s+/g,"\n"),a="-----BEGIN PGP PUBLIC KEY BLOCK-----\n    Version: OpenPGP.js v4.10.7\n    Comment: https://openpgpjs.org\n    "+t+"\n-----END PGP PUBLIC KEY BLOCK-----","",e.t0=g,e.t1=g.message.fromText(this.state.decryptedData.trim()),e.next=10,g.key.readArmored(a);case 10:return e.t2=e.sent.keys[0],e.t3={message:e.t1,publicKeys:e.t2},e.next=14,e.t0.encrypt.call(e.t0,e.t3);case 14:n=e.sent,this.setState({encryptedData:n.data}),this.setState({input:"",decryptedData:""}),e.next=23;break;case 19:e.prev=19,e.t4=e.catch(0),y(".modal").show(),console.log(e.t4.toString());case 23:case"end":return e.stop()}}),e,this,[[0,19]])})));return function(){return e.apply(this,arguments)}}()},{key:"handleChange",value:function(e){"dataTextField"===e.target.id&&""!==e.target.value?this.setState({input:e.target.value}):"disabledTextInput"===e.target.id&&""!==e.target.value?this.setState({key:e.target.value}):console.log("do nothing")}},{key:"handleClick",value:function(e){"Decrypt"===e.target.value?this.setState({encryptedData:this.state.input}):"Encrypt"===e.target.value?this.setState({decryptedData:this.state.input}):console.log("do nothing")}},{key:"textAreaClick",value:function(e){"Encrypt"===e.target.value&&null!==this.state.input&&null!==this.state.key?(this.handleClick(e),this.encryptData()):"Decrypt"===e.target.value&&null!==this.state.input&&null!==this.state.key?(this.handleClick(e),this.decryptData()):console.log("do nothing")}},{key:"showResults",value:function(){if(""===this.state.input){if(""===this.state.encryptedData)return s.a.createElement("div",{className:"h6"},s.a.createElement("small",null,this.state.decryptedData.split("\n").map((function(e,t){return s.a.createElement("div",{key:t},e)}))));if(""===this.state.decryptedData)return s.a.createElement("div",{className:"h6"},s.a.createElement("small",null,this.state.encryptedData.split("\n").map((function(e,t){return s.a.createElement("div",{key:t},e)}))))}}},{key:"langPublicKey",value:function(){return"EN"===this.props.lang?"Public Key":"Cl\xe9 Publique"}},{key:"langPrivateKey",value:function(){return"EN"===this.props.lang?"Private Key":"Cl\xe9 Priv\xe9e"}},{key:"langSave",value:function(){return"EN"===this.props.lang?"Save":"Sauver"}},{key:"langEncrypt",value:function(){return"EN"===this.props.lang?"Encrypt":"Crypter"}},{key:"langDecrypt",value:function(){return"EN"===this.props.lang?"Decrypt":"D\xe9crypter"}},{key:"langMesssageTo",value:function(){return"EN"===this.props.lang?"Message To Encode/Decode":"Message \xe0 Encoder/D\xe9coder"}},{key:"render",value:function(){return s.a.createElement("div",{className:"container"},this.disabledPubInput(),this.disabledPrivInput(),this.showResults(),s.a.createElement("div",{className:"form-group"},s.a.createElement("textarea",{className:"form-control",onChange:this.handleChange.bind(this),placeholder:this.langMesssageTo(),id:"dataTextField",rows:"3"}),s.a.createElement("div",{className:"m-3"},s.a.createElement("input",{className:"btn btn-outline-secondary mx-2",onClick:this.textAreaClick.bind(this),type:"submit",value:this.langEncrypt()}),s.a.createElement("input",{className:"btn btn-outline-secondary mx-2",onClick:this.textAreaClick.bind(this),type:"submit",value:this.langDecrypt()}))))}}]),a}(s.a.Component),b=a(8),E=(a(43),function(e){Object(o.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(r.a)(this,a),(n=t.call(this,e)).state={disabled:!0,pubKey:"",privKey:"",name:"Jon Smith",email:"jon@example.com",password:""},n}return Object(c.a)(a,[{key:"handleGameClik",value:function(){this.setState({disabled:!this.state.disabled})}},{key:"createKeyPair",value:function(){var e=Object(m.a)(d.a.mark((function e(){var t,a,n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(""!==this.state.pubKey){e.next=12;break}return e.next=3,b.generateKey({userIds:[{name:this.state.name,email:this.state.email}],curve:"p256",passphrase:this.state.password});case 3:return t=e.sent,a=t.privateKeyArmored,n=t.publicKeyArmored,t.revocationCertificate,this.setState({privKey:a}),this.setState({pubKey:n}),e.abrupt("return",{privKey:a,pubKey:n});case 12:this.setState({pubKey:""}),this.setState({privKey:""});case 14:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"langKey",value:function(){return"EN"===this.props.lang?"Key":"Cl\xe9"}},{key:"langPublicKey",value:function(){return"EN"===this.props.lang?"Public Key":"Cl\xe9 Publique"}},{key:"langPrivateKey",value:function(){return"EN"===this.props.lang?"Private Key":"Cl\xe9 Priv\xe9e"}},{key:"langGenerate",value:function(){return"EN"===this.props.lang?"Generate":"Produire"}},{key:"langCreate",value:function(){return"EN"===this.props.lang?"Create":"Cr\xe9er"}},{key:"langCanShare",value:function(){return"EN"===this.props.lang?"Can Share":"Peut Partager"}},{key:"langKeepSafe",value:function(){return"EN"===this.props.lang?"Keep Safe":"Gardez en S\xe9curit\xe9"}},{key:"langLoading",value:function(){return"EN"===this.props.lang?"Loading":"Chargement"}},{key:"handleChange",value:function(e){"name"===e.target.id&&""!==e.target.value?this.setState({name:e.target.value}):"email"===e.target.id&&""!==e.target.value?this.setState({email:e.target.value}):"password"===e.target.id&&""!==e.target.value?this.setState({password:e.target.value}):console.log("do nothing")}},{key:"langPassword",value:function(){return"EN"===this.props.lang?"Password":"Mot de passe"}},{key:"langName",value:function(){return"EN"===this.props.lang?"Name":"Nom"}},{key:"langExpert",value:function(){return"EN"===this.props.lang?"Expert Options(Will not work here!)":"Options Expert (Ne fonctionnera pas ici!)"}},{key:"langOptions",value:function(){return"EN"===this.props.lang?"Expert Options":"Options d'experts"}},{key:"langFillIn",value:function(){return"EN"===this.props.lang?"(Fill in then generate)":"(Remplissez puis g\xe9n\xe9rez)"}},{key:"render",value:function(){var e=this;return s.a.createElement("div",{className:"container my-5"},s.a.createElement("p",null,s.a.createElement("a",{className:"btn btn-dark","data-toggle":"collapse",href:"#multiCollapseExample1",role:"button","aria-expanded":"false","aria-controls":"multiCollapseExample1"},this.langCreate()," ",this.langKey(),"s")),s.a.createElement("div",{className:"row"},s.a.createElement("div",{className:"col"},s.a.createElement("div",{className:"collapse",id:"multiCollapseExample1"},s.a.createElement("div",{className:"card card-body bg-dark"},s.a.createElement("a",{role:"button",onClick:function(){e.handleGameClik.bind(e),e.createKeyPair()},"data-toggle":"collapse",className:"btn btn-secondary btn-sm m-1","aria-expanded":"false","aria-controls":"keysCollapse",href:"#keysCollapse"},this.langGenerate()," ",this.langKey()),s.a.createElement("a",{role:"button",onClick:this.handleGameClik.bind(this),"data-toggle":"collapse",className:"btn btn-secondary btn-sm m-1","aria-expanded":"false","aria-controls":"expertCollapse",href:"#expertCollapse"},this.langOptions()," ",this.langFillIn()),s.a.createElement("div",{className:"my-3 mx-3 collapse shadow text-center",id:"expertCollapse"},s.a.createElement("a",null,this.langExpert()),s.a.createElement("br",null),s.a.createElement("input",{type:"text",onPaste:this.handleChange.bind(this),onChange:this.handleChange.bind(this),className:"form-control w-50 m-2",placeholder:this.langName(),id:"name"}),s.a.createElement("input",{type:"text",onPaste:this.handleChange.bind(this),onChange:this.handleChange.bind(this),className:"form-control w-50 m-2",placeholder:"E-mail",id:"email"}),s.a.createElement("input",{type:"text",onPaste:this.handleChange.bind(this),onChange:this.handleChange.bind(this),className:"form-control w-50 m-2",placeholder:this.langPassword(),id:"password"})),s.a.createElement("a",{className:""===this.state.privKey?"invisible":""},this.langPrivateKey()," (",this.langKeepSafe(),"!):"),s.a.createElement("div",{className:"my-3 mx-3 collapse shadow",id:"keysCollapse"},s.a.createElement("div",{className:null==this.state.privKey?"":"d-none"},s.a.createElement("div",{className:"spinner-border m-5",role:"status"},s.a.createElement("span",{className:"sr-only"},"Loading..."))),s.a.createElement("div",{className:"h6"},s.a.createElement("small",null,this.state.privKey.split("\n").map((function(e,t){return s.a.createElement("div",{key:t},e)}))))),s.a.createElement("a",{className:""===this.state.privKey?"invisible":""},this.langPublicKey()," (",this.langCanShare(),"!):"),s.a.createElement("div",{className:"my-3 mx-3 collapse shadow",id:"keysCollapse"},s.a.createElement("div",{className:null==this.state.privKey?"":"d-none"},s.a.createElement("div",{className:"spinner-border m-5",role:"status"},s.a.createElement("span",{className:"sr-only"},this.langLoading(),"..."))),s.a.createElement("div",{className:"h6"},s.a.createElement("small",null,this.state.pubKey.split("\n").map((function(e,t){return s.a.createElement("div",{key:t},e)}))))))))))}}]),a}(s.a.Component)),k=function(e){Object(o.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(r.a)(this,a),(n=t.call(this,e)).state={lang:"EN"},n}return Object(c.a)(a,[{key:"handleLangSwitch",value:function(e){this.setState({lang:"EN"===this.state.lang?"FR":"EN"})}},{key:"langTitle",value:function(){return"EN"===this.state.lang?"MyVault":"Vo\xfbteMoi"}},{key:"render",value:function(){var e=this.state.lang;return s.a.createElement("div",{id:"App"},s.a.createElement("div",{className:"content container-fluid pt-5 text-center App-header"},s.a.createElement("nav",{className:"navbar fixed-top navbar-dark bg-dark"},s.a.createElement("a",{className:"navbar-brand",href:"/"},this.langTitle()),s.a.createElement("button",{className:"btn btn-secondary",onClick:this.handleLangSwitch.bind(this)},"EN"===this.state.lang?"EN":"FR")),s.a.createElement("div",{className:"row"},s.a.createElement("div",{className:"col"},s.a.createElement("h1",null,this.langTitle()," PGP"),s.a.createElement(v,{lang:e}),s.a.createElement(E,{lang:e})))))}}]),a}(s.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(44);a(45),i.a.render(s.a.createElement(s.a.StrictMode,null,s.a.createElement(k,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[14,1,2]]]);
//# sourceMappingURL=main.b3cc6507.chunk.js.map