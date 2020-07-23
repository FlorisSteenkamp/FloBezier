---
id: "_debug_circle_.circle"
title: "Circle"
sidebar_label: "Circle"
---

[flo-bezier3](../globals.md) › ["debug/circle"](../modules/_debug_circle_.md) › [Circle](_debug_circle_.circle.md)

## Hierarchy

* **Circle**

## Index

### Constructors

* [constructor](_debug_circle_.circle.md#constructor)

### Properties

* [center](_debug_circle_.circle.md#center)
* [radius](_debug_circle_.circle.md#radius)

### Methods

* [engulfsCircle](_debug_circle_.circle.md#static-engulfscircle)
* [scale](_debug_circle_.circle.md#static-scale)
* [toString](_debug_circle_.circle.md#static-tostring)

## Constructors

###  constructor

\+ **new Circle**(`center`: number[], `radius`: number): *[Circle](_debug_circle_.circle.md)*

*Defined in [src/debug/circle.ts:7](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/debug/circle.ts#L7)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`center` | number[] | - |
`radius` | number |   |

**Returns:** *[Circle](_debug_circle_.circle.md)*

## Properties

###  center

• **center**: *number[]*

*Defined in [src/debug/circle.ts:6](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/debug/circle.ts#L6)*

___

###  radius

• **radius**: *number*

*Defined in [src/debug/circle.ts:7](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/debug/circle.ts#L7)*

## Methods

### `Static` engulfsCircle

▸ **engulfsCircle**(`c1`: [Circle](_debug_circle_.circle.md), `c2`: [Circle](_debug_circle_.circle.md)): *boolean*

*Defined in [src/debug/circle.ts:33](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/debug/circle.ts#L33)*

Returns true if the first circle engulfs the second.

**Parameters:**

Name | Type |
------ | ------ |
`c1` | [Circle](_debug_circle_.circle.md) |
`c2` | [Circle](_debug_circle_.circle.md) |

**Returns:** *boolean*

___

### `Static` scale

▸ **scale**(`circle`: [Circle](_debug_circle_.circle.md), `s`: number): *[Circle](_debug_circle_.circle.md)*

*Defined in [src/debug/circle.ts:25](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/debug/circle.ts#L25)*

Returns a scaled version of the given circle without
changing its center position.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`circle` | [Circle](_debug_circle_.circle.md) | - |
`s` | number | multiplier  |

**Returns:** *[Circle](_debug_circle_.circle.md)*

___

### `Static` toString

▸ **toString**(`circle`: [Circle](_debug_circle_.circle.md)): *string*

*Defined in [src/debug/circle.ts:49](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/debug/circle.ts#L49)*

Returns a human-readable string description.

**Parameters:**

Name | Type |
------ | ------ |
`circle` | [Circle](_debug_circle_.circle.md) |

**Returns:** *string*
