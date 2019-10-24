(window["webpackJsonpwordpress-rest-blog"]=window["webpackJsonpwordpress-rest-blog"]||[]).push([[0],{125:function(e,t,n){e.exports=n(248)},130:function(e,t,n){},185:function(e,t){},22:function(e,t,n){},248:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(113),s=n.n(r),c=(n(130),n(3)),i=n(4),l=n(6),m=n(5),p=n(7),u={siteURL:"https://impedans.me/web/",baseName:"/blog/"},h=n(46),d=n.n(h),g=n(114),f=(n(22),n(17)),E=n.n(f),b=function(e){function t(){var e,n;Object(c.a)(this,t);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(n=Object(l.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(o)))).state={errorMessage:"",showError:!1,commentEmail:"",commentName:"",commentContent:""},n.onChange=function(e){n.setState(Object(g.a)({},e.target.name,e.target.value))},n.validateEmail=function(e){return/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(e).toLowerCase())},n.postNewComment=function(){n.setState({showError:!1});var e=n.state,t=e.commentEmail,a=e.commentName,o=e.commentContent,r={author_name:a,author_email:t,content:o,post:n.props.postID};null!==n.props.replyTo&&(r.parent=n.props.replyTo);var s=0,c="";n.validateEmail(t)||(s++,c="Please enter a valid email address"),a.length<3&&(s++,c="Name needs to be atleast three characters"),o.length<10&&(s++,c="Comment needs to be atleast 10 characters"),0===s?E.a.post("".concat(n.props.WPConfig.siteURL,"wp-json/wp/v2/comments"),r,{headers:{"Content-Type":"application/json"}}).then(function(e){return e.data}).then(function(e){var t=n.props.comments,a=e;a.customStatus="pending",a=t.unshift(a),n.setState({comments:a,commentEmail:"",commentName:"",commentContent:""}),null!==n.props.onUpdate&&n.props.onUpdate(a)}):n.setState({showError:!0,errorMessage:c})},n}return Object(p.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return o.a.createElement("div",{className:"comment-poster",key:9996},this.state.showError&&o.a.createElement("div",{className:"comment-poster-error"},this.state.errorMessage),o.a.createElement("table",null,o.a.createElement("tbody",{valign:"top"},o.a.createElement("tr",null,o.a.createElement("td",null,"Your email: "),o.a.createElement("td",null,o.a.createElement("input",{type:"email",name:"commentEmail",onChange:this.onChange,value:this.state.commentEmail}))),o.a.createElement("tr",null,o.a.createElement("td",null,"Your name: "),o.a.createElement("td",null,o.a.createElement("input",{type:"text",name:"commentName",onChange:this.onChange,value:this.state.commentName}))),o.a.createElement("tr",null,o.a.createElement("td",null,"Comment: "),o.a.createElement("td",null,o.a.createElement("textarea",{name:"commentContent",onChange:this.onChange,value:this.state.commentContent}))),o.a.createElement("tr",null,o.a.createElement("td",null),o.a.createElement("td",null,o.a.createElement("button",{onClick:this.postNewComment},"Submit comment"))))))}}]),t}(o.a.Component),v=n(82).Parser,y=function(e){function t(){var e,n;Object(c.a)(this,t);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(n=Object(l.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(o)))).state={isReplying:!1},n.showReply=function(){n.setState({isReplying:!n.state.isReplying})},n.reactParse=function(e){var t=(new v).parse(e);return d.a.renderToStaticMarkup(t)},n.parseDate=function(e){var t=e.substring(0,4),n=e.substring(5,7),a=e.substring(8,10),o=e.substring(11,13),r=e.substring(14,16);return"".concat(o,":").concat(r," ").concat(a,"/").concat(n,"/").concat(t)},n.commentWasPosted=function(e){void 0!==n.props.onUpdate&&n.props.onUpdate(e),n.setState({isReplying:!1})},n}return Object(p.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this,n=this.props.comment.author_name,a=this.reactParse(this.props.comment.content.rendered),r=this.parseDate(this.props.comment.date),s=this.props.comment.author_avatar_urls[48],c=this.props.nestedComments,i=[];c.length>=1&&c.forEach(function(n,a){var r=e.props.allComments,s=n.id,c=r.filter(function(e){return e.parent===s});i.push(o.a.createElement(t,{key:a,comment:n,index:a,onUpdate:e.commentWasPosted,nestedComments:c,allComments:r}))});var l="pending"===this.props.comment.customStatus?"comment pending":"comment";return o.a.createElement("div",{className:l,key:this.props.index},o.a.createElement("div",{className:"comment-header"},o.a.createElement("img",{src:s,alt:"Comment avatar"}),o.a.createElement("strong",{className:"comment-username"},1===this.props.comment.author&&o.a.createElement("span",null,"\u2605"),n),o.a.createElement("em",null,"#",this.props.comment.id)),o.a.createElement("div",{className:"comment-body",dangerouslySetInnerHTML:{__html:a}}),o.a.createElement("i",{className:"comment-date"},"pending"!==this.props.comment.customStatus&&o.a.createElement("button",{onClick:this.showReply},this.state.isReplying?"Cancel":"Reply"),r),this.state.isReplying&&o.a.createElement(b,{replyTo:this.props.comment.id,postID:this.props.comment.post,onUpdate:this.commentWasPosted,WPConfig:u,comments:this.props.allComments}),c.length>=1&&o.a.createElement("div",{className:"nestedComments"},i))}}]),t}(o.a.Component),C=n(37),w=n(115),k=n(250),j=n(251),O=n(252),T=n(253),P=n(254),D=n(82).Parser,N=function(e){function t(){var e,n;Object(c.a)(this,t);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(n=Object(l.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(o)))).state={blogPosts:[{id:0,title:{rendered:""},excerpt:{rendered:""},content:{rendered:""},categories:[]}],comments:[{author_name:"",content:{rendered:""},author_avatar_urls:{48:""},date:""}],categories:[{name:"",id:null}],sortArticles:null,postID:n.props.postID||!1,renderComments:!1,commentEmail:"",commentName:"",commentContent:"",commentReply:null},n.goToArticle=function(e){window.location.href="".concat(n.props.WPConfig.baseName,"post/").concat(e.target.parentElement.getAttribute("data-id"))},n.sortArticles=function(e){var t=e.target.getAttribute("data-categoryid");n.setState({sortArticles:t}),n.scrollToTop()},n.scrollToTop=function(){window.scrollTo(0,0),document.body.scrollTop=0},n.reactParse=function(e){var t=(new D).parse(e);return d.a.renderToStaticMarkup(t).replace("<code>","<code class='markUpBaby'>")},n.parseDate=function(e){var t=e.substring(0,4),n=e.substring(5,7),a=e.substring(8,10),o=e.substring(11,13),r=e.substring(14,16);return"".concat(o,":").concat(r," ").concat(a,"/").concat(n,"/").concat(t)},n.updateComments=function(e){n.setState({newComments:e})},n.goToMusic=function(){window.open("https://soundcloud.com/sl1ck","_blank")},n.goToCV=function(){window.open("https://haakon.underbakke.net/cv","_blank")},n.goToContact=function(){window.location.href="https://impedans.me/web/contact-me/"},n.ignoreAction=function(e){e.preventDefault()},n.goHome=function(){window.location.href="/"},n}return Object(p.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this;!1===this.state.postID?(E.a.get("".concat(this.props.WPConfig.siteURL,"wp-json/wp/v2/posts")).then(function(e){return e.data}).then(function(t){e.setState({blogPosts:t,loaded:!0})}),E.a.get("".concat(this.props.WPConfig.siteURL,"wp-json/wp/v2/categories")).then(function(e){return e.data}).then(function(t){e.setState({categories:t})}),this.scrollToTop()):(E.a.get("".concat(this.props.WPConfig.siteURL,"wp-json/wp/v2/posts/?include[]=").concat(this.state.postID)).then(function(e){return e.data}).then(function(t){e.setState({blogPosts:t,loaded:!0})}),E.a.get("".concat(this.props.WPConfig.siteURL,"wp-json/wp/v2/comments/?post=").concat(this.state.postID)).then(function(e){return e.data}).then(function(t){e.setState({comments:t})}),this.scrollToTop())}},{key:"render",value:function(){var e=this,t=[],n=[];if(this.state.categories.forEach(function(t,a){1!==t.id&&n.push(o.a.createElement("li",{key:1888+a,"data-id":t.id},o.a.createElement("button",{onClick:e.sortArticles,"data-categoryid":t.id},t.name)))}),!1!==this.state.postID&&n.push(o.a.createElement("li",{key:1923},o.a.createElement("button",{onClick:this.goHome},"All posts"))),n.push(o.a.createElement("li",{key:1923,className:"seperator"},"|")),t.push(o.a.createElement("nav",{key:9991},o.a.createElement("ul",null,n,o.a.createElement("li",null,o.a.createElement("button",{onClick:this.goToMusic},"Music")),o.a.createElement("li",null,o.a.createElement("button",{onClick:this.goToContact},"Contact")),o.a.createElement("li",null,o.a.createElement("button",{onClick:this.goToCV},"CV"))))),this.state.blogPosts.forEach(function(n,a){if(null===e.state.sortArticles||n.categories.includes(parseInt(e.state.sortArticles))||n.categories===parseInt(e.state.sortArticles)){var r=e.reactParse(n.title.rendered),s=!1===e.state.postID?e.reactParse(n.excerpt.rendered):e.reactParse(n.content.rendered);!1===e.state.postID&&(s=s.substring(0,s.length-9)+"...</p>");var c=!1===e.state.postID?"collapsed":"open";n.categories.includes(1)||t.push(o.a.createElement("article",{key:a,className:c,"data-id":n.id},o.a.createElement(C.b,{to:"/post/"+n.id,"data-id":n.id,className:"articleLink"},o.a.createElement("h3",{"data-id":n.id,dangerouslySetInnerHTML:{__html:r}})),o.a.createElement("div",{className:"body",onClick:!1===e.state.postID?e.goToArticle:e.ignoreAction,"data-id":n.id,dangerouslySetInnerHTML:{__html:s}})))}}),!1!==this.state.postID){if(""!==this.state.blogPosts[0].title.rendered){var a=this.reactParse(this.state.blogPosts[0].excerpt.rendered);a=(a=a.substring(3)).slice(0,-5);var r=this.reactParse(this.state.blogPosts[0].title.rendered);t.push(o.a.createElement(w.Helmet,{key:"123653"},o.a.createElement("title",null,r),o.a.createElement("meta",{name:"description",content:a})))}var s=this.state.comments.filter(function(e){return 0===e.parent}),c=window.location.href;t.push(o.a.createElement("h5",{key:9994},"Share on...")),t.push(o.a.createElement("div",{className:"social",key:9993},o.a.createElement(k.a,{url:c},"Facebook"),o.a.createElement(j.a,{url:c},"Reddit"),o.a.createElement(O.a,{url:c},"Linkedin"),o.a.createElement(T.a,{url:c},"Twitter"),o.a.createElement(P.a,{url:c},"Email"))),1===this.state.comments.length?t.push(o.a.createElement("h4",{key:9999},"1 Comment")):0===this.state.comments.length?t.push(o.a.createElement("h4",{key:9999},"Be the first to leave a comment")):t.push(o.a.createElement("h4",{key:9999},this.state.comments.length," Comments")),t.push(o.a.createElement(b,{postID:this.state.postID,onUpdate:this.updateComments,key:9991,WPConfig:this.props.WPConfig,comments:this.state.comments}));var i=[];s.forEach(function(t,n){var a=t.id,r=e.state.comments.filter(function(e){return e.parent===a});i.push(o.a.createElement(y,{comment:t,index:n,key:n,onUpdate:e.updateComments,nestedComments:r,allComments:e.state.comments}))}),t.push(o.a.createElement("div",{className:"comments-container",key:9998},i))}return o.a.createElement(o.a.Fragment,null,!this.state.loaded&&o.a.createElement("main",{className:"showLoading"},"Fetching content..."),o.a.createElement("main",{className:this.state.loaded?"loaded":"loading"},t))}}]),t}(o.a.Component);var I=function(){return o.a.createElement(o.a.Fragment,null,o.a.createElement(N,{WPConfig:u}))},S=function(e){function t(){var e,n;Object(c.a)(this,t);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(n=Object(l.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(o)))).state={postID:n.props.match.params.postID||null},n}return Object(p.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return o.a.createElement(o.a.Fragment,null,o.a.createElement(N,{WPConfig:u,postID:this.state.postID}))}}]),t}(o.a.Component),A=function(e){function t(){var e,n;Object(c.a)(this,t);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(n=Object(l.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(o)))).state={siteTitle:"Loading...",siteDescription:"..."},n}return Object(p.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this;E.a.get("".concat(this.props.WPConfig.siteURL,"wp-json/")).then(function(e){return e.data}).then(function(t){e.setState({siteTitle:t.name,siteDescription:t.description})})}},{key:"render",value:function(){return o.a.createElement("header",{className:"Loading..."===this.state.siteTitle?"loading":"loaded"},o.a.createElement("a",{href:u.baseName},o.a.createElement("h1",null,this.state.siteTitle)),o.a.createElement("p",null,this.state.siteDescription))}}]),t}(o.a.Component),U=n(124),R=n(21),W=function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(i.a)(t,[{key:"componentDidUpdate",value:function(e){this.props.path===this.props.location.pathname&&this.props.location.pathname!==e.location.pathname&&window.scrollTo(0,0)}},{key:"render",value:function(){var e=this.props,t=e.component,n=Object(U.a)(e,["component"]);return o.a.createElement(R.a,Object.assign({},n,{render:function(e){return o.a.createElement(t,e)}}))}}]),t}(a.Component),L=Object(R.f)(W),_=function(e){function t(){var e,n;Object(c.a)(this,t);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(n=Object(l.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(o)))).scrollToTop=function(){window.scrollTo(0,0),document.body.scrollTop=0},n}return Object(p.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"App"},o.a.createElement(A,{WPConfig:u}),o.a.createElement("div",{className:"minHeight"},o.a.createElement(C.a,{basename:u.baseName,onUpdate:function(){return window.scrollTo(0,0)}},o.a.createElement(M,null,o.a.createElement(R.c,null,o.a.createElement(L,{path:"/post/:postID",component:S}),o.a.createElement(R.a,{path:"/",exact:!0,component:I}),o.a.createElement(R.a,{component:I})))))),o.a.createElement("footer",null,o.a.createElement("a",{href:"#"},"Back to top")))}}]),t}(o.a.Component),M=function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(i.a)(t,[{key:"componentDidUpdate",value:function(e){this.props.location!==e.location&&window.scrollTo(0,0)}},{key:"render",value:function(){return this.props.children}}]),t}(o.a.Component),x=_;Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(o.a.createElement(x,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[125,1,2]]]);
//# sourceMappingURL=main.a7368cfb.chunk.js.map