---
id: "_intersection_bezier_intersection_implicit_x_.x"
title: "X"
sidebar_label: "X"
---

[flo-bezier3](../globals.md) › ["intersection/bezier-intersection-implicit/x"](../modules/_intersection_bezier_intersection_implicit_x_.md) › [X](_intersection_bezier_intersection_implicit_x_.x.md)

Representation of one side of an intersection.

## Hierarchy

* **X**

## Index

### Properties

* [box](_intersection_bezier_intersection_implicit_x_.x.md#box)
* [compensated](_intersection_bezier_intersection_implicit_x_.x.md#optional-compensated)
* [getPsExact](_intersection_bezier_intersection_implicit_x_.x.md#optional-getpsexact)
* [kind](_intersection_bezier_intersection_implicit_x_.x.md#kind)
* [ri](_intersection_bezier_intersection_implicit_x_.x.md#ri)
* [riExp](_intersection_bezier_intersection_implicit_x_.x.md#optional-riexp)

## Properties

###  box

• **box**: *number[][]*

*Defined in [src/intersection/bezier-intersection-implicit/x.ts:29](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier-intersection-implicit/x.ts#L29)*

A box that is guaranteed to contain the intersection

___

### `Optional` compensated

• **compensated**? : *number*

*Defined in [src/intersection/bezier-intersection-implicit/x.ts:13](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier-intersection-implicit/x.ts#L13)*

The number of times the root has been compensated (if undefined implies 0)

___

### `Optional` getPsExact

• **getPsExact**? : *function*

*Defined in [src/intersection/bezier-intersection-implicit/x.ts:16](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier-intersection-implicit/x.ts#L16)*

#### Type declaration:

▸ (): *number[][][]*

___

###  kind

• **kind**: *0 | 1 | 2 | 3 | 4 | 5*

*Defined in [src/intersection/bezier-intersection-implicit/x.ts:27](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier-intersection-implicit/x.ts#L27)*

The kind of critical point:
* 0 => extreme, e.g. topmost point
* 1 => general (non-self) intersection
* 2 => self intersection
* 3 => cusp
* 4 => interface intersection
* 5 => exact overlap with other bezier endpoints

___

###  ri

• **ri**: *RootInterval*

*Defined in [src/intersection/bezier-intersection-implicit/x.ts:11](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier-intersection-implicit/x.ts#L11)*

The root interval if compensated zero times (not compensated)

___

### `Optional` riExp

• **riExp**? : *RootIntervalExp*

*Defined in [src/intersection/bezier-intersection-implicit/x.ts:15](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/intersection/bezier-intersection-implicit/x.ts#L15)*

The root interval if compensated 1 or more times
