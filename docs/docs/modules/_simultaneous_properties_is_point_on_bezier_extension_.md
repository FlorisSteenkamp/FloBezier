---
id: "_simultaneous_properties_is_point_on_bezier_extension_"
title: "simultaneous-properties/is-point-on-bezier-extension"
sidebar_label: "simultaneous-properties/is-point-on-bezier-extension"
---

[flo-bezier3](../globals.md) › ["simultaneous-properties/is-point-on-bezier-extension"](_simultaneous_properties_is_point_on_bezier_extension_.md)

## Index

### Variables

* [abs](_simultaneous_properties_is_point_on_bezier_extension_.md#const-abs)
* [epr](_simultaneous_properties_is_point_on_bezier_extension_.md#const-epr)
* [estimate](_simultaneous_properties_is_point_on_bezier_extension_.md#const-estimate)
* [fes](_simultaneous_properties_is_point_on_bezier_extension_.md#const-fes)
* [qaq](_simultaneous_properties_is_point_on_bezier_extension_.md#const-qaq)
* [qmd](_simultaneous_properties_is_point_on_bezier_extension_.md#const-qmd)
* [qmq](_simultaneous_properties_is_point_on_bezier_extension_.md#const-qmq)
* [sce](_simultaneous_properties_is_point_on_bezier_extension_.md#const-sce)
* [sign](_simultaneous_properties_is_point_on_bezier_extension_.md#const-sign)
* [tp](_simultaneous_properties_is_point_on_bezier_extension_.md#const-tp)

### Functions

* [isPointOnBezierExtension](_simultaneous_properties_is_point_on_bezier_extension_.md#ispointonbezierextension)
* [isPointOnBezierExtension1](_simultaneous_properties_is_point_on_bezier_extension_.md#ispointonbezierextension1)
* [isPointOnBezierExtension2](_simultaneous_properties_is_point_on_bezier_extension_.md#ispointonbezierextension2)
* [isPointOnBezierExtension3](_simultaneous_properties_is_point_on_bezier_extension_.md#ispointonbezierextension3)

## Variables

### `Const` abs

• **abs**: *abs* = Math.abs

*Defined in [src/simultaneous-properties/is-point-on-bezier-extension.ts:25](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/simultaneous-properties/is-point-on-bezier-extension.ts#L25)*

___

### `Const` epr

• **epr**: *[expansionProduct](_implicit_form_exact_get_implicit_form2_.md#expansionproduct)* = expansionProduct

*Defined in [src/simultaneous-properties/is-point-on-bezier-extension.ts:20](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/simultaneous-properties/is-point-on-bezier-extension.ts#L20)*

___

### `Const` estimate

• **estimate**: *[eEstimate](_intersection_self_intersection_self_intersection_.md#eestimate)* = eEstimate

*Defined in [src/simultaneous-properties/is-point-on-bezier-extension.ts:23](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/simultaneous-properties/is-point-on-bezier-extension.ts#L23)*

___

### `Const` fes

• **fes**: *[fastExpansionSum](_intersection_bezier_intersection_implicit_inversion_old_.md#fastexpansionsum)* = fastExpansionSum

*Defined in [src/simultaneous-properties/is-point-on-bezier-extension.ts:21](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/simultaneous-properties/is-point-on-bezier-extension.ts#L21)*

___

### `Const` qaq

• **qaq**: *[ddAddDd](_global_properties_bounds_get_interval_box_get_interval_box_quad_.md#ddadddd)* = ddAddDd

*Defined in [src/simultaneous-properties/is-point-on-bezier-extension.ts:17](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/simultaneous-properties/is-point-on-bezier-extension.ts#L17)*

___

### `Const` qmd

• **qmd**: *[ddMultDouble2](_global_properties_bounds_get_interval_box_get_interval_box_quad_.md#ddmultdouble2)* = ddMultDouble2

*Defined in [src/simultaneous-properties/is-point-on-bezier-extension.ts:18](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/simultaneous-properties/is-point-on-bezier-extension.ts#L18)*

___

### `Const` qmq

• **qmq**: *[ddMultDd](_global_properties_bounds_get_interval_box_get_interval_box_quad_.md#ddmultdd)* = ddMultDd

*Defined in [src/simultaneous-properties/is-point-on-bezier-extension.ts:16](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/simultaneous-properties/is-point-on-bezier-extension.ts#L16)*

___

### `Const` sce

• **sce**: *scaleExpansion2* = scaleExpansion2

*Defined in [src/simultaneous-properties/is-point-on-bezier-extension.ts:19](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/simultaneous-properties/is-point-on-bezier-extension.ts#L19)*

___

### `Const` sign

• **sign**: *[eSign](_intersection_bezier_intersection_implicit_bezier_bezier_intersection_implicit_.md#esign)* = eSign

*Defined in [src/simultaneous-properties/is-point-on-bezier-extension.ts:22](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/simultaneous-properties/is-point-on-bezier-extension.ts#L22)*

___

### `Const` tp

• **tp**: *[twoProduct](_intersection_bezier_intersection_implicit_inversion_old_.md#twoproduct)* = twoProduct

*Defined in [src/simultaneous-properties/is-point-on-bezier-extension.ts:15](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/simultaneous-properties/is-point-on-bezier-extension.ts#L15)*

## Functions

###  isPointOnBezierExtension

▸ **isPointOnBezierExtension**(`ps`: number[][], `p`: number[]): *boolean*

*Defined in [src/simultaneous-properties/is-point-on-bezier-extension.ts:496](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/simultaneous-properties/is-point-on-bezier-extension.ts#L496)*

Returns true if the given point is on the given bezier curve where the
parameter t is allowed to extend to +-infinity, i.e. t is an element of
[-inf, +inf], false otherwise.

* **precondition**: ps and p must be grid-aligned with a maximum bitlength of 47.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] | - |
`p` | number[] |   |

**Returns:** *boolean*

___

###  isPointOnBezierExtension1

▸ **isPointOnBezierExtension1**(`ps`: number[][], `p`: number[]): *boolean*

*Defined in [src/simultaneous-properties/is-point-on-bezier-extension.ts:450](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/simultaneous-properties/is-point-on-bezier-extension.ts#L450)*

Returns true if the given point is on the given line where
the parameter t is allowed to extend to +-infinity, i.e. t is an element of
[-inf, +inf], false otherwise.

* Precondition: ps must be grid-aligned and have a maximum bitlength of 47.
(p may have any bitlength - no restrictions)
* there are many alternative implementations to this function, e.g. ccw, etc;
it is just kept for symmetry.
o

**Parameters:**

Name | Type |
------ | ------ |
`ps` | number[][] |
`p` | number[] |

**Returns:** *boolean*

___

###  isPointOnBezierExtension2

▸ **isPointOnBezierExtension2**(`ps`: number[][], `p`: number[]): *boolean*

*Defined in [src/simultaneous-properties/is-point-on-bezier-extension.ts:287](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/simultaneous-properties/is-point-on-bezier-extension.ts#L287)*

Returns true if the given point is on the given quadratic bezier curve where
the parameter t is allowed to extend to +-infinity, i.e. t is an element of
[-inf, +inf], false otherwise.

* Precondition: ps must be grid-aligned and have a maximum bitlength of 47.
(p may have any bitlength - no restrictions)

**Parameters:**

Name | Type |
------ | ------ |
`ps` | number[][] |
`p` | number[] |

**Returns:** *boolean*

___

###  isPointOnBezierExtension3

▸ **isPointOnBezierExtension3**(`ps`: number[][], `p`: number[]): *boolean*

*Defined in [src/simultaneous-properties/is-point-on-bezier-extension.ts:36](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/simultaneous-properties/is-point-on-bezier-extension.ts#L36)*

Returns true if the given point is on the given cubic bezier curve where the
parameter t is allowed to extend to +-infinity, i.e. t is an element of
[-inf, +inf], false otherwise.

* Precondition: ps must be grid-aligned and have a maximum bitlength of 47.
(p may have any bitlength - no restrictions)

**Parameters:**

Name | Type |
------ | ------ |
`ps` | number[][] |
`p` | number[] |

**Returns:** *boolean*
