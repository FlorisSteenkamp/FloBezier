(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.FloBezier3 = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';

var _slicedToArray = function () {
	function sliceIterator(arr, i) {
		var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
			for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
				_arr.push(_s.value);if (i && _arr.length === i) break;
			}
		} catch (err) {
			_d = true;_e = err;
		} finally {
			try {
				if (!_n && _i["return"]) _i["return"]();
			} finally {
				if (_d) throw _e;
			}
		}return _arr;
	}return function (arr, i) {
		if (Array.isArray(arr)) {
			return arr;
		} else if (Symbol.iterator in Object(arr)) {
			return sliceIterator(arr, i);
		} else {
			throw new TypeError("Invalid attempt to destructure non-iterable instance");
		}
	};
}();

function _toConsumableArray(arr) {
	if (Array.isArray(arr)) {
		for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
			arr2[i] = arr[i];
		}return arr2;
	} else {
		return Array.from(arr);
	}
}

var Poly = _dereq_('flo-poly');
var Vector = _dereq_('flo-vector2d');
var Memoize = _dereq_('flo-memoize');
var gaussQuadrature = _dereq_('flo-gauss-quadrature');
var grahamScan = _dereq_('flo-graham-scan');

var DELTA = 1e-10;

var rotate = Vector.rotatePs,
    translate = Vector.translatePs;

var memoize = Memoize.m1;

/**
 * Returns the power basis representation of the bezier's x-coordinates.
 * This function is memoized on its points parameter by object reference.
 * @param {number[][]} ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @returns {number[]} The power basis polynomial from highest power to lowest, 
 * e.g. at^3 + bt^2 + ct + d is returned as [a,b,c,d]
 */
var getX = memoize(function (ps) {
	var _ps = _slicedToArray(ps, 4),
	    _ps$ = _slicedToArray(_ps[0], 1),
	    x0 = _ps$[0],
	    _ps$2 = _slicedToArray(_ps[1], 1),
	    x1 = _ps$2[0],
	    _ps$3 = _slicedToArray(_ps[2], 1),
	    x2 = _ps$3[0],
	    _ps$4 = _slicedToArray(_ps[3], 1),
	    x3 = _ps$4[0];

	return [x3 - 3 * x2 + 3 * x1 - x0, // t^3
	3 * x2 - 6 * x1 + 3 * x0, // t^2
	3 * x1 - 3 * x0, // t^1
	x0];
} // t^0
);

/**
 * Returns the power basis representation of the bezier's y-coordinates.
 * This function is memoized on its points parameter by object reference.
 * @param {number[][]} ps - A bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @returns {number[]} The power basis polynomial from highest power to lowest, 
 * e.g. at^3 + bt^2 + ct + d is returned as [a,b,c,d]
 */
var getY = memoize(function (ps) {
	var _ps2 = _slicedToArray(ps, 4),
	    _ps2$ = _slicedToArray(_ps2[0], 2),
	    y0 = _ps2$[1],
	    _ps2$2 = _slicedToArray(_ps2[1], 2),
	    y1 = _ps2$2[1],
	    _ps2$3 = _slicedToArray(_ps2[2], 2),
	    y2 = _ps2$3[1],
	    _ps2$4 = _slicedToArray(_ps2[3], 2),
	    y3 = _ps2$4[1];

	return [y3 - 3 * y2 + 3 * y1 - y0, // t^3
	3 * y2 - 6 * y1 + 3 * y0, // t^2
	3 * y1 - 3 * y0, // t^1
	y0];
} // t^0
);

/**
 * Returns the derivative of the power basis representation of the bezier's 
 * x-coordinates. This function is memoized on its points parameter by object 
 * reference.
 * @param {number[][]} ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @returns {number[]} The differentiated power basis polynomial from highest 
 * power to lowest, e.g. at^2 + bt + c is returned as [a,b,c]
 */
var getDx = memoize(function (ps) {
	return Poly.differentiate(getX(ps));
});

/**
 * Returns the derivative of the power basis representation of the bezier's 
 * y-coordinates. This function is memoized on its points parameter by object 
 * reference.
 * @param {number[][]} ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @returns {number[]} The differentiated power basis polynomial from highest
 * power to lowest, e.g. at^2 + bt + c is returned as [a,b,c]
 */
var getDy = memoize(function (ps) {
	return Poly.differentiate(getY(ps));
});

/**
 * Returns the second derivative of the power basis representation of the 
 * bezier's x-coordinates. This function is memoized on its points parameter by 
 * object reference.
 * @param {number[][]} ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @returns {number[]} The twice differentiated power basis polynomial from 
 * highest power to lowest, e.g. at + b is returned as [a,b]
 */
var getDdx = memoize(function (ps) {
	return Poly.differentiate(getDx(ps));
});

/**
 * Returns the second derivative of the power basis representation of the 
 * bezier's y-coordinates. This function is memoized on its points parameter by 
 * object reference.
 * @param {number[][]} ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @returns {number[]} The twice differentiated power basis polynomial from 
 * highest power to lowest, e.g. at + b is returned as [a,b]
 */
var getDdy = memoize(function (ps) {
	return Poly.differentiate(getDy(ps));
});

/**
 * Returns the third derivative of the power basis representation of the 
 * bezier's x-coordinates. This function is memoized on its points parameter by 
 * object reference.
 * @param {number[][]} ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @returns {number[]} The thrice differentiated power basis polynomial (a 
 * constant in array from), e.g. a is returned as [a]
 */
var getDddx = memoize(function (ps) {
	return Poly.differentiate(getDdx(ps));
});

/**
 * Returns the third derivative of the power basis representation of the 
 * bezier's y-coordinates. This function is memoized on its points parameter by 
 * object reference.
 * @param {number[][]} ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @returns {number[]} The thrice differentiated power basis polynomial (a 
 * constant in array from), e.g. a is returned as [a]
 */
var getDddy = memoize(function (ps) {
	return Poly.differentiate(getDdy(ps));
});

/** 
 * <p>
 * Returns the convex hull of a bezier's control points. This hull bounds the 
 * bezier curve. This function is memoized.
 * </p>
 * <p>
 * The tolerance at which the cross product of two nearly collinear lines of the 
 * hull are considered collinear is 1e-12.
 * </p>
  * @param {number[][]} ps - A bezier curve, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @returns {number[][]} An ordered array of convex hull points.
 */
var getBoundingHull = memoize(grahamScan);

/**
 * Returns a cubic bezier from the given line with evenly spaced control points.
 * @param {number[][]} l - a 2d line represented by two points
 * @returns {number[][]} Control points of the cubic bezier.
 */
function fromLine(l) {
	var _l = _slicedToArray(l, 2),
	    _l$ = _slicedToArray(_l[0], 2),
	    x0 = _l$[0],
	    y0 = _l$[1],
	    _l$2 = _slicedToArray(_l[1], 2),
	    x1 = _l$2[0],
	    y1 = _l$2[1];

	var xInterval = (x1 - x0) / 3;
	var yInterval = (y1 - y0) / 3;

	return [[x0, y0], [x0 + xInterval, y0 + yInterval], [x0 + xInterval * 2, y0 + yInterval * 2], [x1, y1]];
}

/** 
 * Evaluates the given bezier curve at the parameter t. This function is 
 * curried.
 * @param {number[][]} ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param {number} t - The parameter value where the bezier should be evaluated
 * @returns {number[]} The resultant point. 
 **/
function evaluate(ps, t) {
	var _ps3 = _slicedToArray(ps, 4),
	    _ps3$ = _slicedToArray(_ps3[0], 2),
	    x0 = _ps3$[0],
	    y0 = _ps3$[1],
	    _ps3$2 = _slicedToArray(_ps3[3], 2),
	    x3 = _ps3$2[0],
	    y3 = _ps3$2[1];

	var evX = evaluateX(ps);
	var evY = evaluateY(ps);

	function f(t) {
		if (t === 0) {
			return [x0, y0];
		} else if (t === 1) {
			return [x3, y3];
		}

		return [evX(t), evY(t)];
	}

	return t === undefined ? f : f(t);
}

/** 
 * @description Find bezier inflection points. 
 **/
function findBezierInflectionPoints(ps) {
	var _ps4 = _slicedToArray(ps, 4),
	    _ps4$ = _slicedToArray(_ps4[0], 2),
	    x0 = _ps4$[0],
	    y0 = _ps4$[1],
	    _ps4$2 = _slicedToArray(_ps4[1], 2),
	    x1 = _ps4$2[0],
	    y1 = _ps4$2[1],
	    _ps4$3 = _slicedToArray(_ps4[2], 2),
	    x2 = _ps4$3[0],
	    y2 = _ps4$3[1],
	    _ps4$4 = _slicedToArray(_ps4[3], 2),
	    x3 = _ps4$4[0],
	    y3 = _ps4$4[1];

	// From http://www.caffeineowl.com/graphics/2d/vectorial/cubic-inflexion.html eq. 4


	var ax = x1 - x0;var ay = y1 - y0;
	var bx = x2 - x1 - ax;var by = y2 - y1 - ay;
	var cx = x3 - x2 - ax - 2 * bx;var cy = y3 - y2 - ay - 2 * by;

	// From http://www.caffeineowl.com/graphics/2d/vectorial/cubic-inflexion.html eq. 6:
	//   infl(t) := ax*by - ay*bx + t*(ax*cy - ay*cx) + t^2*(bx*cy - by*cx);
	// We find the roots of the quadratic - a,b,c are the quadratic coefficients
	var a = bx * cy - by * cx;
	var b = ax * cy - ay * cx;
	var c = ax * by - ay * bx;

	var inflectionTimes = Poly.allRoots([a, b, c], 0, 1);

	var evPs = evaluate(ps);
	return inflectionTimes.map(evPs);
}

/**
 * Returns the curvature, κ, at a specific t. This function is curried. Alias
 * of curvature.
 * @param {number[][]} ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param {number} t - The parameter value where the curvature should be 
 * evaluated
 * @returns {number}
 */
function κ(ps, t) {
	var evDx = evaluateDx(ps);
	var evDy = evaluateDy(ps);
	var evDdx = evaluateDdx(ps);
	var evDdy = evaluateDdy(ps);

	function f(t) {
		var dx = evDx(t);
		var dy = evDy(t);
		var ddx = evDdx(t);
		var ddy = evDdy(t);

		var a = dx * ddy - dy * ddx;
		var b = Math.sqrt(Math.pow(dx * dx + dy * dy, 3));

		return a / b;
	}

	// Curry
	return t === undefined ? f : f(t);
}

/**
 * Alias of κ.
 */
var curvature = κ;

/**
 * Helper function. This function is curried.
 * @ignore
 */
function κds(ps, t) {
	var evDx = evaluateDx(ps);
	var evDy = evaluateDy(ps);
	var evDdx = evaluateDdx(ps);
	var evDdy = evaluateDdy(ps);

	function f(t) {
		var dx = evDx(t);
		var dy = evDy(t);
		var ddx = evDdx(t);
		var ddy = evDdy(t);

		var a = dx * ddy - dy * ddx;
		var b = dx * dx + dy * dy;

		return a / b;
	}

	// Curry
	return t === undefined ? f : f(t);
}

/** 
 * Helper function. This function is curried.
 * A modified version of the differential of κ (use quotient rule, ignore 
 * denominator and multiply by 2/3). We need to find the zeros of this function 
 * to get the min/max curvature.
 * See <a href="http://math.info/Calculus/Curvature_Parametric/">this</a> for
 * more details.
 * @ignore
**/
function dκMod(ps, t) {
	var _ps5 = _slicedToArray(ps, 4),
	    _ps5$ = _slicedToArray(_ps5[0], 2),
	    x0 = _ps5$[0],
	    y0 = _ps5$[1],
	    _ps5$2 = _slicedToArray(_ps5[1], 2),
	    x1 = _ps5$2[0],
	    y1 = _ps5$2[1],
	    _ps5$3 = _slicedToArray(_ps5[2], 2),
	    x2 = _ps5$3[0],
	    y2 = _ps5$3[1],
	    _ps5$4 = _slicedToArray(_ps5[3], 2),
	    x3 = _ps5$4[0],
	    y3 = _ps5$4[1];

	function f(t) {

		var ts = t * t;
		var omt = 1 - t;

		var a = ts * x3;
		var b = ts * y3;
		var c = 2 * t - 3 * ts;
		var d = (3 * t - 1) * omt;
		var e = omt * omt;
		var f = 3 * (a + c * x2 - d * x1 - e * x0);
		var g = 3 * (b + c * y2 - d * y1 - e * y0);
		var h = 6 * (t * y3 - (3 * t - 1) * y2 + (3 * t - 2) * y1 + omt * y0);
		var i = 6 * (t * x3 - (3 * t - 1) * x2 + (3 * t - 2) * x1 + omt * x0);
		var j = Math.sqrt(f * f + g * g);

		return 4 * (f * (y3 - 3 * y2 + 3 * y1 - y0) - g * (x3 - 3 * x2 + 3 * x1 - x0)) * Math.pow(j, 3) - (f * h - b * g) * (2 * h * g + 2 * b * f) * j;
	}

	return t === undefined ? f : f(t);
}

/**
 * Returns the tangent unit vector of a cubic bezier curve at a specific t. This 
 * function is curried.
 * @param {number[][]} ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param {number} t - The parameter value where the tangent should be evaluated
 * @returns {number[]}
 */
function tangent(ps, t) {
	var evDx = evaluateDx(ps);
	var evDy = evaluateDy(ps);

	function f(t) {
		var dx = evDx(t);
		var dy = evDy(t);
		var d = Math.sqrt(dx * dx + dy * dy);

		return [dx / d, dy / d];
	}

	// Curry
	return t === undefined ? f : f(t);
}

/**
 * Returns the normal unit vector of a cubic bezier curve at a specific t. This
 * function is curried.
 * @param {number[][]} ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param {number} t - The parameter value where the normal should be evaluated
 * @returns {number[]}
 */
function normal(ps, t) {
	var tanPs = tangent(ps);

	function f(t) {
		var v = tanPs(t);
		return [v[1], -v[0]];
	}

	// Curry
	return t === undefined ? f : f(t);
}

/**
 * <p>
 * Categorizes the given cubic bezier curve according to whether it has a loop,
 * a cusp, or zero, one or two inflection points all of which are mutually 
 * exclusive. 
 * </p>
 * <p>
 * See <a href="http://graphics.pixar.com/people/derose/publications/CubicClassification/paper.pdf">
 * this</a> paper.
 * </p>
 * @param {number[][]} ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @returns {string} A value of 'L', 'C', '0', '1', or '2' depending on whether
 * the curve has a loop, a cusp, or zero, one or two inflection points.
 */
function categorize(ps) {}
// TODO - finish


/**
 * Returns the total curvature of the bezier over the given interval using 
 * Gaussian Quadrature integration with 16 wieghts and abscissas which is 
 * generally very accurate and fast. This function is curried.
 * @param {number[][]} ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param {number[]} interval - The interval of integration (often === [0,1])
 * @returns {number} The total curvature.
 */
function totalCurvature(ps, interval) {
	var tanPs = tangent(ps);

	function f(interval) {}
	//return gaussQuadrature(κds(ps), interval);
	// TODO
	/*
 let [a,b] = interval;
 let tangentA = tanPs(a);
 let tangentB = tanPs(b);
 let sinθ = Vector.cross(tanA, tanB)
 */

	// Curry
	return interval === undefined ? f : f(interval);
}

/**
 * TODO
 * Returns the total absolute curvature of the bezier over [0,1] using Gaussian 
 * Quadrature integration with 16 wieghts and abscissas which is generally very 
 * accurate and fast. This function is Memoized.
 * @param {number[]} interval_
 * @returns {number} The result in radians.
 */
var totalAbsoluteCurvature = memoize(function (ps) {
	var totalAbsoluteCurvature = {}; // Lookup cache

	return function (interval_) {
		var interval = interval_ || [0, 1];

		var key = '' + interval[0] + ', ' + interval[1];
		if (totalAbsoluteCurvature[key]) {
			return totalAbsoluteCurvature[key];
		}

		// Numerically integrate the absolute curvature
		var result = gaussQuadrature(function (t) {
			return Math.abs(κds(ps)(t));
		}, interval);
		totalAbsoluteCurvature[key] = result;

		return result;
	};
});

/**
 * Returns the curve length in the specified interval. This function is curried.
 * @param {number[][]} ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param {number[]} interval - The paramter interval over which the lenght is 
 * to be calculated (often === [0,1]).
 * @returns {number}
 */
function length(interval, ps) {
	function f(ps) {
		if (interval[0] === interval[1]) {
			return 0;
		}

		var _ps6 = _slicedToArray(ps, 4),
		    _ps6$ = _slicedToArray(_ps6[0], 2),
		    x0 = _ps6$[0],
		    y0 = _ps6$[1],
		    _ps6$2 = _slicedToArray(_ps6[1], 2),
		    x1 = _ps6$2[0],
		    y1 = _ps6$2[1],
		    _ps6$3 = _slicedToArray(_ps6[2], 2),
		    x2 = _ps6$3[0],
		    y2 = _ps6$3[1],
		    _ps6$4 = _slicedToArray(_ps6[3], 2),
		    x3 = _ps6$4[0],
		    y3 = _ps6$4[1];
		// Keep line below to ensure zero length curve returns zero!


		if (x0 === x1 && x1 === x2 && x2 === x3 && y0 === y1 && y1 === y2 && y2 === y3) {
			return 0;
		}
		var evDs = ds(ps);
		return gaussQuadrature(evDs, interval);
	}

	// Curry
	return ps === undefined ? f : f(ps);
}

/**
 * Returns the t parameter value where the given cubic bezier reaches the given
 * length, s, starting from t = 0. This function is curried.
 * @param {number[][]} ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param {number[]} s - The length
 * @returns {number}
 */
function getTAtLength(ps, s) {
	var lenAtT = function lenAtT(t) {
		return length([0, t], ps);
	};

	function f(s) {
		return Poly.brent(function (t) {
			return lenAtT(t) - s;
		}, 0, 1);
	}

	// Curry
	return s === undefined ? f : f(s);
}

/**
 * Returns ds. This function is curried.
 * @ignore
 * @param {number[][]} ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param {number} t - The parameter value
 * @returns {number}
 */
function ds(ps, t) {
	var evDx = evaluateDx(ps);
	var evDy = evaluateDy(ps);

	function f(t) {
		var dx = evDx(t);
		var dy = evDy(t);

		return Math.sqrt(dx * dx + dy * dy);
	}

	// Curry
	return t === undefined ? f : f(t);
}
/*
 function distanceToOrigin(ps,t) {
	const evDx = evaluateDx(ps);
	const evDy = evaluateDy(ps);

	function f(t) {
		let dx = evDx(t);
		let dy = evDy(t);
		
		return Math.sqrt(dx*dx + dy*dy);	
	}

	// Curry
	return t === undefined ? f : f(t);	
}
*/

/**
 * Returns the x value of the given cubic bezier when evaluated at t. This
 * function is curried.
 * @param {number[][]} ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param {number} t - The t parameter
 * @returns {number} 
 */
function evaluateX(ps, t) {
	var xPs = getX(ps); // Speed optimizing cache
	var evPs = Poly.evaluate(xPs);
	function f(t) {
		if (t === 0) {
			return ps[0][0];
		}
		if (t === 1) {
			return ps[3][0];
		}
		return evPs(t);
	}
	return t === undefined ? f : f(t); // Curry
}

/**
 * Returns the y value of the given cubic bezier when evaluated at t. This
 * function is curried.
 * @param {number[][]} ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param {number} t - The t parameter
 * @returns {number} 
 */
function evaluateY(ps, t) {
	var yPs = getY(ps); // Speed optimizing cache
	var evPs = Poly.evaluate(yPs);
	function f(t) {
		if (t === 0) {
			return ps[0][1];
		}
		if (t === 1) {
			return ps[3][1];
		}
		return evPs(t);
	}
	return t === undefined ? f : f(t); // Curry
}

/**
 * Returns the x value of the once differentiated (with respect to t) cubic 
 * bezier when evaluated at t. This function is curried.
 * @param {number[][]} ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param {number} t - The t parameter
 * @returns {number} 
 */
function evaluateDx(ps, t) {
	var dPs = getDx(ps); // Speed optimizing cache
	var f = Poly.evaluate(dPs);
	return t === undefined ? f : f(t); // Curry
}

/**
 * Returns the y value of the once differentiated (with respect to t) cubic 
 * bezier when evaluated at t. This function is curried.
 * @param {number[][]} ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param {number} t - The t parameter
 * @returns {number} 
 */
function evaluateDy(ps, t) {
	var dPs = getDy(ps); // Speed optimizing cache
	var f = Poly.evaluate(dPs);
	return t === undefined ? f : f(t); // Curry
}

/**
 * Returns the x value of the twice differentiated (with respect to t) cubic 
 * bezier when evaluated at t. This function is curried.
 * @param {number[][]} ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param {number} t - The t parameter
 * @returns {number} 
 */
function evaluateDdx(ps, t) {
	var ddPs = getDdx(ps); // Speed optimizing cache
	var f = Poly.evaluate(ddPs);
	return t === undefined ? f : f(t); // Curry
}

/**
 * Returns the y value of the twice differentiated (with respect to t) cubic 
 * bezier when evaluated at t. This function is curried.
 * @param {number[][]} ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param {number} t - The t parameter
 * @returns {number} 
 */
function evaluateDdy(ps, t) {
	var ddPs = getDdy(ps); // Speed optimizing cache
	var f = Poly.evaluate(ddPs);
	return t === undefined ? f : f(t); // Curry
}

/**
 * Returns the x value of the thrice differentiated (with respect to t) cubic 
 * bezier when evaluated at t. This function is curried.
 * @param {number[][]} ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param {number} t - The t parameter
 * @returns {number} 
 */
function evaluateDddx(ps, t) {
	var dddPs = getDddx(ps); // Speed optimizing cache
	var f = Poly.evaluate(dddPs);
	return t === undefined ? f : f(t); // Curry
}

/**
 * Returns the y value of the thrice differentiated (with respect to t) cubic 
 * bezier when evaluated at t. This function is curried.
 * @param {number[][]} ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param {number} t - The t parameter
 * @returns {number} 
 */
function evaluateDddy(ps, t) {
	var dddPs = getDddy(ps); // Speed optimizing cache
	var f = Poly.evaluate(dddPs);
	return t === undefined ? f : f(t); // Curry
}

// TODO - refactor getBounds, getBoundingBox, etc.
/**
 * Helper function. Returns the bounding box of the normalized (i.e. first point 
 * moved to origin and rotated so that last point lies on x-axis) given cubic 
 * bezier.
 * @ignore
 * @param {number[][]} ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param {number} sinθ - Sine of angle made by line from first bezier point to 
 * last with x-axis.
 * @param {number} cosθ - Cosine of angle made by line from first bezier point 
 * to last with x-axis.
 * @returns {number[][]} Bounding box in the form [[minX, minY], [maxX,maxY]
 */
function getNormalizedBoundingBox(ps, sinθ, cosθ) {
	var vectorToOrigin = Vector.transform(ps[0], function (x) {
		return -x;
	});

	var boundingPs = Vector.translateThenRotatePs(vectorToOrigin, -sinθ, cosθ, ps);

	return getBoundingBox(boundingPs);
}

/**
 * Returns the tight bounding box of the given cubic bezier.
 * @returns {number[][]} The tight bounding box of the bezier as four ordered
 * points of a rotated rectangle.
 * TODO - test case of baseLength === 0
 */
var getBoundingBoxTight = memoize(function (ps) {
	var _ps7 = _slicedToArray(ps, 4),
	    _ps7$ = _slicedToArray(_ps7[0], 2),
	    x0 = _ps7$[0],
	    y0 = _ps7$[1],
	    _ps7$2 = _slicedToArray(_ps7[1], 2),
	    x1 = _ps7$2[0],
	    y1 = _ps7$2[1],
	    _ps7$3 = _slicedToArray(_ps7[2], 2),
	    x2 = _ps7$3[0],
	    y2 = _ps7$3[1],
	    _ps7$4 = _slicedToArray(_ps7[3], 2),
	    x3 = _ps7$4[0],
	    y3 = _ps7$4[1];

	var baseLength = Math.sqrt((x3 - x0) * (x3 - x0) + (y3 - y0) * (y3 - y0));
	var sinθ = (y3 - y0) / baseLength;
	var cosθ = (x3 - x0) / baseLength;

	var box = getNormalizedBoundingBox(ps, sinθ, cosθ);

	var _box = _slicedToArray(box, 2),
	    _box$ = _slicedToArray(_box[0], 2),
	    p0x = _box$[0],
	    p0y = _box$[1],
	    _box$2 = _slicedToArray(_box[1], 2),
	    p1x = _box$2[0],
	    p1y = _box$2[1];

	var axisAlignedBox = [box[0], [p1x, p0y], box[1], [p0x, p1y]];

	return Vector.rotateThenTranslatePs(sinθ, cosθ, ps[0], axisAlignedBox);
});

/**
 * Returns the axis-aligned bounding box of a given bezier.
 * @param {number[][]} ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @returns {number[][]} the axis-aligned bounding box in the form
 * [[minx, miny], [maxx,maxy]
 */
var getBoundingBox = memoize(function (ps) {
	return getBounds(ps).box;
});

/**
 * Calculates and returns general bezier bounds.
 * @returns {object} The axis-aligned bounding box together with the t values
 * where the bounds on the bezier are reached.
 */
var getBounds = memoize(function (ps) {

	// Roots of derivative
	var roots = [getDx(ps), getDy(ps)].map(function (poly) {
		return Poly.allRoots(poly, 0, 1);
	});

	// Endpoints
	roots[0].push(0, 1);
	roots[1].push(0, 1);

	var minX = Number.POSITIVE_INFINITY;
	var maxX = Number.NEGATIVE_INFINITY;
	var minY = Number.POSITIVE_INFINITY;
	var maxY = Number.NEGATIVE_INFINITY;

	var tMinX = undefined;
	var tMinY = undefined;
	var tMaxX = undefined;
	var tMaxY = undefined;

	// Test points
	for (var i = 0; i < roots[0].length; i++) {
		var t = roots[0][i];
		var x = evaluateX(ps, t);
		if (x < minX) {
			minX = x;tMinX = t;
		}
		if (x > maxX) {
			maxX = x;tMaxX = t;
		}
	}
	for (var _i = 0; _i < roots[1].length; _i++) {
		var _t = roots[1][_i];
		var y = evaluateY(ps, _t);
		if (y < minY) {
			minY = y;tMinY = _t;
		}
		if (y > maxY) {
			maxY = y;tMaxY = _t;
		}
	}

	var ts = [[tMinX, tMinY], [tMaxX, tMaxY]];
	var box = [[minX, minY], [maxX, maxY]];

	return { ts: ts, box: box };
});

/**
 * <p>
 * Returns a cubic bezier curve that starts at the given curve and ends at the
 * given t parameter. Uses de Casteljau's algorithm. 
 * </p>
 * <p>
 * A loose bound on the accuracy of the resultant points is given by: 
 * |δP| = 2*2n*max_k(|b_k|)η, where n = 3 (cubic), b_k are the control points
 * abd η is Number.EPSILON.
 * </p>
 * @param {number[][]} ps - A cubic bezier curve
 * @param {number} t1 - The t parameter where the resultant bezier should start
 * @param {number} t2 - The t parameter where the resultant bezier should end
 * @returns {number[][]}
 */
function fromTo(ps) {
	return function (t1, t2) {
		if (t1 === t2) {
			// Degenerate case
			var p = evaluate(ps, t1);
			return [p, p, p, p];
		}
		var t = fromTTo1(ps, t1);
		return from0ToT(t, (t2 - t1) / (1 - t1));
	};
};

/**
 * <p>
 * Returns a cubic bezier curve that starts at the given curve's t=0 and ends 
 * at the given t parameter. Uses de Casteljau's algorithm. 
 * </p>
 * <p>
 * A loose bound on the accuracy of the resultant points is given by: 
 * |δP| = 2n*max_k(|b_k|)η, where n = 3 (cubic), b_k are the control points
 * abd η is Number.EPSILON.
 * </p>
 * @param {number[][]} ps - A cubic bezier curve
 * @param {number} t - The t parameter where the resultant bezier should end
 * @returns {number[][]}
 */
function from0ToT(ps, t) {
	var _ps8 = _slicedToArray(ps, 4),
	    _ps8$ = _slicedToArray(_ps8[0], 2),
	    x0 = _ps8$[0],
	    y0 = _ps8$[1],
	    _ps8$2 = _slicedToArray(_ps8[1], 2),
	    x1 = _ps8$2[0],
	    y1 = _ps8$2[1],
	    _ps8$3 = _slicedToArray(_ps8[2], 2),
	    x2 = _ps8$3[0],
	    y2 = _ps8$3[1],
	    _ps8$4 = _slicedToArray(_ps8[3], 2),
	    x3 = _ps8$4[0],
	    y3 = _ps8$4[1];

	var s = 1 - t;
	var t2 = t * t;
	var t3 = t2 * t;
	var s2 = s * s;
	var s3 = s2 * s;

	return [[x0, y0], [t * x1 + s * x0, t * y1 + s * y0], [t2 * x2 + 2 * s * t * x1 + s2 * x0, t2 * y2 + 2 * s * t * y1 + s2 * y0], [t3 * x3 + 3 * s * t2 * x2 + 3 * s2 * t * x1 + s3 * x0, t3 * y3 + 3 * s * t2 * y2 + 3 * s2 * t * y1 + s3 * y0]];
}

/**
 * <p>
 * Returns a cubic bezier curve that starts at the given t parameter and 
 * ends at t=1. Uses de Casteljau's algorithm.
 * </p>
 * <p>
 * A loose bound on the accuracy of the resultant points is given by: 
 * |δP| = 2n*max_k(|b_k|)η, where n = 3 (cubic), b_k are the control points
 * abd η is Number.EPSILON.
 * </p>
 * @param {number[][]} ps - A cubic bezier curve
 * @param {number} t - The t parameter where the resultant bezier should start
 * @returns {number[][]}
 */
function fromTTo1(ps, t) {
	var _ps9 = _slicedToArray(ps, 4),
	    _ps9$ = _slicedToArray(_ps9[0], 2),
	    x0 = _ps9$[0],
	    y0 = _ps9$[1],
	    _ps9$2 = _slicedToArray(_ps9[1], 2),
	    x1 = _ps9$2[0],
	    y1 = _ps9$2[1],
	    _ps9$3 = _slicedToArray(_ps9[2], 2),
	    x2 = _ps9$3[0],
	    y2 = _ps9$3[1],
	    _ps9$4 = _slicedToArray(_ps9[3], 2),
	    x3 = _ps9$4[0],
	    y3 = _ps9$4[1];

	var s = 1 - t;
	var t2 = t * t;
	var t3 = t2 * t;
	var s2 = s * s;
	var s3 = s2 * s;

	return [[t3 * x3 + 3 * s * t2 * x2 + 3 * s2 * t * x1 + s3 * x0, t3 * y3 + 3 * s * t2 * y2 + 3 * s2 * t * y1 + s3 * y0], [t2 * x3 + 2 * t * s * x2 + s2 * x1, t2 * y3 + 2 * t * s * y2 + s2 * y1], [t * x3 + s * x2, t * y3 + s * y2], [x3, y3]];
}

/**
 * <p>
 * Returns 2 new beziers split at the given t parameter, i.e. for the ranges 
 * [0,t] and [t,1]. Uses de Casteljau's algorithm. 
 * </p>
 * <p>
 * A loose bound on the accuracy of the resultant points is given by: 
 * |δP| = 2n*max_k(|b_k|)η, where n = 3 (cubic), b_k are the control points
 * abd η is Number.EPSILON.
 * </p>
 * @param {number[][]} ps - A cubic bezier curve
 * @param {number} t - The t parameter where the curve should be split
 * @returns {number[][]}
 */
function splitAt(ps, t) {
	var _ps10 = _slicedToArray(ps, 4),
	    _ps10$ = _slicedToArray(_ps10[0], 2),
	    x0 = _ps10$[0],
	    y0 = _ps10$[1],
	    _ps10$2 = _slicedToArray(_ps10[1], 2),
	    x1 = _ps10$2[0],
	    y1 = _ps10$2[1],
	    _ps10$3 = _slicedToArray(_ps10[2], 2),
	    x2 = _ps10$3[0],
	    y2 = _ps10$3[1],
	    _ps10$4 = _slicedToArray(_ps10[3], 2),
	    x3 = _ps10$4[0],
	    y3 = _ps10$4[1];

	var s = 1 - t;
	var t2 = t * t;
	var t3 = t2 * t;
	var s2 = s * s;
	var s3 = s2 * s;

	var ps1 = [[x0, y0], [t * x1 + s * x0, t * y1 + s * y0], [t2 * x2 + 2 * s * t * x1 + s2 * x0, t2 * y2 + 2 * s * t * y1 + s2 * y0], [t3 * x3 + 3 * s * t2 * x2 + 3 * s2 * t * x1 + s3 * x0, t3 * y3 + 3 * s * t2 * y2 + 3 * s2 * t * y1 + s3 * y0]];

	var ps2 = [ps1[3], [t2 * x3 + 2 * t * s * x2 + s2 * x1, t2 * y3 + 2 * t * s * y2 + s2 * y1], [t * x3 + s * x2, t * y3 + s * y2], [x3, y3]];

	return [ps1, ps2];
}

/**
 * Returns a human readable string representation of the given bezier.
 * @param {number[][]} ps - A bezier curve
 * @returns {string}
 */
function toString(ps) {
	var _ps11 = _slicedToArray(ps, 4),
	    _ps11$ = _slicedToArray(_ps11[0], 2),
	    x0 = _ps11$[0],
	    y0 = _ps11$[1],
	    _ps11$2 = _slicedToArray(_ps11[1], 2),
	    x1 = _ps11$2[0],
	    y1 = _ps11$2[1],
	    _ps11$3 = _slicedToArray(_ps11[2], 2),
	    x2 = _ps11$3[0],
	    y2 = _ps11$3[1],
	    _ps11$4 = _slicedToArray(_ps11[3], 2),
	    x3 = _ps11$4[0],
	    y3 = _ps11$4[1];

	return '[[' + x0 + ',' + y0 + '],[' + x1 + ',' + y1 + '],[' + x2 + ',' + y2 + '],[' + x3 + ',' + y3 + ']]';
}

/**
 * Scales all control points of the given bezier by the given factor.
 * @param {number[][]} ps - A bezier curve
 * @param {number} factor - The scale factor
 * @returns {number[][]}
 */
function scale(ps, factor) {
	return ps.map(function (x) {
		return [x[0] * factor, x[1] * factor];
	});
}

/**
 * Returns the bezier t values of the intersection between the given cubic 
 * bezier and the given line.
 * @param {number[][]} ps - The bezier curve
 * @param {number[][]} l - The line given as a start and end point
 * @returns {number[]}
 */
function lineIntersection(ps, l) {
	var _l2 = _slicedToArray(l, 2),
	    _l2$ = _slicedToArray(_l2[0], 2),
	    x0 = _l2$[0],
	    y0 = _l2$[1],
	    _l2$2 = _slicedToArray(_l2[1], 2),
	    x1 = _l2$2[0],
	    y1 = _l2$2[1];

	var x = x1 - x0,
	    y = y1 - y0;

	if (x === 0 && y === 0) {
		return [];
	}

	// Move the line and the bezier together so the line's first point is on the
	// origin.
	ps = translate([-x0, -y0], ps);

	// Rotate the bezier and line together so the line is y=0.
	var len = Math.sqrt(x * x + y * y);
	var sinθ = y / len;
	var cosθ = x / len;
	ps = rotate(-sinθ, cosθ, ps);

	// Find the intersection t values
	return Poly.allRoots(getY(ps), 0, 1);
}

/**
 * Returns the bezier t values of the intersection between the given cubic 
 * bezier and the given horizontal line.
 * @param {number[][]} ps - The bezier curve
 * @param {number[][]} y - The y value of the horizontal line
 * @returns {number[]}
 */
function tsAtY(ps, y) {
	// Translate ps so that y = 0.
	ps = ps.map(function (p) {
		return [p[0], p[1] - y];
	});

	// Find the intersection t values
	return Poly.allRoots(getY(ps), 0, 1);
}

/**
 * Returns the bezier t values of the intersection between the given cubic 
 * bezier and the given vertical line.
 * @param {number[][]} ps - The bezier curve
 * @param {number[][]} y - The y value of the horizontal line
 * @returns {number[]}
 */
function tsAtX(ps, x) {
	// Translate ps so that x = 0.
	ps = ps.map(function (p) {
		return [p[0] - x, p[1]];
	});

	// Find the intersection t values
	return Poly.allRoots(getX(ps), 0, 1);
}

/**
 * Returns the best least squares quadratic bezier approximation to the given
 * cubic bezier. Note that the two bezier endpoints differ in general.
 * @param {number[][]} ps - A cubic bezier curve.
 * @returns {number[][]}
 */
function toQuadratic(ps) {
	var _ps12 = _slicedToArray(ps, 4),
	    _ps12$ = _slicedToArray(_ps12[0], 2),
	    x0 = _ps12$[0],
	    y0 = _ps12$[1],
	    _ps12$2 = _slicedToArray(_ps12[1], 2),
	    x1 = _ps12$2[0],
	    y1 = _ps12$2[1],
	    _ps12$3 = _slicedToArray(_ps12[2], 2),
	    x2 = _ps12$3[0],
	    y2 = _ps12$3[1],
	    _ps12$4 = _slicedToArray(_ps12[3], 2),
	    x3 = _ps12$4[0],
	    y3 = _ps12$4[1];

	return [[19 / 20 * x0 + 3 / 20 * x1 + -3 / 20 * x2 + 1 / 20 * x3, 19 / 20 * y0 + 3 / 20 * y1 + -3 / 20 * y2 + 1 / 20 * y3], [-1 / 4 * x0 + 3 / 4 * x1 + 3 / 4 * x2 + -1 / 4 * x3, -1 / 4 * y0 + 3 / 4 * y1 + 3 / 4 * y2 + -1 / 4 * y3], [1 / 20 * x0 + -3 / 20 * x1 + 3 / 20 * x2 + 19 / 20 * x3, 1 / 20 * y0 + -3 / 20 * y1 + 3 / 20 * y2 + 19 / 20 * y3]];
}

/**
 * Returns the hybrid quadratic version of the given cubic bezier. For a 
 * definition of hybrid quadratic bezier curves see <a href="http://scholarsarchive.byu.edu/cgi/viewcontent.cgi?article=2206&context=etd">
 * this paper</a>.
 * @param {number[][]} ps - A cubic bezier curve.
 * @returns {object[]} An array of three quadratic bezier points where the 
 * middle point is a 'hybrid' point represented as a line (itself represented
 * by two points (a linear bezier curve)) which can be evaluated at a different 
 * t value (call it th). If evaluated at the same t value the result is the same 
 * as evaluating the original cubic bezier at t. The set generated by evaluating 
 * the hybrid quadratic curve for all (t,th) value pairs forms a geometric area
 * bound around the orginal cubic bezier curve. The length of the linear bezier
 * curve mentioned above is a measure of how closely the cubic can be
 * represented as a quadratic bezier curve.
 */
function toHybridQuadratic(ps) {
	var _ps13 = _slicedToArray(ps, 4),
	    _ps13$ = _slicedToArray(_ps13[0], 2),
	    x0 = _ps13$[0],
	    y0 = _ps13$[1],
	    _ps13$2 = _slicedToArray(_ps13[1], 2),
	    x1 = _ps13$2[0],
	    y1 = _ps13$2[1],
	    _ps13$3 = _slicedToArray(_ps13[2], 2),
	    x2 = _ps13$3[0],
	    y2 = _ps13$3[1],
	    _ps13$4 = _slicedToArray(_ps13[3], 2),
	    x3 = _ps13$4[0],
	    y3 = _ps13$4[1];

	return [[x0, y0], // evaluated at t
	[[(3 * x1 - x0) / 2, (3 * y1 - y0) / 2], // evaluated at (1-t)
	[(3 * x2 - x3) / 2, (3 * y2 - y3) / 2]], // evaluated at t
	[x3, y3] // evaluated at t
	];
}

/**
 * Evaluates the given hybrid quadratic at the given t and th parameters. (see 
 * toHybridQuadratic for details).
 * @param {object[]} hq - A hybrid quadratic 
 * @param {number} t - The bezier parameter value
 * @param {number} th - The parameter value for the hybrid quadratic point.
 */
function evaluateHybridQuadratic(hq, t, th) {
	var _hq = _slicedToArray(hq, 3),
	    P0 = _hq[0],
	    _hq$ = _slicedToArray(_hq[1], 2),
	    _hq$$ = _slicedToArray(_hq$[0], 2),
	    x10 = _hq$$[0],
	    y10 = _hq$$[1],
	    _hq$$2 = _slicedToArray(_hq$[1], 2),
	    x11 = _hq$$2[0],
	    y11 = _hq$$2[1],
	    P2 = _hq[2];

	//let x1 = x10*(1-th) + x11*th;
	//let y1 = y10*(1-th) + y11*th;

	var P1 = evaluateLinear(hq[1], th);

	//let q = [P0, [x1,y1], P2];
	return evaluateQuadratic([P0, P1, P2], t);
}

/**
 * Evaluates the given linear bezier (line) at a specific t value.
 * @param {number[][]} ps - A linear bezier curve.
 * @param {number} t - The value where the bezier should be evaluated
 * @returns {number[]}
 */
function evaluateLinear(ps, t) {
	var _ps14 = _slicedToArray(ps, 2),
	    _ps14$ = _slicedToArray(_ps14[0], 2),
	    x0 = _ps14$[0],
	    y0 = _ps14$[1],
	    _ps14$2 = _slicedToArray(_ps14[1], 2),
	    x1 = _ps14$2[0],
	    y1 = _ps14$2[1];

	var x = x0 * (1 - t) + x1 * t;
	var y = y0 * (1 - t) + y1 * t;

	return [x, y];
}

/**
 * Returns a clone of the given cubic bezier. Use sparingly; this is not in the
 * spirit of functional programming.
 * @param {number[][]} ps - A cubic bezier given by its array of control points
 */
function clone(ps) {
	var _ps15 = _slicedToArray(ps, 4),
	    _ps15$ = _slicedToArray(_ps15[0], 2),
	    x0 = _ps15$[0],
	    y0 = _ps15$[1],
	    _ps15$2 = _slicedToArray(_ps15[1], 2),
	    x1 = _ps15$2[0],
	    y1 = _ps15$2[1],
	    _ps15$3 = _slicedToArray(_ps15[2], 2),
	    x2 = _ps15$3[0],
	    y2 = _ps15$3[1],
	    _ps15$4 = _slicedToArray(_ps15[3], 2),
	    x3 = _ps15$4[0],
	    y3 = _ps15$4[1];

	return [[x0, y0], [x1, y1], [x2, y2], [x3, y3]];
}

/**
 * Evaluates the given quadratic bezier at a specific t value.
 * @param {number[][]} ps - A quadratic bezier curve.
 * @param {number} t - The value where the bezier should be evaluated
 * @returns {number[]}
 */
function evaluateQuadratic(ps, t) {
	var _ps16 = _slicedToArray(ps, 3),
	    _ps16$ = _slicedToArray(_ps16[0], 2),
	    x0 = _ps16$[0],
	    y0 = _ps16$[1],
	    _ps16$2 = _slicedToArray(_ps16[1], 2),
	    x1 = _ps16$2[0],
	    y1 = _ps16$2[1],
	    _ps16$3 = _slicedToArray(_ps16[2], 2),
	    x2 = _ps16$3[0],
	    y2 = _ps16$3[1];

	var x = x0 * Math.pow(1 - t, 2) + x1 * 2 * (1 - t) * t + x2 * Math.pow(t, 2);
	var y = y0 * Math.pow(1 - t, 2) + y1 * 2 * (1 - t) * t + y2 * Math.pow(t, 2);

	return [x, y];
}

/**
 * Returns the cubic version of the given quadratic bezier curve. Quadratic 
 * bezier curves can always be represented by cubics - the converse is false.
 * @param {number[][]} ps - A quadratic bezier curve.
 * @returns {number[][]}
 */
function toCubic(ps) {
	var _ps17 = _slicedToArray(ps, 3),
	    _ps17$ = _slicedToArray(_ps17[0], 2),
	    x0 = _ps17$[0],
	    y0 = _ps17$[1],
	    _ps17$2 = _slicedToArray(_ps17[1], 2),
	    x1 = _ps17$2[0],
	    y1 = _ps17$2[1],
	    _ps17$3 = _slicedToArray(_ps17[2], 2),
	    x2 = _ps17$3[0],
	    y2 = _ps17$3[1];

	return [[x0, y0], [1 / 3 * x0 + 2 / 3 * x1, 1 / 3 * y0 + 2 / 3 * y1], [2 / 3 * x1 + 1 / 3 * x2, 2 / 3 * y1 + 1 / 3 * y2], [x2, y2]];
}

/**
 * Check if the two given cubic beziers are nearly coincident everywhere.
 * @param {number[][]} P - A cubic bezier curve.
 * @param {number[][]} Q - Another cubic bezier curve.
 * @param {number} δ - An indication of how closely the curves should stay to
 * each other before considered coincident.
 * @returns 
 */
function coincident(P, Q, δ) {
	if (δ === undefined) {
		δ = 1e-6;
	}

	var _P = _slicedToArray(P, 4),
	    P0 = _P[0],
	    P1 = _P[1],
	    P2 = _P[2],
	    P3 = _P[3];

	var _Q = _slicedToArray(Q, 4),
	    Q0 = _Q[0],
	    Q1 = _Q[1],
	    Q2 = _Q[2],
	    Q3 = _Q[3];

	var _calcPointAndNeighbor = calcPointAndNeighbor(P, Q, 0),
	    pP0 = _calcPointAndNeighbor.pp,
	    tPQ0 = _calcPointAndNeighbor.t,
	    pPQ0 = _calcPointAndNeighbor.p,
	    dPQ0 = _calcPointAndNeighbor.d;

	var _calcPointAndNeighbor2 = calcPointAndNeighbor(P, Q, 1),
	    pP1 = _calcPointAndNeighbor2.pp,
	    tPQ1 = _calcPointAndNeighbor2.t,
	    pPQ1 = _calcPointAndNeighbor2.p,
	    dPQ1 = _calcPointAndNeighbor2.d;

	var _calcPointAndNeighbor3 = calcPointAndNeighbor(Q, P, 0),
	    pQ0 = _calcPointAndNeighbor3.pp,
	    tQP0 = _calcPointAndNeighbor3.t,
	    pQP0 = _calcPointAndNeighbor3.p,
	    dQP0 = _calcPointAndNeighbor3.d;

	var _calcPointAndNeighbor4 = calcPointAndNeighbor(Q, P, 1),
	    pQ1 = _calcPointAndNeighbor4.pp,
	    tQP1 = _calcPointAndNeighbor4.t,
	    pQP1 = _calcPointAndNeighbor4.p,
	    dQP1 = _calcPointAndNeighbor4.d;

	// Check for start and end points coincident.


	var tStartQ = 0;
	var tEndQ = 1;
	var tStartP = 0;
	var tEndP = 1;

	var count = 0;
	if (dPQ0 <= δ) {
		tStartQ = tPQ0;count++;
	}
	if (dPQ1 <= δ) {
		tEndQ = tPQ1;count++;
	}
	if (dQP0 <= δ) {
		tStartP = tQP0;count++;
	}
	if (dQP1 <= δ) {
		tEndP = tQP1;count++;
	}

	// At least 2 endpoints must be coincident.
	if (count < 2) {
		return undefined;
	}

	if (tStartP > tEndP) {
		var _ref = [tEndP, tStartP];
		tStartP = _ref[0];
		tEndP = _ref[1];
	}
	if (tStartQ > tEndQ) {
		var _ref2 = [tEndQ, tStartQ];
		tStartQ = _ref2[0];
		tEndQ = _ref2[1];
	}

	var tSpanP = tEndP - tStartP;
	var tSpanQ = tEndQ - tStartQ;

	// We must check at least 8 additional points to ensure entire curve
	// is coincident, otherwise we may simply have found intersection 
	// points.
	// TODO - Change so that we cut the curves to be about equal and check the
	// other two control points for closeness.
	var res = true;
	for (var i = 1; i < 10; i++) {
		var t = tStartP + tSpanP * (i / 10);

		var _calcPointAndNeighbor5 = calcPointAndNeighbor(P, Q, t),
		    pp = _calcPointAndNeighbor5.pp,
		    tt = _calcPointAndNeighbor5.t,
		    pq = _calcPointAndNeighbor5.p,
		    d = _calcPointAndNeighbor5.d;

		if (d > δ) {
			return undefined;
		}
	}

	return { p: [tStartP, tEndP], q: [tStartQ, tEndQ] };

	function calcPointAndNeighbor(P, Q, t) {
		// TODO - must also check crossing of normals - for if two curves open
		// at endpoints and stop essentially at same point.
		var pp1 = evaluate(P)(t);
		var normalVector = normal(P)(0);
		var pp2 = Vector.translate(pp1, normalVector);
		var ts = lineIntersection(Q, [pp1, pp2]);

		var bestT = undefined;
		var bestP = undefined;
		var bestD = Number.POSITIVE_INFINITY;
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = ts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var _t2 = _step.value;

				var p = evaluate(Q)(_t2);
				var _d = Vector.distanceBetween(p, pp1);
				if (_d < bestD) {
					bestT = _t2;
					bestP = p;
					bestD = _d;
				}
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}

		return { pp: pp1, t: bestT, p: bestP, d: bestD };
	}
}

/**
 * <p>
 * Robust, extremely accurate and extremely fast (cubically convergent in 
 * general with fast iteration steps) algorithm that returns the intersections 
 * between two cubic beziers.
 * </p>
 * <p>
 * At stretches where the two curves run extremely close to (or on top of) each 
 * other and curve the same direction an interval is returned instead of a 
 * point.
 * </p>
 * <p>
 * The algorithm is based on a <a href="http://scholarsarchive.byu.edu/cgi/viewcontent.cgi?article=2206&context=etd">paper</a>
 * that finds the intersection of a fat line and a so-called geometric interval
 * making it faster and more accurate than the standard fat-line intersection
 * algorithm. The algorithm has been modified to prevent run-away recursion
 * by checking for coincident pieces at subdivision steps.
 * </p>
 * @param {number[][]} ps1 - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param {number[][]} ps2 - Another cubic bezier
 * @param {number} [δ] - An optional tolerance to within which the t parameter
 * should be calculated - defaults to the minimum value of 24*Number.EPSILON or 
 * approximately 5e-15. Note that it might not make sense to set this to as 
 * large as say 1e-5 since only a single iteration later the maximum accuracy 
 * will be attained and not much speed will be gained anyway. Similarly if δ is 
 * set to 1e-2 only two iterations will be saved. This is due to the algorithm 
 * being cubically convergent (usually converging in about 4 to 8 iterations for 
 * typical intersections).
 * @param {number} [Δ] - A tolerance that indicates how closely a stretch of the 
 * beziers can run together before being considered coincident. Defaults to the
 * minimum possible value of 1e-6 if not specified.
 * @returns {Object[]} An array that contains the t-value pairs at intersection 
 * of the first and second beziers respectively. The array can also contain t
 * range pairs for coincident pieces that can be either used or ignored
 * depending on the application, e.g. the return value might be [[0.1,0.2],
 * [0.3,0.5],[[0.4,0.5],[0.6,0.7]]] that indicates intersection points at t 
 * values of t1=0.1 and t2=0.2 for the first and second bezier respectively as 
 * well as at t1=0.3 and t2=0.5 and finally indicates the curves to be nearly 
 * coincident from t1=0.4 to t1=0.5 for the first bezier and t2=0.6 to t=0.7 for
 * the second bezier.
 */
function bezier3Intersection(ps1, ps2, δ, Δ) {
	var dst = Vector.distanceBetween;
	var sdst = Vector.squaredDistanceBetween;

	// The minimum value Δ can be. If it is too small the algorithm may take too
	// long in cases where the two curves run extremely close to each other for
	// their entire length and curve the same direction.
	var ΔMin = 1e-6;

	// This is an estimate of the relative floating point error during clipping.
	// A bound is given by |δP| = 2n*max_k(|b_k|)η, where n = 3 (cubic), b_k
	// are the control points indexed by k=0,1,2,3 and η is machine epsilon, 
	// i.e. Number.EPSILON. We quadruple the bound to be sure.
	var δMin = 24 * Number.EPSILON;

	// Maximum error - limited to take rounding error into account.
	if (δ === undefined) {
		δ = 0;
	}
	δ = Math.max(δ, δMin);
	if (Δ === undefined) {
		Δ = ΔMin;
	}
	Δ = Math.max(Δ, ΔMin);

	// Intersection t values for both beziers
	var tss = [];
	//let iterations = 0;
	intersection(ps1, ps2, [0, 1], [0, 1], 1, 0);
	//console.log(iterations);
	return tss;

	// Helper function
	function intersection(Q_, P_, qRange, pRange, idx) {
		//iterations++;
		var cidx = idx === 0 ? 1 : 0; // Counter flip-flop index

		// Move intersection toward the origin to prevent serious floating point 
		// issues that are introduced specifically by the getLineEquation 
		// function. This allows us to get a relative error in the final 
		// result usually in the 10 ULPS or less range.

		var _center = center(P_, Q_);

		var _center2 = _slicedToArray(_center, 2);

		P_ = _center2[0];
		Q_ = _center2[1];

		var _Q_ = Q_,
		    _Q_2 = _slicedToArray(_Q_, 4),
		    Q0 = _Q_2[0],
		    Q1 = _Q_2[1],
		    Q2 = _Q_2[2],
		    Q3 = _Q_2[3];

		var _P_ = P_,
		    _P_2 = _slicedToArray(_P_, 4),
		    P0 = _P_2[0],
		    P1 = _P_2[1],
		    P2 = _P_2[2],
		    P3 = _P_2[3];

		// Get the implict line equation for the line from the first to the last
		// control point of Q. This equation gives the distance between any 
		// point and the line.


		var dQ = getDistanceToLineFunction([Q0, Q3]);

		// Calculate the distance from the control points of Q to the line 
		// [Q0,Q3].
		var dQi = function dQi(i) {
			return dQ(Q_[i]);
		};
		var dQs = [1, 2].map(dQi);

		var _dQs = _slicedToArray(dQs, 2),
		    dQ1 = _dQs[0],
		    dQ2 = _dQs[1];

		// Calculate the fat line of Q.


		var C = dQ1 * dQ2 > 0 ? 3 / 4 : 4 / 9;
		var dMin = C * Math.min(0, dQ1, dQ2);
		var dMax = C * Math.max(0, dQ1, dQ2);

		var _geoClip = geoClip(P_, dQ, dMin, dMax),
		    tMin = _geoClip.tMin,
		    tMax = _geoClip.tMax;

		if (tMin === Number.POSITIVE_INFINITY) {
			return; // No intersection
		}

		// The paper calls for a heuristic that if less than 30% will be
		// clipped, rather split the longest curve and find intersections in the
		// two halfs seperately.
		if (tMax - tMin > 0.7) {
			// Some length measure
			var pSpan = pRange[1] - pRange[0];
			var qSpan = qRange[1] - qRange[0];

			if (coincident(P_, Q_) !== undefined) {
				return;
			}

			// Split the curve in half
			if (pSpan <= qSpan) {
				cidx = idx;
				var _ref3 = [Q_, P_];
				P_ = _ref3[0];
				Q_ = _ref3[1];
				var _ref4 = [qRange, pRange];
				pRange = _ref4[0];
				qRange = _ref4[1];
			}

			// Update t range.
			var _span = pRange[1] - pRange[0];

			// 1st half
			var tMinA = pRange[0];
			var tMaxA = tMinA + _span / 2;

			// 2nd half
			var tMinB = tMaxA;
			var tMaxB = pRange[1];

			var A = fromTo(P_)(0, 0.5);
			var B = fromTo(P_)(0.5, 1);
			intersection(A, Q_, [tMinA, tMaxA], qRange, cidx);
			intersection(B, Q_, [tMinB, tMaxB], qRange, cidx);
			return;
		}

		// Update t range.
		var span = pRange[1] - pRange[0];
		var tMin_ = tMin * span + pRange[0];
		var tMax_ = tMax * span + pRange[0];

		// Clip
		P_ = fromTo(P_)(tMin, tMax);

		if (Math.abs(tMax_ - tMin_) < δ) {
			var t1 = (tMax_ + tMin_) / 2;
			var t2 = calcOtherT.apply(undefined, [t1].concat(_toConsumableArray([[ps1, ps2], [ps2, ps1]][idx])));
			if (t2 === undefined) {
				return undefined;
			}
			tss.push([[t2, t1], [t1, t2]][idx]);
			return;
		}

		// Swap Q and P and iterate.
		intersection(P_, Q_, [tMin_, tMax_], qRange, cidx);
	}

	function geoClip(P, dQ, dMin, dMax) {
		var dPi = function dPi(i) {
			return dQ(P[i]);
		};
		var dPs = [0, 1, 2, 3].map(dPi);

		var _dPs = _slicedToArray(dPs, 4),
		    dP0 = _dPs[0],
		    dP1 = _dPs[1],
		    dP2 = _dPs[2],
		    dP3 = _dPs[3];

		var hq = toHybridQuadratic(P);
		var dH0 = dQ(hq[0]);
		var dH2 = dQ(hq[2]);
		var dH10 = dQ(hq[1][0]);
		var dH11 = dQ(hq[1][1]);
		var dHmin = Math.min(dH10, dH11);
		var dHmax = Math.max(dH10, dH11);

		var DyMin = [dH0 - 2 * dHmin + dH2, -2 * dH0 + 2 * dHmin, dH0];

		var DyMax = [dH0 - 2 * dHmax + dH2, -2 * dH0 + 2 * dHmax, dH0];

		var errorBound = 2 * Math.max(Poly.hornerErrorBound(DyMin, 1), Poly.hornerErrorBound(DyMax, 1));
		dMin = dMin - errorBound;
		dMax = dMax + errorBound;

		var DyMinMin = DyMin.slice();
		DyMinMin[2] = DyMinMin[2] - dMin;
		var DyMinMax = DyMin.slice();
		DyMinMax[2] = DyMinMax[2] - dMax;

		var DyMaxMin = DyMax.slice();
		DyMaxMin[2] = DyMaxMin[2] - dMin;
		var DyMaxMax = DyMax.slice();
		DyMaxMax[2] = DyMaxMax[2] - dMax;

		var tMin = Number.POSITIVE_INFINITY;
		var tMax = Number.NEGATIVE_INFINITY;

		var rootsMinMin = Poly.allRoots(DyMinMin, 0, 1);
		var rootsMinMax = Poly.allRoots(DyMinMax, 0, 1);
		var rootsMaxMin = Poly.allRoots(DyMaxMin, 0, 1);
		var rootsMaxMax = Poly.allRoots(DyMaxMax, 0, 1);
		tMin = Math.min.apply(Math, _toConsumableArray(rootsMinMin).concat(_toConsumableArray(rootsMinMax), _toConsumableArray(rootsMaxMin), _toConsumableArray(rootsMaxMax)));
		tMax = Math.max.apply(Math, _toConsumableArray(rootsMinMin).concat(_toConsumableArray(rootsMinMax), _toConsumableArray(rootsMaxMin), _toConsumableArray(rootsMaxMax)));

		if (dH0 >= dMin && dH0 <= dMax) {
			tMin = 0;
		}
		if (dH2 >= dMin && dH2 <= dMax) {
			tMax = 1;
		}

		if (tMin < 0) {
			tMin = 0;
		}
		if (tMax > 1) {
			tMax = 1;
		}

		return { tMin: tMin, tMax: tMax };
	}

	/**
  * Return the given two beziers but translated such that the shorter (by
  * some length measure) is closer to the origin.
  * @ignore
  * @param {number[][]} P 
  * @param {number[][]} Q 
  */
	function center(P, Q) {
		var _P2 = P,
		    _P3 = _slicedToArray(_P2, 4),
		    P0 = _P3[0],
		    P1 = _P3[1],
		    P2 = _P3[2],
		    P3 = _P3[3];

		var _Q2 = Q,
		    _Q3 = _slicedToArray(_Q2, 4),
		    Q0 = _Q3[0],
		    Q1 = _Q3[1],
		    Q2 = _Q3[2],
		    Q3 = _Q3[3];

		var lengthP = sdst(P0, P1) + sdst(P1, P2) + sdst(P2, P3);
		var lengthQ = sdst(Q0, Q1) + sdst(Q1, Q2) + sdst(Q2, Q3);

		var moveX = void 0;
		var moveY = void 0;
		if (lengthQ < lengthP) {
			moveX = (Q0[0] + Q1[0] + Q2[0] + Q3[0]) / 4;
			moveY = (Q0[1] + Q1[1] + Q2[1] + Q3[1]) / 4;
		} else {
			moveX = (P0[0] + P1[0] + P2[0] + P3[0]) / 4;
			moveY = (P0[1] + P1[1] + P2[1] + P3[1]) / 4;
		}
		P = P.map(function (x) {
			return [x[0] - moveX, x[1] - moveY];
		});
		Q = Q.map(function (x) {
			return [x[0] - moveX, x[1] - moveY];
		});

		return [P, Q];
	}

	/**
  * Calculates the t-value of the closest point on Q to P(t).
  * @ignore
  * @param {number}
  * @param {number[][]} Q 
  * @param {number[][]} P 
  */
	function calcOtherT(t, P, Q) {
		var pp = evaluate(P)(t);

		var _pp = _slicedToArray(pp, 2),
		    x = _pp[0],
		    y = _pp[1];

		var tqsh = tsAtY(Q, y);
		var tqsv = tsAtX(Q, x);
		if (!tqsh.length && !tqsv.length) {
			return undefined;
		}

		var tqs = [].concat(tqsh, tqsv);

		var bestT = undefined;
		var bestD = Number.POSITIVE_INFINITY;
		var _iteratorNormalCompletion2 = true;
		var _didIteratorError2 = false;
		var _iteratorError2 = undefined;

		try {
			for (var _iterator2 = tqs[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
				var tq = _step2.value;

				var pq = evaluate(Q)(tq);
				var d = sdst(pp, pq);
				if (d < bestD) {
					bestD = d;
					bestT = tq;
				}
			}
		} catch (err) {
			_didIteratorError2 = true;
			_iteratorError2 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion2 && _iterator2.return) {
					_iterator2.return();
				}
			} finally {
				if (_didIteratorError2) {
					throw _iteratorError2;
				}
			}
		}

		return bestT;
	}
}

/**
 * Get the implicit line equation from two 2d points in the form f(x,y) ax + by + c = 0
 * returned as the array [a,b,c].
 * @ignore
 * @param {number[][]} l - A line given by two points, e.g. [[2,0],[3,3]]
 * @returns {number[]}
 */
function getLineEquation(l) {
	var _l3 = _slicedToArray(l, 2),
	    _l3$ = _slicedToArray(_l3[0], 2),
	    x1 = _l3$[0],
	    y1 = _l3$[1],
	    _l3$2 = _slicedToArray(_l3[1], 2),
	    x2 = _l3$2[0],
	    y2 = _l3$2[1];

	var a = y1 - y2;
	var b = x2 - x1;
	var c = x1 * y2 - x2 * y1;

	return [a, b, c];
}

function getDistanceToLineFunction(l) {
	//let [a,b,c] = getNormalizedLineEquation(l);
	var _getLineEquation = getLineEquation(l),
	    _getLineEquation2 = _slicedToArray(_getLineEquation, 3),
	    a = _getLineEquation2[0],
	    b = _getLineEquation2[1],
	    c = _getLineEquation2[2];

	return function (p) {
		return a * p[0] + b * p[1] + c;
	};
}

/**
 * Get the implicit line equation from two 2d points in the form f(x,y) ax + by + c = 0
 * where a^2 + b^2 = 1 returned as the array [a,b,c].
 * @param {number[][]} l - A line given by two points, e.g. [[2,0],[3,3]]
 * @returns {number[]}
 * @example
 * getNormalizedLineEquation([[1,0],[5,3]]); //=> [-0.6, 0.8, 0.6]
 */
function getNormalizedLineEquation(l) {
	var _l4 = _slicedToArray(l, 2),
	    _l4$ = _slicedToArray(_l4[0], 2),
	    x1 = _l4$[0],
	    y1 = _l4$[1],
	    _l4$2 = _slicedToArray(_l4[1], 2),
	    x2 = _l4$2[0],
	    y2 = _l4$2[1];

	var a = y1 - y2;
	var b = x2 - x1;
	var c = x1 * y2 - x2 * y1;

	var norm = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

	// Normalize it
	a = a / norm;
	b = b / norm;
	c = c / norm;

	return [a, b, c];
}

/**
 * Returns the given points (e.g. bezier) in reverse order.
 * @param {number[][]} ps
 * @returns {number[][]}
 */
function reverse(ps) {
	return ps.slice().reverse();
}

/**
 * <p>
 * Purely functional cubic bezier library, including robust 
 * cubic-cubic bezier intersection.
 * </p>
 * <p> 
 * A cubic bezier is represented as an array of points, i.e. 
 * [p0, p1, p2, p3] where each point is an ordered pair, e.g. 
 * [[0,0],[1,1],[2,1],[3,0]].
 * </p>
 */
var Bezier3 = {
	rotate: rotate,
	getX: getX,
	getY: getY,
	getDx: getDx,
	getDy: getDy,
	getDdx: getDdx,
	getDdy: getDdy,
	getDddx: getDddx,
	getDddy: getDddy,
	getBounds: getBounds,
	bezier3Intersection: bezier3Intersection,
	lineIntersection: lineIntersection,
	tsAtX: tsAtX,
	tsAtY: tsAtY,
	getBoundingHull: getBoundingHull,
	fromLine: fromLine,
	translate: translate,
	evaluate: evaluate,
	κ: κ,
	dκMod: dκMod,
	curvature: curvature,
	tangent: tangent,
	normal: normal,
	totalCurvature: totalCurvature,
	totalAbsoluteCurvature: totalAbsoluteCurvature,
	length: length,
	getTAtLength: getTAtLength,
	evaluateX: evaluateX,
	evaluateY: evaluateY,
	evaluateDx: evaluateDx,
	evaluateDy: evaluateDy,
	evaluateDdx: evaluateDdx,
	evaluateDdy: evaluateDdy,
	evaluateDddx: evaluateDddx,
	evaluateDddy: evaluateDddy,
	getBoundingBoxTight: getBoundingBoxTight,
	getBoundingBox: getBoundingBox,
	fromTo: fromTo,
	splitAt: splitAt,
	scale: scale,
	toCubic: toCubic,
	toQuadratic: toQuadratic,
	toHybridQuadratic: toHybridQuadratic,
	evaluateHybridQuadratic: evaluateHybridQuadratic,
	evaluateQuadratic: evaluateQuadratic,
	evaluateLinear: evaluateLinear,
	coincident: coincident,
	from0ToT: from0ToT,
	fromTTo1: fromTTo1,
	clone: clone,
	reverse: reverse
};

module.exports = Bezier3;

},{"flo-gauss-quadrature":2,"flo-graham-scan":3,"flo-memoize":4,"flo-poly":5,"flo-vector2d":6}],2:[function(_dereq_,module,exports){
'use strict';

// TODO A future improvement can be to use the Gauss–Kronrod rules
// to estimate the error and thus choose a number of constants based
// on the error.
// TODO In future, the constants can be calculated and cached so we can
// chooce any value for the order.


/** 
 * <p>
 * Integrates the given function using the Gaussian Quadrature method.
 * </p>
 * <p> 
 * See https://en.wikipedia.org/wiki/Gaussian_quadrature
 * </p>
 * <p>
 * See http://pomax.github.io/bezierinfo/#arclength
 * </p>
 * 
 * @param {function} f - The univariate function to be integrated
 * @param {number[]} interval - The integration interval
 * @param {number} order - Can be 2, 4, 8, or 16. Higher values give 
 * more accurate results but is slower - defaults to 16.
 */

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function gaussQuadrature(f, interval, order) {
	order = order === undefined ? 16 : order;
	if (interval[0] === interval[1]) {
		return 0;
	}

	var _GAUSS_CONSTANTS$orde = GAUSS_CONSTANTS[order],
	    weights = _GAUSS_CONSTANTS$orde.weights,
	    abscissas = _GAUSS_CONSTANTS$orde.abscissas;

	var _interval = _slicedToArray(interval, 2),
	    a = _interval[0],
	    b = _interval[1];

	var result = 0;
	var m1 = (b - a) / 2;
	var m2 = (b + a) / 2;
	for (var i = 0; i <= order - 1; i++) {
		result += weights[i] * f(m1 * abscissas[i] + m2);
	}

	return m1 * result;
}

// The Gaussian Legendre Quadrature method constants. 
var GAUSS_CONSTANTS = {
	2: {
		weights: [1, 1],
		abscissas: [-0.5773502691896257, 0.5773502691896257]
	},
	4: {
		weights: [0.6521451548625461, 0.6521451548625461, 0.3478548451374538, 0.3478548451374538],
		abscissas: [-0.3399810435848563, 0.3399810435848563, -0.8611363115940526, 0.8611363115940526]
	},
	8: {
		weights: [0.3626837833783620, 0.3626837833783620, 0.3137066458778873, 0.3137066458778873, 0.2223810344533745, 0.2223810344533745, 0.1012285362903763, 0.1012285362903763],
		abscissas: [-0.1834346424956498, 0.1834346424956498, -0.5255324099163290, 0.5255324099163290, -0.7966664774136267, 0.7966664774136267, -0.9602898564975363, 0.9602898564975363]
	},
	// Taken from http://keisan.casio.com/exec/system/1330940731
	16: {
		abscissas: [-0.989400934991649932596, -0.944575023073232576078, -0.86563120238783174388, -0.7554044083550030338951, -0.6178762444026437484467, -0.4580167776572273863424, -0.28160355077925891323, -0.0950125098376374401853, 0.0950125098376374401853, 0.28160355077925891323, 0.4580167776572273863424, 0.617876244402643748447, 0.755404408355003033895, 0.8656312023878317438805, 0.944575023073232576078, 0.989400934991649932596],
		weights: [0.0271524594117540948518, 0.062253523938647892863, 0.0951585116824927848099, 0.1246289712555338720525, 0.1495959888165767320815, 0.169156519395002538189, 0.182603415044923588867, 0.189450610455068496285, 0.1894506104550684962854, 0.182603415044923588867, 0.1691565193950025381893, 0.149595988816576732081, 0.124628971255533872053, 0.095158511682492784809, 0.062253523938647892863, 0.027152459411754094852]
	}
};

module.exports = gaussQuadrature;

},{}],3:[function(_dereq_,module,exports){
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var Vector = _dereq_('flo-vector2d');

var DELTA = 1e-10;

/**
 * Performs a functional stable sort on the given array and 
 * returns the newly sorted array.
 * @ignore
 */
function stableSort(arr, f) {
	var indxArray = [];
	for (var i = 0; i < arr.length; i++) {
		indxArray.push(i);
	}

	indxArray.sort(function (a, b) {
		var res = f(arr[a], arr[b]);

		if (res !== 0) {
			return res;
		}

		return a - b;
	});

	var sorted = [];
	for (var _i = 0; _i < arr.length; _i++) {
		sorted.push(arr[indxArray[_i]]);
	}

	return sorted;
}

/**
 * In-place swap two elements in the given array.
 * @ignore
 */
function swap(arr, a, b) {
	if (a === b) {
		return;
	}

	var temp = arr[a];
	arr[a] = arr[b];
	arr[b] = temp;
}

/**
 * @ignore
 */
function getSmallestIndxYThenX(ps) {
	var smallest = [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY];
	var smallestI = void 0;
	for (var i = 0; i < ps.length; i++) {
		var y = ps[i][1];
		if (y < smallest[1] || y === smallest[1] && ps[i][0] < smallest[0]) {
			smallestI = i;
			smallest = ps[i];
		}
	}

	return smallestI;
}

/** 
 * <p>
 * Finds the convex hull of the given set of 2d points using the   
 * Graham Scan algorithm and returns the hull as an array of points. 
 * </p>
 * <p>
 * See https://en.wikipedia.org/wiki/Graham_scan
 * </p>
 * @param {number[][]} ps_ - A set of points
 * @param {boolean} includeAllBoundaryPoints - Set this to true to if all boundary points
 * should be returned, even redundant ones - defaults to false
 * @param {number} delta - Tolerance at which three points are considered collinear -
 * defaults to 1e-10
 * @returns {number[][]}
 */
function grahamScan(ps_, includeAllBoundaryPoints, delta) {
	includeAllBoundaryPoints = !!includeAllBoundaryPoints;
	delta = delta === undefined ? DELTA : delta;

	function fail(p1, p2, p3) {
		var res = Vector.ccw(p1, p2, p3, delta);
		if (includeAllBoundaryPoints) {
			return res < 0;
		}
		return res <= 0;
	}

	var ps = ps_.slice();
	var n = ps.length;

	var idx = getSmallestIndxYThenX(ps);

	var _ps$splice = ps.splice(idx, 1),
	    _ps$splice2 = _slicedToArray(_ps$splice, 1),
	    p = _ps$splice2[0];

	ps = stableSort(ps, function (a, b) {
		var res = Vector.cross(Vector.fromTo(p, b), Vector.fromTo(p, a));
		res = Math.abs(res) < delta ? 0 : res;
		if (res !== 0) {
			return res;
		}

		res = a[1] - b[1];
		res = Math.abs(res) < delta ? 0 : res;
		if (res !== 0) {
			return res;
		}

		return a[0] - b[0];
	});

	ps.unshift(p);

	var m = 1;
	for (var i = 2; i < n; i++) {
		while (fail(ps[m - 1], ps[m], ps[i])) {
			if (m > 1) {
				m -= 1;
				continue;
			} else if (i === n - 1) {
				m -= 1;
				break;
			} else {
				i += 1;
			}
		}

		m += 1;
		swap(ps, m, i);
	}

	return ps.slice(0, m + 1);
}

module.exports = grahamScan;

},{"flo-vector2d":6}],4:[function(_dereq_,module,exports){
'use strict';

/**
 * Memoization functions
 */

var Memoize = { m1: m1 };

var SUPPORTED = typeof WeakMap === 'function';

/**
 * Memoize the given function. The function must have an arity of 1.
 */
function m1(f) {
	if (!SUPPORTED) {
		return f;
	}

	var results = new WeakMap();

	return function (param1) {
		var result = results.get(param1);
		if (result !== undefined) {
			//console.log('cache hit');
			return result;
		}
		//console.log('cache miss');

		result = f(param1);
		results.set(param1, result);

		return result;
	};
}

module.exports = Memoize;

},{}],5:[function(_dereq_,module,exports){
(function (global){
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.FloPoly = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof _dereq_=="function"&&_dereq_;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof _dereq_=="function"&&_dereq_;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';

var coreOperators = _dereq_('./core-operators.js');
var rootOperators = _dereq_('./root-operators.js');
var rootBounds = _dereq_('./root-bounds.js');

var brent = rootOperators.brent,
    quadraticRoots = rootOperators.quadraticRoots;
var clip0 = coreOperators.clip0,
    evaluate = coreOperators.evaluate,
    differentiate = coreOperators.differentiate,
    toCasStr = coreOperators.toCasStr;
var rootMagnitudeUpperBound_fujiwara = rootBounds.rootMagnitudeUpperBound_fujiwara,
    positiveRootUpperBound_LMQ = rootBounds.positiveRootUpperBound_LMQ,
    positiveRootLowerBound_LMQ = rootBounds.positiveRootLowerBound_LMQ,
    negativeRootUpperBound_LMQ = rootBounds.negativeRootUpperBound_LMQ,
    negativeRootLowerBound_LMQ = rootBounds.negativeRootLowerBound_LMQ;


var INF = Number.POSITIVE_INFINITY;

/**
 * <p>Finds a near optimal approximation to the real roots (or those 
 * within a range) of the input polynomial.
 * </p>
 * <p>
 * Only multiple roots of even order that is very close together may be 
 * missed. (This is rarely a problem in practice - in a geometrical 
 * application, for instance, this may mean two objects are barely 
 * touching and returning either, all, or none of the repeated even 
 * roots should not break the algorithm). 
 * </p>
 * 
 * @alias allRoots
 * @param {number[]} p - The polynomial
 * @param {number} a - Lower limit of root values that should be 
 * returned - defaults to -∞
 * @param {number} b - Upper limit of root values that should be 
 * returned - defaults to +∞
 * @returns {number[]} The found roots.
 * @impl_notes
 * @example
 * FloPoly.allRoots([1, -10, 35, -50, 24]); //=> [1, 2.0000000000000036, 3.0000000000000067, 4] 
 */
function allRootsRecursive(p, a, b) {
	p = clip0(p);
	a = a === undefined ? -INF : a;
	b = b === undefined ? +INF : b;

	var d = p.length - 1;
	var rangeFilter = inRange(a, b);

	if (d === 2) {
		return quadraticRoots(p).filter(rangeFilter);
		// Investigate if any numerically stable algorithm could be as fast
		// as this algorithm (i.e by finding cubic roots within quadratic
		// root demarcated intervals via Brent's method. The cubicRoots 
		// algoritm below has been removed since it was numerically 
		// unstable.
		/*} else if (d === 3) {
  	return cubicRoots(p)
  		.filter(rangeFilter)
  		.sort((a,b) => a-b)
  } else if (d > 3) {*/
	} else if (d > 2) {
		// TODO The root bounding function below might have an impact on 
		// performance - it would probably be better to use 
		// positiveRootUpperBound_LMQ or (possibly) even better, the 
		// linear version of it (see paper of Viglas, Akritas and 
		// Strzebonski) and re-calculate bounds on every iteration.
		var lowerBound = void 0;
		var upperBound = void 0;
		if (a === -INF || b === +INF) {
			//let magnitudeBound = rootMagnitudeUpperBound_fujiwara(p);
			//lowerBound = a === -INF ? -magnitudeBound : a;
			//upperBound = b === +INF ? +magnitudeBound : b;

			if (a === -INF) {
				lowerBound = negativeRootLowerBound_LMQ(p);
			} else {
				lowerBound = a;
			}
			if (b === +INF) {
				upperBound = positiveRootUpperBound_LMQ(p);
			} else {
				upperBound = b;
			}
		} else {
			lowerBound = a;
			upperBound = b;
		}

		// If the roots of the differentiated polynomial is out of range 
		// then the roots of the polynomial itself will also be out of 
		// range.
		var dp = differentiate(p);
		var roots = allRootsRecursive(dp, lowerBound, upperBound).filter(rangeFilter);

		if (roots[0] !== lowerBound) {
			// For code coverage to cover the 'else' case we would need
			// to find a case where the lower bound actually matches the
			// root which would be very rare - needs further 
			// investigation.

			// Not an actual root.
			roots.unshift(lowerBound);
		}
		if (roots[roots.length - 1] !== upperBound) {
			// Not an actual root.
			roots.push(upperBound);
		}
		return rootsWithin(p, roots);
	} else if (d === 1) {
		// Less likely so put near bottom (micro optimization)
		return [-p[1] / p[0]].filter(rangeFilter);
	} else if (d === 0) {
		return []; // y = c -> no roots	
	}

	// Least likely so put at bottom (micro optimization)
	// d === -1
	// y = 0 -> infinite number of roots
	return [];
}

/**
 * Returns a function that returns true if x is in the range [a,b].
 *  
 * @ignore
 * @param {number} a
 * @param {number} b
 * @returns {function}
 */
function inRange(a, b) {
	return function (x) {
		return x >= a && x <= b;
	};
}

/**
 * Finds all roots of the given polynomial within the given intervals.
 *  
 * @ignore
 * @param {number[]} p
 * @param {number[]} intervals
 * @returns {number[]} The found roots.
 */
function rootsWithin(p, intervals) {

	var roots = [];
	var peval = evaluate(p);

	var prevRoot = void 0;
	var a = intervals[0];
	for (var i = 1; i < intervals.length; i++) {
		var root = void 0;
		var b = intervals[i];

		var evA = peval(a);
		var evB = peval(b);

		var k = evA * evB;

		if (k === 0) {
			if (evA === 0) {
				root = a;
			} else if (evB === 0 && i === intervals.length - 1) {
				root = b;
			}
		} else if (evA * evB < 0) {
			root = brent(peval, a, b);
		}

		// Add root if it exists and suppress exact duplicates
		if (root !== undefined && root !== prevRoot) {
			roots.push(root);
			prevRoot = root;
		}

		a = b;
	}

	return roots;
}

module.exports = allRootsRecursive;

},{"./core-operators.js":2,"./root-bounds.js":7,"./root-operators.js":8}],2:[function(_dereq_,module,exports){
'use strict';

var coreOperators = {
	equal: equal,
	add: add,
	subtract: subtract,
	multiplyByConst: multiplyByConst,
	negate: negate,
	differentiate: differentiate,
	multiply: multiply,
	degree: degree,
	evaluate: evaluate,
	evaluateAt0: evaluateAt0,
	signChanges: signChanges,
	invert: invert,
	changeVariables: changeVariables,
	reflectAboutYAxis: reflectAboutYAxis,
	sturmChain: sturmChain,
	clip: clip,
	clip0: clip0,
	deflate: deflate,
	maxCoefficient: maxCoefficient,
	toCasStr: toCasStr

	/**
  * Returns true if two polynomials are exactly equal by comparing 
  * coefficients.
  * 
  * @param {number[]} p1 - A polynomial
  * @param {number[]} p2 - Another polynomial 
  * @returns {boolean} True if exactly equal, false otherwise.
  * @example
  * FloPoly.equal([1,2,3,4], [1,2,3,4]);   //=> true
  * FloPoly.equal([1,2,3,4], [1,2,3,4,5]); //=> false
  */
};function equal(p1, p2) {
	if (p1.length !== p2.length) {
		return false;
	}
	for (var i = 0; i < p1.length; i++) {
		if (p1[i] !== p2[i]) {
			return false;
		}
	}
	return true;
}

/**
 * Adds two polynomials.
 * 
 * @param {number[]} p1 - The first polynomial
 * @param {number[]} p2 - The second polynomial
 * @returns {number[]} p1 + p2.
 * @example
 * FloPoly.add([1,2,3],[3,4]); //=> [1,5,7]
 */
function add(p1, p2) {
	// Initialize result array  
	var d1 = p1.length - 1;
	var d2 = p2.length - 1;
	var Δd = d1 - d2;

	var Δd1 = 0;
	var Δd2 = 0;
	if (Δd > 0) {
		Δd2 = -Δd;
	} else if (Δd < 0) {
		Δd1 = +Δd;
	}

	var d = Math.max(d1, d2);

	// Add coefficients
	var result = [];
	for (var i = 0; i < d + 1; i++) {
		var c1 = p1[i + Δd1];
		var c2 = p2[i + Δd2];
		result.push((c1 || 0) + (c2 || 0));
	}

	// Ensure the result is a valid polynomial representation
	return clip0(result);
}

/** 
 * Subtracts the second polynomial from first.
 * 
 * @param {number[]} p1 - The polynomial from which will be subtracted
 * @param {number[]} p2 - The polynomial that will be subtracted
 * @returns {number[]} p1 - p2
 * @example
 * FloPoly.subtract([2,3],[4,4]); //=> [-2, -1]
 */
function subtract(p1, p2) {
	// Initialize result array  
	var d1 = p1.length - 1;
	var d2 = p2.length - 1;
	var Δd = d1 - d2;

	var Δd1 = 0;
	var Δd2 = 0;
	if (Δd > 0) {
		Δd2 = -Δd;
	} else if (Δd < 0) {
		Δd1 = +Δd;
	}

	var d = Math.max(d1, d2);

	// Add coefficients
	var result = [];
	for (var i = 0; i < d + 1; i++) {
		var c1 = p1[i + Δd1];
		var c2 = p2[i + Δd2];
		result.push((c1 || 0) - (c2 || 0));
	}

	// Ensure the result is a valid polynomial representation
	return clip0(result);
}

/**
 * Negate the given polynomial (p -> -p).  
 * 
 * @param {number[]} p - The polynomial
 * @returns {number[]} -p
 * @example
 * FloPoly.negate([0.1, -0.2]); //=> [-0.1, 0.2]
 */
function negate(p) {
	return multiplyByConst(-1, p);
}

/**  
 * Differentiates the given polynomial.
 * 
 * @param {number[]} p - The polynomial
 * @returns {number[]} D(p)
 * @example
 * FloPoly.differentiate([5, 4, 3, 2, 1]); //=> [20, 12, 6, 2]
 */
function differentiate(p) {

	var result = [];

	var d = p.length - 1;
	for (var i = 0; i < d; i++) {
		result.push((d - i) * p[i]);
	}

	return result;
}

/**
 * <p> 
 * Multiplies the two given polynomials and returns the result. 
 * </p>
 * <p>
 * See <a href="https://en.wikipedia.org/wiki/Polynomial_arithmetic">polynomial arithmetic</a>
 * </p>
 * <p>
 * See <a href="https://en.wikipedia.org/wiki/Discrete_Fourier_transform#Polynomial_multiplication">polynomial multiplication</a>
 * </p>
 * <p>
 * See <a herf="http://web.cs.iastate.edu/~cs577/handouts/polymultiply.pdf">polynomial multiplication (pdf)</a>
 * </p>
 * @param {number[]} p1 - The one polynomial.
 * @param {number[]} p2 - The other polynomial.
 * @returns {number[]} p1 * p2
 * @example
 * FloPoly.multiply([1,2,3], [2,5,3,5]); //=> [2, 9, 19, 26, 19, 15]
 */
// TODO Currently using O(n^2) algorithm - possibly change to a faster  
// FFT algorithm for high degree polynomials? No, we are interested in
// polynomials of degree 20 or lower.
function multiply(p1, p2) {
	var d1 = p1.length - 1;
	var d2 = p2.length - 1;
	var d = d1 + d2;

	var result = new Array(d + 1).fill(0);
	for (var i = 0; i < d1 + 1; i++) {
		for (var j = 0; j < d2 + 1; j++) {
			result[d - (i + j)] += p1[d1 - i] * p2[d2 - j];
		}
	}

	return clip0(result);
}

/** 
 * Multiplies 2 polynomials by a constant.
 * 
 * @param {number} c - The constant
 * @param {number[]} p - The polynomial
 * @returns {number[]} c*p
 * @example 
 * FloPoly.multiplyByConst(0.25, [3,2,1]); //=> [0.75, 0.5, 0.25]  
 */
function multiplyByConst(c, p) {
	if (c === 0) {
		return [];
	}

	var d = p.length - 1;
	var result = [];
	for (var i = 0; i < d + 1; i++) {
		result.push(c * p[i]);
	}

	// We have to clip due to possible floating point underflow
	return clip0(result);
}

/** 
 * Returns the degree of the polynomial.
 * 
 * @param {number[]} p - The polynomial
 * @returns {number} 
 * @example 
 * FloPoly.degree([9,8,7,6,5,4,3,2,1]); //=> 9
 */
function degree(p) {
	return p.length - 1;
}

/** 
 * Evaluates a univariate polynomial using Horner's method. This 
 * function is curried (see examples below).  
 * 
 * @see https://en.wikipedia.org/wiki/Horner%27s_method
 * @param {number[]} p - The polynomial
 * @param {number} a - The value at which to evaluate the polynomial.
 * @returns {number|function} The result if both parameters are supplied
 * or a function with arity one if only the first parameter is supplied.
 * @example
 * let ev = FloPoly.evaluate([3,2,1]);
 * ev(1); // => 6
 * ev(2); // => 17
 * 		 
 * FloPoly.evaluate([3,2,1], 1); // => 6
 * FloPoly.evaluate([3,2,1], 2); // => 17
 * 
 * FloPoly.evaluate([3,2,1])(1); // => 6
 * FloPoly.evaluate([3,2,1])(2); // => 17
 */
function evaluate(p, a) {
	function evaluate(a) {
		//if p.length === 0 { return 0; }
		var result = p[0];
		for (var i = 1; i < p.length; i++) {
			result = p[i] + result * a;
		}

		return result;
	}

	// Curry the function
	return a === undefined ? evaluate : evaluate(a);
}

/** 
 * Evaluates the given polynomial at 0 - it is much faster than at an 
 * arbitrary point. 
 *  
 * @param {number[]} p - The polynomial
 * @returns {number}
 * @example
 * FloPoly.evaluateAt0([3,2,99]); //=> 99
 */
function evaluateAt0(p) {
	return p[p.length - 1];
};

/** 
 * <p>
 * Returns the number of sign changes in the polynomial coefficents 
 * when ordered in descending order; zeros are ignored.
 * </p>
 * <p>
 * Descartes' rule of signs states (quoted from Wikipedia):
 * "if the terms of a polynomial are ordered by descending variable 
 * exponent, then the number of positive roots of the polynomial is 
 * either equal to the number of sign differences between consecutive 
 * nonzero coefficients, or is less than it by an even number. Multiple 
 * roots of the same value are counted separately."
 * </p>
 * @see https://en.wikipedia.org/wiki/Descartes%27_rule_of_signs
 * 
 * @param {number[]} p - The polynomial
 * @returns {number} The number of sign changes.
 * @example
 * FloPoly.signChanges([1,2,-3,0,0,3,-1]); //=> 3
 */
function signChanges(p) {
	var d = p.length - 1;

	var result = 0;
	var prevSign = Math.sign(p[0]);
	for (var i = 1; i < d + 1; i++) {
		var sign = Math.sign(p[i]);

		if (sign !== prevSign && sign !== 0) {
			result++;
			prevSign = sign;
		}
	}

	return result;
}

/**
 * Deflates the given polynomial by removing a factor (x - r), where
 * r is a root of the polynomial.
 * 
 * @param {number[]} p - The polynomial
 * @param {number} root - A pre-calculated root of the polynomial.
 * @returns {number[]} The deflated polynomial.
 * @example
 * // The polynomial x^3 - 5x^2 + 8x - 4 has a root at 1 and a double root at 2 
 * FloPoly.deflate([1, -5, 8, -4], 2); //=> [1, -3, 2] 
 * FloPoly.deflate([1, -3, 2], 2);     //=> [1,-1] 
 * FloPoly.deflate([1, -1], 1);        //=> [1]
 */
function deflate(p, root) {
	var d = p.length - 1;
	var bs = [p[0]];
	for (var i = 1; i < d; i++) {
		bs.push(p[i] + root * bs[i - 1]);
	}

	return bs;
}

/**
 * Inverts the given polynomial by reversing the order of the 
 * coefficients.
 * 
 * @param {number[]} p - The polynomial
 * @returns {number} p(x) -> x^deg(p) * p(1/x)
 * @example
 * FloPoly.invert([1,2,3,4]); // => [4,3,2,1]
 * FloPoly.invert([3,2,-5]);  // => [-5,2,3]
 */
function invert(p) {
	return p.slice().reverse();
}

/**
 * <p> 
 * Performs a change of variables of the form: p(x) <- p(ax + b).
 * </p>
 * <p>
 * See <a href="http://stackoverflow.com/questions/141422/how-can-a-transform-a-polynomial-to-another-coordinate-system">this stackoverflow question</a>
 * </p>
 * @param {number[]} p - The polynomial
 * @param {number} a
 * @param {number} b
 * @returns {number[]} The transformed polynomial.
 * @example
 * FloPoly.changeVariables([1,2,7], 3, 4); //=> [9, 30, 31]
 */
function changeVariables(p, a, b) {
	// We let the coefficients of p(ax + b) be denoted by d_i in the 
	// code below. 
	// d_i is calculated as d = T*c, where c are the original 
	// coefficients.

	var d = p.length - 1;

	// Initialize a zero matrix
	var t = [];
	for (var i = 0; i < d + 1; i++) {
		t.push(new Array(d + 1).fill(0));
	}

	// Calculate the triangular matrix T
	t[0][0] = 1;
	for (var j = 1; j <= d; j++) {
		t[0][j] = b * t[0][j - 1];
		for (var _i = 1; _i <= j; _i++) {
			t[_i][j] = b * t[_i][j - 1] + a * t[_i - 1][j - 1];
		}
	}

	// Multiply
	var res = new Array(d + 1).fill(0);
	for (var _i2 = 0; _i2 <= d; _i2++) {
		res[d - _i2] = 0;
		for (var _j = _i2; _j <= d; _j++) {
			var acc = t[_i2][_j] * p[d - _j];
			res[d - _i2] += acc;
		}
	}

	return res;
}

/**
 * Reflects the given polynomial about the Y-axis, i.e. perform the 
 * change of variables: p(x) <- p(-x).
 * 
 * @param {number[]} p - The polynomial to reflect
 * @returns {number[]} The reflected polynomial.
 * @example
 * FloPoly.reflectAboutYAxis([5,4,3,2,1]); //=> [5, -4, 3, -2, 1]
 */
function reflectAboutYAxis(p) {
	var d = p.length - 1;

	var result = p.slice();
	for (var i = 0; i < d + 1; i++) {
		if (i % 2) {
			result[i] = -result[i];
		}
	}

	return result;
}

/** 
 * Generates a sturm chain for the given polynomial.
 * 
 * @see https://en.wikipedia.org/wiki/Sturm%27s_theorem
 * @param {number[]} p - The polynomial
 * @returns {number[][]} The sturm chain of polynomials
 * @example
 * FloPoly.sturmChain([-3,4,2,-2]); //=> [[-3, 4, 2, -2], [-9, 8, 2], [-2.5185185185185186, 1.7037037037037037], [-3.2932525951557086]]
 */
function sturmChain(p) {

	/** 
  * Returns the negative of the remainder when dividing the first 
  * polynomial (the dividend) by the second (the divisor) provided 
  * that deg(p1) - deg(p2) === 1.
  * 
  * @ignore
  * @param {number[]} p1 - The first polynomial (dividend)
  * @param {number[]} p2 - The second polynomial (divisor)
  * @see https://en.wikipedia.org/wiki/Sturm%27s_theorem
  */
	function negRemainder(p1, p2) {
		var d1 = p1.length - 1;
		var d2 = p2.length - 1;
		var d = d1 - d2;

		var a = p1[1] / p1[0] - p2[1] / p2[0];
		var b = p1[0] / p2[0];

		var p3 = multiply(multiplyByConst(b, p2), [1, a]);

		return subtract(p3, p1);
	}

	var m = []; // Sturm chain
	m.push(p);
	m.push(differentiate(p));

	//const δ = 10 * Number.EPSILON;
	var i = 1;
	while (m[i].length - 1 > 0) {
		var pnext = negRemainder(m[i - 1], m[i]);
		//pnext = clip(pnext, δ);
		// If the polynomial degree was not reduced due to roundoff
		// such that the first 1 or more terms are very small.
		while (m[i].length - pnext.length < 1) {
			pnext.shift();
		}
		/*
  if (pnext.length === 0) {
  	break;
  }
  */
		m.push(pnext);

		i++;
	}

	return m;
}

/**
 * If the highest power coefficient is small in the sense that the 
 * highest power term has a negligible contribution (compared to the
 * other terms) at x = 1 then clip() can be called to remove all such 
 * highest terms. A contribution of less than Number.EPSILON of the 
 * highest coefficient will be considered negligible by default.
 * 
 * 
 * @param {number[]} p - The polynomial to be clipped.
 * @param {number} δ - The optional contribution tolerence else 
 *        Number.EPSILON will be used by default.   
 * @returns {number[]} The clipped polynomial.
 * @example
 * FloPoly.clip([1e-18, 1e-10, 1e-5]); //=> [1e-18, 1e-10, 1e-5] 
 * FloPoly.clip([1e-18, 1e-10, 1e-1]); //=> [1e-10, 1e-1]
 */
function clip(p, δ) {
	δ = δ === undefined ? Number.EPSILON : δ;

	var c = maxCoefficient(p);
	if (c === 0) {
		return [];
	}

	if (Math.abs(p[0]) > δ * c) {
		return p;
	}

	var p_ = p.slice(1);
	while (Math.abs(p_[0]) < δ * c) {
		p_ = p_.slice(1);
	}

	return clip(p_, δ);
}

/**
 * If the highest power coefficient is 0 then clip() can be called to 
 * remove all such highest terms so that the array is a valid 
 * presentation of a polynomial.
 * 
 * @param {number[]} p - The polynomial to be clipped.
 * @returns {number[]} The clipped polynomial.
 * @example
 * FloPoly.clip0([1e-18, 1e-10, 1e-1]); //=> [1e-18, 1e-10, 1e-1]
 * FloPoly.clip0([0, 1e-10, 1e-1]); //=> [1e-10, 1e-1]
 */
function clip0(p) {
	return p[0] !== 0 ? p : clip0(p.slice(1));
}

/**
 * Returns the absolute value of the highest coefficient of the 
 * polynomial.
 * 
 * @param p {number[]} p - The polynomial.
 * @returns {number}
 * @example
 * FloPoly.maxCoefficient([-2, 0.1, 0.2]); //=> 2
 */
function maxCoefficient(p) {
	var max = 0;
	for (var i = 0; i < p.length; i++) {
		var c = Math.abs(p[i]);
		if (c > max) {
			max = c;
		}
	}

	return max;
}

/**
 * Returns a string representing the given polynomial that is readable 
 * by a human or a CAS (Computer Algebra System).
 * 
 * @param {number[]} p - The polynomial
 * @returns {string}
 * @example
 * FloPoly.toCasStr([5,4,3,2,1]); //=> "x^4*5 + x^3*4 + x^2*3 + x*2 + 1"
 */
function toCasStr(p) {
	var d = p.length - 1;

	var str = '';
	for (var i = 0; i < d + 1; i++) {
		var cStr = p[i].toString();
		if (i === d) {
			str += cStr;
		} else if (i === d - 1) {
			str += 'x*' + cStr + ' + ';
		} else {
			str += 'x^' + (d - i).toString() + '*' + cStr + ' + ';
		}
	}

	return str;
}

module.exports = coreOperators;

},{}],3:[function(_dereq_,module,exports){
'use strict';

var coreOperators = _dereq_('./core-operators.js');

var errorAnalysis = {
  hornerErrorBound: hornerErrorBound
};

var evaluate = coreOperators.evaluate;

/**
 * <p>
 * Approximate condition number for polynomial evaluation multiplied
 * by the exact value of the polynomial evaluation.
 * </p>
 * <p>
 * See <a href="http://www-pequan.lip6.fr/~jmc/polycopies/Compensation-horner.pdf">Compensated Horner Scheme - paragraph 1.1</a>
 * </p>
 * 
 * @ignore
 * @param {number[]} p - The polynomial
 * @param {number} x - The evaluation point
 * @returns {number} The condition number multiplied exact polynomial 
 * value at x
 */

function conditionNumber(p, x) {
  var d = p.length - 1;
  var res = 0;

  for (var i = 0; i < d; i++) {
    res += Math.abs(p[i] * Math.pow(x, d - i));
  }

  return res;
}

/**
 * <p>
 * Classic rule of thumb approximate error bound when using Horner's 
 * method to evaluate polynomials. 
 * </p>
 * <p>
 * See for instance <a href="http://www-pequan.lip6.fr/~jmc/polycopies/Compensation-horner.pdf">compensated horner evaluation</a>
 * </p>
 * @param p {number[]} - The polynomial
 * @param x {number} - Value at which polynomial is evaluated. 
 * @returns {number} The error bound
 * @example
 * hornerErrorBound([1.1,2.2,-3.3], 1.5); //=> 5.1292303737682235e-15 
 */
function hornerErrorBound(p, x) {
  var δ = Number.EPSILON;

  var d = p.length - 1;
  return 2 * d * δ * conditionNumber(p, x);
}

module.exports = errorAnalysis;

},{"./core-operators.js":2}],4:[function(_dereq_,module,exports){
'use strict';

var coreOperators = _dereq_('./core-operators.js');
var rootOperators = _dereq_('./root-operators.js');
var rootBounds = _dereq_('./root-bounds.js');
//let allRootsVAS       = require('./all-roots-vas.js');
var allRootsRecursive = _dereq_('./all-roots-recursive.js');
var random = _dereq_('./random.js');
var errorAnalysis = _dereq_('./error-analysis.js');
var fromRoots = _dereq_('./from-roots.js');

var multiply = coreOperators.multiply;

/**
* <p>
* Simple & fast practical library functions for functional univariate 
* polynomials over the reals (actually ECMAScript numbers, i.e. double 
* floats).
* </p>
* <p>
* All polinomials are represented as a simple array starting with the 
* highest non-zero power, e.g. 
*   3x^3 + 5x^2 + 7x + 2 -> [3,5,7,2]
* </p>
* @ignore
*/
var FloPoly = Object.assign({}, coreOperators, rootOperators, rootBounds, { random: random }, { fromRoots: fromRoots }, {
		allRoots: allRootsRecursive
		//allRootsVAS,
}, errorAnalysis);

module.exports = exports = FloPoly;

},{"./all-roots-recursive.js":1,"./core-operators.js":2,"./error-analysis.js":3,"./from-roots.js":5,"./random.js":6,"./root-bounds.js":7,"./root-operators.js":8}],5:[function(_dereq_,module,exports){
'use strict';

var _require = _dereq_('./core-operators.js'),
    multiply = _require.multiply;

/**
 * <p>
 * Constructs a polynomial from the given roots by multiplying out the 
 * factors (x - root1)(x - root2)... Note that the resulting polynomial 
 * will not have any complex roots.
 * </p>
 * <p>
 * Mostly provided for testing purposes. Note that the real roots of the 
 * constructed polynomial may not be exactly the same as the roots that
 * the polynomial has been constructed from due to floating-point 
 * round-off.
 * </p>
 * 
 * @param {number[]} roots - The roots
 * @returns {number[]} The constructed polynomial.
 * @example
 * FloPoly.fromRoots([1,2,3,3]); //=> [1, -9, 29, -39, 18]
 * FloPoly.allRoots([1, -9, 29, -39, 18]); //=> [1.0000000000000007, 2.000000000000004]
 * // In the above note the rounding error. Also note the multiple root of 3 that has been missed but as stated previously this does not generally pose a problem for even multiple roots. See the examples below.
 * FloPoly.allRoots([1, -9, 29, -39, 17.99999999999999]); //=> [0.9999999999999973, 2.00000000000002, 2.9999999999999982]
 * FloPoly.allRoots([1, -9, 29, -39, 17.9999999999999]); //=> [0.999999999999975, 2.0000000000000986, 2.9999997898930832, 3.0000002095475775]
 */


function fromRoots(roots) {
  var p = [1];
  for (var i = 0; i < roots.length; i++) {
    p = multiply(p, [1, -roots[i]]);
  }

  return p;
}

module.exports = fromRoots;

},{"./core-operators.js":2}],6:[function(_dereq_,module,exports){
'use strict';

var fromRoots = _dereq_('./from-roots.js');

/**
 * Some seed value for the simple random number generator.
 * @ignore
 */
var SEED = 123456789;

/**
 * The range for the simple random number generator, i.e. the generated
 * numbers will be in [0,RANGE].
 * @ignore
 */
var RANGE = 4294967296;

/**
 * Generates an array of random polynomials with parameters as specified 
 * by flatRoots. The exact same polynomials will be created on each
 * call to this function if the same seed is used - this is by design to 
 * improve testability.
 *   
 * @memberof random
 * @param {number} n - The number of polynomials to generate.
 * @param {number} d - The degree of the polynomials 
 * @param {number} a - The lower bound of the distribution - defaults 
 * to 0
 * @param {number} b - The upper bound of the distribution - defaults 
 * to 1
 * @param {number} seed - A seed value for generating random values (so
 * that the results are reproducable)
 * @param {number} odds - The odds that a root will be doubled (applied
 * recursively so that some roots will be tripled, etc. - defaults to 0
 * @returns {number[][]} The array of random polynomials.
 * @example
 * FloPoly.random.flatRootsArr(2,3,0,10); //=> [[1, -17.27247918024659, 97.33487287168995, -179.34094494147305], [1, -14.934967160224915, 57.624514485645406, -14.513933300587215]]
 * FloPoly.random.flatRootsArr(2,3,0,10); //=> [[1, -17.27247918024659, 97.33487287168995, -179.34094494147305], [1, -14.934967160224915, 57.624514485645406, -14.513933300587215]]
 */
var flatRootsArr = createArrFunction(flatRoots);

/**
 * Generates an array of random polynomials as specified by 
 * flatCoefficients. The exact same polynomials will be created on each
 * call to this function if the same seed is used - this is by design to 
 * improve testability.
 *   
 * @memberof random
 * @param {number} n - The number of polynomials to generate.
 * @param {number} d - The degree of the polynomials 
 * @param {number} a - The lower bound of the distribution - defaults 
 * to 0
 * @param {number} b - The upper bound of the distribution - defaults 
 * to 1
 * @param {number} seed - A seed value for generating random values (so
 * that the results are reproducable)
 * @returns {number[][]} The array of random polynomials.
 * @example
 * FloPoly.random.flatCoefficientsArr(2,3,-2,2); //=> [[0.1749166026711464, -0.20349335670471191, 0.9375684261322021], [1.0617692470550537, -1.8918039798736572, 0.8040215969085693]]
 * FloPoly.random.flatCoefficientsArr(2,3,-2,2); //=> [[0.1749166026711464, -0.20349335670471191, 0.9375684261322021], [1.0617692470550537, -1.8918039798736572, 0.8040215969085693]]
 */
var flatCoefficientsArr = createArrFunction(flatCoefficients);

var random = {
  flatRoots: flatRoots,
  flatRootsArr: flatRootsArr,
  flatCoefficients: flatCoefficients,
  flatCoefficientsArr: flatCoefficientsArr

  /**
   * https://stackoverflow.com/questions/3062746/special-simple-random-number-generator
   * 
   * @ignore
   * @param {number} seed
   * @returns {number} A quasi-random number to be used as the next input 
   * to this function.
   */
};function predictiveRandom(seed) {
  var a = 134775813;

  return (a * seed + 1) % RANGE;
}

/**
 * Generates a random array of numbers picked from a bounded flat 
 * distribution (i.e. a rectangular distribution) with specified odds of 
 * duplication of consecutive values.
 *   
 * @ignore
 * @param {number} n - The number of values to generate.
 * @param {number} a - The lower bound of the distribution - defaults 
 * to 0
 * @param {number} b - The upper bound of the distribution - defaults 
 * to 1
 * @param {number} seed - A seed value for generating random values (so
 * that the results are reproducable)
 * @param {number} odds - The odds that a root will be doubled (applied
 * recursively so that some roots will be tripled, etc. - defaults to 0
 * @returns {number[]} - The random array.
 */
function randomArray(n, a, b, seed, odds) {
  seed = seed === undefined ? SEED : seed;
  odds = odds === undefined ? 0 : odds;

  var vs = [];
  for (var i = 0; i < n; i++) {
    seed = predictiveRandom(seed);
    var v = seed / RANGE * (b - a) + a;
    seed = push(seed, vs, v, odds);
  }
  vs = vs.slice(0, n);

  return { vs: vs, seed: seed };
}

/**
 * Helper function that will add more numbers to the passed array - 
 * modifies the values parameter.
 *
 * @ignore
 * @param {number[]} values - An existing array of values - will be 
 * modified!
 * @param {number} x - The number that will be added (possibly
 * multiple times)
 * @param {number} odds - The odds that the number will be added
 * again (recursively). 
 */
function push(seed, values, x, odds) {
  seed = predictiveRandom(seed);

  values.push(x);
  if (seed / RANGE < odds) {
    seed = push(seed, values, x, odds);
  }

  return seed;
}

/**
 * Generates a random polynomial with roots picked from a bounded flat 
 * distribution (i.e. a rectangular distribution) with specified odds of 
 * duplication of consecutive values. Note that the resulting polynomial
 * won't have any complex roots.
 * 
 * @memberof random
 * @param {number} d - The degree of the polynomials 
 * @param {number} a - The lower bound of the distribution - defaults 
 * to 0
 * @param {number} b - The upper bound of the distribution - defaults 
 * to 1
 * @param {number} seed - A seed value for generating random values (so
 * that the results are reproducable)
 * @param {number} odds - The odds that a root will be doubled (applied
 * recursively so that some roots will be tripled, etc. - defaults to 0
 * @returns {{p: number[], seed: number}} a random polynomial and the
 * last seed value to reuse.
 * @example
 * FloPoly.random.flatRoots(3,0,10); //=> { p: [1, -17.27247918024659, 97.33487287168995, -179.34094494147305], seed: 939629312 }
 */
function flatRoots(d, a, b, seed, odds) {
  a = a === undefined ? 0 : a;
  b = b === undefined ? 1 : b;
  seed = seed === undefined ? SEED : seed;
  odds = odds === undefined ? 0 : odds;

  var randArr = randomArray(d, a, b, seed, odds);
  seed = randArr.seed;

  var p = fromRoots(randArr.vs);

  return { p: p, seed: seed };
}

/**
 * Generates a random polynomial with coefficients picked from a bounded 
 * flat distribution (i.e. a rectangular distribution). 
 * 
 * @memberof random
 * @param {number} d - The degree of the polynomials 
 * @param {number} a - The lower bound of the distribution - defaults 
 * to -1
 * @param {number} b - The upper bound of the distribution - defaults 
 * to 1
 * @param {number} seed - A seed value for generating random values (so
 * that the results are reproducable)
 * @returns {{p: number[], seed: number}} a random polynomial and the
 * last seed value to reuse.
 * @example
 * FloPoly.random.flatCoefficients(3,-5,5); //=> { p: [0.437291506677866, -0.5087333917617798, 2.3439210653305054], seed: 939629312 }
 */
function flatCoefficients(d, a, b, seed) {
  a = a === undefined ? -1 : a;
  b = b === undefined ? +1 : b;
  seed = seed === undefined ? SEED : seed;

  var randArr = randomArray(d, a, b, seed);
  seed = randArr.seed;

  var p = randArr.vs;

  return { p: p, seed: seed };
}

/**
 * Creates a function from the given function with parameters similar
 * to flatRoots but with an extra parameter in the beginning indicating
 * the length of the array generated by the original function.
 * 
 * @ignore
 * @param {function} f
 * @returns {function}
 */
function createArrFunction(f) {
  return function (n, d, a, b, seed, odds) {
    seed = seed === undefined ? SEED : seed;
    var res = [];

    for (var i = 0; i < n; i++) {
      var v = f(d, a, b, seed, odds);
      var p = v.p;
      seed = v.seed;

      res.push(p);
    }

    return res;
  };
}

module.exports = random;

},{"./from-roots.js":5}],7:[function(_dereq_,module,exports){
'use strict';

var coreOperators = _dereq_('./core-operators.js');

var invert = coreOperators.invert,
    negate = coreOperators.negate,
    reflectAboutYAxis = coreOperators.reflectAboutYAxis;


var rootBounds = {
	rootMagnitudeUpperBound_fujiwara: rootMagnitudeUpperBound_fujiwara,
	positiveRootUpperBound_LMQ: positiveRootUpperBound_LMQ,
	positiveRootLowerBound_LMQ: positiveRootLowerBound_LMQ,
	negativeRootUpperBound_LMQ: negativeRootUpperBound_LMQ,
	negativeRootLowerBound_LMQ: negativeRootLowerBound_LMQ,
	rootMagnitudeUpperBound_rouche: rootMagnitudeUpperBound_rouche

	/**
  * Returns the maximum magnitude value within the supplied array of 
  * numbers.
  * @ignore 
  */
};function maxAbs(ns) {
	return Math.max.apply(null, ns.map(function (n) {
		return Math.abs(n);
	}));
}

/**
 * Finds an upper bound on the magnitude (absolute value) of the roots
 * (including complex roots) of the given polynomial using Rouche's 
 * Theorem with k = n. This function is fast but the bound is not tight.
 * 
 * @param p {number[]} p - The polynomial.
 * @returns {number} The bound.
 */
function rootMagnitudeUpperBound_rouche(p) {
	var d = p.length - 1;
	var R = 1 + 1 / p[0] * maxAbs(p.slice(1));
	return R;
}

/**
 * Finds an upper bound on the magnitude (absolute value) of the roots
 * of the given polynomial using the near-optimal Fujiwara bound. Note
 * that the bound includes complex roots. The bound is tight but slow 
 * due to usage of Math.pow().
 * 
 * @see https://en.wikipedia.org/wiki/Properties_of_polynomial_roots#cite_note-Fujiwara1916-4
 * 
 * @param {number[]} p - The polynomial.
 * @returns {number} The bound.
 * @example
 * FloPoly.rootMagnitudeUpperBound_fujiwara([2,-3,6,5,-130]); //=> 6.753296750770361
 * FloPoly.allRoots([2,-3,6,5,-130]); //=> [-2.397918624065303, 2.8793785310848383]
 */
function rootMagnitudeUpperBound_fujiwara(p) {
	var d = p.length - 1;

	var an = p[0];
	var bs = [];

	for (var i = 1; i < d; i++) {
		var b = Math.pow(Math.abs(p[i] / an), 1 / i);
		bs.push(b);
	}

	bs.push(Math.pow(Math.abs(p[d] / 2 * an), 1 / d));

	return 2 * Math.max.apply(undefined, bs);
}

var POWERS = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768, 65536, 131072, 262144, 524288, 1048576, 2097152];
/**
 * <p> 
 * Returns an upper bound for the positive real roots of the given 
 * polynomial.
 * </p>
 * <p>
 * See algoritm 6 of the paper by Vigklas, Akritas and Strzeboński, 
 * specifically the LocalMaxQuadratic algorithm hence LMQ.
 * </p>  
 * 
 * @param {number[]} p - The polynomial
 * @returns {number} A lower bound.
 * @example
 * FloPoly.positiveRootUpperBound_LMQ([2,-3,6,5,-130]); //=> 4.015534272870436 
 * FloPoly.positiveRootUpperBound_LMQ([2,3]);           //=> 0 
 * FloPoly.positiveRootUpperBound_LMQ([-2,-3,-4]);      //=> 0
 */
function positiveRootUpperBound_LMQ(p) {
	var deg = p.length - 1;
	if (deg < 1) {
		return 0;
	}

	if (p[0] < 0) {
		p = negate(p);
	}

	var timesUsed = [];
	for (var i = 0; i < deg; i++) {
		timesUsed.push(1);
	}

	var ub = 0;

	for (var m = 0; m <= deg; m++) {
		if (p[m] >= 0) continue;

		var tempub = Number.POSITIVE_INFINITY;
		var any = false;

		for (var k = 0; k < m; k++) {
			if (p[k] <= 0) {
				continue;
			}

			// Table lookup is about 70% faster but both are
			// extemely fast anyway. 
			// Result is at https://www.measurethat.net/Benchmarks/ShowResult/6610
			var pow = timesUsed[k];
			var powres = void 0;
			if (pow > 20) {
				powres = Math.pow(2, pow);
			} else {
				powres = POWERS[pow];
			}
			var temp = Math.pow(-p[m] / (p[k] / powres), 1 / (m - k));

			timesUsed[k]++;

			if (tempub > temp) {
				tempub = temp;
			}

			any = true;
		}

		if (any && ub < tempub) ub = tempub;
	}

	return ub;
}

/**
 * <p> 
 * Calculates a lower bound for the positive roots of the given 
 * polynomial.
 * </p>
 * <p>
 * See algoritm 6 of the paper by Vigklas, Akritas and Strzeboński, 
 * specifically the LocalMaxQuadratic algorithm hence LMQ.
 * </p>
 *  
 * @param {number[]} p - The polynomial
 * @returns {number} A lower bound.
 * @example
 * FloPoly.positiveRootLowerBound_LMQ([2,-3,6,5,-130]); //=> 1.6883241876925903
 * FloPoly.positiveRootLowerBound_LMQ([2,3]);           //=> 0 
 * FloPoly.positiveRootLowerBound_LMQ([-2,-3,-4]);      //=> 0
 */
function positiveRootLowerBound_LMQ(p) {
	var ub = positiveRootUpperBound_LMQ(invert(p));
	if (ub === 0) {
		return 0;
	}
	return 1 / ub;
}

/**
 * See positiveRootUpperBound_LMQ
 * 
 * @param {number[]} p - The polynomial
 * @returns {number} An upper bound.
 */
function negativeRootUpperBound_LMQ(p) {
	return -positiveRootLowerBound_LMQ(reflectAboutYAxis(p));
}

/**
 * See positiveRootLowerBound_LMQ
 * 
 * @param {number[]} p - The polynomial
 * @returns {number} A lower bound.
 */
function negativeRootLowerBound_LMQ(p) {
	return -positiveRootUpperBound_LMQ(reflectAboutYAxis(p));
}

module.exports = rootBounds;

},{"./core-operators.js":2}],8:[function(_dereq_,module,exports){
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var coreOperators = _dereq_('./core-operators.js');

/**
 * Operators (i.e. functions) directly related to roots and root 
 * finding. 
 * 
 * @ignore
 */
var rootOperators = {
  quadraticRoots: quadraticRoots,
  //cubicRoots,
  numRootsWithin: numRootsWithin,
  brent: brent,
  bisection: bisection
};

var sturmChain = coreOperators.sturmChain,
    evaluate = coreOperators.evaluate,
    signChanges = coreOperators.signChanges;

/**
 * <p>
 * Floating-point-stably calculates and returns the ordered quadratic 
 * roots of the given quadratic polynomial.
 * </p>
 * <p>
 * This function is included only because it might be slightly faster
 * than calling allRoots due to allRoots first checking if the 
 * polynomial is quadratic and checking if the roots are within the
 * given range.
 * </p>
 * @param {number[]} p - The 2nd order polynomial
 * @returns {number[]} The found quadratic roots.
 * @example 
 * FloPoly.quadraticRoots([1, -3, 2]); //=> [1,2]
 */

function quadraticRoots(p) {
  var _p = _slicedToArray(p, 3),
      a = _p[0],
      b = _p[1],
      c = _p[2];

  var delta = b * b - 4 * a * c;

  if (delta < 0) {
    // No real roots;
    return [];
  }

  if (delta === 0) {
    return [-b / (2 * a)];
  }

  delta = Math.sqrt(delta);

  var root1 = void 0;
  var root2 = void 0;
  if (b >= 0) {
    root1 = (-b - delta) / (2 * a);
    root2 = 2 * c / (-b - delta);
  } else {
    root1 = 2 * c / (-b + delta);
    root2 = (-b + delta) / (2 * a);
  }

  if (root1 < root2) {
    return [root1, root2];
  }
  return [root2, root1];
}

/**
 * Calculates the roots of the given cubic polynomial.
 * 
 * This code is mostly from the Pomax guide found at
 * https://pomax.github.io/bezierinfo/#extremities
 * 
 * @param {number[]} p - A cubic polynomial.
 * @returns {number[]} 1,2 or 3 roots.
 */
// TODO - This function as it currently stands is very sensitive to
// the first coefficient if it is very small, e.g. compare:
// cubicRoots([1e-5, 1560,-1740,96]) = [1.1903631761670113, -156000001.1153846, -0.07497859001159668] 
// vs
// quadraticRoots([1560,-1740,96]) = [0.05821032751613551, 1.0571742878684798]
// It is completely useless in some ranges of its input domain:
// the part of the function 'if (discriminant < 0) {}'
// is highly problematic for numerical stability.
// Simply use allRoots / allRootsRecursive instead.
/*
function cubicRoots(p) {

	function cuberoot(v) {
		return v < 0 
			? -Math.pow(-v, 1/3)
		    : +Math.pow(v, 1/3);
	}
	
	let cbrt = Math.cbrt || cuberoot;
	
	let d = p[0];
	let a = p[1] / d;
	let b = p[2] / d;
	let c = p[3] / d;
	
	let s  = (3*b - a*a) / 9;
	let q  = (2*a*a*a - 9*a*b + 27*c) / 54;
	
	let s3 = s*s*s;
	let q2 = q*q;
	
	let discriminant = q2 + s3;

	if (!Number.isFinite(discriminant)) {
		
		// Overflow occured - in which case one root will be very large. 
		// We might want to report such large roots as positive or
		// negative infinity but since they are rarely of interest we
		// report only the smaller roots.
		
		// Here q*q   === (729*c^2 - 486*a*b*c + 108*a^3*c + 81*a^2*b^2 - 36*a^4*b + 4*a^6) / (729*4)
		// and  s*s*s === (27*b^3 - 27*a^2*b^2 + 9*a^4*b - a^6) / (729*1)
		
		return quadraticRoots(p.slice(1)); 
	}
	
	if (discriminant < 0) {
		// three real roots
		
		let r = Math.sqrt(-s3);
		let t = -q / r;
		
		let cosphi = t < -1 ? -1 : t > 1 ? 1 : t;
		let phi    = Math.acos(cosphi);
		let	t1     = 2*cbrt(r);
		
		let ao3 = a/3; 
		
		return [
			t1*Math.cos((phi            )/3) - ao3, 
			t1*Math.cos((phi + 2*Math.PI)/3) - ao3, 
			t1*Math.cos((phi + 4*Math.PI)/3) - ao3
		]
	} else if (discriminant === 0) {
		// three real roots, but two of them are equal
		
		let u1 = q < 0 ? cbrt(-q) : -cbrt(q);
		let ao3 = a/3;
		
		return [
			2*u1 - ao3, 
			-u1 - ao3
		];
	} else {
		// one real root, two complex roots
		
		let sd = Math.sqrt(discriminant);
		let u1 = cbrt(sd - q);
		let v1 = cbrt(sd + q);
		
		return [u1 - v1 - a/3];
	}
}
*/

/** 
 * Returns the number of real roots in the interval (a,b) of the given 
 * polynomial.
 * 
 * @param {number[]} p - The polynomial
 * @param {number} a - The lower bound
 * @param {number} b - The upper bound
 * @returns {number} The number of roots in the given interval
 * @example 
 * let p = [1, 1, -64, 236, -240];
 * FloPoly.numRootsWithin(p,-20,-11); //=> 0
 * FloPoly.numRootsWithin(p,-11,-9);  //=> 1  
 * FloPoly.numRootsWithin(p,-11,3.5); //=> 3
 * FloPoly.numRootsWithin(p,-11,5);   //=> 4
 */
function numRootsWithin(p, a, b) {
  var ps = sturmChain(p);
  var ev = evaluate(p);
  var as = ps.map(function (p) {
    return evaluate(p)(a);
  });
  var bs = ps.map(function (p) {
    return evaluate(p)(b);
  });

  return signChanges(as) - signChanges(bs);
}

/**
 * <p>
 * Searches an interval (a,b) for a root (i.e. zero) of the 
 * given function with respect to its first argument using the Bisection 
 * Method root-finding algorithm. Any function can be supplied (it does
 * not even have to be continuous) as long as the root is bracketed. 
 * </p>
 * <p>
 * Note: This function has no advantages above the Brent method except
 * for its simpler implementation and can be much slower. Use brent 
 * instead.
 * </p>
 * @param {function} f - The function for which the root is sought.
 * @param {number} a - The lower limit of the search interval.
 * @param {number} b - The upper limit of the search interval.
 * @returns {number} An estimate of the root to within δ (typically 
 * about 1e-15 multiplied by the root magnitued).
 * @example
 * let p = FloPoly.fromRoots([-10,2,3,4]);  //=> [1, 1, -64, 236, -240]
 * let f = FloPoly.evaluate(p);
 * FloPoly.bisection(f,2.2,3.8); //=> 3
 * FloPoly.bisection(f,2.2,3.1); //=> 3.0000000000000044
 */
function bisection(f, a, b) {
  if (a === b) {
    // Presumably the root is already found.
    return a;
  } else if (b < a) {
    // Swap a and b 
    var _ref = [b, a];
    a = _ref[0];
    b = _ref[1];
  }

  var fa = f(a);
  var fb = f(b);

  if (fa === 0) {
    return a;
  }
  if (fb === 0) {
    return b;
  }

  if (fa * fb > 0) {
    // Root is not bracketed - this is a precondition.
    throw new Error('Root not bracketed');
  }

  while (true) {
    var c = a + (b - a) / 2; // Take midpoint
    var fc = f(c);

    if (fc === 0) {
      return c;
    }

    if (fa * fc < 0) {
      b = c;
    } else {
      a = c;
    }

    // We don't add Number.EPSILON in the line below because we want
    // accuracy to improve even below 1.
    var δ = 2 * Number.EPSILON * Math.abs(b) /*+ Number.EPSILON*/;
    if (Math.abs(a - b) <= δ) {
      return b;
    }
  }
}

/**
 * <p>
 * Searches an interval (a,b) for a root (i.e. zero) of the 
 * given function with respect to its first argument using the Brent's 
 * Method root-finding algorithm. Any function can be supplied (it does
 * not even have to be continuous) as long as the root is bracketed. 
 * </p>
 * <p>
 * Brent's Method is an excellent root-finding choice since it is
 * (1) guaranteed to converge (unlike the Newton and other so-called 
 * single-point methods), (2) converges in a reasonable number of 
 * iterations even for highly contrived functions (unlike Dekker's 
 * Method) and (3) nearly always converges extremely fast, i.e. super-
 * linearly (unlike the Secant and Regula-Falsi methods).
 * </p>
 * <p>
 * The max error, δ, is set equal to 2*Number.EPSILON*Math.abs(b)
 * after each iteration where b is the max of the current 2 best 
 * guesses.
 * </p>
 * <p> 
 * See <a href="https://en.wikipedia.org/wiki/Brent%27s_method">Wikipedia</a>
 * </p>
 * <p>
 * See <a href="https://maths-people.anu.edu.au/~brent/pd/rpb011i.pdf">Brent (page 47)</a>
 * </p>
 * @param {function} f - The function for which the root is sought.
 * @param {number} a - The lower limit of the search interval.
 * @param {number} b - The upper limit of the search interval.
 * @returns {number} An estimate of the root to within δ (typically 
 * about 1e-15 multiplied by the root magnitued).
 * @example
 * let p = FloPoly.fromRoots([-10,2,3,4]);  //=> [1, 1, -64, 236, -240]
 * let f = FloPoly.evaluate(p);
 * FloPoly.brent(f,2.2,3.8); //=> 3.000000000000003
 * FloPoly.brent(f,2.2,3.1); //=> 3.000000000000001
 */
function brent(f, a, b) {
  if (a === b) {
    // Presumably the root is already found.
    return a;
  }

  // We assume on the first iteration f(a) !== 0 && f(b) !== 0. 
  var fa = f(a);
  var fb = f(b);

  if (fa * fb > 0) {
    // Root is not bracketed - this is a precondition.
    throw new Error('Root not bracketed');
  }

  var c = void 0; // Value of previous guess - set to a initially 
  if (Math.abs(fa) < Math.abs(fb)) {
    // Swap a,b
    c = a;a = b;b = c;

    // Swap fa,fb
    var temp = fa;
    fa = fb;
    fb = temp;
  }

  c = a;

  var mflag = true;
  var d = void 0; // Value of guess before previous guess
  while (true) {
    var δ = 2 * Number.EPSILON * Math.abs(b); // + Number.EPSILON;

    var fc = f(c);

    // Calculate provisional interpolation value
    var s = void 0;
    if (fa !== fc && fb !== fc) {
      // 3 points available - inverse quadratic interpolation
      var fac = fa - fc;
      var fab = fa - fb;
      var fbc = fb - fc;

      // The below has been multiplied out to speed up the algorithm.
      /*s = ((a * fb * fc) / ( fab * fac)) +
      	  ((b * fa * fc) / (-fab * fbc)) +
      	  ((c * fa * fb) / ( fac * fbc));*/
      s = ((a * fb * fbc - b * fa * fac) * fc + c * fa * fab * fb) / (fab * fac * fbc);
    } else {
      // only 2 points available - secant method
      s = b - fb * ((b - a) / (fb - fa));
    }

    var t1 = (3 * a + b) / 4;
    var b_c = Math.abs(b - c);
    var s_b = Math.abs(s - b);
    var c_d = Math.abs(c - d);

    if (!( // condition 1
    s > t1 && s < b || s < t1 && s > b) || mflag && (
    // condition 2
    s_b >= b_c / 2 ||
    // condition 4
    b_c < δ) || !mflag && (
    // condition 3
    s_b >= c_d / 2 ||
    // condition 5
    c_d < δ)) {
      // Bisection
      s = (a + b) / 2;
      mflag = true;
    } else {
      mflag = false;
    }

    var fs = f(s);

    d = c;
    c = b;

    if (fa * fs < 0) {
      b = s;
    } else {
      a = s;
    }

    if (Math.abs(fa) < Math.abs(fb)) {
      // Swap a,b
      var _temp = a;a = b;b = _temp;
    }

    if (fb === 0) {
      return b;
    }
    if (fs === 0) {
      return s;
    }

    if (Math.abs(a - b) <= δ) {
      return b;
    }

    fa = f(a);
    fb = f(b);
  }
}

module.exports = rootOperators;

},{"./core-operators.js":2}]},{},[4])(4)
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],6:[function(_dereq_,module,exports){
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var DELTA = 1e-10;

/** 
 * Returns the dot (inner) product between two 2-vectors. 
 * @param {number} a - The first vector
 * @param {number} b - The second vector
 * @returns {number}
 */
function dot(a, b) {
	return a[0] * b[0] + a[1] * b[1];
}

/** 
 * Returns the cross product signed magnitude between two 2-vectors.
 * @param {number[]} a - The first vector
 * @param {number[]} b - The second vector
 * @returns {number}
 */
function cross(a, b) {
	return a[0] * b[1] - a[1] * b[0];
}

/**
 * Three 2d points are a counter-clockwise turn if ccw > 0, 
 * clockwise if ccw < 0, and colinear if ccw = 0 because ccw is a 
 * determinant that gives twice the signed area of the triangle formed 
 * by p1, p2 and p3.
 * @param {number[]} p1 - The first point
 * @param {number[]} p2 - The second point
 * @param {number[]} p3 - The third point
 * @param {number} [delta] - The tolerance at which the three points are 
 * considered colinear - defaults to 1e-10
 * @returns {number}
 */
function ccw(p1, p2, p3, delta) {
	delta = delta === undefined ? DELTA : delta;

	var res = (p2[0] - p1[0]) * (p3[1] - p1[1]) - (p2[1] - p1[1]) * (p3[0] - p1[0]);

	return Math.abs(res) <= delta ? 0 : res;
}

/**
 * <p>
 * Finds the point where two 2d line segments intersect.
 * </p>
 * <p>
 * See <a href="http://algs4.cs.princeton.edu/91primitives">Geometric primitves</a>
 * </p> 
 * @param {number[][]} ab - The first line 
 * @param {number[][]} cd - The second line
 * @param {number} [delta] - The tolerance at which the lines are considered 
 * parallel - defaults to 1e-10
 * @returns {number[]} The point where the two line segments intersect  
 * or undefined if they don't intersect or a line if they intersect at 
 * infinitely many points. 
 */
function segSegIntersection(ab, cd, delta) {
	delta = delta === undefined ? DELTA : delta;

	var _ab = _slicedToArray(ab, 2),
	    a = _ab[0],
	    b = _ab[1];

	var _cd = _slicedToArray(cd, 2),
	    c = _cd[0],
	    d = _cd[1];

	var denom = (b[0] - a[0]) * (d[1] - c[1]) - (b[1] - a[1]) * (d[0] - c[0]);
	var rNumer = (a[1] - c[1]) * (d[0] - c[0]) - (a[0] - c[0]) * (d[1] - c[1]);
	var sNumer = (a[1] - c[1]) * (b[0] - a[0]) - (a[0] - c[0]) * (b[1] - a[1]);

	if (Math.abs(denom) <= delta) {
		// parallel
		if (Math.abs(rNumer) <= delta) {
			// colinear
			// TODO Check if x-projections and y-projections intersect
			// and return the line of intersection if they do.
			return undefined;
		}
		return undefined;
	}

	var r = rNumer / denom;
	var s = sNumer / denom;

	if (0 <= r && r <= 1 && 0 <= s && s <= 1) {
		return [a[0] + r * (b[0] - a[0]), a[1] + r * (b[1] - a[1])];
	}

	return undefined;
}

/**
 * Returns true if the two given 2d line segments intersect, false otherwise.
 * @param {number[][]} a - A line segment
 * @param {number[][]} b - Another line segment
 * @returns {boolean}
 */
function doesSegSegIntersect(a, b) {
	if (ccw(a[0], a[1], b[0]) * ccw(a[0], a[1], b[1]) > 0) {
		return false;
	}
	if (ccw(b[0], b[1], a[0]) * ccw(b[0], b[1], a[1]) > 0) {
		return false;
	}

	return true;
}

/** 
 * Returns the squared distance between two 2d points.
 * @param {number[]} p1 - A point
 * @param {number[]} p2 - Another point
 * @returns {number}
 */
function squaredDistanceBetween(p1, p2) {
	var x = p2[0] - p1[0];
	var y = p2[1] - p1[1];

	return x * x + y * y;
}

/**
 * Returns a scaled version of the given 2-vector.
 * @param {number[]} p - A vector
 * @param {number} factor - A scale factor
 * @returns {number[]}
 */
function scale(p, factor) {
	return [p[0] * factor, p[1] * factor];
}

/**
 * Returns the given 2-vector reversed.
 * @param {number[]} p 
 * @returns {number[]}
 */
function reverse(p) {
	return [-p[0], -p[1]];
}

/**
 * Returns the given 2-vector scaled to a length of one.
 * @param {number[]} p
 * @returns {number[]}
 */
function toUnitVector(p) {
	var scaleFactor = 1 / length(p);

	return [p[0] * scaleFactor, p[1] * scaleFactor];
}

/**
 * Returns the given 2-vector scaled to the given length.
 * @param {number[]} p 
 * @param {number} length 
 * @returns {number[]}
 */
function toLength(p, len) {
	var scaleFactor = len / length(p);

	return [p[0] * scaleFactor, p[1] * scaleFactor];
}

/** 
 * Returns the second 2-vector minus the first.
 * @param {number[]} p1 - The first vector
 * @param {number[]} p2 - The second vector
 * @returns {number[]}
 */
function fromTo(p1, p2) {
	return [p2[0] - p1[0], p2[1] - p1[1]];
}

/**
 * Performs linear interpolation between two 2d points and returns the resultant point.
 * @param {number[]} p1 - The first point.
 * @param {number[]} p2 - The second point.
 * @param {number} t - The interpolation fraction (usually in [0,1]).  
 * @returns {number[]}
 */
function interpolate(p1, p2, t) {
	return [p1[0] + (p2[0] - p1[0]) * t, p1[1] + (p2[1] - p1[1]) * t];
}

/**
 * Returns the mean point value of the provided array of two 2d points. 
 * @param {number[][]} ps - The two points
 * @returns {number[]}
 */
function mean(ps) {
	var p1 = ps[0];
	var p2 = ps[1];

	return [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2];
}

/** 
 * Returns the distance between two 2d points.
 * @param {number[]} p1 - A point.
 * @param {number[]} p2 - Another point.
 * @returns {number}
 */
function distanceBetween(p1, p2) {
	return Math.sqrt(squaredDistanceBetween(p1, p2));
}

/** 
 * Returns the length of the given 2-vector.
 * @param {number[]} p - A vector
 * @returns {number}
 */
function length(p) {
	return Math.sqrt(p[0] * p[0] + p[1] * p[1]);
}

/**
 * Returns the squared length of the given 2-vector.
 * @param {number[]} p - A vector
 * @returns {number}
 */
function lengthSquared(v) {
	return v[0] * v[0] + v[1] * v[1];
}

/** 
 * Returns the Manhattan distance between two 2d points.
 * @param {number[]} p1 - A point.
 * @param {number[]} p2 - Another point.
 * @returns {number}
 */
function manhattanDistanceBetween(p1, p2) {
	return Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1]);
}

/** 
 * Returns the Manhattan length of the given 2-vector.
 * @param {number[]} p - A vector
 * @returns {number}
 */
function manhattanLength(p) {
	return Math.abs(p[0]) + Math.abs(p[1]);
}

/**
 * <p>
 * Returns the distance between the given point and line. 
 * </p>
 * <p>
 * See <a href="https://en.wikipedia.org/wiki/Distance_from_a_point_to_a_line#Line_defined_by_two_points">
 * this Wikipedia article</a>
 * </p>
 * @param {number[]} p - A point
 * @param {number[][]} l - A line
 * @returns {number}
 */
function distanceBetweenPointAndLine(p, l) {
	var _p = _slicedToArray(p, 2),
	    x0 = _p[0],
	    y0 = _p[1];

	var _l = _slicedToArray(l, 2),
	    _l$ = _slicedToArray(_l[0], 2),
	    x1 = _l$[0],
	    y1 = _l$[1],
	    _l$2 = _slicedToArray(_l[1], 2),
	    x2 = _l$2[0],
	    y2 = _l$2[1];

	var y = y2 - y1;
	var x = x2 - x1;

	var a = y * x0 - x * y0 + x2 * y1 - y2 * x1;
	var b = Math.sqrt(x * x + y * y);

	return Math.abs(a / b);
}

/**
 * Returns the squared distance between the given point and line segment. 
 * @param {number[]} p - A point
 * @param {number[][]} l - A line
 * @returns {number}
 */
function squaredDistanceBetweenPointAndLineSegment(p, l) {
	var v = l[0];
	var w = l[1];

	var l2 = squaredDistanceBetween(v, w);
	if (l2 == 0) {
		return squaredDistanceBetween(p, v);
	}

	var t = ((p[0] - v[0]) * (w[0] - v[0]) + (p[1] - v[1]) * (w[1] - v[1])) / l2;
	t = Math.max(0, Math.min(1, t));

	var d2 = squaredDistanceBetween(p, [v[0] + t * (w[0] - v[0]), v[1] + t * (w[1] - v[1])]);

	return d2;
}

/**
 * Returns the circumcenter of the given 2d triangle (given as three 2d points).
 * @param {number[][]} triangle 
 * @returns {number[]}
 */
function circumCenter(triangle) {
	// See wikipedia
	var p1 = triangle[0];
	var p2 = triangle[1];
	var p3 = triangle[2];

	var Sx = 0.5 * det3([lengthSquared(p1), p1[1], 1], [lengthSquared(p2), p2[1], 1], [lengthSquared(p3), p3[1], 1]);

	var Sy = 0.5 * det3([p1[0], lengthSquared(p1), 1], [p2[0], lengthSquared(p2), 1], [p3[0], lengthSquared(p3), 1]);

	var a = det3([p1[0], p1[1], 1], [p2[0], p2[1], 1], [p3[0], p3[1], 1]);

	var b = det3([p1[0], p1[1], lengthSquared(p1)], [p2[0], p2[1], lengthSquared(p2)], [p3[0], p3[1], lengthSquared(p3)]);

	return [Sx / a, Sy / a];
}

/** 
 * <p>
 * Returns the incenter of the given triangle.
 * </p>
 * <p>
 * See Wikipedia - https://en.wikipedia.org/wiki/Incenter 
 * </p>
 * @param {number[][]} triangle 
 * @returns {number[]}
 */
function inCenter(triangle) {
	var p1 = triangle[0];
	var p2 = triangle[1];
	var p3 = triangle[2];

	var l1 = distanceBetween(p2, p3);
	var l2 = distanceBetween(p1, p3);
	var l3 = distanceBetween(p1, p2);
	var lengthSum = l1 + l2 + l3;
	return [(l1 * p1[0] + l2 * p2[0] + l3 * p3[0]) / lengthSum, (l1 * p1[1] + l2 * p2[1] + l3 * p3[1]) / lengthSum];
}

/**
 * Returns the centroid of the given polygon, e.g. triangle. The polygon
 * must be simple, i.e. not self-intersecting.
 * @param {number[][]} polygon 
 * @returns {number[]}
 */
function centroid(polygon) {
	if (polygon.length === 3) {
		var p1 = polygon[0];
		var p2 = polygon[1];
		var p3 = polygon[2];

		var x = p1[0] + p2[0] + p3[0];
		var y = p1[1] + p2[1] + p3[1];

		return [x / 3, y / 3];
	}

	// polygon.length assumed > 3 and assumed to be non-self-intersecting
	// See wikipedia

	// First calculate the area, A, of the polygon
	var A = 0;
	for (var i = 0; i < polygon.length; i++) {
		var p0 = polygon[i];
		var _p2 = i === polygon.length - 1 ? polygon[0] : polygon[i + 1];

		A = A + (p0[0] * _p2[1] - _p2[0] * p0[1]);
	}
	A = A / 2;

	var C = [0, 0];
	for (var _i = 0; _i < polygon.length; _i++) {
		var _p3 = polygon[_i];
		var _p4 = _i === polygon.length - 1 ? polygon[0] : polygon[_i + 1];

		C[0] = C[0] + (_p3[0] + _p4[0]) * (_p3[0] * _p4[1] - _p4[0] * _p3[1]);
		C[1] = C[1] + (_p3[1] + _p4[1]) * (_p3[0] * _p4[1] - _p4[0] * _p3[1]);
	}

	return [C[0] / (6 * A), C[1] / (6 * A)];
}

/**
 * Calculate the determinant of three 3-vectors, i.e. 3x3 matrix
 * @ignore
 * @param {number[]} x 
 * @param {number[]} y
 * @param {number[]} z
 * @returns {number}
 */
function det3(x, y, z) {
	return x[0] * (y[1] * z[2] - y[2] * z[1]) - x[1] * (y[0] * z[2] - y[2] * z[0]) + x[2] * (y[0] * z[1] - y[1] * z[0]);
}

/**
 * Returns the result of adding two 2-vectors. This function is curried.
 * @param {number[]} a - A vector
 * @param {number[]} b - Another vector
 * @param {number[]}
 */
function translate(a, b) {
	function f(b) {
		return [a[0] + b[0], a[1] + b[1]];
	}

	// Curry the function
	return b === undefined ? f : f(b);
}

/**
 * Creates a transformation function that operates on multiple points from the 
 * given arity two function.
 * @ignore
 */
function createCurriedFunctionArity2(f) {
	return function (a, ps) {
		var f1 = f(a); // Cache for speed
		var fPs = function fPs(ps) {
			return ps.map(f1);
		};

		// Curry the function
		return ps === undefined ? fPs : fPs(ps);
	};
}

/**
 * Creates a transformation function that operates on multiple points from the 
 * given curried arity three function.
 * @ignore
 */
function createCurriedFunctionArity3(f) {
	return function (a, b, ps) {
		var f2 = f(a, b); // Cache for speed
		var fPs = function fPs(ps) {
			return ps.map(f2);
		};

		// Curry the function
		return ps === undefined ? fPs : fPs(ps);
	};
}

/**
 * Return the given 2d points translated by the given 2d vector. This function
 * is curried.
 * @param {number} sinθ
 * @param {number} cosθ
 * @param {number[][]} ps 
 * @returns {number[][]}
 */
var rotatePs = createCurriedFunctionArity3(rotate);

/**
 * Return the given 2d points translated by the given 2d vector. This function
 * is curried.
 * @param {number[]} v 
 * @param {number[][]} ps 
 * @returns {number[][]}
 */
var translatePs = createCurriedFunctionArity2(translate);

/**
 * Returns a rotated version of the given 2-vector given the sine and cosine of the angle.
 * @param {number} sinθ
 * @param {number} cosθ
 * @param {number[]} p
 * @returns {number[]}
 */
function rotate(sinθ, cosθ, p) {
	function rotateByθ(p) {
		return [p[0] * cosθ - p[1] * sinθ, p[0] * sinθ + p[1] * cosθ];
	}

	// Curry the function
	return p === undefined ? rotateByθ : rotateByθ(p);
}

/**
 * Returns true if two 2-vectors are identical, false otherwise.
 * @param {number[]} a
 * @param {number[]} b
 * @returns {boolean}
 */
function equal(a, b) {
	return a[0] === b[0] && a[1] === b[1];
}

/**
 * Returns a anti-clockwise rotated version of the given 2-vector given the sine 
 * and cosine of the angle.
 * @param {number[]} p 
 * @param {number} sinθ
 * @param {number} cosθ
 * @returns {number[]}
 */
function reverseRotate(sinθ, cosθ, p) {
	return [+p[0] * cosθ + p[1] * sinθ, -p[0] * sinθ + p[1] * cosθ];
}

/**
 * Returns a 90 degrees rotated version of the given 2-vector.
 * @param {number[]} p 
 * @returns {number[]}
 */
function rotate90Degrees(p) {
	return [-p[1], p[0]];
}

/**
 * Returns a negative 90 degrees rotated version of the given 2-vector.
 * @param {number[]} p 
 * @returns {number[]}
 */
function rotateNeg90Degrees(p) {
	return [p[1], -p[0]];
}

/**
 * Transforms the given 2-vector by applying the given function to each coordinate.
 * @param {number[]} p 
 * @param {function} f 
 * @returns {*[]}
 */
function transform(p, f) {
	return [f(p[0]), f(p[1])];
}

/**
 * Returns the closest point to the array of 2d points, optionally providing a distance function.
 * @param {number[]} p
 * @param {number[][]} ps
 * @param {function} f - Distance function - if undefined uses squaredDistanceBetween
 */
function getClosestTo(p, ps, f) {
	f = f === undefined ? squaredDistanceBetween : f;

	var cp = undefined; // Closest Point
	var bestd = Number.POSITIVE_INFINITY;
	for (var i = 0; i < ps.length; i++) {
		var p_ = ps[i];

		var d = f(p, p_);
		if (d < bestd) {
			cp = p_;
			bestd = d;
		}
	}

	return cp;
}

/** 
 * Returns an array of points by applying a translation and then rotation to the given points.
 * @param {number[]} v - The translation vector
 * @param {number} sinθ 
 * @param {number} cosθ
 * @param {number[][]} ps - The input points
 * @returns {number[][]}
 **/
function translateThenRotatePs(v, sinθ, cosθ, ps) {
	return ps.map(function (p) {
		return rotate(sinθ, cosθ, translate(v, p));
	});
}

/** 
 * Returns an array of points by applying a rotation and then translation to the given points.
 * @param {number} sinθ 
 * @param {number} cosθ
 * @param {number[]} v - The translation vector
 * @param {number[][]} ps - The input points
 * @returns {number[][]}
 **/
function rotateThenTranslatePs(sinθ, cosθ, v, ps) {
	return ps.map(function (p) {
		return translate(v, rotate(sinθ, cosθ, p));
	});
}

/*
 * Purely functional 2d vector utilities.
 */
var Vector = {
	dot: dot,
	cross: cross,
	ccw: ccw,
	segSegIntersection: segSegIntersection,
	doesSegSegIntersect: doesSegSegIntersect,
	squaredDistanceBetween: squaredDistanceBetween,
	scale: scale,
	reverse: reverse,
	translate: translate,
	toUnitVector: toUnitVector,
	toLength: toLength,
	fromTo: fromTo,
	interpolate: interpolate,
	mean: mean,
	distanceBetween: distanceBetween,
	length: length,
	lengthSquared: lengthSquared,
	manhattanDistanceBetween: manhattanDistanceBetween,
	manhattanLength: manhattanLength,
	distanceBetweenPointAndLine: distanceBetweenPointAndLine,
	squaredDistanceBetweenPointAndLineSegment: squaredDistanceBetweenPointAndLineSegment,
	circumCenter: circumCenter,
	inCenter: inCenter,
	centroid: centroid,
	equal: equal,
	rotate: rotate,
	rotatePs: rotatePs,
	reverseRotate: reverseRotate,
	rotate90Degrees: rotate90Degrees,
	rotateNeg90Degrees: rotateNeg90Degrees,
	transform: transform,
	getClosestTo: getClosestTo,
	translatePs: translatePs,
	translateThenRotatePs: translateThenRotatePs,
	rotateThenTranslatePs: rotateThenTranslatePs
};

module.exports = Vector;

},{}]},{},[1])(1)
});