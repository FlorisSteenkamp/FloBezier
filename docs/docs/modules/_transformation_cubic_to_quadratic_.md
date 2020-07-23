---
id: "_transformation_cubic_to_quadratic_"
title: "transformation/cubic-to-quadratic"
sidebar_label: "transformation/cubic-to-quadratic"
---

[flo-bezier3](../globals.md) › ["transformation/cubic-to-quadratic"](_transformation_cubic_to_quadratic_.md)

## Index

### Functions

* [cubicToQuadratic](_transformation_cubic_to_quadratic_.md#cubictoquadratic)

## Functions

###  cubicToQuadratic

▸ **cubicToQuadratic**(`ps`: number[][]): *number[][]*

*Defined in [src/transformation/cubic-to-quadratic.ts:8](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/transformation/cubic-to-quadratic.ts#L8)*

Returns the best least squares quadratic bezier approximation to the given
cubic bezier.
* the two bezier endpoints differ in general

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] | A cubic bezier curve.  |

**Returns:** *number[][]*
