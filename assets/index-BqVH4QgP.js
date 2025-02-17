import{r as T}from"./index-Dns8-6K5.js";import{h as y,j as k,k as I}from"./index-Dp0Tgd7f.js";const q=()=>"9.1.0",v=t=>t.toString(16).padStart(2,"0"),C=t=>{const e=new Uint8Array(t/2);return window.crypto.getRandomValues(e),Array.from(e,v).join("")},R=()=>typeof window<"u"?C(10):new Date().getTime().toString(36);class g{}g.makeRequest=(t,e)=>({id:R(),method:t,params:e,env:{sdkVersion:q()}});g.makeResponse=(t,e,s)=>({id:t,success:!0,version:s,data:e});g.makeErrorResponse=(t,e,s)=>({id:t,success:!1,error:e,version:s});var r;(function(t){t.sendTransactions="sendTransactions",t.rpcCall="rpcCall",t.getChainInfo="getChainInfo",t.getSafeInfo="getSafeInfo",t.getTxBySafeTxHash="getTxBySafeTxHash",t.getSafeBalances="getSafeBalances",t.signMessage="signMessage",t.signTypedMessage="signTypedMessage",t.getEnvironmentInfo="getEnvironmentInfo",t.getOffChainSignature="getOffChainSignature",t.requestAddressBook="requestAddressBook",t.wallet_getPermissions="wallet_getPermissions",t.wallet_requestPermissions="wallet_requestPermissions"})(r||(r={}));var m;(function(t){t.requestAddressBook="requestAddressBook"})(m||(m={}));class H{constructor(e=null,s=!1){this.allowedOrigins=null,this.callbacks=new Map,this.debugMode=!1,this.isServer=typeof window>"u",this.isValidMessage=({origin:a,data:n,source:i})=>{const o=!n,l=!this.isServer&&i===window.parent,u=typeof n.version<"u"&&parseInt(n.version.split(".")[0]),B=typeof u=="number"&&u>=1;let p=!0;return Array.isArray(this.allowedOrigins)&&(p=this.allowedOrigins.find(P=>P.test(a))!==void 0),!o&&l&&B&&p},this.logIncomingMessage=a=>{console.info(`Safe Apps SDK v1: A message was received from origin ${a.origin}. `,a.data)},this.onParentMessage=a=>{this.isValidMessage(a)&&(this.debugMode&&this.logIncomingMessage(a),this.handleIncomingMessage(a.data))},this.handleIncomingMessage=a=>{const{id:n}=a,i=this.callbacks.get(n);i&&(i(a),this.callbacks.delete(n))},this.send=(a,n)=>{const i=g.makeRequest(a,n);if(this.isServer)throw new Error("Window doesn't exist");return window.parent.postMessage(i,"*"),new Promise((o,l)=>{this.callbacks.set(i.id,u=>{if(!u.success){l(new Error(u.error));return}o(u)})})},this.allowedOrigins=e,this.debugMode=s,this.isServer||window.addEventListener("message",this.onParentMessage)}}const b=t=>typeof t=="object"&&t!=null&&"domain"in t&&"types"in t&&"message"in t;T();class E{constructor(e){this.communicator=e}async getBySafeTxHash(e){if(!e)throw new Error("Invalid safeTxHash");return(await this.communicator.send(r.getTxBySafeTxHash,{safeTxHash:e})).data}async signMessage(e){const s={message:e};return(await this.communicator.send(r.signMessage,s)).data}async signTypedMessage(e){if(!b(e))throw new Error("Invalid typed data");return(await this.communicator.send(r.signTypedMessage,{typedData:e})).data}async send({txs:e,params:s}){if(!e||!e.length)throw new Error("No transactions were passed");const a={txs:e,params:s};return(await this.communicator.send(r.sendTransactions,a)).data}}const c={eth_call:"eth_call",eth_gasPrice:"eth_gasPrice",eth_getLogs:"eth_getLogs",eth_getBalance:"eth_getBalance",eth_getCode:"eth_getCode",eth_getBlockByHash:"eth_getBlockByHash",eth_getBlockByNumber:"eth_getBlockByNumber",eth_getStorageAt:"eth_getStorageAt",eth_getTransactionByHash:"eth_getTransactionByHash",eth_getTransactionReceipt:"eth_getTransactionReceipt",eth_getTransactionCount:"eth_getTransactionCount",eth_estimateGas:"eth_estimateGas",safe_setSettings:"safe_setSettings"},h={defaultBlockParam:(t="latest")=>t,returnFullTxObjectParam:(t=!1)=>t,blockNumberToHex:t=>Number.isInteger(t)?`0x${t.toString(16)}`:t};class A{constructor(e){this.communicator=e,this.call=this.buildRequest({call:c.eth_call,formatters:[null,h.defaultBlockParam]}),this.getBalance=this.buildRequest({call:c.eth_getBalance,formatters:[null,h.defaultBlockParam]}),this.getCode=this.buildRequest({call:c.eth_getCode,formatters:[null,h.defaultBlockParam]}),this.getStorageAt=this.buildRequest({call:c.eth_getStorageAt,formatters:[null,h.blockNumberToHex,h.defaultBlockParam]}),this.getPastLogs=this.buildRequest({call:c.eth_getLogs}),this.getBlockByHash=this.buildRequest({call:c.eth_getBlockByHash,formatters:[null,h.returnFullTxObjectParam]}),this.getBlockByNumber=this.buildRequest({call:c.eth_getBlockByNumber,formatters:[h.blockNumberToHex,h.returnFullTxObjectParam]}),this.getTransactionByHash=this.buildRequest({call:c.eth_getTransactionByHash}),this.getTransactionReceipt=this.buildRequest({call:c.eth_getTransactionReceipt}),this.getTransactionCount=this.buildRequest({call:c.eth_getTransactionCount,formatters:[null,h.defaultBlockParam]}),this.getGasPrice=this.buildRequest({call:c.eth_gasPrice}),this.getEstimateGas=s=>this.buildRequest({call:c.eth_estimateGas})([s]),this.setSafeSettings=this.buildRequest({call:c.safe_setSettings})}buildRequest(e){const{call:s,formatters:a}=e;return async n=>{a&&Array.isArray(n)&&a.forEach((l,u)=>{l&&(n[u]=l(n[u]))});const i={call:s,params:n||[]};return(await this.communicator.send(r.rpcCall,i)).data}}}const x="0x1626ba7e",O="0x20c13b0b",f=4001;class d extends Error{constructor(e,s,a){super(e),this.code=s,this.data=a,Object.setPrototypeOf(this,d.prototype)}}class S{constructor(e){this.communicator=e}async getPermissions(){return(await this.communicator.send(r.wallet_getPermissions,void 0)).data}async requestPermissions(e){if(!this.isPermissionRequestValid(e))throw new d("Permissions request is invalid",f);try{return(await this.communicator.send(r.wallet_requestPermissions,e)).data}catch{throw new d("Permissions rejected",f)}}isPermissionRequestValid(e){return e.every(s=>typeof s=="object"?Object.keys(s).every(a=>!!Object.values(m).includes(a)):!1)}}const w=(t,e)=>e.some(s=>s.parentCapability===t),V=()=>(t,e,s)=>{const a=s.value;return s.value=async function(){const n=new S(this.communicator);let i=await n.getPermissions();if(w(e,i)||(i=await n.requestPermissions([{[e]:{}}])),!w(e,i))throw new d("Permissions rejected",f);return a.apply(this)},s};var M=function(t,e,s,a){var n=arguments.length,i=n<3?e:a===null?a=Object.getOwnPropertyDescriptor(e,s):a,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,s,a);else for(var l=t.length-1;l>=0;l--)(o=t[l])&&(i=(n<3?o(i):n>3?o(e,s,i):o(e,s))||i);return n>3&&i&&Object.defineProperty(e,s,i),i};class _{constructor(e){this.communicator=e}async getChainInfo(){return(await this.communicator.send(r.getChainInfo,void 0)).data}async getInfo(){return(await this.communicator.send(r.getSafeInfo,void 0)).data}async experimental_getBalances({currency:e="usd"}={}){return(await this.communicator.send(r.getSafeBalances,{currency:e})).data}async check1271Signature(e,s="0x"){const a=await this.getInfo(),n=y({abi:[{constant:!1,inputs:[{name:"_dataHash",type:"bytes32"},{name:"_signature",type:"bytes"}],name:"isValidSignature",outputs:[{name:"",type:"bytes4"}],payable:!1,stateMutability:"nonpayable",type:"function"}],functionName:"isValidSignature",args:[e,s]}),i={call:c.eth_call,params:[{to:a.safeAddress,data:n},"latest"]};try{return(await this.communicator.send(r.rpcCall,i)).data.slice(0,10).toLowerCase()===x}catch{return!1}}async check1271SignatureBytes(e,s="0x"){const a=await this.getInfo(),n=y({abi:[{constant:!1,inputs:[{name:"_data",type:"bytes"},{name:"_signature",type:"bytes"}],name:"isValidSignature",outputs:[{name:"",type:"bytes4"}],payable:!1,stateMutability:"nonpayable",type:"function"}],functionName:"isValidSignature",args:[e,s]}),i={call:c.eth_call,params:[{to:a.safeAddress,data:n},"latest"]};try{return(await this.communicator.send(r.rpcCall,i)).data.slice(0,10).toLowerCase()===O}catch{return!1}}calculateMessageHash(e){return k(e)}calculateTypedMessageHash(e){const s=typeof e.domain.chainId=="object"?e.domain.chainId.toNumber():Number(e.domain.chainId);let a=e.primaryType;if(!a){const n=Object.values(e.types),i=Object.keys(e.types).filter(o=>n.every(l=>l.every(({type:u})=>u.replace("[","").replace("]","")!==o)));if(i.length===0||i.length>1)throw new Error("Please specify primaryType");a=i[0]}return I({message:e.message,domain:{...e.domain,chainId:s,verifyingContract:e.domain.verifyingContract,salt:e.domain.salt},types:e.types,primaryType:a})}async getOffChainSignature(e){return(await this.communicator.send(r.getOffChainSignature,e)).data}async isMessageSigned(e,s="0x"){let a;if(typeof e=="string"&&(a=async()=>{const n=this.calculateMessageHash(e);return await this.isMessageHashSigned(n,s)}),b(e)&&(a=async()=>{const n=this.calculateTypedMessageHash(e);return await this.isMessageHashSigned(n,s)}),a)return await a();throw new Error("Invalid message type")}async isMessageHashSigned(e,s="0x"){const a=[this.check1271Signature.bind(this),this.check1271SignatureBytes.bind(this)];for(const n of a)if(await n(e,s))return!0;return!1}async getEnvironmentInfo(){return(await this.communicator.send(r.getEnvironmentInfo,void 0)).data}async requestAddressBook(){return(await this.communicator.send(r.requestAddressBook,void 0)).data}}M([V()],_.prototype,"requestAddressBook",null);class D{constructor(e={}){const{allowedDomains:s=null,debug:a=!1}=e;this.communicator=new H(s,a),this.eth=new A(this.communicator),this.txs=new E(this.communicator),this.safe=new _(this.communicator),this.wallet=new S(this.communicator)}}export{g as MessageFormatter,r as Methods,c as RPC_CALLS,m as RestrictedMethods,D as default,q as getSDKVersion,b as isObjectEIP712TypedData};
