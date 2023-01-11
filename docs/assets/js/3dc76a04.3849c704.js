"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[497],{8841:function(e,t,n){n.r(t),n.d(t,{assets:function(){return v},contentTitle:function(){return N},default:function(){return w},frontMatter:function(){return f},metadata:function(){return g},toc:function(){return h}});var r=n(7462),i=n(3366),a=n(7294),l=n(3905),o=n(2041),m=n(6085),d=n(9354),u=n(3546),p=(0,n(4388).t)(m.E,m.d),c=u.pt,_=[[10,7],[8,4],[3,2],[1,8]];function b(e){var t=(0,d.P)(e,"#f00","transparent"),n=[_],r=c.apply(void 0,n);return t(_.map(p)),[{result:r,params:[n]}]}function s(){return a.createElement(a.Fragment,null,a.createElement(o.O,{functionName:"getImplicitForm3DdWithRunningError",draw:b,draggables:_}))}var k=["components"],f={id:"implicit_form_double_double_get_implicit_form3_dd_with_running_error",title:"get-implicit-form3-dd-with-running-error"},N=void 0,g={unversionedId:"modules/implicit_form_double_double_get_implicit_form3_dd_with_running_error",id:"modules/implicit_form_double_double_get_implicit_form3_dd_with_running_error",title:"get-implicit-form3-dd-with-running-error",description:"Defined in implicit-form/double-double/get-implicit-form3-dd-with-running-error.ts:39",source:"@site/docs/modules/implicit_form_double_double_get_implicit_form3_dd_with_running_error.mdx",sourceDirName:"modules",slug:"/modules/implicit_form_double_double_get_implicit_form3_dd_with_running_error",permalink:"/FloBezier/docs/modules/implicit_form_double_double_get_implicit_form3_dd_with_running_error",draft:!1,tags:[],version:"current",frontMatter:{id:"implicit_form_double_double_get_implicit_form3_dd_with_running_error",title:"get-implicit-form3-dd-with-running-error"},sidebar:"sidebar",previous:{title:"get-implicit-form3-dd",permalink:"/FloBezier/docs/modules/implicit_form_double_double_get_implicit_form3_dd"},next:{title:"get-implicit-form1",permalink:"/FloBezier/docs/modules/implicit_form_double_get_implicit_form1"}},v={},h=[{value:"Parameters:",id:"parameters",level:4}],C={toc:h};function w(e){var t=e.components,n=(0,i.Z)(e,k);return(0,l.kt)("wrapper",(0,r.Z)({},C,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-typescript"},"function getImplicitForm3DdWithRunningError(ps: number[][]): object\n")),(0,l.kt)("p",null,(0,l.kt)("em",{parentName:"p"},"Defined in ",(0,l.kt)("a",{parentName:"em",href:"https://github.com/FlorisSteenkamp/FloBezier/blob/a2fe14d/src/implicit-form/double-double/get-implicit-form3-dd-with-running-error.ts#L39"},"implicit-form/double-double/get-implicit-form3-dd-with-running-error.ts:39"))),(0,l.kt)("p",null,"Returns a double-double precision implicit form of the given cubic\nbezier curve curve and a coefficientwise error bound.\nReturned coefficients are subscripted to match their monomial's variables,\ne.g. ",(0,l.kt)("inlineCode",{parentName:"p"},"v\u2093\u1d67")," is the coefficient of the monomial ",(0,l.kt)("inlineCode",{parentName:"p"},"v\u2093\u1d67xy")),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"the implicit form is given by: ",(0,l.kt)("inlineCode",{parentName:"li"},"v\u2093\u2093\u2093x\xb3 + v\u2093\u2093\u1d67x\xb2y + v\u2093\u1d67\u1d67xy\xb2 + v\u1d67\u1d67\u1d67y\xb3 + v\u2093\u2093x\xb2 +v\u2093\u1d67xy + v\u1d67\u1d67y\xb2 + v\u2093x + v\u1d67y + v = 0")),(0,l.kt)("li",{parentName:"ul"},"intermediate calculations are done in double-double precision and this is\nreflected in the error bound"),(0,l.kt)("li",{parentName:"ul"},"the error bound returned first needs to be scaled by ",(0,l.kt)("inlineCode",{parentName:"li"},"\u03b3\u03b33 === (3*u*u) / (1 - 3*u*u) === 3.697785493223493e-32"),",\nwhere ",(0,l.kt)("inlineCode",{parentName:"li"},"u === Number.EPSILON / 2")," before use"),(0,l.kt)("li",{parentName:"ul"},"adapted from ",(0,l.kt)("a",{parentName:"li",href:"http://www.mare.ee/indrek/misc/2d.pdf"},"Indrek Mandre"))),(0,l.kt)(s,{mdxType:"GetImplicitForm3DdWithRunningError"}),(0,l.kt)("h4",{id:"parameters"},"Parameters:"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"Name"),(0,l.kt)("th",{parentName:"tr",align:null},"Type"),(0,l.kt)("th",{parentName:"tr",align:null},"Description"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"ps")),(0,l.kt)("td",{parentName:"tr",align:null},"number","[][]"),(0,l.kt)("td",{parentName:"tr",align:null},"a cubic bezier curve given as an array of its control points, e.g. ",(0,l.kt)("inlineCode",{parentName:"td"},"[[1,2],[3,4],[5,7],[0,0]]"))))),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"Returns:")," object"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"Name"),(0,l.kt)("th",{parentName:"tr",align:null},"Type"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"coeffs")),(0,l.kt)("td",{parentName:"tr",align:null},"{ ",(0,l.kt)("inlineCode",{parentName:"td"},"v\u2093\u2093\u2093"),": number[]; ",(0,l.kt)("inlineCode",{parentName:"td"},"v\u2093\u2093\u1d67"),": number[]; ",(0,l.kt)("inlineCode",{parentName:"td"},"v\u2093\u1d67\u1d67"),": number[]; ",(0,l.kt)("inlineCode",{parentName:"td"},"v\u1d67\u1d67\u1d67"),": number[]; ",(0,l.kt)("inlineCode",{parentName:"td"},"v\u2093\u2093"),": number[]; ",(0,l.kt)("inlineCode",{parentName:"td"},"v\u2093\u1d67"),": number[]; ",(0,l.kt)("inlineCode",{parentName:"td"},"v\u1d67\u1d67"),": number[]; ",(0,l.kt)("inlineCode",{parentName:"td"},"v\u2093"),": number[]; ",(0,l.kt)("inlineCode",{parentName:"td"},"v\u1d67"),": number[]; ",(0,l.kt)("inlineCode",{parentName:"td"},"v"),": number[] }")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"errorBound")),(0,l.kt)("td",{parentName:"tr",align:null},"{ ",(0,l.kt)("inlineCode",{parentName:"td"},"v\u2093\u2093\u2093_"),": number; ",(0,l.kt)("inlineCode",{parentName:"td"},"v\u2093\u2093\u1d67_"),": number; ",(0,l.kt)("inlineCode",{parentName:"td"},"v\u2093\u1d67\u1d67_"),": number; ",(0,l.kt)("inlineCode",{parentName:"td"},"v\u1d67\u1d67\u1d67_"),": number; ",(0,l.kt)("inlineCode",{parentName:"td"},"v\u2093\u2093_"),": number; ",(0,l.kt)("inlineCode",{parentName:"td"},"v\u2093\u1d67_"),": number; ",(0,l.kt)("inlineCode",{parentName:"td"},"v\u1d67\u1d67_"),": number; ",(0,l.kt)("inlineCode",{parentName:"td"},"v\u2093_"),": number; ",(0,l.kt)("inlineCode",{parentName:"td"},"v\u1d67_"),": number; ",(0,l.kt)("inlineCode",{parentName:"td"},"v_"),": number }")))))}w.isMDXComponent=!0}}]);