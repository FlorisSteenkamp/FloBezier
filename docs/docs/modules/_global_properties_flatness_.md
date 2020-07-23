---
id: "_global_properties_flatness_"
title: "global-properties/flatness"
sidebar_label: "global-properties/flatness"
---

[flo-bezier3](../globals.md) › ["global-properties/flatness"](_global_properties_flatness_.md)

## Index

### Functions

* [flatness](_global_properties_flatness_.md#flatness)

## Functions

###  flatness

▸ **flatness**(`ps`: number[][]): *number*

*Defined in [src/global-properties/flatness.ts:12](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/global-properties/flatness.ts#L12)*

Returns a flatness measure of the given curve - calculated as the total
distance between consecutive control points divided by the distance between
the endpoints.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] | An order 1,2 or 3 bezier curve.  |

**Returns:** *number*
