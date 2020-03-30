(this["webpackJsonpreact-app"]=this["webpackJsonpreact-app"]||[]).push([[0],{39:function(e,t,n){e.exports=n(75)},44:function(e,t,n){},51:function(e,t,n){},72:function(e,t,n){},73:function(e,t,n){},75:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(34),s=n.n(i),u=n(9),c=(n(44),n(8)),o=n(35),l=(n(51),function(){return r.a.createElement("div",null,r.a.createElement("nav",{className:"navbar navbar-expand-lg  navbar-light bg-dark",style:{marginBottom:"10vh"}},r.a.createElement("div",{className:"nav ml-auto mr-auto"},r.a.createElement(r.a.Fragment,null,r.a.createElement(u.b,{className:"nav-item nav-link h3 text-primary",to:"/"},r.a.createElement("div",{className:"navButton"},"Temperatures")),r.a.createElement(u.b,{className:"nav-item nav-link h3 text-primary",to:"/predict"},r.a.createElement("div",{className:"navButton"},"Predict"))))))}),m=n(1),p=n.n(m),h=n(4),d=n(12),v=n(13),f=n(15),b=n(14),y=n(16),g=n(17),E=n.n(g),w="https://weintraub-weather.herokuapp.com";function k(e){return j.apply(this,arguments)}function j(){return(j=Object(h.a)(p.a.mark((function e(t){var n,a,r,i;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=Math.round(t.getTime()/1e3),a={"Content-Type":"application/json"},e.next=4,E.a.get(w+"/createData",{params:{initTime:n}},a);case 4:return r=e.sent.data,i=r.response,t.setTime(1e3*parseInt(i)),e.abrupt("return",t);case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function x(e){return T.apply(this,arguments)}function T(){return(T=Object(h.a)(p.a.mark((function e(t){var n,a,r;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={"Content-Type":"application/json"},e.next=3,E.a.get(w+"/predictLinear",{params:{times:t}},n);case 3:return a=e.sent.data,r=a.response,e.abrupt("return",r);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function D(){return O.apply(this,arguments)}function O(){return(O=Object(h.a)(p.a.mark((function e(){var t,n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E.a.get(w+"/getNNParameters");case 2:return t=e.sent.data,n=t.response,e.abrupt("return",n);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function C(e,t,n){return S.apply(this,arguments)}function S(){return(S=Object(h.a)(p.a.mark((function e(t,n,a){var r,i,s,u;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r={"Content-Type":"application/json"},e.next=3,E.a.get(w+"/predictNeural",{params:{clouds:t,temp:n,humidity:a}},r);case 3:return i=e.sent.data,s=i.response,u={x:i.x,y:i.y,unscaledX:i.unscaledX,theta:i.theta},e.abrupt("return",{prediction:s,nnData:u});case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function N(e,t){return F.apply(this,arguments)}function F(){return(F=Object(h.a)(p.a.mark((function e(t,n){var a;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a={"Content-Type":"application/json"},e.next=3,E.a.post(w+"/trainNeural",{nnData:t,actual:n},a);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}n(72);var M=function(e){function t(){var e,n;Object(d.a)(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(f.a)(this,(e=Object(b.a)(t)).call.apply(e,[this].concat(r)))).mounted=!1,n.state={conditions:[]},n}return Object(y.a)(t,e),Object(v.a)(t,[{key:"componentDidMount",value:function(){var e=Object(h.a)(p.a.mark((function e(){var t,n,a,r,i,s,u,c,o,l,m;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.mounted=!0,t=[],n=new Date,e.next=5,k(n);case 5:for(n=e.sent,a=new Date(n.getTime()),r=[],i=[],s=[],u=1;u<41;u++)c="",o=a.getMinutes()<10?"0"+a.getMinutes():a.getMinutes(),c=a.getHours()<=12?a.getHours()+":"+o+"AM":a.getHours()-12+":"+o+"PM",l=a.getMonth()+1+"/"+a.getDate()+"/"+(a.getYear()+1900),i.push(c),s.push(l),r.push({initTime:Math.round(n.getTime()/1e3),endTime:Math.round(a.getTime()/1e3)}),a.setHours(a.getHours()+3);return e.next=13,x(r);case 13:for(r=e.sent,m=0;m<i.length;m++)t.push({temp:String(parseFloat(r[m]).toFixed(2))+"\u2109",time:i[m],day:s[m]});this.mounted&&this.setState({conditions:t});case 16:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"componentWillUnmount",value:function(){this.mounted=!1}},{key:"render",value:function(){var e=this.state.conditions;return r.a.createElement(r.a.Fragment,null,r.a.createElement("h1",{style:{textAlign:"center"}},"Predicted temperatures for Westport, CT"),r.a.createElement("div",{className:"contain"},e&&e.map((function(e,t){return r.a.createElement("div",{key:t,className:"unit"},r.a.createElement("p",null,e.temp),r.a.createElement("p",null,e.time),r.a.createElement("p",null,e.day))}))))}}]),t}(a.Component),H=n(38),A=n(18),B=n.n(A),P=function(e){function t(){var e,n;Object(d.a)(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(f.a)(this,(e=Object(b.a)(t)).call.apply(e,[this].concat(r)))).mounted=!1,n.state={parameters:{"Clouds(#)":"","Temp(F)":"",Humidity:""},result:null,nnData:null},n.schema={"Clouds(#)":B.a.number().required(),"Temp(F)":B.a.number().required(),Humidity:B.a.number().required()},n.validate=function(){return!!B.a.validate(n.state.parameters,n.schema,{abortEarly:!1}).error},n}return Object(y.a)(t,e),Object(v.a)(t,[{key:"componentDidMount",value:function(){var e=Object(h.a)(p.a.mark((function e(){var t,n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.mounted=!0,t=new Date,e.next=4,k(t);case 4:return e.next=6,D();case 6:n=e.sent,this.mounted&&this.setState({parameters:n});case 8:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"componentWillUnmount",value:function(){this.mounted=!1}},{key:"render",value:function(){var e=this.state,t=e.parameters,n=e.result,a=e.nnData;function i(e){return s.apply(this,arguments)}function s(){return(s=Object(h.a)(p.a.mark((function e(t){var n,a,r,i;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),n=this.state.parameters,e.next=4,C(n["Clouds(#)"],n["Temp(F)"],n.Humidity);case 4:a=e.sent,r=a.prediction,i=a.nnData,this.mounted&&this.setState({result:r,nnData:i});case 8:case"end":return e.stop()}}),e,this)})))).apply(this,arguments)}function u(e){var t=e.currentTarget,n=t.name,a=t.value,r=Object(H.a)({},this.state.parameters);r[n]=a,this.mounted&&this.setState({parameters:r})}return i=i.bind(this),u=u.bind(this),n?r.a.createElement(c.a,{to:{pathname:"/prediction",state:{result:n,parameters:t,nnData:a}}}):r.a.createElement("div",{style:{fontSize:"4vh"}},r.a.createElement("form",{style:{marginLeft:"1vw"},onSubmit:i},"Did you know? These 3 fields are some of the best at predicting various weather types.",r.a.createElement("br",null),"Please submit their values to get a predicted weather condition.",Object.keys(t).map((function(e){return r.a.createElement("div",{key:e,style:{marginTop:"1vw"}},r.a.createElement("br",null),r.a.createElement("label",null,e,":",r.a.createElement("input",{type:"text",name:e,value:t[e],style:{marginLeft:"1vw"},onChange:u})))}),this),r.a.createElement("button",{style:{marginTop:"1vw"},className:"btn btn-light btn-lg",disabled:this.validate()},"Submit")))}}]),t}(a.Component),W=["Thunderstorm","Drizzle","Rain","Snow","Mist","Smoke","Dust","Fog","Haze","Sand","Ash","Squall","Tornado","Clear","Clouds"],q=(n(73),function(e){function t(){var e,n;Object(d.a)(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(f.a)(this,(e=Object(b.a)(t)).call.apply(e,[this].concat(r)))).state={parameters:[],result:"",actual:"Thunderstorm",nnData:null,running:"No"},n}return Object(y.a)(t,e),Object(v.a)(t,[{key:"componentDidMount",value:function(){if(this.props.location.state){var e=this.props.location.state;this.setState({parameters:e.parameters,result:e.result,nnData:e.nnData})}else window.location="/"}},{key:"handleSubmit",value:function(){var e=Object(h.a)(p.a.mark((function e(t){var n,a,r;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),n=this.state,a=n.nnData,r=n.actual,this.setState({running:"Yes"}),e.next=5,N(a,r);case 5:this.setState({running:"Done"});case 6:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"handleChange",value:function(e){var t=e.currentTarget;this.setState({actual:t.value})}},{key:"render",value:function(){var e=this.state,t=e.parameters,n=e.result,a=e.actual,i=e.running;return"Done"===i?r.a.createElement("div",{className:"predictionContainer"},"Success! Thank you for giving data!"):"Yes"===i?r.a.createElement("div",{className:"predictionContainer"},"Currently training. This will take a few minutes."):r.a.createElement("div",{className:"predictionContainer"},"Your predicted weather condition given:",r.a.createElement("br",null),"Clouds(#) = ",t["Clouds(#)"],r.a.createElement("br",null),"Temp(F) = ",t["Temp(F)"],"\u2109",r.a.createElement("br",null),"Humidity = ",t.Humidity,r.a.createElement("br",null),r.a.createElement("br",null),"Is ",r.a.createElement("u",null," ",n,"."),r.a.createElement("br",null),r.a.createElement("br",null),"If you feel this is inaccurate or simply want to train the neural network that made this decision, please input the actual value here and submit:",r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("form",{onSubmit:this.handleSubmit.bind(this)},r.a.createElement("select",{value:a,onChange:this.handleChange.bind(this)},W.map((function(e){return r.a.createElement("option",{val:e,key:e},e)}))),r.a.createElement("br",null),r.a.createElement("button",{style:{marginTop:"1vw"},className:"btn btn-light btn-lg"},"Submit")))}}]),t}(a.Component));var z=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(o.Helmet,null,r.a.createElement("style",null,"body { background-color: #6698FF; }")),r.a.createElement(l,null),r.a.createElement("main",null,r.a.createElement(c.d,null,r.a.createElement(c.b,{exact:!0,path:"/",component:M}),r.a.createElement(c.b,{path:"/predict",component:P}),r.a.createElement(c.b,{path:"/prediction",component:q}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(74);s.a.render(r.a.createElement(u.a,null,r.a.createElement(z,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[39,1,2]]]);
//# sourceMappingURL=main.ea6996fe.chunk.js.map