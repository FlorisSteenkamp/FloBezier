---
id: "_global_properties_length_length_upper_bound_"
title: "global-properties/length/length-upper-bound"
sidebar_label: "global-properties/length/length-upper-bound"
---

[flo-bezier3](../globals.md) › ["global-properties/length/length-upper-bound"](_global_properties_length_length_upper_bound_.md)

## Index

### Functions

* [lengthUpperBound](_global_properties_length_length_upper_bound_.md#lengthupperbound)

## Functions

###  lengthUpperBound

▸ **lengthUpperBound**(`ps`: number[][]): *number*

*Defined in [src/global-properties/length/length-upper-bound.ts:11](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/global-properties/length/length-upper-bound.ts#L11)*

Returns an upper bound for the length of the given bezier curve - this bound
is not very strict as it uses the sum of the straight-line distances between
control points as a measure.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] |   |

**Returns:** *number*
