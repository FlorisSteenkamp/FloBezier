---
id: "_global_properties_type_is_cubic_really_quad_"
title: "global-properties/type/is-cubic-really-quad"
sidebar_label: "global-properties/type/is-cubic-really-quad"
---

[flo-bezier3](../globals.md) › ["global-properties/type/is-cubic-really-quad"](_global_properties_type_is_cubic_really_quad_.md)

## Index

### Variables

* [abs](_global_properties_type_is_cubic_really_quad_.md#const-abs)
* [eDiff](_global_properties_type_is_cubic_really_quad_.md#ediff)
* [eSign](_global_properties_type_is_cubic_really_quad_.md#esign)
* [fastExpansionSum](_global_properties_type_is_cubic_really_quad_.md#fastexpansionsum)
* [twoProduct](_global_properties_type_is_cubic_really_quad_.md#twoproduct)
* [u](_global_properties_type_is_cubic_really_quad_.md#const-u)

### Functions

* [isCubicReallyQuad](_global_properties_type_is_cubic_really_quad_.md#iscubicreallyquad)

## Variables

### `Const` abs

• **abs**: *abs* = Math.abs

*Defined in [src/global-properties/type/is-cubic-really-quad.ts:8](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/global-properties/type/is-cubic-really-quad.ts#L8)*

___

###  eDiff

• **eDiff**: *[eDiff](_implicit_form_exact_get_implicit_form1_.md#ediff)*

*Defined in [src/global-properties/type/is-cubic-really-quad.ts:5](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/global-properties/type/is-cubic-really-quad.ts#L5)*

___

###  eSign

• **eSign**: *[eSign](_intersection_bezier_intersection_implicit_bezier_bezier_intersection_implicit_.md#esign)*

*Defined in [src/global-properties/type/is-cubic-really-quad.ts:5](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/global-properties/type/is-cubic-really-quad.ts#L5)*

___

###  fastExpansionSum

• **fastExpansionSum**: *[fastExpansionSum](_intersection_bezier_intersection_implicit_inversion_old_.md#fastexpansionsum)*

*Defined in [src/global-properties/type/is-cubic-really-quad.ts:5](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/global-properties/type/is-cubic-really-quad.ts#L5)*

___

###  twoProduct

• **twoProduct**: *[twoProduct](_intersection_bezier_intersection_implicit_inversion_old_.md#twoproduct)*

*Defined in [src/global-properties/type/is-cubic-really-quad.ts:5](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/global-properties/type/is-cubic-really-quad.ts#L5)*

___

### `Const` u

• **u**: *number* = Number.EPSILON / 2

*Defined in [src/global-properties/type/is-cubic-really-quad.ts:7](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/global-properties/type/is-cubic-really-quad.ts#L7)*

## Functions

###  isCubicReallyQuad

▸ **isCubicReallyQuad**(`ps`: number[][]): *boolean*

*Defined in [src/global-properties/type/is-cubic-really-quad.ts:16](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/global-properties/type/is-cubic-really-quad.ts#L16)*

Returns true if the given bezier curve is really a quadratic curve.
* there is no limit on the bitlength of the coefficients

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] | a cubic bezier curve  |

**Returns:** *boolean*
