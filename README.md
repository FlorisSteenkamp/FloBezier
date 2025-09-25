Bug reports, pull requests and ⭐⭐⭐⭐⭐s are welcome and appreciated!

## Overview

[![npm][1]][2] [![install size][3]][4] [![downloads][5]][2]

[1]: https://img.shields.io/npm/v/flo-bezier3 "FloBezier, npm badge"
[2]: https://www.npmjs.com/package/flo-bezier3 "FloBezier, npm link"
[3]: https://packagephobia.now.sh/badge?p=flo-bezier3 "FloBezier size, badge"
[4]: https://packagephobia.now.sh/result?p=flo-bezier3 "FloBezier size, link"
[5]: https://badgen.now.sh/npm/dm/flo-bezier3 "FloBezier downloads, badge"

The focus is to provide a portable, practical, easy-to-use, robust and fast bezier curve
library with zero vendor lock-in.

For example, finding the intersection between a quadratic and cubic bezier curve
should be simple:

```typescript
// some cubic bezier curve given by an array of its control points
const cubic1 = [[6.4, 4.8], [15, 5], [1, 4], [10, 4]];
// another cubic bezier curve
const cubic2 = [[9.4, 0.4], [9.3, 10.3], [8.1, 0.1], [7.53125, 5.5]];
const xs = bezierBezierIntersectionFast(cubic1, cubic2); //=> [[0.054810011880009446, 0.9516779285879586], ...
// xs.length === 9 (nine points of intersections)

// Evaluating the 1st curve at the first intersection gives the point of intersection
const p1 = evaluate(cubic1,xs[0][0]);  //=> [7.617926141015109,  4.822433357454532]
// ... or alternatively evaluating the 2nd curve at the first intersection
const p2 = evaluate(cubic2,xs[0][1]);  //=> [7.6179261410151105, 4.822433357454532]
```

In general, the functions in this library are limited to points, lines, quadratic bezier
curves and cubic bezier curves (i.e. order 0,1,2 and 3 bezier curves) in 2d.

## Features

* **Robust** Based on dozens of research papers (referenced in the docs) and using adaptive multi-precision
floating point operations with strict error-bounding techniques ensures
robust results you can trust.

* **Fast** Special care has been taken to ensure each function performs well not 
only in theory but also in practice.
      
* **Tested** Hundreds of carefully crafted tests and over 99% coverage means you can
use every function with confidence and peace of mind.

* **Freestanding** For maximum interoperability, each function is entirely independent (e.g.
not a method of a class) and takes simple paramters (e.g. a point is just
an array of numbers and a bezier curve is simply represented as an array of points).

* **Accurate** High <a href="https://en.wikipedia.org/wiki/Condition_number)">condition numbers </a>
are completely mitigated where necessary without a hit to performance. For example,
bezier curve intersection is <i>guaranteed</i> accurate to 
within <code>4*Number.EPSILON</code> in the returned paramter values.

* **Pure** Every function is <a href="https://en.wikipedia.org/wiki/Pure_function">pure </a>.
The same input to the same function gives the same results - every time. No need
to clog your short term memory by worrying about state of any kind.


## [Documentation](https://florissteenkamp.github.io/FloBezier)
For in-depth interactive documentation please [read the docs!](https://florissteenkamp.github.io/FloBezier).

## Installation

```cli
npm install flo-bezier3
```

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).
It can be used in `Node.js` or in a browser.

Additionally, self-contained `ECMAScript Module` (ESM) files `index.js` and
`index.min.js` in the `./browser` folder are provided.

## Usage

Below are usage examples for some common environments. 

Please see the [docs](https://florissteenkamp.github.io/FloBezier) for a complete
list of available functions.

### Node.js
```js
import { fitQuadsToCubic } from 'flo-bezier3';

// some cubic bezier curve given by an array of its control points
const cubic = [[1, 1], [5.125, 8], [15.375, 0.875], [13.6875, 7.71875]];
const quads = fitQuadsToCubic(cubic, 0.1); //=> [[[1, 1], [2.617431640625, 3.5152587890625], ...

if (quads.length === 4) {
    console.log('success! 😁');  // we should get to here!
} else {
    console.log('failure! 😥');  // ...and not here
}
```

### Browsers - directly, without a bundler, using the pre-bundled minified .js file

Please note that no tree shaking will take place in this case.

```html
<!doctype html>

<html lang="en">
<head>
    <script type="module">
        import { fitQuadsToCubic } from "./node_modules/flo-bezier3/browser/index.min.js";

        // some cubic bezier curve given by an array of its control points
        const cubic = [[1, 1], [5.125, 8], [15.375, 0.875], [13.6875, 7.71875]];
        const quads = fitQuadsToCubic(cubic, 0.1); //=> [[[1, 1], [2.617431640625, 3.5152587890625], ...

        if (quads.length === 4) {
            console.log('success! 😁');  // we should get to here!
        } else {
            console.log('failure! 😥');  // ...and not here
        }
    </script>
</head>

<body>Check the console.</body>

</html>
```

### Bundlers (Webpack, Rollup, ...)

Webpack will be taken as an example here.

Since your webpack config file might still use `CommonJS` you must rename 
`webpack.config.js` to `webpack.config.cjs`.

If you are using TypeScript:

Since this is an [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c)
library you must use [resolve-typescript-plugin](https://www.npmjs.com/package/resolve-typescript-plugin) 
(at least until webpack catches up with ESM?) in your `webpack.config.cjs` file.

```cli
npm install --save-dev resolve-typescript-plugin
```

and follow the instructions given at [resolve-typescript-plugin](https://www.npmjs.com/package/resolve-typescript-plugin).

Additionally, follow this [guide](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c#how-can-i-make-my-typescript-project-output-esm).


## License

The MIT License (MIT)

Copyright © 2023 Floris Steenkamp

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
