---
id: "_global_properties_length_length_squared_upper_bound_"
title: "global-properties/length/length-squared-upper-bound"
sidebar_label: "global-properties/length/length-squared-upper-bound"
---

[flo-bezier3](../globals.md) › ["global-properties/length/length-squared-upper-bound"](_global_properties_length_length_squared_upper_bound_.md)

## Index

### Functions

* [lengthSquaredUpperBound](_global_properties_length_length_squared_upper_bound_.md#lengthsquaredupperbound)

## Functions

###  lengthSquaredUpperBound

▸ **lengthSquaredUpperBound**(`ps`: number[][]): *number*

*Defined in [src/global-properties/length/length-squared-upper-bound.ts:15](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/global-properties/length/length-squared-upper-bound.ts#L15)*

Returns an upper bound for the length of the given order 1, 2 or 3 bezier
curve.

The curve has lenhth 0 iff this bound is zero.

This bound is a bit loose as it uses the sum of the straight-line distances
between control points as a measure.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] |   |

**Returns:** *number*
