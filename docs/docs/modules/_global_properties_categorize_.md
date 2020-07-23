---
id: "_global_properties_categorize_"
title: "global-properties/categorize"
sidebar_label: "global-properties/categorize"
---

[flo-bezier3](../globals.md) › ["global-properties/categorize"](_global_properties_categorize_.md)

## Index

### Functions

* [categorize](_global_properties_categorize_.md#categorize)

## Functions

###  categorize

▸ **categorize**(`ps`: number[][]): *void*

*Defined in [src/global-properties/categorize.ts:13](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/global-properties/categorize.ts#L13)*

Categorizes the given cubic bezier curve according to whether it has a loop,
a cusp, or zero, one or two inflection points all of which are mutually
exclusive.

See <a href="http://graphics.pixar.com/people/derose/publications/CubicClassification/paper.pdf">
this</a> paper.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] | A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]] |

**Returns:** *void*

A value of 'L', 'C', '0', '1', or '2' depending on whether
the curve has a loop, a cusp, or zero, one or two inflection points.
