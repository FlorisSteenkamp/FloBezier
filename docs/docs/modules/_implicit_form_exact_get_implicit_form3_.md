---
id: "_implicit_form_exact_get_implicit_form3_"
title: "implicit-form/exact/get-implicit-form3"
sidebar_label: "implicit-form/exact/get-implicit-form3"
---

[flo-bezier3](../globals.md) › ["implicit-form/exact/get-implicit-form3"](_implicit_form_exact_get_implicit_form3_.md)

## Index

### Variables

* [eCalculate](_implicit_form_exact_get_implicit_form3_.md#ecalculate)
* [eNegativeOf](_implicit_form_exact_get_implicit_form3_.md#enegativeof)
* [eProduct](_implicit_form_exact_get_implicit_form3_.md#eproduct)

### Functions

* [getImplicitForm3Exact](_implicit_form_exact_get_implicit_form3_.md#getimplicitform3exact)

## Variables

###  eCalculate

• **eCalculate**: *[eCalculate](_implicit_form_exact_get_implicit_form3_.md#ecalculate)*

*Defined in [src/implicit-form/exact/get-implicit-form3.ts:7](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/implicit-form/exact/get-implicit-form3.ts#L7)*

___

###  eNegativeOf

• **eNegativeOf**: *[eNegativeOf](_implicit_form_exact_get_implicit_form3_.md#enegativeof)*

*Defined in [src/implicit-form/exact/get-implicit-form3.ts:7](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/implicit-form/exact/get-implicit-form3.ts#L7)*

___

###  eProduct

• **eProduct**: *[eProduct](_implicit_form_exact_get_implicit_form3_.md#eproduct)*

*Defined in [src/implicit-form/exact/get-implicit-form3.ts:7](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/implicit-form/exact/get-implicit-form3.ts#L7)*

## Functions

###  getImplicitForm3Exact

▸ **getImplicitForm3Exact**(`ps`: number[][]): *object*

*Defined in [src/implicit-form/exact/get-implicit-form3.ts:15](https://github.com/FlorisSteenkamp/FloBezier/blob/6f79660/src/implicit-form/exact/get-implicit-form3.ts#L15)*

Returns the exact implicit form of the given cubic bezier.
Taken from http://www.mare.ee/indrek/misc/2d.pdf

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ps` | number[][] |   |

**Returns:** *object*

* **v**: *number[]*

* **vᵧ**: *number[]*

* **vᵧᵧ**: *number[]*

* **vᵧᵧᵧ**: *number[]*

* **vₓ**: *number[]*

* **vₓᵧ**: *number[]*

* **vₓᵧᵧ**: *number[]*

* **vₓₓ**: *number[]*

* **vₓₓᵧ**: *number[]*

* **vₓₓₓ**: *number[]*
