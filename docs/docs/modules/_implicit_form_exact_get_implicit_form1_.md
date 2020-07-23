---
id: "_implicit_form_exact_get_implicit_form1_"
title: "implicit-form/exact/get-implicit-form1"
sidebar_label: "implicit-form/exact/get-implicit-form1"
---

[flo-bezier3](../globals.md) › ["implicit-form/exact/get-implicit-form1"](_implicit_form_exact_get_implicit_form1_.md)

## Index

### Variables

* [eDiff](_implicit_form_exact_get_implicit_form1_.md#ediff)
* [eNegativeOf](_implicit_form_exact_get_implicit_form1_.md#enegativeof)
* [expansionProduct](_implicit_form_exact_get_implicit_form1_.md#expansionproduct)

### Functions

* [getImplicitForm1Exact](_implicit_form_exact_get_implicit_form1_.md#getimplicitform1exact)

## Variables

###  eDiff

• **eDiff**: *[eDiff](_implicit_form_exact_get_implicit_form1_.md#ediff)*

*Defined in [src/implicit-form/exact/get-implicit-form1.ts:7](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/implicit-form/exact/get-implicit-form1.ts#L7)*

___

###  eNegativeOf

• **eNegativeOf**: *[eNegativeOf](_implicit_form_exact_get_implicit_form3_.md#enegativeof)*

*Defined in [src/implicit-form/exact/get-implicit-form1.ts:7](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/implicit-form/exact/get-implicit-form1.ts#L7)*

___

###  expansionProduct

• **expansionProduct**: *[expansionProduct](_implicit_form_exact_get_implicit_form2_.md#expansionproduct)*

*Defined in [src/implicit-form/exact/get-implicit-form1.ts:7](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/implicit-form/exact/get-implicit-form1.ts#L7)*

## Functions

###  getImplicitForm1Exact

▸ **getImplicitForm1Exact**(`ps`: number[][]): *object*

*Defined in [src/implicit-form/exact/get-implicit-form1.ts:16](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/implicit-form/exact/get-implicit-form1.ts#L16)*

Returns the exact implicit form of the given linear bezier.
Adapted from http://www.mare.ee/indrek/misc/2d.pdf

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] |   |

**Returns:** *object*

* **v**: *number[]*

* **vᵧ**: *number[]*

* **vₓ**: *number[]*
