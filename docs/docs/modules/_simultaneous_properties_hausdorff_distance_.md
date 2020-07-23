---
id: "_simultaneous_properties_hausdorff_distance_"
title: "simultaneous-properties/hausdorff-distance"
sidebar_label: "simultaneous-properties/hausdorff-distance"
---

[flo-bezier3](../globals.md) › ["simultaneous-properties/hausdorff-distance"](_simultaneous_properties_hausdorff_distance_.md)

## Index

### Functions

* [hausdorffDistance](_simultaneous_properties_hausdorff_distance_.md#hausdorffdistance)
* [hausdorffDistanceCandidates](_simultaneous_properties_hausdorff_distance_.md#hausdorffdistancecandidates)

## Functions

###  hausdorffDistance

▸ **hausdorffDistance**(`ps1`: number[][], `ps2`: number[][], `maxLength`: number): *number*

*Defined in [src/simultaneous-properties/hausdorff-distance.ts:41](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/simultaneous-properties/hausdorff-distance.ts#L41)*

Calculates and returns an approximation to the one-sided Hausdorff distance
from ps1 to ps2 between two bezier curves.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps1` | number[][] | - |
`ps2` | number[][] | - |
`maxLength` | number | The first curve (ps1) will be split into pieces such that each piece is shorter than maxLength. All endpoints of the smaller curves are then used to check the distance to the other curve. The max of these are given as an estimate of the Hausdorff distance.  |

**Returns:** *number*

___

###  hausdorffDistanceCandidates

▸ **hausdorffDistanceCandidates**(`ps1`: number[][], `ps2`: number[][], `maxLength`: number): *object[]*

*Defined in [src/simultaneous-properties/hausdorff-distance.ts:8](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/simultaneous-properties/hausdorff-distance.ts#L8)*

**Parameters:**

Name | Type |
------ | ------ |
`ps1` | number[][] |
`ps2` | number[][] |
`maxLength` | number |

**Returns:** *object[]*
