(function () {
  'use strict';

  var n$1,l$1,u$1,i$1,o$1,r$1,f$1,c$1={},s$1=[],a$1=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,h$1=Array.isArray;function v$1(n,l){for(var u in l)n[u]=l[u];return n}function p$1(n){var l=n.parentNode;l&&l.removeChild(n);}function y(l,u,t){var i,o,r,f={};for(r in u)"key"==r?i=u[r]:"ref"==r?o=u[r]:f[r]=u[r];if(arguments.length>2&&(f.children=arguments.length>3?n$1.call(arguments,2):t),"function"==typeof l&&null!=l.defaultProps)for(r in l.defaultProps)void 0===f[r]&&(f[r]=l.defaultProps[r]);return d$1(l,f,i,o,null)}function d$1(n,t,i,o,r){var f={type:n,props:t,key:i,ref:o,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:null==r?++u$1:r};return null==r&&null!=l$1.vnode&&l$1.vnode(f),f}function k$1(n){return n.children}function b$1(n,l){this.props=n,this.context=l;}function g$1(n,l){if(null==l)return n.__?g$1(n.__,n.__.__k.indexOf(n)+1):null;for(var u;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e)return u.__e;return "function"==typeof n.type?g$1(n):null}function m$2(n){var l,u;if(null!=(n=n.__)&&null!=n.__c){for(n.__e=n.__c.base=null,l=0;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e){n.__e=n.__c.base=u.__e;break}return m$2(n)}}function w$1(n){(!n.__d&&(n.__d=!0)&&i$1.push(n)&&!x.__r++||o$1!==l$1.debounceRendering)&&((o$1=l$1.debounceRendering)||r$1)(x);}function x(){var n,l,u,t,o,r,e,c,s;for(i$1.sort(f$1);n=i$1.shift();)n.__d&&(l=i$1.length,t=void 0,o=void 0,r=void 0,c=(e=(u=n).__v).__e,(s=u.__P)&&(t=[],o=[],(r=v$1({},e)).__v=e.__v+1,L(s,e,r,u.__n,void 0!==s.ownerSVGElement,null!=e.__h?[c]:null,t,null==c?g$1(e):c,e.__h,o),M(t,e,o),e.__e!=c&&m$2(e)),i$1.length>l&&i$1.sort(f$1));x.__r=0;}function P(n,l,u,t,i,o,r,f,e,a,v){var p,y,_,b,m,w,x,P,C,H=0,I=t&&t.__k||s$1,T=I.length,j=T,z=l.length;for(u.__k=[],p=0;p<z;p++)null!=(b=u.__k[p]=null==(b=l[p])||"boolean"==typeof b||"function"==typeof b?null:"string"==typeof b||"number"==typeof b||"bigint"==typeof b?d$1(null,b,null,null,b):h$1(b)?d$1(k$1,{children:b},null,null,null):b.__b>0?d$1(b.type,b.props,b.key,b.ref?b.ref:null,b.__v):b)?(b.__=u,b.__b=u.__b+1,-1===(P=A(b,I,x=p+H,j))?_=c$1:(_=I[P]||c$1,I[P]=void 0,j--),L(n,b,_,i,o,r,f,e,a,v),m=b.__e,(y=b.ref)&&_.ref!=y&&(_.ref&&O(_.ref,null,b),v.push(y,b.__c||m,b)),null!=m&&(null==w&&(w=m),(C=_===c$1||null===_.__v)?-1==P&&H--:P!==x&&(P===x+1?H++:P>x?j>z-x?H+=P-x:H--:H=P<x&&P==x-1?P-x:0),x=p+H,"function"!=typeof b.type||P===x&&_.__k!==b.__k?"function"==typeof b.type||P===x&&!C?void 0!==b.__d?(e=b.__d,b.__d=void 0):e=m.nextSibling:e=S(n,m,e):e=$(b,e,n),"function"==typeof u.type&&(u.__d=e))):(_=I[p])&&null==_.key&&_.__e&&(_.__e==e&&(e=g$1(_)),q(_,_,!1),I[p]=null);for(u.__e=w,p=T;p--;)null!=I[p]&&("function"==typeof u.type&&null!=I[p].__e&&I[p].__e==u.__d&&(u.__d=I[p].__e.nextSibling),q(I[p],I[p]));}function $(n,l,u){for(var t,i=n.__k,o=0;i&&o<i.length;o++)(t=i[o])&&(t.__=n,l="function"==typeof t.type?$(t,l,u):S(u,t.__e,l));return l}function S(n,l,u){return null==u||u.parentNode!==n?n.insertBefore(l,null):l==u&&null!=l.parentNode||n.insertBefore(l,u),l.nextSibling}function A(n,l,u,t){var i=n.key,o=n.type,r=u-1,f=u+1,e=l[u];if(null===e||e&&i==e.key&&o===e.type)return u;if(t>(null!=e?1:0))for(;r>=0||f<l.length;){if(r>=0){if((e=l[r])&&i==e.key&&o===e.type)return r;r--;}if(f<l.length){if((e=l[f])&&i==e.key&&o===e.type)return f;f++;}}return -1}function H(n,l,u,t,i){var o;for(o in u)"children"===o||"key"===o||o in l||T(n,o,null,u[o],t);for(o in l)i&&"function"!=typeof l[o]||"children"===o||"key"===o||"value"===o||"checked"===o||u[o]===l[o]||T(n,o,l[o],u[o],t);}function I(n,l,u){"-"===l[0]?n.setProperty(l,null==u?"":u):n[l]=null==u?"":"number"!=typeof u||a$1.test(l)?u:u+"px";}function T(n,l,u,t,i){var o;n:if("style"===l)if("string"==typeof u)n.style.cssText=u;else {if("string"==typeof t&&(n.style.cssText=t=""),t)for(l in t)u&&l in u||I(n.style,l,"");if(u)for(l in u)t&&u[l]===t[l]||I(n.style,l,u[l]);}else if("o"===l[0]&&"n"===l[1])o=l!==(l=l.replace(/(PointerCapture)$|Capture$/,"$1")),l=l.toLowerCase()in n?l.toLowerCase().slice(2):l.slice(2),n.l||(n.l={}),n.l[l+o]=u,u?t||n.addEventListener(l,o?z$1:j$1,o):n.removeEventListener(l,o?z$1:j$1,o);else if("dangerouslySetInnerHTML"!==l){if(i)l=l.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if("width"!==l&&"height"!==l&&"href"!==l&&"list"!==l&&"form"!==l&&"tabIndex"!==l&&"download"!==l&&"rowSpan"!==l&&"colSpan"!==l&&l in n)try{n[l]=null==u?"":u;break n}catch(n){}"function"==typeof u||(null==u||!1===u&&"-"!==l[4]?n.removeAttribute(l):n.setAttribute(l,u));}}function j$1(n){return this.l[n.type+!1](l$1.event?l$1.event(n):n)}function z$1(n){return this.l[n.type+!0](l$1.event?l$1.event(n):n)}function L(n,u,t,i,o,r,f,e,c,s){var a,p,y,d,_,g,m,w,x,$,C,S,A,H,I,T=u.type;if(void 0!==u.constructor)return null;null!=t.__h&&(c=t.__h,e=u.__e=t.__e,u.__h=null,r=[e]),(a=l$1.__b)&&a(u);n:if("function"==typeof T)try{if(w=u.props,x=(a=T.contextType)&&i[a.__c],$=a?x?x.props.value:a.__:i,t.__c?m=(p=u.__c=t.__c).__=p.__E:("prototype"in T&&T.prototype.render?u.__c=p=new T(w,$):(u.__c=p=new b$1(w,$),p.constructor=T,p.render=B$1),x&&x.sub(p),p.props=w,p.state||(p.state={}),p.context=$,p.__n=i,y=p.__d=!0,p.__h=[],p._sb=[]),null==p.__s&&(p.__s=p.state),null!=T.getDerivedStateFromProps&&(p.__s==p.state&&(p.__s=v$1({},p.__s)),v$1(p.__s,T.getDerivedStateFromProps(w,p.__s))),d=p.props,_=p.state,p.__v=u,y)null==T.getDerivedStateFromProps&&null!=p.componentWillMount&&p.componentWillMount(),null!=p.componentDidMount&&p.__h.push(p.componentDidMount);else {if(null==T.getDerivedStateFromProps&&w!==d&&null!=p.componentWillReceiveProps&&p.componentWillReceiveProps(w,$),!p.__e&&(null!=p.shouldComponentUpdate&&!1===p.shouldComponentUpdate(w,p.__s,$)||u.__v===t.__v)){for(u.__v!==t.__v&&(p.props=w,p.state=p.__s,p.__d=!1),u.__e=t.__e,u.__k=t.__k,u.__k.forEach(function(n){n&&(n.__=u);}),C=0;C<p._sb.length;C++)p.__h.push(p._sb[C]);p._sb=[],p.__h.length&&f.push(p);break n}null!=p.componentWillUpdate&&p.componentWillUpdate(w,p.__s,$),null!=p.componentDidUpdate&&p.__h.push(function(){p.componentDidUpdate(d,_,g);});}if(p.context=$,p.props=w,p.__P=n,p.__e=!1,S=l$1.__r,A=0,"prototype"in T&&T.prototype.render){for(p.state=p.__s,p.__d=!1,S&&S(u),a=p.render(p.props,p.state,p.context),H=0;H<p._sb.length;H++)p.__h.push(p._sb[H]);p._sb=[];}else do{p.__d=!1,S&&S(u),a=p.render(p.props,p.state,p.context),p.state=p.__s;}while(p.__d&&++A<25);p.state=p.__s,null!=p.getChildContext&&(i=v$1(v$1({},i),p.getChildContext())),y||null==p.getSnapshotBeforeUpdate||(g=p.getSnapshotBeforeUpdate(d,_)),P(n,h$1(I=null!=a&&a.type===k$1&&null==a.key?a.props.children:a)?I:[I],u,t,i,o,r,f,e,c,s),p.base=u.__e,u.__h=null,p.__h.length&&f.push(p),m&&(p.__E=p.__=null);}catch(n){u.__v=null,(c||null!=r)&&(u.__e=e,u.__h=!!c,r[r.indexOf(e)]=null),l$1.__e(n,u,t);}else null==r&&u.__v===t.__v?(u.__k=t.__k,u.__e=t.__e):u.__e=N(t.__e,u,t,i,o,r,f,c,s);(a=l$1.diffed)&&a(u);}function M(n,u,t){for(var i=0;i<t.length;i++)O(t[i],t[++i],t[++i]);l$1.__c&&l$1.__c(u,n),n.some(function(u){try{n=u.__h,u.__h=[],n.some(function(n){n.call(u);});}catch(n){l$1.__e(n,u.__v);}});}function N(l,u,t,i,o,r,f,e,s){var a,v,y,d=t.props,_=u.props,k=u.type,b=0;if("svg"===k&&(o=!0),null!=r)for(;b<r.length;b++)if((a=r[b])&&"setAttribute"in a==!!k&&(k?a.localName===k:3===a.nodeType)){l=a,r[b]=null;break}if(null==l){if(null===k)return document.createTextNode(_);l=o?document.createElementNS("http://www.w3.org/2000/svg",k):document.createElement(k,_.is&&_),r=null,e=!1;}if(null===k)d===_||e&&l.data===_||(l.data=_);else {if(r=r&&n$1.call(l.childNodes),v=(d=t.props||c$1).dangerouslySetInnerHTML,y=_.dangerouslySetInnerHTML,!e){if(null!=r)for(d={},b=0;b<l.attributes.length;b++)d[l.attributes[b].name]=l.attributes[b].value;(y||v)&&(y&&(v&&y.__html==v.__html||y.__html===l.innerHTML)||(l.innerHTML=y&&y.__html||""));}if(H(l,_,d,o,e),y)u.__k=[];else if(P(l,h$1(b=u.props.children)?b:[b],u,t,i,o&&"foreignObject"!==k,r,f,r?r[0]:t.__k&&g$1(t,0),e,s),null!=r)for(b=r.length;b--;)null!=r[b]&&p$1(r[b]);e||("value"in _&&void 0!==(b=_.value)&&(b!==l.value||"progress"===k&&!b||"option"===k&&b!==d.value)&&T(l,"value",b,d.value,!1),"checked"in _&&void 0!==(b=_.checked)&&b!==l.checked&&T(l,"checked",b,d.checked,!1));}return l}function O(n,u,t){try{"function"==typeof n?n(u):n.current=u;}catch(n){l$1.__e(n,t);}}function q(n,u,t){var i,o;if(l$1.unmount&&l$1.unmount(n),(i=n.ref)&&(i.current&&i.current!==n.__e||O(i,null,u)),null!=(i=n.__c)){if(i.componentWillUnmount)try{i.componentWillUnmount();}catch(n){l$1.__e(n,u);}i.base=i.__P=null,n.__c=void 0;}if(i=n.__k)for(o=0;o<i.length;o++)i[o]&&q(i[o],u,t||"function"!=typeof n.type);t||null==n.__e||p$1(n.__e),n.__=n.__e=n.__d=void 0;}function B$1(n,l,u){return this.constructor(n,u)}function D(u,t,i){var o,r,f,e;l$1.__&&l$1.__(u,t),r=(o="function"==typeof i)?null:i&&i.__k||t.__k,f=[],e=[],L(t,u=(!o&&i||t).__k=y(k$1,null,[u]),r||c$1,c$1,void 0!==t.ownerSVGElement,!o&&i?[i]:r?null:t.firstChild?n$1.call(t.childNodes):null,f,!o&&i?i:r?r.__e:t.firstChild,o,e),M(f,u,e);}n$1=s$1.slice,l$1={__e:function(n,l,u,t){for(var i,o,r;l=l.__;)if((i=l.__c)&&!i.__)try{if((o=i.constructor)&&null!=o.getDerivedStateFromError&&(i.setState(o.getDerivedStateFromError(n)),r=i.__d),null!=i.componentDidCatch&&(i.componentDidCatch(n,t||{}),r=i.__d),r)return i.__E=i}catch(l){n=l;}throw n}},u$1=0,b$1.prototype.setState=function(n,l){var u;u=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=v$1({},this.state),"function"==typeof n&&(n=n(v$1({},u),this.props)),n&&v$1(u,n),null!=n&&this.__v&&(l&&this._sb.push(l),w$1(this));},b$1.prototype.forceUpdate=function(n){this.__v&&(this.__e=!0,n&&this.__h.push(n),w$1(this));},b$1.prototype.render=k$1,i$1=[],r$1="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,f$1=function(n,l){return n.__v.__b-l.__v.__b},x.__r=0;

  var n=function(t,s,r,e){var u;s[0]=0;for(var h=1;h<s.length;h++){var p=s[h++],a=s[h]?(s[0]|=p?1:2,r[s[h++]]):s[++h];3===p?e[0]=a:4===p?e[1]=Object.assign(e[1]||{},a):5===p?(e[1]=e[1]||{})[s[++h]]=a:6===p?e[1][s[++h]]+=a+"":p?(u=t.apply(a,n(t,a,r,["",null])),e.push(u),a[0]?s[0]|=2:(s[h-2]=0,s[h]=u)):e.push(a);}return e},t$1=new Map;function e$1(s){var r=t$1.get(this);return r||(r=new Map,t$1.set(this,r)),(r=n(this,r.get(s)||(r.set(s,r=function(n){for(var t,s,r=1,e="",u="",h=[0],p=function(n){1===r&&(n||(e=e.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?h.push(0,n,e):3===r&&(n||e)?(h.push(3,n,e),r=2):2===r&&"..."===e&&n?h.push(4,n,0):2===r&&e&&!n?h.push(5,0,!0,e):r>=5&&((e||!n&&5===r)&&(h.push(r,0,e,s),r=6),n&&(h.push(r,n,0,s),r=6)),e="";},a=0;a<n.length;a++){a&&(1===r&&p(),p(a));for(var l=0;l<n[a].length;l++)t=n[a][l],1===r?"<"===t?(p(),h=[h],r=3):e+=t:4===r?"--"===e&&">"===t?(r=1,e=""):e=t+e[0]:u?t===u?u="":e+=t:'"'===t||"'"===t?u=t:">"===t?(p(),r=1):r&&("="===t?(r=5,s=e,e=""):"/"===t&&(r<5||">"===n[a][l+1])?(p(),3===r&&(h=h[0]),r=h,(h=h[0]).push(2,0,r),r=0):" "===t||"\t"===t||"\n"===t||"\r"===t?(p(),r=2):e+=t),3===r&&"!--"===e&&(r=4,h=h[0]);}return p(),h}(s)),r),arguments,[])).length>1?r:r[0]}

  var m$1=e$1.bind(y);

  var t,r,u,i,o=0,f=[],c=[],e=l$1.__b,a=l$1.__r,v=l$1.diffed,l=l$1.__c,m=l$1.unmount;function d(t,u){l$1.__h&&l$1.__h(r,t,o||u),o=0;var i=r.__H||(r.__H={__:[],__h:[]});return t>=i.__.length&&i.__.push({__V:c}),i.__[t]}function h(n){return o=1,s(B,n)}function s(n,u,i){var o=d(t++,2);if(o.t=n,!o.__c&&(o.__=[i?i(u):B(void 0,u),function(n){var t=o.__N?o.__N[0]:o.__[0],r=o.t(t,n);t!==r&&(o.__N=[r,o.__[1]],o.__c.setState({}));}],o.__c=r,!r.u)){var f=function(n,t,r){if(!o.__c.__H)return !0;var u=o.__c.__H.__.filter(function(n){return n.__c});if(u.every(function(n){return !n.__N}))return !c||c.call(this,n,t,r);var i=!1;return u.forEach(function(n){if(n.__N){var t=n.__[0];n.__=n.__N,n.__N=void 0,t!==n.__[0]&&(i=!0);}}),!(!i&&o.__c.props===n)&&(!c||c.call(this,n,t,r))};r.u=!0;var c=r.shouldComponentUpdate,e=r.componentWillUpdate;r.componentWillUpdate=function(n,t,r){if(this.__e){var u=c;c=void 0,f(n,t,r),c=u;}e&&e.call(this,n,t,r);},r.shouldComponentUpdate=f;}return o.__N||o.__}function p(u,i){var o=d(t++,3);!l$1.__s&&z(o.__H,i)&&(o.__=u,o.i=i,r.__H.__h.push(o));}function b(){for(var t;t=f.shift();)if(t.__P&&t.__H)try{t.__H.__h.forEach(k),t.__H.__h.forEach(w),t.__H.__h=[];}catch(r){t.__H.__h=[],l$1.__e(r,t.__v);}}l$1.__b=function(n){r=null,e&&e(n);},l$1.__r=function(n){a&&a(n),t=0;var i=(r=n.__c).__H;i&&(u===r?(i.__h=[],r.__h=[],i.__.forEach(function(n){n.__N&&(n.__=n.__N),n.__V=c,n.__N=n.i=void 0;})):(i.__h.forEach(k),i.__h.forEach(w),i.__h=[],t=0)),u=r;},l$1.diffed=function(t){v&&v(t);var o=t.__c;o&&o.__H&&(o.__H.__h.length&&(1!==f.push(o)&&i===l$1.requestAnimationFrame||((i=l$1.requestAnimationFrame)||j)(b)),o.__H.__.forEach(function(n){n.i&&(n.__H=n.i),n.__V!==c&&(n.__=n.__V),n.i=void 0,n.__V=c;})),u=r=null;},l$1.__c=function(t,r){r.some(function(t){try{t.__h.forEach(k),t.__h=t.__h.filter(function(n){return !n.__||w(n)});}catch(u){r.some(function(n){n.__h&&(n.__h=[]);}),r=[],l$1.__e(u,t.__v);}}),l&&l(t,r);},l$1.unmount=function(t){m&&m(t);var r,u=t.__c;u&&u.__H&&(u.__H.__.forEach(function(n){try{k(n);}catch(n){r=n;}}),u.__H=void 0,r&&l$1.__e(r,u.__v));};var g="function"==typeof requestAnimationFrame;function j(n){var t,r=function(){clearTimeout(u),g&&cancelAnimationFrame(t),setTimeout(n);},u=setTimeout(r,100);g&&(t=requestAnimationFrame(r));}function k(n){var t=r,u=n.__c;"function"==typeof u&&(n.__c=void 0,u()),r=t;}function w(n){var t=r;n.__c=n.__(),r=t;}function z(n,t){return !n||n.length!==t.length||t.some(function(t,r){return t!==n[r]})}function B(n,t){return "function"==typeof t?t(n):t}

  const VoteReadyChecklist = (props) => {
    const [tasks, setTasks] = h({
      registerToVote: false,
      learnAboutCandidates: false,
      findPollingStation: false,
    });
    

    p(() => {
      fetchData();
    }, []);

    async function fetchData() {
      const res = await fetch(`https://cxka1yt3tj.execute-api.us-east-1.amazonaws.com/test/task?userId=${props.userId}` , {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
        }
      });
      
      if( res.ok ) {
        let json = await res.json();
        setTasks(json);
        // Calculate completion progress
      const completedTasks = Object.values(json).filter((task) => task).length;
      const totalTasks = Object.keys(json).length;
      const progress = (completedTasks / totalTasks) * 100;
      document.getElementById('progress-bar').style.width = progress + '%';
      }

      if( ! res.ok ) ;
    }
    const toggleTask = async (taskName) => {
      const updatedTasks = { ...tasks, [taskName]: !(tasks[taskName]) };
      // Calculate completion progress
      const completedTasks = Object.values(updatedTasks).filter((task) => task).length;
      const totalTasks = Object.keys(updatedTasks).length;
      const progress = (completedTasks / totalTasks) * 100;
      document.getElementById('progress-bar').style.width = progress + '%';
      // Check if the previous task is completed
      if (
        taskName === 'learnAboutCandidates' &&
        !updatedTasks['registerToVote']
      ) {
        return;
      }

      if (taskName === 'findPollingStation' && !updatedTasks['learnAboutCandidates']) {
        return;
      }

      setTasks(updatedTasks);
      try {
        // Send a POST request to save completion status
        let userId='04f864d8-90e1-701e-0969-2827cccee612';
        console.log(taskName);
        const response = await fetch(
          `https://cxka1yt3tj.execute-api.us-east-1.amazonaws.com/test/task?userId=${props.userId}&taskName=${taskName}`,
          {
            method: 'POST'
          }
        );
        console.log(`https://cxka1yt3tj.execute-api.us-east-1.amazonaws.com/test/task?userId=${props.userId}&taskName=${taskName}`);
        const data = await response.json();
        // Handle the response if necessary
        console.log('Task completion status saved:', data);
      } catch (error) {
        console.error('Error saving task completion status:', error);
      }
      //fetchData();
    };

    return m$1`
    <div className="container mt-5">
    <h5 class="section-title h1">${props.givenName}'s Vote Ready Checklist</h5>
      <br/>
      <div className="row">
        <div className="col-md-4">
          <div className="task text-center">
            <div>
              <i
                className="fa fa-user task-icon"
                style="font-size: 5em;"
              ></i>
            </div>
            <div>Register to Vote</div>
            <div>
              <i
                className=${`fa ${
                  tasks.registerToVote ? 'fa-check-circle text-success' : 'fa-circle-xmark'
                }`}
                onClick=${() => toggleTask('registerToVote')}
                style="font-size: 3em;"
              ></i>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="task text-center">
            <div>
              <i
                className="fa fa-info-circle task-icon"
                style="font-size: 5em;"
              ></i>
            </div>
            <div>Learn About Candidates</div>
            <div>
              <i
                className=${`fa ${
                  tasks.learnAboutCandidates  ? 'fa-check-circle text-success' : 'fa-circle-xmark'
                }`}
                onClick=${() => toggleTask('learnAboutCandidates')}
                style="font-size: 3em;"
              ></i>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="task text-center">
            <div>
              <i
                className="fa fa-map-marker task-icon"
                style="font-size: 5em;"
              ></i>
            </div>
            <div>Find Polling Station</div>
            <div>
              <i
                className=${`fa ${
                  tasks.findPollingStation ? 'fa-check-circle text-success' : 'fa-circle-xmark'
                }`}
                onClick=${() => toggleTask('findPollingStation')}
                style="font-size: 3em;"
              ></i>
            </div>
          </div>
        </div>
      </div>
      <div className="progress mt-3">
        <div
          id="progress-bar"
          className="progress-bar bg-success"
          role="progressbar"
          style="width: 0%"
        ></div>
      </div>
    </div>
  `;
  };

  const CandidateQuiz = () => {
    const [questions, setQuestions] = h([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = h(0);
    const [selectedCandidate, setSelectedCandidate] = h(null);
    const [correctCandidate, setCorrectCandidate] = h(null);

    p(() => {
      // Fetch questions from the API
      fetch('https://d3je6q80rdriuv.cloudfront.net/questions.json')
        .then((response) => response.json())
        .then((data) => {
          setQuestions(data);
        })
        .catch((error) => {
          console.error('Error fetching questions:', error);
        });
    }, []); // Empty dependency array to fetch questions once when the component mounts

    const currentQuestion = questions[currentQuestionIndex];

    const handleCandidateClick = (candidate) => {
      setSelectedCandidate(candidate);

      if (candidate.isCorrect) {
        setCorrectCandidate(candidate);
      } else {
        setCorrectCandidate(null);
      }
    };

    const handleNextQuestion = () => {
      setSelectedCandidate(null);
      setCorrectCandidate(null);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    };
    

    return m$1`
    <div class="container mt-5">
      ${questions.length > 0 ? (
        m$1`
          <h1 class="mb-4">Guess the Candidate</h1>
          <div class="jumbotron">
            <p>${currentQuestion.info}</p>
          </div>
          <div class="row">
            ${currentQuestion.candidates.map((candidate) => m$1`
              <div class="col-md-4" key=${candidate.id}>
                <div class="card mb-4">
                  <img
                    src=${candidate.imageUrl}
                    alt=${candidate.name}
                    class="card-img-top"
                  />
                  <div class="card-body">
                    <h5 class="card-title">${candidate.name}</h5>
                    <button
                      class="btn ${
                        selectedCandidate === candidate && correctCandidate === candidate
                          ? 'btn-success'
                          : selectedCandidate === candidate
                          ? 'btn-danger'
                          : 'btn-primary'
                      }"
                      style="min-height: 50px;min-width:100px;"
                      onClick=${() => handleCandidateClick(candidate)}
                    >
                      ${selectedCandidate === candidate
                        ? correctCandidate === candidate
                          ? m$1`<i class="fas fa-check-circle"></i>`
                          : m$1`<i class="fas fa-times-circle"></i>`
                        : 'Select'}
                    </button>
                  </div>
                </div>
              </div>
            `)}
          </div>
          ${selectedCandidate ? m$1`
            <button class="btn ${
              currentQuestionIndex + 1 < questions.length
                ? 'btn-primary'
                : 'btn-success'
            }" onClick=${handleNextQuestion}>
              ${
                currentQuestionIndex + 1 < questions.length
                  ? 'Next Question'
                  : 'View Candidates'
              }
            </button>
          ` : ''}
        `
      ) : (
        m$1`<p>Loading questions...</p>`
      )}
    </div>
  `;
  };

  const voteReadyChecklist = document.getElementById('vote-ready-checklist');
  if (voteReadyChecklist) {
    D(m$1`
    <${VoteReadyChecklist} userId=${voteReadyChecklist.dataset.userId} givenName=${voteReadyChecklist.dataset.givenName}/>
  `, voteReadyChecklist);
  }


  const candidateQuiz = document.getElementById('candidate-quiz');
  if (candidateQuiz) {
    console.log('here');
    D(m$1`
    <${CandidateQuiz} />
  `, candidateQuiz);
  }

})();
