---
id: "_global_properties_max_ds_"
title: "global-properties/max-ds"
sidebar_label: "global-properties/max-ds"
---

[flo-bezier3](../globals.md) › ["global-properties/max-ds"](_global_properties_max_ds_.md)

## Index

### Functions

* [maxDs](_global_properties_max_ds_.md#maxds)

## Functions

###  maxDs

▸ **maxDs**(`ps`: number[][]): *object*

*Defined in [src/global-properties/max-ds.ts:13](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/global-properties/max-ds.ts#L13)*

Find the maximum change in curve length (s) due to a change in the parameter
(t)., i.e. max(ds/dt) for t ∈ [0,1]

**Parameters:**

Name | Type |
------ | ------ |
`ps` | number[][] |

**Returns:** *object*

* **ds**: *number* = max

* **t**: *number*
