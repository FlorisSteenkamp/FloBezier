"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[8421],{6527:function(e,n,t){t.r(n),t.d(n,{assets:function(){return p},contentTitle:function(){return l},default:function(){return m},frontMatter:function(){return s},metadata:function(){return c},toc:function(){return u}});var i=t(7462),r=t(3366),a=(t(7294),t(3905)),o=["components"],s={},l=void 0,c={unversionedId:"README",id:"README",title:"README",description:"Bug reports, pull requests and \u2b50\u2b50\u2b50\u2b50\u2b50s are welcome and appreciated!",source:"@site/docs/README.md",sourceDirName:".",slug:"/",permalink:"/FloBezier/docs/",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",next:{title:"are-boxes-intersecting",permalink:"/FloBezier/docs/modules/boxes_are_boxes_intersecting"}},p={},u=[{value:"Overview",id:"overview",level:2},{value:"Features",id:"features",level:2},{value:"Documentation",id:"documentation",level:2},{value:"Installation",id:"installation",level:2},{value:"Usage",id:"usage",level:2},{value:"Node.js",id:"nodejs",level:3},{value:"Browsers - ESM - (Chrome 61+, Safari 11+, Firefox 60+, Opera 48+, Edge 16+, <del>Internet Explorer</del>)",id:"browsers---esm---chrome-61-safari-11-firefox-60-opera-48-edge-16-internet-explorer",level:3},{value:"Browsers (older) - Legacy Scripts",id:"browsers-older---legacy-scripts",level:3},{value:"Bundlers (Webpack, Rollup, ...)",id:"bundlers-webpack-rollup-",level:3},{value:"License",id:"license",level:2}],d={toc:u};function m(e){var n=e.components,t=(0,r.Z)(e,o);return(0,a.kt)("wrapper",(0,i.Z)({},d,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"Bug reports, pull requests and \u2b50\u2b50\u2b50\u2b50\u2b50s are welcome and appreciated!"),(0,a.kt)("h2",{id:"overview"},"Overview"),(0,a.kt)("p",null,"The focus is to provide a portable, practical, easy-to-use, robust and fast bezier curve\nlibrary with zero vendor lock-in."),(0,a.kt)("p",null,"For example, finding the intersection between a quadratic and cubic bezier curve\nshould be simple:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"// some cubic bezier curve given by an array of its control points\nconst cubic1 = [[6.4, 4.8], [15, 5], [1, 4], [10, 4]];\n// another cubic bezier curve\nconst cubic2 = [[9.4, 0.4], [9.3, 10.3], [8.1, 0.1], [7.53125, 5.5]];\nconst xs = bezierBezierIntersectionFast(cubic1, cubic2); //=> [[0.054810011880009446, 0.9516779285879586], ...\n// xs.length === 9 (nine points of intersections)\n\n// Evaluating the 1st curve at the first intersection gives the point of intersection\nconst p1 = evaluate(cubic1,xs[0][0]);  //=> [7.617926141015109,  4.822433357454532]\n// ... or alternatively evaluating the 2nd curve at the first intersection\nconst p2 = evaluate(cubic2,xs[0][1]);  //=> [7.6179261410151105, 4.822433357454532]\n")),(0,a.kt)("p",null,"In general, the functions in this library are limited to points, lines, quadratic bezier\ncurves and cubic bezier curves (i.e. order 0,1,2 and 3 bezier curves) in 2d."),(0,a.kt)("h2",{id:"features"},"Features"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("strong",{parentName:"p"},"Robust")," Based on dozens of research papers (referenced in the docs) and using adaptive multi-precision\nfloating point operations with strict error-bounding techniques ensures\nrobust results you can trust.")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("strong",{parentName:"p"},"Fast")," Special care has been taken to ensure each function performs well not\nonly in theory but also in practice.\n")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("strong",{parentName:"p"},"Tested")," Hundreds of carefully crafted tests and over 99% coverage means you can\nuse every function with confidence and peace of mind.")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("strong",{parentName:"p"},"Freestanding")," For maximum interoperability, each function is entirely independent (e.g.\nnot a method of a class) and takes simple paramters (e.g. a point is just\nan array of numbers and a bezier curve is simply represented as an array of points).")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("strong",{parentName:"p"},"Accurate")," High ",(0,a.kt)("a",{href:"https://en.wikipedia.org/wiki/Condition_number)"},"condition numbers "),"\nare completely mitigated where necessary without a hit to performance. For example,\nbezier curve intersection is ",(0,a.kt)("i",null,"guaranteed")," accurate to\nwithin ",(0,a.kt)("code",null,"4*Number.EPSILON")," in the returned paramter values.")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("strong",{parentName:"p"},"Pure")," Every function is ",(0,a.kt)("a",{href:"https://en.wikipedia.org/wiki/Pure_function"},"pure "),".\nThe same input to the same function gives the same results - every time. No need\nto clog your short term memory by worrying about state of any kind."))),(0,a.kt)("h2",{id:"documentation"},(0,a.kt)("a",{parentName:"h2",href:"https://florissteenkamp.github.io/FloBezier"},"Documentation")),(0,a.kt)("p",null,"For in-depth interactive documentation please ",(0,a.kt)("a",{parentName:"p",href:"https://florissteenkamp.github.io/FloBezier"},"read the docs!"),"."),(0,a.kt)("h2",{id:"installation"},"Installation"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-cli"},"npm install flo-bezier\n")),(0,a.kt)("p",null,"This package is ",(0,a.kt)("a",{parentName:"p",href:"https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c"},"ESM only"),".\nIt can be used in ",(0,a.kt)("inlineCode",{parentName:"p"},"Node.js")," or in a browser."),(0,a.kt)("p",null,"Additionally, self-contained ",(0,a.kt)("inlineCode",{parentName:"p"},"ECMAScript Module")," (ESM) files ",(0,a.kt)("inlineCode",{parentName:"p"},"index.module.js")," and\n",(0,a.kt)("inlineCode",{parentName:"p"},"index.module.min.js")," in the ",(0,a.kt)("inlineCode",{parentName:"p"},"./browser")," folder is provided."),(0,a.kt)("p",null,"Or, if you need a legacy browser script there is also ",(0,a.kt)("inlineCode",{parentName:"p"},"index.js"),"\nand ",(0,a.kt)("inlineCode",{parentName:"p"},"index.min.js")," in the ",(0,a.kt)("inlineCode",{parentName:"p"},"./browser")," folder. Either script exposes a global\nvariable called ",(0,a.kt)("inlineCode",{parentName:"p"},"FloBezier"),"."),(0,a.kt)("h2",{id:"usage"},"Usage"),(0,a.kt)("p",null,"Below are usage examples for some common environments. "),(0,a.kt)("p",null,"Please see the ",(0,a.kt)("a",{parentName:"p",href:"https://florissteenkamp.github.io/FloBezier"},"docs")," for a complete\nlist of available functions."),(0,a.kt)("h3",{id:"nodejs"},"Node.js"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"import { fitQuadsToCubic } from 'flo-bezier';\n\n// some cubic bezier curve given by an array of its control points\nconst cubic = [[1, 1], [5.125, 8], [15.375, 0.875], [13.6875, 7.71875]];\nconst quads = fitQuadsToCubic(cubic, 0.1); //=> [[[1, 1], [2.617431640625, 3.5152587890625], ...\n\nif (quads.length === 4) {\n    console.log('success! \ud83d\ude01');  // we should get to here!\n} else {\n    console.log('failure! \ud83d\ude25');  // ...and not here\n}\n")),(0,a.kt)("h3",{id:"browsers---esm---chrome-61-safari-11-firefox-60-opera-48-edge-16-internet-explorer"},"Browsers - ESM - (Chrome 61+, Safari 11+, Firefox 60+, Opera 48+, Edge 16+, ",(0,a.kt)("del",{parentName:"h3"},"Internet Explorer"),")"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-html"},'<!doctype html>\n\n<html lang="en">\n<head>\n    <script type="module">\n        import { fitQuadsToCubic } from "./node_modules/flo-bezier/browser/index.module.min.js";\n\n        // some cubic bezier curve given by an array of its control points\n        const cubic = [[1, 1], [5.125, 8], [15.375, 0.875], [13.6875, 7.71875]];\n        const quads = fitQuadsToCubic(cubic, 0.1); //=> [[[1, 1], [2.617431640625, 3.5152587890625], ...\n\n        if (quads.length === 4) {\n            console.log(\'success! \ud83d\ude01\');  // we should get to here!\n        } else {\n            console.log(\'failure! \ud83d\ude25\');  // ...and not here\n        }\n    <\/script>\n</head>\n\n<body>Check the console.</body>\n\n</html>\n')),(0,a.kt)("h3",{id:"browsers-older---legacy-scripts"},"Browsers (older) - Legacy Scripts"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-html"},"<!doctype html>\n\n<html lang=\"en\">\n<head>\n    <script src=\"./node_modules/flo-bezier/browser/index.min.js\"><\/script>\n    <script>\n        const { fitQuadsToCubic } = FloBezier;\n        \n        // some cubic bezier curve given by an array of its control points\n        const cubic = [[1, 1], [5.125, 8], [15.375, 0.875], [13.6875, 7.71875]];\n        const quads = fitQuadsToCubic(cubic, 0.1); //=> [[[1, 1], [2.617431640625, 3.5152587890625], ...\n\n        if (roots.length === 4) {\n            console.log('success! \ud83d\ude01');  // we should get to here!\n        } else {\n            console.log('failure! \ud83d\ude25');  // ...and not here\n        }\n    <\/script>\n</head>\n\n<body>Check the console.</body>\n\n</html>\n")),(0,a.kt)("h3",{id:"bundlers-webpack-rollup-"},"Bundlers (Webpack, Rollup, ...)"),(0,a.kt)("p",null,"Webpack will be taken as an example here."),(0,a.kt)("p",null,"Since your webpack config file might still use ",(0,a.kt)("inlineCode",{parentName:"p"},"CommonJS")," you must rename\n",(0,a.kt)("inlineCode",{parentName:"p"},"webpack.config.js")," to ",(0,a.kt)("inlineCode",{parentName:"p"},"webpack.config.cjs"),"."),(0,a.kt)("p",null,"If you are using TypeScript:"),(0,a.kt)("p",null,"Since this is an ",(0,a.kt)("a",{parentName:"p",href:"https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c"},"ESM only"),"\nlibrary you must use ",(0,a.kt)("a",{parentName:"p",href:"https://www.npmjs.com/package/resolve-typescript-plugin"},"resolve-typescript-plugin"),"\n(at least until webpack catches up with ESM?) in your ",(0,a.kt)("inlineCode",{parentName:"p"},"webpack.config.cjs")," file."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-cli"},"npm install --save-dev resolve-typescript-plugin\n")),(0,a.kt)("p",null,"and follow the instructions given at ",(0,a.kt)("a",{parentName:"p",href:"https://www.npmjs.com/package/resolve-typescript-plugin"},"resolve-typescript-plugin"),"."),(0,a.kt)("p",null,"Additionally, follow this ",(0,a.kt)("a",{parentName:"p",href:"https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c#how-can-i-make-my-typescript-project-output-esm"},"guide"),"."),(0,a.kt)("h2",{id:"license"},"License"),(0,a.kt)("p",null,"The MIT License (MIT)"),(0,a.kt)("p",null,"Copyright \xa9 2022 Floris Steenkamp"),(0,a.kt)("p",null,'Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:'),(0,a.kt)("p",null,"The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software."),(0,a.kt)("p",null,'THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.'))}m.isMDXComponent=!0}}]);