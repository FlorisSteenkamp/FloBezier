---
id: "_intersection_self_intersection_self_intersection_"
title: "intersection/self-intersection/self-intersection"
sidebar_label: "intersection/self-intersection/self-intersection"
---

[flo-bezier3](../globals.md) › ["intersection/self-intersection/self-intersection"](_intersection_self_intersection_self_intersection_.md)

## Index

### Variables

* [abs](_intersection_self_intersection_self_intersection_.md#const-abs)
* [ddSqrt](_intersection_self_intersection_self_intersection_.md#ddsqrt)
* [divWithErr](_intersection_self_intersection_self_intersection_.md#divwitherr)
* [eAbs](_intersection_self_intersection_self_intersection_.md#eabs)
* [eCompare](_intersection_self_intersection_self_intersection_.md#ecompare)
* [eEstimate](_intersection_self_intersection_self_intersection_.md#eestimate)
* [eMultByNeg2](_intersection_self_intersection_self_intersection_.md#emultbyneg2)
* [eSign](_intersection_self_intersection_self_intersection_.md#esign)
* [eToDd](_intersection_self_intersection_self_intersection_.md#etodd)
* [edif](_intersection_self_intersection_self_intersection_.md#const-edif)
* [epr](_intersection_self_intersection_self_intersection_.md#const-epr)
* [eps](_intersection_self_intersection_self_intersection_.md#const-eps)
* [qaq](_intersection_self_intersection_self_intersection_.md#const-qaq)
* [qdivq](_intersection_self_intersection_self_intersection_.md#const-qdivq)
* [qm2](_intersection_self_intersection_self_intersection_.md#const-qm2)
* [qno](_intersection_self_intersection_self_intersection_.md#const-qno)
* [sce](_intersection_self_intersection_self_intersection_.md#const-sce)
* [sqrtWithErr](_intersection_self_intersection_self_intersection_.md#sqrtwitherr)
* [tp](_intersection_self_intersection_self_intersection_.md#const-tp)

### Functions

* [bezierSelfIntersection](_intersection_self_intersection_self_intersection_.md#bezierselfintersection)

## Variables

### `Const` abs

• **abs**: *abs* = Math.abs

*Defined in [src/intersection/self-intersection/self-intersection.ts:26](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/self-intersection/self-intersection.ts#L26)*

___

###  ddSqrt

• **ddSqrt**: *[ddSqrt](_intersection_self_intersection_self_intersection_.md#ddsqrt)*

*Defined in [src/intersection/self-intersection/self-intersection.ts:12](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/self-intersection/self-intersection.ts#L12)*

___

###  divWithErr

• **divWithErr**: *[divWithErr](_intersection_self_intersection_self_intersection_.md#divwitherr)*

*Defined in [src/intersection/self-intersection/self-intersection.ts:12](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/self-intersection/self-intersection.ts#L12)*

___

###  eAbs

• **eAbs**: *[eAbs](_intersection_self_intersection_self_intersection_.md#eabs)*

*Defined in [src/intersection/self-intersection/self-intersection.ts:9](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/self-intersection/self-intersection.ts#L9)*

___

###  eCompare

• **eCompare**: *[eCompare](_intersection_self_intersection_self_intersection_.md#ecompare)*

*Defined in [src/intersection/self-intersection/self-intersection.ts:9](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/self-intersection/self-intersection.ts#L9)*

___

###  eEstimate

• **eEstimate**: *[eEstimate](_intersection_self_intersection_self_intersection_.md#eestimate)*

*Defined in [src/intersection/self-intersection/self-intersection.ts:9](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/self-intersection/self-intersection.ts#L9)*

___

###  eMultByNeg2

• **eMultByNeg2**: *[eMultByNeg2](_intersection_self_intersection_self_intersection_.md#emultbyneg2)*

*Defined in [src/intersection/self-intersection/self-intersection.ts:9](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/self-intersection/self-intersection.ts#L9)*

___

###  eSign

• **eSign**: *[eSign](_intersection_bezier_intersection_implicit_bezier_bezier_intersection_implicit_.md#esign)*

*Defined in [src/intersection/self-intersection/self-intersection.ts:9](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/self-intersection/self-intersection.ts#L9)*

___

###  eToDd

• **eToDd**: *[eToDd](_intersection_self_intersection_self_intersection_.md#etodd)*

*Defined in [src/intersection/self-intersection/self-intersection.ts:9](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/self-intersection/self-intersection.ts#L9)*

___

### `Const` edif

• **edif**: *[eDiff](_implicit_form_exact_get_implicit_form1_.md#ediff)* = eDiff

*Defined in [src/intersection/self-intersection/self-intersection.ts:15](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/self-intersection/self-intersection.ts#L15)*

___

### `Const` epr

• **epr**: *[expansionProduct](_implicit_form_exact_get_implicit_form2_.md#expansionproduct)* = expansionProduct

*Defined in [src/intersection/self-intersection/self-intersection.ts:16](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/self-intersection/self-intersection.ts#L16)*

___

### `Const` eps

• **eps**: *number* = Number.EPSILON

*Defined in [src/intersection/self-intersection/self-intersection.ts:25](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/self-intersection/self-intersection.ts#L25)*

___

### `Const` qaq

• **qaq**: *[ddAddDd](_global_properties_bounds_get_interval_box_get_interval_box_quad_.md#ddadddd)* = ddAddDd

*Defined in [src/intersection/self-intersection/self-intersection.ts:20](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/self-intersection/self-intersection.ts#L20)*

___

### `Const` qdivq

• **qdivq**: *ddDivDd* = ddDivDd

*Defined in [src/intersection/self-intersection/self-intersection.ts:22](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/self-intersection/self-intersection.ts#L22)*

___

### `Const` qm2

• **qm2**: *[ddMultBy2](_global_properties_bounds_get_interval_box_get_interval_box_quad_.md#ddmultby2)* = ddMultBy2

*Defined in [src/intersection/self-intersection/self-intersection.ts:21](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/self-intersection/self-intersection.ts#L21)*

___

### `Const` qno

• **qno**: *ddNegativeOf* = ddNegativeOf

*Defined in [src/intersection/self-intersection/self-intersection.ts:19](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/self-intersection/self-intersection.ts#L19)*

___

### `Const` sce

• **sce**: *scaleExpansion2* = scaleExpansion2

*Defined in [src/intersection/self-intersection/self-intersection.ts:17](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/self-intersection/self-intersection.ts#L17)*

___

###  sqrtWithErr

• **sqrtWithErr**: *[sqrtWithErr](_intersection_self_intersection_self_intersection_.md#sqrtwitherr)*

*Defined in [src/intersection/self-intersection/self-intersection.ts:12](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/self-intersection/self-intersection.ts#L12)*

___

### `Const` tp

• **tp**: *[twoProduct](_intersection_bezier_intersection_implicit_inversion_old_.md#twoproduct)* = twoProduct

*Defined in [src/intersection/self-intersection/self-intersection.ts:18](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/self-intersection/self-intersection.ts#L18)*

## Functions

###  bezierSelfIntersection

▸ **bezierSelfIntersection**(`ps`: number[][]): *number[]*

*Defined in [src/intersection/self-intersection/self-intersection.ts:37](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/self-intersection/self-intersection.ts#L37)*

Returns the self-intersection t values of the given bezier curve if it
exists and if both t-values are in [0,1], else returns undefined.
* **precondition**: max bit-aligned bitlength: 47
* only cubic (or higher order) bezier curves have self-intersections
* see http://www.mare.ee/indrek/misc/2d.pdf
* the returned t values are within 1 ulp accurate

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] | A cubic bezier curve.  |

**Returns:** *number[]*
