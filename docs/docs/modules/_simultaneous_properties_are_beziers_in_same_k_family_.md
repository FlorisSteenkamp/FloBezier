---
id: "_simultaneous_properties_are_beziers_in_same_k_family_"
title: "simultaneous-properties/are-beziers-in-same-k-family"
sidebar_label: "simultaneous-properties/are-beziers-in-same-k-family"
---

[flo-bezier3](../globals.md) › ["simultaneous-properties/are-beziers-in-same-k-family"](_simultaneous_properties_are_beziers_in_same_k_family_.md)

## Index

### Functions

* [areBeziersInSameKFamily](_simultaneous_properties_are_beziers_in_same_k_family_.md#arebeziersinsamekfamily)

## Functions

###  areBeziersInSameKFamily

▸ **areBeziersInSameKFamily**(`ps1`: number[][], `ps2`: number[][]): *boolean*

*Defined in [src/simultaneous-properties/are-beziers-in-same-k-family.ts:23](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/simultaneous-properties/are-beziers-in-same-k-family.ts#L23)*

* TODO - bitlength calculation below is wrong due to evaluation.

Returns true if two beziers are in the same K-family, i.e. when their infinte
extensions turn them into the same curve. This algorithm is robust if the
preconditions are met.
* probably better to use the bezierBezierIntersection function and see if it
returns undefined which is the case iff the two beziers are in the same
k-family.
* **Precondition**: bezier control points must be grid-aligned
* **Precondition**: max bit-length of each bezier's control points PLUS 4
(due to power basis conversion that can add 4 bits) PLUS 1 (due to testing of
t values at 1, 2, 4, 8, ...) must be < 53, therefore the max bitlength === 48.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps1` | number[][] | A bezier curve |
`ps2` | number[][] | Another bezier curve  |

**Returns:** *boolean*
